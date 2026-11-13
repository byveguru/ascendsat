/** Pure, opt-in holdout evaluation. No I/O, model fitting, or coefficient changes.
 * Inputs must use pseudonymous participant keys; never pass names/emails.
 * A trusted storage adapter must attest immutable provenance. Client booleans
 * alone cannot prove that an old record was frozen or free of score leakage.
 */
export type StoredTime = string | number | { seconds: number; nanoseconds?: number };
export type OfficialSATResult = {
  id: string; date: string; math: number; rw: number; source: 'official'; consent?: boolean;
};
export type ProjectionHistorySnapshot = {
  id: string; testType: string; modelVersion: number; createdAt: StoredTime;
  total: number; sectionScores: Record<string, number>;
  confidenceRange?: { lower: number; upper: number } | null;
  priorSource?: string; scoreInputSections?: string[];
  validation?: {
    immutable: boolean;
    scoreInputContaminated: boolean;
    /** Latest input evidence time, frozen when computed; not a current profile field. */
    evidenceCutoff: StoredTime;
  };
};
export type ParticipantValidationInput = {
  participantKey: string;
  results: readonly OfficialSATResult[];
  scoreProjectionHistory: readonly ProjectionHistorySnapshot[];
};
export type ValidationOptions = {
  /** Required deterministic cutoff; timestamps must be ISO with zone or epoch ms. */
  now: StoredTime;
  /** Default 30; cannot exceed 30. */
  maxSnapshotAgeDays?: number;
  /** Default 30, a configurable reporting guardrail, not a power calculation. */
  minParticipants?: number;
};
export type ValidationPair = {
  participantKey: string; resultId: string; snapshotId: string;
  resultDate: string; snapshotTimestamp: number; ageDays: number;
  actual: { total: number; math: number; rw: number };
  predicted: { total: number; math: number; rw: number };
  totalInterval: { lower: number; upper: number } | null;
};
export type MetricSummary = {
  mae: number; bias: number; rmse: number;
  /** Participant-equal average fraction covered, only among participants with intervals. */
  intervalCoverage: number | null;
  intervalPairCount: number; intervalParticipantCount: number;
  pairCount: number; participantCount: number;
};
const DAY = 86_400_000;
const ZONED_ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const keyOK = (x: unknown): x is string => typeof x === 'string' && x.trim() === x && x.length > 0 && x.length <= 180;
const scoreOK = (x: unknown): x is number => typeof x === 'number' && Number.isFinite(x) && x >= 200 && x <= 800;
const officialScoreOK = (x: unknown): x is number => scoreOK(x) && Number.isInteger(x) && x % 10 === 0;
function validDay(day: string): boolean {
  const t = Date.parse(day + 'T00:00:00Z');
  return Number.isFinite(t) && new Date(t).toISOString().slice(0,10) === day;
}
/** Strict time parser: reject unzoned strings, invalid calendar dates, and nanos
 * that JS cannot distinguish at ms precision. Pairing conservatively rejects
 * ties; sub-ms instants are rounded UP so a snapshot cannot appear earlier.
 */
export function validationTimestamp(value: unknown): number | null {
  if (typeof value === 'number') return Number.isSafeInteger(value) && value >= 0 && value <= 8_640_000_000_000_000 ? value : null;
  if (typeof value === 'string') {
    if (!ZONED_ISO.test(value) || !validDay(value.slice(0,10))) return null;
    const h = Number(value.slice(11,13)), m = Number(value.slice(14,16)), s = Number(value.slice(17,19));
    if (h > 23 || m > 59 || s > 59) return null;
    const zone = value.match(/([+-])(\d{2}):(\d{2})$/);
    if (zone && (Number(zone[2]) > 14 || Number(zone[3]) > 59 || (Number(zone[2]) === 14 && Number(zone[3]) !== 0))) return null;
    const n = Date.parse(value); return Number.isFinite(n) && n >= 0 ? n : null;
  }
  if (value && typeof value === 'object') {
    const v = value as { seconds?: unknown; nanoseconds?: unknown };
    const sec = v.seconds, nano = v.nanoseconds ?? 0;
    if (typeof sec !== 'number' || !Number.isSafeInteger(sec) || sec < 0 || typeof nano !== 'number' || !Number.isInteger(nano) || nano < 0 || nano >= 1e9) return null;
    const t = sec * 1000 + Math.ceil(nano / 1e6);
    return Number.isSafeInteger(t) && t <= 8_640_000_000_000_000 ? t : null;
  }
  return null;
}
function resultTime(date: string): { earliest: number; latest: number; exact: boolean; day: string } | null {
  if (DATE.test(date) && validDay(date)) {
    const midnight = Date.parse(date + 'T00:00:00Z');
    // Unknown test timezone: conservative bounds cover UTC+14 through UTC−12.
    // Therefore some previous-evening snapshots are intentionally excluded.
    return { earliest: midnight - 14*3_600_000, latest: midnight + DAY + 12*3_600_000 - 1, exact: false, day: date };
  }
  const t = validationTimestamp(date);
  return t === null ? null : { earliest:t, latest:t, exact:true, day:date.slice(0,10) };
}
export function validateOfficialSATResult(input: unknown, now: StoredTime): { valid: boolean; reasons: string[] } {
  const reasons: string[] = []; const n = validationTimestamp(now);
  const r = input as Partial<OfficialSATResult> | null;
  if (!r || typeof r !== 'object') return { valid:false, reasons:['invalid_result'] };
  if (!keyOK(r.id)) reasons.push('invalid_result_id');
  if (r.source !== 'official') reasons.push('not_official_result');
  if (r.consent !== true) reasons.push('consent_not_granted');
  if (!officialScoreOK(r.math) || !officialScoreOK(r.rw)) reasons.push('invalid_official_sections');
  const t = typeof r.date === 'string' ? resultTime(r.date) : null;
  if (!t) reasons.push('invalid_result_date');
  if (n === null) reasons.push('invalid_evaluation_cutoff');
  // Date-only records are eligible only once that date has ended in all zones.
  else if (t && t.latest > n) reasons.push('result_not_yet_completed');
  return { valid:reasons.length === 0, reasons };
}
function snapshotStatus(s: ProjectionHistorySnapshot): string | null {
  if (!s || !keyOK(s.id)) return 'invalid_snapshot_id';
  if (s.testType !== 'sat' || s.modelVersion !== 3) return 'ineligible_model_or_test';
  if (!s.validation || s.validation.immutable !== true) return 'immutable_provenance_unknown';
  if (s.validation.scoreInputContaminated !== false || s.priorSource !== 'diagnostic' || !Array.isArray(s.scoreInputSections) || s.scoreInputSections.length !== 0) return 'score_input_contaminated_or_unknown';
  const created = validationTimestamp(s.createdAt), evidence = validationTimestamp(s.validation.evidenceCutoff);
  if (created === null || evidence === null || evidence > created) return 'invalid_snapshot_evidence_time';
  const math = s.sectionScores?.Math, rw = s.sectionScores?.['Reading & Writing'];
  if (!scoreOK(math) || !scoreOK(rw) || !Number.isFinite(s.total) || Math.abs(s.total-math-rw)>1e-6) return 'invalid_snapshot_scores';
  // Invalid intervals do not discard an otherwise valid point prediction.
  return null;
}
function interval(s: ProjectionHistorySnapshot): ValidationPair['totalInterval'] {
  const r=s.confidenceRange;
  return r && Number.isFinite(r.lower) && Number.isFinite(r.upper) && r.lower>=400 && r.upper<=1600 && r.lower<=s.total && s.total<=r.upper ? {lower:r.lower,upper:r.upper} : null;
}
function options(o: ValidationOptions): { now:number; maxDays:number; min:number } {
  const now=validationTimestamp(o?.now), maxDays=o?.maxSnapshotAgeDays ?? 30, min=o?.minParticipants ?? 30;
  if (now===null || !Number.isFinite(maxDays) || maxDays<=0 || maxDays>30 || !Number.isSafeInteger(min) || min<1) throw new Error('Invalid validation options: supply a valid cutoff, age in (0,30], and positive integer participant threshold.');
  return {now,maxDays,min};
}
/** Choose the most recent clean immutable snapshot strictly before the test.
 * No current estimate recomputation and no current-profile provenance fallback.
 * Result date-only pairing excludes UTC same-date snapshots plus timezone-ambiguous
 * prior-evening records; same-day pairing requires exact zoned times on both sides.
 */
export function pairOfficialSATResults(inputs: readonly ParticipantValidationInput[], o: ValidationOptions): {
  pairs: ValidationPair[]; excluded: Record<string,number>;
} {
  const {now,maxDays}=options(o), pairs:ValidationPair[]=[], excluded:Record<string,number>={};
  const reject=(reason:string)=>{excluded[reason]=(excluded[reason]||0)+1;};
  const people=new Map<string,{results:OfficialSATResult[];snapshots:ProjectionHistorySnapshot[]}>();
  for(const p of inputs){
    if(!p || !keyOK(p.participantKey)){reject('invalid_participant_key');continue;}
    const merged=people.get(p.participantKey) || {results:[],snapshots:[]};
    merged.results.push(...(Array.isArray(p.results)?p.results:[]));
    merged.snapshots.push(...(Array.isArray(p.scoreProjectionHistory)?p.scoreProjectionHistory:[]));
    people.set(p.participantKey,merged);
  }
  for(const [participantKey,p] of people){
    const snapshotIDs=new Map<string,number>();
    for(const s of p.snapshots) snapshotIDs.set(s?.id,(snapshotIDs.get(s?.id)||0)+1);
    const clean:ProjectionHistorySnapshot[]=[];
    for(const s of p.snapshots){
      if(snapshotIDs.get(s?.id)!==1){reject('duplicate_snapshot_id');continue;}
      const reason=snapshotStatus(s);if(reason){reject(reason);continue;}clean.push(s);
    }
    // Fail closed for repeated IDs, including conflicts or consent revocations.
    const resultIDs=new Map<string,number>();
    for(const r of p.results) resultIDs.set(r?.id,(resultIDs.get(r?.id)||0)+1);
    const valid:OfficialSATResult[]=[];
    for(const r of p.results){
      if(resultIDs.get(r?.id)!==1){reject('duplicate_result_id');continue;}
      const check=validateOfficialSATResult(r,now);
      if(!check.valid){check.reasons.forEach(reject);continue;}valid.push(r);
    }
    // An official administration supplies one pair of section scores. Collapse
    // identical date/score entries; reject conflicting entries for that date.
    const dates=new Map<string,OfficialSATResult[]>();
    for(const r of valid){const key=r.date.slice(0,10);dates.set(key,[...(dates.get(key)||[]),r]);}
    for(const rs of dates.values()){
      if(new Set(rs.map(r=>`${r.math}:${r.rw}`)).size>1){reject('conflicting_results_for_test_date');continue;}
      const r=[...rs].sort((a,b)=>a.id.localeCompare(b.id))[0];
      if(rs.length>1) for(let i=1;i<rs.length;i++)reject('duplicate_administration');
      const rt=resultTime(r.date)!;
      const eligible=clean.filter(s=>{
        const st=validationTimestamp(s.createdAt)!;
        if(!rt.exact && new Date(st).toISOString().slice(0,10)===rt.day)return false;
        return st<rt.earliest && rt.latest-st<=maxDays*DAY;
      }).sort((a,b)=>validationTimestamp(b.createdAt)!-validationTimestamp(a.createdAt)! || a.id.localeCompare(b.id));
      if(!eligible.length){reject('no_clean_pretest_snapshot_within_window');continue;}
      const s=eligible[0], st=validationTimestamp(s.createdAt)!;
      pairs.push({participantKey,resultId:r.id,snapshotId:s.id,resultDate:r.date,snapshotTimestamp:st,ageDays:(rt.latest-st)/DAY,actual:{total:r.math+r.rw,math:r.math,rw:r.rw},predicted:{total:s.total,math:s.sectionScores.Math,rw:s.sectionScores['Reading & Writing']},totalInterval:interval(s)});
    }
  }
  return {pairs:pairs.sort((a,b)=>a.participantKey.localeCompare(b.participantKey)||a.resultDate.localeCompare(b.resultDate)||a.resultId.localeCompare(b.resultId)),excluded};
}
function summarize(pairs: readonly ValidationPair[], section: 'total'|'math'|'rw'): MetricSummary | null {
  if(!pairs.length)return null;
  const people=new Map<string,ValidationPair[]>();
  for(const p of pairs)people.set(p.participantKey,[...(people.get(p.participantKey)||[]),p]);
  let absolute=0,signed=0,squared=0,coverage=0,intervalPeople=0,intervalPairs=0;
  for(const ps of people.values()){
    const errors=ps.map(p=>p.predicted[section]-p.actual[section]);
    absolute+=errors.reduce((s,e)=>s+Math.abs(e),0)/ps.length;
    signed+=errors.reduce((s,e)=>s+e,0)/ps.length;
    squared+=errors.reduce((s,e)=>s+e*e,0)/ps.length;
    if(section==='total'){
      const withIntervals=ps.filter(p=>p.totalInterval!==null);
      if(withIntervals.length){intervalPeople++;intervalPairs+=withIntervals.length;coverage+=withIntervals.filter(p=>p.actual.total>=p.totalInterval!.lower&&p.actual.total<=p.totalInterval!.upper).length/withIntervals.length;}
    }
  }
  return {mae:absolute/people.size,bias:signed/people.size,rmse:Math.sqrt(squared/people.size),intervalCoverage:intervalPeople?coverage/intervalPeople:null,intervalPairCount:intervalPairs,intervalParticipantCount:intervalPeople,pairCount:pairs.length,participantCount:people.size};
}
/** Evaluate ONLY internally constructed eligible pairs. Each participant has
 * equal total weight regardless of retake count. Positive bias = overprediction.
 * Metrics remain exploratory below threshold; canEvaluate is a reporting gate,
 * never a statement of representativeness, statistical power, or calibration.
 */
export function evaluateScoreValidation(inputs: readonly ParticipantValidationInput[], o: ValidationOptions){
  const cfg=options(o),{pairs,excluded}=pairOfficialSATResults(inputs,o);
  const participantCount=new Set(pairs.map(p=>p.participantKey)).size;
  const intervalParticipantCount=new Set(pairs.filter(p=>p.totalInterval!==null).map(p=>p.participantKey)).size;
  return {modelVersion:3 as const,canEvaluate:participantCount>=cfg.min,minParticipants:cfg.min,participantCount,pairCount:pairs.length,
    eligibilityReason:participantCount>=cfg.min?'minimum_participant_threshold_met':'insufficient_distinct_participants',
    canEvaluateIntervalCoverage:intervalParticipantCount>=cfg.min,
    total:summarize(pairs,'total'),math:summarize(pairs,'math'),rw:summarize(pairs,'rw'),excluded,pairs,
    limitations:['Voluntary self-reported official results are not independently verified.','Selection, test conditions, milestone-only snapshot capture, and score ranges can affect results.','Coverage describes the saved heuristic intervals; it is not a validated confidence level.','Participant-equal descriptive metrics do not establish population calibration. No model coefficients changed.']};
}
