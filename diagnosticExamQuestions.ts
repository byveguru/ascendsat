/** Fixed 15-question onboarding diagnostic — one per domain cluster, not from the live bank */

export type DiagnosticSection =
  | "math"
  | "reading_writing"   // SAT
  | "english"
  | "reading";          // ACT (math shared with SAT key)

export type DiagnosticIrtParams = {
  section: DiagnosticSection;
  difficulty: number;      // b — IRT difficulty
  discrimination: number;  // a
  guessing: number;        // c
};

export type DiagnosticExamQuestion = {
  id: string;
  domain: string;
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  choices: [string, string, string, string];
  answer: number;
  explanation: string;
  irt?: DiagnosticIrtParams;
};

export const DIAGNOSTIC_EXAM_QUESTIONS: DiagnosticExamQuestion[] = [
  // ── MATH · Algebra (2) ──
  {
    id: "diag-alg-1",
    domain: "Algebra",
    difficulty: "Easy",
    question: "If 3x + 7 = 22, what is the value of x?",
    choices: ["3", "5", "7", "15"],
    answer: 1,
    explanation: "Subtract 7 from both sides: 3x = 15. Divide by 3: x = 5.",
  },
  {
    id: "diag-alg-2",
    domain: "Algebra",
    difficulty: "Medium",
    question: "A line passes through the points (2, 5) and (6, 13). What is the slope of the line?",
    choices: ["1", "2", "4", "8"],
    answer: 1,
    explanation: "Slope = (13 − 5) / (6 − 2) = 8/4 = 2.",
  },
  // ── MATH · Advanced Math (2) ──
  {
    id: "diag-adv-1",
    domain: "Advanced Math",
    difficulty: "Easy",
    question: "If f(x) = 2x² + 1, what is f(3)?",
    choices: ["7", "13", "19", "37"],
    answer: 2,
    explanation: "f(3) = 2(3)² + 1 = 2(9) + 1 = 19.",
  },
  {
    id: "diag-adv-2",
    domain: "Advanced Math",
    difficulty: "Medium",
    question: "What is the sum of the solutions to x² − 5x + 6 = 0?",
    choices: ["−5", "−1", "5", "6"],
    answer: 2,
    explanation: "Factor: (x − 2)(x − 3) = 0, so x = 2 or x = 3. Sum = 5 (also visible from −b/a).",
  },
  // ── MATH · Problem Solving and Data Analysis (2) ──
  {
    id: "diag-psda-1",
    domain: "Problem Solving and Data Analysis",
    difficulty: "Easy",
    question: "What is the mean of 4, 8, and 10?",
    choices: ["6", "22/3", "8", "22"],
    answer: 1,
    explanation: "Mean = (4 + 8 + 10) / 3 = 22/3 ≈ 7.33.",
  },
  {
    id: "diag-psda-2",
    domain: "Problem Solving and Data Analysis",
    difficulty: "Medium",
    question: "A bag has 3 red marbles and 7 blue marbles. If one marble is chosen at random, what is the probability it is red?",
    choices: ["3/10", "3/7", "7/10", "1/3"],
    answer: 0,
    explanation: "P(red) = favorable / total = 3 / (3 + 7) = 3/10.",
  },
  // ── MATH · Geometry & Trigonometry (2) ──
  {
    id: "diag-geo-1",
    domain: "Geometry & Trigonometry",
    difficulty: "Easy",
    question: "In a triangle, two angles measure 50° and 60°. What is the measure of the third angle?",
    choices: ["60°", "70°", "80°", "110°"],
    answer: 1,
    explanation: "Angles in a triangle sum to 180°: 180 − 50 − 60 = 70°.",
  },
  {
    id: "diag-geo-2",
    domain: "Geometry & Trigonometry",
    difficulty: "Medium",
    question: "A circle has radius 5. What is its area?",
    choices: ["5π", "10π", "25π", "50π"],
    answer: 2,
    explanation: "Area = πr² = π(5)² = 25π.",
  },
  // ── R&W · Information and Ideas (2) ──
  {
    id: "diag-info-1",
    domain: "Information and Ideas",
    difficulty: "Easy",
    question:
      "Researchers found that city trees reduce summer air temperature by up to 4°F. The study recommends planting more trees along busy streets.\n\nWhich choice best states the main idea of the text?",
    choices: [
      "Busy streets are the hottest parts of a city",
      "Urban trees can help cool cities and should be planted strategically",
      "Summer temperatures are rising every year",
      "Scientists disagree about how trees affect weather",
    ],
    answer: 1,
    explanation: "The text links tree cooling to a practical recommendation: plant more trees on busy streets.",
  },
  {
    id: "diag-info-2",
    domain: "Information and Ideas",
    difficulty: "Medium",
    question:
      "Before electric lights, many factories ran extra night shifts only near the full moon so workers could see well enough to operate machines.\n\nWhat can most reasonably be inferred?",
    choices: [
      "Factories closed completely on moonless nights",
      "Artificial lighting made night shifts more practical year-round",
      "Workers preferred moonlit shifts to daytime work",
      "Full moons occur only once per season",
    ],
    answer: 1,
    explanation: "The passage implies natural light limited night work; electric lights would remove that constraint.",
  },
  // ── R&W · Craft & Structure (2) ──
  {
    id: "diag-craft-1",
    domain: "Craft & Structure",
    difficulty: "Easy",
    question:
      'The proposal was met with "lukewarm" support — a few members nodded, but no one volunteered to lead the project.\n\nAs used in the text, "lukewarm" most nearly means:',
    choices: ["Boiling", "Mild or unenthusiastic", "Angry", "Secret"],
    answer: 1,
    explanation: "Context shows weak interest: some nods but no volunteers, so support was half-hearted.",
  },
  {
    id: "diag-craft-2",
    domain: "Craft & Structure",
    difficulty: "Medium",
    question:
      "An essay opens by describing a cracked violin in a dusty shop window, then explains how a luthier restored it note by note.\n\nWhat is the author's most likely purpose in the opening?",
    choices: [
      "To argue that old instruments should never be repaired",
      "To introduce the subject through a vivid, specific image",
      "To list every step of violin construction",
      "To criticize modern factory-made violins",
    ],
    answer: 1,
    explanation: "The concrete image of the cracked violin hooks the reader before the restoration story.",
  },
  // ── R&W · Expression of Ideas (1) ──
  {
    id: "diag-expr-1",
    domain: "Expression of Ideas",
    difficulty: "Medium",
    question:
      "The team finished the prototype ahead of schedule. ______, they began user testing the following week.\n\nWhich choice completes the text with the most logical transition?",
    choices: ["However", "Consequently", "Nevertheless", "In contrast"],
    answer: 1,
    explanation: "Finishing early leads naturally to starting testing soon after — a cause-and-effect link.",
  },
  // ── R&W · Standard English Conventions (2) ──
  {
    id: "diag-sec-1",
    domain: "Standard English Conventions",
    difficulty: "Easy",
    question: "Which sentence is grammatically correct?",
    choices: [
      "The group of students are ready for the trip.",
      "The group of students is ready for the trip.",
      "The group of students were ready for the trip.",
      "The group of students have ready for the trip.",
    ],
    answer: 1,
    explanation: '"Group" is singular, so the verb should be "is," not "are" or "were."',
  },
  {
    id: "diag-sec-2",
    domain: "Standard English Conventions",
    difficulty: "Medium",
    question: "Which sentence correctly uses punctuation?",
    choices: [
      "After the meeting ended, we submitted the report.",
      "After the meeting ended we submitted the report.",
      "After the meeting ended; we submitted the report.",
      "After the meeting ended: we submitted the report.",
    ],
    answer: 0,
    explanation: "An introductory dependent clause should be followed by a comma before the main clause.",
  },
];
