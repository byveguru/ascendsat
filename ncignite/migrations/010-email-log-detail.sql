-- NC Ignyte: let /admin see every email the platform sent.
-- Run once in the Supabase SQL editor. Safe to run twice.
--
-- email_log used to hold only kind and status, on purpose: never the address,
-- never the body. Organisers now need to see what went out and to whom, so it
-- also records the recipients and the subject.
--
-- The body is kept only for kinds lib/email.js names on an allowlist, so
-- anything that carries a sign-in code, parent code (including reminders) or
-- password-reset link is never stored, and nor is any kind added later until
-- someone decides it is safe. For those the body column stays NULL.
--
-- Rows from before this migration keep NULLs, so history starts from the day
-- it is run. The columns are written by a separate best-effort statement, so
-- sending email works whether or not this has been run yet.

ALTER TABLE email_log ADD COLUMN IF NOT EXISTS recipients TEXT[];
ALTER TABLE email_log ADD COLUMN IF NOT EXISTS bcc        BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE email_log ADD COLUMN IF NOT EXISTS subject    TEXT;
ALTER TABLE email_log ADD COLUMN IF NOT EXISTS body       TEXT;

CREATE INDEX IF NOT EXISTS email_log_created_idx ON email_log (created_at DESC);
