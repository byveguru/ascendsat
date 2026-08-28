// Vercel serverless function for 1:1 Paid Tutoring actions that need a
// cross-user write no Firestore rule can express safely, or that must be
// transactionally tamper-proof against the client (credit/session
// balances) — same reasoning as api/org.js, which this mirrors exactly.
//
// Request:  POST { action: "grantTutorRole", email }
//           POST { action: "createCheckoutSession", offeringId, studentName, embedded }
//           POST { action: "sendQaMessage", relId, text }
//           POST { action: "sendMeetingLink", relId, meetingLink }
//           POST { action: "matchTutor", purchaseId, tutorUid }
//           Authorization: Bearer <Firebase ID token>
// Response: { ok: true, ... }
//
// Fraud model: never trusts client-supplied uids/emails for authorization —
// re-derives the caller's own admin status from Firebase Auth itself
// (admin.auth().getUser(uid).email), the same claim firestore.rules'
// isAdmin() checks, rather than a client-writable Firestore field.

const Stripe = require("stripe");
const { verifyFirebaseIdToken } = require("./_auth");
const { admin, db, FieldValue } = require("./_firebaseAdmin");

const ADMIN_EMAIL = "admin@ascendsat.com";
const APP_URL = "https://ascendsat.com";

async function requireAdmin(uid) {
  const caller = await admin.auth().getUser(uid);
  if (caller.email !== ADMIN_EMAIL) throw new Error("Admin access required");
}

// Grants the "tutor" role to an existing account (looked up by email, so
// the admin doesn't need to know a uid) and creates their tutor profile
// stub — the tutor fills in bio/Calendly link themselves afterward via the
// tutors/{uid} doc (see firestore.rules' isOwner(tutorUid) clause). No
// pricing lives here anymore — see classOfferings, a shared catalog not
// owned by any one tutor, since a purchase gets matched to a tutor after
// the fact rather than picking one upfront.
async function handleGrantTutorRole(callerUid, email) {
  await requireAdmin(callerUid);

  const trimmedEmail = String(email || "").trim().toLowerCase();
  if (!trimmedEmail) throw new Error("Email is required");

  const targetUser = await admin.auth().getUserByEmail(trimmedEmail);
  const targetUid = targetUser.uid;
  const userRef = db.collection("users").doc(targetUid);
  const tutorRef = db.collection("tutors").doc(targetUid);

  await db.runTransaction(async (tx) => {
    const userSnap = await tx.get(userRef);
    const userData = userSnap.exists ? userSnap.data() : {};
    const roles = Array.isArray(userData.roles) ? userData.roles : ["student"];

    tx.set(
      userRef,
      { roles: roles.includes("tutor") ? roles : [...roles, "tutor"] },
      { merge: true }
    );
    tx.set(
      tutorRef,
      {
        displayName: userData.name || targetUser.displayName || "",
        bio: "",
        photoUrl: "",
        calendlyLink: "",
        active: true,
        createdAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  });

  return { uid: targetUid };
}

// Creates a Stripe Checkout Session for one class — references the
// admin-managed classOfferings/{offeringId} doc's Stripe Price (set in the
// admin console, mapping 1:1 to a product created in the Stripe Dashboard)
// rather than building a price inline, so the client only ever supplies
// which offering, never an amount. No tutor is chosen at this point —
// matching happens after purchase, see matchTutor below —
// so metadata only carries studentUid/offeringId; stripe-webhook.js reads
// that to create the unmatched tutorPurchases record.
//
// Two ui_modes, matching what the client can actually render: `embedded`
// (web only — the client mounts Stripe's embedded_page form inline via
// @stripe/react-stripe-js, which needs a browser DOM and can't run on
// native) returns a client_secret to mount; anything else falls back to
// the hosted redirect flow (a URL to open, native's only option since it
// has no DOM to embed into).
async function handleCreateCheckoutSession(studentUid, offeringId, studentName, embedded) {
  const trimmedOfferingId = String(offeringId || "").trim();
  if (!trimmedOfferingId) throw new Error("offeringId is required");

  const offeringSnap = await db.collection("classOfferings").doc(trimmedOfferingId).get();
  if (!offeringSnap.exists) throw new Error("That class offering isn't available");
  const offering = offeringSnap.data();
  if (!offering.active || !offering.stripePriceId) throw new Error("That class offering isn't available");

  if (!process.env.STRIPE_SECRET_KEY) throw new Error("Stripe is not configured on the server");
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [{ price: offering.stripePriceId, quantity: 1 }],
    // studentName/offeringLabel are self-asserted (whatever the student's
    // own profile / the offering's own label say) — display-label only,
    // never used for authorization, same trust level as any other
    // client-supplied label in this app.
    metadata: {
      studentUid,
      offeringId: trimmedOfferingId,
      studentName: String(studentName || "").slice(0, 100),
      offeringLabel: String(offering.label || "").slice(0, 100),
    },
    ...(embedded
      ? { ui_mode: "embedded_page", return_url: `${APP_URL}/?tutorCheckout=success&session_id={CHECKOUT_SESSION_ID}` }
      : { success_url: `${APP_URL}/?tutorCheckout=success`, cancel_url: `${APP_URL}/?tutorCheckout=cancel` }),
  });

  if (embedded) return { clientSecret: session.client_secret };

  return { url: session.url };
}

// Admin-only: assigns a tutor to an unmatched purchase — this is the
// action that actually creates/credits the tutorRelationships doc (a
// purchase alone doesn't, since no tutor is known at Stripe checkout time
// anymore). Transactional because it both marks the purchase matched AND
// grants its credits into the relationship; re-running it on an
// already-matched purchase is a safe no-op (checked before writing), so a
// double-click in the admin UI can't double-grant.
async function handleMatchTutor(callerUid, purchaseId, tutorUid) {
  await requireAdmin(callerUid);

  const trimmedPurchaseId = String(purchaseId || "").trim();
  const trimmedTutorUid = String(tutorUid || "").trim();
  if (!trimmedPurchaseId || !trimmedTutorUid) throw new Error("purchaseId and tutorUid are required");

  const tutorSnap = await db.collection("tutors").doc(trimmedTutorUid).get();
  if (!tutorSnap.exists) throw new Error("Tutor not found");

  const purchaseRef = db.collection("tutorPurchases").doc(trimmedPurchaseId);

  await db.runTransaction(async (tx) => {
    const purchaseSnap = await tx.get(purchaseRef);
    if (!purchaseSnap.exists) throw new Error("Purchase not found");
    const purchase = purchaseSnap.data();
    if (purchase.matched) return; // already matched — safe no-op on a repeat call

    const relRef = db.collection("tutorRelationships").doc(`${purchase.studentUid}_${trimmedTutorUid}`);
    const relSnap = await tx.get(relRef);

    tx.set(purchaseRef, { matched: true, matchedTutorUid: trimmedTutorUid, matchedAt: FieldValue.serverTimestamp() }, { merge: true });
    tx.set(
      relRef,
      {
        studentUid: purchase.studentUid,
        tutorUid: trimmedTutorUid,
        ...(purchase.studentName ? { studentName: purchase.studentName } : {}),
        messageCreditsRemaining: FieldValue.increment(purchase.messageCreditsGranted || 20),
        sessionsRemaining: FieldValue.increment(purchase.sessionsGranted || 1),
        updatedAt: FieldValue.serverTimestamp(),
        ...(relSnap.exists ? {} : { createdAt: FieldValue.serverTimestamp() }),
      },
      { merge: true }
    );
  });
}

// The credit-metered "ask a question" thread. Whether this spends a credit
// depends on who's sending: the student's own messages are what the 20-per-
// class quota is for, so those require the relationship to be qaUnlocked
// (see sendMeetingLink — the tutor hasn't sent a real meeting yet
// otherwise) AND messageCreditsRemaining > 0, and decrement the latter; the
// tutor's replies never spend credits or need the unlock, so those just
// write through. Runs as a transaction so a burst of rapid sends can't race
// past 0.
async function handleSendQaMessage(callerUid, relId, text) {
  const trimmedText = String(text || "").trim();
  if (!trimmedText) throw new Error("Message text is required");
  const trimmedRelId = String(relId || "").trim();
  if (!trimmedRelId) throw new Error("relId is required");

  const relRef = db.collection("tutorRelationships").doc(trimmedRelId);

  await db.runTransaction(async (tx) => {
    const relSnap = await tx.get(relRef);
    if (!relSnap.exists) throw new Error("Relationship not found");
    const rel = relSnap.data();
    const isStudent = rel.studentUid === callerUid;
    const isTutor = rel.tutorUid === callerUid;
    if (!isStudent && !isTutor) throw new Error("You're not part of this conversation");

    const msgRef = relRef.collection("qaMessages").doc();

    if (isStudent) {
      if (!rel.qaUnlockedAt) throw new Error("Your tutor hasn't sent a meeting link yet — plan a time in the Plan a Meeting tab first.");
      const remaining = rel.messageCreditsRemaining || 0;
      if (remaining <= 0) throw new Error("No questions remaining — buy another class to keep asking.");
      tx.set(msgRef, { senderUid: callerUid, text: trimmedText, createdAt: FieldValue.serverTimestamp(), creditsRemainingAfter: remaining - 1 });
      tx.set(relRef, { messageCreditsRemaining: remaining - 1, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
    } else {
      tx.set(msgRef, { senderUid: callerUid, text: trimmedText, createdAt: FieldValue.serverTimestamp() });
    }
  });
}

// The tutor's "I sent the Google Meet link" action — posts the link into
// the scheduling chat AND, in the same transaction, spends one of the
// purchased sessionsRemaining and (first time only) sets qaUnlockedAt,
// which is what actually opens the Ask a Question tab for the student. A
// dedicated action rather than a plain chat message so there's no ambiguity
// about which message started the clock — see api/tutor.js's header.
// qaUnlockedAt is only ever set once (checked before setting) and never
// cleared: after the first confirmed meeting, later purchases just add
// more sessionsRemaining/messageCreditsRemaining to the same open chat
// rather than re-locking it.
async function handleSendMeetingLink(callerUid, relId, meetingLink) {
  const trimmedRelId = String(relId || "").trim();
  const trimmedLink = String(meetingLink || "").trim();
  if (!trimmedRelId || !trimmedLink) throw new Error("relId and meetingLink are required");

  const relRef = db.collection("tutorRelationships").doc(trimmedRelId);
  const msgRef = relRef.collection("schedulingMessages").doc();

  await db.runTransaction(async (tx) => {
    const relSnap = await tx.get(relRef);
    if (!relSnap.exists) throw new Error("Relationship not found");
    const rel = relSnap.data();
    if (rel.tutorUid !== callerUid) throw new Error("Only the tutor can send a meeting link");
    const sessionsRemaining = rel.sessionsRemaining || 0;
    if (sessionsRemaining <= 0) throw new Error("No sessions remaining — the student needs to buy another class first.");

    tx.set(msgRef, {
      senderUid: callerUid,
      text: trimmedLink,
      isMeetingLink: true,
      createdAt: FieldValue.serverTimestamp(),
    });
    tx.set(
      relRef,
      {
        sessionsRemaining: sessionsRemaining - 1,
        updatedAt: FieldValue.serverTimestamp(),
        ...(rel.qaUnlockedAt ? {} : { qaUnlockedAt: FieldValue.serverTimestamp() }),
      },
      { merge: true }
    );
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
    if (action === "grantTutorRole") {
      const result = await handleGrantTutorRole(uid, body.email);
      return res.status(200).json({ ok: true, ...result });
    } else if (action === "createCheckoutSession") {
      const result = await handleCreateCheckoutSession(uid, body.offeringId, body.studentName, body.embedded);
      return res.status(200).json({ ok: true, ...result });
    } else if (action === "sendQaMessage") {
      await handleSendQaMessage(uid, body.relId, body.text);
      return res.status(200).json({ ok: true });
    } else if (action === "sendMeetingLink") {
      await handleSendMeetingLink(uid, body.relId, body.meetingLink);
      return res.status(200).json({ ok: true });
    } else if (action === "matchTutor") {
      await handleMatchTutor(uid, body.purchaseId, body.tutorUid);
      return res.status(200).json({ ok: true });
    } else {
      return res.status(400).json({ error: "Unknown action" });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message || "Tutor action failed" });
  }
};
