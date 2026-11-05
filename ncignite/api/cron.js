import { sql } from '../lib/db.js';
import { json } from '../lib/http.js';
import { sendEmail, CONTACT_EMAIL } from '../lib/email.js';
import { parentReminderEmail, codeExpiredEmail } from '../lib/templates.js';
import { generateCode, hashCode, codeHint, codeExpiry } from '../lib/codes.js';

/* One daily job. Vercel's Hobby plan runs cron once a day at the most, so
 * reminders, the lapsed-code nudge and the digest all live here rather than
 * competing for separate schedules. Running it also keeps the Supabase free
 * project from pausing after seven idle days. */

export default async function handler(req, res) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.authorization || '';
  if (!secret || auth !== `Bearer ${secret}`) {
    return json(res, 401, { error: 'Unauthorized' });
  }

  const summary = { reminders: 0, lapsed: 0, digest: false };

  /* ---- 1. remind parents who have not confirmed, at 3 and 7 days ------- */
  for (const day of [3, 7]) {
    const due = await sql`
      SELECT a.id, a.student_name, a.parent_email
      FROM applications a
      WHERE a.status = 'applied'
        AND a.created_at < now() - make_interval(days => ${day})
        AND a.created_at > now() - make_interval(days => ${day + 1})
        AND NOT EXISTS (
          SELECT 1 FROM reminders_sent r
          WHERE r.application_id = a.id AND r.day_offset = ${day})`;

    for (const a of due) {
      /* The old code may well have expired, so issue a fresh one rather
       * than reminding a parent about a code that no longer works. */
      await sql`UPDATE parent_codes SET used_at = now()
                WHERE application_id = ${a.id} AND used_at IS NULL`;
      const code = generateCode();
      await sql`INSERT INTO parent_codes (application_id, code_hash, code_hint, expires_at)
                VALUES (${a.id}, ${hashCode(code)}, ${codeHint(code)}, ${codeExpiry().toISOString()})`;

      const mail = parentReminderEmail({
        studentName: a.student_name, code, deadline: 'November 4, 2026',
      });
      await sendEmail({
        applicationId: a.id, kind: `reminder_${day}d`, to: a.parent_email,
        subject: mail.subject, text: mail.text,
        idempotencyKey: `reminder:${a.id}:${day}`,
      });
      await sql`INSERT INTO reminders_sent (application_id, day_offset)
                VALUES (${a.id}, ${day}) ON CONFLICT DO NOTHING`;
      summary.reminders++;
    }
  }

  /* ---- 2. tell the student when their parent's code lapsed unused ------ */
  const lapsed = await sql`
    SELECT a.id, a.student_name, a.student_email, a.parent_email
    FROM applications a
    WHERE a.status = 'applied'
      AND EXISTS (
        SELECT 1 FROM parent_codes pc
        WHERE pc.application_id = a.id AND pc.used_at IS NULL AND pc.expires_at < now())
      AND NOT EXISTS (
        SELECT 1 FROM email_log e
        WHERE e.application_id = a.id AND e.kind = 'code_expired')`;

  for (const a of lapsed) {
    const mail = codeExpiredEmail({ studentName: a.student_name, parentEmail: a.parent_email });
    await sendEmail({
      applicationId: a.id, kind: 'code_expired', to: a.student_email,
      subject: mail.subject, text: mail.text,
      idempotencyKey: `code_expired:${a.id}`,
    });
    summary.lapsed++;
  }

  /* ---- 3. organiser digest. Counts only, never a name or an address. --- */
  const stats = await sql`
    SELECT
      count(*) FILTER (WHERE created_at > now() - interval '24 hours')::int AS new_apps,
      count(*) FILTER (WHERE parent_confirmed_at > now() - interval '24 hours')::int AS new_confirms,
      count(*) FILTER (WHERE status = 'applied')::int AS waiting_on_parent,
      count(*) FILTER (WHERE status = 'parent_confirmed')::int AS undecided
    FROM applications`;
  const failed = await sql`SELECT count(*)::int AS n FROM email_log WHERE status = 'failed'`;
  const s = stats[0];

  await sendEmail({
    kind: 'digest', to: CONTACT_EMAIL,
    subject: `NC Ignyte daily: ${s.new_apps} new, ${s.undecided} undecided`,
    text: `New applications in the last 24 hours: ${s.new_apps}
Parent confirmations in the last 24 hours: ${s.new_confirms}
Waiting on a parent: ${s.waiting_on_parent}
Confirmed and undecided: ${s.undecided}
Failed emails needing attention: ${failed[0].n}

Open /admin to review.`,
    idempotencyKey: `digest:${new Date().toISOString().slice(0, 10)}`,
  });
  summary.digest = true;

  return json(res, 200, summary);
}
