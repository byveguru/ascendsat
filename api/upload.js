// Vercel serverless function that uploads an image to Vercel Blob on the
// caller's behalf — the replacement for Firebase Storage, which requires
// the Blaze (pay-as-you-go) plan to provision at all.
//
// The file travels through this function as a base64 string rather than
// using @vercel/blob's client-side "direct upload" package: that package
// imports Node's "undici" module in a way Metro (Expo's web bundler) can't
// resolve, breaking the whole web build. Routing through this function
// instead avoids Metro ever needing to bundle @vercel/blob at all — it only
// runs here, in real Node.js on Vercel. Images here are always small
// (compressed logos/question figures, capped below), so the base64
// request-body size stays comfortably under Vercel's request limit.
//
// Request:  POST { path, contentType, dataBase64 }
//           Authorization: Bearer <Firebase ID token>
// Response: { url }
//
// Fraud model: the caller never gets to pick an arbitrary path — only
// org-logos/{orgId}/... (re-verified against that org's own adminUids) or
// question-images/... (re-verified against the single admin account) are
// accepted, matching storage.rules' old restrictions exactly.

const { put } = require("@vercel/blob");
const { verifyFirebaseIdToken } = require("./_auth");
const { admin, db } = require("./_firebaseAdmin");

const ADMIN_EMAIL = "admin@ascendsat.com";
const ALLOWED_CONTENT_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
// 1:1 Tutoring Q&A image attachments — deliberately narrower than the
// general list above (no webp/gif): the product only wants to accept
// png/heic/jpg here, so a client-side rejection ("we don't accept that
// format") is backed by the same restriction server-side.
const TUTOR_QA_IMAGE_CONTENT_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/heic", "image/heif"];
const MAX_BYTES = 4 * 1024 * 1024;

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
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(500).json({ error: "Vercel Blob is not configured on this project yet" });
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
  const { path, contentType, dataBase64 } = body || {};
  if (!path || !dataBase64) return res.status(400).json({ error: "Missing path or file data" });
  if (contentType && !ALLOWED_CONTENT_TYPES.includes(contentType) && !TUTOR_QA_IMAGE_CONTENT_TYPES.includes(contentType)) {
    return res.status(400).json({ error: "Unsupported image type" });
  }

  try {
    if (path.startsWith("org-logos/")) {
      const orgId = path.split("/")[1];
      const orgSnap = await db.collection("organizations").doc(orgId || "").get();
      const org = orgSnap.exists ? orgSnap.data() : {};
      if (!Array.isArray(org.adminUids) || !org.adminUids.includes(uid)) {
        return res.status(403).json({ error: "Not an admin of this organization" });
      }
    } else if (path.startsWith("question-images/")) {
      // Admin Auth SDK, not the Firestore users doc — the authoritative
      // source, same as every other admin-email check in this app.
      const authUser = await admin.auth().getUser(uid);
      if (authUser.email !== ADMIN_EMAIL) {
        return res.status(403).json({ error: "Admin only" });
      }
    } else if (path.startsWith("tutor-qa-images/")) {
      // 1:1 Tutoring Q&A attachments — path shape is
      // tutor-qa-images/{relId}/{uid}/{filename}; re-verify the caller is
      // actually a participant (student or tutor) on that exact
      // relationship, same fraud-model as api/tutor.js's own actions.
      if (contentType && !TUTOR_QA_IMAGE_CONTENT_TYPES.includes(contentType)) {
        return res.status(400).json({ error: "We don't accept that file format — please upload a PNG, HEIC, or JPG." });
      }
      const relId = path.split("/")[1];
      const relSnap = await db.collection("tutorRelationships").doc(relId || "").get();
      const rel = relSnap.exists ? relSnap.data() : {};
      if (rel.studentUid !== uid && rel.tutorUid !== uid) {
        return res.status(403).json({ error: "Not part of this conversation" });
      }
    } else {
      return res.status(400).json({ error: "Unrecognized upload path" });
    }

    const buffer = Buffer.from(dataBase64, "base64");
    if (buffer.length > MAX_BYTES) {
      return res.status(413).json({ error: "Image is too large — please choose a file under 4MB." });
    }

    const blob = await put(path, buffer, {
      access: "public",
      contentType: contentType || "image/jpeg",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return res.status(200).json({ url: blob.url });
  } catch (e) {
    return res.status(500).json({ error: e.message || "Upload failed" });
  }
};
