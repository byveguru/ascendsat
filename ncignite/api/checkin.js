import { sql, throttle } from '../lib/db.js';
import { json, readJson, clientIp, str } from '../lib/http.js';
import { currentStudent } from '../lib/auth.js';
import { weeksFor, labelFor, isoDate, DEADLINE_SQL, DEADLINE_NOTE, ZONE } from '../lib/weeks.js';

/* The weekly check-in, from the student's side.
 *
 * Writes are refused once a week's deadline has passed. That is the real
 * rule; the cron that stamps submitted_at afterwards is bookkeeping, so a
 * late cron can never hand a student extra time.
 */

const MAX_GOALS = 10;

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

  const weeks = await sql`
    WITH w AS (
      SELECT s.week_start::date AS week_start, d.due_date::date AS due_date, s.i AS idx
      FROM unnest(${starts}::date[]) WITH ORDINALITY AS s(week_start, i)
      JOIN unnest(${dues}::date[]) WITH ORDINALITY AS d(due_date, j) ON s.i = d.j
    )
    SELECT w.week_start, w.due_date, w.idx,
           ${sql.unsafe(DEADLINE_SQL('w.due_date'))} AS closes_at,
           ${sql.unsafe(DEADLINE_SQL('w.due_date'))} < now() AS closed,
           (w.week_start AT TIME ZONE ${ZONE}) <= now() AS started,
           c.id AS checkin_id, c.goals, c.goals_set_at, c.help_needed,
           c.first_saved_at, c.updated_at
    FROM w
    LEFT JOIN checkins c
      ON c.application_id = ${app.id} AND c.week_start = w.week_start
    ORDER BY w.week_start`;

  /* Normalised once, here, so every comparison below is string to string. */
  weeks.forEach((w) => { w.week_start = isoDate(w.week_start); w.due_date = isoDate(w.due_date); });

  const open = weeks.find((w) => w.started && !w.closed) || null;

  if (req.method === 'GET') {
    return json(res, 200, {
      studentName: app.student_name,
      cohort: app.cohort,
      deadlineNote: DEADLINE_NOTE,
      openWeek: open ? open.week_start : null,
      weeks: weeks.map((w) => ({
        weekStart: w.week_start,
        dueDate: w.due_date,
        ...labelFor({ start: w.week_start, due: w.due_date }, Number(w.idx) - 1, weeks.length),
        started: w.started,
        closed: w.closed,
        closesAt: w.closes_at,
        goals: w.goals || [],
        helpNeeded: w.help_needed || '',
        firstSavedAt: w.first_saved_at,
        late: Boolean(w.first_saved_at) && w.first_saved_at > w.closes_at,
        missing: w.closed && !w.first_saved_at,
      })),
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

  const gate = await throttle(`checkin:${app.id}`, {
    limit: 120, windowMs: 60 * 60 * 1000, lockMs: 10 * 60 * 1000,
  });
  if (!gate.allowed) return json(res, 429, { error: 'That is a lot of saving. Wait ten minutes.' });

  const goals = cleanGoals(body.goals);
  const help = str(body.help_needed, 2000);

  const hasContent = goals.length > 0 || Boolean(help);

  const saved = await sql`
    INSERT INTO checkins (application_id, week_start, goals, help_needed,
                          first_saved_at, goals_set_at)
    VALUES (${app.id}, ${weekStart}, ${JSON.stringify(goals)}::jsonb, ${help || null},
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
