import { createHash, scryptSync, timingSafeEqual, randomBytes } from 'node:crypto';
import { sql } from './db.js';
import { sessionToken, hashToken } from './codes.js';

export const ADMIN_COOKIE = 'nci_admin';
export const ADMIN_HOURS = 8;

/* The plaintext password lives only in the environment. It is never written
 * to the database or a file; we derive a hash per request and compare in
 * constant time, so a timing difference cannot be used to guess it. */
export function passwordMatches(candidate) {
  const expected = process.env.ADMIN_PASSWORD || '';
  if (!expected) return false;
  const salt = createHash('sha256').update(process.env.SESSION_SECRET || 'nci').digest();
  const a = scryptSync(String(candidate), salt, 32);
  const b = scryptSync(expected, salt, 32);
  return timingSafeEqual(a, b);
}

export function emailMatches(candidate) {
  const expected = (process.env.ADMIN_EMAIL || 'admin@ncignyte.org').toLowerCase();
  const given = String(candidate || '').trim().toLowerCase();
  // Pad both sides so length alone does not leak.
  const a = createHash('sha256').update(given).digest();
  const b = createHash('sha256').update(expected).digest();
  return timingSafeEqual(a, b);
}

export function setAdminCookie(res, token) {
  res.setHeader('Set-Cookie',
    `${ADMIN_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${ADMIN_HOURS * 3600}`);
}

export function clearAdminCookie(res) {
  res.setHeader('Set-Cookie',
    `${ADMIN_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`);
}

function cookie(req, name) {
  const raw = req.headers.cookie || '';
  const hit = raw.split(';').map((c) => c.trim()).find((c) => c.startsWith(`${name}=`));
  return hit ? hit.slice(name.length + 1) : '';
}

export async function currentAdmin(req) {
  const token = cookie(req, ADMIN_COOKIE);
  if (!token) return null;
  const rows = await sql`
    SELECT email FROM admin_sessions
    WHERE token_hash = ${hashToken(token)} AND expires_at > now() LIMIT 1`;
  return rows[0] || null;
}

export async function startAdminSession(res, email) {
  const { token, hash } = sessionToken();
  const expires = new Date(Date.now() + ADMIN_HOURS * 3600 * 1000).toISOString();
  await sql`INSERT INTO admin_sessions (token_hash, email, expires_at)
            VALUES (${hash}, ${email}, ${expires})`;
  setAdminCookie(res, token);
}

export async function endAdminSession(req, res) {
  const token = cookie(req, ADMIN_COOKIE);
  if (token) await sql`DELETE FROM admin_sessions WHERE token_hash = ${hashToken(token)}`;
  clearAdminCookie(res);
}

export const csvCell = (v) => {
  const s = v === null || v === undefined ? '' : String(v);
  /* A leading =, +, - or @ makes a spreadsheet treat the cell as a formula,
   * so prefix those. The export holds names and phone numbers typed by the
   * public. */
  const safe = /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
  return `"${safe.replace(/"/g, '""')}"`;
};
