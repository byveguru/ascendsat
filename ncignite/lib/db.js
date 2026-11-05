import postgres from 'postgres';
import { TEST_MODE } from './mode.js';

if (!process.env.DATABASE_URL) {
  console.warn('DATABASE_URL is not set. Database calls will fail.');
}

/* Supabase. Use the TRANSACTION POOLER string (port 6543), not the direct
 * connection: a serverless function opens a connection per invocation and
 * would exhaust the direct limit under any load.
 *
 * pgbouncer in transaction mode cannot hold prepared statements, hence
 * prepare: false. max: 1 because each invocation is its own process. */
export const sql = postgres(process.env.DATABASE_URL || '', {
  ssl: 'require',
  prepare: false,
  max: 1,
  idle_timeout: 20,
  connect_timeout: 10,
});

/* One generic throttle for codes, logins and form posts. Keyed by a caller
 * supplied bucket so the same table can protect very different endpoints. */
export async function throttle(bucket, { limit, windowMs, lockMs }) {
  /* Testing means running the same flow over and over, often getting it
   * wrong on purpose, so the lockouts only get in the way. Nothing is
   * recorded either: a hit counted now must not lock the door on the day
   * the site goes live. Flipping TEST_MODE to 0 restores every limit
   * exactly as written at its call site. */
  if (TEST_MODE) return { allowed: true };

  const now = Date.now();
  const rows = await sql`
    INSERT INTO rate_limits (bucket, hits, window_start)
    VALUES (${bucket}, 1, now())
    ON CONFLICT (bucket) DO UPDATE SET
      hits = CASE
        WHEN rate_limits.window_start < now() - make_interval(secs => ${windowMs / 1000})
        THEN 1 ELSE rate_limits.hits + 1 END,
      window_start = CASE
        WHEN rate_limits.window_start < now() - make_interval(secs => ${windowMs / 1000})
        THEN now() ELSE rate_limits.window_start END
    RETURNING hits, locked_until`;

  const row = rows[0];
  if (row.locked_until && new Date(row.locked_until).getTime() > now) {
    return { allowed: false, lockedUntil: row.locked_until };
  }
  if (row.hits > limit) {
    const until = new Date(now + lockMs).toISOString();
    await sql`UPDATE rate_limits SET locked_until = ${until}, hits = 0, window_start = now()
              WHERE bucket = ${bucket}`;
    return { allowed: false, lockedUntil: until };
  }
  return { allowed: true };
}
