import { sql, throttle } from '../lib/db.js';
import { json, maskEmail } from '../lib/http.js';
import { generateCode, hashCode, codeHint, codeExpiry } from '../lib/codes.js';
import { sendEmail, emailsDisabled } from '../lib/email.js';
import { parentCodeEmail } from '../lib/templates.js';
import { currentStudent } from '../lib/auth.js';
import { STAGES, canApplyAgain } from '../lib/stages.js';
import { COHORT_SESSIONS, weeksFor } from '../lib/weeks.js';
import { readJson } from '../lib/http.js';
import {
  orMissing, DEMO_CHECKLIST, cleanChecklist, currentAnnouncement, cleanProfile, shapeProfile, cohortFolder,
} from '../lib/portal.js';

/* Behind the account, so there is nothing to enumerate: you see your own
 * application or nothing. A code is never shown here. */

export default async function handler(req, res) {
  const action = String(req.query?.action || 'check');
  if (req.method !== 'GET' && req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  /* ---- the public startup showcase --------------------------------------
   * The one thing here anyone can read. Startup fields only: no student
   * name, school or contact detail is ever joined on. Folded into this
   * function because the plan caps how many functions the site can have. */
  if (req.method === 'GET' && action === 'showcase') {
    /* Approved copies only: a founder's draft never reaches this query. */
    const rows = await orMissing(() => sql`
      SELECT p.pub_name, p.pub_one_liner, p.pub_problem, p.pub_logo, a.cohort
      FROM startup_profiles p JOIN applications a ON a.id = p.application_id
      WHERE a.status = 'accepted' AND p.published_at IS NOT NULL AND p.pub_name IS NOT NULL
      ORDER BY a.cohort, lower(p.pub_name)`, []);
    const count = new Map();
    for (const r of rows) count.set(r.cohort, (count.get(r.cohort) || 0) + 1);
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.end(JSON.stringify({
      cohorts: Object.entries(COHORT_SESSIONS).map(([name, dates]) => ({ ...cohortFolder(name, dates), count: count.get(name) || 0 })),
      startups: rows.map((r) => ({
        startupName: r.pub_name, oneLiner: r.pub_one_liner, problem: r.pub_problem || '',
        logo: r.pub_logo || null, cohort: r.cohort,
      })),
    }));
  }

  const student = await currentStudent(req);
  if (!student) return json(res, 401, { error: 'Please sign in.', signInRequired: true });

  const rows = await sql`
    SELECT id, status, student_name, parent_email, created_at,
           decided_at, decision_subject, decision_letter, cohort, startup_name, checkin_invited_at
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

  /* ---- portal writes: the demo checklist and the startup profile -------- */
  if (req.method === 'POST' && (action === 'checklist' || action === 'profile')) {
    if (row.status !== 'accepted') return json(res, 403, { error: 'This is for accepted students.' });
    const body = await readJson(req);
    try {
      if (action === 'checklist') {
        const list = cleanChecklist(body.checklist);
        await sql`UPDATE applications SET demo_checklist = ${JSON.stringify(list)}::text::jsonb WHERE id = ${row.id}`;
        return json(res, 200, { ok: true, checklist: list });
      }
      if (body.remove) {
        await sql`DELETE FROM startup_profiles WHERE application_id = ${row.id}`;
        return json(res, 200, { ok: true, profile: null });
      }
      const { profile: p, error } = cleanProfile(body);
      if (error) return json(res, 400, { error });
      /* Saving changes the draft and sends it for review. The public copy is
       * untouched until an organiser approves. A removed logo is sent as an
       * empty string; keep_logo leaves it be. */
      const saved = await sql`
        INSERT INTO startup_profiles (application_id, startup_name, one_liner, problem, logo, submitted_at)
        VALUES (${row.id}, ${p.startupName}, ${p.oneLiner}, ${p.problem || null}, ${p.logo || null}, now())
        ON CONFLICT (application_id) DO UPDATE SET
          startup_name = EXCLUDED.startup_name, one_liner = EXCLUDED.one_liner,
          problem = EXCLUDED.problem,
          logo = ${body.keep_logo ? sql`startup_profiles.logo` : sql`EXCLUDED.logo`},
          submitted_at = now(), edited_by = NULL, updated_at = now()
        RETURNING startup_name, one_liner, problem, logo, updated_at, submitted_at, published_at, edited_by`;
      return json(res, 200, { ok: true, profile: shapeProfile(saved[0]) });
    } catch (err) {
      if (err && (err.code === '42P01' || err.code === '42703')) {
        return json(res, 409, { error: 'This part of the portal is still being set up. Try again later.' });
      }
      throw err;
    }
  }

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

  /* What the portal shows an accepted student: their Fridays, when each
   * check-in is due, and who is on their team. */
  let portal = null;
  if (row.status === 'accepted') {
    const due = new Map(weeksFor(row.cohort).map((w) => [w.start, w.due]));
    const dates = COHORT_SESSIONS[row.cohort] || [];
    let team = null;
    try {
      const t = await sql`
        SELECT t.name, array_agg(m.student_name ORDER BY m.student_name) AS members
        FROM applications me JOIN teams t ON t.id = me.team_id
        JOIN applications m ON m.team_id = t.id
        WHERE me.id = ${row.id} GROUP BY t.name`;
      if (t.length) team = { name: t[0].name, members: t[0].members };
    } catch (err) {
      /* Teams arrive with migration 012. */
      if (!(err && (err.code === '42P01' || err.code === '42703'))) throw err;
    }
    const extras = await orMissing(async () => {
      const r = await sql`
        SELECT a.demo_checklist, p.startup_name, p.one_liner, p.problem, p.logo, p.updated_at,
               p.submitted_at, p.published_at, p.edited_by
        FROM applications a LEFT JOIN startup_profiles p ON p.application_id = a.id
        WHERE a.id = ${row.id}`;
      return r[0] || {};
    }, {});
    portal = {
      demoChecklist: DEMO_CHECKLIST.map((c) => ({ ...c, done: Boolean((extras.demo_checklist || {})[c.key]) })),
      announcement: await currentAnnouncement(),
      profile: extras.startup_name ? shapeProfile(extras) : null,
      profileReady: extras.demo_checklist !== undefined,
      name: row.student_name,
      cohort: row.cohort,
      startup: row.startup_name || null,
      checkinOpen: Boolean(row.checkin_invited_at),
      sessions: dates.map((d, i) => ({ date: d, demoDay: i === dates.length - 1, checkinDue: due.get(d) || null })),
      team,
    };
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
    portal,
    canResend: row.status === 'applied',
    maskedParentEmail: maskEmail(row.parent_email),
  });
}
