-- NC Ignyte: keep the decision letter, so the portal can show the student
-- exactly what we sent rather than a generic one line status.
-- Run once in the Supabase SQL editor. Safe to run twice.

ALTER TABLE applications ADD COLUMN IF NOT EXISTS decision_subject TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS decision_letter  TEXT;

-- The decision log keeps every version, so an edited and resent letter does
-- not erase what the student first read.
ALTER TABLE decision_log ADD COLUMN IF NOT EXISTS letter TEXT;
