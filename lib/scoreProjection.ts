// Evidence-based estimate metadata. Confidence labels below are product
// heuristics, not empirically validated probabilities of an official result.
"use strict";

export type ProjectionStyle = "conservative" | "balanced" | "optimistic";
export type ProjectionConfidence = "insufficient" | "low" | "medium" | "high";

// Preferences change responsiveness symmetrically. Correct and incorrect
// answers must have the same reliability: asymmetric weights bias ability.
export const PROJECTION_STYLE_EVIDENCE_WEIGHT: Record<ProjectionStyle, { positiveMultiplier: number; negativeMultiplier: number }> = {
  conservative: { positiveMultiplier: 0.7, negativeMultiplier: 0.7 },
  balanced: { positiveMultiplier: 1, negativeMultiplier: 1 },
  optimistic: { positiveMultiplier: 1.15, negativeMultiplier: 1.15 },
};

export const PROJECTION_STYLE_META: Record<ProjectionStyle, { label: string; description: string; recommended?: boolean }> = {
  conservative: {
    label: "Conservative (Recommended)",
    description: "Let new practice change my estimate more gradually, in either direction.",
    recommended: true,
  },
  balanced: {
    label: "Balanced",
    description: "Give me your best overall estimate based on my performance.",
  },
  optimistic: {
    label: "Optimistic",
    description: "Let recent practice change my estimate a little faster, in either direction.",
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
  HIGH_MIN_RESPONSES: 80,
  HIGH_MIN_DAYS: 5,
  HIGH_MIN_DIFFICULTY_BANDS: 3,
  HIGH_MIN_MASTERY_COVERAGE: 0.75, // fraction of domains with at least "medium" mastery confidence
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

  if (!(totalResponses > 0)) return { confidence: "insufficient", gaps: ["No practice recorded yet"] };

  const masteryCoverage = totalDomains > 0 ? domainsWithSufficientMastery / totalDomains : 0;
  const gaps: string[] = [];

  if (totalResponses < CONFIDENCE_RULES.LOW_MIN_RESPONSES) gaps.push("more completed questions");
  if (distinctDays < CONFIDENCE_RULES.LOW_MIN_DAYS) gaps.push("practice spread across more days");
  if (difficultyBandsCovered < CONFIDENCE_RULES.LOW_MIN_DIFFICULTY_BANDS) gaps.push("coverage across more difficulty levels");

  if (masteryCoverage < 0.25) gaps.push("evidence across more test domains");
  if (daysSinceLastActivity == null || daysSinceLastActivity > 42) gaps.push("recent dated practice");
  if (gaps.length > 0) return { confidence: "low", gaps };

  const mediumGaps: string[] = [];
  if (totalResponses < CONFIDENCE_RULES.HIGH_MIN_RESPONSES) mediumGaps.push("more completed questions");
  if (distinctDays < CONFIDENCE_RULES.HIGH_MIN_DAYS) mediumGaps.push("practice across more sessions");
  if (difficultyBandsCovered < CONFIDENCE_RULES.HIGH_MIN_DIFFICULTY_BANDS) mediumGaps.push("hard-difficulty practice");
  if (masteryCoverage < CONFIDENCE_RULES.HIGH_MIN_MASTERY_COVERAGE) mediumGaps.push("more evidence across your weaker skills");
  if (!hasTimedResponses) mediumGaps.push("timed practice");
  if (daysSinceLastActivity == null || daysSinceLastActivity > CONFIDENCE_RULES.HIGH_MAX_DAYS_SINCE_ACTIVITY) mediumGaps.push("more recent practice");
  if (!hasFullPracticeTest) mediumGaps.push("a full-length practice test");

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
        ? "Your estimate increased as the available evidence was updated."
        : "Your estimate decreased as the available evidence was updated.",
    };
  }

  const domainNames = relevant.map((d) => d.domain).join(" and ");
  const verb = direction === "up" ? "improved" : "declined";
  const extra = relevant.some((d) => d.deltaMasteryPct != null && (direction === "up" ? d.deltaMasteryPct >= 5 : d.deltaMasteryPct <= -5))
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
