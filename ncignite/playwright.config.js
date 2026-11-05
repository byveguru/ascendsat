import { defineConfig, devices } from '@playwright/test';

/* Runs against the deployed site by default, because that is what families
 * will actually load. Point BASE_URL at a preview deployment to check one
 * before it is promoted. */
const BASE_URL = process.env.BASE_URL || 'https://ncignyte.vercel.app';

export default defineConfig({
  testDir: './tests',
  /* The suite hits a live site and a shared database, so parallel files
   * would race each other over the same test account. */
  workers: 1,
  fullyParallel: false,
  reporter: [['list']],
  timeout: 30_000,
  expect: { timeout: 8_000 },
  /* The site is static; a page that needs longer than this is the finding. */
  globalTimeout: 10 * 60_000,
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } } },
    { name: 'tablet',  use: { ...devices['Desktop Chrome'], viewport: { width: 820, height: 1000 } } },
    /* Chromium at an iPhone's viewport, not WebKit. This checks the
     * responsive layout, which is what breaks; it is not Safari coverage. */
    { name: 'phone', use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 }, isMobile: false, hasTouch: true, deviceScaleFactor: 3 } },
  ],
});
