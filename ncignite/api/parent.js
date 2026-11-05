import { sql, throttle } from '../lib/db.js';
import { json, readJson, clientIp, str, isEmail, looksLikeBot } from '../lib/http.js';
import { normalizeCode, hashCode, sessionToken, hashToken } from '../lib/codes.js';
import { sendEmail, CONTACT_EMAIL } from '../lib/email.js';
import { consentReceivedEmail } from '../lib/templates.js';

const SESSION_MINUTES = 60;
const COOKIE = 'nci_parent';

/* Wrong and unknown codes get the same words, so the response cannot be used
 * to tell a real code from a fake one. */
const BAD_CODE = `That code does not match. Check the email and try again, or write to ${CONTACT_EMAIL}.`;

const setSessionCookie = (res, token) =>
  res.setHeader('Set-Cookie',
    `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_MINUTES * 60}`);

const readCookie = (req) => {
  const raw = req.headers.cookie || '';
  const hit = raw.split(';').map((c) => c.trim()).find((c) => c.startsWith(`${COOKIE}=`));
  return hit ? hit.slice(COOKIE.length + 1) : '';
};

async function sessionApplication(req) {
  const token = readCookie(req);
  if (!token) return null;
  const rows = await sql`
    SELECT a.id, a.student_name, a.school_grade, a.parent_email, a.parent_name
    FROM parent_sessions s JOIN applications a ON a.id = s.application_id
    WHERE s.token_hash = ${hashToken(token)} AND s.expires_at > now()
    LIMIT 1`;
  return rows[0] || null;
}

export default async function handler(req, res) {
  const action = String(req.query?.action || '');

  if (req.method === 'GET' && action === 'session') {
    const app = await sessionApplication(req);
    if (!app) return json(res, 401, { verified: false });
    return json(res, 200, {
      verified: true,
      studentFirstName: String(app.student_name).trim().split(/\s+/)[0],
      school: app.school_grade,
      parentEmail: app.parent_email,
      parentName: app.parent_name,
    });
  }

  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
  const body = await readJson(req);

  /* ---- step 1: the gate ------------------------------------------------ */
  if (action === 'verify') {
    const ip = clientIp(req);
    const code = normalizeCode(body.code);
    if (!code) return json(res, 400, { error: BAD_CODE });

    /* Throttle the address and the code separately, so one attacker cannot
     * lock a real parent out by hammering their code from elsewhere. */
    const byIp = await throttle(`code_ip:${ip}`, { limit: 5, windowMs: 15 * 60 * 1000, lockMs: 15 * 60 * 1000 });
    const byCode = await throttle(`code_val:${hashCode(code)}`, { limit: 5, windowMs: 15 * 60 * 1000, lockMs: 15 * 60 * 1000 });
    if (!byIp.allowed || !byCode.allowed) {
      return json(res, 429, { error: 'Too many tries. Please wait 15 minutes and try again.' });
    }

    const rows = await sql`
      SELECT id, application_id, used_at, expires_at
      FROM parent_codes WHERE code_hash = ${hashCode(code)} LIMIT 1`;
    const record = rows[0];
    if (!record) return json(res, 400, { error: BAD_CODE });
    if (record.used_at) {
      return json(res, 400, { error: `This code was already used. If that was not you, write to ${CONTACT_EMAIL}.` });
    }
    if (new Date(record.expires_at) < new Date()) {
      return json(res, 400, { error: `This code expired. Write to ${CONTACT_EMAIL} and we will send a new one.` });
    }

    const { token, hash } = sessionToken();
    const expires = new Date(Date.now() + SESSION_MINUTES * 60 * 1000).toISOString();
    await sql`INSERT INTO parent_sessions (token_hash, application_id, expires_at)
              VALUES (${hash}, ${record.application_id}, ${expires})`;
    setSessionCookie(res, token);
    return json(res, 200, { ok: true });
  }

  /* ---- step 2: the consent form ---------------------------------------- */
  if (action === 'submit') {
    if (looksLikeBot(body)) return json(res, 200, { ok: true });

    /* A request without a valid session is rejected outright, so the form
     * cannot be posted by skipping the gate. */
    const app = await sessionApplication(req);
    if (!app) return json(res, 401, { error: 'Your session expired. Enter your code again.' });

    const f = {
      guardian_name: str(body.guardian_name, 200),
      guardian_relationship: str(body.guardian_relationship, 100),
      guardian_email: str(body.guardian_email, 254),
      guardian_phone: str(body.guardian_phone, 60),
      emergency_contact: str(body.emergency_contact, 300),
      safety_notes: str(body.safety_notes, 1500),
      signature: str(body.signature, 200),
    };
    const yes = (v) => v === true || v === 'Yes';

    const errors = {};
    if (!f.guardian_name) errors.guardian_name = 'Your full name is required.';
    if (!f.guardian_relationship) errors.guardian_relationship = 'Please choose your relationship to the student.';
    if (!isEmail(f.guardian_email)) errors.guardian_email = 'Enter a valid email address.';
    if (!f.guardian_phone) errors.guardian_phone = 'A phone number is required.';
    if (!f.signature) errors.signature = 'Please type your full name as a signature.';
    if (body.consent_participate === undefined) errors.consent_participate = 'This answer is required.';
    if (body.consent_transport === undefined) errors.consent_transport = 'This answer is required.';
    if (body.consent_ai === undefined) errors.consent_ai = 'This answer is required.';
    if (body.consent_photo === undefined) errors.consent_photo = 'This answer is required.';
    if (body.consent_alumni === undefined) errors.consent_alumni = 'This answer is required.';
    if (body.consent_participate !== undefined && !yes(body.consent_participate)) {
      errors.consent_participate = 'Without permission to take part, your student cannot join. Close this page if that is your decision.';
    }
    if (Object.keys(errors).length) return json(res, 400, { errors });

    await sql`
      UPDATE applications SET
        status = CASE WHEN status = 'applied' THEN 'parent_confirmed' ELSE status END,
        parent_confirmed_at = now(),
        guardian_name = ${f.guardian_name},
        guardian_relationship = ${f.guardian_relationship},
        guardian_email = ${f.guardian_email},
        guardian_phone = ${f.guardian_phone},
        emergency_contact = ${f.emergency_contact},
        safety_notes = ${f.safety_notes},
        consent_participate = TRUE,
        consent_transport = ${yes(body.consent_transport)},
        consent_ai = ${yes(body.consent_ai)},
        consent_photo = ${yes(body.consent_photo)},
        consent_alumni = ${yes(body.consent_alumni)},
        signature = ${f.signature}
      WHERE id = ${app.id}`;

    await sql`UPDATE parent_codes SET used_at = now()
              WHERE application_id = ${app.id} AND used_at IS NULL`;
    await sql`DELETE FROM parent_sessions WHERE application_id = ${app.id}`;

    const mail = consentReceivedEmail({ studentName: app.student_name });
    const student = await sql`SELECT student_email FROM applications WHERE id = ${app.id}`;
    await Promise.allSettled([
      sendEmail({ applicationId: app.id, kind: 'consent_parent', to: f.guardian_email,
        subject: mail.subject, text: mail.text, idempotencyKey: `consent_parent:${app.id}` }),
      sendEmail({ applicationId: app.id, kind: 'consent_student', to: student[0].student_email,
        subject: mail.subject, text: mail.text, idempotencyKey: `consent_student:${app.id}` }),
    ]);

    res.setHeader('Set-Cookie', `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);
    return json(res, 200, {
      ok: true,
      studentFirstName: String(app.student_name).trim().split(/\s+/)[0],
    });
  }

  return json(res, 400, { error: 'Unknown action' });
}
