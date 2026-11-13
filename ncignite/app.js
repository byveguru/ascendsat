/* NC Ignite - interaction layer.
 *
 * Built against the apple-design skill. The load-bearing ideas:
 *   §1  feedback on pointer-down, never on release
 *   §2  1:1 pointer tracking with pointer capture, respecting the grab offset
 *   §3  every motion interruptible, animating from the live presentation value
 *   §4  springs parameterised as damping ratio + response, not duration
 *   §5  release velocity handed straight into the spring
 *   §6  momentum projection decides the landing point, not the release point
 *   §7  enter and exit along the same path, anchored to the trigger
 *   §9  rubber-banding at boundaries instead of a hard stop
 *  §11  transform and opacity only, will-change where motion is imminent
 *  §14  reduced motion degrades to a cross fade, never to nothing
 */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };

  /* ===================================================================== §4
   * Spring
   *
   * Damping ratio and response, the two parameters Apple exposes instead of
   * mass/stiffness/damping. Interruptible by construction: retargeting keeps
   * the current value and velocity, so a grab mid-flight never jumps.
   * ===================================================================== */
  function Spring(opts) {
    this.value = opts.from || 0;
    this.target = this.value;
    this.velocity = 0;
    this.damping = opts.damping != null ? opts.damping : 1;
    this.response = opts.response || 0.4;
    this.onUpdate = opts.onUpdate;
    this.onRest = opts.onRest || null;
    this._raf = 0;
    this._last = 0;
  }

  // Jump with no animation. Used to seed a gesture from the live value.
  Spring.prototype.set = function (v) {
    this.cancel();
    this.value = this.target = v;
    this.velocity = 0;
    this.onUpdate(v);
  };

  // §5: `velocity` is the release velocity, in units per second.
  Spring.prototype.to = function (target, opts) {
    opts = opts || {};
    this.target = target;
    if (opts.velocity != null) this.velocity = opts.velocity;
    if (opts.damping != null) this.damping = opts.damping;
    if (opts.response != null) this.response = opts.response;
    if (opts.onRest !== undefined) this.onRest = opts.onRest;

    if (reduce.matches) {           // §14: no spring, no overshoot
      this.cancel();
      this.value = target;
      this.velocity = 0;
      this.onUpdate(target);
      if (this.onRest) this.onRest();
      return;
    }
    this._start();
  };

  Spring.prototype._start = function () {
    if (this._raf) return;          // already running: retarget only
    var self = this;
    this._last = performance.now();

    this._raf = requestAnimationFrame(function step(now) {
      var dt = Math.min((now - self._last) / 1000, 1 / 30);
      self._last = now;

      // Fixed substeps keep the integration stable at low frame rates.
      var steps = Math.max(1, Math.ceil(dt * 240));
      var h = dt / steps;
      var omega = (2 * Math.PI) / self.response;
      var z = self.damping;

      for (var i = 0; i < steps; i++) {
        var accel = -omega * omega * (self.value - self.target)
                  - 2 * z * omega * self.velocity;
        self.velocity += accel * h;
        self.value += self.velocity * h;
      }

      self.onUpdate(self.value);

      if (Math.abs(self.value - self.target) < 0.05 && Math.abs(self.velocity) < 0.05) {
        self.value = self.target;
        self.velocity = 0;
        self.onUpdate(self.value);
        self._raf = 0;
        if (self.onRest) self.onRest();
        return;
      }
      self._raf = requestAnimationFrame(step);
    });
  };

  Spring.prototype.cancel = function () {
    if (this._raf) { cancelAnimationFrame(this._raf); this._raf = 0; }
  };

  /* ===================================================================== §6
   * Momentum projection. Apple's exponential-decay form from the Designing
   * Fluid Interfaces sample code, not the v^2/(2a) textbook version.
   * ===================================================================== */
  function project(velocity, decelerationRate) {
    var d = decelerationRate || 0.998;
    return (velocity / 1000) * d / (1 - d);
  }

  /* ===================================================================== §9
   * Progressive resistance past a boundary.
   * ===================================================================== */
  function rubberband(overshoot, dimension, constant) {
    var c = constant || 0.55;
    return (overshoot * dimension * c) / (dimension + c * Math.abs(overshoot));
  }

  /* Velocity from a short sample history, not from the last two points. */
  function VelocityTracker() { this.samples = []; }
  VelocityTracker.prototype.add = function (value) {
    this.samples.push({ v: value, t: performance.now() });
    if (this.samples.length > 6) this.samples.shift();
  };
  VelocityTracker.prototype.reset = function () { this.samples.length = 0; };
  VelocityTracker.prototype.velocity = function () {
    var s = this.samples;
    if (s.length < 2) return 0;
    var last = s[s.length - 1];
    var first = s[0];
    // Ignore a stale history: a finger held still before release means v = 0.
    for (var i = s.length - 1; i >= 0; i--) {
      if (last.t - s[i].t > 100) { first = s[i]; break; }
      first = s[i];
    }
    var dt = (last.t - first.t) / 1000;
    return dt > 0.001 ? (last.v - first.v) / dt : 0;
  };

  /* =====================================================================
   * Navigation sheet
   *
   * §7: the sheet emerges from the toggle and dismisses back toward it, so
   * transform-origin sits on the trigger and the dismiss direction is up.
   * §2: dragging tracks the pointer 1:1 via pointer capture.
   * §9: dragging the other way rubber-bands instead of stopping dead.
   * ===================================================================== */
  var nav = document.querySelector('.nav');
  var toggle = nav && nav.querySelector('.nav-toggle');
  var sheet = document.getElementById('nav-list');

  if (nav && toggle && sheet) (function () {
    var open = false;
    var height = 0;
    var dragging = false;
    var committed = false;
    var pointerId = null;
    var startY = 0;
    var startOffset = 0;
    var tracker = new VelocityTracker();

    // The sheet only exists below the nav breakpoint. Above it the same <ul>
    // is an ordinary horizontal row, so it must carry no inline transform.
    var mqSheet = window.matchMedia('(max-width: 55.99em)');

    // offset: 0 is fully open, -height is dismissed toward the trigger.
    var spring = new Spring({
      damping: 0.8, response: 0.3,   // sheet values from the skill's table
      onUpdate: render
    });

    function render(y) {
      if (!mqSheet.matches) return;
      var p = clamp(1 + y / height, 0, 1);       // 1 open, 0 dismissed
      // §12 materialize: scale and opacity move together, so the surface
      // reads as arriving rather than cross fading in place.
      var scale = 0.96 + 0.04 * p;
      sheet.style.transform = 'translate3d(0,' + y.toFixed(2) + 'px,0) scale(' + scale.toFixed(4) + ')';
      sheet.style.opacity = p;
      sheet.style.pointerEvents = p > 0.01 ? 'auto' : 'none';
    }

    function measure() {
      height = sheet.offsetHeight || 240;
    }

    // `force` matters when a drag ends without changing the open state: the
    // sheet is sitting at the finger's offset and still has to settle home.
    function setOpen(next, velocity, force) {
      if (next === open && !force) return;
      open = next;
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');

      if (open) {
        nav.classList.add('is-open');
        sheet.style.willChange = 'transform, opacity';   // §11
        measure();
        if (!force && spring.value === 0 && spring.velocity === 0) spring.set(-height);
        spring.to(0, { velocity: velocity || 0, onRest: function () {
          sheet.style.willChange = '';
        }});
      } else {
        measure();
        spring.to(-height, { velocity: velocity || 0, onRest: function () {
          nav.classList.remove('is-open');
          sheet.style.willChange = '';
        }});
      }
    }

    // Seed the closed state without animating on first paint, and strip the
    // inline styles again whenever the layout stops being a sheet.
    function syncMode() {
      if (mqSheet.matches) {
        measure();
        if (!open) spring.set(-height);
      } else {
        spring.cancel();
        open = false;
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        sheet.style.cssText = '';
      }
    }

    syncMode();
    nav.classList.remove('is-open');

    if (mqSheet.addEventListener) mqSheet.addEventListener('change', syncMode);
    else if (mqSheet.addListener) mqSheet.addListener(syncMode);

    toggle.addEventListener('click', function () { setOpen(!open); });

    /* ---- drag to dismiss ------------------------------------------- §2 */
    sheet.addEventListener('pointerdown', function (e) {
      if (!open || e.button !== 0 || !mqSheet.matches) return;
      dragging = true;
      committed = false;
      pointerId = e.pointerId;
      startY = e.clientY;
      // §2: grab from wherever the sheet currently sits, mid flight included,
      // so taking hold of it never snaps it under the finger.
      startOffset = spring.value;
      tracker.reset();
      tracker.add(startOffset);
      spring.cancel();                 // §3: take over from the live value
      sheet.style.willChange = 'transform, opacity';
    });

    sheet.addEventListener('pointermove', function (e) {
      if (!dragging || e.pointerId !== pointerId) return;
      var dy = e.clientY - startY;

      // §10: ~10px of hysteresis before committing, so taps still land.
      if (!committed) {
        if (Math.abs(dy) < 10) return;
        committed = true;
        // Capture can throw if the pointer is already gone. Tracking still
        // works without it; it only guarantees events outside the bounds.
        try { sheet.setPointerCapture(pointerId); } catch (err) {}
      }

      // Up toward the trigger tracks 1:1. Past the open position is a
      // boundary, so it resists progressively instead of following. §9
      var raw = startOffset + dy;
      var offset = raw <= 0 ? raw : rubberband(raw, height);
      tracker.add(offset);
      render(offset);
      spring.value = offset;
      e.preventDefault();
    });

    function endDrag(e) {
      if (!dragging || (e && e.pointerId !== pointerId)) return;
      dragging = false;
      try {
        if (sheet.hasPointerCapture && sheet.hasPointerCapture(pointerId)) {
          sheet.releasePointerCapture(pointerId);
        }
      } catch (err) {}
      if (!committed) { pointerId = null; return; }   // it was a tap
      committed = false;
      pointerId = null;

      var v = tracker.velocity();
      // §6: decide from where the gesture is going, not where it stopped.
      var projected = spring.value + project(v);
      var dismiss = projected < -height * 0.3;

      // §5: the release velocity goes straight into the spring, so there is
      // no seam between the finger and the animation.
      setOpen(!dismiss, v, true);
    }

    sheet.addEventListener('pointerup', endDrag);
    sheet.addEventListener('pointercancel', endDrag);

    sheet.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && open) { setOpen(false); toggle.focus(); }
    });

    document.addEventListener('pointerdown', function (e) {
      if (open && !nav.contains(e.target)) setOpen(false);
    });

    window.addEventListener('resize', function () {
      if (!mqSheet.matches) return;
      measure();
      if (!open) spring.set(-height);
    }, { passive: true });
  })();

  /* The five Fridays are plain <details>: they open in place, the keyboard
   * works for free, and the whole schedule reads with no JavaScript at all.
   * Nothing to wire up here. */

  /* =====================================================================
   * Countdown to whatever is next.
   *
   * The milestones live in the markup beside the rest of the dates, so a
   * date change is one edit in one file. It walks them in order and counts
   * to the first one that has not passed: the first Friday, then demo day,
   * then the next cohort. After the last one it renders nothing.
   *
   * Counted in calendar days, not elapsed milliseconds. "How many days
   * until November 6" is a question about dates: the answer must not change
   * because someone opened the page at 11pm rather than 1am the same day,
   * and `(target - now) / 86400000` does exactly that.
   *
   * It redraws just after local midnight rather than on an hourly timer, so
   * the number is never stale and nothing runs in between. A laptop that
   * slept through the rollover catches up when the tab is looked at again.
   * ===================================================================== */
  (function () {
    var el = document.querySelector('[data-countdown]');
    if (!el) return;

    var milestones;
    try { milestones = JSON.parse(el.getAttribute('data-countdown')); }
    catch (err) { return; }
    if (!Array.isArray(milestones) || !milestones.length) return;

    /* Built from the parts, not Date.parse. new Date('2026-11-06') is UTC
     * midnight, which is the evening of the 5th in North Carolina, and the
     * whole count would be a day out. */
    milestones = milestones.map(function (m) {
      var p = String(m.date).split('-').map(Number);
      return { when: new Date(p[0], p[1] - 1, p[2]), to: m.to, today: m.today };
    }).filter(function (m) {
      return !isNaN(m.when);
    }).sort(function (a, b) { return a.when - b.when; });

    var DAY = 86400000;
    function midnightToday() {
      var n = new Date();
      return new Date(n.getFullYear(), n.getMonth(), n.getDate());
    }

    /* Round, not floor: the span between two local midnights is 23 or 25
     * hours across a daylight saving change, and November 1 2026 is one. */
    function daysTo(m) {
      return Math.round((m.when - midnightToday()) / DAY);
    }

    function next() {
      for (var i = 0; i < milestones.length; i++) {
        if (daysTo(milestones[i]) >= 0) return milestones[i];
      }
      return null;
    }

    function tick() {
      var m = next();
      if (!m) { el.textContent = ''; return; }   /* .countdown:empty is hidden */
      var days = daysTo(m);
      if (days > 1) el.textContent = days + ' days to ' + m.to;
      else if (days === 1) el.textContent = 'One day to ' + m.to;
      else el.textContent = m.today;
      schedule();
    }

    var timer = null;
    function schedule() {
      clearTimeout(timer);
      if (!next()) return;          /* nothing left to count */
      /* A few seconds past midnight, so a clock that is slightly fast does
       * not fire while it is still yesterday. */
      var ms = midnightToday().getTime() + DAY + 5000 - Date.now();
      timer = setTimeout(tick, Math.max(ms, 1000));
    }

    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) tick();
    });

    tick();
  })();

  /* =====================================================================
   * The updates signup.
   * ===================================================================== */
  (function () {
    var form = document.querySelector('.signup');
    if (!form) return;
    var status = form.querySelector('.signup-status');
    form.addEventListener('submit', function (e) {
      var action = form.getAttribute('action') || '';
      if (!window.fetch) return;   /* no fetch: let the form post normally */
      e.preventDefault();
      var btn = form.querySelector('button');
      btn.disabled = true;
      status.className = 'signup-status';
      status.textContent = 'Sending…';
      /* Our own endpoint reads JSON, not form encoding. */
      fetch(action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: form.querySelector('#signup-email').value.trim(),
          website: form.website ? form.website.value : '',
        }),
      })
        .then(function (r) {
          if (!r.ok) throw new Error();
          form.reset();
          status.className = 'signup-status ok';
          status.textContent = 'You are on the list.';
        })
        .catch(function () {
          status.className = 'signup-status bad';
          status.textContent = 'Something went wrong. Write to hello@ncignyte.org.';
        })
        .finally(function () { btn.disabled = false; });
    });
  })();

  /* ----------------------------------------- sticky banner, sticky header
   * The banner stays at the top, and the header sits directly under it. Its
   * height is not a constant: the text wraps at narrow widths and the font
   * size is clamped, so measure it and let CSS do the rest. */
  (function () {
    var banner = document.querySelector('.cohort-banner');
    if (!banner) return;
    var root = document.documentElement;

    function measure() {
      root.style.setProperty('--banner-h', banner.offsetHeight + 'px');
    }
    measure();

    if ('ResizeObserver' in window) {
      new ResizeObserver(measure).observe(banner);
    } else {
      window.addEventListener('resize', measure, { passive: true });
    }
    /* The bar's text reflows once the webfont swaps in. */
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  })();

  /* =====================================================================
   * Accounts: the nav label, the sign-in page, and the status page.
   * ===================================================================== */
  const api = async (url, options) => {
    const res = await fetch(url, {
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    let data = {};
    try { data = await res.json(); } catch (err) { /* non-JSON error page */ }
    return { ok: res.ok, status: res.status, data };
  };

  /* One "who is this" per page load, shared by everything that needs it. */
  let meCache = null;
  const me = (fresh) => {
    if (!meCache || fresh) meCache = api('/api/auth?action=me').then(({ data }) => data || {}).catch(() => ({}));
    return meCache;
  };

  /* Cohort 1 is on hold, so the banner says so and nothing here overrides it.
   *
   * This used to advance the wording by date ("underway", "demo day is
   * today", "has wrapped"). While the cohort is paused those are all wrong,
   * and because today is already past the old start date it would have
   * replaced "on hold" with "underway" on every page load. Restore this block
   * if the cohort restarts, with the real dates. */

  /* ---- the accepted-student portal ---------------------------------------
   * Once a student has a place, the public site is no longer theirs to
   * wander: every page except these sends them to /portal until they sign
   * out. The head of each page reads the same hint before anything paints,
   * so the landing page does not flash first; this is the check that
   * decides. Keep the list in step with the snippet in every page's head. */
  const PORTAL_OK = /^\/(portal|account|checkin|startups(?:\/[a-z0-9-]+)?|startup|privacy|code-of-conduct|parent|admin|reset|404)(\.html)?\/?$/;
  const portalHint = (on) => {
    try { if (on) localStorage.setItem('ig-portal', '1'); else localStorage.removeItem('ig-portal'); } catch (err) { /* private mode */ }
  };
  const signOut = async () => {
    await api('/api/auth?action=logout', { method: 'POST' });
    portalHint(false);
    try { localStorage.removeItem('ig-team'); } catch (err) { /* private mode */ }
    window.location.href = '/';
  };
  /* After any sign in, accepted students land in the portal. */
  const afterSignIn = async (fallback, portalPath) => {
    const d = await me(true);
    portalHint(Boolean(d.accepted));
    window.location.href = d.accepted ? (portalPath || '/portal') : fallback;
  };
  if (!PORTAL_OK.test(window.location.pathname)) {
    me().then((d) => {
      const accepted = Boolean(d.signedIn && d.accepted);
      portalHint(accepted);
      if (accepted) window.location.replace('/portal');
    });
  }
  document.querySelectorAll('[data-signout]').forEach((b) => b.addEventListener('click', signOut));
  /* The Team menu item, on portal pages that do not load the team
   * themselves. Remembered from the last page that did. */
  const showTeamNav = (on) => {
    try { if (on) localStorage.setItem('ig-team', '1'); else localStorage.removeItem('ig-team'); } catch (err) { /* private mode */ }
    document.querySelectorAll('[data-portal-team]').forEach((li) => { li.hidden = !on; });
  };
  try { if (localStorage.getItem('ig-team') === '1') showTeamNav(true); } catch (err) { /* private mode */ }

  document.querySelectorAll('[data-portal-tab]').forEach((a) => {
    const here = window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '');
    if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
  });

  /* A signed-in student should see where to go, not an invitation to sign
   * in again. The nav is static HTML, so this adjusts it after load. */
  (function () {
    const signup = document.querySelector('.nav-signup');
    if (!signup) return;
    me().then((data) => {
      /* Signed in, so "Sign up" is the wrong door. Point at their own page. */
      if (data && data.signedIn) {
        signup.textContent = data.accepted ? 'My portal' : 'My application';
        signup.href = data.accepted ? '/portal' : '/status';
      }
    }).catch(() => {});
  })();

  /* Email delivery is off, so the code appears on screen. Loud on purpose:
   * in this mode anyone who can reach the page can obtain the code, which
   * includes a student obtaining their own parent's. */
  function showCode(container, code, who) {
    const box = document.createElement('div');
    box.className = 'code-reveal';
    box.innerHTML =
      '<p class="code-reveal-head">Email is turned off</p>' +
      `<p>Nothing was sent. ${who} code is:</p>` +
      `<p class="code-reveal-code">${code}</p>` +
      '<p class="code-reveal-note">Temporary, until email is connected. Anyone who can see this screen can use this code.</p>';
    container.appendChild(box);
  }

  /* A link, shown the same way as a code, when email delivery is off. */
  function showLink(container, href, label) {
    const box = document.createElement('div');
    box.className = 'code-reveal';
    box.innerHTML =
      '<p class="code-reveal-head">Email is turned off</p>' +
      `<p>Nothing was sent. ${label}</p>` +
      `<p class="code-reveal-link"><a href="${href}">${href}</a></p>` +
      '<p class="code-reveal-note">Temporary, until email is connected. Anyone who can see this screen can use this link.</p>';
    container.appendChild(box);
  }

  /* Any checkbox whose id ends in -show reveals the password fields in its
   * own form. Typing a long password blind is the main reason people pick a
   * short one. */
  (function () {
    document.querySelectorAll('input[type="checkbox"][id$="-show"]').forEach((box) => {
      box.addEventListener('change', () => {
        const form = box.closest('form') || box.closest('.auth-card');
        if (!form) return;
        form.querySelectorAll('input[type="password"], input[data-pw]').forEach((input) => {
          input.dataset.pw = '1';
          input.type = box.checked ? 'text' : 'password';
        });
      });
    });
  })();

  /* The server decides; this only saves a round trip and keeps the wording
   * identical on both sides. */
  const MIN_PASSWORD = 10;
  function passwordProblem(value, confirm, email) {
    if (!value || value.length < MIN_PASSWORD) {
      return `Use at least ${MIN_PASSWORD} characters. A short phrase you will remember works well.`;
    }
    if (confirm !== null && value !== confirm) return 'The two passwords do not match.';
    if (email && value.toLowerCase() === String(email).toLowerCase()) {
      return 'Your password cannot be your email address.';
    }
    return '';
  }

  /* ---- Ignyte account: sign up and log in ------------------------------
   * Two pages, deliberately different words, one mechanism. The server
   * behaves identically for both so neither can be used to discover whether
   * an address already has an account. */
  (function () {
    const emailStep = document.getElementById('auth-email-step');
    if (!emailStep) return;
    const codeStep = document.getElementById('auth-code-step');
    const msg = document.getElementById('auth-msg');
    const sent = document.getElementById('auth-sent');
    const emailInput = document.getElementById('auth-email');
    const codeInput = document.getElementById('auth-code');
    const isSignup = emailStep.dataset.mode === 'signup';

    const say = (text, kind) => { msg.className = `form-msg ${kind || ''}`; msg.textContent = text; };

    emailStep.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      if (!email) return say('Enter your email address.', 'bad');

      /* Only the sign up page asks for one. The code path on the log in page
       * sends no password at all. */
      const pwInput = document.getElementById('auth-password');
      const pwConfirm = document.getElementById('auth-password-confirm');
      let password;
      if (pwInput) {
        password = pwInput.value;
        const problem = passwordProblem(password, pwConfirm ? pwConfirm.value : null, email);
        if (problem) return say(problem, 'bad');
      }

      const btn = emailStep.querySelector('button');
      btn.disabled = true;
      say('Sending…');
      const payload = { email, website: emailStep.website.value };
      if (password !== undefined) {
        payload.password = password;
        payload.password_confirm = pwConfirm ? pwConfirm.value : password;
      }
      const { data } = await api('/api/auth?action=request', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      btn.disabled = false;
      if (data.error) return say(data.error, 'bad');

      if (data.emailDisabled && data.code) {
        sent.textContent = 'Email delivery is not connected yet, so your code is below.';
        showCode(sent.parentNode, data.code, isSignup ? 'Your account' : 'Your log in');
        codeInput.value = data.code;
      } else {
        sent.textContent = (data.message || 'Check your email for a six digit code.')
          + (isSignup ? ' If you already had an Ignyte account, this code logs you into it.' : '');
      }
      emailStep.hidden = true;
      codeStep.hidden = false;
      say('');
      codeInput.focus();
    });

    codeStep.addEventListener('submit', async (e) => {
      e.preventDefault();
      const code = codeInput.value.trim();
      if (code.length !== 6) return say('Enter the six digit code from your email.', 'bad');
      const btn = codeStep.querySelector('button');
      btn.disabled = true;
      say('Checking…');
      const { data } = await api('/api/auth?action=verify', {
        method: 'POST',
        body: JSON.stringify({ email: emailInput.value.trim(), code }),
      });
      btn.disabled = false;
      if (data.error) return say(data.error, 'bad');
      /* Signing up with an address that already has a password logs them in
       * and keeps the old one. Say so rather than letting them walk away
       * believing the password they just typed is the live one. */
      if (data.existingAccount) {
        say('You already had an Ignyte account, so we logged you in and kept your existing password.');
        setTimeout(() => afterSignIn('/status'), 2200);
        return;
      }
      /* A new account goes straight to the application, which is the only
       * reason to create one. A returning student goes to their status.
       * An old account with no password is sent to set one. */
      if (!isSignup && data.hasPassword === false) {
        afterSignIn('/status#password', '/account');
        return;
      }
      if (isSignup) window.location.href = '/apply';
      else afterSignIn('/status');
    });

    document.getElementById('auth-restart').addEventListener('click', () => {
      codeStep.hidden = true;
      emailStep.hidden = false;
      codeInput.value = '';
      say('');
      emailInput.focus();
    });
  })();

  /* ---- log in with a password ------------------------------------------ */
  (function () {
    const form = document.getElementById('login-form');
    if (!form) return;
    const msg = document.getElementById('login-msg');
    const say = (text, kind) => { msg.className = `form-msg ${kind || ''}`; msg.textContent = text; };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;
      if (!email) return say('Enter your email address.', 'bad');
      if (!password) return say('Enter your password.', 'bad');

      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      say('Checking…');
      const { data } = await api('/api/auth?action=login', {
        method: 'POST',
        body: JSON.stringify({ email, password, website: form.website.value }),
      });
      btn.disabled = false;
      if (data.error) return say(data.error, 'bad');
      afterSignIn('/status');
    });

    /* The code path stays one click away, because an account made before
     * passwords existed has no password to type. */
    const toggle = document.getElementById('use-code');
    const path = document.getElementById('code-path');
    if (toggle && path) {
      toggle.addEventListener('click', () => {
        path.hidden = false;
        toggle.hidden = true;
        const field = document.getElementById('auth-email');
        if (field) {
          field.value = document.getElementById('login-email').value.trim();
          field.focus();
        }
      });
    }
  })();

  /* ---- forgot password --------------------------------------------------- */
  (function () {
    const form = document.getElementById('forgot-form');
    if (!form) return;
    const msg = document.getElementById('forgot-msg');
    const say = (text, kind) => { msg.className = `form-msg ${kind || ''}`; msg.textContent = text; };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('forgot-email').value.trim();
      if (!email) return say('Enter your email address.', 'bad');
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      say('Sending…');
      const { data } = await api('/api/auth?action=forgot', {
        method: 'POST',
        body: JSON.stringify({ email, website: form.website.value }),
      });
      btn.disabled = false;
      if (data.error) return say(data.error, 'bad');
      say(data.message || 'Check your email.');
      if (data.emailDisabled && data.link) {
        showLink(form.parentNode, data.link, 'Your reset link is:');
      }
      form.hidden = true;
    });
  })();

  /* ---- set a new password from a reset link ------------------------------ */
  (function () {
    const form = document.getElementById('reset-form');
    if (!form) return;
    const msg = document.getElementById('reset-msg');
    const say = (text, kind) => { msg.className = `form-msg ${kind || ''}`; msg.textContent = text; };
    const token = new URLSearchParams(window.location.search).get('token') || '';

    if (!token) {
      document.getElementById('reset-card').hidden = true;
      document.getElementById('reset-nolink').hidden = false;
      return;
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const password = document.getElementById('reset-password').value;
      const confirm = document.getElementById('reset-confirm').value;
      const problem = passwordProblem(password, confirm, '');
      if (problem) return say(problem, 'bad');

      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      say('Saving…');
      const { data } = await api('/api/auth?action=reset', {
        method: 'POST',
        body: JSON.stringify({ token, password, password_confirm: confirm }),
      });
      btn.disabled = false;
      if (data.expired) {
        document.getElementById('reset-card').hidden = true;
        document.getElementById('reset-nolink').hidden = false;
        return;
      }
      if (data.error) return say(data.error, 'bad');
      say('Password saved. Taking you to your application.');
      setTimeout(() => afterSignIn('/status'), 900);
    });
  })();

  /* ---- status ---------------------------------------------------------- */
  (function () {
    const loading = document.getElementById('status-loading');
    if (!loading) return;
    const show = (id) => {
      ['status-loading', 'status-signedout', 'status-none', 'status-found']
        .forEach((x) => { document.getElementById(x).hidden = x !== id; });
    };

    api('/api/status').then(({ status, data }) => {
      if (status === 401 || data.signInRequired) return show('status-signedout');

      const signedAs = document.getElementById('signed-as');
      if (data.signedInAs) {
        signedAs.hidden = false;
        signedAs.textContent = `Signed in as ${data.signedInAs}. `;
        const signoutBtn = document.createElement('button');
        signoutBtn.type = 'button';
        signoutBtn.id = 'signout';
        signoutBtn.textContent = 'Sign out';
        signedAs.append(signoutBtn);
        signoutBtn.addEventListener('click', signOut);
      }

      if (!data.found) return show('status-none');

      document.getElementById('status-label').textContent = data.label;
      document.getElementById('status-detail').textContent = data.detail;
      if (data.appliedAt) {
        document.getElementById('status-applied').textContent =
          `Applied ${new Date(data.appliedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.`;
      }

      /* Accepted students have a weekly check-in waiting for them. */
      if (data.status === 'accepted') document.getElementById('checkin-link').hidden = false;

      /* A decision was made, so show the words rather than a status pill. */
      if (data.letter) {
        document.getElementById('status-letter').hidden = false;
        document.getElementById('letter-meta').textContent =
          `Sent ${new Date(data.decidedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}` +
          ', to you and your parent or guardian, by email as well.';
        /* textContent, so a letter is read as a letter and can never carry
         * markup into the page. The CSS keeps the line breaks. */
        document.getElementById('letter-body').textContent = data.letter;
      }

      if (data.canResend) {
        const box = document.getElementById('status-resend');
        box.hidden = false;
        document.getElementById('status-parent').textContent =
          `We sent a code to ${data.maskedParentEmail}. Codes last 24 hours, so if it has gone stale you can send a fresh one.`;
        const btn = document.getElementById('resend-btn');
        const rmsg = document.getElementById('resend-msg');
        btn.addEventListener('click', async () => {
          btn.disabled = true;
          rmsg.className = 'form-msg';
          rmsg.textContent = 'Sending…';
          const out = await api('/api/status?action=resend', { method: 'POST' });
          btn.disabled = false;
          if (out.data.error) { rmsg.className = 'form-msg bad'; rmsg.textContent = out.data.error; return; }
          if (out.data.emailDisabled && out.data.parentCode) {
            rmsg.className = 'form-msg';
            rmsg.textContent = '';
            showCode(rmsg.parentNode, out.data.parentCode, "Your parent's");
          } else {
            rmsg.className = 'form-msg ok';
            rmsg.textContent = `A new code is on its way to ${out.data.maskedParentEmail}. It lasts 24 hours.`;
          }
        });
      }
      show('status-found');
    }).catch(() => show('status-signedout'));
  })();

  /* ---- portal pages --------------------------------------------------------
   * Home, Your startup and Account share this. Each renders only the parts
   * its page has. Two reads: /api/status (who they are, sessions, checklist,
   * announcement, profile, letter) and, on home only, /api/checkin (their
   * weeks, their team's, and organisers' replies). */
  (function () {
    const loading = document.getElementById('portal-loading');
    if (!loading) return;
    const $ = (id) => document.getElementById(id);
    const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    /* Dates arrive as "2026-11-13". Read them as calendar days, not instants,
     * or a viewer west of New York sees the day before. */
    const day = (iso, opts) => new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', opts);
    const long = (iso) => day(iso, { weekday: 'long', month: 'long', day: 'numeric' });
    const short = (iso) => day(iso, { weekday: 'short', month: 'short', day: 'numeric' });
    const when = (t) => new Date(t).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    /* Today in New York, as YYYY-MM-DD (en-CA formats it that way). */
    const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(new Date());
    const daysBetween = (a, b) => Math.round((Date.parse(`${b}T12:00:00Z`) - Date.parse(`${a}T12:00:00Z`)) / 86400000);
    const store = {
      get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
      set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } },
    };
    const isHome = Boolean($('week-goals'));
    let ci = null;   /* the check-in payload, once loaded */

    /* ---- next session, and the five as a strip ------------------------- */
    function renderNext(p) {
      const sessions = p.sessions || [];
      /* On a session day the session is still next until the day is over. */
      const nextIdx = sessions.findIndex((s) => s.date >= today);
      const next = nextIdx >= 0 ? sessions[nextIdx] : null;
      if (next) {
        $('next-when').textContent = `${next.date === today ? 'Today' : long(next.date)}, 6 to 8 PM`;
        $('next-detail').textContent = next.demoDay ? 'Demo day' : `Session ${nextIdx + 1} of ${sessions.length}`;
      } else {
        $('next-when').textContent = 'Your cohort is complete';
        $('next-detail').textContent = 'Thank you for building with us.';
      }
      $('session-strip').innerHTML = sessions.map((s, i) => {
        const state = s.date < today ? 'is-past' : (i === nextIdx ? 'is-next' : '');
        const label = s.demoDay ? 'Demo' : `S${i + 1}`;
        const full = `${s.demoDay ? 'Demo day' : 'Session ' + (i + 1)}, ${long(s.date)}` +
          (s.checkinDue ? `. Check-in due ${long(s.checkinDue)}` : '');
        return `<li class="${state}" title="${esc(full)}"><span class="ss-label">${label}</span>` +
          `<span class="ss-date">${esc(day(s.date, { month: 'short', day: 'numeric' }))}</span>` +
          `<span class="sr-only">${esc(full)}</span></li>`;
      }).join('');
      /* The calendar file is Cohort 1's dates only. */
      $('schedule-ics').hidden = !/^Cohort 1\b/.test(p.cohort || '');
      if (!p.checkinOpen) {
        $('next-checkin').hidden = true;
        $('next-detail').textContent += '. Check-ins open once an organiser starts yours.';
      }
    }

    /* ---- this week ------------------------------------------------------ */
    function renderWeek() {
      if (!ci || !ci.weeks || !ci.weeks.some((w) => w.started)) return;
      $('portal-week').hidden = false;

      /* One dot per week: on time, late, missing, open now, or not yet. */
      $('week-dots').innerHTML = ci.weeks.map((w) => {
        const st = !w.started ? 'upcoming' : !w.closed ? 'open' : w.missing ? 'missing' : w.late ? 'late' : 'ontime';
        const word = { upcoming: 'not open yet', open: 'open now', missing: 'nothing written', late: 'written late', ontime: 'on time' }[st];
        return `<li class="dot dot-${st}" title="${esc(w.week)}: ${word}"><span class="sr-only">${esc(w.week)}: ${word}</span></li>`;
      }).join('');

      const closed = ci.weeks.filter((w) => w.closed);
      const onTime = closed.filter((w) => !w.missing && !w.late).length;
      const open = ci.weeks.find((w) => w.weekStart === ci.openWeek);
      const parts = [];
      if (open) parts.push(`Due ${short(open.dueDate)}, 11:59 PM`);
      if (closed.length) parts.push(`${onTime} of ${closed.length} on time`);
      $('week-streak').textContent = parts.join(' · ');

      const list = $('week-goals');
      if (!open) { list.innerHTML = '<li class="hint">No check-in is open right now.</li>'; return; }
      const done = open.goals.filter((g) => g.done).length;
      $('week-head').textContent = open.goals.length ? `This week · ${done} of ${open.goals.length} done` : 'This week';
      list.innerHTML = open.goals.length
        ? open.goals.map((g, i) => `<li><label class="goal-tick${g.done ? ' is-done' : ''}">` +
            `<input type="checkbox" data-goal="${i}"${g.done ? ' checked' : ''}> <span>${esc(g.text)}</span></label></li>`).join('')
        : '<li class="hint">No goals yet. Open your check-in and write two or three.</li>';
    }

    /* A tick saves itself, exactly like ticking on the check-in page. */
    if (isHome) $('week-goals').addEventListener('change', async (e) => {
      const box = e.target.closest('input[data-goal]');
      if (!box || !ci) return;
      const open = ci.weeks.find((w) => w.weekStart === ci.openWeek);
      if (!open) return;
      const goals = open.goals.map((g, i) => ({ text: g.text, done: i === Number(box.dataset.goal) ? box.checked : Boolean(g.done) }));
      box.disabled = true;
      const msg = $('week-msg');
      const { data } = await api('/api/checkin', {
        method: 'POST', body: JSON.stringify({ week_start: open.weekStart, goals, help_needed: open.helpNeeded || '' }),
      });
      box.disabled = false;
      if (data.error) { box.checked = !box.checked; msg.className = 'form-msg bad'; msg.textContent = data.error; return; }
      msg.textContent = '';
      open.goals = goals;
      renderWeek();
    });

    /* ---- organisers' replies: the newest shown, the rest folded --------- */
    function renderReplies() {
      if (!ci || !ci.weeks) return;
      const out = [];
      ci.weeks.forEach((w) => { if (w.reply) out.push({ who: 'You asked', w }); });
      if (ci.team) ci.team.weeks.forEach((w) => { if (w.reply) out.push({ who: `Team ${ci.team.name} asked`, w }); });
      if (!out.length) return;
      out.sort((a, b) => String(b.w.reply.at).localeCompare(String(a.w.reply.at)));
      const item = (r) => `<p class="reply-ask"><span>${esc(r.who)}, ${esc(r.w.week)}:</span> ${esc(r.w.helpNeeded || '(since removed)')}</p>` +
        `<p class="reply-text">${esc(r.w.reply.text)}</p><p class="hint">${esc(when(r.w.reply.at))}</p>`;
      $('replies-latest').innerHTML = `<div class="reply-one">${item(out[0])}</div>`;
      const rest = out.slice(1);
      $('replies-more').hidden = !rest.length;
      $('replies-more-label').textContent = `${rest.length} earlier repl${rest.length === 1 ? 'y' : 'ies'}`;
      $('replies-list').innerHTML = rest.map((r) => `<li>${item(r)}</li>`).join('');
      $('portal-replies').hidden = false;
    }

    /* ---- team ------------------------------------------------------------ */
    function renderTeam(fallbackTeam) {
      const t = ci && ci.team ? ci.team : fallbackTeam;
      showTeamNav(Boolean(t));
      if (!t) return;
      $('team').hidden = false;
      $('team-head').textContent = `Team ${t.name}`;
      $('team-members').innerHTML = t.members.map((m) => `<li>${esc(m)}</li>`).join('');
      if (!ci || !ci.team || !ci.openWeek) return;
      const gw = ci.team.weeks.find((w) => w.weekStart === ci.openWeek);
      const gGoals = gw ? gw.goals : [];
      const goalsHtml = (goals) => goals.length
        ? `<ul class="team-goals">${goals.map((g) => `<li class="${g.done ? 'is-done' : ''}"><span aria-hidden="true">${g.done ? '✓' : '○'}</span> ${esc(g.text)}<span class="sr-only">${g.done ? ' (done)' : ' (not done)'}</span></li>`).join('')}</ul>`
        : '<p class="hint">Nothing yet this week.</p>';
      $('team-summary').textContent = gGoals.length
        ? `Group goals · ${gGoals.filter((g) => g.done).length} of ${gGoals.length} done`
        : 'This week';
      $('team-week').innerHTML =
        `<h3 class="team-sub">Group goals</h3>${goalsHtml(gGoals)}` +
        (gw && gw.savedBy ? `<p class="hint">Last saved by ${esc(gw.savedBy)}${gw.updatedAt ? ', ' + esc(when(gw.updatedAt)) : ''}.</p>` : '') +
        (ci.team.teammates || []).map((m) => `<h3 class="team-sub">${esc(m.name)}</h3>${goalsHtml(m.weeks[ci.openWeek] || [])}`).join('');
      $('team-more').hidden = false;
    }

    /* ---- demo day ------------------------------------------------------ */
    function renderDemo(p) {
      const demo = (p.sessions || []).find((s) => s.demoDay);
      if (demo) {
        const n = daysBetween(today, demo.date);
        $('demo-countdown').textContent = n > 1 ? `${n} days` : n === 1 ? 'Tomorrow' : n === 0 ? 'Today' : 'Done';
        $('demo-date').textContent = short(demo.date);
      }
      const items = p.demoChecklist || [];
      const draw = () => {
        const d = items.filter((c) => c.done).length;
        $('demo-progress').textContent = `Checklist · ${d} of ${items.length} ready`;
        $('demo-bar').style.width = items.length ? `${Math.round((d / items.length) * 100)}%` : '0';
        $('demo-checklist').innerHTML = items.map((c) => `<li><label class="goal-tick${c.done ? ' is-done' : ''}">` +
          `<input type="checkbox" data-check="${esc(c.key)}"${c.done ? ' checked' : ''}> <span>${esc(c.label)}</span></label></li>`).join('');
      };
      draw();
      $('demo-checklist').addEventListener('change', async (e) => {
        const box = e.target.closest('input[data-check]');
        if (!box) return;
        const item = items.find((c) => c.key === box.dataset.check);
        item.done = box.checked;
        const checklist = Object.fromEntries(items.filter((c) => c.done).map((c) => [c.key, true]));
        const { data } = await api('/api/status?action=checklist', { method: 'POST', body: JSON.stringify({ checklist }) });
        const msg = $('demo-msg');
        if (data.error) { item.done = !item.done; msg.className = 'form-msg bad'; msg.textContent = data.error; draw(); return; }
        msg.textContent = '';
        draw();
      });
    }

    /* ---- announcement -------------------------------------------------- */
    function renderAnnouncement(a) {
      if (!a || store.get('ig-dismissed') === String(a.id)) return;
      $('announce-text').textContent = a.body;
      $('announce-when').textContent = when(a.createdAt);
      $('portal-announce').hidden = false;
      $('announce-dismiss').addEventListener('click', () => {
        store.set('ig-dismissed', String(a.id));
        $('portal-announce').hidden = true;
      });
    }

    /* ---- the public profile -------------------------------------------- */
    function renderProfile(p, startupFromApplication) {
      const form = $('profile-form');
      let logo = p ? p.logo : null;
      let logoChanged = false;
      const showLogo = () => {
        $('pf-logo-img').hidden = !logo; $('pf-logo-none').hidden = Boolean(logo);
        if (logo) $('pf-logo-img').src = logo;
        $('pf-logo-remove').hidden = !logo;
      };
      const live = (prof) => {
        const el = $('profile-live');
        el.hidden = !prof;
        $('pf-remove').hidden = !prof;
        if (!prof) return;
        const page = '<a href="/startups" target="_blank" rel="noopener">the startups page</a>';
        el.className = `portal-live state-${prof.state}`;
        el.innerHTML = {
          pending: `<strong>Waiting for review.</strong> An organiser will check it before it goes on ${page}.`,
          live_pending: `<strong>Live, with changes waiting.</strong> The approved version is on ${page}; your newest edits go up once an organiser approves them.`,
          live: `<strong>Live</strong> on ${page}.` + (prof.editedByOrganiser ? ' An organiser made small edits before publishing; what you see below is what is live.' : ''),
          off: `<strong>Not on the website.</strong> An organiser took it down. Edit it and send it again if you want it back up.`,
        }[prof.state] || '';
      };
      $('pf-name').value = p ? p.startupName : (startupFromApplication || '');
      $('pf-one').value = p ? p.oneLiner : '';
      $('pf-problem').value = p ? p.problem : '';
      $('pf-save').textContent = p ? 'Send changes for review' : 'Send for review';
      wireCounters(form);
      ['pf-one', 'pf-problem'].forEach((id) => $(id).dispatchEvent(new Event('input')));
      showLogo(); live(p);

      /* Shrunk in the browser to at most 256px on the long side, so what is
       * stored is small whatever size the student picks. */
      $('pf-logo').addEventListener('change', () => {
        const file = $('pf-logo').files[0];
        const msg = $('pf-msg');
        if (!file) return;
        if (!/^image\/(png|jpeg|webp)$/.test(file.type)) { msg.className = 'form-msg bad'; msg.textContent = 'Use a PNG, JPG or WebP image.'; return; }
        if (file.size > 5 * 1024 * 1024) { msg.className = 'form-msg bad'; msg.textContent = 'That image is over 5 MB.'; return; }
        const img = new Image();
        img.onload = () => {
          const scale = Math.min(1, 256 / Math.max(img.width, img.height));
          const c = document.createElement('canvas');
          c.width = Math.round(img.width * scale); c.height = Math.round(img.height * scale);
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
          let url = c.toDataURL('image/webp', 0.85);
          if (!url.startsWith('data:image/webp')) url = c.toDataURL('image/png');
          URL.revokeObjectURL(img.src);
          if (url.length > 160000) { msg.className = 'form-msg bad'; msg.textContent = 'That logo is too detailed to store. Try a simpler image.'; return; }
          logo = url; logoChanged = true; msg.textContent = ''; showLogo();
        };
        img.onerror = () => { msg.className = 'form-msg bad'; msg.textContent = 'That image could not be read.'; };
        img.src = URL.createObjectURL(file);
      });
      $('pf-logo-remove').addEventListener('click', () => { logo = null; logoChanged = true; $('pf-logo').value = ''; showLogo(); });

      $('pf-remove').addEventListener('click', async () => {
        const ok = await askConfirm({
          title: 'Delete your profile?',
          body: 'It is deleted, and comes off the startups page straight away if it was there. You can write a new one any time.',
          confirmLabel: 'Delete it',
        });
        if (!ok) return;
        const msg = $('pf-msg');
        const { data } = await api('/api/status?action=profile', { method: 'POST', body: JSON.stringify({ remove: true }) });
        if (data.error) { msg.className = 'form-msg bad'; msg.textContent = data.error; return; }
        msg.className = 'form-msg ok'; msg.textContent = 'Deleted.';
        $('pf-save').textContent = 'Send for review';
        live(null);
      });

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const msg = $('pf-msg');
        const body = {
          startup_name: $('pf-name').value, one_liner: $('pf-one').value, problem: $('pf-problem').value,
          logo: logoChanged ? (logo || '') : '', keep_logo: !logoChanged,
        };
        if (!body.startup_name.trim()) { msg.className = 'form-msg bad'; msg.textContent = 'Give your startup a name.'; return; }
        if (!body.one_liner.trim()) { msg.className = 'form-msg bad'; msg.textContent = 'Write a one-line description.'; return; }
        $('pf-save').disabled = true;
        msg.className = 'form-msg'; msg.textContent = 'Saving…';
        const { data } = await api('/api/status?action=profile', { method: 'POST', body: JSON.stringify(body) });
        $('pf-save').disabled = false;
        if (data.error) { msg.className = 'form-msg bad'; msg.textContent = data.error; return; }
        logoChanged = false;
        msg.className = 'form-msg ok';
        msg.textContent = data.profile.state === 'live_pending'
          ? 'Sent. Your live profile stays as it is until an organiser approves these changes.'
          : 'Sent for review. It goes on the website once an organiser approves it.';
        $('pf-save').textContent = 'Send changes for review';
        live(data.profile);
      });
    }

    Promise.all([
      api('/api/status'),
      isHome ? api('/api/checkin').catch(() => ({ data: {} })) : Promise.resolve({ data: {} }),
    ]).then(([{ status, data }, ciRes]) => {
      if (status === 401 || data.signInRequired) { portalHint(false); window.location.replace('/login'); return; }
      if (!data.portal) { portalHint(false); window.location.replace('/status'); return; }
      portalHint(true);
      const p = data.portal;
      ci = ciRes && ciRes.data && Array.isArray(ciRes.data.weeks) ? ciRes.data : null;

      if (isHome) {
        $('portal-hello').textContent = `Welcome, ${String(p.name || '').trim().split(/\s+/)[0] || 'founder'}`;
        $('portal-cohort').textContent = [p.cohort, p.startup].filter(Boolean).join(' · ');
        renderAnnouncement(p.announcement);
        renderNext(p);
        renderWeek();
        renderDemo(p);
        renderTeam(p.team);
        renderReplies();
      } else {
        showTeamNav(Boolean(p.team));
      }
      if ($('profile-form')) renderProfile(p.profile, p.startup);
      if ($('portal-letter') && data.letter) {
        $('portal-letter').hidden = false;
        $('letter-meta').textContent = data.decidedAt
          ? `Sent ${new Date(data.decidedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.` : '';
        $('letter-body').textContent = data.letter;
      }

      if (data.signedInAs) { $('portal-signed').hidden = false; $('portal-signed').textContent = `Signed in as ${data.signedInAs}.`; }
      loading.hidden = true;
      $('portal-ready').hidden = false;
    }).catch(() => { loading.querySelector('p').textContent = 'Could not load your portal. Check your connection and reload.'; });
  })();

  /* ---- the public startups page --------------------------------------------
   * /startups shows one folder per cohort; /startups/<cohort> opens that
   * cohort's companies. One page and one read serve both. */
  (function () {
    const grid = document.getElementById('startup-grid');
    if (!grid) return;
    const $ = (id) => document.getElementById(id);
    const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const day = (iso, opts) => new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', opts);
    const md = (iso) => day(iso, { month: 'short', day: 'numeric' });
    const year = (iso) => day(iso, { year: 'numeric' });
    const range = (c) => `${md(c.firstSession)} to ${md(c.demoDay)}, ${year(c.demoDay)}`;
    const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(new Date());
    const loading = $('startups-loading');
    const m = window.location.pathname.match(/^\/startups\/([a-z0-9-]+)\/?$/);
    const slug = m ? m[1] : null;

    const card = (s) => `<li class="startup-card">` +
      (s.logo ? `<img class="profile-logo" src="${esc(s.logo)}" alt="${esc(s.startupName)} logo" loading="lazy">`
              : '<span class="profile-logo profile-logo-none" aria-hidden="true"></span>') +
      `<h2>${esc(s.startupName)}</h2><p class="startup-one">${esc(s.oneLiner)}</p>` +
      (s.problem ? `<p class="startup-problem">${esc(s.problem)}</p>` : '') + '</li>';

    api('/api/status?action=showcase').then(({ data }) => {
      const cohorts = (data && data.cohorts) || [];
      const startups = (data && data.startups) || [];

      if (!slug) {
        /* The folders. Logos from the cohort peek out of each one. */
        $('cohort-folders').innerHTML = cohorts.map((c) => {
          const mine = startups.filter((s) => s.cohort === c.name);
          const upcoming = c.firstSession > today;
          const status = c.count
            ? `${c.count} startup${c.count === 1 ? '' : 's'}`
            : (upcoming ? `Starts ${md(c.firstSession)}` : 'Profiles coming soon');
          const logos = mine.filter((s) => s.logo).slice(0, 4)
            .map((s) => `<img src="${esc(s.logo)}" alt="" loading="lazy">`).join('');
          return `<li><a class="cohort-folder" href="/startups/${esc(c.slug)}">` +
            `<span class="cf-tab" aria-hidden="true"></span>` +
            `<span class="cf-title">${esc(c.title)}</span>` +
            `<span class="cf-season">${esc(c.season)}</span>` +
            `<span class="cf-dates">${esc(range(c))}</span>` +
            (logos ? `<span class="cf-logos" aria-hidden="true">${logos}</span>` : '') +
            `<span class="cf-count">${esc(status)} <span aria-hidden="true">→</span></span></a></li>`;
        }).join('');
        loading.hidden = true;
        $('cohort-folders').hidden = false;
        return;
      }

      const c = cohorts.find((x) => x.slug === slug);
      $('su-crumbs').hidden = false;
      $('su-back').innerHTML = '<a href="/startups">Back to all cohorts</a>';
      if (!c) {
        $('su-title').textContent = 'No cohort here';
        $('su-lede').textContent = 'That link does not match a cohort. Pick one from the list.';
        loading.hidden = true;
        return;
      }
      document.title = `${c.title}, ${c.season} startups | NC Ignyte`;
      $('su-title').textContent = `${c.title} · ${c.season}`;
      $('su-lede').textContent = `${c.sessions} sessions, ${range(c)}. Every company below was built by North Carolina high school students in this cohort, and shown with their organisers' approval. We leave founders' names off on purpose.`;
      const mine = startups.filter((s) => s.cohort === c.name);
      grid.innerHTML = mine.map(card).join('');
      grid.hidden = !mine.length;
      loading.hidden = Boolean(mine.length);
      loading.textContent = c.firstSession > today
        ? `This cohort starts ${md(c.firstSession)}. Its startups appear here as founders write their profiles.`
        : 'Founders are writing their profiles now. Check back soon.';
    }).catch(() => { loading.textContent = 'Could not load the startups. Try again in a moment.'; });
  })();

  /* ---- account: set or change the password ------------------------------- */
  (function () {
    const card = document.getElementById('account-card');
    if (!card) return;
    const form = document.getElementById('pw-form');
    const msg = document.getElementById('pw-msg');
    const currentField = document.getElementById('pw-current-field');
    const currentInput = document.getElementById('pw-current');
    const submit = document.getElementById('pw-submit');
    const prompt = document.getElementById('pw-prompt');
    const say = (text, kind) => { msg.className = `form-msg ${kind || ''}`; msg.textContent = text; };
    let hasPassword = true;
    let email = '';

    me().then((data) => {
      if (!data || !data.signedIn) return;
      card.hidden = false;
      email = data.email || '';
      hasPassword = Boolean(data.hasPassword);
      /* Nothing to prove when there is no password yet, so do not ask for
       * one. Asking would strand every account made before passwords. */
      currentField.hidden = !hasPassword;
      currentInput.required = hasPassword;
      prompt.hidden = hasPassword;
      submit.textContent = hasPassword ? 'Change password' : 'Set a password';
      if (!hasPassword || window.location.hash === '#password' || window.location.hash === '#account') {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }).catch(() => {});

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const password = document.getElementById('pw-new').value;
      const confirm = document.getElementById('pw-confirm').value;
      if (hasPassword && !currentInput.value) {
        /* Says where to go, not just what is missing. Somebody who cannot
         * fill this in is usually here because they have forgotten it. */
        return say('Enter your current password, or use the reset link above if you have forgotten it.', 'bad');
      }
      const problem = passwordProblem(password, confirm, email);
      if (problem) return say(problem, 'bad');

      submit.disabled = true;
      say('Saving…');
      const { data } = await api('/api/auth?action=set-password', {
        method: 'POST',
        body: JSON.stringify({
          current_password: currentInput.value,
          password,
          password_confirm: confirm,
        }),
      });
      submit.disabled = false;
      if (data.error) {
        return say(data.error === 'Your current password is not right.'
          ? 'Your current password is not right. If you have forgotten it, use the reset link above.'
          : data.error, 'bad');
      }
      form.reset();
      hasPassword = true;
      currentField.hidden = false;
      currentInput.required = true;
      prompt.hidden = true;
      submit.textContent = 'Change password';
      say(data.message || 'Password saved.', 'ok');
    });
  })();

  /* ---- weekly check-in ---------------------------------------------------
   * Goals after the session, ticks through the week, what you need help with
   * before the next one. It submits itself at 11:59 PM the night before, so
   * nothing here has a "submit for good" button: saving is the interaction. */
  (function () {
    const loading = document.getElementById('ci-loading');
    if (!loading) return;

    const form = document.getElementById('ci-form');
    const listEl = document.getElementById('goal-list');
    const helpEl = document.getElementById('ci-help');
    const msg = document.getElementById('ci-msg');
    /* One form, two check-ins. "me" is the student's own; "team" is the shared
     * one their organiser set up. Anyone on the team can edit the shared one,
     * so every team save says which version it started from and the server
     * refuses it if a teammate got there first. */
    let state = null;
    let scope = 'me';

    /* This section has to carry its own: the one the admin page uses lives
     * inside that section and does not exist here. Leaving it out made the
     * week history throw, which this page reports as "log in". */
    const esc = (v) => String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    const show = (id) => {
      ['ci-loading', 'ci-signedout', 'ci-notstarted', 'ci-open', 'ci-closed']
        .forEach((x) => { document.getElementById(x).hidden = x !== id; });
    };
    const say = (text, kind) => { msg.className = `form-msg ${kind || ''}`; msg.textContent = text; };

    const weeksOf = (which) => (which === 'team' ? (state.team ? state.team.weeks : []) : state.weeks);
    const current = () => (state ? weeksOf(scope).find((w) => w.weekStart === state.openWeek) || null : null);

    function goalRow(goal) {
      const li = document.createElement('li');
      li.className = 'goal';
      const id = 'goal-' + Math.random().toString(36).slice(2, 9);
      li.innerHTML =
        `<input type="checkbox" id="${id}" class="goal-done"${goal.done ? ' checked' : ''}>` +
        `<label class="sr-only" for="${id}">Finished</label>` +
        '<input type="text" class="goal-text" maxlength="300" placeholder="One thing you will get done">' +
        '<button type="button" class="goal-remove" aria-label="Remove this goal">&times;</button>';
      li.querySelector('.goal-text').value = goal.text || '';
      return li;
    }

    function readGoals() {
      return [...listEl.querySelectorAll('.goal')].map((li) => ({
        text: li.querySelector('.goal-text').value.trim(),
        done: li.querySelector('.goal-done').checked,
      })).filter((g) => g.text);
    }

    function teamNote(week) {
      const note = document.getElementById('ci-team-note');
      if (scope !== 'team' || !state.team) { note.hidden = true; return; }
      note.textContent =
        `Team ${state.team.name}: ${state.team.members.join(', ')}. Anyone on the team can edit this one, ` +
        'and it is separate from your own.' +
        (week && week.savedBy ? ` Last saved by ${week.savedBy}.` : '');
      note.hidden = false;
    }

    function render(week) {
      const title = scope === 'team' ? `Team ${state.team.name}, ${week.week}` : week.week;
      document.getElementById('ci-week').textContent = title;
      document.getElementById('ci-range').textContent = week.range;
      listEl.innerHTML = '';
      const goals = week.goals.length ? week.goals : [{ text: '', done: false }, { text: '', done: false }];
      goals.forEach((g) => listEl.appendChild(goalRow(g)));
      helpEl.value = week.helpNeeded || '';
      helpEl.dispatchEvent(new Event('input'));
      const reply = document.getElementById('ci-reply');
      reply.hidden = !week.reply;
      if (week.reply) reply.innerHTML = `<strong>Your organiser replied:</strong> ${esc(week.reply.text)}`;
      teamNote(week);
    }

    function renderHistory(weeks) {
      const done = weeks.filter((w) => w.started);
      const section = document.getElementById('ci-history');
      if (done.length < 2) { section.hidden = true; return; }
      const ol = document.getElementById('week-history');
      document.querySelector('#ci-history h2').textContent = scope === 'team' ? 'Your team’s weeks' : 'Your weeks';
      ol.innerHTML = done.map((w) => {
        const ticked = w.goals.filter((g) => g.done).length;
        let status;
        if (!w.closed) status = 'open now';
        else if (w.missing) status = 'nothing written';
        else status = `${ticked} of ${w.goals.length || 0} done` + (w.late ? ', late' : '');
        return `<li class="${w.closed ? 'wk-closed' : 'wk-open'}">` +
          `<span class="wk-name">${esc(w.week)}</span>` +
          `<span class="wk-range">${esc(w.range)}</span>` +
          `<span class="wk-state">${esc(status)}</span>` +
          (w.reply ? `<span class="wk-reply"><strong>Organiser:</strong> ${esc(w.reply.text)}</span>` : '') + '</li>';
      }).join('');
      section.hidden = false;
    }

    /* What is on screen, in the same shape the server stores, so "has this
     * changed since it was saved" is one comparison. */
    const snapshot = (goals, help) => JSON.stringify({
      g: goals.map((g) => ({ text: g.text, done: Boolean(g.done) })), h: help || '',
    });
    const dirty = () => {
      const wk = current();
      return Boolean(wk) && snapshot(readGoals(), helpEl.value.trim()) !== snapshot(wk.goals, wk.helpNeeded);
    };

    async function save() {
      const wk = current();
      if (!wk) return;
      say('Saving…');
      const goals = readGoals();
      const help = helpEl.value;
      const payload = { week_start: wk.weekStart, goals, help_needed: help };
      if (scope === 'team') { payload.scope = 'team'; payload.base_version = wk.version || 0; }
      const { status, data } = await api('/api/checkin', { method: 'POST', body: JSON.stringify(payload) });

      if (status === 409 && data.conflict) {
        /* A teammate saved first. Show their version, not ours, and say so:
         * the alternative is to quietly erase their work. */
        if (data.latest) {
          Object.assign(wk, { goals: data.latest.goals, helpNeeded: data.latest.helpNeeded,
            version: data.latest.version, savedBy: data.latest.savedBy });
          render(wk);
        }
        return say(data.error, 'bad');
      }
      if (data.error) return say(data.error, 'bad');

      /* Keep the local copy in step, because switching between "me" and the
       * team re-draws the form from it. */
      wk.goals = goals;
      wk.helpNeeded = help.trim();
      wk.firstSavedAt = wk.firstSavedAt || (data.saved && data.saved.first_saved_at) || new Date().toISOString();
      if (scope === 'team' && data.saved) {
        wk.version = data.saved.version;
        wk.savedBy = data.saved.saved_by || wk.savedBy;
        teamNote(wk);
      }
      say(data.late
        ? 'Saved, and marked late. This one was due at 11:59 PM the night before the session, so your organiser will see it came in afterwards.'
        : 'Saved. You can keep editing until the deadline.', data.late ? 'bad' : 'ok');
    }

    function applyScope() {
      const wk = current();
      renderHistory(weeksOf(scope));
      document.querySelectorAll('.ci-scope-btn').forEach((b) => {
        b.setAttribute('aria-pressed', String(b.dataset.scope === scope));
        b.classList.toggle('is-on', b.dataset.scope === scope);
      });
      if (!wk) return;
      render(wk);
    }

    function load() {
      return api('/api/checkin').then(({ status, data }) => {
        loading.hidden = true;
        if (status === 401 || data.signInRequired) return show('ci-signedout');
        if (data.notStarted) {
          document.getElementById('ci-notstarted-msg').textContent = data.message;
          return show('ci-notstarted');
        }

        state = data;
        /* The portal's team section links here with ?scope=team. */
        scope = data.team && new URLSearchParams(window.location.search).get('scope') === 'team' ? 'team' : 'me';
        showTeamNav(Boolean(data.team));
        document.getElementById('ci-deadline').textContent = data.deadlineNote;

        const switcher = document.getElementById('ci-scope');
        switcher.hidden = !data.team;
        if (data.team) document.getElementById('ci-scope-team').textContent = `Team ${data.team.name}`;

        const openWeek = data.weeks.find((w) => w.weekStart === data.openWeek) || null;
        if (!openWeek) {
          renderHistory(data.weeks);
          const next = data.weeks.find((w) => !w.started);
          document.getElementById('ci-closed-msg').textContent = next
            ? `Your next check-in opens on ${next.range.split(' to ')[0]}, the day of the session.`
            : 'Every check-in for your cohort is done. Thank you for keeping it up to date.';
          return show('ci-closed');
        }
        applyScope();
        show('ci-open');
      }).catch(() => { loading.hidden = true; show('ci-signedout'); });
    }

    /* Switching saves what is on screen first, so typing in one and then
     * clicking the other never loses the words. */
    document.getElementById('ci-scope').addEventListener('click', async (e) => {
      const btn = e.target.closest('.ci-scope-btn');
      if (!btn || btn.dataset.scope === scope) return;
      if (dirty()) {
        await save();
        if (msg.classList.contains('bad') && !/newer version/.test(msg.textContent)) return;
      }
      scope = btn.dataset.scope;
      say('');
      applyScope();
    });

    document.getElementById('goal-add').addEventListener('click', () => {
      listEl.appendChild(goalRow({ text: '', done: false }));
      listEl.lastElementChild.querySelector('.goal-text').focus();
    });

    listEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.goal-remove');
      if (!btn) return;
      if (listEl.querySelectorAll('.goal').length > 1) btn.closest('.goal').remove();
      else { btn.closest('.goal').querySelector('.goal-text').value = ''; }
    });

    /* A tick is the whole point of the week, so it saves itself rather than
     * waiting for someone to remember the button. */
    listEl.addEventListener('change', (e) => {
      if (e.target.classList.contains('goal-done')) save();
    });

    form.addEventListener('submit', (e) => { e.preventDefault(); save(); });

    load();
  })();

  /* ---- shared form helpers --------------------------------------------- */
  function fieldOf(el) { return el.closest('.field') || el.closest('.field-set') || el.parentNode; }

  function clearError(el) {
    const wrap = fieldOf(el);
    wrap.classList.remove('is-invalid');
    const msg = wrap.querySelector('.error-msg');
    if (msg) msg.remove();
  }

  function showError(el, text) {
    const wrap = fieldOf(el);
    wrap.classList.add('is-invalid');
    if (!wrap.querySelector('.error-msg')) {
      const span = document.createElement('span');
      span.className = 'error-msg';
      span.textContent = text;
      wrap.appendChild(span);
    }
  }

  /* Live counters on the long answers. The brief asks for short ones, so the
   * count is there to discourage essays, not to police them. */
  function wireCounters(scope) {
    scope.querySelectorAll('[data-counter]').forEach((ta) => {
      const out = document.createElement('span');
      out.className = 'counter';
      ta.parentNode.appendChild(out);
      const tick = () => { out.textContent = `${ta.value.length} / ${ta.maxLength}`; };
      ta.addEventListener('input', tick);
      tick();
    });
  }

  /* Required means required, on the server too. This is the browser half. */
  function validate(form) {
    let first = null;
    form.querySelectorAll('[required]').forEach((el) => clearError(el));
    form.querySelectorAll('input[required], textarea[required], select[required]').forEach((el) => {
      if (el.type === 'radio') {
        const group = form.querySelectorAll(`input[name="${el.name}"]`);
        if (![...group].some((r) => r.checked)) {
          showError(el, 'Please choose an answer.');
          if (!first) first = el;
        }
        return;
      }
      if (!el.value.trim()) {
        showError(el, 'This is required.');
        if (!first) first = el;
      } else if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value.trim())) {
        showError(el, 'Enter a valid email address.');
        if (!first) first = el;
      }
    });
    if (first) first.focus();
    return !first;
  }

  const formValues = (form) => {
    const out = {};
    new FormData(form).forEach((v, k) => { out[k] = typeof v === 'string' ? v : ''; });
    return out;
  };

  /* ---- apply ------------------------------------------------------------ */
  (function () {
    const form = document.getElementById('apply-form');
    if (!form) return;
    const loading = document.getElementById('apply-loading');
    const gate = document.getElementById('apply-gate');
    const review = document.getElementById('apply-review');
    const done = document.getElementById('apply-done');
    const msg = document.getElementById('apply-msg');

    wireCounters(form);

    /* A student can spend fifteen minutes on this form. A stray back button,
     * a reloaded tab or a closed window should not quietly throw that away.
     * The guard arms on the first keystroke and disarms the moment the
     * application is actually saved, so it never fires on a successful
     * submit. Browsers show their own wording; the string is only a legacy
     * requirement. */
    let formDirty = false;
    let submitted = false;

    function warnBeforeLeaving(e) {
      if (!formDirty || submitted) return;
      e.preventDefault();
      e.returnValue = '';
      return '';
    }

    form.addEventListener('input', () => {
      if (formDirty) return;
      formDirty = true;
      window.addEventListener('beforeunload', warnBeforeLeaving);
    }, { once: false });

    /* Radios and checkboxes do not always fire input in older engines. */
    form.addEventListener('change', () => {
      if (formDirty) return;
      formDirty = true;
      window.addEventListener('beforeunload', warnBeforeLeaving);
    });

    // "Other" reveals its text box.
    form.querySelectorAll('input[name="team_size"]').forEach((r) => {
      r.addEventListener('change', () => {
        const other = document.getElementById('team_other');
        other.hidden = form.team_size.value !== 'Other';
        if (!other.hidden) other.focus();
      });
    });

    /* "Yes" wakes the name box up. It stays on the page when the answer is No
     * so the form does not jump, and it is disabled rather than hidden so it
     * is neither submitted nor demanded. Required moves with disabled: a box
     * nobody can type in must never be able to block the form. */
    form.querySelectorAll('input[name="referred"]').forEach((r) => {
      r.addEventListener('change', () => {
        const who = document.getElementById('referred_by');
        const yes = form.referred.value === 'Yes';
        who.disabled = !yes;
        if (yes) { who.setAttribute('required', ''); who.focus(); }
        else { who.removeAttribute('required'); who.value = ''; clearError(who); }
      });
    });

    /* One call answers both questions: are they signed in, and is the form
     * theirs to fill in. An application that is still with us hides the form
     * and shows where it stands instead. */
    api('/api/status').then(({ status, data }) => {
      loading.hidden = true;
      if (status === 401 || data.signInRequired) { gate.hidden = false; return; }

      if (data.found && !data.canApply) {
        const open = document.getElementById('apply-open');
        document.getElementById('open-head').textContent = data.label;
        document.getElementById('open-body').textContent = data.detail;
        /* Still waiting on the parent, so keep the route to their form in
         * reach. It is the one step left and the email can go missing. */
        if (data.canResend) document.getElementById('open-parent').hidden = false;
        open.hidden = false;
        /* The steps and the "how applying works" lede are instructions for
         * filling in a form that is not there, so they go too. */
        document.getElementById('apply-intro').hidden = true;
        return;
      }

      if (data.found && data.canApply) document.getElementById('apply-again').hidden = false;

      document.getElementById('student_email_display').value = data.signedInAs;
      const signed = document.getElementById('apply-signed');
      signed.hidden = false;
      signed.textContent = `Applying as ${data.signedInAs}.`;
      form.hidden = false;
    });

    const LABELS = {
      cohort: 'Cohort', student_name: 'Your name', student_phone: 'Phone', parent_name: 'Parent name',
      parent_email: 'Parent email', parent_phone: 'Parent phone',
      school_grade: 'School and grade', startup_name: 'Startup', building: 'What you are building',
      team_size: 'Team', team_other: 'Team details', teammate_names: 'Teammates',
      teammate_emails: 'Teammate emails', why_join: 'Why you want to join',
      goals: 'Your goals', can_attend: 'Can attend all five', food_allergies: 'Food allergies',
      referred: 'Referred by someone on the team', referred_by: 'Who referred you',
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      msg.textContent = '';
      if (!validate(form)) {
        msg.className = 'form-msg bad';
        msg.textContent = 'Please fix the highlighted answers.';
        return;
      }
      const values = formValues(form);
      const list = document.getElementById('review-list');
      list.innerHTML = '';
      Object.entries(LABELS).forEach(([key, label]) => {
        if (!values[key]) return;
        const dt = document.createElement('dt'); dt.textContent = label;
        const dd = document.createElement('dd'); dd.textContent = values[key];
        list.append(dt, dd);
      });
      form.hidden = true;
      review.hidden = false;
      review.scrollIntoView({ block: 'start' });
    });

    document.getElementById('review-back').addEventListener('click', () => {
      review.hidden = true;
      form.hidden = false;
    });

    document.getElementById('review-submit').addEventListener('click', async () => {
      const btn = document.getElementById('review-submit');
      const rmsg = document.getElementById('review-msg');
      btn.disabled = true;
      rmsg.className = 'form-msg';
      rmsg.textContent = 'Sending…';
      const payload = formValues(form);
      payload.student_agreed = payload.student_agreed === 'Yes';
      const { data } = await api('/api/apply', { method: 'POST', body: JSON.stringify(payload) });
      btn.disabled = false;

      if (data.signInRequired) { window.location.href = '/login'; return; }
      if (data.errors) {
        rmsg.className = 'form-msg bad';
        rmsg.textContent = 'Some answers need fixing. Go back and check the highlighted ones.';
        review.hidden = true; form.hidden = false;
        Object.entries(data.errors).forEach(([k, v]) => {
          const el = form.elements[k];
          if (el) showError(el.length ? el[0] : el, v);
        });
        return;
      }
      if (data.duplicate) {
        /* The page let them through on stale information, so correct it
         * rather than leaving them staring at a filled in form. */
        review.hidden = true;
        document.getElementById('open-head').textContent = 'You already have an application';
        document.getElementById('open-body').textContent = data.error;
        document.getElementById('apply-open').hidden = false;
        document.getElementById('apply-again').hidden = true;
        document.getElementById('apply-intro').hidden = true;
        return;
      }
      if (data.error) { rmsg.className = 'form-msg bad'; rmsg.textContent = data.error; return; }

      /* Saved. Nothing left to lose, so stop warning. */
      submitted = true;
      window.removeEventListener('beforeunload', warnBeforeLeaving);

      review.hidden = true;
      done.hidden = false;
      const body = document.getElementById('done-body');
      body.textContent = data.emailDisabled
        ? 'Email is not connected yet, so the code your parent needs is below. Normally we would send it straight to them.'
        : `We just emailed a confirmation code to ${data.maskedParentEmail}. Ask your parent or guardian to open it, enter the code, and complete the consent form. After that, we review your application and email you a decision. Not there after a few minutes? Check spam, or email hello@ncignyte.org and we will resend it.`;
      if (data.emailDisabled && data.parentCode) showCode(body.parentNode, data.parentCode, "Your parent's");
      done.scrollIntoView({ block: 'start' });
    });
  })();

  /* ---- parent consent --------------------------------------------------- */
  (function () {
    const gateForm = document.getElementById('gate-form');
    if (!gateForm) return;
    const gate = document.getElementById('gate');
    const consent = document.getElementById('consent');
    const consentForm = document.getElementById('consent-form');
    const gateMsg = document.getElementById('gate-msg');

    wireCounters(consentForm);

    function unlock(info) {
      gate.hidden = true;
      consent.hidden = false;
      // textContent, never innerHTML: these two values are supplied by the student.
      const strip = document.getElementById('student-strip');
      strip.textContent = '';
      const stripName = document.createElement('strong');
      stripName.textContent = info.studentFirstName;
      const stripSchool = document.createElement('span');
      stripSchool.textContent = info.school;
      strip.append(stripName, stripSchool);
      if (info.parentEmail) document.getElementById('guardian_email').value = info.parentEmail;
      if (info.parentName) document.getElementById('guardian_name').value = info.parentName;
    }

    async function checkSession() {
      const { data } = await api('/api/parent?action=session');
      if (data.verified) unlock(data);
    }

    /* Arriving from the email button verifies server-side, then the code is
     * stripped from the address bar so it is not left in history. */
    const fromLink = new URLSearchParams(window.location.search).get('code');
    if (fromLink) {
      api('/api/parent?action=verify', { method: 'POST', body: JSON.stringify({ code: fromLink }) })
        .then(({ data }) => {
          window.history.replaceState({}, '', '/parent');
          if (data.ok) return checkSession();
          gateMsg.className = 'form-msg bad';
          gateMsg.textContent = data.error || 'That code did not work. Enter it below.';
        });
    } else {
      checkSession();
    }

    gateForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const code = document.getElementById('gate-code').value.trim();
      if (!code) { gateMsg.className = 'form-msg bad'; gateMsg.textContent = 'Enter your code.'; return; }
      const btn = gateForm.querySelector('button');
      btn.disabled = true;
      gateMsg.className = 'form-msg';
      gateMsg.textContent = 'Checking…';
      const { data } = await api('/api/parent?action=verify', { method: 'POST', body: JSON.stringify({ code }) });
      btn.disabled = false;
      if (!data.ok) { gateMsg.className = 'form-msg bad'; gateMsg.textContent = data.error || 'That code does not match.'; return; }
      gateMsg.textContent = '';
      await checkSession();
    });

    consentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const cmsg = document.getElementById('consent-msg');
      cmsg.textContent = '';
      if (!validate(consentForm)) {
        cmsg.className = 'form-msg bad';
        cmsg.textContent = 'Please answer the required questions.';
        return;
      }
      const v = formValues(consentForm);
      if (v.consent_participate === 'No') {
        showError(consentForm.consent_participate[0],
          'Without permission to take part, your student cannot join. Close this page if that is your decision.');
        return;
      }
      const btn = consentForm.querySelector('button');
      btn.disabled = true;
      cmsg.className = 'form-msg';
      cmsg.textContent = 'Sending…';
      const { data } = await api('/api/parent?action=submit', { method: 'POST', body: JSON.stringify(v) });
      btn.disabled = false;
      if (data.errors) {
        cmsg.className = 'form-msg bad';
        cmsg.textContent = 'Please check the highlighted answers.';
        Object.entries(data.errors).forEach(([k, m]) => {
          const el = consentForm.elements[k];
          if (el) showError(el.length ? el[0] : el, m);
        });
        return;
      }
      if (!data.ok) { cmsg.className = 'form-msg bad'; cmsg.textContent = data.error || 'Something went wrong.'; return; }
      consent.hidden = true;
      const doneBox = document.getElementById('consent-done');
      doneBox.hidden = false;
      document.getElementById('done-title').textContent =
        `Thank you. We received ${data.studentFirstName}'s consent form.`;
    });
  })();

  /* Native confirm() and prompt() are blocked in some browsers and embedded
   * views. confirm() then returns false and prompt() throws, so a destructive
   * action either does nothing or blows up with no feedback. This is the
   * in-page replacement. */
  function askConfirm({ title, body, confirmLabel = 'Confirm', requireText = null }) {
    return new Promise((resolve) => {
      const modal = document.getElementById('confirm-modal');
      const input = document.getElementById('confirm-input');
      const wrap = document.getElementById('confirm-input-wrap');
      const yes = document.getElementById('confirm-yes');
      const no = document.getElementById('confirm-no');

      document.getElementById('confirm-title').textContent = title;
      document.getElementById('confirm-body').textContent = body || '';
      yes.textContent = confirmLabel;
      wrap.hidden = !requireText;
      input.value = '';
      if (requireText) {
        document.getElementById('confirm-input-label').textContent = `Type ${requireText} to confirm`;
        yes.disabled = true;
        input.oninput = () => { yes.disabled = input.value.trim() !== requireText; };
      } else {
        yes.disabled = false;
      }

      const close = (result) => {
        modal.hidden = true;
        yes.onclick = null; no.onclick = null; input.oninput = null;
        document.removeEventListener('keydown', onKey);
        resolve(result);
      };
      const onKey = (e) => { if (e.key === 'Escape') close(false); };

      yes.onclick = () => close(true);
      no.onclick = () => close(false);
      document.addEventListener('keydown', onKey);
      modal.hidden = false;
      (requireText ? input : yes).focus();
    });
  }

  /* ---- admin ------------------------------------------------------------ */
  (function () {
    const panel = document.getElementById('admin-panel');
    if (!panel) return;
    const loginBox = document.getElementById('admin-login');
    const loading = document.getElementById('admin-loading');
    const rowsEl = document.getElementById('admin-rows');
    const msg = document.getElementById('admin-msg');
    const modal = document.getElementById('decide-modal');
    let allRows = [];
    let pending = null;   // { ids, decision }

    const esc = (v) => String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    /* Written once, in lib/templates.js, so the wording an organiser starts
     * from is reviewed in the same place as the rest of the letter. Fetched
     * after sign in, because the endpoint is behind the admin session. */
    const DEFAULTS = { accept: '', decline: '' };
    function loadDefaults() {
      if (DEFAULTS.accept) return;
      api('/api/admin?action=defaults').then(({ data }) => {
        if (data && typeof data.accept === 'string') {
          DEFAULTS.accept = data.accept;
          DEFAULTS.decline = data.decline;
        }
        /* The button only appears when a key is actually configured, so it
         * is never there to be clicked and then fail. */
        if (data && data.drafting) {
          buildTones(data.tones || [], data.defaultTone || 'warm');
          document.getElementById('draft-row').hidden = false;
        }
      }).catch(() => {});
    }

    /* Tone steers the voice of the drafted paragraph only. The list comes
     * from the server so the wording of each option is written once, next to
     * the instruction it actually sends. */
    const TONE_KEY = 'nci-tone';
    let toneHints = {};

    function buildTones(tones, fallback) {
      const list = document.getElementById('tone-list');
      if (!tones.length || list.children.length) return;
      let saved = fallback;
      try { saved = localStorage.getItem(TONE_KEY) || fallback; } catch { /* private window */ }
      if (!tones.some((t) => t.id === saved)) saved = fallback;

      toneHints = Object.fromEntries(tones.map((t) => [t.id, t.hint]));
      list.innerHTML = tones.map((t) => `
        <label class="tone">
          <input type="radio" name="tone" value="${esc(t.id)}"${t.id === saved ? ' checked' : ''}>
          <span>${esc(t.label)}</span>
        </label>`).join('');
      document.getElementById('tone-hint').textContent = toneHints[saved] || '';

      list.addEventListener('change', () => {
        const picked = currentTone();
        document.getElementById('tone-hint').textContent = toneHints[picked] || '';
        /* Remembered because an organiser working through a pile of
         * applications wants the same voice on all of them. */
        try { localStorage.setItem(TONE_KEY, picked); } catch { /* fine */ }
      });
    }

    const currentTone = () =>
      document.querySelector('#tone-list input[name="tone"]:checked')?.value || '';

    /* Writes into the note box and nowhere else. An organiser reads it,
     * edits it, and sends it the same way as anything they typed. */
    async function draftNote() {
      if (!pending) return;
      const btn = document.getElementById('draft-btn');
      const hint = document.getElementById('draft-note');
      const note = document.getElementById('personal-note');
      const previous = note.value;
      btn.disabled = true;
      const was = btn.textContent;
      btn.textContent = 'Writing';
      const { data } = await api('/api/admin?action=draft', {
        method: 'POST',
        body: JSON.stringify({
          id: pending.ids[0], decision: pending.decision,
          reason_code: document.getElementById('reason-code').value,
          tone: currentTone(),
        }),
      });
      btn.disabled = false;
      btn.textContent = was;
      if (data.error) { hint.textContent = data.error; return; }
      note.value = data.note;
      note.dispatchEvent(new Event('input'));
      /* Naming the service that answered makes a fallback visible. If the
       * first choice is down for a week, that should be noticeable rather
       * than something only the logs know. */
      const by = data.fellBack ? ` Written by the backup service (${data.provider}).` : '';
      hint.textContent = (previous.trim() && previous !== note.value
        ? 'Replaced what was in the box. Edit it, then send.'
        : 'A draft, not a decision. Edit it, then send.') + by;
      note.focus();
      note.setSelectionRange(note.value.length, note.value.length);
      refreshPreview();
    }

    const STATUS_LABEL = {
      applied: 'Waiting on parent', parent_confirmed: 'Parent confirmed',
      accepted: 'Accepted', declined: 'Declined', withdrawn: 'Withdrawn',
    };

    async function load() {
      const { status, data } = await api('/api/admin?action=list');
      if (status === 401) { loading.hidden = true; loginBox.hidden = false; return; }
      loading.hidden = true;
      loginBox.hidden = true;
      panel.hidden = false;
      document.getElementById('mode-warn').hidden = !data.testMode;
      loadDefaults();
      loadAccepted();
      loadCheckins();
      loadTeams();
      loadPortalAdmin();
      allRows = data.rows || [];

      const counts = data.counts || {};
      document.getElementById('counts').innerHTML = [
        ['Waiting on parent', counts.applied], ['Parent confirmed', counts.parent_confirmed],
        ['Accepted', counts.accepted], ['Declined', counts.declined],
        ['Failed emails', data.failedEmails], ['Sent in 24h', data.sentLast24h],
      ].map(([k, v]) => `<li><strong>${v || 0}</strong><span>${k}</span></li>`).join('');

      render(data.flags || {});
    }



    /* Rows are rendered in chunks rather than all at once. Cohort 1 will not
     * need it, but a table that builds twelve cells for every applicant in
     * one innerHTML stops being usable somewhere in the high hundreds, and
     * an organiser reviewing applications is exactly who would hit that.
     *
     * Chunked rather than windowed on purpose: these rows wrap, so their
     * heights vary, and windowing needs a fixed height to do arithmetic
     * with. Appending also means a checkbox ticked further up the table
     * survives loading more. */
    const CHUNK = 50;
    let shownRows = [];
    let drawn = 0;
    let rowFlags = {};
    let moreObserver = null;

    function rowHtml(r, flags) {
      return `
        <tr data-id="${r.id}"${flags[r.id] ? ' class="flagged"' : ''}>
          <td><input type="checkbox" class="pick" value="${r.id}" aria-label="Select ${esc(r.student_name)}"></td>
          <td>${esc(r.student_name)}${flags[r.id] ? `<span class="flag" title="${esc(flags[r.id])}">flagged</span>` : ''}</td>
          <td>${esc(r.cohort ? r.cohort.replace(/^Cohort /, '') : '-')}</td>
          <td>${esc(r.school_grade)}</td>
          <td>${esc(r.startup_name)}</td>
          <td>${esc(r.parent_email)}</td>
          <td><span class="pill pill-${r.status}">${STATUS_LABEL[r.status] || r.status}</span></td>
          <td>${esc(r.last_email || '-')}</td>
          <td>${esc(r.code_status || '-')}</td>
          <td>${r.consent_photo === null ? '-' : (r.consent_photo ? 'Yes' : 'No')}</td>
          <td>${r.decided_at ? new Date(r.decided_at).toLocaleDateString() : '-'}</td>
          <td class="row-actions">
            <button type="button" data-act="view">View</button>
            <button type="button" data-act="accept">Accept</button>
            <button type="button" data-act="decline">Decline</button>
            <button type="button" data-act="resend">Resend code</button>
            <button type="button" data-act="withdraw">Withdraw</button>
            <button type="button" data-act="delete">Delete</button>
          </td>
        </tr>`;
    }

    function drawMore() {
      const next = shownRows.slice(drawn, drawn + CHUNK);
      if (!next.length) return;
      rowsEl.insertAdjacentHTML('beforeend', next.map((r) => rowHtml(r, rowFlags)).join(''));
      drawn += next.length;
      updateSentinel();
    }

    /* A row at the end of what is drawn; when it scrolls into view, draw the
     * next chunk. Falls back to a button where IntersectionObserver is
     * missing, so the rest of the table is never unreachable. */
    function updateSentinel() {
      const old = document.getElementById('rows-sentinel');
      if (old) old.remove();
      if (drawn >= shownRows.length) return;

      const remaining = shownRows.length - drawn;
      const tr = document.createElement('tr');
      tr.id = 'rows-sentinel';
      tr.innerHTML = `<td colspan="12" class="rows-more">` +
        `<button type="button" id="rows-more-btn">Show ${Math.min(CHUNK, remaining)} more` +
        ` (${remaining} left)</button></td>`;
      rowsEl.appendChild(tr);
      document.getElementById('rows-more-btn').addEventListener('click', drawMore);

      if ('IntersectionObserver' in window) {
        if (moreObserver) moreObserver.disconnect();
        moreObserver = new IntersectionObserver((entries) => {
          if (entries.some((e) => e.isIntersecting)) drawMore();
        }, { rootMargin: '400px' });
        moreObserver.observe(tr);
      }
    }

    function render(flags) {
      rowFlags = flags || {};
      const filter = document.getElementById('filter-status').value;
      shownRows = filter ? allRows.filter((r) => r.status === filter) : allRows;
      if (moreObserver) moreObserver.disconnect();
      drawn = 0;
      rowsEl.innerHTML = '';
      if (!shownRows.length) {
        rowsEl.innerHTML = '<tr><td colspan="12">No applications yet.</td></tr>';
        return;
      }
      drawMore();
    }

    document.getElementById('filter-status').addEventListener('change', () => render(rowFlags));

    document.getElementById('admin-login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const m = document.getElementById('admin-login-msg');
      m.className = 'form-msg';
      m.textContent = 'Checking…';
      const { data } = await api('/api/admin?action=login', {
        method: 'POST',
        body: JSON.stringify({
          email: document.getElementById('admin-email').value.trim(),
          password: document.getElementById('admin-password').value,
        }),
      });
      if (!data.ok) { m.className = 'form-msg bad'; m.textContent = data.error || 'Sign in failed.'; return; }
      m.textContent = '';
      load();
    });

    document.getElementById('admin-signout').addEventListener('click', async () => {
      await api('/api/admin?action=logout', { method: 'POST' });
      window.location.reload();
    });

    /* Everyone who got in, and whether their check-in is open yet. This is
     * the list an organiser wants the moment they finish deciding. */
    function loadAccepted() {
      return api('/api/admin?action=accepted').then(({ data }) => {
        const section = document.getElementById('admin-accepted');
        const list = data && Array.isArray(data.students) ? data.students : [];
        if (!list.length) { section.hidden = true; return; }

        const waiting = list.filter((s) => !s.checkin_invited_at).length;
        document.getElementById('accepted-count').textContent =
          `${list.length} admitted. ` + (waiting
            ? `${waiting} ${waiting === 1 ? 'is' : 'are'} still waiting for check-ins to be opened.`
            : 'Everyone has their check-in open.');

        document.getElementById('accepted-rows').innerHTML = list.map((st) => {
          const invited = Boolean(st.checkin_invited_at);
          return `<tr data-id="${st.id}">
            <td>${invited ? '' : `<input type="checkbox" class="pick-accepted" value="${st.id}" aria-label="Select ${esc(st.student_name)}">`}</td>
            <th scope="row">${esc(st.student_name)}</th>
            <td>${esc(st.cohort ? st.cohort.replace(/^Cohort /, '') : '-')}</td>
            <td>${esc(st.startup_name || '-')}</td>
            <td>${st.parent_confirmed_at ? 'Confirmed' : '<span class="ci-few">Not yet</span>'}</td>
            <td>${invited
              ? `<span class="ci-all">Open</span>`
              : '<span class="ci-blank">Not opened</span>'}</td>
            <td>${st.weeks_written || 0}</td>
            <td class="row-actions">${invited
              ? '<span class="ci-blank">&mdash;</span>'
              : '<button type="button" data-invite="1">Open check-ins</button>'}</td>
          </tr>`;
        }).join('');
        section.hidden = false;
      }).catch(() => {});
    }

    async function invite(ids) {
      const amsg = document.getElementById('accepted-msg');
      if (!ids.length) { amsg.className = 'form-msg bad'; amsg.textContent = 'Select at least one student first.'; return; }
      const ok = await askConfirm({
        title: ids.length === 1 ? 'Open check-ins for this student?' : `Open check-ins for ${ids.length} students?`,
        body: 'They get one email explaining how the weekly check-in works, with a link to it.',
        confirmLabel: 'Open check-ins',
      });
      if (!ok) return;
      amsg.className = 'form-msg';
      amsg.textContent = 'Opening\u2026';
      const { data } = await api('/api/admin?action=invite_checkin', {
        method: 'POST', body: JSON.stringify({ ids }),
      });
      if (data.error) { amsg.className = 'form-msg bad'; amsg.textContent = data.error; return; }
      amsg.className = 'form-msg ok';
      amsg.textContent = `Opened for ${data.invited} student${data.invited === 1 ? '' : 's'}.` +
        (data.skipped ? ` ${data.skipped} already had it.` : '');
      loadAccepted();
      loadCheckins();
    }

    document.getElementById('invite-selected').addEventListener('click', () => {
      invite([...document.querySelectorAll('.pick-accepted:checked')].map((c) => Number(c.value)));
    });

    document.getElementById('accepted-rows').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-invite]');
      if (btn) invite([Number(btn.closest('tr').dataset.id)]);
    });

    /* Check-ins, as a grid of students (and teams) against weeks. A blank cell
     * is the signal, not the noise: it means nothing was written that week.
     * Every cell and every name opens the full record, because a ratio like
     * 2/5 says how a week went but not what was written. */
    const byId = (id) => document.getElementById(id);
    let ciData = null;
    const fmtDay = (iso) => {
      const [y, m, d] = String(iso).slice(0, 10).split('-').map(Number);
      return new Date(Date.UTC(y, m - 1, d))
        .toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
    };
    const fmtTime = (t) => (t ? new Date(t).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : '–');

    function ciCell(kind, id, wk) {
      const open = `data-open="${kind}:${id}" data-week="${esc(wk.weekStart)}"`;
      /* Three states, not two. Nothing at all is a different problem from
       * something handed in late, and an organiser chasing one should not be
       * reading the other. */
      if (!wk.firstSavedAt) {
        return wk.weekClosed
          ? `<td class="ci-missing"><button type="button" class="ci-cell-btn" ${open} title="Nothing was written and the week has closed">Missing</button></td>`
          : `<td class="ci-blank"><button type="button" class="ci-cell-btn" ${open} title="Nothing yet, and the week is still open">&mdash;</button></td>`;
      }
      /* The ratio matters more than the count: two of two is a good week, two
       * of nine is a student who needs a hand. */
      const ratio = wk.total ? wk.done / wk.total : 0;
      const cls = ratio === 1 ? 'ci-all' : ratio >= 0.5 ? 'ci-some' : 'ci-few';
      const late = wk.late ? '<span class="ci-late" title="Written after the deadline">late</span>' : '';
      return `<td class="${cls}"><button type="button" class="ci-cell-btn" ${open}>${wk.done}/${wk.total}${late}</button></td>`;
    }

    function ciRow(kind, subject, weeks) {
      let done = 0, total = 0;
      const cells = weeks.map((w) => {
        const wk = subject.weeks.find((x) => x.weekStart === w);
        if (!wk) return '<td class="ci-blank">&mdash;</td>';
        if (wk.firstSavedAt) { done += wk.done; total += wk.total; }
        return ciCell(kind, subject.id, wk);
      }).join('');
      const tag = kind === 'student' && subject.teamName
        ? `<span class="ci-team-tag" title="On team ${esc(subject.teamName)}">${esc(subject.teamName)}</span>` : '';
      return `<tr><th scope="row"><button type="button" class="ci-name-btn" data-open="${kind}:${subject.id}">${esc(subject.name)}</button>${tag}</th>` +
        `${cells}<td class="ci-total">${total ? done + '/' + total : '&mdash;'}</td></tr>`;
    }

    function loadCheckins() {
      api('/api/admin?action=checkins').then(({ data }) => {
        if (!data || !Array.isArray(data.students) || !data.students.length) return;
        ciData = data;
        const weeks = data.weeks || [];
        const section = byId('admin-checkins');

        byId('checkin-head').innerHTML =
          '<th scope="col">Student</th>' +
          weeks.map((w) => `<th scope="col">${esc(fmtDay(w))}</th>`).join('') +
          '<th scope="col">Ticked</th>';

        const studentRows = data.students.map((st) => ciRow('student', st, weeks)).join('');
        const teamRows = (data.teams || []).length
          ? `<tr class="ci-sep"><th scope="colgroup" colspan="${weeks.length + 2}">Group check-ins</th></tr>` +
            data.teams.map((t) => ciRow('team', t, weeks)).join('')
          : '';
        byId('checkin-rows').innerHTML = studentRows + teamRows;

        renderAsks();
        section.hidden = false;
      }).catch(() => {});
    }

    /* What people asked for help with. Open asks first, newest first: what
     * someone needs this week matters more than three weeks ago. Ticked ones
     * fold away underneath, so the list shows what is left to do. */
    function renderAsks() {
      const asks = [];
      const collect = (kind, subject, label) => subject.weeks.forEach((w) => {
        if (w.helpNeeded) asks.push({ kind, id: subject.id, name: label, w });
      });
      ciData.students.forEach((st) => collect('student', st, st.name));
      (ciData.teams || []).forEach((t) => collect('team', t, `${t.name} (team)`));
      asks.sort((a, b) => String(b.w.weekStart).localeCompare(String(a.w.weekStart)));
      const item = (a) => {
        const done = Boolean(a.w.helpHandledAt);
        return `<li class="${done ? 'is-handled' : ''}">` +
          `<label class="ask-tick"><input type="checkbox" data-ask="${a.kind}:${a.id}:${esc(a.w.weekStart)}"${done ? ' checked' : ''}>` +
          `<span class="sr-only">Handled: ${esc(a.name)}, week of ${esc(fmtDay(a.w.weekStart))}</span></label>` +
          `<div><span class="ask-who">${esc(a.name)}</span>` +
          `<span class="ask-when">${esc(fmtDay(a.w.weekStart))}</span>` +
          `<p>${esc(a.w.helpNeeded)}</p>` +
          (done ? `<p class="ask-by">Handled${a.w.helpHandledBy ? ' by ' + esc(a.w.helpHandledBy) : ''}, ${esc(fmtTime(a.w.helpHandledAt))}</p>` : '') +
          (a.w.reply ? `<p class="ask-reply"><strong>Your reply:</strong> ${esc(a.w.reply.text)}</p>` : '') +
          `<details class="ask-reply-box"><summary>${a.w.reply ? 'Edit reply' : 'Reply'}</summary>` +
          `<textarea rows="3" maxlength="1000" aria-label="Reply to ${esc(a.name)}">${esc(a.w.reply ? a.w.reply.text : '')}</textarea>` +
          `<button type="button" class="btn-quiet" data-reply="${a.kind}:${a.id}:${esc(a.w.weekStart)}">Send reply</button>` +
          (a.w.reply ? ' <span class="hint">Clear the box and send to remove it.</span>' : '') +
          '</details></div></li>';
      };
      const open = asks.filter((a) => !a.w.helpHandledAt);
      const handled = asks.filter((a) => a.w.helpHandledAt);
      byId('checkin-help').innerHTML = !asks.length
        ? '<li class="ask-none">Nobody has written anything here yet.</li>'
        : (open.length ? open.map(item).join('') : '<li class="ask-none">Everything asked for has been handled.</li>');
      const wrap = byId('checkin-help-done');
      wrap.hidden = !handled.length;
      byId('checkin-help-done-count').textContent = handled.length;
      byId('checkin-help-done-list').innerHTML = handled.map(item).join('');
    }

    async function onAskTick(e) {
      const box = e.target.closest('input[data-ask]');
      if (!box || !ciData) return;
      const [kind, id, week] = box.dataset.ask.split(':');
      const subject = (kind === 'team' ? ciData.teams : ciData.students).find((x) => String(x.id) === id);
      const w = subject && subject.weeks.find((x) => x.weekStart === week);
      if (!w) return;
      box.disabled = true;
      const { data } = await api('/api/admin?action=help_handled', {
        method: 'POST', body: JSON.stringify({ kind, id: Number(id), week_start: week, handled: box.checked }),
      });
      const hmsg = byId('checkin-help-msg');
      if (data.error) {
        box.checked = !box.checked; box.disabled = false;
        hmsg.className = 'form-msg bad'; hmsg.textContent = data.error;
        return;
      }
      hmsg.className = 'form-msg'; hmsg.textContent = '';
      w.helpHandledAt = data.handled ? data.handledAt : null;
      w.helpHandledBy = data.handled ? data.handledBy : null;
      renderAsks();
    }
    async function onAskReply(e) {
      const btn = e.target.closest('button[data-reply]');
      if (!btn || !ciData) return;
      const [kind, id, week] = btn.dataset.reply.split(':');
      const subject = (kind === 'team' ? ciData.teams : ciData.students).find((x) => String(x.id) === id);
      const w = subject && subject.weeks.find((x) => x.weekStart === week);
      if (!w) return;
      const text = btn.parentNode.querySelector('textarea').value.trim();
      btn.disabled = true;
      const { data } = await api('/api/admin?action=help_reply', {
        method: 'POST', body: JSON.stringify({ kind, id: Number(id), week_start: week, reply: text }),
      });
      btn.disabled = false;
      const hmsg = byId('checkin-help-msg');
      if (data.error) { hmsg.className = 'form-msg bad'; hmsg.textContent = data.error; return; }
      w.reply = data.reply;
      hmsg.className = 'form-msg ok';
      hmsg.textContent = data.reply ? `Reply sent to ${subject.name}. They see it in their portal.` : 'Reply removed.';
      renderAsks();
    }
    byId('checkin-help').addEventListener('click', onAskReply);
    byId('checkin-help-done-list').addEventListener('click', onAskReply);
    byId('checkin-help').addEventListener('change', onAskTick);
    byId('checkin-help-done-list').addEventListener('change', onAskTick);

    /* Everything one student or one team wrote, every week, newest first. */
    function weekBlock(w, picked) {
      const state = !w.firstSavedAt
        ? (w.weekClosed ? 'Missing: nothing was written and the week closed' : 'Nothing written yet, the week is still open')
        : (w.late ? 'Late: first written after the deadline' : 'On time');
      const cls = !w.firstSavedAt ? (w.weekClosed ? 'ci-missing' : 'ci-blank') : (w.late ? 'ci-few' : 'ci-all');
      const goals = w.goals.length
        ? `<ul class="ci-goals">${w.goals.map((g) =>
            `<li class="${g.done ? 'is-done' : ''}"><span aria-hidden="true">${g.done ? '✓' : '□'}</span> ${esc(g.text)}` +
            `<span class="sr-only">${g.done ? ' (done)' : ' (not done)'}</span></li>`).join('')}</ul>`
        : '<p class="hint">No goals written.</p>';
      const help = w.helpNeeded
        ? `<p class="ci-detail-help"><strong>Needs help with:</strong> ${esc(w.helpNeeded)}</p>`
        : '<p class="hint">Nothing written under help.</p>';
      const times = [
        `Due ${esc(fmtTime(w.closesAt))}`,
        w.firstSavedAt ? `First saved ${esc(fmtTime(w.firstSavedAt))}` : '',
        w.goalsSetAt ? `Goals first set ${esc(fmtTime(w.goalsSetAt))}` : '',
        w.updatedAt ? `Last saved ${esc(fmtTime(w.updatedAt))}${w.savedBy ? ' by ' + esc(w.savedBy) : ''}` : '',
      ].filter(Boolean).join(' &middot; ');
      return `<article class="ci-week${picked ? ' is-picked' : ''}" data-week="${esc(w.weekStart)}">` +
        `<h3>Week of ${esc(fmtDay(w.weekStart))} <span class="${cls} ci-state">${esc(state)}</span></h3>` +
        `${goals}${help}<p class="hint">${times}</p></article>`;
    }

    function openCheckinDetail(kind, id, weekStart) {
      if (!ciData) return;
      const subject = (kind === 'team' ? ciData.teams : ciData.students).find((x) => String(x.id) === String(id));
      if (!subject) return;
      byId('ci-detail-title').textContent = kind === 'team' ? `Team ${subject.name}` : subject.name;
      const bits = kind === 'team'
        ? [subject.cohort, subject.members.length ? `Members: ${subject.members.join(', ')}` : 'No members']
        : [subject.cohort, subject.startup, subject.teamName ? `Team ${subject.teamName}` : null, subject.invited ? null : 'Check-ins not opened yet'];
      byId('ci-detail-sub').textContent = bits.filter(Boolean).join('  ·  ');
      const weeks = [...subject.weeks].reverse();
      const teamLink = kind === 'student' && subject.teamId
        ? `<p><button type="button" class="link-btn" data-open="team:${esc(subject.teamId)}">See ${esc(subject.teamName)}’s group check-ins</button></p>` : '';
      byId('ci-detail-body').innerHTML = teamLink +
        (weeks.length ? weeks.map((w) => weekBlock(w, w.weekStart === weekStart)).join('') : '<p class="hint">No weeks have started yet.</p>');
      byId('ci-detail-modal').hidden = false;
      const picked = byId('ci-detail-body').querySelector('.is-picked');
      if (picked) picked.scrollIntoView({ block: 'nearest' });
    }

    byId('admin-checkins').addEventListener('click', (e) => {
      const el = e.target.closest('[data-open]');
      if (!el) return;
      const [kind, id] = el.dataset.open.split(':');
      openCheckinDetail(kind, id, el.dataset.week || null);
    });
    byId('ci-detail-body').addEventListener('click', (e) => {
      const el = e.target.closest('[data-open]');
      if (!el) return;
      const [kind, id] = el.dataset.open.split(':');
      openCheckinDetail(kind, id, null);
    });
    byId('ci-detail-close').addEventListener('click', () => { byId('ci-detail-modal').hidden = true; });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !byId('ci-detail-modal').hidden && byId('confirm-modal').hidden) byId('ci-detail-modal').hidden = true;
    });

    /* ---- teams ---------------------------------------------------------- */
    let teamsData = null;
    let editingTeam = null;   // null while creating

    /* ---- the portal: announcement and startup profiles ------------------ */
    async function loadPortalAdmin() {
      const { status, data } = await api('/api/admin?action=portal');
      const pmsg = byId('profile-msg');
      if (status !== 200 || data.error) {
        byId('announce-msg').className = 'form-msg bad';
        byId('announce-msg').textContent = data.error || 'Could not load the portal settings.';
        byId('profile-list').innerHTML = '';
        return;
      }
      const a = data.announcement;
      byId('announce-current').textContent = a ? `Up now, posted ${fmtTime(a.at)}${a.by ? ' by ' + a.by : ''}: "${a.body}"` : 'Nothing is up right now.';
      byId('announce-clear').hidden = !a;
      /* Each profile is a small form: the founder's draft, editable, and the
       * live copy beside it when one exists. */
      const STATE = {
        pending: ['Waiting for review', 'pill-wait'],
        live_pending: ['Live, with changes waiting', 'pill-wait'],
        live: ['Live', 'pill-live'],
        off: ['Not on the site', 'pill-off'],
      };
      const waiting = data.profiles.filter((p) => p.state === 'pending' || p.state === 'live_pending').length;
      byId('profile-queue').textContent = waiting ? `${waiting} waiting for review` : 'Nothing waiting for review.';
      byId('profile-list').innerHTML = data.profiles.length ? data.profiles.map((p) => {
        const [label, cls] = STATE[p.state];
        const d = p.draft;
        const liveDiffers = p.live && (p.live.startupName !== d.startupName || p.live.oneLiner !== d.oneLiner ||
          p.live.problem !== d.problem || p.live.logo !== d.logo);
        return `
        <li class="review-item" data-review="${p.id}">
          <div class="review-head">
            ${d.logo ? `<img class="profile-logo" src="${esc(d.logo)}" alt="">` : '<span class="profile-logo profile-logo-none" aria-hidden="true"></span>'}
            <div>
              <span class="rv-pill ${cls}">${label}</span>
              <p class="hint">${esc(p.student)} &middot; ${esc(p.cohort)}${p.submittedAt ? ' &middot; sent ' + esc(fmtTime(p.submittedAt)) : ''}</p>
            </div>
          </div>
          <div class="review-fields">
            <label>Startup name <input class="rv-name" maxlength="60" value="${esc(d.startupName)}"></label>
            <label>One line <input class="rv-one" maxlength="120" value="${esc(d.oneLiner)}"></label>
            <label>Problem <textarea class="rv-problem" rows="2" maxlength="400">${esc(d.problem)}</textarea></label>
            ${d.logo ? '<label class="choice"><input type="checkbox" class="rv-nologo"> Remove the logo</label>' : ''}
          </div>
          ${liveDiffers ? `<details class="review-live"><summary>What is live now</summary><p><strong>${esc(p.live.startupName)}</strong>: ${esc(p.live.oneLiner)}</p>${p.live.problem ? `<p class="hint">${esc(p.live.problem)}</p>` : ''}</details>` : ''}
          ${p.publishedAt ? `<p class="hint">Published ${esc(fmtTime(p.publishedAt))}${p.publishedBy ? ' by ' + esc(p.publishedBy) : ''}</p>` : ''}
          <div class="review-actions">
            <button type="button" class="btn-solid" data-decide="approve">${p.state === 'live' ? 'Publish edits' : 'Approve and publish'}</button>
            <button type="button" class="btn-quiet" data-decide="save">Save edits only</button>
            ${p.live ? '<button type="button" class="btn-quiet" data-decide="unpublish">Take off the site</button>' : ''}
          </div>
        </li>`;
      }).join('') : '<li class="hint">No student has written a profile yet.</li>';
    }

    async function announce(body) {
      const amsg = byId('announce-msg');
      amsg.className = 'form-msg'; amsg.textContent = 'Saving…';
      const { data } = await api('/api/admin?action=announce', { method: 'POST', body: JSON.stringify({ body }) });
      if (data.error) { amsg.className = 'form-msg bad'; amsg.textContent = data.error; return; }
      amsg.className = 'form-msg ok';
      amsg.textContent = data.announcement ? 'Posted. Every accepted student sees it the next time they open the portal.' : 'Taken down.';
      if (data.announcement) byId('announce-body').value = '';
      loadPortalAdmin();
    }
    byId('announce-post').addEventListener('click', () => {
      const text = byId('announce-body').value.trim();
      if (!text) { byId('announce-msg').className = 'form-msg bad'; byId('announce-msg').textContent = 'Write the message first.'; return; }
      announce(text);
    });
    byId('announce-clear').addEventListener('click', () => announce(''));

    byId('profile-list').addEventListener('click', async (e) => {
      const btn = e.target.closest('[data-decide]');
      if (!btn) return;
      const li = btn.closest('[data-review]');
      const decision = btn.dataset.decide;
      if (decision === 'unpublish') {
        const ok = await askConfirm({ title: 'Take this profile off the site?', body: 'The founder keeps their draft and can send it again.', confirmLabel: 'Take it off' });
        if (!ok) return;
      }
      const nologo = li.querySelector('.rv-nologo');
      btn.disabled = true;
      const { data } = await api('/api/admin?action=profile_review', {
        method: 'POST',
        body: JSON.stringify({
          id: Number(li.dataset.review), decision,
          startup_name: li.querySelector('.rv-name').value, one_liner: li.querySelector('.rv-one').value,
          problem: li.querySelector('.rv-problem').value, remove_logo: Boolean(nologo && nologo.checked),
        }),
      });
      btn.disabled = false;
      const pmsg = byId('profile-msg');
      if (data.error) { pmsg.className = 'form-msg bad'; pmsg.textContent = data.error; return; }
      pmsg.className = 'form-msg ok';
      pmsg.textContent = { approve: 'Published. It is on the startups page now.', save: 'Edits saved. Not published yet.', unpublish: 'Taken off the site.' }[decision];
      loadPortalAdmin();
    });

    async function loadTeams() {
      const { status, data } = await api('/api/admin?action=teams');
      const list = byId('team-list'), tmsg = byId('team-msg');
      if (status !== 200 || data.error) {
        list.innerHTML = '';
        byId('team-new').disabled = true;
        tmsg.className = 'form-msg bad';
        tmsg.textContent = data.error || 'Could not load teams.';
        return;
      }
      teamsData = data;
      byId('team-new').disabled = false;
      list.innerHTML = data.teams.length
        ? data.teams.map((t) => `
            <li class="team-item" data-team="${t.id}">
              <div>
                <strong>${esc(t.name)}</strong> <span class="hint">${esc(t.cohort)}</span>
                <p>${t.members.length ? t.members.map((m) => esc(m.name)).join(', ') : '<span class="hint">No members yet</span>'}</p>
                ${t.checkinCount ? `<p class="hint">${t.checkinCount} group check-in${t.checkinCount === 1 ? '' : 's'} saved</p>` : ''}
              </div>
              <div class="row-actions">
                <button type="button" data-team-edit="${t.id}">Edit</button>
                <button type="button" data-team-del="${t.id}">Delete</button>
              </div>
            </li>`).join('')
        : '<li class="hint">No teams yet.</li>';
    }

    /* Only people in the team's cohort, and only those not already on another
     * team. Someone on another team is shown but cannot be ticked, with the
     * reason, so the form explains itself instead of failing on save. */
    function renderTeamMembers(selected) {
      const cohort = byId('team-cohort').value;
      const box = byId('team-members');
      const mine = editingTeam ? String(editingTeam.id) : null;
      const people = teamsData.people.filter((p) => p.cohort === cohort);
      box.innerHTML = people.length ? people.map((p) => {
        const onOther = p.teamId && String(p.teamId) !== mine;
        const other = onOther ? teamsData.teams.find((t) => String(t.id) === String(p.teamId)) : null;
        return `<label class="choice"><input type="checkbox" name="team-member" value="${p.id}"` +
          `${selected.has(String(p.id)) ? ' checked' : ''}${onOther ? ' disabled' : ''}> ${esc(p.name)}` +
          `${onOther ? ` <span class="hint">already on ${esc(other ? other.name : 'another team')}</span>` : ''}</label>`;
      }).join('') : '<p class="hint">Nobody admitted in this cohort yet.</p>';
    }

    function openTeamModal(team) {
      editingTeam = team || null;
      byId('team-title').textContent = team ? `Edit ${team.name}` : 'New team';
      byId('team-name').value = team ? team.name : '';
      const sel = byId('team-cohort');
      sel.innerHTML = teamsData.cohorts.map((c) => `<option value="${esc(c)}">${esc(c)}</option>`).join('');
      if (team) sel.value = team.cohort;
      sel.disabled = Boolean(team);
      byId('team-cohort-hint').textContent = team ? 'A team cannot change cohort. Make a new team instead.' : '';
      renderTeamMembers(new Set((team ? team.members : []).map((m) => String(m.id))));
      byId('team-modal-msg').textContent = '';
      byId('team-modal').hidden = false;
      byId('team-name').focus();
    }

    byId('team-new').addEventListener('click', () => { if (teamsData) openTeamModal(null); });
    byId('team-cancel').addEventListener('click', () => { byId('team-modal').hidden = true; });
    byId('team-cohort').addEventListener('change', () => renderTeamMembers(new Set()));

    byId('team-save').addEventListener('click', async () => {
      const tmm = byId('team-modal-msg');
      const name = byId('team-name').value.trim();
      if (!name) { tmm.className = 'form-msg bad'; tmm.textContent = 'Give the team a name.'; return; }
      tmm.className = 'form-msg'; tmm.textContent = 'Saving…';
      const { data } = await api('/api/admin?action=team_save', {
        method: 'POST',
        body: JSON.stringify({
          id: editingTeam ? editingTeam.id : null, name, cohort: byId('team-cohort').value,
          member_ids: [...document.querySelectorAll('input[name="team-member"]:checked')].map((c) => Number(c.value)),
        }),
      });
      if (data.error) { tmm.className = 'form-msg bad'; tmm.textContent = data.error; return; }
      byId('team-modal').hidden = true;
      byId('team-msg').className = 'form-msg ok';
      byId('team-msg').textContent = editingTeam ? 'Team saved.' : 'Team created.';
      loadTeams();
      loadCheckins();
    });

    byId('team-list').addEventListener('click', async (e) => {
      const edit = e.target.closest('[data-team-edit]');
      const del = e.target.closest('[data-team-del]');
      const tmsg = byId('team-msg');
      if (edit) {
        const t = teamsData.teams.find((x) => String(x.id) === edit.dataset.teamEdit);
        if (t) openTeamModal(t);
      } else if (del) {
        const t = teamsData.teams.find((x) => String(x.id) === del.dataset.teamDel);
        if (!t) return;
        const n = t.checkinCount || 0;
        /* Erasing what a group wrote cannot be undone, so it takes the team's
         * name typed out, not just a click. */
        const ok = await askConfirm({
          title: `Delete team ${t.name}?`,
          body: n
            ? `This permanently erases the team's ${n} group check-in${n === 1 ? '' : 's'}. Its members stay admitted and keep their own check-ins. They just stop being grouped.`
            : 'Its members stay admitted and keep their own check-ins. They just stop being grouped.',
          confirmLabel: n ? 'Delete team and check-ins' : 'Delete team',
          requireText: n ? t.name : null,
        });
        if (!ok) return;
        const { data } = await api('/api/admin?action=team_delete', { method: 'POST', body: JSON.stringify({ id: t.id, erase_checkins: n }) });
        if (data.error) { tmsg.className = 'form-msg bad'; tmsg.textContent = data.error; loadTeams(); return; }
        tmsg.className = 'form-msg ok';
        tmsg.textContent = data.erased ? `Team deleted, with its ${data.erased} group check-in${data.erased === 1 ? '' : 's'}.` : 'Team deleted.';
        loadTeams();
        loadCheckins();
      }
    });

    /* The table is a summary. Everything the student and the parent actually
     * wrote lives here, because a decision cannot be made from a name and a
     * startup title alone. */
    const DETAIL_SECTIONS = [
      ['The student', [
        ['cohort', 'Applying to'],
        ['student_name', 'Name'], ['student_email', 'Email'], ['student_phone', 'Phone'],
        ['school_grade', 'School and grade'],
      ]],
      ['The idea', [
        ['startup_name', 'Startup'], ['building', 'What they are building'],
        ['why_join', 'Why they want to join'], ['goals', 'Their goals'],
      ]],
      ['The team', [
        ['team_size', 'Team size'], ['team_other', 'Team, other'],
        ['teammate_names', 'Teammates'], ['teammate_emails', 'Teammate emails'],
      ]],
      ['Attendance and needs', [
        ['can_attend', 'Can make all five'], ['food_allergies', 'Allergies or dietary notes'],
      ]],
      ['How they found us', [
        ['referred', 'Referred by the team'], ['referred_by', 'Who referred them'],
      ]],
      ['Parent or guardian', [
        ['parent_name', 'Named on the application'], ['parent_email', 'Email'],
        ['parent_phone', 'Phone'], ['guardian_name', 'Signed the consent form'],
        ['guardian_relationship', 'Relationship'], ['guardian_email', 'Consent form email'],
        ['guardian_phone', 'Consent form phone'], ['emergency_contact', 'Emergency contact'],
        ['safety_notes', 'Safety, medical or accessibility notes'],
      ]],
      ['Consent', [
        ['consent_participate', 'May take part'], ['consent_transport', 'Transport arranged'],
        ['consent_ai', 'May use AI tools'], ['consent_photo', 'May be photographed'],
        ['consent_alumni', 'May be emailed about alumni check-ins'],
        ['signature', 'Signed'],
      ]],
    ];

    const detailModal = document.getElementById('detail-modal');

    const showValue = (v) => {
      if (v === true) return 'Yes';
      if (v === false) return 'No';
      if (v === null || v === undefined || v === '') return null;
      return String(v);
    };

    async function openDetail(id) {
      const title = document.getElementById('detail-title');
      const body = document.getElementById('detail-body');
      title.textContent = 'Loading';
      body.innerHTML = '';
      detailModal.hidden = false;
      document.getElementById('detail-close').focus();

      const { data } = await api(`/api/admin?action=detail&id=${id}`);
      if (!data.application) {
        title.textContent = 'Could not load it';
        body.innerHTML = `<p class="form-msg bad">${esc(data.error || 'Please try again.')}</p>`;
        return;
      }
      const a = data.application;
      detailApp = a;
      title.textContent = `${a.student_name}, ${STATUS_LABEL[a.status] || a.status}`;

      const parts = [`<p class="detail-meta">Applied ${new Date(a.created_at).toLocaleString()}.` +
        (a.parent_confirmed_at ? ` Parent confirmed ${new Date(a.parent_confirmed_at).toLocaleString()}.` : ' Parent has not confirmed yet.') +
        /* A hand-entered application has never been read by the person whose
         * name is on it, which is worth knowing before trusting a detail. */
        (a.created_by ? ` Entered by ${esc(a.created_by)}, not submitted by the student.` : '') +
        '</p>'];

      DETAIL_SECTIONS.forEach(([heading, fields]) => {
        const rows = fields
          .map(([key, label]) => [label, showValue(a[key])])
          .filter(([, v]) => v !== null);
        if (!rows.length) return;
        parts.push(`<h3 class="detail-head">${esc(heading)}</h3><dl class="detail-list">` +
          rows.map(([label, v]) => `<dt>${esc(label)}</dt><dd>${esc(v)}</dd>`).join('') + '</dl>');
      });

      if (a.decision_letter) {
        parts.push('<h3 class="detail-head">The letter we sent</h3>' +
          `<p class="detail-meta">${esc(a.decision_subject || '')}</p>` +
          `<pre class="preview">${esc(a.decision_letter)}</pre>`);
      }

      if (a.admin_note || a.decline_reason) {
        parts.push('<h3 class="detail-head">Our decision</h3><dl class="detail-list">' +
          (a.decline_reason ? `<dt>Reason shown</dt><dd>${esc(a.decline_reason)}</dd>` : '') +
          (a.admin_note ? `<dt>Note sent</dt><dd>${esc(a.admin_note)}</dd>` : '') + '</dl>');
      }

      if (data.decisions && data.decisions.length) {
        parts.push('<h3 class="detail-head">Decision history</h3><ul class="detail-log">' +
          data.decisions.map((d) => `<li>${esc(d.decision)} by ${esc(d.decided_by)}, ` +
            `${new Date(d.created_at).toLocaleString()}` +
            (d.reason_code ? ` (${esc(d.reason_code)})` : '') + '</li>').join('') + '</ul>');
      }

      if (data.edits && data.edits.length) {
        parts.push('<h3 class="detail-head">Edit history</h3><ul class="detail-log">' +
          data.edits.map((d) => `<li>${esc(d.field.replace(/_/g, ' '))}: ` +
            `${esc(d.old_value || 'blank')} \u2192 ${esc(d.new_value || 'blank')}, ` +
            `by ${esc(d.edited_by)}, ${new Date(d.created_at).toLocaleString()}</li>`).join('') + '</ul>');
      }

      if (data.emails && data.emails.length) {
        parts.push('<h3 class="detail-head">Email log</h3><ul class="detail-log">' +
          data.emails.map((m) => `<li>${esc(m.kind)}: ${esc(m.status)}` +
            (m.error ? ` (${esc(m.error)})` : '') +
            `, ${new Date(m.created_at).toLocaleString()}</li>`).join('') + '</ul>');
      }

      body.innerHTML = parts.join('');
    }

    const closeDetail = () => { detailModal.hidden = true; };
    document.getElementById('detail-close').addEventListener('click', closeDetail);
    detailModal.addEventListener('click', (e) => { if (e.target === detailModal) closeDetail(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !detailModal.hidden) closeDetail();
    });

    /* ---- adding and correcting applications -------------------------------
     *
     * Two jobs, one form. An organiser typing in answers a student sent by
     * text is asking the same questions as an organiser fixing a typo, so the
     * fields, the validation and the markup are shared and only the mode
     * differs. The server does the same: both land in lib/application.js.
     */
    const APPLICANT_FIELDS = [
      'cohort', 'student_name', 'student_phone', 'parent_name', 'parent_email',
      'parent_phone', 'school_grade', 'startup_name', 'building', 'team_size',
      'team_other', 'teammate_names', 'teammate_emails', 'why_join', 'goals',
      'can_attend', 'food_allergies', 'referred', 'referred_by',
    ];

    const appFormModal = document.getElementById('app-form-modal');
    const appForm = document.getElementById('app-form');
    const appFormMsg = document.getElementById('app-form-msg');
    let appFormMode = 'create';
    let appFormId = null;
    let detailApp = null;

    wireCounters(appForm);

    /* A required field that is hidden can never be filled in, so the two are
     * always changed together. Disabling it as well keeps it out of the
     * submitted values entirely. */
    function setFieldActive(wrapId, controlId, active) {
      const wrap = document.getElementById(wrapId);
      const control = document.getElementById(controlId);
      wrap.hidden = !active;
      control.disabled = !active;
      if (active) control.setAttribute('required', '');
      else control.removeAttribute('required');
    }

    /* Same rule as the public form: the name box is only awake when there is
     * someone to name. Run after prefilling too, so opening an application
     * that was referred does not grey out the name already on it. */
    function syncReferredBy() {
      const who = document.getElementById('af-referred_by');
      const picked = appForm.elements.referred;
      const yes = picked && picked.value === 'Yes';
      who.disabled = !yes;
      if (yes) who.setAttribute('required', '');
      else { who.removeAttribute('required'); who.value = ''; clearError(who); }
    }
    appForm.querySelectorAll('input[name="referred"]').forEach((r) => {
      r.addEventListener('change', () => {
        syncReferredBy();
        if (!document.getElementById('af-referred_by').disabled) document.getElementById('af-referred_by').focus();
      });
    });

    function openAppForm(mode, application) {
      appFormMode = mode;
      appFormId = application ? application.id : null;
      appFormMsg.className = 'form-msg';
      appFormMsg.textContent = '';
      appForm.reset();
      appForm.querySelectorAll('.is-invalid').forEach((el) => el.classList.remove('is-invalid'));
      appForm.querySelectorAll('.error-msg').forEach((el) => el.remove());

      const adding = mode === 'create';
      /* The student's email is their account, not an answer on the form, so
       * it is asked for once when the account is made and never edited after.
       * The agreement is a one-time attestation for the same reason. */
      setFieldActive('wrap-student_email', 'af-student_email', adding);
      setFieldActive('wrap-student_agreed', 'af-student_agreed', adding);
      /* The referral question is answered by the student, so it is asked of a
       * new application and never demanded when correcting an old one that was
       * submitted before the question existed. The server agrees. */
      const firstReferred = appForm.querySelectorAll('input[name="referred"]')[0];
      if (adding) firstReferred.setAttribute('required', '');
      else firstReferred.removeAttribute('required');

      document.getElementById('app-form-title').textContent =
        adding ? 'Add an application' : `Edit ${application.student_name}'s answers`;
      document.getElementById('app-form-intro').textContent = adding
        ? 'For answers that came in some other way. Once you save, their parent gets the same consent email they would have got from the form.'
        : 'Their own answers only. The consent their parent signed, the decision and any letter already sent are not changed by this.';
      document.getElementById('app-form-save').textContent = adding ? 'Save and email their parent' : 'Save changes';

      if (application) {
        APPLICANT_FIELDS.forEach((key) => {
          const el = appForm.elements[key];
          if (!el) return;
          const value = application[key] == null ? '' : String(application[key]);
          if (el.length && el[0] && el[0].type === 'radio') {
            [...el].forEach((r) => { r.checked = r.value === value; });
          } else {
            el.value = value;
          }
        });
      }
      syncReferredBy();
      appForm.querySelectorAll('[data-counter]').forEach((ta) => ta.dispatchEvent(new Event('input')));

      appFormModal.hidden = false;
      (adding ? document.getElementById('af-student_email') : appForm.elements.student_name).focus();
    }

    const closeAppForm = () => { appFormModal.hidden = true; };
    document.getElementById('app-form-cancel').addEventListener('click', closeAppForm);
    appFormModal.addEventListener('click', (e) => { if (e.target === appFormModal) closeAppForm(); });
    document.getElementById('add-application').addEventListener('click', () => openAppForm('create', null));
    document.getElementById('detail-edit').addEventListener('click', () => {
      if (!detailApp) return;
      closeDetail();
      openAppForm('edit', detailApp);
    });

    appForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validate(appForm)) {
        appFormMsg.className = 'form-msg bad';
        appFormMsg.textContent = 'Please fix the highlighted answers.';
        return;
      }
      const values = formValues(appForm);
      const save = document.getElementById('app-form-save');
      const label = save.textContent;
      save.disabled = true;
      appFormMsg.className = 'form-msg';
      appFormMsg.textContent = 'Saving…';

      const creating = appFormMode === 'create';
      const payload = creating
        ? { ...values, student_agreed: values.student_agreed === 'Yes' }
        : { id: appFormId, fields: Object.fromEntries(APPLICANT_FIELDS.map((k) => [k, values[k] ?? ''])) };

      const { data } = await api(`/api/admin?action=${creating ? 'create' : 'edit'}`, {
        method: 'POST', body: JSON.stringify(payload),
      });
      save.disabled = false;
      save.textContent = label;

      if (data.errors) {
        Object.entries(data.errors).forEach(([key, text]) => {
          const el = appForm.elements[key];
          if (el) showError(el.length ? el[0] : el, text);
        });
        appFormMsg.className = 'form-msg bad';
        appFormMsg.textContent = 'Please fix the highlighted answers.';
        return;
      }
      if (data.error) {
        appFormMsg.className = 'form-msg bad';
        appFormMsg.textContent = data.error;
        return;
      }

      closeAppForm();
      if (creating) {
        say(data.emailSent
          ? 'Added. Their parent has the consent email.'
          : `Added, but the parent email did not send.${data.parentCode ? ` Code: ${data.parentCode}` : ''}`,
        Boolean(data.emailSent));
      } else {
        say(data.changed
          ? `Saved. ${data.changed} ${data.changed === 1 ? 'answer' : 'answers'} changed.`
          : 'Nothing was different, so nothing changed.', true);
      }
      load();
    });

    /* Row actions. Accept and Decline always go through the preview, never
     * straight to send. */
    rowsEl.addEventListener('click', async (e) => {
      const btn = e.target.closest('button[data-act]');
      if (!btn) return;
      const id = Number(btn.closest('tr').dataset.id);
      const act = btn.dataset.act;

      if (act === 'view') return openDetail(id);

      if (act === 'accept' || act === 'decline') {
        const name = allRows.find((r) => r.id === id);
        return openDecide([id], act === 'accept' ? 'accepted' : 'declined',
          name ? String(name.student_name).trim().split(/\s+/)[0] : null);
      }

      if (act === 'resend') {
        const { data } = await api('/api/admin?action=resend_code', { method: 'POST', body: JSON.stringify({ id }) });
        say(data.ok ? `Code reissued (email ${data.email}).` : data.error, data.ok);
        return;
      }
      if (act === 'withdraw') {
        const ok = await askConfirm({
          title: 'Mark this application withdrawn?',
          body: 'The student keeps their account and can see the status. No email is sent.',
          confirmLabel: 'Withdraw',
        });
        if (!ok) return;
        await api('/api/admin?action=withdraw', { method: 'POST', body: JSON.stringify({ id }) });
        return load();
      }
      if (act === 'delete') {
        const ok = await askConfirm({
          title: 'Delete this application permanently?',
          body: 'This removes the application and the consent record from the database. It cannot be undone.',
          confirmLabel: 'Delete permanently',
          requireText: 'DELETE',
        });
        if (!ok) return;
        /* How many rows are on screen right now, so we can tell the
         * difference between "your delete worked" and "the table also
         * changed underneath you". */
        const onScreen = allRows.length;
        const { data } = await api('/api/admin?action=delete', { method: 'POST', body: JSON.stringify({ id, confirm: 'DELETE' }) });
        if (!data.ok) { say(data.error, false); return load(); }

        const expected = onScreen - 1;
        say(typeof data.remaining === 'number' && data.remaining !== expected
          ? `Deleted that one. ${data.remaining} application${data.remaining === 1 ? '' : 's'} left, not the ${expected} this page was showing, so something else changed too. Reloading.`
          : `Deleted. ${data.remaining} application${data.remaining === 1 ? '' : 's'} left.`, true);
        return load();
      }
    });

    document.getElementById('bulk-accept').addEventListener('click', () => {
      const ids = [...rowsEl.querySelectorAll('.pick:checked')].map((c) => Number(c.value));
      if (!ids.length) return say('Select at least one row first.', false);
      openDecide(ids, 'accepted');
    });

    /* ---- every email sent ---------------------------------------------- */
    (function () {
      const $ = (id) => document.getElementById(id);
      const details = $('admin-emails');
      if (!details) return;
      const body = $('emails-rows');
      let offset = 0, loaded = false, timer = null, token = 0;
      const when = (t) => new Date(t).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
      const KIND = {
        login_code: 'Sign-in code', parent_code: 'Parent code', parent_code_admin: 'Parent code (admin)',
        parent_code_resend: 'Parent code (resent)', password_reset: 'Password reset',
        password_changed: 'Password changed', consent_parent: 'Consent received (parent)',
        consent_student: 'Consent received (student)', student_notice: 'Application received',
        code_expired: 'Code expired', checkin_invite: 'Check-ins opened', digest: 'Daily digest',
        partner_notice: 'Partner enquiry', partner_thanks: 'Partner thank-you',
        custom: 'Custom', custom_bcc: 'Custom (BCC)',
      };
      const kindName = (k) => {
        if (KIND[k]) return KIND[k];
        let m = /^reminder_(\d+)d$/.exec(k); if (m) return `Parent reminder (${m[1]} days)`;
        m = /^decision_(\w+)$/.exec(k); if (m) return `Decision notice (${m[1]})`;
        return k;
      };
      const who = (e) => {
        if (!e.recipient_count) return '<span class="hint">not recorded</span>';
        const shown = e.recipients.map(esc).join(', ') +
          (e.reconstructed ? ' <span class="hint" title="Sent before this log kept details. Rebuilt from the application record.">rebuilt</span>' : '');
        const more = e.recipient_count - e.recipients.length;
        return (e.bcc ? '<span class="hint">BCC</span> ' : '') + shown + (more > 0 ? ` <span class="hint">+${more} more</span>` : '');
      };

      async function load(reset) {
        const mine = ++token;
        if (reset) { offset = 0; body.innerHTML = ''; }
        const qs = new URLSearchParams({
          action: 'emails', offset: String(offset), q: $('emails-q').value.trim(),
          status: $('emails-status').value, kind: $('emails-kind').value,
        });
        $('emails-msg').className = 'form-msg'; $('emails-msg').textContent = 'Loading\u2026';
        const { ok, status, data } = await api(`/api/admin?${qs}`).catch(() => ({ ok: false, status: 0, data: {} }));
        if (mine !== token) return;          // a newer search superseded this one
        if (!ok && !data.error) data.error = `The email list did not load (${status || 'no connection'}${status === 504 ? ', timed out' : ''}). Close and reopen this section to try again.`;
        if (data.error) { loaded = false; $('emails-msg').className = 'form-msg bad'; $('emails-msg').textContent = data.error; return; }
        $('emails-msg').textContent = '';
        if (reset) {
          const sel = $('emails-kind'); const cur = sel.value;
          sel.innerHTML = '<option value="">All</option>' +
            (data.kinds || []).map((k) => `<option value="${esc(k)}">${esc(kindName(k))}</option>`).join('');
          sel.value = cur;
        }
        body.insertAdjacentHTML('beforeend', (data.emails || []).map((e) => `
          <tr data-id="${e.id}">
            <td>${esc(when(e.created_at))}</td>
            <td>${esc(kindName(e.kind))}</td>
            <td>${who(e)}${e.student_name ? `<br><span class="hint">${esc(e.student_name)}</span>` : ''}</td>
            <td>${esc(e.subject || '')}</td>
            <td>${esc(e.status)}${e.error ? ` <span class="hint">${esc(e.error)}</span>` : ''}</td>
            <td><button type="button" class="link-btn" data-open="${e.id}">Open</button></td>
          </tr>`).join(''));
        if (!body.children.length) body.innerHTML = '<tr><td colspan="6">No emails match.</td></tr>';
        offset = data.nextOffset;
        $('emails-more').hidden = !data.hasMore;
      }

      /* Loaded the first time it is opened, so the admin page does not pay
       * for a query nobody asked for. */
      details.addEventListener('toggle', () => { if (details.open && !loaded) { loaded = true; load(true); } });
      $('emails-more').addEventListener('click', () => load(false));
      $('emails-status').addEventListener('change', () => load(true));
      $('emails-kind').addEventListener('change', () => load(true));
      $('emails-q').addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => load(true), 300); });

      const modal = $('email-modal');
      const closeModal = () => { modal.hidden = true; };
      $('email-close').addEventListener('click', closeModal);
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
      body.addEventListener('click', async (ev) => {
        const btn = ev.target.closest('button[data-open]');
        if (!btn) return;
        const { data } = await api(`/api/admin?action=email&id=${btn.dataset.open}`);
        if (data.error) { $('emails-msg').className = 'form-msg bad'; $('emails-msg').textContent = data.error; return; }
        const e = data.email;
        $('email-title').textContent = e.subject || kindName(e.kind);
        $('email-meta').textContent =
          `${kindName(e.kind)}  \u00b7  ${e.status}  \u00b7  ${when(e.created_at)}` +
          (e.student_name ? `  \u00b7  ${e.student_name}` : '') + (e.error ? `  \u00b7  ${e.error}` : '') +
          (e.reconstructed ? '  \u00b7  rebuilt from the application record' : '');
        $('email-to').textContent = (e.recipients && e.recipients.length)
          ? (e.bcc ? `BCC (${e.recipients.length}):\n` : '') + e.recipients.join('\n') +
            (e.reconstructed ? '\n\nRebuilt from the application as it is now. If an address was edited after this was sent, this shows the new one.' : '')
          : 'Not recorded. Sent before this log existed, and it cannot be traced to an application.';
        const bodyEl = $('email-body');
        bodyEl.classList.toggle('rich', Boolean(e.body_html));
        if (e.body_html) bodyEl.innerHTML = e.body_html;   // server-escaped; only our own tags
        else bodyEl.textContent = e.body != null ? e.body
          : e.reconstructed
            ? 'The text of emails sent before this log existed was never kept. The subject above is the current wording for this type of email.'
            : (e.recipients && e.recipients.length)
              ? 'Text not kept for this type of email. It can carry a sign-in code or a link, so only who it went to and the subject are recorded.'
              : 'Not recorded.';
        modal.hidden = false;
      });
    })();

    /* ---- custom email -------------------------------------------------- */
    (function () {
      const modal = document.getElementById('compose-modal');
      const $ = (id) => document.getElementById(id);
      const cmsg = $('compose-msg');
      const audience = () => document.querySelector('input[name="compose-audience"]:checked')?.value;
      let sendId = '';
      let busy = false;
      const tell = (t, ok) => { cmsg.className = `form-msg ${ok ? 'ok' : 'bad'}`; cmsg.textContent = t || ''; };
      const close = () => { modal.hidden = true; };

      function syncAudience() {
        $('compose-status-wrap').hidden = audience() !== 'all';
        $('compose-hint').textContent = audience() === 'all'
          ? 'Everyone goes in BCC, so no family sees another family\u2019s address.'
          : 'Each person gets their own copy, addressed only to them.';
      }

      $('compose-open').addEventListener('click', () => {
        const n = rowsEl.querySelectorAll('.pick:checked').length;
        $('compose-aud-ids-label').textContent = n
          ? `The ${n} applicant${n === 1 ? '' : 's'} I ticked`
          : 'The applicants I ticked (none ticked yet)';
        $('compose-aud-ids').disabled = !n;
        (n ? $('compose-aud-ids') : $('compose-aud-all')).checked = true;
        $('compose-status').value = '';
        $('compose-subject').value = '';
        $('compose-message').value = '';
        $('compose-message').dispatchEvent(new Event('input'));
        tell('');
        /* One id per opening of the dialog. A double click, or the same send
         * retried, reuses it, and the server treats it as the same email. */
        sendId = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2));
        syncAudience();
        modal.hidden = false;
        $('compose-subject').focus();
      });

      /* Formatting: wraps the selection in markers the server turns into HTML. */
      const box = $('compose-message');
      function wrap(open, close, placeholder) {
        let a = box.selectionStart, b = box.selectionEnd;
        /* Double-clicking a word often grabs the space after it; keep that
         * space outside the markers so "**word **" never happens. */
        while (a < b && /\s/.test(box.value[a])) a++;
        while (b > a && /\s/.test(box.value[b - 1])) b--;
        const sel = box.value.slice(a, b) || placeholder;
        box.setRangeText(open + sel + close, a, b, 'end');
        box.setSelectionRange(a + open.length, a + open.length + sel.length);
        box.focus();
        box.dispatchEvent(new Event('input'));
      }
      function format(kind) {
        if (kind === 'bold') wrap('**', '**', 'bold text');
        else if (kind === 'italic') wrap('*', '*', 'italic text');
        else if (kind === 'underline') wrap('__', '__', 'underlined text');
        else if (kind === 'link') {
          const url = window.prompt('Link address (https://\u2026)', 'https://');
          if (!url || !/^(https?:\/\/|mailto:)\S+$/i.test(url.trim())) return;
          wrap('[', `](${url.trim()})`, 'link text');
        } else if (kind === 'bullet') {
          const v = box.value, a = box.selectionStart, b = box.selectionEnd;
          const start = v.lastIndexOf('\n', a - 1) + 1;
          const block = v.slice(start, b).split('\n').map((l) => (/^\s*-\s/.test(l) ? l : `- ${l}`)).join('\n');
          box.setRangeText(block, start, b, 'end');
          box.focus();
          box.dispatchEvent(new Event('input'));
        }
      }
      document.querySelectorAll('.fmt-btn').forEach((btn) => btn.addEventListener('click', () => format(btn.dataset.fmt)));
      box.addEventListener('keydown', (e) => {
        if (!(e.ctrlKey || e.metaKey) || e.shiftKey || e.altKey) return;
        const k = { b: 'bold', i: 'italic', u: 'underline', k: 'link' }[e.key.toLowerCase()];
        if (k) { e.preventDefault(); format(k); }
      });

      document.querySelectorAll('input[name="compose-audience"]').forEach((r) => r.addEventListener('change', syncAudience));
      $('compose-cancel').addEventListener('click', close);
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden && $('confirm-modal').hidden) close();
      });

      $('compose-send').addEventListener('click', async () => {
        if (busy) return;
        const subject = $('compose-subject').value.trim();
        const message = $('compose-message').value.trim();
        if (!subject) return tell('Write a subject.', false);
        if (!message) return tell('Write a message.', false);
        const payload = {
          audience: audience(),
          ids: audience() === 'ids' ? [...rowsEl.querySelectorAll('.pick:checked')].map((c) => Number(c.value)) : [],
          status: audience() === 'all' ? $('compose-status').value : '',
          recipients: $('compose-recipients').value,
          subject, message, send_id: sendId,
        };
        busy = true;
        tell('Counting recipients\u2026', true);
        try {
          const dry = await api('/api/admin?action=send_custom', {
            method: 'POST', body: JSON.stringify({ ...payload, dryRun: true }),
          });
          if (dry.data.error) return tell(dry.data.error, false);
          const n = dry.data.count;
          const ok = await askConfirm({
            title: `Send to ${n} address${n === 1 ? '' : 'es'}?`,
            body: payload.audience === 'all'
              ? `"${subject}" goes to ${n} address${n === 1 ? '' : 'es'}, all in BCC. This cannot be undone.`
              : `"${subject}" goes to ${n} address${n === 1 ? '' : 'es'}, each as a separate email. This cannot be undone.`,
            confirmLabel: 'Send',
          });
          if (!ok) return tell('');
          tell('Sending\u2026', true);
          const { data } = await api('/api/admin?action=send_custom', {
            method: 'POST', body: JSON.stringify(payload),
          });
          if (data.error) return tell(data.error, false);
          close();
          say(data.testMode
            ? `Test mode: nothing was delivered. ${data.sent} logged as skipped.`
            : `Sent to ${data.sent} address${data.sent === 1 ? '' : 'es'}.` + (data.failed ? ` ${data.failed} failed, see the failed count above.` : ''),
            !data.failed);
          load();
        } finally { busy = false; }
      });
    })();

    function say(text, ok) {
      msg.className = `form-msg ${ok ? 'ok' : 'bad'}`;
      msg.textContent = text || '';
    }

    function openDecide(ids, decision, label) {
      pending = { ids, decision, label };
      const isDecline = decision === 'declined';
      document.getElementById('decide-title').textContent =
        `${isDecline ? 'Decline' : 'Accept'} ${ids.length === 1 ? 'this application' : `${ids.length} applications`}`;
      document.getElementById('decline-extra').hidden = !isDecline;
      document.getElementById('note-hint').textContent = isDecline
        ? 'This is our default wording. Send it as it is, or edit it. A decline cannot go out with this box empty.'
        : 'This is our default wording. Send it as it is, or edit it. It appears in the letter exactly as written.';
      /* Starts from the default letter, so sending a good one is one click
       * and writing your own is an edit rather than a blank page. */
      const note = document.getElementById('personal-note');
      note.value = (isDecline ? DEFAULTS.decline : DEFAULTS.accept) || '';
      note.dispatchEvent(new Event('input'));   // keeps the counter in step
      document.getElementById('decide-send').disabled = true;
      document.getElementById('decide-msg').textContent = '';
      document.getElementById('draft-note').textContent =
        'Sends only their first name and what they wrote about their idea. You edit it before anything goes out.';
      modal.hidden = false;
      note.focus();
      note.setSelectionRange(note.value.length, note.value.length);
      refreshPreview();
    }

    document.getElementById('decide-cancel').addEventListener('click', () => { modal.hidden = true; pending = null; });

    /* The organiser must look at one real rendered email before sending,
     * including for a bulk accept. */
    /* The letter is rendered by the server, so the preview is the real thing
     * rather than a second implementation that could drift from it. Typing
     * refreshes it, debounced, and a stale reply never overwrites a newer
     * one. */
    let previewTimer = null;
    let previewSeq = 0;

    async function refreshPreview() {
      if (!pending) return;
      const out = document.getElementById('preview-out');
      const seq = ++previewSeq;
      const { data } = await api('/api/admin?action=preview', {
        method: 'POST',
        body: JSON.stringify({
          id: pending.ids[0], decision: pending.decision,
          personal_note: document.getElementById('personal-note').value,
          reason_code: document.getElementById('reason-code').value,
        }),
      });
      if (seq !== previewSeq) return;   // a later keystroke already won
      out.hidden = false;
      if (data.error) {
        /* The row went away while this tab sat open, usually because someone
         * else deleted it. Say that, rather than printing the server's word
         * into the middle of a letter. */
        out.textContent = data.notFound
          ? 'This application is no longer in the database. Someone may have deleted it. Close this and reload the page.'
          : data.error;
        document.getElementById('decide-send').disabled = true;
        if (data.notFound) load();
        return;
      }
      out.textContent = `To: ${data.to.join(', ')}\nSubject: ${data.subject}\n\n${data.text}`;
      document.getElementById('decide-send').disabled = false;
    }

    const schedulePreview = () => {
      clearTimeout(previewTimer);
      previewTimer = setTimeout(refreshPreview, 250);
    };

    document.getElementById('draft-btn').addEventListener('click', draftNote);
    document.getElementById('personal-note').addEventListener('input', schedulePreview);
    document.getElementById('reason-code').addEventListener('change', refreshPreview);
    document.getElementById('preview-btn').addEventListener('click', refreshPreview);

    document.getElementById('decide-send').addEventListener('click', async () => {
      if (!pending) return;
      const dmsg = document.getElementById('decide-msg');
      const note = document.getElementById('personal-note').value;
      const count = pending.ids.length;
      const who = count === 1 ? pending.label || 'this student' : `${count} students`;
      const ok = await askConfirm({
        title: `Send to ${who} and ${count === 1 ? 'their parent' : 'their parents'}?`,
        body: 'This records the decision and puts this letter in their portal. The email they receive is a short notice telling them to go and read it.',
        confirmLabel: `Send to ${who}`,
      });
      if (!ok) return;
      dmsg.className = 'form-msg';
      dmsg.textContent = 'Sending…';
      const { data } = await api('/api/admin?action=decide', {
        method: 'POST',
        body: JSON.stringify({
          ids: pending.ids, decision: pending.decision, personal_note: note,
          reason_code: document.getElementById('reason-code').value,
          internal_reason: document.getElementById('internal-reason').value,
        }),
      });
      if (data.error) { dmsg.className = 'form-msg bad'; dmsg.textContent = data.error; return; }
      modal.hidden = true;
      pending = null;
      say(`Done. ${data.results.length} processed.`, true);
      load();
    });

    load();
  })();

  /* =====================================================================
   * Sticky header edge. The scroll rail and the hero drift went with the
   * elements they animated; the map's ink draw replaced them.
   * ===================================================================== */
  var head = document.querySelector('.site-head');
  var ticking = false;

  function onScrollFrame() {
    ticking = false;
    if (head) head.classList.toggle('is-stuck', (window.scrollY || window.pageYOffset) > 8);
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(onScrollFrame); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScrollFrame();

  /* ----------------------------------------------- current section in nav */
  var sections = ['path', 'questions', 'team', 'support']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var links = {};
    Array.prototype.forEach.call(document.querySelectorAll('.nav-list a[href^="#"]'), function (a) {
      links[a.getAttribute('href').slice(1)] = a;
    });

    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var a = links[entry.target.id];
        if (!a) return;
        if (entry.isIntersecting) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

})();
