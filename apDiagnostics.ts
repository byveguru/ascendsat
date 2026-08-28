// @ts-nocheck
/* apDiagnostics.ts — AP diagnostic sampler. Rather than a separate hand-authored
   question set (like diagnosticExamQuestions.ts / actDiagnosticExamQuestions.ts),
   AP's diagnostic draws directly from apQuestions.ts: every MCQ (one per unit)
   plus the course's FRQ, so a diagnostic run covers every unit in the course. */

import { AP_QUESTION_BANK } from "./apQuestions";

// Returns a diagnostic set for a course: every unit's MCQ + the course FRQ,
// tagged with a stable id so results can be keyed/reviewed like other diagnostics.
export const getApDiagnostic = (courseId) => {
  const bank = AP_QUESTION_BANK[courseId];
  if (!bank) return [];
  const mcq = bank.mcq.map((q, i) => ({ ...q, id: `ap-diag-${courseId}-mcq-${i}`, format: q.format || "mcq" }));
  const frq = bank.frq.map((q, i) => ({ ...q, id: `ap-diag-${courseId}-frq-${i}` }));
  return [...mcq, ...frq];
};
