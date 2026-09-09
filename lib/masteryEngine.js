// Mastery Engine 2.0 — pure scoring/verification logic shared between the
// client (App.tsx, via `import ... from "./lib/masteryEngine"`, bundled by
// Metro) and the Prove Mastery Vercel function (api/prove-mastery.js, via
// plain `require("../lib/masteryEngine")`). Deliberately plain CommonJS with
// no TS syntax, no React, no Firestore SDK, and no globals — every export
// here is a pure `(data, ...) => result` function so it behaves identically
// in both runtimes and can be exercised by scripts/testMasteryEngine.js with
// nothing more than plain Node.
//
// Every constant a formula depends on lives in one place (below) so the
// model can be retuned without touching the logic itself.
"use strict";

// Reuses the exact difficulty-weighting convention already used for the
// in-quiz live score estimate (App.tsx's getAdaptiveEstimatedScore:
// Hard=3/Medium=2/Easy=1) — not new math, just applied with a different
// denominator (see computeMasteryForDomain below for why that denominator
// choice matters).
const DIFFICULTY_WEIGHT = { Easy: 1, Medium: 2, Hard: 3 };
const MAX_DIFFICULTY_WEIGHT = 3;

// Same 21-day half-life already used for the IRT ability update
// (lib/diagnosticScoring.ts's scoreHistoryEntryWeight) — a response ~3 weeks
// old counts half as much as one from today.
const RECENCY_HALF_LIFE_DAYS = 21;

const CONFIDENCE_THRESHOLDS = {
  INSUFFICIENT_TOTAL: 5, // total < this => "insufficient" (matches the existing
                          // total>=5 "enough data" cutoff already used by
                          // getEffectiveWeakAreas in App.tsx)
  LOW_TOTAL_MAX: 9,
  MEDIUM_TOTAL_MAX: 19,
  MEDIUM_MIN_DAYS: 2,
  HIGH_MIN_DAYS: 3,
  HIGH_MAX_DAYS_SINCE_LAST: 21,
};

const STATUS_THRESHOLDS = {
  WEAK_MAX_PCT: 49,
  PRACTICED_MAX_PCT: 74,
  REMEDIATED_MIN_HARD_ATTEMPTS: 3,
};

// Percentage-point drop between the earlier and later half of a domain's
// history that counts as a real regression, not noise.
const REGRESSION_DROP_POINTS = 15;

const PROVE_MASTERY_MAX_QUESTIONS = 12;
const PROVE_MASTERY_MIN_QUESTIONS = 4;

function recencyWeight(daysAgo, halfLifeDays) {
  halfLifeDays = halfLifeDays || RECENCY_HALF_LIFE_DAYS;
  return Math.pow(0.5, Math.max(0, daysAgo) / halfLifeDays);
}

function dayKey(ms) {
  const d = new Date(ms);
  return d.getUTCFullYear() + "-" + d.getUTCMonth() + "-" + d.getUTCDate();
}

function sortedByTime(entries) {
  return (entries || [])
    .filter((e) => e && typeof e.timestamp === "number")
    .slice()
    .sort((a, b) => a.timestamp - b.timestamp);
}

/**
 * Splits a domain's history chronologically in half and compares accuracy —
 * the same earlier/later-half pattern App.tsx's domainAccuracySplit already
 * uses for badge detection (hasDomainBreakthrough), just checking the
 * opposite direction (later worse than earlier, not better).
 * Needs >=6 attempts before a split is meaningful at all.
 */
function detectRegression(entries) {
  const sorted = sortedByTime(entries);
  if (sorted.length < 6) return { flagged: false, earlyAccuracy: null, lateAccuracy: null };
  const mid = Math.floor(sorted.length / 2);
  const early = sorted.slice(0, mid);
  const late = sorted.slice(mid);
  const earlyAccuracy = early.filter((e) => e.correct).length / early.length;
  const lateAccuracy = late.filter((e) => e.correct).length / late.length;
  const flagged = (earlyAccuracy - lateAccuracy) * 100 >= REGRESSION_DROP_POINTS;
  return {
    flagged,
    earlyAccuracy,
    lateAccuracy,
    reason: flagged
      ? `Accuracy dropped from ${Math.round(earlyAccuracy * 100)}% to ${Math.round(lateAccuracy * 100)}% in more recent attempts.`
      : null,
  };
}

/**
 * The core mastery number for one domain.
 *
 * entries: [{ correct: boolean, difficulty: "Easy"|"Medium"|"Hard",
 *             timestamp: number(ms), questionId?: string, format?: string }]
 * now: number(ms), defaults to Date.now()
 * opts.previousStatus: the domain's last known status (for the "once
 *   verified, stay verified unless it regresses" rule — see deriveStatus)
 *
 * Formula: reusing getAdaptiveEstimatedScore's Hard=3/Medium=2/Easy=1 weights
 * as a same-basis ratio (points earned / points attempted) would cancel out
 * (9/10 Easy = 90%, 7/10 Hard = 70% — Easy still "wins", backwards from what
 * the product needs). Instead normalize against what a perfect ALL-HARD run
 * over the same attempt count would score:
 *   pointsEarned = sum(correct_i * diffWeight_i * recencyWeight_i)
 *   pointsMax    = sum(3 * recencyWeight_i)
 *   masteryPct   = 100 * pointsEarned / pointsMax
 * Check: 10/10 Easy -> 33% (not 100%); 7/10 Hard -> 70% (beats 9/10 Easy's
 * 30%); only a perfect all-Hard run saturates 100%.
 */
function computeMasteryForDomain(entries, now, opts) {
  now = typeof now === "number" ? now : Date.now();
  opts = opts || {};
  const halfLife = opts.halfLifeDays || RECENCY_HALF_LIFE_DAYS;
  const list = (entries || []).filter((e) => e && typeof e.timestamp === "number");
  const total = list.length;

  if (total === 0) {
    return {
      masteryPct: 0,
      confidence: "insufficient",
      status: "weak",
      total: 0,
      hardAttempts: 0,
      hardAccuracy: null,
      distinctDays: 0,
      daysSinceLast: null,
      regressed: false,
      breakdown: { pointsEarned: 0, pointsMax: 0, hardAccuracy: null, earlyAccuracy: null, lateAccuracy: null, distinctDays: 0 },
    };
  }

  let pointsEarned = 0;
  let pointsMax = 0;
  let hardAttempts = 0;
  let hardCorrect = 0;
  let lastTimestamp = 0;
  const days = new Set();

  list.forEach((e) => {
    const daysAgo = (now - e.timestamp) / 86400000;
    const w = recencyWeight(daysAgo, halfLife);
    const diffWeight = DIFFICULTY_WEIGHT[e.difficulty] || DIFFICULTY_WEIGHT.Medium;
    if (e.correct) pointsEarned += diffWeight * w;
    pointsMax += MAX_DIFFICULTY_WEIGHT * w;
    if (e.difficulty === "Hard") {
      hardAttempts++;
      if (e.correct) hardCorrect++;
    }
    days.add(dayKey(e.timestamp));
    if (e.timestamp > lastTimestamp) lastTimestamp = e.timestamp;
  });

  const masteryPct = pointsMax > 0 ? Math.max(0, Math.min(100, Math.round((100 * pointsEarned) / pointsMax))) : 0;
  const distinctDays = days.size;
  const daysSinceLast = Math.round((now - lastTimestamp) / 86400000);
  const hardAccuracy = hardAttempts > 0 ? hardCorrect / hardAttempts : null;

  let confidence;
  if (total < CONFIDENCE_THRESHOLDS.INSUFFICIENT_TOTAL) confidence = "insufficient";
  else if (distinctDays < CONFIDENCE_THRESHOLDS.MEDIUM_MIN_DAYS || total <= CONFIDENCE_THRESHOLDS.LOW_TOTAL_MAX) confidence = "low";
  else if (
    total <= CONFIDENCE_THRESHOLDS.MEDIUM_TOTAL_MAX ||
    distinctDays < CONFIDENCE_THRESHOLDS.HIGH_MIN_DAYS ||
    daysSinceLast > CONFIDENCE_THRESHOLDS.HIGH_MAX_DAYS_SINCE_LAST
  ) confidence = "medium";
  else confidence = "high";

  const regression = detectRegression(list);
  const status = deriveStatus({
    masteryPct,
    hardAttempts,
    regressed: regression.flagged,
    previousStatus: opts.previousStatus || null,
  });

  return {
    masteryPct,
    confidence,
    status,
    total,
    hardAttempts,
    hardAccuracy,
    distinctDays,
    daysSinceLast,
    regressed: regression.flagged,
    breakdown: {
      pointsEarned: Math.round(pointsEarned * 100) / 100,
      pointsMax: Math.round(pointsMax * 100) / 100,
      hardAccuracy,
      earlyAccuracy: regression.earlyAccuracy,
      lateAccuracy: regression.lateAccuracy,
      distinctDays,
    },
  };
}

/**
 * weak -> practiced -> remediated (Prove-Mastery eligible) -> proved
 * (server-verified) -> mastered (cosmetic escalation) -> needsReview
 * (regression detected on a previously proved/mastered domain).
 *
 * `remediated` has a structural gate, not just a numeric one: >=3 Hard
 * attempts must exist, so an Easy-only streak can never reach Prove-Mastery
 * eligibility no matter how high masteryPct climbs.
 *
 * Once a domain has been server-verified (proved/mastered), masteryPct
 * alone can't un-verify it — only a detected regression can, via
 * needsReview — otherwise "prove mastery" would mean nothing (a single bad
 * session shouldn't erase a verified result, just flag it for review).
 */
function deriveStatus(input) {
  const masteryPct = input.masteryPct;
  const hardAttempts = input.hardAttempts;
  const regressed = input.regressed;
  const previousStatus = input.previousStatus;

  if (previousStatus === "proved" || previousStatus === "mastered") {
    return regressed ? "needsReview" : previousStatus;
  }
  // A domain flagged needsReview falls through to the normal masteryPct
  // ladder below: if it recovers to remediated-eligible, that's a "ready to
  // re-prove" state, not an automatic silent return to "proved" — re-earning
  // the verified status requires a fresh Prove Mastery pass.
  if (masteryPct < STATUS_THRESHOLDS.WEAK_MAX_PCT + 1) return "weak";
  if (masteryPct < STATUS_THRESHOLDS.PRACTICED_MAX_PCT + 1 && !(masteryPct >= 75 && hardAttempts >= STATUS_THRESHOLDS.REMEDIATED_MIN_HARD_ATTEMPTS)) return "practiced";
  if (masteryPct >= 75 && hardAttempts >= STATUS_THRESHOLDS.REMEDIATED_MIN_HARD_ATTEMPTS) return "remediated";
  return "practiced";
}

// ---------------------------------------------------------------------------
// Prove Mastery: dimension detectors. Each takes only data already reliably
// persisted today (no new instrumentation) and returns { flagged, reason }.
// ---------------------------------------------------------------------------

function detectDifficultyCoverageGap(entries) {
  const hard = (entries || []).filter((e) => e.difficulty === "Hard");
  if (hard.length < 3) {
    return { flagged: true, reason: `Only ${hard.length} hard-difficulty attempt${hard.length === 1 ? "" : "s"} so far — not enough evidence at the hardest tier.` };
  }
  const acc = hard.filter((e) => e.correct).length / hard.length;
  if (acc < 0.7) {
    return { flagged: true, reason: `${Math.round(acc * 100)}% accuracy on hard-difficulty questions — below the bar for this tier.` };
  }
  return { flagged: false };
}

function detectRecencyGap(entries, now, maxDays) {
  now = typeof now === "number" ? now : Date.now();
  maxDays = maxDays || RECENCY_HALF_LIFE_DAYS;
  const list = (entries || []).filter((e) => e && typeof e.timestamp === "number");
  if (list.length === 0) return { flagged: true, reason: "No practice recorded yet." };
  const last = Math.max.apply(null, list.map((e) => e.timestamp));
  const daysSince = (now - last) / 86400000;
  if (daysSince > maxDays) {
    return { flagged: true, reason: `Last practiced ${Math.round(daysSince)} days ago — evidence may be stale.` };
  }
  return { flagged: false };
}

function detectFormatDiversityGap(entries, availableFormats) {
  if (!availableFormats || availableFormats.length <= 1) return { flagged: false };
  const attempted = new Set((entries || []).map((e) => e.format).filter(Boolean));
  const missing = availableFormats.filter((f) => !attempted.has(f));
  if (missing.length > 0) {
    return { flagged: true, reason: `Never attempted in ${missing.join(", ")} format.`, missing };
  }
  return { flagged: false };
}

// Reuses the existing 7-value LLM-generated root-cause taxonomy from
// lib/aiTutorAnalysis.ts (calculation/grammar/vocab/comprehension/strategy/
// careless/timing) rather than inventing a new one, per the product ask to
// use the taxonomy that already exists. `careless`/`timing` are excluded —
// they're not concept gaps, so they shouldn't block Prove Mastery.
function detectMistakeTaxonomyGap(rootCauses) {
  const conceptCauses = (rootCauses || []).filter(
    (r) => r && r.rootCause && r.rootCause !== "careless" && r.rootCause !== "timing" && !r.resolvedSince
  );
  if (conceptCauses.length >= 2) {
    const counts = {};
    conceptCauses.forEach((r) => { counts[r.rootCause] = (counts[r.rootCause] || 0) + 1; });
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    return {
      flagged: true,
      reason: `Recurring "${top[0]}" mistakes haven't been resolved since they were identified.`,
      rootCause: top[0],
    };
  }
  return { flagged: false };
}

function detectFirstAttemptGap(entries) {
  const byQuestion = {};
  (entries || []).forEach((e) => {
    if (!e.questionId) return;
    if (!byQuestion[e.questionId] || e.timestamp < byQuestion[e.questionId].timestamp) byQuestion[e.questionId] = e;
  });
  const firstAttempts = Object.values(byQuestion);
  if (firstAttempts.length < 5) return { flagged: false };
  const firstAcc = firstAttempts.filter((e) => e.correct).length / firstAttempts.length;
  const overallAcc = entries.filter((e) => e.correct).length / entries.length;
  if (overallAcc - firstAcc >= 0.2) {
    return {
      flagged: true,
      reason: `${Math.round(firstAcc * 100)}% correct on first attempts vs. ${Math.round(overallAcc * 100)}% overall — may rely on repetition rather than first-look understanding.`,
    };
  }
  return { flagged: false };
}

function detectStreakInstability(entries) {
  const sorted = sortedByTime(entries);
  if (sorted.length < 8) return { flagged: false };
  let longest = 0;
  let current = 0;
  sorted.forEach((e) => {
    if (e.correct) { current++; longest = Math.max(longest, current); } else current = 0;
  });
  const overallAcc = sorted.filter((e) => e.correct).length / sorted.length;
  // A longest-streak cap of 2 mathematically bounds achievable accuracy at
  // ~67% (the best case is correct,correct,wrong repeating) — so the
  // threshold here has to sit below that ceiling, not above it, or this
  // condition could never fire on real data.
  if (overallAcc >= 0.65 && longest < 3) {
    return {
      flagged: true,
      reason: `Longest correct streak is only ${longest} despite ${Math.round(overallAcc * 100)}% overall accuracy — performance may be inconsistent question-to-question.`,
    };
  }
  return { flagged: false };
}

/**
 * input: { entries, now, rootCauses, availableFormats }
 * Returns all 7 dimensions with their flagged/reason state.
 */
function evaluateDimensions(input) {
  input = input || {};
  const regression = detectRegression(input.entries);
  return [
    { key: "difficultyCoverage", label: "Difficult/non-routine problems", ...detectDifficultyCoverageGap(input.entries) },
    { key: "recency", label: "Timed, recent practice", ...detectRecencyGap(input.entries, input.now) },
    { key: "formatDiversity", label: "Multiple question formats", ...detectFormatDiversityGap(input.entries, input.availableFormats) },
    { key: "regression", label: "Sustained (not slipping) performance", flagged: regression.flagged, reason: regression.reason },
    { key: "mistakeTaxonomy", label: "Previously problematic patterns", ...detectMistakeTaxonomyGap(input.rootCauses) },
    { key: "firstAttempt", label: "First-look understanding", ...detectFirstAttemptGap(input.entries) },
    { key: "streakStability", label: "Consistency across sessions", ...detectStreakInstability(input.entries) },
  ];
}

/**
 * Dynamically decides what a Prove Mastery check needs to cover — only the
 * dimensions with weak evidence, never a fixed question count. If nothing
 * is flagged, still runs a small confirmation pass on the two dimensions
 * most prone to silently decaying after a domain looks solid (difficulty
 * coverage and regression).
 */
function buildProveMasteryPlan(input) {
  const dimensions = evaluateDimensions(input);
  const flagged = dimensions.filter((d) => d.flagged);
  const toTarget = flagged.length > 0
    ? flagged
    : dimensions.filter((d) => d.key === "difficultyCoverage" || d.key === "regression");

  const targets = toTarget.map((d) => {
    switch (d.key) {
      case "difficultyCoverage": return { dimension: d.key, difficulty: "Hard", count: 4 };
      case "recency": return { dimension: d.key, difficulty: "Medium", count: 3 };
      case "formatDiversity": return { dimension: d.key, format: (d.missing || [])[0] || null, count: 3 };
      case "regression": return { dimension: d.key, difficulty: "Medium", count: 3 };
      case "mistakeTaxonomy": return { dimension: d.key, rootCause: d.rootCause || null, count: 3 };
      case "firstAttempt": return { dimension: d.key, questionSource: "new", count: 3 };
      case "streakStability": return { dimension: d.key, count: 3 };
      default: return { dimension: d.key, count: 2 };
    }
  });

  const questionCount = Math.min(
    PROVE_MASTERY_MAX_QUESTIONS,
    Math.max(PROVE_MASTERY_MIN_QUESTIONS, targets.reduce((sum, t) => sum + t.count, 0))
  );

  return { dimensions, flaggedDimensions: flagged.map((d) => d.key), targets, questionCount };
}

/**
 * Re-evaluates dimensions against post-attempt data and returns the final
 * verdict + a data-grounded reason. Called both client-side (for an instant
 * preview) and server-side (as the trusted verdict — see api/prove-mastery.js).
 */
function evaluateVerdict(input) {
  const dimensions = evaluateDimensions(input);
  const failing = dimensions.filter((d) => d.flagged);
  if (failing.length === 0) {
    return {
      verdict: "VERIFIED",
      reason: "Consistent accuracy across difficulty, recency, format, and consistency checks.",
      dimensions,
      failingDimensions: [],
    };
  }
  return {
    verdict: "NOT_YET_VERIFIED",
    reason: failing.map((d) => d.reason).join(" "),
    dimensions,
    failingDimensions: failing.map((d) => d.key),
  };
}

module.exports = {
  DIFFICULTY_WEIGHT,
  MAX_DIFFICULTY_WEIGHT,
  RECENCY_HALF_LIFE_DAYS,
  CONFIDENCE_THRESHOLDS,
  STATUS_THRESHOLDS,
  REGRESSION_DROP_POINTS,
  recencyWeight,
  computeMasteryForDomain,
  deriveStatus,
  detectRegression,
  detectDifficultyCoverageGap,
  detectRecencyGap,
  detectFormatDiversityGap,
  detectMistakeTaxonomyGap,
  detectFirstAttemptGap,
  detectStreakInstability,
  evaluateDimensions,
  buildProveMasteryPlan,
  evaluateVerdict,
};
