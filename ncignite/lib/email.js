import { sql } from './db.js';
import { TEST_MODE, canSendEmail } from './mode.js';

const API = 'https://api.brevo.com/v3/smtp/email';

export const SITE_URL = (process.env.SITE_URL || 'https://ncignyte.vercel.app').replace(/\/+$/, '');
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'hello@ncignyte.org';
const FROM_EMAIL = process.env.EMAIL_FROM || CONTACT_EMAIL;
const FROM_NAME = process.env.EMAIL_FROM_NAME || 'NC Ignyte';

/* Governed entirely by lib/mode.js. In testing nothing is attempted and each
 * send is recorded as 'skipped', so /admin still shows what would have gone. */
const LIVE = canSendEmail();

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* idempotencyKey makes a double click or a platform retry a no-op. */
/* bcc is for one message to many people: every recipient goes in BCC so no
 * family sees another's address, and `to` falls back to our own contact
 * address because the provider insists on at least one visible recipient. */
export async function sendEmail({ applicationId = null, kind, to, bcc, subject, text, idempotencyKey }) {
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
          textContent: text,
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
