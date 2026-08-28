# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code.

# Tech Stack

- **Expo** — React Native framework (iOS, Android, Web)
- **React Native** — underlying mobile framework powering Expo
- **Firebase** — auth, database, and cloud functions
- **Node.js** — cloud functions (v18 and v24)
- **Groq** — AI/LLM API
- **EmailJS** — email sending via cloud functions
- **VS Code** — editor
- **Vercel** — web deployment (serves `dist/` build)

# Architecture

- **App.tsx is intentionally monolithic** (~13k lines). Do not suggest splitting it into components or screens.
- **App.tsx has `// @ts-nocheck`** intentionally. Do not remove or flag it.
- **Firebase config in `firebase.js` is hardcoded by design.** Do not flag as a security issue.
- Design system lives in `theme.ts` (tokens) and `appStyles.ts` (utilities) — use these instead of inline styles.

# Commands

- `npm start` — start Expo dev server
- `npm run ios` — run on iOS simulator
- `npm run android` — run on Android emulator
- `npm run web` — run web version
- `npm run build:web` — export web build to `dist/`
- `firebase deploy --only functions` — deploy both Cloud Functions codebases

# Cloud Functions

Two separate codebases, both deployed together:
- `functions/` — Node 18, Firebase Functions v4
- `ascendsat_codebase/` — Node 24

Function env vars (set via Firebase secrets): `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`, `ADMIN_EMAIL`, `GROQ_API_KEY`

# Testing & Linting

No tests or linting are configured. Do not add them unless explicitly asked.

## Workflow Orchestration

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately - don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes - don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests - then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

## Task Management

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

## Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.