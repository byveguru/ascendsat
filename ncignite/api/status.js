import { sql, throttle } from '../lib/db.js';
import { json, maskEmail } from '../lib/http.js';
import { generateCode, hashCode, codeHint, codeExpiry } from '../lib/codes.js';
import { sendEmail, emailsDisabled } from '../lib/email.js';
import { parentCodeEmail } from '../lib/templates.js';
import { currentStudent } from '../lib/auth.js';
import { STAGES, canApplyAgain } from '../lib/stages.js';

/* Behind the account, so there is nothing to enumerate: you see your own
 * application or nothing. A code is never shown here. */

export default async function handler(req, res) {
  const action = String(req.query?.action || 'check');
  if (req.method !== 'GET' && req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  const student = await currentStudent(req);
  if (!student) return json(res, 401, { error: 'Please sign in.', signInRequired: true });

  const rows = await sql`
    SELECT id, status, student_name, parent_email, created_at,
           decided_at, decision_subject, decision_letter
    FROM applications WHERE student_id = ${student.id}
    ORDER BY created_at DESC LIMIT 1`;

  if (!rows.length) {
    return json(res, 200, {
      signedInAs: student.email,
      found: false,
      canApply: true,
      label: 'You have not applied yet',
      detail: 'Your account is verified. The application takes a few minutes.',
    });
  }
  const row = rows[0];

  if (action === 'resend') {
    /* Emails a third party, so it is limited far harder than a status read:
     * one every ten minutes, three a day for this application. */
    const perApp = await throttle(`resend_app:${row.id}`, {
      limit: 3, windowMs: 24 * 60 * 60 * 1000, lockMs: 24 * 60 * 60 * 1000,
    });
    const perMinute = await throttle(`resend_recent:${row.id}`, {
      limit: 1, windowMs: 10 * 60 * 1000, lockMs: 10 * 60 * 1000,
    });
    if (!perApp.allowed || !perMinute.allowed) {
      return json(res, 429, {
        error: 'We recently sent a code to your parent. Wait ten minutes, and ask them to check spam.',
      });
    }
    if (row.status !== 'applied') {
      return json(res, 200, { resent: true, maskedParentEmail: maskEmail(row.parent_email) });
    }

    // Retire outstanding codes so only the newest one works.
    await sql`UPDATE parent_codes SET used_at = now()
              WHERE application_id = ${row.id} AND used_at IS NULL`;

    const code = generateCode();
    await sql`
      INSERT INTO parent_codes (application_id, code_hash, code_hint, expires_at)
      VALUES (${row.id}, ${hashCode(code)}, ${codeHint(code)}, ${codeExpiry().toISOString()})`;

    const mail = parentCodeEmail({ studentName: row.student_name, code });
    await sendEmail({
      applicationId: row.id, kind: 'parent_code_resend', to: row.parent_email,
      subject: mail.subject, text: mail.text,
      idempotencyKey: `parent_code_resend:${row.id}:${Date.now()}`,
    });
    return json(res, 200, {
      resent: true,
      maskedParentEmail: maskEmail(row.parent_email),
      ...(emailsDisabled() ? { emailDisabled: true, parentCode: code } : {}),
    });
  }

  const stage = STAGES[row.status] || STAGES.applied;
  return json(res, 200, {
    signedInAs: student.email,
    emailDisabled: emailsDisabled(),
    found: true,
    status: row.status,
    /* The application form is only theirs to fill in again once we have
     * answered the last one. While it is open, /apply shows where it stands
     * instead, so nobody submits twice and waits on the wrong row. */
    canApply: canApplyAgain(row.status),
    ...stage,
    appliedAt: row.created_at,
    decidedAt: row.decided_at,
    /* The letter the organisers actually sent. Shown here as well as emailed,
     * because an email can be missed, filtered or deleted and this is the one
     * thing the student most needs to be able to read again. */
    letterSubject: row.decision_letter ? row.decision_subject : null,
    letter: row.decision_letter || null,
    canResend: row.status === 'applied',
    maskedParentEmail: maskEmail(row.parent_email),
  });
}
