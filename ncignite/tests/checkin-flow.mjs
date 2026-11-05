/* The whole check-in flow against the live site, over HTTP.
 * No database URL needed: the deployed app is the probe. */
const BASE = 'https://ncignyte.vercel.app';
let pass = 0, fail = 0;
const ok = (n, c, x = '') => { c ? (pass++, console.log('  PASS', n)) : (fail++, console.log('  FAIL', n, x)); };

const jar = {};
async function call(path, { method = 'GET', body, who = 'student' } = {}) {
  const res = await fetch(BASE + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(jar[who] ? { Cookie: jar[who] } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const set = res.headers.getSetCookie?.() || [];
  for (const c of set) {
    const m = /^(nci_[a-z]+)=([^;]*)/.exec(c);
    if (m && m[2]) jar[who] = `${m[1]}=${m[2]}`;
  }
  let data = {};
  try { data = await res.json(); } catch {}
  return { status: res.status, data };
}

const stamp = Date.now();
const email = `ci${stamp}@example.com`;
const PW = 'a long enough passphrase';

/* Credentials come from the environment, never from this file:
 *   ADMIN_EMAIL=... ADMIN_PASSWORD=... npm run test:checkin-flow */
if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
  console.log('Set ADMIN_EMAIL and ADMIN_PASSWORD to run this test.');
  process.exit(1);
}

console.log('1. Admin signs in');
let r = await call('/api/admin?action=login', { method: 'POST', who: 'admin',
  body: { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD } });
ok('admin logged in', r.status === 200, JSON.stringify(r.data));

console.log('\n2. A student applies');
r = await call('/api/auth?action=request', { method: 'POST', body: { email, password: PW, password_confirm: PW } });
const code = r.data.code;

/* With TEST_MODE=0 the code is emailed instead of returned, which is the
 * whole point of live mode. This suite cannot complete against a live site:
 * run it against a preview with TEST_MODE=1, not production. */
if (!code) {
  console.log('\n  SKIPPED: this site has email live, so sign-up codes are not returned.');
  console.log('  Run against a preview deployment with TEST_MODE=1:');
  console.log('    BASE_URL=https://<preview>.vercel.app npm run test:checkin-flow');
  process.exit(0);
}
r = await call('/api/auth?action=verify', { method: 'POST', body: { email, code } });
ok('account created', r.status === 200, JSON.stringify(r.data));
r = await call('/api/apply', { method: 'POST', body: {
  cohort: 'Cohort 1, fall 2026', student_name: 'Checkin Tester', student_phone: '919-555-0100',
  parent_name: 'P', parent_email: `cp${stamp}@example.com`, parent_phone: '919-555-0101',
  school_grade: 'Test High, 11th', startup_name: 'Loopback', building: 'A thing that checks things.',
  team_size: 'Solo', why_join: 'To test.', goals: 'Green.', can_attend: 'Yes', student_agreed: true } });
ok('application submitted', r.status === 200, JSON.stringify(r.data));

console.log('\n3. Before acceptance, check-ins are shut');
r = await call('/api/checkin');
ok('told why, not an error', r.status === 200 && r.data.notStarted, JSON.stringify(r.data).slice(0, 140));

console.log('\n4. Admin accepts them');
const list = await call('/api/admin?action=list', { who: 'admin' });
const row = list.data.rows.find((x) => x.student_name === 'Checkin Tester');
ok('row visible to admin', Boolean(row));
r = await call('/api/admin?action=decide', { method: 'POST', who: 'admin',
  body: { ids: [row.id], decision: 'accepted', personal_note: 'Testing the check-in flow end to end.' } });
ok('accepted', r.status === 200, JSON.stringify(r.data).slice(0, 140));

console.log('\n5. Accepted is still not invited');
r = await call('/api/checkin');
ok('still shut', r.data.notStarted === true, JSON.stringify(r.data).slice(0, 140));
ok('tells them an organiser will open it', /organiser will open/.test(r.data.message || ''), r.data.message);

const acc = await call('/api/admin?action=accepted', { who: 'admin' });
const me = acc.data.students.find((s) => s.student_name === 'Checkin Tester');
ok('appears in the admitted list', Boolean(me), JSON.stringify(acc.data).slice(0, 120));
ok('listed as not opened', me && !me.checkin_invited_at);

console.log('\n6. Admin opens check-ins');
r = await call('/api/admin?action=invite_checkin', { method: 'POST', who: 'admin', body: { ids: [row.id] } });
ok('invited one', r.status === 200 && r.data.invited === 1, JSON.stringify(r.data));
r = await call('/api/admin?action=invite_checkin', { method: 'POST', who: 'admin', body: { ids: [row.id] } });
ok('a second invite is skipped, not re-sent', r.data.invited === 0 && r.data.skipped === 1, JSON.stringify(r.data));

console.log('\n7. The student can now check in');
r = await call('/api/checkin');
ok('open', !r.data.notStarted, JSON.stringify(r.data).slice(0, 140));
ok('four check-ins', r.data.weeks?.length === 4, String(r.data.weeks?.length));
ok('the first is due Thursday November 12', /Thursday November 12/.test(r.data.weeks?.[0]?.closes || ''), r.data.weeks?.[0]?.closes);
ok('the last is due the night before demo day', /Thursday December 3/.test(r.data.weeks?.[3]?.closes || ''), r.data.weeks?.[3]?.closes);
ok('the short week round the venue closure is due Sunday 22 November', /Sunday November 22/.test(r.data.weeks?.[2]?.closes || ''), r.data.weeks?.[2]?.closes);
ok('the first opens on session one', r.data.weeks?.[0]?.weekStart === '2026-11-06', r.data.weeks?.[0]?.weekStart);
ok('deadline wording mentions late', /late/.test(r.data.deadlineNote || ''), r.data.deadlineNote?.slice(0, 80));
ok('no week is open yet in October', r.data.openWeek === null, String(r.data.openWeek));

console.log('\n8. Writing to a week that has not started is refused');
r = await call('/api/checkin', { method: 'POST', body: { week_start: '2026-11-06', goals: [{ text: 'too early', done: false }] } });
ok('refused', r.status === 400 && /not started/i.test(r.data.error || ''), JSON.stringify(r.data));

console.log('\n9. And a week that is not in the cohort');
r = await call('/api/checkin', { method: 'POST', body: { week_start: '2025-01-06', goals: [] } });
ok('refused', r.status === 400 && /not a week/i.test(r.data.error || ''), JSON.stringify(r.data));

console.log('\n10. Admin sees them in the grid');
const grid = await call('/api/admin?action=checkins', { who: 'admin' });
const gridMe = grid.data.students?.find((s) => s.name === 'Checkin Tester');
ok('present in the check-in grid', Boolean(gridMe), JSON.stringify(grid.data).slice(0, 140));

console.log('\n11. Clean up');
r = await call('/api/admin?action=delete', { method: 'POST', who: 'admin', body: { id: row.id, confirm: 'DELETE' } });
ok('test application deleted', r.status === 200, JSON.stringify(r.data));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
