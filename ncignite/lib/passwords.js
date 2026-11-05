import { scrypt as _scrypt, randomBytes, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(_scrypt);

/* Deliberately slow. These are high school students' accounts and the table
 * holds the address their parent's consent code goes to, so a stolen dump
 * must not be crackable at speed. N=16384 costs ~16MB and ~60ms per guess. */
const N = 16384;
const R = 8;
const P = 1;
const KEYLEN = 64;

/* The pepper lives only in the environment, so a leaked database table is
 * useless without it. Same reasoning as lib/codes.js, and the same caveat:
 * rotating SESSION_SECRET invalidates every stored password. */
const peppered = (password) => `${password}:${process.env.SESSION_SECRET || ''}`;

export async function hashPassword(password) {
  const salt = randomBytes(16);
  const key = await scrypt(peppered(password), salt, KEYLEN, { N, r: R, p: P });
  return `scrypt$${N}$${R}$${P}$${salt.toString('base64')}$${key.toString('base64')}`;
}

/* Returns false rather than throwing on a malformed stored value, so one bad
 * row cannot take the login endpoint down. */
export async function verifyPassword(password, stored) {
  if (typeof stored !== 'string' || !stored.startsWith('scrypt$')) return false;
  const [, n, r, p, saltB64, keyB64] = stored.split('$');
  try {
    const salt = Buffer.from(saltB64, 'base64');
    const expected = Buffer.from(keyB64, 'base64');
    const actual = await scrypt(peppered(password), salt, expected.length,
      { N: Number(n), r: Number(r), p: Number(p) });
    return expected.length === actual.length && timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

/* Fed to verifyPassword when no account exists, so an unknown address costs
 * exactly as much work as a wrong password and cannot be told apart by how
 * long the answer takes. */
export const DUMMY_HASH = 'scrypt$16384$8$1$AAAAAAAAAAAAAAAAAAAAAA==$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==';

export const MIN_LENGTH = 10;
export const MAX_LENGTH = 200;

/* Length is the only rule that reliably helps. Character-class rules push
 * people towards Password1! and no further, so we check length, the obvious
 * guesses, and whether they just retyped their own email. */
const OBVIOUS = [
  'password', 'passw0rd', '1234567890', '12345678901', 'qwertyuiop',
  'ncignyte', 'ncignite', 'letmein123', 'iloveyou1', 'abc123456',
];

export function passwordProblem(password, email = '') {
  const value = typeof password === 'string' ? password : '';
  if (value.length < MIN_LENGTH) {
    return `Use at least ${MIN_LENGTH} characters. A short phrase you will remember works well.`;
  }
  if (value.length > MAX_LENGTH) {
    return `Keep it under ${MAX_LENGTH} characters.`;
  }
  if (!value.trim()) {
    return 'Your password cannot be only spaces.';
  }
  const low = value.toLowerCase();
  if (OBVIOUS.some((bad) => low === bad || low.replace(/[^a-z0-9]/g, '') === bad)) {
    return 'That is one of the first passwords anyone would try. Pick something else.';
  }
  const addr = String(email || '').toLowerCase().trim();
  if (addr && (low === addr || (addr.includes('@') && low === addr.split('@')[0]))) {
    return 'Your password cannot be your email address.';
  }
  return '';
}
