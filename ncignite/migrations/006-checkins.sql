-- NC Ignyte: the weekly check-in.
-- Run once in the Supabase SQL editor. Safe to run twice.
--
-- One row per student per week. A week is named by its Monday, which is also
-- the session date, so week_start is the natural key alongside the student.
--
-- A week closes at 11:59 PM on its last day, but closing does not lock it.
-- A student can still fill it in afterwards; it is simply marked late. The
-- distinction an organiser needs is three ways, not two: on time, late, and
-- nothing at all.
--
-- Everything is timed in America/New_York, because the deadline is "11:59 PM"
-- to a student in North Carolina, not to a server in Virginia. Postgres does
-- the arithmetic so the end of daylight saving mid-cohort is handled for us.

CREATE TABLE IF NOT EXISTS checkins (
  id             BIGSERIAL PRIMARY KEY,
  application_id BIGINT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  week_start     DATE NOT NULL,            -- the Monday the week begins

  -- [{ "text": "...", "done": false }, ...]. Kept together so a tick can
  -- never drift onto the wrong goal, which is what two parallel arrays
  -- would eventually allow.
  goals          JSONB NOT NULL DEFAULT '[]'::jsonb,
  help_needed    TEXT,

  -- The first save with anything in it. This is what decides on time or
  -- late, and it is never overwritten by a later edit.
  first_saved_at TIMESTAMPTZ,
  goals_set_at   TIMESTAMPTZ,              -- first save that had goals

  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE (application_id, week_start)
);

CREATE INDEX IF NOT EXISTS checkins_week_idx ON checkins (week_start);
CREATE INDEX IF NOT EXISTS checkins_app_idx ON checkins (application_id);

ALTER TABLE checkins ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON checkins FROM anon, authenticated;
