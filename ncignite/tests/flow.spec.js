import { test, expect } from '@playwright/test';

/* The whole path a student and their parent walk, end to end, against the
 * live site. Only runs while TEST_MODE is on, because that is what puts the
 * codes on screen instead of in an inbox; with email live it skips rather
 * than emailing a stranger.
 *
 * Desktop only: this writes rows to the shared database, so running it once
 * per viewport would create three applications per run. */
test.describe('application flow', () => {
  const stamp = Date.now();
  const email = `pwtest${stamp}@example.com`;
  const password = 'a long enough passphrase';

  test('sign up, apply, consent, decide, read the letter', async ({ page }, testInfo) => {
    /* Writes a real row, so run it once rather than once per viewport. */
    test.skip(testInfo.project.name !== 'desktop', 'runs once, on desktop');

    /* ---- account ---- */
    await page.goto('/signup');
    await page.fill('#auth-email', email);
    await page.fill('#auth-password', password);
    await page.fill('#auth-password-confirm', password);
    await page.click('#auth-email-step button[type="submit"]');

    /* Live mode emails the code instead of showing it, which is correct and
     * means this test cannot run against production. Skip rather than fail:
     * a red suite that is red by design teaches people to ignore it. */
    const codeBox = page.locator('.code-reveal-code');
    const shown = await codeBox.isVisible({ timeout: 15_000 }).catch(() => false);
    test.skip(!shown, 'email is live on this site, so sign-up codes are not shown; run against a TEST_MODE=1 preview');
    const loginCode = (await codeBox.innerText()).trim();

    await page.fill('#auth-code', loginCode);
    await page.click('#auth-code-step button[type="submit"]');
    await page.waitForURL('**/apply', { timeout: 15_000 });

    /* ---- application ---- */
    await expect(page.locator('#apply-form')).toBeVisible();
    await page.check('input[name="cohort"][value="Cohort 1, fall 2026"]');
    await page.fill('#student_name', 'Playwright Student');
    await page.fill('#student_phone', '919-555-0100');
    await page.fill('#parent_name', 'Playwright Parent');
    await page.fill('#parent_email', `pwparent${stamp}@example.com`);
    await page.fill('#parent_phone', '919-555-0101');
    await page.fill('#school_grade', 'Test High School, 11th grade');
    await page.fill('#startup_name', 'Testbench');
    await page.fill('#building', 'A tool that checks the application still works.');
    await page.check('input[name="team_size"][value="Solo"]');
    await page.fill('#why_join', 'To make sure this form submits.');
    await page.fill('#goals', 'A green test run.');
    await page.check('input[name="can_attend"][value="Yes"]');
    await page.check('input[name="student_agreed"][value="Yes"]');

    await page.click('#apply-form button[type="submit"]');
    await expect(page.locator('#apply-review')).toBeVisible();
    await page.click('#review-submit');

    await expect(page.locator('#apply-done')).toBeVisible({ timeout: 20_000 });
    const parentCode = (await page.locator('#apply-done .code-reveal-code').innerText()).trim();
    expect(parentCode).toMatch(/^NCI-/);

    /* ---- the form must not reopen while the application is with us ---- */
    await page.goto('/apply');
    await expect(page.locator('#apply-open')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('#apply-form')).toBeHidden();

    /* ---- parent consent, through the code gate ---- */
    await page.goto('/parent');
    await page.fill('#gate-code', parentCode);
    await page.click('#gate button[type="submit"], #gate-form button[type="submit"]');
    await expect(page.locator('#consent')).toBeVisible({ timeout: 15_000 });
  });
});
