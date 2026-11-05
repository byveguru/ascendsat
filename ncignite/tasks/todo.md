# Admin: edit applications, and enter one by hand

## Plan

- [x] Extract the application's rules, insert and parent-consent email into
      `lib/application.js` so the public form and the admin panel run the same code
- [x] Make `api/apply.js` a thin caller of it, behaviour unchanged
- [x] `migrations/008-admin-edits.sql`: `application_edits` audit table, `applications.created_by`
- [x] `action=edit` in `api/admin.js` — student answers only, logs every change
- [x] `action=create` in `api/admin.js` — find-or-create the account, insert, start parent consent
- [x] `change_parent_email` now writes to the same log instead of changing a row silently
- [x] `action=detail` returns the edit history
- [x] Admin UI: one form for both jobs, "Add an application", "Edit answers", edit history
- [x] `tests/application-rules.mjs` pinning the shared rules (42 checks)
- [ ] **Run migration 008 against the live database** (must happen before deploy)
- [ ] Deploy
- [ ] Verify live: enter one test application, confirm the parent email, edit two fields

## Decisions

- **Student answers only are editable.** The guardian's consent record (the four
  consent boxes, emergency contact, safety notes, signature) is evidence of what a
  parent attested to, not a form for an organiser to rewrite. A guardian who needs to
  change it re-confirms through the parent flow.
- **`student_email` is not editable.** It is the account identity, taken from the
  session rather than the form. Changing it on the application row would detach the
  application from the login without changing the login.
- **A decided application can still be edited**, and the letter it already sent is
  never rewritten.
- **No email when an answer is edited.** These are corrections; the record carries them.
- **Both enums tightened.** `team_size` and `can_attend` were required but never
  checked against the radio values the form offers. The shared validator now checks
  all three, including `cohort`, whose list is derived from `COHORT_SESSIONS` in
  `lib/weeks.js` rather than being a second hard-coded copy.

## Order of operations, and why it matters

`insertApplication` writes the new `created_by` column, so **the migration has to run
before the deploy**. Deploying first would leave the public apply form inserting into
a column that does not exist, during application season. Migration, then deploy.

## Review

Pending live verification.
