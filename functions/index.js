const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch');

admin.initializeApp();

const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

exports.sendBookingReminders = functions.pubsub.schedule('every 5 minutes').onRun(async (context) => {
  const now = Date.now();
  const start = now + 59 * 60 * 1000; // 59 minutes from now
  const end = now + 61 * 60 * 1000; // 61 minutes from now
  try {
    const q = admin.firestore().collection('bookings')
      .where('reminderSent', '==', false)
      .where('classDateMs', '>=', start)
      .where('classDateMs', '<=', end);
    const snap = await q.get();
    if (snap.empty) return null;
    for (const doc of snap.docs) {
      const data = doc.data();
      const clsTitle = data.classTitle || 'Class';
      const clsDate = data.date || new Date(data.classDateMs).toISOString();
      const toEmail = data.contactEmail || data.userEmail || ADMIN_EMAIL;
      // send email via EmailJS REST API
      try {
        await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: EMAILJS_SERVICE_ID,
            template_id: EMAILJS_TEMPLATE_ID,
            user_id: EMAILJS_PUBLIC_KEY,
            template_params: {
              student_email: toEmail,
              class_title: clsTitle,
              class_date: clsDate,
              to_email: toEmail,
            },
          }),
        });
        await doc.ref.update({ reminderSent: true });
        console.log('Reminder sent for', doc.id);
      } catch (e) {
        console.error('Failed to send reminder for', doc.id, e);
      }
    }
  } catch (e) {
    console.error('Reminder job failed', e);
  }
  return null;
});
const Groq = require("groq-sdk");

exports.casperChat = functions
  .runWith({ secrets: ["GROQ_API_KEY"] })
  .https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "You must be signed in to use this feature.");
  }

  const { messages, maxTokens, model, responseFormat } = data;

  if (!messages || !Array.isArray(messages)) {
    throw new functions.https.HttpsError("invalid-argument", "Messages required");
  }

  // Only permit models the client is allowed to request (keeps the callable from
  // being an open relay). Defaults to the fast text model used by Casper.
  const ALLOWED_MODELS = new Set([
    "llama-3.1-8b-instant",
    "openai/gpt-oss-120b",
  ]);
  const chosenModel = typeof model === "string" && ALLOWED_MODELS.has(model)
    ? model
    : "llama-3.1-8b-instant";

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  try {
    const response = await groq.chat.completions.create({
      model: chosenModel,
      max_tokens: typeof maxTokens === "number" ? maxTokens : 1000,
      messages,
      ...(responseFormat === "json" ? { response_format: { type: "json_object" } } : {}),
    });

    return { reply: response.choices?.[0]?.message?.content || "" };
  } catch (e) {
    throw new functions.https.HttpsError("internal", e.message);
  }
});