-- NC Ignyte: permission to contact the family about alumni check-ins.
-- Run once in the Supabase SQL editor. Safe to run twice.
--
-- Nullable rather than defaulting to false: a consent form submitted before
-- this question existed never asked it, and recording a "no" nobody gave is
-- as wrong as recording a "yes". NULL means "we did not ask".

ALTER TABLE applications ADD COLUMN IF NOT EXISTS consent_alumni BOOLEAN;
