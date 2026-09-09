// @ts-nocheck
/** Diagnostic scoring pipeline � groups responses by section and runs 3PL EAP. */

import type { DiagnosticExamQuestion } from "../diagnosticExamQuestions";
import type { TestConfig } from "../testConfig";
import { fallbackFromDifficultyLabel, getItemCalibration } from "./diagnosticItemCalibration";
import {
  ACT_SCALE,
  estimateEap,
  SAT_SCALE,
  thetaIntervalToScoreInterval,
  thetaToScore,
  type IrtResponse,
  type ScaleAnchors,
} from "./irtScoring";

export type DiagnosticIrtResult = {
  sectionScores: Record<string, number>;
  totalScore: number;
  confidenceRange: { lower: number; upper: number };
  thetaValues: Record<string, number>;
  semValues: Record<string, number>;
  method: "eap_3pl";
};

/** Map testConfig section id to calibration section key */
export function sectionKeyForDomain(domain: string, cfg: TestConfig): string {
  const sec = cfg.sections.find((s) => s.domains.includes(domain));
  if (!sec) return "math";
  if (cfg.id === "sat") {
    return sec.id === "math" ? "math" : "reading_writing";
  }
  // ACT
  if (sec.id === "english") return "english";
  if (sec.id === "math") return "math";
  if (sec.id === "reading") return "reading";
  return sec.id;
}

function scaleForTest(cfg: TestConfig): ScaleAnchors {
  return cfg.id === "act" ? ACT_SCALE : SAT_SCALE;
}

type SectionBucket = {
  label: string;
  sectionKey: string;
  responses: IrtResponse[];
};

/** Build per-section response buckets with IRT parameters */
function buildSectionBuckets(
  questions: DiagnosticExamQuestion[],
  answers: Record<number, number> | number[],
  cfg: TestConfig
): SectionBucket[] {
  const compositeSections = cfg.sections.filter((s) => s.inComposite);
  const buckets: Record<string, SectionBucket> = {};

  compositeSections.forEach((s) => {
    const sectionKey =
      cfg.id === "sat"
        ? s.id === "math"
          ? "math"
          : "reading_writing"
        : s.id;
    buckets[s.label] = { label: s.label, sectionKey, responses: [] };
  });

  questions.forEach((q, i) => {
    const sec = cfg.sections.find((s) => s.domains.includes(q.domain));
    if (!sec || !sec.inComposite) return;

    const answerVal = Array.isArray(answers) ? answers[i] : answers[i];
    if (answerVal === undefined || answerVal === null) return;

    const sectionKey = sectionKeyForDomain(q.domain, cfg);
    const cal = getItemCalibration(q.id, q.difficulty, sectionKey, q.irt);
    const correct = answerVal === q.answer;

    buckets[sec.label].responses.push({
      a: cal.discrimination,
      b: cal.difficulty,
      c: cal.guessing,
      correct,
    });
  });

  return Object.values(buckets);
}

export function aggregateConfidenceRange(
  sectionScoreRanges: { lower: number; upper: number }[],
  cfg: TestConfig
): { lower: number; upper: number } {
  if (cfg.id === "sat") {
    const lower = sectionScoreRanges.reduce((s, r) => s + r.lower, 0);
    const upper = sectionScoreRanges.reduce((s, r) => s + r.upper, 0);
    return { lower, upper };
  }
  // ACT composite = rounded mean of section scores
  const n = sectionScoreRanges.length || 1;
  const lower = Math.round(sectionScoreRanges.reduce((s, r) => s + r.lower, 0) / n);
  const upper = Math.round(sectionScoreRanges.reduce((s, r) => s + r.upper, 0) / n);
  return {
    lower: Math.max(cfg.scale.compositeMin, lower),
    upper: Math.min(cfg.scale.compositeMax, upper),
  };
}

/** Score a diagnostic exam with 3PL IRT + EAP */
export function scoreDiagnosticWithIrt(
  questions: DiagnosticExamQuestion[],
  answers: Record<number, number> | number[],
  cfg: TestConfig
): DiagnosticIrtResult {
  const scale = scaleForTest(cfg);
  const buckets = buildSectionBuckets(questions, answers, cfg);

  const sectionScores: Record<string, number> = {};
  const thetaValues: Record<string, number> = {};
  const semValues: Record<string, number> = {};
  const scoreRanges: { lower: number; upper: number }[] = [];

  buckets.forEach((bucket) => {
    const eap = estimateEap(bucket.responses);
    const score = thetaToScore(eap.theta, scale);
    const scoreCi = thetaIntervalToScoreInterval(eap.credibleInterval, scale);

    sectionScores[bucket.label] = score;
    thetaValues[bucket.sectionKey] = Math.round(eap.theta * 100) / 100;
    semValues[bucket.sectionKey] = Math.round(eap.sem * 100) / 100;
    scoreRanges.push(scoreCi);
  });

  const sectionScoreValues = cfg.sections
    .filter((s) => s.inComposite)
    .map((s) => sectionScores[s.label] ?? scale.mean);

  const totalScore = cfg.compositeFromSections(sectionScoreValues);
  const confidenceRange = aggregateConfidenceRange(scoreRanges, cfg);

  return {
    sectionScores,
    totalScore,
    confidenceRange,
    thetaValues,
    semValues,
    method: "eap_3pl",
  };
}

/** Recency weight for a scoreHistory entry: half-life decay so a response
    ~3 weeks old counts half as much as one from today. Matches typical prep
    cadence (several sessions/week) without practice history vanishing after
    a single missed week. */
function scoreHistoryEntryWeight(entry: any, now: number, halfLifeDays: number): number {
  const raw = entry?.createdAt;
  const ms = raw?.toDate ? raw.toDate().getTime() : (typeof raw?.seconds === "number" ? raw.seconds * 1000 : now);
  const daysAgo = Math.max(0, (now - ms) / 86400000);
  return 0.5 ** (daysAgo / halfLifeDays);
}

/** Build per-section IRT responses from ongoing practice (scoreHistory), for
    a sequential ability update. Practice-bank questions have no per-item IRT
    calibration, so a/b/c come from the difficulty-label fallback preset.

    `halfLifeDays` is unchanged (single number, still 21 by default) — recency
    decay itself doesn't vary by projection style. `evidenceWeight` is new and
    optional: a flat multiplier applied on top of the recency weight,
    separately for correct vs. incorrect responses. This is what powers the
    AI Projected Score Intelligence "projection style" preference (see
    lib/scoreProjection.ts's PROJECTION_STYLE_EVIDENCE_WEIGHT) — e.g.
    "conservative" damps every correct response's weight below 1, so it takes
    proportionally more repeated correct evidence to move the estimate the
    same amount a default (1.0) weighting would; the negative multiplier stays
    1.0 for every style, so regression is never dampened. (An earlier version
    of this tried varying the HALF-LIFE instead of a flat multiplier, but
    since a brand-new response's recency weight is ~1 regardless of half-life,
    that approach didn't actually slow down how fast a fresh burst of correct
    answers got credited — only how long OLD correct answers lingered. A flat
    per-response multiplier is what actually implements "requires more
    repeated evidence.") Defaults to {positive:1, negative:1}, so calling this
    with no 5th argument is byte-for-byte the original behavior. */
export function buildPracticeResponseBuckets(
  scoreHistory: any[],
  cfg: TestConfig,
  now: number = Date.now(),
  halfLifeDays: number = 21,
  evidenceWeight: { positiveMultiplier: number; negativeMultiplier: number } = { positiveMultiplier: 1, negativeMultiplier: 1 }
): Record<string, IrtResponse[]> {
  const buckets: Record<string, IrtResponse[]> = {};
  (scoreHistory || []).forEach((entry) => {
    const recencyWeight = scoreHistoryEntryWeight(entry, now, halfLifeDays);
    (entry?.questions || []).forEach((q: any) => {
      if (!q?.domain) return;
      const sec = cfg.sections.find((s) => s.domains.includes(q.domain));
      if (!sec || !sec.inComposite) return;
      const sectionKey = sectionKeyForDomain(q.domain, cfg);
      const cal = fallbackFromDifficultyLabel(q.difficulty || "Medium", sectionKey as any);
      const correct = q.userAnswer === q.correctAnswer;
      const weight = recencyWeight * (correct ? evidenceWeight.positiveMultiplier : evidenceWeight.negativeMultiplier);
      if (!buckets[sectionKey]) buckets[sectionKey] = [];
      buckets[sectionKey].push({ a: cal.discrimination, b: cal.difficulty, c: cal.guessing, correct, weight });
    });
  });
  return buckets;
}

/** Sequential Bayesian update: treat a prior diagnostic's theta/sem per
    section as the EAP prior, fold in recency-weighted practice responses,
    and re-estimate. Always re-derives from the ORIGINAL diagnostic prior
    (never chains estimate-over-estimate) so SEM can't artificially collapse
    just from repeated recomputation. */
export function updateAbilityEstimate(
  diagnosticTheta: Record<string, number>,
  diagnosticSem: Record<string, number>,
  practiceBuckets: Record<string, IrtResponse[]>,
  cfg: TestConfig
): DiagnosticIrtResult & { practiceResponseCounts: Record<string, number> } {
  const scale = scaleForTest(cfg);
  const compositeSections = cfg.sections.filter((s) => s.inComposite);

  const sectionScores: Record<string, number> = {};
  const thetaValues: Record<string, number> = {};
  const semValues: Record<string, number> = {};
  const scoreRanges: { lower: number; upper: number }[] = [];
  const practiceResponseCounts: Record<string, number> = {};

  compositeSections.forEach((s) => {
    const sectionKey = cfg.id === "sat" ? (s.id === "math" ? "math" : "reading_writing") : s.id;
    const priorMean = diagnosticTheta[sectionKey] ?? 0;
    const priorSd = Math.max(diagnosticSem[sectionKey] ?? 1, 0.3);
    const responses = practiceBuckets[sectionKey] || [];

    const eap = estimateEap(responses, { mean: priorMean, sd: priorSd });
    const score = thetaToScore(eap.theta, scale);
    const scoreCi = thetaIntervalToScoreInterval(eap.credibleInterval, scale);

    sectionScores[s.label] = score;
    thetaValues[sectionKey] = Math.round(eap.theta * 100) / 100;
    semValues[sectionKey] = Math.round(eap.sem * 100) / 100;
    scoreRanges.push(scoreCi);
    practiceResponseCounts[sectionKey] = responses.length;
  });

  const sectionScoreValues = compositeSections.map((s) => sectionScores[s.label] ?? scale.mean);
  const totalScore = cfg.compositeFromSections(sectionScoreValues);
  const confidenceRange = aggregateConfidenceRange(scoreRanges, cfg);

  return {
    sectionScores,
    totalScore,
    confidenceRange,
    thetaValues,
    semValues,
    method: "eap_3pl_updated",
    practiceResponseCounts,
  };
}
