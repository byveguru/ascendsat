import { throttle } from '../lib/db.js';
import { json, readJson, clientIp, maskEmail, looksLikeBot } from '../lib/http.js';
import { emailsDisabled } from '../lib/email.js';
import { currentStudent } from '../lib/auth.js';
import { canApplyAgain } from '../lib/stages.js';
import {
  readApplicationFields, validateApplication, normaliseReferral,
  openApplicationFor, insertApplication, startParentConsent,
} from '../lib/application.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

  const body = await readJson(req);
  if (looksLikeBot(body)) return json(res, 200, { ok: true });

  /* Applying requires a verified account, so the address on every
   * application is one the student proved they can read. */
  const student = await currentStudent(req);
  if (!student) {
    return json(res, 401, { error: 'Please sign in before applying.', signInRequired: true });
  }

  const gate = await throttle(`apply:${clientIp(req)}`, {
    limit: 5, windowMs: 10 * 60 * 1000, lockMs: 15 * 60 * 1000,
  });
  if (!gate.allowed) {
    return json(res, 429, { error: 'Too many applications from this connection. Please wait 15 minutes.' });
  }

  const f = normaliseReferral(readApplicationFields(body));
  const errors = validateApplication(f, { creating: true, agreed: body.student_agreed });
  if (Object.keys(errors).length) return json(res, 400, { errors });

  const already = await openApplicationFor(student.id);
  if (already && !canApplyAgain(already.status)) {
    return json(res, 409, {
      error: 'You already have an application with this account. Check where it stands on your account page.',
      duplicate: true,
      status: already.status,
    });
  }

  let application;
  try {
    application = await insertApplication({
      studentId: student.id, studentEmail: student.email, fields: f,
    });
  } catch (err) {
    console.error('[apply] insert failed:', err?.code || 'unknown');
    return json(res, 500, { error: 'We could not save your application. Please try again.' });
  }

  const { code, sent } = await startParentConsent(application, student.email);

  return json(res, 200, {
    ok: true,
    maskedParentEmail: maskEmail(f.parent_email),
    emailSent: sent,
    ...(emailsDisabled() ? { emailDisabled: true, parentCode: code } : {}),
  });
}
