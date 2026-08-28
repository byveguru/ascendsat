// @ts-nocheck
/* ================================================================
   testConfig.ts — multi-test abstraction (SAT, ACT, …)

   The app was originally hardcoded for the Digital SAT. This file
   centralizes everything that differs per test (section names, domain
   taxonomy, scoring scale + formulas, full-length module structure)
   so App.tsx can drive its behavior from `getTestConfig(activeTest)`
   instead of SAT-only constants.

   Design rules:
   - Domain names are GLOBALLY UNIQUE across tests, so question IDs,
     bar keys, weak-area lists and sheet rows separate for free and
     `sectionForDomain(domain)` can be a single global lookup.
   - SAT keeps its exact legacy values (zero behavior change).
================================================================ */

export type TestType = "sat" | "act";
export type TestFamily = "sat" | "act" | "ap";

export type TestSection = {
  id: string;        // "math" | "rw" | "english" | "reading" | "science"
  label: string;     // display + /usedQuestions + /scores section key
  domains: string[];
  inComposite: boolean;
};

export type FullTestModule = {
  key: string;       // module state key
  label: string;
  time: number;      // seconds
  count: number;
  domains: string[];
  section: string;   // section label
  isMath?: boolean;  // gates Desmos + formula sheet in the test shell
  optional?: boolean;// ACT Science
  breakAfter?: boolean;
};

export type TestScale = {
  sectionMin: number;
  sectionMax: number;
  compositeMin: number;
  compositeMax: number;
  step: number;      // rounding step for a section score (10 for SAT, 1 for ACT)
};

export type TestConfig = {
  id: string;
  family: TestFamily;
  label: string;                                   // "SAT" | "ACT"
  sections: TestSection[];
  allDomains: string[];                            // every domain across all sections
  scale: TestScale;
  targetPlaceholder: string;                       // "e.g. 1400" | "e.g. 30"
  defaultTarget: number;
  sectionScoreFromAccuracy: (acc: number) => number;
  compositeFromSections: (sectionScores: number[]) => number;   // composite sections only
  fullTestModules: FullTestModule[];
  domainToBarKey: Record<string, string>;
  defaultBars: Record<string, number>;             // every bar key -> 4
  accent: TestAccent;                              // per-test color scheme
};

// Per-test accent color scheme. `light`/`dark` are the primary accent for each
// theme; the `glow*` values are the translucent shadow/glow variants.
export type TestAccent = {
  light: string;
  dark: string;
  glowLight: string;
  glowDark: string;
};

/* ---------------- helpers ---------------- */
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
const mean = (arr: number[]) => (arr.length ? sum(arr) / arr.length : 0);

const barsFromKeys = (keys: string[]): Record<string, number> => {
  const out: Record<string, number> = {};
  keys.forEach((k) => { out[k] = 4; });
  return out;
};
const domainsOf = (sections: TestSection[]) => sections.flatMap((s) => s.domains);

/* ================================================================
   SAT — legacy values, unchanged behavior
================================================================ */
const SAT_MATH = [
  "Algebra",
  "Advanced Math",
  "Problem Solving and Data Analysis",
  "Geometry & Trigonometry",
];
const SAT_RW = [
  "Information and Ideas",
  "Craft & Structure",
  "Expression of Ideas",
  "Standard English Conventions",
];

const SAT_SECTIONS: TestSection[] = [
  { id: "math", label: "Math", domains: SAT_MATH, inComposite: true },
  { id: "rw", label: "Reading & Writing", domains: SAT_RW, inComposite: true },
];

const SAT_DOMAIN_TO_BAR_KEY: Record<string, string> = {
  "Algebra": "algebra",
  "Advanced Math": "advancedMath",
  "Problem Solving and Data Analysis": "dataAnalysis",
  "Geometry & Trigonometry": "geometry",
  "Information and Ideas": "infoIdeas",
  "Craft & Structure": "craftStructure",
  "Expression of Ideas": "expressionIdeas",
  "Standard English Conventions": "englishConventions",
};

export const SAT_CONFIG: TestConfig = {
  id: "sat",
  family: "sat",
  label: "SAT",
  sections: SAT_SECTIONS,
  allDomains: domainsOf(SAT_SECTIONS),
  scale: { sectionMin: 200, sectionMax: 800, compositeMin: 400, compositeMax: 1600, step: 10 },
  targetPlaceholder: "e.g. 1400",
  defaultTarget: 1200,
  sectionScoreFromAccuracy: (acc) => Math.round((200 + clamp(acc, 0, 1) * 600) / 10) * 10,
  compositeFromSections: (s) => sum(s),
  fullTestModules: [
    { key: "rw1",   label: "Reading & Writing — Module 1", time: 32 * 60, count: 27, domains: SAT_RW,   section: "Reading & Writing" },
    { key: "rw2",   label: "Reading & Writing — Module 2", time: 32 * 60, count: 27, domains: SAT_RW,   section: "Reading & Writing", breakAfter: true },
    { key: "math1", label: "Math — Module 1",              time: 35 * 60, count: 22, domains: SAT_MATH, section: "Math", isMath: true },
    { key: "math2", label: "Math — Module 2",              time: 35 * 60, count: 22, domains: SAT_MATH, section: "Math", isMath: true },
  ],
  domainToBarKey: SAT_DOMAIN_TO_BAR_KEY,
  defaultBars: barsFromKeys(Object.values(SAT_DOMAIN_TO_BAR_KEY)),
  // SAT keeps its original terracotta light accent; dark mode moved off gold to blue.
  accent: { light: "#C86A4B", dark: "#3B82F6", glowLight: "rgba(200,106,75,0.35)", glowDark: "rgba(59,130,246,0.35)" },
};

/* ================================================================
   ACT — Enhanced ACT (2025+)
   English/Math/Reading -> 1–36 composite = rounded mean.
   Science optional, separate 1–36 score, NOT in composite.
================================================================ */
export const ACT_ENGLISH = [
  "Production of Writing",
  "Knowledge of Language",
  "Conventions of Standard English",
];
export const ACT_MATH = [
  "Number & Quantity",
  "Algebra & Functions",
  "Geometry",
  "Statistics & Probability",
];
export const ACT_READING = [
  "Key Ideas & Details",
  "Craft & Structure (ACT)",
  "Integration of Knowledge & Ideas",
];
export const ACT_SCIENCE = [
  "Data Representation",
  "Research Summaries",
  "Conflicting Viewpoints",
];

const ACT_SECTIONS: TestSection[] = [
  { id: "english", label: "English", domains: ACT_ENGLISH, inComposite: true },
  { id: "math",    label: "Math",    domains: ACT_MATH,    inComposite: true },
  { id: "reading", label: "Reading", domains: ACT_READING, inComposite: true },
  { id: "science", label: "Science", domains: ACT_SCIENCE, inComposite: false },
];

const ACT_DOMAIN_TO_BAR_KEY: Record<string, string> = {
  "Production of Writing": "prodWriting",
  "Knowledge of Language": "knowLanguage",
  "Conventions of Standard English": "actConventions",
  "Number & Quantity": "numQuantity",
  "Algebra & Functions": "algFunctions",
  "Geometry": "actGeometry",
  "Statistics & Probability": "statsProb",
  "Key Ideas & Details": "keyIdeas",
  "Craft & Structure (ACT)": "actCraft",
  "Integration of Knowledge & Ideas": "integration",
  "Data Representation": "dataRep",
  "Research Summaries": "researchSumm",
  "Conflicting Viewpoints": "conflictViews",
};

export const ACT_CONFIG: TestConfig = {
  id: "act",
  family: "act",
  label: "ACT",
  sections: ACT_SECTIONS,
  allDomains: domainsOf(ACT_SECTIONS),
  scale: { sectionMin: 1, sectionMax: 36, compositeMin: 1, compositeMax: 36, step: 1 },
  targetPlaceholder: "e.g. 30",
  defaultTarget: 24,
  sectionScoreFromAccuracy: (acc) => clamp(Math.round(1 + clamp(acc, 0, 1) * 35), 1, 36),
  compositeFromSections: (s) => (s.length ? Math.round(mean(s)) : 0),
  fullTestModules: [
    { key: "eng",  label: "English",            time: 35 * 60, count: 50, domains: ACT_ENGLISH, section: "English" },
    { key: "math", label: "Math",               time: 50 * 60, count: 45, domains: ACT_MATH,    section: "Math", isMath: true, breakAfter: true },
    { key: "read", label: "Reading",            time: 40 * 60, count: 36, domains: ACT_READING, section: "Reading" },
    { key: "sci",  label: "Science (optional)", time: 40 * 60, count: 40, domains: ACT_SCIENCE, section: "Science", optional: true },
  ],
  domainToBarKey: ACT_DOMAIN_TO_BAR_KEY,
  defaultBars: barsFromKeys(Object.values(ACT_DOMAIN_TO_BAR_KEY)),
  // ACT — royal blue.
  accent: { light: "#2563EB", dark: "#60A5FA", glowLight: "rgba(37,99,235,0.35)", glowDark: "rgba(96,165,250,0.35)" },
};

/* ================================================================
   AP course catalog — the 9 offered courses. AP is ONE mode
   (activeTest="ap"); the user picks which of these they're taking
   during AP onboarding (stored in `ap.classes`). Each course has its
   own units (domains, globally-unique via a course prefix), its own
   per-class 1–5 score and progress, but shares one AP calendar.

   Each course becomes its own TestSection (id = course id), so the
   existing global `sectionForDomain(domain)` lookup resolves any AP
   unit straight to its course — no separate "which class is this
   question from" logic needed anywhere else in the app.
================================================================ */
export type ApCourse = {
  id: string;
  label: string;        // full display name
  short: string;        // compact label for cards/badges
  emoji: string;
  hasCalc: boolean;     // calculator allowed → Desmos in that course's math
  defaultTerm: "year" | "semester";
  units: string[];      // domain names (course-prefixed for global uniqueness)
};

// Units are prefixed with the course short name so they never collide across
// courses or with SAT/ACT domains, keeping `sectionForDomain` a single lookup.
const apUnits = (short: string, names: string[]) => names.map((n) => `${short}: ${n}`);

export const AP_COURSES: ApCourse[] = [
  { id: "ap-us-gov", label: "AP United States Government and Politics", short: "US Gov", emoji: "🏛️", hasCalc: false, defaultTerm: "semester",
    units: apUnits("US Gov", ["Foundations of American Democracy", "Interactions Among Branches", "Civil Liberties & Civil Rights", "American Political Ideologies & Beliefs", "Political Participation"]) },
];

export const AP_COURSE_BY_ID: Record<string, ApCourse> = Object.fromEntries(AP_COURSES.map((c) => [c.id, c]));
export const getApCourse = (id?: string): ApCourse | null => (id ? AP_COURSE_BY_ID[id] || null : null);

/* ================================================================
   AP — scored 1–5, one TestSection per course (see note above).
================================================================ */
const AP_SECTIONS: TestSection[] = AP_COURSES.map((c) => ({
  id: c.id, label: c.short, domains: c.units, inComposite: true,
}));

const AP_DOMAIN_TO_BAR_KEY: Record<string, string> = {};
AP_COURSES.forEach((c) => {
  c.units.forEach((u, i) => { AP_DOMAIN_TO_BAR_KEY[u] = `${c.id.replace(/-/g, "_")}_${i}`; });
});

export const AP_CONFIG: TestConfig = {
  id: "ap",
  family: "ap",
  label: "AP",
  sections: AP_SECTIONS,
  allDomains: domainsOf(AP_SECTIONS),
  scale: { sectionMin: 1, sectionMax: 5, compositeMin: 1, compositeMax: 5, step: 1 },
  targetPlaceholder: "e.g. 5",
  defaultTarget: 4,
  // 1–5 band from overall accuracy (approximate AP curve). FRQ accuracy is
  // its points/maxPoints fraction, blended in alongside MCQ accuracy.
  sectionScoreFromAccuracy: (acc) => {
    const a = clamp(acc, 0, 1);
    return a >= 0.75 ? 5 : a >= 0.6 ? 4 : a >= 0.45 ? 3 : a >= 0.3 ? 2 : 1;
  },
  compositeFromSections: (s) => (s.length ? Math.round(mean(s)) : 0),
  // Not used for a generic full-length AP test (each course's practice/
  // diagnostic is driven by activeApClass instead) — kept minimal but valid.
  fullTestModules: [
    { key: "mcq", label: "Multiple Choice", time: 60 * 60, count: 40, domains: domainsOf(AP_SECTIONS), section: "Multiple Choice" },
  ],
  domainToBarKey: AP_DOMAIN_TO_BAR_KEY,
  defaultBars: barsFromKeys(Object.values(AP_DOMAIN_TO_BAR_KEY)),
  // AP — emerald.
  accent: { light: "#059669", dark: "#34D399", glowLight: "rgba(5,150,105,0.35)", glowDark: "rgba(52,211,153,0.35)" },
};

/* ================================================================
   Registry + lookups
================================================================ */
export const TEST_CONFIGS: Record<string, TestConfig> = {
  sat: SAT_CONFIG,
  act: ACT_CONFIG,
  ap: AP_CONFIG,
};

export const getTestConfig = (t?: string): TestConfig => TEST_CONFIGS[t] || SAT_CONFIG;

export const getTestsByFamily = (family: TestFamily): TestConfig[] =>
  Object.values(TEST_CONFIGS).filter((c) => c.family === family);

// Global domain -> section lookup (safe because domain names are unique across tests).
export const sectionForDomain = (domain: string): TestSection | null => {
  for (const cfg of Object.values(TEST_CONFIGS)) {
    const s = cfg.sections.find((sec) => sec.domains.includes(domain));
    if (s) return s;
  }
  return null;
};

export const testTypeForDomain = (domain: string): string => {
  for (const cfg of Object.values(TEST_CONFIGS)) {
    if (cfg.allDomains.includes(domain)) return cfg.id;
  }
  return "sat";
};

// Section-label lookup used by markQuestionsAsUsed / usedQuestions keying.
export const sectionLabelForDomain = (domain: string): string =>
  sectionForDomain(domain)?.label || "English";
