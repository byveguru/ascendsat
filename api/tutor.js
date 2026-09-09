// Vercel serverless function for 1:1 Paid Tutoring actions that need a
// cross-user write no Firestore rule can express safely, or that must be
// transactionally tamper-proof against the client (credit/session
// balances) — same reasoning as api/org.js, which this mirrors exactly.
//
// Request:  POST { action: "grantTutorRole", email }
//           POST { action: "getUserDirectory" }
//           POST { action: "removeTutorRole", tutorUid }
//           POST { action: "sendSchedulingMessage", relId, text }
//           POST { action: "sendQaMessage", relId, text, images? }
//           POST { action: "sendMeetingLink", relId, meetingLink }
//           POST { action: "matchTutor", purchaseId, tutorUid }
//           POST { action: "requestFreeTutor" }
//           POST { action: "escalateCasperToTutor", transcript }
//           POST { action: "markTutorUnavailable", relId }
//           POST { action: "reassignTutor", relId, newTutorUid }
//           POST { action: "setTutorCapacity", tutorUid, capacity }
//           POST { action: "completeRelationship", relId, confirmText }
//           Authorization: Bearer <Firebase ID token>
// Response: { ok: true, ... }
//
// Fraud model: never trusts client-supplied uids/emails for authorization —
// re-derives the caller's own admin status from Firebase Auth itself
// (admin.auth().getUser(uid).email), the same claim firestore.rules'
// isAdmin() checks, rather than a client-writable Firestore field.

const { verifyFirebaseIdToken } = require("./_auth");
const { admin, db, FieldValue } = require("./_firebaseAdmin");
const { sendBrevoEmail, emailShell } = require("./_brevo");

const ADMIN_EMAIL = "admin@ascendsat.com";
const APP_URL = "https://ascendsat.com";
// Human inbox for ops-style alerts (tutor gone unavailable, needs a rematch)
// — same address api/notify-signup.js already uses for signup alerts,
// deliberately separate from ADMIN_EMAIL (the in-app admin console login).
const TUTOR_ALERT_EMAIL = "ascendsat@gmail.com";

const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Emails the OTHER participant that a new message arrived — every message
// send (scheduling, Q&A, meeting link) routes through one of this file's
// actions specifically so this can fire uniformly, including for
// "scheduling" messages which used to be a plain client-side addDoc with no
// server involvement at all. Always called AFTER a transaction commits
// (never from inside one — transactions can retry, and an email is a
// side effect that must only ever fire once per actual send), using the
// `rel` snapshot the transaction returned. Never lets a Brevo failure
// break the message send itself — the whole thing is best-effort.
async function notifyNewMessage(rel, senderUid, messageText, isMeetingLink) {
  try {
    const isSenderStudent = senderUid === rel.studentUid;
    const recipientUid = isSenderStudent ? rel.tutorUid : rel.studentUid;

    let senderName;
    if (isSenderStudent) {
      senderName = rel.studentName || "Your student";
    } else {
      const tutorSnap = await db.collection("tutors").doc(rel.tutorUid).get();
      senderName = (tutorSnap.exists && tutorSnap.data().displayName) || "Your tutor";
    }

    const recipientUser = await admin.auth().getUser(recipientUid);
    if (!recipientUser.email) return;

    const bodyHtml = isMeetingLink
      ? `<p>They sent a meeting link for your upcoming session.</p>`
      : `<p>"${escapeHtml(messageText).slice(0, 300)}"</p>`;

    await sendBrevoEmail({
      to: recipientUser.email,
      toName: recipientUser.displayName || "",
      subject: `New message from ${senderName} on AscendSAT`,
      htmlContent: emailShell({
        heading: `${senderName} ${isMeetingLink ? "sent you a meeting link" : "sent you a message"}`,
        bodyHtml,
        ctaLabel: "Open AscendSAT",
        ctaUrl: APP_URL,
      }),
    });
  } catch (e) {
    console.log("Notify new message error:", e.message);
  }
}

// Emails both sides of a freshly-created match — the student (now knows
// who their tutor is and can start chatting) and the tutor (now knows they
// have a new student). Always called AFTER handleMatchTutor's transaction
// commits, and only on an actual first-time match (never on the no-op
// repeat-call branch) — same "commit first, notify after, best-effort"
// shape as notifyNewMessage above.
async function notifyMatch(studentUid, tutorUid) {
  try {
    const [studentUser, tutorUser] = await Promise.all([
      admin.auth().getUser(studentUid),
      admin.auth().getUser(tutorUid),
    ]);
    const studentName = studentUser.displayName || "your student";

    const emails = [];
    if (studentUser.email) {
      emails.push(
        sendBrevoEmail({
          to: studentUser.email,
          toName: studentUser.displayName || "",
          // Deliberately doesn't name the tutor — the student sees who it is
          // in-app once they open the Tutoring tab.
          subject: `You've been matched with a tutor on AscendSAT`,
          htmlContent: emailShell({
            heading: `You've been matched with a tutor`,
            bodyHtml: `<p>Head to the Tutoring tab to say hello and plan your first session.</p>`,
            ctaLabel: "Open AscendSAT",
            ctaUrl: APP_URL,
          }),
        })
      );
    }
    if (tutorUser.email) {
      emails.push(
        sendBrevoEmail({
          to: tutorUser.email,
          toName: tutorUser.displayName || "",
          subject: `New student matched: ${studentName}`,
          htmlContent: emailShell({
            heading: `You've been matched with a new student`,
            bodyHtml: `<p>${escapeHtml(studentName)} is ready to hear from you — head to your Students tab to say hello.</p>`,
            ctaLabel: "Open AscendSAT",
            ctaUrl: APP_URL,
          }),
        })
      );
    }
    await Promise.all(emails);
  } catch (e) {
    console.log("Notify match error:", e.message);
  }
}

// Fires the moment a tutor marks themselves unavailable — this IS the
// "admin notification" for that event (there's no separate in-app
// notification center in this app; the admin also sees it as an entry in
// the Match Students queue once they open it, via loadUnavailableRelationships
// client-side). Always called after handleMarkTutorUnavailable's
// transaction commits.
async function notifyTutorUnavailable(rel, relId) {
  try {
    const [studentUser, tutorSnap] = await Promise.all([
      admin.auth().getUser(rel.studentUid),
      db.collection("tutors").doc(rel.tutorUid).get(),
    ]);
    const studentName = rel.studentName || studentUser.displayName || studentUser.email || "A student";
    const tutorName = (tutorSnap.exists && tutorSnap.data().displayName) || "A tutor";

    await sendBrevoEmail({
      to: TUTOR_ALERT_EMAIL,
      subject: `Tutor unavailable — ${tutorName} needs to be rematched`,
      htmlContent: emailShell({
        heading: "A tutor marked themselves unavailable",
        bodyHtml: `<p>${escapeHtml(tutorName)} is no longer available for ${escapeHtml(studentName)}. Head to Match Students in the admin console to assign a new tutor. (Relationship: ${escapeHtml(relId)})</p>`,
        ctaLabel: "Open AscendSAT",
        ctaUrl: APP_URL,
      }),
    });
  } catch (e) {
    console.log("Notify tutor unavailable error:", e.message);
  }
}

// Fires after an admin reassigns a relationship to a new tutor — emails
// both the student (so they know who their new tutor is) and the new tutor
// (so they know they've inherited a student and an existing conversation).
// The old tutor is deliberately NOT emailed here (they already know they
// marked themselves unavailable).
async function notifyReassignment(studentUid, newTutorUid) {
  try {
    const [studentUser, tutorUser] = await Promise.all([
      admin.auth().getUser(studentUid),
      admin.auth().getUser(newTutorUid),
    ]);
    const studentName = studentUser.displayName || "your student";

    const emails = [];
    if (studentUser.email) {
      emails.push(
        sendBrevoEmail({
          to: studentUser.email,
          toName: studentUser.displayName || "",
          // Deliberately doesn't name the tutor — see notifyMatch above.
          subject: `You've been matched with a new tutor on AscendSAT`,
          htmlContent: emailShell({
            heading: `You've been matched with a new tutor`,
            bodyHtml: `<p>Your previous tutor became unavailable, so we matched you with someone new. They can see your full conversation history, so there's no need to repeat yourself — head to the Tutoring tab to say hello.</p>`,
            ctaLabel: "Open AscendSAT",
            ctaUrl: APP_URL,
          }),
        })
      );
    }
    if (tutorUser.email) {
      emails.push(
        sendBrevoEmail({
          to: tutorUser.email,
          toName: tutorUser.displayName || "",
          subject: `New student matched: ${studentName}`,
          htmlContent: emailShell({
            heading: `You've inherited a student`,
            bodyHtml: `<p>${escapeHtml(studentName)}'s previous tutor became unavailable, so they've been matched with you. Their full conversation history is visible in the chat — head to your Students tab to pick up where things left off.</p>`,
            ctaLabel: "Open AscendSAT",
            ctaUrl: APP_URL,
          }),
        })
      );
    }
    await Promise.all(emails);
  } catch (e) {
    console.log("Notify reassignment error:", e.message);
  }
}

async function requireAdmin(uid) {
  const caller = await admin.auth().getUser(uid);
  if (caller.email !== ADMIN_EMAIL) throw new Error("Admin access required");
}

// Admin toggle lives on config/tutoring (same public-read/admin-write
// collection App.tsx already uses for the "what's new" popup — see
// firestore.rules' config/{docId} match). Re-read here rather than trusted
// from the client, since this is the one gate deciding whether a request
// gets an unlimited relationship or has to go through Stripe — defaults to
// enabled (today's existing paid behavior) if the doc has never been
// written, so this feature shipping doesn't silently flip existing
// deployments into free mode.
async function isTutoringPaymentsEnabled() {
  const snap = await db.collection("config").doc("tutoring").get();
  return snap.exists ? snap.data().paymentsEnabled !== false : true;
}

// Default number of students a tutor can hold at once (admin can override
// per-tutor via tutors/{uid}.capacity — see handleSetTutorCapacity).
const DEFAULT_TUTOR_CAPACITY = 2;
// Free-mode-only question cap (config/tutoring.paymentsEnabled == false) —
// the existing 20-credits-per-class system is completely untouched in paid
// mode; this only ever applies to `unlimited: true` relationships.
const FREE_QUESTION_LIMIT = 5;

async function getTutorCapacity(tutorUid) {
  const snap = await db.collection("tutors").doc(tutorUid).get();
  const capacity = snap.exists ? snap.data().capacity : null;
  return typeof capacity === "number" && capacity > 0 ? capacity : DEFAULT_TUTOR_CAPACITY;
}

// A tutor's "load" is every relationship currently assigned to them that
// hasn't been marked complete — reassigning a relationship moves it (and
// therefore its load) to the new tutor's count, and completing one removes
// it from whichever tutor currently holds it.
async function getTutorLoad(tutorUid) {
  const snap = await db.collection("tutorRelationships").where("tutorUid", "==", tutorUid).get();
  return snap.docs.filter((d) => !d.data().completed).length;
}

// Admin-only user directory (name/email/questions-answered/time-spent/
// last-active/signup date) — lives here rather than its own api/*.js file
// because this project is already at Vercel Hobby's 12-serverless-function
// cap (confirmed by a failed deploy when it briefly had its own file) — any
// new admin-only server logic needs to fold into an existing route instead
// of adding a new one. Server-side (not a client isAdmin() Firestore read)
// because firestore.rules' users/{uid} is owner-only with no admin bypass
// (unlike scores/{scoreId}, which already allows isAdmin() read) —
// deliberately not loosened, since that would let a client pull every
// user's email directly through Firestore reads instead of through one
// server-verified endpoint.
// users/{uid}.createdAt isn't consistently a Firestore Timestamp across the
// existing user base — a meaningful share of accounts have it stored as a
// plain ISO string instead (pre-existing inconsistency). A Timestamp-only
// extraction would show "—" for all of them in the directory, so this
// handles Timestamp, {seconds}, ISO string, and epoch ms.
const toMillis = (ts) => {
  if (!ts) return null;
  if (ts.toMillis) return ts.toMillis();
  if (ts.seconds) return ts.seconds * 1000;
  if (typeof ts === "string") {
    const parsed = Date.parse(ts);
    return Number.isNaN(parsed) ? null : parsed;
  }
  if (typeof ts === "number") return ts;
  return null;
};

async function handleGetUserDirectory(callerUid) {
  await requireAdmin(callerUid);

  // Time spent isn't stored per-user anywhere — it's derived by summing
  // timeSeconds across every scores doc, grouped by userId. One pass over
  // the whole (currently small) collection rather than one query per user.
  const [usersSnap, scoresSnap] = await Promise.all([
    db.collection("users").get(),
    db.collection("scores").select("userId", "timeSeconds").get(),
  ]);

  const timeByUser = {};
  scoresSnap.forEach((doc) => {
    const d = doc.data();
    if (!d.userId || typeof d.timeSeconds !== "number") return;
    timeByUser[d.userId] = (timeByUser[d.userId] || 0) + d.timeSeconds;
  });

  const users = usersSnap.docs.map((doc) => {
    const d = doc.data();
    return {
      uid: doc.id,
      name: d.name || "",
      email: d.email || "",
      questionsAnsweredTotal: d.questionsAnsweredTotal || 0,
      timeSpentMinutes: Math.round((timeByUser[doc.id] || 0) / 60),
      lastActiveAt: toMillis(d.lastActiveAt),
      createdAt: toMillis(d.createdAt),
    };
  });

  return { users };
}

// Grants the "tutor" role to an existing account (looked up by email, so
// the admin doesn't need to know a uid) and creates their tutor profile
// stub — the tutor fills in their bio themselves afterward via the
// tutors/{uid} doc (see firestore.rules' isOwner(tutorUid) clause). Pricing
// lives entirely in Stripe now (Payment Links created directly in the
// Stripe Dashboard) — no in-app catalog at all, since a purchase gets
// matched to a tutor after the fact rather than picking one upfront.
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
      {
        // role/activeRole also need to flip to "tutor" — the tutorOverview/
        // tutorStudents screens gate access on role (the account's primary
        // type, same pattern as teacherOverview's role !== "teacher"
        // check), not just roles (every role the account holds). Missing
        // this was the original bug: roles included "tutor" but role was
        // still "student", so the screens' access gate rejected them.
        role: "tutor",
        roles: roles.includes("tutor") ? roles : [...roles, "tutor"],
        activeRole: "tutor",
      },
      { merge: true }
    );
    tx.set(
      tutorRef,
      {
        displayName: userData.name || targetUser.displayName || "",
        bio: "",
        photoUrl: "",
        active: true,
        createdAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  });

  return { uid: targetUid };
}

// Admin-only: the inverse of grantTutorRole — revokes the tutor role and
// marks the tutors/{uid} profile inactive so the admin's "Match Students"
// screen stops offering them for new purchases. Deliberately does NOT touch
// their existing tutorRelationships docs or message history: a removed
// tutor's already-matched students keep their credit history/audit trail
// intact (that data is server-authoritative and this action isn't the place
// to reassign or delete it — an admin can still see it, and can grant the
// role back later if this was a mistake). role/activeRole only get reset if
// they're currently "tutor" (falls back to another held role, or
// "student" if none), so an account that's also a teacher/orgAdmin doesn't
// lose that.
async function handleRemoveTutorRole(callerUid, tutorUid) {
  await requireAdmin(callerUid);

  const trimmedUid = String(tutorUid || "").trim();
  if (!trimmedUid) throw new Error("tutorUid is required");

  const userRef = db.collection("users").doc(trimmedUid);
  const tutorRef = db.collection("tutors").doc(trimmedUid);

  await db.runTransaction(async (tx) => {
    const [userSnap, tutorSnap] = await Promise.all([tx.get(userRef), tx.get(tutorRef)]);
    if (!tutorSnap.exists) throw new Error("Tutor not found");

    const userData = userSnap.exists ? userSnap.data() : {};
    const roles = (Array.isArray(userData.roles) ? userData.roles : []).filter((r) => r !== "tutor");
    const fallbackRole = roles[0] || "student";

    tx.set(
      userRef,
      {
        roles,
        ...(userData.role === "tutor" ? { role: fallbackRole } : {}),
        ...(userData.activeRole === "tutor" ? { activeRole: fallbackRole } : {}),
      },
      { merge: true }
    );
    tx.set(tutorRef, { active: false }, { merge: true });
  });
}

// Admin-only: overrides a tutor's default 2-student capacity (see
// DEFAULT_TUTOR_CAPACITY/getTutorCapacity above). Any positive integer;
// setting it back below a tutor's CURRENT load doesn't forcibly unassign
// anyone — it just blocks new matches/reassignments to them until their
// load drops back under the new number.
async function handleSetTutorCapacity(callerUid, tutorUid, capacity) {
  await requireAdmin(callerUid);

  const trimmedUid = String(tutorUid || "").trim();
  if (!trimmedUid) throw new Error("tutorUid is required");
  const parsedCapacity = Number(capacity);
  if (!Number.isFinite(parsedCapacity) || parsedCapacity < 1 || !Number.isInteger(parsedCapacity)) {
    throw new Error("Capacity must be a whole number of at least 1");
  }

  const tutorRef = db.collection("tutors").doc(trimmedUid);
  const tutorSnap = await tutorRef.get();
  if (!tutorSnap.exists) throw new Error("Tutor not found");

  await tutorRef.set({ capacity: parsedCapacity }, { merge: true });
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

  const [capacity, load] = await Promise.all([getTutorCapacity(trimmedTutorUid), getTutorLoad(trimmedTutorUid)]);
  if (load >= capacity) throw new Error("This tutor is at capacity — pick someone else, or increase their capacity in Manage Tutors first.");

  const purchaseRef = db.collection("tutorPurchases").doc(trimmedPurchaseId);
  const purchasePreSnap = await purchaseRef.get();
  if (!purchasePreSnap.exists) throw new Error("Purchase not found");
  // Read outside the transaction — independent of the match itself, and a
  // `scores` query isn't the kind of read a transaction needs consistency
  // guarantees around.
  const recentWrongAnswers = await getRecentWrongAnswersForStudent(purchasePreSnap.data().studentUid);

  const matchedStudentUid = await db.runTransaction(async (tx) => {
    const purchaseSnap = await tx.get(purchaseRef);
    if (!purchaseSnap.exists) throw new Error("Purchase not found");
    const purchase = purchaseSnap.data();
    if (purchase.matched) return null; // already matched — safe no-op on a repeat call

    const relRef = db.collection("tutorRelationships").doc(`${purchase.studentUid}_${trimmedTutorUid}`);
    const relSnap = await tx.get(relRef);

    tx.set(purchaseRef, { matched: true, matchedTutorUid: trimmedTutorUid, matchedAt: FieldValue.serverTimestamp() }, { merge: true });
    tx.set(
      relRef,
      {
        studentUid: purchase.studentUid,
        tutorUid: trimmedTutorUid,
        ...(purchase.studentName ? { studentName: purchase.studentName } : {}),
        ...(purchase.helpTopic ? { helpTopic: purchase.helpTopic } : {}),
        ...(purchase.source ? { source: purchase.source } : {}),
        ...(purchase.casperTranscript ? { casperTranscript: purchase.casperTranscript } : {}),
        ...(recentWrongAnswers.length ? { recentWrongAnswers } : {}),
        // A free (tutoring-payments-disabled) request skips numeric credits
        // entirely rather than granting some large placeholder number —
        // sendQaMessage/sendMeetingLink below check this flag first and
        // never touch messageCreditsRemaining/sessionsRemaining when it's
        // set, so those stay whatever they already were (0 for a
        // brand-new relationship). Once true it's never cleared — a later
        // paid purchase against the same relationship just adds credits on
        // top, it doesn't revoke the unlimited status the student already
        // has.
        ...(purchase.unlimited ? { unlimited: true } : {}),
        ...(purchase.unlimited ? {} : {
          messageCreditsRemaining: FieldValue.increment(purchase.messageCreditsGranted || 20),
          sessionsRemaining: FieldValue.increment(purchase.sessionsGranted || 1),
        }),
        // Re-matching the same student+tutor pair after a prior engagement
        // was marked Complete re-opens it (and its capacity slot) rather
        // than leaving it permanently closed. hiddenByTutor resets too, in
        // case this exact tutor had previously removed this student from
        // their own screen — a fresh match should always be visible again.
        completed: false,
        hiddenByTutor: false,
        updatedAt: FieldValue.serverTimestamp(),
        ...(relSnap.exists ? {} : { createdAt: FieldValue.serverTimestamp() }),
      },
      { merge: true }
    );
    return purchase.studentUid;
  });

  if (matchedStudentUid) await notifyMatch(matchedStudentUid, trimmedTutorUid);
}

// Student-facing counterpart to Stripe checkout, used only while tutoring
// payments are toggled off (config/tutoring.paymentsEnabled == false, see
// isTutoringPaymentsEnabled above). Creates the exact same kind of
// unmatched tutorPurchases record stripe-webhook.js does — same admin
// "Match Students" queue, same handleMatchTutor call above does the actual
// matching — just tagged `unlimited: true` and with no Stripe session
// behind it. Re-checks the flag server-side (never trusts that the client
// only shows this button when it's actually supposed to) so a client can't
// call this directly to get a free unlimited tutor while payments are on.
async function handleRequestFreeTutor(callerUid, helpTopic) {
  const enabled = await isTutoringPaymentsEnabled();
  if (enabled) throw new Error("Tutoring requests aren't open right now — please purchase a class instead.");

  // Required so admin/tutor aren't matching blind — the client grays out the
  // request button until this is non-empty, but that's not a control, so
  // re-check here too.
  const trimmedTopic = String(helpTopic || "").trim().slice(0, 300);
  if (!trimmedTopic) throw new Error("Please say what you need help with first.");

  const userSnap = await db.collection("users").doc(callerUid).get();
  const studentName = userSnap.exists ? userSnap.data().name || "" : "";
  // So admin sees this in the Match Students queue immediately, not just
  // the tutor after matching — same helper handleMatchTutor uses to
  // refresh it again at match time.
  const recentWrongAnswers = await getRecentWrongAnswersForStudent(callerUid);

  const purchaseRef = await db.collection("tutorPurchases").add({
    studentUid: callerUid,
    offeringLabel: "Free tutor request",
    helpTopic: trimmedTopic,
    ...(recentWrongAnswers.length ? { recentWrongAnswers } : {}),
    unlimited: true,
    ...(studentName ? { studentName } : {}),
    matched: false,
    matchedTutorUid: null,
    createdAt: FieldValue.serverTimestamp(),
  });

  return { purchaseId: purchaseRef.id };
}

// Escalation from the Casper AI chat — "Talk to a tutor" always creates a
// free/unlimited waitlist request, regardless of
// config/tutoring.paymentsEnabled (deliberately, per product decision: this
// is a support safety net, not a way to dodge Stripe on a normal request —
// that's exactly why this is its own action rather than a flag on
// handleRequestFreeTutor above, which DOES gate on the payments toggle).
// Same admin Match Students queue / capacity gate / Manage Tutors roster as
// every other tutorPurchases doc — nothing downstream needs to know this
// came from Casper except the transcript tagging along for context.
const MAX_ESCALATION_MESSAGES = 20;
const MAX_ESCALATION_CHARS = 8000;
const MAX_WRONG_ANSWERS = 5;
const MAX_CHOICES = 10;

// Never trusts the client-sent question/choices/answers — this is just
// student-facing display data for whichever tutor picks up the escalation,
// so the caps here are about payload-size hygiene, not correctness
// verification (unlike, say, Prove Mastery, which re-derives everything
// server-side because a wrong verdict there would be consequential).
function sanitizeWrongAnswer(w) {
  if (!w || typeof w !== "object") return null;
  const question = String(w.question || "").slice(0, 1000);
  if (!question) return null;
  const choices = Array.isArray(w.choices) ? w.choices.slice(0, MAX_CHOICES).map((c) => String(c || "").slice(0, 500)) : [];
  if (!choices.length) return null;
  const correctAnswer = Number.isInteger(w.correctAnswer) ? w.correctAnswer : -1;
  const userAnswer = Number.isInteger(w.userAnswer) ? w.userAnswer : -1;
  return {
    id: String(w.id || "").slice(0, 300),
    question,
    choices,
    correctAnswer,
    userAnswer,
    domain: String(w.domain || "").slice(0, 200),
  };
}

// Computed fresh server-side at match time (Admin SDK, from the real
// `scores` collection) so EVERY relationship shows the tutor the student's
// most recent misses — not just Casper escalations, and not stale
// client-submitted data from whenever the request happened to be made.
// Same shape/order as the client's getRecentWrongAnswers (App.tsx): newest
// scores docs first (matches loadScoreHistory's own query), skip FRQ (no
// fixed choices to show) and correct answers.
async function getRecentWrongAnswersForStudent(studentUid, limit = MAX_WRONG_ANSWERS) {
  const snap = await db.collection("scores").where("userId", "==", studentUid).orderBy("createdAt", "desc").limit(20).get();
  const out = [];
  for (const doc of snap.docs) {
    const data = doc.data();
    for (const q of data.questions || []) {
      if (!q.question || q.format === "frq" || !Array.isArray(q.choices)) continue;
      if (q.userAnswer === q.correctAnswer) continue;
      const sanitized = sanitizeWrongAnswer(q);
      if (sanitized) out.push(sanitized);
      if (out.length >= limit) return out;
    }
  }
  return out;
}

async function handleEscalateCasperToTutor(callerUid, transcript) {
  if (!Array.isArray(transcript)) throw new Error("transcript array is required");
  const cleaned = transcript
    .slice(-MAX_ESCALATION_MESSAGES)
    .map((m) => ({
      role: m?.role === "assistant" ? "assistant" : "user",
      content: String(m?.content || "").slice(0, 2000),
    }))
    .filter((m) => m.content);

  // Computed server-side from the student's real scores (same helper
  // handleRequestFreeTutor/handleMatchTutor use) rather than trusting
  // whatever the client happened to have in its local scoreHistory state —
  // one consistent source of truth for admin (sees it in the queue right
  // away) and the tutor (sees it refreshed again at match time) alike.
  const cleanedWrongAnswers = await getRecentWrongAnswersForStudent(callerUid);

  let totalChars = 0;
  const capped = [];
  // Keep the MOST RECENT messages under the char budget (drop from the
  // oldest end first) — the last few exchanges are what actually matter for
  // a tutor picking this up, not the very start of a long conversation.
  for (let i = cleaned.length - 1; i >= 0; i--) {
    totalChars += cleaned[i].content.length;
    if (totalChars > MAX_ESCALATION_CHARS) break;
    capped.unshift(cleaned[i]);
  }

  const summary = capped
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join(" — ")
    .trim()
    .slice(0, 300) || "Escalated from Casper chat";

  const userSnap = await db.collection("users").doc(callerUid).get();
  const studentName = userSnap.exists ? userSnap.data().name || "" : "";

  const purchaseRef = await db.collection("tutorPurchases").add({
    studentUid: callerUid,
    offeringLabel: "Casper escalation",
    source: "casperEscalation",
    helpTopic: summary,
    casperTranscript: capped,
    ...(cleanedWrongAnswers.length ? { recentWrongAnswers: cleanedWrongAnswers } : {}),
    unlimited: true,
    ...(studentName ? { studentName } : {}),
    matched: false,
    matchedTutorUid: null,
    createdAt: FieldValue.serverTimestamp(),
  });

  return { purchaseId: purchaseRef.id };
}

// The tutor's own "I'm currently unavailable" action — flags the
// relationship so the admin's Match Students queue picks it up for
// reassignment, and posts a system note into the SAME scheduling thread the
// student already sees (not a new thread — the whole point is the
// conversation history survives the tutor swap). Idempotent: calling this
// twice on an already-flagged relationship is a safe no-op (no duplicate
// alert email, no duplicate system message).
async function handleMarkTutorUnavailable(callerUid, relId) {
  const trimmedRelId = String(relId || "").trim();
  if (!trimmedRelId) throw new Error("relId is required");

  const relRef = db.collection("tutorRelationships").doc(trimmedRelId);
  const msgRef = relRef.collection("schedulingMessages").doc();

  const { rel, alreadyFlagged } = await db.runTransaction(async (tx) => {
    const relSnap = await tx.get(relRef);
    if (!relSnap.exists) throw new Error("Relationship not found");
    const relData = relSnap.data();
    if (relData.tutorUid !== callerUid) throw new Error("Only this relationship's tutor can mark it unavailable");
    if (relData.tutorUnavailable) return { rel: relData, alreadyFlagged: true };

    tx.set(msgRef, {
      senderUid: "system",
      isSystem: true,
      text: "Your tutor is currently unavailable. AscendSAT will match you with a new tutor shortly — they'll be able to see this full conversation.",
      createdAt: FieldValue.serverTimestamp(),
    });
    tx.set(
      relRef,
      { tutorUnavailable: true, unavailableAt: FieldValue.serverTimestamp(), lastMessageAt: FieldValue.serverTimestamp() },
      { merge: true }
    );
    return { rel: relData, alreadyFlagged: false };
  });

  if (!alreadyFlagged) await notifyTutorUnavailable(rel, trimmedRelId);
}

// Tutor-only: closes out an engagement, freeing that capacity slot (see
// getTutorLoad, which only counts relationships where completed !== true).
// Requires the caller to have echoed back the literal word "Complete" —
// mirrors the type-to-confirm UX on the client, but re-checked here too so
// this can't be triggered by a bare button click even if the client-side
// confirmation were ever bypassed. A completed relationship isn't deleted —
// its full history (messages, credits) stays intact; matchTutor already
// resets `completed` back to false if this same student+tutor pair is
// matched again later.
async function handleCompleteRelationship(callerUid, relId, confirmText) {
  const trimmedRelId = String(relId || "").trim();
  if (!trimmedRelId) throw new Error("relId is required");
  if (String(confirmText || "").trim() !== "Complete") {
    throw new Error('Type "Complete" exactly to confirm');
  }

  const relRef = db.collection("tutorRelationships").doc(trimmedRelId);
  await db.runTransaction(async (tx) => {
    const relSnap = await tx.get(relRef);
    if (!relSnap.exists) throw new Error("Relationship not found");
    const relData = relSnap.data();
    if (relData.tutorUid !== callerUid) throw new Error("Only this relationship's tutor can mark it complete");
    if (relData.completed) return; // already completed — safe no-op

    tx.set(relRef, { completed: true, completedAt: FieldValue.serverTimestamp() }, { merge: true });
  });
}

// Admin-only: assigns a NEW tutor to any relationship, whether or not it's
// flagged tutorUnavailable — the admin can move a student to a different
// tutor at any time, for any reason. Deliberately reassigns the SAME
// relationship doc (just swaps tutorUid) rather than creating a new one the
// way matchTutor does for a fresh purchase — that's what lets the new tutor
// read the existing schedulingMessages/qaMessages subcollections directly,
// with no copying step. messageCreditsRemaining/sessionsRemaining/
// unlimited/qaUnlockedAt all carry over untouched; only tutorUid changes.
async function handleReassignTutor(callerUid, relId, newTutorUid) {
  await requireAdmin(callerUid);

  const trimmedRelId = String(relId || "").trim();
  const trimmedNewTutorUid = String(newTutorUid || "").trim();
  if (!trimmedRelId || !trimmedNewTutorUid) throw new Error("relId and newTutorUid are required");

  const tutorSnap = await db.collection("tutors").doc(trimmedNewTutorUid).get();
  if (!tutorSnap.exists) throw new Error("Tutor not found");

  const [capacity, load] = await Promise.all([getTutorCapacity(trimmedNewTutorUid), getTutorLoad(trimmedNewTutorUid)]);
  if (load >= capacity) throw new Error("That tutor is at capacity — pick someone else, or increase their capacity in Manage Tutors first.");

  const relRef = db.collection("tutorRelationships").doc(trimmedRelId);
  const msgRef = relRef.collection("schedulingMessages").doc();
  const relPreSnap = await relRef.get();
  if (!relPreSnap.exists) throw new Error("Relationship not found");
  // Refreshed for the new tutor, same reasoning as handleMatchTutor — the
  // student may have missed more since this relationship was first matched.
  const recentWrongAnswers = await getRecentWrongAnswersForStudent(relPreSnap.data().studentUid);

  const studentUid = await db.runTransaction(async (tx) => {
    const relSnap = await tx.get(relRef);
    if (!relSnap.exists) throw new Error("Relationship not found");
    const relData = relSnap.data();
    if (relData.tutorUid === trimmedNewTutorUid) throw new Error("That's already this relationship's tutor");

    tx.set(msgRef, {
      senderUid: "system",
      isSystem: true,
      text: "You've been matched with a new tutor. They can see this full conversation history.",
      createdAt: FieldValue.serverTimestamp(),
    });
    tx.set(
      relRef,
      {
        tutorUid: trimmedNewTutorUid,
        tutorUnavailable: false,
        // The new tutor should always see this relationship, regardless of
        // whether some earlier tutor on this same doc had hidden it.
        hiddenByTutor: false,
        previousTutorUids: FieldValue.arrayUnion(relData.tutorUid),
        reassignedAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
        lastMessageAt: FieldValue.serverTimestamp(),
        ...(recentWrongAnswers.length ? { recentWrongAnswers } : {}),
      },
      { merge: true }
    );
    return relData.studentUid;
  });

  await notifyReassignment(studentUid, trimmedNewTutorUid);
}

// Free-form "plan a meeting" chat — no credits, just participant
// verification. Used to be a plain client-side addDoc with no server
// involvement at all; moved here specifically so it can trigger
// notifyNewMessage the same way the credit-metered actions do (a Firestore
// trigger would also work, but this reuses the exact Brevo pattern already
// proven in api/org.js etc. instead of standing up Firebase Functions as a
// second deploy target for one notification).
async function handleSendSchedulingMessage(callerUid, relId, text) {
  const trimmedText = String(text || "").trim();
  if (!trimmedText) throw new Error("Message text is required");
  const trimmedRelId = String(relId || "").trim();
  if (!trimmedRelId) throw new Error("relId is required");

  const relRef = db.collection("tutorRelationships").doc(trimmedRelId);
  const relSnap = await relRef.get();
  if (!relSnap.exists) throw new Error("Relationship not found");
  const rel = relSnap.data();
  if (rel.studentUid !== callerUid && rel.tutorUid !== callerUid) throw new Error("You're not part of this conversation");

  await relRef.collection("schedulingMessages").add({
    senderUid: callerUid,
    text: trimmedText,
    createdAt: FieldValue.serverTimestamp(),
  });
  await relRef.set({ lastMessageAt: FieldValue.serverTimestamp() }, { merge: true });

  await notifyNewMessage(rel, callerUid, trimmedText, false);
}

// The metered "ask a question" thread. Whether this's gated depends on who's
// sending and which mode the relationship is in: the student's own messages
// require the relationship to be qaUnlocked (see sendMeetingLink — the
// tutor hasn't sent a real meeting yet otherwise) AND either
// messageCreditsRemaining > 0 (paid mode, untouched — still the original
// 20-per-class quota) or, for an `unlimited` (free-mode) relationship,
// freeQuestionsAsked < FREE_QUESTION_LIMIT (5) — hitting that cap doesn't
// free the tutor's slot, it just locks further questions until the tutor
// marks the engagement Complete (see handleCompleteRelationship). The
// tutor's replies never spend credits, need the unlock, or count toward the
// cap. Runs as a transaction so a burst of rapid sends can't race past a
// limit. The transaction returns `rel` so the email notification (a side
// effect that must fire exactly once) can run after it's actually
// committed, never from inside a body that might retry.
async function handleSendQaMessage(callerUid, relId, text, images) {
  const trimmedText = String(text || "").trim();
  if (!trimmedText) throw new Error("Message text is required");
  const trimmedRelId = String(relId || "").trim();
  if (!trimmedRelId) throw new Error("relId is required");
  // Images are already-uploaded Vercel Blob URLs (see api/upload.js's
  // tutor-qa-images/ path, which itself validates file type/size) — this
  // just caps the count, it doesn't re-validate the URLs themselves.
  const cleanImages = Array.isArray(images) ? images.filter((u) => typeof u === "string" && u).slice(0, 2) : [];

  const relRef = db.collection("tutorRelationships").doc(trimmedRelId);

  const rel = await db.runTransaction(async (tx) => {
    const relSnap = await tx.get(relRef);
    if (!relSnap.exists) throw new Error("Relationship not found");
    const relData = relSnap.data();
    const isStudent = relData.studentUid === callerUid;
    const isTutor = relData.tutorUid === callerUid;
    if (!isStudent && !isTutor) throw new Error("You're not part of this conversation");

    const msgRef = relRef.collection("qaMessages").doc();
    const imagesField = cleanImages.length ? { images: cleanImages } : {};

    if (isStudent) {
      if (!relData.qaUnlockedAt) throw new Error("Your tutor hasn't sent a meeting link yet — plan a time in the Plan a Meeting tab first.");
      if (relData.unlimited) {
        const asked = relData.freeQuestionsAsked || 0;
        if (asked >= FREE_QUESTION_LIMIT) {
          throw new Error(`You've reached your ${FREE_QUESTION_LIMIT}-question limit with this tutor. They'll wrap up your session, and you'll be matched with a new tutor.`);
        }
        tx.set(msgRef, { senderUid: callerUid, text: trimmedText, createdAt: FieldValue.serverTimestamp(), ...imagesField });
        tx.set(relRef, { freeQuestionsAsked: asked + 1, updatedAt: FieldValue.serverTimestamp(), lastMessageAt: FieldValue.serverTimestamp() }, { merge: true });
      } else {
        const remaining = relData.messageCreditsRemaining || 0;
        if (remaining <= 0) throw new Error("No questions remaining — buy another class to keep asking.");
        tx.set(msgRef, { senderUid: callerUid, text: trimmedText, createdAt: FieldValue.serverTimestamp(), creditsRemainingAfter: remaining - 1, ...imagesField });
        tx.set(relRef, { messageCreditsRemaining: remaining - 1, updatedAt: FieldValue.serverTimestamp(), lastMessageAt: FieldValue.serverTimestamp() }, { merge: true });
      }
    } else {
      tx.set(msgRef, { senderUid: callerUid, text: trimmedText, createdAt: FieldValue.serverTimestamp() });
      tx.set(relRef, { lastMessageAt: FieldValue.serverTimestamp() }, { merge: true });
    }
    return relData;
  });

  await notifyNewMessage(rel, callerUid, trimmedText, false);
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
// rather than re-locking it. An `unlimited` relationship (see
// handleRequestFreeTutor/handleMatchTutor) skips the sessionsRemaining
// check and decrement entirely — the matching workflow (plan a meeting,
// tutor sends the link, that's what unlocks Q&A) stays identical either
// way, only the session-count gate is bypassed.
async function handleSendMeetingLink(callerUid, relId, meetingLink) {
  const trimmedRelId = String(relId || "").trim();
  const trimmedLink = String(meetingLink || "").trim();
  if (!trimmedRelId || !trimmedLink) throw new Error("relId and meetingLink are required");

  const relRef = db.collection("tutorRelationships").doc(trimmedRelId);
  const msgRef = relRef.collection("schedulingMessages").doc();

  const rel = await db.runTransaction(async (tx) => {
    const relSnap = await tx.get(relRef);
    if (!relSnap.exists) throw new Error("Relationship not found");
    const relData = relSnap.data();
    if (relData.tutorUid !== callerUid) throw new Error("Only the tutor can send a meeting link");
    const sessionsRemaining = relData.sessionsRemaining || 0;
    if (!relData.unlimited && sessionsRemaining <= 0) throw new Error("No sessions remaining — the student needs to buy another class first.");

    tx.set(msgRef, {
      senderUid: callerUid,
      text: trimmedLink,
      isMeetingLink: true,
      createdAt: FieldValue.serverTimestamp(),
    });
    tx.set(
      relRef,
      {
        ...(relData.unlimited ? {} : { sessionsRemaining: sessionsRemaining - 1 }),
        updatedAt: FieldValue.serverTimestamp(),
        lastMessageAt: FieldValue.serverTimestamp(),
        ...(relData.qaUnlockedAt ? {} : { qaUnlockedAt: FieldValue.serverTimestamp() }),
      },
      { merge: true }
    );
    return relData;
  });

  await notifyNewMessage(rel, callerUid, trimmedLink, true);
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
    } else if (action === "getUserDirectory") {
      const result = await handleGetUserDirectory(uid);
      return res.status(200).json({ ok: true, ...result });
    } else if (action === "removeTutorRole") {
      await handleRemoveTutorRole(uid, body.tutorUid);
      return res.status(200).json({ ok: true });
    } else if (action === "sendSchedulingMessage") {
      await handleSendSchedulingMessage(uid, body.relId, body.text);
      return res.status(200).json({ ok: true });
    } else if (action === "sendQaMessage") {
      await handleSendQaMessage(uid, body.relId, body.text, body.images);
      return res.status(200).json({ ok: true });
    } else if (action === "sendMeetingLink") {
      await handleSendMeetingLink(uid, body.relId, body.meetingLink);
      return res.status(200).json({ ok: true });
    } else if (action === "matchTutor") {
      await handleMatchTutor(uid, body.purchaseId, body.tutorUid);
      return res.status(200).json({ ok: true });
    } else if (action === "requestFreeTutor") {
      const result = await handleRequestFreeTutor(uid, body.helpTopic);
      return res.status(200).json({ ok: true, ...result });
    } else if (action === "escalateCasperToTutor") {
      const result = await handleEscalateCasperToTutor(uid, body.transcript);
      return res.status(200).json({ ok: true, ...result });
    } else if (action === "markTutorUnavailable") {
      await handleMarkTutorUnavailable(uid, body.relId);
      return res.status(200).json({ ok: true });
    } else if (action === "reassignTutor") {
      await handleReassignTutor(uid, body.relId, body.newTutorUid);
      return res.status(200).json({ ok: true });
    } else if (action === "setTutorCapacity") {
      await handleSetTutorCapacity(uid, body.tutorUid, body.capacity);
      return res.status(200).json({ ok: true });
    } else if (action === "completeRelationship") {
      await handleCompleteRelationship(uid, body.relId, body.confirmText);
      return res.status(200).json({ ok: true });
    } else {
      return res.status(400).json({ error: "Unknown action" });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message || "Tutor action failed" });
  }
};
