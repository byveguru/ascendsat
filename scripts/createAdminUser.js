// Usage: node scripts/createAdminUser.js admin@example.com YourPassword
// Requires: npm install firebase-admin
// Set GOOGLE_APPLICATION_CREDENTIALS env var to a service account JSON with Firebase Admin privileges.

const admin = require('firebase-admin');
const email = process.argv[2];
const password = process.argv[3] || 'ChangeMe123!';
if (!email) {
  console.error('Usage: node scripts/createAdminUser.js <email> [password]');
  process.exit(1);
}

try {
  admin.initializeApp({});
} catch (e) {
  // already initialized
}

(async () => {
  try {
    let user;
    try {
      user = await admin.auth().getUserByEmail(email);
      console.log(`User already exists: uid=${user.uid}`);
    } catch (e) {
      user = await admin.auth().createUser({ email, password, emailVerified: true });
      console.log(`Created user: uid=${user.uid}`);
    }
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log(`Set admin claim for ${email} (uid=${user.uid})`);
    console.log('The user must sign out and sign in again to refresh token claims (or call getIdToken(true)).');
  } catch (err) {
    console.error('Error:', err);
    process.exit(2);
  }
})();
