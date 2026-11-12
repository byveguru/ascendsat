import { Platform, StyleSheet } from "react-native";
import { AppTheme, legacyT, palette, ascentTheme, fonts } from "./theme";

export function makeStyles(isLight: boolean, theme: AppTheme) {
  const T = legacyT(isLight);
  const c = theme.colors;
  const ty = theme.typography;
  const bg = c.bg;
  const card = c.bgElevated;
  const bdr = c.border;
  const tx1 = c.textPrimary;
  const tx2 = c.textSecondary;
  const acc = isLight ? T.blue : T.gold;
  const fontText = theme.fonts.text;

  return StyleSheet.create({
    container: { flex: 1, backgroundColor: bg, padding: 20 },
    containerLight: { backgroundColor: c.bg },
    center: { flex: 1, justifyContent: "center", backgroundColor: bg, padding: 24 },
    logo: {
      color: acc,
      fontSize: ty.heading.fontSize,
      textAlign: "center",
      marginBottom: 8,
      fontWeight: "900",
      letterSpacing: ty.heading.letterSpacing,
      ...(fontText ? { fontFamily: fontText } : {}),
    },
    title: {
      color: tx1,
      fontSize: ty.subheading.fontSize,
      fontWeight: "800",
      marginBottom: 10,
      letterSpacing: ty.subheading.letterSpacing,
      ...(fontText ? { fontFamily: fontText } : {}),
    },
    subtitle: {
      color: tx2,
      marginTop: 4,
      marginBottom: 10,
      fontSize: ty.bodySm.fontSize,
      lineHeight: ty.bodySm.lineHeight,
    },
    input: {
      backgroundColor: isLight ? palette.snow : c.bgCard,
      padding: 14,
      borderRadius: theme.radius.lg,
      color: tx1,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: bdr,
      fontSize: ty.body.fontSize,
    },
    button: {
      backgroundColor: isLight ? T.blue : c.bgElevated,
      padding: 15,
      borderRadius: theme.radius.lg,
      marginTop: 10,
      borderWidth: isLight ? 0 : 1,
      borderColor: c.border,
    },
    btnText: { color: palette.snow, textAlign: "center", fontWeight: "700", fontSize: ty.body.fontSize },
    link: { color: isLight ? T.blue : tx2, textAlign: "center", marginTop: 14, fontSize: ty.bodySm.fontSize },
    error: { color: T.red, textAlign: "center", marginBottom: 10, fontSize: ty.bodySm.fontSize },
    topBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
    logout: { padding: 8, backgroundColor: isLight ? c.bgDeep : c.bgElevated, borderRadius: theme.radius.sm },
    backButton: {
      alignSelf: "flex-start",
      paddingVertical: 8,
      paddingHorizontal: 14,
      backgroundColor: isLight ? c.bgDeep : c.bgElevated,
      borderRadius: theme.radius.sm,
      marginBottom: 14,
      borderWidth: 1,
      borderColor: bdr,
    },
    backText: { color: tx1, fontWeight: "700", fontSize: ty.bodySm.fontSize },
    row: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
    box: {
      flex: 1,
      padding: 14,
      marginVertical: 5,
      backgroundColor: card,
      borderRadius: theme.radius.lg,
      alignItems: "center",
      borderWidth: 1,
      borderColor: bdr,
    },
    activeBox: { borderWidth: 2, borderColor: acc },
    grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
    gridBox: {
      width: "48%",
      padding: 14,
      marginVertical: 6,
      backgroundColor: card,
      borderRadius: theme.radius.lg,
      borderWidth: 1,
      borderColor: bdr,
    },
    activeGridBox: { borderWidth: 2, borderColor: acc },
    boxText: { color: tx1, textAlign: "center", fontWeight: "600", fontSize: ty.bodySm.fontSize },
    check: { color: acc, textAlign: "center", marginTop: 5, fontWeight: "700" },
    countCard: {
      backgroundColor: card,
      padding: 18,
      borderRadius: theme.radius.xl3,
      marginBottom: 16,
      marginTop: 6,
      borderWidth: 1,
      borderColor: bdr,
    },
    countTitle: { color: tx1, fontWeight: "800", fontSize: 16, marginBottom: 4 },
    countSub: { color: tx2, fontSize: ty.caption.fontSize, marginBottom: 14 },
    countRow: { flexDirection: "row", justifyContent: "space-between" },
    countItem: { flex: 1, alignItems: "center" },
    countNumber: { color: acc, fontWeight: "900", fontSize: 26, letterSpacing: -0.5 },
    countLabel: {
      color: tx2,
      fontSize: ty.caption.fontSize,
      marginTop: 3,
      textTransform: "uppercase",
      letterSpacing: 0.8,
      fontWeight: "700",
    },
    statCard: {
      backgroundColor: card,
      padding: 16,
      borderRadius: theme.radius.lg,
      marginTop: 10,
      borderWidth: 1,
      borderColor: bdr,
    },
    statTitle: { color: tx1, fontWeight: "700", marginBottom: 5, fontSize: 15 },
    statText: { color: tx2, marginTop: 2, fontSize: ty.bodySm.fontSize, lineHeight: ty.bodySm.lineHeight },
    statAcc: { color: acc, fontWeight: "700" },
    explanationText: { color: tx2, marginTop: 10, lineHeight: ty.bodySm.lineHeight, fontSize: ty.bodySm.fontSize },
    reviewCard: {
      backgroundColor: card,
      borderRadius: theme.radius.xl3,
      padding: 18,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: bdr,
    },
    reviewNum: {
      color: acc,
      fontWeight: "700",
      fontSize: ty.caption.fontSize,
      marginBottom: 8,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    reviewQuestion: { color: tx1, fontWeight: "600", marginBottom: 12, lineHeight: 24, fontSize: 15 },
    reviewChoice: {
      padding: 12,
      borderRadius: theme.radius.sm,
      marginBottom: 6,
      backgroundColor: isLight ? c.bg : c.bgElevated,
    },
    reviewCorrect: {
      backgroundColor: isLight ? "#f0fdf4" : "#0d2a18",
      borderWidth: 1,
      borderColor: isLight ? "#bbf7d0" : "#165a30",
    },
    reviewWrong: {
      backgroundColor: isLight ? "#fff5f5" : "#2a0d0d",
      borderWidth: 1,
      borderColor: isLight ? "#fecaca" : "#5a1515",
    },
    reviewChoiceText: { color: tx1, fontSize: ty.bodySm.fontSize, lineHeight: ty.bodySm.lineHeight },
    historyCard: {
      backgroundColor: card,
      borderRadius: theme.radius.xl3,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: bdr,
    },
    historyTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
    historyScore: { color: tx1, fontSize: ty.subheading.fontSize, fontWeight: "800", letterSpacing: -0.3 },
    historyPercent: { fontSize: 18, fontWeight: "800" },
    historyMeta: { color: tx2, fontSize: 13, marginTop: 3, lineHeight: 20 },
    comingSoon: { backgroundColor: card, padding: 16, borderRadius: theme.radius.lg, marginTop: 10 },
    comingSoonText: { color: acc, textAlign: "center", fontWeight: "700" },
  });
}

export function makeObStyles(theme: AppTheme) {
  const c = theme.colors;
  const gold = theme.accent.gold;
  const ty = theme.typography;

  return StyleSheet.create({
    progressRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 32 },
    progressDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: c.bgHover },
    progressDotActive: { backgroundColor: gold },
    progressLine: { width: 60, height: 2, backgroundColor: c.bgHover, marginHorizontal: 6 },
    progressLineActive: { backgroundColor: gold },
    stepLabel: { color: c.textSecondary, fontSize: 13, textAlign: "center", marginBottom: 8 },
    heading: {
      color: c.textPrimary,
      fontSize: ty.headingSm.fontSize,
      fontWeight: "700",
      textAlign: "center",
      marginBottom: 10,
    },
    sub: { color: c.textSecondary, fontSize: 15, textAlign: "center", marginBottom: 32 },
    bigInput: {
      backgroundColor: c.bgDeep,
      color: gold,
      fontSize: 48,
      fontWeight: "700",
      textAlign: "center",
      padding: 20,
      borderRadius: theme.radius.lg,
      marginBottom: 24,
      width: "100%",
    },
    dateButton: {
      backgroundColor: c.bgDeep,
      padding: 18,
      borderRadius: theme.radius.lg,
      marginBottom: 24,
      alignItems: "center",
      width: "100%",
    },
    dateButtonText: { color: c.textPrimary, fontSize: 18, fontWeight: "600" },
    nextBtn: {
      backgroundColor: gold,
      padding: 16,
      borderRadius: theme.radius.lg,
      alignItems: "center",
      width: "100%",
      marginBottom: 12,
    },
    nextBtnText: { color: palette.ink, fontSize: ty.body.fontSize, fontWeight: "700" },
  });
}

export function makeHomeStyles(theme: AppTheme) {
  const c = theme.colors;
  const gold = theme.accent.gold;

  return StyleSheet.create({
    banner: {
      flexDirection: "row",
      backgroundColor: c.bgDeep,
      borderRadius: theme.radius.xl,
      padding: 20,
      marginBottom: 24,
      alignItems: "center",
      justifyContent: "space-around",
      borderWidth: 1,
      borderColor: c.border,
    },
    bannerItem: { alignItems: "center", flex: 1 },
    bannerValue: { color: gold, fontSize: 28, fontWeight: "900", letterSpacing: -0.5 },
    bannerLabel: {
      color: c.textMuted,
      fontSize: theme.typography.caption.fontSize,
      marginTop: 4,
      fontWeight: "600",
      letterSpacing: 0.5,
      textTransform: "uppercase",
    },
    bannerDivider: { width: 1, height: 36, backgroundColor: c.border },
  });
}

export function makeLandStyles(theme: AppTheme) {
  const c = theme.colors;
  const gold = theme.accent.gold;
  const ty = theme.typography;
  const sp = theme.spacing;
  const r = theme.radius;
  const fontDisplay = theme.fonts.display;

  return StyleSheet.create({
    bg: { flex: 1, backgroundColor: c.bg },
    nav: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: sp[24],
      paddingTop: sp[52],
      paddingBottom: sp[20],
      backgroundColor: c.bg,
    },
    navLogo: {
      color: gold,
      fontSize: 22,
      fontWeight: "800",
      letterSpacing: -0.5,
      ...(fontDisplay ? { fontFamily: fontDisplay } : {}),
    },
    navBtns: { flexDirection: "row", alignItems: "center", gap: 10 },
    navLogin: { color: c.textSecondary, fontWeight: "600", fontSize: 15 },
    navSignUp: {
      backgroundColor: gold,
      paddingHorizontal: 18,
      paddingVertical: 9,
      borderRadius: r.full2,
    },
    navSignUpText: { color: palette.ink, fontWeight: "800", fontSize: ty.bodySm.fontSize },
    navThemeBtn: {
      backgroundColor: c.bgDeep,
      paddingHorizontal: 16,
      paddingVertical: 9,
      borderRadius: r.full2,
    },
    navThemeText: { color: c.textPrimary, fontWeight: "700", fontSize: ty.bodySm.fontSize },

    heroGradient: {
      paddingHorizontal: sp[24],
      paddingTop: sp[52],
      paddingBottom: sp[52],
      alignItems: "flex-start",
    },
    hero: {
      paddingHorizontal: sp[24],
      paddingTop: sp[52],
      paddingBottom: 56,
      alignItems: "flex-start",
    },
    heroBadge: {
      backgroundColor: theme.isLight ? c.bgDeep : c.bgDeep,
      borderRadius: r.full2,
      paddingHorizontal: sp[16],
      paddingVertical: 9,
      marginBottom: sp[28],
      borderWidth: 1,
      borderColor: c.border,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      alignSelf: "flex-start",
    },
    heroBadgeDot: {
      width: 7,
      height: 7,
      borderRadius: 3.5,
      backgroundColor: theme.functional.green,
    },
    heroBadgeText: {
      color: c.textSecondary,
      fontSize: ty.caption.fontSize,
      fontWeight: "700",
      letterSpacing: 0.3,
    },
    heroTitle: {
      color: c.textPrimary,
      fontSize: 46,
      fontWeight: "900",
      lineHeight: 54,
      marginBottom: 22,
      letterSpacing: -1.5,
      ...(fontDisplay ? { fontFamily: fontDisplay } : {}),
    },
    heroSub: {
      color: c.textSecondary,
      fontSize: ty.body.fontSize,
      lineHeight: 28,
      marginBottom: sp[32],
    },
    heroBtn: {
      backgroundColor: gold,
      paddingHorizontal: sp[28],
      paddingVertical: 18,
      borderRadius: r.lg,
      marginBottom: 14,
      width: "100%",
      alignItems: "center",
      shadowColor: gold,
      shadowOpacity: 0.35,
      shadowRadius: 24,
      shadowOffset: { width: 0, height: 8 },
      elevation: 8,
    },
    heroBtnText: { color: palette.ink, fontWeight: "900", fontSize: ty.body.fontSize, letterSpacing: -0.3 },
    heroSecondary: { color: c.textSecondary, fontSize: ty.bodySm.fontSize, textAlign: "center", width: "100%" },

    trialCard: {
      backgroundColor: c.bgCard,
      borderRadius: r.lg,
      padding: 22,
      marginBottom: 18,
      borderWidth: 1,
      borderColor: c.border,
    },
    trialCardLabel: { color: gold, fontSize: 15, fontWeight: "800", marginBottom: 10 },
    trialPassage: { color: c.textSecondary, fontSize: 13, lineHeight: 20, marginBottom: 14 },
    trialQuestion: { color: c.textPrimary, fontSize: 16, fontWeight: "800", marginBottom: 14, lineHeight: 22 },
    trialOption: {
      backgroundColor: c.bgDeep,
      borderRadius: r.lg,
      borderWidth: 1,
      borderColor: c.border,
      paddingVertical: 14,
      paddingHorizontal: sp[16],
      marginBottom: 10,
    },
    trialOptionSelected: { backgroundColor: "#dcfce7", borderColor: theme.functional.green },
    trialOptionText: { color: c.textPrimary, fontSize: ty.bodySm.fontSize, lineHeight: 20 },
    trialFeedback: {
      marginTop: 12,
      backgroundColor: c.bgDeep,
      borderRadius: r.lg,
      padding: 14,
      borderWidth: 1,
      borderColor: c.border,
    },
    trialFeedbackText: { fontSize: ty.bodySm.fontSize, fontWeight: "800", marginBottom: 8 },
    trialExplanation: { color: c.textSecondary, fontSize: 13, lineHeight: 20 },

    socialDivider: { flexDirection: "row", alignItems: "center", width: "100%", marginVertical: 4 },
    socialDividerLine: { flex: 1, height: 1, backgroundColor: c.border },
    socialDividerText: { color: c.textMuted, fontSize: ty.caption.fontSize, paddingHorizontal: 12 },
    socialBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderWidth: 1.5,
      borderColor: c.border,
      backgroundColor: c.bgElevated,
      paddingVertical: 13,
      borderRadius: r.lg,
    },
    socialBtnText: { color: c.textPrimary, fontWeight: "700", fontSize: 15 },
    socialBtnIcon: { fontSize: 18 },

    scoreBanner: {
      marginHorizontal: sp[20],
      marginBottom: sp[16],
      backgroundColor: c.bgCard,
      borderRadius: r.xl3,
      padding: sp[32],
      alignItems: "center",
      borderWidth: 1,
      borderColor: c.border,
      overflow: "hidden",
    },
    scoreBannerLabel: {
      color: palette.cobaltLink,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 2.5,
      marginBottom: 10,
      textTransform: "uppercase",
    },
    scoreBannerNum: { color: gold, fontSize: 72, fontWeight: "900", letterSpacing: -3, lineHeight: 76 },
    scoreBannerSub: { color: c.textSecondary, fontSize: 13, marginTop: 8, textAlign: "center", lineHeight: 20 },

    statsRow: {
      flexDirection: "row",
      marginHorizontal: sp[20],
      marginBottom: 8,
      backgroundColor: c.bgCard,
      borderRadius: r.xl,
      padding: sp[20],
      justifyContent: "space-around",
      borderWidth: 1,
      borderColor: c.border,
      gap: 4,
    },
    statBox: { alignItems: "center", flex: 1 },
    statVal: { color: gold, fontSize: 18, fontWeight: "900", letterSpacing: -0.5 },
    statLabel: {
      color: c.textMuted,
      fontSize: 10,
      marginTop: 4,
      textAlign: "center",
      fontWeight: "700",
      letterSpacing: 0.5,
      textTransform: "uppercase",
    },

    section: { paddingHorizontal: sp[24], paddingTop: sp[52], paddingBottom: 8, backgroundColor: c.bg },
    sectionLabel: {
      color: palette.cobaltLink,
      fontSize: ty.caption.fontSize,
      fontWeight: "800",
      letterSpacing: 2,
      marginBottom: 10,
    },
    sectionTitle: {
      color: c.textPrimary,
      fontSize: 30,
      fontWeight: "900",
      lineHeight: 38,
      marginBottom: sp[28],
      letterSpacing: -0.5,
    },

    featureCard: {
      backgroundColor: c.bgCard,
      borderRadius: r.lg,
      padding: 18,
      borderWidth: 1,
      borderColor: c.border,
    },
    featureTitle: { color: c.textPrimary, fontWeight: "800", fontSize: 15, marginBottom: 4 },
    featureDesc: { color: c.textSecondary, fontSize: 13, lineHeight: 20 },
    featureCardWide: {
      backgroundColor: c.bgCard,
      borderRadius: r.lg,
      padding: sp[20],
      flexDirection: "row",
      gap: sp[16],
      alignItems: "flex-start",
      borderWidth: 1,
      borderColor: c.border,
    },
    featureIconBox: { width: 48, height: 48, borderRadius: r.lg, justifyContent: "center", alignItems: "center" },
    featureIcon: { fontSize: 24 },

    bluebookCard: {
      backgroundColor: c.bgCard,
      borderRadius: r.lg,
      padding: sp[20],
      borderWidth: 1,
      borderColor: c.border,
      gap: 14,
    },
    bluebookRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
    bluebookCheck: { color: theme.functional.green, fontWeight: "800", fontSize: 16, marginTop: 1 },
    bluebookText: { color: c.textPrimary, fontSize: 15, flex: 1, lineHeight: 22 },

    domainPill: {
      backgroundColor: c.bgDeep,
      borderRadius: r.lg,
      padding: 12,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: c.border,
    },
    domainPillText: { color: c.textSecondary, fontSize: 13 },

    classCard: {
      backgroundColor: c.bgCard,
      borderRadius: r.lg,
      padding: sp[20],
      marginBottom: 14,
      borderWidth: 1,
      borderColor: c.border,
    },
    classCardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
    classCardTitle: { color: c.textPrimary, fontWeight: "800", fontSize: 16, flex: 1 },
    classCardDate: { color: c.textSecondary, fontSize: 13, marginBottom: 6 },
    classCardDesc: { color: c.textSecondary, fontSize: ty.bodySm.fontSize, lineHeight: 20, marginBottom: 8 },
    classCardDuration: { color: c.textMuted, fontSize: 13, marginBottom: 14 },
    classBookBtn: { backgroundColor: gold, padding: 13, borderRadius: r.lg, alignItems: "center" },
    classBookBtnText: { color: palette.ink, fontWeight: "800", fontSize: 15 },
    classBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: r.full2 },
    classBadgeFree: { backgroundColor: "#14532d" },
    classBadgePaid: { backgroundColor: "#1e3a5f" },
    classBadgeText: { color: palette.snow, fontWeight: "700", fontSize: ty.caption.fontSize },

    emptyClasses: {
      backgroundColor: c.bgCard,
      borderRadius: r.lg,
      padding: sp[28],
      alignItems: "center",
      marginBottom: 14,
      borderWidth: 1,
      borderColor: c.border,
    },
    emptyClassesText: { color: c.textPrimary, fontWeight: "800", fontSize: 16, marginBottom: 8 },

    testimonialCard: {
      backgroundColor: c.bgCard,
      borderRadius: r.lg,
      padding: sp[20],
      marginBottom: 14,
      borderWidth: 1,
      borderColor: c.border,
    },
    testimonialQuote: {
      color: c.textPrimary,
      fontSize: 15,
      lineHeight: 26,
      marginBottom: sp[16],
      fontStyle: "italic",
    },
    testimonialFooter: { flexDirection: "row", alignItems: "center", gap: 12 },
    testimonialAvatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: c.bgDeep,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1.5,
      borderColor: gold + "40",
    },
    testimonialName: { color: gold, fontWeight: "700", fontSize: ty.bodySm.fontSize },
    testimonialScore: { color: c.textSecondary, fontSize: 13, marginTop: 2 },

    faqCard: {
      backgroundColor: c.bgCard,
      borderRadius: r.lg,
      padding: 18,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: c.border,
    },
    faqQ: { color: c.textPrimary, fontWeight: "700", fontSize: 15, marginBottom: 8 },
    faqA: { color: c.textSecondary, fontSize: ty.bodySm.fontSize, lineHeight: 22 },

    ctaBanner: {
      margin: sp[20],
      backgroundColor: c.bgCard,
      borderRadius: r.xl3,
      padding: sp[32],
      alignItems: "center",
      borderWidth: 1,
      borderColor: c.border,
    },
    ctaTitle: {
      color: c.textPrimary,
      fontSize: ty.headingSm.fontSize,
      fontWeight: "900",
      marginBottom: 10,
      textAlign: "center",
      lineHeight: 34,
      letterSpacing: -0.5,
    },
    ctaSub: { color: c.textSecondary, fontSize: 15, marginBottom: sp[24], textAlign: "center" },
    ctaBtn: {
      backgroundColor: gold,
      paddingHorizontal: sp[28],
      paddingVertical: sp[16],
      borderRadius: r.lg,
      width: "100%",
      alignItems: "center",
      marginBottom: 4,
    },
    ctaBtnText: { color: palette.ink, fontWeight: "800", fontSize: ty.body.fontSize },

    footer: {
      paddingHorizontal: sp[24],
      paddingTop: sp[32],
      paddingBottom: sp[24],
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: c.border,
      gap: 6,
    },
    footerLogo: { color: gold, fontSize: ty.subheading.fontSize, fontWeight: "800" },
    footerTagline: { color: c.textSecondary, fontSize: 13 },
    footerInsta: { color: gold, fontSize: ty.bodySm.fontSize, fontWeight: "600", marginTop: 6, marginBottom: 6 },
    footerCopy: { color: c.textMuted, fontSize: ty.caption.fontSize },
  });
}

/** Bluebook quiz UI — always light/authentic test styling */
export function makeBbStyles() {
  const snow = palette.snow;
  const fog = palette.fog;
  const mist = palette.silverMist;
  const ink = palette.ink;
  const slate = palette.slate;
  const graphite = palette.graphite;
  const link = palette.cobaltLink;

  return StyleSheet.create({
    screen: { flex: 1, backgroundColor: snow },
    header: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: snow,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: mist,
      gap: 8,
    },
    headerBackBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: fog,
      justifyContent: "center",
      alignItems: "center",
    },
    headerBackText: { color: slate, fontSize: 16, fontWeight: "700" },
    headerMeta: { flex: 1 },
    headerSection: { color: ink, fontSize: 14, fontWeight: "700" },
    headerModuleLabel: { color: graphite, fontSize: 11, marginTop: 1 },
    headerTimerWrap: { backgroundColor: fog, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
    timerText: {
      color: "#1e3a5f",
      fontSize: 16,
      fontWeight: "800",
      fontVariant: ["tabular-nums"],
      letterSpacing: 1,
    },
    headerRight: { alignItems: "flex-end" },
    headerQCount: { color: graphite, fontSize: 13, fontWeight: "600" },
    progressTrack: { height: 3, backgroundColor: mist },
    progressFill: { height: 3, backgroundColor: link, borderRadius: 2 },
    toolbar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 10,
      backgroundColor: fog,
      borderBottomWidth: 1,
      borderBottomColor: mist,
    },
    toolbarLeft: { flexDirection: "row", alignItems: "center", gap: 14 },
    toolbarQNum: { color: ink, fontSize: 14, fontWeight: "700" },
    toolbarFlagBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: mist,
      backgroundColor: snow,
    },
    toolbarFlagBtnActive: { borderColor: link, backgroundColor: "#eff6ff" },
    toolbarFlagIcon: { fontSize: 13 },
    toolbarFlagText: { color: slate, fontSize: 12, fontWeight: "600" },
    eliminatorBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: mist,
      backgroundColor: snow,
    },
    eliminatorBtnOn: { borderColor: link, backgroundColor: "#eff6ff" },
    eliminatorText: { color: slate, fontSize: 14, fontWeight: "800" },
    eliminatorLabel: { color: slate, fontSize: 11, fontWeight: "600" },
    content: { flex: 1, backgroundColor: snow },
    contentInner: { padding: 20, paddingBottom: 40 },
    domainChip: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 14 },
    domainChipText: {
      color: graphite,
      fontSize: 12,
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    domainDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: slate },
    questionBox: { marginBottom: 20 },
    questionText: { fontSize: 17, color: ink, lineHeight: 30, fontWeight: "400", letterSpacing: 0.1 },
    contentDivider: { height: 1, backgroundColor: mist, marginBottom: 18 },
    choicesLabel: {
      fontSize: 13,
      color: graphite,
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginBottom: 14,
    },
    choiceRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      padding: 14,
      marginBottom: 10,
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: mist,
      backgroundColor: snow,
      gap: 14,
      minHeight: 52,
    },
    choiceRowSelected: { borderColor: link, backgroundColor: "#eff6ff" },
    choiceRowStruck: { borderColor: mist, backgroundColor: fog, opacity: 0.55 },
    choiceBubble: {
      width: 34,
      height: 34,
      borderRadius: 17,
      borderWidth: 2,
      borderColor: slate,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: snow,
      marginTop: 1,
      flexShrink: 0,
    },
    choiceBubbleSelected: { backgroundColor: link, borderColor: link },
    choiceBubbleStruck: { borderColor: mist, backgroundColor: fog },
    choiceLetter: { fontSize: 14, fontWeight: "700", color: slate },
    choiceLetterSelected: { color: snow },
    choiceLetterStruck: { color: graphite },
    choiceText: { flex: 1, fontSize: 15, color: ink, lineHeight: 24, paddingTop: 5 },
    choiceTextSelected: { color: link, fontWeight: "600" },
    choiceTextStruck: { color: graphite, textDecorationLine: "line-through" },
    strikeBtn: {
      width: 28,
      height: 28,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: mist,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 3,
      flexShrink: 0,
    },
    strikeBtnText: { color: graphite, fontSize: 14, fontWeight: "700" },
    eliminatorHint: {
      backgroundColor: "#eff6ff",
      borderRadius: 8,
      padding: 12,
      marginTop: 6,
      borderWidth: 1,
      borderColor: "#bfdbfe",
    },
    eliminatorHintText: { color: link, fontSize: 13, lineHeight: 20 },
    bottomNav: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: snow,
      borderTopWidth: 1,
      borderTopColor: mist,
      gap: 10,
    },
    navBtn: { flex: 1, paddingVertical: 13, borderRadius: 8, alignItems: "center", justifyContent: "center" },
    navBtnOutline: { borderWidth: 1.5, borderColor: mist, backgroundColor: snow },
    navBtnOutlineText: { color: slate, fontWeight: "700", fontSize: 15 },
    navBtnPrimary: { backgroundColor: "#1e3a5f" },
    navBtnFinish: { backgroundColor: "#16a34a" },
    navBtnPrimaryText: { color: snow, fontWeight: "700", fontSize: 15 },
    navPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 22,
      backgroundColor: fog,
      borderWidth: 1,
      borderColor: mist,
    },
    navPillText: { color: "#1e3a5f", fontWeight: "700", fontSize: 14 },
    navPillCaret: { color: graphite, fontSize: 11, marginTop: 1 },
    modalOverlay: { flex: 1, backgroundColor: "rgba(15,23,42,0.4)", justifyContent: "flex-end" },
    modalBox: {
      backgroundColor: snow,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 24,
      paddingBottom: 36,
    },
    modalHandle: {
      width: 36,
      height: 4,
      borderRadius: 2,
      backgroundColor: mist,
      alignSelf: "center",
      marginBottom: 18,
    },
    modalTitle: { fontSize: 18, fontWeight: "700", color: ink, marginBottom: 20, textAlign: "center" },
    navigatorGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "center", paddingBottom: 8 },
    navCircle: {
      width: 42,
      height: 42,
      borderRadius: 21,
      borderWidth: 1.5,
      borderColor: slate,
      backgroundColor: fog,
      justifyContent: "center",
      alignItems: "center",
    },
    navCircleAnswered: { backgroundColor: link, borderColor: link },
    navCircleCurrent: { backgroundColor: "#1e3a5f", borderColor: "#1e3a5f" },
    navCircleFlagged: { backgroundColor: "#eff6ff", borderColor: link, borderWidth: 2 },
    navCircleText: { fontWeight: "700", fontSize: 14, color: slate },
    navFlagDot: {
      position: "absolute",
      top: 2,
      right: 2,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: link,
      borderWidth: 1.5,
      borderColor: snow,
    },
    navigatorLegend: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap", gap: 16, marginTop: 18, marginBottom: 12 },
    legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
    legendDot: { width: 14, height: 14, borderRadius: 7 },
    legendText: { fontSize: 12, color: graphite, fontWeight: "500" },
    navigatorSummary: {
      backgroundColor: fog,
      borderRadius: 8,
      padding: 10,
      marginBottom: 16,
      alignItems: "center",
    },
    navigatorSummaryText: { color: slate, fontSize: 13, fontWeight: "600" },
    modalBtns: { flexDirection: "row", gap: 10 },
    modalClose: { flex: 1, backgroundColor: "#1e3a5f", padding: 14, borderRadius: 10, alignItems: "center" },
    modalCloseText: { color: snow, fontWeight: "700", fontSize: 16 },
    scoreScreen: { flex: 1, backgroundColor: snow, padding: 28, justifyContent: "center", alignItems: "center" },
    scoreTitleRow: { marginBottom: 28 },
    scoreTitleText: { color: ink, fontSize: 24, fontWeight: "800", textAlign: "center" },
    scoreBadge: {
      width: "100%",
      borderRadius: 20,
      padding: 28,
      alignItems: "center",
      borderWidth: 1,
      marginBottom: 24,
    },
    scoreBig: { fontSize: 64, fontWeight: "800", letterSpacing: -2, lineHeight: 68 },
    scorePercent: { fontSize: 28, fontWeight: "600", marginTop: 4 },
    scoreTime: { fontSize: 16, color: graphite, marginTop: 6 },
    scorePill: { marginTop: 14, paddingHorizontal: 18, paddingVertical: 6, borderRadius: 20 },
    scorePillText: { color: snow, fontWeight: "700", fontSize: 15 },
    scoreMetaRow: {
      flexDirection: "row",
      width: "100%",
      backgroundColor: fog,
      borderRadius: 14,
      padding: 16,
      marginBottom: 28,
      borderWidth: 1,
      borderColor: mist,
    },
    scoreMetaItem: { flex: 1, alignItems: "center" },
    scoreMetaVal: { color: ink, fontSize: 26, fontWeight: "800" },
    scoreMetaLabel: { color: graphite, fontSize: 12, marginTop: 3 },
    scoreMetaDivider: { width: 1, backgroundColor: mist, marginVertical: 4 },
    primaryBtn: {
      backgroundColor: "#1e3a5f",
      padding: 16,
      borderRadius: 10,
      alignItems: "center",
      width: "100%",
      marginBottom: 10,
    },
    primaryBtnText: { color: snow, fontWeight: "700", fontSize: 16 },
    secondaryBtn: {
      backgroundColor: fog,
      padding: 16,
      borderRadius: 10,
      alignItems: "center",
      width: "100%",
      borderWidth: 1,
      borderColor: mist,
    },
    secondaryBtnText: { color: ink, fontWeight: "700", fontSize: 16 },
  });
}

/** Focused study surfaces: the same identity as Home, without decorative chrome. */
export function makeStudyStyles(isLight: boolean) {
  const t = ascentTheme(isLight);
  return StyleSheet.create({
    screen: { flex: 1, backgroundColor: t.background },
    scroll: { flex: 1 },
    content: { width: "100%", maxWidth: 1080, alignSelf: "center", padding: 24, paddingBottom: 110, gap: 24 },
    title: { color: t.ink, fontSize: 30, lineHeight: 38, fontWeight: "700", fontFamily: fonts.studyDisplay },
    sectionTitle: { color: t.ink, fontSize: 19, lineHeight: 26, fontWeight: "700" },
    body: { color: t.muted, fontSize: 15, lineHeight: 23 },
    small: { color: t.muted, fontSize: 13, lineHeight: 19 },
    label: { color: t.text, fontSize: 14, lineHeight: 20, fontWeight: "600", marginBottom: 10 },
    panel: { backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, borderRadius: 12, padding: 22 },
    divider: { height: 1, backgroundColor: t.border },
    primary: { backgroundColor: t.terracotta, paddingVertical: 14, paddingHorizontal: 22, minHeight: 48, borderRadius: 9, alignItems: "center", justifyContent: "center" },
    primaryText: { color: t.onAccent, fontWeight: "700", fontSize: 15, lineHeight: 21 },
    secondary: { borderWidth: 1, borderColor: t.border, backgroundColor: t.surface, paddingVertical: 13, paddingHorizontal: 18, minHeight: 46, borderRadius: 9, alignItems: "center", justifyContent: "center" },
    secondaryText: { color: t.text, fontWeight: "600", fontSize: 14, lineHeight: 20 },
    option: { borderWidth: 1, borderColor: t.border, borderRadius: 9, paddingHorizontal: 16, paddingVertical: 13, minHeight: 46, backgroundColor: t.surface, flexDirection: "row", alignItems: "center", gap: 9 },
    selected: { borderColor: t.forest, backgroundColor: t.soft },
    optionText: { color: t.text, fontWeight: "600", fontSize: 14, lineHeight: 20 },
    input: { color: t.text, backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, borderRadius: 9, paddingHorizontal: 14, paddingVertical: 12, minHeight: 48, fontSize: 16 },
    link: { color: t.terracotta, fontSize: 14, lineHeight: 21, fontWeight: "600" },
  });
}

/** Apply the study palette to practice; full exams keep their original shell. */
export function makePracticeShellStyles(base: any, isLight: boolean, desktop = true) {
  const t = ascentTheme(isLight);
  const s: any = { ...base };
  const colorMap: Record<string,string> = {
    '#fff': t.surface, '#ffffff': t.surface, '#111': t.text, '#000': t.ink,
    '#333': t.text, '#374151': t.muted, '#555': t.muted, '#666': t.muted,
    '#444': t.muted, '#64748b': t.muted, '#1d4ed8': t.forest,
    '#1e3a5f': t.forest, '#324c9e': t.terracotta, '#5b7fb5': t.forest,
    '#eff6ff': t.soft, '#f3f4f6': t.soft, '#b8bcc4': t.border,
    '#d1d5db': t.border, '#9ca3af': t.border, '#999': t.border,
  };
  Object.keys(base).forEach(key => {
    const flat: any = StyleSheet.flatten(base[key]);
    const next: any = { ...flat };
    ['color','backgroundColor','borderColor','borderBottomColor','borderTopColor'].forEach(prop => {
      if (colorMap[next[prop]]) next[prop] = colorMap[next[prop]];
    });
    s[key] = next;
  });
  s.tmRoot = { ...s.tmRoot, backgroundColor:t.background };
  s.tmQuestionInner = { ...s.tmQuestionInner, paddingHorizontal:20, width:'100%', maxWidth:900, alignSelf:'center' };
  s.tmQuestionInnerMath = { ...s.tmQuestionInnerMath, paddingHorizontal:24 };
  s.qToolbarMath = { ...s.qToolbarMath, marginHorizontal:0, paddingHorizontal:0, backgroundColor:t.surface };
  s.tmChoiceRow = { ...s.tmChoiceRow, borderRadius:9, borderWidth:1, paddingHorizontal:16 };
  s.tmChoiceSelected = { borderWidth:2, borderColor:t.forest, backgroundColor:t.soft };
  s.choiceBubbleSelected = { ...s.choiceBubbleSelected, backgroundColor:t.forest, borderColor:t.forest };
  s.choiceLetterSelected = { ...s.choiceLetterSelected, color:t.onAccent };
  s.tmFooter = { ...s.tmFooter, borderStyle:'solid', paddingHorizontal:16, gap:12 };
  s.tmFooterCenter = { ...s.tmFooterCenter, alignItems:'flex-start', flex:1 };
  s.tmFooterRight = { ...s.tmFooterRight, width:undefined, minWidth:0, gap:8 };
  s.tmNavPillBlack = { ...s.tmNavPillBlack, backgroundColor:t.surface, borderRadius:6, paddingHorizontal:0 };
  s.tmNavPillBlackText = { ...s.tmNavPillBlackText, color:t.text, fontSize:12 };
  s.tmNavPillCaret = { ...s.tmNavPillCaret, color:t.muted };
  s.tmProgressSegments = { ...s.tmProgressSegments, maxWidth:140 };
  ['tmBtnBack','tmBtnNext','tmReviewSubmitBtn'].forEach(key => { s[key] = {...s[key],borderRadius:8,minWidth:66,paddingHorizontal:16}; });
  s.tmBtnText = { ...s.tmBtnText, color:t.onAccent };
  s.tmReviewSubmitText = { ...s.tmReviewSubmitText, color:t.onAccent };
  s.qNumSquareText = { ...s.qNumSquareText, color:t.onAccent };
  s.tmRoot = {...s.tmRoot,backgroundColor:t.background};
  s.examHeader = {backgroundColor:t.surface,borderBottomWidth:1,borderColor:t.border,paddingHorizontal:desktop?32:14,paddingTop:desktop?14:10,paddingBottom:desktop?14:8,flexDirection:desktop?'row':'column',alignItems:desktop?'center':'stretch',gap:desktop?20:0};
  s.examTopLine = {flexDirection:'row',alignItems:'center',gap:desktop?16:10,flex:desktop?1:undefined};
  s.exitTarget = {width:44,height:44,alignItems:'center',justifyContent:'center',borderRadius:8};
  s.examTitle = {fontSize:desktop?18:15,lineHeight:desktop?25:21,color:t.ink,fontWeight:'700'};
  s.examMeta = {fontSize:12,lineHeight:18,color:t.muted,marginTop:3};
  s.examClock = {flexDirection:'row',alignItems:'center',gap:8,paddingHorizontal:12,paddingVertical:8,minWidth:desktop?120:96,borderRadius:8,borderWidth:1,borderColor:t.border};
  s.examClockValue = {color:t.ink,fontSize:desktop?21:17,lineHeight:25,fontWeight:'600',fontVariant:['tabular-nums']};
  s.examClockLabel = {color:t.muted,fontSize:10,lineHeight:15};
  s.examTools = {flexDirection:'row',alignItems:'center',justifyContent:desktop?'flex-end':'flex-start',flexWrap:'wrap',gap:desktop?14:4,paddingTop:4};
  s.readerTool = {minHeight:40,paddingHorizontal:10,paddingVertical:8,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:7,borderRadius:6};
  s.readerToolText = {fontSize:12,lineHeight:18,fontWeight:'600',color:t.muted};
  s.examProgress = {height:3,backgroundColor:t.border};
  s.tmBody = {...s.tmBody,backgroundColor:t.background,paddingHorizontal:desktop?32:0,paddingVertical:desktop?28:0};
  s.tmContentRow = {...s.tmContentRow,width:'100%',maxWidth:1320,alignSelf:'center',backgroundColor:t.surface,borderWidth:desktop?1:0,borderColor:t.border,borderRadius:desktop?12:0,overflow:'hidden'};
  s.tmQuestionPane = {...s.tmQuestionPane,backgroundColor:t.surface};
  s.tmQuestionInner = {...s.tmQuestionInner,width:'100%',maxWidth:820,paddingHorizontal:desktop?36:20,alignSelf:'center'};
  s.tmQuestionInnerMath = {...s.tmQuestionInnerMath,maxWidth:820,paddingHorizontal:desktop?36:20};
  s.tmQuestionInner = {...s.tmQuestionInner,paddingTop:0};
  s.tmPassagePane = {...s.tmPassagePane,backgroundColor:t.surface};
  s.tmPassageInner = {...s.tmPassageInner,paddingHorizontal:32,paddingVertical:30,paddingBottom:50};
  s.passageText = {...s.passageText,color:t.text,fontSize:17,lineHeight:30};
  s.tmSplitDivider = {...s.tmSplitDivider,backgroundColor:t.border};
  s.tmSplitHandle = {...s.tmSplitHandle,backgroundColor:t.surface,borderColor:t.border};
  s.qToolbar = {flexDirection:'row',alignItems:'center',gap:4,paddingVertical:14,borderBottomWidth:1,borderColor:t.border};
  s.questionEyebrow = {fontSize:13,lineHeight:18,color:t.ink,fontWeight:'700'};
  s.questionSkill = {fontSize:11,lineHeight:16,color:t.muted};
  s.tmQuestionScrollInner = {...s.tmQuestionScrollInner,paddingTop:8,paddingBottom:36};
  s.tmQuestionText = {...s.tmQuestionText,color:t.text,fontSize:19,lineHeight:31};
  s.tmChoicesWrap = {...s.tmChoicesWrap,maxWidth:undefined,width:'100%',marginTop:28};
  s.tmChoiceRow = {flexDirection:'row',alignItems:'stretch',borderWidth:1,borderColor:t.border,borderRadius:9,backgroundColor:t.surface,marginBottom:12,overflow:'hidden',minHeight:62};
  s.answerTarget = {flex:1,minWidth:0,flexDirection:'row',alignItems:'center',gap:14,paddingHorizontal:16,paddingVertical:15,minHeight:62};
  s.eliminateTarget = {width:44,alignItems:'center',justifyContent:'center',borderLeftWidth:1,borderColor:t.border};
  s.choiceBubble = {height:28,width:28,borderRadius:6,borderWidth:1,borderColor:t.border,alignItems:'center',justifyContent:'center',flexShrink:0};
  s.choiceLetter = {fontSize:13,color:t.muted,fontWeight:'600'};
  s.choiceBubbleSelected = {...s.choiceBubbleSelected,borderColor:t.forest,backgroundColor:t.forest};
  s.choiceLetterSelected = {color:t.onAccent};
  s.tmChoiceSelected = {borderWidth:2,borderColor:t.forest,backgroundColor:t.soft};
  s.tmChoiceText = {color:t.text,fontSize:16,lineHeight:25};
  s.choiceTextStruck = {...s.choiceTextStruck,color:t.muted,textDecorationLine:'line-through'};
  s.choiceRowStruck = {...s.choiceRowStruck,opacity:0.65};
  s.examFooter = {backgroundColor:t.surface,borderTopWidth:1,borderColor:t.border,paddingHorizontal:desktop?32:16,paddingVertical:12,flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:12};
  s.questionMapTarget = {minHeight:44,flexDirection:'row',alignItems:'center',gap:10};
  s.questionMapText = {fontSize:13,lineHeight:18,fontWeight:'700',color:t.text};
  s.questionMapHint = {fontSize:11,lineHeight:16,color:t.muted};
  s.footerBack = {minHeight:46,minWidth:44,borderWidth:1,borderColor:t.border,borderRadius:8,paddingHorizontal:14,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:9};
  s.footerBackText = {color:t.text,fontWeight:'600',fontSize:14};
  s.footerNext = {minHeight:46,borderRadius:8,paddingHorizontal:desktop?24:16,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:10,backgroundColor:t.terracotta};
  s.footerNextText = {color:t.onAccent,fontSize:14,fontWeight:'700'};
  s.questionMapContent = {width:'100%',maxWidth:900,alignSelf:'center',padding:desktop?32:20,paddingBottom:50,gap:12};
  s.mapTitle = {color:t.ink,fontSize:desktop?30:26,lineHeight:36,fontFamily:fonts.studyDisplay,fontWeight:'700'};
  s.mapDescription = {fontSize:14,lineHeight:23,color:t.muted,marginTop:5};
  s.mapCell = {width:58,height:64,borderWidth:1,borderColor:t.border,borderRadius:8,alignItems:'center',justifyContent:'center',gap:6,backgroundColor:t.surface};
  s.tmReviewSubmitBtn = {backgroundColor:t.terracotta,borderRadius:8,paddingHorizontal:24,paddingVertical:15,minHeight:48,alignItems:'center',justifyContent:'center'};
  s.tmReviewSubmitText = {color:t.onAccent,fontWeight:'700',fontSize:15};
  s.tmModalCard = {...s.tmModalCard,backgroundColor:t.surface,borderColor:t.border,borderRadius:12};
  s.tmModalTitle = {...s.tmModalTitle,color:t.ink};
  s.tmModalBody = {...s.tmModalBody,color:t.text,lineHeight:25};
  s.tmMoreMenu = {...s.tmMoreMenu,backgroundColor:t.surface,borderColor:t.border};
  s.tmMoreItemText = {...s.tmMoreItemText,color:t.text};
  return s;
}

/** Neutral exam workspace follows testing conventions, separate from study UI. */
export function makeExamSimulationStyles(base: any, desktop = true, act = false) {
  const s: any = makePracticeShellStyles(base, true, desktop);
  const ink = '#1b1d20', blue = act ? '#0069a6' : '#2454b8', edge = '#c7cbd1';
  s.tmRoot = {...s.tmRoot,backgroundColor:'#fff'};
  s.examHeader = {...s.examHeader,paddingVertical:12,backgroundColor:'#fff',borderColor:edge};
  s.examTitle = {...s.examTitle,color:ink,fontSize:desktop?19:15,fontFamily:undefined};
  s.examMeta = {...s.examMeta,color:'#555b62',fontSize:12};
  s.examClock = {...s.examClock,borderWidth:0,paddingHorizontal:16,alignItems:'center'};
  s.examClockValue = {...s.examClockValue,color:ink,fontSize:21};
  s.examClockLabel = {...s.examClockLabel,color:'#555b62'};
  s.readerToolText = {...s.readerToolText,color:ink};
  s.tmBody = {...s.tmBody,paddingHorizontal:0,paddingVertical:0,backgroundColor:'#fff'};
  s.tmContentRow = {...s.tmContentRow,maxWidth:undefined,borderRadius:0,borderWidth:0,backgroundColor:'#fff'};
  s.tmQuestionPane = {...s.tmQuestionPane,backgroundColor:'#fff'};
  s.tmQuestionInner = {...s.tmQuestionInner,maxWidth:900,paddingHorizontal:desktop?44:20};
  s.tmQuestionInnerMath = {...s.tmQuestionInnerMath,maxWidth:860};
  s.tmQuestionScrollInner = {...s.tmQuestionScrollInner,paddingTop:28};
  s.tmPassageInner = {...s.tmPassageInner,paddingHorizontal:desktop?42:20,paddingTop:30};
  s.tmSplitDivider = {...s.tmSplitDivider,width:1,backgroundColor:edge};
  s.tmSplitHandle = {...s.tmSplitHandle,backgroundColor:'#fff',borderColor:edge};
  s.passageText = {...s.passageText,color:ink,fontSize:18,lineHeight:30,fontFamily:act?undefined:'Georgia'};
  s.tmQuestionText = {...s.tmQuestionText,color:ink,fontSize:18,lineHeight:30,fontFamily:act?undefined:'Georgia'};
  s.qToolbar = {...s.qToolbar,borderBottomColor:edge,gap:10};
  s.questionEyebrow = {backgroundColor:ink,color:'#fff',fontWeight:'700',fontSize:15,minWidth:32,height:32,textAlign:'center',lineHeight:32};
  s.choiceBubble = {...s.choiceBubble,borderRadius:14,borderColor:'#424850',backgroundColor:'#fff'};
  s.choiceBubbleSelected = {...s.choiceBubble,borderRadius:14,backgroundColor:blue,borderColor:blue};
  s.choiceLetter = {...s.choiceLetter,color:ink};
  s.choiceLetterSelected = {...s.choiceLetterSelected,color:'#fff'};
  s.tmChoiceRow = {...s.tmChoiceRow,borderColor:'#5a6068',borderRadius:8,backgroundColor:'#fff'};
  s.tmChoiceSelected = {...s.tmChoiceSelected,borderColor:blue,backgroundColor:'#f0f5ff'};
  s.tmChoiceText = {...s.tmChoiceText,color:ink,fontSize:17,lineHeight:27};
  s.eliminateTarget = {...s.eliminateTarget,borderColor:edge};
  s.examFooter = {...s.examFooter,backgroundColor:'#fafbfc',borderColor:edge};
  s.questionMapTarget = {...s.questionMapTarget,backgroundColor:ink,borderRadius:8,paddingHorizontal:14,paddingVertical:7};
  s.questionMapText = {...s.questionMapText,color:'#fff'};
  s.questionMapHint = {...s.questionMapHint,color:'#dce0e5'};
  s.footerBack = {...s.footerBack,borderColor:blue,borderRadius:act?5:24};
  s.footerBackText = {...s.footerBackText,color:blue};
  s.footerNext = {...s.footerNext,backgroundColor:blue,borderRadius:act?5:24};
  s.footerNextText = {...s.footerNextText,color:'#fff'};
  s.mapTitle = {...s.mapTitle,color:ink,fontFamily:undefined,fontSize:27};
  s.mapDescription = {...s.mapDescription,color:'#555b62'};
  s.mapCell = {...s.mapCell,borderColor:edge,backgroundColor:'#fff'};
  s.tmReviewSubmitBtn = {...s.tmReviewSubmitBtn,backgroundColor:blue};
  return s;
}

/** Shared teaching activities use the same controls as the study reader. */
export function makeLessonActivityStyles(isLight: boolean) {
  const t=ascentTheme(isLight),study=makeStudyStyles(isLight);
  return StyleSheet.create({
    panel:{borderTopWidth:1,borderBottomWidth:1,borderColor:t.border,paddingVertical:22,marginVertical:18,gap:14},
    title:{color:t.ink,fontSize:18,lineHeight:26,fontWeight:"700",marginBottom:12},
    body:{color:t.text,fontSize:15,lineHeight:26,marginBottom:10},
    prompt:{color:t.text,fontSize:16,lineHeight:27,fontWeight:"600",marginBottom:16},
    note:{color:t.muted,fontSize:12,lineHeight:20,marginTop:10},
    progress:{color:t.muted,fontSize:13,lineHeight:20,fontWeight:"600",marginVertical:12},
    option:{flexDirection:"row",gap:12,borderWidth:1,borderColor:t.border,borderRadius:9,padding:13,minHeight:48,marginBottom:10,alignItems:"flex-start",backgroundColor:t.surface},
    optionLabel:{color:t.muted,fontSize:14,lineHeight:24,fontWeight:"700",minWidth:22},
    choiceText:{flex:1,minWidth:0},selected:{borderColor:t.forest,backgroundColor:t.soft},correct:{borderColor:t.forest,borderWidth:2},
    incorrect:{borderColor:t.incorrectBorder,backgroundColor:t.incorrectSurface},
    incorrectFeedback:{backgroundColor:t.incorrectSurface,borderColor:t.incorrectBorder,padding:14,borderRadius:9,borderWidth:1},
    actions:{flexDirection:"row",flexWrap:"wrap",gap:10,marginVertical:12},
    primary:study.primary,primaryText:study.primaryText,secondary:study.secondary,secondaryText:study.secondaryText,
    disabled:{opacity:0.5},feedback:{padding:14,backgroundColor:t.soft,borderRadius:9,marginTop:14,gap:8},
    feedbackTitle:{color:t.text,fontSize:14,lineHeight:22,fontWeight:"700"},success:{color:t.forest,fontSize:14,lineHeight:22,fontWeight:"700"},
    hint:{color:t.muted,fontSize:14,lineHeight:24,marginTop:10},summary:{backgroundColor:t.soft,borderRadius:9,padding:14,marginTop:10},
    sequenceRow:{flexDirection:"row",gap:10,alignItems:"center",paddingVertical:12,borderBottomWidth:1,borderColor:t.border,marginBottom:10},
  });
}

export function makeLessonVisualStyles(isLight: boolean) {
  const t = ascentTheme(isLight);
  return StyleSheet.create({
    section: { marginVertical: 6, paddingVertical: 4 },
    title: { color: t.ink, fontSize: 18, lineHeight: 27, fontWeight: "700", marginBottom: 10 },
    body: { color: t.text, fontSize: 15, lineHeight: 26 },
    controls: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 18 },
    control: { minHeight: 44, paddingHorizontal: 13, paddingVertical: 10, borderRadius: 8, borderWidth: 2, borderColor: t.border, backgroundColor: t.surface, justifyContent: "center" },
    controlText: { color: t.text, fontSize: 14, lineHeight: 21, fontWeight: "500" },
    selected: { backgroundColor: t.soft, borderColor: t.forest },
    selectedText: { color: t.forest, fontWeight: "700" },
    viewCount: { color: t.muted, fontSize: 12, lineHeight: 20, marginTop: 10 },
    figureTitle: { color: t.ink, fontSize: 14, lineHeight: 23, fontWeight: "700", marginBottom: 14 },
    flow: { marginVertical: 18 },
    flowStep: { flexDirection: "row", alignItems: "flex-start", gap: 14, paddingVertical: 8 },
    stepNumber: { color: t.forest, backgroundColor: t.soft, overflow: "hidden", borderRadius: 16, textAlign: "center", width: 32, height: 32, lineHeight: 32, fontSize: 14, fontWeight: "700" },
    stepCopy: { flex: 1, minWidth: 0 },
    stepTitle: { color: t.ink, fontWeight: "700", fontSize: 15, lineHeight: 25, marginBottom: 4 },
    connector: { color: t.muted, fontSize: 18, lineHeight: 26, width: 32, textAlign: "center" },
    note: { color: t.muted, fontSize: 12, lineHeight: 20, marginTop: 12 },
    explainButton: { minHeight: 44, paddingVertical: 12, alignSelf: "flex-start", justifyContent: "center" },
    explainText: { color: t.forest, fontWeight: "700", fontSize: 14, lineHeight: 22, textDecorationLine: "underline" },
    explanation: { backgroundColor: t.soft, padding: 16, borderRadius: 9, marginTop: 8 },
    takeaway: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderColor: t.border },
  });
}

export function makeLessonSortStyles(isLight: boolean) {
  const t = ascentTheme(isLight), study = makeStudyStyles(isLight);
  return StyleSheet.create({
    section: { marginVertical: 6, paddingVertical: 4 },
    title: { color: t.ink, fontSize: 18, lineHeight: 27, fontWeight: "700", marginBottom: 10 },
    body: { color: t.text, fontSize: 15, lineHeight: 25 },
    note: { color: t.muted, fontSize: 12, lineHeight: 20, marginVertical: 10 },
    zones: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 12 },
    zone: { flexGrow: 1, flexBasis: 230, minWidth: 0, minHeight: 100, padding: 14, borderWidth: 2, borderColor: t.border, borderStyle: "dashed", borderRadius: 10, backgroundColor: t.soft },
    bucketTitle: { color: t.ink, fontSize: 15, lineHeight: 24, fontWeight: "700", marginBottom: 8 },
    empty: { color: t.muted, fontSize: 13, lineHeight: 22, paddingVertical: 8 },
    card: { backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, borderRadius: 9, padding: 12, marginVertical: 6 },
    dragging: { zIndex: 2, borderColor: t.forest, backgroundColor: t.soft },
    cardHeading: { flexDirection: "row", alignItems: "center", gap: 10 },
    cardCopy: { flex: 1, minWidth: 0 },
    handle: { width: 44, height: 44, justifyContent: "center", alignItems: "center", ...(Platform.OS === "web" ? { cursor: "grab", touchAction: "none", userSelect: "none" } as any : {}) },
    handleText: { color: t.forest, fontSize: 28, lineHeight: 36 },
    groupButtons: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 8 },
    groupButton: { minHeight: 44, paddingHorizontal: 10, paddingVertical: 9, borderRadius: 7, borderWidth: 1, borderColor: t.border, justifyContent: "center" },
    groupButtonText: { color: t.forest, fontSize: 13, lineHeight: 21, fontWeight: "600" },
    placed: { padding: 10, backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, borderRadius: 7, marginTop: 8 },
    correct: { borderColor: t.forest },
    incorrect: { borderColor: t.incorrectBorder, backgroundColor: t.incorrectSurface },
    correctLabel: { color: t.forest, fontSize: 13, lineHeight: 22, fontWeight: "700", marginTop: 6 },
    incorrectLabel: { color: t.incorrectText, fontSize: 13, lineHeight: 22, fontWeight: "700", marginTop: 6 },
    progress: { color: t.muted, fontSize: 13, lineHeight: 22, marginTop: 16, marginBottom: 6 },
    actions: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginVertical: 14 },
    primary: study.primary, primaryText: study.primaryText, secondary: study.secondary, secondaryText: study.secondaryText,
    disabled: { opacity: 0.5 },
    feedback: { backgroundColor: t.soft, borderRadius: 9, padding: 14, gap: 8, borderWidth: 1, borderColor: t.border, marginVertical: 12 },
  });
}

export function makeOlliePerchStyles(isLight: boolean, height: number, seat: number) {
  const t = ascentTheme(isLight);
  return StyleSheet.create({
    rail: { position: "relative", height: height + 2, width: "100%", marginTop: 0, marginBottom: 8 },
    edge: { position: "absolute", top: seat, left: 0, right: 0, height: 1, backgroundColor: t.border },
    penguin: { position: "absolute", right: 14, top: 0 },
    motionBadge: { position: "absolute", top: 25, right: 0, width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: t.border, backgroundColor: t.surface, justifyContent: "center", alignItems: "center" },
    motionText: { color: t.muted, fontSize: 10, lineHeight: 16, fontWeight: "700" },
  });
}
