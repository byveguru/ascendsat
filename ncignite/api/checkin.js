import { sql, throttle } from '../lib/db.js';
import { json, readJson, clientIp, str } from '../lib/http.js';
import { currentStudent } from '../lib/auth.js';
import { weeksFor, labelFor, isoDate, DEADLINE_SQL, DEADLINE_NOTE, ZONE } from '../lib/weeks.js';
import { orMissing } from '../lib/portal.js';

/* The weekly check-in, from the student's side.
 *
 * Writes are refused once a week's deadline has passed. That is the real
 * rule; the cron that stamps submitted_at afterwards is bookkeeping, so a
 * late cron can never hand a student extra time.
 */

const MAX_GOALS = 10;

/* Goals are written as ${JSON.stringify(goals)}::text::jsonb, never plain
 * ::jsonb. With a bare ::jsonb the driver learns the parameter is jsonb and
 * encodes the already-encoded string a second time, so the column holds a JSON
 * string instead of an array and the check-in page fails to read it back.
 * Casting through text keeps the parameter a plain string. */

/* The student's team, if an organiser has put them on one. Looked up apart
 * from the application so check-ins keep working on a database that has not
 * had migration 012 yet: no table or column simply means no team. */
async function teamFor(appId) {
  try {
    const rows = await sql`
      SELECT t.id, t.name FROM applications a
      JOIN teams t ON t.id = a.team_id WHERE a.id = ${appId}`;
    if (!rows[0]) return null;
    const members = await sql`
      SELECT student_name FROM applications WHERE team_id = ${rows[0].id} ORDER BY student_name`;
    return { id: rows[0].id, name: rows[0].name, members: members.map((m) => m.student_name) };
  } catch (err) {
    if (err && (err.code === '42P01' || err.code === '42703')) return null;
    throw err;
  }
}

/* Only an accepted student has a cohort to check in against. */
async function studentApplication(req) {
  const student = await currentStudent(req);
  if (!student) return null;
  const rows = await sql`
    SELECT id, cohort, status, student_name, checkin_invited_at
    FROM applications WHERE student_id = ${student.id}
    ORDER BY created_at DESC LIMIT 1`;
  return rows[0] || null;
}

const cleanGoals = (raw) => {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((g) => ({
      text: str(typeof g === 'string' ? g : g?.text, 300),
      done: Boolean(typeof g === 'object' && g ? g.done : false),
    }))
    .filter((g) => g.text)
    .slice(0, MAX_GOALS);
};

export default async function handler(req, res) {
  const app = await studentApplication(req);
  if (!app) {
    return json(res, 401, { error: 'Log in with the account you applied with.', signInRequired: true });
  }
  if (app.status !== 'accepted') {
    return json(res, 200, {
      notStarted: true,
      message: 'Check-ins open once you are accepted into a cohort.',
    });
  }
  /* Acceptance is not the invitation. An organiser opens check-ins per
   * student, so a student who has not been invited sees why, not an error. */
  if (!app.checkin_invited_at) {
    return json(res, 200, {
      notStarted: true,
      message: 'You are in. Your organiser will open your weekly check-in before the first session, and we will email you when they do.',
    });
  }

  const cohortWeeks = weeksFor(app.cohort);
  if (!cohortWeeks.length) {
    return json(res, 200, { notStarted: true, message: 'This cohort has no check-in weeks set up yet.' });
  }

  /* One query answers "which week is it" and "which are closed", with the
   * clock and the zone both Postgres's rather than this process's. */
  /* Starts and dues travel as two aligned arrays and are zipped by ordinality,
   * because the gap between them now varies per week. */
  const starts = cohortWeeks.map((w) => w.start);
  const dues = cohortWeeks.map((w) => w.due);

  const cte = sql`
    WITH w AS (
      SELECT s.week_start::date AS week_start, d.due_date::date AS due_date, s.i AS idx
      FROM unnest(${starts}::date[]) WITH ORDINALITY AS s(week_start, i)
      JOIN unnest(${dues}::date[]) WITH ORDINALITY AS d(due_date, j) ON s.i = d.j
    )`;
  const clock = sql`
    w.week_start, w.due_date, w.idx,
    ${sql.unsafe(DEADLINE_SQL('w.due_date'))} AS closes_at,
    ${sql.unsafe(DEADLINE_SQL('w.due_date'))} < now() AS closed,
    (w.week_start AT TIME ZONE ${ZONE}) <= now() AS started`;

  const weeks = await sql`
    ${cte}
    SELECT ${clock},
           c.id AS checkin_id, c.goals, c.goals_set_at, c.help_needed,
           c.first_saved_at, c.updated_at
    FROM w
    LEFT JOIN checkins c
      ON c.application_id = ${app.id} AND c.week_start = w.week_start
    ORDER BY w.week_start`;

  /* Normalised once, here, so every comparison below is string to string. */
  weeks.forEach((w) => { w.week_start = isoDate(w.week_start); w.due_date = isoDate(w.due_date); });

  const open = weeks.find((w) => w.started && !w.closed) || null;

  const team = await teamFor(app.id);
  let teamWeeks = null;
  if (team) {
    teamWeeks = await sql`
      ${cte}
      SELECT ${clock},
             c.id AS checkin_id, c.goals, c.goals_set_at, c.help_needed,
             c.first_saved_at, c.updated_at, c.version, u.student_name AS saved_by
      FROM w
      LEFT JOIN team_checkins c ON c.team_id = ${team.id} AND c.week_start = w.week_start
      LEFT JOIN applications u ON u.id = c.updated_by
      ORDER BY w.week_start`;
    teamWeeks.forEach((w) => { w.week_start = isoDate(w.week_start); w.due_date = isoDate(w.due_date); });
  }

  const shape = (list) => list.map((w) => ({
    weekStart: w.week_start,
    dueDate: w.due_date,
    ...labelFor({ start: w.week_start, due: w.due_date }, Number(w.idx) - 1, list.length),
    started: w.started,
    closed: w.closed,
    closesAt: w.closes_at,
    goals: w.goals || [],
    helpNeeded: w.help_needed || '',
    firstSavedAt: w.first_saved_at,
    late: Boolean(w.first_saved_at) && w.first_saved_at > w.closes_at,
    missing: w.closed && !w.first_saved_at,
    /* Only a team check-in has these: the version a save must start from, and
     * who saved last. */
    ...(w.version !== undefined ? {
      version: w.version || 0,
      savedBy: w.saved_by || null,
      updatedAt: w.updated_at || null,
    } : {}),
  }));

  if (req.method === 'GET') {
    /* An organiser's answer to what this student, or their team, asked for
     * help with. Migration 014; none before it. */
    const replies = await orMissing(() => sql`
      SELECT kind, week_start, reply, replied_at FROM help_replies
      WHERE (kind = 'student' AND subject_id = ${app.id})
         OR (kind = 'team' AND subject_id = ${team ? team.id : -1})`, []);
    const replyOf = new Map(replies.map((r) => [`${r.kind}:${isoDate(r.week_start)}`, { text: r.reply, at: r.replied_at }]));
    const withReplies = (list, kind) => list.map((w) => ({ ...w, reply: replyOf.get(`${kind}:${w.weekStart}`) || null }));

    /* Teammates' own goals, so a team can see each other's week. Goals and
     * ticks only: what someone asked for help with stays between them and
     * the organisers. */
    let teammates = [];
    if (team) {
      const rows = await sql`
        SELECT a.id, a.student_name, c.week_start, c.goals
        FROM applications a LEFT JOIN checkins c ON c.application_id = a.id
        WHERE a.team_id = ${team.id} AND a.id <> ${app.id}
        ORDER BY a.student_name`;
      const byId = new Map();
      for (const r of rows) {
        if (!byId.has(r.id)) byId.set(r.id, { name: r.student_name, weeks: {} });
        if (r.week_start) byId.get(r.id).weeks[isoDate(r.week_start)] = Array.isArray(r.goals) ? r.goals : [];
      }
      teammates = [...byId.values()];
    }

    return json(res, 200, {
      studentName: app.student_name,
      cohort: app.cohort,
      deadlineNote: DEADLINE_NOTE,
      openWeek: open ? open.week_start : null,
      weeks: withReplies(shape(weeks), 'student'),
      team: team ? {
        id: team.id, name: team.name, members: team.members,
        weeks: withReplies(shape(teamWeeks), 'team'), teammates,
      } : null,
    });
  }

  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

  const body = await readJson(req);
  const weekStart = str(body.week_start, 10);
  const week = weeks.find((w) => w.week_start === weekStart);

  if (!week) return json(res, 400, { error: 'That is not a week in your cohort.' });
  if (!week.started) return json(res, 400, { error: 'That week has not started yet.' });
  /* A closed week still accepts writes. Late is better than never, and the
   * admin side can tell the difference. */

  const forTeam = body.scope === 'team';
  if (forTeam && !team) return json(res, 400, { error: 'You are not on a team.' });

  const gate = await throttle(`checkin:${app.id}`, {
    limit: 120, windowMs: 60 * 60 * 1000, lockMs: 10 * 60 * 1000,
  });
  if (!gate.allowed) return json(res, 429, { error: 'That is a lot of saving. Wait ten minutes.' });

  const goals = cleanGoals(body.goals);
  const help = str(body.help_needed, 2000);

  const hasContent = goals.length > 0 || Boolean(help);

  if (forTeam) {
    /* Any member can save, and two can have the form open at once. A save
     * only lands if it starts from the version the member was looking at
     * (0 meaning "nothing saved yet"); otherwise it is refused and the member
     * gets the newer one, instead of erasing a teammate's work. */
    const baseVersion = Number.isInteger(Number(body.base_version)) ? Number(body.base_version) : 0;
    const saved = await sql`
      INSERT INTO team_checkins (team_id, week_start, goals, help_needed,
                                 first_saved_at, goals_set_at, updated_by)
      VALUES (${team.id}, ${weekStart}, ${JSON.stringify(goals)}::text::jsonb, ${help || null},
              ${hasContent ? sql`now()` : null}, ${goals.length ? sql`now()` : null}, ${app.id})
      ON CONFLICT (team_id, week_start) DO UPDATE SET
        goals = EXCLUDED.goals,
        help_needed = EXCLUDED.help_needed,
        first_saved_at = COALESCE(team_checkins.first_saved_at, EXCLUDED.first_saved_at),
        goals_set_at = COALESCE(team_checkins.goals_set_at, EXCLUDED.goals_set_at),
        updated_by = EXCLUDED.updated_by,
        updated_at = now(),
        version = team_checkins.version + 1
      WHERE team_checkins.version = ${baseVersion}
      RETURNING goals, help_needed, first_saved_at, updated_at, version`;

    if (!saved.length) {
      const latest = await sql`
        SELECT c.goals, c.help_needed, c.first_saved_at, c.updated_at, c.version, u.student_name AS saved_by
        FROM team_checkins c LEFT JOIN applications u ON u.id = c.updated_by
        WHERE c.team_id = ${team.id} AND c.week_start = ${weekStart}`;
      return json(res, 409, {
        error: 'A teammate saved a newer version first. It is loaded now; make your change again on top of it.',
        conflict: true,
        latest: latest[0] ? {
          goals: latest[0].goals || [], helpNeeded: latest[0].help_needed || '',
          version: latest[0].version, savedBy: latest[0].saved_by || null,
        } : null,
      });
    }
    return json(res, 200, {
      ok: true,
      saved: { ...saved[0], saved_by: app.student_name },
      late: week.closed,
      deadlineNote: DEADLINE_NOTE,
    });
  }

  const saved = await sql`
    INSERT INTO checkins (application_id, week_start, goals, help_needed,
                          first_saved_at, goals_set_at)
    VALUES (${app.id}, ${weekStart}, ${JSON.stringify(goals)}::text::jsonb, ${help || null},
            ${hasContent ? sql`now()` : null}, ${goals.length ? sql`now()` : null})
    ON CONFLICT (application_id, week_start) DO UPDATE SET
      goals = EXCLUDED.goals,
      help_needed = EXCLUDED.help_needed,
      /* Never overwritten. The first save is what decides on time or late,
       * so editing a week later must not quietly make it look punctual. */
      first_saved_at = COALESCE(checkins.first_saved_at, EXCLUDED.first_saved_at),
      goals_set_at = COALESCE(checkins.goals_set_at, EXCLUDED.goals_set_at),
      updated_at = now()
    RETURNING goals, help_needed, first_saved_at, updated_at`;

  return json(res, 200, {
    ok: true,
    saved: saved[0],
    late: week.closed,
    deadlineNote: DEADLINE_NOTE,
  });
}
