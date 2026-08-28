// Vercel serverless function for client-triggered engagement emails (badge
// unlocks today; extend the `type` switch for future ones). Same auth
// pattern as api/casper.js / api/referral.js — Firebase ID token verified
// server-side, so this can't be used to spam an arbitrary address on
// someone else's behalf. Scheduled sends (streak-at-risk, weekly recap) live
// in api/cron-daily.js instead, since those aren't triggered by a client
// action.
//
// Request:  POST { type: "badge_unlock", badgeId, badgeName }
//           Authorization: Bearer <Firebase ID token>
// Response: { ok: true, sent: boolean }  (sent is false when the user has
//            opted out, or has no email on file, or Brevo isn't configured —
//            none of those are treated as request failures)

const { verifyFirebaseIdToken } = require("./_auth");
const { admin, db } = require("./_firebaseAdmin");
const { sendBrevoEmail, emailShell } = require("./_brevo");

const APP_URL = "https://ascendsat.com";

async function handleBadgeUnlock(uid, body) {
  const badgeName = String(body.badgeName || "a new badge").trim();
  const userSnap = await db.collection("users").doc(uid).get();
  const prefs = userSnap.exists ? userSnap.data().emailPrefs : null;
  // Badge emails default ON (celebratory, low-volume) — only skip if the
  // user explicitly opted out.
  if (prefs && prefs.badgeUnlocks === false) return false;

  let authUser;
  try {
    authUser = await admin.auth().getUser(uid);
  } catch (e) {
    return false;
  }
  if (!authUser.email) return false;

  await sendBrevoEmail({
    to: authUser.email,
    subject: `You just earned "${badgeName}" 🎉`,
    htmlContent: emailShell({
      heading: `New badge: ${badgeName}`,
      bodyHtml: `<p>Nice work — you just unlocked <strong>${badgeName}</strong> on AscendSAT. Keep it up.</p>`,
      ctaLabel: "See your badges",
      ctaUrl: `${APP_URL}`,
    }),
  });
  return true;
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

  const authHeader = req.headers.authorization || req.headers.Authorization || "";
  const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
  if (!idToken) return res.status(401).json({ error: "Sign in required" });

  let uid;
  try {
    uid = await verifyFirebaseIdToken(idToken, projectId);
  } catch (e) {
    return res.status(401).json({ error: "Invalid or expired session" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { return res.status(400).json({ error: "Invalid JSON body" }); }
  }
  const { type } = body || {};

  try {
    let sent = false;
    if (type === "badge_unlock") {
      sent = await handleBadgeUnlock(uid, body);
    } else {
      return res.status(400).json({ error: "Unknown notification type" });
    }
    return res.status(200).json({ ok: true, sent });
  } catch (e) {
    return res.status(500).json({ error: e.message || "Notification failed" });
  }
};
