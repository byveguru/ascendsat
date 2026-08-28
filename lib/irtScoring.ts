// @ts-nocheck
/** 3PL IRT scoring utilities � EAP ability estimation and scale conversion. */

export type IrtItemParams = {
  a: number; // discrimination
  b: number; // difficulty
  c: number; // guessing
};

export type IrtResponse = IrtItemParams & {
  correct: boolean;
  weight?: number; // recency weight for sequential ability updates; defaults to 1
};

export type EapResult = {
  theta: number;
  sem: number;
  credibleInterval: { lower: number; upper: number };
};

export type ScaleAnchors = {
  mean: number;
  sd: number;
  min: number;
  max: number;
  step: number;
};

export const SAT_SCALE: ScaleAnchors = {
  mean: 530,
  sd: 115,
  min: 200,
  max: 800,
  step: 10,
};

export const ACT_SCALE: ScaleAnchors = {
  mean: 21,
  sd: 5.5,
  min: 1,
  max: 36,
  step: 1,
};

const THETA_MIN = -4;
const THETA_MAX = 4;
const THETA_STEP = 0.05;
const PRIOR_MEAN = 0;
const PRIOR_SD = 1;

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

/** 3PL: P(correct | theta) */
export function prob3pl(theta: number, item: IrtItemParams): number {
  const { a, b, c } = item;
  const expTerm = Math.exp(-a * (theta - b));
  return c + (1 - c) / (1 + expTerm);
}

/** Standard normal PDF */
function normalPdf(x: number, mean = PRIOR_MEAN, sd = PRIOR_SD): number {
  const z = (x - mean) / sd;
  return Math.exp(-0.5 * z * z) / (sd * Math.sqrt(2 * Math.PI));
}

/** Item information at theta (3PL) */
export function itemInformation(theta: number, item: IrtItemParams): number {
  const { a, c } = item;
  const p = prob3pl(theta, item);
  if (p <= 0 || p >= 1) return 0;
  const num = a * a * (p - c) * (p - c) * (1 - p);
  const den = (1 - c) * (1 - c) * p;
  return den > 0 ? num / den : 0;
}

/** Standard error of measurement at theta */
export function semAtTheta(theta: number, items: IrtItemParams[]): number {
  const info = items.reduce((sum, item) => sum + itemInformation(theta, item), 0);
  return info > 0 ? 1 / Math.sqrt(info) : PRIOR_SD;
}

/** EAP ability estimate on a discrete grid. `prior` defaults to Normal(0,1);
    pass an informative prior (e.g. a prior diagnostic's theta/sem) to do a
    sequential Bayesian update instead of a from-scratch estimate. */
export function estimateEap(
  responses: IrtResponse[],
  prior: { mean: number; sd: number } = { mean: PRIOR_MEAN, sd: PRIOR_SD }
): EapResult {
  if (!responses.length) {
    return {
      theta: prior.mean,
      sem: prior.sd,
      credibleInterval: { lower: prior.mean - 1.96 * prior.sd, upper: prior.mean + 1.96 * prior.sd },
    };
  }

  const grid: number[] = [];
  for (let t = THETA_MIN; t <= THETA_MAX + 1e-9; t += THETA_STEP) {
    grid.push(t);
  }

  const weights = grid.map((theta) => {
    let logLik = 0;
    for (const r of responses) {
      const p = clamp(prob3pl(theta, r), 1e-9, 1 - 1e-9);
      logLik += (r.weight ?? 1) * (r.correct ? Math.log(p) : Math.log(1 - p));
    }
    const priorDensity = normalPdf(theta, prior.mean, prior.sd);
    return Math.exp(logLik) * priorDensity;
  });

  const total = weights.reduce((s, w) => s + w, 0);
  if (total <= 0) {
    return {
      theta: prior.mean,
      sem: prior.sd,
      credibleInterval: { lower: prior.mean - 1.96 * prior.sd, upper: prior.mean + 1.96 * prior.sd },
    };
  }

  const norm = weights.map((w) => w / total);
  const theta = grid.reduce((s, t, i) => s + t * norm[i], 0);
  const variance = grid.reduce((s, t, i) => s + (t - theta) * (t - theta) * norm[i], 0);
  const sem = Math.sqrt(variance);

  // 95% credible interval from posterior CDF
  let cum = 0;
  let lower = grid[0];
  let upper = grid[grid.length - 1];
  for (let i = 0; i < grid.length; i++) {
    cum += norm[i];
    if (cum >= 0.025 && lower === grid[0]) lower = grid[i];
    if (cum >= 0.975) {
      upper = grid[i];
      break;
    }
  }

  const items = responses.map(({ a, b, c }) => ({ a, b, c }));
  const fisherSem = semAtTheta(theta, items);

  return {
    theta,
    sem: fisherSem,
    credibleInterval: { lower, upper },
  };
}

/** Convert theta to a section score using population anchors */
export function thetaToScore(theta: number, scale: ScaleAnchors): number {
  const raw = scale.mean + scale.sd * theta;
  const clamped = clamp(raw, scale.min, scale.max);
  if (scale.step <= 1) return Math.round(clamped);
  return Math.round(clamped / scale.step) * scale.step;
}

/** Convert theta credible bounds to score bounds */
export function thetaIntervalToScoreInterval(
  interval: { lower: number; upper: number },
  scale: ScaleAnchors
): { lower: number; upper: number } {
  return {
    lower: thetaToScore(interval.lower, scale),
    upper: thetaToScore(interval.upper, scale),
  };
}
