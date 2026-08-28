// @ts-nocheck
/**
 * Diagnostic item IRT calibration tables (a, b, c per question id).
 *
 * Initial values are heuristic until recalibrated against real
 * diagnostic + official score pairs (target N >= 200).
 * Update this file without touching question content or UI code.
 */

import type { DiagnosticIrtParams, DiagnosticSection } from "../diagnosticExamQuestions";

type CalibrationEntry = Omit<DiagnosticIrtParams, "section"> & {
  section: DiagnosticSection;
};

const DEFAULT_GUESS = 0.25;

const easy = (section: DiagnosticSection, b = -1.5, a = 1.1): CalibrationEntry => ({
  section,
  difficulty: b,
  discrimination: a,
  guessing: DEFAULT_GUESS,
});

const medium = (section: DiagnosticSection, b = 0, a = 1.3): CalibrationEntry => ({
  section,
  difficulty: b,
  discrimination: a,
  guessing: DEFAULT_GUESS,
});

const hard = (section: DiagnosticSection, b = 1.5, a = 1.5): CalibrationEntry => ({
  section,
  difficulty: b,
  discrimination: a,
  guessing: DEFAULT_GUESS,
});

/** SAT diagnostic � 15 items */
const SAT_CALIBRATION: Record<string, CalibrationEntry> = {
  // Math (8)
  "diag-alg-1": easy("math", -1.4, 1.1),
  "diag-alg-2": medium("math", 0.1, 1.3),
  "diag-adv-1": easy("math", -1.5, 1.0),
  "diag-adv-2": medium("math", 0.2, 1.35),
  "diag-psda-1": easy("math", -1.6, 1.0),
  "diag-psda-2": medium("math", -0.1, 1.25),
  "diag-geo-1": easy("math", -1.3, 1.1),
  "diag-geo-2": medium("math", 0.0, 1.3),
  // Reading & Writing (7)
  "diag-info-1": easy("reading_writing", -1.5, 1.1),
  "diag-info-2": medium("reading_writing", 0.0, 1.3),
  "diag-craft-1": easy("reading_writing", -1.4, 1.1),
  "diag-craft-2": medium("reading_writing", 0.1, 1.35),
  "diag-expr-1": medium("reading_writing", 0.0, 1.25),
  "diag-sec-1": easy("reading_writing", -1.6, 1.0),
  "diag-sec-2": medium("reading_writing", -0.1, 1.3),
};

/** ACT diagnostic � 20 items */
const ACT_CALIBRATION: Record<string, CalibrationEntry> = {
  // English (6)
  "actdiag-prod-1": easy("english", -1.5, 1.1),
  "actdiag-prod-2": medium("english", 0.0, 1.3),
  "actdiag-lang-1": easy("english", -1.4, 1.0),
  "actdiag-lang-2": medium("english", 0.1, 1.25),
  "actdiag-conv-1": easy("english", -1.6, 1.1),
  "actdiag-conv-2": medium("english", 0.0, 1.3),
  // Math (8)
  "actdiag-numq-1": easy("math", -1.5, 1.0),
  "actdiag-numq-2": medium("math", 0.2, 1.35),
  "actdiag-algf-1": easy("math", -1.4, 1.1),
  "actdiag-algf-2": medium("math", 0.1, 1.3),
  "actdiag-geo-1": easy("math", -1.3, 1.1),
  "actdiag-geo-2": medium("math", 0.0, 1.3),
  "actdiag-stat-1": easy("math", -1.5, 1.0),
  "actdiag-stat-2": medium("math", -0.1, 1.25),
  // Reading (6)
  "actdiag-key-1": easy("reading", -1.5, 1.1),
  "actdiag-key-2": medium("reading", 0.0, 1.3),
  "actdiag-craft-1": easy("reading", -1.4, 1.0),
  "actdiag-craft-2": medium("reading", 0.1, 1.3),
  "actdiag-integ-1": medium("reading", 0.2, 1.35),
  "actdiag-integ-2": medium("reading", 0.0, 1.3),
};

const ALL_CALIBRATION: Record<string, CalibrationEntry> = {
  ...SAT_CALIBRATION,
  ...ACT_CALIBRATION,
};

/** Runtime overrides for future recalibration */
let calibrationOverrides: Record<string, Partial<DiagnosticIrtParams>> = {};

export function applyCalibrationOverrides(
  overrides: Record<string, Partial<DiagnosticIrtParams>>
): void {
  calibrationOverrides = { ...calibrationOverrides, ...overrides };
}

/** Fallback from Easy/Medium/Hard label when no table entry exists */
export function fallbackFromDifficultyLabel(
  difficulty: "Easy" | "Medium" | "Hard",
  section: DiagnosticSection
): DiagnosticIrtParams {
  const map = {
    Easy: easy(section),
    Medium: medium(section),
    Hard: hard(section),
  };
  return map[difficulty] || medium(section);
}

export function getItemCalibration(
  questionId: string,
  difficulty: "Easy" | "Medium" | "Hard",
  section: DiagnosticSection,
  inline?: DiagnosticIrtParams
): DiagnosticIrtParams {
  if (inline) return inline;

  const base = ALL_CALIBRATION[questionId];
  const override = calibrationOverrides[questionId];

  if (base) {
    return {
      section: override?.section ?? base.section,
      difficulty: override?.difficulty ?? base.difficulty,
      discrimination: override?.discrimination ?? base.discrimination,
      guessing: override?.guessing ?? base.guessing,
    };
  }

  const fallback = fallbackFromDifficultyLabel(difficulty, section);
  if (override) {
    return {
      section: override.section ?? fallback.section,
      difficulty: override.difficulty ?? fallback.difficulty,
      discrimination: override.discrimination ?? fallback.discrimination,
      guessing: override.guessing ?? fallback.guessing,
    };
  }
  return fallback;
}

export { SAT_CALIBRATION, ACT_CALIBRATION };
