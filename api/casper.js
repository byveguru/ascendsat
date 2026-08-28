// Vercel serverless proxy for Groq (Casper AI tutor + wrong-answer analysis + AP FRQ grading).
// Keeps GROQ_API_KEY server-side (set it in Vercel → Project → Settings → Environment Variables).
// Replaces the Firebase `casperChat` Cloud Function, which required the paid Blaze plan.
//
// Request:  POST { messages: [...], maxTokens?: number }
//           Authorization: Bearer <Firebase ID token>
// Response: { reply: string }  (matches the old callable's shape so the client stays simple)
//
// Auth: the caller must present a valid Firebase ID token. Without this the
// endpoint is a public, unmetered relay to a paid LLM API — the client-side
// `auth.currentUser` check is not a control, since anyone can call this URL
// directly. Verification is done against Google's public signing certs, so no
// service-account credentials are needed here — only FIREBASE_PROJECT_ID.

const crypto = require("crypto");

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.1-8b-instant";
// Only models the client is allowed to request via the optional `model` param.
// Keeps the proxy from being turned into an open relay for arbitrary models.
const ALLOWED_MODELS = new Set([
  "llama-3.1-8b-instant",
  // Groq deprecated/shut down the llama-4-scout and llama-4-maverick preview
  // models (2026-07-17 and 2026-03-09 respectively); gpt-oss-120b is Groq's
  // recommended reasoning-tier replacement for maverick.
  "openai/gpt-oss-120b",
]);

// Request-shape caps. A single abusive call could otherwise ship a megabyte of
// prompt (billed per input token) or request an enormous completion.
const MAX_TOKENS_CEILING = 2000;
const MAX_MESSAGES = 40;
const MAX_TOTAL_CHARS = 60000;

// Per-user request budget. Serverless instances aren't shared, so this is a
// best-effort per-instance throttle, not a global guarantee — it blunts a
// single-user hot loop but is not a substitute for a real shared-store limiter
// (see FUTURE note at the bottom).
const RATE_WINDOW_MS = 60_000;
const RATE_MAX_PER_WINDOW = 20;
const rateBuckets = new Map();

function rateLimited(uid) {
  const now = Date.now();
  const bucket = rateBuckets.get(uid);
  if (!bucket || now - bucket.start > RATE_WINDOW_MS) {
    rateBuckets.set(uid, { start: now, count: 1 });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_MAX_PER_WINDOW;
}

const GOOGLE_CERTS_URL =
  "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";
let certCache = { certs: null, expiresAt: 0 };

async function getGoogleCerts() {
  if (certCache.certs && Date.now() < certCache.expiresAt) return certCache.certs;
  const res = await fetch(GOOGLE_CERTS_URL);
  if (!res.ok) throw new Error("Could not fetch Google signing certs");
  const certs = await res.json();
  // Respect Google's cache-control so we refresh when keys rotate.
  const cc = res.headers.get("cache-control") || "";
  const maxAge = Number((cc.match(/max-age=(\d+)/) || [])[1] || 3600);
  certCache = { certs, expiresAt: Date.now() + maxAge * 1000 };
  return certs;
}

const b64urlToBuf = (s) => Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/"), "base64");

// Verifies a Firebase ID token per Google's documented manual-verification
// steps: RS256 signature against the matching public cert, plus issuer,
// audience, and expiry checks. Returns the token's uid, or throws.
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

module.exports = async (req, res) => {
  // CORS — the Expo web build is same-origin, but native (iOS/Android) calls cross-origin.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "GROQ_API_KEY not configured on the server" });

  const projectId = process.env.FIREBASE_PROJECT_ID;
  if (!projectId) {
    return res.status(500).json({ error: "FIREBASE_PROJECT_ID not configured on the server" });
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

  if (rateLimited(uid)) {
    return res.status(429).json({ error: "Too many requests — slow down and try again in a minute." });
  }

  // Body may arrive parsed (Vercel default) or as a raw string, depending on content-type.
  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { return res.status(400).json({ error: "Invalid JSON body" }); }
  }
  const { messages, maxTokens, model, responseFormat } = body || {};
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages array required" });
  }
  if (messages.length > MAX_MESSAGES) {
    return res.status(413).json({ error: "Conversation too long" });
  }
  const totalChars = messages.reduce(
    (sum, m) => sum + (typeof m?.content === "string" ? m.content.length : 0),
    0
  );
  if (totalChars > MAX_TOTAL_CHARS) {
    return res.status(413).json({ error: "Message content too large" });
  }

  const chosenModel = typeof model === "string" && ALLOWED_MODELS.has(model) ? model : GROQ_MODEL;
  const cappedMaxTokens = Math.min(
    typeof maxTokens === "number" && maxTokens > 0 ? maxTokens : 1000,
    MAX_TOKENS_CEILING
  );

  try {
    const groqRes = await fetch(GROQ_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: chosenModel,
        max_tokens: cappedMaxTokens,
        messages,
        // The PDF importer asks for strict JSON; forward it when requested.
        ...(responseFormat === "json" ? { response_format: { type: "json_object" } } : {}),
      }),
    });

    if (!groqRes.ok) {
      const detail = await groqRes.text();
      return res.status(502).json({ error: `Groq API ${groqRes.status}`, detail });
    }

    const data = await groqRes.json();
    const reply = data?.choices?.[0]?.message?.content || "";
    return res.status(200).json({ reply });
  } catch (e) {
    return res.status(500).json({ error: e.message || "Groq request failed" });
  }
};

// FUTURE: rateBuckets lives in per-instance memory, so the limit above is only
// enforced within a single warm serverless instance. For a hard global cap
// (and for daily/monthly spend ceilings), back it with a shared store —
// Firestore, Upstash Redis, or Vercel KV — keyed by uid.
