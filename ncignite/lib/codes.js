import { createHash, randomInt, randomBytes } from 'node:crypto';

/* No I, L, O, 0 or 1. A parent reads this off a phone screen and types it. */
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

export function generateCode() {
  let body = '';
  for (let i = 0; i < 6; i++) body += ALPHABET[randomInt(ALPHABET.length)];
  return `NCI-${body}`;
}

/* Accept any case, and ignore the spaces and dashes people add by habit. */
export function normalizeCode(input) {
  const cleaned = String(input || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  const body = cleaned.startsWith('NCI') ? cleaned.slice(3) : cleaned;
  return body ? `NCI-${body}` : '';
}

/* Codes are short, so a plain hash is brute forceable offline. The pepper is
 * what makes a stolen database table useless on its own. */
export function hashCode(code) {
  const pepper = process.env.SESSION_SECRET || '';
  return createHash('sha256').update(`${normalizeCode(code)}:${pepper}`).digest('hex');
}

export const codeHint = (code) => normalizeCode(code).slice(-2);

export function sessionToken() {
  const token = randomBytes(32).toString('base64url');
  return { token, hash: createHash('sha256').update(token).digest('hex') };
}

export const hashToken = (token) =>
  createHash('sha256').update(String(token)).digest('hex');

/* Rolling 24 hours from issue, not a fixed cohort date. A short window keeps
 * a leaked or forwarded code useless within a day; the resend path is what
 * stops that being a dead end for the parent. */
export const CODE_TTL_HOURS = Number(process.env.CODE_TTL_HOURS || 24);

export function codeExpiry(from = new Date()) {
  return new Date(from.getTime() + CODE_TTL_HOURS * 60 * 60 * 1000);
}
