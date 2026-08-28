// Vercel serverless function for referral-raffle qualification tracking.
// Runs on the free Vercel plan and needs no Firebase Blaze upgrade — the
// Firestore-trigger version of this (Cloud Functions) requires Blaze because
// deploying a Cloud Function needs Cloud Build/Artifact Registry, which are
// billed services regardless of usage. This project stays on Firebase's free
// Spark plan (same reason api/casper.js exists instead of a `casperChat`
// Cloud Function) and instead does the equivalent server-side write via the
// Firebase Admin SDK, called explicitly by the client right after the two
// moments that matter: a referred signup, and a quiz submission.
//
// Request:  POST { action: "join", code } | { action: "credit", scoreId }
//           Authorization: Bearer <Firebase ID token>
// Response: { ok: true }
//
// Fraud model: raffles/{id}/progress/{inviterUid} and raffles/{id}/entries/{inviterUid}
// have `allow write: if false` in firestore.rules — no client, however it
// calls this endpoint, can write those paths directly. This endpoint uses
// the Admin SDK (which bypasses security rules) to write them, but it never
// trusts client-supplied qualification data: "join" looks the code up itself
// (a one-time-use doc under raffles/{id}/codes, claimed exactly once inside
// a transaction — not whatever the client claims the inviter/raffle is), and
// "credit" re-reads the actual `scores` doc by ID and verifies its `userId`
// matches the caller before crediting anything, rather than trusting a
// client-supplied question count.

const crypto = require("crypto");
const admin = require("firebase-admin");
const { sendBrevoEmail, emailShell } = require("./_brevo");

const APP_URL = "https://ascendsat.com";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Vercel env vars store literal "\n" for newlines in a multi-line
      // secret; the PEM key needs them decoded back to real newlines.
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    }),
  });
}
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

// --- Firebase ID token verification (identical approach to api/casper.js) ---
const GOOGLE_CERTS_URL =
  "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";
let certCache = { certs: null, expiresAt: 0 };

async function getGoogleCerts() {
  if (certCache.certs && Date.now() < certCache.expiresAt) return certCache.certs;
  const res = await fetch(GOOGLE_CERTS_URL);
  if (!res.ok) throw new Error("Could not fetch Google signing certs");
  const certs = await res.json();
  const cc = res.headers.get("cache-control") || "";
  const maxAge = Number((cc.match(/max-age=(\d+)/) || [])[1] || 3600);
  certCache = { certs, expiresAt: Date.now() + maxAge * 1000 };
  return certs;
}

const b64urlToBuf = (s) => Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/"), "base64");

async function verifyFirebaseIdToken(token, projectId) {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Malformed token");
  const [headerB64, payloadB64, sigB64] = parts;

  const header = JSON.parse(b64urlToBuf(headerB64).toString("utf8"));
  const payload = JSON.parse(b64urlToBuf(payloadB64).toString("utf8"));

  if (header.alg !== "RS256") throw new Error("Unexpected token algorithm");

  const certs = await getGoogleCerts();
  const cert = certs[header.kid];
  if (!cert) throw new Error("Unknown token key id");

  const verifier = crypto.createVerify("RSA-SHA256");
  verifier.update(`${headerB64}.${payloadB64}`);
  if (!verifier.verify(cert, b64urlToBuf(sigB64))) throw new Error("Bad token signature");

  const nowSec = Math.floor(Date.now() / 1000);
  if (payload.exp <= nowSec) throw new Error("Token expired");
  if (payload.iat > nowSec + 300) throw new Error("Token issued in the future");
  if (payload.aud !== projectId) throw new Error("Token audience mismatch");
  if (payload.iss !== `https://securetoken.google.com/${projectId}`) {
    throw new Error("Token issuer mismatch");
  }
  const uid = payload.sub || payload.user_id;
  if (!uid) throw new Error("Token missing subject");
  return uid;
}

// A brand-new invitee joins every raffle that's active right now. Idempotent
// via referralProcessedAt — calling this twice for the same user is a no-op
// the second time — a user can redeem exactly one invite code, ever.
async function handleJoin(uid, code) {
  code = String(code || "").trim().toUpperCase();
  if (!code) return;

  const userRef = db.collection("users").doc(uid);
  const userSnap = await userRef.get();
  if (userSnap.exists && userSnap.data().referralProcessedAt) return;

  // Codes are one-time-use and scoped under a specific raffle
  // (raffles/{raffleId}/codes/{codeId}), but the invitee only ever sees the
  // bare code string — find it regardless of which raffle it belongs to.
  const codeQuery = await db.collectionGroup("codes").where("code", "==", code).limit(1).get();
  if (codeQuery.empty) {
    await userRef.set({ referralProcessedAt: FieldValue.serverTimestamp() }, { merge: true });
    return;
  }
  const codeDoc = codeQuery.docs[0];
  const codeData = codeDoc.data();
  const inviterUid = codeData.inviterUid;
  const raffleId = codeDoc.ref.parent.parent.id;

  if (codeData.used || !inviterUid || inviterUid === uid) {
    // Already claimed, malformed, or a self-referral — stop reprocessing.
    await userRef.set({ referralProcessedAt: FieldValue.serverTimestamp() }, { merge: true });
    return;
  }

  const raffleSnap = await db.collection("raffles").doc(raffleId).get();
  if (!raffleSnap.exists || raffleSnap.data().active !== true) {
    await userRef.set({ referralProcessedAt: FieldValue.serverTimestamp() }, { merge: true });
    return;
  }

  const progressRef = db.collection("raffles").doc(raffleId).collection("progress").doc(inviterUid);
  let claimed = false;
  await db.runTransaction(async (tx) => {
    const [codeSnapTx, progressSnapTx] = await Promise.all([tx.get(codeDoc.ref), tx.get(progressRef)]);
    if (codeSnapTx.data().used) return; // someone else claimed it first

    const data = progressSnapTx.exists
      ? progressSnapTx.data()
      : { invitees: {}, joinedCount: 0, qualifiedCount: 0, entered: false };
    data.invitees = {
      ...(data.invitees || {}),
      [uid]: { joinedAt: FieldValue.serverTimestamp(), questionCount: 0, qualified: false, qualifiedAt: null },
    };
    data.joinedCount = (data.joinedCount || 0) + 1;

    tx.set(progressRef, data, { merge: true });
    tx.set(codeDoc.ref, { used: true, usedByUid: uid, usedAt: FieldValue.serverTimestamp() }, { merge: true });
    claimed = true;
  });
  if (!claimed) {
    await userRef.set({ referralProcessedAt: FieldValue.serverTimestamp() }, { merge: true });
    return;
  }

  await userRef.set(
    {
      referredBy: code,
      referralInviterUid: inviterUid,
      referralRaffleId: raffleId,
      referralProcessedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
}

// Credits a quiz submission toward the one raffle the submitter joined via
// their invite code. Re-reads the scores doc itself (rather than trusting a
// client-supplied count) and confirms it actually belongs to the caller.
async function handleCredit(uid, scoreId) {
  scoreId = String(scoreId || "");
  if (!scoreId) return;

  const scoreSnap = await db.collection("scores").doc(scoreId).get();
  if (!scoreSnap.exists) return;
  const score = scoreSnap.data();
  if (score.userId !== uid) return; // can't credit using someone else's score doc

  const arrLen = Array.isArray(score.questions) ? score.questions.length : 0;
  const credited = Math.max(0, Math.min(score.total || 0, arrLen || score.total || 0, 100));
  if (credited <= 0) return;

  const userSnap = await db.collection("users").doc(uid).get();
  const userData = userSnap.exists ? userSnap.data() : null;
  const inviterUid = userData ? userData.referralInviterUid : null;
  const raffleId = userData ? userData.referralRaffleId : null;
  if (!inviterUid || !raffleId) return; // this user wasn't referred into any raffle

  const raffleRef = db.collection("raffles").doc(raffleId);
  const raffleSnap = await raffleRef.get();
  if (!raffleSnap.exists || raffleSnap.data().active !== true) return; // deactivated since — stop crediting it

  const requiredInvitees = Number(raffleSnap.data().requiredInvitees) || 3;
  const questionsPerInvitee = Number(raffleSnap.data().questionsPerInvitee) || 20;
  const progressRef = raffleRef.collection("progress").doc(inviterUid);
  const entryRef = raffleRef.collection("entries").doc(inviterUid);

  // Captured from inside the transaction so the emails below can fire after
  // it commits — Firestore retries a transaction on contention, and sending
  // mail is a side effect that must not run more than once per real change.
  let didQualify = false;
  let didEnter = false;

  await db.runTransaction(async (tx) => {
    didQualify = false;
    didEnter = false;
    const snap = await tx.get(progressRef);
    if (!snap.exists) return; // no join record for this raffle — nothing to credit
    const data = snap.data();
    const invitees = { ...(data.invitees || {}) };
    const entry = invitees[uid];
    if (!entry || entry.qualified) return; // frozen — never re-credit a qualified invitee

    entry.questionCount = Math.min(questionsPerInvitee, (entry.questionCount || 0) + credited);
    let newlyQualified = false;
    if (entry.questionCount >= questionsPerInvitee) {
      entry.qualified = true;
      entry.qualifiedAt = FieldValue.serverTimestamp();
      newlyQualified = true;
    }
    invitees[uid] = entry;
    data.invitees = invitees;
    if (newlyQualified) data.qualifiedCount = (data.qualifiedCount || 0) + 1;

    // All reads must happen before any writes in a Firestore transaction —
    // resolve whether this crosses the raffle threshold (a second read, on
    // entryRef) before issuing either write below.
    const willEnter = data.qualifiedCount >= requiredInvitees && !data.entered;
    let entryAlreadyExists = false;
    if (willEnter) {
      const entrySnap = await tx.get(entryRef);
      entryAlreadyExists = entrySnap.exists;
      if (!entryAlreadyExists) {
        data.entered = true;
        data.enteredAt = FieldValue.serverTimestamp();
      }
    }

    tx.set(progressRef, data, { merge: true });
    if (willEnter && !entryAlreadyExists) {
      tx.create(entryRef, {
        inviterUid,
        qualifiedCount: data.qualifiedCount,
        enteredAt: FieldValue.serverTimestamp(),
      });
    }
    didQualify = newlyQualified;
    didEnter = willEnter && !entryAlreadyExists;
  });

  if (didQualify || didEnter) {
    await sendReferralProgressEmail(inviterUid, raffleSnap.data(), { didQualify, didEnter });
  }
}

async function sendReferralProgressEmail(inviterUid, raffle, { didQualify, didEnter }) {
  const inviterSnap = await db.collection("users").doc(inviterUid).get();
  if (!inviterSnap.exists) return;
  const inviter = inviterSnap.data();
  if (inviter.emailPrefs && inviter.emailPrefs.referralUpdates === false) return;
  if (!inviter.email) return;

  const raffleTitle = raffle.title || "the raffle";
  const heading = didEnter ? "You're entered in the raffle!" : "A friend just qualified";
  const bodyHtml = didEnter
    ? `<p>All your invited friends have qualified — you're now entered in <strong>${raffleTitle}</strong>${raffle.prize ? ` for <strong>${raffle.prize}</strong>` : ""}. Good luck!</p>`
    : `<p>One of your invited friends just hit the question goal for <strong>${raffleTitle}</strong>. Check your Promotions tab to see how close you are.</p>`;

  await sendBrevoEmail({
    to: inviter.email,
    subject: didEnter ? `You're entered in ${raffleTitle}` : "A friend just qualified",
    htmlContent: emailShell({ heading, bodyHtml, ctaLabel: "View progress", ctaUrl: APP_URL }),
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
  const { action } = body || {};

  try {
    if (action === "join") {
      await handleJoin(uid, body.code);
    } else if (action === "credit") {
      await handleCredit(uid, body.scoreId);
    } else {
      return res.status(400).json({ error: "Unknown action" });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: e.message || "Referral processing failed" });
  }
};
