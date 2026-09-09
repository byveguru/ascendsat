// Anonymized cross-student mistake correlation ("mistake DNA") — pure
// aggregation logic, no Firestore/React/globals, so it runs identically via
// require() from both api/cron-daily.js (the nightly batch step) and
// scripts/testMistakeDna.js (fixture tests), matching lib/masteryEngine.js's
// plain-JS convention for exactly the same reason.
//
// Firestore doc IDs can't contain "/", but makeQuestionId (App.tsx) can
// theoretically produce one (a domain or question snippet containing a
// slash) — sanitize before ever using a questionId as a questionInsights
// doc ID. Never sanitize when just comparing/grouping questionIds as data.
const sanitizeQuestionId = (id) => String(id).replace(/\//g, "∕");

// Below this many students who *attempted* a candidate co-occurring
// question, don't surface it — with sparse data (see the calibration check
// this app ran against production: near-zero real usage as of this
// feature's ship date) a low-sample percentage is just noise, not signal.
const MIN_COOCCURRENCE_SAMPLE = 10;
const MAX_ALSO_MISSED = 5;

// attempts: every attempt (both correct and incorrect) made by the specific
// set of students who missed `targetQuestionId` — NOT the whole database.
// Each entry: { questionId, domain, correct }. targetQuestionId's own
// attempts are excluded from its own candidate list.
//
// The percentage is P(missed X | attempted X, is one of the students who
// missed the target) — i.e. "of the target-missers who even saw this other
// question, how many also missed it" — not normalized against students who
// never attempted the other question at all, which would be misleading.
function computeAlsoMissed(targetQuestionId, attempts) {
  const byQuestion = {};
  (attempts || []).forEach((a) => {
    if (!a || !a.questionId || a.questionId === targetQuestionId) return;
    if (!byQuestion[a.questionId]) {
      byQuestion[a.questionId] = { domain: a.domain || null, attempted: new Set(), missed: new Set() };
    }
    const bucket = byQuestion[a.questionId];
    const studentKey = a.userId;
    bucket.attempted.add(studentKey);
    if (!a.correct) bucket.missed.add(studentKey);
  });

  return Object.entries(byQuestion)
    .map(([questionId, { domain, attempted, missed }]) => ({
      questionId,
      domain,
      attempted: attempted.size,
      missed: missed.size,
      pct: Math.round((missed.size / attempted.size) * 100),
    }))
    .filter((r) => r.attempted >= MIN_COOCCURRENCE_SAMPLE)
    .sort((a, b) => b.pct - a.pct || b.attempted - a.attempted)
    .slice(0, MAX_ALSO_MISSED);
}

// Base stats for the target question itself, from every attempt anyone has
// ever made on it (both correct and incorrect) — a much smaller query than
// scanning the whole questionAttempts collection, since it's filtered to
// one questionId.
function computeBaseStats(targetAttempts) {
  const total = (targetAttempts || []).length;
  const missCount = (targetAttempts || []).filter((a) => a && !a.correct).length;
  return { totalAttempts: total, missCount };
}

module.exports = {
  sanitizeQuestionId,
  computeAlsoMissed,
  computeBaseStats,
  MIN_COOCCURRENCE_SAMPLE,
  MAX_ALSO_MISSED,
};
