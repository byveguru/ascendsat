-- NC Ignyte: nothing a founder writes reaches the public site until an
-- organiser approves it.
-- Run once in the Supabase SQL editor. Safe to run twice. Needs 014 first.
--
-- startup_profiles now holds two copies:
--   startup_name, one_liner, problem, logo           the founder's draft
--   pub_name, pub_one_liner, pub_problem, pub_logo   what the public sees
--
-- An organiser can edit the draft, then approves it, which copies it into the
-- pub_ columns. A founder who edits a live profile changes only the draft, so
-- the approved version stays up until the change is approved too.
-- The public page reads pub_ columns only.
--
-- Profiles saved before this migration are NOT published by it: each one
-- waits for an organiser like any new submission.

ALTER TABLE startup_profiles ADD COLUMN IF NOT EXISTS submitted_at  TIMESTAMPTZ;
ALTER TABLE startup_profiles ADD COLUMN IF NOT EXISTS edited_by     TEXT;
ALTER TABLE startup_profiles ADD COLUMN IF NOT EXISTS pub_name      TEXT;
ALTER TABLE startup_profiles ADD COLUMN IF NOT EXISTS pub_one_liner TEXT;
ALTER TABLE startup_profiles ADD COLUMN IF NOT EXISTS pub_problem   TEXT;
ALTER TABLE startup_profiles ADD COLUMN IF NOT EXISTS pub_logo      TEXT;
ALTER TABLE startup_profiles ADD COLUMN IF NOT EXISTS published_at  TIMESTAMPTZ;
ALTER TABLE startup_profiles ADD COLUMN IF NOT EXISTS published_by  TEXT;

-- Everything saved so far is waiting for review.
UPDATE startup_profiles SET submitted_at = COALESCE(submitted_at, updated_at)
WHERE published_at IS NULL;
