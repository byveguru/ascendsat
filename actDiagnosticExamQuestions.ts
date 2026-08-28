/** Fixed 20-question ACT onboarding diagnostic — English (5, shared passage),
 *  Math (5), Reading (5, shared passage), Science (5, shared data table).
 *  Same shape as diagnosticExamQuestions.ts. Passages are embedded directly in
 *  each question's `question` string (this type has no separate passage
 *  field) — ACT English underlined portions use combining low-line characters
 *  (U+0332) since the question view renders plain text, not HTML. */

import type { DiagnosticExamQuestion } from "./diagnosticExamQuestions";

export const ACT_DIAGNOSTIC_EXAM_QUESTIONS: DiagnosticExamQuestion[] = [
  {
    "id": "actdiag-eng-1",
    "domain": "Conventions of Standard English",
    "difficulty": "Medium",
    "question": "Restoring the Night Sky\n\nOn clear evenings, residents of Lakewood could once see hundreds of stars from their backyards. As the town expanded, however, new businesses, parking lots, and streetlights brightened the night sky. Within a decade, many of the faintest stars had disappeared from view—not because the stars themselves had changed, b̲u̲t̲ ̲b̲e̲c̲a̲u̲s̲e̲ ̲e̲x̲c̲e̲s̲s̲i̲v̲e̲ ̲a̲r̲t̲i̲f̲i̲c̲i̲a̲l̲ ̲l̲i̲g̲h̲t̲ ̲w̲e̲r̲e̲ ̲b̲l̲o̲c̲k̲i̲n̲g̲ ̲t̲h̲e̲m̲.̲¹\n\nHoping to address the problem, a group of high school astronomy students conducted a survey. They visited twenty locations throughout Lakewood and measured the brightness of the sky at each one. A̲f̲t̲e̲r̲ ̲r̲e̲c̲o̲r̲d̲i̲n̲g̲ ̲t̲h̲e̲i̲r̲ ̲o̲b̲s̲e̲r̲v̲a̲t̲i̲o̲n̲s̲,̲ ̲m̲a̲p̲s̲ ̲w̲e̲r̲e̲ ̲c̲r̲e̲a̲t̲e̲d̲ ̲s̲h̲o̲w̲i̲n̲g̲ ̲w̲h̲e̲r̲e̲ ̲l̲i̲g̲h̲t̲ ̲p̲o̲l̲l̲u̲t̲i̲o̲n̲ ̲w̲a̲s̲ ̲m̲o̲s̲t̲ ̲s̲e̲v̲e̲r̲e̲.̲² The students found that poorly directed parking-lot lights produced much of the unnecessary brightness.\n\nThe students presented their results to the town council. They did not recommend removing every outdoor light. I̲n̲s̲t̲e̲a̲d̲,̲ ̲t̲h̲e̲y̲ ̲p̲r̲o̲p̲o̲s̲e̲d̲ ̲i̲n̲s̲t̲a̲l̲l̲i̲n̲g̲ ̲s̲h̲i̲e̲l̲d̲e̲d̲ ̲f̲i̲x̲t̲u̲r̲e̲s̲,̲ ̲t̲h̲e̲s̲e̲ ̲f̲i̲x̲t̲u̲r̲e̲s̲ ̲d̲i̲r̲e̲c̲t̲ ̲l̲i̲g̲h̲t̲ ̲t̲o̲w̲a̲r̲d̲ ̲t̲h̲e̲ ̲g̲r̲o̲u̲n̲d̲ ̲r̲a̲t̲h̲e̲r̲ ̲t̲h̲a̲n̲ ̲t̲h̲e̲ ̲s̲k̲y̲.̲³ The students explained that these fixtures could preserve visibility and safety while reducing wasted light.\n\nSeveral local businesses agreed to test the fixtures. Within six months, measurements showed that the sky above the participating properties was noticeably darker. The businesses also reported using less electricity. T̲h̲e̲ ̲p̲r̲o̲j̲e̲c̲t̲,̲ ̲w̲h̲i̲c̲h̲ ̲b̲e̲g̲a̲n̲ ̲a̲s̲ ̲a̲ ̲m̲o̲d̲e̲s̲t̲ ̲s̲c̲h̲o̲o̲l̲ ̲i̲n̲v̲e̲s̲t̲i̲g̲a̲t̲i̲o̲n̲,̲ ̲i̲t̲ ̲e̲v̲e̲n̲t̲u̲a̲l̲l̲y̲ ̲i̲n̲f̲l̲u̲e̲n̲c̲e̲d̲ ̲L̲a̲k̲e̲w̲o̲o̲d̲’̲s̲ ̲b̲u̲i̲l̲d̲i̲n̲g̲ ̲r̲e̲g̲u̲l̲a̲t̲i̲o̲n̲s̲.̲⁴\n\nLakewood has not returned completely to the darkness it experienced decades ago. N̲e̲v̲e̲r̲t̲h̲e̲l̲e̲s̲s̲,̲ ̲r̲e̲s̲i̲d̲e̲n̲t̲s̲ ̲c̲a̲n̲ ̲o̲n̲c̲e̲ ̲a̲g̲a̲i̲n̲ ̲i̲d̲e̲n̲t̲i̲f̲y̲ ̲c̲o̲n̲s̲t̲e̲l̲l̲a̲t̲i̲o̲n̲s̲ ̲t̲h̲a̲t̲ ̲h̲a̲d̲ ̲p̲r̲e̲v̲i̲o̲u̲s̲l̲y̲ ̲b̲e̲e̲n̲ ̲h̲i̲d̲d̲e̲n̲ ̲b̲y̲ ̲t̲h̲e̲ ̲t̲o̲w̲n̲’̲s̲ ̲g̲l̲o̲w̲.̲⁵ The students’ project demonstrated that a community does not always need a dramatic solution to produce a visible change.\n\n1. Which choice completes underlined portion ¹ so the sentence is grammatically correct?",
    "choices": [
      "NO CHANGE",
      "but because excessive artificial light was blocking them.",
      "but excessive artificial light were blocking them.",
      "because excessive artificial light having blocked them."
    ],
    "answer": 1,
    "explanation": "“Light” is singular, so it takes the singular verb “was,” not “were.”"
  },
  {
    "id": "actdiag-eng-2",
    "domain": "Conventions of Standard English",
    "difficulty": "Medium",
    "question": "Restoring the Night Sky\n\nOn clear evenings, residents of Lakewood could once see hundreds of stars from their backyards. As the town expanded, however, new businesses, parking lots, and streetlights brightened the night sky. Within a decade, many of the faintest stars had disappeared from view—not because the stars themselves had changed, b̲u̲t̲ ̲b̲e̲c̲a̲u̲s̲e̲ ̲e̲x̲c̲e̲s̲s̲i̲v̲e̲ ̲a̲r̲t̲i̲f̲i̲c̲i̲a̲l̲ ̲l̲i̲g̲h̲t̲ ̲w̲e̲r̲e̲ ̲b̲l̲o̲c̲k̲i̲n̲g̲ ̲t̲h̲e̲m̲.̲¹\n\nHoping to address the problem, a group of high school astronomy students conducted a survey. They visited twenty locations throughout Lakewood and measured the brightness of the sky at each one. A̲f̲t̲e̲r̲ ̲r̲e̲c̲o̲r̲d̲i̲n̲g̲ ̲t̲h̲e̲i̲r̲ ̲o̲b̲s̲e̲r̲v̲a̲t̲i̲o̲n̲s̲,̲ ̲m̲a̲p̲s̲ ̲w̲e̲r̲e̲ ̲c̲r̲e̲a̲t̲e̲d̲ ̲s̲h̲o̲w̲i̲n̲g̲ ̲w̲h̲e̲r̲e̲ ̲l̲i̲g̲h̲t̲ ̲p̲o̲l̲l̲u̲t̲i̲o̲n̲ ̲w̲a̲s̲ ̲m̲o̲s̲t̲ ̲s̲e̲v̲e̲r̲e̲.̲² The students found that poorly directed parking-lot lights produced much of the unnecessary brightness.\n\nThe students presented their results to the town council. They did not recommend removing every outdoor light. I̲n̲s̲t̲e̲a̲d̲,̲ ̲t̲h̲e̲y̲ ̲p̲r̲o̲p̲o̲s̲e̲d̲ ̲i̲n̲s̲t̲a̲l̲l̲i̲n̲g̲ ̲s̲h̲i̲e̲l̲d̲e̲d̲ ̲f̲i̲x̲t̲u̲r̲e̲s̲,̲ ̲t̲h̲e̲s̲e̲ ̲f̲i̲x̲t̲u̲r̲e̲s̲ ̲d̲i̲r̲e̲c̲t̲ ̲l̲i̲g̲h̲t̲ ̲t̲o̲w̲a̲r̲d̲ ̲t̲h̲e̲ ̲g̲r̲o̲u̲n̲d̲ ̲r̲a̲t̲h̲e̲r̲ ̲t̲h̲a̲n̲ ̲t̲h̲e̲ ̲s̲k̲y̲.̲³ The students explained that these fixtures could preserve visibility and safety while reducing wasted light.\n\nSeveral local businesses agreed to test the fixtures. Within six months, measurements showed that the sky above the participating properties was noticeably darker. The businesses also reported using less electricity. T̲h̲e̲ ̲p̲r̲o̲j̲e̲c̲t̲,̲ ̲w̲h̲i̲c̲h̲ ̲b̲e̲g̲a̲n̲ ̲a̲s̲ ̲a̲ ̲m̲o̲d̲e̲s̲t̲ ̲s̲c̲h̲o̲o̲l̲ ̲i̲n̲v̲e̲s̲t̲i̲g̲a̲t̲i̲o̲n̲,̲ ̲i̲t̲ ̲e̲v̲e̲n̲t̲u̲a̲l̲l̲y̲ ̲i̲n̲f̲l̲u̲e̲n̲c̲e̲d̲ ̲L̲a̲k̲e̲w̲o̲o̲d̲’̲s̲ ̲b̲u̲i̲l̲d̲i̲n̲g̲ ̲r̲e̲g̲u̲l̲a̲t̲i̲o̲n̲s̲.̲⁴\n\nLakewood has not returned completely to the darkness it experienced decades ago. N̲e̲v̲e̲r̲t̲h̲e̲l̲e̲s̲s̲,̲ ̲r̲e̲s̲i̲d̲e̲n̲t̲s̲ ̲c̲a̲n̲ ̲o̲n̲c̲e̲ ̲a̲g̲a̲i̲n̲ ̲i̲d̲e̲n̲t̲i̲f̲y̲ ̲c̲o̲n̲s̲t̲e̲l̲l̲a̲t̲i̲o̲n̲s̲ ̲t̲h̲a̲t̲ ̲h̲a̲d̲ ̲p̲r̲e̲v̲i̲o̲u̲s̲l̲y̲ ̲b̲e̲e̲n̲ ̲h̲i̲d̲d̲e̲n̲ ̲b̲y̲ ̲t̲h̲e̲ ̲t̲o̲w̲n̲’̲s̲ ̲g̲l̲o̲w̲.̲⁵ The students’ project demonstrated that a community does not always need a dramatic solution to produce a visible change.\n\n2. Which choice completes underlined portion ² so the sentence avoids a dangling modifier?",
    "choices": [
      "NO CHANGE",
      "After recording their observations, the students created maps showing where light pollution was most severe.",
      "Maps, after recording their observations, showed the students where light pollution was most severe.",
      "The observations having been recorded, where light pollution was most severe was shown on maps."
    ],
    "answer": 1,
    "explanation": "The introductory phrase must be followed by the noun it modifies — the students, not the maps."
  },
  {
    "id": "actdiag-eng-3",
    "domain": "Conventions of Standard English",
    "difficulty": "Hard",
    "question": "Restoring the Night Sky\n\nOn clear evenings, residents of Lakewood could once see hundreds of stars from their backyards. As the town expanded, however, new businesses, parking lots, and streetlights brightened the night sky. Within a decade, many of the faintest stars had disappeared from view—not because the stars themselves had changed, b̲u̲t̲ ̲b̲e̲c̲a̲u̲s̲e̲ ̲e̲x̲c̲e̲s̲s̲i̲v̲e̲ ̲a̲r̲t̲i̲f̲i̲c̲i̲a̲l̲ ̲l̲i̲g̲h̲t̲ ̲w̲e̲r̲e̲ ̲b̲l̲o̲c̲k̲i̲n̲g̲ ̲t̲h̲e̲m̲.̲¹\n\nHoping to address the problem, a group of high school astronomy students conducted a survey. They visited twenty locations throughout Lakewood and measured the brightness of the sky at each one. A̲f̲t̲e̲r̲ ̲r̲e̲c̲o̲r̲d̲i̲n̲g̲ ̲t̲h̲e̲i̲r̲ ̲o̲b̲s̲e̲r̲v̲a̲t̲i̲o̲n̲s̲,̲ ̲m̲a̲p̲s̲ ̲w̲e̲r̲e̲ ̲c̲r̲e̲a̲t̲e̲d̲ ̲s̲h̲o̲w̲i̲n̲g̲ ̲w̲h̲e̲r̲e̲ ̲l̲i̲g̲h̲t̲ ̲p̲o̲l̲l̲u̲t̲i̲o̲n̲ ̲w̲a̲s̲ ̲m̲o̲s̲t̲ ̲s̲e̲v̲e̲r̲e̲.̲² The students found that poorly directed parking-lot lights produced much of the unnecessary brightness.\n\nThe students presented their results to the town council. They did not recommend removing every outdoor light. I̲n̲s̲t̲e̲a̲d̲,̲ ̲t̲h̲e̲y̲ ̲p̲r̲o̲p̲o̲s̲e̲d̲ ̲i̲n̲s̲t̲a̲l̲l̲i̲n̲g̲ ̲s̲h̲i̲e̲l̲d̲e̲d̲ ̲f̲i̲x̲t̲u̲r̲e̲s̲,̲ ̲t̲h̲e̲s̲e̲ ̲f̲i̲x̲t̲u̲r̲e̲s̲ ̲d̲i̲r̲e̲c̲t̲ ̲l̲i̲g̲h̲t̲ ̲t̲o̲w̲a̲r̲d̲ ̲t̲h̲e̲ ̲g̲r̲o̲u̲n̲d̲ ̲r̲a̲t̲h̲e̲r̲ ̲t̲h̲a̲n̲ ̲t̲h̲e̲ ̲s̲k̲y̲.̲³ The students explained that these fixtures could preserve visibility and safety while reducing wasted light.\n\nSeveral local businesses agreed to test the fixtures. Within six months, measurements showed that the sky above the participating properties was noticeably darker. The businesses also reported using less electricity. T̲h̲e̲ ̲p̲r̲o̲j̲e̲c̲t̲,̲ ̲w̲h̲i̲c̲h̲ ̲b̲e̲g̲a̲n̲ ̲a̲s̲ ̲a̲ ̲m̲o̲d̲e̲s̲t̲ ̲s̲c̲h̲o̲o̲l̲ ̲i̲n̲v̲e̲s̲t̲i̲g̲a̲t̲i̲o̲n̲,̲ ̲i̲t̲ ̲e̲v̲e̲n̲t̲u̲a̲l̲l̲y̲ ̲i̲n̲f̲l̲u̲e̲n̲c̲e̲d̲ ̲L̲a̲k̲e̲w̲o̲o̲d̲’̲s̲ ̲b̲u̲i̲l̲d̲i̲n̲g̲ ̲r̲e̲g̲u̲l̲a̲t̲i̲o̲n̲s̲.̲⁴\n\nLakewood has not returned completely to the darkness it experienced decades ago. N̲e̲v̲e̲r̲t̲h̲e̲l̲e̲s̲s̲,̲ ̲r̲e̲s̲i̲d̲e̲n̲t̲s̲ ̲c̲a̲n̲ ̲o̲n̲c̲e̲ ̲a̲g̲a̲i̲n̲ ̲i̲d̲e̲n̲t̲i̲f̲y̲ ̲c̲o̲n̲s̲t̲e̲l̲l̲a̲t̲i̲o̲n̲s̲ ̲t̲h̲a̲t̲ ̲h̲a̲d̲ ̲p̲r̲e̲v̲i̲o̲u̲s̲l̲y̲ ̲b̲e̲e̲n̲ ̲h̲i̲d̲d̲e̲n̲ ̲b̲y̲ ̲t̲h̲e̲ ̲t̲o̲w̲n̲’̲s̲ ̲g̲l̲o̲w̲.̲⁵ The students’ project demonstrated that a community does not always need a dramatic solution to produce a visible change.\n\n3. Which choice completes underlined portion ³ so the sentence avoids a comma splice?",
    "choices": [
      "NO CHANGE",
      "Instead, they proposed installing shielded fixtures and directing light toward the ground rather than the sky.",
      "Instead, they proposed installing shielded fixtures; these fixtures direct light toward the ground rather than the sky.",
      "Instead, shielded fixtures were proposed, directing light toward the ground, rather than the sky."
    ],
    "answer": 2,
    "explanation": "A semicolon correctly separates the two independent clauses, fixing the comma splice."
  },
  {
    "id": "actdiag-eng-4",
    "domain": "Conventions of Standard English",
    "difficulty": "Hard",
    "question": "Restoring the Night Sky\n\nOn clear evenings, residents of Lakewood could once see hundreds of stars from their backyards. As the town expanded, however, new businesses, parking lots, and streetlights brightened the night sky. Within a decade, many of the faintest stars had disappeared from view—not because the stars themselves had changed, b̲u̲t̲ ̲b̲e̲c̲a̲u̲s̲e̲ ̲e̲x̲c̲e̲s̲s̲i̲v̲e̲ ̲a̲r̲t̲i̲f̲i̲c̲i̲a̲l̲ ̲l̲i̲g̲h̲t̲ ̲w̲e̲r̲e̲ ̲b̲l̲o̲c̲k̲i̲n̲g̲ ̲t̲h̲e̲m̲.̲¹\n\nHoping to address the problem, a group of high school astronomy students conducted a survey. They visited twenty locations throughout Lakewood and measured the brightness of the sky at each one. A̲f̲t̲e̲r̲ ̲r̲e̲c̲o̲r̲d̲i̲n̲g̲ ̲t̲h̲e̲i̲r̲ ̲o̲b̲s̲e̲r̲v̲a̲t̲i̲o̲n̲s̲,̲ ̲m̲a̲p̲s̲ ̲w̲e̲r̲e̲ ̲c̲r̲e̲a̲t̲e̲d̲ ̲s̲h̲o̲w̲i̲n̲g̲ ̲w̲h̲e̲r̲e̲ ̲l̲i̲g̲h̲t̲ ̲p̲o̲l̲l̲u̲t̲i̲o̲n̲ ̲w̲a̲s̲ ̲m̲o̲s̲t̲ ̲s̲e̲v̲e̲r̲e̲.̲² The students found that poorly directed parking-lot lights produced much of the unnecessary brightness.\n\nThe students presented their results to the town council. They did not recommend removing every outdoor light. I̲n̲s̲t̲e̲a̲d̲,̲ ̲t̲h̲e̲y̲ ̲p̲r̲o̲p̲o̲s̲e̲d̲ ̲i̲n̲s̲t̲a̲l̲l̲i̲n̲g̲ ̲s̲h̲i̲e̲l̲d̲e̲d̲ ̲f̲i̲x̲t̲u̲r̲e̲s̲,̲ ̲t̲h̲e̲s̲e̲ ̲f̲i̲x̲t̲u̲r̲e̲s̲ ̲d̲i̲r̲e̲c̲t̲ ̲l̲i̲g̲h̲t̲ ̲t̲o̲w̲a̲r̲d̲ ̲t̲h̲e̲ ̲g̲r̲o̲u̲n̲d̲ ̲r̲a̲t̲h̲e̲r̲ ̲t̲h̲a̲n̲ ̲t̲h̲e̲ ̲s̲k̲y̲.̲³ The students explained that these fixtures could preserve visibility and safety while reducing wasted light.\n\nSeveral local businesses agreed to test the fixtures. Within six months, measurements showed that the sky above the participating properties was noticeably darker. The businesses also reported using less electricity. T̲h̲e̲ ̲p̲r̲o̲j̲e̲c̲t̲,̲ ̲w̲h̲i̲c̲h̲ ̲b̲e̲g̲a̲n̲ ̲a̲s̲ ̲a̲ ̲m̲o̲d̲e̲s̲t̲ ̲s̲c̲h̲o̲o̲l̲ ̲i̲n̲v̲e̲s̲t̲i̲g̲a̲t̲i̲o̲n̲,̲ ̲i̲t̲ ̲e̲v̲e̲n̲t̲u̲a̲l̲l̲y̲ ̲i̲n̲f̲l̲u̲e̲n̲c̲e̲d̲ ̲L̲a̲k̲e̲w̲o̲o̲d̲’̲s̲ ̲b̲u̲i̲l̲d̲i̲n̲g̲ ̲r̲e̲g̲u̲l̲a̲t̲i̲o̲n̲s̲.̲⁴\n\nLakewood has not returned completely to the darkness it experienced decades ago. N̲e̲v̲e̲r̲t̲h̲e̲l̲e̲s̲s̲,̲ ̲r̲e̲s̲i̲d̲e̲n̲t̲s̲ ̲c̲a̲n̲ ̲o̲n̲c̲e̲ ̲a̲g̲a̲i̲n̲ ̲i̲d̲e̲n̲t̲i̲f̲y̲ ̲c̲o̲n̲s̲t̲e̲l̲l̲a̲t̲i̲o̲n̲s̲ ̲t̲h̲a̲t̲ ̲h̲a̲d̲ ̲p̲r̲e̲v̲i̲o̲u̲s̲l̲y̲ ̲b̲e̲e̲n̲ ̲h̲i̲d̲d̲e̲n̲ ̲b̲y̲ ̲t̲h̲e̲ ̲t̲o̲w̲n̲’̲s̲ ̲g̲l̲o̲w̲.̲⁵ The students’ project demonstrated that a community does not always need a dramatic solution to produce a visible change.\n\n4. Which choice completes underlined portion ⁴ so the sentence avoids a comma splice and keeps verb forms consistent?",
    "choices": [
      "NO CHANGE",
      "The project, which began as a modest school investigation, eventually influencing Lakewood’s building regulations.",
      "The project began as a modest school investigation, it eventually influenced Lakewood’s building regulations.",
      "The project, which began as a modest school investigation, eventually influenced Lakewood’s building regulations."
    ],
    "answer": 3,
    "explanation": "This choice removes the comma splice and uses the correctly conjugated verb “influenced.”"
  },
  {
    "id": "actdiag-eng-5",
    "domain": "Production of Writing",
    "difficulty": "Medium",
    "question": "Restoring the Night Sky\n\nOn clear evenings, residents of Lakewood could once see hundreds of stars from their backyards. As the town expanded, however, new businesses, parking lots, and streetlights brightened the night sky. Within a decade, many of the faintest stars had disappeared from view—not because the stars themselves had changed, b̲u̲t̲ ̲b̲e̲c̲a̲u̲s̲e̲ ̲e̲x̲c̲e̲s̲s̲i̲v̲e̲ ̲a̲r̲t̲i̲f̲i̲c̲i̲a̲l̲ ̲l̲i̲g̲h̲t̲ ̲w̲e̲r̲e̲ ̲b̲l̲o̲c̲k̲i̲n̲g̲ ̲t̲h̲e̲m̲.̲¹\n\nHoping to address the problem, a group of high school astronomy students conducted a survey. They visited twenty locations throughout Lakewood and measured the brightness of the sky at each one. A̲f̲t̲e̲r̲ ̲r̲e̲c̲o̲r̲d̲i̲n̲g̲ ̲t̲h̲e̲i̲r̲ ̲o̲b̲s̲e̲r̲v̲a̲t̲i̲o̲n̲s̲,̲ ̲m̲a̲p̲s̲ ̲w̲e̲r̲e̲ ̲c̲r̲e̲a̲t̲e̲d̲ ̲s̲h̲o̲w̲i̲n̲g̲ ̲w̲h̲e̲r̲e̲ ̲l̲i̲g̲h̲t̲ ̲p̲o̲l̲l̲u̲t̲i̲o̲n̲ ̲w̲a̲s̲ ̲m̲o̲s̲t̲ ̲s̲e̲v̲e̲r̲e̲.̲² The students found that poorly directed parking-lot lights produced much of the unnecessary brightness.\n\nThe students presented their results to the town council. They did not recommend removing every outdoor light. I̲n̲s̲t̲e̲a̲d̲,̲ ̲t̲h̲e̲y̲ ̲p̲r̲o̲p̲o̲s̲e̲d̲ ̲i̲n̲s̲t̲a̲l̲l̲i̲n̲g̲ ̲s̲h̲i̲e̲l̲d̲e̲d̲ ̲f̲i̲x̲t̲u̲r̲e̲s̲,̲ ̲t̲h̲e̲s̲e̲ ̲f̲i̲x̲t̲u̲r̲e̲s̲ ̲d̲i̲r̲e̲c̲t̲ ̲l̲i̲g̲h̲t̲ ̲t̲o̲w̲a̲r̲d̲ ̲t̲h̲e̲ ̲g̲r̲o̲u̲n̲d̲ ̲r̲a̲t̲h̲e̲r̲ ̲t̲h̲a̲n̲ ̲t̲h̲e̲ ̲s̲k̲y̲.̲³ The students explained that these fixtures could preserve visibility and safety while reducing wasted light.\n\nSeveral local businesses agreed to test the fixtures. Within six months, measurements showed that the sky above the participating properties was noticeably darker. The businesses also reported using less electricity. T̲h̲e̲ ̲p̲r̲o̲j̲e̲c̲t̲,̲ ̲w̲h̲i̲c̲h̲ ̲b̲e̲g̲a̲n̲ ̲a̲s̲ ̲a̲ ̲m̲o̲d̲e̲s̲t̲ ̲s̲c̲h̲o̲o̲l̲ ̲i̲n̲v̲e̲s̲t̲i̲g̲a̲t̲i̲o̲n̲,̲ ̲i̲t̲ ̲e̲v̲e̲n̲t̲u̲a̲l̲l̲y̲ ̲i̲n̲f̲l̲u̲e̲n̲c̲e̲d̲ ̲L̲a̲k̲e̲w̲o̲o̲d̲’̲s̲ ̲b̲u̲i̲l̲d̲i̲n̲g̲ ̲r̲e̲g̲u̲l̲a̲t̲i̲o̲n̲s̲.̲⁴\n\nLakewood has not returned completely to the darkness it experienced decades ago. N̲e̲v̲e̲r̲t̲h̲e̲l̲e̲s̲s̲,̲ ̲r̲e̲s̲i̲d̲e̲n̲t̲s̲ ̲c̲a̲n̲ ̲o̲n̲c̲e̲ ̲a̲g̲a̲i̲n̲ ̲i̲d̲e̲n̲t̲i̲f̲y̲ ̲c̲o̲n̲s̲t̲e̲l̲l̲a̲t̲i̲o̲n̲s̲ ̲t̲h̲a̲t̲ ̲h̲a̲d̲ ̲p̲r̲e̲v̲i̲o̲u̲s̲l̲y̲ ̲b̲e̲e̲n̲ ̲h̲i̲d̲d̲e̲n̲ ̲b̲y̲ ̲t̲h̲e̲ ̲t̲o̲w̲n̲’̲s̲ ̲g̲l̲o̲w̲.̲⁵ The students’ project demonstrated that a community does not always need a dramatic solution to produce a visible change.\n\n5. Which choice provides the most logical transition from the preceding sentence at underlined portion ⁵?",
    "choices": [
      "NO CHANGE",
      "Similarly, residents can once again identify constellations that had previously been hidden by the town’s glow.",
      "For example, residents can once again identify constellations that had previously been hidden by the town’s glow.",
      "Therefore, residents had once identified constellations before they were hidden by the town’s glow."
    ],
    "answer": 0,
    "explanation": "“Nevertheless” correctly signals contrast: the sky hasn’t fully returned to darkness, yet residents can still see more stars than before."
  },
  {
    "id": "actdiag-math-1",
    "domain": "Algebra & Functions",
    "difficulty": "Easy",
    "question": "What is the solution to the equation below?\n\n$5(2x-3)=3x+20$",
    "choices": [
      "$3$",
      "$4$",
      "$5$",
      "$6$"
    ],
    "answer": 2,
    "explanation": "$10x-15=3x+20 \\Rightarrow 7x=35 \\Rightarrow x=5$."
  },
  {
    "id": "actdiag-math-2",
    "domain": "Algebra & Functions",
    "difficulty": "Medium",
    "question": "A rectangular garden has a length that is $4$ feet greater than its width. If the garden’s area is $96$ square feet, what is its width?",
    "choices": [
      "$6$ feet",
      "$8$ feet",
      "$10$ feet",
      "$12$ feet"
    ],
    "answer": 1,
    "explanation": "$w(w+4)=96 \\Rightarrow w^2+4w-96=0 \\Rightarrow (w-8)(w+12)=0 \\Rightarrow w=8$."
  },
  {
    "id": "actdiag-math-3",
    "domain": "Algebra & Functions",
    "difficulty": "Medium",
    "question": "The function $f(x)=2x^2-12x+11$ reaches its minimum value at what value of $x$?",
    "choices": [
      "$-6$",
      "$-3$",
      "$2$",
      "$3$"
    ],
    "answer": 3,
    "explanation": "The vertex occurs at $x=-\\frac{b}{2a}=-\\frac{-12}{4}=3$."
  },
  {
    "id": "actdiag-math-4",
    "domain": "Geometry",
    "difficulty": "Medium",
    "question": "In right triangle $ABC$, $m\\angle C=90^\\circ$, $AC=9$, and $BC=12$. What is the value of $\\sin A$?",
    "choices": [
      "$\\frac{3}{5}$",
      "$\\frac{4}{5}$",
      "$\\frac{3}{4}$",
      "$\\frac{4}{3}$"
    ],
    "answer": 1,
    "explanation": "$AB=\\sqrt{9^2+12^2}=15$; $\\sin A=\\frac{BC}{AB}=\\frac{12}{15}=\\frac{4}{5}$."
  },
  {
    "id": "actdiag-math-5",
    "domain": "Algebra & Functions",
    "difficulty": "Medium",
    "question": "The first term of a geometric sequence is $6$. Each subsequent term is obtained by multiplying the previous term by $\\frac{1}{2}$. What is the fifth term?",
    "choices": [
      "$\\frac{3}{8}$",
      "$\\frac{3}{4}$",
      "$\\frac{3}{2}$",
      "$3$"
    ],
    "answer": 0,
    "explanation": "$a_5=6\\cdot\\left(\\frac{1}{2}\\right)^4=6\\cdot\\frac{1}{16}=\\frac{3}{8}$."
  },
  {
    "id": "actdiag-read-1",
    "domain": "Key Ideas & Details",
    "difficulty": "Medium",
    "question": "The Returned Notebook\n\nWhen Priya opened the bottom drawer of the workbench, she expected to find loose screws or dried tubes of glue. Instead, she found a narrow black notebook. Its cover was scratched, and several of its pages had come loose from the binding. Written inside the cover was her grandfather’s name.\n\nThe workshop had remained mostly untouched since her grandfather moved into a smaller apartment. Priya’s family planned to clean the room and donate the equipment he no longer used. Priya had volunteered to sort the tools because she assumed the task would be simple: keep the useful items, discard the broken ones, and place everything else in boxes. The notebook complicated that plan.\n\nMost of its pages contained drawings of furniture: tables with folding legs, cabinets with hidden compartments, and chairs whose curved backs were labeled with precise measurements. Priya recognized several pieces that still stood around her grandparents’ house. Others appeared never to have been built. Beside those unfinished designs, her grandfather had written questions to himself: Would this joint hold more weight? Could the drawer open from either side? Is there a simpler way?\n\nPriya had always thought of her grandfather as someone who knew exactly what he was doing. Whenever something broke, he repaired it without instructions. When Priya was younger, she would hand him tools while he worked, confident that every movement was part of a plan he had already perfected. The notebook showed something different. His finished work had emerged from crossed-out measurements, abandoned designs, and repeated attempts.\n\nPriya brought the notebook to her grandfather the following weekend. He turned its pages slowly, smiling at some drawings and shaking his head at others. When she asked why he had kept designs that had failed, he looked surprised.\n\n“They didn’t fail,” he said. “They showed me what to try next.”\n\nHe then stopped at a drawing of a small desk. Unlike the other designs, this one contained few measurements. Several sections were blank, and the final page showed only the beginning of one of the desk’s legs.\n\n“I never solved that one,” he said.\n\nPriya studied the drawing. The unfinished desk no longer looked like evidence of something her grandfather could not accomplish. It looked like an invitation.\n\nOver the next month, Priya took the notebook to the workshop each Saturday. At first, she attempted to reproduce her grandfather’s drawing exactly. When the pieces failed to align, however, she added her own notes beside his. She tested a different joint for the legs and slightly widened the desktop. Some changes worked; others filled the next several pages with crossed-out calculations.\n\nWhen the desk was finally complete, it did not look exactly like the one in the original drawing. Priya had preserved the narrow drawers her grandfather designed but replaced his complicated folding mechanism with a simpler support. She worried that he would consider the result incorrect.\n\nInstead, her grandfather ran his hand along the edge of the desk and opened each drawer. Then he turned to a blank page in the notebook and wrote the date beneath Priya’s final measurements.\n\nThe workshop would soon be emptied, but the notebook was no longer a record of objects that belonged only to the past. Its newest pages documented a conversation conducted through sketches, questions, mistakes, and revisions—one that Priya now understood how to continue.\n\n11. The passage primarily describes how Priya:",
    "choices": [
      "discovers that her grandfather’s woodworking ability has been exaggerated.",
      "learns to repair furniture without relying on written instructions.",
      "comes to understand experimentation as part of her grandfather’s creative process.",
      "convinces her family to preserve her grandfather’s workshop."
    ],
    "answer": 2,
    "explanation": "The passage centers on Priya discovering that her grandfather’s finished work grew out of trial and revision — and on her continuing that process herself."
  },
  {
    "id": "actdiag-read-2",
    "domain": "Key Ideas & Details",
    "difficulty": "Medium",
    "question": "The Returned Notebook\n\nWhen Priya opened the bottom drawer of the workbench, she expected to find loose screws or dried tubes of glue. Instead, she found a narrow black notebook. Its cover was scratched, and several of its pages had come loose from the binding. Written inside the cover was her grandfather’s name.\n\nThe workshop had remained mostly untouched since her grandfather moved into a smaller apartment. Priya’s family planned to clean the room and donate the equipment he no longer used. Priya had volunteered to sort the tools because she assumed the task would be simple: keep the useful items, discard the broken ones, and place everything else in boxes. The notebook complicated that plan.\n\nMost of its pages contained drawings of furniture: tables with folding legs, cabinets with hidden compartments, and chairs whose curved backs were labeled with precise measurements. Priya recognized several pieces that still stood around her grandparents’ house. Others appeared never to have been built. Beside those unfinished designs, her grandfather had written questions to himself: Would this joint hold more weight? Could the drawer open from either side? Is there a simpler way?\n\nPriya had always thought of her grandfather as someone who knew exactly what he was doing. Whenever something broke, he repaired it without instructions. When Priya was younger, she would hand him tools while he worked, confident that every movement was part of a plan he had already perfected. The notebook showed something different. His finished work had emerged from crossed-out measurements, abandoned designs, and repeated attempts.\n\nPriya brought the notebook to her grandfather the following weekend. He turned its pages slowly, smiling at some drawings and shaking his head at others. When she asked why he had kept designs that had failed, he looked surprised.\n\n“They didn’t fail,” he said. “They showed me what to try next.”\n\nHe then stopped at a drawing of a small desk. Unlike the other designs, this one contained few measurements. Several sections were blank, and the final page showed only the beginning of one of the desk’s legs.\n\n“I never solved that one,” he said.\n\nPriya studied the drawing. The unfinished desk no longer looked like evidence of something her grandfather could not accomplish. It looked like an invitation.\n\nOver the next month, Priya took the notebook to the workshop each Saturday. At first, she attempted to reproduce her grandfather’s drawing exactly. When the pieces failed to align, however, she added her own notes beside his. She tested a different joint for the legs and slightly widened the desktop. Some changes worked; others filled the next several pages with crossed-out calculations.\n\nWhen the desk was finally complete, it did not look exactly like the one in the original drawing. Priya had preserved the narrow drawers her grandfather designed but replaced his complicated folding mechanism with a simpler support. She worried that he would consider the result incorrect.\n\nInstead, her grandfather ran his hand along the edge of the desk and opened each drawer. Then he turned to a blank page in the notebook and wrote the date beneath Priya’s final measurements.\n\nThe workshop would soon be emptied, but the notebook was no longer a record of objects that belonged only to the past. Its newest pages documented a conversation conducted through sketches, questions, mistakes, and revisions—one that Priya now understood how to continue.\n\n12. Before discovering the notebook, Priya believed her grandfather:",
    "choices": [
      "completed his projects according to plans he had already perfected.",
      "disliked keeping written records of his work.",
      "preferred repairing old objects to constructing new ones.",
      "abandoned most projects before completing them."
    ],
    "answer": 0,
    "explanation": "The passage states Priya was “confident that every movement was part of a plan he had already perfected.”"
  },
  {
    "id": "actdiag-read-3",
    "domain": "Craft & Structure (ACT)",
    "difficulty": "Medium",
    "question": "The Returned Notebook\n\nWhen Priya opened the bottom drawer of the workbench, she expected to find loose screws or dried tubes of glue. Instead, she found a narrow black notebook. Its cover was scratched, and several of its pages had come loose from the binding. Written inside the cover was her grandfather’s name.\n\nThe workshop had remained mostly untouched since her grandfather moved into a smaller apartment. Priya’s family planned to clean the room and donate the equipment he no longer used. Priya had volunteered to sort the tools because she assumed the task would be simple: keep the useful items, discard the broken ones, and place everything else in boxes. The notebook complicated that plan.\n\nMost of its pages contained drawings of furniture: tables with folding legs, cabinets with hidden compartments, and chairs whose curved backs were labeled with precise measurements. Priya recognized several pieces that still stood around her grandparents’ house. Others appeared never to have been built. Beside those unfinished designs, her grandfather had written questions to himself: Would this joint hold more weight? Could the drawer open from either side? Is there a simpler way?\n\nPriya had always thought of her grandfather as someone who knew exactly what he was doing. Whenever something broke, he repaired it without instructions. When Priya was younger, she would hand him tools while he worked, confident that every movement was part of a plan he had already perfected. The notebook showed something different. His finished work had emerged from crossed-out measurements, abandoned designs, and repeated attempts.\n\nPriya brought the notebook to her grandfather the following weekend. He turned its pages slowly, smiling at some drawings and shaking his head at others. When she asked why he had kept designs that had failed, he looked surprised.\n\n“They didn’t fail,” he said. “They showed me what to try next.”\n\nHe then stopped at a drawing of a small desk. Unlike the other designs, this one contained few measurements. Several sections were blank, and the final page showed only the beginning of one of the desk’s legs.\n\n“I never solved that one,” he said.\n\nPriya studied the drawing. The unfinished desk no longer looked like evidence of something her grandfather could not accomplish. It looked like an invitation.\n\nOver the next month, Priya took the notebook to the workshop each Saturday. At first, she attempted to reproduce her grandfather’s drawing exactly. When the pieces failed to align, however, she added her own notes beside his. She tested a different joint for the legs and slightly widened the desktop. Some changes worked; others filled the next several pages with crossed-out calculations.\n\nWhen the desk was finally complete, it did not look exactly like the one in the original drawing. Priya had preserved the narrow drawers her grandfather designed but replaced his complicated folding mechanism with a simpler support. She worried that he would consider the result incorrect.\n\nInstead, her grandfather ran his hand along the edge of the desk and opened each drawer. Then he turned to a blank page in the notebook and wrote the date beneath Priya’s final measurements.\n\nThe workshop would soon be emptied, but the notebook was no longer a record of objects that belonged only to the past. Its newest pages documented a conversation conducted through sketches, questions, mistakes, and revisions—one that Priya now understood how to continue.\n\n13. In context, the grandfather’s statement “They showed me what to try next” indicates that he viewed unsuccessful designs as:",
    "choices": [
      "evidence that he needed better tools.",
      "useful steps toward future solutions.",
      "reasons to stop working on an idea.",
      "reminders of skills he had forgotten."
    ],
    "answer": 1,
    "explanation": "The statement reframes “failed” designs as informative steps that guided his next attempt."
  },
  {
    "id": "actdiag-read-4",
    "domain": "Craft & Structure (ACT)",
    "difficulty": "Medium",
    "question": "The Returned Notebook\n\nWhen Priya opened the bottom drawer of the workbench, she expected to find loose screws or dried tubes of glue. Instead, she found a narrow black notebook. Its cover was scratched, and several of its pages had come loose from the binding. Written inside the cover was her grandfather’s name.\n\nThe workshop had remained mostly untouched since her grandfather moved into a smaller apartment. Priya’s family planned to clean the room and donate the equipment he no longer used. Priya had volunteered to sort the tools because she assumed the task would be simple: keep the useful items, discard the broken ones, and place everything else in boxes. The notebook complicated that plan.\n\nMost of its pages contained drawings of furniture: tables with folding legs, cabinets with hidden compartments, and chairs whose curved backs were labeled with precise measurements. Priya recognized several pieces that still stood around her grandparents’ house. Others appeared never to have been built. Beside those unfinished designs, her grandfather had written questions to himself: Would this joint hold more weight? Could the drawer open from either side? Is there a simpler way?\n\nPriya had always thought of her grandfather as someone who knew exactly what he was doing. Whenever something broke, he repaired it without instructions. When Priya was younger, she would hand him tools while he worked, confident that every movement was part of a plan he had already perfected. The notebook showed something different. His finished work had emerged from crossed-out measurements, abandoned designs, and repeated attempts.\n\nPriya brought the notebook to her grandfather the following weekend. He turned its pages slowly, smiling at some drawings and shaking his head at others. When she asked why he had kept designs that had failed, he looked surprised.\n\n“They didn’t fail,” he said. “They showed me what to try next.”\n\nHe then stopped at a drawing of a small desk. Unlike the other designs, this one contained few measurements. Several sections were blank, and the final page showed only the beginning of one of the desk’s legs.\n\n“I never solved that one,” he said.\n\nPriya studied the drawing. The unfinished desk no longer looked like evidence of something her grandfather could not accomplish. It looked like an invitation.\n\nOver the next month, Priya took the notebook to the workshop each Saturday. At first, she attempted to reproduce her grandfather’s drawing exactly. When the pieces failed to align, however, she added her own notes beside his. She tested a different joint for the legs and slightly widened the desktop. Some changes worked; others filled the next several pages with crossed-out calculations.\n\nWhen the desk was finally complete, it did not look exactly like the one in the original drawing. Priya had preserved the narrow drawers her grandfather designed but replaced his complicated folding mechanism with a simpler support. She worried that he would consider the result incorrect.\n\nInstead, her grandfather ran his hand along the edge of the desk and opened each drawer. Then he turned to a blank page in the notebook and wrote the date beneath Priya’s final measurements.\n\nThe workshop would soon be emptied, but the notebook was no longer a record of objects that belonged only to the past. Its newest pages documented a conversation conducted through sketches, questions, mistakes, and revisions—one that Priya now understood how to continue.\n\n14. Priya describes the unfinished desk as “an invitation” primarily because she:",
    "choices": [
      "believes her grandfather wants her to clean the workshop.",
      "plans to display the drawing publicly.",
      "sees an opportunity to continue the work her grandfather began.",
      "intends to build the desk exactly as it was drawn."
    ],
    "answer": 2,
    "explanation": "Immediately after this description, Priya takes up the unfinished design and adapts it herself."
  },
  {
    "id": "actdiag-read-5",
    "domain": "Key Ideas & Details",
    "difficulty": "Medium",
    "question": "The Returned Notebook\n\nWhen Priya opened the bottom drawer of the workbench, she expected to find loose screws or dried tubes of glue. Instead, she found a narrow black notebook. Its cover was scratched, and several of its pages had come loose from the binding. Written inside the cover was her grandfather’s name.\n\nThe workshop had remained mostly untouched since her grandfather moved into a smaller apartment. Priya’s family planned to clean the room and donate the equipment he no longer used. Priya had volunteered to sort the tools because she assumed the task would be simple: keep the useful items, discard the broken ones, and place everything else in boxes. The notebook complicated that plan.\n\nMost of its pages contained drawings of furniture: tables with folding legs, cabinets with hidden compartments, and chairs whose curved backs were labeled with precise measurements. Priya recognized several pieces that still stood around her grandparents’ house. Others appeared never to have been built. Beside those unfinished designs, her grandfather had written questions to himself: Would this joint hold more weight? Could the drawer open from either side? Is there a simpler way?\n\nPriya had always thought of her grandfather as someone who knew exactly what he was doing. Whenever something broke, he repaired it without instructions. When Priya was younger, she would hand him tools while he worked, confident that every movement was part of a plan he had already perfected. The notebook showed something different. His finished work had emerged from crossed-out measurements, abandoned designs, and repeated attempts.\n\nPriya brought the notebook to her grandfather the following weekend. He turned its pages slowly, smiling at some drawings and shaking his head at others. When she asked why he had kept designs that had failed, he looked surprised.\n\n“They didn’t fail,” he said. “They showed me what to try next.”\n\nHe then stopped at a drawing of a small desk. Unlike the other designs, this one contained few measurements. Several sections were blank, and the final page showed only the beginning of one of the desk’s legs.\n\n“I never solved that one,” he said.\n\nPriya studied the drawing. The unfinished desk no longer looked like evidence of something her grandfather could not accomplish. It looked like an invitation.\n\nOver the next month, Priya took the notebook to the workshop each Saturday. At first, she attempted to reproduce her grandfather’s drawing exactly. When the pieces failed to align, however, she added her own notes beside his. She tested a different joint for the legs and slightly widened the desktop. Some changes worked; others filled the next several pages with crossed-out calculations.\n\nWhen the desk was finally complete, it did not look exactly like the one in the original drawing. Priya had preserved the narrow drawers her grandfather designed but replaced his complicated folding mechanism with a simpler support. She worried that he would consider the result incorrect.\n\nInstead, her grandfather ran his hand along the edge of the desk and opened each drawer. Then he turned to a blank page in the notebook and wrote the date beneath Priya’s final measurements.\n\nThe workshop would soon be emptied, but the notebook was no longer a record of objects that belonged only to the past. Its newest pages documented a conversation conducted through sketches, questions, mistakes, and revisions—one that Priya now understood how to continue.\n\n15. Which action most clearly demonstrates that Priya’s grandfather approves of her changes to the desk?",
    "choices": [
      "He smiles while examining some of his old drawings.",
      "He explains why he kept designs that did not work.",
      "He opens each of the desk’s narrow drawers.",
      "He records the date beside Priya’s final measurements."
    ],
    "answer": 3,
    "explanation": "Writing the date beside Priya’s final measurements formally adds her work to his own record — the clearest sign of approval."
  },
  {
    "id": "actdiag-sci-1",
    "domain": "Data Representation",
    "difficulty": "Easy",
    "question": "A student investigated whether water temperature affected the rate of photosynthesis in an aquatic plant. Equal-sized pieces of the plant were placed in four containers. Each container held 200 milliliters of water and was positioned 30 centimeters from the same lamp.\n\nThe student counted the number of oxygen bubbles released by each plant during a five-minute period. Three trials were conducted at each temperature.\n\nWater temperature   Trial 1   Trial 2   Trial 3   Mean bubbles\n10 degrees Celsius      18        21        21          20\n20 degrees Celsius      34        38        36          36\n30 degrees Celsius      52        55        58          55\n40 degrees Celsius      30        35        34          33\n\nNote: Each trial value represents the number of oxygen bubbles released during a five-minute period. The mean is the average number of bubbles across the three trials at each temperature.\n\nStudent 1: Increasing the water temperature always increases the rate of photosynthesis.\n\nStudent 2: Increasing the water temperature raises the rate of photosynthesis only until an optimal temperature is reached. Above that temperature, the rate decreases.\n\n16. According to the table, the greatest mean number of bubbles was produced at:",
    "choices": [
      "20 degrees Celsius",
      "40 degrees Celsius",
      "30 degrees Celsius",
      "10 degrees Celsius"
    ],
    "answer": 2,
    "explanation": "The mean at 30 degrees Celsius is 55, the highest of the four temperatures."
  },
  {
    "id": "actdiag-sci-2",
    "domain": "Data Representation",
    "difficulty": "Medium",
    "question": "A student investigated whether water temperature affected the rate of photosynthesis in an aquatic plant. Equal-sized pieces of the plant were placed in four containers. Each container held 200 milliliters of water and was positioned 30 centimeters from the same lamp.\n\nThe student counted the number of oxygen bubbles released by each plant during a five-minute period. Three trials were conducted at each temperature.\n\nWater temperature   Trial 1   Trial 2   Trial 3   Mean bubbles\n10 degrees Celsius      18        21        21          20\n20 degrees Celsius      34        38        36          36\n30 degrees Celsius      52        55        58          55\n40 degrees Celsius      30        35        34          33\n\nNote: Each trial value represents the number of oxygen bubbles released during a five-minute period. The mean is the average number of bubbles across the three trials at each temperature.\n\nStudent 1: Increasing the water temperature always increases the rate of photosynthesis.\n\nStudent 2: Increasing the water temperature raises the rate of photosynthesis only until an optimal temperature is reached. Above that temperature, the rate decreases.\n\n17. Between which two temperatures did the mean number of bubbles decrease?",
    "choices": [
      "30 and 40 degrees Celsius",
      "10 and 20 degrees Celsius",
      "20 and 30 degrees Celsius",
      "The mean never decreased."
    ],
    "answer": 0,
    "explanation": "The mean rose from 20 to 36 to 55, then fell to 33 between 30 and 40 degrees Celsius."
  },
  {
    "id": "actdiag-sci-3",
    "domain": "Conflicting Viewpoints",
    "difficulty": "Medium",
    "question": "A student investigated whether water temperature affected the rate of photosynthesis in an aquatic plant. Equal-sized pieces of the plant were placed in four containers. Each container held 200 milliliters of water and was positioned 30 centimeters from the same lamp.\n\nThe student counted the number of oxygen bubbles released by each plant during a five-minute period. Three trials were conducted at each temperature.\n\nWater temperature   Trial 1   Trial 2   Trial 3   Mean bubbles\n10 degrees Celsius      18        21        21          20\n20 degrees Celsius      34        38        36          36\n30 degrees Celsius      52        55        58          55\n40 degrees Celsius      30        35        34          33\n\nNote: Each trial value represents the number of oxygen bubbles released during a five-minute period. The mean is the average number of bubbles across the three trials at each temperature.\n\nStudent 1: Increasing the water temperature always increases the rate of photosynthesis.\n\nStudent 2: Increasing the water temperature raises the rate of photosynthesis only until an optimal temperature is reached. Above that temperature, the rate decreases.\n\n18. The results provide greater support for which conclusion?",
    "choices": [
      "Student 1’s conclusion, because the plant produced bubbles at every temperature",
      "Student 1’s conclusion, because every increase in temperature increased bubble production",
      "Student 2’s conclusion, because bubble production was identical at 20 and 40 degrees Celsius",
      "Student 2’s conclusion, because bubble production increased through 30 degrees Celsius and then decreased"
    ],
    "answer": 3,
    "explanation": "Bubble production rose through 30 degrees Celsius and then dropped at 40, matching Student 2’s claim of an optimal temperature."
  },
  {
    "id": "actdiag-sci-4",
    "domain": "Research Summaries",
    "difficulty": "Medium",
    "question": "A student investigated whether water temperature affected the rate of photosynthesis in an aquatic plant. Equal-sized pieces of the plant were placed in four containers. Each container held 200 milliliters of water and was positioned 30 centimeters from the same lamp.\n\nThe student counted the number of oxygen bubbles released by each plant during a five-minute period. Three trials were conducted at each temperature.\n\nWater temperature   Trial 1   Trial 2   Trial 3   Mean bubbles\n10 degrees Celsius      18        21        21          20\n20 degrees Celsius      34        38        36          36\n30 degrees Celsius      52        55        58          55\n40 degrees Celsius      30        35        34          33\n\nNote: Each trial value represents the number of oxygen bubbles released during a five-minute period. The mean is the average number of bubbles across the three trials at each temperature.\n\nStudent 1: Increasing the water temperature always increases the rate of photosynthesis.\n\nStudent 2: Increasing the water temperature raises the rate of photosynthesis only until an optimal temperature is reached. Above that temperature, the rate decreases.\n\n19. Which factor was deliberately held constant throughout the experiment?",
    "choices": [
      "Water temperature",
      "Distance between each plant and the lamp",
      "Number of bubbles produced",
      "Rate of photosynthesis"
    ],
    "answer": 1,
    "explanation": "Each container was positioned the same 30 centimeters from the same lamp; temperature was manipulated, and bubble count/photosynthesis rate were measured outcomes."
  },
  {
    "id": "actdiag-sci-5",
    "domain": "Data Representation",
    "difficulty": "Medium",
    "question": "A student investigated whether water temperature affected the rate of photosynthesis in an aquatic plant. Equal-sized pieces of the plant were placed in four containers. Each container held 200 milliliters of water and was positioned 30 centimeters from the same lamp.\n\nThe student counted the number of oxygen bubbles released by each plant during a five-minute period. Three trials were conducted at each temperature.\n\nWater temperature   Trial 1   Trial 2   Trial 3   Mean bubbles\n10 degrees Celsius      18        21        21          20\n20 degrees Celsius      34        38        36          36\n30 degrees Celsius      52        55        58          55\n40 degrees Celsius      30        35        34          33\n\nNote: Each trial value represents the number of oxygen bubbles released during a five-minute period. The mean is the average number of bubbles across the three trials at each temperature.\n\nStudent 1: Increasing the water temperature always increases the rate of photosynthesis.\n\nStudent 2: Increasing the water temperature raises the rate of photosynthesis only until an optimal temperature is reached. Above that temperature, the rate decreases.\n\n20. Suppose the student conducted a fourth trial at 30 degrees Celsius and observed 54 bubbles. What would be the approximate mean across all four trials?",
    "choices": [
      "55 bubbles",
      "52 bubbles",
      "58 bubbles",
      "60 bubbles"
    ],
    "answer": 0,
    "explanation": "(52+55+58+54)/4 = 219/4 = 54.75 ≈ 55 bubbles."
  }
];
