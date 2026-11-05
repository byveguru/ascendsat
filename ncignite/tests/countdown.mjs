/* The countdown logic, run against pinned clocks.
 *
 * Run in the programme's own timezone, because that is the question being
 * answered: TZ=America/New_York node tests/countdown.mjs
 *
 * Three things this guards, the first two of which the original got wrong:
 *  - counting elapsed milliseconds rather than calendar days, so the number
 *    changed depending on the hour you opened the page;
 *  - November 1 2026 is a 25 hour day where daylight saving ends, which
 *    floor() turns into an off-by-one and round() does not;
 *  - the handover from one milestone to the next, which must happen the day
 *    AFTER each one, not on it. */

const DAY = 86400000;

const MILESTONES = [
  { date: '2026-11-06', to: 'the first Friday', today: 'Starts today' },
  { date: '2026-12-04', to: 'demo day', today: 'Demo day is today' },
  { date: '2027-01-15', to: 'the first Friday of Cohort 2', today: 'Cohort 2 starts today' },
  { date: '2027-03-05', to: 'Cohort 2 demo day', today: 'Cohort 2 demo day is today' },
].map((m) => {
  const p = m.date.split('-').map(Number);
  return { ...m, when: new Date(p[0], p[1] - 1, p[2]) };
});

function textAt(now) {
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const daysTo = (m) => Math.round((m.when - midnight) / DAY);
  const m = MILESTONES.find((x) => daysTo(x) >= 0);
  if (!m) return '(hidden)';
  const days = daysTo(m);
  if (days > 1) return `${days} days to ${m.to}`;
  if (days === 1) return `One day to ${m.to}`;
  return m.today;
}

const cases = [
  // counting to the first Friday
  ['2026-10-23T09:00', '14 days to the first Friday'],
  ['2026-10-23T23:59', '14 days to the first Friday'],   // same date, late
  ['2026-10-24T00:01', '13 days to the first Friday'],   // rolled over
  ['2026-11-01T12:00', '5 days to the first Friday'],    // daylight saving ends
  ['2026-11-05T23:59', 'One day to the first Friday'],
  ['2026-11-06T00:00', 'Starts today'],
  ['2026-11-06T23:59', 'Starts today'],

  // the programme is running, so it points at demo day
  ['2026-11-07T00:01', '27 days to demo day'],
  ['2026-11-27T12:00', '7 days to demo day'],
  ['2026-12-03T18:00', 'One day to demo day'],
  ['2026-12-04T09:00', 'Demo day is today'],
  ['2026-12-04T23:59', 'Demo day is today'],

  // demo day is done, so it points at the next cohort
  ['2026-12-05T00:01', '41 days to the first Friday of Cohort 2'],
  ['2027-01-08T12:00', '7 days to the first Friday of Cohort 2'],
  ['2027-01-14T20:00', 'One day to the first Friday of Cohort 2'],
  ['2027-01-15T10:00', 'Cohort 2 starts today'],

  // and on to the last one
  ['2027-01-16T10:00', '48 days to Cohort 2 demo day'],
  ['2027-03-04T10:00', 'One day to Cohort 2 demo day'],
  ['2027-03-05T10:00', 'Cohort 2 demo day is today'],
  ['2027-03-06T00:01', '(hidden)'],
  ['2027-06-01T10:00', '(hidden)'],
];

let pass = 0, fail = 0;
for (let [iso, expected] of cases) {
  if (expected.startsWith('One week out: ')) expected = expected.slice('One week out: '.length);
  const [d, t] = iso.split('T');
  const [Y, M, D] = d.split('-').map(Number);
  const [h, m] = t.split(':').map(Number);
  const got = textAt(new Date(Y, M - 1, D, h, m));
  const okay = got === expected;
  okay ? pass++ : fail++;
  console.log(`  ${okay ? 'PASS' : 'FAIL'}  ${iso}  ->  ${got}${okay ? '' : `   (expected ${expected})`}`);
}
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
