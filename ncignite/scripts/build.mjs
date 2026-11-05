/* Deploy-time templating for a static site.
 *
 * The HTML cannot read environment variables at runtime, so this rewrites the
 * two things that change when the domain goes live: the absolute origin used
 * in canonical, og and JSON-LD tags, and the visible contact addresses.
 *
 * Idempotent: it normalises any known NC Ignyte origin to SITE_URL, so running
 * it twice, or locally, cannot corrupt the source.
 *
 *   SITE_URL        default https://ncignyte.vercel.app
 *   CONTACT_EMAIL   default hello@ncignyte.org
 *   SPONSOR_EMAIL   default partners@ncignyte.org
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = process.cwd();
const SITE_URL = (process.env.SITE_URL || 'https://ncignyte.vercel.app').replace(/\/+$/, '');
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'hello@ncignyte.org';
const SPONSOR_EMAIL = process.env.SPONSOR_EMAIL || 'partners@ncignyte.org';
/* Conduct reports go to the support inbox: one fewer address to watch,
 * and one fewer that can silently bounce when it matters most. */
const CONDUCT_EMAIL = process.env.CONDUCT_EMAIL || 'support@ncignyte.org';

const ORIGINS = /https:\/\/ncignyte\.(?:vercel\.app|org|net)/g;
const CONTACTS = /hello@ncignyte\.(?:org|net)/g;
const SPONSORS = /partners@ncignyte\.(?:org|net)/g;
const CONDUCTS = /support@ncignyte\.(?:org|net)/g;

let changed = 0;
for (const name of readdirSync(ROOT)) {
  if (!['.html', '.xml', '.txt'].includes(extname(name))) continue;
  const path = join(ROOT, name);
  const before = readFileSync(path, 'utf8');
  const after = before
    .replace(ORIGINS, SITE_URL)
    .replace(CONTACTS, CONTACT_EMAIL)
    .replace(SPONSORS, SPONSOR_EMAIL)
    .replace(CONDUCTS, CONDUCT_EMAIL);
  if (after !== before) { writeFileSync(path, after); changed++; console.log('templated', name); }
}
console.log(`build: SITE_URL=${SITE_URL} CONTACT_EMAIL=${CONTACT_EMAIL} (${changed} files rewritten)`);
