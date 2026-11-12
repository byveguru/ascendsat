import { Platform, Easing } from "react-native";

/* ---------------- RAW PALETTE ---------------- */
export const palette = {
  ink: "#1d1d1f",
  graphite: "#707070",
  slate: "#474747",
  ash: "#333333",
  fog: "#f5f5f7",
  snow: "#ffffff",
  obsidian: "#000000",
  silverMist: "#e8e8ed",
  azure: "#0071e3",
  cobaltLink: "#0066cc",
  citrusGradient: "#dddc8c",
  indigoGradient: "#2535e2",
  blushGradient: "#cc29bc",
  citrusFinish: "#dddc8c",
  blushFinish: "#e8d0d0",
  indigoFinish: "#596680",
  caution: "#b64400",
};

/* ---------------- TYPOGRAPHY PRESETS ---------------- */
export const typography = {
  caption: { fontSize: 12, lineHeight: 16, letterSpacing: -0.26 },
  bodySm: { fontSize: 14, lineHeight: 20, letterSpacing: -0.04 },
  body: { fontSize: 17, lineHeight: 25, letterSpacing: -0.1 },
  subheading: { fontSize: 20, lineHeight: 28, letterSpacing: -0.2 },
  headingSm: { fontSize: 24, lineHeight: 31, letterSpacing: -0.36 },
  heading: { fontSize: 40, lineHeight: 47, letterSpacing: -0.6 },
  headingLg: { fontSize: 56, lineHeight: 60, letterSpacing: -0.9 },
  display: { fontSize: 96, lineHeight: 100, letterSpacing: -2.11 },
};

/* ---------------- SPACING ---------------- */
export const spacing = {
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  20: 20,
  24: 24,
  28: 28,
  32: 32,
  40: 40,
  44: 44,
  48: 48,
  52: 52,
  76: 76,
  80: 80,
  120: 120,
  144: 144,
};

/* ---------------- RADIUS ---------------- */
export const radius = {
  lg: 10,
  xl3: 28,
  xl3_2: 32,
  xl3_3: 36,
  full: 980,
  full2: 999,
  sm: 8,
  md: 12,
  xl: 20,
};

/* ---------------- MOTION ---------------- */
/* One signature easing curve + one duration scale, reused everywhere so
   every scroll reveal, transition, and parallax move points the same direction.
   `easeCss` matches the RN `ease` curve for web CSS/keyframe usage. */
export const motion = {
  ease: Easing.bezier(0.16, 1, 0.3, 1),
  easeOut: Easing.out(Easing.cubic),
  easeCss: "cubic-bezier(0.16, 1, 0.3, 1)",
  duration: { fast: 200, base: 320, slow: 600, xslow: 900 },
};

/* ---------------- FONTS ---------------- */
/* 'Inter' is loaded from Google Fonts (see injectFrauncesWebFont in App.tsx) so
   text renders identically across OSes instead of falling back to whichever
   system font (SF Pro on Mac, Segoe UI on Windows) happens to be installed. */
const fontDisplayWeb = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const fontTextWeb = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

export const fonts = {
  studyDisplay: Platform.select({ web: "'Fraunces', Georgia, serif", default: "Fraunces_700Bold" }),
  display: Platform.select({ web: fontDisplayWeb, default: undefined }),
  text: Platform.select({ web: fontTextWeb, default: undefined }),
};

/* ---------------- FUNCTIONAL COLORS ---------------- */
const functional = {
  gold: "#f0b429",
  blue: "#2563eb",
  green: "#16a34a",
  red: "#dc2626",
  amber: "#d97706",
};

export type AppTheme = ReturnType<typeof createTheme>;

export function createTheme(isLight: boolean) {
  const colors = isLight
    ? {
        bg: palette.fog,
        bgElevated: palette.snow,
        bgDeep: palette.silverMist,
        bgCard: palette.snow,
        bgHover: palette.silverMist,
        border: palette.silverMist,
        textPrimary: palette.ink,
        textSecondary: palette.graphite,
        textMuted: palette.slate,
        link: palette.cobaltLink,
      }
    : {
        bg: palette.obsidian,
        bgElevated: palette.ash,
        bgDeep: palette.ink,
        bgCard: palette.ash,
        bgHover: palette.slate,
        border: palette.slate,
        textPrimary: palette.snow,
        textSecondary: "#a1a1a6",
        textMuted: palette.graphite,
        link: palette.azure,
      };

  const gradients = isLight
    ? {
        hero: [palette.indigoGradient, palette.indigoFinish] as const,
        accent: [palette.citrusGradient, palette.citrusFinish] as const,
        decorative: [palette.blushGradient, palette.blushFinish] as const,
      }
    : {
        hero: [palette.blushGradient, palette.indigoFinish] as const,
        accent: [palette.citrusGradient, palette.citrusFinish] as const,
        decorative: [palette.indigoGradient, palette.ash] as const,
      };

  return {
    isLight,
    colors,
    gradients,
    typography,
    spacing,
    radius,
    fonts,
    accent: { gold: functional.gold },
    functional,
    finish: {
      citrus: palette.citrusFinish,
      blush: palette.blushFinish,
      indigo: palette.indigoFinish,
    },
  };
}

/** Legacy T shim — same keys as the original inline T object */
export function legacyT(isLight: boolean) {
  const theme = createTheme(isLight);
  const c = theme.colors;
  const f = theme.functional;
  return {
    bg0: isLight ? palette.silverMist : palette.obsidian,
    bg1: c.bg,
    bg2: c.bgCard,
    bg3: c.bgElevated,
    bg4: c.border,
    bg5: c.bgHover,
    gold: f.gold,
    blue: f.blue,
    green: f.green,
    red: f.red,
    amber: f.amber,
    t1: c.textPrimary,
    t2: c.textSecondary,
    t3: c.textMuted,
    t4: palette.ink,
    r_sm: radius.sm,
    r_md: radius.md,
    r_lg: radius.lg,
    r_xl: radius.xl,
    xs: 11,
    sm: typography.bodySm.fontSize,
    base: typography.body.fontSize,
    lg: typography.body.fontSize,
    xl: typography.subheading.fontSize,
    "2xl": typography.headingSm.fontSize,
    "3xl": typography.heading.fontSize,
  };
}
// Approved Everest + Ollie identity. Shared by the new landing/home surfaces.
export const ascentTheme = (isLight: boolean) => ({
  ink: isLight ? "#193b2e" : "#eef4ee",
  text: isLight ? "#263b32" : "#e2ebe3",
  muted: isLight ? "#526357" : "#b0c3b4",
  background: isLight ? "#fcfdfb" : "#101c17",
  surface: isLight ? "#ffffff" : "#17281f",
  soft: isLight ? "#eef3e8" : "#243b2c",
  border: isLight ? "#dce4d9" : "#35503d",
  forest: isLight ? "#345b38" : "#a6c497",
  terracotta: isLight ? "#b74e2b" : "#d7815c",
  incorrectSurface: isLight ? "#fff0f0" : "#3a2022",
  incorrectBorder: isLight ? "#c74b50" : "#db7d80",
  incorrectText: isLight ? "#9f2c2c" : "#ffb5b9",
  onAccent: isLight ? "#ffffff" : "#142018",
  radius: radius.md,
  space: spacing,
});
