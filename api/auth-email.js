// Vercel serverless function that replaces Firebase Auth's own default-
// templated emails (verification link, password reset link) with ones sent
// through Brevo, plus a new welcome email that didn't exist before.
//
// Email verification uses a typed 6-digit code rather than a click-through
// link — the code lives server-only in emailVerifyCodes/{uid} (Firestore
// rules give that collection `allow read, write: if false`, so it's only
// ever reachable via this Admin-SDK-backed endpoint, never the client SDK —
// otherwise an already-authenticated-but-unverified user could just read
// their own code out of Firestore directly and "verify" without ever
// opening the email, defeating the point). Confirming the right code calls
// admin.auth().updateUser(uid, {emailVerified:true}) directly — that's the
// only thing that actually flips Firebase Auth's own verified flag.
//
// Password reset still uses Firebase's own link (generatePasswordResetLink)
// since that flow already ends on Firebase's hosted reset-password page;
// only who *sends* the email changes here, not the mechanism.
//
// Request:  POST { type: "sendCode" } | { type: "confirmCode", code } | { type: "welcome" }
//           Authorization: Bearer <ID token>
//           POST { type: "reset", email } — no auth (the user isn't logged in yet)
// Response: { ok: true, ... } — see each handler for the extra fields.

const { verifyFirebaseIdToken } = require("./_auth");
const { admin, db, FieldValue } = require("./_firebaseAdmin");
const { sendBrevoEmail, emailShell } = require("./_brevo");

const APP_URL = "https://ascendsat.com";
const actionCodeSettings = { url: APP_URL, handleCodeInApp: false };
const CODE_TTL_MS = 15 * 60 * 1000;
const MAX_CODE_ATTEMPTS = 5;

async function handleSendCode(uid) {
  const user = await admin.auth().getUser(uid);
  if (!user.email || user.emailVerified) return;
  const code = String(Math.floor(100000 + Math.random() * 900000));
  await db.collection("emailVerifyCodes").doc(uid).set({
    code,
    expiresAt: Date.now() + CODE_TTL_MS,
    attempts: 0,
  });
  await sendBrevoEmail({
    to: user.email,
    subject: `Your AscendSAT verification code: ${code}`,
    htmlContent: emailShell({
      heading: "Verify your email",
      bodyHtml: `<p>Enter this code to finish setting up your AscendSAT account:</p><p style="font-size:32px;font-weight:800;letter-spacing:8px;margin:18px 0">${code}</p><p>This code expires in 15 minutes.</p>`,
    }),
  });
}

async function handleConfirmCode(uid, submittedCode) {
  submittedCode = String(submittedCode || "").trim();
  const ref = db.collection("emailVerifyCodes").doc(uid);
  const snap = await ref.get();
  if (!snap.exists) return { verified: false, error: "No code on file — request a new one." };
  const data = snap.data();
  if (Date.now() > data.expiresAt) {
    await ref.delete();
    return { verified: false, error: "That code expired — request a new one." };
  }
  if ((data.attempts || 0) >= MAX_CODE_ATTEMPTS) {
    await ref.delete();
    return { verified: false, error: "Too many attempts — request a new code." };
  }
  if (submittedCode !== data.code) {
    await ref.set({ attempts: (data.attempts || 0) + 1 }, { merge: true });
    return { verified: false, error: "Incorrect code." };
  }
  await admin.auth().updateUser(uid, { emailVerified: true });
  await ref.delete();
  return { verified: true };
}

// Idempotent — signup can trigger this from more than one code path (or
// retry), and a duplicate welcome email is a low-stakes annoyance rather
// than the fraud-shaped bugs elsewhere in this app, so a simple read-then-
// write guard (no transaction) is enough here.
async function handleWelcome(uid) {
  const userRef = db.collection("users").doc(uid);
  const userSnap = await userRef.get();
  if (userSnap.exists && userSnap.data().welcomeEmailSentAt) return;
  const user = await admin.auth().getUser(uid);
  if (!user.email) return;
  await userRef.set({ welcomeEmailSentAt: FieldValue.serverTimestamp() }, { merge: true });

  // Firestore's `name` (set during onboarding) is what the rest of the app
  // calls the user by — prefer it over Auth's displayName, which is only
  // ever populated for Google sign-in.
  const name = String((userSnap.exists && userSnap.data().name) || user.displayName || "").trim();
  const greeting = name ? `Hi ${name},` : "Hi,";

  await sendBrevoEmail({
    to: user.email,
    subject: "Welcome to AscendSAT",
    htmlContent: emailShell({
      heading: "Welcome to AscendSAT",
      bodyHtml: `
        <p>${greeting}</p>
        <p>Welcome to AscendSAT. We're excited to have you here.</p>
        <p>AscendSAT was built with one goal: to make high-quality test prep accessible to everyone. Whether you're preparing for the SAT, ACT, or AP exams, you'll receive a personalized study experience designed to help you improve efficiently.</p>
        <p>Here's what you can do:</p>
        <ul style="margin:0 0 16px;padding-left:20px;line-height:1.7">
          <li>Take a diagnostic to identify your strengths and weaknesses.</li>
          <li>Complete personalized daily practice.</li>
          <li>Track your progress with detailed analytics.</li>
          <li>Build streaks and stay consistent.</li>
          <li>Review every mistake with clear explanations.</li>
        </ul>
        <p>The more consistently you practice, the more accurately AscendSAT can adapt to your learning and recommend what to study next.</p>
        <p>If you ever have feedback, ideas, or run into any issues, simply reply to this email. We read every message and are constantly improving the platform based on student feedback.</p>
        <p>Thanks for joining us, and good luck with your studies.</p>
        <p>The AscendSAT Team</p>
      `,
    }),
  });
}

// Deliberately unauthenticated (that's the whole point of "forgot
// password") and deliberately silent about whether the account exists —
// the old client-side sendPasswordResetEmail call surfaced Firebase's own
// "no user found" error to the caller, which leaks account existence to
// anyone who tries an email address. This always resolves the same way
// regardless. A short per-account cooldown keeps this open endpoint from
// being used to burn through Brevo's send quota.
async function handleReset(email) {
  email = String(email || "").trim().toLowerCase();
  if (!email) return;
  let user;
  try {
    user = await admin.auth().getUserByEmail(email);
  } catch (e) {
    return; // no such account — say nothing
  }
  const userRef = db.collection("users").doc(user.uid);
  const userSnap = await userRef.get();
  const lastSentAt = userSnap.exists ? userSnap.data().lastPasswordResetRequestAt : null;
  if (lastSentAt && Date.now() - lastSentAt.toMillis() < 60 * 1000) return;
  await userRef.set({ lastPasswordResetRequestAt: FieldValue.serverTimestamp() }, { merge: true });

  const link = await admin.auth().generatePasswordResetLink(email, actionCodeSettings);
  await sendBrevoEmail({
    to: email,
    subject: "Reset your AscendSAT password",
    htmlContent: emailShell({
      heading: "Reset your password",
      bodyHtml: "<p>Click below to choose a new password. If you didn't request this, you can ignore this email.</p>",
      ctaLabel: "Reset password",
      ctaUrl: link,
    }),
  });
}

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const projectId = process.env.FIREBASE_PROJECT_ID;
  if (!projectId || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
    return res.status(500).json({ error: "Firebase service account not configured on the server" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { return res.status(400).json({ error: "Invalid JSON body" }); }
  }
  const { type } = body || {};

  try {
    if (type === "reset") {
      await handleReset(body.email);
      return res.status(200).json({ ok: true });
    }

    // sendCode/confirmCode/welcome all require the caller to actually be the
    // account in question.
    const authHeader = req.headers.authorization || req.headers.Authorization || "";
    const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
    if (!idToken) return res.status(401).json({ error: "Sign in required" });
    let uid;
    try {
      uid = await verifyFirebaseIdToken(idToken, projectId);
    } catch (e) {
      return res.status(401).json({ error: "Invalid or expired session" });
    }

    if (type === "sendCode") {
      await handleSendCode(uid);
      return res.status(200).json({ ok: true });
    }
    if (type === "confirmCode") {
      const result = await handleConfirmCode(uid, body.code);
      return res.status(200).json({ ok: true, ...result });
    }
    if (type === "welcome") {
      await handleWelcome(uid);
      return res.status(200).json({ ok: true });
    }
    return res.status(400).json({ error: "Unknown type" });
  } catch (e) {
    return res.status(500).json({ error: e.message || "Email send failed" });
  }
};
