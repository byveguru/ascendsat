// A transport/format failure is never an academic zero.
export const rubricMaximum = (question: any) => question.criteria?.length ? question.criteria.reduce((sum: number,c: any)=>sum+Number(c.points),0) : Number(question.maxPoints)||1;
const jsonObject = (reply: string) => {
  if(typeof reply!=="string" || reply.length>60000) throw new Error("Invalid feedback response. Please retry.");
  const trimmed=reply.trim().replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"");
  const value=JSON.parse(trimmed);
  if(!value || Array.isArray(value) || typeof value!=="object") throw new Error("Feedback was incomplete. Please retry.");
  return value;
};
export function parseStructuredFrqGradeReply(reply: string, criteria: any[]) {
  const parsed=jsonObject(reply);
  if(!criteria?.length || !Array.isArray(parsed.criteria) || parsed.criteria.length!==criteria.length) throw new Error("Feedback missed a rubric part. Please retry.");
  const expected=new Set(criteria.map(c=>c.key));
  const byKey=new Map();
  for(const row of parsed.criteria){
    if(!expected.has(row?.key) || byKey.has(row.key)) throw new Error("Feedback contained an invalid rubric part. Please retry.");
    byKey.set(row.key,row);
  }
  const result=criteria.map(c=>{
    const row:any=byKey.get(c.key);
    if(!Number.isInteger(row?.points)||row.points<0||row.points>c.points||typeof row.feedback!=="string"||!row.feedback.trim()) throw new Error("Feedback contained an invalid score. Please retry.");
    return {key:c.key,label:c.label,maxPoints:c.points,points:row.points,feedback:row.feedback.trim()};
  });
  if(typeof parsed.overallFeedback!=="string"||!parsed.overallFeedback.trim()) throw new Error("Feedback was incomplete. Please retry.");
  return {points:result.reduce((n,c)=>n+c.points,0),maxPoints:criteria.reduce((n,c)=>n+c.points,0),criteria:result,feedback:parsed.overallFeedback.trim(),modelAnswer:"",malformed:false,graded:true};
}
export function parseFrqGradeReply(reply: string, maximum=1){
  const p=jsonObject(reply), max=Number(maximum)||Number(p.maxPoints);
  if(!Number.isInteger(max)||max<1||!Number.isInteger(p.maxPoints)||p.maxPoints!==max||!Number.isInteger(p.points)||p.points<0||p.points>max||typeof p.feedback!=="string"||!p.feedback.trim()) throw new Error("Feedback contained an invalid score. Please retry.");
  return {points:p.points,maxPoints:max,feedback:p.feedback.trim(),modelAnswer:typeof p.modelAnswer==="string"?p.modelAnswer:"",malformed:false,graded:true};
}
export const failedFrqGrade = (question:any, message="Feedback is unavailable. Your response is still here; please retry.") => ({grading:false,graded:false,error:message,maxPoints:rubricMaximum(question)});
