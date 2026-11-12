import { sql } from './db.js';
import { TEST_MODE, canSendEmail } from './mode.js';

const API = 'https://api.brevo.com/v3/smtp/email';

export const SITE_URL = (process.env.SITE_URL || 'https://ncignyte.org').replace(/\/+$/, '');
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'hello@ncignyte.org';
const FROM_EMAIL = process.env.EMAIL_FROM || CONTACT_EMAIL;
const FROM_NAME = process.env.EMAIL_FROM_NAME || 'NC Ignyte';

/* Governed entirely by lib/mode.js. In testing nothing is attempted and each
 * send is recorded as 'skipped', so /admin still shows what would have gone. */
const LIVE = canSendEmail();

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* idempotencyKey makes a double click or a platform retry a no-op. */
/* Kinds whose text is safe to keep for /admin. This is an allowlist on
 * purpose: a body is stored only if its kind is named here, so a new kind, or
 * one that carries a one-time code or a reset link (sign-in codes, parent
 * codes and their reminders, password resets), is never stored by accident.
 * Recipients and subject are recorded for every kind regardless. */
const BODY_KINDS = new Set([
  'custom', 'custom_bcc', 'checkin_invite', 'student_notice', 'consent_parent',
  'consent_student', 'code_expired', 'password_changed', 'digest',
  'partner_notice', 'partner_thanks',
]);
const storesBody = (kind) => BODY_KINDS.has(kind) || /^decision_/.test(kind);

/* What /admin shows. Best effort on purpose: if the columns are not there yet
 * (migration 010 not run) or the write fails, the email still goes. */
async function recordDetails(key, { kind, to, bcc, subject, text }) {
  try {
    const recipients = [...(to ? [].concat(to) : []), ...(bcc || [])]
      .map((e) => String(e).trim().toLowerCase());
    await sql`
      UPDATE email_log SET
        recipients = ${recipients}::text[],
        bcc = ${Boolean(bcc && bcc.length)},
        subject = ${String(subject || '').slice(0, 300)},
        body = ${storesBody(kind) ? String(text || '').slice(0, 20000) : null}
      WHERE idempotency_key = ${key}`;
  } catch (err) {
    console.log(`[email] details not recorded kind=${kind}`);
  }
}

/* Formatting for admin-written email. The admin types light markup
 * (**bold**, *italic*, __underline__, [label](https://link), lines starting
 * with "- " as bullets). Everything is HTML-escaped first, so nothing typed
 * can inject tags; only the markers below become tags. `text` is the same
 * message with the markers stripped, for clients that show plain text. */
const escHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const SAFE_URL = /^(https?:\/\/|mailto:)[^\s]+$/i;
const LINK = /\[([^\]\n]+)\]\(([^)\s]+)\)/g;

export function renderRich(source) {
  const src = String(source || '').replace(/\r\n?/g, '\n');

  const inline = (line) => {
    const links = [];
    let h = escHtml(line).replace(LINK, (m, label, url) => {
      const raw = url.replace(/&amp;/g, '&');
      if (!SAFE_URL.test(raw)) return m;
      links.push(`<a href="${escHtml(raw)}" style="color:#1a56db">${label}</a>`);
      return `\u0000${links.length - 1}\u0000`;
    });
    h = h
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.+?)__/g, '<u>$1</u>')
      .replace(/(?<![*\w])\*(?=\S)(.+?)(?<=\S)\*(?![*\w])/g, '<em>$1</em>');
    return h.replace(/\u0000(\d+)\u0000/g, (m, i) => links[Number(i)]);
  };

  const out = [];
  let list = false;
  for (const line of src.split('\n')) {
    const bullet = /^\s*[-\u2022]\s+(.*)$/.exec(line);
    if (bullet) {
      if (!list) { out.push('<ul style="margin:0 0 1em 1.2em;padding:0">'); list = true; }
      out.push(`<li>${inline(bullet[1])}</li>`);
      continue;
    }
    if (list) { out.push('</ul>'); list = false; }
    out.push(line.trim() ? `<p style="margin:0 0 1em">${inline(line)}</p>` : '');
  }
  if (list) out.push('</ul>');

  const html = `<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.5;color:#1a1a1a">${out.join('')}</div>`;
  const text = src
    .replace(LINK, (m, label, url) => (SAFE_URL.test(url) ? `${label} (${url})` : m))
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/__(.+?)__/g, '$1')
    .replace(/(?<![*\w])\*(?=\S)(.+?)(?<=\S)\*(?![*\w])/g, '$1');
  return { html, text };
}

/* bcc is for one message to many people: every recipient goes in BCC so no
 * family sees another's address, and `to` falls back to our own contact
 * address because the provider insists on at least one visible recipient. */
export async function sendEmail({ applicationId = null, kind, to, bcc, subject, text, html, plain, idempotencyKey }) {
  const key = idempotencyKey || `${kind}:${applicationId}:${to}`;

  const existing = await sql`
    SELECT status FROM email_log WHERE idempotency_key = ${key} LIMIT 1`;
  if (existing.length && existing[0].status !== 'failed') {
    return { status: existing[0].status, deduped: true };
  }

  await sql`
    INSERT INTO email_log (application_id, kind, status, idempotency_key)
    VALUES (${applicationId}, ${kind}, 'queued', ${key})
    ON CONFLICT (idempotency_key) DO UPDATE SET status = 'queued', updated_at = now()`;

  await recordDetails(key, { kind, to, bcc, subject, text });

  if (!LIVE) {
    await sql`UPDATE email_log SET status = 'skipped', updated_at = now()
              WHERE idempotency_key = ${key}`;
    // Never log the address or the body.
    console.log(`[email] skipped kind=${kind} (test mode)`);
    return { status: 'skipped' };
  }

  let lastError = '';
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'content-type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          sender: { email: FROM_EMAIL, name: FROM_NAME },
          to: (to ? (Array.isArray(to) ? to : [to]) : [CONTACT_EMAIL]).map((email) => ({ email })),
          ...(bcc && bcc.length ? { bcc: bcc.map((email) => ({ email })) } : {}),
          subject,
          textContent: plain || text,
          ...(html ? { htmlContent: html } : {}),
        }),
      });
      if (res.ok) {
        await sql`UPDATE email_log SET status = 'sent', attempts = ${attempt}, updated_at = now()
                  WHERE idempotency_key = ${key}`;
        console.log(`[email] sent kind=${kind} attempt=${attempt}`);
        return { status: 'sent' };
      }
      lastError = `http ${res.status}`;
    } catch (err) {
      lastError = err?.name || 'network error';
    }
    if (attempt < 3) await sleep(attempt * 400);
  }

  await sql`UPDATE email_log SET status = 'failed', attempts = 3, error = ${lastError}, updated_at = now()
            WHERE idempotency_key = ${key}`;
  console.log(`[email] failed kind=${kind} error=${lastError}`);
  return { status: 'failed', error: lastError };
}

export const emailIsLive = () => LIVE;

/* In testing the API hands codes back to the caller and the page shows them,
 * which keeps every other step identical to live. Never launch in this state:
 * a student can read their own parent's code. */
export const emailsDisabled = () => TEST_MODE;
