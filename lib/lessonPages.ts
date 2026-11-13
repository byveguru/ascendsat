/** Keep authored section boundaries; split unusually long sections only at a
 * subheading so an explanation, example or activity is never cut in half. */
export function buildLessonPages(content: unknown) {
  if (!Array.isArray(content)) return [];
  const pages: {title:string;blocks:any[]}[] = [];
  let words = 0;
  const size = (block:any) => [block.text,block.question,block.prompt,block.scenario,...(block.choices||[])].filter(value=>typeof value==='string').join(' ').trim().split(/\s+/).filter(Boolean).length;
  for (const block of content) {
    if (block.type === 'heading') {
      pages.push({title:block.text,blocks:[]});
      words = 0;
      continue;
    }
    if (!pages.length) pages.push({title:'Overview',blocks:[]});
    if (block.type === 'subheading' && words >= 450) {
      pages.push({title:block.text,blocks:[]});
      words = 0;
      continue;
    }
    pages[pages.length-1].blocks.push(block);
    words += size(block);
  }
  return pages;
}
