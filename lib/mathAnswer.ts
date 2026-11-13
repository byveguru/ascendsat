/** Editing helpers preserve notation verbatim; they never evaluate student code. */
export const MATH_TEMPLATES = [
  { label: "a/b", name: "fraction", text: "$\\frac{a}{b}$", select: "a" },
  { label: "xⁿ", name: "power", text: "$x^{n}$", select: "n" },
  { label: "√", name: "square root", text: "$\\sqrt{x}$", select: "x" },
  { label: "∫", name: "integral", text: "$\\int_{a}^{b} f(x)\\,dx$", select: "a" },
  { label: "Σ", name: "sum", text: "$\\sum_{n=1}^{N} a_n$", select: "N" },
  { label: "π", name: "pi", text: "$\\pi$" },
  { label: "θ", name: "theta", text: "$\\theta$" },
  { label: "±", name: "plus or minus", text: "$\\pm$" },
  { label: "≤", name: "less than or equal", text: "$\\le$" },
  { label: "≥", name: "greater than or equal", text: "$\\ge$" },
] as const;

export function insertMathTemplate(value: string, selection: { start: number; end: number }, template: { text: string; select?: string }) {
  const start = Math.max(0, Math.min(value.length, selection.start));
  const end = Math.max(start, Math.min(value.length, selection.end));
  const rawSelected = value.slice(start, end);
  const selected = /^\$[^$]*\$$/.test(rawSelected) ? rawSelected.slice(1, -1) : rawSelected;
  const delimitersBefore = (value.slice(0, start).match(/(?<!\\)\$/g) || []).length;
  const insideMath = delimitersBefore % 2 === 1;
  let text = insideMath ? template.text.replace(/^\$|\$$/g, "") : template.text;
  let offset = template.select ? text.indexOf(template.select, text.includes("{") ? text.indexOf("{") + 1 : 0) : -1;
  // A selected expression becomes the first template slot, so wrapping an
  // existing expression in a fraction/root does not erase the student's work.
  if (selected && offset >= 0 && template.select) text = text.slice(0, offset) + selected + text.slice(offset + template.select.length);
  const next = value.slice(0, start) + text + value.slice(end);
  const cursor = start + text.length;
  return { value: next, selection: offset >= 0 && !selected ? { start: start + offset, end: start + offset + template.select!.length } : { start: cursor, end: cursor } };
}

export function isMathResponseQuestion(q: any): boolean {
  return q?.responseMode === "math" || /^(Calc AB|Calc BC|Precalc|Stats|Physics 1|APES):/.test(q?.domain || "") || ["Algebra", "Advanced Math", "Problem Solving and Data Analysis", "Geometry & Trigonometry", "Additional SAT Math Concepts", "Number & Quantity", "Algebra & Functions", "Geometry", "Statistics & Probability"].includes(q?.domain);
}

/** Conservative notation check for formula recall. No symbolic equivalence or
 * punctuation-stripping: x−2 must never become equivalent to x+2. */
export function normalizeMathRecall(value: string): string {
  const superscripts: Record<string,string> = {"⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","⁻":"-","⁺":"+"};
  return String(value || "").replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]+/g, run => "^{" + [...run].map(c=>superscripts[c]).join("") + "}").normalize("NFKC").replace(/\$/g, "").replace(/\\(?:left|right)/g, "")
    .replace(/\\(?:cdot|times)|[×·]/g, "*").replace(/−|–/g, "-")
    .replace(/\\pi|π/g, "pi").replace(/\\theta|θ/g, "theta")
    .replace(/\^\{(-?\d+)\}/g, "^$1").replace(/\s+/g, "").toLowerCase();
}
