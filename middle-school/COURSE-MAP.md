# Middle School Course Map (Wake County / NC)

Sources: WCPSS Middle School Program Planning Guide 2020-21 (full course descriptions),
NC K-12 Mathematics Standard Course of Study (2018 adoption), NC ELA Standard Course of Study
(2017, and the 2026 version that starts 2027-28).

**Freshness warning:** the 2026-27 WCPSS guide supplied was a one-page cover (the real guide is
behind a link). Course names below come from the 2020-21 guide. Re-verify against the current
guide before launch. Placement thresholds changed several times over the years, so the app never
computes placement: the parent or student picks the course.

## Math courses by grade (WCPSS)

| Grade | Courses |
|---|---|
| 6 | Math 6, Math 6 Plus, Compacted 6 Plus/7 Plus |
| 7 | Math 7, Math 7 Plus, NC Math 1 (middle + high school credit) |
| 8 | Math 8, NC Math 1, NC Math 2, NC Math 3 (high school credit) |

## What each course covers (as standard sets)

| Course | Standards in scope |
|---|---|
| Math 6 | All of grade 6 (`NC.6.*`) |
| Math 6 Plus | All of grade 6 + a portion of grade 7 (proportional relationships, operations with rational numbers, angle/area/volume, constructions) |
| Math 7 | All of grade 7 (`NC.7.*`) |
| Math 7 Plus | A portion of grade 7 + all of grade 8 (`NC.8.*`) |
| Compacted 6 Plus / 7 Plus | All of grades 6, 7 and 8 in one course |
| Math 8 | All of grade 8 (`NC.8.*`) |
| NC Math 1 | `NC.M1.*` (linear, exponential, quadratic relationships; bivariate data; coordinate geometry) |
| NC Math 2 | `NC.M2.*` (quadratics, higher-degree polynomials, transformations, similarity, right-triangle trig, conditional probability) |
| NC Math 3 | `NC.M3.*` (logarithmic, polynomial, rational, trig functions; inference; modeling) |

NC Math 1-3 are **integrated** courses (algebra, geometry, statistics mixed in each), not separate
Algebra I / Geometry / Algebra II. NC Math 1 and NC Math 3 end with an End-of-Course test worth 20%
of the course grade (the guide lists no state EOC for NC Math 2).

"A portion of grade 7" is not itemized in the guide. Which exact standards fall in Math 6 Plus vs
Math 7 Plus is a district unit-list question. Until we have WCPSS's unit lists, the Plus courses
use the domain descriptions in the guide, and the standard-to-course tags in
`data/course-standards.json` (to be created in Phase 0) are marked `provisional: true`.

## Pathways

| Path | 6th | 7th | 8th | High school |
|---|---|---|---|---|
| Standard | Math 6 | Math 7 | Math 8 | NC Math 1, 2, 3 |
| Accelerated | Math 6 Plus | Math 7 Plus | NC Math 1 | NC Math 2, 3, then a 4th math |
| Compacted | Compacted 6+/7+ | NC Math 1 | NC Math 2 (NC Math 3 also listed for 8th) | Fourth-year math |

Rules worth encoding as hints, never as blockers:
- A whole course cannot be skipped (Math 7 straight to NC Math 1 skips Math 8) except via the
  state exceptions (HB986, Single Subject Acceleration).
- NC Math 1/2 taken in 7th or 8th earns high school credit but the grade does not count in high
  school GPA. A student who passes NC Math 1 with a D or above cannot retake it.
- Compacting at 6th grade was limited to magnet schools in 2021-22. Do not assume every school
  offers it.

## ELA (reading)

| Grade | Standards | Lexile band (2026 doc) |
|---|---|---|
| 6 | 2017: `RL.6.*`, `RI.6.*`, `L.6.*` / 2026: `6.CT/CD/CW.*` | 925L-1070L |
| 7 | 2017: `RL.7.*`, `RI.7.*`, `L.7.*` / 2026: `7.CT/CD/CW.*` | 970L-1120L |
| 8 | 2017: `RL.8.*`, `RI.8.*`, `L.8.*` / 2026: `8.CT/CD/CW.*` | 1010L-1185L |

The 2017 standards apply through 2026-27; the 2026 standards start 2027-28. Every reading item is
tagged with a 2017 code now and gets a 2026 code during Phase 2 (the two code systems do not map
one-to-one, so the crosswalk is manual).
