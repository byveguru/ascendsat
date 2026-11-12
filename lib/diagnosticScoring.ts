// @ts-nocheck
import { isNumericQuestion, isQuestionCorrect, hasQuestionResponse, numericRawResponse } from "./numericResponse";

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

export function scaleForTest(cfg: TestConfig): ScaleAnchors {
  if (cfg.id === "sat") return SAT_SCALE;
  if (cfg.id === "act") return ACT_SCALE;
  // Preserve AP/other test bounds; these generic anchors are heuristic.
  const min=cfg.scale.sectionMin,max=cfg.scale.sectionMax;
  return {mean:(min+max)/2,sd:Math.max((max-min)/5,0.1),min,max,step:cfg.scale.step||1};
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

  const seen = new Set();
  questions.forEach((q, i) => {
    const sec = cfg.sections.find((s) => s.domains.includes(q.domain));
    if (!sec || !sec.inComposite) return;

    const answerVal = Array.isArray(answers) ? answers[i] : answers[i];
    const identity = `${sec.id}|${q.id || q.question || i}`;
    if (seen.has(identity)) return;
    seen.add(identity);

    const sectionKey = sectionKeyForDomain(q.domain, cfg);
    const cal = getItemCalibration(q.id, q.difficulty, sectionKey, q.irt);
    const correct = isQuestionCorrect(q,answerVal);

    buckets[sec.label].responses.push({
      a: cal.discrimination,
      b: cal.difficulty,
      c: isNumericQuestion(q)?0:cal.guessing,
      correct, domain: q.domain, weight: 0.5,
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
  const sectionRanges: Record<string, {lower:number;upper:number}> = {};

  buckets.forEach((bucket) => {
    const eap = estimateEap(bucket.responses);
    const section=cfg.sections.find(s=>s.label===bucket.label);
    const covered=new Set(bucket.responses.map(r=>r.domain));
    const coverage=covered.size/Math.max(1,section?.domains.length||1);
    const sectionTheta=eap.theta*coverage;
    const score = thetaToScore(sectionTheta, scale);
    // The calibration table is heuristic, so do not expose arbitrarily narrow
    // conditional IRT intervals as validated official-score uncertainty.
    const modelSd = Math.sqrt(coverage*eap.sem ** 2 + (1-coverage) + 0.35 ** 2);
    const scoreCi = thetaIntervalToScoreInterval({lower:sectionTheta-1.96*modelSd,upper:sectionTheta+1.96*modelSd}, scale);

    sectionScores[bucket.label] = score;
    thetaValues[bucket.sectionKey] = Math.round(sectionTheta * 1000) / 1000;
    semValues[bucket.sectionKey] = Math.round(modelSd * 1000) / 1000;
    sectionRanges[bucket.label] = scoreCi;
    scoreRanges.push(scoreCi);
  });

  const sectionScoreValues = cfg.sections
    .filter((s) => s.inComposite)
    .map((s) => sectionScores[s.label] ?? scale.mean);

  const totalScore = cfg.compositeFromSections(sectionScoreValues);
  const confidenceRange = aggregateConfidenceRange(scoreRanges, cfg);

  return {
    sectionScores,
    sectionRanges,
    totalScore,
    confidenceRange,
    thetaValues,
    semValues,
    method: "eap_3pl",
    estimatorVersion: 3, modelVersion: 3,
    uncertaintyKind: "heuristic_model_interval",
  };
}

/** Unknown timestamps are not fresh evidence. Supports Firestore, ISO and Date. */
export function evidenceTimestamp(raw: any): number | null {
  const value = raw?.toDate ? raw.toDate().getTime() : typeof raw?.seconds === "number" ? raw.seconds * 1000 : raw instanceof Date ? raw.getTime() : typeof raw === "number" ? raw : typeof raw === "string" ? Date.parse(raw) : NaN;
  return Number.isFinite(value) && value > 0 ? value : null;
}

/** These are heuristic uncertainty allowances, not empirical calibration. */
const PRACTICE_RELIABILITY = 0.5;
const MODEL_SD = 0.35;

/** Only identifiable academic items enter the score estimator. Synthetic lesson,
 * vocabulary and reward rows remain available for habit/mastery features. */
export function buildPracticeResponseBuckets(
  scoreHistory: any[], cfg: TestConfig, now: number = Date.now(), halfLifeDays = 21,
  evidenceWeight = { positiveMultiplier: 1, negativeMultiplier: 1 }
): Record<string, IrtResponse[]> {
  const buckets = {};
  const candidates = [];
  const seenEvents = new Set();
  for (const entry of scoreHistory || []) {
    if (entry?.testType && entry.testType !== cfg.id) continue;
    if (/diagnostic|vocab|teach_back|flashcard/i.test(String(entry?.source || ""))) continue;
    const timestamp = evidenceTimestamp(entry?.createdAt);
    if (timestamp != null && timestamp > now + 86400000) continue;
    const age = timestamp == null ? 42 : Math.max(0, (now - timestamp) / 86400000);
    const recency = 0.5 ** (age / (Number.isFinite(halfLifeDays) && halfLifeDays > 0 ? halfLifeDays : 21));
    const fullTest = entry?.source === "fullTest";
    const requiredBySection = {};
    (cfg.fullTestModules || []).filter(m=>!m.optional).forEach(m=>{requiredBySection[m.section]=(requiredBySection[m.section]||0)+m.count;});
    const representativeFullTest = fullTest && Object.keys(requiredBySection).length>0 && Object.entries(requiredBySection).every(([label,count])=>{
      const sec=cfg.sections.find(s=>s.label===label);
      return sec && (entry.questions||[]).filter(q=>sec.domains.includes(q.domain)).length>=count;
    });
    for (const q of entry?.questions || []) {
      if (!q?.domain || q.format === "frq" || /vocabulary|concept review/i.test(q.domain)) continue;
      const sec = cfg.sections.find(s => s.domains.includes(q.domain) && s.inComposite);
      if (!sec) continue;
      const answered = hasQuestionResponse(q,isNumericQuestion(q)?numericRawResponse(q,q.userAnswer):q.userAnswer);
      // Administered full-test omissions are evidence; browsing/skipping practice is not.
      if ((!answered && !fullTest) || q.correctAnswer == null) continue;
      const stem = String(q.question || q.prompt || "").replace(/\s+/g, " ").trim().toLowerCase();
      const identity = stem ? `${q.domain}|${stem}|${JSON.stringify((q.choices || []).map(choice=>String(choice).replace(/\s+/g," ").trim().toLowerCase()).sort())}` : q.id != null ? `${q.domain}|id:${q.id}` : null;
      if (!identity) continue; // legacy summary-only rows cannot be safely deduplicated
      const eventKey = `${identity}|${timestamp ?? "unknown"}`;
      if (seenEvents.has(eventKey)) continue;
      seenEvents.add(eventKey);
      const sectionKey = sectionKeyForDomain(q.domain, cfg);
      const cal = getItemCalibration(q.calibrationId ?? q.id ?? "", q.difficulty || "Medium", sectionKey as any, q.irt);
      if (!Number.isFinite(cal.discrimination) || cal.discrimination <= 0 || !Number.isFinite(cal.difficulty) || !Number.isFinite(cal.guessing) || cal.guessing < 0 || cal.guessing >= 1) continue;
      const correct = answered && isQuestionCorrect(q,isNumericQuestion(q)?numericRawResponse(q,q.userAnswer):q.userAnswer);
      const multiplier = correct ? evidenceWeight.positiveMultiplier : evidenceWeight.negativeMultiplier;
      candidates.push({ identity, timestamp, domain:q.domain, sectionKey, difficulty:String(q.difficulty || "Medium").toLowerCase(), timed:fullTest || entry.timed === true || entry.isTimed === true, fullTest:representativeFullTest, a:cal.discrimination, b:cal.difficulty, c:isNumericQuestion(q)||q.questionType === "SPR" ? 0 : cal.guessing, correct, weight:recency * PRACTICE_RELIABILITY * Math.max(0, Number.isFinite(multiplier) ? multiplier : 1) });
    }
  }
  // Latest response gets the main weight. All earlier repeats share a bounded
  // 0.25 budget, preventing memorizing one item from becoming many independent items.
  candidates.sort((a,b)=>(b.timestamp ?? 0)-(a.timestamp ?? 0));
  const repeatCounts = new Map();
  for (const r of candidates) {
    const count = repeatCounts.get(r.identity) || 0;
    repeatCounts.set(r.identity, count+1);
    const weight = r.weight * (count === 0 ? 1 : 0.25 / (count * (count+1)));
    if (!(weight > 0)) continue;
    (buckets[r.sectionKey] ||= []).push({...r, weight, unique:count===0});
  }
  return buckets;
}

/** Confidence inputs come from the exact filtered/deduplicated evidence used
 * above, not raw rows. Requirements are product heuristics, not validity claims. */
export function summarizePracticeEvidence(buckets, cfg, now = Date.now()) {
  const rows = Object.values(buckets).flat().filter(r => r.unique);
  const recent = rows.filter(r => r.timestamp && r.timestamp <= now + 86400000 && now-r.timestamp <= 42*86400000);
  const expectedDomains = cfg.sections.filter(s=>s.inComposite).flatMap(s=>s.domains);
  const domainCounts = {};
  recent.forEach(r=>{ domainCounts[r.domain]=(domainCounts[r.domain]||0)+1; });
  const recentMassByDomain={}; recent.forEach(r=>{recentMassByDomain[r.domain]=(recentMassByDomain[r.domain]||0)+r.weight;});
  const effectiveRecentCount=Object.values(recentMassByDomain).reduce((n,mass)=>n+Math.min(12,mass),0);
  const lastTs = recent.reduce((n,r)=>Math.max(n,r.timestamp),0);
  const fullBySession = new Map();
  recent.filter(r=>r.fullTest).forEach(r=>{const sections=fullBySession.get(r.timestamp)||new Set(); sections.add(r.sectionKey);fullBySession.set(r.timestamp,sections);});
  return {
    totalResponses:effectiveRecentCount,
    recentUniqueItemCount:recent.length,
    distinctDays:new Set(recent.map(r=>new Date(r.timestamp).toISOString().slice(0,10))).size,
    hasTimedResponses:recent.some(r=>r.timed), hasUntimedResponses:recent.some(r=>!r.timed),
    difficultyBandsCovered:new Set(recent.map(r=>r.difficulty)).size,
    domainsWithSufficientMastery:expectedDomains.filter(d=>(domainCounts[d]||0)>=5).length,
    totalDomains:expectedDomains.length,
    hasFullPracticeTest:[...fullBySession.values()].some(sections=>sections.size===cfg.sections.filter(s=>s.inComposite).length),
    daysSinceLastActivity:lastTs ? Math.max(0,(now-lastTs)/86400000) : null,
    uniqueItemCount:rows.length,
    effectiveResponseCount:Object.values(buckets).flat().reduce((n,r)=>n+r.weight,0),
  };
}

/** A user-entered section score is a broad, approximate prior, never a floor.
 * Missing sections retain the neutral prior rather than being fabricated from
 * the total. Existing diagnostic theta/SD are preferred when available. */
export function createAbilityPrior(diagnostic, cfg) {
  const scale = scaleForTest(cfg), thetaValues = {}, semValues = {};
  const missingSections = [], scoreInputSections = [];
  cfg.sections.filter(s=>s.inComposite).forEach(s=>{
    const key=sectionKeyForDomain(s.domains[0],cfg);
    const theta=diagnostic?.thetaValues?.[key], sd=diagnostic?.semValues?.[key];
    const value=Number(diagnostic?.sectionScores?.[s.label] ?? (s.label==='Math' ? diagnostic?.mathScore : s.label==='Reading & Writing' ? diagnostic?.rwScore : NaN));
    if(Number.isFinite(theta)&&Number.isFinite(sd)&&sd>0){thetaValues[key]=theta;semValues[key]=Math.max(sd,0.5);}
    else if(Number.isFinite(value)&&value>=scale.min&&value<=scale.max){thetaValues[key]=(value-scale.mean)/scale.sd;semValues[key]=0.9;scoreInputSections.push(s.label);}
    else {thetaValues[key]=0;semValues[key]=1.25;missingSections.push(s.label);}
  });
  return {thetaValues,semValues,missingSections,scoreInputSections};
}

/** Recompute from the original diagnostic, never from the previous estimate. */
export function updateAbilityEstimate(diagnosticTheta, diagnosticSem, practiceBuckets, cfg) {
  const scale=scaleForTest(cfg), sections=cfg.sections.filter(s=>s.inComposite);
  const sectionScores={},sectionRanges={},thetaValues={},semValues={},practiceResponseCounts={},scoreRanges=[];
  sections.forEach(s=>{
    const key=sectionKeyForDomain(s.domains[0],cfg);
    const priorMean=Number.isFinite(diagnosticTheta?.[key])?diagnosticTheta[key]:0;
    const priorSd=Math.max(Number.isFinite(diagnosticSem?.[key])?diagnosticSem[key]:1.25,0.5);
    const responses=practiceBuckets[key]||[];
    const domains=new Set(responses.map(r=>r.domain).filter(d=>s.domains.includes(d)));
    const coverage=responses.some(r=>r.domain) ? domains.size/Math.max(1,s.domains.length) : responses.length?1:0;
    // Limit mass from a single domain without dropping its newest evidence.
    const domainMass={}; responses.forEach(r=>{domainMass[r.domain||'_legacy']=(domainMass[r.domain||'_legacy']||0)+(r.weight??1);});
    const balanced=responses.map(r=>({...r,weight:(r.weight??1)*Math.min(1,12/domainMass[r.domain||'_legacy'])}));
    const eap=estimateEap(balanced,{mean:priorMean,sd:priorSd});
    // Unassessed domains keep their prior contribution. Equal-domain coverage
    // is an explicit heuristic because validated item/domain weights are absent.
    const theta=priorMean+(eap.theta-priorMean)*coverage;
    const sd=Math.sqrt(coverage*eap.sem**2+(1-coverage)*priorSd**2+MODEL_SD**2);
    sectionScores[s.label]=thetaToScore(theta,scale);
    thetaValues[key]=Math.round(theta*1000)/1000; semValues[key]=Math.round(sd*1000)/1000;
    const interval=thetaIntervalToScoreInterval({lower:theta-1.96*sd,upper:theta+1.96*sd},scale);
    sectionRanges[s.label]=interval; scoreRanges.push(interval);
    practiceResponseCounts[key]=responses.filter(r=>r.unique!==false).length;
  });
  return {sectionScores,sectionRanges,totalScore:cfg.compositeFromSections(sections.map(s=>sectionScores[s.label])),confidenceRange:aggregateConfidenceRange(scoreRanges,cfg),thetaValues,semValues,method:'eap_3pl_updated',estimatorVersion:3,modelVersion:3,uncertaintyKind:'heuristic_model_interval',practiceResponseCounts};
}

/** Isolated administered question-set estimate. Uses the same neutral-prior
 * pipeline as diagnostics, not a raw-accuracy conversion or diagnostic chain.
 * Questions omitted within an administered set count incorrect. Partial-credit
 * FRQs are excluded: binary 3PL is not an appropriate model for their rubric. */
export function scoreQuestionSet(questions: any[], cfg: TestConfig): DiagnosticIrtResult {
  const items=(questions||[]).filter(q=>q.format!=="frq" && (isNumericQuestion(q)||(q.correctAnswer ?? q.answer)!=null) && cfg.sections.some(s=>s.inComposite&&s.domains.includes(q.domain)));
  const scored=items.map(q=>({...q,answer:q.correctAnswer ?? q.answer}));
  return {...scoreDiagnosticWithIrt(scored,items.map(q=>isNumericQuestion(q)?numericRawResponse(q,q.userAnswer):q.userAnswer ?? -1),cfg),answeredItemCount:items.filter(q=>hasQuestionResponse(q,isNumericQuestion(q)?numericRawResponse(q,q.userAnswer):q.userAnswer)).length,administeredItemCount:items.length};
}
