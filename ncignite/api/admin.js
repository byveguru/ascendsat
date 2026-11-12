import { sql, throttle } from '../lib/db.js';
import { json, readJson, clientIp, str, isEmail } from '../lib/http.js';
import {
  passwordMatches, emailMatches, currentAdmin,
  startAdminSession, endAdminSession, csvCell,
} from '../lib/admin.js';
import { generateCode, hashCode, codeHint, codeExpiry } from '../lib/codes.js';
import { sendEmail, renderRich, SITE_URL } from '../lib/email.js';
import {
  acceptEmail, declineEmail, parentCodeEmail, DECLINE_REASONS,
  DEFAULT_ACCEPT_NOTE, DEFAULT_DECLINE_NOTE, checkinInviteEmail,
  decisionNoticeEmail,
} from '../lib/templates.js';
import { TEST_MODE } from '../lib/mode.js';
import { DEADLINE_NOTE, isoDate, weeksFor, COHORT_SESSIONS } from '../lib/weeks.js';
import { draftNote, draftingAvailable, TONES, DEFAULT_TONE } from '../lib/draft.js';
import {
  APPLICANT_FIELDS, readApplicationFields, validateApplication, normaliseReferral,
  openApplicationFor, insertApplication, startParentConsent,
} from '../lib/application.js';
import { canApplyAgain } from '../lib/stages.js';
import { reviewState, cleanProfile } from '../lib/portal.js';
import { emailsDisabled } from '../lib/email.js';

const VENUE_LINE = process.env.VENUE_LINE
  || 'We meet in person in the Cary area. We will send the address by email and text before the first session.';
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

/* ---- check-in data, shared by the grid and the CSV export -----------------
 * Every started week for every accepted student, with everything they wrote,
 * whether or not they wrote anything: a week with no row is "missing" once it
 * has closed, and the grid has to be able to say so. Team (group) check-ins
 * come back the same way. Teams arrive with migration 012, so their queries
 * tolerate a database that does not have it yet. */
const tableMissing = (err) => err && (err.code === '42P01' || err.code === '42703');
/* The instant at which New York's wall clock reads this date and time. The
 * programme runs on America/New_York, so a deadline of "11:59 PM on the 11th"
 * has to follow daylight saving rather than assume a fixed offset: the same
 * wall time is 04:59 UTC in winter and 03:59 UTC in summer. Matches what the
 * student side computes in Postgres. */
const NY = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York', hourCycle: 'h23',
  year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',
});
function newYorkInstant(iso, h, m, sec) {
  const [Y, M, D] = iso.split('-').map(Number);
  const want = Date.UTC(Y, M - 1, D, h, m, sec);
  let guess = want;
  for (let i = 0; i < 3; i++) {
    const p = Object.fromEntries(NY.formatToParts(new Date(guess)).map((x) => [x.type, Number(x.value)]));
    const wall = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
    guess += want - wall;
  }
  return new Date(guess);
}
const startOf = (iso) => newYorkInstant(iso, 0, 0, 0);
const closeOf = (iso) => newYorkInstant(iso, 23, 59, 59);

function weekEntry(cohort, w, row, now, handled, reply) {
  const goals = row && Array.isArray(row.goals) ? row.goals : [];
  const help = (row && row.help_needed) || '';
  /* Handled only while the ask still says what it said when it was ticked,
   * so a rewritten ask comes back onto the list by itself. */
  const h = help && handled && handled.help_text === help ? handled : null;
  const closesAt = closeOf(w.due);
  const first = row ? row.first_saved_at : null;
  return {
    weekStart: w.start,
    due: w.due,
    closesAt: closesAt.toISOString(),
    weekClosed: now > closesAt.getTime(),
    goals,
    done: goals.filter((g) => g.done).length,
    total: goals.length,
    helpNeeded: help,
    helpHandledAt: h ? h.handled_at : null,
    helpHandledBy: h ? h.handled_by : null,
    reply: reply ? { text: reply.reply, by: reply.replied_by, at: reply.replied_at } : null,
    firstSavedAt: first || null,
    goalsSetAt: (row && row.goals_set_at) || null,
    updatedAt: (row && row.updated_at) || null,
    /* Decided by the FIRST save, so editing a week later cannot make a
     * late check-in look punctual. */
    late: Boolean(first) && new Date(first) > closesAt,
    savedBy: (row && row.saved_by) || null,
  };
}

async function loadCheckins() {
  const now = Date.now();
  const students = await sql`
    SELECT a.id, a.student_name, a.cohort, a.startup_name, a.checkin_invited_at
    FROM applications a WHERE a.status = 'accepted' ORDER BY a.student_name`;
  const rows = await sql`
    SELECT c.application_id, c.week_start, c.goals, c.help_needed,
           c.first_saved_at, c.goals_set_at, c.updated_at
    FROM checkins c JOIN applications a ON a.id = c.application_id
    WHERE a.status = 'accepted'`;
  const byApp = new Map();
  for (const r of rows) byApp.set(`${r.application_id}:${isoDate(r.week_start)}`, r);

  /* Asks an organiser has ticked off. Migration 013; without it nothing is. */
  const handled = new Map();
  try {
    const hh = await sql`SELECT kind, subject_id, week_start, help_text, handled_by, handled_at FROM help_handled`;
    for (const r of hh) handled.set(`${r.kind}:${r.subject_id}:${isoDate(r.week_start)}`, r);
  } catch (err) { if (!tableMissing(err)) throw err; }

  /* Organisers' replies. Migration 014; without it there are none. */
  const replies = new Map();
  try {
    const rr = await sql`SELECT kind, subject_id, week_start, reply, replied_by, replied_at FROM help_replies`;
    for (const r of rr) replies.set(`${r.kind}:${r.subject_id}:${isoDate(r.week_start)}`, r);
  } catch (err) { if (!tableMissing(err)) throw err; }

  let teamOf = new Map(), teams = [];
  try {
    const t = await sql`SELECT t.id, t.name, t.cohort FROM teams t ORDER BY t.cohort, lower(t.name)`;
    const m = await sql`SELECT id, student_name, team_id FROM applications WHERE team_id IS NOT NULL ORDER BY student_name`;
    const tc = await sql`
      SELECT c.team_id, c.week_start, c.goals, c.help_needed, c.first_saved_at,
             c.goals_set_at, c.updated_at, u.student_name AS saved_by
      FROM team_checkins c LEFT JOIN applications u ON u.id = c.updated_by`;
    const byTeam = new Map();
    for (const r of tc) byTeam.set(`${r.team_id}:${isoDate(r.week_start)}`, r);
    const names = new Map(t.map((x) => [x.id, x.name]));
    for (const x of m) teamOf.set(x.id, x.team_id);
    teams = t.map((x) => ({
      id: x.id, name: x.name, cohort: x.cohort,
      members: m.filter((y) => y.team_id === x.id).map((y) => y.student_name),
      weeks: weeksFor(x.cohort).filter((w) => startOf(w.start).getTime() <= now)
        .map((w) => weekEntry(x.cohort, w, byTeam.get(`${x.id}:${w.start}`), now, handled.get(`team:${x.id}:${w.start}`), replies.get(`team:${x.id}:${w.start}`))),
    }));
    students.forEach((st) => { st.team_name = names.get(teamOf.get(st.id)) || null; });
  } catch (err) { if (!tableMissing(err)) throw err; }

  const out = students.map((st) => ({
    id: st.id, name: st.student_name, cohort: st.cohort, startup: st.startup_name,
    invited: Boolean(st.checkin_invited_at),
    teamId: teamOf.get(st.id) || null, teamName: st.team_name || null,
    weeks: weeksFor(st.cohort).filter((w) => startOf(w.start).getTime() <= now)
      .map((w) => weekEntry(st.cohort, w, byApp.get(`${st.id}:${w.start}`), now, handled.get(`student:${st.id}:${w.start}`), replies.get(`student:${st.id}:${w.start}`))),
  }));
  const weekList = [...new Set([...out, ...teams].flatMap((x) => x.weeks.map((w) => w.weekStart)))].sort();
  return { students: out, teams, weeks: weekList };
}

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
   * Who set goals, who ticked them, what people said they need help with,
   * and everything else they wrote, one student at a time (and one team at a
   * time for the group check-ins). */
  if (req.method === 'GET' && action === 'checkins') {
    return json(res, 200, await loadCheckins());
  }

  /* ---- the portal: announcement and public startup profiles ------------- */
  if (req.method === 'GET' && action === 'portal') {
    try {
      const a = await sql`SELECT id, body, created_by, created_at FROM announcements
                          WHERE cleared_at IS NULL ORDER BY created_at DESC LIMIT 1`;
      const p = await sql`
        SELECT p.application_id, p.startup_name, p.one_liner, p.problem, p.logo, p.updated_at,
               p.submitted_at, p.published_at, p.published_by, p.edited_by,
               p.pub_name, p.pub_one_liner, p.pub_problem, p.pub_logo,
               a.student_name, a.cohort
        FROM startup_profiles p JOIN applications a ON a.id = p.application_id
        ORDER BY p.submitted_at DESC NULLS LAST, p.updated_at DESC`;
      return json(res, 200, {
        announcement: a[0] ? { id: Number(a[0].id), body: a[0].body, by: a[0].created_by, at: a[0].created_at } : null,
        /* Waiting for review first, so the queue is at the top. */
        profiles: p.map((r) => ({
          id: Number(r.application_id), student: r.student_name, cohort: r.cohort,
          state: reviewState(r),
          draft: { startupName: r.startup_name, oneLiner: r.one_liner, problem: r.problem || '', logo: r.logo || null },
          live: r.published_at ? { startupName: r.pub_name, oneLiner: r.pub_one_liner, problem: r.pub_problem || '', logo: r.pub_logo || null } : null,
          submittedAt: r.submitted_at, publishedAt: r.published_at, publishedBy: r.published_by, editedBy: r.edited_by,
        })).sort((x, y) => ['pending', 'live_pending', 'live', 'off'].indexOf(x.state) - ['pending', 'live_pending', 'live', 'off'].indexOf(y.state)),
      });
    } catch (err) {
      if (tableMissing(err)) return json(res, 409, { error: 'Announcements and startup profiles need migration 014 run in Supabase first.' });
      throw err;
    }
  }

  /* Everything, flat, for a spreadsheet: one row per student per week, and per
   * team per week, including weeks where nothing was written. */
  if (req.method === 'GET' && action === 'checkins_export') {
    const data = await loadCheckins();
    const state = (w) => (!w.firstSavedAt ? (w.weekClosed ? 'missing' : 'open, nothing yet') : (w.late ? 'late' : 'on time'));
    const goalsText = (w) => w.goals.map((g) => `${g.done ? '[x]' : '[ ]'} ${g.text}`).join('\n');
    const cols = ['type', 'name', 'team', 'members', 'cohort', 'week_start', 'due', 'state',
      'goals_done', 'goals_total', 'goals', 'help_needed', 'first_saved_at', 'goals_set_at',
      'last_saved_at', 'last_saved_by', 'help_handled_at', 'help_handled_by'];
    const lines = [];
    const add = (type, name, team, members, cohort, w) => lines.push([
      type, name, team, members, cohort, w.weekStart, w.due, state(w), w.done, w.total,
      goalsText(w), w.helpNeeded, w.firstSavedAt, w.goalsSetAt, w.updatedAt, w.savedBy || '',
      w.helpHandledAt || '', w.helpHandledBy || '',
    ].map(csvCell).join(','));
    for (const st of data.students) for (const w of st.weeks) add('student', st.name, st.teamName || '', '', st.cohort, w);
    for (const t of data.teams) for (const w of t.weeks) add('team', t.name, t.name, t.members.join('; '), t.cohort, w);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="ncignyte-checkins.csv"');
    res.setHeader('Cache-Control', 'no-store');
    return res.end([cols.join(','), ...lines].join('\n'));
  }

  /* ---- teams ------------------------------------------------------------ */
  if (req.method === 'GET' && action === 'teams') {
    try {
      const teams = await sql`
        SELECT t.id, t.name, t.cohort,
               (SELECT count(*)::int FROM team_checkins c WHERE c.team_id = t.id) AS checkin_count
        FROM teams t ORDER BY t.cohort, lower(t.name)`;
      const people = await sql`
        SELECT a.id, a.student_name, a.cohort, a.team_id
        FROM applications a WHERE a.status = 'accepted' OR a.team_id IS NOT NULL
        ORDER BY a.student_name`;
      return json(res, 200, {
        cohorts: Object.keys(COHORT_SESSIONS),
        teams: teams.map((t) => ({
          id: t.id, name: t.name, cohort: t.cohort, checkinCount: t.checkin_count,
          members: people.filter((p) => p.team_id === t.id).map((p) => ({ id: p.id, name: p.student_name })),
        })),
        people: people.map((p) => ({ id: p.id, name: p.student_name, cohort: p.cohort, teamId: p.team_id })),
      });
    } catch (err) {
      if (tableMissing(err)) return json(res, 409, { error: 'Teams need migration 012 run in Supabase first.' });
      throw err;
    }
  }

  /* ---- every email the platform has sent ---------------------------------
   * Newest first, searchable by address or subject, filterable by status and
   * kind, paged so a long history stays quick. The body is fetched one email
   * at a time (action=email) rather than shipped in the list. */
  /* The log columns arrive with migrations 010 and 011. If they have not been
   * run, say so plainly rather than showing an empty list. */
  const migrationHint = (err) => {
    if (err && err.code === '42703') {
      return json(res, 409, { error: 'The email log needs migrations 010 and 011 run in Supabase first.' });
    }
    throw err;
  };

  if (req.method === 'GET' && action === 'emails') {
    const q = str(req.query.q, 100).toLowerCase();
    const status = str(req.query.status, 10);
    const kind = str(req.query.kind, 40);
    const offset = Math.max(0, Number(req.query.offset) || 0);
    const LIMIT = 50;
    const like = `%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;

    try {
      const where = sql`
        WHERE (${status} = '' OR e.status = ${status})
          AND (${kind} = '' OR e.kind = ${kind})
          AND (${q} = '' OR e.subject ILIKE ${like}
               OR array_to_string(e.recipients, ',') ILIKE ${like}
               OR a.student_name ILIKE ${like})`;

      const rows = await sql`
        SELECT e.id, e.created_at, e.kind, e.status, e.attempts, e.error, e.subject,
               e.bcc, e.recipients, e.reconstructed, a.student_name,
               coalesce(array_length(e.recipients, 1), 0) AS recipient_count
        FROM email_log e LEFT JOIN applications a ON a.id = e.application_id
        ${where}
        ORDER BY e.created_at DESC, e.id DESC
        LIMIT ${LIMIT + 1} OFFSET ${offset}`;
      const kinds = await sql`SELECT DISTINCT kind FROM email_log ORDER BY kind`;

      return json(res, 200, {
        emails: rows.slice(0, LIMIT).map((r) => ({
          ...r,
          /* A list of 200 addresses is not a row; show a few and the count. */
          recipients: (r.recipients || []).slice(0, 3),
        })),
        hasMore: rows.length > LIMIT,
        nextOffset: offset + LIMIT,
        kinds: kinds.map((k) => k.kind),
      });
    } catch (err) { return migrationHint(err); }
  }

  if (req.method === 'GET' && action === 'email') {
    const id = Number(req.query.id);
    if (!id) return json(res, 400, { error: 'Missing id' });
    try {
      const rows = await sql`
        SELECT e.id, e.created_at, e.updated_at, e.kind, e.status, e.attempts, e.error,
               e.subject, e.body, e.bcc, e.recipients, e.reconstructed, a.student_name
        FROM email_log e LEFT JOIN applications a ON a.id = e.application_id
        WHERE e.id = ${id} LIMIT 1`;
      if (!rows.length) return json(res, 404, { error: 'Not found' });
      const em = rows[0];
      /* Custom emails were written with light markup; show them as sent. */
      if (em.body && (em.kind === 'custom' || em.kind === 'custom_bcc')) em.body_html = renderRich(em.body).html;
      return json(res, 200, { email: em });
    } catch (err) { return migrationHint(err); }
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

  /* ---- teams: create, rename, and set who is on one ---------------------- */
  if (action === 'team_save') {
    const id = Number(body.id) || null;
    const name = str(body.name, 60);
    const cohort = str(body.cohort, 80);
    const ids = [...new Set((Array.isArray(body.member_ids) ? body.member_ids : [])
      .map(Number).filter(Number.isInteger))];
    if (!name) return json(res, 400, { error: 'Give the team a name.' });
    if (!Object.keys(COHORT_SESSIONS).includes(cohort)) return json(res, 400, { error: 'Choose a cohort.' });

    try {
      let existing = null;
      if (id) {
        const t = await sql`SELECT id, cohort FROM teams WHERE id = ${id}`;
        if (!t.length) return json(res, 404, { error: 'That team no longer exists.' });
        existing = t[0];
        /* Weeks belong to a cohort, so a team that has one cannot move to
         * another. Make a new team instead. */
        if (existing.cohort !== cohort) return json(res, 400, { error: 'A team cannot change cohort. Make a new team instead.' });
      }
      const people = ids.length ? await sql`
        SELECT a.id, a.student_name, a.cohort, a.status, a.team_id, t.name AS team_name
        FROM applications a LEFT JOIN teams t ON t.id = a.team_id
        WHERE a.id = ANY(${ids})` : [];
      if (people.length !== ids.length) return json(res, 400, { error: 'One of those applicants no longer exists.' });
      for (const p of people) {
        if (p.status !== 'accepted') return json(res, 400, { error: `${p.student_name} has not been accepted.` });
        if (p.cohort !== cohort) return json(res, 400, { error: `${p.student_name} is in a different cohort.` });
        /* bigint columns come back as strings, so compare as numbers. */
        if (p.team_id && Number(p.team_id) !== id) {
          return json(res, 400, { error: `${p.student_name} is already on ${p.team_name}. Remove them from that team first.` });
        }
      }

      const teamId = await sql.begin(async (tx) => {
        let tid = id;
        if (id) {
          await tx`UPDATE teams SET name = ${name} WHERE id = ${id}`;
        } else {
          const r = await tx`INSERT INTO teams (name, cohort, created_by) VALUES (${name}, ${cohort}, ${admin.email}) RETURNING id`;
          tid = r[0].id;
        }
        await tx`UPDATE applications SET team_id = NULL WHERE team_id = ${tid} AND NOT (id = ANY(${ids}))`;
        if (ids.length) await tx`UPDATE applications SET team_id = ${tid} WHERE id = ANY(${ids})`;
        return tid;
      });
      return json(res, 200, { ok: true, id: teamId });
    } catch (err) {
      if (err && err.code === '23505') return json(res, 400, { error: 'A team with that name already exists in this cohort.' });
      if (tableMissing(err)) return json(res, 409, { error: 'Teams need migration 012 run in Supabase first.' });
      throw err;
    }
  }

  if (action === 'team_delete') {
    const id = Number(body.id);
    if (!id) return json(res, 400, { error: 'Missing id' });
    try {
      /* team_checkins has no cascade on purpose, so a group's writing is only
       * ever erased here, and only when the organiser was told how much and
       * agreed to it. A page that predates a team's first check-in sends no
       * agreement and gets told the real number instead. */
      const c = await sql`SELECT count(*)::int AS n FROM team_checkins WHERE team_id = ${id}`;
      const n = c[0].n;
      if (n && Number(body.erase_checkins) !== n) {
        return json(res, 409, { checkinCount: n, error: `This team now has ${n} group check-in${n === 1 ? '' : 's'} saved. Reload and try again to see what will be erased.` });
      }
      await sql.begin(async (tx) => {
        await tx`DELETE FROM team_checkins WHERE team_id = ${id}`;
        /* A savepoint, so a database without migration 013 does not abort
         * the whole delete. */
        await tx.savepoint((sp) => sp`DELETE FROM help_handled WHERE kind = 'team' AND subject_id = ${id}`)
          .catch((err) => { if (!tableMissing(err)) throw err; });
        /* Members drop back to no team via ON DELETE SET NULL. */
        await tx`DELETE FROM teams WHERE id = ${id}`;
      });
      return json(res, 200, { ok: true, erased: n });
    } catch (err) {
      if (tableMissing(err)) return json(res, 409, { error: 'Teams need migration 012 run in Supabase first.' });
      throw err;
    }
  }

  /* ---- answer something someone asked for help with ------------------------
   * The student (or the whole team) sees it in their portal. An empty reply
   * removes it. */
  if (action === 'help_reply') {
    const kind = body.kind === 'team' ? 'team' : body.kind === 'student' ? 'student' : null;
    const id = Number(body.id);
    const week = /^\d{4}-\d{2}-\d{2}$/.test(String(body.week_start || '')) ? body.week_start : null;
    const text = str(body.reply, 1000);
    if (!kind || !id || !week) return json(res, 400, { error: 'Missing ask.' });
    try {
      if (!text) {
        await sql`DELETE FROM help_replies WHERE kind = ${kind} AND subject_id = ${id} AND week_start = ${week}`;
        return json(res, 200, { ok: true, reply: null });
      }
      const out = await sql`
        INSERT INTO help_replies (kind, subject_id, week_start, reply, replied_by)
        VALUES (${kind}, ${id}, ${week}, ${text}, ${admin.email})
        ON CONFLICT (kind, subject_id, week_start) DO UPDATE
          SET reply = EXCLUDED.reply, replied_by = EXCLUDED.replied_by, replied_at = now()
        RETURNING reply, replied_by, replied_at`;
      return json(res, 200, { ok: true, reply: { text: out[0].reply, by: out[0].replied_by, at: out[0].replied_at } });
    } catch (err) {
      if (tableMissing(err)) return json(res, 409, { error: 'Replies need migration 014 run in Supabase first.' });
      throw err;
    }
  }

  /* ---- one announcement for every accepted student -------------------------
   * Posting replaces whatever was up; an empty body takes it down. */
  if (action === 'announce') {
    const text = str(body.body, 500);
    try {
      const out = await sql.begin(async (tx) => {
        await tx`UPDATE announcements SET cleared_at = now() WHERE cleared_at IS NULL`;
        if (!text) return null;
        const r = await tx`INSERT INTO announcements (body, created_by) VALUES (${text}, ${admin.email})
                           RETURNING id, body, created_by, created_at`;
        return r[0];
      });
      return json(res, 200, { ok: true, announcement: out ? { id: Number(out.id), body: out.body, by: out.created_by, at: out.created_at } : null });
    } catch (err) {
      if (tableMissing(err)) return json(res, 409, { error: 'Announcements need migration 014 run in Supabase first.' });
      throw err;
    }
  }

  /* ---- review a startup profile -------------------------------------------
   * save:      change the founder's draft (fix a typo, cut something personal)
   * approve:   save, then publish exactly that as the public copy
   * unpublish: take the public copy down; the draft stays for the founder
   * Nothing a founder writes is public until an approve. */
  if (action === 'profile_review') {
    const id = Number(body.id);
    const decision = ['save', 'approve', 'unpublish'].includes(body.decision) ? body.decision : null;
    if (!id || !decision) return json(res, 400, { error: 'Missing profile or decision.' });
    try {
      if (decision === 'unpublish') {
        const r = await sql`UPDATE startup_profiles SET pub_name = NULL, pub_one_liner = NULL, pub_problem = NULL,
                              pub_logo = NULL, published_at = NULL, published_by = NULL, submitted_at = NULL
                            WHERE application_id = ${id} RETURNING application_id`;
        if (!r.length) return json(res, 404, { error: 'That profile no longer exists.' });
        return json(res, 200, { ok: true });
      }
      /* The founder's own logo can be kept or removed here, not replaced. */
      const { profile: p, error } = cleanProfile({ ...body, logo: '' });
      if (error) return json(res, 400, { error });
      const r = await sql`
        UPDATE startup_profiles SET
          startup_name = ${p.startupName}, one_liner = ${p.oneLiner}, problem = ${p.problem || null},
          logo = ${body.remove_logo ? null : sql`logo`},
          edited_by = ${admin.email}, updated_at = now()
        WHERE application_id = ${id}
        RETURNING application_id`;
      if (!r.length) return json(res, 404, { error: 'That profile no longer exists.' });
      if (decision === 'approve') {
        await sql`UPDATE startup_profiles SET
                    pub_name = startup_name, pub_one_liner = one_liner, pub_problem = problem, pub_logo = logo,
                    published_at = now(), published_by = ${admin.email}
                  WHERE application_id = ${id}`;
      }
      return json(res, 200, { ok: true });
    } catch (err) {
      if (tableMissing(err)) return json(res, 409, { error: 'Profile review needs migration 015 run in Supabase first.' });
      throw err;
    }
  }

  /* ---- tick off, or untick, something someone asked for help with -------- */
  if (action === 'help_handled') {
    const kind = body.kind === 'team' ? 'team' : body.kind === 'student' ? 'student' : null;
    const id = Number(body.id);
    const week = /^\d{4}-\d{2}-\d{2}$/.test(String(body.week_start || '')) ? body.week_start : null;
    if (!kind || !id || !week) return json(res, 400, { error: 'Missing ask.' });
    try {
      if (!body.handled) {
        await sql`DELETE FROM help_handled WHERE kind = ${kind} AND subject_id = ${id} AND week_start = ${week}`;
        return json(res, 200, { ok: true, handled: false });
      }
      /* The text comes from the database, never the page, so what is marked
       * handled is exactly what the student has written right now. */
      const row = kind === 'team'
        ? await sql`SELECT help_needed FROM team_checkins WHERE team_id = ${id} AND week_start = ${week}`
        : await sql`SELECT help_needed FROM checkins WHERE application_id = ${id} AND week_start = ${week}`;
      const text = row.length ? row[0].help_needed : null;
      if (!text) return json(res, 404, { error: 'That ask is no longer there. Reload the page.' });
      const out = await sql`
        INSERT INTO help_handled (kind, subject_id, week_start, help_text, handled_by)
        VALUES (${kind}, ${id}, ${week}, ${text}, ${admin.email})
        ON CONFLICT (kind, subject_id, week_start) DO UPDATE
          SET help_text = EXCLUDED.help_text, handled_by = EXCLUDED.handled_by, handled_at = now()
        RETURNING handled_at, handled_by`;
      return json(res, 200, { ok: true, handled: true, handledAt: out[0].handled_at, handledBy: out[0].handled_by });
    } catch (err) {
      if (tableMissing(err)) return json(res, 409, { error: 'Ticking off asks needs migration 013 run in Supabase first.' });
      throw err;
    }
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
    const rich = renderRich(message);
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
          kind: 'custom_bcc', bcc: addresses.slice(i, i + BATCH), subject, text: message, html: rich.html, plain: rich.text,
          idempotencyKey: `custom:${sendId}:${i / BATCH}`,
        });
        if (r.status === 'failed') failed += Math.min(BATCH, addresses.length - i);
        else sent += Math.min(BATCH, addresses.length - i);
      }
    } else {
      for (const to of addresses) {
        const r = await sendEmail({
          kind: 'custom', to, subject, text: message, html: rich.html, plain: rich.text,
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
