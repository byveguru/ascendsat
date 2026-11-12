// @ts-nocheck
// Authored course-bank adapter. Bounded baseline selection happens in startApPractice.

import { AP_QUESTION_BANK } from "./apQuestions";

// Stable identities preserve authored writing sets and saved-review references.
export const getApDiagnostic = (courseId) => {
  const bank = AP_QUESTION_BANK[courseId];
  if (!bank) return [];
  const mcq = bank.mcq.map((q, i) => ({ ...q, id: q.id || `ap-diag-${courseId}-mcq-${i}`, format: q.format || "mcq" }));
  const frq = bank.frq.map((q, i) => ({ ...q, id: q.id || `ap-diag-${courseId}-frq-${i}` }));
  return [...mcq, ...frq];
};
