import { sql } from '../lib/db.js';
import { json } from '../lib/http.js';
import { TEST_MODE } from '../lib/mode.js';

/* Secret-guarded so it cannot be used to probe the schema from outside. */
export default async function handler(req, res) {
  const secret = process.env.CRON_SECRET;
  if (!secret || (req.headers.authorization || '') !== `Bearer ${secret}`) {
    return json(res, 401, { error: 'Unauthorized' });
  }
  /* Maintenance for the test harness. Deletion is confined to addresses on
   * the throwaway domain, so a mistyped call cannot touch a real applicant. */
  if (req.method === 'POST') {
    const action = String(req.query?.action || '');
    /* These wipe data. They must not exist once the site is live. */
    if (!TEST_MODE) return json(res, 403, { error: 'Maintenance actions are disabled in live mode.' });
    if (action === 'reset-limits') {
      const out = await sql`DELETE FROM rate_limits RETURNING bucket`;
      return json(res, 200, { cleared: out.length });
    }
    if (action === 'purge-test-data') {
      const domain = process.env.TEST_EMAIL_DOMAIN || 'example.com';
      const pattern = `%@${domain}`;
      const apps = await sql`DELETE FROM applications WHERE student_email ILIKE ${pattern}
                             OR parent_email ILIKE ${pattern} RETURNING id`;
      const studs = await sql`DELETE FROM students WHERE email ILIKE ${pattern} RETURNING id`;
      const parts = await sql`DELETE FROM partners WHERE email ILIKE ${pattern} RETURNING id`;
      const ups = await sql`DELETE FROM updates_signups WHERE email ILIKE ${pattern} RETURNING id`;
      await sql`DELETE FROM rate_limits`;
      return json(res, 200, {
        purgedDomain: domain,
        applications: apps.length, students: studs.length,
        partners: parts.length, signups: ups.length,
      });
    }
    return json(res, 400, { error: 'Unknown action' });
  }

  try {
    const tables = await sql`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' ORDER BY table_name`;
    const counts = await sql`
      SELECT
        (SELECT count(*)::int FROM applications) AS applications,
        (SELECT count(*)::int FROM students) AS students,
        (SELECT count(*)::int FROM partners) AS partners`;
    return json(res, 200, {
      db: 'connected',
      tables: tables.map((t) => t.table_name),
      counts: counts[0],
      testMode: TEST_MODE,
      emailLive: !TEST_MODE,
      hasAdminPassword: Boolean(process.env.ADMIN_PASSWORD),
      hasBrevoKey: Boolean(process.env.BREVO_API_KEY),
    });
  } catch (err) {
    return json(res, 500, { db: 'error', message: String(err?.message || err).slice(0, 300) });
  }
}
