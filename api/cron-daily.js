// Vercel Cron entry point (see vercel.json's `crons` entry) — fires once a
// day, the max frequency on the Hobby tier, so all scheduled jobs share
// this one run instead of getting their own cron:
//   1. Streak-at-risk reminder — every day, for anyone who was active
//      yesterday and hasn't been active yet today.
//   2. Activation nudge — every day, one-time-ever email for accounts 3+
//      days old that never answered a single question.
//   3. Weekly recap — Mondays only.
//   4. "Mistake DNA" co-occurrence aggregation — every day, see below.
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

const { db, FieldValue } = require("./_firebaseAdmin");
const { sendBrevoEmail, emailShell } = require("./_brevo");
const { sanitizeQuestionId, computeAlsoMissed, computeBaseStats } = require("../lib/mistakeDna");

// Firestore's `where(..., "in", [...])` caps at 30 values per query.
const FIRESTORE_IN_LIMIT = 30;
const chunk = (arr, size) => {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

// Scoped to only questions that got at least one NEW miss in the last 24h
// (not a full nightly recompute of the whole question bank) — this is what
// keeps the job's cost proportional to daily miss volume rather than total
// users or total question bank size, so it stays safe within a serverless
// function's duration limit as usage grows. See lib/mistakeDna.js for the
// pure co-occurrence math.
async function updateMistakeDna(sinceDate) {
  let questionsUpdated = 0;

  const newMissesSnap = await db
    .collection("questionAttempts")
    .where("correct", "==", false)
    .where("createdAt", ">=", sinceDate)
    .get();

  const missersByQuestion = {};
  newMissesSnap.forEach((doc) => {
    const a = doc.data();
    if (!a.questionId || !a.userId) return;
    if (!missersByQuestion[a.questionId]) missersByQuestion[a.questionId] = new Set();
    missersByQuestion[a.questionId].add(a.userId);
  });

  for (const [targetQuestionId, missersSet] of Object.entries(missersByQuestion)) {
    const missers = [...missersSet];

    // Every attempt (right AND wrong) by these specific students, to know
    // both who else missed a candidate question and who merely attempted
    // it (the denominator for an honest percentage).
    const otherAttempts = [];
    for (const group of chunk(missers, FIRESTORE_IN_LIMIT)) {
      const snap = await db.collection("questionAttempts").where("userId", "in", group).get();
      snap.forEach((doc) => otherAttempts.push(doc.data()));
    }
    const alsoMissed = computeAlsoMissed(targetQuestionId, otherAttempts);

    // Base stats for the target question itself — bounded to attempts on
    // this one question, not a full collection scan.
    const targetSnap = await db.collection("questionAttempts").where("questionId", "==", targetQuestionId).get();
    const { totalAttempts, missCount } = computeBaseStats(targetSnap.docs.map((d) => d.data()));

    await db.collection("questionInsights").doc(sanitizeQuestionId(targetQuestionId)).set(
      { totalAttempts, missCount, alsoMissed, updatedAt: FieldValue.serverTimestamp() },
      { merge: true }
    );
    questionsUpdated += 1;
  }

  return questionsUpdated;
}

const APP_URL = "https://ascendsat.com";
const DAY_MS = 24 * 60 * 60 * 1000;

// users/{uid}.createdAt isn't consistently a Firestore Timestamp across the
// existing user base — 102 of 383 accounts have it stored as a plain ISO
// string instead (pre-existing inconsistency, not something this cron
// introduced). A Timestamp-only extraction would silently skip all of them
// forever, so this handles Timestamp, {seconds}, ISO string, and epoch ms.
function toMillisFlexible(v) {
  if (!v) return null;
  if (v.toMillis) return v.toMillis();
  if (v.seconds) return v.seconds * 1000;
  if (typeof v === "string") {
    const parsed = Date.parse(v);
    return Number.isNaN(parsed) ? null : parsed;
  }
  if (typeof v === "number") return v;
  return null;
}

const utcDayKey = (date) => date.toISOString().split("T")[0];

// A one-time nudge for accounts that signed up but never answered a single
// question — distinct from sendStreakReminder below, which only fires for
// users who already have SOME activity (a streaks doc). Sends once ever per
// user (marks activationNudgeSentAt so it's never a repeat nag), and only
// once the account is a few days old, so it doesn't fire on someone who
// simply hasn't finished onboarding yet today.
const ACTIVATION_NUDGE_DELAY_MS = 3 * DAY_MS;

async function sendActivationNudge(userDoc) {
  const uid = userDoc.id;
  const user = userDoc.data();
  if (user.emailPrefs && user.emailPrefs.activationNudge === false) return false;
  if (!user.email) return false;

  await sendBrevoEmail({
    to: user.email,
    toName: user.name || "",
    subject: "Your SAT prep is one question away",
    htmlContent: emailShell({
      heading: `Still there${user.name ? `, ${user.name}` : ""}?`,
      bodyHtml: `<p>You signed up for AscendSAT but haven't answered your first question yet. It takes about a minute to see where you stand — no pressure, just pick a domain and go.</p>`,
      ctaLabel: "Answer my first question",
      ctaUrl: APP_URL,
    }),
  });
  await db.collection("users").doc(uid).set({ activationNudgeSentAt: FieldValue.serverTimestamp() }, { merge: true });
  return true;
}

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
  let activationNudgesSent = 0;
  let activationNudgeError = null;
  let mistakeDnaQuestionsUpdated = 0;
  let mistakeDnaError = null;

  try {
    const streakSnap = await db
      .collection("streaks")
      .where("lastActiveDate", "==", yesterdayKey)
      .where("currentStreak", ">", 0)
      .get();
    for (const streakDoc of streakSnap.docs) {
      if (await sendStreakReminder(streakDoc)) streakRemindersSent += 1;
    }

    // Own try/catch, same reasoning as the mistake-DNA block below — a bug
    // here (or in the full-collection scan as the user base grows) must
    // never block the streak/recap emails sharing this one daily cron.
    try {
      const cutoffMs = now.getTime() - ACTIVATION_NUDGE_DELAY_MS;
      const usersSnap = await db.collection("users").get();
      for (const userDoc of usersSnap.docs) {
        const u = userDoc.data();
        if (u.questionsAnsweredTotal) continue; // already started — not a dead signup
        if (u.activationNudgeSentAt) continue; // never send this one twice
        const createdMs = toMillisFlexible(u.createdAt);
        if (!createdMs || createdMs > cutoffMs) continue; // too new, or no signup date to judge staleness by
        if (await sendActivationNudge(userDoc)) activationNudgesSent += 1;
      }
    } catch (e) {
      activationNudgeError = e.message || "Activation nudge failed";
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

    // Kept in its own try/catch — a bug in this newer, more experimental
    // job (chunked `in` queries over a still-thin dataset) shouldn't ever
    // take down the streak/recap emails it shares this one daily cron with.
    try {
      mistakeDnaQuestionsUpdated = await updateMistakeDna(new Date(now.getTime() - DAY_MS));
    } catch (e) {
      mistakeDnaError = e.message || "Mistake DNA update failed";
    }

    return res.status(200).json({ ok: true, streakRemindersSent, weeklyRecapsSent, activationNudgesSent, activationNudgeError, isMonday, mistakeDnaQuestionsUpdated, mistakeDnaError });
  } catch (e) {
    return res.status(500).json({ error: e.message || "Cron run failed" });
  }
};
