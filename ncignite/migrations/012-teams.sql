-- NC Ignyte: teams, and a group check-in per team.
-- Run once in the Supabase SQL editor. Safe to run twice.
--
-- An organiser groups accepted applicants into teams. A student is on at most
-- one team (applications.team_id), and every member must be in the team's
-- cohort. A team has its own check-in per week, in addition to each member's
-- own: any member can edit it.
--
-- team_checkins deliberately has no ON DELETE CASCADE from teams. Deleting a
-- team must never silently delete what a group wrote, so a team with check-ins
-- cannot be deleted; the admin page says so and the members can be removed
-- instead.
--
-- Two members can have the form open at once, so each team check-in carries a
-- version that goes up on every save. A save made from an out-of-date copy is
-- refused and the member is shown the newer one, rather than quietly erasing
-- a teammate's work.

CREATE TABLE IF NOT EXISTS teams (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  cohort      TEXT NOT NULL,
  created_by  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS teams_cohort_name_idx ON teams (cohort, lower(name));

ALTER TABLE applications ADD COLUMN IF NOT EXISTS team_id BIGINT REFERENCES teams(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS applications_team_idx ON applications (team_id) WHERE team_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS team_checkins (
  id             BIGSERIAL PRIMARY KEY,
  team_id        BIGINT NOT NULL REFERENCES teams(id) ON DELETE RESTRICT,
  week_start     DATE NOT NULL,
  goals          JSONB NOT NULL DEFAULT '[]'::jsonb,
  help_needed    TEXT,
  first_saved_at TIMESTAMPTZ,
  goals_set_at   TIMESTAMPTZ,
  version        INT NOT NULL DEFAULT 1,
  -- Who saved last. SET NULL so removing an application never blocks or erases
  -- the team's record.
  updated_by     BIGINT REFERENCES applications(id) ON DELETE SET NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (team_id, week_start)
);
CREATE INDEX IF NOT EXISTS team_checkins_week_idx ON team_checkins (week_start);

ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_checkins ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON teams, team_checkins FROM anon, authenticated;
REVOKE ALL ON SEQUENCE teams_id_seq, team_checkins_id_seq FROM anon, authenticated;

-- Repair: goals saved as a JSON string instead of an array. An earlier version
-- of the save encoded them twice, so a row can hold the text "[{...}]" where an
-- array belongs. Unwrap those; rows that are already arrays are untouched.
UPDATE checkins
SET goals = (goals #>> '{}')::jsonb
WHERE jsonb_typeof(goals) = 'string';
