/** Exact, non-evaluating numeric matching for original SAT SPR practice.
 * Matching and the SAT UI's character limit are reported separately. Never
 * parseFloat a response: it would silently accept units or an invalid suffix.
 */
type Rational = { numerator: bigint; denominator: bigint };
export type NumericQuestion = {
  format?: string; testType?: string;
  acceptedAnswers?: string[];
  rounding?: { mode: 'exact' } | {
    mode: 'listed'; decimalPlaces?: number; precisionByEntry?: Record<string, number>; acceptedDecimals: string[]; note: string;
  };
};
const decimalPattern = /^-?(?:\d+(?:\.\d*)?|\.\d+)$/;
const fractionPattern = /^(-?\d+)\/(\d+)$/;
const absolute = (n: bigint) => n < 0n ? -n : n;
function gcd(a: bigint, b: bigint): bigint {
  a = absolute(a); b = absolute(b);
  while (b !== 0n) { const remainder = a % b; a = b; b = remainder; }
  return a || 1n;
}
function responseText(value: unknown): string | null {
  if (typeof value !== 'string' || value.length > 64) return null;
  // Accept a copied typographic minus only in the leading position.
  const text = value.trim().replace(/^−/, '-');
  return text || null;
}
function rational(value: unknown): Rational | null {
  const text = responseText(value);
  if (!text) return null;
  let numerator: bigint, denominator: bigint;
  const fraction = text.match(fractionPattern);
  if (fraction) {
    numerator = BigInt(fraction[1]); denominator = BigInt(fraction[2]);
    if (denominator === 0n) return null;
  } else {
    if (!decimalPattern.test(text)) return null;
    const negative = text.startsWith('-');
    const unsigned = negative ? text.slice(1) : text;
    const [whole, digits = ''] = unsigned.split('.');
    denominator = 10n ** BigInt(digits.length);
    numerator = BigInt((whole || '0') + digits) * (negative ? -1n : 1n);
  }
  const divisor = gcd(numerator, denominator);
  return { numerator: numerator / divisor, denominator: denominator / divisor };
}
/** Returns a reduced exact fraction or integer; null means empty/invalid. */
export function normalizeNumericResponse(value: unknown): string | null {
  const result = rational(value);
  if (!result) return null;
  return result.denominator === 1n ? String(result.numerator) : `${result.numerator}/${result.denominator}`;
}
export const isNumericQuestion = (question: NumericQuestion | null | undefined): boolean => question?.format === 'spr' && (!question.testType || question.testType === 'sat');
/** No global tolerance: every approximate decimal must be authored on the item.
 * Fraction entries match only exact accepted rationals; an approximate fraction
 * cannot borrow a decimal-only rounding allowance.
 */
export function numericResponseEvidence(question: NumericQuestion, response: unknown) {
  const rawResponse = typeof response === 'string' ? response : '';
  const text = responseText(response);
  const normalizedResponse = normalizeNumericResponse(response);
  const accepted = (question.acceptedAnswers || []).map(value => ({ value, normalized: normalizeNumericResponse(value) }));
  const exact = normalizedResponse === null ? undefined : accepted.find(answer => answer.normalized !== null && answer.normalized === normalizedResponse);
  const rounding = question.rounding?.mode === 'listed' ? question.rounding : null;
  const rounded = !exact && normalizedResponse !== null && text !== null && decimalPattern.test(text)
    ? rounding?.acceptedDecimals.find(value => normalizeNumericResponse(value) === normalizedResponse)
    : undefined;
  return {
    rawResponse,
    normalizedResponse,
    answered: typeof response === 'string' && response.trim().length > 0,
    formatValid: normalizedResponse !== null,
    inputLengthValid: text !== null && text.length <= (text.startsWith('-') ? 6 : 5),
    correct: isNumericQuestion(question) && !!(exact || rounded),
    matchedAnswer: exact?.value || rounded || null,
    matchType: exact ? 'exact' : rounded ? 'listed-rounding' : null,
  };
}
export const isNumericCorrect = (question: NumericQuestion, response: unknown): boolean => numericResponseEvidence(question, response).correct;

/** Correctness for the two automatically scored question formats. FRQ callers
 * retain their rubric-points flow. A missing MC key never makes blanks correct.
 */
export function isQuestionCorrect(question: any, response: unknown): boolean {
  if (question?.format === 'spr') return isNumericQuestion(question) && isNumericCorrect(question, numericRawResponse(question, response));
  const key = question?.answer ?? question?.correctAnswer;
  return Number.isInteger(key) && Number.isInteger(response) && Number(response) >= 0 && response === key;
}
export function hasQuestionResponse(question: any, response: unknown): boolean {
  return question?.format === 'spr'
    ? numericRawResponse(question, response).trim().length > 0
    : Number.isInteger(response) && Number(response) >= 0;
}
export function questionAnswerDisplay(question: any, response: unknown): string {
  if (!hasQuestionResponse(question, response)) return 'Not answered';
  if (question?.format === 'spr') return numericRawResponse(question, response).trim();
  return String(question?.choices?.[Number(response)] ?? response);
}
export function correctAnswerDisplay(question: any): string {
  if (question?.format === 'spr') return (question.acceptedAnswers || []).join(' or ');
  return String(question?.choices?.[question?.answer ?? question?.correctAnswer] ?? 'Answer unavailable');
}
/** Existing accuracy/XP/history readers can keep binary comparisons while the
 * raw response and authored numeric key remain available for replay and review.
 */
export function numericHistoryFields(question: any, response: unknown) {
  const evidence = numericResponseEvidence(question, response);
  return {
    format: 'spr', userResponse: evidence.rawResponse,
    normalizedResponse: evidence.normalizedResponse,
    acceptedAnswers: [...(question.acceptedAnswers || [])],
    rounding: question.rounding || { mode: 'exact' },
    userAnswer: evidence.answered ? (evidence.correct ? 1 : 0) : -1,
    correctAnswer: 1,
  };
}
export function numericRawResponse(question: any, response: unknown): string {
  return typeof response === 'string' ? response : typeof question?.userResponse === 'string' ? question.userResponse : '';
}
export function questionVisualFields(question: any) {
  return {
    ...(question?.passage ? { passage: question.passage } : {}),
    ...(question?.stimulus ? { stimulusJson: JSON.stringify(question.stimulus) } : question?.stimulusJson ? { stimulusJson: question.stimulusJson } : {}),
    ...(question?.explanationStimulus ? { explanationStimulusJson: JSON.stringify(question.explanationStimulus) } : question?.explanationStimulusJson ? { explanationStimulusJson: question.explanationStimulusJson } : {}),
  };
}
export function answerPersistenceFields(question: any, response: unknown) {
  return {
    ...questionVisualFields(question),
    ...(isNumericQuestion(question)
      ? numericHistoryFields(question, numericRawResponse(question, response))
      : { format: question.format || 'mcq', userAnswer: response ?? -1, correctAnswer: question.answer ?? question.correctAnswer }),
  };
}
export function hydrateQuestionVisuals(question: any) {
  const hydrated = { ...question };
  for (const [objectKey, jsonKey] of [['stimulus', 'stimulusJson'], ['explanationStimulus', 'explanationStimulusJson']]) {
    if (!hydrated[objectKey] && typeof hydrated[jsonKey] === 'string') {
      try { const value = JSON.parse(hydrated[jsonKey]); if (value && typeof value === 'object' && !Array.isArray(value)) hydrated[objectKey] = value; } catch { /* Older malformed visual metadata cannot block history. */ }
    }
  }
  return hydrated;
}
