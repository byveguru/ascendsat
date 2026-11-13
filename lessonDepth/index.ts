import { withLessonVisuals } from "../lib/lessonVisuals";
import humanitiesSixth from "./humanitiesSixth.json";
import scienceSixth from "./scienceSixth.json";
import humanitiesFifth from "./humanitiesFifth.json";
import scienceFifth from "./scienceFifth.json";
import scienceFourth from "./scienceFourth.json";
import humanitiesFourth from "./humanitiesFourth.json";
import mathFinal from "./mathFinal.json";
import calculusSharedFinal from "./calculusSharedFinal.json";
import mathThird from "./mathThird.json";
import calculusSharedApplications from "./calculusSharedApplications.json";
import scienceThird from "./scienceThird.json";
import humanitiesThird from "./humanitiesThird.json";
import calculusSharedCore from "./calculusSharedCore.json";
import mathBatch from "./mathBatch.json";
import scienceBatch from "./scienceBatch.json";
import humanitiesBatch from "./humanitiesBatch.json";
import actMathNext from "./actMathNext.json";
import satActNext from "./satActNext.json";
import scienceNext from "./scienceNext.json";
import mathNext from "./mathNext.json";
import humanitiesNext from "./humanitiesNext.json";
import mathFoundations from "./mathFoundations.json";
import humanitiesExamples from "./humanitiesExamples.json";
import mathExamples from "./mathExamples.json";
import scienceExamples from "./scienceExamples.json";
import coreExamples from "./coreExamples.json";
// Course-specific teaching additions. Existing lesson identities and practice
// banks are preserved; elementary and middle school content is out of scope.
export type LessonDepthEntry = {
  revision: number;
  objectives: string[];
  foundations: any[];
  guided: any[];
  advanced: any[];
  retrieval: any[];
};

export const LESSON_DEPTH: Record<string, LessonDepthEntry> = {...coreExamples,...scienceExamples,...mathExamples,...humanitiesExamples,...mathFoundations,...humanitiesNext,...mathNext,...scienceNext,...satActNext,...actMathNext,...scienceBatch,...humanitiesBatch,...mathBatch,...calculusSharedCore,...scienceThird,...humanitiesThird,...mathThird,...calculusSharedApplications,...mathFinal,...calculusSharedFinal,...scienceFourth,...humanitiesFourth,...scienceFifth,...humanitiesFifth,...scienceSixth,...humanitiesSixth};
export const lessonDepthKey = (lesson: any) => `${lesson.domain || ""}::${lesson.title || ""}`;
export function withLessonDepth(lesson: any) {
  if (lesson.domain === "Additional SAT Math Concepts" && lesson.title === "Complex Numbers") {
    const notice = {type:"tip",label:"Enrichment",text:"Complex-number arithmetic is enrichment beyond the current digital SAT Math scope. Use this lesson for broader algebra study; it is not a required SAT readiness topic."};
    const blocks = Array.isArray(lesson.content) ? [...lesson.content] : [{type:"heading",text:lesson.title},{type:"text",text:lesson.content||""}];
    blocks.splice(blocks[0]?.type === "heading" ? 1 : 0,0,notice);
    lesson = {...lesson,content:blocks};
  }
  const extra = LESSON_DEPTH[lessonDepthKey(lesson)];
  if (!extra) return withLessonVisuals(lesson);
  const core = Array.isArray(lesson.content) ? lesson.content : [{type:"heading",text:"Core lesson"},{type:"text",text:lesson.content||""}];
  return withLessonVisuals({...lesson, depthRevision:extra.revision, learningObjectives:extra.objectives,
    content:[...extra.foundations,...core,...extra.guided,...extra.advanced,...extra.retrieval]});
}
