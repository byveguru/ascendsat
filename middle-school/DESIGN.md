# AscendSAT Middle School (Grades 6-8) — Design

Status: **design only.** Nothing here changes existing app code. All files live in `middle-school/`.
Integration into `App.tsx` is Phase 4 and needs explicit approval.

Scope: general **math** (Math 6/7/8, the Plus courses, NC Math 1-3) and **reading** (ELA 6-8),
aligned to NC standards, for Wake County (WCPSS) course pathways. See `COURSE-MAP.md`.

## 1. Goals and non-goals

Goals
- A student sees practice that matches the course they are actually in this year.
- Every question is tied to a state standard code, so progress means "mastering NC.7.EE.4",
  not a vague score.
- A parent can see credible progress without a second product.
- A clear on-ramp toward the SAT (Section 8), without pretending a 7th grader is an SAT student.

Non-goals (for v1)
- No placement computation (thresholds change; the family picks the course).
- No state-test (EOG/EOC) score predictions. Practice is standards-aligned, not a validated
  predictor. Say so in the UI.
- No leaderboards, referrals, public profiles, or paid tutoring for child accounts.
- No science or social studies.

## 2. Who uses it and how accounts work

| Age | Account | Notes |
|---|---|---|
| Under 13 (mostly grades 6-7) | **Parent-created child profile** | Parent gives consent first (COPPA applies; confirm with counsel, this is not legal advice). Parent owns the identity. |
| 13 and up (mostly grade 8) | Normal student account, or child profile | Can use the existing signup, with parent link optional |

Important: the existing parent-link policy (`PRODUCT.md`, Nov 8) has the **student** send an
invitation and the parent get read-only aggregate access. For under-13 that direction is wrong
(a child cannot grant a parent access to data the parent already controls). Child profiles invert
it: the parent creates and owns the profile, always sees activity, and can export or delete it.
This is a deliberate fork of the policy and must be reviewed before any build.

Under-13 rules
- No open-ended AI chat. Hints are structured (pre-written or tightly templated) and never
  free-text conversation with a model.
- No marketing email to the child. Parent receives the weekly digest.
- No data sold or used for advertising; minimum data collected (first name or nickname, grade,
  course, progress).
- No peer features. No photo or free-text sharing.
- Writing responses and answers are visible to the parent, not to other users.

## 3. The student experience

Mascot: Ollie, the penguin (approved identity, nine expression states, `PRODUCT.md` Nov 10).
Expressions follow real activity state, never random, and never guilt. Younger grades can
lean on Ollie more than the SAT product does; keep it out of timed tasks.

Screens (all new, under a `ms` test mode when integrated)

1. **Home**: "Today's practice" is one button. It starts a short set (5-8 items) on the standard
   the student most needs. Below it: streak that never shames (a rest day is not a loss),
   this week's goal ring, and the current unit.
2. **Course map**: units for the chosen course, each a cluster of standards. Shows mastery per
   cluster (not locked: students can jump around).
3. **Practice**: one question at a time, immediate feedback, explanation, and a "try a similar
   one" action. Incorrect answers keep the shared red tint (`PRODUCT.md` Nov 10).
4. **Reading studio**: passage on one side, questions on the other (stacked on phones). Text sized
   for readability. Passages come from a Lexile band for the grade (Section 5).
5. **Review**: one saved or due question at a time with a confirmed rating before moving on
   (matches the current Review screen pattern).
6. **Progress**: standards mastered, by domain; weekly activity; honest "not enough data yet"
   states.
7. **Parent view**: weekly summary, strongest and weakest standards in plain English, time spent,
   what is coming up. One screen, no jargon (see Section 7).
8. **Course picker**: grade, math course, ELA course. Shows the path (Standard/Accelerated/
   Compacted) and a "this isn't my class?" change action. Never says "you were placed in".

## 4. Content model

One record per item. This is the contract between content writers, the generator pipeline, and
the app.

```json
{
  "id": "ms-m7-ee-4-0012",
  "subject": "math",
  "courses": ["math7", "math7plus", "compacted67"],
  "standards": ["NC.7.EE.4"],
  "type": "mcq | numeric | multi | ordering | passage-mcq | short-response",
  "difficulty": "core | stretch | challenge",
  "prompt": "...",
  "choices": ["..."],
  "answer": "...",
  "explanation": "...",
  "commonErrors": [{ "answer": "...", "why": "..." }],
  "visual": null,
  "passageId": null,
  "review": { "status": "authored | ai-drafted | human-reviewed", "reviewer": "", "date": "" },
  "provisional": false
}
```

Rules
- Standards come from `data/math-standards.json` and `data/ela-standards-2017.json` only.
  An item with a code not in those files fails validation.
- Reading items carry both the 2017 code now and the 2026 code later (`standards2026`).
- `commonErrors` is required for math: wrong answers should teach, and they feed the
  mistake-pattern analysis the SAT product already has (Mistake DNA).
- `review.status` must be `human-reviewed` before an item ships to students. AI drafting is
  allowed (`ai_pipeline/` and `sat_item_generation/` exist) but a wrong answer key in front of
  a 7th grader costs trust fast.
- Numeric answers accept equivalent forms (fractions, decimals) using the existing math-answer
  matching; ratios and units need their own rules (open question).

## 5. Standards data (built)

`data/math-standards.json` — parsed from the NC K-12 Math SCOS.

| Course key | Entries | Domains |
|---|---|---|
| `6` | 31 | RP, NS, EE, G, SP |
| `7` | 23 | RP, NS, EE, G, SP |
| `8` | 25 | NS, EE, G, SP, F |
| `M1` | 49 | 10 (A-APR, A-CED, A-REI, A-SSE, F-BF, F-IF, F-LE, G-GPE, N-RN, S-ID) |
| `M2` | 59 | 12 |
| `M3` | 51 | 15 |

Counts include lettered sub-standards (for example `1a`, `1b`).

`data/ela-standards-2017.json` — RL, RI and L (language) standards: 25 entries per grade.
`data/ela-standards-2026.json` — 52, 50 and 50 entries for grades 6, 7 and 8 (strand codes CT,
CD, CW). Lexile bands in that document: grade 6 925L-1070L, grade 7 970L-1120L,
grade 8 1010L-1185L.

Parsing caveat: these were extracted from PDF text with a script. Some entries have the lead-in
sentence only (the sub-bullets under a standard are not attached). Spot-check against the PDFs
before relying on any single entry. The parse scripts are not committed; rerun them against the
original PDFs if the standards change.

## 6. Progress and mastery

Reuse the existing mastery formula (difficulty-weighted by recency, normalized so ten easy
items do not equal mastery) from `lib/masteryEngine.js`, but at **cluster level** (a standard's
`cluster` field), because 6-8 clusters hold 2-6 standards each and one standard is too few items
to measure. Statuses stay the same ladder (weak, practiced, remediated, proved, mastered,
needsReview).

Rules specific to this age band
- No score estimate on a scale like the SAT's 400-1600. Show standards mastered and a plain
  readiness label per unit ("Getting started", "Building", "Strong").
- Streaks reward showing up, with a built-in rest day. No loss-aversion framing.
- XP stays separate from academic mastery (same rule as the SAT product).
- Math 6 Plus / 7 Plus / Compacted use the same item bank filtered by course tags, so a
  student switching course keeps their history per standard.

## 7. Parent experience

Weekly digest (email) and an in-app parent view
- This week: days practiced, items answered, time.
- Mastered since last week (named in plain English: "Solving one-step equations").
- Needs a nudge: two or three standards, each with a one-line "what this means" and a
  suggested 10-minute activity.
- What is coming up in their course map.
- Link to the standard text for parents who want it.

Not shown: raw item-by-item answers for under-13 beyond the parent's own export, and anything
implying a state-test prediction.

## 8. SAT bridge (proposal, not yet validated)

Middle-school standards that lead into the four SAT Math domains the app already uses. This
mapping is a design judgment and should be reviewed by a math teacher.

| SAT domain | Grade 6-8 feeders | NC Math feeders |
|---|---|---|
| Algebra | `6.EE`, `7.EE`, `8.EE`, `8.F` | `M1.A-CED`, `M1.A-REI`, `M1.F-IF` |
| Advanced Math | `8.EE` (exponents, radicals) | `M1.F-LE`, `M2.A-SSE`, `M2.A-APR`, `M3.*` |
| Geometry and Trigonometry | `6.G`, `7.G`, `8.G` | `M2.G-SRT`, `M3.G-C`, `M3.F-TF` |
| Problem Solving and Data Analysis | `6.RP`, `7.RP`, `6.SP`, `7.SP`, `8.SP` | `M1.S-ID`, `M2.S-CP`, `M2.S-IC` |

Reading feeders: `RL`/`RI` standards feed Information and Ideas; `RI.*.4-6` and `L.*.4-6` feed
Craft and Structure; `L.*.1-3` feed Standard English Conventions.

Use: when a student finishes NC Math 1 or turns 13, show an optional "start SAT prep" card that
carries over progress by domain. Never auto-enroll.

## 9. Reuse from the existing app (read-only observations)

Existing pieces that fit, found by reading the repo (no edits made)
- `components/OllieQuestionPerch.tsx` for the seated penguin on a question.
- `components/MathAnswerInput.tsx`, `MathText.tsx`, `formatMathText.ts` for math entry and display.
- `lib/masteryEngine.js` for the mastery formula and status ladder.
- `lib/studyScheduler.ts` for building a weekly plan.
- `components/ParentPortal.tsx` and `lib/parentSummary.cjs` for parent summaries.
- `activeTest` / `enabledTests` / `getTestConfig` in `App.tsx` for test-type switching. A new
  `ms` mode would plug in the same way `sat`, `act` and `ap` do.

Constraints to respect when integrating
- Vercel Hobby caps the project at 12 serverless functions, so any new server logic folds into
  an existing API file.
- `App.tsx` stays monolithic and `// @ts-nocheck` by design. Put logic in `lib/` or
  `middle-school/` modules and call it from `App.tsx`.
- The shared Everest palette, Fraunces headings, and `theme.ts` / `appStyles.ts` tokens apply.

## 10. Phased plan

| Phase | Deliverable | Touches existing code |
|---|---|---|
| 0 | This design, standards indexes, WCPSS unit lists, `course-standards.json` mapping, item validator | No |
| 1 | Math 6/7/8 item bank (target: 15 items per cluster for a first pass), practice + progress prototype in `middle-school/` | No. **Math 6 (165), Math 7 (135) and Math 8 (165) banks done, ai-drafted. 465 math items in all** |
| 2 | ELA 6-8: 40-60 passages in Lexile bands, RL/RI/L items, reading studio | No. **First pass done: 24 passages and 180 items (ai-drafted); the reading studio and Lexile tagging are not started** |
| 3 | Plus courses, Compacted, NC Math 1-3 banks | No. **All math banks done, ai-drafted: Math 6 (165), 7 (135), 8 (165), NC Math 1 (180), 2 (195), 3 (195) = 1,035 items; Plus-course unit tagging not started** |
| 4 | Integrate as `ms` mode in `App.tsx`: course picker, home, parent view, child profiles and consent | **Yes, needs approval** |
| 5 | Parent digest email, SAT bridge card | Yes |

Content volume estimate for Phase 1-2 (a planning number, not a promise): about 80 math
standards at 15 items is roughly 1,200 math items for grades 6-8, plus roughly 120 reading
passages with 4-6 questions each. NC Math 1-3 (about 160 standards) roughly doubles the math
total. A human review step is the bottleneck, not generation.

## 11. Open questions

1. WCPSS unit lists for Math 6 Plus and Math 7 Plus (which "portion of grade 7"). Needs the
   current guide or the district's pacing documents.
2. Child-profile consent flow and the inverted parent-link policy: who reviews it?
3. Should grade 8 default to the normal signup (13+) or always use a child profile?
4. Is a human math teacher available to review item banks and the SAT bridge mapping?
5. Math tools: allow a calculator on grade 6-7 items? NC Math 1-3 uses graphing tools. The app
   already embeds Desmos for the SAT; reuse for NC Math only.
6. Ratio and unit answers ("3:4", "12 cm"): how strict should answer matching be?
7. Name and branding: "AscendSAT Middle" or a separate name that doesn't say SAT.
