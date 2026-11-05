import { test, expect } from '@playwright/test';

/* Every page a visitor can reach. The account pages are included because a
 * layout break there costs an application. */
const PAGES = [
  ['/', 'home'],
  ['/cohort-2', 'cohort-2'],
  ['/parents', 'parents'],
  ['/sponsors', 'sponsors'],
  ['/apply', 'apply'],
  ['/signup', 'signup'],
  ['/login', 'login'],
  ['/forgot', 'forgot'],
  ['/privacy', 'privacy'],
  ['/code-of-conduct', 'code-of-conduct'],
  ['/parent', 'parent'],
  ['/404', '404'],
];

for (const [path, name] of PAGES) {
  test(`${name} renders`, async ({ page }, info) => {
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));

    const res = await page.goto(path);
    if (name !== '404') expect(res.status(), `${path} should not error`).toBeLessThan(400);

    /* networkidle never settles reliably on a page with webfonts, so wait
     * for the fonts themselves, with a ceiling so one slow load cannot hang
     * the run. */
    await page.evaluate(() => Promise.race([
      document.fonts.ready,
      new Promise((r) => setTimeout(r, 3000)),
    ]));

    /* The bug that shipped today: a nav that wraps to two rows, or any
     * element pushing the page wider than the viewport. */
    const overflow = await page.evaluate(() =>
      document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `${path} scrolls sideways`).toBeLessThanOrEqual(1);

    /* Reveal animations have blanked sections before now. */
    const visibleText = await page.evaluate(() => (document.body.innerText || '').trim().length);
    expect(visibleText, `${path} rendered no text`).toBeGreaterThan(200);

    expect(errors, `${path} threw`).toEqual([]);

    await page.screenshot({
      path: `tests/__screenshots__/${info.project.name}/${name}.png`,
      fullPage: true,
    });
  });
}

test('nav never wraps to two rows', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 3000))]));
  const { rows, hamburger } = await page.evaluate(() => ({
    rows: new Set([...document.querySelectorAll('.nav-list > li')]
      .map((li) => Math.round(li.getBoundingClientRect().top))).size,
    hamburger: getComputedStyle(document.querySelector('.nav-toggle')).display,
  }));
  /* Either the links sit on one row, or the hamburger has taken over. The
   * in-between state is the broken one. */
  expect(rows === 1 || hamburger !== 'none').toBe(true);
});

test('the cohort banner stays put while scrolling', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 3000))]));
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(400);
  const { bannerTop, gap } = await page.evaluate(() => {
    const b = document.querySelector('.cohort-banner').getBoundingClientRect();
    const h = document.querySelector('.site-head').getBoundingClientRect();
    return { bannerTop: Math.round(b.top), gap: Math.round(h.top - b.bottom) };
  });
  expect(bannerTop).toBeLessThanOrEqual(1);
  expect(Math.abs(gap), 'header should sit flush under the banner').toBeLessThanOrEqual(1);
});
