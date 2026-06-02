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

exports.casperChat = functions.https.onCall(async (data, context) => {
  const { messages } = data;

  if (!messages || !Array.isArray(messages)) {
    throw new functions.https.HttpsError("invalid-argument", "Messages required");
  }

  const groq = new Groq({ apiKey: functions.config().groq.key });

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      max_tokens: 1000,
      messages: [
        {
          role: "system",
          content: `You are Casper, an expert SAT tutor assistant built into the AscendSAT app. You help students with:
- SAT Math (Algebra, Advanced Math, Data Analysis, Geometry & Trigonometry)
- SAT Reading & Writing (Information and Ideas, Craft & Structure, Expression of Ideas, Standard English Conventions)
- SAT vocabulary
- Test strategy and time management
Keep responses concise, encouraging, and focused on SAT prep. Always be positive and supportive.`,
        },
        ...messages,
      ],
    });

    return { reply: response.choices[0].message.content };
  } catch (e) {
    throw new functions.https.HttpsError("internal", e.message);
  }
});