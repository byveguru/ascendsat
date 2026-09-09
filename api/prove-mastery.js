// Prove Mastery — the one place in the Mastery Engine where the verdict has
// to be trustworthy rather than merely displayed. Day-to-day mastery% is
// computed client-side like every other stat in this app (App.tsx's
// computeSkillScoresFromHistory), and that's fine — but a "MASTERY VERIFIED"
// claim is a gate the product means something by, and `scores` docs are
// otherwise 100% client-writable with no schema validation (see
// firestore.rules' scores match), so the client's own opinion of whether it
// passed can't be the source of truth. This route re-reads the student's
// real Firestore history itself (Admin SDK, bypasses security rules) and
// recomputes every dimension independently — the client never gets to
// assert VERIFIED on its own.
//
// Only `submitAttempt` needs to be server-side. `generatePlan` (which
// questions to ask) doesn't need a trust boundary: even if a client asked an
// easier question set, this route still re-evaluates ALL seven dimensions
// against the complete, authoritative scores history before deciding a
// verdict — a thin question set just means more dimensions stay flagged.
// So plan generation stays client-only (App.tsx's generateProveMasteryPlan),
// keeping this route to the one call that actually needs the Admin SDK.
//
// Request:  POST { action: "submitAttempt", domain, scoreId, testType }
//           Authorization: Bearer <Firebase ID token>
// Response: { ok: true, verdict: "VERIFIED"|"NOT_YET_VERIFIED", reason,
//             dimensions, failingDimensions, resultId }

const { verifyFirebaseIdToken } = require("./_auth");
const { admin, db, FieldValue } = require("./_firebaseAdmin");
const { evaluateVerdict, computeMasteryForDomain } = require("../lib/masteryEngine");

// Same per-domain flattening App.tsx's getMasteryEntriesForDomain does
// client-side, duplicated here (not imported) since that helper lives
// inside App.tsx's single component closure — this route only needs the
// ~10 lines of Firestore-shape flattening, not the rest of the app.
function flattenDomainEntries(scoresDocs, domain) {
  const entries = [];
  scoresDocs.forEach((data) => {
    if (!data.questions) return;
    const ts = data.createdAt && typeof data.createdAt.toMillis === "function" ? data.createdAt.toMillis() : 0;
    if (ts <= 0) return;
    data.questions.forEach((q) => {
      if (q.domain !== domain) return;
      entries.push({
        correct: q.userAnswer === q.correctAnswer,
        difficulty: q.difficulty,
        timestamp: ts,
        questionId: q.id || q.questionId,
        format: q.format,
      });
    });
  });
  return entries;
}

function getDomainRootCauses(scoresDocs, domain, explanationsMap) {
  const domainQuestionIds = new Set();
  const attemptsByQid = {};
  scoresDocs.forEach((data) => {
    const ts = data.createdAt && typeof data.createdAt.toMillis === "function" ? data.createdAt.toMillis() : 0;
    (data.questions || []).forEach((q) => {
      if (q.domain !== domain) return;
      const qid = q.id || q.questionId;
      if (!qid) return;
      domainQuestionIds.add(qid);
      (attemptsByQid[qid] || (attemptsByQid[qid] = [])).push({ correct: q.userAnswer === q.correctAnswer, ts });
    });
  });
  const rootCauses = [];
  Object.entries(explanationsMap || {}).forEach(([qid, analysis]) => {
    if (!domainQuestionIds.has(qid) || !analysis || !analysis.rootCause) return;
    const attempts = (attemptsByQid[qid] || []).slice().sort((a, b) => a.ts - b.ts);
    const last = attempts[attempts.length - 1];
    rootCauses.push({ rootCause: analysis.rootCause, resolvedSince: last ? last.correct : false });
  });
  return rootCauses;
}

async function handleSubmitAttempt(uid, body) {
  const domain = String(body.domain || "");
  const scoreId = String(body.scoreId || "");
  const testType = String(body.testType || "sat");
  if (!domain || !scoreId) throw new Error("domain and scoreId are required");

  // Ownership check — never trust the client's own account of what it
  // scored, only that this doc exists and really belongs to this uid.
  const scoreSnap = await db.collection("scores").doc(scoreId).get();
  if (!scoreSnap.exists) throw new Error("Attempt not found");
  const scoreData = scoreSnap.data();
  if (scoreData.userId !== uid) throw new Error("Attempt does not belong to this account");

  const scoresQuery = await db.collection("scores").where("userId", "==", uid).get();
  const scoresDocs = scoresQuery.docs
    .map((d) => d.data())
    .filter((d) => (d.testType || "sat") === testType);

  const userSnap = await db.collection("users").doc(uid).get();
  const userData = userSnap.exists ? userSnap.data() : {};
  const explanationsMap = userData.aiExplanations || {};

  // Best-effort format-diversity signal — questionBank is one doc per
  // domain ({domain, testType, questions:[...]}); AP's static seed bank
  // isn't reachable from here, so AP domains just skip this one dimension
  // (detectFormatDiversityGap no-ops when availableFormats is empty).
  let availableFormats = [];
  try {
    const bankSnap = await db.collection("questionBank").doc(domain).get();
    if (bankSnap.exists) {
      const qs = bankSnap.data().questions || [];
      availableFormats = [...new Set(qs.map((q) => q.format || "mcq"))];
    }
  } catch (e) {
    // non-fatal — format-diversity just won't be checked for this domain
  }

  const entries = flattenDomainEntries(scoresDocs, domain);
  const rootCauses = getDomainRootCauses(scoresDocs, domain, explanationsMap);
  const now = Date.now();
  const result = evaluateVerdict({ entries, now, rootCauses, availableFormats });

  const resultRef = db.collection("proveMasteryResults").doc(uid).collection("results").doc(scoreId);
  await resultRef.set({
    domain,
    testType,
    verdict: result.verdict,
    reason: result.reason,
    dimensions: result.dimensions,
    failingDimensions: result.failingDimensions,
    createdAt: FieldValue.serverTimestamp(),
  });

  if (result.verdict === "VERIFIED") {
    const previousStatus = (userData.skillStats && userData.skillStats[domain] && userData.skillStats[domain].status) || null;
    const mastery = computeMasteryForDomain(entries, now, { previousStatus: "proved" });
    const skillStatsField = testType === "sat" ? `skillStats.${domain}.status` : `${testType}.skillStats.${domain}.status`;
    await db.collection("users").doc(uid).update({ [skillStatsField]: "proved" });
    await db.collection("masteryEvents").doc(uid).collection("events").add({
      domain,
      testType,
      type: "prove_mastery_verified",
      fromStatus: previousStatus,
      toStatus: "proved",
      masteryPctAtTransition: mastery.masteryPct,
      confidenceAtTransition: mastery.confidence,
      verifiedBy: "server",
      createdAt: FieldValue.serverTimestamp(),
    });
  }

  return { ...result, resultId: scoreId };
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
    if (action === "submitAttempt") {
      const result = await handleSubmitAttempt(uid, body);
      return res.status(200).json({ ok: true, ...result });
    }
    return res.status(400).json({ error: "Unknown action" });
  } catch (e) {
    return res.status(500).json({ error: e.message || "Prove Mastery verification failed" });
  }
};
