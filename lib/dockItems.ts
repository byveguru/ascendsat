// @ts-nocheck

export const DOCK_SLOT_COUNT = 7;
export const PINNED_TOOL_ID = "home";

export const DEFAULT_DOCK_ORDER = [
  "practice",
  "smartQuiz",
  "drills",
  "review",
  "growth",
  "lessons",
];

export const DOCK_ELIGIBLE_TOOLS = [
  "practice",
  "smartQuiz",
  "fullTest",
  "review",
  "growth",
  "drills",
  "lessons",
  "games",
  "vocab",
  "desmosLessons",
  "cramsheets",
  "studyPlan",
  "weakAreas",
  "diagnostic",
  "settings",
];

export const TOOL_LABELS: Record<string, string> = {
  home: "Home",
  practice: "Practice",
  smartQuiz: "Smart Quiz",
  fullTest: "Full Test",
  review: "Review",
  growth: "Progress",
  drills: "Drills",
  lessons: "Lessons",
  games: "Games",
  vocab: "Vocab",
  desmosLessons: "Desmos",
  cramsheets: "Cram Sheets",
  studyPlan: "Study Plan",
  studyCalendar: "Calendar",
  weakAreas: "Weak Areas",
  diagnostic: "Diagnostic",
  settings: "Settings",
};

export const VIEW_TO_TOOL_ID: Record<string, string> = {
  home: "home",
  practice: "practice",
  results: "practice",
  smartQuiz: "smartQuiz",
  fullTest: "fullTest",
  review: "review",
  growth: "growth",
  timeAnalytics: "growth",
  drills: "drills",
  lessons: "lessons",
  games: "games",
  vocab: "vocab",
  desmosLessons: "desmosLessons",
  cramsheets: "cramsheets",
  studyPlan: "studyPlan",
  studyCalendar: "studyPlan",
  weakAreas: "weakAreas",
  diagnostic: "diagnostic",
  settings: "settings",
};

const emptyUsage = () => ({});

export function recencyBoost(lastAt?: number, now = Date.now()) {
  if (!lastAt) return 0;
  const days = (now - lastAt) / (1000 * 60 * 60 * 24);
  return Math.max(0, 5 - days);
}

export function scoreToolUsage(entry?: { count?: number; lastAt?: number }, now = Date.now()) {
  const count = entry?.count || 0;
  return count + recencyBoost(entry?.lastAt, now);
}

export function bootstrapToolUsageFromHistory(scoreHistory = [], userProfile = null) {
  const usage = {};
  const bump = (toolId, amount = 1) => {
    if (!DOCK_ELIGIBLE_TOOLS.includes(toolId) && toolId !== PINNED_TOOL_ID) return;
    const prev = usage[toolId] || { count: 0, lastAt: 0 };
    usage[toolId] = {
      count: prev.count + amount,
      lastAt: Math.max(prev.lastAt || 0, Date.now()),
    };
  };

  bump(PINNED_TOOL_ID, 1);

  (scoreHistory || []).forEach((entry) => {
    if (entry?.questionSource === "adaptive") {
      bump("smartQuiz", 2);
      return;
    }
    if (entry?.total >= 20) {
      bump("fullTest", 2);
      return;
    }
    bump("practice", 1);
  });

  const weakAreas = userProfile?.personalization?.weakAreas || [];
  if (weakAreas.length > 0) {
    bump("drills", 3);
    bump("review", 2);
    bump("weakAreas", 1);
  }

  DEFAULT_DOCK_ORDER.forEach((toolId, index) => {
    if (!usage[toolId]) {
      usage[toolId] = { count: DEFAULT_DOCK_ORDER.length - index, lastAt: 0 };
    }
  });

  return usage;
}

export function mergeToolUsage(existing = {}, seeded = {}) {
  const merged = { ...seeded };
  Object.entries(existing || {}).forEach(([toolId, entry]) => {
    const prev = merged[toolId] || { count: 0, lastAt: 0 };
    merged[toolId] = {
      count: Math.max(prev.count || 0, entry?.count || 0),
      lastAt: Math.max(prev.lastAt || 0, entry?.lastAt || 0),
    };
  });
  return merged;
}

export function getDockToolIds(toolUsage = {}, userProfile = null, scoreHistory = []) {
  const seeded = bootstrapToolUsageFromHistory(scoreHistory, userProfile);
  const merged = mergeToolUsage(toolUsage, seeded);
  const now = Date.now();

  const ranked = DOCK_ELIGIBLE_TOOLS
    .map((toolId) => ({
      toolId,
      score: scoreToolUsage(merged[toolId], now),
    }))
    .sort((a, b) => b.score - a.score);

  const dynamicIds = [];
  ranked.forEach((item) => {
    if (dynamicIds.length >= DOCK_SLOT_COUNT - 1) return;
    if (item.toolId === PINNED_TOOL_ID) return;
    if (!dynamicIds.includes(item.toolId)) dynamicIds.push(item.toolId);
  });

  while (dynamicIds.length < DOCK_SLOT_COUNT - 1) {
    const fallback = DEFAULT_DOCK_ORDER.find((toolId) => !dynamicIds.includes(toolId));
    if (!fallback) break;
    dynamicIds.push(fallback);
  }

  return [PINNED_TOOL_ID, ...dynamicIds.slice(0, DOCK_SLOT_COUNT - 1)];
}

export function bumpToolUsage(toolUsage = {}, toolId, now = Date.now()) {
  if (!toolId) return toolUsage;
  const prev = toolUsage[toolId] || { count: 0, lastAt: 0 };
  return {
    ...toolUsage,
    [toolId]: {
      count: (prev.count || 0) + 1,
      lastAt: now,
    },
  };
}
