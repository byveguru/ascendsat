# NC Ignyte website

Static site. Five files, no build step, no dependencies.

```
index.html           home, program, mentors, sponsors, apply, FAQ, footer
code-of-conduct.html linked from the FAQ and the footer
styles.css
app.js
configure.sh         fills the remaining placeholders
logo-full.svg        the supplied lockup, unmodified
logo-mark.svg        just the flame, currentColor, for reuse
favicon.svg
```

## Run it locally

```bash
python3 -m http.server 4321 --directory ncignite
```

Then open http://localhost:4321

## Host it

Drag the folder onto Netlify Drop, or push it and point Vercel, Cloudflare Pages,
or GitHub Pages at it. There is nothing to build. Set the publish directory to
this folder and the output directory to the same folder.

## Forms

Both forms are Google Forms and are already wired in. There is no form on the
site itself, so nothing to connect and nothing to maintain.

| Button | Goes to |
|---|---|
| Apply now, and every `Apply` in the nav, banner, and hero | `forms.gle/Q5qUbh9tKfhbp27AA` |
| Apply to help (mentors, judges, alumni mentors) | `forms.gle/cKD62Ehh2g4JRBZ27` |
| Partner with us (sponsors) | `forms.gle/cKD62Ehh2g4JRBZ27` |

Both open in a new tab, with a screen-reader-only "opens in a new tab" note.

The Apply section lists what the student form asks, so applicants know what to
have ready before they leave the page. If you change the questions in the
Google Form, update that list in `index.html` to match.

The sponsors and sponsorship-benefit copy still names
`sponsors@ncignyte.net` as an email fallback. That address does not exist
until the domain and Cloudflare Email Routing are set up.

## Set up email on ncignyte.net

Cloudflare Email Routing, free, forwarding only.

1. Add `ncignyte.net` to Cloudflare and point the registrar at Cloudflare's
   nameservers.
2. In the dashboard, open Email, then Email Routing, and let it add the MX and
   TXT records for you.
3. Add three destination addresses and verify each one by clicking the link
   Cloudflare emails:
   - `hello@ncignyte.net` to whoever handles general questions
   - `sponsors@ncignyte.net` to whoever handles sponsors
   - `conduct@ncignyte.net` to a **different adult**, ideally not a student.
     Conduct reports should not land in the same inbox as everything else.
4. Add a catch-all rule so nothing sent to a typo address silently disappears.

Caveat worth knowing before you commit: routing forwards mail in, it does not
send mail out. Replies will come from your personal Gmail unless you add Gmail
"Send mail as" with an SMTP relay. If that looks bad to parents or sponsors,
Zoho Mail's free plan gives real sending mailboxes for 5 users at no cost, and
you can switch to it later without touching this site.

## Placeholders you still need to fill in

| Where | Placeholder | What to put there |
|---|---|---|
| `index.html` footer | `#SOCIAL_INSTAGRAM` | Instagram URL. `--instagram ncignite`, or delete the list item |
| `index.html` footer | `#SOCIAL_LINKEDIN` | LinkedIn URL. `--linkedin nc-ignite`, or delete the list item |
| `index.html` head | `og:image` at `https://ncignyte.net/og.png` | A 1200x630 share image saved as `og.png` in this folder |

Domain and all three email addresses are already set to ncignyte.net.

Dates are confirmed and live across the site: six Fridays, 6:00 to 8:00 PM,
January 15, 22, 29 and February 5, 12, 19, 2027, Research Triangle Park area.
The venue is deliberately not published; the site says it is sent by email and
text once an application is in.

Content still marked "to be announced" on purpose, update when confirmed:

- Mentors and judges, in the mentors and judges section.
- Sponsors, in the sponsors section. The section has no logo row yet, add one when you have logos.
- The list of AI tools, in the FAQ.
- Second and third place prize amounts, if you want to name them.

Check before publishing:

- Every mentor has agreed to be named publicly and linked on the site.
- Namish Gurram, Parth Rathod, and Vibhav Perumandla have no LinkedIn button
  because no profile was supplied. To add one later, open `index.html`, find
  their `<li class="person">`, and copy the `<a class="li-btn">` block from a
  mentor who has one, changing the `href` and the `aria-label`.

## Notes on how it is built

- One page with anchored sections, plus a separate code of conduct page.
- Semantic landmarks, a skip link, labeled form fields with inline errors,
  visible focus rings, 48px minimum tap targets, and `aria-current` on the nav.
- The six weeks and the FAQ are native `<details>`, so they open and close with
  no JavaScript at all. With JavaScript the height is spring driven instead.

### Colour

Light mode only. There is no dark variant, by design, because the supplied
logo is a light-mode asset.

Everything derives from the logo: `#f2f0eb` ground, `#0b0e14` ink, `#ff7a1a`
ember. The one rule worth knowing before you touch a colour:

| Token | On the ground | Use it for |
|---|---|---|
| `--ink` `#0b0e14` | 16.96:1 | body, headings |
| `--ink-soft` `#3c4150` | 8.93:1 | secondary copy |
| `--ink-mute` `#5c6472` | 5.24:1 | captions, hints |
| `--ember-ink` `#a34708` | 5.33:1 | ember used **as text** |
| `--ember-deep` `#d2600c` | 3.40:1 | large display text, icon strokes |
| `--ember` `#ff7a1a` | **2.29:1** | **fill only** - never text on paper |

The logo orange fails contrast as body text, so it never appears as one.
Buttons are ember fill with ink text, which is 7.41:1 and matches the logo's
own pairing. White on ember would be 2.61:1, so it is not used.

The wordmark is the one exception: `NC` stays logo orange because logotypes
are exempt, and because changing it would stop being your logo.

### Type

Pairing taken from ycombinator.com: **Source Serif 4** for display headings
and figures, **Outfit** for body, UI, and the wordmark. Source Serif 4 is
variable on an optical size axis, so `font-optical-sizing: auto` actually
adjusts the letterforms with size.

Tracking is size specific: about -0.025em on the hero, -0.02em on section
heads, 0 on body, slight positive on captions.

Your logo file calls for Poppins 800 on the wordmark. Outfit 800 is already
loaded for the UI and is close enough in the geometric-sans family that a
third webfont was not worth it. If you want exact logo fidelity, add
`Poppins:wght@800` to the font URL and switch `.brand-name` to it.

### Artwork

No photography and no stock art. The hero artwork is your own logo mark,
enlarged, over concentric rules. `logo-mark.svg` is the flame on its own
using `currentColor`, so it can be dropped anywhere and takes the colour of
its container.

### Local development

Use the no-cache dev server, not `python3 -m http.server`:

```bash
python3 scripts/ncignite-devserver.py 4321
```

Plain `http.server` lets the browser hold on to `app.js` across reloads, which
makes edits look like they are not applying.

### Weight

No images, no frameworks, no trackers. HTML, CSS, and JS total about 80 KB
uncompressed, roughly 19 KB gzipped, plus two variable webfonts.

## Browser tests

Playwright drives a real browser against the deployed site, at three sizes:
desktop (1280), tablet (820) and an iPhone 13. It replaces checking pages by
hand, and exists mainly to catch the kind of regression that is invisible in a
diff: a nav that wraps to two rows, a section that renders blank, a page that
scrolls sideways on a phone.

```bash
npm test                 # everything, all three sizes
npm run test:pages       # renders, layout, screenshots
npm run test:a11y        # labels, headings, focus, skip link, reduced motion
npm run test:flow        # sign up, apply, parent consent, end to end
npm run test:desktop     # one size, when you just want it quick
```

`BASE_URL` points the suite somewhere else:

```bash
BASE_URL=https://ncignyte-abc123.vercel.app npm test
```

**What each file covers**

- `tests/pages.spec.js` loads every public page, fails on a sideways scroll,
  an empty render or an uncaught error, and writes a full-page screenshot per
  page per size to `tests/__screenshots__/`. Those are committed nowhere and
  are there to eyeball, or to diff between runs.
- `tests/a11y.spec.js` checks the rules we have broken before: unnamed
  buttons and links, unlabelled fields, images missing `alt` or dimensions,
  headings that skip a level, click handlers on a `div`. Plus the skip link,
  a visible focus ring on everything in the tab order, and that nothing is
  stuck invisible under `prefers-reduced-motion`.
- `tests/flow.spec.js` walks a real application through the live site: create
  an Ignyte account, submit the form, confirm the form does not reopen while
  the application is pending, then pass the parent code gate. It only runs
  with `TEST_MODE=1`, because that is what puts the codes on screen instead
  of in an inbox, and it runs once rather than once per size so it does not
  write three applications per run.

**It writes to the real database.** The flow test creates an account and an
application at `@example.com`. Clear them out afterwards:

```bash
DATABASE_URL=... npm run test:clean
```

That script is scoped to `@example.com`, the reserved test domain, so it
cannot touch a real family's row.

**A note on the phone project.** It runs Chromium at an iPhone viewport, not
WebKit. It checks the responsive layout, which is what actually breaks; it is
not Safari engine coverage. Add a `webkit` project and run
`npx playwright install webkit` if you ever want that.
