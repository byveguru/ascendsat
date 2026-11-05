import { sql, throttle } from '../lib/db.js';
import { json, readJson, clientIp, str, isEmail, looksLikeBot } from '../lib/http.js';
import {
  generateLoginCode, normalizeLoginCode, hashLoginCode,
  currentStudent, startSession, endSession, LOGIN_CODE_MINUTES,
  findStudentByEmail, setPassword, revokeOtherSessions,
  createResetToken, consumeResetToken, markResetUsed, RESET_MINUTES,
  STUDENT_COOKIE,
} from '../lib/auth.js';
import { hashPassword, verifyPassword, passwordProblem, DUMMY_HASH } from '../lib/passwords.js';
import { sendEmail, SITE_URL, CONTACT_EMAIL, emailsDisabled } from '../lib/email.js';
import { passwordResetEmail, passwordChangedEmail } from '../lib/templates.js';

/* An Ignyte account is an email address, a password, and proof that the
 * student can read that inbox. The proof matters more than the password:
 * the parent's consent code is emailed, so an unverified address would make
 * the whole consent step meaningless.
 *
 * So sign up is password + emailed code, and from then on log in is just the
 * password. Accounts created before passwords existed have no hash; they log
 * in with a code and are asked to set one once they are in. */

const SENT_REPLY = {
  ok: true,
  message: 'If that address can receive mail, we just sent it a six digit code. It lasts 15 minutes.',
};

/* One sentence for wrong password, unknown address and unset password, so
 * this cannot be used to find out who has an account. */
const BAD_LOGIN = 'That email and password do not match. Check both, or use the forgot password link.';

const RESET_REPLY = {
  ok: true,
  message: 'If that address has an Ignyte account, we just emailed a link to set a new password. It lasts an hour.',
};

function codeEmail(code) {
  return {
    subject: `Your NC Ignyte code: ${code}`,
    text: `Your NC Ignyte verification code is:

${code}

It lasts ${LOGIN_CODE_MINUTES} minutes and works once. Enter it on the page you opened.

If you did not ask for this, ignore this email. Someone may have mistyped their address.

Questions? Write to ${CONTACT_EMAIL}.

${SITE_URL}`,
  };
}

function readCookie(req, name) {
  const raw = req.headers.cookie || '';
  const hit = raw.split(';').map((c) => c.trim()).find((c) => c.startsWith(`${name}=`));
  return hit ? hit.slice(name.length + 1) : '';
}

export default async function handler(req, res) {
  const action = String(req.query?.action || '');

  if (req.method === 'GET' && action === 'me') {
    const student = await currentStudent(req);
    if (!student) return json(res, 200, { signedIn: false });
    const rows = await sql`SELECT password_hash FROM students WHERE id = ${student.id} LIMIT 1`;
    return json(res, 200, {
      signedIn: true,
      email: student.email,
      hasPassword: Boolean(rows[0]?.password_hash),
    });
  }

  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
  const body = await readJson(req);

  /* ---- sign up, and the code fallback for old accounts ------------------ */
  if (action === 'request') {
    if (looksLikeBot(body)) return json(res, 200, SENT_REPLY);

    const email = str(body.email, 254).toLowerCase();
    if (!isEmail(email)) return json(res, 400, { error: 'Enter a valid email address.' });

    /* A password is optional here: the sign up form sends one, the "email me
     * a code instead" link on the log in page does not. The policy check is
     * the same for every address, so answering it leaks nothing. */
    const password = typeof body.password === 'string' ? body.password : '';
    let pendingHash = null;
    if (password) {
      const problem = passwordProblem(password, email);
      if (problem) return json(res, 400, { error: problem });
      if (str(body.password_confirm, 200) !== '' && body.password_confirm !== password) {
        return json(res, 400, { error: 'The two passwords do not match.' });
      }
      pendingHash = await hashPassword(password);
    }

    const byIp = await throttle(`login_ip:${clientIp(req)}`, {
      limit: 10, windowMs: 60 * 60 * 1000, lockMs: 30 * 60 * 1000,
    });
    const byEmail = await throttle(`login_addr:${email}`, {
      limit: 4, windowMs: 60 * 60 * 1000, lockMs: 30 * 60 * 1000,
    });
    // Still the generic reply, so throttling cannot be used to probe either.
    if (!byIp.allowed || !byEmail.allowed) return json(res, 200, SENT_REPLY);

    const rows = await sql`
      INSERT INTO students (email) VALUES (${email})
      ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
      RETURNING id`;
    const studentId = rows[0].id;

    // Only the newest code should ever work.
    await sql`UPDATE login_codes SET used_at = now()
              WHERE student_id = ${studentId} AND used_at IS NULL`;

    const code = generateLoginCode();
    const expires = new Date(Date.now() + LOGIN_CODE_MINUTES * 60 * 1000).toISOString();
    await sql`INSERT INTO login_codes (student_id, code_hash, expires_at, pending_password_hash)
              VALUES (${studentId}, ${hashLoginCode(code)}, ${expires}, ${pendingHash})`;

    const mail = codeEmail(code);
    await sendEmail({
      kind: 'login_code', to: email, subject: mail.subject, text: mail.text,
      idempotencyKey: `login_code:${studentId}:${Date.now()}`,
    });

    return json(res, 200, emailsDisabled()
      ? { ...SENT_REPLY, emailDisabled: true, code }
      : SENT_REPLY);
  }

  /* ---- exchange a code for a session ----------------------------------- */
  if (action === 'verify') {
    const email = str(body.email, 254).toLowerCase();
    const code = normalizeLoginCode(body.code);
    if (!isEmail(email) || code.length !== 6) {
      return json(res, 400, { error: 'That code does not match. Check the email and try again.' });
    }

    const byIp = await throttle(`login_try_ip:${clientIp(req)}`, {
      limit: 5, windowMs: 15 * 60 * 1000, lockMs: 15 * 60 * 1000,
    });
    const byEmail = await throttle(`login_try_addr:${email}`, {
      limit: 5, windowMs: 15 * 60 * 1000, lockMs: 15 * 60 * 1000,
    });
    if (!byIp.allowed || !byEmail.allowed) {
      return json(res, 429, { error: 'Too many tries. Please wait 15 minutes and try again.' });
    }

    const rows = await sql`
      SELECT lc.id, lc.student_id, lc.used_at, lc.expires_at, lc.pending_password_hash,
             s.password_hash
      FROM login_codes lc JOIN students s ON s.id = lc.student_id
      WHERE lc.code_hash = ${hashLoginCode(code)} AND s.email = ${email}
      LIMIT 1`;
    const record = rows[0];

    // One message for wrong, unknown, used and expired, so nothing leaks.
    if (!record || record.used_at || new Date(record.expires_at) < new Date()) {
      return json(res, 400, { error: 'That code does not match, or it expired. Ask for a new one.' });
    }

    await sql`UPDATE login_codes SET used_at = now() WHERE id = ${record.id}`;

    /* Apply the password typed on the sign up form, but only to an account
     * that does not have one. Someone who already has a password changes it
     * from their account page or the forgot link, never by signing up again. */
    let passwordApplied = false;
    if (record.pending_password_hash && !record.password_hash) {
      await setPassword(record.student_id, record.pending_password_hash);
      passwordApplied = true;
    }
    await sql`UPDATE login_codes SET pending_password_hash = NULL WHERE id = ${record.id}`;

    await startSession(res, record.student_id);
    return json(res, 200, {
      ok: true,
      email,
      passwordApplied,
      hasPassword: Boolean(record.password_hash) || passwordApplied,
      /* True when they typed a password but the account already had one.
       * The page says so rather than letting them think it took. */
      existingAccount: Boolean(record.pending_password_hash && record.password_hash),
    });
  }

  /* ---- log in with a password ------------------------------------------ */
  if (action === 'login') {
    if (looksLikeBot(body)) return json(res, 400, { error: BAD_LOGIN });

    const email = str(body.email, 254).toLowerCase();
    const password = typeof body.password === 'string' ? body.password : '';
    if (!isEmail(email) || !password) return json(res, 400, { error: BAD_LOGIN });

    const byIp = await throttle(`pw_try_ip:${clientIp(req)}`, {
      limit: 20, windowMs: 15 * 60 * 1000, lockMs: 15 * 60 * 1000,
    });
    const byEmail = await throttle(`pw_try_addr:${email}`, {
      limit: 8, windowMs: 15 * 60 * 1000, lockMs: 15 * 60 * 1000,
    });
    if (!byIp.allowed || !byEmail.allowed) {
      return json(res, 429, { error: 'Too many tries. Please wait 15 minutes, or use the forgot password link.' });
    }

    const student = await findStudentByEmail(email);
    /* Hash anyway when there is no account, so an unknown address does not
     * answer faster than a wrong password. */
    const ok = student && student.password_hash
      ? await verifyPassword(password, student.password_hash)
      : await verifyPassword(password, DUMMY_HASH);
    if (!ok) return json(res, 400, { error: BAD_LOGIN });

    await startSession(res, student.id);
    return json(res, 200, { ok: true, email });
  }

  /* ---- forgot password -------------------------------------------------- */
  if (action === 'forgot') {
    if (looksLikeBot(body)) return json(res, 200, RESET_REPLY);

    const email = str(body.email, 254).toLowerCase();
    if (!isEmail(email)) return json(res, 400, { error: 'Enter a valid email address.' });

    const byIp = await throttle(`reset_ip:${clientIp(req)}`, {
      limit: 10, windowMs: 60 * 60 * 1000, lockMs: 30 * 60 * 1000,
    });
    const byEmail = await throttle(`reset_addr:${email}`, {
      limit: 4, windowMs: 60 * 60 * 1000, lockMs: 30 * 60 * 1000,
    });
    if (!byIp.allowed || !byEmail.allowed) return json(res, 200, RESET_REPLY);

    const student = await findStudentByEmail(email);
    // Same reply either way, so this cannot be used to find out who has an account.
    if (!student) return json(res, 200, RESET_REPLY);

    const token = await createResetToken(student.id);
    const link = `${SITE_URL}/reset?token=${encodeURIComponent(token)}`;
    const mail = passwordResetEmail({ link, minutes: RESET_MINUTES });
    await sendEmail({
      kind: 'password_reset', to: email, subject: mail.subject, text: mail.text,
      idempotencyKey: `password_reset:${student.id}:${Date.now()}`,
    });

    return json(res, 200, emailsDisabled()
      ? { ...RESET_REPLY, emailDisabled: true, link }
      : RESET_REPLY);
  }

  /* ---- set a new password from a reset link ----------------------------- */
  if (action === 'reset') {
    const token = str(body.token, 200);
    const password = typeof body.password === 'string' ? body.password : '';

    const byIp = await throttle(`reset_use_ip:${clientIp(req)}`, {
      limit: 10, windowMs: 15 * 60 * 1000, lockMs: 15 * 60 * 1000,
    });
    if (!byIp.allowed) {
      return json(res, 429, { error: 'Too many tries. Please wait 15 minutes and try again.' });
    }

    const record = await consumeResetToken(token);
    if (!record) {
      return json(res, 400, {
        error: 'That link has expired or has already been used. Ask for a new one.',
        expired: true,
      });
    }

    const problem = passwordProblem(password, record.email);
    if (problem) return json(res, 400, { error: problem });
    if (body.password_confirm !== undefined && body.password_confirm !== password) {
      return json(res, 400, { error: 'The two passwords do not match.' });
    }

    await setPassword(record.student_id, await hashPassword(password));
    await markResetUsed(record.token_hash);
    /* Whoever had the account before this point is signed out. That is the
     * point of a reset. */
    await revokeOtherSessions(record.student_id);
    await startSession(res, record.student_id);

    const mail = passwordChangedEmail();
    await sendEmail({
      kind: 'password_changed', to: record.email, subject: mail.subject, text: mail.text,
      idempotencyKey: `password_changed:${record.student_id}:${Date.now()}`,
    });

    return json(res, 200, { ok: true, email: record.email });
  }

  /* ---- change the password while signed in ------------------------------ */
  if (action === 'set-password') {
    const student = await currentStudent(req);
    if (!student) return json(res, 401, { error: 'Log in first.' });

    const limit = await throttle(`pw_set:${student.id}`, {
      limit: 10, windowMs: 60 * 60 * 1000, lockMs: 30 * 60 * 1000,
    });
    if (!limit.allowed) {
      return json(res, 429, { error: 'Too many tries. Please wait and try again.' });
    }

    const rows = await sql`SELECT password_hash FROM students WHERE id = ${student.id} LIMIT 1`;
    const existing = rows[0]?.password_hash;

    /* An account that already has a password needs the current one, so a
     * borrowed laptop with a live session cannot be used to lock the owner
     * out. An account that has never had one does not, because there is
     * nothing to prove. */
    if (existing) {
      const current = typeof body.current_password === 'string' ? body.current_password : '';
      if (!current || !(await verifyPassword(current, existing))) {
        return json(res, 400, { error: 'Your current password is not right.' });
      }
    }

    const password = typeof body.password === 'string' ? body.password : '';
    const problem = passwordProblem(password, student.email);
    if (problem) return json(res, 400, { error: problem });
    if (body.password_confirm !== undefined && body.password_confirm !== password) {
      return json(res, 400, { error: 'The two passwords do not match.' });
    }

    await setPassword(student.id, await hashPassword(password));
    await revokeOtherSessions(student.id, readCookie(req, STUDENT_COOKIE));

    const mail = passwordChangedEmail();
    await sendEmail({
      kind: 'password_changed', to: student.email, subject: mail.subject, text: mail.text,
      idempotencyKey: `password_changed:${student.id}:${Date.now()}`,
    });

    return json(res, 200, {
      ok: true,
      message: existing
        ? 'Password changed. Any other browser you were signed in on has been signed out.'
        : 'Password set. You can log in with it from now on.',
    });
  }

  if (action === 'logout') {
    await endSession(req, res);
    return json(res, 200, { ok: true });
  }

  return json(res, 400, { error: 'Unknown action' });
}
