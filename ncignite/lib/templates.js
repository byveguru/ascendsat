import { SITE_URL, CONTACT_EMAIL } from './email.js';
import { maskEmail } from './http.js';

const firstName = (full) => String(full || '').trim().split(/\s+/)[0] || 'there';

/* Never put a phone number, an allergy note or a medical note in an email. */

export function parentCodeEmail({ studentName, code }) {
  const first = firstName(studentName);
  return {
    subject: `Please confirm ${first}'s spot in NC Ignyte`,
    text: `Hi,

${first} applied to NC Ignyte, a free startup accelerator for North Carolina high school students. It meets on five Friday evenings, 6:00 to 8:00 PM, November 6 to December 4, 2026, in the downtown Cary area.

To complete the application, open the link below and enter this code:

${code}

Open the consent form: ${SITE_URL}/parent?code=${encodeURIComponent(code)}

You will enter the code first, and then you will see the short consent form. The code is only for you and works once.

If you do not recognise this application, ignore this email.

Questions? Reply here.

The NC Ignyte team`,
  };
}

export function studentCodeSentEmail({ parentEmail }) {
  return {
    subject: 'We emailed your parent a code',
    text: `Your parent or guardian was emailed a confirmation code at ${maskEmail(parentEmail)}.

Once they enter it and submit the consent form, we review your application and email you a decision.

If the address is wrong, reply to this email.

The NC Ignyte team`,
  };
}

export function parentReminderEmail({ studentName, code, deadline }) {
  const first = firstName(studentName);
  return {
    subject: `A reminder about ${first}'s NC Ignyte application`,
    text: `Hi,

A quick reminder: ${first} is waiting for your consent form to finish their NC Ignyte application.

Your code is ${code}

Enter it here to unlock the form: ${SITE_URL}/parent?code=${encodeURIComponent(code)}

The deadline is ${deadline}.

The NC Ignyte team`,
  };
}

export function consentReceivedEmail({ studentName }) {
  const first = firstName(studentName);
  return {
    subject: `We received ${first}'s consent form`,
    text: `Thank you. We received the consent form for ${first}.

We will review the application and email you both with a decision.

The NC Ignyte team`,
  };
}

/* Placeholders people actually type when they have not decided yet. Echoing
 * "TBD" back at them reads worse than saying nothing. */
const PLACEHOLDER = /^\s*(not sure( yet)?|n\/a|na|none|nothing|tbd|idk|\?+|-+)\s*[.!]?\s*$/i;
const hasContent = (v) => Boolean(v) && !PLACEHOLDER.test(v) && String(v).trim().length > 2;

const tidy = (v) => String(v || '').trim().replace(/\s+/g, ' ');

/* Their own words, laid out as a short quoted block rather than dropped into
 * the middle of one of our sentences. Two reasons: a sentence built around
 * someone else's fragment breaks as soon as they write something that is not
 * a noun phrase, and quoting them plainly reads more like we read it than a
 * sentence that tries to sound like we did.
 *
 * Each line is skipped when it is empty, a placeholder, or a repeat of a
 * line we already printed. That last one matters: plenty of students type
 * their startup name again in the "what are you building" box, and the old
 * letter said: what you are building: "ClearWay EMS". */
function theirWords({ startupName, building, goals, whyJoin }) {
  const name = hasContent(startupName) ? tidy(startupName) : '';
  const what = hasContent(building) ? tidy(building) : '';
  const aim = hasContent(goals) ? tidy(goals) : '';
  const why = hasContent(whyJoin) ? tidy(whyJoin) : '';

  const same = (a, b) => a && b && a.toLowerCase() === b.toLowerCase();

  const lines = [];
  if (name && what && !same(name, what)) lines.push(`${name}: ${what}`);
  else if (name && !what) lines.push(name);
  else if (what) lines.push(what);

  if (aim && !same(aim, what)) lines.push(`Where you want it to get to: ${aim}`);
  if (why && !same(why, aim) && !same(why, what)) lines.push(`Why you applied: ${why}`);

  if (!lines.length) return '';
  return `This is what you told us, and it is why we read your application twice:\n\n${
    lines.map((l) => `  ${l}`).join('\n\n')}\n\n`;
}

export function acceptEmail({ studentName, startupName, building, goals, whyJoin, personalNote, venueLine, whatToBring, parentConfirmed }) {
  const first = firstName(studentName);
  const startupSentence = theirWords({ startupName, building, goals, whyJoin });

  const bringLine = whatToBring ? `- Bring: ${whatToBring}\n` : '';
  const waiting = parentConfirmed
    ? ''
    : `\nWe are still waiting on your parent or guardian's consent form. Ask them to check their email, or request a new code from ${SITE_URL}/status.\n`;

  return {
    subject: `You're in, ${first}. Welcome to NC Ignyte.`,
    text: `Hi ${first},

Congratulations. You are in NC Ignyte, Cohort 1.

${startupSentence}${personalNote}

Here is what comes next:
- First Friday: November 6, 2026, 6:00 to 8:00 PM. We start with a kickoff where you meet the other students and find your team.
- ${venueLine}
${bringLine}- Check your status any time at ${SITE_URL}/status.
${waiting}
Questions? Reply to this email.

See you on the 6th,
The NC Ignyte team`,
  };
}

export function declineEmail({ studentName, startupName, building, goals, personalNote, reasonSentence }) {
  const first = firstName(studentName);
  /* A decline that cannot name what they were working on is the thing that
   * makes a rejection feel automated. */
  const name = hasContent(startupName) ? tidy(startupName) : '';
  const what = hasContent(building) ? tidy(building) : '';
  const aim = hasContent(goals) ? tidy(goals) : '';
  let read = '';
  if (name && what && name.toLowerCase() !== what.toLowerCase()) read = `${name}: ${what}`;
  else read = name || what;
  const readBack = read
    ? `We read what you wrote:\n\n  ${read}\n${aim && aim.toLowerCase() !== what.toLowerCase() ? `\n  Where you wanted it to get to: ${aim}\n` : ''}\n`
    : '';

  return {
    subject: `About your NC Ignyte application, ${first}`,
    text: `Hi ${first},

Thank you for applying to NC Ignyte. We read every application, and we want to be honest with you: we are not able to offer you a spot in Cohort 1.

${readBack}${personalNote}

This is not a judgment of you or your idea. ${reasonSentence}

A few things you can still do:
- Come to demo day on December 4. It is open to the public, and families and friends are welcome.
- Apply to Cohort 2. It is expected to run eight Fridays from January 15 to March 5, 2027, with applications closing on January 8. We will confirm those dates before they open.
- Keep building. If you want feedback on your idea, reply to this email and tell us what you are working on.

If you think we made a mistake, reply and we will look again.

Thank you for the effort you put into this,
The NC Ignyte team`,
  };
}

/* What the family actually receives when a decision is made.
 *
 * The letter itself is written, previewed and stored, but it is read in the
 * portal rather than in an inbox. One short notice keeps the outcome out of
 * a lock-screen preview and off a forwarded thread, and it means there is a
 * single copy of the letter: the one at /status, which cannot drift from
 * what the organiser approved.
 *
 * Deliberately the same wording either way. A subject line that reads
 * differently for an acceptance than for a decline gives the answer away
 * before the student has opened anything. */
export function decisionNoticeEmail({ studentName }) {
  const first = firstName(studentName);
  return {
    subject: 'There has been an update on your NC Ignyte application',
    text: `Hi ${first},

There has been an update on your NC Ignyte application. Please check your admissions portal to read it.

Open your portal: ${SITE_URL}/status

Sign in with the email you applied with. Your parent or guardian is copied on this message so they can read it with you.

Questions? Reply to this email.

The NC Ignyte team`,
  };
}

export const DECLINE_REASONS = {
  not_confirmed: 'We were not able to confirm the application.',
  not_nc: 'We could only accept students who attend a North Carolina high school.',
  duplicate: 'We found a duplicate of this application.',
  cohort_needs: 'This cohort has needs we could not meet this time.',
};

export function partnerNoticeEmail({ name, email, supportTypes }) {
  return {
    subject: `New support partner interest: ${name}`,
    text: `A new support partner form was submitted.

Name: ${name}
Email: ${email}
Interested in: ${supportTypes}

See the full submission in /admin.`,
  };
}

export function partnerThanksEmail({ name }) {
  return {
    subject: 'Thanks for your interest in NC Ignyte',
    text: `Hi ${firstName(name)},

Thank you for offering to help with NC Ignyte. We received your form and we will get back to you.

Questions in the meantime? Write to ${CONTACT_EMAIL}.

The NC Ignyte team`,
  };
}

export function codeExpiredEmail({ studentName, parentEmail }) {
  return {
    subject: 'Your parent\u2019s NC Ignyte code expired',
    text: `Hi ${firstName(studentName)},

The confirmation code we sent to ${maskEmail(parentEmail)} was not used, and codes last 24 hours.

You can send a new one yourself: go to ${SITE_URL}/status, enter the email you applied with, and choose "Send a new code". That gives your parent or guardian another 24 hours.

Nothing about your application is lost. It is just waiting on their consent form.

The NC Ignyte team`,
  };
}

export function passwordResetEmail({ link, minutes }) {
  return {
    subject: 'Reset your Ignyte account password',
    text: `Someone asked to reset the password on the Ignyte account for this address.

Set a new password here:

${link}

The link lasts ${minutes} minutes and works once.

If this was not you, ignore this email. Your password has not changed, and nobody can use this link without opening it from your inbox.

Questions? Write to ${CONTACT_EMAIL}.

${SITE_URL}`,
  };
}

export function passwordChangedEmail() {
  return {
    subject: 'Your Ignyte account password changed',
    text: `The password on your Ignyte account was just changed, and every other browser that was signed in has been signed out.

If that was you, nothing further is needed.

If it was not, write to ${CONTACT_EMAIL} straight away.

${SITE_URL}`,
  };
}

/* The paragraph an organiser would otherwise type every time. It is a real
 * default, not a placeholder: sending it unedited reads like a letter, not
 * like a form. The modal prefills it, so writing your own is editing rather
 * than starting from a blank box. */
export const DEFAULT_ACCEPT_NOTE =
  'We liked that you are already building rather than waiting for permission, and that is exactly the kind of person this cohort is for. Come on the fifteenth ready to work on it in front of other people.';

export const DEFAULT_DECLINE_NOTE =
  'We want to be straight with you: this was a hard read, and the decision says more about how few evenings there are than about your idea. Please do not take it as a verdict on what you are building.';

export function checkinInviteEmail({ studentName, siteUrl, deadlineNote }) {
  const first = firstName(studentName);
  return {
    subject: 'Your weekly check-in is open',
    text: `Hi ${first},

Your weekly check-in is now open: ${siteUrl || SITE_URL}/checkin

Here is how it works:

- Straight after each session, write down what you are going to get done before the next one. One line each.
- Tick them off through the week as you finish them.
- Tell us what you need help with. That is the part organisers read first, so be specific.

${deadlineNote}

If you miss the deadline you can still fill it in. It will show as late on our side, which is better than showing as nothing at all.

Questions? Reply to this email.

The NC Ignyte team`,
  };
}
