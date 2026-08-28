// Shared Firebase ID token verification for the new engagement endpoints
// (api/notify.js). api/casper.js and api/referral.js keep their own inline
// copies — not touched here, no reason to risk already-shipped code for a
// pure dedupe. Leading underscore keeps Vercel from treating this as its own
// route (same convention as api/_gamification.js).
//
// Verifies a Firebase ID token per Google's documented manual-verification
// steps: RS256 signature against the matching public cert, plus issuer,
// audience, and expiry checks. No service-account credentials needed for
// verification itself — only FIREBASE_PROJECT_ID.

const crypto = require("crypto");

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

module.exports = { verifyFirebaseIdToken };
