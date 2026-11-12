// @ts-nocheck

import {
  ALL_SCHEDULE_DOMAINS,
  ASSIGNMENT_COLORS,
  ASSIGNMENT_LABELS,
  DEFAULT_LESSON_CATALOG,
  type AssignmentType,
  type PersonalizationSource,
} from "./scheduleCatalog";

export type StudyMode = "standard" | "extended";
export type Weekday = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
export type StudyBlockType = "warmup" | "core" | "review" | "timed" | "vocab" | "diagnostic" | "lesson" | "drill" | "quiz" | "mixed_quiz" | "review_quiz" | "practice_test";
export type StudyDayStatus = "rest" | "pending" | "completed" | "missed";

export type StudyBlock = {
  title: string;
  type: StudyBlockType;
  assignmentType: AssignmentType;
  duration: number;
  focus: string;
  reason: string;
  questionCount?: number;
  lessonTitle?: string;
  difficulty?: string;
  color: string;
};

export type StudyDayEntry = {
  status: StudyDayStatus;
  blocks: StudyBlock[];
  questionTarget: number;
  studyMode?: StudyMode;
  completedAt?: string;
  completionPct?: number;
};

export type StudyDayModes = Partial<Record<Weekday, StudyMode>>;

export type StudySchedule = {
  version: number;
  generatedAt: string;
  testDate: string;
  studyMode: StudyMode;
  studyDays: Weekday[];
  studyDayModes?: StudyDayModes;
  personalizationSource?: PersonalizationSource;
  horizonEnd: string;
  consecutiveMissed: number;
  // Highest consecutiveMissed value the student has already seen/acted on via
  // the reschedule prompt (compress, extend, or dismiss). The prompt only
  // re-fires once consecutiveMissed climbs past this — otherwise it would nag
  // on every dashboard visit even after the student made a choice.
  acknowledgedMissed?: number;
  days: Record<string, StudyDayEntry>;
};

export type SkillScoreInput = {
  domain: string;
  accuracy: number;
  priority: number;
  total?: number;
  // Mastery Engine 2.0 fields — optional and additive so any existing caller
  // that only ever built {domain, accuracy, priority, total} keeps working
  // unchanged; pickDomains below only branches on these when they're present.
  masteryPct?: number | null;
  confidence?: string;
  status?: string;
};

export type BuildScheduleInput = {
  startDate: string;
  testDate: string;
  studyDays: Weekday[];
  studyMode: StudyMode;
  studyDayModes?: StudyDayModes;
  skillScores: SkillScoreInput[];
  weakAreas?: string[];
  sm2DueCount?: number;
  personalizationSource?: PersonalizationSource;
  diagnosticWeakDomains?: string[];
  lessonCatalog?: { title: string; domain: string }[];
  practiceTestDay?: Weekday;
  allDomains?: string[];   // full domain list for the active test (defaults to SAT's ALL_SCHEDULE_DOMAINS)
};

export { ASSIGNMENT_COLORS, ASSIGNMENT_LABELS, type AssignmentType, type PersonalizationSource };

export const WEEKDAYS: Weekday[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const PRACTICE_TEST_DURATION_MINS = 134;

export const DEFAULT_STUDY_DAYS: Weekday[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export const STUDY_MODE_PRESETS: Record<
  StudyMode,
  { dailyMins: number; questionTarget: number; studyStyle: "structured" | "flexible"; label: string; description: string }
> = {
  standard: {
    dailyMins: 35,
    questionTarget: 20,
    studyStyle: "structured",
    label: "Standard",
    description: "Balanced, consistency-first ? ~35 min/day ? steady progression through all domains",
  },
  extended: {
    dailyMins: 75,
    questionTarget: 40,
    studyStyle: "structured",
    label: "Extended",
    description: "Mastery, high-volume ? ~75 min/day ? harder sets and deeper review",
  },
};

const WEEKDAY_INDEX: Record<Weekday, number> = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  Sun: 0,
};

export function toDateStr(d: Date): string {
  if (!d || isNaN(d.getTime())) throw new RangeError("Invalid time value");
  return d.toISOString().split("T")[0];
}

export function normalizeDateStr(dateInput: string | Date | null | undefined, fallback?: string): string {
  const fb = fallback || toDateStr(new Date());
  if (!dateInput) return fb;
  if (dateInput instanceof Date) {
    return isNaN(dateInput.getTime()) ? fb : toDateStr(dateInput);
  }
  const s = String(dateInput).trim();
  if (!s) return fb;
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const head = s.slice(0, 10);
  if (/^\d{4}-\d{2}-\d{2}$/.test(head)) return head;
  const parsed = new Date(s);
  return isNaN(parsed.getTime()) ? fb : toDateStr(parsed);
}

export function parseDateStr(dateStr: string): Date {
  const normalized = normalizeDateStr(dateStr);
  const [y, m, d] = normalized.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function getWeekdayLabel(d: Date): Weekday {
  const labels: Weekday[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return labels[d.getDay()];
}

export function daysBetween(startStr: string, endStr: string): number {
  const start = parseDateStr(startStr);
  const end = parseDateStr(endStr);
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

export function addDays(dateStr: string, n: number): string {
  const d = parseDateStr(dateStr);
  d.setDate(d.getDate() + n);
  return toDateStr(d);
}

export function inferStudyModeFromDailyMins(dailyMins?: number): StudyMode {
  return (dailyMins || 35) <= 45 ? "standard" : "extended";
}

export function getStudyDaysFromModes(studyDayModes?: StudyDayModes): Weekday[] {
  if (!studyDayModes) return [];
  return WEEKDAYS.filter((d) => studyDayModes[d]);
}

export function buildStudyDayModesFromLegacy(studyDays: Weekday[], studyMode: StudyMode): StudyDayModes {
  const modes: StudyDayModes = {};
  studyDays.forEach((d) => { modes[d] = studyMode; });
  return modes;
}

export function resolveModeForWeekday(weekday: Weekday, studyDayModes: StudyDayModes | undefined, fallback: StudyMode): StudyMode {
  return studyDayModes?.[weekday] || fallback;
}

export function getStudyDatesInRange(startStr: string, endStr: string, studyDays: Weekday[]): string[] {
  const allowed = new Set(studyDays);
  const dates: string[] = [];
  let cursor = startStr;
  const end = endStr;
  while (cursor <= end) {
    const wd = getWeekdayLabel(parseDateStr(cursor));
    if (allowed.has(wd)) dates.push(cursor);
    cursor = addDays(cursor, 1);
  }
  return dates;
}

export function getPracticeTestOnlyDatesInRange(
  startStr: string,
  endStr: string,
  practiceTestDay: Weekday,
  studyDays: Weekday[]
): string[] {
  const studySet = new Set(studyDays);
  if (studySet.has(practiceTestDay)) return [];
  const dates: string[] = [];
  let cursor = startStr;
  while (cursor <= endStr) {
    const wd = getWeekdayLabel(parseDateStr(cursor));
    if (wd === practiceTestDay) dates.push(cursor);
    cursor = addDays(cursor, 1);
  }
  return dates;
}

function pickDomains(
  skillScores: SkillScoreInput[],
  weakAreas: string[] | undefined,
  sessionIndex: number,
  source: PersonalizationSource = "diagnostic",
  allDomains: string[] = ALL_SCHEDULE_DOMAINS
): string[] {
  if (source === "scratch") {
    const rotate = sessionIndex % allDomains.length;
    return [...allDomains.slice(rotate), ...allDomains.slice(0, rotate)];
  }
  // Mastery-aware ordering, same idea as App.tsx's getEffectiveWeakAreas:
  // a domain flagged needsReview (regression on previously proved/mastered
  // material) jumps ahead of the normal priority sort; a domain already
  // proved/mastered sinks behind it instead. Falls through to the original
  // pure-priority sort whenever `status` isn't present on the input at all,
  // so any caller not yet passing Mastery Engine data behaves identically
  // to before.
  const statusRank = (s: SkillScoreInput): number => {
    if (s.status === "needsReview") return 0;
    if (s.status === "proved" || s.status === "mastered") return 2;
    return 1;
  };
  const fromScores = [...skillScores]
    .sort((a, b) => {
      const rankDiff = statusRank(a) - statusRank(b);
      if (rankDiff !== 0) return rankDiff;
      return (b.priority || 0) - (a.priority || 0);
    })
    .map((s) => s.domain);
  const merged = [...new Set([...(weakAreas || []), ...fromScores])].filter(Boolean);
  if (!merged.length) {
    return [...allDomains];
  }
  const rotate = sessionIndex % merged.length;
  return [...merged.slice(rotate), ...merged.slice(0, rotate)];
}

function buildLessonSequence(
  count: number,
  domains: string[],
  catalog: { title: string; domain: string }[],
  source: PersonalizationSource,
  allDomains: string[] = ALL_SCHEDULE_DOMAINS
): { title: string; domain: string }[] {
  const orderedDomains = source === "scratch"
    ? [...allDomains]
    : (domains.length ? domains : allDomains);
  const byDomain: Record<string, { title: string; domain: string }[]> = {};
  catalog.forEach((lesson) => {
    if (!byDomain[lesson.domain]) byDomain[lesson.domain] = [];
    byDomain[lesson.domain].push(lesson);
  });
  const pointers: Record<string, number> = {};
  orderedDomains.forEach((d) => { pointers[d] = 0; });

  const sequence: { title: string; domain: string }[] = [];
  let safety = 0;
  while (sequence.length < count && safety < count * 20) {
    safety += 1;
    let added = false;
    for (const domain of orderedDomains) {
      const pool = byDomain[domain];
      if (!pool?.length) continue;
      const idx = pointers[domain] % pool.length;
      sequence.push(pool[idx]);
      pointers[domain] += 1;
      added = true;
      if (sequence.length >= count) break;
    }
    if (!added) break;
  }

  while (sequence.length < count && catalog.length) {
    sequence.push(catalog[sequence.length % catalog.length]);
  }
  return sequence;
}

export function makeBlock(
  assignmentType: AssignmentType,
  title: string,
  focus: string,
  reason: string,
  duration: number,
  questionCount: number,
  extras: Partial<StudyBlock> = {}
): StudyBlock {
  const legacyType: StudyBlockType = assignmentType === "lesson"
    ? "core"
    : assignmentType === "drill"
      ? "warmup"
      : assignmentType === "quiz" || assignmentType === "mixed_quiz"
        ? "timed"
        : assignmentType === "review_quiz"
          ? "review"
          : assignmentType === "practice_test"
            ? "timed"
            : assignmentType;
  return {
    title,
    type: legacyType,
    assignmentType,
    duration,
    focus,
    reason,
    questionCount,
    color: ASSIGNMENT_COLORS[assignmentType],
    ...extras,
  };
}

function difficultyForSession(
  studyMode: StudyMode,
  sessionIndex: number,
  daysUntilTest: number
): { warmup: string; core: string; timed: string } {
  const hardBias = studyMode === "extended";
  if (daysUntilTest <= 14) {
    return hardBias
      ? { warmup: "Medium", core: "Hard", timed: "Hard" }
      : { warmup: "Easy", core: "Hard", timed: "Medium" };
  }
  if (daysUntilTest <= 30) {
    return hardBias
      ? { warmup: "Medium", core: "Hard", timed: "Hard" }
      : { warmup: "Easy", core: "Medium", timed: "Medium" };
  }
  return hardBias
    ? { warmup: "Medium", core: "Medium", timed: "Hard" }
    : { warmup: "Easy", core: "Medium", timed: "Medium" };
}

function makePracticeTestBlock(): StudyBlock {
  return makeBlock(
    "practice_test",
    "Full Practice Test",
    "mixed",
    "Your weekly timed practice test - allow ~2 hr 14 min",
    PRACTICE_TEST_DURATION_MINS,
    0
  );
}

export function finalizeDayBlocks(blocks: StudyBlock[], studyMode: StudyMode, isPracticeTestDay: boolean): StudyBlock[] {
  const trimmed = blocks.slice(0, studyMode === "extended" ? 5 : 4);
  if (isPracticeTestDay) trimmed.push(makePracticeTestBlock());
  return trimmed;
}

function buildBlocksForDay(
  lesson: { title: string; domain: string },
  domains: string[],
  studyMode: StudyMode,
  sessionIndex: number,
  isReviewDay: boolean,
  sm2DueCount: number,
  daysUntilTest: number,
  source: PersonalizationSource,
  weekday: Weekday,
  practiceTestDay?: Weekday
): StudyBlock[] {
  const isPracticeTestDay = practiceTestDay && weekday === practiceTestDay;
  const preset = STUDY_MODE_PRESETS[studyMode];
  const diffs = difficultyForSession(studyMode, sessionIndex, daysUntilTest);
  const secondary = domains[1] || domains[0] || lesson.domain;
  const isMixedDay = sessionIndex > 0 && sessionIndex % 5 === 4;

  if (isReviewDay) {
    const blocks = [
      makeBlock(
        "review_quiz",
        `Review Quiz: ${lesson.domain}`,
        lesson.domain,
        source === "diagnostic"
          ? "Revisit mistakes in your weakest areas"
          : "Consolidate recent practice across domains",
        studyMode === "extended" ? 25 : 18,
        Math.round(preset.questionTarget * 0.45),
        { difficulty: diffs.core }
      ),
      makeBlock(
        "mixed_quiz",
        "Mixed Quiz",
        "mixed",
        "Cross-domain questions to mimic test-day switching",
        studyMode === "extended" ? 22 : 15,
        Math.round(preset.questionTarget * 0.35),
        { difficulty: diffs.timed }
      ),
    ];
    if (studyMode === "extended" || sessionIndex % 8 === 7) {
      blocks.push(makeBlock(
        "vocab",
        "Vocab Sprint",
        "vocab",
        "Keep high-frequency words fresh",
        studyMode === "extended" ? 15 : 10,
        studyMode === "extended" ? 12 : 8
      ));
    }
    return finalizeDayBlocks(blocks, studyMode, Boolean(isPracticeTestDay));
  }

  const blocks: StudyBlock[] = [
    makeBlock(
      "lesson",
      `Lesson: ${lesson.title}`,
      lesson.domain,
      source === "diagnostic"
        ? `Targeted lesson for a priority weak area`
        : `Foundational lesson in your study rotation`,
      studyMode === "extended" ? 20 : 15,
      0,
      { lessonTitle: lesson.title, difficulty: diffs.core }
    ),
    makeBlock(
      "drill",
      `Drill: ${lesson.domain}`,
      lesson.domain,
      `${diffs.core} drill to apply what you learned`,
      studyMode === "extended" ? 22 : 14,
      Math.round(preset.questionTarget * 0.4),
      { difficulty: diffs.core }
    ),
    makeBlock(
      "quiz",
      `Quiz: ${lesson.domain}`,
      lesson.domain,
      `Short quiz to check understanding`,
      studyMode === "extended" ? 18 : 12,
      Math.round(preset.questionTarget * 0.35),
      { difficulty: diffs.timed }
    ),
  ];

  if (isMixedDay) {
    blocks.push(makeBlock(
      "mixed_quiz",
      "Mixed Quiz",
      "mixed",
      "Blend math and reading/writing in one set",
      studyMode === "extended" ? 20 : 12,
      Math.round(preset.questionTarget * 0.25),
      { difficulty: diffs.timed }
    ));
  }

  if (sm2DueCount > 0 && sessionIndex % 3 === 2) {
    blocks.push(makeBlock(
      "review_quiz",
      "Spaced Review",
      lesson.domain,
      `${sm2DueCount} spaced-repetition item${sm2DueCount > 1 ? "s" : ""} due`,
      studyMode === "extended" ? 15 : 10,
      Math.min(sm2DueCount, Math.round(preset.questionTarget * 0.2))
    ));
  } else if (studyMode === "extended") {
    blocks.push(makeBlock(
      "drill",
      `Extra Drill: ${secondary}`,
      secondary,
      "Extended session ? reinforce your next priority domain",
      18,
      Math.round(preset.questionTarget * 0.2),
      { difficulty: diffs.timed }
    ));
  }

  return finalizeDayBlocks(blocks, studyMode, Boolean(isPracticeTestDay));
}

export function resolveScheduleEndDate(startDate: string, testDate: string): string {
  const start = normalizeDateStr(startDate);
  const test = normalizeDateStr(testDate);
  const bufferEnd = addDays(test, -3);
  if (bufferEnd >= start) return bufferEnd;
  if (test >= start) return test;
  return addDays(start, 84);
}

export function countStudyDaysInSchedule(schedule: StudySchedule | null | undefined): number {
  if (!schedule?.days) return 0;
  return Object.values(schedule.days).filter((d) => d && d.status !== "rest" && d.blocks?.length).length;
}

export function hasUsableStudySchedule(schedule: StudySchedule | null | undefined): boolean {
  return countStudyDaysInSchedule(schedule) > 0;
}

export function sanitizeScheduleForFirestore(schedule: StudySchedule): StudySchedule {
  return JSON.parse(JSON.stringify(schedule));
}

export function buildRuleBasedSchedule(input: BuildScheduleInput): StudySchedule {
  const startDate = normalizeDateStr(input.startDate);
  const testDate = normalizeDateStr(input.testDate);
  const studyDayModes = input.studyDayModes && Object.keys(input.studyDayModes).length
    ? input.studyDayModes
    : buildStudyDayModesFromLegacy(input.studyDays, input.studyMode);
  const activeStudyDays = getStudyDaysFromModes(studyDayModes);
  const endDate = resolveScheduleEndDate(startDate, testDate);
  const studyDates = getStudyDatesInRange(startDate, endDate, activeStudyDays.length ? activeStudyDays : input.studyDays);
  const source = input.personalizationSource || "diagnostic";
  const allDomains = input.allDomains?.length ? input.allDomains : ALL_SCHEDULE_DOMAINS;
  const priorityDomains = source === "diagnostic"
    ? [...new Set([...(input.diagnosticWeakDomains || []), ...(input.weakAreas || [])])].filter(Boolean)
    : [...allDomains];
  const catalog = input.lessonCatalog?.length ? input.lessonCatalog : DEFAULT_LESSON_CATALOG;
  const lessonSequence = buildLessonSequence(studyDates.length, priorityDomains, catalog, source, allDomains);
  const days: Record<string, StudyDayEntry> = {};

  let sessionIndex = 0;
  studyDates.forEach((dateStr) => {
    const weekday = getWeekdayLabel(parseDateStr(dateStr));
    const dayMode = resolveModeForWeekday(weekday, studyDayModes, input.studyMode);
    const preset = STUDY_MODE_PRESETS[dayMode];
    const daysUntilTest = daysBetween(dateStr, testDate);
    const isReviewDay = sessionIndex > 0 && sessionIndex % 4 === 3;
    const domains = pickDomains(input.skillScores, input.weakAreas, sessionIndex, source, allDomains);
    const lesson = lessonSequence[sessionIndex] || { title: "SAT Foundations", domain: domains[0] || "Algebra" };
    const blocks = buildBlocksForDay(
      lesson,
      domains,
      dayMode,
      sessionIndex,
      isReviewDay,
      input.sm2DueCount || 0,
      daysUntilTest,
      source,
      weekday,
      input.practiceTestDay
    );
    days[dateStr] = {
      status: "pending",
      blocks,
      questionTarget: preset.questionTarget,
      studyMode: dayMode,
      completionPct: 0,
    };
    sessionIndex += 1;
  });

  if (input.practiceTestDay) {
    const practiceOnlyDates = getPracticeTestOnlyDatesInRange(
      startDate,
      endDate,
      input.practiceTestDay,
      activeStudyDays.length ? activeStudyDays : input.studyDays
    );
    practiceOnlyDates.forEach((dateStr) => {
      days[dateStr] = {
        status: "pending",
        blocks: [makePracticeTestBlock()],
        questionTarget: 0,
        studyMode: input.studyMode,
        completionPct: 0,
      };
    });
  }

  const allDates = Object.keys(days).sort();
  const cursor = input.startDate;
  let walk = cursor;
  while (walk <= endDate) {
    if (!days[walk]) {
      days[walk] = { status: "rest", blocks: [], questionTarget: 0, completionPct: 0 };
    }
    walk = addDays(walk, 1);
  }

  return {
    version: 4,
    generatedAt: new Date().toISOString(),
    testDate,
    studyMode: input.studyMode,
    studyDays: activeStudyDays.length ? activeStudyDays : input.studyDays,
    studyDayModes,
    personalizationSource: source,
    horizonEnd: allDates[allDates.length - 1] || endDate,
    consecutiveMissed: 0,
    days,
  };
}

/* ================================================================
   AP combined calendar — one shared schedule spanning every AP class
   the student picked in onboarding, instead of one domain pool.

   Each study date is assigned to exactly one class (so every clickable
   block routes to a single, real AP course via its unit domain — see
   sectionForDomain in testConfig.ts), rather than mixing classes within
   a day the way SAT/ACT's mixed_quiz blocks do.

   - "auto" mode: classes round-robin across study dates. Semester-term
     classes get more frequent turns than year-long ones (weightForTerm),
     modeling that a compressed-term course has less in-class reinforcement
     time and benefits from denser app practice.
   - "custom" mode: subjectDayPrefs pins a class to a specific weekday
     (0=Sun..6=Sat); any study date whose weekday has no pin falls back to
     the same weighted round-robin used by "auto" mode among the classes
     that need a turn.
================================================================ */
export type ApClassScheduleInput = {
  testDate?: string;
  id: string;
  short: string;
  term: "year" | "semester";
  units: string[];
  lessonCatalog: { title: string; domain: string }[];
};

export type BuildApScheduleInput = {
  startDate: string;
  testDate: string;
  studyDays: Weekday[];
  studyMode: StudyMode;
  studyDayModes?: StudyDayModes;
  scheduleMode: "auto" | "custom";
  subjectDayPrefs?: Record<string, number>;
  classes: ApClassScheduleInput[];
};

function weightForTerm(term: "year" | "semester"): number {
  return term === "semester" ? 3 : 2;
}

export function buildApCombinedSchedule(input: BuildApScheduleInput): StudySchedule {
  const startDate = normalizeDateStr(input.startDate);
  const testDate = normalizeDateStr(input.testDate);
  const studyDayModes = input.studyDayModes && Object.keys(input.studyDayModes).length
    ? input.studyDayModes
    : buildStudyDayModesFromLegacy(input.studyDays, input.studyMode);
  const activeStudyDays = getStudyDaysFromModes(studyDayModes);
  const endDate = resolveScheduleEndDate(startDate, testDate);
  const studyDates = getStudyDatesInRange(startDate, endDate, activeStudyDays.length ? activeStudyDays : input.studyDays);
  const classes = input.classes || [];
  const days: Record<string, StudyDayEntry> = {};

  if (classes.length) {
    // Per-class rotation pointers so each class cycles through its own units
    // and lessons independently over the life of the schedule.
    const classState: Record<string, { unitPtr: number; lessonByUnit: Record<string,number>; sessionIdx: number }> = {};
    classes.forEach((c) => { classState[c.id] = { unitPtr: 0, lessonByUnit: {}, sessionIdx: 0 }; });

    // Weighted fallback order used by "auto" mode, and by "custom" mode on any
    // weekday that has no pinned class.
    const weightedOrder: string[] = [];
    classes.forEach((c) => { for (let i = 0; i < weightForTerm(c.term); i++) weightedOrder.push(c.id); });
    let fallbackCursor = 0;

    const pinnedByWeekdayIdx: Record<number, string[]> = {};
    const pinnedCursors = {};
    if (input.scheduleMode === "custom") {
      Object.entries(input.subjectDayPrefs || {}).forEach(([courseId, wdIdx]) => {
        if (classes.some((c) => c.id === courseId)) (pinnedByWeekdayIdx[Number(wdIdx)] ||= []).push(courseId);
      });
    }

    studyDates.forEach((dateStr) => {
      const weekday = getWeekdayLabel(parseDateStr(dateStr));
      const dayMode = resolveModeForWeekday(weekday, studyDayModes, input.studyMode);
      const preset = STUDY_MODE_PRESETS[dayMode];
      const jsWeekdayIdx = parseDateStr(dateStr).getDay();

      const eligible=classes.filter(c=>c.units.length && (!c.testDate || dateStr<normalizeDateStr(c.testDate)));
      const pinned=(pinnedByWeekdayIdx[jsWeekdayIdx]||[]).filter(id=>eligible.some(c=>c.id===id));
      const pinCursor=pinnedCursors[jsWeekdayIdx]||0;
      let course=pinned.length ? eligible.find(c=>c.id===pinned[pinCursor%pinned.length]) : null;
      if(course) pinnedCursors[jsWeekdayIdx]=pinCursor+1;
      const eligibleOrder=weightedOrder.filter(id=>eligible.some(c=>c.id===id));
      if(!course&&eligibleOrder.length){course=eligible.find(c=>c.id===eligibleOrder[fallbackCursor%eligibleOrder.length]);fallbackCursor+=1;}
      if (!course) return;

      const state = classState[course.id];
      const unit = course.units[state.unitPtr % course.units.length] || course.units[0];
      state.unitPtr += 1;
      const isReviewDay = state.sessionIdx > 0 && state.sessionIdx % 4 === 3;
      state.sessionIdx += 1;

      const lessonPool = course.lessonCatalog.filter((l) => l.domain === unit);
      const lesson = lessonPool.length
        ? lessonPool[(state.lessonByUnit[unit]||0) % lessonPool.length]
        : (course.lessonCatalog.length ? course.lessonCatalog[0] : null);
      if(!isReviewDay&&lesson) state.lessonByUnit[unit]=(state.lessonByUnit[unit]||0)+1;

      const blocks: StudyBlock[] = [];
      if (!isReviewDay && lesson) {
        blocks.push(makeBlock(
          "lesson",
          `${course.short}: ${lesson.title}`,
          unit,
          `Lesson for ${course.short}`,
          dayMode === "extended" ? 20 : 15,
          0,
          { lessonTitle: lesson.title }
        ));
      }
      blocks.push(makeBlock(
        "quiz",
        isReviewDay ? `${course.short} Review: ${unit}` : `${course.short} Quiz: ${unit}`,
        unit,
        isReviewDay ? `Review quiz across ${course.short}'s units` : `Practice quiz for today's ${course.short} unit`,
        dayMode === "extended" ? 20 : 14,
        Math.round(preset.questionTarget * (isReviewDay ? 0.5 : 0.4)),
        { difficulty: dayMode === "extended" ? "Hard" : "Medium" }
      ));

      days[dateStr] = {
        status: "pending",
        blocks: finalizeDayBlocks(blocks, dayMode, false),
        questionTarget: preset.questionTarget,
        studyMode: dayMode,
        completionPct: 0,
      };
    });
  }

  const allDates = Object.keys(days).sort();
  let walk = startDate;
  while (walk <= endDate) {
    if (!days[walk]) days[walk] = { status: "rest", blocks: [], questionTarget: 0, completionPct: 0 };
    walk = addDays(walk, 1);
  }

  return {
    version: 4,
    generatedAt: new Date().toISOString(),
    testDate,
    studyMode: input.studyMode,
    studyDays: activeStudyDays.length ? activeStudyDays : input.studyDays,
    studyDayModes,
    personalizationSource: "diagnostic",
    horizonEnd: allDates[allDates.length - 1] || endDate,
    consecutiveMissed: 0,
    days,
  };
}

export function mergeAiScheduleBlocks(
  schedule: StudySchedule,
  aiByDate: Record<string, Partial<StudyBlock>[]>
): StudySchedule {
  const nextDays = { ...schedule.days };
  Object.entries(aiByDate).forEach(([dateStr, aiBlocks]) => {
    const existing = nextDays[dateStr];
    if (!existing || existing.status === "rest" || !aiBlocks?.length) return;
    nextDays[dateStr] = {
      ...existing,
      blocks: existing.blocks.map((block, i) => {
        const ai = aiBlocks[i];
        if (!ai) return block;
        return {
          ...block,
          title: ai.title || block.title,
          reason: ai.reason || block.reason,
          duration: ai.duration || block.duration,
        };
      }),
    };
  });
  return { ...schedule, days: nextDays, generatedAt: new Date().toISOString() };
}

export function resolveDayStatus(entry: StudyDayEntry, dateStr: string, todayStr: string): StudyDayStatus {
  if (!entry || entry.status === "rest") return "rest";
  if (entry.status === "completed") return "completed";
  if (dateStr < todayStr) return "missed";
  return "pending";
}

export function refreshScheduleStatuses(schedule: StudySchedule, todayStr: string): StudySchedule {
  const days = { ...schedule.days };
  Object.keys(days).forEach((dateStr) => {
    const entry = days[dateStr];
    if (!entry || entry.status === "rest" || entry.status === "completed") return;
    days[dateStr] = { ...entry, status: resolveDayStatus(entry, dateStr, todayStr) };
  });
  const consecutiveMissed = detectConsecutiveMissed(days, schedule.studyDays, todayStr);
  return { ...schedule, days, consecutiveMissed };
}

export function detectConsecutiveMissed(
  days: Record<string, StudyDayEntry>,
  studyDays: Weekday[],
  todayStr: string
): number {
  const studyDateList = Object.keys(days)
    .filter((d) => d < todayStr && days[d]?.status !== "rest")
    .sort()
    .reverse();
  let streak = 0;
  for (const dateStr of studyDateList) {
    const entry = days[dateStr];
    if (!entry || entry.status === "rest") continue;
    if (entry.status === "missed") streak += 1;
    else break;
  }
  return streak;
}

export function markStudyDayCompleted(
  schedule: StudySchedule,
  dateStr: string,
  completionPct = 100
): StudySchedule {
  const entry = schedule.days[dateStr];
  if (!entry || entry.status === "rest") return schedule;
  const days = {
    ...schedule.days,
    [dateStr]: {
      ...entry,
      status: "completed",
      completionPct,
      completedAt: new Date().toISOString(),
    },
  };
  return { ...schedule, days, consecutiveMissed: 0 };
}

export function compressMissedDays(schedule: StudySchedule, todayStr: string): StudySchedule {
  const missedDates = Object.keys(schedule.days)
    .filter((d) => schedule.days[d]?.status === "missed")
    .sort();
  if (!missedDates.length) return schedule;

  const missedBlocks = missedDates.flatMap((d) => schedule.days[d]?.blocks || []);

  // Their blocks were already pulled into missedBlocks above and redistributed
  // to upcoming days below, so these days are resolved — mark them "rest" (not
  // "missed") or refreshScheduleStatuses/detectConsecutiveMissed below would
  // keep counting them and consecutiveMissed would never drop.
  const days = { ...schedule.days };
  missedDates.forEach((d) => {
    days[d] = { ...days[d], status: "rest", blocks: [], questionTarget: 0 };
  });

  const upcomingDates = Object.keys(days)
    .filter((d) => d >= todayStr && days[d]?.status === "pending")
    .sort();

  // Spread every missed block across all upcoming pending days (not just the
  // first 2, 2-blocks-each) so a longer missed streak doesn't silently lose
  // whatever didn't fit in that fixed 4-block cap.
  if (upcomingDates.length && missedBlocks.length) {
    const perDay = Math.ceil(missedBlocks.length / upcomingDates.length);
    upcomingDates.forEach((dateStr, idx) => {
      const extra = missedBlocks.slice(idx * perDay, idx * perDay + perDay);
      if (!extra.length) return;
      const entry = days[dateStr];
      days[dateStr] = {
        ...entry,
        blocks: [
          ...entry.blocks,
          ...extra.map((b) => ({ ...b, title: `Catch-up: ${b.title}`, reason: "Merged from missed session" })),
        ],
        questionTarget: entry.questionTarget + extra.reduce((s, b) => s + (b.questionCount || 5), 0),
      };
    });
  }

  // Stamp version 4 even if the source schedule predated it — otherwise a
  // legacy schedule's version never advances, and migrateStudyScheduleIfNeeded
  // (App.tsx) keeps treating it as needing a full rebuild on every load, which
  // — before preserveCompletedDays learned about "rest" days above — silently
  // discarded the compress the very next time the app opened.
  return refreshScheduleStatuses({ ...schedule, days, generatedAt: new Date().toISOString(), version: 4 }, todayStr);
}

export function extendSchedule(schedule: StudySchedule, todayStr: string, extraStudyDays = 3): StudySchedule {
  const lastDate = schedule.horizonEnd || todayStr;
  const newEnd = addDays(lastDate, extraStudyDays * 2);
  const bufferEnd = addDays(schedule.testDate, -3);
  const endDate = newEnd <= bufferEnd ? newEnd : bufferEnd;
  if (endDate <= lastDate) return schedule;

  const existingPending = Object.entries(schedule.days)
    .filter(([d, e]) => d >= todayStr && e.status === "pending")
    .sort(([a], [b]) => a.localeCompare(b));

  const newStudyDates = getStudyDatesInRange(addDays(lastDate, 1), endDate, schedule.studyDays);
  const days = { ...schedule.days };
  let i = 0;
  newStudyDates.forEach((dateStr) => {
    if (days[dateStr]) return;
    const template = existingPending[i % Math.max(existingPending.length, 1)]?.[1];
    if (template) {
      days[dateStr] = { ...template, status: "pending", completedAt: undefined, completionPct: 0 };
      i += 1;
    }
  });

  const allStudyDates = Object.keys(days).filter((d) => days[d].status !== "rest").sort();
  return refreshScheduleStatuses(
    {
      ...schedule,
      days,
      horizonEnd: allStudyDates[allStudyDates.length - 1] || endDate,
      generatedAt: new Date().toISOString(),
      version: 4,
    },
    todayStr
  );
}

export function preserveCompletedDays(
  oldSchedule: StudySchedule | null | undefined,
  newSchedule: StudySchedule
): StudySchedule {
  if (!oldSchedule?.days) return newSchedule;
  const days = { ...newSchedule.days };
  Object.entries(oldSchedule.days).forEach(([dateStr, oldEntry]) => {
    if (!days[dateStr]) return;
    if (oldEntry.status === "completed") {
      days[dateStr] = { ...days[dateStr], ...oldEntry, status: "completed" };
    } else if (oldEntry.status === "rest") {
      // A "rest" day here isn't necessarily a normal non-study weekday — compressMissedDays
      // rewrites missed days to "rest" (with their blocks redistributed elsewhere) so they
      // stop counting as missed. If a full regeneration didn't carry that over, this date
      // would come back as a fresh "pending" day, which the next status refresh immediately
      // flips to "missed" again — silently undoing the compress the moment the user returns.
      days[dateStr] = { ...days[dateStr], ...oldEntry, status: "rest" };
    }
  });
  return { ...newSchedule, days };
}

export function getSprintQuestionCount(studyMode: StudyMode): number {
  return studyMode === "extended" ? 8 : 5;
}

export function studyDaySummary(entry: StudyDayEntry | undefined): string {
  if (!entry || entry.status === "rest") return "Rest day";
  if (!entry.blocks?.length) return "No blocks scheduled";
  return entry.blocks.map((b) => b.title).join(" ? ");
}

export function getDayAssignmentColors(entry: StudyDayEntry | undefined): string[] {
  if (!entry?.blocks?.length) return [];
  return [...new Set(entry.blocks.map((b) => b.color || ASSIGNMENT_COLORS[b.assignmentType]).filter(Boolean))];
}
