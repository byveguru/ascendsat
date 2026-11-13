/* What the accepted-student portal reads and writes beyond the check-in
 * itself: the demo-day checklist, the organisers' announcement, and the
 * public startup profile. Everything here arrives with migration 014, so
 * every read tolerates a database that does not have it yet. */

import { sql } from './db.js';
import { str } from './http.js';

export const tableMissing = (err) => err && (err.code === '42P01' || err.code === '42703');

/* Read, or a fallback when the migration has not run. */
export async function orMissing(fn, fallback) {
  try { return await fn(); } catch (err) { if (tableMissing(err)) return fallback; throw err; }
}

/* The same list for everyone, in the order they tend to happen. Keys are
 * stored, so a label can be reworded without losing anyone's ticks. */
export const DEMO_CHECKLIST = [
  { key: 'problem', label: 'Can say the problem in one sentence' },
  { key: 'deck', label: 'Pitch deck drafted' },
  { key: 'demo', label: 'Demo works from start to finish' },
  { key: 'script', label: 'Two-minute pitch written' },
  { key: 'feedback', label: 'Got feedback from a mentor' },
  { key: 'rehearse', label: 'Rehearsed out loud, timed, at least twice' },
  { key: 'questions', label: 'Ready for three questions a judge might ask' },
];
const CHECK_KEYS = new Set(DEMO_CHECKLIST.map((c) => c.key));

export const cleanChecklist = (raw) => {
  const out = {};
  if (raw && typeof raw === 'object') for (const k of Object.keys(raw)) if (CHECK_KEYS.has(k) && raw[k]) out[k] = true;
  return out;
};

export async function currentAnnouncement() {
  return orMissing(async () => {
    const r = await sql`SELECT id, body, created_at FROM announcements
                        WHERE cleared_at IS NULL ORDER BY created_at DESC LIMIT 1`;
    return r[0] ? { id: Number(r[0].id), body: r[0].body, createdAt: r[0].created_at } : null;
  }, null);
}

/* ---- startup profiles ------------------------------------------------- */
export const LOGO_MAX = 160000; /* characters of data URL, about 120 KB */
const LOGO_RE = /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/;

export function cleanProfile(body) {
  const p = {
    startupName: str(body.startup_name, 60),
    oneLiner: str(body.one_liner, 120),
    problem: str(body.problem, 400),
    logo: typeof body.logo === 'string' ? body.logo : '',
  };
  if (!p.startupName) return { error: 'Give your startup a name.' };
  if (!p.oneLiner) return { error: 'Write a one-line description.' };
  if (p.logo && (p.logo.length > LOGO_MAX || !LOGO_RE.test(p.logo))) {
    return { error: 'That logo could not be used. Try a PNG or JPG under 5 MB.' };
  }
  /* Public page, written by minors: keep contact details off it. */
  const all = `${p.startupName} ${p.oneLiner} ${p.problem}`;
  if (/[^\s@]+@[^\s@]+\.[a-z]{2,}/i.test(all) || /(\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/.test(all)) {
    return { error: 'Leave email addresses and phone numbers out. This is shown publicly.' };
  }
  return { profile: p };
}

/* Where a profile stands with the organisers. "pending" waits for its first
 * approval, "live" is on the site as written, "live_pending" is on the site
 * with newer changes waiting, "off" was taken down and waits for nothing. */
export function reviewState(r) {
  const live = Boolean(r.published_at);
  const waiting = Boolean(r.submitted_at) && (!live || new Date(r.submitted_at) > new Date(r.published_at));
  if (live) return waiting ? 'live_pending' : 'live';
  return waiting ? 'pending' : 'off';
}

/* The founder's view: their draft, and where it stands. */
export const shapeProfile = (r) => r && ({
  startupName: r.startup_name, oneLiner: r.one_liner, problem: r.problem || '',
  logo: r.logo || null, updatedAt: r.updated_at,
  state: reviewState(r), publishedAt: r.published_at || null,
  editedByOrganiser: Boolean(r.edited_by),
});

/* Cohorts as the public site shows them: "Cohort 1, fall 2026" becomes a
 * folder titled "Cohort 1", subtitled "Fall 2026", at /startups/cohort-1. */
export function cohortFolder(name, dates) {
  const [title, season = ''] = String(name).split(/,\s*/);
  return {
    name, title, season: season.replace(/^./, (c) => c.toUpperCase()),
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    firstSession: dates[0] || null, demoDay: dates[dates.length - 1] || null, sessions: dates.length,
  };
}
