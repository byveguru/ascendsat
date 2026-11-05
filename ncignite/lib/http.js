/* Small helpers shared by every function. No framework. */

export function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return {};
  try { return JSON.parse(raw); } catch { return {}; }
}

/* Vercel sits behind a proxy, so the socket address is useless for throttling. */
export function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length) return fwd.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

export const str = (v, max = 2000) =>
  typeof v === 'string' ? v.trim().slice(0, max) : '';

export const isEmail = (v) =>
  typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) && v.length <= 254;

/* j***@gmail.com. Shown to a student so they can check the address their
 * parent will receive, without exposing it. */
export function maskEmail(email) {
  const [user = '', domain = ''] = String(email).split('@');
  if (!user || !domain) return 'your parent’s address';
  return `${user[0]}${'*'.repeat(Math.max(user.length - 1, 2))}@${domain}`;
}

/* Honeypot. Real people never fill a field they cannot see. */
export const looksLikeBot = (body) => Boolean(str(body?.website));
