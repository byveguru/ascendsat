const SUPERSCRIPT_DIGITS: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
};

const SIMPLE_FRACTIONS: Record<string, string> = {
  "1/2": "½",
  "1/3": "⅓",
  "2/3": "⅔",
  "1/4": "¼",
  "3/4": "¾",
  "1/5": "⅕",
  "2/5": "⅖",
  "3/5": "⅗",
  "4/5": "⅘",
  "1/6": "⅙",
  "5/6": "⅚",
  "1/8": "⅛",
  "3/8": "⅜",
  "5/8": "⅝",
  "7/8": "⅞",
};

const toSuperscript = (digits: string) =>
  digits
    .split("")
    .map((d) => SUPERSCRIPT_DIGITS[d] ?? d)
    .join("");

/**
 * Converts raw SAT-style math notation into polished display text.
 * Display-only — never use on stored question data or API payloads.
 */
export function formatMathText(text: string | null | undefined): string {
  if (text == null || text === "") return text ?? "";
  if (typeof text !== "string") return String(text);

  let s = text;

  // E. Minus consistency — normalize dash-like characters used as subtraction
  s = s.replace(/[\u2013\u2014\u2212]/g, "−");
  s = s.replace(/(\S)\s+-\s+(\S)/g, "$1 − $2");

  // D. Common symbols (multi-char operators before single-char)
  s = s.replace(/\+\-/g, "±");
  s = s.replace(/!=/g, "≠");
  s = s.replace(/>=/g, "≥");
  s = s.replace(/<=/g, "≤");

  // C. Square roots
  s = s.replace(/sqrt\s*\(([^)]+)\)/gi, "√($1)");

  // A. Exponents — x^2, x^12, etc.
  s = s.replace(/\^(\d+)/g, (_, exp: string) => toSuperscript(exp));

  // B. Simple inline fractions only (skip complex / multi-digit denominators)
  s = s.replace(/(?<![\d/])(\d)\/(\d)(?![\d/])/g, (match) => SIMPLE_FRACTIONS[match] ?? match);

  return s;
}
