-- NC Ignyte: real passwords on Ignyte accounts.
-- Run once in the Supabase SQL editor. Safe to run twice.
--
-- Accounts created before this migration have password_hash NULL. They can
-- still log in with an emailed code, and are asked to set a password once
-- they are in, so nobody is locked out.

ALTER TABLE students ADD COLUMN IF NOT EXISTS password_hash   TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS password_set_at TIMESTAMPTZ;

-- A password chosen on the sign up form, held until the six digit code
-- proves the person owns the inbox. Stored hashed, like everything else, so
-- an abandoned sign up never leaves a usable secret lying around.
ALTER TABLE login_codes ADD COLUMN IF NOT EXISTS pending_password_hash TEXT;

-- Forgot password links. The token is in the URL, so only its hash is kept:
-- a leaked backup must not let anyone take over an account.
CREATE TABLE IF NOT EXISTS password_resets (
  token_hash TEXT PRIMARY KEY,
  student_id BIGINT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  used_at    TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS password_resets_student_idx ON password_resets (student_id);

ALTER TABLE password_resets ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON password_resets FROM anon, authenticated;
