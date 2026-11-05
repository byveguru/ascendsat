-- NC Ignyte: students pick which cohort they are applying to.
-- Run once in the Supabase SQL editor. Safe to run twice.
--
-- Nullable rather than NOT NULL DEFAULT: applications submitted before this
-- question existed were not asked, and guessing an answer for them would be
-- worse than an organiser seeing it blank.

ALTER TABLE applications ADD COLUMN IF NOT EXISTS cohort TEXT;
CREATE INDEX IF NOT EXISTS applications_cohort_idx ON applications (cohort);
