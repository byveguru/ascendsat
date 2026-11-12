# middle-school/

Design and data for the AscendSAT grades 6-8 system (math + reading, NC standards, Wake County
pathways). **Nothing in this folder is imported by the app yet.** No existing file was changed.

| File | What it is |
|---|---|
| `DESIGN.md` | Product design: accounts, screens, content model, mastery, parent view, phases |
| `COURSE-MAP.md` | WCPSS course pathways and what standards each course covers |
| `data/math-standards.json` | NC Math 6, 7, 8 and NC Math 1-3 standards (parsed from the NC K-12 Math SCOS) |
| `data/ela-standards-2017.json` | ELA RL, RI and L standards, grades 6-8 (2017 SCOS, in force through 2026-27) |
| `data/ela-standards-2026.json` | ELA grades 6-8 under the 2026 SCOS (starts 2027-28; different code system) |
| `data/items-math6.json` | **Math 6 item bank: 165 items** (11 clusters x 15, all 31 Math 6 standards covered) |
| `data/items-math7.json` | **Math 7 item bank: 135 items** (9 clusters x 15, all 23 Math 7 standards covered) |
| `data/items-math8.json` | **Math 8 item bank: 165 items** (11 clusters x 15, all 25 Math 8 standards covered) |
| `data/passages-ela6.json`, `passages-ela7.json`, `passages-ela8.json` | **24 original reading passages** (8 per grade: 3 literary, 1 poem, 3 informational, 1 argument) |
| `data/items-ela6.json`, `items-ela7.json`, `items-ela8.json` | **180 ELA items** (60 per grade: 20 literature, 20 informational, 20 vocabulary) |
| `data/items-nm1.json` | **NC Math 1 item bank: 180 items** (12 clusters x 15, all 49 NC Math 1 standard codes covered) |
| `data/items-nm2.json` | **NC Math 2 item bank: 195 items** (13 clusters x 15, all 59 NC Math 2 standard codes covered) |
| `data/items-nm3.json` | **NC Math 3 item bank: 195 items** (13 clusters x 15, all 51 NC Math 3 standard codes covered) |
| `tools/math_source/` | The authored NC Math source files; `build_ncmath.py` merges them into the data file |
| `tools/ela_source/` | The authored ELA source files; `build_ela.py` turns them into the data files |
| `tools/` | Parsers, the Math 6 item generator (`build_math6.py`) and the validator (`validate_items.py`) |

## Item banks (Math 6, 7 and 8)

Math 6: 165 items (156 multiple choice, 9 typed). Math 7: 135 items (124 multiple choice, 11 typed; 64 core, 65 stretch, 6 challenge). Math 8: 165 items (156 multiple choice, 9 typed; 78 core, 81 stretch, 6 challenge). The notes below apply to all three.

- Every item has a standard code, an explanation, and (for each wrong choice) the misconception that produces it.
- **Status: `ai-drafted`. No human has reviewed these.** Do not show them to students until a math teacher signs off.
- Answer keys were checked by three independent blind solvers that never saw the keys: every answer matched (165 of 165 for Math 6, 135 of 135 for Math 7, 165 of 165 for Math 8) and none flagged a problem. That checks arithmetic and uniqueness of the right answer only. It does not check wording, age-appropriateness, or whether the distractor explanations are accurate.
- Text only: no images. Data sets are written into the prompt. Items on dot plots, histograms, box plots, nets and number lines describe the picture in words; real visuals are a later pass.
- Prompts use plain Unicode math (×, ÷, −, ²). They will need a pass through the app's math formatter at integration time.
- Math 7 items are tagged `provisionalCourses: ["math6plus"]` in the proportional-relationships, rational-number and geometry domains, because the guide says Math 6 Plus covers "a portion" of grade 7 without listing which standards.
- Math 8 items are also tagged for `math7plus`, because the guide says Math 7 Plus contains all of the grade 8 standards.
- The blind check caught one real problem in Math 8: a distractor that was arguably also correct (the constant function y = 0 is linear). It was replaced, but that single item was not re-solved by a checker.
- Rebuild and check: `cd tools && python3 -I build_math6.py && python3 -I validate_items.py ../data/items-math6.json --per-cluster 15` (and the same with `7` and `8`)

## NC Math 1 item bank

- 180 items: 144 multiple choice and 36 typed. Difficulty is 59 core, 85 stretch and 36 challenge, so it is harder than the grade 6-8 banks on purpose.
- 12 clusters: expressions and polynomials, creating equations, solving equations, systems, graphs of equations and inequalities, functions, analyzing functions, building functions and sequences, linear vs exponential models, coordinate geometry, one-variable data, two-variable data. Every standard code in the NC Math 1 index (including the lettered sub-standards) has at least one item.
- Text only. Graphs, tables and box plots are given as points, tables or five-number summaries. No item needs a calculator beyond simple arithmetic; regression and exponential-model items give the fitted equation instead of asking students to compute it.
- Two typed items whose value repeats (4/3 and 14/3) carry a `tolerance` of 0.01, so a grader should compare them numerically rather than only against the listed text forms. Without that, a correct 1.3333333 would be marked wrong.
- Checks: validator passes; correct answers are spread evenly across A-D (36 each); the correct choice is strictly the longest in 14% of multiple-choice items (chance is 25%). Three independent solvers, who could use Python for arithmetic, solved all 180 from the prompts alone: 179 matched exactly and the last matched in value (a decimal where the key is 4/3). One solver flagged a genuine defect, a distractor that was also true (a range comparison) in a box-plot item; that distractor was replaced, but the fixed item was not re-solved.
- Authors reported several wrong-answer explanations that are looser than ideal and a couple of contrived distractors; a teacher should review those. Status is `ai-drafted`.
- Rebuild and check: `cd tools && python3 -I build_ncmath.py nm1 && python3 -I validate_items.py ../data/items-nm1.json --per-cluster 15`.

## NC Math 3 item bank

- 195 items: 156 multiple choice and 39 typed. Difficulty is 66 core, 89 stretch and 40 challenge.
- 13 clusters: polynomials and the Fundamental Theorem of Algebra, rational expressions, structure and equivalent forms, creating and solving equations (including rational equations with extraneous roots), functions, building functions and transformations, inverse functions, logarithms and end behavior, trigonometry (radians, the unit circle, sine models), triangle centers and parallelogram proofs, circles, solids and modeling, and statistical inference. Every NC Math 3 standard code has at least one item.
- Text only; no calculator-dependent item leaves rounding unstated. Seven typed items with irrational or repeating values carry a `tolerance` of 0.01.
- Known gap: the proof cluster has no item on the converses of the parallelogram theorems (the author flagged this).
- Checks: validator passes; correct answers spread evenly across A-D (39 each); the correct choice is strictly the longest in 14% of multiple-choice items. Three independent solvers, who could use Python, solved all 195 from the prompts alone and matched every key exactly, and none flagged a problem. Because zero flags is better than any earlier bank, I also read 11 conceptual items (proofs, inference, logarithms) myself and re-derived several answers; no distractor was secretly true. The author prompts for this bank explicitly required re-checking every wrong choice, which was the recurring defect in the earlier banks, and the result suggests that instruction helped, though that is not proven.
- Several authors noted loose wrong-answer explanations (especially for rational expressions) and a few weak distractors; a teacher should review those. Status is `ai-drafted`.
- Rebuild and check: `cd tools && python3 -I build_ncmath.py nm3 && python3 -I validate_items.py ../data/items-nm3.json --per-cluster 15`.

## NC Math 2 item bank

- 195 items: 156 multiple choice and 39 typed. Difficulty is 64 core, 92 stretch and 39 challenge.
- 13 clusters: radicals and complex numbers, expressions, creating equations, solving equations (including the quadratic formula and non-real solutions), linear-quadratic systems, functions, function forms and transformations, rigid motions, triangle congruence and proofs, dilations and similarity, right-triangle trigonometry, and two clusters of probability (independence, conditional probability and the addition and multiplication rules). Every NC Math 2 standard code, including the lettered sub-standards, has at least one item.
- Text only: figures are described in words or by coordinates. Proof standards (G-CO.9, G-CO.10) are tested by asking which reason or step completes a short argument, not by asking students to write proofs.
- Four typed items whose value is irrational or repeats carry a `tolerance` of 0.01; a grader should compare those numerically. A solver typed 7.0711 for a key of 5√2, which is correct and falls inside the tolerance.
- Known gap: the function-forms cluster has no square-root or inverse-variation items, even though the standards mention them.
- Checks: validator passes; correct answers are spread evenly across A-D (39 each); the correct choice is strictly the longest in 9% of multiple-choice items (chance is 25%). Three independent solvers, who could use Python, solved all 195 from the prompts alone: 194 matched exactly and one matched in value. One solver flagged a real defect in a triangle-congruence item: a distractor (ASA using the base-angle theorem) was also a valid proof. It was replaced with AAA, but the fixed item was not re-solved.
- Authors reported a few loose wrong-answer explanations and some contrived distractors; a teacher should review those. Status is `ai-drafted`.
- Rebuild and check: `cd tools && python3 -I build_ncmath.py nm2 && python3 -I validate_items.py ../data/items-nm2.json --per-cluster 15`.

## ELA reading banks (grades 6-8)

- Per grade: 8 original passages, 5 questions on each (40 RL/RI items), plus 20 standalone vocabulary items (L.4-6). Passage word counts run roughly 140-390.
- Covered: RL.1-6, RI.1-6, RI.8, L.4-6 (2017 standards). **Not covered on purpose:** RL.7/RI.7 (media and visuals), RL.9/RI.9 (comparing two texts), RL.10/RI.10 (range), L.1-3 (grammar for writing).
- Every passage is original writing. Informational passages use well-established facts and avoid statistics; I fact-checked the Grade 7 ones and the blind solvers found no factual errors in any of them. The two argument passages named "Keep the Library Open" (Grades 6 and 8) are different texts on the same topic, and their survey numbers are invented inside the fiction.
- **Lexile is `null` everywhere.** I can't produce a real Lexile measure. Each passage carries a rough Flesch-Kincaid estimate instead, and it runs low for Grade 6 (about 4.4-7.4), so passage difficulty is not verified against the Lexile bands in `COURSE-MAP.md`.
- Checks: validator passes for all three grades; correct answers are spread evenly across A-D; the correct choice is the longest in 11%, 25% and 18% of items (25% is chance), though Grade 8 vocabulary is high at 8 of 20. Three independent solvers answered all 180 items from the passages alone and matched every key. They flagged three wording problems (a paragraph-number reference and two prompts that named details the passage doesn't state); those were fixed, but the fixed items were not re-solved.
- Status is `ai-drafted`: no teacher has reviewed the passages or items. Rebuild and check: `cd tools && python3 -I build_ela.py && python3 -I validate_ela.py 6` (and `7`, `8`).

Standards JSON was extracted from PDF text by script. Lead-in sentences are reliable; sub-bullets
under a standard are mostly not attached. Spot-check against the source PDFs before using any
single entry as authoritative.
