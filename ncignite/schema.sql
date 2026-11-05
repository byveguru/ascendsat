-- NC Ignyte Cohort 1. Run once against DATABASE_URL.
-- Holds minors' contact details, so every column here is collected by a form
-- the student or parent filled in. Nothing is derived or bought.

-- A student verifies their email before they can apply, so every application
-- is tied to an address someone proved they control.
CREATE TABLE IF NOT EXISTS students (
  id            BIGSERIAL PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE,     -- always stored lowercased
  password_hash TEXT,                     -- scrypt, see lib/passwords.js. NULL = code only
  password_set_at TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_login_at TIMESTAMPTZ
);

-- Short lived six digit codes for sign up and log in. Hashed, like the
-- parent codes, so the table is useless if it leaks.
CREATE TABLE IF NOT EXISTS login_codes (
  id          BIGSERIAL PRIMARY KEY,
  student_id  BIGINT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  code_hash   TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at  TIMESTAMPTZ NOT NULL,
  used_at     TIMESTAMPTZ,
  -- A password typed on the sign up form, applied only once the code proves
  -- the person owns the inbox. Hashed, so an abandoned sign up leaves nothing.
  pending_password_hash TEXT
);
CREATE INDEX IF NOT EXISTS login_codes_hash_idx ON login_codes (code_hash);

-- Forgot password links. Only the hash of the URL token is stored.
CREATE TABLE IF NOT EXISTS password_resets (
  token_hash TEXT PRIMARY KEY,
  student_id BIGINT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  used_at    TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS password_resets_student_idx ON password_resets (student_id);

CREATE TABLE IF NOT EXISTS student_sessions (
  token_hash  TEXT PRIMARY KEY,
  student_id  BIGINT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at  TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS applications (
  id                BIGSERIAL PRIMARY KEY,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  student_id        BIGINT REFERENCES students(id) ON DELETE SET NULL,

  -- form 1, student
  cohort            TEXT,                    -- which cohort they applied to
  student_name      TEXT NOT NULL,
  student_phone     TEXT NOT NULL,
  student_email     TEXT NOT NULL,
  parent_name       TEXT NOT NULL,
  parent_email      TEXT NOT NULL,
  parent_phone      TEXT NOT NULL,
  school_grade      TEXT NOT NULL,
  startup_name      TEXT NOT NULL,
  building          TEXT NOT NULL,
  team_size         TEXT NOT NULL,
  team_other        TEXT,
  teammate_names    TEXT,
  teammate_emails   TEXT,
  why_join          TEXT NOT NULL,
  goals             TEXT NOT NULL,
  can_attend        TEXT NOT NULL,
  food_allergies    TEXT,
  student_agreed    BOOLEAN NOT NULL DEFAULT FALSE,

  -- lifecycle
  status            TEXT NOT NULL DEFAULT 'applied'
                    CHECK (status IN ('applied','parent_confirmed','accepted','declined','withdrawn')),
  decided_at        TIMESTAMPTZ,
  decided_by        TEXT,
  decline_reason    TEXT,
  admin_note        TEXT,
  -- The letter the student was sent, kept verbatim so /status can show the
  -- same words rather than a generic line.
  decision_subject  TEXT,
  decision_letter   TEXT,

  -- form 2, parent. Written only after the code gate is passed.
  parent_confirmed_at   TIMESTAMPTZ,
  guardian_name         TEXT,
  guardian_relationship TEXT,
  guardian_email        TEXT,
  guardian_phone        TEXT,
  emergency_contact     TEXT,
  safety_notes          TEXT,
  consent_participate   BOOLEAN,
  consent_transport     BOOLEAN,
  consent_ai            BOOLEAN,
  consent_photo         BOOLEAN,
  consent_alumni        BOOLEAN,   -- may we contact them about alumni check-ins

  -- Weekly check-ins are opened per student by an organiser, so acceptance
  -- alone does not grant them. NULL means not invited.
  checkin_invited_at    TIMESTAMPTZ,
  checkin_invited_by    TEXT,
  signature             TEXT
);

CREATE INDEX IF NOT EXISTS applications_status_idx ON applications (status);
CREATE INDEX IF NOT EXISTS applications_student_idx ON applications (student_id);
CREATE INDEX IF NOT EXISTS applications_student_email_idx ON applications (lower(student_email));

-- Codes are stored as a hash. A leaked backup must not let anyone consent
-- on a parent's behalf.
CREATE TABLE IF NOT EXISTS parent_codes (
  id              BIGSERIAL PRIMARY KEY,
  application_id  BIGINT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  code_hash       TEXT NOT NULL,
  code_hint       TEXT NOT NULL,          -- last 2 characters, for support only
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at      TIMESTAMPTZ NOT NULL,
  used_at         TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS parent_codes_hash_idx ON parent_codes (code_hash);

-- Short-lived session granted only after a code verifies.
CREATE TABLE IF NOT EXISTS parent_sessions (
  token_hash      TEXT PRIMARY KEY,
  application_id  BIGINT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at      TIMESTAMPTZ NOT NULL
);

-- Every send is recorded so /admin can show failures. Never the body.
CREATE TABLE IF NOT EXISTS email_log (
  id              BIGSERIAL PRIMARY KEY,
  application_id  BIGINT REFERENCES applications(id) ON DELETE SET NULL,
  kind            TEXT NOT NULL,
  status          TEXT NOT NULL CHECK (status IN ('queued','sent','failed','skipped')),
  attempts        INT NOT NULL DEFAULT 0,
  error           TEXT,
  idempotency_key TEXT UNIQUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS email_log_status_idx ON email_log (status);

CREATE TABLE IF NOT EXISTS reminders_sent (
  application_id  BIGINT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  day_offset      INT NOT NULL,
  sent_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (application_id, day_offset)
);

CREATE TABLE IF NOT EXISTS partners (
  id            BIGSERIAL PRIMARY KEY,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  organization  TEXT,
  role          TEXT,
  phone         TEXT,
  support_types TEXT NOT NULL,
  sponsor_range TEXT,
  expertise     TEXT,
  availability  TEXT NOT NULL,
  notes         TEXT
);

CREATE TABLE IF NOT EXISTS updates_signups (
  id         BIGSERIAL PRIMARY KEY,
  email      TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Generic throttle for codes, logins and form posts.
CREATE TABLE IF NOT EXISTS rate_limits (
  bucket      TEXT PRIMARY KEY,
  hits        INT NOT NULL DEFAULT 0,
  window_start TIMESTAMPTZ NOT NULL DEFAULT now(),
  locked_until TIMESTAMPTZ
);

-- Organiser sessions. Separate from student sessions so revoking one
-- never touches the other.
CREATE TABLE IF NOT EXISTS admin_sessions (
  token_hash  TEXT PRIMARY KEY,
  email       TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at  TIMESTAMPTZ NOT NULL
);

-- Who decided what, and when. A reversal appends rather than overwrites.
CREATE TABLE IF NOT EXISTS decision_log (
  id              BIGSERIAL PRIMARY KEY,
  application_id  BIGINT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  decision        TEXT NOT NULL CHECK (decision IN ('accepted','declined','withdrawn','reversed')),
  reason_code     TEXT,
  personal_note   TEXT,
  letter          TEXT,
  decided_by      TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS decision_log_app_idx ON decision_log (application_id);

-- The weekly check-in. See migrations/006-checkins.sql for the reasoning.
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

-- --------------------------------------------------------------------------
-- Row Level Security.
--
-- Supabase exposes every public-schema table through PostgREST using the
-- anon key, which is public by design. These tables hold minors' contact
-- details and the medical and allergy notes parents type into the consent
-- form, so that API must return nothing at all.
--
-- Our /api functions connect as the table owner over the pooler, and owners
-- bypass RLS, so enabling it here costs the application nothing. The REVOKEs
-- are belt and braces: they strip the grants rather than relying on RLS, so
-- a table added later without a policy is not silently exposed.
-- --------------------------------------------------------------------------
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE login_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE password_resets ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders_sent ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE updates_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE decision_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkins ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon, authenticated;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES FROM anon, authenticated;
