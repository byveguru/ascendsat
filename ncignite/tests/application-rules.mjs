/* The rules both doors share.
 *
 * lib/application.js now sits underneath the public apply form as well as the
 * admin editor, so a mistake here is not an admin inconvenience, it stops
 * students applying. These are pure checks, no database.
 *
 *   node tests/application-rules.mjs
 */
import {
  readApplicationFields, validateApplication, normaliseReferral, APPLICANT_FIELDS,
  COHORTS, TEAM_SIZES, CAN_ATTEND, REFERRED,
} from '../lib/application.js';

let pass = 0, fail = 0;
const ok = (n, c, x = '') => { c ? (pass++, console.log('  PASS', n)) : (fail++, console.log('  FAIL', n, x)); };

const good = {
  cohort: 'Cohort 1, fall 2026',
  student_name: 'Ada Lovelace', student_phone: '919 555 0101',
  parent_name: 'A Parent', parent_email: 'parent@example.com', parent_phone: '919 555 0102',
  school_grade: 'Green Level High School, 12th grade',
  startup_name: 'Analytical', building: 'A general purpose computing engine.',
  team_size: 'Solo', why_join: 'To build it with other people.', goals: 'A working prototype.',
  can_attend: 'Yes', referred: 'No',
};

console.log('1. A good application passes');
ok('no errors', Object.keys(validateApplication(readApplicationFields(good))).length === 0,
  JSON.stringify(validateApplication(readApplicationFields(good))));

console.log('\n2. Every required answer is actually required');
['cohort', 'student_name', 'student_phone', 'parent_name', 'parent_email', 'parent_phone',
  'school_grade', 'startup_name', 'building', 'team_size', 'why_join', 'goals', 'can_attend',
].forEach((key) => {
  const errs = validateApplication(readApplicationFields({ ...good, [key]: '' }));
  ok(`${key} missing is caught`, Boolean(errs[key]), JSON.stringify(errs));
});

console.log('\n3. The fixed sets are enforced');
ok('a made up cohort is rejected',
  Boolean(validateApplication(readApplicationFields({ ...good, cohort: 'Cohort 9' })).cohort));
ok('a made up team size is rejected',
  Boolean(validateApplication(readApplicationFields({ ...good, team_size: 'Team of 40' })).team_size));
ok('a made up attendance answer is rejected',
  Boolean(validateApplication(readApplicationFields({ ...good, can_attend: 'Maybe' })).can_attend));
ok('every offered team size passes',
  TEAM_SIZES.every((v) => !validateApplication(readApplicationFields({ ...good, team_size: v })).team_size));
ok('every offered attendance answer passes',
  CAN_ATTEND.every((v) => !validateApplication(readApplicationFields({ ...good, can_attend: v })).can_attend));
ok('both cohorts pass',
  COHORTS.every((v) => !validateApplication(readApplicationFields({ ...good, cohort: v })).cohort));
ok('there are exactly two cohorts', COHORTS.length === 2, String(COHORTS.length));

console.log('\n4. A bad parent address is caught');
ok('no at sign', Boolean(validateApplication(readApplicationFields({ ...good, parent_email: 'nope' })).parent_email));

console.log('\n5. The agreement is only demanded when it is asked for');
ok('demanded on a new application',
  Boolean(validateApplication(readApplicationFields(good), { creating: true }).student_agreed));
ok('satisfied by Yes',
  !validateApplication(readApplicationFields(good), { creating: true, agreed: 'Yes' }).student_agreed);
ok('satisfied by true',
  !validateApplication(readApplicationFields(good), { creating: true, agreed: true }).student_agreed);
ok('not demanded when editing', !validateApplication(readApplicationFields(good)).student_agreed);

console.log('\n6. A partial edit is judged only on what it changes');
/* The point of `only`: a row saved before the option sets were enforced must
 * still be correctable, rather than held hostage by a legacy value in a field
 * nobody is touching. */
const partial = readApplicationFields({ student_phone: '919 555 0199' }, ['student_phone']);
ok('one good field, no complaints about the rest',
  Object.keys(validateApplication(partial, { only: ['student_phone'] })).length === 0,
  JSON.stringify(validateApplication(partial, { only: ['student_phone'] })));
ok('but that field still has to be filled in',
  Boolean(validateApplication(readApplicationFields({ student_phone: '' }, ['student_phone']),
    { only: ['student_phone'] }).student_phone));

console.log('\n7. Length caps match the form');
const long = 'x'.repeat(2000);
const capped = readApplicationFields({ ...good, building: long, student_name: long, food_allergies: long });
ok('a long answer caps at 1500', capped.building.length === 1500, String(capped.building.length));
ok('a line caps at 300', capped.student_name.length === 300, String(capped.student_name.length));
ok('an optional note caps at 600', capped.food_allergies.length === 600, String(capped.food_allergies.length));

console.log('\n8. The editable list is the student answers only');
['consent_photo', 'signature', 'status', 'decided_at', 'decision_letter', 'student_email',
  'guardian_name', 'emergency_contact', 'parent_confirmed_at', 'created_by',
].forEach((key) => ok(`${key} is not editable`, !APPLICANT_FIELDS.includes(key)));
ok('an unknown field is ignored rather than stored',
  readApplicationFields({ status: 'accepted' }).status === undefined);


console.log('\n9. The referral question');
const referral = (over, opts) => validateApplication(normaliseReferral(readApplicationFields({ ...good, ...over })), opts);

ok('a new application must answer it',
  Boolean(referral({ referred: '' }, { creating: true, agreed: 'Yes' }).referred));
ok('an older application is never asked to answer it',
  !referral({ referred: '' }).referred);
ok('only Yes or No are accepted',
  Boolean(referral({ referred: 'Maybe' }).referred));
ok('both answers are accepted',
  REFERRED.every((v) => !referral({ referred: v, referred_by: v === 'Yes' ? 'A Person' : '' }).referred));

ok('Yes without a name is caught',
  Boolean(referral({ referred: 'Yes', referred_by: '' }).referred_by));
ok('Yes with a name passes',
  !referral({ referred: 'Yes', referred_by: 'Rishit Sharma' }).referred_by);
ok('No without a name passes',
  Object.keys(referral({ referred: 'No', referred_by: '' })).length === 0,
  JSON.stringify(referral({ referred: 'No', referred_by: '' })));

/* Someone can type a name, then change their mind and answer No. The stale
 * name must not travel with the application. */
const changedMind = normaliseReferral(readApplicationFields({ ...good, referred: 'No', referred_by: 'Someone' }));
ok('answering No clears a name already typed', changedMind.referred_by === '', changedMind.referred_by);
ok('answering Yes keeps the name',
  normaliseReferral(readApplicationFields({ ...good, referred: 'Yes', referred_by: 'Someone' })).referred_by === 'Someone');

ok('the name is still editable on its own',
  Object.keys(validateApplication(readApplicationFields({ referred_by: 'A Person' }, ['referred_by']),
    { only: ['referred_by'] })).length === 0);
ok('both questions are editable fields',
  APPLICANT_FIELDS.includes('referred') && APPLICANT_FIELDS.includes('referred_by'));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
