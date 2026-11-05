import { sql, throttle } from '../lib/db.js';
import { json, readJson, clientIp, str, isEmail, looksLikeBot } from '../lib/http.js';
import { sendEmail, CONTACT_EMAIL } from '../lib/email.js';
import { partnerNoticeEmail, partnerThanksEmail } from '../lib/templates.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
  const body = await readJson(req);
  if (looksLikeBot(body)) return json(res, 200, { ok: true });

  const gate = await throttle(`partner:${clientIp(req)}`, {
    limit: 5, windowMs: 10 * 60 * 1000, lockMs: 15 * 60 * 1000,
  });
  if (!gate.allowed) return json(res, 429, { error: 'Too many submissions. Please wait 15 minutes.' });

  const list = (v) => (Array.isArray(v) ? v.map((x) => str(x, 80)).filter(Boolean).join(', ') : str(v, 400));
  const f = {
    name: str(body.name, 200),
    email: str(body.email, 254),
    organization: str(body.organization, 200),
    role: str(body.role, 200),
    phone: str(body.phone, 60),
    support_types: list(body.support_types),
    sponsor_range: str(body.sponsor_range, 80),
    expertise: str(body.expertise, 400),
    availability: list(body.availability),
    notes: str(body.notes, 1500),
  };

  const errors = {};
  if (!f.name) errors.name = 'Your name is required.';
  if (!isEmail(f.email)) errors.email = 'Enter a valid email address.';
  if (!f.support_types) errors.support_types = 'Choose at least one way you would like to help.';
  if (!f.availability) errors.availability = 'Choose at least one option.';
  if (Object.keys(errors).length) return json(res, 400, { errors });

  const rows = await sql`
    INSERT INTO partners (name, email, organization, role, phone, support_types, sponsor_range, expertise, availability, notes)
    VALUES (${f.name}, ${f.email}, ${f.organization}, ${f.role}, ${f.phone},
            ${f.support_types}, ${f.sponsor_range}, ${f.expertise}, ${f.availability}, ${f.notes})
    RETURNING id`;

  const notice = partnerNoticeEmail(f);
  const thanks = partnerThanksEmail(f);
  await Promise.allSettled([
    sendEmail({ kind: 'partner_notice', to: CONTACT_EMAIL, subject: notice.subject,
      text: notice.text, idempotencyKey: `partner_notice:${rows[0].id}` }),
    sendEmail({ kind: 'partner_thanks', to: f.email, subject: thanks.subject,
      text: thanks.text, idempotencyKey: `partner_thanks:${rows[0].id}` }),
  ]);

  return json(res, 200, { ok: true });
}
