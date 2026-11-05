/* ONE switch for every testing affordance on the site.
 *
 *   TEST_MODE=1  (or unset)  -> testing
 *   TEST_MODE=0              -> live
 *
 * In testing:
 *   - no email leaves the building; each send is logged as 'skipped'
 *   - login and parent codes come back in the API response and are shown
 *     on screen, so the whole flow runs with no inbox
 *   - the maintenance endpoints (reset-limits, purge-test-data) work
 *   - every rate limit is off, so a wrong password or a stale code never
 *     locks you out mid test
 *   - every page shows a banner saying so
 *
 * Live is the exact inverse. Nothing else in the codebase should read an
 * email or testing flag directly; everything goes through here, so the two
 * states cannot drift apart.
 *
 * Default is testing on purpose: a missing variable must never silently
 * start emailing real families.
 */
export const TEST_MODE = process.env.TEST_MODE !== '0';
export const LIVE = !TEST_MODE;

/* Live sending also needs a key. Without one, testing is the only option
 * regardless of what the variable says. */
export const canSendEmail = () => LIVE && Boolean(process.env.BREVO_API_KEY);
