// Shared Firebase Admin SDK init for the new engagement endpoints
// (api/notify.js, api/cron-daily.js). api/referral.js keeps its own inline
// copy of this — not touched here, no reason to risk already-shipped code
// for a pure dedupe. Leading underscore keeps Vercel from treating this as
// its own route (same convention as api/_gamification.js).

const admin = require("firebase-admin");

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

module.exports = { admin, db: admin.firestore(), FieldValue: admin.firestore.FieldValue };
