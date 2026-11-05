import { sql, throttle } from '../lib/db.js';
import { json, readJson, clientIp, str, isEmail } from '../lib/http.js';
import {
  passwordMatches, emailMatches, currentAdmin,
  startAdminSession, endAdminSession, csvCell,
} from '../lib/admin.js';
import { generateCode, hashCode, codeHint, codeExpiry } from '../lib/codes.js';
import { sendEmail, SITE_URL } from '../lib/email.js';
import {
  acceptEmail, declineEmail, parentCodeEmail, DECLINE_REASONS,
  DEFAULT_ACCEPT_NOTE, DEFAULT_DECLINE_NOTE, checkinInviteEmail,
  decisionNoticeEmail,
} from '../lib/templates.js';
import { TEST_MODE } from '../lib/mode.js';
import { DEADLINE_NOTE, isoDate, weeksFor } from '../lib/weeks.js';
import { draftNote, draftingAvailable, TONES, DEFAULT_TONE } from '../lib/draft.js';
import {
  APPLICANT_FIELDS, readApplicationFields, validateApplication, normaliseReferral,
  openApplicationFor, insertApplication, startParentConsent,
} from '../lib/application.js';
import { canApplyAgain } from '../lib/stages.js';
import { emailsDisabled } from '../lib/email.js';

const VENUE_LINE = process.env.VENUE_LINE
  || 'We meet at Cary Founded in downtown Cary. We will send the address by email and text before November 6.';
const WHAT_TO_BRING = process.env.WHAT_TO_BRING || '';

/* One row per field actually changed. Nothing is written when nothing moved,
 * so the history reads as a list of real changes rather than a list of times
 * somebody opened the form. */
async function logEdits(applicationId, changes, who) {
  for (const [field, oldValue, newValue] of changes) {
    await sql`
      INSERT INTO application_edits (application_id, field, old_value, new_value, edited_by)
      VALUES (${applicationId}, ${field}, ${oldValue ?? null}, ${newValue ?? null}, ${who})`;
  }
}

/* Internal reasons are for the organisers only and are never emailed. */
const INTERNAL_REASONS = ['not_nc_student', 'duplicate_or_spam', 'parent_never_confirmed', 'conduct_concern', 'other'];

export default async function handler(req, res) {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  const action = String(req.query?.action || '');

  /* ---- login ----------------------------------------------------------- */
  if (req.method === 'POST' && action === 'login') {
    const body = await readJson(req);
    const gate = await throttle(`admin_login:${clientIp(req)}`, {
      limit: 5, windowMs: 15 * 60 * 1000, lockMs: 15 * 60 * 1000,
    });
    if (!gate.allowed) {
      return json(res, 429, { error: 'Too many attempts. Please wait 15 minutes.' });
    }
    const okEmail = emailMatches(body.email);
    const okPassword = passwordMatches(body.password);
    // Always evaluate both, and give one message, so neither can be probed.
    if (!okEmail || !okPassword) {
      return json(res, 401, { error: 'That email and password do not match.' });
    }
    await startAdminSession(res, String(body.email).trim().toLowerCase());
    return json(res, 200, { ok: true });
  }

  if (req.method === 'POST' && action === 'logout') {
    await endAdminSession(req, res);
    return json(res, 200, { ok: true });
  }

  /* Everything past here needs a session. */
  const admin = await currentAdmin(req);
  if (!admin) return json(res, 401, { error: 'Not signed in.', signInRequired: true });

  /* ---- list ------------------------------------------------------------ */
  if (req.method === 'GET' && action === 'list') {
    const rows = await sql`
      SELECT a.id, a.created_at, a.cohort, a.student_name, a.school_grade, a.startup_name,
             a.parent_email, a.student_email, a.status, a.consent_photo, a.decided_at,
             (SELECT status FROM email_log e WHERE e.application_id = a.id
               ORDER BY e.created_at DESC LIMIT 1) AS last_email,
             (SELECT CASE
                 WHEN pc.used_at IS NOT NULL THEN 'used'
                 WHEN pc.expires_at < now() THEN 'expired'
                 ELSE 'sent' END
               FROM parent_codes pc WHERE pc.application_id = a.id
               ORDER BY pc.created_at DESC LIMIT 1) AS code_status
      FROM applications a ORDER BY a.created_at DESC`;

    const counts = {
      applied: 0, parent_confirmed: 0, accepted: 0, declined: 0, withdrawn: 0,
    };
    for (const r of rows) if (counts[r.status] !== undefined) counts[r.status]++;

    const failed = await sql`SELECT count(*)::int AS n FROM email_log WHERE status = 'failed'`;
    const today = await sql`
      SELECT count(*)::int AS n FROM email_log
      WHERE status = 'sent' AND created_at > now() - interval '24 hours'`;

    /* Two shapes of duplicate worth a human look. */
    const flags = {};
    const seenParent = new Map();
    for (const r of rows) {
      if (r.parent_email && r.student_email &&
          r.parent_email.toLowerCase() === r.student_email.toLowerCase()) {
        flags[r.id] = 'Parent email is the same as the student email';
      }
      const key = (r.parent_email || '').toLowerCase();
      if (key) {
        if (seenParent.has(key) && seenParent.get(key) !== r.student_name) {
          flags[r.id] = 'Same parent email as another student';
        }
        seenParent.set(key, r.student_name);
      }
    }

    return json(res, 200, {
      rows, counts, flags,
      failedEmails: failed[0].n,
      sentLast24h: today[0].n,
      testMode: TEST_MODE,
    });
  }

  /* ---- one application ------------------------------------------------- */
  if (req.method === 'GET' && action === 'defaults') {
    return json(res, 200, {
      accept: DEFAULT_ACCEPT_NOTE,
      decline: DEFAULT_DECLINE_NOTE,
      drafting: draftingAvailable(),
      tones: Object.entries(TONES).map(([id, t]) => ({ id, label: t.label, hint: t.hint })),
      defaultTone: DEFAULT_TONE,
    });
  }

  /* ---- who is in --------------------------------------------------------
   * The list an organiser wants the moment they finish deciding: everyone
   * accepted, whether the parent confirmed, and whether check-ins are open
   * for them yet. */
  if (req.method === 'GET' && action === 'accepted') {
    const rows = await sql`
      SELECT a.id, a.student_name, a.student_email, a.cohort, a.startup_name,
             a.school_grade, a.decided_at, a.parent_confirmed_at,
             a.checkin_invited_at, a.checkin_invited_by,
             (SELECT count(*)::int FROM checkins c WHERE c.application_id = a.id) AS weeks_written
      FROM applications a
      WHERE a.status = 'accepted'
      ORDER BY a.cohort, a.student_name`;
    return json(res, 200, { students: rows });
  }

  /* ---- every check-in, in one grid --------------------------------------
   * The point of the feature: who set goals, who ticked them, and what
   * people said they need help with. Sorted so the students with the most
   * unticked goals and the longest silence come first, because that is who
   * an organiser should look at on a Monday morning. */
  if (req.method === 'GET' && action === 'checkins') {
    const rows = await sql`
      SELECT a.id AS application_id, a.student_name, a.cohort, a.startup_name,
             c.week_start, c.goals, c.help_needed,
             c.first_saved_at, c.updated_at
      FROM applications a
      LEFT JOIN checkins c ON c.application_id = a.id
      WHERE a.status = 'accepted'
      ORDER BY a.student_name, c.week_start`;

    /* The deadline belongs to the week, and the gap from its start now
     * varies, so it is looked up from the cohort rather than computed. */
    const now = Date.now();
    const dueFor = (cohort, weekStart) => {
      const w = weeksFor(cohort).find((x) => x.start === weekStart);
      if (!w) return null;
      /* 11:59:59 PM Eastern. November is EST, so -05:00 throughout both
       * cohorts' run; spelled out rather than left to the server's zone. */
      return new Date(`${w.due}T23:59:59-05:00`);
    };

    /* Grouped per student so the page does not have to re-derive it. */
    const byStudent = new Map();
    for (const r of rows) {
      if (!byStudent.has(r.application_id)) {
        byStudent.set(r.application_id, {
          id: r.application_id, name: r.student_name,
          cohort: r.cohort, startup: r.startup_name, weeks: [],
        });
      }
      if (!r.week_start) continue;
      const goals = Array.isArray(r.goals) ? r.goals : [];
      const weekStart = isoDate(r.week_start);
      const closesAt = dueFor(r.cohort, weekStart);
      byStudent.get(r.application_id).weeks.push({
        weekStart,
        goals,
        done: goals.filter((g) => g.done).length,
        total: goals.length,
        helpNeeded: r.help_needed || '',
        firstSavedAt: r.first_saved_at,
        /* Decided by the FIRST save, so editing a week later cannot make a
         * late check-in look punctual. */
        late: Boolean(r.first_saved_at) && closesAt && r.first_saved_at > closesAt,
        weekClosed: Boolean(closesAt) && now > closesAt.getTime(),
      });
    }

    const students = [...byStudent.values()];
    const weekList = [...new Set(rows.filter((r) => r.week_start)
      .map((r) => isoDate(r.week_start)))].sort();

    return json(res, 200, { students, weeks: weekList });
  }

  if (req.method === 'GET' && action === 'detail') {
    const id = Number(req.query.id);
    if (!id) return json(res, 400, { error: 'Missing id' });
    const rows = await sql`SELECT * FROM applications WHERE id = ${id} LIMIT 1`;
    if (!rows.length) return json(res, 404, { error: 'Not found' });
    const log = await sql`
      SELECT decision, reason_code, decided_by, created_at
      FROM decision_log WHERE application_id = ${id} ORDER BY created_at DESC`;
    const emails = await sql`
      SELECT kind, status, attempts, error, created_at
      FROM email_log WHERE application_id = ${id} ORDER BY created_at DESC`;
    const edits = await sql`
      SELECT field, old_value, new_value, edited_by, created_at
      FROM application_edits WHERE application_id = ${id} ORDER BY created_at DESC`;
    return json(res, 200, { application: rows[0], decisions: log, emails, edits });
  }

  if (req.method === 'GET' && action === 'export') {
    const rows = await sql`SELECT * FROM applications ORDER BY created_at`;
    const cols = rows.length ? Object.keys(rows[0]) : [];
    const csv = [cols.join(','),
      ...rows.map((r) => cols.map((c) => csvCell(r[c])).join(','))].join('\n');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="ncignyte-applications.csv"');
    res.setHeader('Cache-Control', 'no-store');
    return res.end(csv);
  }

  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
  const body = await readJson(req);

  /* ---- preview a decision before anything is sent ---------------------- */
  if (action === 'preview') {
    const id = Number(body.id);
    const rows = await sql`SELECT * FROM applications WHERE id = ${id} LIMIT 1`;
    if (!rows.length) return json(res, 404, { error: 'That application no longer exists.', notFound: true });
    const a = rows[0];
    const note = str(body.personal_note, 2000);

    const mail = body.decision === 'accepted'
      ? acceptEmail({
          studentName: a.student_name, startupName: a.startup_name, building: a.building,
          goals: a.goals, whyJoin: a.why_join,
          personalNote: note, venueLine: VENUE_LINE, whatToBring: WHAT_TO_BRING,
          parentConfirmed: Boolean(a.parent_confirmed_at),
        })
      : declineEmail({
          studentName: a.student_name, startupName: a.startup_name,
          building: a.building, goals: a.goals, personalNote: note,
          reasonSentence: DECLINE_REASONS[body.reason_code] || DECLINE_REASONS.cohort_needs,
        });

    return json(res, 200, {
      subject: mail.subject, text: mail.text,
      to: [a.student_email, a.parent_email],
    });
  }

  /* ---- draft the personal paragraph -------------------------------------
   * Only the idea fields leave the server, and only as a draft an organiser
   * then edits. See lib/draft.js for exactly what is sent. */
  if (action === 'draft') {
    const id = Number(body.id);
    const rows = await sql`SELECT * FROM applications WHERE id = ${id} LIMIT 1`;
    if (!rows.length) return json(res, 404, { error: 'That application no longer exists.', notFound: true });

    /* A paid API behind a button people will click repeatedly. */
    const gate = await throttle(`draft:${admin.email}`, {
      limit: 60, windowMs: 60 * 60 * 1000, lockMs: 10 * 60 * 1000,
    });
    if (!gate.allowed) {
      return json(res, 429, { error: 'That is a lot of drafts in one hour. Wait ten minutes.' });
    }

    const out = await draftNote({
      application: rows[0],
      decision: body.decision === 'declined' ? 'declined' : 'accepted',
      reasonCode: str(body.reason_code, 60),
      /* Looked up by key in lib/draft.js, so an unknown value is the default
       * rather than text of someone's choosing reaching the prompt. */
      tone: str(body.tone, 40),
    });
    return out.ok
      ? json(res, 200, { note: out.note, provider: out.provider, fellBack: out.fellBack, tone: out.tone })
      : json(res, 502, { error: out.error });
  }

  /* ---- send a decision -------------------------------------------------- */
  if (action === 'decide') {
    const ids = Array.isArray(body.ids) ? body.ids.map(Number).filter(Boolean) : [Number(body.id)].filter(Boolean);
    const decision = body.decision === 'declined' ? 'declined' : 'accepted';
    const note = str(body.personal_note, 2000);

    /* A decline without a written note is not allowed to leave the building. */
    if (decision === 'declined') {
      if (!/[.!?]/.test(note) || note.length < 15) {
        return json(res, 400, { error: 'Write at least one full sentence in the personal note before declining.' });
      }
      if (!INTERNAL_REASONS.includes(String(body.internal_reason))) {
        return json(res, 400, { error: 'Choose an internal reason.' });
      }
    }
    if (!ids.length) return json(res, 400, { error: 'No applications selected.' });

    const results = [];
    for (const id of ids) {
      const rows = await sql`SELECT * FROM applications WHERE id = ${id} LIMIT 1`;
      if (!rows.length) { results.push({ id, ok: false, error: 'not found' }); continue; }
      const a = rows[0];

      /* Each email merges that student's own fields, even in a bulk send. */
      const mail = decision === 'accepted'
        ? acceptEmail({
            studentName: a.student_name, startupName: a.startup_name, building: a.building,
            goals: a.goals, whyJoin: a.why_join,
            personalNote: note, venueLine: VENUE_LINE, whatToBring: WHAT_TO_BRING,
            parentConfirmed: Boolean(a.parent_confirmed_at),
          })
        : declineEmail({
            studentName: a.student_name, startupName: a.startup_name,
            building: a.building, goals: a.goals, personalNote: note,
            reasonSentence: DECLINE_REASONS[body.reason_code] || DECLINE_REASONS.cohort_needs,
          });

      /* The letter is kept word for word. /status shows this, not a
       * paraphrase, so the student reads the same thing twice rather than
       * two versions that drift apart. */
      await sql`
        UPDATE applications SET status = ${decision}, decided_at = now(),
          decided_by = ${admin.email}, decline_reason = ${decision === 'declined' ? str(body.internal_reason, 60) : null},
          admin_note = ${str(body.admin_note, 2000)},
          decision_subject = ${mail.subject}, decision_letter = ${mail.text}
        WHERE id = ${id}`;
      /* The log appends, so editing and resending never erases what the
       * student read the first time. */
      await sql`
        INSERT INTO decision_log (application_id, decision, reason_code, personal_note, letter, decided_by)
        VALUES (${id}, ${decision}, ${str(body.reason_code, 60)}, ${note}, ${mail.text}, ${admin.email})`;

      /* One message carrying both addresses, so the family sees one email.
       * It carries a notice, not the letter: the letter is read at /status,
       * where there is exactly one copy of it and the outcome is not sitting
       * in a notification preview. The stored letter above is unchanged. */
      const notice = decisionNoticeEmail({ studentName: a.student_name });
      const out = await sendEmail({
        applicationId: id, kind: `decision_${decision}`,
        to: [a.student_email, a.parent_email],
        subject: notice.subject, text: notice.text,
        idempotencyKey: `decision:${id}:${decision}:${Date.now()}`,
      });
      results.push({ id, ok: true, email: out.status });
    }
    return json(res, 200, { results });
  }

  /* ---- open check-ins for one student, or several ------------------------ */
  if (action === 'invite_checkin') {
    const ids = Array.isArray(body.ids)
      ? body.ids.map(Number).filter(Number.isInteger)
      : [Number(body.id)].filter(Number.isInteger);
    if (!ids.length) return json(res, 400, { error: 'No students selected.' });

    /* Only an accepted student can be invited, and only once: re-inviting
     * would reset the date and re-send an email they already have. */
    const rows = await sql`
      UPDATE applications
      SET checkin_invited_at = now(), checkin_invited_by = ${admin.email}
      WHERE id = ANY(${ids}) AND status = 'accepted' AND checkin_invited_at IS NULL
      RETURNING id, student_name, student_email`;

    for (const r of rows) {
      const mail = checkinInviteEmail({
        studentName: r.student_name, siteUrl: SITE_URL, deadlineNote: DEADLINE_NOTE,
      });
      await sendEmail({
        applicationId: r.id, kind: 'checkin_invite', to: r.student_email,
        subject: mail.subject, text: mail.text,
        idempotencyKey: `checkin_invite:${r.id}`,
      });
    }

    return json(res, 200, {
      ok: true,
      invited: rows.length,
      skipped: ids.length - rows.length,
    });
  }

  /* ---- custom email to chosen applicants, or to everyone ----------------
   * "ids" sends one separate email per address, each in To, so a handful of
   * chosen families can be written to individually. "all" puts every address
   * in BCC, in batches, so no family sees anyone else's. dryRun reports the
   * address count without sending, which is what the confirm step shows. */
  if (action === 'send_custom') {
    const mode = body.audience === 'all' ? 'all' : 'ids';
    const who = ['both', 'student', 'parent'].includes(body.recipients) ? body.recipients : 'both';
    const subject = str(body.subject, 200).replace(/[\r\n]+/g, ' ');
    const message = str(body.message, 10000);
    const status = str(body.status, 20);
    const sendId = str(body.send_id, 64).replace(/[^a-zA-Z0-9-]/g, '');

    let rows;
    if (mode === 'ids') {
      const ids = (Array.isArray(body.ids) ? body.ids : []).map(Number).filter(Number.isInteger);
      if (!ids.length) return json(res, 400, { error: 'Select at least one applicant first.' });
      rows = await sql`SELECT id, student_email, parent_email FROM applications WHERE id = ANY(${ids})`;
    } else if (status) {
      rows = await sql`SELECT id, student_email, parent_email FROM applications WHERE status = ${status}`;
    } else {
      rows = await sql`SELECT id, student_email, parent_email FROM applications`;
    }

    /* One address once, however many applications share it (siblings often
     * share a parent). Lowercased so Case@x.com and case@x.com are one. */
    const seen = new Set();
    const addresses = [];
    for (const r of rows) {
      for (const [kind, email] of [['student', r.student_email], ['parent', r.parent_email]]) {
        if (who !== 'both' && who !== kind) continue;
        const e = String(email || '').trim().toLowerCase();
        if (!isEmail(e) || seen.has(e)) continue;
        seen.add(e);
        addresses.push(e);
      }
    }
    if (!addresses.length) return json(res, 400, { error: 'None of those applicants have an email address to send to.' });

    if (body.dryRun) {
      return json(res, 200, { ok: true, count: addresses.length, applicants: rows.length, bcc: mode === 'all' });
    }

    if (!subject) return json(res, 400, { error: 'Write a subject.' });
    if (!message) return json(res, 400, { error: 'Write a message.' });
    if (!sendId) return json(res, 400, { error: 'Missing send id. Reload and try again.' });

    const gate = await throttle(`custom_email:${admin.email}`, {
      limit: 20, windowMs: 60 * 60 * 1000, lockMs: 30 * 60 * 1000,
    });
    if (!gate.allowed) return json(res, 429, { error: 'That is a lot of bulk email. Wait half an hour.' });

    let sent = 0, failed = 0;
    if (mode === 'all') {
      const BATCH = 50;
      for (let i = 0; i < addresses.length; i += BATCH) {
        const r = await sendEmail({
          kind: 'custom_bcc', bcc: addresses.slice(i, i + BATCH), subject, text: message,
          idempotencyKey: `custom:${sendId}:${i / BATCH}`,
        });
        if (r.status === 'failed') failed += Math.min(BATCH, addresses.length - i);
        else sent += Math.min(BATCH, addresses.length - i);
      }
    } else {
      for (const to of addresses) {
        const r = await sendEmail({
          kind: 'custom', to, subject, text: message,
          idempotencyKey: `custom:${sendId}:${to}`,
        });
        if (r.status === 'failed') failed++; else sent++;
      }
    }
    return json(res, 200, { ok: true, sent, failed, bcc: mode === 'all', testMode: TEST_MODE });
  }

  /* ---- row actions ------------------------------------------------------ */
  if (action === 'resend_code') {
    const id = Number(body.id);
    const rows = await sql`SELECT id, student_name, parent_email FROM applications WHERE id = ${id}`;
    if (!rows.length) return json(res, 404, { error: 'Not found' });
    await sql`UPDATE parent_codes SET used_at = now() WHERE application_id = ${id} AND used_at IS NULL`;
    const code = generateCode();
    await sql`INSERT INTO parent_codes (application_id, code_hash, code_hint, expires_at)
              VALUES (${id}, ${hashCode(code)}, ${codeHint(code)}, ${codeExpiry().toISOString()})`;
    const mail = parentCodeEmail({ studentName: rows[0].student_name, code });
    const out = await sendEmail({
      applicationId: id, kind: 'parent_code_admin', to: rows[0].parent_email,
      subject: mail.subject, text: mail.text,
      idempotencyKey: `parent_code_admin:${id}:${Date.now()}`,
    });
    return json(res, 200, { ok: true, email: out.status });
  }

  /* ---- correct what a student wrote -------------------------------------
   * Only the fields an applicant owns. The guardian's consent record is not
   * in APPLICANT_FIELDS and cannot be reached from here: it is evidence of
   * what a parent agreed to, not a form an organiser may rewrite. Status,
   * decisions and the letter already sent are equally out of reach. */
  if (action === 'edit') {
    const id = Number(body.id);
    if (!Number.isInteger(id) || id <= 0) return json(res, 400, { error: 'That is not a valid application id.' });

    const rows = await sql`SELECT * FROM applications WHERE id = ${id} LIMIT 1`;
    if (!rows.length) return json(res, 404, { error: 'That application no longer exists.', notFound: true });
    const before = rows[0];

    /* Only the fields actually submitted are touched or judged, so a row
     * saved before the option sets were enforced can still have its other
     * answers corrected. */
    const keys = APPLICANT_FIELDS.filter((k) => Object.prototype.hasOwnProperty.call(body.fields || {}, k));
    if (!keys.length) return json(res, 400, { error: 'Nothing to change.' });

    const f = normaliseReferral(readApplicationFields(body.fields || {}, keys));
    const errors = validateApplication(f, { only: keys });
    if (Object.keys(errors).length) return json(res, 400, { errors });

    const changes = keys
      .map((k) => [k, before[k] == null ? '' : String(before[k]), f[k]])
      .filter(([, oldValue, newValue]) => oldValue !== newValue);

    if (!changes.length) return json(res, 200, { ok: true, changed: 0 });

    for (const [field, , newValue] of changes) {
      /* The column name is one of APPLICANT_FIELDS, never anything the
       * request chose, so it is safe to place directly. */
      await sql`UPDATE applications SET ${sql(field)} = ${newValue} WHERE id = ${id}`;
    }
    await logEdits(id, changes, admin.email);

    const after = await sql`SELECT * FROM applications WHERE id = ${id} LIMIT 1`;
    return json(res, 200, { ok: true, changed: changes.length, application: after[0] });
  }

  /* ---- enter an application that arrived some other way -------------------
   * A student texts their answers instead of using the form. This writes the
   * same row and starts the same parent consent, by running the same code the
   * public form runs, so the family's experience from here on is identical. */
  if (action === 'create') {
    const studentEmail = str(body.student_email, 254).toLowerCase();
    const f = normaliseReferral(readApplicationFields(body));
    const errors = validateApplication(f, { creating: true, agreed: body.student_agreed });
    if (!isEmail(studentEmail)) errors.student_email = 'Enter a valid email address for the student.';
    if (Object.keys(errors).length) return json(res, 400, { errors });

    /* Find or create the student's account, exactly as signing in does. No
     * password is set: the schema allows that, and it means the student can
     * sign in later with an emailed code and follow their own application
     * instead of it being invisible to them. */
    const accounts = await sql`
      INSERT INTO students (email) VALUES (${studentEmail})
      ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
      RETURNING id`;
    const studentId = accounts[0].id;

    const already = await openApplicationFor(studentId);
    if (already && !canApplyAgain(already.status)) {
      return json(res, 409, {
        error: `That student already has an application (#${already.id}, ${already.status}). Edit that one instead.`,
        duplicate: true, id: already.id,
      });
    }

    let application;
    try {
      application = await insertApplication({
        studentId, studentEmail, fields: f, createdBy: admin.email,
      });
    } catch (err) {
      console.error('[admin create] insert failed:', err?.code || 'unknown');
      return json(res, 500, { error: 'We could not save that application. Please try again.' });
    }

    const { code, sent } = await startParentConsent(application, studentEmail);

    return json(res, 200, {
      ok: true, id: application.id, emailSent: sent,
      ...(emailsDisabled() ? { emailDisabled: true, parentCode: code } : {}),
    });
  }

  if (action === 'change_parent_email') {
    const id = Number(body.id);
    const email = str(body.parent_email, 254).toLowerCase();
    if (!isEmail(email)) return json(res, 400, { error: 'Enter a valid email address.' });
    const before = await sql`SELECT parent_email FROM applications WHERE id = ${id} LIMIT 1`;
    if (!before.length) return json(res, 404, { error: 'That application no longer exists.', notFound: true });
    await sql`UPDATE applications SET parent_email = ${email} WHERE id = ${id}`;
    /* Changing where a family's mail goes is an edit like any other, and is
     * recorded like any other. */
    await logEdits(id, [['parent_email', before[0].parent_email, email]], admin.email);
    return json(res, 200, { ok: true });
  }

  if (action === 'withdraw') {
    const id = Number(body.id);
    await sql`UPDATE applications SET status = 'withdrawn' WHERE id = ${id}`;
    await sql`INSERT INTO decision_log (application_id, decision, decided_by)
              VALUES (${id}, 'withdrawn', ${admin.email})`;
    return json(res, 200, { ok: true });
  }

  /* A real delete, not a hidden flag. Retention is indefinite by policy, so
   * this is the only way a family's data actually leaves the system. */
  if (action === 'delete') {
    const id = Number(body.id);
    if (str(body.confirm) !== 'DELETE') {
      return json(res, 400, { error: 'Type DELETE to confirm.' });
    }
    /* A bad id must fail loudly rather than run a DELETE whose WHERE clause
     * nobody can reason about. */
    if (!Number.isInteger(id) || id <= 0) {
      return json(res, 400, { error: 'That is not a valid application id.' });
    }
    const gone = await sql`DELETE FROM applications WHERE id = ${id} RETURNING id`;
    if (!gone.length) {
      return json(res, 404, { error: 'That application was already gone.', notFound: true });
    }
    /* Returned so the page can say how many are left. A table that shrinks
     * by more than one row after a single delete means something changed
     * elsewhere, and the organiser should be told that rather than left to
     * assume the delete did it. */
    const left = await sql`SELECT count(*)::int AS n FROM applications`;
    return json(res, 200, { ok: true, deleted: id, remaining: left[0].n });
  }

  return json(res, 400, { error: 'Unknown action' });
}
