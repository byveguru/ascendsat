const AP_NAMES={"ap-precalculus": "AP Precalculus", "ap-statistics": "AP Statistics", "ap-environmental-science": "AP Environmental Science", "ap-english-language": "AP English Language and Composition",'ap-computer-science-principles':'AP Computer Science Principles','ap-physics-1':'AP Physics 1','ap-us-gov':'AP United States Government and Politics','ap-us-history':'AP United States History','ap-world-history-modern':'AP World History: Modern','ap-psychology':'AP Psychology','ap-calculus-ab':'AP Calculus AB','ap-calculus-bc':'AP Calculus BC'};
const AP_DATES_2027={"ap-precalculus": "2027-05-11", "ap-statistics": "2027-05-11", "ap-environmental-science": "2027-05-13", "ap-english-language": "2027-05-12",'ap-computer-science-principles':'2027-05-14','ap-physics-1':'2027-05-05','ap-us-gov':'2027-05-04','ap-us-history':'2027-05-07','ap-world-history-modern':'2027-05-06','ap-psychology':'2027-05-14','ap-calculus-ab':'2027-05-10','ap-calculus-bc':'2027-05-10'};
const clean=(v,n=100)=>typeof v==='string'?v.trim().slice(0,n):'',num=(v,min=0,max=100000)=>Number.isFinite(v)&&v>=min&&v<=max?v:null;
const stamp=v=>typeof v?.toMillis==='function'?v.toMillis():typeof v==='number'?v:typeof v==='string'?Date.parse(v):0,date=v=>/^\d{4}-\d{2}-\d{2}$/.test(v||'')?v:null;
function sanitizeSummary(s={},now=Date.now()){
 const test=t=>['sat','act','ap'].includes(t)?t:'sat';
 const courses=(Array.isArray(s.courses)?s.courses:[]).slice(0,30).map(c=>({test:test(c.test),name:clean(c.name,90),target:num(c.target,1,1600),testDate:date(c.testDate),estimate:num(c.estimate,1,1600),sections:Object.fromEntries(Object.entries(c.sections||{}).slice(0,8).filter(([k,v])=>clean(k)&&num(v,0,800)!==null).map(([k,v])=>[clean(k,60),v]))}));
 const activity=(Array.isArray(s.activity)?s.activity:[]).slice(0,15).map(a=>({date:date(a.date),test:test(a.test),name:clean(a.name,90),questions:num(a.questions,0,300)||0,accuracy:num(a.accuracy,0,100),minutes:num(a.minutes,0,600)||0})).filter(a=>a.date);
 const upcoming=(Array.isArray(s.upcoming)?s.upcoming:[]).slice(0,15).map(a=>({date:date(a.date),test:test(a.test),name:clean(a.name,100),minutes:num(a.minutes,0,600)||0})).filter(a=>a.date);
 return{courses,activity,upcoming,updatedAt:now,estimateNotice:'Practice estimates are heuristic, not official test scores.'};
}
function buildSummary(profile={},scores=[],now=Date.now()){
 const courses=[],upcoming=[],today=new Date(now).toISOString().slice(0,10);
 for(const test of ['sat','act','ap']){const p=test==='sat'?profile:profile[test]||{},est=p.currentAbilityEstimate;
  if(test==='ap'){for(const c of Array.isArray(p.apClasses)?p.apClasses:[])courses.push({test,name:typeof c==='string'?(AP_NAMES[c]||c):(c.label||c.name||AP_NAMES[c.id]||'AP course'),target:null,testDate:typeof c==='object'?(c.examDate||c.testDate||AP_DATES_2027[c.id]):AP_DATES_2027[c],estimate:null,sections:{}});}else if(p.onboarded||est||p.testDate)courses.push({test,name:test.toUpperCase(),target:p.targetScore,testDate:p.testDate,estimate:est?.total,sections:est?.sectionScores||{}});
  for(const[d,day]of Object.entries(p.studySchedule?.days||{})){if(d<today||day.status==='completed')continue;for(const b of day.blocks||[])upcoming.push({date:d,test,name:b.title||b.assignmentType||'Study session',minutes:b.duration});}
 }
 const activity=scores.filter(s=>stamp(s.createdAt)>=now-30*86400000&&stamp(s.createdAt)<=now).sort((a,b)=>stamp(b.createdAt)-stamp(a.createdAt)).slice(0,15).map(s=>({date:new Date(stamp(s.createdAt)).toISOString().slice(0,10),test:s.testType||'sat',name:s.testType==='ap'?clean(s.apClass)||'AP practice':clean(s.section)||'Practice',questions:s.total,accuracy:s.percent,minutes:Math.round((s.timeSeconds||0)/60)}));
 upcoming.sort((a,b)=>a.date.localeCompare(b.date));return sanitizeSummary({courses,activity,upcoming},now);
}
module.exports={buildSummary,sanitizeSummary};
