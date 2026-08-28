// Vercel serverless function receiving Stripe's checkout.session.completed
// webhook for 1:1 Paid Tutoring purchases. Verifies Stripe's signature
// against the RAW request body — bodyParser is disabled below because
// Stripe signs the exact bytes it sent; a JSON-parsed-then-reserialized
// body won't reproduce the same signature even for a legitimate event.
// Idempotent on the Stripe session id (doc ID on tutorPurchases), so a
// retried webhook delivery can't double-record the same purchase.
//
// Only records the purchase as unmatched — no tutor is chosen at checkout
// time (see api/tutor.js's header for why), so this never touches
// tutorRelationships directly. An admin's matchTutor call is what actually
// grants the credits once a tutor is assigned.
//
// Configure in the Stripe Dashboard: an endpoint pointed at
// https://ascendsat.com/api/stripe-webhook, subscribed to
// checkout.session.completed, with its signing secret set as this
// project's STRIPE_WEBHOOK_SECRET env var (alongside STRIPE_SECRET_KEY).

const Stripe = require("stripe");
const { db, FieldValue } = require("./_firebaseAdmin");

module.exports.config = { api: { bodyParser: false } };

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

// Creates the unmatched purchase record only — no tutor is known at
// checkout time anymore (see api/tutor.js's header), so this can't credit
// a tutorRelationships doc directly the way it used to. An admin's
// matchTutor call is what actually grants these credits once a tutor is
// assigned; this function's job is just to record that the purchase
// happened, exactly once, so it's ready to be matched.
async function recordUnmatchedPurchase(stripeSessionId, studentUid, offeringId, studentName, offeringLabel) {
  const purchaseRef = db.collection("tutorPurchases").doc(stripeSessionId);
  const offeringRef = db.collection("classOfferings").doc(offeringId);

  await db.runTransaction(async (tx) => {
    const [purchaseSnap, offeringSnap] = await Promise.all([tx.get(purchaseRef), tx.get(offeringRef)]);
    if (purchaseSnap.exists) return; // already processed this Stripe session — safe no-op on retry

    const offering = offeringSnap.exists ? offeringSnap.data() : {};

    tx.set(purchaseRef, {
      studentUid,
      offeringId,
      offeringLabel: offeringLabel || offering.label || "",
      messageCreditsGranted: offering.messageCreditsPerClass || 20,
      sessionsGranted: 1,
      ...(studentName ? { studentName } : {}),
      matched: false,
      matchedTutorUid: null,
      createdAt: FieldValue.serverTimestamp(),
    });
  });
}

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripeSecretKey || !webhookSecret) {
    return res.status(500).json({ error: "Stripe is not configured on the server" });
  }
  const stripe = Stripe(stripeSecretKey);

  let event;
  try {
    const rawBody = await readRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, req.headers["stripe-signature"], webhookSecret);
  } catch (e) {
    return res.status(400).json({ error: `Webhook signature verification failed: ${e.message}` });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const studentUid = session.metadata?.studentUid;
    const offeringId = session.metadata?.offeringId;
    const studentName = session.metadata?.studentName;
    const offeringLabel = session.metadata?.offeringLabel;
    if (studentUid && offeringId) {
      try {
        await recordUnmatchedPurchase(session.id, studentUid, offeringId, studentName, offeringLabel);
      } catch (e) {
        console.log("Record unmatched purchase error:", e.message);
        return res.status(500).json({ error: "Could not record purchase" });
      }
    }
  }

  return res.status(200).json({ received: true });
};
