/* What an application's status means to the student, and what it lets them
 * do next. Shared by /api/status and /api/apply so the page and the server
 * can never disagree about whether the form is open. */

export const STAGES = {
  applied: { label: 'Waiting for your parent', detail: 'We emailed your parent or guardian a confirmation code. Once they enter it and submit the consent form, we review your application.' },
  parent_confirmed: { label: 'Parent confirmed, under review', detail: 'Your parent or guardian submitted the consent form. We are reviewing your application and will email you a decision.' },
  accepted: { label: "Accepted: you're in. See you on November 6.", detail: 'Your letter is below. We sent the same words to you and your parent or guardian by email.' },
  declined: { label: 'We were not able to offer you a spot in Cohort 1.', detail: 'Your letter is below. We sent the same words to you and your parent or guardian by email.' },
  withdrawn: { label: 'This application was withdrawn', detail: 'If that is a mistake, reply to any email from us.' },
};

/* A decision has been made and it was not a place in the cohort, so there is
 * something left to do. Accepted is deliberately not here: a second
 * application from a student who already has a spot only creates a duplicate
 * for an organiser to untangle. */
export const REAPPLY_STATUSES = ['declined', 'withdrawn'];

export const canApplyAgain = (status) => REAPPLY_STATUSES.includes(status);
