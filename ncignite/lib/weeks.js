/* The weekly check-in calendar.
 *
 * A check-in opens on the session and is due the night before the next one.
 * It is derived from the session dates rather than from a fixed seven day
 * window, because the sessions are not evenly spaced: the venue is closed
 * on Friday 27 November, so Cohort 1's fourth session moves to Monday 23
 * November. That leaves a three day check-in and an eleven day one, and any
 * arithmetic based on "start plus six" would quietly put both deadlines in
 * the wrong place.
 *
 * The final session has no check-in after it. Demo day ends the cohort.
 *
 * Every deadline is America/New_York. "11:59 PM" means 11:59 PM to a student
 * in North Carolina, never to a server in Virginia, so the hour is resolved
 * by Postgres with the zone named explicitly rather than by adding a fixed
 * offset that breaks when daylight saving ends mid-cohort.
 */

export const ZONE = 'America/New_York';

/* Mondays, in order, per cohort. These are the session dates: changing a
 * session changes its check-in week, which is why they live in one place. */
/* Session dates, in order, including the last. One source of truth: the
 * check-in windows are derived from these, so moving a session moves its
 * deadline with it. */
export const COHORT_SESSIONS = {
  'Cohort 1, fall 2026': [
    '2026-11-06', '2026-11-13', '2026-11-20',
    '2026-11-23',   /* Monday: the venue is closed on Friday 27 November */
    '2026-12-04',   /* demo day */
  ],
  'Cohort 2, spring 2027': [
    '2027-01-15', '2027-01-22', '2027-01-29', '2027-02-05',
    '2027-02-12', '2027-02-19', '2027-02-26',
    '2027-03-05',   /* demo day */
  ],
};

const dayBefore = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d) - 86400000);
  return [
    dt.getUTCFullYear(),
    String(dt.getUTCMonth() + 1).padStart(2, '0'),
    String(dt.getUTCDate()).padStart(2, '0'),
  ].join('-');
};

/* Each session opens a check-in that is due the night before the next one.
 * The last session opens nothing. */
export const weeksFor = (cohort) => {
  const sessions = COHORT_SESSIONS[cohort] || [];
  return sessions.slice(0, -1).map((start, i) => ({
    start,
    due: dayBefore(sessions[i + 1]),
  }));
};


/* A deadline is 11:59:59 PM on its own due date, resolved in the programme's
 * zone. The date comes from the week, not from arithmetic on its start. */
export const DEADLINE_SQL = (col = 'due_date') =>
  `((${col})::date + TIME '23:59:59') AT TIME ZONE '${ZONE}'`;

/* Human wording, used in the page and in the emails so they cannot drift. */
export const DEADLINE_NOTE =
  'Everything is due the night before the next session. Your check-in submits itself at 11:59 PM that day, and whatever is saved at that moment is what we see, so you do not have to press anything. If you miss it you can still fill it in afterwards: it shows as late on our side, which is better than showing as nothing.';

/* Postgres hands a DATE back as a Date object, not a string, so anything
 * that compares or slices one has to normalise first. Getting this wrong is
 * silent: String(aDate) starts "Mon Nov 02 2026", which slices to nonsense
 * and never equals the "2026-11-02" the browser sends back. */
export function isoDate(value) {
  if (value instanceof Date) {
    return [
      value.getUTCFullYear(),
      String(value.getUTCMonth() + 1).padStart(2, '0'),
      String(value.getUTCDate()).padStart(2, '0'),
    ].join('-');
  }
  return String(value || '').slice(0, 10);
}

export function labelFor(week, index, total) {
  const parse = (iso) => {
    const [y, m, d] = isoDate(iso).split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, d));
  };
  const start = parse(week.start ?? week);
  const end = parse(week.due ?? week);
  const fmt = (dt) => dt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' });
  const weekday = (dt) => dt.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
  return {
    week: `Week ${index + 1} of ${total}`,
    range: `${fmt(start)} to ${fmt(end)}`,
    /* Named with its weekday, because "due Thursday" is how a student will
     * actually hold it in their head. */
    closes: `${weekday(end)} ${fmt(end)} at 11:59 PM`,
  };
}
