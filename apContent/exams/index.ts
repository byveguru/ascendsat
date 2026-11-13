import { APUSH_EXAM } from './apushExam';
import { WORLD_EXAM } from './worldExam';
import { PSYCHOLOGY_EXAM } from './psychologyExam';
export const AP_EXAMS:any = {'ap-us-history':APUSH_EXAM,'ap-world-history-modern':WORLD_EXAM,'ap-psychology':PSYCHOLOGY_EXAM};
export const examSections=(exam:any)=>exam.courseId==='ap-psychology' ? [
  {key:'mcq',title:'Multiple choice',seconds:90*60,questions:exam.mcq},
  {key:'writing',title:'Free response',seconds:70*60,questions:exam.writing},
]:[
  {key:'mcq',title:'Multiple choice',seconds:55*60,questions:exam.mcq},
  {key:'saq',title:'Short answer',seconds:40*60,questions:exam.saq},
  {key:'writing',title:'Document-based question & long essay',seconds:100*60,questions:exam.writing},
];
