import { test, expect } from '@playwright/test';

/* The accessibility rules we have actually broken on this site before, or
 * that the Web Interface Guidelines call out as anti-patterns. Checked on
 * every page rather than spot-checked, because the header and footer are
 * copied into all fifteen of them. */

const PAGES = ['/', '/cohort-2', '/parents', '/sponsors', '/apply', '/signup', '/login', '/forgot', '/privacy', '/parent'];

for (const path of PAGES) {
  test(`${path} meets the basics`, async ({ page }) => {
    await page.goto(path);
    await page.evaluate(() => Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 3000))]));

    const findings = await page.evaluate(() => {
      const out = [];
      const text = (el) => (el.innerText || el.textContent || '').trim();

      /* An icon-only control with no accessible name. */
      document.querySelectorAll('button, a').forEach((el) => {
        const name = text(el) || el.getAttribute('aria-label') || el.getAttribute('title') || '';
        if (!name.trim()) out.push(`unnamed ${el.tagName.toLowerCase()}: ${el.outerHTML.slice(0, 80)}`);
      });

      /* Every input needs a label, a wrapping label, or an aria-label. */
      document.querySelectorAll('input, select, textarea').forEach((el) => {
        if (el.type === 'hidden') return;
        /* The honeypot is hidden from assistive tech on purpose. Demanding a
         * label for something no real user can reach would mean announcing
         * it to exactly the people it is designed not to trap. */
        if (el.closest('[aria-hidden="true"]') || el.getAttribute('aria-hidden') === 'true') return;
        const labelled = el.labels?.length || el.getAttribute('aria-label') ||
          el.getAttribute('aria-labelledby') || el.closest('label');
        if (!labelled) out.push(`unlabelled field: ${el.name || el.id || el.outerHTML.slice(0, 60)}`);
      });

      /* An image with no alt attribute at all. alt="" is a decision; a
       * missing attribute is an oversight. */
      document.querySelectorAll('img').forEach((img) => {
        if (!img.hasAttribute('alt')) out.push(`img without alt: ${img.getAttribute('src')}`);
        if (!img.getAttribute('width') || !img.getAttribute('height')) {
          out.push(`img without dimensions (causes layout shift): ${img.getAttribute('src')}`);
        }
      });

      /* Headings should descend without skipping a level. */
      const levels = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')]
        .map((h) => Number(h.tagName[1]));
      for (let i = 1; i < levels.length; i++) {
        if (levels[i] - levels[i - 1] > 1) out.push(`heading jumps h${levels[i - 1]} to h${levels[i]}`);
      }

      /* Click handlers belong on buttons and links. */
      document.querySelectorAll('div[onclick], span[onclick]').forEach((el) => {
        out.push(`click handler on a ${el.tagName.toLowerCase()}`);
      });

      return out;
    });

    expect(findings, `${path}`).toEqual([]);
  });
}

test('a skip link is the first thing a keyboard reaches', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const first = await page.evaluate(() => {
    const el = document.activeElement;
    return { text: (el.innerText || '').trim(), href: el.getAttribute('href') };
  });
  expect(first.text.toLowerCase()).toContain('skip');
  expect(first.href).toBe('#main');
});

test('focus is visible on every interactive element', async ({ page }) => {
  await page.goto('/');
  /* Walk the first stretch of the tab order and make sure something changes
   * visually. Removing an outline without a replacement is the anti-pattern
   * the guidelines name first. */
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    const visible = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return true;
      const s = getComputedStyle(el);
      const ring = (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0)
        || s.boxShadow !== 'none'
        || s.textDecorationLine !== 'none';
      return ring;
    });
    expect(visible, 'an element took focus with no visible indicator').toBe(true);
  }
});

test('reduced motion is honoured', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.evaluate(() => Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 3000))]));
  /* Content must still be on screen, not stuck mid-animation at opacity 0. */
  const hidden = await page.evaluate(() =>
    [...document.querySelectorAll('section, .week-drop')]
      .filter((el) => parseFloat(getComputedStyle(el).opacity) < 0.9).length);
  expect(hidden, 'sections invisible under reduced motion').toBe(0);
});
