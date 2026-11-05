/* The application itself: what its fields are, what counts as valid, how one
 * is written, and how a parent is asked to consent.
 *
 * This lives apart from any endpoint because two different doors lead to the
 * same room. A student fills in the public form, and an organiser types in
 * answers a student sent by text. Both must produce the same row and the same
 * emails, so both run this.
 *
 * The alternative, a second copy of the rules inside the admin endpoint, would
 * agree with this one on the day it was written and quietly disagree a month
 * later.
 */
import { sql } from './db.js';
import { str, isEmail } from './http.js';
import { generateCode, hashCode, codeHint, codeExpiry } from './codes.js';
import { sendEmail } from './email.js';
import { parentCodeEmail, studentCodeSentEmail } from './templates.js';
import { COHORT_SESSIONS } from './weeks.js';

/* Mirrors the asterisks on the form. The browser checks these too, but the
 * browser is not a security boundary. The label is the one the person sees in
 * the error, so it matches the question as it is asked on the page. */
export const REQUIRED = [
  ['cohort', 'Which cohort you are applying to'],
  ['student_name', 'Your Name'],
  ['student_phone', 'Phone Number'],
  ['parent_name', 'Parent Name'],
  ['parent_email', 'Parent Email'],
  ['parent_phone', 'Parent Phone Number'],
  ['school_grade', 'Student School and Grade'],
  ['startup_name', 'Name of Startup'],
  ['building', 'What are you building?'],
  ['team_size', 'Are you solo or do you have a team?'],
  ['why_join', 'Why do you want to be part of this program?'],
  ['goals', 'What are your goals with your startup?'],
  ['can_attend', 'Can you make all the meetings?'],
  ['referred', 'Whether someone on the team referred you'],
];

/* The optional fields, with their own caps. Kept beside REQUIRED so adding a
 * question means touching one list, not four statements. */
const OPTIONAL = [
  ['team_other', 300],
  ['teammate_names', 600],
  ['teammate_emails', 600],
  ['food_allergies', 600],
  ['referred_by', 300],
];

/* The long answers. Everything else is a line, not a paragraph. */
const LONG = new Set(['building', 'why_join', 'goals']);

/* Questions that did not exist when earlier applications were submitted, so
 * they are required of a new application and never demanded of an old one. */
const NEW_ONLY = new Set(['referred']);

/* Every field an applicant owns, in the order the form asks for them. The
 * admin editor uses this as its allowlist, which is why the consent fields
 * and the lifecycle columns are deliberately absent: an organiser may correct
 * what a student wrote, never what a guardian attested to. */
export const APPLICANT_FIELDS = [
  ...REQUIRED.map(([key]) => key),
  ...OPTIONAL.map(([key]) => key),
];

/* The cohort names come from the check-in calendar, which is already keyed by
 * them. One list, so a renamed cohort cannot be valid in one place and
 * rejected in another. */
export const COHORTS = Object.keys(COHORT_SESSIONS);

/* The fixed sets behind the radio groups on the form. The page offers only
 * these, so anything else arriving means the request did not come from the
 * form, and storing it would put a value in the table that no filter or
 * grouping knows how to handle. */
export const TEAM_SIZES = ['Solo', 'Team of 2', 'Team of 3', 'Team of 4', 'Other'];
export const CAN_ATTEND = ['Yes', 'Mostly', 'Not sure'];
export const REFERRED = ['Yes', 'No'];

const CAP = (key) => {
  const optional = OPTIONAL.find(([k]) => k === key);
  if (optional) return optional[1];
  return LONG.has(key) ? 1500 : 300;
};

/* Reads only the fields an applicant owns, trimmed and capped. Anything else
 * in the body is ignored rather than rejected, so a stray field from an older
 * cached page cannot fail an otherwise good application. */
export function readApplicationFields(body, keys = APPLICANT_FIELDS) {
  const f = {};
  for (const key of keys) f[key] = str(body[key], CAP(key));
  return f;
}

/* Returns an object keyed by field name, because the browser maps those keys
 * straight back onto the form controls to mark them.
 *
 * `only` lets the admin editor validate a partial edit: a row saved before
 * these option sets were enforced can still have its other answers corrected
 * without being held hostage by a legacy value in a field nobody is touching.
 */
export function validateApplication(f, { creating = false, agreed, only = null } = {}) {
  const errors = {};
  const wanted = (key) => (only ? only.includes(key) : true);

  for (const [key, label] of REQUIRED) {
    if (!wanted(key)) continue;
    /* The referral question was added after applications were already in the
     * table, so a blank one means "never asked", not "No". Demanding it on an
     * edit would make an organiser answer it on the student's behalf. */
    if (NEW_ONLY.has(key) && !creating) continue;
    if (!f[key]) errors[key] = `${label} is required.`;
  }
  if (wanted('cohort') && f.cohort && !COHORTS.includes(f.cohort)) {
    errors.cohort = 'Choose one of the two cohorts.';
  }
  if (wanted('team_size') && f.team_size && !TEAM_SIZES.includes(f.team_size)) {
    errors.team_size = 'Choose one of the listed team sizes.';
  }
  if (wanted('can_attend') && f.can_attend && !CAN_ATTEND.includes(f.can_attend)) {
    errors.can_attend = 'Choose one of the listed answers.';
  }
  if (wanted('referred') && f.referred && !REFERRED.includes(f.referred)) {
    errors.referred = 'Choose Yes or No.';
  }
  /* The name is only wanted when there is someone to name. The form greys the
   * box out on No, and the server agrees rather than trusting that it did. */
  if (wanted('referred') && f.referred === 'Yes' && !f.referred_by) {
    errors.referred_by = 'Please write the full name of whoever referred you.';
  }
  if (wanted('parent_email') && f.parent_email && !isEmail(f.parent_email)) {
    errors.parent_email = 'Enter a valid email address.';
  }
  if (creating && agreed !== true && agreed !== 'Yes') {
    errors.student_agreed = 'You need to agree to take part before you can apply.';
  }
  return errors;
}

/* Answering No leaves nothing to store. Clearing it here means a student who
 * types a name, then changes the radio to No, cannot leave the name behind. */
export function normaliseReferral(f) {
  if (f.referred === 'No') f.referred_by = '';
  return f;
}

/* One open application per account. While it is still with us the student
 * cannot start another, so nobody submits twice and then waits on the wrong
 * row. The page hides the form in the same cases, but the page is not a
 * security boundary, so the rule lives here too. */
export async function openApplicationFor(studentId) {
  const rows = await sql`
    SELECT id, status FROM applications WHERE student_id = ${studentId}
    ORDER BY created_at DESC LIMIT 1`;
  return rows[0] || null;
}

/* `createdBy` is the organiser's address when an application was typed in on a
 * student's behalf, and null when the student applied themselves. Keeping the
 * two tellable apart matters later: a hand-entered row has never been seen by
 * the person whose name is on it. */
export async function insertApplication({ studentId, studentEmail, fields, createdBy = null }) {
  const f = fields;
  const rows = await sql`
    INSERT INTO applications (
      student_id, cohort, student_name, student_phone, student_email,
      parent_name, parent_email, parent_phone,
      school_grade, startup_name, building,
      team_size, team_other, teammate_names, teammate_emails,
      why_join, goals, can_attend, food_allergies, student_agreed, created_by,
      referred, referred_by
    ) VALUES (
      ${studentId}, ${f.cohort}, ${f.student_name}, ${f.student_phone}, ${studentEmail},
      ${f.parent_name}, ${f.parent_email}, ${f.parent_phone},
      ${f.school_grade}, ${f.startup_name}, ${f.building},
      ${f.team_size}, ${f.team_other}, ${f.teammate_names}, ${f.teammate_emails},
      ${f.why_join}, ${f.goals}, ${f.can_attend}, ${f.food_allergies}, TRUE, ${createdBy},
      ${f.referred}, ${f.referred_by}
    ) RETURNING id, student_name, parent_email`;
  return rows[0];
}

/* The code and both emails go out in this same request, so a parent has it
 * within seconds rather than waiting on a scheduled job.
 *
 * Returns the code as well as whether the mail left, because with email turned
 * off the only way to carry on is to read the code off the screen. */
export async function startParentConsent(application, studentEmail) {
  const code = generateCode();
  const expires = codeExpiry();
  await sql`
    INSERT INTO parent_codes (application_id, code_hash, code_hint, expires_at)
    VALUES (${application.id}, ${hashCode(code)}, ${codeHint(code)}, ${expires.toISOString()})`;

  const parentMail = parentCodeEmail({ studentName: application.student_name, code });
  const studentMail = studentCodeSentEmail({ parentEmail: application.parent_email });

  const results = await Promise.allSettled([
    sendEmail({
      applicationId: application.id, kind: 'parent_code', to: application.parent_email,
      subject: parentMail.subject, text: parentMail.text,
      idempotencyKey: `parent_code:${application.id}`,
    }),
    sendEmail({
      applicationId: application.id, kind: 'student_notice', to: studentEmail,
      subject: studentMail.subject, text: studentMail.text,
      idempotencyKey: `student_notice:${application.id}`,
    }),
  ]);

  return { code, sent: results.every((r) => r.status === 'fulfilled' && r.value.status === 'sent') };
}
