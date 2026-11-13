-- NC Ignyte: an organiser can tick off what someone asked for help with.
-- Run once in the Supabase SQL editor. Safe to run twice. Needs 012 first.
--
-- One row per ask that an organiser has marked handled. "student" asks live in
-- checkins (subject_id = applications.id), "team" asks in team_checkins
-- (subject_id = teams.id), so there is no foreign key here.
--
-- help_text is a copy of what the ask said when it was ticked. An ask counts
-- as handled only while the check-in still says exactly that, so a student who
-- rewrites their ask afterwards puts it back on the list automatically, and
-- the student's save path never has to know this table exists.

CREATE TABLE IF NOT EXISTS help_handled (
  kind        TEXT NOT NULL CHECK (kind IN ('student', 'team')),
  subject_id  BIGINT NOT NULL,
  week_start  DATE NOT NULL,
  help_text   TEXT NOT NULL,
  handled_by  TEXT,
  handled_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (kind, subject_id, week_start)
);

ALTER TABLE help_handled ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON help_handled FROM anon, authenticated;
