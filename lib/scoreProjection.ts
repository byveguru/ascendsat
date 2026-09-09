// AI Projected Score Intelligence — pure, client-only logic layered on top
// of the existing 3PL/EAP IRT ability-estimation engine (lib/irtScoring.ts,
// lib/diagnosticScoring.ts) and Mastery Engine 2.0 (lib/masteryEngine.js).
// This module does NOT recompute the score itself — `currentAbilityEstimate`
// (App.tsx's recomputeAbilityEstimate) already does that, and is the single
// most mathematically rigorous piece of prediction infra in this app. What's
// missing, and what this module adds, is: (1) a categorical confidence label
// (today there's only a numeric confidence *range*, no High/Medium/Low tied
// to evidence volume/spread), (2) a real, data-grounded explanation for why
// the projection moved, and (3) the three projection-style presets
// (conservative/balanced/optimistic) that tune how fast newly-improving
// evidence gets incorporated into that same IRT update — never a flat
// point offset, per the product requirement that strictness must not mean
// fabricating scores.
"use strict";

export type ProjectionStyle = "conservative" | "balanced" | "optimistic";
export type ProjectionConfidence = "insufficient" | "low" | "medium" | "high";

// A flat multiplier applied to every correct-answer response's (already
// recency-weighted) evidence weight, passed through to
// lib/diagnosticScoring.ts's buildPracticeResponseBuckets. Damping every
// correct response below 1.0 means it takes proportionally more repeated
// correct evidence to move the ability estimate the same amount a neutral
// (1.0) weighting would — that's what "require stronger evidence before
// crediting improvement" actually means mechanically. The negative
// (incorrect-answer) multiplier is 1.0 for every style with no exception, so
// a "conservative" setting can never dampen how quickly genuine regression
// shows up — decline is always reflected at full weight, satisfying "never
// artificially trend upward" / "allowed to decrease" as style-independent
// guarantees. Recency decay itself (the existing 21-day half-life) is
// untouched by style entirely.
export const PROJECTION_STYLE_EVIDENCE_WEIGHT: Record<ProjectionStyle, { positiveMultiplier: number; negativeMultiplier: number }> = {
  conservative: { positiveMultiplier: 0.7, negativeMultiplier: 1 },
  balanced: { positiveMultiplier: 1, negativeMultiplier: 1 },
  optimistic: { positiveMultiplier: 1.15, negativeMultiplier: 1 },
};

export const PROJECTION_STYLE_META: Record<ProjectionStyle, { label: string; description: string; recommended?: boolean }> = {
  conservative: {
    label: "Conservative (Recommended)",
    description: "Give me a stricter estimate. I'd rather see a realistic lower projection than get my hopes up.",
    recommended: true,
  },
  balanced: {
    label: "Balanced",
    description: "Give me your best overall estimate based on my performance.",
  },
  optimistic: {
    label: "Optimistic",
    description: "Give me a projection that gives more weight to my improvement and potential.",
  },
};

// "Conservative" is labeled (Recommended) in the picker UI (see
// PROJECTION_STYLE_META above), but the fallback used before a student has
// chosen is still "balanced" — matching the product spec's explicit "make
// Balanced the default" instruction. Recommended is a nudge in the UI, not a
// forced pre-selection.
export const DEFAULT_PROJECTION_STYLE: ProjectionStyle = "balanced";

const CONFIDENCE_RULES = {
  LOW_MIN_RESPONSES: 30,
  LOW_MIN_DAYS: 3,
  LOW_MIN_DIFFICULTY_BANDS: 2,
  HIGH_MIN_RESPONSES: 100,
  HIGH_MIN_DAYS: 5,
  HIGH_MIN_DIFFICULTY_BANDS: 3,
  HIGH_MIN_MASTERY_COVERAGE: 0.5, // fraction of domains with at least "medium" mastery confidence
  HIGH_MAX_DAYS_SINCE_ACTIVITY: 21,
};

export type ConfidenceInput = {
  totalResponses: number;
  distinctDays: number;
  hasTimedResponses: boolean;
  hasUntimedResponses: boolean;
  difficultyBandsCovered: number; // 0-3
  domainsWithSufficientMastery: number;
  totalDomains: number;
  hasFullPracticeTest: boolean;
  daysSinceLastActivity: number | null;
};

/**
 * A student with 15 questions and one session should never read the same
 * "confident" as one with hundreds of responses across weeks and a full
 * practice test — this function is the thing standing between those two.
 * Returns the tier plus the specific reasons it didn't reach the next one up,
 * so the UI can show real "what would raise confidence" text instead of a
 * bare label.
 */
export function computeProjectionConfidence(input: ConfidenceInput): { confidence: ProjectionConfidence; gaps: string[] } {
  const {
    totalResponses, distinctDays, hasTimedResponses, hasUntimedResponses,
    difficultyBandsCovered, domainsWithSufficientMastery, totalDomains,
    hasFullPracticeTest, daysSinceLastActivity,
  } = input;

  if (totalResponses === 0) return { confidence: "insufficient", gaps: ["No practice recorded yet"] };

  const masteryCoverage = totalDomains > 0 ? domainsWithSufficientMastery / totalDomains : 0;
  const gaps: string[] = [];

  if (totalResponses < CONFIDENCE_RULES.LOW_MIN_RESPONSES) gaps.push("more completed questions");
  if (distinctDays < CONFIDENCE_RULES.LOW_MIN_DAYS) gaps.push("practice spread across more days");
  if (difficultyBandsCovered < CONFIDENCE_RULES.LOW_MIN_DIFFICULTY_BANDS) gaps.push("coverage across more difficulty levels");

  if (gaps.length > 0) return { confidence: "low", gaps };

  const mediumGaps: string[] = [];
  if (totalResponses < CONFIDENCE_RULES.HIGH_MIN_RESPONSES) mediumGaps.push("more completed questions");
  if (distinctDays < CONFIDENCE_RULES.HIGH_MIN_DAYS) mediumGaps.push("practice across more sessions");
  if (difficultyBandsCovered < CONFIDENCE_RULES.HIGH_MIN_DIFFICULTY_BANDS) mediumGaps.push("hard-difficulty practice");
  if (masteryCoverage < CONFIDENCE_RULES.HIGH_MIN_MASTERY_COVERAGE) mediumGaps.push("more evidence across your weaker skills");
  if (!hasTimedResponses) mediumGaps.push("timed practice");
  if (daysSinceLastActivity == null || daysSinceLastActivity > CONFIDENCE_RULES.HIGH_MAX_DAYS_SINCE_ACTIVITY) mediumGaps.push("more recent practice");
  if (!hasFullPracticeTest && !hasUntimedResponses) mediumGaps.push("a full-length practice test");

  if (mediumGaps.length > 0) return { confidence: "medium", gaps: mediumGaps };
  return { confidence: "high", gaps: [] };
}

export type DomainDelta = {
  domain: string;
  deltaAccuracy: number; // percentage points
  deltaMasteryPct: number | null;
  direction: "up" | "down" | "flat";
};

/**
 * Builds a real, data-grounded explanation for a projection change by
 * diffing domain-level accuracy/mastery between the previous and current
 * snapshot — never a templated guess. Returns null when there's nothing
 * meaningful to say (first-ever projection, or the change is noise-sized),
 * so the UI only shows an explanation when one actually exists.
 */
export function explainProjectionChange(
  prevTotal: number | null,
  nextTotal: number,
  domainDeltas: DomainDelta[],
  noiseThreshold = 10
): { direction: "up" | "down" | "flat"; text: string } | null {
  if (prevTotal == null) return null;
  const delta = nextTotal - prevTotal;
  if (Math.abs(delta) < noiseThreshold) return null;

  const direction: "up" | "down" | "flat" = delta > 0 ? "up" : "down";
  const relevant = domainDeltas
    .filter((d) => d.direction === direction && Math.abs(d.deltaAccuracy) >= 3)
    .sort((a, b) => Math.abs(b.deltaAccuracy) - Math.abs(a.deltaAccuracy))
    .slice(0, 2);

  if (relevant.length === 0) {
    return {
      direction,
      text: direction === "up"
        ? "Your overall practice accuracy improved since your last projection."
        : "Your overall practice accuracy declined since your last projection.",
    };
  }

  const domainNames = relevant.map((d) => d.domain).join(" and ");
  const verb = direction === "up" ? "improved" : "declined";
  const extra = relevant.some((d) => d.deltaMasteryPct != null && Math.abs(d.deltaMasteryPct) >= 5)
    ? " Your mastery level in these areas moved the same direction across multiple sessions."
    : "";
  return {
    direction,
    text: `Your recent performance ${verb} in ${domainNames}.${extra}`,
  };
}

/**
 * Gate for whether a new snapshot is worth appending to the persisted
 * Projected Score History — logging every quiz's tiny wiggle would turn the
 * history into noise and make the "don't whiplash" requirement visible in
 * the wrong place (the log itself). Only a real point move or a confidence-
 * tier change counts as a milestone worth keeping.
 */
export function isMeaningfulProjectionChange(
  prevTotal: number | null,
  nextTotal: number,
  prevConfidence: ProjectionConfidence | null,
  nextConfidence: ProjectionConfidence,
  pointThreshold = 20
): boolean {
  if (prevTotal == null) return true; // first snapshot is always worth recording
  if (Math.abs(nextTotal - prevTotal) >= pointThreshold) return true;
  if (prevConfidence !== nextConfidence) return true;
  return false;
}
