import { createHash, randomInt } from 'node:crypto';
import { sql } from './db.js';
import { sessionToken, hashToken } from './codes.js';

export const STUDENT_COOKIE = 'nci_student';
export const SESSION_HOURS = Number(process.env.STUDENT_SESSION_HOURS || 24);
export const LOGIN_CODE_MINUTES = 15;

/* Six digits. Different shape from the parent's NCI- code on purpose, so the
 * two can never be confused for one another in an inbox. */
export function generateLoginCode() {
  let out = '';
  for (let i = 0; i < 6; i++) out += randomInt(10);
  return out;
}

export const normalizeLoginCode = (v) => String(v || '').replace(/\D/g, '').slice(0, 6);

export function hashLoginCode(code) {
  const pepper = process.env.SESSION_SECRET || '';
  return createHash('sha256').update(`login:${normalizeLoginCode(code)}:${pepper}`).digest('hex');
}

export function setStudentCookie(res, token) {
  res.setHeader('Set-Cookie',
    `${STUDENT_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_HOURS * 3600}`);
}

export function clearStudentCookie(res) {
  res.setHeader('Set-Cookie',
    `${STUDENT_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);
}

function readCookie(req, name) {
  const raw = req.headers.cookie || '';
  const hit = raw.split(';').map((c) => c.trim()).find((c) => c.startsWith(`${name}=`));
  return hit ? hit.slice(name.length + 1) : '';
}

/* Returns the signed-in student, or null. Every protected endpoint calls
 * this rather than trusting anything the browser sends. */
export async function currentStudent(req) {
  const token = readCookie(req, STUDENT_COOKIE);
  if (!token) return null;
  const rows = await sql`
    SELECT s.id, s.email
    FROM student_sessions ss JOIN students s ON s.id = ss.student_id
    WHERE ss.token_hash = ${hashToken(token)} AND ss.expires_at > now()
    LIMIT 1`;
  return rows[0] || null;
}

export async function startSession(res, studentId) {
  const { token, hash } = sessionToken();
  const expires = new Date(Date.now() + SESSION_HOURS * 3600 * 1000).toISOString();
  await sql`INSERT INTO student_sessions (token_hash, student_id, expires_at)
            VALUES (${hash}, ${studentId}, ${expires})`;
  await sql`UPDATE students SET last_login_at = now() WHERE id = ${studentId}`;
  setStudentCookie(res, token);
}

export async function endSession(req, res) {
  const token = readCookie(req, STUDENT_COOKIE);
  if (token) await sql`DELETE FROM student_sessions WHERE token_hash = ${hashToken(token)}`;
  clearStudentCookie(res);
}

/* ---- passwords -------------------------------------------------------- */
/* Accounts made before passwords existed have password_hash NULL. They log
 * in with an emailed code and are asked to set one once they are in, so the
 * change never locks anyone out. */

export const RESET_MINUTES = 60;

export async function findStudentByEmail(email) {
  const rows = await sql`
    SELECT id, email, password_hash FROM students WHERE email = ${email} LIMIT 1`;
  return rows[0] || null;
}

export async function setPassword(studentId, hash) {
  await sql`UPDATE students
            SET password_hash = ${hash}, password_set_at = now()
            WHERE id = ${studentId}`;
}

/* Changing or resetting a password signs out every other browser. If someone
 * else was in the account, this is the step that removes them. */
export async function revokeOtherSessions(studentId, keepToken = '') {
  if (keepToken) {
    await sql`DELETE FROM student_sessions
              WHERE student_id = ${studentId} AND token_hash <> ${hashToken(keepToken)}`;
  } else {
    await sql`DELETE FROM student_sessions WHERE student_id = ${studentId}`;
  }
}

export async function createResetToken(studentId) {
  // Only the newest link should work.
  await sql`UPDATE password_resets SET used_at = now()
            WHERE student_id = ${studentId} AND used_at IS NULL`;
  const { token, hash } = sessionToken();
  const expires = new Date(Date.now() + RESET_MINUTES * 60 * 1000).toISOString();
  await sql`INSERT INTO password_resets (token_hash, student_id, expires_at)
            VALUES (${hash}, ${studentId}, ${expires})`;
  return token;
}

export async function consumeResetToken(token) {
  if (!token) return null;
  const rows = await sql`
    SELECT pr.token_hash, pr.student_id, s.email
    FROM password_resets pr JOIN students s ON s.id = pr.student_id
    WHERE pr.token_hash = ${hashToken(token)}
      AND pr.used_at IS NULL AND pr.expires_at > now()
    LIMIT 1`;
  return rows[0] || null;
}

export async function markResetUsed(tokenHash) {
  await sql`UPDATE password_resets SET used_at = now() WHERE token_hash = ${tokenHash}`;
}
