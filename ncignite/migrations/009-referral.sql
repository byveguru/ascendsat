-- Two new questions on the application: whether someone on the team referred
-- this student, and if so who.
--
-- Both are nullable with no default, because every application already in the
-- table was submitted before the question existed. A blank here means "never
-- asked", which is not the same as "No", and the admin editor treats it that
-- way: it will not make an organiser answer on a student's behalf.

ALTER TABLE applications ADD COLUMN IF NOT EXISTS referred    TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS referred_by TEXT;
