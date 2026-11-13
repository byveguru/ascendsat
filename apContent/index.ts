import mathFoundations from "./mathFoundations.json";
import scienceFoundations from "./scienceFoundations.json";
// Original course content. Reference links document curriculum alignment, not endorsement.
import { CALCULUS_AB_CONTENT } from "./calculusAB";
import { CALCULUS_BC_CONTENT } from "./calculusBC";
import { APUSH_CONTENT } from "./apush";
import { WORLD_CONTENT } from "./world";
import { PSYCHOLOGY_CONTENT } from "./psychology";
import { CSP_CONTENT } from "./csp";
import { PHYSICS_1_CONTENT } from "./physics1";

import { PRECALCULUS_CONTENT } from "./precalculus";
import { STATISTICS_CONTENT } from "./statistics";
import { ENVIRONMENTAL_SCIENCE_CONTENT } from "./environmentalScience";
import { ENGLISH_LANGUAGE_CONTENT } from "./englishLanguage";

// Stable per-item answer order avoids an authoring-position pattern without
// changing choices on rerender or disconnecting a lesson check from its key.
const foundationLessonsByCourse: Record<string, any[]> = {...scienceFoundations,...mathFoundations};
const prepareCourse = (source: any, courseId?: string) => {
  const content = {...source,lessons:[...source.lessons,...(foundationLessonsByCourse[courseId || ""] || [])]};
  const mcq = content.mcq.map((question: any) => {
    let seed = [...question.id].reduce((hash: number, char: string) => Math.imul(hash ^ char.charCodeAt(0), 16777619) >>> 0, 2166136261);
    const order = question.choices.map((_: any, index: number) => index);
    for (let index = order.length - 1; index > 0; index--) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      const other = Math.floor(seed / 4294967296 * (index + 1));
      [order[index], order[other]] = [order[other], order[index]];
    }
    return { ...question, choices: order.map((index: number) => question.choices[index]), answer: order.indexOf(question.answer) };
  });
  const byId = new Map(mcq.map((question: any) => [question.id, question]));
  const byStem = new Map(mcq.map((question: any) => [question.question, question]));
  return { ...content, mcq, lessons: content.lessons.map((lesson: any) => ({ ...lesson, practiceQuestions: lesson.practiceQuestions.map((question: any) => byId.get(question.id) || byStem.get(question.question) || question) })) };
};
export const AP_EXPANDED_CONTENT = {
  "ap-precalculus": prepareCourse(PRECALCULUS_CONTENT,"ap-precalculus"),
  "ap-statistics": prepareCourse(STATISTICS_CONTENT,"ap-statistics"),
  "ap-environmental-science": prepareCourse(ENVIRONMENTAL_SCIENCE_CONTENT,"ap-environmental-science"),
  "ap-english-language": prepareCourse(ENGLISH_LANGUAGE_CONTENT),
  "ap-computer-science-principles": prepareCourse(CSP_CONTENT,"ap-computer-science-principles"),
  "ap-physics-1": prepareCourse(PHYSICS_1_CONTENT,"ap-physics-1"),
  "ap-calculus-ab": prepareCourse(CALCULUS_AB_CONTENT,"ap-calculus-ab"),
  "ap-calculus-bc": prepareCourse(CALCULUS_BC_CONTENT,"ap-calculus-bc"),
  "ap-us-history": prepareCourse(APUSH_CONTENT),
  "ap-world-history-modern": prepareCourse(WORLD_CONTENT),
  "ap-psychology": prepareCourse(PSYCHOLOGY_CONTENT,"ap-psychology"),
};
