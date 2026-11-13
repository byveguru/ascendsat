-- NC Ignyte: show emails sent BEFORE migration 010 in /admin.
-- Run once in the Supabase SQL editor, after 010. Safe to run twice.
--
-- The old log kept only kind and status: never the address, never the text.
-- So these rows cannot be restored exactly. What can be rebuilt is WHO the
-- email went to and ROUGHLY what its subject was, because both follow from
-- the kind and the application it belongs to. Those rows are flagged
-- reconstructed, and /admin says so.
--
-- Caveats, all deliberate:
--   * Addresses are taken from the application as it is NOW. If an organiser
--     edited an address after the email went out, this shows the new one.
--   * Subjects are the current template wording with the student's first name.
--   * The text of past emails was never stored and is not invented here.
--   * Emails with no application (sign-in codes, password emails, the daily
--     digest, partner enquiries) cannot be traced to a recipient and stay as
--     "not recorded".
--   * Nothing already recorded by 010 is touched: only rows with no recipients
--     and no subject are filled in.
--
-- To preview before changing anything, run just this SELECT first:
--   SELECT e.id, e.kind, e.status, a.student_name FROM email_log e
--   JOIN applications a ON a.id = e.application_id
--   WHERE e.recipients IS NULL AND e.subject IS NULL ORDER BY e.id;

ALTER TABLE email_log ADD COLUMN IF NOT EXISTS reconstructed BOOLEAN NOT NULL DEFAULT false;

WITH src AS (
  SELECT e.id, e.kind,
         a.student_email, a.parent_email, a.guardian_email,
         COALESCE(NULLIF((regexp_split_to_array(btrim(a.student_name), '\s+'))[1], ''), 'there') AS first
  FROM email_log e
  JOIN applications a ON a.id = e.application_id
  WHERE e.recipients IS NULL AND e.subject IS NULL
)
UPDATE email_log e SET
  recipients = CASE
    WHEN s.kind IN ('parent_code', 'parent_code_admin', 'parent_code_resend')
      OR s.kind LIKE 'reminder\_%' ESCAPE '\'
      THEN ARRAY[lower(s.parent_email)]
    WHEN s.kind IN ('student_notice', 'consent_student', 'code_expired', 'checkin_invite')
      THEN ARRAY[lower(s.student_email)]
    WHEN s.kind = 'consent_parent'
      THEN ARRAY[lower(COALESCE(NULLIF(s.guardian_email, ''), s.parent_email))]
    WHEN s.kind LIKE 'decision\_%' ESCAPE '\'
      THEN ARRAY[lower(s.student_email), lower(s.parent_email)]
  END,
  subject = CASE
    WHEN s.kind IN ('parent_code', 'parent_code_admin', 'parent_code_resend')
      THEN 'Please confirm ' || s.first || '''s spot in NC Ignyte'
    WHEN s.kind LIKE 'reminder\_%' ESCAPE '\'
      THEN 'A reminder about ' || s.first || '''s NC Ignyte application'
    WHEN s.kind IN ('consent_parent', 'consent_student')
      THEN 'We received ' || s.first || '''s consent form'
    WHEN s.kind = 'student_notice'
      THEN 'We emailed your parent a code'
    WHEN s.kind = 'code_expired'
      THEN 'Your parent’s NC Ignyte code expired'
    WHEN s.kind = 'checkin_invite'
      THEN 'Your weekly check-in is open'
    WHEN s.kind LIKE 'decision\_%' ESCAPE '\'
      THEN 'There has been an update on your NC Ignyte application'
  END,
  reconstructed = true
FROM src s
WHERE e.id = s.id
  AND (s.kind IN ('parent_code', 'parent_code_admin', 'parent_code_resend', 'student_notice',
                  'consent_parent', 'consent_student', 'code_expired', 'checkin_invite')
       OR s.kind LIKE 'reminder\_%' ESCAPE '\'
       OR s.kind LIKE 'decision\_%' ESCAPE '\');
