// Vercel serverless function for Teacher/Organization Portal actions that
// need a cross-user write no Firestore rule can express safely (approving a
// join request, or accepting an org invite — both append the caller's own
// uid onto a DIFFERENT document's array, organizations.{admin,teacher,
// analyst}Uids). Every other org-admin action — approving the org itself,
// editing org details, creating classes — is a direct client write already
// covered by firestore.rules' isAdmin()/isOrgAdmin() checks; this endpoint
// exists only for the writes those checks can't reach, matching why
// api/referral.js exists at all.
//
// Request:  POST { action: "approveJoinRequest" | "rejectJoinRequest", requestId }
//           POST { action: "acceptOrgInvite", code }
//           POST { action: "sendInviteEmail", code }
//           POST { action: "checkPendingInvite" }  (no body — derives the caller's own email)
//           Authorization: Bearer <Firebase ID token>
// Response: { ok: true, ... }
//
// Fraud model: never trusts client-supplied orgId/teacherUid/email — re-reads
// the relevant doc itself by ID, then verifies the caller's own auth state
// (uid in adminUids, or token email matching an invite's target email)
// before doing anything.

const { verifyFirebaseIdToken } = require("./_auth");
const { admin, db, FieldValue } = require("./_firebaseAdmin");
const { sendBrevoEmail, emailShell } = require("./_brevo");

const APP_URL = "https://ascendsat.com";
const ORG_ROLE_TO_ARRAY = {
  orgAdmin: "adminUids",
  programManager: "adminUids", // Phase 2a: full admin power, label-only distinction — see plan
  educator: "teacherUids",
  analyst: "analystUids",
};

async function handleApproveJoinRequest(uid, requestId) {
  requestId = String(requestId || "");
  if (!requestId) return;

  const requestRef = db.collection("orgJoinRequests").doc(requestId);
  const requestSnap = await requestRef.get();
  if (!requestSnap.exists) return;
  const request = requestSnap.data();
  if (request.status !== "pending") return; // already handled — no-op, not an error

  const orgSnap = await db.collection("organizations").doc(request.orgId).get();
  if (!orgSnap.exists) return;
  const org = orgSnap.data();
  if (!Array.isArray(org.adminUids) || !org.adminUids.includes(uid)) return; // not an admin of this org

  const teacherUid = request.teacherUid;
  const orgRef = db.collection("organizations").doc(request.orgId);
  const teacherRef = db.collection("users").doc(teacherUid);

  await db.runTransaction(async (tx) => {
    const [orgSnapTx, teacherSnapTx] = await Promise.all([tx.get(orgRef), tx.get(teacherRef)]);
    if (!orgSnapTx.exists) return;
    const orgData = orgSnapTx.data();
    const teacherUids = Array.isArray(orgData.teacherUids) ? orgData.teacherUids : [];
    const teacherData = teacherSnapTx.exists ? teacherSnapTx.data() : {};
    const roles = Array.isArray(teacherData.roles) ? teacherData.roles : ["student"];

    tx.set(requestRef, { status: "approved", approvedAt: FieldValue.serverTimestamp() }, { merge: true });
    if (!teacherUids.includes(teacherUid)) {
      tx.set(orgRef, { teacherUids: [...teacherUids, teacherUid] }, { merge: true });
    }
    tx.set(
      teacherRef,
      {
        role: "teacher",
        roles: roles.includes("teacher") ? roles : [...roles, "teacher"],
        organizationId: request.orgId,
        activeRole: "teacher",
      },
      { merge: true }
    );
  });
}

// Accepts an org-level invite (educator or org-admin — same collection,
// invitedRole is the only difference). Email-targeted, not a generic
// passcode: the caller's own verified auth email must match the invite's
// email, or this refuses regardless of who's holding the code.
async function handleAcceptOrgInvite(uid, code) {
  code = String(code || "").trim();
  if (!code) return { accepted: false, error: "Missing invite code." };

  const inviteRef = db.collection("orgInvites").doc(code);
  const inviteSnap = await inviteRef.get();
  if (!inviteSnap.exists) return { accepted: false, error: "That invitation doesn't exist." };
  const invite = inviteSnap.data();

  if (invite.status !== "pending") return { accepted: false, error: "That invitation has already been used or revoked." };
  if (invite.expiresAt && Date.now() > invite.expiresAt) return { accepted: false, error: "That invitation has expired." };

  let authUser;
  try {
    authUser = await admin.auth().getUser(uid);
  } catch (e) {
    return { accepted: false, error: "Could not verify your account." };
  }
  if (!authUser.emailVerified) return { accepted: false, error: "Verify your email before accepting this invitation." };
  if ((authUser.email || "").trim().toLowerCase() !== invite.email) {
    return { accepted: false, error: "This invitation was sent to a different email address." };
  }

  const arrayField = ORG_ROLE_TO_ARRAY[invite.invitedRole] || "teacherUids";
  const orgRef = db.collection("organizations").doc(invite.orgId);
  const userRef = db.collection("users").doc(uid);
  const memberRef = orgRef.collection("orgMembers").doc(uid);

  await db.runTransaction(async (tx) => {
    const [orgSnapTx, userSnapTx] = await Promise.all([tx.get(orgRef), tx.get(userRef)]);
    if (!orgSnapTx.exists) return;
    const orgData = orgSnapTx.data();
    const existingArray = Array.isArray(orgData[arrayField]) ? orgData[arrayField] : [];
    const userData = userSnapTx.exists ? userSnapTx.data() : {};
    const roles = Array.isArray(userData.roles) ? userData.roles : ["student"];
    // orgAdmin/programManager both land the account in "orgAdmin" role terms
    // (Phase 1 never introduced separate role/activeRole values for these —
    // see the plan for why); educator/analyst land in "teacher".
    const resolvedRole = arrayField === "adminUids" ? "orgAdmin" : "teacher";

    tx.set(inviteRef, { status: "accepted", acceptedAt: FieldValue.serverTimestamp(), acceptedByUid: uid }, { merge: true });
    if (!existingArray.includes(uid)) {
      tx.set(orgRef, { [arrayField]: [...existingArray, uid] }, { merge: true });
    }
    tx.set(memberRef, { uid, orgRole: invite.invitedRole, addedAt: FieldValue.serverTimestamp() }, { merge: true });
    tx.set(
      userRef,
      {
        role: resolvedRole,
        roles: roles.includes(resolvedRole) ? roles : [...roles, resolvedRole],
        organizationId: invite.orgId,
        activeRole: resolvedRole,
      },
      { merge: true }
    );
  });

  return { accepted: true, orgId: invite.orgId, orgName: invite.orgName, invitedRole: invite.invitedRole };
}

// Re-reads the invite itself (never trusts client-supplied org name/email)
// and confirms the caller is an admin of that specific org before sending —
// otherwise any signed-in user could spam arbitrary emails through this
// endpoint using someone else's invite code.
async function handleSendInviteEmail(uid, code) {
  code = String(code || "").trim();
  if (!code) return;

  const inviteSnap = await db.collection("orgInvites").doc(code).get();
  if (!inviteSnap.exists) return;
  const invite = inviteSnap.data();
  if (invite.status !== "pending") return;

  const orgSnap = await db.collection("organizations").doc(invite.orgId).get();
  const org = orgSnap.exists ? orgSnap.data() : {};
  if (!Array.isArray(org.adminUids) || !org.adminUids.includes(uid)) return; // not an admin of this org

  const roleLabel = { orgAdmin: "an organization admin", programManager: "a program manager", educator: "an educator", analyst: "a read-only analyst" }[invite.invitedRole] || "a team member";
  await sendBrevoEmail({
    to: invite.email,
    subject: `You've been invited to join ${invite.orgName} on AscendSAT`,
    htmlContent: emailShell({
      heading: `You've been invited to ${invite.orgName}`,
      bodyHtml: `<p>${invite.invitedByName || "Someone"} invited you to join <strong>${invite.orgName}</strong> on AscendSAT as ${roleLabel}.</p><p>Sign in or create an account with this email to accept.</p>`,
      ctaLabel: "Accept invitation",
      ctaUrl: `${APP_URL}/register?orgInvite=${code}`,
    }),
  });
}

// Student-facing class invite emails (distinct from orgInvites — this is
// the class-code join link, not a role-granting account invite). Re-reads
// the class itself server-side and confirms the caller actually teaches it
// (or is an admin of its org) before sending, same fraud model as
// handleSendInviteEmail above.
async function handleSendClassInviteEmails(uid, classId, emails) {
  classId = String(classId || "").trim();
  emails = Array.isArray(emails) ? emails.map((e) => String(e || "").trim()).filter(Boolean) : [];
  if (!classId || emails.length === 0) return { sent: 0 };

  const classSnap = await db.collection("orgClasses").doc(classId).get();
  if (!classSnap.exists) return { sent: 0 };
  const cls = classSnap.data();

  let authorized = Array.isArray(cls.teacherUids) && cls.teacherUids.includes(uid);
  if (!authorized && cls.orgId) {
    const orgSnap = await db.collection("organizations").doc(cls.orgId).get();
    const org = orgSnap.exists ? orgSnap.data() : {};
    authorized = Array.isArray(org.adminUids) && org.adminUids.includes(uid);
  }
  if (!authorized) return { sent: 0 };

  const link = `${APP_URL}/register?class=${cls.code}`;
  await Promise.all(
    emails.slice(0, 100).map((to) =>
      sendBrevoEmail({
        to,
        subject: `You're invited to join ${cls.name} on AscendSAT`,
        htmlContent: emailShell({
          heading: `Join ${cls.name}`,
          bodyHtml: `<p>You've been invited to join <strong>${cls.name}</strong> on AscendSAT. Sign up or sign in, then use class code <strong>${cls.code}</strong> — or just tap the button below.</p>`,
          ctaLabel: "Join class",
          ctaUrl: link,
        }),
      }).catch(() => {})
    )
  );
  return { sent: emails.length };
}

// Powers the "existing account accepting invitation" auto-detection: on
// every sign-in the client asks "is there a pending invite for me?" without
// ever being able to list orgInvites itself (that collection's rules
// deliberately disallow list — see firestore.rules — to prevent invite
// enumeration). Only the caller's OWN verified auth email is ever queried,
// server-side, via the Admin SDK which bypasses that rule safely.
async function handleCheckPendingInvite(uid) {
  let authUser;
  try {
    authUser = await admin.auth().getUser(uid);
  } catch (e) {
    return { invite: null };
  }
  const emailLower = (authUser.email || "").trim().toLowerCase();
  if (!emailLower) return { invite: null };

  const snap = await db.collection("orgInvites")
    .where("email", "==", emailLower)
    .where("status", "==", "pending")
    .limit(1)
    .get();
  if (snap.empty) return { invite: null };

  const inviteDoc = snap.docs[0];
  const invite = inviteDoc.data();
  if (invite.expiresAt && Date.now() > invite.expiresAt) return { invite: null };
  return { invite: { code: inviteDoc.id, orgId: invite.orgId, orgName: invite.orgName, invitedRole: invite.invitedRole } };
}

async function handleRejectJoinRequest(uid, requestId) {
  requestId = String(requestId || "");
  if (!requestId) return;

  const requestRef = db.collection("orgJoinRequests").doc(requestId);
  const requestSnap = await requestRef.get();
  if (!requestSnap.exists) return;
  const request = requestSnap.data();
  if (request.status !== "pending") return;

  const orgSnap = await db.collection("organizations").doc(request.orgId).get();
  if (!orgSnap.exists) return;
  const org = orgSnap.data();
  if (!Array.isArray(org.adminUids) || !org.adminUids.includes(uid)) return;

  await requestRef.set({ status: "rejected", rejectedAt: FieldValue.serverTimestamp() }, { merge: true });
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
    if (action === "approveJoinRequest") {
      await handleApproveJoinRequest(uid, body.requestId);
    } else if (action === "rejectJoinRequest") {
      await handleRejectJoinRequest(uid, body.requestId);
    } else if (action === "acceptOrgInvite") {
      const result = await handleAcceptOrgInvite(uid, body.code);
      return res.status(200).json({ ok: true, ...result });
    } else if (action === "sendInviteEmail") {
      await handleSendInviteEmail(uid, body.code);
    } else if (action === "checkPendingInvite") {
      const result = await handleCheckPendingInvite(uid);
      return res.status(200).json({ ok: true, ...result });
    } else if (action === "sendClassInviteEmails") {
      const result = await handleSendClassInviteEmails(uid, body.classId, body.emails);
      return res.status(200).json({ ok: true, ...result });
    } else {
      return res.status(400).json({ error: "Unknown action" });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: e.message || "Org action failed" });
  }
};
