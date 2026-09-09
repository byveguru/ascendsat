// Vercel serverless function receiving Stripe's checkout.session.completed
// webhook for 1:1 Paid Tutoring purchases made through a Stripe Payment
// Link (created directly in the Stripe Dashboard — there's no in-app
// checkout flow or catalog at all; see App.tsx's TUTOR_PAYMENT_LINKS).
// Verifies Stripe's signature against the RAW request body — bodyParser is
// disabled below because Stripe signs the exact bytes it sent; a
// JSON-parsed-then-reserialized body won't reproduce the same signature
// even for a legitimate event. Idempotent on the Stripe session id (doc ID
// on tutorPurchases), so a retried webhook delivery can't double-record
// the same purchase.
//
// Only records the purchase as unmatched — no tutor is chosen at checkout
// time, so this never touches tutorRelationships directly. An admin's
// matchTutor call (api/tutor.js) is what actually grants the credits once
// a tutor is assigned.
//
// Configure in the Stripe Dashboard: an endpoint pointed at
// https://ascendsat.com/api/stripe-webhook, subscribed to
// checkout.session.completed, with its signing secret set as this
// project's STRIPE_WEBHOOK_SECRET env var (alongside STRIPE_SECRET_KEY).

const Stripe = require("stripe");
const { db, FieldValue } = require("./_firebaseAdmin");

// Every purchase — regardless of which Payment Link/subject was used —
// grants the same fixed amount. There's no per-offering config anywhere
// in-app to read this from (deliberately: pricing/products live entirely
// in Stripe), so it's just a constant here.
const MESSAGE_CREDITS_PER_CLASS = 20;
const SESSIONS_PER_CLASS = 1;

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
// checkout time, so this can't credit a tutorRelationships doc directly.
// An admin's matchTutor call is what actually grants these credits once a
// tutor is assigned; this function's job is just to record that the
// purchase happened, exactly once, so it's ready to be matched.
//
// studentUid comes from the Payment Link's client_reference_id (the app
// appends ?client_reference_id=<uid> when opening the link — see
// buyClassOffering in App.tsx) rather than custom Checkout Session
// metadata, since Payment Links are static/shared URLs with no per-request
// server call to attach metadata to. studentName and offeringLabel are
// both derived server-side (via the Admin SDK and a Stripe API lookup)
// instead of trusting client-supplied values, since neither is available
// from the Payment Link flow at all.
async function recordUnmatchedPurchase(stripe, stripeSessionId, studentUid) {
  const purchaseRef = db.collection("tutorPurchases").doc(stripeSessionId);

  const existing = await purchaseRef.get();
  if (existing.exists) return; // already processed this Stripe session — safe no-op on retry

  const [userSnap, lineItems] = await Promise.all([
    db.collection("users").doc(studentUid).get(),
    stripe.checkout.sessions.listLineItems(stripeSessionId, { expand: ["data.price.product"] }),
  ]);

  const studentName = userSnap.exists ? userSnap.data().name || "" : "";
  const offeringLabel = lineItems.data[0]?.price?.product?.name || lineItems.data[0]?.description || "";

  await purchaseRef.set({
    studentUid,
    offeringLabel,
    messageCreditsGranted: MESSAGE_CREDITS_PER_CLASS,
    sessionsGranted: SESSIONS_PER_CLASS,
    ...(studentName ? { studentName } : {}),
    matched: false,
    matchedTutorUid: null,
    createdAt: FieldValue.serverTimestamp(),
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
    const studentUid = session.client_reference_id;
    if (studentUid) {
      try {
        await recordUnmatchedPurchase(stripe, session.id, studentUid);
      } catch (e) {
        console.log("Record unmatched purchase error:", e.message);
        return res.status(500).json({ error: "Could not record purchase" });
      }
    } else {
      console.log("Checkout session completed with no client_reference_id — ignoring:", session.id);
    }
  }

  return res.status(200).json({ received: true });
};
