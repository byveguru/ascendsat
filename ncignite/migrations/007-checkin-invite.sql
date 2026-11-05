-- NC Ignyte: check-ins are opened per student by an organiser.
-- Run once in the Supabase SQL editor. Safe to run twice.
--
-- Being accepted is not the same as being ready to check in. An organiser
-- decides when a student starts, so the column is the invitation itself:
-- NULL means not invited, a timestamp means invited and when.

ALTER TABLE applications ADD COLUMN IF NOT EXISTS checkin_invited_at TIMESTAMPTZ;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS checkin_invited_by TEXT;

CREATE INDEX IF NOT EXISTS applications_checkin_invited_idx
  ON applications (checkin_invited_at) WHERE checkin_invited_at IS NOT NULL;
