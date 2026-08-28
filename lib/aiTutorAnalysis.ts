// @ts-nocheck

export type RootCause =
  | "calculation"
  | "grammar"
  | "vocab"
  | "comprehension"
  | "strategy"
  | "careless"
  | "timing";

export type WrongAnswerAnalysis = {
  trapLogic: string;
  rootCause: RootCause;
  takeaway: string;
  encouragement: string;
};

export const ROOT_CAUSE_LABELS: Record<RootCause, string> = {
  calculation: "Calculation",
  grammar: "Grammar rule",
  vocab: "Vocabulary",
  comprehension: "Reading comprehension",
  strategy: "Test strategy",
  careless: "Careless error",
  timing: "Timing / pacing",
};

const VALID_ROOT_CAUSES = new Set(Object.keys(ROOT_CAUSE_LABELS));

export function buildWrongAnswerSystemPrompt(): string {
  return `You are Casper, an expert SAT tutor for high school students.
Return ONLY valid JSON (no markdown) with this exact shape:
{
  "trapLogic": "1-2 sentences on why the student's wrong choice looked tempting",
  "rootCause": "calculation"|"grammar"|"vocab"|"comprehension"|"strategy"|"careless"|"timing",
  "takeaway": "One actionable sentence to avoid this mistake next time",
  "encouragement": "One short encouraging sentence"
}
Tone: direct, warm, never condescending.`;
}

export function buildWrongAnswerUserPrompt(m: {
  domain?: string;
  question?: string;
  choices?: string[];
  userAnswer?: number;
  correctAnswer?: number;
}): string {
  const userAnsText = m.userAnswer === -1 ? "Skipped" : m.choices?.[m.userAnswer] || "Unknown";
  const correctText = m.choices?.[m.correctAnswer] || "Unknown";
  const choicesText = (m.choices || [])
    .map((c, i) => `${["A", "B", "C", "D"][i]}: ${c}`)
    .join(" | ");
  return `Domain: ${m.domain || "SAT"}
Question: ${m.question || ""}
Choices: ${choicesText}
Student picked: ${userAnsText}
Correct: ${correctText}`;
}

export function parseWrongAnswerAnalysis(raw: string): WrongAnswerAnalysis | null {
  if (!raw) return null;
  try {
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    if (!parsed?.trapLogic || !parsed?.takeaway) return null;
    const rootCause = VALID_ROOT_CAUSES.has(parsed.rootCause) ? parsed.rootCause : "strategy";
    return {
      trapLogic: String(parsed.trapLogic),
      rootCause,
      takeaway: String(parsed.takeaway),
      encouragement: String(parsed.encouragement || "You're building the right habits � keep going."),
    };
  } catch {
    return null;
  }
}

export function normalizeLegacyExplanation(value: unknown): WrongAnswerAnalysis | string | null {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (typeof value === "object" && value.trapLogic) {
    return {
      trapLogic: value.trapLogic,
      rootCause: VALID_ROOT_CAUSES.has(value.rootCause) ? value.rootCause : "strategy",
      takeaway: value.takeaway || "",
      encouragement: value.encouragement || "",
    };
  }
  return null;
}

export function isStructuredAnalysis(value: unknown): value is WrongAnswerAnalysis {
  return Boolean(value && typeof value === "object" && value.trapLogic && value.takeaway);
}
