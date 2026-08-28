// CommonJS copy of mobile/src/shared/gamification.ts — Vercel functions here
// can't import from /mobile/src, so this is duplicated by hand. Keep the two
// in sync if these numbers ever change. Leading underscore keeps Vercel from
// treating this as its own route.

const XP_PER_DIFFICULTY = { Easy: 8, Medium: 14, Hard: 22 };
const LESSON_COMPLETION_BONUS = 25;
const PERFECT_LESSON_BONUS = 20;
const DAILY_CHALLENGE_BONUS = 30;
const STREAK_FREEZE_CAP = 3;

const LEVEL_TIERS = [
  { id: "basecamp", name: "Basecamp", minXp: 0 },
  { id: "trailhead", name: "Trailhead", minXp: 400 },
  { id: "ridge_runner", name: "Ridge Runner", minXp: 1200 },
  { id: "summit_push", name: "Summit Push", minXp: 3000 },
  { id: "peak_climber", name: "Peak Climber", minXp: 6000 },
];

function getTierForXp(xp) {
  let tier = LEVEL_TIERS[0];
  for (const t of LEVEL_TIERS) {
    if (xp >= t.minXp) tier = t;
  }
  return tier;
}

function computeLessonXp(answers) {
  const correctXp = answers.reduce((sum, a) => sum + (a.correct ? XP_PER_DIFFICULTY[a.difficulty] || 0 : 0), 0);
  const allCorrect = answers.length > 0 && answers.every((a) => a.correct);
  return correctXp + LESSON_COMPLETION_BONUS + (allCorrect ? PERFECT_LESSON_BONUS : 0);
}

function longestCorrectStreak(answers) {
  let longest = 0;
  let current = 0;
  for (const a of answers) {
    current = a.correct ? current + 1 : 0;
    longest = Math.max(longest, current);
  }
  return longest;
}

const BADGE_DEFINITIONS = [
  { id: "first_lesson", name: "First Steps", desc: "Complete your first lesson", check: (c) => c.totalLessonsCompleted >= 1 },
  { id: "streak_3", name: "Momentum", desc: "3-day streak", check: (c) => c.currentStreak >= 3 },
  { id: "streak_7", name: "On a Roll", desc: "7-day streak", check: (c) => c.currentStreak >= 7 },
  { id: "streak_30", name: "Unstoppable", desc: "30-day streak", check: (c) => c.currentStreak >= 30 },
  { id: "streak_100", name: "Century", desc: "100-day streak", check: (c) => c.currentStreak >= 100 },
  { id: "perfect_lesson", name: "Clean Sweep", desc: "Perfect score on a lesson", check: (c) => c.perfectLesson },
  { id: "five_perfect", name: "Precision", desc: "5 perfect lessons", check: (c) => c.perfectLessonsCompleted >= 5 },
  { id: "ten_lessons", name: "Trailblazer", desc: "Complete 10 lessons", check: (c) => c.totalLessonsCompleted >= 10 },
  { id: "twenty_five_lessons", name: "Steady Climber", desc: "Complete 25 lessons", check: (c) => c.totalLessonsCompleted >= 25 },
  { id: "fifty_lessons", name: "Summit Veteran", desc: "Complete 50 lessons", check: (c) => c.totalLessonsCompleted >= 50 },
];

function checkNewBadges(ctx, alreadyEarned) {
  const earnedSet = new Set(alreadyEarned || []);
  return BADGE_DEFINITIONS.filter((b) => !earnedSet.has(b.id) && b.check(ctx)).map((b) => b.id);
}

const DAILY_CHALLENGE_ROTATION = ["three_in_a_row", "new_domain", "perfect_lesson", "two_lessons"];

function getDailyChallengeType(dateStr) {
  const dayIndex = Math.floor(new Date(`${dateStr}T00:00:00.000Z`).getTime() / 86400000);
  const idx = ((dayIndex % DAILY_CHALLENGE_ROTATION.length) + DAILY_CHALLENGE_ROTATION.length) % DAILY_CHALLENGE_ROTATION.length;
  return DAILY_CHALLENGE_ROTATION[idx];
}

module.exports = {
  XP_PER_DIFFICULTY,
  LESSON_COMPLETION_BONUS,
  PERFECT_LESSON_BONUS,
  DAILY_CHALLENGE_BONUS,
  STREAK_FREEZE_CAP,
  LEVEL_TIERS,
  getTierForXp,
  computeLessonXp,
  longestCorrectStreak,
  BADGE_DEFINITIONS,
  checkNewBadges,
  DAILY_CHALLENGE_ROTATION,
  getDailyChallengeType,
};
