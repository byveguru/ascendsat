/* Removes the rows the flow test leaves behind. Run it after `npm run
 * test:flow`, or whenever @example.com accounts pile up.
 *
 *   DATABASE_URL=... node tests/cleanup.mjs
 *
 * Scoped to @example.com, which is the reserved domain the tests use and
 * that no real applicant can have, so this cannot touch a real family. */
import { sql } from '../lib/db.js';

const apps = await sql`DELETE FROM applications WHERE student_email LIKE '%@example.com' RETURNING id`;
const students = await sql`DELETE FROM students WHERE email LIKE '%@example.com' RETURNING email`;
const left = await sql`SELECT count(*)::int AS n FROM applications`;

console.log(`removed ${apps.length} test application(s) and ${students.length} test account(s)`);
console.log(`${left[0].n} real application(s) remain`);
await sql.end();
