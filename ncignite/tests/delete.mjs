/* Deleting one application must delete exactly one application.
 *
 * This exists because on 2026-10-13 it looked as though a single delete had
 * wiped the table. It had not: seeded test rows were being removed from the
 * database while the admin page sat open showing them. The endpoint was
 * fine, but "fine" is worth asserting rather than remembering.
 *
 *   DATABASE_URL=... SESSION_SECRET=... node tests/delete.mjs
 */
import adminH from '../api/admin.js';
import { sql } from '../lib/db.js';
import { sessionToken } from '../lib/codes.js';

let pass=0, fail=0;
const ok=(n,c,x='')=>{c?(pass++,console.log('  PASS',n)):(fail++,console.log('  FAIL',n,x));};

/* a real admin session, so we exercise the endpoint exactly as the page does */
const { token, hash } = sessionToken();
await sql`INSERT INTO admin_sessions (token_hash, email, expires_at)
          VALUES (${hash}, 'admin@ncignyte.org', now() + interval '1 hour')`;
const C = `nci_admin=${token}`;

async function call(action, body={}) {
  const res={statusCode:200,headers:{},body:null,setHeader(k,v){this.headers[k.toLowerCase()]=v;},end(b){this.body=JSON.parse(b);}};
  await adminH({ method:'POST', query:{action}, body, headers:{cookie:C} }, res);
  return { status:res.statusCode, data:res.body };
}

const stamp = Date.now();
const rows=[];
for (let i=1;i<=3;i++) rows.push({
  cohort:'Cohort 1, winter 2026', student_name:'Del Test '+i, student_phone:'919-555-0100',
  student_email:`del${i}-${stamp}@example.com`, parent_name:'P', parent_email:`dp${i}-${stamp}@example.com`,
  parent_phone:'919-555-0101', school_grade:'X High, 11th', startup_name:'Co', building:'A thing.',
  team_size:'Solo', why_join:'x', goals:'y', can_attend:'Yes', student_agreed:true });
const made = await sql`INSERT INTO applications ${sql(rows,'cohort','student_name','student_phone','student_email','parent_name','parent_email','parent_phone','school_grade','startup_name','building','team_size','why_join','goals','can_attend','student_agreed')} RETURNING id`;
const ids = made.map(r=>Number(r.id));
const before = (await sql`SELECT count(*)::int n FROM applications`)[0].n;
console.log(`seeded 3 (ids ${ids.join(', ')}); ${before} applications total\n`);

console.log('1. Delete one, the others survive');
let r = await call('delete', { id: ids[0], confirm: 'DELETE' });
ok('returned ok', r.status===200 && r.data.deleted, JSON.stringify(r.data));
ok('reports how many are left', typeof r.data.remaining === 'number', JSON.stringify(r.data));
let now = (await sql`SELECT count(*)::int n FROM applications`)[0].n;
ok('exactly one row went', now === before-1, `before ${before}, now ${now}`);
const survivors = await sql`SELECT id FROM applications WHERE id = ANY(${ids.slice(1)})`;
ok('the other two seeded rows are still here', survivors.length===2, String(survivors.length));

console.log('\n2. Without the typed confirmation nothing is deleted');
r = await call('delete', { id: ids[1] });
now = (await sql`SELECT count(*)::int n FROM applications`)[0].n;
ok('refused', r.status===400, JSON.stringify(r.data));
ok('row still there', now === before-1, String(now));

console.log('\n3. A missing or junk id must not match everything');
for (const bad of [undefined, null, '', 'all', '*', NaN, 0, -1, '1 OR 1=1']) {
  const n0 = (await sql`SELECT count(*)::int n FROM applications`)[0].n;
  let res;
  try { res = await call('delete', { id: bad, confirm: 'DELETE' }); }
  catch (e) { res = { status: 'threw', data: { error: e.message.slice(0,60) } }; }
  const n1 = (await sql`SELECT count(*)::int n FROM applications`)[0].n;
  ok(`id=${JSON.stringify(bad)} deleted nothing`, n1 === n0, `rows ${n0} -> ${n1}, status ${res.status}`);
}

await sql`DELETE FROM applications WHERE student_email LIKE '%${sql.unsafe(String(stamp))}@example.com'`;
await sql`DELETE FROM applications WHERE student_email LIKE '%@example.com'`;
await sql`DELETE FROM admin_sessions WHERE token_hash = ${hash}`;
const left = await sql`SELECT id, student_name FROM applications`;
console.log('\nremaining applications:', left);
await sql.end();
console.log(`${pass} passed, ${fail} failed`);
process.exit(fail?1:0);
