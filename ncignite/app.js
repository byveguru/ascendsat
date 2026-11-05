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

  /* A signed-in student should see where to go, not an invitation to sign
   * in again. The nav is static HTML, so this adjusts it after load. */
  (function () {
    const signup = document.querySelector('.nav-signup');
    if (!signup) return;
    api('/api/auth?action=me').then(({ data }) => {
      /* Signed in, so "Sign up" is the wrong door. Point at their own page. */
      if (data && data.signedIn) {
        signup.textContent = 'My application';
        signup.href = '/status';
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
        setTimeout(() => { window.location.href = '/status'; }, 2200);
        return;
      }
      /* A new account goes straight to the application, which is the only
       * reason to create one. A returning student goes to their status.
       * An old account with no password is sent to set one. */
      if (!isSignup && data.hasPassword === false) {
        window.location.href = '/status#password';
        return;
      }
      window.location.href = isSignup ? '/apply' : '/status';
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
      window.location.href = '/status';
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
      setTimeout(() => { window.location.href = '/status'; }, 900);
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
        signedAs.innerHTML = `Signed in as ${data.signedInAs}. <button type="button" id="signout">Sign out</button>`;
        document.getElementById('signout').addEventListener('click', async () => {
          await api('/api/auth?action=logout', { method: 'POST' });
          window.location.href = '/';
        });
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

    api('/api/auth?action=me').then(({ data }) => {
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
      if (!hasPassword || window.location.hash === '#password') {
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
    let openWeek = null;

    const show = (id) => {
      ['ci-loading', 'ci-signedout', 'ci-notstarted', 'ci-open', 'ci-closed']
        .forEach((x) => { document.getElementById(x).hidden = x !== id; });
    };
    const say = (text, kind) => { msg.className = `form-msg ${kind || ''}`; msg.textContent = text; };

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

    function render(week) {
      document.getElementById('ci-week').textContent = week.week;
      document.getElementById('ci-range').textContent = week.range;
      listEl.innerHTML = '';
      const goals = week.goals.length ? week.goals : [{ text: '', done: false }, { text: '', done: false }];
      goals.forEach((g) => listEl.appendChild(goalRow(g)));
      helpEl.value = week.helpNeeded || '';
      helpEl.dispatchEvent(new Event('input'));
    }

    function renderHistory(weeks) {
      const done = weeks.filter((w) => w.started);
      if (done.length < 2) return;
      const ol = document.getElementById('week-history');
      ol.innerHTML = done.map((w) => {
        const ticked = w.goals.filter((g) => g.done).length;
        let state;
        if (!w.closed) state = 'open now';
        else if (w.missing) state = 'nothing written';
        else state = `${ticked} of ${w.goals.length || 0} done` + (w.late ? ', late' : '');
        return `<li class="${w.closed ? 'wk-closed' : 'wk-open'}">` +
          `<span class="wk-name">${esc(w.week)}</span>` +
          `<span class="wk-range">${esc(w.range)}</span>` +
          `<span class="wk-state">${esc(state)}</span></li>`;
      }).join('');
      document.getElementById('ci-history').hidden = false;
    }

    async function save() {
      if (!openWeek) return;
      say('Saving\u2026');
      const { status, data } = await api('/api/checkin', {
        method: 'POST',
        body: JSON.stringify({
          week_start: openWeek.weekStart,
          goals: readGoals(),
          help_needed: helpEl.value,
        }),
      });
      if (data.error) return say(data.error, 'bad');
      say(data.late
        ? 'Saved, and marked late. This one was due at 11:59 PM the night before the session, so your organiser will see it came in afterwards.'
        : 'Saved. You can keep editing until the deadline.', data.late ? 'bad' : 'ok');
    }

    function load() {
      return api('/api/checkin').then(({ status, data }) => {
        loading.hidden = true;
        if (status === 401 || data.signInRequired) return show('ci-signedout');
        if (data.notStarted) {
          document.getElementById('ci-notstarted-msg').textContent = data.message;
          return show('ci-notstarted');
        }

        document.getElementById('ci-deadline').textContent = data.deadlineNote;
        renderHistory(data.weeks);

        openWeek = data.weeks.find((w) => w.weekStart === data.openWeek) || null;
        if (!openWeek) {
          const next = data.weeks.find((w) => !w.started);
          document.getElementById('ci-closed-msg').textContent = next
            ? `Your next check-in opens on ${next.range.split(' to ')[0]}, the day of the session.`
            : 'Every check-in for your cohort is done. Thank you for keeping it up to date.';
          return show('ci-closed');
        }
        render(openWeek);
        show('ci-open');
      }).catch(() => { loading.hidden = true; show('ci-signedout'); });
    }

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
      document.getElementById('student-strip').innerHTML =
        `<strong>${info.studentFirstName}</strong><span>${info.school}</span>`;
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

    /* Check-ins, as a grid of students against weeks. A blank cell is the
     * signal, not the noise: it means a student wrote nothing that week. */
    function loadCheckins() {
      api('/api/admin?action=checkins').then(({ data }) => {
        if (!data || !Array.isArray(data.students) || !data.students.length) return;
        const weeks = data.weeks || [];
        const section = document.getElementById('admin-checkins');

        const label = (w) => {
          const [y, m, d] = w.slice(0, 10).split('-').map(Number);
          return new Date(Date.UTC(y, m - 1, d))
            .toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
        };

        document.getElementById('checkin-head').innerHTML =
          '<th scope="col">Student</th>' +
          weeks.map((w) => `<th scope="col">${esc(label(w))}</th>`).join('') +
          '<th scope="col">Ticked</th>';

        document.getElementById('checkin-rows').innerHTML = data.students.map((st) => {
          let done = 0, total = 0;
          const cells = weeks.map((w) => {
            const wk = st.weeks.find((x) => String(x.weekStart) === w);
            /* Three states, not two. Nothing at all is a different problem
             * from something handed in late, and an organiser chasing one
             * should not be reading the other. */
            if (!wk || !wk.firstSavedAt) {
              return wk === undefined || !wk.weekClosed
                ? '<td class="ci-blank" title="Nothing yet, and the week is still open">&mdash;</td>'
                : '<td class="ci-missing" title="Nothing was written and the week has closed">Missing</td>';
            }
            done += wk.done; total += wk.total;
            /* The ratio matters more than the count: two of two is a good
             * week, two of nine is a student who needs a hand. */
            const ratio = wk.total ? wk.done / wk.total : 0;
            const cls = ratio === 1 ? 'ci-all' : ratio >= 0.5 ? 'ci-some' : 'ci-few';
            const goals = wk.goals.map((g) => (g.done ? '\u2713 ' : '\u25a1 ') + g.text).join('\n');
            const lateTag = wk.late ? '<span class="ci-late" title="Written after the deadline">late</span>' : '';
            return `<td class="${cls}" title="${esc(goals)}">${wk.done}/${wk.total}${lateTag}</td>`;
          }).join('');
          return `<tr><th scope="row">${esc(st.name)}</th>${cells}` +
            `<td class="ci-total">${total ? done + '/' + total : '&mdash;'}</td></tr>`;
        }).join('');

        /* Newest first: what someone needs help with this week matters more
         * than what they needed three weeks ago. */
        const asks = [];
        data.students.forEach((st) => st.weeks.forEach((w) => {
          if (w.helpNeeded) asks.push({ name: st.name, week: w.weekStart, text: w.helpNeeded });
        }));
        asks.sort((a, b) => String(b.week).localeCompare(String(a.week)));
        document.getElementById('checkin-help').innerHTML = asks.length
          ? asks.map((a) => `<li><span class="ask-who">${esc(a.name)}</span>` +
              `<span class="ask-when">${esc(label(String(a.week)))}</span>` +
              `<p>${esc(a.text)}</p></li>`).join('')
          : '<li class="ask-none">Nobody has written anything here yet.</li>';

        section.hidden = false;
      }).catch(() => {});
    }

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
