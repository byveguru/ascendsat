-- NC Ignyte: the accepted-student portal.
-- Run once in the Supabase SQL editor. Safe to run twice. Needs 012 first.
--
--   help_replies      an organiser's answer to something a student or team
--                     asked for help with, shown to them in the portal
--   announcements     one short message every accepted student sees
--   demo_checklist    each student's demo-day checklist ticks
--   startup_profiles  what each startup shows on the public /startups page
--
-- Every table is reached only through the serverless functions, so RLS is on
-- and the public roles get nothing.

CREATE TABLE IF NOT EXISTS help_replies (
  kind        TEXT NOT NULL CHECK (kind IN ('student', 'team')),
  subject_id  BIGINT NOT NULL,
  week_start  DATE NOT NULL,
  reply       TEXT NOT NULL,
  replied_by  TEXT,
  replied_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (kind, subject_id, week_start)
);

CREATE TABLE IF NOT EXISTS announcements (
  id          BIGSERIAL PRIMARY KEY,
  body        TEXT NOT NULL,
  created_by  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  cleared_at  TIMESTAMPTZ
);

ALTER TABLE applications ADD COLUMN IF NOT EXISTS demo_checklist JSONB NOT NULL DEFAULT '{}'::jsonb;

-- Public by design: nothing here may identify the student. The page that
-- edits it says so, and the API never joins a name, school or email onto it.
CREATE TABLE IF NOT EXISTS startup_profiles (
  application_id  BIGINT PRIMARY KEY REFERENCES applications(id) ON DELETE CASCADE,
  startup_name    TEXT NOT NULL,
  one_liner       TEXT NOT NULL,
  problem         TEXT,
  logo            TEXT,          -- a small data:image URL, resized in the browser
  hidden          BOOLEAN NOT NULL DEFAULT false,
  hidden_by       TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE help_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE startup_profiles ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON help_replies, announcements, startup_profiles FROM anon, authenticated;
REVOKE ALL ON SEQUENCE announcements_id_seq FROM anon, authenticated;
