// Pure exam accounting. Weights mirror section structure, never an AP 1–5 conversion.
export const secondsUntil=(deadline:number,now=Date.now())=>Math.max(0,Math.ceil((deadline-now)/1000));
export function examQuestionRows(sections:any[],submissions:any[]){return sections.flatMap((section,si)=>section.questions.map((q:any,i:number)=>{
 const submitted=submissions[si]||{};return {...q,userAnswer:submitted.answers?.[i]??-1,userText:q.format==='frq'?(submitted.texts?.[i]??''):undefined};
}));}
export const answerText=(question:any,value:any)=>typeof value==='string'?value:question.criteria?.map((c:any)=>`${c.label}: ${value?.[c.key]||''}`).join('\n\n')||'';
export const hasWriting=(value:any)=>typeof value==='string'?!!value.trim():!!value&&Object.values(value).some(v=>String(v||'').trim());
export function apExamReport(exam:any,rows:any[],grades:any={}){
 const mcq=rows.filter(q=>q.format!=='frq'),writing=rows.filter(q=>q.format==='frq');
 const components:any[]=[{key:'mcq',label:'Multiple choice',earned:mcq.filter(q=>q.userAnswer===q.answer).length,max:exam.mcq.length,weight:exam.courseId==='ap-psychology'?2/3:.4}];
 const groups=exam.courseId==='ap-psychology' ? exam.writing.map((q:any,i:number)=>({key:q.id,label:i===0?'Article analysis':'Evidence-based response',ids:[q.id],weight:1/6})) : [
  {key:'saq',label:'Short answer',ids:exam.saq.map((q:any)=>q.id),weight:.2},
  {key:'dbq',label:'Document-based question',ids:[exam.writing[0].id],weight:.25},
  {key:'leq',label:'Long essay',ids:[exam.writing[1].id],weight:.15},
 ];
 groups.forEach((group:any)=>{const qs=writing.filter(q=>group.ids.includes(q.id));const pending=qs.some(q=>hasWriting(q.userText)&&!grades[q.id]?.graded);components.push({...group,earned:pending?null:qs.reduce((n,q)=>n+(grades[q.id]?.graded?grades[q.id].points:0),0),max:qs.reduce((n,q)=>n+(q.maxPoints||q.criteria?.reduce((a:any,c:any)=>a+c.points,0)||1),0)});});
 const complete=components.every(c=>c.earned!==null);
 return {components,complete,weightedPercent:complete?Math.round(100*components.reduce((n,c)=>n+(c.max?c.earned/c.max:0)*c.weight,0)):null,pending:writing.filter(q=>hasWriting(q.userText)&&!grades[q.id]?.graded).length};
}
export function validExamDraft(d:any,uid:string,exam:any){return !!d&&d.version===1&&d.userId===uid&&d.formId===exam.id&&d.courseId===exam.courseId&&['testing','between','break','results'].includes(d.phase)&&Number.isInteger(d.sectionIndex)&&d.sectionIndex>=0&&d.sectionIndex<(exam.courseId==='ap-psychology'?2:3)&&Array.isArray(d.submissions)&&Number.isFinite(d.deadline);}
