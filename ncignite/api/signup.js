import { sql, throttle } from '../lib/db.js';
import { json, readJson, clientIp, isEmail, str, looksLikeBot } from '../lib/http.js';

/* The "Get updates" box. Stored in updates_signups, visible in /admin. */
export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
  const body = await readJson(req);
  if (looksLikeBot(body)) return json(res, 200, { ok: true });

  const gate = await throttle(`signup:${clientIp(req)}`, {
    limit: 10, windowMs: 60 * 60 * 1000, lockMs: 60 * 60 * 1000,
  });
  if (!gate.allowed) return json(res, 429, { error: 'Too many sign-ups. Please try later.' });

  const email = str(body.email, 254).toLowerCase();
  if (!isEmail(email)) return json(res, 400, { error: 'Enter a valid email address.' });

  await sql`INSERT INTO updates_signups (email) VALUES (${email})
            ON CONFLICT (email) DO NOTHING`;
  return json(res, 200, { ok: true });
}
