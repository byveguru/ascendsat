// @ts-nocheck

export type PersonalizationSource = "diagnostic" | "scratch";
export type AssignmentType = "lesson" | "drill" | "quiz" | "mixed_quiz" | "review_quiz" | "vocab" | "practice_test";

export const ALL_SCHEDULE_DOMAINS = [
  "Algebra",
  "Advanced Math",
  "Problem Solving and Data Analysis",
  "Geometry & Trigonometry",
  "Information and Ideas",
  "Craft & Structure",
  "Expression of Ideas",
  "Standard English Conventions",
];

// ACT domain list (Enhanced ACT). Must match the domain strings in testConfig.ts.
export const ACT_SCHEDULE_DOMAINS = [
  "Production of Writing",
  "Knowledge of Language",
  "Conventions of Standard English",
  "Number & Quantity",
  "Algebra & Functions",
  "Geometry",
  "Statistics & Probability",
  "Key Ideas & Details",
  "Craft & Structure (ACT)",
  "Integration of Knowledge & Ideas",
  "Data Representation",
  "Research Summaries",
  "Conflicting Viewpoints",
];

export function getScheduleDomainsForTest(testType?: string): string[] {
  return testType === "act" ? ACT_SCHEDULE_DOMAINS : ALL_SCHEDULE_DOMAINS;
}

export const ASSIGNMENT_COLORS: Record<AssignmentType, string> = {
  lesson: "#3b82f6",
  drill: "#f97316",
  quiz: "#8b5cf6",
  mixed_quiz: "#06b6d4",
  review_quiz: "#22c55e",
  vocab: "#eab308",
  practice_test: "#ec4899",
};

export const ASSIGNMENT_LABELS: Record<AssignmentType, string> = {
  lesson: "Lesson",
  drill: "Drill",
  quiz: "Quiz",
  mixed_quiz: "Mixed Quiz",
  review_quiz: "Review Quiz",
  vocab: "Vocab",
  practice_test: "Practice Test",
};

export const DEFAULT_LESSON_CATALOG: { title: string; domain: string }[] = [
  { title: "Linear Equations & Slope", domain: "Algebra" },
  { title: "Systems of Equations", domain: "Algebra" },
  { title: "Inequalities & Word Problems", domain: "Algebra" },
  { title: "Quadratic Equations", domain: "Advanced Math" },
  { title: "Functions & Polynomials", domain: "Advanced Math" },
  { title: "Exponents, Radicals & Rational Expressions", domain: "Advanced Math" },
  { title: "Ratios, Rates & Proportions", domain: "Problem Solving and Data Analysis" },
  { title: "Percentages & Statistics", domain: "Problem Solving and Data Analysis" },
  { title: "Data Interpretation & Graphs", domain: "Problem Solving and Data Analysis" },
  { title: "Geometry Fundamentals", domain: "Geometry & Trigonometry" },
  { title: "Trigonometry & Special Triangles", domain: "Geometry & Trigonometry" },
  { title: "Main Idea & Inference", domain: "Information and Ideas" },
  { title: "Words in Context", domain: "Craft & Structure" },
  { title: "Text Structure & Author's Purpose", domain: "Craft & Structure" },
  { title: "Transitions & Logical Flow", domain: "Expression of Ideas" },
  { title: "Sentence Combining & Concision", domain: "Expression of Ideas" },
  { title: "Grammar: Subject-Verb & Pronoun Agreement", domain: "Standard English Conventions" },
  { title: "Punctuation Rules", domain: "Standard English Conventions" },
];

// ACT lesson catalog — titles/domains mirror actLessons.ts.
export const ACT_LESSON_CATALOG: { title: string; domain: string }[] = [
  { title: "Organization, Unity & Transitions", domain: "Production of Writing" },
  { title: "Word Choice, Concision & Style", domain: "Knowledge of Language" },
  { title: "Grammar, Punctuation & Sentence Structure", domain: "Conventions of Standard English" },
  { title: "Number & Quantity Essentials", domain: "Number & Quantity" },
  { title: "Algebra & Functions", domain: "Algebra & Functions" },
  { title: "Geometry & Trigonometry", domain: "Geometry" },
  { title: "Statistics & Probability", domain: "Statistics & Probability" },
  { title: "Finding Main Ideas & Details", domain: "Key Ideas & Details" },
  { title: "Word Meaning, Structure & Purpose", domain: "Craft & Structure (ACT)" },
  { title: "Comparing Texts & Evidence", domain: "Integration of Knowledge & Ideas" },
  { title: "Reading Graphs, Tables & Figures", domain: "Data Representation" },
  { title: "Interpreting Experiments", domain: "Research Summaries" },
  { title: "Conflicting Viewpoints", domain: "Conflicting Viewpoints" },
];

export function getLessonCatalogForTest(testType?: string): { title: string; domain: string }[] {
  return testType === "act" ? ACT_LESSON_CATALOG : DEFAULT_LESSON_CATALOG;
}

export function getAssignmentIcon(type: AssignmentType): string {
  const icons: Record<AssignmentType, string> = {
    lesson: "book-open",
    drill: "zap",
    quiz: "edit-3",
    mixed_quiz: "shuffle",
    review_quiz: "rotate-ccw",
    vocab: "type",
    practice_test: "clipboard",
  };
  return icons[type] || "target";
}
