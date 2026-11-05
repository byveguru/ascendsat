-- Organisers can now correct a student's answers and type in an application
-- that arrived by text. Both need a record.
--
-- Until now the only way an application changed after submission was a
-- decision, which appends to decision_log. A quiet UPDATE with nobody's name
-- on it is not good enough for someone else's record, so every field an
-- organiser changes lands here: what it was, what it became, who did it.

CREATE TABLE IF NOT EXISTS application_edits (
  id             BIGSERIAL PRIMARY KEY,
  application_id BIGINT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  field          TEXT NOT NULL,
  old_value      TEXT,
  new_value      TEXT,
  edited_by      TEXT NOT NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS application_edits_app_idx
  ON application_edits (application_id, created_at DESC);

-- The organiser's address when an application was typed in on a student's
-- behalf, NULL when the student applied themselves. A hand-entered row has
-- never been read by the person whose name is on it, so the two should never
-- be mistaken for each other.
ALTER TABLE applications ADD COLUMN IF NOT EXISTS created_by TEXT;

-- Same reasoning as the rest of the schema: the tables are reached only
-- through the server's own connection, never from a browser.
ALTER TABLE application_edits ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON application_edits FROM anon, authenticated;
