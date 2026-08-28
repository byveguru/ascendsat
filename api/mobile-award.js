// Vercel serverless function — server-authoritative XP/streak/badge awarding
// for the mobile app. Same shape as api/referral.js: manual Firebase ID
// token verification (RS256 against Google's public certs) + Admin SDK.
//
// Why this exists: mobile's gamification numbers must not be something the
// client can just set directly (unlike web today, where awardXp/updateStreak
// are plain client-side setDoc calls) — see mobile/src/shared/gamification.ts
// for the "why" behind that decision. This endpoint never trusts a
// client-supplied XP number or correctness count; it re-reads the actual
// scores/{scoreId} doc the mobile lesson screen already wrote and recomputes
// everything from that.
//
// Request:  POST { action: "completeLesson", scoreId, todayStr }
//           Authorization: Bearer <Firebase ID token>
// Response: { ok: true, alreadyAwarded?: true, xpEarned?, totalXp?, level?,
//              leveledUp?, streak?, longestStreak?, newBadges? }

const crypto = require("crypto");
const admin = require("firebase-admin");
const {
  computeLessonXp,
  getTierForXp,
  checkNewBadges,
  longestCorrectStreak,
  getDailyChallengeType,
  DAILY_CHALLENGE_BONUS,
  STREAK_FREEZE_CAP,
} = require("./_gamification");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    }),
  });
}
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

// --- Firebase ID token verification (identical approach to api/referral.js) ---
const GOOGLE_CERTS_URL =
  "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";
let certCache = { certs: null, expiresAt: 0 };

async function getGoogleCerts() {
  if (certCache.certs && Date.now() < certCache.expiresAt) return certCache.certs;
  const res = await fetch(GOOGLE_CERTS_URL);
  if (!res.ok) throw new Error("Could not fetch Google signing certs");
  const certs = await res.json();
  const cc = res.headers.get("cache-control") || "";
  const maxAge = Number((cc.match(/max-age=(\d+)/) || [])[1] || 3600);
  certCache = { certs, expiresAt: Date.now() + maxAge * 1000 };
  return certs;
}

const b64urlToBuf = (s) => Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/"), "base64");

async function verifyFirebaseIdToken(token, projectId) {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Malformed token");
  const [headerB64, payloadB64, sigB64] = parts;

  const header = JSON.parse(b64urlToBuf(headerB64).toString("utf8"));
  const payload = JSON.parse(b64urlToBuf(payloadB64).toString("utf8"));

  if (header.alg !== "RS256") throw new Error("Unexpected token algorithm");

  const certs = await getGoogleCerts();
  const cert = certs[header.kid];
  if (!cert) throw new Error("Unknown token key id");

  const verifier = crypto.createVerify("RSA-SHA256");
  verifier.update(`${headerB64}.${payloadB64}`);
  if (!verifier.verify(cert, b64urlToBuf(sigB64))) throw new Error("Bad token signature");

  const nowSec = Math.floor(Date.now() / 1000);
  if (payload.exp <= nowSec) throw new Error("Token expired");
  if (payload.iat > nowSec + 300) throw new Error("Token issued in the future");
  if (payload.aud !== projectId) throw new Error("Token audience mismatch");
  if (payload.iss !== `https://securetoken.google.com/${projectId}`) {
    throw new Error("Token issuer mismatch");
  }
  const uid = payload.sub || payload.user_id;
  if (!uid) throw new Error("Token missing subject");
  return uid;
}

// Same day-boundary algorithm as App.tsx's updateStreak (App.tsx:6492-6519):
// local-midnight -> ISO date string; same day -> no-op; yesterday -> +1;
// else -> reset to 1. The server has no notion of the user's local day, so
// the client sends `todayStr` computed with the identical formula web uses
// (`new Date(); setHours(0,0,0,0); toISOString().split("T")[0]`) — clamped
// here to within 1 day of the server's own UTC date as a sanity check.
function resolveDateStr(todayStr) {
  const serverTodayStr = new Date().toISOString().split("T")[0];
  if (typeof todayStr !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(todayStr)) return serverTodayStr;
  const diffDays = Math.abs(
    (new Date(`${todayStr}T00:00:00.000Z`) - new Date(`${serverTodayStr}T00:00:00.000Z`)) / 86400000
  );
  return diffDays > 1 ? serverTodayStr : todayStr;
}

// Same day-boundary logic as before, plus one addition: if exactly one day
// was missed (a 2-day gap) and a streak freeze is available, consume it and
// keep the streak alive instead of resetting — a freeze covers a single
// missed day, not a longer gap.
function nextStreak(existing, dateStr, availableFreezes) {
  if (!existing) return { currentStreak: 1, longestStreak: 1, lastActiveDate: dateStr, freezeUsed: false };
  if (existing.lastActiveDate === dateStr) {
    return {
      currentStreak: existing.currentStreak || 1,
      longestStreak: existing.longestStreak || 1,
      lastActiveDate: dateStr,
      freezeUsed: false,
    };
  }

  const today = new Date(`${dateStr}T00:00:00.000Z`);
  const yesterday = new Date(today);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  if (existing.lastActiveDate === yesterdayStr) {
    const currentStreak = (existing.currentStreak || 0) + 1;
    return {
      currentStreak,
      longestStreak: Math.max(currentStreak, existing.longestStreak || 0),
      lastActiveDate: dateStr,
      freezeUsed: false,
    };
  }

  const twoDaysAgo = new Date(today);
  twoDaysAgo.setUTCDate(twoDaysAgo.getUTCDate() - 2);
  const twoDaysAgoStr = twoDaysAgo.toISOString().split("T")[0];

  if (existing.lastActiveDate === twoDaysAgoStr && availableFreezes > 0) {
    const currentStreak = existing.currentStreak || 1;
    return {
      currentStreak,
      longestStreak: Math.max(currentStreak, existing.longestStreak || 0),
      lastActiveDate: dateStr,
      freezeUsed: true,
    };
  }

  return { currentStreak: 1, longestStreak: Math.max(1, existing.longestStreak || 0), lastActiveDate: dateStr, freezeUsed: false };
}

async function handleCompleteLesson(uid, { scoreId, todayStr }) {
  if (!scoreId) throw Object.assign(new Error("scoreId required"), { status: 400 });

  const scoreSnap = await db.collection("scores").doc(String(scoreId)).get();
  if (!scoreSnap.exists) throw Object.assign(new Error("Score not found"), { status: 404 });
  const score = scoreSnap.data();
  if (score.userId !== uid) throw Object.assign(new Error("Score does not belong to this user"), { status: 403 });
  if (score.questionSource !== "mobile-lesson") {
    throw Object.assign(new Error("Not a mobile-lesson score"), { status: 400 });
  }

  const dateStr = resolveDateStr(todayStr);
  const questions = Array.isArray(score.questions) ? score.questions : [];
  const answersForXp = questions.map((q) => ({
    difficulty: q.difficulty || "Medium",
    correct: q.userAnswer === q.correctAnswer,
  }));
  const xpEarned = computeLessonXp(answersForXp);
  const perfectLesson = answersForXp.length > 0 && answersForXp.every((a) => a.correct);
  const domain = Array.isArray(score.domains) ? score.domains[0] : undefined;

  const userRef = db.collection("users").doc(uid);
  const awardRef = userRef.collection("awardedScores").doc(String(scoreId));
  const gameRef = userRef.collection("mobileGame").doc("profile");
  const streakRef = db.collection("streaks").doc(uid);

  let result = { alreadyAwarded: true };
  await db.runTransaction(async (tx) => {
    const [awardSnap, gameSnap, streakSnap] = await Promise.all([tx.get(awardRef), tx.get(gameRef), tx.get(streakRef)]);
    if (awardSnap.exists) return; // already awarded for this scoreId — no-op, not an error

    const gameData = gameSnap.exists ? gameSnap.data() : {};
    const streakData = streakSnap.exists ? streakSnap.data() : null;
    const streakUpdate = nextStreak(streakData, dateStr, gameData.streakFreezes || 0);

    // Daily challenge: re-derive today's challenge type ourselves (never
    // trust a client-sent type) and verify it from data already computed
    // above / already present on the verified scores doc — same transaction,
    // same idempotency guard as the rest of this award, so it can't be
    // replayed for repeat bonuses any more than XP can.
    const priorChallenge = gameData.dailyChallenge;
    const challengeType = getDailyChallengeType(dateStr);
    const alreadyCompletedToday = !!(priorChallenge && priorChallenge.date === dateStr && priorChallenge.completed);
    const lessonsCompletedToday = gameData.lastLessonCompletedDate === dateStr ? (gameData.lessonsCompletedToday || 0) + 1 : 1;

    let dailyChallengeCompleted = alreadyCompletedToday;
    let dailyChallengeBonus = 0;
    if (!alreadyCompletedToday) {
      const isNewDomain = !!domain && !(gameData.completedDomains || []).includes(domain);
      const conditionMet =
        {
          three_in_a_row: longestCorrectStreak(answersForXp) >= 3,
          new_domain: isNewDomain,
          perfect_lesson: perfectLesson,
          two_lessons: lessonsCompletedToday >= 2,
        }[challengeType] || false;
      if (conditionMet) {
        dailyChallengeCompleted = true;
        dailyChallengeBonus = DAILY_CHALLENGE_BONUS;
      }
    }

    const priorXp = gameData.xp || 0;
    const totalXp = priorXp + xpEarned + dailyChallengeBonus;
    const priorLevel = getTierForXp(priorXp).id;
    const newLevel = getTierForXp(totalXp).id;
    const leveledUp = newLevel !== priorLevel;

    const totalLessonsCompleted = (gameData.totalLessonsCompleted || 0) + 1;
    const perfectLessonsCompleted = (gameData.perfectLessonsCompleted || 0) + (perfectLesson ? 1 : 0);
    const completedDomains = new Set(gameData.completedDomains || []);
    if (domain) completedDomains.add(domain);
    const newBadges = checkNewBadges(
      { totalLessonsCompleted, currentStreak: streakUpdate.currentStreak, perfectLesson, perfectLessonsCompleted },
      gameData.badges || []
    );
    const badges = [...(gameData.badges || []), ...newBadges];

    // Freezes: consume one if nextStreak used one to save the streak, grant
    // one (capped) on every level-up — ties naturally into progression
    // without a separate mechanic to manage.
    let streakFreezes = gameData.streakFreezes || 0;
    if (streakUpdate.freezeUsed) streakFreezes = Math.max(0, streakFreezes - 1);
    if (leveledUp) streakFreezes = Math.min(STREAK_FREEZE_CAP, streakFreezes + 1);

    tx.set(awardRef, { awardedAt: FieldValue.serverTimestamp(), scoreId: String(scoreId) });
    tx.set(
      streakRef,
      { currentStreak: streakUpdate.currentStreak, longestStreak: streakUpdate.longestStreak, lastActiveDate: streakUpdate.lastActiveDate },
      { merge: true }
    );
    tx.set(
      gameRef,
      {
        xp: totalXp,
        level: newLevel,
        badges,
        totalLessonsCompleted,
        perfectLessonsCompleted,
        completedDomains: Array.from(completedDomains),
        lastLessonCompletedDate: dateStr,
        lessonsCompletedToday,
        streakFreezes,
        dailyChallenge: { date: dateStr, type: challengeType, completed: dailyChallengeCompleted },
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    result = {
      xpEarned: xpEarned + dailyChallengeBonus,
      totalXp,
      level: newLevel,
      leveledUp,
      streak: streakUpdate.currentStreak,
      longestStreak: streakUpdate.longestStreak,
      newBadges,
      freezeUsed: streakUpdate.freezeUsed,
      dailyChallengeCompleted: dailyChallengeCompleted && dailyChallengeBonus > 0,
      dailyChallengeType: challengeType,
      dailyChallengeBonus,
    };
  });

  return result;
}

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const projectId = process.env.FIREBASE_PROJECT_ID;
  if (!projectId || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
    return res.status(500).json({ error: "Firebase service account not configured on the server" });
  }

  const authHeader = req.headers.authorization || req.headers.Authorization || "";
  const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
  if (!idToken) return res.status(401).json({ error: "Sign in required" });

  let uid;
  try {
    uid = await verifyFirebaseIdToken(idToken, projectId);
  } catch (e) {
    return res.status(401).json({ error: "Invalid or expired session" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { return res.status(400).json({ error: "Invalid JSON body" }); }
  }
  const { action } = body || {};

  try {
    if (action === "completeLesson") {
      const result = await handleCompleteLesson(uid, body);
      return res.status(200).json({ ok: true, ...result });
    }
    return res.status(400).json({ error: "Unknown action" });
  } catch (e) {
    const status = e.status || 500;
    return res.status(status).json({ error: e.message || "Award processing failed" });
  }
};

// Exposed for local verification scripts only (calling the real logic
// in-process, bypassing the HTTP/auth layer) — the default export above is
// what Vercel actually invokes.
module.exports.handleCompleteLesson = handleCompleteLesson;
