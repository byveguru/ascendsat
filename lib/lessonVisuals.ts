import visualActivities from "../lessonVisuals.json";

export const LESSON_VISUALS: Record<string, any[]> = visualActivities;
export function withLessonVisuals(lesson: any) {
  const additions = LESSON_VISUALS[`${lesson.domain || ""}::${lesson.title || ""}`];
  if (!additions?.length) return lesson;
  const content = Array.isArray(lesson.content) ? [...lesson.content] : [{type:"text",text:lesson.content || ""}];
  let position = content.findIndex(block => block.type === "guidedExample");
  if (position < 0) position = content.findIndex(block => block.type === "question");
  if (position < 0) position = content.length;
  // Give each hands-on activity a contents entry. Keep the original section
  // intact, so its title still restores existing reading positions.
  let sectionStart = position;
  while (sectionStart > 0 && content[sectionStart]?.type !== "heading") sectionStart--;
  const blocks = additions.flatMap(block => [{type:"heading",text:block.title},block]);
  if (content[sectionStart]?.type !== "heading") blocks.push({type:"heading",text:"Read and apply"});
  content.splice(sectionStart, 0, ...blocks);
  return {...lesson, content};
}
