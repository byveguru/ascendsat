/* The three states an organiser sees, pinned as pure logic.
 *
 * The live flow test cannot reach these until a week actually opens on
 * 2 November, because nothing can be saved to a week that has not started.
 * The rules themselves do not need a database, so they are tested here.
 *
 *   node tests/checkin-rules.mjs
 */
import { weeksFor, labelFor, isoDate, DEADLINE_NOTE, COHORT_SESSIONS } from '../lib/weeks.js';

let pass = 0, fail = 0;
const ok = (n, c, x = '') => { c ? (pass++, console.log('  PASS', n)) : (fail++, console.log('  FAIL', n, x)); };

/* Mirrors api/admin.js. Lateness is decided by the FIRST save, never the
 * last, so editing a late week next month cannot make it look punctual. */
function stateOf({ firstSavedAt, closesAt, now, goals = [] }) {
  const closed = now > closesAt;
  if (!firstSavedAt) return closed ? 'missing' : 'open, nothing yet';
  const late = firstSavedAt > closesAt;
  return `${goals.filter((g) => g.done).length}/${goals.length}` + (late ? ', late' : '');
}

const closes = new Date('2026-11-12T23:59:59-05:00');  // Thursday, the night before session 2
const twoGoals = [{ text: 'a', done: true }, { text: 'b', done: false }];

console.log('1. The three states');
ok('nothing written, week still open',
  stateOf({ firstSavedAt: null, closesAt: closes, now: new Date('2026-11-10T12:00:00-05:00') }) === 'open, nothing yet');
ok('nothing written, week closed -> missing',
  stateOf({ firstSavedAt: null, closesAt: closes, now: new Date('2026-11-13T09:00:00-05:00') }) === 'missing');
ok('saved before the deadline -> on time',
  stateOf({ firstSavedAt: new Date('2026-11-07T19:00:00-05:00'), closesAt: closes, now: new Date('2026-11-13T09:00:00-05:00'), goals: twoGoals }) === '1/2');
ok('saved after the deadline -> late',
  stateOf({ firstSavedAt: new Date('2026-11-13T08:00:00-05:00'), closesAt: closes, now: new Date('2026-11-14T09:00:00-05:00'), goals: twoGoals }) === '1/2, late');

console.log('\n2. One second either side of 11:59 PM on the Thursday');
ok('11:59:59 on the Thursday is on time',
  stateOf({ firstSavedAt: new Date('2026-11-12T23:59:59-05:00'), closesAt: closes, now: new Date('2026-11-13T09:00:00-05:00'), goals: twoGoals }) === '1/2');
ok('one second later is late',
  stateOf({ firstSavedAt: new Date('2026-11-13T00:00:00-05:00'), closesAt: closes, now: new Date('2026-11-13T09:00:00-05:00'), goals: twoGoals }) === '1/2, late');

console.log('\n3. A late week stays late however much it is edited after');
const lateWeek = { firstSavedAt: new Date('2026-11-16T10:00:00-05:00'), closesAt: closes, now: new Date('2026-12-01T10:00:00-05:00'), goals: twoGoals };
ok('still late a month later', stateOf(lateWeek).endsWith(', late'));

console.log('\n4. The calendar follows the sessions');
const c1 = weeksFor('Cohort 1, fall 2026');
const sessions = COHORT_SESSIONS['Cohort 1, fall 2026'];
ok('five sessions', sessions.length === 5, String(sessions.length));
ok('session four is the Monday', sessions[3] === '2026-11-23', sessions[3]);
ok('four check-ins, one per session but the last', c1.length === 4, String(c1.length));
ok('the first opens on session one', c1[0].start === '2026-11-06', c1[0].start);
ok('the first is due Thursday 12 November', labelFor(c1[0], 0, 4).closes === 'Thursday November 12 at 11:59 PM', labelFor(c1[0], 0, 4).closes);

/* The venue closure makes the windows uneven. A fixed "start plus six"
 * would put both of these deadlines in the wrong place. */
ok('the short one is due Sunday 22 November', labelFor(c1[2], 2, 4).closes === 'Sunday November 22 at 11:59 PM', labelFor(c1[2], 2, 4).closes);
ok('the long one is due Thursday 3 December', labelFor(c1[3], 3, 4).closes === 'Thursday December 3 at 11:59 PM', labelFor(c1[3], 3, 4).closes);
ok('every deadline is the day before the next session', c1.every((w, i) => {
  const next = new Date(sessions[i + 1] + 'T00:00:00Z');
  const due = new Date(w.due + 'T00:00:00Z');
  return (next - due) === 86400000;
}));
ok('there is no check-in after demo day', !c1.some((w) => w.start === '2026-12-04'));

console.log('\n5. Postgres hands back a Date, the browser sends a string');
ok('a Date normalises', isoDate(new Date(Date.UTC(2026, 10, 23))) === '2026-11-23', isoDate(new Date(Date.UTC(2026, 10, 23))));
ok('a string normalises', isoDate('2026-11-23') === '2026-11-23');
ok('they match', isoDate(new Date(Date.UTC(2026, 10, 23))) === isoDate('2026-11-23'));

console.log('\n6. The wording students are promised');
ok('says it submits itself', /submits itself/.test(DEADLINE_NOTE));
ok('says the night before the next session', /night before the next session/.test(DEADLINE_NOTE));
ok('says 11:59 PM', /11:59 PM/.test(DEADLINE_NOTE));
ok('says late is still possible', /late/.test(DEADLINE_NOTE));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
