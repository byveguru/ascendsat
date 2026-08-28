// Vercel Cron entry point (see vercel.json's `crons` entry) — fires once a
// day, the max frequency on the Hobby tier, so both scheduled email jobs
// share this one run instead of getting their own cron:
//   1. Streak-at-risk reminder — every day, for anyone who was active
//      yesterday and hasn't been active yet today.
//   2. Weekly recap — Mondays only.
//
// Protected via CRON_SECRET: when that env var is set, Vercel automatically
// sends it back as `Authorization: Bearer <CRON_SECRET>` on the request it
// makes to trigger this cron, so any other caller is rejected.
// https://vercel.com/docs/cron-jobs/manage-cron-jobs#securing-cron-jobs
//
// No per-user timezone is stored anywhere in this app, so "yesterday" /
// "today" here are UTC calendar days — the same simplification a single
// fixed-UTC-time daily firing already implies. Good enough for a reminder
// email; not worth adding timezone tracking just for this.

const { db } = require("./_firebaseAdmin");
const { sendBrevoEmail, emailShell } = require("./_brevo");

const APP_URL = "https://ascendsat.com";
const DAY_MS = 24 * 60 * 60 * 1000;

const utcDayKey = (date) => date.toISOString().split("T")[0];

async function sendStreakReminder(streakDoc) {
  const uid = streakDoc.id;
  const streak = streakDoc.data();
  const userSnap = await db.collection("users").doc(uid).get();
  if (!userSnap.exists) return false;
  const user = userSnap.data();
  if (user.emailPrefs && user.emailPrefs.streakReminders === false) return false;
  if (!user.email) return false;

  await sendBrevoEmail({
    to: user.email,
    subject: `Don't lose your ${streak.currentStreak}-day streak`,
    htmlContent: emailShell({
      heading: "Your streak is at risk",
      bodyHtml: `<p>You're on a <strong>${streak.currentStreak}-day streak</strong> on AscendSAT. Answer one question today to keep it going.</p>`,
      ctaLabel: "Keep my streak",
      ctaUrl: APP_URL,
    }),
  });
  return true;
}

async function computeWeeklyStats(uid, weekAgoDate) {
  const scoresSnap = await db
    .collection("scores")
    .where("userId", "==", uid)
    .where("createdAt", ">=", weekAgoDate)
    .get();

  let questionsAnswered = 0;
  const domainAttempts = {};
  scoresSnap.forEach((doc) => {
    const score = doc.data();
    questionsAnswered += score.total || 0;
    (score.questions || []).forEach((q) => {
      if (!q.domain) return;
      if (!domainAttempts[q.domain]) domainAttempts[q.domain] = { correct: 0, total: 0 };
      domainAttempts[q.domain].total += 1;
      if (q.userAnswer === q.correctAnswer) domainAttempts[q.domain].correct += 1;
    });
  });

  let weakestDomain = null;
  Object.entries(domainAttempts).forEach(([domain, stats]) => {
    if (stats.total < 3) return;
    const pct = stats.correct / stats.total;
    if (!weakestDomain || pct < weakestDomain.pct) weakestDomain = { domain, pct };
  });

  const userSnap = await db.collection("users").doc(uid).get();
  const user = userSnap.exists ? userSnap.data() : {};
  const xpGained = (user.xpLog || [])
    .filter((entry) => entry.date && new Date(entry.date) >= weekAgoDate)
    .reduce((sum, entry) => sum + (entry.amount || 0), 0);

  const badgesSnap = await db.collection("badges").doc(uid).get();
  const earnedAt = badgesSnap.exists ? badgesSnap.data().earnedAt || {} : {};
  const badgesEarned = Object.values(earnedAt).filter(
    (iso) => iso && new Date(iso) >= weekAgoDate
  ).length;

  return { questionsAnswered, xpGained, badgesEarned, weakestDomain };
}

async function sendWeeklyRecap(uid, weekAgoDate) {
  const userSnap = await db.collection("users").doc(uid).get();
  if (!userSnap.exists) return false;
  const user = userSnap.data();
  if (user.emailPrefs && user.emailPrefs.weeklyRecap === false) return false;
  if (!user.email) return false;

  const stats = await computeWeeklyStats(uid, weekAgoDate);
  if (stats.questionsAnswered === 0 && stats.badgesEarned === 0) return false; // nothing to recap

  const lines = [
    `<li>${stats.questionsAnswered} question${stats.questionsAnswered === 1 ? "" : "s"} answered</li>`,
    `<li>${stats.xpGained} XP earned</li>`,
  ];
  if (stats.badgesEarned > 0) {
    lines.push(`<li>${stats.badgesEarned} badge${stats.badgesEarned === 1 ? "" : "s"} unlocked</li>`);
  }
  if (stats.weakestDomain) {
    lines.push(`<li>Weakest area this week: <strong>${stats.weakestDomain.domain}</strong> — worth another look</li>`);
  }

  await sendBrevoEmail({
    to: user.email,
    subject: "Your week on AscendSAT",
    htmlContent: emailShell({
      heading: "Your weekly recap",
      bodyHtml: `<ul style="margin:0;padding-left:20px">${lines.join("")}</ul>`,
      ctaLabel: "Keep practicing",
      ctaUrl: APP_URL,
    }),
  });
  return true;
}

module.exports = async (req, res) => {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return res.status(500).json({ error: "CRON_SECRET not configured on the server" });
  }
  const authHeader = req.headers.authorization || req.headers.Authorization || "";
  if (authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const now = new Date();
  const yesterdayKey = utcDayKey(new Date(now.getTime() - DAY_MS));
  const isMonday = now.getUTCDay() === 1;

  let streakRemindersSent = 0;
  let weeklyRecapsSent = 0;

  try {
    const streakSnap = await db
      .collection("streaks")
      .where("lastActiveDate", "==", yesterdayKey)
      .where("currentStreak", ">", 0)
      .get();
    for (const streakDoc of streakSnap.docs) {
      if (await sendStreakReminder(streakDoc)) streakRemindersSent += 1;
    }

    if (isMonday) {
      const weekAgoDate = new Date(now.getTime() - 7 * DAY_MS);
      const weekAgoKey = utcDayKey(weekAgoDate);
      const activeSnap = await db
        .collection("streaks")
        .where("lastActiveDate", ">=", weekAgoKey)
        .get();
      for (const doc of activeSnap.docs) {
        if (await sendWeeklyRecap(doc.id, weekAgoDate)) weeklyRecapsSent += 1;
      }
    }

    return res.status(200).json({ ok: true, streakRemindersSent, weeklyRecapsSent, isMonday });
  } catch (e) {
    return res.status(500).json({ error: e.message || "Cron run failed" });
  }
};
