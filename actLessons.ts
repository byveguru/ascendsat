// @ts-nocheck
// ACT lesson catalog. Sourced from the verbatim AscendACT PDF curriculum
// (same shape and provenance as LEARN_REVIEW_LESSONS in learnReviewContent.ts —
// paginated content blocks, inline Concept Check/Application Question widgets,
// live Desmos graphs for math). Kept as a separate named export because several
// call sites (Study Plan's static lesson list, AI context's lesson catalog,
// Quick Review's title lookup) read ACT_LESSONS directly rather than going
// through LEARN_REVIEW_LESSONS's domain lookup.
import { LEARN_REVIEW_LESSONS } from "./learnReviewContent";
import { ACT_ENGLISH, ACT_MATH, ACT_READING, ACT_SCIENCE } from "./testConfig";

const ACT_DOMAINS = new Set([...ACT_ENGLISH, ...ACT_MATH, ...ACT_READING, ...ACT_SCIENCE]);

export const ACT_LESSONS = LEARN_REVIEW_LESSONS.filter((l) => ACT_DOMAINS.has(l.domain));
