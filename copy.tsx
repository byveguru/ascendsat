// @ts-nocheck
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  StatusBar,
  Modal,
  Image,
  Alert,
  Platform,
  Linking,
  Dimensions,
} from "react-native";

import { useState, useEffect, useRef } from "react";
import { Animated, PanResponder } from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from "react-native-webview";
import { VOCAB_LIST } from "./vocab";
import { getFunctions, httpsCallable } from "firebase/functions";
import { auth, db } from "./firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  reload,
  signOut
} from "firebase/auth";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";


/* ---------------- DESIGN TOKENS ---------------- */
const T = {
  // Backgrounds — ONE canonical dark scale
  bg0:   "#04080f",   // deepest
  bg1:   "#080f1a",   // page bg
  bg2:   "#0d1525",   // card bg
  bg3:   "#131e30",   // elevated card
  bg4:   "#1a2540",   // border / divider
  bg5:   "#243050",   // hover state

  // Accent
  gold:  "#f0b429",   // primary CTA — slightly more refined than #f5c518
  blue:  "#2563eb",   // secondary
  green: "#16a34a",
  red:   "#dc2626",
  amber: "#d97706",

  // Text
  t1: "#f1f5f9",      // primary text
  t2: "#94a3b8",      // secondary text
  t3: "#475569",      // muted text
  t4: "#1e293b",      // dark mode inverse / light mode primary

  // Radius
  r_sm: 8,
  r_md: 12,
  r_lg: 16,
  r_xl: 20,

  // Type scale
  xs: 11,
  sm: 13,
  base: 15,
  lg: 17,
  xl: 20,
  "2xl": 26,
  "3xl": 34,
};

const makeStyles = (isLight: boolean) => StyleSheet.create({
  container: { flex: 1, backgroundColor: isLight ? "#fff" : T.bg1 },
  title: { color: isLight ? "#0F172A" : T.t1, fontSize: T["2xl"], fontWeight: "900" },
  subtitle: { color: isLight ? "#475569" : T.t2, fontSize: T.base, marginTop: 4 },
  input: { backgroundColor: isLight ? "#F1F5F9" : T.bg2, color: isLight ? "#0F172A" : T.t1, padding: 14, borderRadius: T.r_md, borderHorizontalWidth: 1, borderColor: isLight ? "#E2E8F0" : T.bg4 },
  button: { backgroundColor: T.gold, padding: 16, borderRadius: T.r_md, alignItems: "center" },
  btnText: { color: T.bg0, fontWeight: "800", fontSize: T.lg },
  error: { color: T.red, marginTop: 8 },
  backButton: { marginBottom: 16 },
  backText: { color: isLight ? "#2563eb" : T.gold, fontSize: T.base },
  historyCard: { backgroundColor: isLight ? "#F8FAFC" : T.bg2, borderRadius: T.r_md, padding: 16 },
  statCard: { backgroundColor: isLight ? "#F8FAFC" : T.bg2, borderRadius: T.r_md, padding: 16 },
  statTitle: { color: isLight ? "#475569" : T.t2, fontSize: T.sm },
  statText: { color: isLight ? "#0F172A" : T.t1, fontSize: T.xl, fontWeight: "700" },
  faqQ: { color: isLight ? "#0F172A" : T.t1, fontSize: 15, fontWeight: "700", marginBottom: 8 },
  faqQLight: { color: "#0F172A" },
  faqA: { color: isLight ? "#475569" : T.t2, fontSize: 14, lineHeight: 22 },
  faqALight: { color: "#475569" },
  ctaBanner: { margin: 20, backgroundColor: isLight ? "#fff" : "#0a1428", borderRadius: 24, padding: 32, alignItems: "center", borderWidth: 1, borderColor: isLight ? "#E5E7EB" : "#1d4ed830" },
  ctaBannerLight: { backgroundColor: "#ffffff", borderColor: "#E5E7EB" },
  ctaTitleLight: { color: "#0F172A" },
  ctaSubLight: { color: "#475569" },
  ctaTitle: { color: isLight ? "#0F172A" : "#fff", fontSize: 26, fontWeight: "900", marginBottom: 10, textAlign: "center", lineHeight: 34, letterSpacing: -0.5 },
  ctaSub: { color: isLight ? "#475569" : "#9aa4c7", fontSize: 15, marginBottom: 24, textAlign: "center" },
  ctaBtn: { backgroundColor: "#4F7CFF", paddingHorizontal: 28, paddingVertical: 16, borderRadius: 12, width: "100%", alignItems: "center", marginBottom: 4 },
  ctaBtnText: { color: "#fff", fontWeight: "800", fontSize: 17 },
  footer: { paddingHorizontal: 24, paddingTop: 36, paddingBottom: 40, alignItems: "center", borderTopWidth: 1, borderColor: isLight ? "#E5E7EB" : T.bg4, backgroundColor: isLight ? "#F8FAFC" : T.bg0 },
  footerText: { color: isLight ? "#94a3b8" : T.t3, fontSize: T.xs },
  footerBrand: { color: isLight ? "#0F172A" : T.t1, fontWeight: "900", fontSize: T.lg, marginBottom: 4 },
  footerBrandLight: { color: "#0F172A" },
});

/* ---------------- CONSTANTS ---------------- */
const ADMIN_EMAIL = "admin@ascendsat.com";
const EMAILJS_SERVICE_ID = "service_q79x3sd";
const EMAILJS_TEMPLATE_ID = "template_yxuz77t";
const EMAILJS_PUBLIC_KEY = "pBdAENcJZFZs1JlWv";
const SHEET_WEBHOOK =
  "https://script.google.com/macros/s/AKfycbx3Aye2OVFWLGQD1AglD1zi2olROhS5hoMlp5lT62RC9Ets7nT_0mbaSs0A_7z1QCKD/exec";

const MATH = [
  "Algebra",
  "Advanced Math",
  "Problem Solving and Data Analysis",
  "Geometry & Trigonometry",
];

const READING_WRITING = [
  "Information and Ideas",
  "Craft & Structure",
  "Expression of Ideas",
  "Standard English Conventions",
];

const DIFFICULTIES = ["Easy", "Medium", "Hard"];

const TRIAL_QUESTIONS = [
  {
    id: 1,
    subject: "Words in Context",
    difficulty: "Hard",
    passage: "The following text is adapted from Laurence Housman’s 1916 play Bird in Hand. Professor Braintree, a famous scientist, is examining a series of letters in his study when he is greeted by his secretary, Miss Tuckey.\n\nMiss Tuckey: Good-morning, Sir.\n\nProfessor: Miss Tuckey, there is something broken over there, will you please see it removed? And will you kindly make a note to write to Messrs. Spink and Wedge, and say that these new glasses don’t suit me—I find them very trying to the—to the eyes. And I must ask you to fetch those proofs which came yesterday. I tried to catch you just now, but you had gone.",
    question: "As used in the text, what does the word “trying” most nearly mean?",
    options: ["Taxing", "Attempting", "Soothing", "Sampling"],
    answer: 0,
    explanation: "The professor mentions that his new glasses don't suit him and affect his eyes negatively. In this context, 'trying' means straining or difficult to endure, so 'Taxing' is correct.",
  },
  {
    id: 2,
    subject: "Command of Evidence",
    difficulty: "Medium",
    passage: "Harvard Medical School researcher Nicholas G. Norwitz and colleagues studied ways to integrate nutrition instruction into already dense medical school curricula. They recruited medical school students to wear continuous glucose monitors (CGM) and report the impact of the experience on their understanding and perspective on nutrition. Participants all agreed that the educational benefit was positive, but not all agreed that it would lead them to a lifestyle change; for example, ________.\n\nParticipant Responses When Surveyed on Their Experiences Wearing Continuous Glucose Monitors (CGM)\n\nStatement\tDisagree (%)\tNeutral (%)\tAgree (%)\tStrongly Agree (%)\nGave me insight into my body’s reaction to food\t0\t0\t35\t65\nWas valuable to my medical education\t0\t0\t15\t85\nWill help me better serve patients\t0\t0\t25\t75\nEncouraged me to change my eating behavior\t5\t30\t50\t15\nMedical students should get the opportunity to wear a CGM\t0\t0\t20\t80",
    question: "Which choice most effectively uses data from the table to complete the example?",
    options: [
      "100% of participants agreed or strongly agreed that wearing a CGM gave them insight into their body’s reaction to food, but 35% of participants were neutral or disagreed that it would encourage them to change their own eating behavior.",
      "80% of participants strongly agreed that future medical students should get the opportunity to wear a CGM, and another 20% of participants agreed with this statement.",
      "65% of participants agreed or strongly agreed that wearing a CGM encouraged them to change their own eating behavior, but 35% of participants were either neutral or disagreed with this statement.",
      "100% of participants agreed or strongly agreed that wearing a CGM was valuable to their medical education, and 85% of these responses strongly agreed with this statement.",
    ],
    answer: 0,
    explanation: "Option A contrasts the positive educational benefit with mixed feelings about lifestyle changes, matching the table data exactly.",
  },
  {
    id: 3,
    subject: "Advanced Math",
    difficulty: "Hard",
    passage: "Medical residents at Lakewood Hospital are choosing their individual specialties. Among them, 40% choose cardiology, 16% choose oncology, 34% choose endocrinology, and the remaining x% choose hematology. Once the doctors pick their first specialty, they are then each asked to choose a second specialty from the previous four options in case their original specialty is already filled. They may not pick their original specialty again. 20% of those who originally picked cardiology choose oncology as their second choice. If no other field chooses oncology as their second choice, and the hospital boasts 200 medical residents, then what is the total number of residents who named oncology as either their first or second choice, in terms of x?",
    question: "What is the total number of residents who named oncology as either their first or second choice, in terms of x?",
    options: ["x^2 - 24x + 188", "8x - 128", "8x - 144", "x^2 + 24x - 188"],
    answer: 0,
    explanation: "x = 10, so 16% of 200 is 32 first-choice oncology residents and 20% of 80 cardiology residents is 16 second-choice oncology residents, totaling 48, which matches x^2 - 24x + 188.",
  },
];

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR85QyMR1IgwI9OMnoSdI3jbsWTXa9ze3dw9SUfqX1geD4sxCNsamKsg01RYUCNvdKaNFn6khHy9IuK/pub?output=tsv";

const SESSION_KEY = "ascendsat_5min_session";
const FREE_TRIAL_KEY = "ascendsat_free_trial_used";
const FREE_TRIAL_LIMIT = 3;
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000;

const { width: SCREEN_WIDTH } = Dimensions.get("window");

/* ---------------- HELPERS ---------------- */

const formatTime = (secs) => {
  const m = Math.floor(secs / 60)
    .toString()
    .padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const daysUntil = (dateStr) => {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
};

const normalizeQuestionType = (value) => {
  const clean = (value || "").trim().toLowerCase();
  if (clean === "used") return "Used";
  if (clean === "new") return "New";
  return "New";
};
/* ================================================
   APP
================================================ */

const LessonDetailView = ({ lesson, isLight, onBack }) => {
  const [practiceIndex, setPracticeIndex] = useState(null);
  const [practiceAnswers, setPracticeAnswers] = useState({});
  const [practiceFinished, setPracticeFinished] = useState(false);

  const questions = lesson.practiceQuestions || [];
  const bg = isLight ? "#f8fafc" : "#0b1020";
  const cardBg = isLight ? "#fff" : "#0f1829";
  const textColor = isLight ? "#0f172a" : "#fff";
  const subColor = isLight ? "#475569" : "#9aa4c7";
  const border = isLight ? "#e2e8f0" : "#1a2540";

  if (practiceIndex !== null && questions.length > 0) {
    if (practiceFinished) {
      let correct = 0;
      questions.forEach((q, i) => { if (practiceAnswers[i] === q.answer) correct++; });
      return (
        <View style={{ flex: 1, backgroundColor: bg }}>
          <View style={{ flexDirection: "row", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: border }}>
            <TouchableOpacity onPress={() => { setPracticeIndex(null); setPracticeFinished(false); setPracticeAnswers({}); }}>
              <Text style={{ color: subColor, fontSize: 16 }}>← Back to Lesson</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
            <Text style={{ color: textColor, fontSize: 22, fontWeight: "900", marginBottom: 20 }}>Practice Results</Text>
            <View style={{ backgroundColor: cardBg, borderRadius: 18, padding: 24, alignItems: "center", marginBottom: 20, borderWidth: 1, borderColor: border }}>
              <Text style={{ color: correct === questions.length ? "#16a34a" : correct >= questions.length / 2 ? "#d97706" : "#dc2626", fontSize: 52, fontWeight: "900" }}>{correct}/{questions.length}</Text>
              <Text style={{ color: subColor, fontSize: 16, marginTop: 4 }}>{Math.round((correct / questions.length) * 100)}%</Text>
            </View>
            {questions.map((q, i) => {
              const userAns = practiceAnswers[i] ?? -1;
              const isCorrect = userAns === q.answer;
              return (
                <View key={i} style={{ backgroundColor: cardBg, borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderLeftWidth: 4, borderColor: isCorrect ? (isLight ? "#bbf7d0" : "#1a3a2a") : (isLight ? "#fecaca" : "#3a1a1a"), borderLeftColor: isCorrect ? "#16a34a" : "#dc2626" }}>
                  <Text style={{ color: subColor, fontSize: 12, marginBottom: 6 }}>Q{i + 1}</Text>
                  <Text style={{ color: textColor, fontSize: 14, lineHeight: 22, marginBottom: 8 }}>{q.question}</Text>
                  <Text style={{ color: isCorrect ? "#16a34a" : "#dc2626", fontWeight: "700", fontSize: 13, marginBottom: 4 }}>{isCorrect ? "✅ Correct" : `❌ You: ${userAns === -1 ? "Skipped" : q.choices[userAns]}`}</Text>
                  {!isCorrect && <Text style={{ color: "#4ade80", fontSize: 13, fontWeight: "600", marginBottom: 4 }}>✓ {q.choices[q.answer]}</Text>}
                  {q.explanation ? <Text style={{ color: subColor, fontSize: 12, lineHeight: 20, fontStyle: "italic" }}>💡 {q.explanation}</Text> : null}
                </View>
              );
            })}
            <TouchableOpacity style={{ backgroundColor: isLight ? "#1d4ed8" : "#f5c518", padding: 16, borderRadius: 12, alignItems: "center" }} onPress={() => { setPracticeIndex(0); setPracticeAnswers({}); setPracticeFinished(false); }}>
              <Text style={{ color: isLight ? "#fff" : "#070d1f", fontWeight: "800", fontSize: 16 }}>Try Again</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      );
    }

    const q = questions[practiceIndex];
    const selectedAns = practiceAnswers[practiceIndex] ?? null;
    const isAnswered = selectedAns !== null;
    return (
      <View style={{ flex: 1, backgroundColor: bg }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16, borderBottomWidth: 1, borderBottomColor: border }}>
          <TouchableOpacity onPress={() => { setPracticeIndex(null); setPracticeAnswers({}); }}>
            <Text style={{ color: subColor, fontSize: 16 }}>← Back</Text>
          </TouchableOpacity>
          <Text style={{ color: textColor, fontWeight: "700" }}>{practiceIndex + 1} / {questions.length}</Text>
          <View style={{ width: 60 }} />
        </View>
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
          <Text style={{ color: subColor, fontSize: 12, fontWeight: "600", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Practice Question {practiceIndex + 1}</Text>
          <Text style={{ color: textColor, fontSize: 17, lineHeight: 30, marginBottom: 24 }}>{q.question}</Text>
          <View style={{ height: 1, backgroundColor: border, marginBottom: 18 }} />
          {q.choices.map((c, i) => {
            const letter = ["A", "B", "C", "D"][i];
            const isSelected = selectedAns === i;
            const isCorrect = i === q.answer;
            let borderColor = isLight ? "#cbd5e1" : "#2a3a5c";
            let bgColor = isLight ? "#fff" : "#0f1829";
            if (isAnswered && isCorrect) { borderColor = "#16a34a"; bgColor = isLight ? "#f0fdf4" : "#0d2a18"; }
            else if (isAnswered && isSelected && !isCorrect) { borderColor = "#dc2626"; bgColor = isLight ? "#fef2f2" : "#2a0d0d"; }
            else if (isSelected) { borderColor = "#1d4ed8"; bgColor = isLight ? "#eff6ff" : "#0c1624"; }
            return (
              <TouchableOpacity key={i} style={{ flexDirection: "row", alignItems: "flex-start", padding: 14, marginBottom: 10, borderRadius: 10, borderWidth: 1.5, borderColor, backgroundColor: bgColor, gap: 12 }} onPress={() => { if (!isAnswered) setPracticeAnswers(prev => ({ ...prev, [practiceIndex]: i })); }} disabled={isAnswered} activeOpacity={0.7}>
                <View style={{ width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: isAnswered && isCorrect ? "#16a34a" : isAnswered && isSelected ? "#dc2626" : isSelected ? "#1d4ed8" : isLight ? "#94a3b8" : "#475569", backgroundColor: isAnswered && isCorrect ? "#16a34a" : isAnswered && isSelected && !isCorrect ? "#dc2626" : isSelected ? "#1d4ed8" : "transparent", justifyContent: "center", alignItems: "center", flexShrink: 0 }}>
                  <Text style={{ color: (isAnswered && isCorrect) || (isAnswered && isSelected) || isSelected ? "#fff" : isLight ? "#475569" : "#9aa4c7", fontWeight: "700", fontSize: 13 }}>{letter}</Text>
                </View>
                <Text style={{ color: isLight ? "#1e293b" : "#e2e8f0", fontSize: 15, lineHeight: 24, flex: 1, paddingTop: 4 }}>{c}</Text>
              </TouchableOpacity>
            );
          })}
          {isAnswered && (
            <>
              {q.explanation ? (
                <View style={{ backgroundColor: isLight ? "#f0fdf4" : "#0d2a18", borderRadius: 12, padding: 14, marginTop: 4, marginBottom: 16, borderWidth: 1, borderColor: isLight ? "#bbf7d0" : "#1a3a2a" }}>
                  <Text style={{ color: "#16a34a", fontWeight: "700", marginBottom: 4 }}>💡 Explanation</Text>
                  <Text style={{ color: isLight ? "#166534" : "#4ade80", fontSize: 13, lineHeight: 20 }}>{q.explanation}</Text>
                </View>
              ) : null}
              {practiceIndex < questions.length - 1 ? (
                <TouchableOpacity style={{ backgroundColor: isLight ? "#1e3a5f" : "#1e3a5f", padding: 16, borderRadius: 12, alignItems: "center" }} onPress={() => setPracticeIndex(practiceIndex + 1)}>
                  <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>Next Question →</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={{ backgroundColor: "#16a34a", padding: 16, borderRadius: 12, alignItems: "center" }} onPress={() => setPracticeFinished(true)}>
                  <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>See Results ✓</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16, borderBottomWidth: 1, borderBottomColor: border }}>
        <TouchableOpacity onPress={onBack}><Text style={{ color: subColor, fontSize: 16 }}>← Back</Text></TouchableOpacity>
        <Text style={{ color: textColor, fontWeight: "700", fontSize: 15, flex: 1, textAlign: "center" }} numberOfLines={1}>{lesson.title}</Text>
        <View style={{ width: 60 }} />
      </View>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          {lesson.domain ? <View style={{ backgroundColor: isLight ? "#eff6ff" : "#0c1624", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 }}><Text style={{ color: isLight ? "#1d4ed8" : "#60a5fa", fontWeight: "700", fontSize: 12 }}>{lesson.domain}</Text></View> : null}
          {lesson.difficulty && lesson.difficulty !== "All" ? <View style={{ backgroundColor: lesson.difficulty === "Hard" ? (isLight ? "#fef2f2" : "#2a0d0d") : lesson.difficulty === "Medium" ? (isLight ? "#fffbeb" : "#1a1000") : (isLight ? "#f0fdf4" : "#0d2a18"), paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 }}><Text style={{ color: lesson.difficulty === "Hard" ? "#dc2626" : lesson.difficulty === "Medium" ? "#d97706" : "#16a34a", fontWeight: "700", fontSize: 12 }}>{lesson.difficulty}</Text></View> : null}
        </View>

        <Text style={{ color: textColor, fontSize: 22, fontWeight: "900", marginBottom: 16, lineHeight: 30 }}>{lesson.title}</Text>

        {lesson.videoUrl ? (
          <TouchableOpacity style={{ backgroundColor: isLight ? "#0f172a" : "#0a1428", borderRadius: 14, padding: 18, marginBottom: 20, flexDirection: "row", alignItems: "center", gap: 12, borderWidth: 1, borderColor: isLight ? "#1e293b" : "#1a2540" }} onPress={() => Linking.openURL(lesson.videoUrl)}>
            <Text style={{ fontSize: 28 }}>▶️</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#fff", fontWeight: "800", fontSize: 15 }}>Watch Video</Text>
              <Text style={{ color: "#9aa4c7", fontSize: 12, marginTop: 2 }}>Tap to open</Text>
            </View>
            <Text style={{ color: "#9aa4c7", fontSize: 18 }}>›</Text>
          </TouchableOpacity>
        ) : null}

        <View style={{ backgroundColor: cardBg, borderRadius: 16, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: border }}>
          <Text style={{ color: isLight ? "#1d4ed8" : "#60a5fa", fontWeight: "800", fontSize: 13, marginBottom: 12, letterSpacing: 1 }}>LESSON CONTENT</Text>
          <Text style={{ color: textColor, fontSize: 15, lineHeight: 28 }}>{lesson.content}</Text>
        </View>

        {questions.length > 0 ? (
          <TouchableOpacity style={{ backgroundColor: isLight ? "#1d4ed8" : "#f5c518", padding: 18, borderRadius: 14, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 10 }} onPress={() => { setPracticeIndex(0); setPracticeAnswers({}); setPracticeFinished(false); }}>
            <Text style={{ fontSize: 20 }}>✏️</Text>
            <View>
              <Text style={{ color: isLight ? "#fff" : "#070d1f", fontWeight: "900", fontSize: 17 }}>Practice Questions</Text>
              <Text style={{ color: isLight ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.45)", fontSize: 12, marginTop: 2 }}>{questions.length} question{questions.length > 1 ? "s" : ""} to test your understanding</Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </View>
  );
};

const CasperBot = ({ onPress }) => (
  <TouchableOpacity
    style={{
      position: "absolute", bottom: 24, right: 20,
      zIndex: 999,
      alignItems: "center",
    }}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <View style={{
      width: 60, height: 60, borderRadius: 30,
      backgroundColor: "#0f1829",
      borderWidth: 2, borderColor: "#1d4ed8",
      justifyContent: "center", alignItems: "center",
      shadowColor: "#1d4ed8", shadowOpacity: 0.6, shadowRadius: 12, shadowOffset: { width: 0, height: 0 },
      elevation: 10,
    }}>
      <Image source={require("./logo.png")} style={{ width: 38, height: 38, borderRadius: 19 }} resizeMode="contain" />
    </View>
    <View style={{
      backgroundColor: "#1d4ed8", borderRadius: 10,
      paddingHorizontal: 8, paddingVertical: 3, marginTop: 4,
    }}>
      <Text style={{ color: "#fff", fontSize: 10, fontWeight: "800" }}>Casper</Text>
    </View>
  </TouchableOpacity>
);

export default function App() {
 /* AUTH */
const [screen, setScreen] = useState("landing");
const [verifyResent, setVerifyResent] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("");
const [themeMode, setThemeMode] = useState("light");
  const isLight = themeMode === "light";
  const styles = makeStyles(isLight);

  /* ONBOARDING */
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [targetScore, setTargetScore] = useState("");
  const [testDate, setTestDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [testDateInput, setTestDateInput] = useState("");
  const [satExperience, setSatExperience] = useState("");
  const [currentScore, setCurrentScore] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [prepMethod, setPrepMethod] = useState("");
  const [satChallenge, setSatChallenge] = useState("");

/* USER PROFILE */
  const [userProfile, setUserProfile] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editTargetScore, setEditTargetScore] = useState("");
  const [editTestDateInput, setEditTestDateInput] = useState("");
  const [editShowDatePicker, setEditShowDatePicker] = useState(false);
  const [editTestDate, setEditTestDate] = useState(new Date());
  const [profileSaved, setProfileSaved] = useState(false);

  /* NAV */
  const [view, setView] = useState("home");
  const [trialIndex, setTrialIndex] = useState(0);
  const [trialAnswers, setTrialAnswers] = useState({});
  const [freeTrialAvailable, setFreeTrialAvailable] = useState(true);
  const [freeTrialMode, setFreeTrialMode] = useState(false);

  /* Quiz */
const [markedForReview, setMarkedForReview] = useState({});
const [strikethrough, setStrikethrough] = useState({});
const [eliminatorOn, setEliminatorOn] = useState(false);
const [highlights, setHighlights] = useState({});

const [desmosVisible, setDesmosVisible] = useState(false);
const desmosPos = useRef(new Animated.ValueXY({ x: 20, y: 60 })).current;
const desmosSize = useRef(new Animated.ValueXY({ x: SCREEN_WIDTH * 0.92, y: 420 })).current;
const desmosPanResponder = useRef(
  PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: desmosPos.x, dy: desmosPos.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => desmosPos.extractOffset(),
  })
).current;


  /* QUESTION BANK */
  const [questionBank, setQuestionBank] = useState([]);
  const [bankLoading, setBankLoading] = useState(true);
const [usedQuestionIds, setUsedQuestionIds] = useState({ Math: new Set(), "Reading & Writing": new Set() });
const [wrongAnswerIds, setWrongAnswerIds] = useState({ Math: new Set(), "Reading & Writing": new Set() });
const [questionCounts, setQuestionCounts] = useState({
    total: 0,
    used: 0,
    new: 0,
    wrong: 0,
  });

  /* PRACTICE SETUP */
  const [section, setSection] = useState("Math");
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [selectedDiffs, setSelectedDiffs] = useState([]);
  const [questionCount, setQuestionCount] = useState("");
  const [questionSource, setQuestionSource] = useState("all");

/* DIAGNOSTIC */
const [diagnosticModalVisible, setDiagnosticModalVisible] = useState(false);
const [diagStep, setDiagStep] = useState(1);
const [diagMathScore, setDiagMathScore] = useState("");
const [diagRWScore, setDiagRWScore] = useState("");
const [diagBars, setDiagBars] = useState({
  algebra: 0, advancedMath: 0, dataAnalysis: 0, geometry: 0,
  infoIdeas: 0, craftStructure: 0, expressionIdeas: 0, englishConventions: 0,
});
const [studyPlan, setStudyPlan] = useState(null);

/* MINI GAMES */
const [gameModalVisible, setGameModalVisible] = useState(false);
const [gameMode, setGameMode] = useState(null);
const [speedScore, setSpeedScore] = useState(0);
const [speedTimeLeft, setSpeedTimeLeft] = useState(60);
const [speedWord, setSpeedWord] = useState(null);
const [speedChoices, setSpeedChoices] = useState([]);
const [speedAnswered, setSpeedAnswered] = useState(false);
const [speedCorrect, setSpeedCorrect] = useState(null);
const speedTimerRef = useRef(null);
const [matchWords, setMatchWords] = useState([]);
const [matchDefs, setMatchDefs] = useState([]);
const [matchSelected, setMatchSelected] = useState(null);
const [matchSide, setMatchSide] = useState(null);
const [matchSolved, setMatchSolved] = useState([]);
const [matchScore, setMatchScore] = useState(0);
const [sentenceWord, setSentenceWord] = useState(null);
const [sentenceChoices, setSentenceChoices] = useState([]);
const [sentenceSelected, setSentenceSelected] = useState(null);
const [sentenceScore, setSentenceScore] = useState(0);
const [sentenceTotal, setSentenceTotal] = useState(0);
/* NEW GAMES */
const [hangmanWord, setHangmanWord] = useState(null);

/* LANDING ANIMATION HOOKS (Ensures flat hook hierarchy) */
const heroAnim = useRef(new Animated.Value(0)).current;
const featuresAnim = useRef(new Animated.Value(0)).current;
const testimonialsAnim = useRef(new Animated.Value(0)).current;
const isNative = Platform.OS !== "web";

const ctaGlow = useRef(new Animated.Value(0)).current;
const tickerOffset = useRef(new Animated.Value(0)).current;
const scorePulse = useRef(new Animated.Value(1)).current;
const scoreGlow = useRef(new Animated.Value(0)).current;

const titleMaskAnims = useRef(Array.from({ length: 6 }, () => new Animated.Value(0))).current;
const stepLineAnims = useRef(Array.from({ length: 4 }, () => new Animated.Value(0))).current;
const sectionTriggered = useRef([false, false, false, false, false, false]);
const heroCharAnims = useRef(Array.from({ length: 20 }, () => new Animated.Value(0))).current;
const featureCard3DAnims = useRef(Array.from({ length: 6 }, () => new Animated.Value(0))).current;

const orbAnim1 = useRef(new Animated.Value(0)).current;
const orbAnim2 = useRef(new Animated.Value(0)).current;
const orbAnim3 = useRef(new Animated.Value(0)).current;

useEffect(() => {
  if (screen === "landing") {
    // 🔥 MAIN FIX
    scrollY.setValue(0);

    if (sectionTriggered.current) {
      sectionTriggered.current = [false, false, false, false, false, false];
    }

    if (sectionAnims.current) {
      sectionAnims.current.forEach(a => a.setValue(0));
    }

    if (heroCharAnims.current) {
      heroCharAnims.current.forEach(a => a.setValue(0));
    }

    if (featureCard3DAnims.current) {
      featureCard3DAnims.current.forEach(a => a.setValue(0));
    }

    if (titleMaskAnims) {
      titleMaskAnims.forEach(a => a.setValue(0));
    }

    if (stepLineAnims) {
      stepLineAnims.forEach(a => a.setValue(0));
    }

    scorePulse.setValue(1);
    scoreGlow.setValue(0);
    tickerOffset.setValue(0);

    const ND = isNative;

    Animated.stagger(180, [
      Animated.spring(heroAnim, { toValue: 1, useNativeDriver: ND, tension: 38, friction: 8 }),
      Animated.spring(featuresAnim, { toValue: 1, useNativeDriver: ND, tension: 38, friction: 8 }),
      Animated.spring(testimonialsAnim, { toValue: 1, useNativeDriver: ND, tension: 38, friction: 8 }),
    ]).start();

    if (heroCharAnims.current) {
      Animated.stagger(
        55,
        heroCharAnims.current.map(anim =>
          Animated.spring(anim, {
            toValue: 1,
            useNativeDriver: ND,
            tension: 220,
            friction: 10,
          })
        )
      ).start();
    }

    const floatOrb = (anim, duration, delay) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, { toValue: 1, duration, useNativeDriver: ND }),
          Animated.timing(anim, { toValue: 0, duration, useNativeDriver: ND }),
        ])
      );

    floatOrb(orbAnim1, 3800, 0).start();
    floatOrb(orbAnim2, 5200, 700).start();
    floatOrb(orbAnim3, 4400, 1400).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(scorePulse, { toValue: 1.045, duration: 1100, useNativeDriver: ND }),
        Animated.timing(scorePulse, { toValue: 1, duration: 1100, useNativeDriver: ND }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(scoreGlow, { toValue: 1, duration: 1600, useNativeDriver: ND }),
        Animated.timing(scoreGlow, { toValue: 0, duration: 1600, useNativeDriver: ND }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(ctaGlow, { toValue: 1, duration: 1800, useNativeDriver: ND }),
        Animated.timing(ctaGlow, { toValue: 0, duration: 1800, useNativeDriver: ND }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(tickerOffset, {
        toValue: -1,
        duration: 18000,
        useNativeDriver: ND,
      })
    ).start();
  } else {
    heroAnim.setValue(0);
    featuresAnim.setValue(0);
    testimonialsAnim.setValue(0);
  }
}, [screen]);

/* WORDLE */
const [wordleWord, setWordleWord] = useState(null);
const [wordleGuesses, setWordleGuesses] = useState([]);
const [wordleCurrentGuess, setWordleCurrentGuess] = useState("");
const [wordleGameOver, setWordleGameOver] = useState(false);
const [wordleWon, setWordleWon] = useState(false);
const [wordleMessage, setWordleMessage] = useState("");

/* BOSS BATTLE */
const [bossHP, setBossHP] = useState(100);
const [playerHP, setPlayerHP] = useState(100);
const [bossQuestion, setBossQuestion] = useState(null);
const [bossChoices, setBossChoices] = useState([]);
const [bossAnswered, setBossAnswered] = useState(false);
const [bossCorrect, setBossCorrect] = useState(null);
const [bossGameOver, setBossGameOver] = useState(false);
const [bossWon, setBossWon] = useState(false);
const [bossStreak, setBossStreak] = useState(0);

/* RAPID FIRE */
const [rapidQuestions, setRapidQuestions] = useState([]);
const [rapidIndex, setRapidIndex] = useState(0);
const [rapidScore, setRapidScore] = useState(0);
const [rapidTimeLeft, setRapidTimeLeft] = useState(5);
const [rapidAnswered, setRapidAnswered] = useState(false);
const [rapidSelected, setRapidSelected] = useState(null);
const [rapidFinished, setRapidFinished] = useState(false);
const rapidTimerRef = useRef(null);

/* TRIVIA PARTY */
const [triviaQuestion, setTriviaQuestion] = useState(null);
const [triviaChoices, setTriviaChoices] = useState([]);
const [triviaSelected, setTriviaSelected] = useState(null);
const [triviaScore, setTriviaScore] = useState(0);
const [triviaTotal, setTriviaTotal] = useState(0);
const [triviaLifelines, setTriviaLifelines] = useState({ fifty: true, skip: true });
const [triviaEliminated, setTriviaEliminated] = useState([]);
const [triviaMilestone, setTriviaMilestone] = useState(0);
const [hangmanGuesses, setHangmanGuesses] = useState([]);
const [hangmanLives, setHangmanLives] = useState(6);
const [hangmanWon, setHangmanWon] = useState(false);
const [scrambleWord, setScrambleWord] = useState(null);
const [scrambleLetters, setScrambleLetters] = useState([]);
const [scrambleSelected, setScrambleSelected] = useState([]);
const [scrambleResult, setScrambleResult] = useState(null); // "correct"|"wrong"|null
const [scrambleScore, setScrambleScore] = useState(0);
const [typeRaceWord, setTypeRaceWord] = useState(null);
const [typeRaceInput, setTypeRaceInput] = useState("");
const [typeRaceScore, setTypeRaceScore] = useState(0);
const [typeRaceTimeLeft, setTypeRaceTimeLeft] = useState(60);
const [typeRaceResult, setTypeRaceResult] = useState(null);
const typeRaceTimerRef = useRef(null);

/* LANDING ANIMS */
const scrollY = useRef(new Animated.Value(0)).current;
const scrollVelocity = useRef(new Animated.Value(0)).current;
const lastScrollY = useRef(0);
const lastScrollTime = useRef(Date.now());
const section1Anim = useRef(new Animated.Value(0)).current;
const section2Anim = useRef(new Animated.Value(0)).current;
const section3Anim = useRef(new Animated.Value(0)).current;
const section4Anim = useRef(new Animated.Value(0)).current;
const section5Anim = useRef(new Animated.Value(0)).current;
const section6Anim = useRef(new Animated.Value(0)).current;
const sectionAnims = useRef([section1Anim, section2Anim, section3Anim, section4Anim, section5Anim, section6Anim]);

// Parallax layers — each moves at a different rate
const parallaxLayer1 = useRef(new Animated.Value(0)).current; // slowest (bg)
const parallaxLayer2 = useRef(new Animated.Value(0)).current; // medium
const parallaxLayer3 = useRef(new Animated.Value(0)).current; // fastest (fg)

// Hero text character reveal anims (6 chars for "Ascend")
// Velocity-driven distortion
const velocitySkew = scrollVelocity.interpolate({
  inputRange: [-30, 0, 30],
  outputRange: ['-2deg', '0deg', '2deg'],
  extrapolate: 'clamp',
});

// Parallax scroll bindings
const heroParallaxY = scrollY.interpolate({
  inputRange: [0, 600],
  outputRange: [0, -180],
  extrapolate: 'clamp',
});
const heroOpacityFade = scrollY.interpolate({
  inputRange: [0, 350],
  outputRange: [1, 0],
  extrapolate: 'clamp',
});
const heroScaleDown = scrollY.interpolate({
  inputRange: [0, 400],
  outputRange: [1, 0.88],
  extrapolate: 'clamp',
});
const layer1ParallaxY = scrollY.interpolate({
  inputRange: [0, 1000],
  outputRange: [0, -60],   // very slow — background
  extrapolate: 'clamp',
});
const layer2ParallaxY = scrollY.interpolate({
  inputRange: [0, 1000],
  outputRange: [0, -120],  // medium
  extrapolate: 'clamp',
});
const layer3ParallaxY = scrollY.interpolate({
  inputRange: [0, 1000],
  outputRange: [0, -220],  // fast — foreground
  extrapolate: 'clamp',
});

// Sticky header opacity
const stickyHeaderOpacity = scrollY.interpolate({
  inputRange: [60, 140],
  outputRange: [0, 1],
  extrapolate: 'clamp',
});
const stickyHeaderY = scrollY.interpolate({
  inputRange: [60, 140],
  outputRange: [-60, 0],
  extrapolate: 'clamp',
});

/* DRILLS */
const [drillModalVisible, setDrillModalVisible] = useState(false);
const [drillDomain, setDrillDomain] = useState(null);
const [drillDifficulty, setDrillDifficulty] = useState(null);
const [drillQuestions, setDrillQuestions] = useState([]);
const [drillIndex, setDrillIndex] = useState(0);
const [drillAnswer, setDrillAnswer] = useState(null);
const [drillScore, setDrillScore] = useState(0);
const [drillTimeLeft, setDrillTimeLeft] = useState(0);
const [drillFinished, setDrillFinished] = useState(false);
const drillTimerRef = useRef(null);

  /* QUIZ ENGINE */
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showNavigator, setShowNavigator] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  /* STOPWATCH */
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  /* SCORE HISTORY */
  const [scoreHistory, setScoreHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  /* GROWTH */
  const [selectedGrowthDomain, setSelectedGrowthDomain] = useState(null);

/* AI STUDY BOT */
const [studyBotVisible, setStudyBotVisible] = useState(false);
const [botMessages, setBotMessages] = useState([
  { role: "assistant", content: "Hi! I'm your AscendSAT study bot 👋 Ask me anything about SAT Math, Reading & Writing, vocabulary, or strategy!" }
]);
const [botInput, setBotInput] = useState("");
const [botLoading, setBotLoading] = useState(false);
const botScrollRef = useRef(null);

/* GLOBAL STATS */
const [globalStats, setGlobalStats] = useState({ totalUsers: 0, totalQuestionsAnswered: 0 });

/* STREAK */
const [streakData, setStreakData] = useState({ currentStreak: 0, longestStreak: 0, lastActiveDate: null });

/* WEEKLY SUMMARY */
const [weeklySummaryVisible, setWeeklySummaryVisible] = useState(false);

/* FORMULA SHEET */
const [formulaSheetVisible, setFormulaSheetVisible] = useState(false);

/* BADGES */
const [badges, setBadges] = useState([]);
const [newBadgeAlert, setNewBadgeAlert] = useState(null);
const [badgesModalVisible, setBadgesModalVisible] = useState(false);

/* ADAPTIVE QUIZ */
const [adaptiveModalVisible, setAdaptiveModalVisible] = useState(false);
const [adaptivePhase, setAdaptivePhase] = useState("intro"); // "intro" | "quiz" | "results"
const [adaptiveSection, setAdaptiveSection] = useState("Math");
const [adaptiveQuestions, setAdaptiveQuestions] = useState([]);
const [adaptiveIndex, setAdaptiveIndex] = useState(0);
const [adaptiveAnswers, setAdaptiveAnswers] = useState({});
const [adaptiveCurrentDiff, setAdaptiveCurrentDiff] = useState("Medium");
const [adaptiveStreak, setAdaptiveStreak] = useState(0);
const [adaptiveScore, setAdaptiveScore] = useState(0);
const [adaptiveElapsed, setAdaptiveElapsed] = useState(0);
const adaptiveTimerRef = useRef(null);
const [adaptiveUserAnswers, setAdaptiveUserAnswers] = useState({});
const ADAPTIVE_TOTAL = 15;

/* MISTAKE JOURNAL */
const [mistakeJournalVisible, setMistakeJournalVisible] = useState(false);
const [mistakeJournalFilter, setMistakeJournalFilter] = useState("all");

/* WEAK SPOT ALERT */
const [weakSpotAlert, setWeakSpotAlert] = useState(null); // { domain, accuracy, attempted }
const [weakSpotDismissed, setWeakSpotDismissed] = useState({});

/* TIME PER QUESTION */
const [questionStartTime, setQuestionStartTime] = useState(null);
const [questionTimes, setQuestionTimes] = useState({}); // { qIndex: seconds }

/* LESSONS */
const [lessonsModalVisible, setLessonsModalVisible] = useState(false);
const [lessonsList, setLessonsList] = useState([]);
const [lessonsLoading, setLessonsLoading] = useState(false);
const [selectedLesson, setSelectedLesson] = useState(null);
const [newLessonTitle, setNewLessonTitle] = useState("");
const [newLessonDomain, setNewLessonDomain] = useState("");
const [newLessonContent, setNewLessonContent] = useState("");
const [newLessonVideo, setNewLessonVideo] = useState("");
const [newLessonDifficulty, setNewLessonDifficulty] = useState("All");
const [lessonPracticeQuestions, setLessonPracticeQuestions] = useState([{ question: "", choices: ["", "", "", ""], answer: 0, explanation: "" }]);

/* FULL LENGTH TEST */
const [fullTestModalVisible, setFullTestModalVisible] = useState(false);
const [fullTestSection, setFullTestSection] = useState(null); // "rw1"|"rw2"|"math1"|"math2"
const [fullTestQuestions, setFullTestQuestions] = useState([]);
const [fullTestAnswers, setFullTestAnswers] = useState({});
const [fullTestCurrentQ, setFullTestCurrentQ] = useState(0);
const [fullTestTimeLeft, setFullTestTimeLeft] = useState(0);
const [fullTestFinished, setFullTestFinished] = useState(false);
const [fullTestResults, setFullTestResults] = useState([]);
const [fullTestPhase, setFullTestPhase] = useState("intro"); // "intro"|"testing"|"results"
const fullTestTimerRef = useRef(null);
const [fullTestMarked, setFullTestMarked] = useState({});
const [fullTestNavigator, setFullTestNavigator] = useState(false);

  /* HELP */
  const [helpMessage, setHelpMessage] = useState("");
  /* FEEDBACK */
const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
const [feedbackRating, setFeedbackRating] = useState(0);
const [feedbackText, setFeedbackText] = useState("");
const [feedbackCategory, setFeedbackCategory] = useState("general");
const [feedbackSending, setFeedbackSending] = useState(false);
const [feedbackSent, setFeedbackSent] = useState(false);
const [adminFeedbackList, setAdminFeedbackList] = useState([]);
const [adminFeedbackLoading, setAdminFeedbackLoading] = useState(false);
  const [helpImage, setHelpImage] = useState(null);
  const [helpSending, setHelpSending] = useState(false);
  const [helpSent, setHelpSent] = useState(false);

  /* ADMIN */
  const [adminQuestions, setAdminQuestions] = useState([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [selectedAdminQ, setSelectedAdminQ] = useState(null);

  /* CLASSES */
  const [classesList, setClassesList] = useState([]);
  const [classesLoading, setClassesLoading] = useState(false);
  const [newClassTitle, setNewClassTitle] = useState("");
  const [newClassDesc, setNewClassDesc] = useState("");
  const [newClassType, setNewClassType] = useState("group");
  const [newClassDateInput, setNewClassDateInput] = useState("");
  const [newClassDuration, setNewClassDuration] = useState("1");
  const [newClassPrice, setNewClassPrice] = useState("");

  /* BOOKING MODAL */
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [bookingSelectedClass, setBookingSelectedClass] = useState(null);
  const [bookingEmailInput, setBookingEmailInput] = useState("");
  const [bookingPhoneInput, setBookingPhoneInput] = useState("");
  const [bookingSending, setBookingSending] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  /* LANDING PUBLIC CLASSES */
  const [publicClasses, setPublicClasses] = useState([]);
  const [publicClassesLoading, setPublicClassesLoading] = useState(false);

  /* TESTIMONIALS */
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(false);
  const [newTestimonialName, setNewTestimonialName] = useState("");
  const [newTestimonialScore, setNewTestimonialScore] = useState("");
  const [newTestimonialText, setNewTestimonialText] = useState("");

  /* Vocab */
/* VOCABULARY */
const [vocabModalVisible, setVocabModalVisible] = useState(false);
const [vocabMode, setVocabMode] = useState(null); // "flashcard" | "list" | "quiz"
const [flashcardIndex, setFlashcardIndex] = useState(0);
const [flashcardFlipped, setFlashcardFlipped] = useState(false);
const [flashcardDeck, setFlashcardDeck] = useState([]);
const [quizWord, setQuizWord] = useState(null);
const [quizChoices, setQuizChoices] = useState([]);
const [quizSelected, setQuizSelected] = useState(null);
const [quizScore, setQuizScore] = useState(0);
const [quizTotal, setQuizTotal] = useState(0);
const [vocabProgress, setVocabProgress] = useState({});
const [vocabSearch, setVocabSearch] = useState("");


// URL routing (web only)
useEffect(() => {
  if (Platform.OS !== "web") return;
  if (screen !== "app") return;
  const path = window.location.pathname;
  if (path === "/quiz") setView("practice");
  else if (path === "/history") { loadScoreHistory(); setView("history"); }
  else if (path === "/growth") { loadScoreHistory(); setView("growth"); }
  else if (path === "/classes") { loadClasses(); setView("classes"); }
  else if (path === "/settings") setView("settings");
  else if (path === "/help") setView("help");
  else if (path === "/analytics") setView("timeAnalytics");
  else if (path === "/quiz/results") setView("results");
  else { setView("home"); window.history.replaceState(null, "", "/dashboard"); }
}, [screen]);

useEffect(() => {
  if (Platform.OS !== "web") return;
  const routeMap = {
    home: "/dashboard",
    practice: "/quiz",
    history: "/history",
    growth: "/growth",
    classes: "/classes",
    settings: "/settings",
    help: "/help",
    results: "/quiz/results",
    timeAnalytics: "/analytics",
    admin: "/admin",
    manageClasses: "/admin/classes",
    manageTestimonials: "/admin/testimonials",
    manageLessons: "/admin/lessons",
    adminFeedback: "/admin/feedback",
  };
  let newPath;
  if (screen === "app") {
    newPath = routeMap[view] || "/dashboard";
  } else if (screen === "landing") {
    newPath = "/";
  } else if (screen === "login") {
    newPath = "/login";
  } else if (screen === "register") {
    newPath = "/register";
  } else if (screen === "onboarding") {
    newPath = "/onboarding";
  } else if (screen === "verifyEmail") {
    newPath = "/verify";
  } else if (screen === "founder") {
    newPath = "/about";
  } else if (screen === "testimonials") {
    newPath = "/testimonials";
  } else if (screen === "trial3") {
    newPath = "/trial";
  } else {
    newPath = "/";
  }
  if (typeof window !== "undefined" && window.location.pathname !== newPath) {
    window.history.replaceState(null, "", newPath);
  }
}, [view, screen]);

// Handle browser back/forward buttons
useEffect(() => {
  if (Platform.OS !== "web") return;
  const handlePopState = () => {
    const path = window.location.pathname;
    if (screen === "app") {
      if (path === "/quiz") setView("practice");
      else if (path === "/history") { loadScoreHistory(); setView("history"); }
      else if (path === "/growth") { loadScoreHistory(); setView("growth"); }
      else if (path === "/classes") { loadClasses(); setView("classes"); }
      else if (path === "/settings") setView("settings");
      else if (path === "/help") setView("help");
      else if (path === "/analytics") setView("timeAnalytics");
      else setView("home");
    } else if (path === "/" || path === "") {
      setScreen("landing");
    } else if (path === "/login") {
      setScreen("login");
    } else if (path === "/register") {
      setScreen("register");
    } else if (path === "/about") {
      setScreen("founder");
    } else if (path === "/testimonials") {
      setScreen("testimonials");
    } else if (path === "/trial") {
      setScreen("trial3");
    } else {
      setScreen("landing");
    }
  };
  window.addEventListener("popstate", handlePopState);
  return () => window.removeEventListener("popstate", handlePopState);
}, [screen]);

  /* ---------------- SESSION HELPERS ---------------- */

  const saveSession = async (uid, userEmail, adminFlag) => {
    try {
      await AsyncStorage.setItem(
        SESSION_KEY,
        JSON.stringify({
          uid,
          email: userEmail,
          isAdmin: adminFlag,
          expiresAt: Date.now() + SESSION_DURATION_MS,
        })
      );
    } catch (e) {
      console.log("Session save error:", e.message);
    }
  };

  const clearSession = async () => {
    try {
      await AsyncStorage.removeItem(SESSION_KEY);
    } catch (e) {
      console.log("Session clear error:", e.message);
    }
  };

  const markFreeTrialUsed = async () => {
    setFreeTrialAvailable(false);
    try {
      await AsyncStorage.setItem(FREE_TRIAL_KEY, "used");
    } catch (e) {
      console.log("Free trial save error:", e.message);
    }
  };

  const clearFreeTrialFlag = async () => {
    try {
      await AsyncStorage.removeItem(FREE_TRIAL_KEY);
    } catch (e) {
      console.log("Free trial clear error:", e.message);
    }
  };

  const handleLogout = async () => {
    try {
      await clearSession();
      try {
        await signOut(auth);
      } catch (e) {}
      setUserId(null);
      setScoreHistory([]);
      setIsAdmin(false);
      setUserProfile(null);
      setEmail("");
      setPassword("");
      setScreen("landing");
      setView("home");
    } catch (e) {
      console.log("Logout error:", e.message);
    }
  };
const handleGoogleSignIn = async () => {
  if (Platform.OS !== "web") {
    setError("Google sign-in is only available on web. Please use email/password.");
    return;
  }
  try {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider).catch((err) => {
  console.error("Google popup error:", err);
  throw err;
});
    const adminFlag = cred.user.email === ADMIN_EMAIL;
    setUserId(cred.user.uid);
    setIsAdmin(adminFlag);
    await saveSession(cred.user.uid, cred.user.email, adminFlag);
    try {
      const statsRef = doc(db, "globalStats", "main");
      const statsSnap = await getDoc(statsRef);
      const userRef = doc(db, "users", cred.user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        if (statsSnap.exists()) {
          await updateDoc(statsRef, { totalUsers: (statsSnap.data().totalUsers || 0) + 1 });
        } else {
          await setDoc(statsRef, { totalUsers: 1, totalQuestionsAnswered: 0 });
        }
      }
    } catch (e) {}
    const profile = await loadUserProfile(cred.user.uid);
    if (!profile) setScreen("onboarding");
    else {
      await loadScoreHistory();
      await loadBadges(cred.user.uid);
      try {
        const sRef = doc(db, "streaks", cred.user.uid);
        const sSnap = await getDoc(sRef);
        if (sSnap.exists()) setStreakData(sSnap.data());
      } catch (e) {}
      setScreen("app");
      setView("home");
    }
  } catch (e) {
  console.error("Google sign-in error:", e);

  Alert.alert(
    "Google Sign In Failed",
    e?.message || JSON.stringify(e)
  );
}
};

  /* ---------------- PROFILE ---------------- */

  const loadUserProfile = async (uid) => {
    try {
      const ref = doc(db, "users", uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setUserProfile(snap.data());
        if (snap.data().name) setUserName(snap.data().name);
        return snap.data();
      }
      return null;
    } catch (e) {
      console.log("Profile load error:", e.message);
      return null;
    }
  };

  const saveUserProfile = async (uid, data) => {
    try {
      await setDoc(doc(db, "users", uid), data, { merge: true });
      setUserProfile(data);
    } catch (e) {
      console.log("Profile save error:", e.message);
    }
  };

  /* ---------------- BOOTSTRAP SESSION ---------------- */

  useEffect(() => {
  const init = async () => {
    try {
      const raw = await AsyncStorage.getItem(SESSION_KEY);
      if (!raw) return;

      const saved = JSON.parse(raw);

      // invalid session → ignore
      if (!saved?.uid || !saved?.expiresAt) {
        await AsyncStorage.removeItem(SESSION_KEY);
        return;
      }

      // expired session → ignore
      if (Date.now() > saved.expiresAt) {
        await AsyncStorage.removeItem(SESSION_KEY);
        return;
      }

      // 🔥 CRITICAL FIX: only restore if Firebase still has a logged-in user
      const currentUser = auth.currentUser;
      if (!currentUser) {
        return; // stay on landing page
      }

      setUserId(saved.uid);
      setEmail(saved.email || "");
      setIsAdmin(!!saved.isAdmin);

      const profile = await loadUserProfile(saved.uid);

      if (!profile) {
        setScreen("onboarding");
      } else {
        setScreen("app");
        setView("home");
      }

    } catch (e) {
      console.log("Init error:", e.message);
    }
  };

  const loadTrialStatus = async () => {
    try {
      const raw = await AsyncStorage.getItem(FREE_TRIAL_KEY);
      setFreeTrialAvailable(raw !== "used");
    } catch (e) {
      console.log("Free trial load error:", e.message);
    }
  };

  loadTrialStatus();
  init();
}, []);

  /* ---------------- QUESTION BANK ---------------- */

  const loadQuestionBank = async () => {
    setBankLoading(true);
    try {
      const res = await fetch(SHEET_URL);
      const tsv = await res.text();

      const rows = tsv.trim().split("\n").slice(1);
      const questions = rows
        .filter((row) => row.trim())
        .map((row) => {
          const cols = row.split("\t");
          const questionType = normalizeQuestionType(cols[9]?.trim());

          return {
            domain: cols[0]?.trim(),
            difficulty: cols[1]?.trim(),
            question: cols[2]?.trim(),
            choices: [
              cols[3]?.trim(),
              cols[4]?.trim(),
              cols[5]?.trim(),
              cols[6]?.trim(),
            ],
            answer: ["A", "B", "C", "D"].indexOf(cols[7]?.trim()),
            explanation: cols[8]?.trim(),
            questionType,
          };
        });

      setQuestionBank(questions);
    } catch (e) {
      console.log("Question load error:", e.message);
    }
    setBankLoading(false);
  };

  useEffect(() => {
    loadQuestionBank();
    const interval = setInterval(() => {
      loadQuestionBank();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  if (screen === "landing") {
    loadPublicClasses();
    loadTestimonials();
  }
  loadGlobalStats();
}, [screen]);
useEffect(() => {
  if (questionBank.length === 0) return;
  const makeId = (q) => `${q.domain}||${q.difficulty}||${q.question.slice(0, 60)}`;
  const sectionBank = questionBank.filter(q => {
    const isMath = ["Algebra","Advanced Math","Problem Solving and Data Analysis","Geometry & Trigonometry"].includes(q.domain);
    return section === "Math" ? isMath : !isMath;
  });
  const sectionUsedIds = usedQuestionIds[section] || new Set();
  const sectionWrongIds = wrongAnswerIds[section] || new Set();
  const usedCount = sectionBank.filter(q =>
    q.questionType === "Used" || sectionUsedIds.has(makeId(q))
  ).length;
  const wrongCount = sectionBank.filter(q => sectionWrongIds.has(makeId(q))).length;
  setQuestionCounts({
    total: sectionBank.length,
    used: usedCount,
    new: sectionBank.length - usedCount,
    wrong: wrongCount,
  });
}, [questionBank, usedQuestionIds, wrongAnswerIds, section]);

  /* ---------------- TIMER ---------------- */

  const startTimer = () => {
    setElapsed(0);
    timerRef.current = setInterval(() => setElapsed((prev) => prev + 1), 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => () => stopTimer(), []);

  useEffect(() => {
    try {
      const d = typeof testDate === "string" ? new Date(testDate) : testDate;
      if (!isNaN(d)) setTestDateInput(d.toLocaleDateString("en-US"));
    } catch (e) {}
  }, [testDate]);

  /* ---------------- FIRESTORE ---------------- */

  const saveScore = async (finalScore, questions, answers, totalTime) => {
    if (!userId) return;
    try {
      await addDoc(collection(db, "scores"), {
        userId,
        score: finalScore,
        total: questions.length,
        percent: Math.round((finalScore / questions.length) * 100),
        domains: selectedDomains,
        difficulties: selectedDiffs,
        section,
        questionSource,
        timeSeconds: totalTime,
        questions: questions.map((q, i) => ({
          question: q.question,
          choices: q.choices,
          correctAnswer: q.answer,
          userAnswer: answers[i] ?? -1,
          explanation: q.explanation,
          domain: q.domain,
          difficulty: q.difficulty,
          questionType: q.questionType,
          timeSpent: questionTimes[i] || 0,
        })),
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.log("Failed to save score:", e.message);
    }
  };

  const loadScoreHistory = async () => {
    if (!userId) return;
    setHistoryLoading(true);
    try {
      const q = query(
        collection(db, "scores"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      setScoreHistory(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.log("Firestore error:", e.message);
    }
    setHistoryLoading(false);
  };
const loadUsedQuestions = async (uid) => {
  const resolvedUid = uid || userId;
  if (!resolvedUid) return;
  try {
    const ref = doc(db, "usedQuestions", resolvedUid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      setUsedQuestionIds({
        Math: new Set(data.mathIds || []),
        "Reading & Writing": new Set(data.rwIds || []),
      });
      setWrongAnswerIds({
        Math: new Set(data.mathWrongIds || []),
        "Reading & Writing": new Set(data.rwWrongIds || []),
      });
    }
  } catch (e) {
    console.log("Load used questions error:", e.message);
  }
};

const markWrongAnswers = async (questions, answers) => {
  if (!userId) return;
  try {
    const mathWrong = new Set(wrongAnswerIds["Math"]);
    const rwWrong = new Set(wrongAnswerIds["Reading & Writing"]);
    let changed = false;
    questions.forEach((q, i) => {
      if (answers[i] !== q.answer) {
        const id = `${q.domain}||${q.difficulty}||${q.question.slice(0, 60)}`;
        const isMath = ["Algebra", "Advanced Math", "Problem Solving and Data Analysis", "Geometry & Trigonometry"].includes(q.domain);
        if (isMath) { if (!mathWrong.has(id)) { mathWrong.add(id); changed = true; } }
        else { if (!rwWrong.has(id)) { rwWrong.add(id); changed = true; } }
      }
    });
    if (!changed) return;
    setWrongAnswerIds({ Math: mathWrong, "Reading & Writing": rwWrong });
    await setDoc(doc(db, "usedQuestions", userId), {
      mathWrongIds: [...mathWrong],
      rwWrongIds: [...rwWrong],
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (e) {
    console.log("Mark wrong error:", e.message);
  }
};

const markQuestionsAsUsed = async (questions) => {
  if (!userId) return;
  try {
    const mathIds = new Set(usedQuestionIds["Math"]);
    const rwIds = new Set(usedQuestionIds["Reading & Writing"]);
    let changed = false;
    questions.forEach(q => {
      const id = `${q.domain}||${q.difficulty}||${q.question.slice(0, 60)}`;
      const isMath = ["Algebra","Advanced Math","Problem Solving and Data Analysis","Geometry & Trigonometry"].includes(q.domain);
      if (isMath) { if (!mathIds.has(id)) { mathIds.add(id); changed = true; } }
      else { if (!rwIds.has(id)) { rwIds.add(id); changed = true; } }
    });
    if (!changed) return;
    setUsedQuestionIds({ Math: mathIds, "Reading & Writing": rwIds });
    await setDoc(doc(db, "usedQuestions", userId), {
      mathIds: [...mathIds],
      rwIds: [...rwIds],
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (e) {
    console.log("Mark used error:", e.message);
  }
};

const loadAdminQuestions = async () => {
  setAdminLoading(true);
    try {
      const q = query(collection(db, "helpRequests"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setAdminQuestions(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.log("Admin load error:", e.message);
    }
    setAdminLoading(false);
  };

  /* ---------------- TESTIMONIALS ---------------- */

  const loadTestimonials = async () => {
    setTestimonialsLoading(true);
    try {
      const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setTestimonials(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.log("Testimonial load error:", e.message);
    }
    setTestimonialsLoading(false);
  };

  const addTestimonial = async () => {
    if (!newTestimonialName.trim() || !newTestimonialText.trim()) return;
    try {
      await addDoc(collection(db, "testimonials"), {
        name: newTestimonialName.trim(),
        score: newTestimonialScore.trim(),
        text: newTestimonialText.trim(),
        createdAt: serverTimestamp(),
      });
      setNewTestimonialName("");
      setNewTestimonialScore("");
      setNewTestimonialText("");
      await loadTestimonials();
      Alert.alert("Success", "Testimonial added.");
    } catch (e) {
      console.log("Add testimonial error:", e.message);
    }
  };

  const removeTestimonial = async (id) => {
    try {
      await deleteDoc(doc(db, "testimonials", id));
      await loadTestimonials();
    } catch (e) {
      console.log("Delete testimonial error:", e.message);
    }
  };

  /* ---------------- CLASSES ---------------- */

  const loadClasses = async () => {
    setClassesLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "classes"));
      const all = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      all.sort((a, b) => new Date(a.date) - new Date(b.date));
      setClassesList(all);
    } catch (e) {
      console.log("Failed to load classes:", e.message);
    }
    setClassesLoading(false);
  };

  const loadGlobalStats = async () => {
  try {
    const ref = doc(db, "globalStats", "main");
    const snap = await getDoc(ref);
    if (snap.exists()) setGlobalStats(snap.data());
  } catch (e) {
    console.log("Global stats error:", e.message);
  }
};

const BADGE_DEFINITIONS = [
  { id: "first_quiz", icon: "🎯", name: "First Steps", desc: "Complete your first quiz", check: (history, streak) => history.length >= 1 },
  { id: "quiz_10", icon: "📚", name: "Getting Started", desc: "Complete 10 quizzes", check: (history) => history.length >= 10 },
  { id: "quiz_50", icon: "🏆", name: "Committed", desc: "Complete 50 quizzes", check: (history) => history.length >= 50 },
  { id: "quiz_100", icon: "💎", name: "Elite", desc: "Complete 100 quizzes", check: (history) => history.length >= 100 },
  { id: "perfect_score", icon: "⭐", name: "Perfectionist", desc: "Get 100% on a quiz", check: (history) => history.some(e => e.percent === 100) },
  { id: "streak_3", icon: "⚡", name: "On a Roll", desc: "3 day streak", check: (history, streak) => (streak?.currentStreak || 0) >= 3 },
  { id: "streak_7", icon: "🔥", name: "Week Warrior", desc: "7 day streak", check: (history, streak) => (streak?.currentStreak || 0) >= 7 },
  { id: "streak_30", icon: "🌟", name: "Unstoppable", desc: "30 day streak", check: (history, streak) => (streak?.currentStreak || 0) >= 30 },
  { id: "questions_100", icon: "💪", name: "Century", desc: "Answer 100 questions total", check: (history) => history.reduce((s, e) => s + (e.total || 0), 0) >= 100 },
  { id: "questions_500", icon: "🚀", name: "Power User", desc: "Answer 500 questions total", check: (history) => history.reduce((s, e) => s + (e.total || 0), 0) >= 500 },
  { id: "questions_1000", icon: "👑", name: "Legend", desc: "Answer 1000 questions total", check: (history) => history.reduce((s, e) => s + (e.total || 0), 0) >= 1000 },
  { id: "accuracy_80", icon: "🎓", name: "Sharp", desc: "Average 80%+ accuracy across 5+ quizzes", check: (history) => { const valid = history.filter(e => e.percent != null); if (valid.length < 5) return false; const avg = valid.reduce((s, e) => s + e.percent, 0) / valid.length; return avg >= 80; } },
  { id: "all_domains", icon: "🗺️", name: "Well-Rounded", desc: "Practice all 8 SAT domains", check: (history) => { const domains = new Set(); history.forEach(e => (e.domains || []).forEach(d => domains.add(d))); return domains.size >= 8; } },
];

const checkAndAwardBadges = async (freshHistory, freshStreak) => {
  if (!userId) return;
  const historyToUse = freshHistory || scoreHistory;
  const streakToUse = freshStreak || streakData;
  try {
    const ref = doc(db, "badges", userId);
    const snap = await getDoc(ref);
    const earned = snap.exists() ? (snap.data().earned || []) : [];
    const newlyEarned = [];

    BADGE_DEFINITIONS.forEach(badge => {
      if (!earned.includes(badge.id)) {
        if (badge.check(historyToUse, streakToUse)) {
          earned.push(badge.id);
          newlyEarned.push(badge);
        }
      }
    });

    if (newlyEarned.length > 0) {
      await setDoc(ref, { earned }, { merge: true });
      setBadges(earned);
      setNewBadgeAlert(newlyEarned[0]);
      setTimeout(() => setNewBadgeAlert(null), 4000);
    } else {
      setBadges(earned);
    }
  } catch (e) {
    console.log("Badge error:", e.message);
  }
};

const loadBadges = async (uid) => {
  const resolvedUid = uid || userId;
  if (!resolvedUid) return;
  try {
    const ref = doc(db, "badges", resolvedUid);
    const snap = await getDoc(ref);
    if (snap.exists()) setBadges(snap.data().earned || []);
  } catch (e) {
    console.log("Load badges error:", e.message);
  }
};

const FULL_TEST_CONFIG = {
  rw1:   { label: "Reading & Writing — Module 1", time: 32 * 60, count: 27, domains: READING_WRITING, section: "Reading & Writing" },
  rw2:   { label: "Reading & Writing — Module 2", time: 32 * 60, count: 27, domains: READING_WRITING, section: "Reading & Writing" },
  math1: { label: "Math — Module 1", time: 35 * 60, count: 22, domains: MATH, section: "Math" },
  math2: { label: "Math — Module 2", time: 35 * 60, count: 22, domains: MATH, section: "Math" },
};

const startFullTest = (moduleKey) => {
  const config = FULL_TEST_CONFIG[moduleKey];
  const pool = questionBank.filter(q => config.domains.includes(q.domain));
  if (pool.length < config.count) {
    Alert.alert("Not enough questions", `Need at least ${config.count} questions for this module. Currently have ${pool.length}.`);
    return;
  }
  const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, config.count);
  setFullTestSection(moduleKey);
  setFullTestQuestions(shuffled);
  setFullTestAnswers({});
  setFullTestCurrentQ(0);
  setFullTestFinished(false);
  setFullTestMarked({});
  setFullTestNavigator(false);
  setFullTestTimeLeft(config.time);
  setFullTestPhase("testing");

  if (fullTestTimerRef.current) clearInterval(fullTestTimerRef.current);
  fullTestTimerRef.current = setInterval(() => {
    setFullTestTimeLeft(prev => {
      if (prev <= 1) {
        clearInterval(fullTestTimerRef.current);
        setFullTestFinished(true);
        setFullTestPhase("results");
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
};

const submitFullTest = () => {
  if (fullTestTimerRef.current) clearInterval(fullTestTimerRef.current);
  setFullTestFinished(true);
  setFullTestPhase("results");
  updateStreak();
};

const loadStreak = async () => {
  if (!userId) return;
  try {
    const ref = doc(db, "streaks", userId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      setStreakData(snap.data());
    }
  } catch (e) {
    console.log("Streak load error:", e.message);
  }
};

const updateStreak = async () => {
  if (!userId) return;
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split("T")[0];

    const ref = doc(db, "streaks", userId);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      const newData = { currentStreak: 1, longestStreak: 1, lastActiveDate: todayStr };
      await setDoc(ref, newData);
      setStreakData(newData);
      return;
    }

    const data = snap.data();
    const last = data.lastActiveDate;

    if (last === todayStr) return; // already updated today

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    let newStreak = last === yesterdayStr ? data.currentStreak + 1 : 1;
    let newLongest = Math.max(newStreak, data.longestStreak || 0);

    const updated = { currentStreak: newStreak, longestStreak: newLongest, lastActiveDate: todayStr };
    await setDoc(ref, updated);
    setStreakData(updated);
  } catch (e) {
    console.log("Streak update error:", e.message);
  }
};

const loadLessons = async () => {
    setLessonsLoading(true);
    try {
      const q = query(collection(db, "lessons"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setLessonsList(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.log("Load lessons error:", e.message);
    }
    setLessonsLoading(false);
  };

  const addLesson = async () => {
    if (!newLessonTitle.trim() || !newLessonContent.trim()) return;
    try {
      const validPractice = lessonPracticeQuestions.filter(q => q.question.trim() && q.choices.every(c => c.trim()));
      await addDoc(collection(db, "lessons"), {
        title: newLessonTitle.trim(),
        domain: newLessonDomain.trim(),
        content: newLessonContent.trim(),
        videoUrl: newLessonVideo.trim(),
        difficulty: newLessonDifficulty,
        practiceQuestions: validPractice,
        createdAt: serverTimestamp(),
      });
      setNewLessonTitle("");
      setNewLessonDomain("");
      setNewLessonContent("");
      setNewLessonVideo("");
      setNewLessonDifficulty("All");
      setLessonPracticeQuestions([{ question: "", choices: ["", "", "", ""], answer: 0, explanation: "" }]);
      await loadLessons();
      Alert.alert("Success", "Lesson added!");
    } catch (e) {
      console.log("Add lesson error:", e.message);
    }
  };

  const deleteLesson = async (id) => {
    try {
      await deleteDoc(doc(db, "lessons", id));
      await loadLessons();
    } catch (e) {
      console.log("Delete lesson error:", e.message);
    }
  };

  const loadPublicClasses = async () => {
    setPublicClassesLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "classes"));
      const all = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      all.sort((a, b) => new Date(a.date) - new Date(b.date));
      setPublicClasses(all);
    } catch (e) {
      console.log("Public classes error:", e.message);
    }
    setPublicClassesLoading(false);
  };

  const addClass = async () => {
    if (!newClassTitle.trim()) return;
    let dateObj = new Date(newClassDateInput);
    if (isNaN(dateObj)) dateObj = new Date();
    const duration = Number(newClassDuration) || 1;
    const price =
      newClassPrice === ""
        ? newClassType === "individual"
          ? 15 * duration
          : 0
        : Number(newClassPrice);

    try {
      await addDoc(collection(db, "classes"), {
        title: newClassTitle,
        description: newClassDesc,
        type: newClassType,
        date: dateObj.toISOString(),
        durationHours: duration,
        price,
        createdAt: serverTimestamp(),
      });
      setNewClassTitle("");
      setNewClassDesc("");
      setNewClassDateInput("");
      setNewClassDuration("1");
      setNewClassPrice("");
      await loadClasses();
    } catch (e) {
      console.log("Add class error:", e.message);
    }
  };

  const removeClass = async (id) => {
    try {
      await deleteDoc(doc(db, "classes", id));
      await loadClasses();
    } catch (e) {
      console.log("Delete class error:", e.message);
    }
  };
/* ---------------- BOOKING ---------------- */

  const openBookingModal = (cls) => {
    if (!userId) {
      setScreen("login");
      return;
    }
    setBookingSelectedClass(cls);
    setBookingEmailInput(userProfile?.email || email || "");
    setBookingPhoneInput(userProfile?.phone || "");
    setBookingError(null);
    setBookingModalVisible(true);
  };

  const confirmBooking = async () => {
    if (!bookingSelectedClass || !userId) return;

    let finalEmail = bookingEmailInput?.trim() || userProfile?.email || email || "";
    if (!finalEmail || !finalEmail.includes("@")) {
      setBookingError("Please enter a valid email address.");
      return;
    }

    setBookingSending(true);
    setBookingError(null);
    const cls = bookingSelectedClass;

    try {
      const ref = await addDoc(collection(db, "bookings"), {
        userId,
        classId: cls.id,
        classTitle: cls.title,
        date: cls.date,
        durationHours: cls.durationHours,
        price:
          cls.price ?? (cls.type === "individual" ? 15 * (cls.durationHours || 1) : 0),
        paid: cls.type === "group",
        contactEmail: finalEmail,
        contactPhone: bookingPhoneInput,
        createdAt: serverTimestamp(),
      });
      console.log("Booking saved:", ref.id);

      if (cls.type === "individual") {
        await updateDoc(doc(db, "classes", cls.id), { isBooked: true });
      }

      const emailRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: "template_jeztmb8",
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            email: finalEmail,
            student_phone: bookingPhoneInput || "Not provided",
            class_title: cls.title,
            class_date: cls.date ? new Date(cls.date).toLocaleString() : "TBD",
            admin_email: ADMIN_EMAIL,
          },
        }),
      });

      if (!emailRes.ok) {
        const resText = await emailRes.text();
        throw new Error(`EmailJS failed: ${resText}`);
      }

      try {
        await fetch(SHEET_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: finalEmail,
            phone: bookingPhoneInput || "Not provided",
            classTitle: cls.title,
            classDate: cls.date ? new Date(cls.date).toLocaleString() : "TBD",
            classType: cls.type,
          }),
        });
      } catch (sheetErr) {
        console.log("Sheet logging failed (non-critical):", sheetErr.message);
      }

      setBookingModalVisible(false);
      Alert.alert("Booked! 🎉", `You're booked for ${cls.title}. Check your email for details.`);
    } catch (e) {
      console.log("Booking error:", e.message);
      setBookingError(e?.message || "Could not complete booking. Please try again.");
    }
    setBookingSending(false);
  };

  /* ---------------- GROWTH ---------------- */
const chartWidth = Dimensions.get("window").width - 80;
  const getGrowthStats = (domain) => {
    let attempted = 0;
    let correct = 0;

    scoreHistory.forEach((entry) => {
      if (!entry.questions) return;
      entry.questions.forEach((q) => {
        if (q.domain === domain) {
          attempted++;
          if (q.userAnswer === q.correctAnswer) correct++;
        }
      });
    });

    return {
      attempted,
      correct,
      accuracy: attempted > 0 ? Math.round((correct / attempted) * 100) : 0,
    };
  };

  /* ---------------- QUIZ ---------------- */

  const startQuiz = () => {
    setQuestionTimes({});
    setQuestionStartTime(Date.now());
    setError("");

    if (!userId && !freeTrialAvailable) {
      setError("Free practice trial finished. Please sign in or sign up to keep going.");
      return;
    }

    const requestedCount = Number(questionCount) || FREE_TRIAL_LIMIT;
    if (!userId && requestedCount > FREE_TRIAL_LIMIT) {
      setError(`Guest practice is limited to ${FREE_TRIAL_LIMIT} questions. Sign in to continue.`);
      return;
    }

    const makeId = (q) => `${q.domain}||${q.difficulty}||${q.question.slice(0, 60)}`;
    const sectionUsedIds = usedQuestionIds[section] || new Set();

let filtered = questionBank.filter(
  (q) =>
    selectedDomains.includes(q.domain) &&
    selectedDiffs.includes(q.difficulty)
);

if (questionSource === "used") {
  filtered = filtered.filter(q =>
    q.questionType === "Used" || sectionUsedIds.has(makeId(q))
  );
} else if (questionSource === "new") {
  filtered = filtered.filter(q =>
    q.questionType !== "Used" && !sectionUsedIds.has(makeId(q))
  );
} else if (questionSource === "wrong") {
  const wrongIds = wrongAnswerIds[section] || new Set();
  filtered = filtered.filter(q => wrongIds.has(makeId(q)));
}

if (filtered.length === 0) {
  filtered = questionBank.filter((q) => selectedDomains.includes(q.domain));

  if (questionSource === "used") {
    filtered = filtered.filter(q =>
      q.questionType === "Used" || sectionUsedIds.has(makeId(q))
    );
  } else if (questionSource === "new") {
    filtered = filtered.filter(q =>
      q.questionType !== "Used" && !sectionUsedIds.has(makeId(q))
    );
  } else if (questionSource === "wrong") {
    const wrongIds = wrongAnswerIds[section] || new Set();
    filtered = filtered.filter(q => wrongIds.has(makeId(q)));
  }
}

    if (filtered.length === 0) {
      setError("No questions found. Try different filters.");
      return;
    }

    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    const finalQuestions = shuffled.slice(0, requestedCount);
    setQuizQuestions(finalQuestions);
    setUserAnswers({});
    setScore(0);
    setCurrentQ(0);
    setQuizFinished(false);
    setQuizStarted(true);
    if (!userId && freeTrialAvailable) {
      markFreeTrialUsed();
      setFreeTrialMode(false);
    }
    startTimer();
    markQuestionsAsUsed(finalQuestions);
  };

  const selectTrialAnswer = (questionIndex, choiceIndex) => {
    setTrialAnswers((prev) => ({ ...prev, [questionIndex]: choiceIndex }));
  };

  const selectAnswer = (index) =>
    setUserAnswers((prev) => ({ ...prev, [currentQ]: index }));

  const goToQuestion = (index) => {
    // log time spent on current question before jumping
    if (questionStartTime !== null) {
      const spent = Math.round((Date.now() - questionStartTime) / 1000);
      setQuestionTimes(prev => ({ ...prev, [currentQ]: (prev[currentQ] || 0) + spent }));
    }
    setCurrentQ(index);
    setQuestionStartTime(Date.now());
    setShowNavigator(false);
  };

  const finishQuiz = async () => {
    stopTimer();
    let finalScore = 0;
    quizQuestions.forEach((q, i) => {
      if (userAnswers[i] === q.answer) finalScore++;
    });
    setScore(finalScore);
    setQuizFinished(true);
await saveScore(finalScore, quizQuestions, userAnswers, elapsed);
await markWrongAnswers(quizQuestions, userAnswers);

    // Build fresh history to pass directly to badge checker
    const newEntry = {
      score: finalScore,
      total: quizQuestions.length,
      percent: Math.round((finalScore / quizQuestions.length) * 100),
      domains: selectedDomains,
      difficulties: selectedDiffs,
      section,
      questionSource,
      timeSeconds: elapsed,
      questions: quizQuestions.map((q, i) => ({
        question: q.question,
        choices: q.choices,
        correctAnswer: q.answer,
        userAnswer: userAnswers[i] ?? -1,
        explanation: q.explanation,
        domain: q.domain,
        difficulty: q.difficulty,
        questionType: q.questionType,
      })),
    };
    const freshHistory = [newEntry, ...scoreHistory];

    await updateStreak();

    // Get fresh streak from Firestore to pass to badge checker
    let freshStreak = streakData;
    try {
      const sRef = doc(db, "streaks", userId);
      const sSnap = await getDoc(sRef);
      if (sSnap.exists()) freshStreak = sSnap.data();
    } catch (e) {}

await checkAndAwardBadges(freshHistory, freshStreak);
    loadScoreHistory();

    // Check for weak spots
    const domainStats = {};
    freshHistory.forEach(entry => {
      if (!entry.questions) return;
      entry.questions.forEach(q => {
        if (!domainStats[q.domain]) domainStats[q.domain] = { correct: 0, total: 0 };
        domainStats[q.domain].total++;
        if (q.userAnswer === q.correctAnswer) domainStats[q.domain].correct++;
      });
    });
    const weakDomain = Object.entries(domainStats).find(([domain, s]) => {
      return s.total >= 20 && Math.round((s.correct / s.total) * 100) < 60 && !weakSpotDismissed[domain];
    });
    if (weakDomain) {
      const [domain, s] = weakDomain;
      setWeakSpotAlert({ domain, accuracy: Math.round((s.correct / s.total) * 100), attempted: s.total });
    }
    try {
      const statsRef = doc(db, "globalStats", "main");
      const statsSnap = await getDoc(statsRef);
      if (statsSnap.exists()) {
        await updateDoc(statsRef, { totalQuestionsAnswered: (statsSnap.data().totalQuestionsAnswered || 0) + quizQuestions.length });
      } else {
        await setDoc(statsRef, { totalUsers: 0, totalQuestionsAnswered: quizQuestions.length });
      }
    } catch (e) {}
  };

  /* ---------------- HELP ---------------- */

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 0.5,
    });
    if (!result.canceled) setHelpImage(result.assets[0]);
  };

const sendBotMessage = async () => {
  if (!botInput.trim() || botLoading) return;
  const userMsg = botInput.trim();
  setBotInput("");
  const newMessages = [...botMessages, { role: "user", content: userMsg }];
  setBotMessages(newMessages);
  setBotLoading(true);

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer REMOVED_USE_CASPERCHAT_CLOUD_FUNCTION",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        max_tokens: 1000,
        messages: [
          {
            role: "system",
            content: `You are Casper, an expert SAT tutor built into the AscendSAT app. You solve SAT problems step by step with 100% accuracy. Never guess. Show all work clearly.

═══ CORE SAT FACTS ═══
SCORING:
- Total: 400–1600. Math: 200–800. Reading & Writing: 200–800.
- Scores are multiples of 10. Max is 1600. No such thing as 810 or 1620.
- National average: ~1010–1020.

FORMAT (Digital SAT, Bluebook):
- Reading & Writing first, then Math. Each has 2 adaptive modules.
- R&W: 54 questions, 64 min (27 per module, 32 min each)
- Math: 44 questions, 70 min (22 per module, 35 min each)
- No wrong-answer penalty. Calculator allowed on ALL math (Desmos built in).
- Module 2 difficulty adapts based on Module 1 performance.

═══ SAT MATH — COMPLETE KNOWLEDGE BASE ═══

ALGEBRA:
- Slope: m = (y2-y1)/(x2-x1). Slope-intercept: y = mx + b. Standard: Ax + By = C.
- Parallel lines: same slope. Perpendicular: slopes are negative reciprocals (m1 × m2 = -1).
- Systems of equations — substitution: isolate one variable, plug in. Elimination: add/subtract equations to cancel a variable.
- No solution: parallel lines (same slope, different y-intercept). Infinite solutions: same line (identical equations).
- Linear inequalities: flip inequality sign when multiplying/dividing by a negative.
- Absolute value: |x| = a means x = a or x = -a. |x| < a means -a < x < a.
- Direct variation: y = kx. Inverse variation: y = k/x.

ADVANCED MATH:
- Quadratic formula: x = (-b ± √(b²-4ac)) / 2a for ax² + bx + c = 0.
- Discriminant: b²-4ac > 0 → two real roots. = 0 → one real root. < 0 → no real roots.
- Factoring: look for two numbers that multiply to ac and add to b (for ax²+bx+c).
- Vertex form: y = a(x-h)² + k. Vertex is (h, k). Axis of symmetry: x = h.
- Standard to vertex: complete the square or use h = -b/2a, then find k.
- FOIL: (a+b)(c+d) = ac + ad + bc + bd.
- Difference of squares: a²-b² = (a+b)(a-b).
- Perfect square trinomial: a²+2ab+b² = (a+b)². a²-2ab+b² = (a-b)².
- Exponential growth: y = a(1+r)^t. Decay: y = a(1-r)^t. General: y = ab^t.
- To solve exponential equations: get same base, then set exponents equal. Or use logs if needed.
- Polynomial remainder theorem: if f(x) divided by (x-a), remainder = f(a).
- Rational equations: find LCD, multiply both sides, check for extraneous solutions.
- Radical equations: isolate radical, square both sides, always check solutions.
- Function notation: f(g(x)) means plug g(x) into f. f(x+h) means replace every x with (x+h).
- Even function: f(-x) = f(x), symmetric about y-axis. Odd function: f(-x) = -f(x), symmetric about origin.

PROBLEM SOLVING & DATA ANALYSIS:
- Percentage: part/whole × 100. Percentage change: (new-old)/old × 100.
- Percentage of percentage: multiply decimals (e.g. 20% of 30% = 0.20 × 0.30 = 0.06 = 6%).
- Unit conversion: multiply by conversion fractions, cancel units.
- Ratios: a:b means a/(a+b) and b/(a+b) of total.
- Rate × Time = Distance. Rate × Time = Work.
- Mean = sum of values / number of values.
- Median = middle value when sorted. For even count: average of two middle values.
- Mode = most frequent value. Range = max - min.
- Standard deviation: measures spread. Higher SD = more spread out.
- Margin of error: represents uncertainty in survey results. True value is within ± margin of error.
- Probability = favorable outcomes / total outcomes.
- Independent events: P(A and B) = P(A) × P(B).
- Mutually exclusive: P(A or B) = P(A) + P(B).
- Conditional probability: P(A|B) = P(A and B) / P(B).
- Expected value: sum of (value × probability) for all outcomes.
- Scatterplot: positive correlation = upward trend. Negative = downward. Line of best fit minimizes distance to all points.
- Two-way tables: read carefully. "Given that" means use the row/column total, not grand total.
- Surveys: random sampling gives representative results. Larger sample = smaller margin of error.

GEOMETRY & TRIGONOMETRY:
- Area formulas: rectangle = lw. Triangle = ½bh. Circle = πr². Trapezoid = ½(b1+b2)h. Parallelogram = bh.
- Perimeter: add all sides. Circumference = 2πr = πd.
- Volume: rectangular prism = lwh. Cylinder = πr²h. Sphere = (4/3)πr³. Cone = (1/3)πr²h. Pyramid = (1/3)Bh.
- Pythagorean theorem: a² + b² = c² (c is hypotenuse).
- Common Pythagorean triples: 3-4-5, 5-12-13, 8-15-17, 7-24-25.
- 30-60-90 triangle: sides are x, x√3, 2x (opposite 30°, 60°, 90°).
- 45-45-90 triangle: sides are x, x, x√2.
- SOHCAHTOA: sin = opposite/hypotenuse, cos = adjacent/hypotenuse, tan = opposite/adjacent.
- sin²θ + cos²θ = 1 (Pythagorean identity).
- Complementary angles (add to 90°): sin(x) = cos(90°-x).
- Arc length = (θ/360) × 2πr. Sector area = (θ/360) × πr².
- Inscribed angle = half the central angle that subtends the same arc.
- A tangent line is perpendicular to the radius at the point of tangency.
- Similar triangles: corresponding sides are proportional. AA similarity criterion.
- Midpoint formula: ((x1+x2)/2, (y1+y2)/2).
- Distance formula: √((x2-x1)² + (y2-y1)²).
- Circle equation: (x-h)² + (y-k)² = r². Center is (h,k), radius is r.
- To find center/radius from general form: complete the square for both x and y.
- Parallel lines cut by transversal: alternate interior angles equal, corresponding angles equal, co-interior angles supplementary.
- Sum of interior angles of n-gon: (n-2) × 180°.

═══ HOW TO SOLVE SAT MATH PROBLEMS ═══
When a student gives you a math problem:
1. Identify what type of problem it is (algebra, geometry, etc.)
2. Write out the key information given
3. Show every step clearly, labeled
4. Double-check by plugging answer back in
5. State the final answer clearly
6. Explain WHY each step works, not just what to do

Example approach for word problems:
- Define variables first
- Write equations from the words
- Solve systematically
- Check if the answer makes sense in context

═══ SAT READING & WRITING ═══

INFORMATION & IDEAS:
- Main idea questions: the correct answer is broad enough to cover the whole passage, not too narrow or too broad.
- Detail questions: the answer must be directly stated, not inferred.
- Inference questions: must be strongly supported by the text. If you have to stretch, it's wrong.
- Evidence questions: the cited lines must directly support the answer to the previous question.
- Quantitative data questions: read graphs/charts carefully. The answer must match what the data actually shows.

CRAFT & STRUCTURE:
- Vocabulary in context: substitute each answer choice into the sentence. The correct one fits the meaning AND tone.
- Don't pick a definition just because it's a common meaning of the word — context is everything.
- Text structure: identify if the passage is compare/contrast, cause/effect, problem/solution, chronological, or argumentative.
- Author's purpose: informative, persuasive, narrative, or explanatory.
- Cross-text connections: identify agreement, disagreement, or how one text builds on the other.

EXPRESSION OF IDEAS:
- Transitions: but/however/yet = contrast. Therefore/thus/consequently = cause-effect. Furthermore/moreover/additionally = addition. For example/for instance = illustration.
- The transition must match the LOGICAL relationship between the two ideas.
- Rhetorical synthesis: the correct answer uses the provided notes to achieve the stated goal. Check every word of the goal.
- Relevance: if a sentence doesn't support the main point of the paragraph, it should be deleted.

STANDARD ENGLISH CONVENTIONS:
- Subject-verb agreement: find the real subject (ignore prepositional phrases in between).
- Pronoun agreement: pronoun must agree with its antecedent in number and gender.
- Apostrophes: 's = possession. s' = plural possession. it's = it is. its = possession.
- Commas with independent clauses: need FANBOYS conjunction (for, and, nor, but, or, yet, so).
- Semicolons: connect two independent clauses. No conjunction needed.
- Colons: introduce a list, explanation, or elaboration. What comes before must be a complete sentence.
- Dashes: can replace commas, colons, or parentheses for emphasis.
- Modifiers: a modifier must be next to what it modifies. Dangling modifiers are wrong.
- Parallel structure: items in a list must have the same grammatical form.
- Verb tense: must be consistent with the time frame established in the passage.

═══ SAT VOCABULARY (HIGH-FREQUENCY WORDS) ═══
When asked about vocabulary, give the definition, etymology if helpful, and an example sentence.
Key categories: words meaning to criticize (censure, castigate, reprove), words meaning brief (terse, laconic, concise), words meaning to praise (laud, extol, commend), words meaning uncertain (ambiguous, equivocal, dubious), words meaning to reduce (mitigate, alleviate, assuage), words meaning abundant (copious, prolific, plentiful), words meaning stubborn (obstinate, intransigent, recalcitrant), words meaning clever (astute, shrewd, perspicacious).

═══ STRATEGY ═══
- Process of elimination: eliminate answers with extreme language (always, never, completely) unless the passage uses that language.
- On hard questions: don't overthink. The SAT rewards students who stick to what the text says.
- Time management: R&W ~70 seconds per question. Math ~95 seconds per question. Skip and return if stuck.
- On adaptive tests: do your best on Module 1 — it determines if you get the harder (higher-scoring) Module 2.
- For grid-in math: there is no penalty, so always enter your best answer.

═══ YOUR ROLE ═══
- Solve every math problem shown to you step by step with complete accuracy.
- For R&W questions, explain the reasoning and eliminate wrong answers.
- Be encouraging but precise — wrong answers must be corrected kindly but clearly.
- If a student gets something wrong, explain the concept fully before moving on.
- Keep responses focused. Use numbered steps for math. Use clear paragraphs for verbal.

═══ SCOPE ═══
Only help with SAT Math, Reading & Writing, vocabulary, strategy, score interpretation, and AscendSAT app features. For anything else, warmly redirect: "I'm here specifically to help you prep for the SAT! 📚 What are you working on?"`,
          },
          ...newMessages.map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content })),
        ],
      }),
    });

    const data = await response.json();
console.log("Groq response:", JSON.stringify(data));
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response. Try again!";
    setBotMessages(prev => [...prev, { role: "assistant", content: reply }]);
  } catch (e) {
    setBotMessages(prev => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }]);
  }

  setBotLoading(false);
  setTimeout(() => botScrollRef.current?.scrollToEnd({ animated: true }), 100);
};
const submitFeedback = async () => {
  if (!feedbackRating || !feedbackText.trim()) return;
  setFeedbackSending(true);
  try {
    await addDoc(collection(db, "feedback"), {
      userId: userId || "anonymous",
      userEmail: email || "anonymous",
      rating: feedbackRating,
      category: feedbackCategory,
      text: feedbackText.trim(),
      createdAt: serverTimestamp(),
    });
    setFeedbackSent(true);
    setFeedbackText("");
    setFeedbackRating(0);
  } catch (e) {
    console.log("Feedback error:", e.message);
  }
  setFeedbackSending(false);
};

const loadAdminFeedback = async () => {
  setAdminFeedbackLoading(true);
  try {
    const q = query(collection(db, "feedback"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    setAdminFeedbackList(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
  } catch (e) {
    console.log("Load feedback error:", e.message);
  }
  setAdminFeedbackLoading(false);
};
  const sendHelp = async () => {
    if (!helpMessage.trim()) return;
    setHelpSending(true);
    try {
      await addDoc(collection(db, "helpRequests"), {
        userId,
        userEmail: email,
        message: helpMessage,
        hasImage: !!helpImage,
        imageBase64: helpImage ? helpImage.base64 : null,
        createdAt: serverTimestamp(),
      });

      await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: { student_email: email, message: helpMessage },
        }),
      });

      setHelpSent(true);
      setHelpMessage("");
      setHelpImage(null);
    } catch (e) {
      Alert.alert("Error", "Failed to send. Please try again.");
    }
    setHelpSending(false);
  };

  /* ---------------- AUTH ---------------- */

  const handleError = (e) => {
    let msg = "Something went wrong";
    if (e.code === "auth/email-already-in-use") msg = "Email already in use";
    else if (e.code === "auth/invalid-email") msg = "Invalid email";
    else if (e.code === "auth/weak-password") msg = "Weak password";
    else if (e.code === "auth/user-not-found") msg = "No account found";
    else if (e.code === "auth/invalid-credential") msg = "Incorrect password";
    setError(msg);
  };
/* ---------------- DIAGNOSTIC HELPERS ---------------- */

  const getBarLabel = (bars) => {
    if (bars <= 2) return { label: "Needs Work", color: "#ff4d4d", priority: 3 };
    if (bars <= 4) return { label: "Developing", color: "#f5c518", priority: 2 };
    if (bars <= 6) return { label: "Proficient", color: "#60a5fa", priority: 1 };
    return { label: "Strong", color: "#4caf50", priority: 0 };
  };

  const generateStudyPlan = () => {
    const domainMap = [
      { key: "algebra", name: "Algebra", section: "Math" },
      { key: "advancedMath", name: "Advanced Math", section: "Math" },
      { key: "dataAnalysis", name: "Problem Solving and Data Analysis", section: "Math" },
      { key: "geometry", name: "Geometry & Trigonometry", section: "Math" },
      { key: "infoIdeas", name: "Information and Ideas", section: "Reading & Writing" },
      { key: "craftStructure", name: "Craft & Structure", section: "Reading & Writing" },
      { key: "expressionIdeas", name: "Expression of Ideas", section: "Reading & Writing" },
      { key: "englishConventions", name: "Standard English Conventions", section: "Reading & Writing" },
    ];

    const mathScore = Number(diagMathScore);
    const rwScore = Number(diagRWScore);
    const total = mathScore + rwScore;
    const targetScore = userProfile?.targetScore || 1200;
    const pointsNeeded = Math.max(0, targetScore - total);
    const daysLeft = userProfile?.testDate ? daysUntil(userProfile.testDate) : null;
    const weeksLeft = daysLeft ? Math.floor(daysLeft / 7) : null;

    // Pull practice history accuracy per domain
    const historyAccuracy = {};
    domainMap.forEach(d => {
      let attempted = 0, correct = 0;
      scoreHistory.forEach(entry => {
        if (!entry.questions) return;
        entry.questions.forEach(q => {
          if (q.domain === d.name) {
            attempted++;
            if (q.userAnswer === q.correctAnswer) correct++;
          }
        });
      });
      historyAccuracy[d.key] = attempted > 0 ? { attempted, accuracy: Math.round((correct / attempted) * 100) } : null;
    });

    const scored = domainMap.map(d => {
      const hist = historyAccuracy[d.key];
      // Blend bar rating with actual practice accuracy if available
      let effectiveBars = diagBars[d.key];
      if (hist && hist.attempted >= 5) {
        // If practice accuracy is lower than bar suggests, drag score down
        const impliedBars = Math.ceil((hist.accuracy / 100) * 7);
        effectiveBars = Math.round((effectiveBars + impliedBars) / 2);
      }
      return {
        ...d,
        bars: diagBars[d.key],
        effectiveBars,
        hist,
        ...getBarLabel(effectiveBars),
      };
    }).sort((a, b) => b.priority - a.priority);

    const weakest = scored.filter(d => d.priority >= 2);
    const developing = scored.filter(d => d.priority === 1);
    const strong = scored.filter(d => d.priority === 0);

    // Determine pacing label
    let paceLabel = "";
    let daysPerWeekRec = 5;
    if (daysLeft === null) {
      paceLabel = "No test date set; practice consistently at your own pace.";
      daysPerWeekRec = 5;
    } else if (daysLeft <= 14) {
      paceLabel = "🚨 Your test is in 2 weeks or less. Go into final review mode. Focus only on your weakest domains and do 1–2 full practice sections.";
      daysPerWeekRec = 7;
    } else if (daysLeft <= 30) {
      paceLabel = "⚡ You have about a month. Prioritize weak domains daily and take at least one timed practice test this week.";
      daysPerWeekRec = 6;
    } else if (daysLeft <= 60) {
      paceLabel = "📅 You have 1–2 months. Build strong domain habits now. Work up to full practice tests by week 3.";
      daysPerWeekRec = 5;
    } else {
      paceLabel = "🗓 You have plenty of time. Build mastery domain by domain. Don't rush; quality practice beats quantity.";
      daysPerWeekRec = 4;
    }

    // Score gap context
    let gapContext = "";
    if (pointsNeeded <= 0) {
      gapContext = "You're already at or above your target! Focus on consistency and locking in your strong domains.";
    } else if (pointsNeeded <= 50) {
      gapContext = `You're only ${pointsNeeded} points away from your target of ${targetScore}. Fixing 1–2 weak domains can close this gap.`;
    } else if (pointsNeeded <= 150) {
      gapContext = `You need ${pointsNeeded} more points to hit ${targetScore}. Consistent daily practice across your weakest 3 domains will get you there.`;
    } else {
      gapContext = `You need ${pointsNeeded} points to reach ${targetScore}. That's achievable — students with similar gaps have hit their targets with 2–3 months of focused prep.`;
    }

    // Weekly focus recommendation
    const weeklyFocus = [];
    if (weakest.length > 0) {
      weeklyFocus.push({ days: Math.min(3, daysPerWeekRec - 1), label: `Focus days (${weakest.slice(0, 2).map(d => d.name).join(", ")})`, color: "#ff4d4d", detail: "Easy → Medium drills. Review every wrong answer. Use Casper to explain tough concepts." });
    }
    if (developing.length > 0) {
      weeklyFocus.push({ days: Math.min(2, daysPerWeekRec - (weakest.length > 0 ? 2 : 0)), label: `Build days (${developing.slice(0, 2).map(d => d.name).join(", ")})`, color: "#f5c518", detail: "Medium → Hard drills. Push for speed." });
    }
    weeklyFocus.push({ days: 1, label: "Vocab + mini games", color: "#60a5fa", detail: "Speed Round, Flashcards, or Vocab Quiz. 15–20 mins." });
    if (daysPerWeekRec >= 6) {
      weeklyFocus.push({ days: 1, label: "Full timed section", color: "#4caf50", detail: "Simulate a full SAT module with the timer running. No breaks, no distractions." });
    }

    return {
      scored, weakest, developing, strong,
      mathScore, rwScore, total,
      targetScore, pointsNeeded, daysLeft, weeksLeft,
      paceLabel, gapContext, weeklyFocus, daysPerWeekRec,
      historyAccuracy,
    };
  };

/* ---------------- ADAPTIVE QUIZ HELPERS ---------------- */

  const startAdaptiveQuiz = (section) => {
    setAdaptiveSection(section);
    setAdaptiveCurrentDiff("Medium");
    setAdaptiveStreak(0);
    setAdaptiveScore(0);
    setAdaptiveIndex(0);
    setAdaptiveAnswers({});
    setAdaptiveUserAnswers({});
    setAdaptiveElapsed(0);

    const domains = section === "Math" ? MATH : READING_WRITING;
    const pool = questionBank.filter(q => domains.includes(q.domain) && q.difficulty === "Medium");
    if (pool.length === 0) return;
    const first = pool[Math.floor(Math.random() * pool.length)];
    setAdaptiveQuestions([first]);
    setAdaptivePhase("quiz");

    if (adaptiveTimerRef.current) clearInterval(adaptiveTimerRef.current);
    adaptiveTimerRef.current = setInterval(() => {
      setAdaptiveElapsed(prev => prev + 1);
    }, 1000);
  };

  const getNextAdaptiveQuestion = (currentDiff, wasCorrect, streak, usedQuestions) => {
    let newDiff = currentDiff;
    let newStreak = wasCorrect ? streak + 1 : 0;

    if (wasCorrect && newStreak >= 2) {
      if (currentDiff === "Easy") newDiff = "Medium";
      else if (currentDiff === "Medium") newDiff = "Hard";
      newStreak = 0;
    } else if (!wasCorrect) {
      if (currentDiff === "Hard") newDiff = "Medium";
      else if (currentDiff === "Medium") newDiff = "Easy";
      newStreak = 0;
    }

    const domains = adaptiveSection === "Math" ? MATH : READING_WRITING;
    const usedTexts = new Set(usedQuestions.map(q => q.question));
    const pool = questionBank.filter(q =>
      domains.includes(q.domain) &&
      q.difficulty === newDiff &&
      !usedTexts.has(q.question)
    );

    if (pool.length === 0) {
      const fallback = questionBank.filter(q =>
        domains.includes(q.domain) &&
        !usedTexts.has(q.question)
      );
      if (fallback.length === 0) return { question: null, newDiff, newStreak };
      const q = fallback[Math.floor(Math.random() * fallback.length)];
      return { question: q, newDiff: q.difficulty, newStreak };
    }

    const q = pool[Math.floor(Math.random() * pool.length)];
    return { question: q, newDiff, newStreak };
  };

  const submitAdaptiveAnswer = (answerIndex) => {
    const q = adaptiveQuestions[adaptiveIndex];
    const isCorrect = answerIndex === q.answer;
    const newScore = isCorrect ? adaptiveScore + 1 : adaptiveScore;

    setAdaptiveUserAnswers(prev => ({ ...prev, [adaptiveIndex]: answerIndex }));
    setAdaptiveScore(newScore);

    const newIndex = adaptiveIndex + 1;

    if (newIndex >= ADAPTIVE_TOTAL) {
      if (adaptiveTimerRef.current) clearInterval(adaptiveTimerRef.current);
      setAdaptiveIndex(newIndex);
      setAdaptivePhase("results");
      return;
    }

    const { question: nextQ, newDiff, newStreak } = getNextAdaptiveQuestion(
      adaptiveCurrentDiff,
      isCorrect,
      adaptiveStreak,
      adaptiveQuestions
    );

    setAdaptiveCurrentDiff(newDiff);
    setAdaptiveStreak(newStreak);
    setAdaptiveIndex(newIndex);

    if (nextQ) {
      setAdaptiveQuestions(prev => [...prev, nextQ]);
    } else {
      if (adaptiveTimerRef.current) clearInterval(adaptiveTimerRef.current);
      setAdaptivePhase("results");
    }
  };

  const getAdaptiveEstimatedScore = () => {
    const total = Math.min(adaptiveIndex, adaptiveQuestions.length);
    if (total === 0) return { math: 0, rw: 0, total: 0 };

    let weightedPoints = 0;
    let maxPoints = 0;

    adaptiveQuestions.slice(0, total).forEach((q, i) => {
      const weight = q.difficulty === "Hard" ? 3 : q.difficulty === "Medium" ? 2 : 1;
      maxPoints += weight;
      if (adaptiveUserAnswers[i] === q.answer) weightedPoints += weight;
    });

    const accuracy = maxPoints > 0 ? weightedPoints / maxPoints : 0;
    const rawScore = Math.round(200 + accuracy * 600);
    const clamped = Math.max(400, Math.min(800, rawScore));
    const rounded = Math.round(clamped / 10) * 10;

    return adaptiveSection === "Math"
      ? { math: rounded, rw: null, total: null }
      : { math: null, rw: rounded, total: null };
  };

  /* ---------------- DRILL HELPERS ---------------- */

  const DRILL_TIMES = { Easy: 60, Medium: 45, Hard: 30 };

  const startDrill = (domain, difficulty) => {
    const normalize = (s) => (s || "").toLowerCase().replace(/[&]/g, "and").replace(/\s+/g, " ").trim();
    const filtered = questionBank.filter(q => {
      return normalize(q.domain) === normalize(domain) && q.difficulty === difficulty;
    });
    if (filtered.length === 0) {
      // fallback: partial match
      const fallback = questionBank.filter(q => normalize(q.domain).includes(normalize(domain).split(" ")[0]) && q.difficulty === difficulty);
      if (fallback.length === 0) return;
      const shuffled = [...fallback].sort(() => Math.random() - 0.5).slice(0, 10);
      setDrillQuestions(shuffled);
    } else {
      const shuffled = [...filtered].sort(() => Math.random() - 0.5).slice(0, 10);
      setDrillQuestions(shuffled);
    }
    setDrillIndex(0);
    setDrillAnswer(null);
    setDrillScore(0);
    setDrillFinished(false);
    setDrillDomain(domain);
    setDrillDifficulty(difficulty);
    const t = DRILL_TIMES[difficulty] || 45;
    setDrillTimeLeft(t);
    if (drillTimerRef.current) clearInterval(drillTimerRef.current);
    drillTimerRef.current = setInterval(() => {
      setDrillTimeLeft(prev => {
        if (prev <= 1) { clearInterval(drillTimerRef.current); setDrillAnswer(-1); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const nextDrillQuestion = () => {
    if (drillTimerRef.current) clearInterval(drillTimerRef.current);
    if (drillIndex + 1 >= drillQuestions.length) { setDrillFinished(true); return; }
    setDrillIndex(prev => prev + 1);
    setDrillAnswer(null);
    const t = DRILL_TIMES[drillDifficulty] || 45;
    setDrillTimeLeft(t);
    drillTimerRef.current = setInterval(() => {
      setDrillTimeLeft(prev => {
        if (prev <= 1) { clearInterval(drillTimerRef.current); setDrillAnswer(-1); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  /* ---------------- GAME HELPERS ---------------- */

  const startSpeedRound = () => {
    const shuffled = [...VOCAB_LIST].sort(() => Math.random() - 0.5);
    const word = shuffled[0];
    const wrong = shuffled.slice(1, 4).map(w => w.d);
    setSpeedWord(word);
    setSpeedChoices([word.d, ...wrong].sort(() => Math.random() - 0.5));
    setSpeedScore(0);
    setSpeedTimeLeft(60);
    setSpeedAnswered(false);
    setSpeedCorrect(null);
    if (speedTimerRef.current) clearInterval(speedTimerRef.current);
    speedTimerRef.current = setInterval(() => {
      setSpeedTimeLeft(prev => {
        if (prev <= 1) { clearInterval(speedTimerRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const nextSpeedWord = () => {
    const shuffled = [...VOCAB_LIST].sort(() => Math.random() - 0.5);
    const word = shuffled[0];
    const wrong = shuffled.slice(1, 4).map(w => w.d);
    setSpeedWord(word);
    setSpeedChoices([word.d, ...wrong].sort(() => Math.random() - 0.5));
    setSpeedAnswered(false);
    setSpeedCorrect(null);
  };

  const startMatchGame = () => {
    const sample = [...VOCAB_LIST].sort(() => Math.random() - 0.5).slice(0, 6);
    setMatchWords(sample.map(v => v.w));
    setMatchDefs(sample.map(v => ({ w: v.w, d: v.d })).sort(() => Math.random() - 0.5));
    setMatchSelected(null);
    setMatchSide(null);
    setMatchSolved([]);
    setMatchScore(0);
  };

  const startSentenceGame = () => {
    const shuffled = [...VOCAB_LIST].sort(() => Math.random() - 0.5);
    const word = shuffled[0];
    const wrong = shuffled.slice(1, 4).map(w => w.w);
    setSentenceWord(word);
    setSentenceChoices([word.w, ...wrong].sort(() => Math.random() - 0.5));
    setSentenceSelected(null);
    setSentenceScore(0);
    setSentenceTotal(0);
  };

  const nextSentenceWord = () => {
    const shuffled = [...VOCAB_LIST].sort(() => Math.random() - 0.5);
    const word = shuffled[0];
    const wrong = shuffled.slice(1, 4).map(w => w.w);
    setSentenceWord(word);
    setSentenceChoices([word.w, ...wrong].sort(() => Math.random() - 0.5));
    setSentenceSelected(null);
  };
  
/* WORDLE */
const startWordle = () => {
  const word = VOCAB_LIST[Math.floor(Math.random() * VOCAB_LIST.length)];
  setWordleWord(word);
  setWordleGuesses([]);
  setWordleCurrentGuess("");
  setWordleGameOver(false);
  setWordleWon(false);
  setWordleMessage("");
};

const submitWordleGuess = () => {
  if (!wordleWord) return;
  const target = wordleWord.w.toUpperCase();
  const guess = wordleCurrentGuess.toUpperCase();
  if (guess.length !== target.length) {
    setWordleMessage(`Word must be ${target.length} letters!`);
    return;
  }
  const result = guess.split("").map((letter, i) => {
    if (letter === target[i]) return { letter, status: "correct" };
    if (target.includes(letter)) return { letter, status: "present" };
    return { letter, status: "absent" };
  });
  const newGuesses = [...wordleGuesses, result];
  setWordleGuesses(newGuesses);
  setWordleCurrentGuess("");
  if (guess === target) {
    setWordleWon(true);
    setWordleGameOver(true);
    setWordleMessage("🎉 You got it!");
  } else if (newGuesses.length >= 6) {
    setWordleGameOver(true);
    setWordleMessage(`The word was: ${target}`);
  } else {
    setWordleMessage("");
  }
};

/* BOSS BATTLE */
const startBossBattle = () => {
  const shuffled = [...VOCAB_LIST].sort(() => Math.random() - 0.5);
  const word = shuffled[0];
  const wrong = shuffled.slice(1, 4).map(w => w.d);
  setBossQuestion(word);
  setBossChoices([word.d, ...wrong].sort(() => Math.random() - 0.5));
  setBossAnswered(false);
  setBossCorrect(null);
  setBossHP(100);
  setPlayerHP(100);
  setBossGameOver(false);
  setBossWon(false);
  setBossStreak(0);
};

const nextBossQuestion = () => {
  const shuffled = [...VOCAB_LIST].sort(() => Math.random() - 0.5);
  const word = shuffled[0];
  const wrong = shuffled.slice(1, 4).map(w => w.d);
  setBossQuestion(word);
  setBossChoices([word.d, ...wrong].sort(() => Math.random() - 0.5));
  setBossAnswered(false);
  setBossCorrect(null);
};

/* RAPID FIRE */
const startRapidFire = () => {
  const shuffled = [...VOCAB_LIST].sort(() => Math.random() - 0.5).slice(0, 10);
  const questions = shuffled.map(word => {
    const wrong = [...VOCAB_LIST].filter(w => w.w !== word.w).sort(() => Math.random() - 0.5).slice(0, 3).map(w => w.d);
    return { word, choices: [word.d, ...wrong].sort(() => Math.random() - 0.5) };
  });
  setRapidQuestions(questions);
  setRapidIndex(0);
  setRapidScore(0);
  setRapidTimeLeft(5);
  setRapidAnswered(false);
  setRapidSelected(null);
  setRapidFinished(false);
  if (rapidTimerRef.current) clearInterval(rapidTimerRef.current);
  rapidTimerRef.current = setInterval(() => {
    setRapidTimeLeft(prev => {
      if (prev <= 1) {
        clearInterval(rapidTimerRef.current);
        setRapidAnswered(true);
        setRapidSelected(-1);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
};

const nextRapidQuestion = (currentIndex, currentScore) => {
  if (rapidTimerRef.current) clearInterval(rapidTimerRef.current);
  if (currentIndex + 1 >= 10) {
    setRapidFinished(true);
    return;
  }
  setRapidIndex(currentIndex + 1);
  setRapidAnswered(false);
  setRapidSelected(null);
  setRapidTimeLeft(5);
  rapidTimerRef.current = setInterval(() => {
    setRapidTimeLeft(prev => {
      if (prev <= 1) {
        clearInterval(rapidTimerRef.current);
        setRapidAnswered(true);
        setRapidSelected(-1);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
};

/* TRIVIA PARTY */
const TRIVIA_MILESTONES = [0, 100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000];

const startTriviaParty = () => {
  const shuffled = [...VOCAB_LIST].sort(() => Math.random() - 0.5);
  const word = shuffled[0];
  const wrong = shuffled.slice(1, 4).map(w => w.d);
  setTriviaQuestion(word);
  setTriviaChoices([word.d, ...wrong].sort(() => Math.random() - 0.5));
  setTriviaSelected(null);
  setTriviaScore(0);
  setTriviaTotal(0);
  setTriviaLifelines({ fifty: true, skip: true });
  setTriviaEliminated([]);
  setTriviaMilestone(0);
};

const nextTriviaQuestion = (newMilestone) => {
  const shuffled = [...VOCAB_LIST].sort(() => Math.random() - 0.5);
  const word = shuffled[0];
  const wrong = shuffled.slice(1, 4).map(w => w.d);
  setTriviaQuestion(word);
  setTriviaChoices([word.d, ...wrong].sort(() => Math.random() - 0.5));
  setTriviaSelected(null);
  setTriviaEliminated([]);
};

/* HANGMAN */
const startHangman = () => {
  const word = VOCAB_LIST[Math.floor(Math.random() * VOCAB_LIST.length)];
  setHangmanWord(word);
  setHangmanGuesses([]);
  setHangmanLives(6);
  setHangmanWon(false);
};

const guessLetter = (letter) => {
  if (hangmanGuesses.includes(letter) || hangmanWon || hangmanLives <= 0) return;
  const newGuesses = [...hangmanGuesses, letter];
  setHangmanGuesses(newGuesses);
  const wordLetters = hangmanWord.w.toUpperCase().split("");
  const allGuessed = wordLetters.every(l => newGuesses.includes(l) || l === " " || l === "-");
  if (allGuessed) { setHangmanWon(true); return; }
  if (!wordLetters.includes(letter)) setHangmanLives(prev => prev - 1);
};

/* SCRAMBLE */
const startWordScramble = () => {
  const word = VOCAB_LIST[Math.floor(Math.random() * VOCAB_LIST.length)];
  const letters = word.w.toUpperCase().split("").sort(() => Math.random() - 0.5);
  setScrambleWord(word);
  setScrambleLetters(letters);
  setScrambleSelected([]);
  setScrambleResult(null);
};

const nextScramble = () => {
  const word = VOCAB_LIST[Math.floor(Math.random() * VOCAB_LIST.length)];
  const letters = word.w.toUpperCase().split("").sort(() => Math.random() - 0.5);
  setScrambleWord(word);
  setScrambleLetters(letters);
  setScrambleSelected([]);
  setScrambleResult(null);
};

/* TYPE RACE */
const startTypeRace = () => {
  const word = VOCAB_LIST[Math.floor(Math.random() * VOCAB_LIST.length)];
  setTypeRaceWord(word);
  setTypeRaceInput("");
  setTypeRaceScore(0);
  setTypeRaceTimeLeft(60);
  setTypeRaceResult(null);
  if (typeRaceTimerRef.current) clearInterval(typeRaceTimerRef.current);
  typeRaceTimerRef.current = setInterval(() => {
    setTypeRaceTimeLeft(prev => {
      if (prev <= 1) { clearInterval(typeRaceTimerRef.current); return 0; }
      return prev - 1;
    });
  }, 1000);
};

const nextTypeRaceWord = () => {
  const word = VOCAB_LIST[Math.floor(Math.random() * VOCAB_LIST.length)];
  setTypeRaceWord(word);
  setTypeRaceInput("");
  setTypeRaceResult(null);
};

  /* ---------------- REUSABLE BOOKING MODAL ---------------- */

  const BookingModal = () => (
    <Modal visible={bookingModalVisible} transparent animationType="slide">
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", padding: 20 }}>
        <View style={{ backgroundColor: "#0f1829", borderRadius: 16, padding: 20, borderWidth: 1, borderColor: "#1a2540" }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}>Confirm Booking</Text>
            <TouchableOpacity onPress={() => setBookingModalVisible(false)}>
              <Text style={{ color: "#9aa4c7", fontSize: 20 }}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={{ backgroundColor: "#151c36", borderRadius: 10, padding: 12, marginBottom: 16 }}>
            <Text style={{ color: "#f5c518", fontWeight: "700", fontSize: 15 }}>
              {bookingSelectedClass?.title}
            </Text>
            <Text style={{ color: "#9aa4c7", marginTop: 4 }}>
              {bookingSelectedClass?.date
                ? new Date(bookingSelectedClass.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </Text>
            <Text style={{ color: "#9aa4c7" }}>
              {bookingSelectedClass?.date
                ? new Date(bookingSelectedClass.date).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })
                : ""}
              {bookingSelectedClass?.durationHours ? ` · ${bookingSelectedClass.durationHours}h` : ""}
            </Text>
            <Text style={{ color: bookingSelectedClass?.type === "group" ? "#4caf50" : "#f5c518", fontWeight: "700", marginTop: 4 }}>
              {bookingSelectedClass?.type === "group" ? "FREE" : `$${bookingSelectedClass?.price}`}
            </Text>
          </View>

          <Text style={{ color: "#9aa4c7", fontSize: 13, marginBottom: 6 }}>Your Email</Text>
          <TextInput
            style={[styles.input, { marginBottom: 12 }]}
            value={bookingEmailInput}
            onChangeText={setBookingEmailInput}
            placeholder="Email"
            placeholderTextColor="#555"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={{ color: "#9aa4c7", fontSize: 13, marginBottom: 6 }}>Phone Number (optional)</Text>
          <TextInput
            style={[styles.input, { marginBottom: 12 }]}
            value={bookingPhoneInput}
            onChangeText={setBookingPhoneInput}
            placeholder="e.g. (919) 555-1234"
            placeholderTextColor="#555"
            keyboardType="phone-pad"
          />

          {bookingError ? (
            <Text style={{ color: "#ff4d4d", marginBottom: 10, fontSize: 13 }}>{bookingError}</Text>
          ) : null}

          <TouchableOpacity
            style={[{ backgroundColor: "#f5c518", padding: 14, borderRadius: 12, alignItems: "center" }, bookingSending && { opacity: 0.6 }]}
            onPress={confirmBooking}
            disabled={bookingSending}
          >
            <Text style={{ color: "#070d1f", fontWeight: "700", fontSize: 16 }}>
              {bookingSending ? "Booking..." : "Confirm Booking"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 10, padding: 14, borderRadius: 12, alignItems: "center", backgroundColor: "#1f2a52" }}
            onPress={() => setBookingModalVisible(false)}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

/* ================================================
     LANDING HOOKS (HOISTED TO FIX ERROR)
  ================================================ */

  /* ── Demo question data ── */
  const DEMO_QUESTIONS = [
    {
      domain: "Words in Context",
      difficulty: "Hard",
      question: "As used in the text, what does the word \"ephemeral\" most nearly mean?",
      choices: ["Lasting", "Short-lived", "Vivid", "Mysterious"],
      answer: 1,
      wrongIndex: 0,
      explanation: "\"Ephemeral\" describes something lasting for a very short time. In context, the passage contrasts the \"ephemeral\" beauty of the bloom with its enduring fragrance.",
    },
    {
      domain: "Advanced Math",
      difficulty: "Medium",
      question: "If f(x) = 2x² – 4x + 1, what is the minimum value of f(x)?",
      choices: ["–1", "1", "–3", "0"],
      answer: 0,
      wrongIndex: 2,
      explanation: "The vertex x = –b/2a = 4/4 = 1. f(1) = 2 – 4 + 1 = –1. So the minimum value is –1.",
    },
    {
      domain: "Standard English Conventions",
      difficulty: "Easy",
      question: "Which choice best completes the sentence with correct punctuation?\n\n\"The research team published _____ results were surprising to many.\"",
      choices: ["it's", "its", "their", "its'"],
      answer: 2,
      wrongIndex: 0,
      explanation: "\"Their\" refers back to \"the research team\" (a plural antecedent). \"It's\" = it is; \"its\" is possessive singular; \"its'\" is not a real word.",
    },
  ];

  const demoStateRef = React.useRef({
    phase: "showing", qIdx: 0, showExplanation: false,
  });

  const renderDemo = () => {
    if (Platform.OS !== "web") return;
    const root = document.getElementById("ascend-demo-root");
    if (!root) return;
    const st = demoStateRef.current;
    const q = DEMO_QUESTIONS[st.qIdx];
    const letters = ["A", "B", "C", "D"];
    const diffColor = q.difficulty === "Hard" ? "#dc2626" : q.difficulty === "Medium" ? "#d97706" : "#16a34a";

    root.innerHTML = `
      <div style="background:#0f1829;border-radius:16px;padding:20px 22px;border:1px solid #1a2540;position:relative;overflow:hidden;max-width:480px;margin:0 auto;">
        <div style="position:absolute;top:0;left:0;right:0;height:3px;background:#1a2540;">
          <div class="demo-progress-bar" style="height:3px;background:linear-gradient(90deg,#1d4ed8,#f5c518);border-radius:3px;width:0%;"></div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;padding-top:4px;">
          <div style="display:flex;gap:6px;align-items:center;">
            <span style="background:${diffColor}22;color:${diffColor};font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;">${q.difficulty}</span>
            <span style="color:#64748b;font-size:10px;font-weight:600;">${q.domain}</span>
          </div>
          <div style="display:flex;gap:4px;">
            ${[0,1,2].map(i => `<div style="width:7px;height:7px;border-radius:50%;background:${i===st.qIdx?"#f5c518":"#1a2540"};"></div>`).join("")}
          </div>
        </div>
        <div style="color:#e2e8f0;font-size:13.5px;line-height:1.75;margin-bottom:16px;">${q.question}</div>
        <div style="display:flex;flex-direction:column;gap:7px;">
          ${q.choices.map((c, i) => {
            let bg = "#0d1525", border = "#1e293b", color = "#cbd5e1", extraClass = "", icon = "";
            if (st.phase === "wrong" && i === st.wrongIndex) {
              bg = "#2a0d0d"; border = "#dc2626"; color = "#fca5a5";
              extraClass = "demo-wrong-anim"; icon = '<span style="margin-left:auto;font-size:13px;flex-shrink:0;">❌</span>';
            } else if (st.phase === "explanation" || st.phase === "transitioning") {
              if (i === q.answer) {
                bg = "#0d2a18"; border = "#16a34a"; color = "#4ade80";
                extraClass = "demo-correct-anim"; icon = '<span style="margin-left:auto;font-size:13px;flex-shrink:0;">✅</span>';
              } else if (i === st.wrongIndex) {
                bg = "#2a0d0d"; border = "#dc262633"; color = "#f87171";
                icon = '<span style="margin-left:auto;font-size:13px;flex-shrink:0;">❌</span>';
              }
            }
            const bubbleBg = (st.phase === "wrong" && i === st.wrongIndex) ? "#dc2626" :
                             ((st.phase === "explanation" || st.phase === "transitioning") && i === q.answer) ? "#16a34a" :
                             ((st.phase === "explanation" || st.phase === "transitioning") && i === st.wrongIndex) ? "#dc2626" : "transparent";
            const bubbleBorder = border === "#1e293b" ? "#334155" : border;
            return `<div class="${extraClass}" style="display:flex;align-items:center;gap:10px;background:${bg};border:1.5px solid ${border};border-radius:9px;padding:10px 12px;transition:all 0.2s;">
              <div style="width:26px;height:26px;border-radius:13px;border:2px solid ${bubbleBorder};background:${bubbleBg};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <span style="color:${bubbleBg !== "transparent" ? "#fff" : color};font-weight:700;font-size:11px;">${letters[i]}</span>
              </div>
              <span style="color:${color};font-size:12.5px;line-height:1.5;flex:1;">${c}</span>
              ${icon}
            </div>`;
          }).join("")}
        </div>
        ${st.showExplanation ? `
        <div class="demo-explanation-anim" style="margin-top:12px;background:#0a1f12;border-radius:10px;padding:11px;border:1px solid #1a4a2a;">
          <div style="color:#22c55e;font-weight:700;font-size:11px;margin-bottom:3px;">💡 Why the correct answer works</div>
          <div style="color:#94a3b8;font-size:11.5px;line-height:1.6;">${q.explanation}</div>
        </div>` : ""}
        <div style="margin-top:10px;display:flex;align-items:center;gap:6px;">
          <div style="width:5px;height:5px;border-radius:50%;background:#3b82f6;" class="ascend-dot"></div>
          <div style="width:5px;height:5px;border-radius:50%;background:#3b82f6;" class="ascend-dot"></div>
          <div style="width:5px;height:5px;border-radius:50%;background:#3b82f6;" class="ascend-dot"></div>
          <span style="color:#64748b;font-size:10px;margin-left:4px;">Live demo · auto-running</span>
          <span style="margin-left:auto;color:#f5c518;font-size:11px;font-weight:700;">Q${st.qIdx+1} of 3</span>
        </div>
      </div>
    `;
  };

  React.useEffect(() => {
    if (Platform.OS !== "web" || screen !== "landing") return;
    let timer;
    const run = () => {
      const el = document.getElementById("ascend-demo-root");
      if (!el) { timer = setTimeout(run, 400); return; }
      renderDemo();
    };
    timer = setTimeout(run, 600);
    return () => clearTimeout(timer);
  }, [screen]);

  React.useEffect(() => {
    if (Platform.OS !== "web" || screen !== "landing") return;
    const st = demoStateRef.current;
    let t1, t2, t3, t4;
    const cycle = () => {
      const q = DEMO_QUESTIONS[st.qIdx];
      const wrongOptions = q.choices.map((_, i) => i).filter(i => i !== q.answer);
      st.wrongIndex = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
      st.phase = "showing"; st.showExplanation = false;
      renderDemo();
      t1 = setTimeout(() => {
        st.phase = "wrong"; renderDemo();
        t2 = setTimeout(() => {
          st.phase = "explanation"; st.showExplanation = true; renderDemo();
          t3 = setTimeout(() => {
            st.phase = "transitioning"; renderDemo();
            t4 = setTimeout(() => {
              st.qIdx = (st.qIdx + 1) % DEMO_QUESTIONS.length;
              cycle();
            }, 800);
          }, 3000);
        }, 1000);
      }, 1600);
    };
    const init = setTimeout(cycle, 600);
    return () => { clearTimeout(init); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [screen]);

  /* ── Try-it-yourself interactive quiz ── */
  const TRY_IT_QUESTIONS = [
    {
      domain: "Words in Context",
      difficulty: "Medium",
      question: "The scientist's findings were considered ________ by her peers; they contradicted decades of established research and forced the field to reconsider its foundational assumptions.",
      choices: ["redundant", "controversial", "trivial", "predictable"],
      answer: 1,
      explanation: "\"Controversial\" means causing disagreement or debate. Since the findings contradicted decades of research and forced the field to reconsider, they would spark debate — not be redundant (repetitive), trivial (unimportant), or predictable."
    },
    {
      domain: "Advanced Math",
      difficulty: "Medium",
      question: "If f(x) = 3x² − 12x + 7, what is the minimum value of f(x)?",
      choices: ["−5", "7", "2", "−12"],
      answer: 0,
      explanation: "The vertex x-coordinate is −b/2a = 12/6 = 2. Then f(2) = 3(4) − 12(2) + 7 = 12 − 24 + 7 = −5. So the minimum value is −5."
    },
    {
      domain: "Standard English Conventions",
      difficulty: "Easy",
      question: "The committee members submitted ________ reports before the deadline, each covering a different aspect of the budget proposal.",
      choices: ["it's", "their", "there", "they're"],
      answer: 1,
      explanation: "\"Their\" is the possessive pronoun referring to \"the committee members.\" \"It's\" = it is, \"there\" = a place, and \"they're\" = they are — none of those fit here."
    }
  ];

  const tryItStateRef = React.useRef({ answers: {}, revealed: {} });

  const renderTryIt = () => {
    if (Platform.OS !== "web") return;
    const root = document.getElementById("ascend-tryit-root");
    if (!root) return;
    const st = tryItStateRef.current;
    
    root.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:16px;">
        ${TRY_IT_QUESTIONS.map((q, qi) => {
          const selected = st.answers[qi];
          const revealed = st.revealed[qi];
          const diffColor = q.difficulty === "Hard" ? "#dc2626" : q.difficulty === "Medium" ? "#d97706" : "#16a34a";
          const letters = ["A","B","C","D"];
          return `
            <div style="background:#0f1829;border-radius:16px;padding:24px 24px 20px;border:1px solid #1e293b;">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">
                <span style="background:${diffColor}18;color:${diffColor};font-size:10px;font-weight:700;padding:2px 10px;border-radius:20px;letter-spacing:0.3px;">${q.difficulty}</span>
                <span style="color:#64748b;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">${q.domain}</span>
                <span style="margin-left:auto;color:#475569;font-size:10px;font-weight:500;">Q${qi+1} of 3</span>
              </div>
              <div style="color:#f1f5f9;font-size:15px;line-height:1.8;margin-bottom:20px;font-weight:400;">${q.question}</div>
              <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px;">
                ${q.choices.map((c, ci) => {
                  let bg = "#0d1525", border = "#1e293b", textColor = "#cbd5e1", icon = "";
                  let bubbleBg = "transparent", bubbleBorder = "#334155", bubbleTextColor = "#94a3b8";
                  if (revealed !== undefined) {
                    if (ci === q.answer) {
                      bg = "#0d2a18"; border = "#16a34a"; textColor = "#4ade80"; icon = " ✅";
                      bubbleBg = "#16a34a"; bubbleBorder = "#16a34a"; bubbleTextColor = "#fff";
                    } else if (ci === selected && ci !== q.answer) {
                      bg = "#2a0d0d"; border = "#dc2626"; textColor = "#f87171"; icon = " ❌";
                      bubbleBg = "#dc2626"; bubbleBorder = "#dc2626"; bubbleTextColor = "#fff";
                    }
                  } else if (selected === ci) {
                    bg = "#0c1830"; border = "#2563eb"; textColor = "#93c5fd";
                    bubbleBg = "#2563eb"; bubbleBorder = "#2563eb"; bubbleTextColor = "#fff";
                  }
                  const disabled = revealed !== undefined ? "pointer-events:none;" : "";
                  return `<div onclick="window.__tryItAnswer(${qi},${ci})" style="${disabled}display:flex;align-items:center;gap:12px;background:${bg};border:1.5px solid ${border};border-radius:10px;padding:12px 14px;cursor:${revealed!==undefined?"default":"pointer"};transition:border-color 0.15s,background 0.15s;">
                    <div style="width:30px;height:30px;min-width:30px;border-radius:15px;border:2px solid ${bubbleBorder};display:flex;align-items:center;justify-content:center;background:${bubbleBg};">
                      <span style="color:${bubbleTextColor};font-weight:700;font-size:12px;">${letters[ci]}</span>
                    </div>
                    <span style="color:${textColor};font-size:14px;line-height:1.55;flex:1;">${c}${icon}</span>
                  </div>`;
                }).join("")}
              </div>
              ${selected !== undefined && revealed === undefined ? `
                <button onclick="window.__tryItReveal(${qi})" style="width:100%;background:#2563eb;color:#fff;border:none;padding:13px;border-radius:10px;font-weight:700;font-size:14px;cursor:pointer;letter-spacing:0.1px;">
                  Check Answer →
                </button>` : ""}
              ${revealed !== undefined ? `
                <div style="background:${selected===q.answer?"#0a1f12":"#1a0808"};border-radius:12px;padding:14px 16px;border:1px solid ${selected===q.answer?"#1a4a2a":"#3a1010"};margin-top:2px;">
                  <div style="color:${selected===q.answer?"#22c55e":"#f87171"};font-weight:800;font-size:14px;margin-bottom:6px;">
                    ${selected===q.answer?"🎉 Correct! Great work.":"❌ Not quite — here's why:"}
                  </div>
                  <div style="color:#94a3b8;font-size:13px;line-height:1.7;">${q.explanation}</div>
                </div>` : ""}
            </div>
          `;
        }).join("")}
        <div style="background:#0a1428;border-radius:16px;padding:24px;border:1px solid #1e293b;text-align:center;">
          <div style="color:#f5c518;font-weight:900;font-size:17px;margin-bottom:8px;">Want hundreds more questions?</div>
          <div style="color:#64748b;font-size:13px;margin-bottom:18px;line-height:1.6;">Create a free account and unlock all 8 SAT domains with instant AI explanations.</div>
          <button onclick="window.__tryItSignup()" style="background:#f5c518;color:#070d1f;border:none;padding:14px 32px;border-radius:10px;font-weight:900;font-size:15px;cursor:pointer;">
            Start Free →
          </button>
        </div>
      </div>
    `;

    window.__tryItAnswer = (qi, ci) => {
      if (tryItStateRef.current.revealed[qi] !== undefined) return;
      tryItStateRef.current.answers[qi] = ci;
      renderTryIt();
    };
    window.__tryItReveal = (qi) => {
      tryItStateRef.current.revealed[qi] = true;
      renderTryIt();
    };
    window.__tryItSignup = () => {
      setTimeout(() => {
        setError("");
        setScreen("register");
      }, 0);
    };
  };

  React.useEffect(() => {
    if (Platform.OS !== "web" || screen !== "landing") return;
    let t;
    const run = () => {
      const el = document.getElementById("ascend-tryit-root");
      if (!el) { t = setTimeout(run, 400); return; }
      renderTryIt();
    };
    t = setTimeout(run, 700);
    return () => clearTimeout(t);
  }, [screen]);

  /* ================================================
     LANDING
  ================================================ */

if (screen === "landing") {

  /* ── Web-only CSS injection for premium animations ── */
  if (Platform.OS === "web") {
    const styleId = "ascend-premium-css";
    if (!document.getElementById(styleId)) {
      const s = document.createElement("style");
      s.id = styleId;
      s.textContent = `
        @keyframes floatA { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-22px) scale(1.07)} }
        @keyframes floatB { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(18px) scale(0.94)} }
        @keyframes floatC { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-14px) scale(1.04)} }
        @keyframes tickerScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes pulseGlow { 0%,100%{box-shadow:0 0 0 0 rgba(245,197,24,0.25)} 50%{box-shadow:0 0 32px 8px rgba(245,197,24,0.18)} }
        @keyframes shakeX { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
        @keyframes wrongFlash { 0%{background:#fef2f2} 50%{background:#fee2e2} 100%{background:#fef2f2} }
        @keyframes correctPop { 0%{transform:scale(1)} 50%{transform:scale(1.04)} 100%{transform:scale(1)} }
        @keyframes explanationSlide { 0%{opacity:0;transform:translateY(12px)} 100%{opacity:1;transform:translateY(0)} }
        @keyframes cardFloat { 0%,100%{transform:translateY(0) rotateX(0deg)} 50%{transform:translateY(-6px) rotateX(1deg)} }
        @keyframes sectionFadeUp { 0%{opacity:0;transform:translateY(40px)} 100%{opacity:1;transform:translateY(0)} }
        @keyframes charReveal { 0%{opacity:0;transform:translateY(20px) scaleX(0.8)} 100%{opacity:1;transform:translateY(0) scaleX(1)} }
        @keyframes glowBreath { 0%,100%{opacity:0.35} 50%{opacity:0.8} }
        @keyframes progressBar { 0%{width:0%} 100%{width:100%} }
        @keyframes dotBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes testimonialIn { 0%{opacity:0;transform:perspective(800px) rotateY(-18deg) translateX(-30px) scale(0.92)} 100%{opacity:1;transform:perspective(800px) rotateY(0deg) translateX(0) scale(1)} }

        .ascend-orb-a { animation: floatA 4.2s ease-in-out infinite; }
        .ascend-orb-b { animation: floatB 5.8s ease-in-out infinite; }
        .ascend-orb-c { animation: floatC 3.9s ease-in-out infinite 0.6s; }
        .ascend-ticker-inner { animation: tickerScroll 22s linear infinite; }
        .ascend-cta-pulse { animation: pulseGlow 2.2s ease-in-out infinite; }
        .ascend-section { opacity:0; transform:translateY(40px); transition:opacity 0.7s ease, transform 0.7s ease; }
        .ascend-section.visible { opacity:1; transform:translateY(0); }
        .ascend-section-delay-1 { transition-delay:0.1s; }
        .ascend-section-delay-2 { transition-delay:0.18s; }
        .ascend-section-delay-3 { transition-delay:0.26s; }
        .ascend-section-delay-4 { transition-delay:0.34s; }
        .ascend-section-delay-5 { transition-delay:0.42s; }
        .ascend-section-delay-6 { transition-delay:0.5s; }

        .demo-wrong-anim { animation: shakeX 0.45s ease, wrongFlash 0.45s ease; }
        .demo-correct-anim { animation: correctPop 0.35s ease; }
        .demo-explanation-anim { animation: explanationSlide 0.5s ease forwards; }
        .demo-progress-bar { animation: progressBar 2.8s linear forwards; }
        .ascend-dot { animation: dotBounce 1.2s ease-in-out infinite; }
        .ascend-dot:nth-child(2) { animation-delay:0.2s; }
        .ascend-dot:nth-child(3) { animation-delay:0.4s; }

        .practice-card { 
          transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.28s ease, border-color 0.2s ease; 
          cursor: pointer;
          transform-origin: center bottom;
        }
        .practice-card:hover { 
          transform: translateY(-8px) rotateX(2deg) scale(1.025); 
          box-shadow: 0 20px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(245,197,24,0.3); 
        }

        .feature-card-3d {
          transition: transform 0.3s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.3s ease;
          transform-style: preserve-3d;
        }
        .feature-card-3d:hover {
          transform: perspective(600px) rotateX(3deg) rotateY(-3deg) translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.3);
        }

        .faq-item { overflow:hidden; }
        .faq-answer { 
          max-height:0; 
          overflow:hidden; 
          transition: max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease, transform 0.4s ease; 
          opacity:0; 
          transform:translateY(-8px);
        }
        .faq-answer.open { max-height:300px; opacity:1; transform:translateY(0); }
        .faq-question { 
          cursor:pointer; 
          user-select:none; 
          transition: color 0.2s ease;
        }
        .faq-question:hover { color: #f5c518 !important; }
        .faq-chevron { 
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), color 0.2s ease; 
          display:inline-block; 
        }
        .faq-chevron.open { transform: rotate(180deg); }

        .testimonial-card-wrap {
          scroll-snap-align: center;
          flex-shrink: 0;
          transition: transform 0.5s cubic-bezier(0.34,1.2,0.64,1), opacity 0.5s ease;
        }
        .testimonial-card-wrap.active-testi { transform: scale(1.04) translateY(-4px); opacity:1; }
        .testimonial-card-wrap.inactive-testi { transform: scale(0.93) translateY(4px); opacity:0.55; }

        .sticky-header-land {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          background: rgba(7,13,31,0.82);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          transform: translateY(-100%);
          transition: transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease;
          opacity: 0;
          pointer-events: none;
        }
        .sticky-header-land.show { transform: translateY(0); opacity:1; pointer-events: all; }
        .sticky-header-land-light {
          background: rgba(244,245,247,0.9);
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }

        .parallax-bg { will-change: transform; }
        .gpu { will-change: transform, opacity; }

        .char-reveal span {
          display: inline-block;
          opacity: 0;
          transform: translateY(20px) scaleX(0.85);
          animation: charReveal 0.45s cubic-bezier(0.34,1.4,0.64,1) forwards;
        }
        .line2-gold span { color: #f5c518; }

        .domain-pill { 
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease, border-color 0.2s ease;
        }
        .domain-pill:hover { transform: translateY(-3px) scale(1.05); box-shadow: 0 6px 20px rgba(0,0,0,0.2); }

        .step-connector {
          transform-origin: top;
          transform: scaleY(0);
          transition: transform 0.6s cubic-bezier(0.4,0,0.2,1);
        }
        .step-connector.drawn { transform: scaleY(1); }
        .step-num-bubble {
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
        }
        .step-num-bubble:hover { transform: scale(1.1); }

        .score-badge-land {
          animation: pulseGlow 2.5s ease-in-out infinite;
        }

        @keyframes domainLTR { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes domainRTL { 0%{transform:translateX(-50%)} 100%{transform:translateX(0)} }
        .ascend-domain-ticker-ltr { animation: domainLTR 28s linear infinite; }
        .ascend-domain-ticker-rtl { animation: domainRTL 32s linear infinite; }

        @media (max-width:600px) {
          .practice-card:hover { transform: none; box-shadow: none; }
          .feature-card-3d:hover { transform: none; }
        }
        
        @keyframes testiScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        #testi-track { animation: testiScroll 20s linear infinite; }
        #testi-track:hover { animation-play-state: paused; }
      `;
      document.head.appendChild(s);
    }

    // ── Re-run observers and handlers every time landing renders ──
    const setupObservers = () => {
      // Intersection observer for scroll-reveal
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); } });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      document.querySelectorAll(".ascend-section").forEach(el => {
        el.classList.remove("visible");
        io.observe(el);
      });

      // Sticky header on scroll
      const existingScrollHandler = window.__ascendScrollHandler;
      if (existingScrollHandler) window.removeEventListener("scroll", existingScrollHandler, { passive: true });
      const onScroll = () => {
        const h = document.querySelector(".sticky-header-land");
        if (!h) return;
        if (window.scrollY > 80) h.classList.add("show"); else h.classList.remove("show");
      };
      window.__ascendScrollHandler = onScroll;
      window.addEventListener("scroll", onScroll, { passive: true });

      // Step connectors on scroll
      const stepIO = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const connectors = e.target.querySelectorAll(".step-connector");
            connectors.forEach((c, i) => {
              setTimeout(() => c.classList.add("drawn"), i * 320);
            });
          }
        });
      }, { threshold: 0.3 });
      const stepsSection = document.querySelector(".ascend-steps-section");
      if (stepsSection) stepIO.observe(stepsSection);

      // FAQ accordion
      document.querySelectorAll(".faq-question").forEach(q => {
        q.replaceWith(q.cloneNode(true)); // remove old listeners
      });
      document.querySelectorAll(".faq-question").forEach(q => {
        q.addEventListener("click", () => {
          const item = q.closest(".faq-item");
          const answer = item.querySelector(".faq-answer");
          const chevron = q.querySelector(".faq-chevron");
          const isOpen = answer.classList.contains("open");
          document.querySelectorAll(".faq-answer").forEach(a => a.classList.remove("open"));
          document.querySelectorAll(".faq-chevron").forEach(c => c.classList.remove("open"));
          if (!isOpen) { answer.classList.add("open"); chevron.classList.add("open"); }
        });
      });

      // Scroll to top
      window.scrollTo(0, 0);
    };

    setTimeout(setupObservers, 100);

  /* ── Practice cards data ── */
  const PRACTICE_CARDS = [
    { domain: "Algebra", difficulty: "Easy", icon: "📐", color: "#3b82f6", bg: "#0c1a2e", border: "#1a3060", preview: "Solve for x: 3x + 7 = 22" },
    { domain: "Words in Context", difficulty: "Hard", icon: "📚", color: "#a78bfa", bg: "#0e0c1a", border: "#2d1f4e", preview: "What does \"ephemeral\" most nearly mean?" },
    { domain: "Data Analysis", difficulty: "Medium", icon: "📊", color: "#f5c518", bg: "#1a1200", border: "#3a2a00", preview: "The table shows survey results..." },
    { domain: "Expression of Ideas", difficulty: "Medium", icon: "✍️", color: "#4ade80", bg: "#0c1a10", border: "#1a4a20", preview: "Which choice best combines the sentences?" },
  ];

  const light = isLight;
  const FEATURES = [
    { icon: "📘", title: "Real SAT Question Bank", desc: "Hundreds of official SAT questions sorted by domain, difficulty, and type.", color: "#3b82f6", bg: light?"#eff6ff":"#0c1a2e" },
    { icon: "🤖", title: "Casper AI Tutor", desc: "Your 24/7 SAT expert. Step-by-step answers instantly.", color: "#a78bfa", bg: light?"#faf5ff":"#120c2a" },
    { icon: "⚡", title: "Timed Drills", desc: "Per-question countdown timers. Build speed under exam pressure.", color: "#f5c518", bg: light?"#fffbeb":"#1a1400" },
    { icon: "📊", title: "Growth Tracking", desc: "See your accuracy by domain across every quiz.", color: "#4ade80", bg: light?"#f0fdf4":"#0c1a10" },
    { icon: "🎯", title: "Diagnostic + Study Plan", desc: "Personalized weekly roadmap tailored to your test date.", color: "#fb923c", bg: light?"#fff7ed":"#1a0e00" },
    { icon: "🎮", title: "Mini Games", desc: "Speed Round, Boss Battle, Wordle — vocab practice made fun.", color: "#f87171", bg: light?"#fff1f2":"#160c0c" },
  ];

  const STEPS = [
    { n: "01", title: "Create your free account", desc: "Set your target score and test date in 60 seconds.", color: "#f5c518" },
    { n: "02", title: "Practice every day", desc: "Choose domains, difficulty, and count. Instant feedback.", color: "#60a5fa" },
    { n: "03", title: "Track your growth", desc: "Watch accuracy rise domain by domain.", color: "#4ade80" },
    { n: "04", title: "Join free live classes", desc: "Live sessions with your expert tutor, always free.", color: "#a78bfa" },
  ];

  const FAQ_ITEMS = [
    { q: "Is AscendSAT really free?", a: "Yes — 100% free, forever. The app, question bank, AI bot, and all group classes are free. No credit card, no trial period, no hidden fees." },
    { q: "What SAT sections does it cover?", a: "All 8 domains — 4 Math and 4 Reading & Writing — at Easy, Medium, and Hard difficulty levels." },
    { q: "How are the group classes structured?", a: "Live sessions led by an expert SAT tutor. Free to join, open to all students, covering specific SAT topics." },
    { q: "How is this different from Khan Academy?", a: "AscendSAT combines a question bank, AI tutor, live classes, drills, vocab games, and growth tracking — built by an actual SAT tutor who scored 1550." },
    { q: "Can I use this alongside another prep program?", a: "Absolutely. AscendSAT complements any other prep. Use it for daily practice, vocabulary, or to fill gaps your other program misses." },
  ];

  const DOMAINS_GRID = [
    { name: "Algebra", section: "Math", color: "#3b82f6" },
    { name: "Advanced Math", section: "Math", color: "#3b82f6" },
    { name: "Problem Solving & Data", section: "Math", color: "#3b82f6" },
    { name: "Geometry & Trig", section: "Math", color: "#3b82f6" },
    { name: "Information & Ideas", section: "R&W", color: "#4ade80" },
    { name: "Craft & Structure", section: "R&W", color: "#4ade80" },
    { name: "Expression of Ideas", section: "R&W", color: "#4ade80" },
    { name: "English Conventions", section: "R&W", color: "#4ade80" },
  ];

  const TICKER_ITEMS = ["FREE SAT PREP", "1550 SCORE", "AI TUTOR", "LIVE CLASSES", "ALL 8 DOMAINS", "DESMOS BUILT IN", "ADAPTIVE QUIZ", "VOCAB GAMES", "100+ STUDENTS"];

  const bgBase = light ? "#f4f5f7" : "#070d1f";
  const cardBgL = light ? "#fff" : "#0f1829";
  const textL = light ? "#0f172a" : "#fff";
  const subL = light ? "#475569" : "#9aa4c7";
  const borderL = light ? "#e2e8f0" : "#1a2540";

  if (Platform.OS === "web") {
    return (
      <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", background: bgBase, minHeight: "100vh", overflowX: "hidden" }}>
        <StatusBar barStyle={light ? "dark-content" : "light-content"} />

        {/* ── STICKY FLOATING HEADER ── */}
<div className={`sticky-header-land ${light ? "sticky-header-land-light" : ""}`} style={{ padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 200 }}>
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <img src={require("./logo.png")} style={{ width: 26, height: 26, borderRadius: 6 }} alt="logo" />
    <span style={{ color: light ? "#0f172a" : "#fff", fontWeight: 800, fontSize: 15 }}>AscendSAT</span>
  </div>
  <button
    onClick={() => { setError(""); setScreen("register"); }}
    style={{ color: light ? "#1d4ed8" : "#f5c518", fontWeight: 700, fontSize: 13, cursor: "pointer", background: "none", border: "none", zIndex: 200 }}
  >
    100% Free · Start Now →
  </button>
</div>

{/* ── NAV ── */}
<nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px 16px", background: bgBase, position: "relative", zIndex: 9999 }}>
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <img src={require("./logo.png")} style={{ width: 32, height: 32, borderRadius: 8 }} alt="logo" />
    <span style={{ color: light ? "#0f172a" : "#f5c518", fontWeight: 800, fontSize: 20 }}>AscendSAT</span>
    <span
      onClick={() => { setTimeout(() => setScreen("founder"), 0); }}
      style={{ marginLeft: 6, padding: "5px 12px", borderRadius: 14, background: light ? "#e2e8f0" : "#1a2540", color: light ? "#475569" : "#9aa4c7", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
    >About</span>
    <span
      onClick={() => { const next = light ? "dark" : "light"; setTimeout(() => setThemeMode(next), 0); }}
      style={{ marginLeft: 4, padding: "5px 12px", borderRadius: 14, background: light ? "#e2e8f0" : "#1a2540", color: light ? "#475569" : "#9aa4c7", fontSize: 13, cursor: "pointer" }}
    >{light ? "☀️" : "🌙"}</span>
  </div>
  <div style={{ display: "flex", gap: 12, alignItems: "center", zIndex: 9999 }}>
    <button onClick={() => { setError(""); setScreen("login"); }} style={{ color: light ? "#475569" : "#9aa4c7", fontWeight: 600, fontSize: 15, cursor: "pointer", background: "none", border: "none" }}>Login</button>
    <button
      onClick={() => { setError(""); setScreen("register"); }}
      style={{ background: light ? "#1d4ed8" : "#f5c518", color: light ? "#fff" : "#070d1f", padding: "9px 20px", borderRadius: 22, fontWeight: 800, fontSize: 14, cursor: "pointer", border: "none" }}
    >Sign Up</button>
  </div>
</nav>

        {/* ── HERO ── */}
        <section style={{ padding: "32px 24px 52px", background: bgBase, position: "relative", zIndex: 1 }}>
  {/* Orbs */}
  <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
            <div className="ascend-orb-a gpu" style={{ position: "absolute", bottom: 40, left: -80, width: 300, height: 300, borderRadius: "50%", background: light ? "rgba(79,124,255,0.09)" : "rgba(29,78,216,0.12)" }} />
            <div className="ascend-orb-b gpu" style={{ position: "absolute", top: 10, right: -100, width: 240, height: 240, borderRadius: "50%", background: light ? "rgba(245,197,24,0.08)" : "rgba(245,197,24,0.1)" }} />
            <div className="ascend-orb-c gpu" style={{ position: "absolute", top: 120, left: "38%", width: 140, height: 140, borderRadius: "50%", background: light ? "rgba(74,222,128,0.07)" : "rgba(74,222,128,0.1)" }} />
          </div>

          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: light ? "#EEF2FF" : "#0a1220", border: `1px solid ${light ? "#C7D2FE" : "rgba(29,78,216,0.3)"}`, borderRadius: 24, padding: "9px 16px", marginBottom: 32 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4caf50" }} />
            <span style={{ color: light ? "#4F7CFF" : "#6a7a9a", fontSize: 12, fontWeight: 700, letterSpacing: 0.3 }}>100% Free · No Credit Card · No Catch</span>
          </div>

          {/* Two-column: left = hero text+CTA, right = live demo */}
          <div style={{ display: "flex", flexDirection: "row", gap: 40, alignItems: "flex-start", flexWrap: "wrap", position: "relative", zIndex: 1 }}>

            {/* LEFT */}
            <div style={{ flex: "1 1 300px", minWidth: 260, position: "relative", zIndex: 1 }}>
              <div className="char-reveal" style={{ fontSize: 46, fontWeight: 900, lineHeight: 1.12, letterSpacing: -1.5, marginBottom: 4 }}>
                {"Summer is here.".split("").map((c, i) => (
                  <span key={i} style={{ animationDelay: `${i * 0.048}s`, color: textL }}>{c === " " ? "\u00A0" : c}</span>
                ))}
              </div>
              <div className="char-reveal line2-gold" style={{ fontSize: 46, fontWeight: 900, lineHeight: 1.12, letterSpacing: -1.5, marginBottom: 28 }}>
                {"Lock in.".split("").map((c, i) => (
                  <span key={i} style={{ animationDelay: `${(i + 8) * 0.048}s`, color: "#f5c518" }}>{c === " " ? "\u00A0" : c}</span>
                ))}
              </div>

              <p style={{ color: subL, fontSize: 16, lineHeight: 1.75, marginBottom: 36, maxWidth: 460 }}>
                Real SAT questions, expert-built tools, and free live classes. Built by a tutor who scored 1550 and helped 100+ students hit their goals.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 360, position: "relative", zIndex: 9999 }}>
  {/* Button 1: Register Screen Trigger */}
  <button
    onClick={() => { setError(""); setScreen("register"); }}
    style={{ background: light ? "#1d4ed8" : "#f5c518", color: light ? "#fff" : "#070d1f", padding: "18px 28px", borderRadius: 12, fontWeight: 900, fontSize: 17, cursor: "pointer", textAlign: "center", letterSpacing: -0.3, border: "none", width: "100%" }}
  >
    Join Now →
  </button>

  {/* Button 2: Start for Free */}
  <button 
    style={{ width: "100%", padding: "14px 20px", borderRadius: 12, cursor: "pointer", fontWeight: 700 }}
  >
    Start for Free →
  </button>
  
  <button
    onClick={() => { handleGoogleSignIn(); }}
    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: light ? "#fff" : "#0f1829", border: `1.5px solid ${borderL}`, borderRadius: 12, padding: "14px 20px", cursor: "pointer", width: "100%" }}
  >
    <span style={{ fontSize: 18 }}>G</span>
    <span style={{ color: "#4285F4", fontWeight: 700, fontSize: 15 }}>Continue with Google</span>
  </button>
  
  <button
    onClick={() => { setError(""); setScreen("login"); }}
    style={{ textAlign: "center", color: subL, fontSize: 14, cursor: "pointer", paddingTop: 4, background: "none", border: "none", width: "100%" }}
  >
    Already have an account? <span style={{ color: light ? "#1d4ed8" : "#f5c518", fontWeight: 700 }}>Log in</span>
  </button>
</div> {/* ✅ Closes the button container here! */}

</div> {/* ✅ Closes the entire LEFT column content container */}

{/* RIGHT: live demo */}
<div style={{ flex: "1 1 280px", minWidth: 260, maxWidth: 500 }}>
  <div style={{ color: light ? "#1d4ed8" : "#60a5fa", fontSize: 11, fontWeight: 800, letterSpacing: 2, marginBottom: 8 }}>LIVE DEMO — AUTO-RUNNING</div>
  <p style={{ color: subL, fontSize: 13, marginBottom: 14, lineHeight: 1.6 }}>Watch a real question — wrong answer, then explanation.</p>
  <div id="ascend-demo-root">
    <div style={{ background: light ? "#f1f5f9" : "#0f1829", borderRadius: 18, padding: 24, border: `1px solid ${borderL}`, color: subL, textAlign: "center", fontSize: 14 }}>
      Loading demo...
    </div>
  </div>
</div>

</div> {/* ✅ Closes the outer two-column row container */}

</section>

{/* ── TICKER ── */}
<div style={{ overflow: "hidden", background: "#f5c518", padding: "10px 0" }}>
  <div className="ascend-ticker-inner" style={{ display: "flex", gap: 32, width: "max-content" }}>
    {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <span style={{ color: "#070d1f", fontWeight: 900, fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase", whiteSpace: "nowrap" }}>{item}</span>
        <span style={{ color: "rgba(0,0,0,0.35)", fontSize: 14 }}>◆</span>
      </div>
    ))}
  </div>
</div>

{/* ── STATS ── */}
<section className="ascend-section" style={{ padding: "40px 24px 12px", background: bgBase }}>
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10 }}>
    {[["Free","Forever"],["8","SAT Domains"],["3","Difficulty Levels"],["Free","Group Classes"]].map(([val, label], i) => (
      <div key={i} className={`ascend-section-delay-${i+1}`} style={{ background: light ? "#fff" : "#0a1428", borderRadius: 16, padding: "20px 16px", textAlign: "center", border: `1px solid ${borderL}` }}>
        <div style={{ color: "#f5c518", fontSize: 24, fontWeight: 900 }}>{val}</div>
        <div style={{ color: subL, fontSize: 12, marginTop: 5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8 }}>{label}</div>
      </div>
    ))}
  </div>
</section>

        {/* ── TRY IT YOURSELF ── */}
        <section className="ascend-section" style={{ padding: "52px 24px 16px", background: bgBase }}>
          <div style={{ marginBottom: 28 }}>
            <div style={{ color: light ? "#1d4ed8" : "#60a5fa", fontSize: 11, fontWeight: 800, letterSpacing: 2, marginBottom: 10 }}>TRY IT YOURSELF</div>
            <h2 style={{ color: textL, fontSize: 30, fontWeight: 900, lineHeight: 1.25, marginBottom: 10 }}>3 real SAT questions.<br/>No account needed.</h2>
            <p style={{ color: subL, fontSize: 14, lineHeight: 1.75, maxWidth: 480 }}>Pick your answer and see the full explanation instantly — just like the real app.</p>
          </div>
          <div id="ascend-tryit-root" style={{ maxWidth: 660, margin: "0 auto" }}>
            <div style={{ color: subL, fontSize: 14 }}>Loading questions...</div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="ascend-section" style={{ padding: "44px 24px 12px", background: bgBase }}>
          <div style={{ color: light ? "#1d4ed8" : "#60a5fa", fontSize: 11, fontWeight: 800, letterSpacing: 2, marginBottom: 10 }}>FEATURES</div>
          <h2 style={{ color: textL, fontSize: 26, fontWeight: 900, lineHeight: 1.3, marginBottom: 22 }}>Everything you need to hit your target score.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14 }}>
            {FEATURES.map((f, i) => (
              <div key={i} className={`feature-card-3d ascend-section-delay-${(i%6)+1}`} style={{ background: light ? "#fff" : f.bg, borderRadius: 18, padding: 20, border: `1px solid ${light?"#e2e8f0":f.color+"30"}`, display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: f.color + (light?"18":"22"), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 26 }}>{f.icon}</span>
                </div>
                <div>
                  <div style={{ color: textL, fontWeight: 800, fontSize: 15, marginBottom: 5 }}>{f.title}</div>
                  <div style={{ color: subL, fontSize: 13, lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SCORE BANNER ── */}
        <section className="ascend-section" style={{ padding: "44px 24px 12px", background: bgBase }}>
          <div className="score-badge-land" style={{ background: light ? "#fff" : "#0a1428", borderRadius: 20, padding: "32px 24px", textAlign: "center", border: `1px solid ${light?"#e2e8f0":"rgba(245,197,24,0.2)"}` }}>
            <div style={{ color: light ? "#1d4ed8" : "#4F7CFF", fontSize: 10, fontWeight: 900, letterSpacing: 2.5, marginBottom: 10, textTransform: "uppercase" }}>Average Score Improvement</div>
            <div style={{ color: "#f5c518", fontSize: 80, fontWeight: 900, lineHeight: 1, letterSpacing: -3 }}>+150 pts</div>
            <div style={{ color: subL, fontSize: 13, marginTop: 10 }}>among students who practice 5+ days/week</div>
          </div>
        </section>

        {/* ── BLUEBOOK FEATURES ── */}
        <section className="ascend-section" style={{ padding: "44px 24px 12px", background: bgBase }}>
          <div style={{ color: light ? "#1d4ed8" : "#60a5fa", fontSize: 11, fontWeight: 800, letterSpacing: 2, marginBottom: 10 }}>BUILT FOR THE DIGITAL SAT</div>
          <h2 style={{ color: textL, fontSize: 28, fontWeight: 900, lineHeight: 1.3, marginBottom: 24 }}>Designed to match Bluebook. Down to the details.</h2>
          <div style={{ background: light ? "#fff" : "#0a1428", borderRadius: 18, padding: 24, border: `1px solid ${borderL}`, display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              "Bluebook-style quiz interface with question navigator",
              "Mark for Review & Answer Eliminator built in",
              "All 8 official SAT domains covered",
              "Easy / Medium / Hard difficulty filtering",
              "Instant explanations on every single question",
              "Desmos graphing calculator built in",
              "Full-length timed test modules",
              "Adaptive quiz that estimates your score",
            ].map((item, i) => (
              <div key={i} className={`ascend-section ascend-section-delay-${Math.min(i+1,6)}`} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <span style={{ color: "#16a34a", fontWeight: 800, fontSize: 16, marginTop: 1 }}>✓</span>
                <span style={{ color: textL, fontSize: 15, lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── DOMAINS DUAL TICKER ── */}
        <section className="ascend-section" style={{ padding: "44px 0 12px", background: bgBase, overflow: "hidden" }}>
          <div style={{ paddingLeft: 24, paddingRight: 24, marginBottom: 18 }}>
            <div style={{ color: light ? "#1d4ed8" : "#60a5fa", fontSize: 11, fontWeight: 800, letterSpacing: 2, marginBottom: 10 }}>FULL COVERAGE</div>
            <h2 style={{ color: textL, fontSize: 28, fontWeight: 900, lineHeight: 1.3 }}>All 8 SAT domains. Every skill.</h2>
          </div>

          {/* Row 1 — left to right */}
          <div style={{ overflow: "hidden", marginBottom: 12 }}>
            <div className="ascend-domain-ticker-ltr" style={{ display: "flex", gap: 12, width: "max-content" }}>
              {[...["Algebra","Advanced Math","Problem Solving & Data","Geometry & Trig","Linear Equations","Systems of Equations","Quadratic Functions","Exponential Growth","Scatterplots","Data Interpretation","Trigonometry","Circle Theorems"],
                ...["Algebra","Advanced Math","Problem Solving & Data","Geometry & Trig","Linear Equations","Systems of Equations","Quadratic Functions","Exponential Growth","Scatterplots","Data Interpretation","Trigonometry","Circle Theorems"]
              ].map((item, i) => (
                <div key={i} style={{ flexShrink: 0, background: light ? "#eff6ff" : "#0c1624", border: `1px solid ${light?"#bfdbfe":"#1a3060"}`, borderRadius: 24, padding: "9px 18px", whiteSpace: "nowrap" }}>
                  <span style={{ color: light ? "#1d4ed8" : "#60a5fa", fontWeight: 700, fontSize: 13 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — right to left */}
          <div style={{ overflow: "hidden" }}>
            <div className="ascend-domain-ticker-rtl" style={{ display: "flex", gap: 12, width: "max-content" }}>
              {[...["Information & Ideas","Craft & Structure","Expression of Ideas","English Conventions","Words in Context","Text Structure","Rhetorical Purpose","Command of Evidence","Transitions","Central Idea","Cross-Text Connections","Standard Grammar"],
                ...["Information & Ideas","Craft & Structure","Expression of Ideas","English Conventions","Words in Context","Text Structure","Rhetorical Purpose","Command of Evidence","Transitions","Central Idea","Cross-Text Connections","Standard Grammar"]
              ].map((item, i) => (
                <div key={i} style={{ flexShrink: 0, background: light ? "#f0fdf4" : "#0c1a10", border: `1px solid ${light?"#bbf7d0":"#1a4a20"}`, borderRadius: 24, padding: "9px 18px", whiteSpace: "nowrap" }}>
                  <span style={{ color: light ? "#16a34a" : "#4ade80", fontWeight: 700, fontSize: 13 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="ascend-section ascend-steps-section" style={{ padding: "44px 24px 12px", background: bgBase }}>
          <div style={{ color: light ? "#1d4ed8" : "#60a5fa", fontSize: 11, fontWeight: 800, letterSpacing: 2, marginBottom: 10 }}>HOW IT WORKS</div>
          <h2 style={{ color: textL, fontSize: 28, fontWeight: 900, lineHeight: 1.3, marginBottom: 28 }}>From signup to score improvement in four steps.</h2>
          {STEPS.map((step, i) => (
            <div key={i} style={{ display: "flex" }}>
              <div style={{ alignItems: "center", marginRight: 16, width: 48, display: "flex", flexDirection: "column" }}>
                <div className="step-num-bubble" style={{ width: 48, height: 48, borderRadius: 24, background: step.color + "18", border: `2px solid ${step.color}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: step.color, fontWeight: 900, fontSize: 13 }}>{step.n}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="step-connector" style={{ width: 2, height: 40, background: light ? "#e2e8f0" : "#1a2540", overflow: "hidden" }} />
                )}
              </div>
              <div style={{ flex: 1, paddingBottom: i < STEPS.length - 1 ? 0 : 0, paddingTop: 10 }}>
                <div style={{ color: textL, fontWeight: 800, fontSize: 16, marginBottom: 6 }}>{step.title}</div>
                <div style={{ color: subL, fontSize: 14, lineHeight: 1.65, marginBottom: i < STEPS.length - 1 ? 24 : 0 }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </section>

        {/* ── UPCOMING CLASSES ── */}
        <section className="ascend-section" style={{ padding: "44px 24px 12px", background: bgBase }}>
          <div style={{ color: light ? "#1d4ed8" : "#60a5fa", fontSize: 11, fontWeight: 800, letterSpacing: 2, marginBottom: 10 }}>UPCOMING CLASSES</div>
          <h2 style={{ color: textL, fontSize: 28, fontWeight: 900, lineHeight: 1.3, marginBottom: 24 }}>Free group sessions. Open to everyone.</h2>
          {publicClassesLoading ? (
            <div style={{ color: subL, textAlign: "center", padding: 24 }}>Loading classes...</div>
          ) : publicClasses.length === 0 ? (
            <div style={{ background: light ? "#fff" : "#0a1428", borderRadius: 20, padding: 40, textAlign: "center", border: `1px solid ${borderL}` }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>📅</div>
              <div style={{ color: textL, fontWeight: 800, fontSize: 16, marginBottom: 8 }}>New classes coming soon!</div>
              <div style={{ color: subL, fontSize: 14 }}>Sign up to get notified when sessions are scheduled.</div>
            </div>
          ) : (
            publicClasses.filter(cls => !(cls.type === "individual" && cls.isBooked)).slice(0, 3).map((cls, i) => (
              <div key={cls.id} className={`ascend-section ascend-section-delay-${i+1}`} style={{ background: light ? "#fff" : "#0a1428", borderRadius: 18, padding: 20, marginBottom: 14, border: `1px solid ${borderL}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ color: textL, fontWeight: 800, fontSize: 16, flex: 1 }}>{cls.title}</span>
                  <span style={{ background: cls.type === "group" ? "#14532d" : "#1e3a5f", color: "#fff", padding: "3px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{cls.type === "group" ? "FREE" : `$${cls.price}`}</span>
                </div>
                <div style={{ color: subL, fontSize: 13, marginBottom: 6 }}>📅 {cls.date ? new Date(cls.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) : "TBD"}{"  "}🕐 {cls.date ? new Date(cls.date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : ""}</div>
                {cls.description && <div style={{ color: subL, fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>{cls.description}</div>}
                <button
                  onClick={() => { setTimeout(() => { setError(""); setScreen("register"); }, 0); }}
                  style={{ background: light ? "#1e3a5f" : "#1e3a5f", color: "#fff", padding: "12px 20px", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer", textAlign: "center", border: "1px solid rgba(255,255,255,0.08)", width: "100%" }}
                >Sign Up to Book →</button>
              </div>
            ))
          )}
        </section>

        {/* ── TESTIMONIALS — horizontal scroll carousel ── */}
        <section className="ascend-section" style={{ padding: "44px 0 12px", background: bgBase, overflow: "hidden" }}>
          <div style={{ padding: "0 24px", marginBottom: 20 }}>
            <div style={{ color: light ? "#1d4ed8" : "#60a5fa", fontSize: 11, fontWeight: 800, letterSpacing: 2, marginBottom: 10 }}>STUDENT SUCCESS STORIES</div>
            <h2 style={{ color: textL, fontSize: 28, fontWeight: 900, lineHeight: 1.3, marginBottom: 8 }}>Results speak for themselves.</h2>
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              {[["100+","Avg pts gained"],["98%","Recommend us"],["100+","Students helped"]].map(([val,label],i)=>(
                <div key={i} style={{ flex: 1, background: light?"#fff":"#0a1428", borderRadius: 14, padding: "14px 12px", textAlign: "center", border:`1px solid ${borderL}` }}>
                  <div style={{ color: "#f5c518", fontSize: 22, fontWeight: 800 }}>{val}</div>
                  <div style={{ color: subL, fontSize: 11, marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {testimonialsLoading ? (
            <div style={{ color: subL, textAlign: "center", padding: 24 }}>Loading...</div>
          ) : (
            <div style={{ overflow: "hidden", paddingBottom: 8 }}>
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  paddingLeft: 24,
                  animation: "testiScroll 24s linear infinite",
                  width: "max-content",
                }}
                onMouseEnter={e => e.currentTarget.style.animationPlayState = "paused"}
                onMouseLeave={e => e.currentTarget.style.animationPlayState = "running"}
              >
                {(() => {
                  const cards = testimonials.length > 0 ? testimonials : [
                    { id: "p1", name: "Priya S.", score: "1480", text: "AscendSAT helped me jump 180 points in 6 weeks. The AI explanations are incredibly clear." },
                    { id: "p2", name: "Marcus T.", score: "1520", text: "I went from 1280 to 1520 using this app daily. Best free SAT resource out there." },
                    { id: "p3", name: "Aisha K.", score: "1440", text: "The adaptive quiz really pinpointed my weak spots. My math score went up 120 points." },
                    { id: "p4", name: "Jordan L.", score: "1390", text: "Casper explained things my school never did. Worth every minute I spent on it." },
                  ];
                  return [...cards, ...cards, ...cards].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        width: 280,
                        flexShrink: 0,
                        background: light ? "#fff" : "#0a1428",
                        borderRadius: 16,
                        padding: 20,
                        border: `1px solid ${borderL}`,
                      }}
                    >
                      <div style={{ color: "#f5c518", fontSize: 28, marginBottom: 8, fontFamily: "Georgia,serif", lineHeight: 1 }}>"</div>
                      <div style={{ color: light ? "#1e293b" : "#e2e8f0", fontSize: 13, lineHeight: 1.7, marginBottom: 16, fontStyle: "italic" }}>{item.text}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 16, background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid rgba(79,124,255,0.3)", flexShrink: 0 }}>
                          <span style={{ color: "#4F7CFF", fontWeight: "800", fontSize: 13 }}>{item.name?.[0]}</span>
                        </div>
                        <div>
                          <div style={{ color: "#4F7CFF", fontWeight: "700", fontSize: 13 }}>{item.name}</div>
                          {item.score && <div style={{ background: light ? "#f0fdf4" : "#0d2a18", padding: "1px 8px", borderRadius: 20, display: "inline-block", marginTop: 3 }}><span style={{ color: "#16a34a", fontSize: 11, fontWeight: "700" }}>🎯 {item.score}</span></div>}
                        </div>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          )}

          <button
            onClick={() => { setTimeout(() => { setError(""); setScreen("register"); }, 0); }}
            style={{ background: light?"#1d4ed8":"#f5c518", color: light?"#fff":"#070d1f", padding: "18px 28px", borderRadius: 12, fontWeight: 900, fontSize: 17, cursor: "pointer", textAlign: "center", maxWidth: 400, border: "none", width: "100%" }}
          >Join Them. Start Free. →</button>
        </section>

        {/* ── FAQ — animated accordion ── */}
        <section className="ascend-section" style={{ padding: "44px 24px 12px", background: bgBase }}>
          <div style={{ color: light ? "#1d4ed8" : "#60a5fa", fontSize: 11, fontWeight: 800, letterSpacing: 2, marginBottom: 10 }}>FAQ</div>
          <h2 style={{ color: textL, fontSize: 28, fontWeight: 900, lineHeight: 1.3, marginBottom: 24 }}>Common questions.</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="faq-item" style={{ background: light?"#fff":"#0a1428", borderRadius: 16, border:`1px solid ${borderL}`, overflow: "hidden" }}>
                <div className="faq-question" style={{ padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: textL, fontWeight: 700, fontSize: 15, flex: 1, lineHeight: 1.5 }}>{item.q}</span>
                  <span className="faq-chevron" style={{ color: subL, fontSize: 18, marginLeft: 12, flexShrink: 0 }}>⌄</span>
                </div>
                <div className="faq-answer" style={{ padding: "0 20px" }}>
                  <div style={{ paddingBottom: 18, color: subL, fontSize: 14, lineHeight: 1.75, borderTop: `1px solid ${borderL}`, paddingTop: 14 }}>{item.a}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="ascend-section" style={{ padding: "44px 24px 12px", background: bgBase }}>
          <div style={{ background: light?"#fff":"#0a1428", borderRadius: 20, padding: "36px 28px", textAlign: "center", border:`1px solid ${light?"#e2e8f0":"rgba(29,78,216,0.2)"}`}}>
            <div style={{ fontSize: 40, marginBottom: 14 }}>🚀</div>
            <h2 style={{ color: textL, fontSize: 26, fontWeight: 900, marginBottom: 12, lineHeight: 1.35 }}>Your target score is closer than you think.</h2>
            <p style={{ color: subL, fontSize: 15, marginBottom: 28 }}>Join AscendSAT free today. No card required.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 360, margin: "0 auto", position: "relative", zIndex: 9999 }}>
  <button
    onClick={() => { setError(""); setScreen("register"); }}
    style={{ background: light ? "#1d4ed8" : "#f5c518", color: light ? "#fff" : "#070d1f", padding: "18px 28px", borderRadius: 12, fontWeight: 900, fontSize: 17, cursor: "pointer", border: "none", width: "100%" }}
  >
    Start for Free →
  </button>
  <button
    onClick={() => { handleGoogleSignIn(); }}
    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: light ? "#fff" : "#0f1829", border: `1.5px solid ${borderL}`, borderRadius: 12, padding: "14px 20px", cursor: "pointer", width: "100%" }}
  >
    <span style={{ fontSize: 18 }}>G</span>
    <span style={{ color: "#4285F4", fontWeight: 700, fontSize: 15 }}>Continue with Google</span>
  </button>
  <button
    onClick={() => { setError(""); setScreen("login"); }}
    style={{ textAlign: "center", color: subL, fontSize: 14, cursor: "pointer", paddingTop: 4, background: "none", border: "none", width: "100%" }}
  >
    Already have an account? <span style={{ color: light ? "#1d4ed8" : "#f5c518", fontWeight: 700 }}>Log in</span>
  </button>
</div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ padding: "36px 24px 48px", textAlign: "center", borderTop: `1px solid ${borderL}`, background: bgBase, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <img src={require("./logo.png")} style={{ width: 48, height: 48, borderRadius: 14 }} alt="logo" />
            <span style={{ color: light?"#0f172a":"#fff", fontWeight: 900, fontSize: 44, letterSpacing: -2 }}>AscendSAT</span>
          </div>
          <div style={{ color: subL, fontSize: 13 }}>Premium Prep. Zero Cost.</div>
          <button
            onClick={() => { window.open("https://instagram.com/ascend_sat", "_blank"); }}
            style={{ color: light?"#4F7CFF":"#f5c518", fontSize: 14, fontWeight: 600, marginTop: 4, cursor: "pointer", background: "none", border: "none" }}
          >📸 @ascend_sat</button>
          <div style={{ color: "#475569", fontSize: 12, marginTop: 4 }}>© 2025 AscendSAT. All rights reserved.</div>
        </footer>
      </div>
    );
  }

  /* ── Native fallback (iOS/Android) — keep original Animated version ── */
  const SECTION_OFFSETS = [200, 500, 900, 1300, 1700, 2100, 2600];
  const handleLandingScroll = (e) => {
    if (Platform.OS === "web") return;
    const y = e.nativeEvent.contentOffset.y;
    const now = Date.now();
    const dt = now - lastScrollTime.current;
    const dy = y - lastScrollY.current;
    const vel = dt > 0 ? (dy / dt) * 16 : 0;
    Animated.spring(scrollVelocity, { toValue: Math.max(-30, Math.min(30, vel)), useNativeDriver: isNative, tension: 180, friction: 18 }).start();
    Animated.spring(scrollVelocity, { toValue: 0, useNativeDriver: isNative, tension: 60, friction: 14, delay: 80 }).start();
    lastScrollY.current = y;
    lastScrollTime.current = now;
    SECTION_OFFSETS.forEach((offset, i) => {
      if (y > offset && !sectionTriggered.current[i]) {
        sectionTriggered.current[i] = true;
        Animated.spring(sectionAnims.current[i], { toValue: 1, useNativeDriver: isNative, tension: 42, friction: 7 }).start();
      if (titleMaskAnims[i]) Animated.spring(titleMaskAnims[i], { toValue: 1, useNativeDriver: isNative, tension: 55, friction: 9 }).start();
      if (i === 3) Animated.stagger(300, stepLineAnims.map(la => Animated.spring(la, { toValue: 1, useNativeDriver: isNative, tension: 50, friction: 9 }))).start();
      if (i === 1) Animated.stagger(120, featureCard3DAnims.map(fa => Animated.spring(fa, { toValue: 1, useNativeDriver: isNative, tension: 55, friction: 8 }))).start();
      }
    });
  };

  const makeSlideUp = (anim) => ({ opacity: anim, transform: [{ translateY: anim.interpolate({ inputRange: [0, 0.6, 0.85, 1], outputRange: [80, -12, 4, 0] }) }] });
  const makeSlideLeft = (anim) => ({ opacity: anim, transform: [{ translateX: anim.interpolate({ inputRange: [0, 0.6, 0.85, 1], outputRange: [-70, 10, -4, 0] }) }] });
  const makeFlipIn = (anim) => ({ opacity: anim, transform: [{ perspective: 800 }, { rotateX: anim.interpolate({ inputRange: [0, 0.6, 1], outputRange: ["60deg", "-8deg", "0deg"] }) }, { scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] }) }] });
  const makeScaleIn = (anim) => ({ opacity: anim, transform: [{ scale: anim.interpolate({ inputRange: [0, 0.5, 0.8, 0.95, 1], outputRange: [0.7, 1.06, 0.97, 1.02, 1] }) }] });
  const orb1Y = orbAnim1.interpolate({ inputRange: [0, 1], outputRange: [0, -28] });
  const orb2Y = orbAnim2.interpolate({ inputRange: [0, 1], outputRange: [0, 22] });
  const orb3Y = orbAnim3.interpolate({ inputRange: [0, 1], outputRange: [0, -18] });
  const orb1Scale = orbAnim1.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] });
  const orb2Scale = orbAnim2.interpolate({ inputRange: [0, 1], outputRange: [1, 0.9] });
  const orb3Scale = orbAnim3.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] });
  const glowOpacity = scoreGlow.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.85] });
  const ctaGlowOpacity = ctaGlow.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] });
  const stickyHeaderOpacity = scrollY.interpolate({ inputRange: [60, 140], outputRange: [0, 1], extrapolate: "clamp" });
  const stickyHeaderY = scrollY.interpolate({ inputRange: [60, 140], outputRange: [-60, 0], extrapolate: "clamp" });
  const heroParallaxY = scrollY.interpolate({ inputRange: [0, 600], outputRange: [0, -180], extrapolate: "clamp" });
  const heroOpacityFade = scrollY.interpolate({ inputRange: [0, 350], outputRange: [1, 0], extrapolate: "clamp" });
  const heroScaleDown = scrollY.interpolate({ inputRange: [0, 400], outputRange: [1, 0.88], extrapolate: "clamp" });
  const tickerX = tickerOffset.interpolate({ inputRange: [-1, 0], outputRange: [-SCREEN_WIDTH * 2.4, 0], extrapolate: "clamp" });
  const FEATURES_NAT = [
    { icon: "📘", title: "Real SAT Question Bank", desc: "Hundreds of official SAT questions sorted by domain, difficulty, and type.", color: "#3b82f6", bg: "#0c1a2e" },
    { icon: "🤖", title: "Casper AI Tutor", desc: "Your 24/7 SAT expert. Step-by-step answers.", color: "#a78bfa", bg: "#120c2a" },
    { icon: "⚡", title: "Timed Drills", desc: "Per-question countdown timers across all 8 domains.", color: "#f5c518", bg: "#1a1400" },
    { icon: "📊", title: "Growth Tracking", desc: "See your accuracy by domain across every quiz.", color: "#4ade80", bg: "#0c1a10" },
    { icon: "🎯", title: "Diagnostic + Study Plan", desc: "Personalized weekly roadmap.", color: "#fb923c", bg: "#1a0e00" },
    { icon: "🎮", title: "Mini Games", desc: "Speed Round, Boss Battle, Wordle and more.", color: "#f87171", bg: "#160c0c" },
  ];
  const TICKER_ITEMS_NAT = ["FREE SAT PREP", "1550 SCORE", "AI TUTOR", "LIVE CLASSES", "ALL 8 DOMAINS", "DESMOS BUILT IN", "ADAPTIVE QUIZ", "VOCAB GAMES", "100+ STUDENTS"];

  return (
    <Animated.ScrollView
      style={[{ flex: 1, backgroundColor: isLight ? "#f4f5f7" : "#070d1f" }]}
      contentContainerStyle={{ paddingBottom: 80 }}
      scrollEventThrottle={16}
      decelerationRate="normal"
      showsVerticalScrollIndicator={false}
      onScroll={Platform.OS !== "web" ? Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: isNative, listener: handleLandingScroll }) : undefined}
    >
      <StatusBar barStyle={isLight ? "dark-content" : "light-content"} backgroundColor={isLight ? "#f4f5f7" : "#070d1f"} />
      <Animated.View style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 1000, opacity: stickyHeaderOpacity, transform: [{ translateY: stickyHeaderY }] }} pointerEvents="none">
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingVertical: 12, backgroundColor: isLight ? "rgba(255,255,255,0.92)" : "rgba(7,13,31,0.92)", borderBottomWidth: 1, borderBottomColor: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Image source={require("./logo.png")} style={{ width: 26, height: 26, borderRadius: 6 }} resizeMode="contain" />
            <Text style={{ color: isLight ? "#0F172A" : "#fff", fontWeight: "800", fontSize: 15 }}>AscendSAT</Text>
          </View>
          <Text style={{ color: isLight ? "#4F7CFF" : "#f5c518", fontWeight: "700", fontSize: 13 }}>100% Free · Start Now →</Text>
        </View>
      </Animated.View>
      <View style={[land.nav, isLight && land.navLight]}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Image source={require("./logo.png")} style={{ width: 32, height: 32, borderRadius: 8 }} resizeMode="contain" />
          <Text style={[land.navLogo, isLight && land.navLogoLight]}>AscendSAT</Text>
          <TouchableOpacity onPress={() => setScreen("founder")} style={{ marginLeft: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 14, backgroundColor: isLight ? "#e2e8f0" : "#1a2540" }}>
            <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 11, fontWeight: "700" }}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[land.navThemeBtn, isLight && land.navThemeBtnLight, { marginLeft: 2 }]} onPress={() => setThemeMode(isLight ? "dark" : "light")}>
            <Text style={[land.navThemeText, isLight && land.navThemeTextLight]}>{isLight ? "☀️" : "🌙"}</Text>
          </TouchableOpacity>
        </View>
        <View style={land.navBtns}>
          <TouchableOpacity onPress={() => { setError(""); setScreen("login"); }}><Text style={[land.navLogin, isLight && land.navLoginLight]}>Login</Text></TouchableOpacity>
          <TouchableOpacity style={[land.navSignUp, isLight && land.navSignUpLight]} onPress={() => { setError(""); setScreen("register"); }}><Text style={[land.navSignUpText, isLight && land.navSignUpTextLight]}>Sign Up</Text></TouchableOpacity>
        </View>
      </View>
      <View style={{ overflow: "hidden" }}>
        <Animated.View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none" }}>
          <Animated.View style={{ position: "absolute", bottom: 60, left: -60, width: 260, height: 260, borderRadius: 130, backgroundColor: isLight ? "#4F7CFF18" : "#1d4ed820", transform: [{ translateY: orb1Y }, { scale: orb1Scale }] }} />
          <Animated.View style={{ position: "absolute", top: 20, right: -80, width: 200, height: 200, borderRadius: 100, backgroundColor: isLight ? "#f5c51814" : "#f5c51818", transform: [{ translateY: orb2Y }, { scale: orb2Scale }] }} />
          <Animated.View style={{ position: "absolute", top: 140, left: "35%", width: 120, height: 120, borderRadius: 60, backgroundColor: isLight ? "#4ade8010" : "#4ade8014", transform: [{ translateY: orb3Y }, { scale: orb3Scale }] }} />
        </Animated.View>
        <Animated.View style={[land.hero, isLight && land.heroLight, { transform: [{ translateY: heroParallaxY }, { scale: heroScaleDown }], opacity: heroOpacityFade }]}>
          <Animated.View style={[land.heroBadge, isLight && land.heroBadgeLight, { opacity: heroAnim, transform: [{ scale: heroAnim.interpolate({ inputRange: [0,0.5,0.8,0.95,1], outputRange:[0.4,1.15,0.95,1.03,1] }) }] }]}>
            <View style={[land.heroBadgeDot, isLight && land.heroBadgeDotLight]} />
            <Text style={[land.heroBadgeText, isLight && land.heroBadgeTextLight]}>100% Free · No Credit Card · No Catch</Text>
          </Animated.View>
          <Animated.View style={{ marginBottom: 22, width: "100%" }}>
            <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 4 }}>
              {"Summer is here.".split("").map((char, i) => {
                const anim = heroCharAnims[i % heroCharAnims.length];
                return (<Animated.Text key={`l1-${i}`} style={[land.heroTitle, isLight && land.heroTitleLight, { fontSize: 46, fontWeight: "900", lineHeight: 54, letterSpacing: -1.5, opacity: anim, transform: [{ translateY: anim.interpolate({ inputRange: [0,0.5,0.8,1], outputRange:[32,-6,2,0] }) }, { scaleX: anim.interpolate({ inputRange:[0,0.6,1], outputRange:[0.6,1.08,1] }) }] }]}>{char === " " ? "\u00A0" : char}</Animated.Text>);
              })}
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {"Lock in.".split("").map((char, i) => {
                const anim = heroCharAnims[(i + 6) % heroCharAnims.length];
                return (<Animated.Text key={`l2-${i}`} style={{ color: "#f5c518", fontSize: 46, fontWeight: "900", lineHeight: 54, letterSpacing: -1.5, opacity: anim, transform: [{ translateY: anim.interpolate({ inputRange:[0,0.5,0.8,1], outputRange:[32,-6,2,0] }) }, { scaleX: anim.interpolate({ inputRange:[0,0.6,1], outputRange:[0.6,1.08,1] }) }] }}>{char === " " ? "\u00A0" : char}</Animated.Text>);
              })}
            </View>
          </Animated.View>
          <Animated.Text style={[land.heroSub, isLight && land.heroSubLight, { opacity: heroAnim, transform: [{ translateY: heroAnim.interpolate({ inputRange:[0,1], outputRange:[24,0] }) }] }]}>Real SAT questions, expert-built tools, and free live classes. Built by a tutor who scored 1550 and helped 100+ students hit their goals.</Animated.Text>
          <Animated.View style={{ width: "100%", opacity: heroAnim, transform: [{ translateY: heroAnim.interpolate({ inputRange:[0,1], outputRange:[30,0] }) }], marginBottom: 14 }}>
            <Animated.View style={{ position: "absolute", inset: -8, borderRadius: 16, backgroundColor: isLight ? "#4F7CFF" : "#f5c518", opacity: ctaGlowOpacity, top: 4, left: 4, right: 4, bottom: -8, zIndex: -1 }} />
            <TouchableOpacity style={[land.heroBtn, isLight && land.heroBtnLight]} onPress={() => { setError(""); setScreen("register"); }}>
              <Text style={[land.heroBtnText, isLight && land.heroBtnTextLight]}>Start for Free →</Text>
            </TouchableOpacity>
          </Animated.View>
          <View style={[land.socialDivider, isLight && land.socialDividerLight]}>
            <View style={[land.socialDividerLine, isLight && land.socialDividerLineLight]} />
            <Text style={[land.socialDividerText, isLight && land.socialDividerTextLight]}>or continue with</Text>
            <View style={[land.socialDividerLine, isLight && land.socialDividerLineLight]} />
          </View>
          <TouchableOpacity style={[land.socialBtn, isLight && land.socialBtnLight, { width: "100%", paddingVertical: 16 }]} onPress={() => { setError(""); setScreen("register"); }}>
            <Text style={land.socialBtnIcon}>G</Text>
            <Text style={[land.socialBtnText, isLight && land.socialBtnTextLight, { color: "#4285F4" }]}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 16 }} onPress={() => { setError(""); setScreen("login"); }}>
            <Text style={[land.heroSecondary, isLight && land.heroSecondaryLight]}>Already have an account? Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setScreen("testimonials")} style={{ marginTop: 28, width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, backgroundColor: isLight ? "#f1f5f9" : "#0a1428", borderRadius: 14, borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#f5c51840", paddingVertical: 14, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 18 }}>⭐</Text>
            <View><Text style={{ color: "#f5c518", fontWeight: "800", fontSize: 14 }}>Read Student Reviews</Text><Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 12 }}>Built for thousands · 100+ point increase</Text></View>
            <Text style={{ color: "#f5c518", fontSize: 16, marginLeft: "auto" }}>›</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <View style={{ overflow: "hidden", backgroundColor: "#f5c518", paddingVertical: 10 }}>
        <Animated.View style={{ flexDirection: "row", gap: 32, transform: [{ translateX: tickerX }], width: SCREEN_WIDTH * 5 }}>
          {[...TICKER_ITEMS_NAT,...TICKER_ITEMS_NAT,...TICKER_ITEMS_NAT,...TICKER_ITEMS_NAT,...TICKER_ITEMS_NAT].map((item, i) => (
            <View key={i} style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <Text style={{ color: "#070d1f", fontWeight: "900", fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase" }}>{item}</Text>
              <Text style={{ color: "#070d1f", opacity: 0.4, fontSize: 16 }}>◆</Text>
            </View>
          ))}
        </Animated.View>
      </View>
      <Animated.View style={makeFlipIn(section1Anim)}>
        <View style={[land.statsRow, isLight && land.statsRowLight]}>
          {[["Free","Forever"],["8","SAT Domains"],["3","Difficulty Levels"],["Free","Group Classes"]].map(([val, label], i) => (
            <View key={i} style={land.statBox}><Text style={land.statVal}>{val}</Text><Text style={land.statLabel}>{label}</Text></View>
          ))}
        </View>
      </Animated.View>
      <View style={[land.section, isLight && land.sectionLight]}>
        <Animated.View style={makeSlideLeft(section2Anim)}><Text style={[land.sectionLabel, isLight && land.sectionLabelLight]}>FEATURES</Text><Text style={[land.sectionTitle, isLight && land.sectionTitleLight]}>Everything you need to hit your target score.</Text></Animated.View>
        {FEATURES_NAT.map((f, i) => (
          <Animated.View key={i} style={[{ marginBottom: 12, opacity: section2Anim.interpolate({ inputRange:[i/6,Math.min(i/6+0.5,1)], outputRange:[0,1], extrapolate:"clamp" }) }]}>
            <View style={{ backgroundColor: isLight?"#fff":f.bg, borderRadius: 18, padding: 20, flexDirection: "row", gap: 16, alignItems: "flex-start", borderWidth: 1, borderColor: isLight?"#e2e8f0":f.color+"30" }}>
              <View style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: isLight?f.color+"18":f.color+"22", justifyContent: "center", alignItems: "center" }}><Text style={{ fontSize: 26 }}>{f.icon}</Text></View>
              <View style={{ flex: 1 }}><Text style={{ color: isLight?"#0f172a":"#fff", fontWeight: "800", fontSize: 15, marginBottom: 4 }}>{f.title}</Text><Text style={{ color: isLight?"#475569":"#9aa4c7", fontSize: 13, lineHeight: 20 }}>{f.desc}</Text></View>
            </View>
          </Animated.View>
        ))}
      </View>
      <Animated.View style={[makeFlipIn(section2Anim), { marginHorizontal: 20, marginBottom: 8 }]}>
        <Animated.View style={[land.scoreBanner, isLight && land.scoreBannerLight, { transform: [{ scale: scorePulse }] }]}>
          <Animated.View style={{ position: "absolute", top: -4, left: -4, right: -4, bottom: -4, borderRadius: 28, borderWidth: 2, borderColor: "#f5c518", opacity: glowOpacity }} />
          <Text style={land.scoreBannerLabel}>AVERAGE SCORE IMPROVEMENT</Text>
          <Animated.Text style={[land.scoreBannerNum, { transform: [{ scale: section2Anim.interpolate({ inputRange:[0,0.6,0.85,1], outputRange:[0.3,1.12,0.96,1] }) }] }]}>+150 pts</Animated.Text>
          <Text style={land.scoreBannerSub}>among students who practice 5+ days/week</Text>
        </Animated.View>
      </Animated.View>
      <Animated.View style={[land.section, isLight && land.sectionLight, { paddingTop: 40 }, makeFlipIn(section3Anim)]}>
        <Animated.View style={makeSlideLeft(section3Anim)}><Text style={[land.sectionLabel, isLight && land.sectionLabelLight]}>BUILT FOR THE DIGITAL SAT</Text><Text style={[land.sectionTitle, isLight && land.sectionTitleLight]}>Designed to match Bluebook.</Text></Animated.View>
        <View style={[land.bluebookCard, isLight && land.bluebookCardLight]}>
          {["Bluebook-style quiz interface","Mark for Review & Eliminator","All 8 official SAT domains","Easy / Medium / Hard filtering","Instant explanations","Desmos calculator","Full-length timed modules","Adaptive score estimator"].map((item, i) => (
            <Animated.View key={i} style={[land.bluebookRow, { opacity: section3Anim.interpolate({ inputRange:[i/10,Math.min(i/10+0.4,1)], outputRange:[0,1], extrapolate:"clamp" }), transform:[{ translateX: section3Anim.interpolate({ inputRange:[i/10,Math.min(i/10+0.4,1)], outputRange:[-30,0], extrapolate:"clamp" }) }] }]}>
              <Text style={land.bluebookCheck}>✓</Text>
              <Text style={[land.bluebookText, isLight && { color: "#0f172a" }]}>{item}</Text>
            </Animated.View>
          ))}
        </View>
      </Animated.View>
      <View style={[land.section, isLight && land.sectionLight]}>
        <Animated.View style={makeSlideLeft(section4Anim)}><Text style={[land.sectionLabel, isLight && land.sectionLabelLight]}>HOW IT WORKS</Text><Text style={[land.sectionTitle, isLight && land.sectionTitleLight]}>Four steps to your target score.</Text></Animated.View>
        {STEPS.map((step, i) => (
          <Animated.View key={i} style={{ opacity: section4Anim.interpolate({ inputRange:[i*0.15,Math.min(i*0.15+0.5,1)], outputRange:[0,1], extrapolate:"clamp" }), transform:[{ translateX: section4Anim.interpolate({ inputRange:[i*0.15,Math.min(i*0.15+0.5,1)], outputRange:[80,0], extrapolate:"clamp" }) }] }}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ alignItems: "center", marginRight: 16, width: 48 }}>
                <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: step.color+"18", borderWidth: 2, borderColor: step.color, justifyContent: "center", alignItems: "center" }}><Text style={{ color: step.color, fontWeight: "900", fontSize: 13 }}>{step.n}</Text></View>
                {i < STEPS.length - 1 && <View style={{ width: 2, height: 40, backgroundColor: isLight?"#e2e8f0":"#1a2540" }} />}
              </View>
              <View style={{ flex: 1, paddingBottom: 32, paddingTop: 10 }}>
                <Text style={{ color: isLight?"#0f172a":"#fff", fontWeight: "800", fontSize: 16, marginBottom: 6 }}>{step.title}</Text>
                <Text style={{ color: isLight?"#475569":"#9aa4c7", fontSize: 14, lineHeight: 22 }}>{step.desc}</Text>
              </View>
            </View>
          </Animated.View>
        ))}
      </View>
      <Animated.View style={[land.section, isLight && land.sectionLight, makeSlideUp(section5Anim)]}>
        <Text style={[land.sectionLabel, isLight && land.sectionLabelLight]}>STUDENT SUCCESS STORIES</Text>
        <Text style={[land.sectionTitle, isLight && land.sectionTitleLight]}>Results speak for themselves.</Text>
        {testimonialsLoading ? (<Text style={land.featureDesc}>Loading...</Text>) : testimonials.length === 0 ? (
          <View style={land.emptyClasses}><Text style={{ fontSize: 32, marginBottom: 10 }}>💬</Text><Text style={land.emptyClassesText}>Testimonials coming soon!</Text></View>
        ) : (
          <>
            {testimonials.map((item) => (
              <View key={item.id} style={[land.testimonialCard, isLight && land.testimonialCardLight, { marginBottom: 16 }]}>
                <Text style={{ color: "#f5c518", fontSize: 32, marginBottom: 8 }}>"</Text>
                <Text style={[land.testimonialQuote, isLight && land.testimonialQuoteLight]}>{item.text}</Text>
                <View style={land.testimonialFooter}>
                  <View style={land.testimonialAvatar}><Text style={{ color: "#f5c518", fontWeight: "800", fontSize: 14 }}>{item.name?.[0]}</Text></View>
                  <View><Text style={land.testimonialName}>{item.name}</Text>{item.score ? <Text style={land.testimonialScore}>Score: {item.score}</Text> : null}</View>
                </View>
              </View>
            ))}
            <Animated.View style={makeSlideUp(section5Anim)}>
              <TouchableOpacity style={land.heroBtn} onPress={() => { setError(""); setScreen("register"); }}><Text style={land.heroBtnText}>Join Them. Start Free. →</Text></TouchableOpacity>
            </Animated.View>
          </>
        )}
      </Animated.View>
      <View style={[land.section, isLight && land.sectionLight]}>
        <Animated.View style={makeSlideLeft(section6Anim)}><Text style={[land.sectionLabel, isLight && land.sectionLabelLight]}>FAQ</Text><Text style={[land.sectionTitle, isLight && land.sectionTitleLight]}>Common questions.</Text></Animated.View>
        {FAQ_ITEMS.map((item, i) => (
          <Animated.View key={i} style={[land.faqCard, isLight && land.faqCardLight, { marginBottom: 10, opacity: section6Anim.interpolate({ inputRange:[i*0.14,Math.min(i*0.14+0.45,1)], outputRange:[0,1], extrapolate:"clamp" }) }]}>
            <Text style={[land.faqQ, isLight && land.faqQLight]}>{item.q}</Text>
            <Text style={[land.faqA, isLight && land.faqALight]}>{item.a}</Text>
          </Animated.View>
        ))}
      </View>
      <Animated.View style={[land.ctaBanner, isLight && land.ctaBannerLight, makeFlipIn(section6Anim)]}>
        <Text style={{ fontSize: 40, marginBottom: 12 }}>🚀</Text>
        <Text style={[land.ctaTitle, isLight && land.ctaTitleLight, { textAlign: "center" }]}>Your target score is closer than you think.</Text>
        <Text style={[land.ctaSub, isLight && land.ctaSubLight]}>Join AscendSAT free today. No card required.</Text>
        <Animated.View
  pointerEvents="box-none"
  style={{ width: "100%", position: "relative" }}
>
  <Animated.View
    pointerEvents="none"
    style={{
      position: "absolute",
      top: 4,
      left: 8,
      right: 8,
      bottom: -6,
      borderRadius: 14,
      backgroundColor: isLight ? "#4F7CFF" : "#f5c518",
      opacity: ctaGlowOpacity,
      zIndex: 0,
    }}
  />
  <TouchableOpacity
    activeOpacity={0.85}
    style={[land.ctaBtn, { zIndex: 5 }]}
    onPress={() => {
      console.log("CTA CLICKED");
      setError("");
      setScreen("register");
    }}
  >
    <Text style={land.ctaBtnText}>Create Free Account</Text>
  </TouchableOpacity>
</Animated.View>
        <TouchableOpacity style={[land.socialBtn, { width: "100%", marginTop: 12 }]} onPress={handleGoogleSignIn}>
          <Text style={land.socialBtnIcon}>G</Text>
          <Text style={[land.socialBtnText, { color: "#4285F4" }]}>Google</Text>
        </TouchableOpacity>
      </Animated.View>
      <View style={[land.footer, isLight && { backgroundColor: "#F6F7FB", borderTopColor: "#E5E7EB" }]}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <Image source={require("./logo.png")} style={{ width: 52, height: 52, borderRadius: 14 }} resizeMode="contain" />
          <Text style={[land.footerBrand, isLight && land.footerBrandLight]}>AscendSAT</Text>
        </View>
        <Text style={[land.footerTagline, isLight && { color: "#475569" }]}>Premium Prep. Zero Cost.</Text>
        <TouchableOpacity onPress={() => Linking.openURL("https://instagram.com/ascend_sat")}><Text style={[land.footerInsta, isLight && { color: "#4F7CFF" }]}>📸 @ascend_sat</Text></TouchableOpacity>
        <Text style={[land.footerCopy, isLight && { color: "#94a3b8" }]}>© 2025 AscendSAT. All rights reserved.</Text>
      </View>
    </Animated.ScrollView>
  );
}
if (screen === "trial3") {
  return (
    <SafeAreaView style={[styles.container, isLight && styles.containerLight, { backgroundColor: isLight ? "#f4f5f7" : "#070d1f" }]}> 
      <StatusBar barStyle={isLight ? "dark-content" : "light-content"} backgroundColor={isLight ? "#f4f5f7" : "#070d1f"} />
      <View style={[land.nav, isLight && land.navLight, { paddingBottom: 16 }]}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <TouchableOpacity onPress={() => setScreen("landing")} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Image source={require("./logo.png")} style={{ width: 32, height: 32, borderRadius: 8 }} resizeMode="contain" />
            <Text style={[land.navLogo, isLight && land.navLogoLight]}>AscendSAT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setScreen("founder")}
            style={{ marginLeft: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 14, backgroundColor: isLight ? "#e2e8f0" : "#1a2540" }}
          >
            <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 11, fontWeight: "700" }}>About</Text>
          </TouchableOpacity>
        </View>
        <View style={land.navBtns}>
          <TouchableOpacity style={[land.navThemeBtn, isLight && land.navThemeBtnLight]} onPress={() => setThemeMode(isLight ? "dark" : "light")}>
            <Text style={[land.navThemeText, isLight && land.navThemeTextLight]}>{isLight ? "Dark" : "Light"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[land.navSignUp, isLight && land.navSignUpLight]} onPress={() => { setError(""); setScreen("register"); }}>
            <Text style={[land.navSignUpText, isLight && land.navSignUpTextLight]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 80 }}>
        <Text style={land.sectionLabel}>FREE TRIAL</Text>
        <Text style={[land.sectionTitle, isLight && land.sectionTitleLight, { marginBottom: 22 }]}>Try 3 SAT practice questions now.</Text>

        {TRIAL_QUESTIONS.map((q, index) => {
          const selected = trialAnswers[index];
          const correct = q.answer;
          return (
            <View key={q.id} style={[land.trialCard, isLight && land.trialCardLight]}>
              <Text style={[land.trialCardLabel, isLight && land.trialCardLabelLight]}>Question {index + 1}: {q.subject} ({q.difficulty})</Text>
              <Text style={[land.trialPassage, isLight && land.trialPassageLight]}>{q.passage}</Text>
              <Text style={[land.trialQuestion, isLight && land.trialQuestionLight]}>{q.question}</Text>
              {q.options.map((option, optionIndex) => (
                <TouchableOpacity
                  key={optionIndex}
                  style={[
                    land.trialOption,
                    isLight && land.trialOptionLight,
                    selected === optionIndex && land.trialOptionSelected,
                  ]}
                  onPress={() => selectTrialAnswer(index, optionIndex)}
                >
                  <Text style={[land.trialOptionText, isLight && land.trialOptionTextLight, selected === optionIndex && { fontWeight: "800" }]}>
                    {String.fromCharCode(65 + optionIndex)}) {option}
                  </Text>
                </TouchableOpacity>
              ))}
              {selected != null ? (
                <View style={[land.trialFeedback, isLight && land.trialFeedbackLight]}>
                  <Text style={[
                    land.trialFeedbackText,
                    selected === correct ? { color: "#4ade80" } : { color: "#f87171" },
                  ]}>
                    {selected === correct ? "Correct!" : `Not quite — the best answer is ${String.fromCharCode(65 + correct)}.`}
                  </Text>
                  <Text style={[land.trialExplanation, isLight && land.trialExplanationLight]}>{q.explanation}</Text>
                </View>
              ) : null}
            </View>
          );
        })}

        <View style={[land.trialCard, isLight && land.trialCardLight]}>
          <Text style={[land.trialCardLabel, isLight && land.trialCardLabelLight]}>Want to get your target score?</Text>
          <Text style={[land.trialQuestion, isLight && land.trialQuestionLight]}>Sign Up now to unlock full practice, progress tracking, and personalized SAT prep.</Text>
          <TouchableOpacity style={[land.heroBtn, isLight && land.heroBtnLight, { width: "100%", marginTop: 12 }]} onPress={() => { setError(""); setScreen("register"); }}>
            <Text style={[land.heroBtnText, isLight && land.heroBtnTextLight]}>Sign Up Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[land.socialBtn, isLight && land.socialBtnLight, { width: "100%", marginTop: 12 }]} onPress={() => { setError(""); setScreen("login"); }}>
            <Text style={[land.socialBtnText, isLight && land.socialBtnTextLight, { color: "#fff" }]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
/* ---------------- FOUNDER PAGE ---------------- */
if (screen === "founder") {
  return (
    <ScrollView style={land.bg} contentContainerStyle={{ paddingBottom: 80 }}>
      <StatusBar barStyle="light-content" backgroundColor="#070d1f" />
      <View style={[land.nav, isLight && land.navLight]}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Image source={require("./logo.png")} style={{ width: 32, height: 32, borderRadius: 8 }} resizeMode="contain" />
          <Text style={[land.navLogo, isLight && land.navLogoLight]}>AscendSAT</Text>
          <TouchableOpacity style={[land.navThemeBtn, isLight && land.navThemeBtnLight, { marginLeft: 6 }]} onPress={() => setThemeMode(isLight ? "dark" : "light")}>
            <Text style={[land.navThemeText, isLight && land.navThemeTextLight]}>{isLight ? "☀️" : "🌙"}</Text>
          </TouchableOpacity>
        </View>
        <View style={land.navBtns}>
          <TouchableOpacity onPress={() => { setError(""); setScreen("login"); }}>
            <Text style={[land.navLogin, isLight && land.navLoginLight]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[land.navSignUp, isLight && land.navSignUpLight]} onPress={() => { setError(""); setScreen("register"); }}>
            <Text style={[land.navSignUpText, isLight && land.navSignUpTextLight]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ paddingHorizontal: 24, paddingTop: 48, paddingBottom: 16 }}>
        <TouchableOpacity onPress={() => setScreen("landing")} style={{ marginBottom: 20 }}>
          <Text style={{ color: "#9aa4c7", fontSize: 14 }}>← Back to Home</Text>
        </TouchableOpacity>

        <Text style={{ color: "#1d4ed8", fontSize: 11, fontWeight: "800", letterSpacing: 2, marginBottom: 10 }}>MEET THE FOUNDER</Text>
        <Text style={{ color: "#fff", fontSize: 36, fontWeight: "900", lineHeight: 44, marginBottom: 8, letterSpacing: -0.5 }}>
          Built by someone{"\n"}<Text style={{ color: "#f5c518" }}>who's been there.</Text>
        </Text>
        <Text style={{ color: "#9aa4c7", fontSize: 15, lineHeight: 26, marginBottom: 32 }}>
          AscendSAT wasn't built by a corporation. It was built by a tutor who scored a 1550 on the SAT and spent years helping students do the same.
        </Text>

        {/* Score hero card */}
        <View style={{
          backgroundColor: "#0a1428", borderRadius: 24, padding: 28,
          borderWidth: 1, borderColor: "#f5c51830", marginBottom: 20,
          alignItems: "center",
        }}>
          <View style={{
            width: 100, height: 100, borderRadius: 50,
            backgroundColor: "#1a1400", borderWidth: 3, borderColor: "#f5c518",
            justifyContent: "center", alignItems: "center", marginBottom: 16,
          }}>
            <Text style={{ color: "#f5c518", fontSize: 28, fontWeight: "900" }}>1550</Text>
            <Text style={{ color: "#f5c518", fontSize: 10, fontWeight: "700", letterSpacing: 1 }}>SAT SCORE</Text>
          </View>
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "900", textAlign: "center", marginBottom: 6 }}>
            First attempt.
          </Text>
          <Text style={{ color: "#9aa4c7", fontSize: 14, textAlign: "center", lineHeight: 22 }}>
            Scored in the 99th percentile on the first try, then dedicated years to helping others get there too.
          </Text>
        </View>

        {/* Stats row */}
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
          {[
            { val: "1550", label: "SAT Score", icon: "🎯", color: "#f5c518" },
            { val: "5+", label: "Yrs Tutoring", icon: "📚", color: "#60a5fa" },
            { val: "1+", label: "Yr SAT Spec.", icon: "🏆", color: "#4ade80" },
            { val: "100+", label: "Students", icon: "🚀", color: "#a78bfa" },
          ].map(({ val, label, icon, color }) => (
            <View key={label} style={{
              flex: 1, backgroundColor: "#0f1829", borderRadius: 16,
              padding: 14, alignItems: "center",
              borderWidth: 1, borderColor: "#1a2540",
            }}>
              <Text style={{ fontSize: 18, marginBottom: 6 }}>{icon}</Text>
              <Text style={{ color, fontWeight: "900", fontSize: 18 }}>{val}</Text>
              <Text style={{ color: "#9aa4c7", fontSize: 10, textAlign: "center", marginTop: 3 }}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Story cards */}
        {[
          {
            icon: "🎯",
            title: "A 1550 on the first try",
            body: "I took the SAT once and scored a 1550, not because I was naturally gifted, but because I understood the test inside and out. I studied the patterns, the traps, and the strategy. That knowledge is baked into every question and explanation in this app.",
            color: "#f5c518",
            bg: "#1a1400",
            border: "#f5c51830",
          },
          {
            icon: "📚",
            title: "5+ years in the classroom",
            body: "I've been tutoring for over five years across subjects, grade levels, and learning styles. I know what clicks for students and what doesn't. AscendSAT is built on real teaching experience, not guesswork.",
            color: "#60a5fa",
            bg: "#0c1624",
            border: "#60a5fa30",
          },
          {
            icon: "🏆",
            title: "1+ year SAT specialist",
            body: "Over the past year I've focused entirely on SAT prep: tracking score improvements, analyzing student mistakes, and refining the best strategies for the digital SAT format. Every feature in this app came from a real tutoring need.",
            color: "#4ade80",
            bg: "#0c1a10",
            border: "#4ade8030",
          },
          {
            icon: "💡",
            title: "Why I built this for free",
            body: "SAT prep shouldn't cost $2000. I've seen too many students miss their target scores simply because they couldn't afford proper prep. AscendSAT exists to help everyone. Premium prep, zero cost.",
            color: "#a78bfa",
            bg: "#0e0c1a",
            border: "#a78bfa30",
          },
        ].map((item, i) => (
          <View key={i} style={{
            backgroundColor: item.bg, borderRadius: 18, padding: 22,
            borderWidth: 1, borderColor: item.border, marginBottom: 14,
          }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <Text style={{ fontSize: 28 }}>{item.icon}</Text>
              <Text style={{ color: item.color, fontWeight: "800", fontSize: 16, flex: 1 }}>{item.title}</Text>
            </View>
            <Text style={{ color: "#e2e8f0", fontSize: 14, lineHeight: 24 }}>{item.body}</Text>
          </View>
        ))}

        {/* Quote */}
        <View style={{
          backgroundColor: "#0c1624", borderRadius: 18, padding: 24,
          borderWidth: 1, borderColor: "#1a3060",
          borderLeftWidth: 4, borderLeftColor: "#3b82f6",
          marginBottom: 28,
        }}>
          <Text style={{ color: "#93c5fd", fontSize: 16, lineHeight: 28, fontStyle: "italic", marginBottom: 12 }}>
            "I built the app I wished I had when I was prepping. Just real questions, honest explanations, and tools that actually improve your score."
          </Text>
          <Text style={{ color: "#60a5fa", fontWeight: "700", fontSize: 13 }}>
            — Founder, AscendSAT
          </Text>
        </View>

        {/* CTA */}
        <View style={{
          backgroundColor: "#0a1428", borderRadius: 20, padding: 28,
          borderWidth: 1, borderColor: "#1d4ed830", alignItems: "center",
        }}>
          <Text style={{ color: "#fff", fontSize: 22, fontWeight: "900", textAlign: "center", marginBottom: 10 }}>
            Ready to hit your target score?
          </Text>
          <Text style={{ color: "#9aa4c7", fontSize: 14, textAlign: "center", marginBottom: 20 }}>
            Join thousands of students prepping smarter with AscendSAT.
          </Text>
          <TouchableOpacity style={land.heroBtn} onPress={() => { setError(""); setScreen("register"); }}>
            <Text style={land.heroBtnText}>Start for Free →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

/* ---------------- TESTIMONIALS PAGE ---------------- */
if (screen === "testimonials") {
  return (
    <ScrollView style={land.bg} contentContainerStyle={{ paddingBottom: 80 }}>
      <StatusBar barStyle="light-content" backgroundColor="#070d1f" />
      <View style={land.nav}>
        <TouchableOpacity onPress={() => setScreen("landing")} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Image source={require("./logo.png")} style={{ width: 32, height: 32, borderRadius: 8 }} resizeMode="contain" />
          <Text style={land.navLogo}>AscendSAT</Text>
        </TouchableOpacity>
        <View style={land.navBtns}>
          <TouchableOpacity onPress={() => setScreen("founder")}>
            <Text style={[land.navLogin, isLight && land.navLoginLight]}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setError(""); setScreen("login"); }}>
            <Text style={[land.navLogin, isLight && land.navLoginLight]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[land.navSignUp, isLight && land.navSignUpLight]} onPress={() => { setError(""); setScreen("register"); }}>
            <Text style={[land.navSignUpText, isLight && land.navSignUpTextLight]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ paddingHorizontal: 24, paddingTop: 48, paddingBottom: 16 }}>
        <TouchableOpacity onPress={() => setScreen("landing")} style={{ marginBottom: 20 }}>
          <Text style={{ color: "#9aa4c7", fontSize: 14 }}>← Back to Home</Text>
        </TouchableOpacity>
        <Text style={{ color: "#1d4ed8", fontSize: 11, fontWeight: "800", letterSpacing: 2, marginBottom: 10 }}>STUDENT SUCCESS STORIES</Text>
        <Text style={{ color: "#fff", fontSize: 36, fontWeight: "900", lineHeight: 44, marginBottom: 8, letterSpacing: -0.5 }}>
          Real students.{"\n"}<Text style={{ color: "#f5c518" }}>Real results.</Text>
        </Text>
        <Text style={{ color: "#9aa4c7", fontSize: 15, lineHeight: 26, marginBottom: 32 }}>
          Hundreds of students have used AscendSAT to hit their target scores. Here's what they have to say.
        </Text>

        {/* Stats row */}
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 32 }}>
          {[["100+", "Avg pts gained"], ["98%", "Recommend us"], ["100+", "Students helped"]].map(([val, label], i) => (
            <View key={i} style={{ flex: 1, backgroundColor: "#0a1428", borderRadius: 14, padding: 16, alignItems: "center", borderWidth: 1, borderColor: "#1a2540" }}>
              <Text style={{ color: "#f5c518", fontSize: 24, fontWeight: "800" }}>{val}</Text>
              <Text style={{ color: "#9aa4c7", fontSize: 11, textAlign: "center", marginTop: 4 }}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Testimonials */}
        {testimonialsLoading ? (
          <Text style={{ color: "#9aa4c7", textAlign: "center", marginTop: 40 }}>Loading reviews...</Text>
        ) : testimonials.length === 0 ? (
          <View style={{ backgroundColor: "#0a1428", borderRadius: 20, padding: 40, alignItems: "center", borderWidth: 1, borderColor: "#1a2540" }}>
            <Text style={{ fontSize: 40, marginBottom: 14 }}>💬</Text>
            <Text style={{ color: "#fff", fontWeight: "800", fontSize: 18, marginBottom: 8 }}>Reviews coming soon!</Text>
            <Text style={{ color: "#9aa4c7", textAlign: "center" }}>Student success stories will appear here.</Text>
          </View>
        ) : (
          testimonials.map((item) => (
            <View key={item.id} style={[land.testimonialCard, isLight && land.testimonialCardLight, { marginBottom: 16 }]}>
              <Text style={{ color: "#f5c518", fontSize: 36, marginBottom: 8, fontFamily: "Georgia" }}>"</Text>
              <Text style={[land.testimonialQuote, isLight && land.testimonialQuoteLight, { fontSize: 16, lineHeight: 28 }]}>{item.text}</Text>
              <View style={[land.testimonialFooter, { marginTop: 16 }]}>
                <View style={land.testimonialAvatar}>
                  <Text style={{ color: "#f5c518", fontWeight: "800", fontSize: 16 }}>{item.name?.[0]}</Text>
                </View>
                <View>
                  <Text style={[land.testimonialName, { fontSize: 15 }]}>{item.name}</Text>
                  {item.score ? (
                    <View style={{ backgroundColor: "#1a2540", paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20, marginTop: 4, alignSelf: "flex-start" }}>
                      <Text style={{ color: "#4caf50", fontWeight: "700", fontSize: 12 }}>🎯 {item.score}</Text>
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
          ))
        )}

        {/* CTA */}
        <View style={{ backgroundColor: "#0a1428", borderRadius: 20, padding: 28, marginTop: 16, borderWidth: 1, borderColor: "#1d4ed830", alignItems: "center" }}>
          <Text style={{ color: "#fff", fontSize: 22, fontWeight: "900", textAlign: "center", marginBottom: 10 }}>Ready to write your own success story?</Text>
          <TouchableOpacity style={land.heroBtn} onPress={() => { setError(""); setScreen("register"); }}>
            <Text style={land.heroBtnText}>Start for Free →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
  /* ---------------- LOGIN ---------------- */
/* ---------------- VERIFY EMAIL ---------------- */
if (screen === "verifyEmail") {
  return (
    <View style={styles.center}>
      <Image
        source={require("./logo.png")}
        style={{ width: 80, height: 80, alignSelf: "center", marginBottom: 8, borderRadius: 16 }}
        resizeMode="contain"
      />
      <Text style={styles.logo}>AscendSAT</Text>

      <View style={{ backgroundColor: "#151c36", borderRadius: 16, padding: 24, width: "100%", marginBottom: 20, alignItems: "center", borderWidth: 1, borderColor: "#1a2540" }}>
        <Text style={{ fontSize: 48, marginBottom: 12 }}>📧</Text>
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "800", marginBottom: 8, textAlign: "center" }}>
          Check your inbox
        </Text>
        <Text style={{ color: "#9aa4c7", fontSize: 14, textAlign: "center", lineHeight: 22 }}>
          We sent a verification link to:
        </Text>
        <Text style={{ color: "#f5c518", fontWeight: "700", fontSize: 15, marginTop: 6, textAlign: "center" }}>
          {email}
        </Text>
        <Text style={{ color: "#9aa4c7", fontSize: 13, textAlign: "center", marginTop: 10, lineHeight: 20 }}>
          Click the link in the email, then tap the button below to continue.
        </Text>
      </View>

      {verifyResent && (
        <Text style={{ color: "#4caf50", textAlign: "center", marginBottom: 10, fontWeight: "600" }}>
          ✅ Verification email resent!
        </Text>
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Main CTA — polls Firebase to check if verified */}
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          try {
            setError("");
            const user = auth.currentUser;
            if (!user) { setError("Session expired. Please log in again."); setScreen("login"); return; }
            await reload(user);
            if (user.emailVerified) {
              const profile = await loadUserProfile(user.uid);
              if (!profile) setScreen("onboarding");
              else { setScreen("app"); setView("home"); }
            } else {
              setError("Email not verified yet. Check your inbox and click the link, then try again.");
            }
          } catch (e) {
            setError(e.message);
          }
        }}
      >
        <Text style={styles.btnText}>I've verified my email ✓</Text>
      </TouchableOpacity>

      {/* Resend */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#2a2f55", marginTop: 6 }]}
        onPress={async () => {
          try {
            setError("");
            const user = auth.currentUser;
            if (!user) { setError("Session expired."); setScreen("login"); return; }
            await sendEmailVerification(user, {
  handleCodeInApp: false,
  url: "https://ascendsat.com",
});
            setVerifyResent(true);
          } catch (e) {
            setError("Could not resend. Try again in a minute.");
          }
        }}
      >
        <Text style={styles.btnText}>Resend email</Text>
      </TouchableOpacity>

      {/* Escape hatch */}
      <TouchableOpacity onPress={() => { setScreen("login"); setError(""); }}>
        <Text style={styles.link}>← Back to login</Text>
      </TouchableOpacity>
    </View>
  );
}
  if (screen === "login") {
    const bg = isLight ? "#f8fafc" : "#0b1020";
    const cardBg = isLight ? "#ffffff" : "#151c36";
    const textColor = isLight ? "#0f172a" : "#fff";
    const subColor = isLight ? "#475569" : "#9aa4c7";
    const inputBg = isLight ? "#f1f5f9" : "#0f1829";
    const inputBorder = isLight ? "#cbd5e1" : "#1a2540";
    const dividerColor = isLight ? "#e2e8f0" : "#1a2540";
    const btnBg = isLight ? "#1d4ed8" : "#1f2a52";
    return (
      <View style={{ flex: 1, justifyContent: "center", backgroundColor: bg, padding: 20 }}>
        <StatusBar barStyle={isLight ? "dark-content" : "light-content"} />
        <Image source={require("./logo.png")} style={{ width: 64, height: 64, alignSelf: "center", marginBottom: 8, borderRadius: 14 }} resizeMode="contain" />
        <Text style={{ color: isLight ? "#4F7CFF" : "#f5c518", fontSize: 36, textAlign: "center", marginBottom: 24, fontWeight: "800" }}>AscendSAT</Text>
        <TextInput
          style={{ backgroundColor: inputBg, padding: 13, borderRadius: 10, color: textColor, marginBottom: 10, borderWidth: 1, borderColor: inputBorder, fontSize: 15 }}
          placeholder="Email" placeholderTextColor={isLight ? "#94a3b8" : "#555"} value={email} onChangeText={setEmail} autoCapitalize="none"
        />
        <View style={{ width: "100%", marginBottom: 10, position: "relative" }}>
          <TextInput
            style={{ backgroundColor: inputBg, padding: 13, borderRadius: 10, color: textColor, marginBottom: 0, paddingRight: 60, borderWidth: 1, borderColor: inputBorder, fontSize: 15 }}
            placeholder="Password" placeholderTextColor={isLight ? "#94a3b8" : "#555"} secureTextEntry={!showPassword} value={password} onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(p => !p)} style={{ position: "absolute", right: 14, top: 0, bottom: 0, justifyContent: "center" }}>
            <Text style={{ color: subColor, fontSize: 13, fontWeight: "600" }}>{showPassword ? "Hide" : "Show"}</Text>
          </TouchableOpacity>
        </View>
        {error ? <Text style={{ color: "#dc2626", textAlign: "center", marginBottom: 10 }}>{error}</Text> : null}
        <TouchableOpacity
          style={{ backgroundColor: btnBg, padding: 14, borderRadius: 10, marginTop: 4 }}
          onPress={async () => {
            try {
              const cred = await signInWithEmailAndPassword(auth, email, password);
              if (!cred.user.emailVerified && cred.user.email !== ADMIN_EMAIL) {
                setUserId(cred.user.uid);
                setIsAdmin(cred.user.email === ADMIN_EMAIL);
                await saveSession(cred.user.uid, cred.user.email || email, cred.user.email === ADMIN_EMAIL);
                setVerifyResent(false);
                setScreen("verifyEmail");
                return;
              }
              const adminFlag = cred.user.email === ADMIN_EMAIL;
              setUserId(cred.user.uid);
              setIsAdmin(adminFlag);
              await saveSession(cred.user.uid, cred.user.email || email, adminFlag);
              const profile = await loadUserProfile(cred.user.uid);
              if (!profile) setScreen("onboarding");
              else { await loadScoreHistory(); setScreen("app"); setView("home"); }
            } catch (e) { handleError(e); }
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center", fontWeight: "700", fontSize: 16 }}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={async () => {
          try { await sendPasswordResetEmail(auth, email); setError("Reset email sent!"); } catch (e) { handleError(e); }
        }}>
          <Text style={{ color: isLight ? "#1d4ed8" : "#9aa4c7", textAlign: "center", marginTop: 12 }}>Forgot Password?</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 14 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: dividerColor }} />
          <Text style={{ color: subColor, fontSize: 12, paddingHorizontal: 12 }}>or</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: dividerColor }} />
        </View>
        <TouchableOpacity
          style={{ backgroundColor: isLight ? "#ffffff" : "#0f1829", borderWidth: 1.5, borderColor: inputBorder, borderRadius: 10, padding: 14, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10 }}
          onPress={handleGoogleSignIn}
        >
          <Text style={{ fontSize: 18 }}>G</Text>
          <Text style={{ color: "#4285F4", fontWeight: "700", fontSize: 15 }}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setError(""); setScreen("register"); }}>
          <Text style={{ color: isLight ? "#1d4ed8" : "#9aa4c7", textAlign: "center", marginTop: 12 }}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setScreen("landing")}>
          <Text style={{ color: subColor, textAlign: "center", marginTop: 10 }}>← Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /* ---------------- REGISTER ---------------- */

  if (screen === "register") {
    const bg = isLight ? "#f8fafc" : "#0b1020";
    const textColor = isLight ? "#0f172a" : "#fff";
    const subColor = isLight ? "#475569" : "#9aa4c7";
    const inputBg = isLight ? "#f1f5f9" : "#0f1829";
    const inputBorder = isLight ? "#cbd5e1" : "#1a2540";
    const dividerColor = isLight ? "#e2e8f0" : "#1a2540";
    const btnBg = isLight ? "#1d4ed8" : "#1f2a52";
    return (
      <View style={{ flex: 1, justifyContent: "center", backgroundColor: bg, padding: 20 }}>
        <StatusBar barStyle={isLight ? "dark-content" : "light-content"} />
        <Image source={require("./logo.png")} style={{ width: 64, height: 64, alignSelf: "center", marginBottom: 8, borderRadius: 14 }} resizeMode="contain" />
        <Text style={{ color: isLight ? "#4F7CFF" : "#f5c518", fontSize: 36, textAlign: "center", marginBottom: 24, fontWeight: "800" }}>AscendSAT</Text>
        <TextInput
          style={{ backgroundColor: inputBg, padding: 13, borderRadius: 10, color: textColor, marginBottom: 10, borderWidth: 1, borderColor: inputBorder, fontSize: 15 }}
          placeholder="Email" placeholderTextColor={isLight ? "#94a3b8" : "#555"} value={email} onChangeText={setEmail} autoCapitalize="none"
        />
        <View style={{ width: "100%", marginBottom: 10, position: "relative" }}>
          <TextInput
            style={{ backgroundColor: inputBg, padding: 13, borderRadius: 10, color: textColor, marginBottom: 0, paddingRight: 60, borderWidth: 1, borderColor: inputBorder, fontSize: 15 }}
            placeholder="Password" placeholderTextColor={isLight ? "#94a3b8" : "#555"} secureTextEntry={!showPassword} value={password} onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(p => !p)} style={{ position: "absolute", right: 14, top: 0, bottom: 0, justifyContent: "center" }}>
            <Text style={{ color: subColor, fontSize: 13, fontWeight: "600" }}>{showPassword ? "Hide" : "Show"}</Text>
          </TouchableOpacity>
        </View>
        {error ? <Text style={{ color: "#dc2626", textAlign: "center", marginBottom: 10 }}>{error}</Text> : null}
        <TouchableOpacity
          style={{ backgroundColor: btnBg, padding: 14, borderRadius: 10, marginTop: 4 }}
          onPress={async () => {
            try {
              const cred = await createUserWithEmailAndPassword(auth, email, password);
              const adminFlag = cred.user.email === ADMIN_EMAIL;
              setUserId(cred.user.uid);
              setIsAdmin(adminFlag);
              await saveSession(cred.user.uid, cred.user.email || email, adminFlag);
              await sendEmailVerification(cred.user, { handleCodeInApp: false, url: "https://ascendsat.com" });
              try {
                const statsRef = doc(db, "globalStats", "main");
                const statsSnap = await getDoc(statsRef);
                if (statsSnap.exists()) {
                  await updateDoc(statsRef, { totalUsers: (statsSnap.data().totalUsers || 0) + 1 });
                } else {
                  await setDoc(statsRef, { totalUsers: 1, totalQuestionsAnswered: 0 });
                }
              } catch (e) {}
              setOnboardingStep(1);
              setVerifyResent(false);
              setScreen("verifyEmail");
            } catch (e) { handleError(e); }
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center", fontWeight: "700", fontSize: 16 }}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setError(""); setScreen("login"); }}>
          <Text style={{ color: isLight ? "#1d4ed8" : "#9aa4c7", textAlign: "center", marginTop: 12 }}>Already have an account? Log in</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 14 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: dividerColor }} />
          <Text style={{ color: subColor, fontSize: 12, paddingHorizontal: 12 }}>or</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: dividerColor }} />
        </View>
        <TouchableOpacity
          style={{ backgroundColor: isLight ? "#ffffff" : "#0f1829", borderWidth: 1.5, borderColor: inputBorder, borderRadius: 10, padding: 14, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10 }}
          onPress={handleGoogleSignIn}
        >
          <Text style={{ fontSize: 18 }}>G</Text>
          <Text style={{ color: "#4285F4", fontWeight: "700", fontSize: 15 }}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setScreen("landing")}>
          <Text style={{ color: subColor, textAlign: "center", marginTop: 12 }}>← Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /* ---------------- ONBOARDING ---------------- */

  if (screen === "onboarding") {
    if (onboardingStep === 1) {
      return (
        <View style={styles.center}>
          <View style={ob.progressRow}>
            <View style={[ob.progressDot, ob.progressDotActive]} />
            <View style={ob.progressLine} />
            <View style={ob.progressDot} />
            <View style={ob.progressLine} />
            <View style={ob.progressDot} />
            <View style={ob.progressLine} />
            <View style={ob.progressDot} />
            <View style={ob.progressLine} />
            <View style={ob.progressDot} />
          </View>
          <Text style={ob.stepLabel}>Step 1 of 5</Text>
          <Text style={ob.heading}>What should we call you?</Text>
          <Text style={ob.sub}>First name or nickname — totally up to you</Text>
          <TextInput
            style={[ob.bigInput, { fontSize: 28 }]}
            value={userName}
            onChangeText={setUserName}
            placeholder="e.g. Alex"
            placeholderTextColor="#555"
            autoCapitalize="words"
            maxLength={30}
          />
          <TouchableOpacity
            style={[ob.nextBtn, (!userName.trim()) && { opacity: 0.4 }]}
            onPress={() => setOnboardingStep(2)}
            disabled={!userName.trim()}
          >
            <Text style={ob.nextBtnText}>Next →</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (onboardingStep === 2) {
      return (
        <View style={styles.center}>
          <View style={ob.progressRow}>
            <View style={[ob.progressDot, ob.progressDotActive]} />
            <View style={[ob.progressLine, ob.progressLineActive]} />
            <View style={[ob.progressDot, ob.progressDotActive]} />
            <View style={ob.progressLine} />
            <View style={ob.progressDot} />
            <View style={ob.progressLine} />
            <View style={ob.progressDot} />
            <View style={ob.progressLine} />
            <View style={ob.progressDot} />
          </View>
          <Text style={ob.stepLabel}>Step 2 of 5</Text>
          <Text style={ob.heading}>What's your target SAT score?</Text>
          <Text style={ob.sub}>Enter a score between 400 and 1600</Text>
          <TextInput
            style={ob.bigInput}
            value={targetScore}
            onChangeText={(val) => {
              const n = val.replace(/[^0-9]/g, "");
              if (n === "") setTargetScore("");
              else if (Number(n) > 1600) setTargetScore("1600");
              else if (n.length <= 4) setTargetScore(n);
            }}
            keyboardType="numeric"
            placeholder="e.g. 1400"
            placeholderTextColor="#555"
            maxLength={4}
          />
          <TouchableOpacity
            style={[ob.nextBtn, (!targetScore || Number(targetScore) < 400) && { opacity: 0.4 }]}
            onPress={() => setOnboardingStep(3)}
            disabled={!targetScore || Number(targetScore) < 400}
          >
            <Text style={ob.nextBtnText}>Next →</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setOnboardingStep(1)}>
            <Text style={styles.link}>← Back</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (onboardingStep === 3) {
      return (
        <View style={styles.center}>
          <View style={ob.progressRow}>
            <View style={[ob.progressDot, ob.progressDotActive]} />
            <View style={[ob.progressLine, ob.progressLineActive]} />
            <View style={[ob.progressDot, ob.progressDotActive]} />
            <View style={[ob.progressLine, ob.progressLineActive]} />
            <View style={[ob.progressDot, ob.progressDotActive]} />
            <View style={ob.progressLine} />
            <View style={ob.progressDot} />
            <View style={ob.progressLine} />
            <View style={ob.progressDot} />
          </View>
          <Text style={ob.stepLabel}>Step 3 of 5</Text>
          <Text style={ob.heading}>When is your test date?</Text>
          <Text style={ob.sub}>We'll count down the days for you</Text>

          {Platform.OS === "web" ? (
            <TextInput
              style={[styles.input, { textAlign: "center" }]}
              value={testDateInput}
              onChangeText={setTestDateInput}
              onBlur={() => {
                const parsed = new Date(testDateInput);
                if (!isNaN(parsed)) {
                  const min = new Date();
                  min.setHours(0, 0, 0, 0);
                  if (parsed >= min) setTestDate(parsed);
                }
              }}
              placeholder="MM/DD/YYYY"
              placeholderTextColor="#555"
            />
          ) : (
            <>
              <TouchableOpacity style={ob.dateButton} onPress={() => setShowDatePicker(true)}>
                <Text style={ob.dateButtonText}>
                  📅 {(typeof testDate === "string" ? new Date(testDate) : testDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={typeof testDate === "string" ? new Date(testDate) : testDate}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  minimumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    if (Platform.OS === "android") {
                      setShowDatePicker(false);
                      if (event?.type === "set" && selectedDate) setTestDate(selectedDate);
                    } else {
                      if (selectedDate) setTestDate(selectedDate);
                    }
                  }}
                />
              )}
              {Platform.OS === "ios" && showDatePicker && (
                <TouchableOpacity style={ob.nextBtn} onPress={() => setShowDatePicker(false)}>
                  <Text style={ob.nextBtnText}>Confirm Date</Text>
                </TouchableOpacity>
              )}
            </>
          )}

          <TouchableOpacity
            style={[ob.nextBtn, showDatePicker && Platform.OS === "ios" && { opacity: 0 }]}
            onPress={() => setOnboardingStep(4)}
          >
            <Text style={ob.nextBtnText}>Next →</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setOnboardingStep(2)}>
            <Text style={styles.link}>← Back</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (onboardingStep === 4) {
      const satOptions = [
        { key: "not_taken", label: "I haven't taken it yet", icon: "📚" },
        { key: "practice_only", label: "Practice test(s) only", icon: "📝" },
        { key: "official_once", label: "Official SAT once", icon: "🎯" },
        { key: "official_multiple", label: "Official SAT multiple times", icon: "🏆" },
      ];
      return (
        <ScrollView style={{ flex: 1, backgroundColor: "#0b1020" }} contentContainerStyle={{ padding: 24, paddingTop: 60 }}>
          <View style={ob.progressRow}>
            <View style={[ob.progressDot, ob.progressDotActive]} />
            <View style={[ob.progressLine, ob.progressLineActive]} />
            <View style={[ob.progressDot, ob.progressDotActive]} />
            <View style={[ob.progressLine, ob.progressLineActive]} />
            <View style={[ob.progressDot, ob.progressDotActive]} />
            <View style={[ob.progressLine, ob.progressLineActive]} />
            <View style={[ob.progressDot, ob.progressDotActive]} />
            <View style={ob.progressLine} />
            <View style={ob.progressDot} />
          </View>
          <Text style={ob.stepLabel}>Step 4 of 5</Text>
          <Text style={ob.heading}>Have you taken the SAT before?</Text>
          <Text style={ob.sub}>This helps us personalize your prep plan</Text>

          {satOptions.map((opt) => {
            const selected = satExperience === opt.key;
            return (
              <TouchableOpacity
                key={opt.key}
                style={{
                  backgroundColor: selected ? "#1a2a4a" : "#151c36",
                  borderRadius: 14,
                  padding: 18,
                  marginBottom: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 14,
                  borderWidth: 2,
                  borderColor: selected ? "#f5c518" : "#1f2a52",
                }}
                onPress={() => setSatExperience(opt.key)}
              >
                <Text style={{ fontSize: 24 }}>{opt.icon}</Text>
                <Text style={{ color: selected ? "#f5c518" : "#fff", fontWeight: selected ? "700" : "400", fontSize: 15, flex: 1 }}>
                  {opt.label}
                </Text>
                {selected && <Text style={{ color: "#f5c518", fontSize: 18 }}>✓</Text>}
              </TouchableOpacity>
            );
          })}

          {(satExperience === "official_once" || satExperience === "official_multiple" || satExperience === "practice_only") && (
            <View style={{ marginTop: 8, marginBottom: 4 }}>
              <Text style={{ color: "#9aa4c7", fontSize: 14, marginBottom: 10 }}>
                {satExperience === "practice_only" ? "What was your highest practice score?" : "What was your most recent official score?"}
              </Text>
              <TextInput
                style={{
                  backgroundColor: "#151c36",
                  color: "#f5c518",
                  fontSize: 28,
                  fontWeight: "700",
                  textAlign: "center",
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 4,
                }}
                value={currentScore}
                onChangeText={(val) => {
                  const n = val.replace(/[^0-9]/g, "");
                  if (n === "") setCurrentScore("");
                  else if (Number(n) > 1600) setCurrentScore("1600");
                  else setCurrentScore(n);
                }}
                keyboardType="numeric"
                placeholder="e.g. 1150"
                placeholderTextColor="#555"
                maxLength={4}
              />
              <Text style={{ color: "#475569", fontSize: 12, textAlign: "center", marginBottom: 10 }}>
                Leave blank if you don't remember
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={[ob.nextBtn, !satExperience && { opacity: 0.4 }, { marginTop: 10 }]}
            onPress={() => setOnboardingStep(5)}
            disabled={!satExperience}
          >
            <Text style={ob.nextBtnText}>Next →</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setOnboardingStep(3)} style={{ marginTop: 4 }}>
            <Text style={styles.link}>← Back</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    }

    if (onboardingStep === 5) {
      const gradeOptions = [
        { key: "9", label: "9th Grade" },
        { key: "10", label: "10th Grade" },
        { key: "11", label: "11th Grade" },
        { key: "12", label: "12th Grade" },
        { key: "gap", label: "Gap Year / Other" },
      ];
      const prepOptions = [
        { key: "none", label: "No prep yet", icon: "🚀" },
        { key: "self_study", label: "Self-studying", icon: "📖" },
        { key: "khan", label: "Khan Academy", icon: "🎓" },
        { key: "tutor", label: "Private tutor", icon: "👤" },
        { key: "class", label: "Prep course / class", icon: "🏫" },
        { key: "multiple", label: "Multiple methods", icon: "🔀" },
      ];
      return (
        <ScrollView style={{ flex: 1, backgroundColor: "#0b1020" }} contentContainerStyle={{ padding: 24, paddingTop: 60, paddingBottom: 40 }}>
          <View style={ob.progressRow}>
            <View style={[ob.progressDot, ob.progressDotActive]} />
            <View style={[ob.progressLine, ob.progressLineActive]} />
            <View style={[ob.progressDot, ob.progressDotActive]} />
            <View style={[ob.progressLine, ob.progressLineActive]} />
            <View style={[ob.progressDot, ob.progressDotActive]} />
            <View style={[ob.progressLine, ob.progressLineActive]} />
            <View style={[ob.progressDot, ob.progressDotActive]} />
            <View style={[ob.progressLine, ob.progressLineActive]} />
            <View style={[ob.progressDot, ob.progressDotActive]} />
          </View>
          <Text style={ob.stepLabel}>Step 5 of 5</Text>
          <Text style={ob.heading}>Almost done! 🎉</Text>
          <Text style={ob.sub}>A couple more things to personalize your experience</Text>

          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16, marginBottom: 12 }}>What grade are you in?</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
            {gradeOptions.map((opt) => {
              const selected = gradeLevel === opt.key;
              return (
                <TouchableOpacity
                  key={opt.key}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 24,
                    borderWidth: 2,
                    borderColor: selected ? "#f5c518" : "#2a3a5c",
                    backgroundColor: selected ? "#2a2a10" : "#151c36",
                  }}
                  onPress={() => setGradeLevel(opt.key)}
                >
                  <Text style={{ color: selected ? "#f5c518" : "#9aa4c7", fontWeight: selected ? "700" : "400", fontSize: 14 }}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16, marginBottom: 12 }}>How are you currently prepping?</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
            {prepOptions.map((opt) => {
              const selected = prepMethod === opt.key;
              return (
                <TouchableOpacity
                  key={opt.key}
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    borderRadius: 24,
                    borderWidth: 2,
                    borderColor: selected ? "#f5c518" : "#2a3a5c",
                    backgroundColor: selected ? "#2a2a10" : "#151c36",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                  }}
                  onPress={() => setPrepMethod(opt.key)}
                >
                  <Text style={{ fontSize: 14 }}>{opt.icon}</Text>
                  <Text style={{ color: selected ? "#f5c518" : "#9aa4c7", fontWeight: selected ? "700" : "400", fontSize: 13 }}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16, marginBottom: 12 }}>
            What's your biggest challenge with the SAT? <Text style={{ color: "#475569", fontWeight: "400", fontSize: 13 }}>(optional)</Text>
          </Text>
          <TextInput
            style={{
              backgroundColor: "#151c36",
              color: "#fff",
              padding: 14,
              borderRadius: 12,
              fontSize: 14,
              height: 90,
              textAlignVertical: "top",
              marginBottom: 24,
              borderWidth: 1,
              borderColor: "#2a3a5c",
            }}
            value={satChallenge}
            onChangeText={setSatChallenge}
            placeholder="e.g. Running out of time on math, hard vocab words..."
            placeholderTextColor="#475569"
            multiline
            maxLength={200}
          />

          <TouchableOpacity
            style={[ob.nextBtn, (!gradeLevel || !prepMethod) && { opacity: 0.4 }]}
            disabled={!gradeLevel || !prepMethod}
            onPress={async () => {
              const safeDate = typeof testDate === "string" ? new Date(testDate) : testDate;
              const isoDateString = isNaN(safeDate.getTime()) ? new Date().toISOString() : safeDate.toISOString();
              const profileData = {
                targetScore: Number(targetScore),
                testDate: isoDateString,
                email,
                name: userName.trim(),
                satExperience,
                currentScore: currentScore ? Number(currentScore) : null,
                gradeLevel,
                prepMethod,
                satChallenge: satChallenge.trim(),
                createdAt: new Date().toISOString(),
              };
              await saveUserProfile(userId, profileData);
              await saveSession(userId, email, isAdmin);
              setScreen("app");
              setView("home");
            }}
          >
            <Text style={ob.nextBtnText}>Let's Go! 🚀</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setOnboardingStep(4)} style={{ marginTop: 4 }}>
            <Text style={styles.link}>← Back</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    }
  }

  /* ---------------- HOME ---------------- */
  if (view === "home") {
  const days = userProfile?.testDate ? daysUntil(userProfile.testDate) : null;
  const homeBg = isLight ? "#f1f5f9" : "#0b1020";
  const titleColor = isLight ? "#0f172a" : "#fff";
  const subColor = isLight ? "#475569" : "#9aa4c7";
  const accentColor = isLight ? "#1d4ed8" : "#f5c518";

  return (
    <View style={{ flex: 1, backgroundColor: homeBg }}>
      <ScrollView style={{ flex: 1, backgroundColor: homeBg, padding: 20 }} contentContainerStyle={{ paddingBottom: 100 }}>
        <StatusBar barStyle={isLight ? "dark-content" : "light-content"} />

        {/* Header */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Image source={require("./logo.png")} style={{ width: 30, height: 30, borderRadius: 8 }} resizeMode="contain" />
            <Text style={{ color: titleColor, fontSize: 18, fontWeight: "800" }}>AscendSAT</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            {isAdmin && (
              <TouchableOpacity style={{ padding: 6, backgroundColor: "#4a1d96", borderRadius: 8 }} onPress={() => { loadAdminQuestions(); loadTestimonials(); loadGlobalStats(); setView("admin"); }}>
                <Text style={{ color: "#fff", fontSize: 11 }}>Admin</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={{ padding: 7, backgroundColor: isLight ? "#e2e8f0" : "#1a2540", borderRadius: 8 }} onPress={() => setThemeMode(isLight ? "dark" : "light")}>
              <Text style={{ fontSize: 14 }}>{isLight ? "☀️" : "🌙"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 6, backgroundColor: isLight ? "#e2e8f0" : "#1a2540", borderRadius: 8 }} onPress={() => {
              setEditTargetScore(String(userProfile?.targetScore || ""));
              const d = userProfile?.testDate ? new Date(userProfile.testDate) : new Date();
              setEditTestDate(d);
              setEditTestDateInput(d.toLocaleDateString("en-US"));
              setProfileSaved(false);
              setView("settings");
            }}>
              <Text style={{ color: isLight ? "#334155" : "#9aa4c7", fontSize: 12 }}>⚙️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 6, backgroundColor: isLight ? "#e2e8f0" : "#2a2f55", borderRadius: 8, paddingHorizontal: 10 }} onPress={handleLogout}>
              <Text style={{ color: isLight ? "#334155" : "#fff", fontSize: 11, fontWeight: "700" }}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Greeting */}
        {(() => {
          const hour = new Date().getHours();
          const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
          const displayName = userProfile?.name || userName || null;
          return (
            <View style={{ marginBottom: 20 }}>
              <Text style={{ color: titleColor, fontSize: 22, fontWeight: "900", letterSpacing: -0.5 }}>
                {greeting}{displayName ? `, ${displayName} 👋` : " 👋"}
              </Text>
              <Text style={{ color: subColor, fontSize: 13, marginTop: 4 }}>
                {days !== null && days <= 7 ? `⚡ ${days} day${days === 1 ? "" : "s"} until your test.` : "Your target score is within reach."}
              </Text>
            </View>
          );
        })()}

        {/* Stats strip */}
        {userProfile && (
          <View style={{
            backgroundColor: isLight ? "#fff" : T.bg2,
            borderRadius: 16, padding: 16, marginBottom: 16,
            borderWidth: 1, borderColor: isLight ? "#e2e8f0" : T.bg4,
          }}>
            <View style={{ flexDirection: "row", marginBottom: 14 }}>
              {[
                { val: userProfile.targetScore || "—", label: "Target", color: accentColor },
                { val: days === null ? "—" : days <= 0 ? "Today" : days, label: "Days Left", color: days !== null && days <= 7 ? "#dc2626" : accentColor },
                { val: scoreHistory.length, label: "Quizzes", color: accentColor },
              ].map(({ val, label, color }, i) => (
                <View key={label} style={{ flex: 1, alignItems: "center" }}>
                  {i > 0 && <View style={{ position: "absolute", left: 0, top: "10%", bottom: "10%", width: 1, backgroundColor: isLight ? "#e2e8f0" : T.bg4 }} />}
                  <Text style={{ color, fontSize: 26, fontWeight: "900", letterSpacing: -0.5 }}>{val}</Text>
                  <Text style={{ color: subColor, fontSize: 10, marginTop: 3, fontWeight: "700", textTransform: "uppercase", letterSpacing: 1 }}>{label}</Text>
                </View>
              ))}
            </View>
            {/* Streak */}
            <View style={{ backgroundColor: isLight ? "#fffbeb" : "#1a1400", borderRadius: 10, padding: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 1, borderColor: isLight ? "#fde68a" : "#2a2000" }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Text style={{ fontSize: 22 }}>{streakData.currentStreak >= 7 ? "🔥" : "⚡"}</Text>
                <View>
                  <Text style={{ color: isLight ? "#92400e" : "#f5c518", fontWeight: "900", fontSize: 18 }}>{streakData.currentStreak} day{streakData.currentStreak !== 1 ? "s" : ""}</Text>
                  <Text style={{ color: isLight ? "#a16207" : "#a37c00", fontSize: 10, fontWeight: "600" }}>Current Streak</Text>
                </View>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ color: isLight ? "#a16207" : "#f5c518", fontWeight: "800", fontSize: 14 }}>{streakData.longestStreak || 0}</Text>
                <Text style={{ color: isLight ? "#a16207" : "#a37c00", fontSize: 10, fontWeight: "600" }}>Best</Text>
              </View>
            </View>
          </View>
        )}

        {/* PRIMARY: Start Practice */}
        <TouchableOpacity
          style={{ borderRadius: 14, padding: 20, marginBottom: 10, backgroundColor: isLight ? T.blue : T.gold, shadowColor: isLight ? T.blue : T.gold, shadowOpacity: 0.25, shadowRadius: 14, shadowOffset: { width: 0, height: 4 }, elevation: 6 }}
          onPress={() => setView("practice")} activeOpacity={0.88}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
            <View style={{ width: 46, height: 46, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.18)", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: isLight ? "#fff" : "#070d1f", fontWeight: "900", fontSize: 13 }}>SAT</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: isLight ? "#fff" : "#070d1f", fontWeight: "900", fontSize: 17 }}>Start Practice</Text>
              <Text style={{ color: isLight ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.45)", fontSize: 12, marginTop: 2 }}>All domains · choose difficulty & count</Text>
            </View>
            <Text style={{ color: isLight ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)", fontSize: 20 }}>›</Text>
          </View>
        </TouchableOpacity>

        {/* SECONDARY ROW: Full Test + Adaptive */}
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: isLight ? "#0f172a" : "#0d1525", borderRadius: 14, padding: 16, borderWidth: 1, borderColor: isLight ? "#1e293b" : "#1e3a5f" }}
            onPress={() => { setFullTestPhase("intro"); setFullTestModalVisible(true); }} activeOpacity={0.88}
          >
            <Text style={{ color: "#60a5fa", fontSize: 11, fontWeight: "900", letterSpacing: 1, marginBottom: 6 }}>TIMED</Text>
            <Text style={{ color: "#fff", fontWeight: "800", fontSize: 14 }}>Full-Length{"\n"}Test</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: isLight ? "#faf5ff" : "#0e0c1a", borderRadius: 14, padding: 16, borderWidth: 1, borderColor: isLight ? "#e9d5ff" : "#2d1f4e" }}
            onPress={() => { setAdaptivePhase("intro"); setAdaptiveModalVisible(true); }} activeOpacity={0.88}
          >
            <Text style={{ color: isLight ? "#7c3aed" : "#a78bfa", fontSize: 11, fontWeight: "900", letterSpacing: 1, marginBottom: 6 }}>ADAPTIVE</Text>
            <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "800", fontSize: 14 }}>Smart{"\n"}Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: isLight ? "#eff6ff" : "#0c1624", borderRadius: 14, padding: 16, borderWidth: 1, borderColor: isLight ? "#bfdbfe" : "#172033" }}
            onPress={() => { loadClasses(); setView("classes"); }} activeOpacity={0.88}
          >
            <Text style={{ color: isLight ? "#1d4ed8" : "#60a5fa", fontSize: 11, fontWeight: "900", letterSpacing: 1, marginBottom: 6 }}>LIVE</Text>
            <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "800", fontSize: 14 }}>Book a{"\n"}Class</Text>
          </TouchableOpacity>
        </View>

        {/* TOOLS ROW */}
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
          {[
            { label: "Drills", icon: "⚡", color: isLight ? "#7c3aed" : "#a78bfa", bg: isLight ? "#faf5ff" : "#0e0c1a", border: isLight ? "#e9d5ff" : "#1c1630", onPress: () => { setDrillDomain(null); setDrillDifficulty(null); setDrillFinished(false); setDrillModalVisible(true); } },
            { label: "Growth", icon: "📊", color: isLight ? "#16a34a" : "#4ade80", bg: isLight ? "#f0fdf4" : "#0c1a10", border: isLight ? "#bbf7d0" : "#172413", onPress: () => { setView("growth"); loadScoreHistory(); } },
            { label: "Vocab", icon: "📖", color: isLight ? "#0ea5e9" : "#38bdf8", bg: isLight ? "#f0f9ff" : "#0a1520", border: isLight ? "#bae6fd" : "#152030", onPress: () => setVocabModalVisible(true) },
            { label: "History", icon: "🕑", color: isLight ? "#d97706" : "#f5c518", bg: isLight ? "#fffbeb" : "#14100a", border: isLight ? "#fde68a" : "#261e0e", onPress: () => { loadScoreHistory(); setView("history"); } },
            { label: "Games", icon: "🎮", color: isLight ? "#dc2626" : "#f87171", bg: isLight ? "#fff1f2" : "#160c0c", border: isLight ? "#fecdd3" : "#2a1212", onPress: () => { setGameMode(null); setGameModalVisible(true); } },
          ].map(({ label, icon, color, bg, border, onPress: op }) => (
            <TouchableOpacity key={label} style={{ flex: 1, backgroundColor: bg, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: border, alignItems: "center" }} onPress={op} activeOpacity={0.82}>
              <Text style={{ fontSize: 18, marginBottom: 4 }}>{icon}</Text>
              <Text style={{ color, fontSize: 10, fontWeight: "800", textAlign: "center" }}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* MORE TOOLS — collapsible-style list */}
        <View style={{ backgroundColor: isLight ? "#fff" : "#0d1525", borderRadius: 14, borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#1a2540", overflow: "hidden", marginBottom: 10 }}>
          {[
            { label: "Diagnostic & Study Plan", sub: "Personalized roadmap", icon: "🎯", onPress: () => { setDiagStep(1); setDiagnosticModalVisible(true); } },
            { label: "Mistake Journal", sub: "Review every wrong answer", icon: "📕", onPress: () => { loadScoreHistory(); setMistakeJournalVisible(true); } },
            { label: "Formula Sheet", sub: "Every SAT math formula", icon: "📐", onPress: () => setFormulaSheetVisible(true) },
            { label: "Badges", sub: `${badges.length}/${BADGE_DEFINITIONS.length} earned`, icon: "🏅", onPress: () => setBadgesModalVisible(true) },
            { label: "Weekly Summary", sub: "This week at a glance", icon: "📅", onPress: () => setWeeklySummaryVisible(true) },
            { label: "Time Analytics", sub: "Avg time per question", icon: "⏱", onPress: () => setView("timeAnalytics") },
            { label: "Lessons", sub: "Learn concepts with guided notes", icon: "🎓", onPress: () => { loadLessons(); setLessonsModalVisible(true); } },
            { label: "Give Feedback", sub: "Rate the app", icon: "💬", onPress: () => { setFeedbackSent(false); setFeedbackRating(0); setFeedbackText(""); setFeedbackCategory("general"); setFeedbackModalVisible(true); } },
            { label: "Ask for Help", sub: "Message your tutor", icon: "🙋", onPress: () => { setHelpSent(false); setView("help"); } },
          ].map(({ label, sub, icon, onPress: op }, i, arr) => (
            <TouchableOpacity key={label} style={{ flexDirection: "row", alignItems: "center", paddingVertical: 13, paddingHorizontal: 16, gap: 12, borderBottomWidth: i < arr.length - 1 ? 1 : 0, borderBottomColor: isLight ? "#f1f5f9" : "#131e30" }} onPress={op} activeOpacity={0.8}>
              <Text style={{ fontSize: 18, width: 26, textAlign: "center" }}>{icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ color: titleColor, fontWeight: "700", fontSize: 14 }}>{label}</Text>
                <Text style={{ color: subColor, fontSize: 11, marginTop: 1 }}>{sub}</Text>
              </View>
              <Text style={{ color: isLight ? "#cbd5e1" : "#243050", fontSize: 16 }}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* All the existing modals below — keep everything from vocabModalVisible onward */}
      {vocabModalVisible && vocabMode === null && (
        <Modal visible={true} transparent animationType="fade">
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center", padding: 24 }}>
            <View style={{ backgroundColor: "#0f1829", borderRadius: 20, padding: 24, borderWidth: 1, borderColor: "#1a2540" }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <Text style={{ color: "#fff", fontSize: 20, fontWeight: "800" }}>📖 Vocabulary</Text>
                <TouchableOpacity onPress={() => setVocabModalVisible(false)}>
                  <Text style={{ color: "#9aa4c7", fontSize: 22 }}>✕</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ color: "#9aa4c7", fontSize: 14, marginBottom: 20 }}>{VOCAB_LIST.length} SAT words ready to study</Text>
              <TouchableOpacity style={{ backgroundColor: "#f5c518", padding: 16, borderRadius: 12, alignItems: "center", marginBottom: 12 }}
                onPress={() => { const shuffled = [...VOCAB_LIST].sort(() => Math.random() - 0.5); setFlashcardDeck(shuffled); setFlashcardIndex(0); setFlashcardFlipped(false); setVocabMode("flashcard"); }}>
                <Text style={{ color: "#070d1f", fontWeight: "800", fontSize: 16 }}>🃏 Flashcards</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: "#1f2a52", padding: 16, borderRadius: 12, alignItems: "center", marginBottom: 12 }}
                onPress={() => { setVocabSearch(""); setVocabMode("list"); }}>
                <Text style={{ color: "#fff", fontWeight: "800", fontSize: 16 }}>📋 Word List</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: "#1a3a2a", padding: 16, borderRadius: 12, alignItems: "center", marginBottom: 12 }}
                onPress={() => { const shuffled = [...VOCAB_LIST].sort(() => Math.random() - 0.5); const word = shuffled[0]; const wrong = shuffled.slice(1, 4).map(w => w.d); setQuizWord(word); setQuizChoices([word.d, ...wrong].sort(() => Math.random() - 0.5)); setQuizSelected(null); setQuizScore(0); setQuizTotal(0); setFlashcardDeck(shuffled); setFlashcardIndex(0); setVocabMode("quiz"); }}>
                <Text style={{ color: "#4caf50", fontWeight: "800", fontSize: 16 }}>🧠 Vocab Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: "#1a2540", padding: 16, borderRadius: 12, alignItems: "center" }}
                onPress={() => setVocabMode("progress")}>
                <Text style={{ color: "#9aa4c7", fontWeight: "800", fontSize: 16 }}>📈 My Progress</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {vocabModalVisible && vocabMode === "flashcard" && (() => {
        const card = flashcardDeck[flashcardIndex];
        if (!card) return null;
        return (
          <Modal visible={true} animationType="slide">
            <SafeAreaView style={{ flex: 1, backgroundColor: "#0b1020" }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: "#151c36" }}>
                <TouchableOpacity onPress={() => setVocabMode(null)}><Text style={{ color: "#9aa4c7", fontSize: 16 }}>← Back</Text></TouchableOpacity>
                <Text style={{ color: "#fff", fontWeight: "700" }}>{flashcardIndex + 1} / {flashcardDeck.length}</Text>
                <TouchableOpacity onPress={() => { setVocabModalVisible(false); setVocabMode(null); }}><Text style={{ color: "#9aa4c7", fontSize: 16 }}>✕</Text></TouchableOpacity>
              </View>
              <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
                <TouchableOpacity style={{ backgroundColor: flashcardFlipped ? "#1a3a2a" : "#151c36", borderRadius: 20, padding: 32, alignItems: "center", minHeight: 220, justifyContent: "center", borderWidth: 2, borderColor: flashcardFlipped ? "#4caf50" : "#2a3a5c" }} onPress={() => setFlashcardFlipped(!flashcardFlipped)} activeOpacity={0.85}>
                  {!flashcardFlipped ? (<><Text style={{ color: "#9aa4c7", fontSize: 12, marginBottom: 12 }}>{card.p}</Text><Text style={{ color: "#f5c518", fontSize: 32, fontWeight: "800", textAlign: "center" }}>{card.w}</Text><Text style={{ color: "#475569", fontSize: 13, marginTop: 20 }}>Tap to reveal</Text></>) : (<><Text style={{ color: "#f5c518", fontSize: 20, fontWeight: "700", marginBottom: 12 }}>{card.w}</Text><Text style={{ color: "#fff", fontSize: 17, textAlign: "center", lineHeight: 26 }}>{card.d}</Text></>)}
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", padding: 20, gap: 12 }}>
                <TouchableOpacity style={{ flex: 1, backgroundColor: "#151c36", padding: 14, borderRadius: 12, alignItems: "center" }} onPress={() => { setFlashcardIndex(Math.max(0, flashcardIndex - 1)); setFlashcardFlipped(false); }} disabled={flashcardIndex === 0}><Text style={{ color: flashcardIndex === 0 ? "#475569" : "#fff", fontWeight: "700" }}>← Prev</Text></TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, backgroundColor: "#f5c518", padding: 14, borderRadius: 12, alignItems: "center" }} onPress={() => { setFlashcardIndex(flashcardIndex + 1); setFlashcardFlipped(false); }} disabled={flashcardIndex === flashcardDeck.length - 1}><Text style={{ color: "#070d1f", fontWeight: "700" }}>Next →</Text></TouchableOpacity>
              </View>
            </SafeAreaView>
          </Modal>
        );
      })()}

      {vocabModalVisible && vocabMode === "list" && (
        <Modal visible={true} animationType="slide">
          <SafeAreaView style={{ flex: 1, backgroundColor: "#0b1020" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: "#151c36" }}>
              <TouchableOpacity onPress={() => setVocabMode(null)}><Text style={{ color: "#9aa4c7", fontSize: 16 }}>← Back</Text></TouchableOpacity>
              <Text style={{ color: "#fff", fontWeight: "700" }}>Word List</Text>
              <TouchableOpacity onPress={() => { setVocabModalVisible(false); setVocabMode(null); }}><Text style={{ color: "#9aa4c7", fontSize: 16 }}>✕</Text></TouchableOpacity>
            </View>
            <View style={{ padding: 12 }}>
              <TextInput style={{ backgroundColor: "#151c36", color: "#fff", padding: 12, borderRadius: 10, fontSize: 15 }} placeholder="Search words..." placeholderTextColor="#555" value={vocabSearch} onChangeText={setVocabSearch} />
            </View>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 30 }}>
              {VOCAB_LIST.filter(v => v.w.toLowerCase().includes(vocabSearch.toLowerCase()) || v.d.toLowerCase().includes(vocabSearch.toLowerCase())).map((v, i) => (
                <View key={i} style={{ backgroundColor: "#151c36", borderRadius: 10, padding: 14, marginBottom: 8 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                    <Text style={{ color: "#f5c518", fontWeight: "700", fontSize: 16 }}>{v.w}</Text>
                    <Text style={{ color: "#475569", fontSize: 12, marginLeft: 8 }}>{v.p}</Text>
                  </View>
                  <Text style={{ color: "#fff", fontSize: 14, lineHeight: 20 }}>{v.d}</Text>
                </View>
              ))}
            </ScrollView>
          </SafeAreaView>
        </Modal>
      )}

      {vocabModalVisible && vocabMode === "quiz" && (() => {
        if (!quizWord) return null;
        const isAnswered = quizSelected !== null;
        return (
          <Modal visible={true} animationType="slide">
            <SafeAreaView style={{ flex: 1, backgroundColor: "#0b1020" }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: "#151c36" }}>
                <TouchableOpacity onPress={() => setVocabMode(null)}><Text style={{ color: "#9aa4c7", fontSize: 16 }}>← Back</Text></TouchableOpacity>
                <Text style={{ color: "#fff", fontWeight: "700" }}>Score: {quizScore}/{quizTotal}</Text>
                <TouchableOpacity onPress={() => { setVocabModalVisible(false); setVocabMode(null); }}><Text style={{ color: "#9aa4c7", fontSize: 16 }}>✕</Text></TouchableOpacity>
              </View>
              <ScrollView contentContainerStyle={{ padding: 24 }}>
                <Text style={{ color: "#9aa4c7", fontSize: 12, marginBottom: 8 }}>WHAT DOES THIS WORD MEAN?</Text>
                <Text style={{ color: "#f5c518", fontSize: 36, fontWeight: "800", marginBottom: 8 }}>{quizWord.w}</Text>
                <Text style={{ color: "#475569", fontSize: 14, marginBottom: 32 }}>{quizWord.p}</Text>
                {quizChoices.map((choice, i) => {
                  const isCorrect = choice === quizWord.d;
                  const isSelected = choice === quizSelected;
                  let bg = "#151c36";
                  if (isAnswered && isCorrect) bg = "#1a4d2e";
                  else if (isAnswered && isSelected && !isCorrect) bg = "#4d1a1a";
                  return (
                    <TouchableOpacity key={i} style={{ backgroundColor: bg, borderRadius: 12, padding: 16, marginBottom: 10, borderWidth: 1.5, borderColor: isAnswered && isCorrect ? "#4caf50" : isAnswered && isSelected ? "#ff4d4d" : "#2a3a5c" }}
                      onPress={() => { if (isAnswered) return; setQuizSelected(choice); setQuizTotal(quizTotal + 1); if (choice === quizWord.d) setQuizScore(quizScore + 1); }} disabled={isAnswered}>
                      <Text style={{ color: "#fff", fontSize: 15, lineHeight: 22 }}>{choice}</Text>
                    </TouchableOpacity>
                  );
                })}
                {isAnswered && (
                  <TouchableOpacity style={{ backgroundColor: "#f5c518", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 8 }}
                    onPress={() => { const shuffled = [...VOCAB_LIST].sort(() => Math.random() - 0.5); const next = shuffled[0]; const wrong = shuffled.slice(1, 4).map(w => w.d); setQuizWord(next); setQuizChoices([next.d, ...wrong].sort(() => Math.random() - 0.5)); setQuizSelected(null); }}>
                    <Text style={{ color: "#070d1f", fontWeight: "800", fontSize: 16 }}>Next Word →</Text>
                  </TouchableOpacity>
                )}
              </ScrollView>
            </SafeAreaView>
          </Modal>
        );
      })()}

      {vocabModalVisible && vocabMode === "progress" && (
        <Modal visible={true} animationType="slide">
          <SafeAreaView style={{ flex: 1, backgroundColor: "#0b1020" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: "#151c36" }}>
              <TouchableOpacity onPress={() => setVocabMode(null)}><Text style={{ color: "#9aa4c7", fontSize: 16 }}>← Back</Text></TouchableOpacity>
              <Text style={{ color: "#fff", fontWeight: "700" }}>My Progress</Text>
              <TouchableOpacity onPress={() => { setVocabModalVisible(false); setVocabMode(null); }}><Text style={{ color: "#9aa4c7", fontSize: 16 }}>✕</Text></TouchableOpacity>
            </View>
            {(() => {
              const mastery = VOCAB_LIST.filter(v => vocabProgress[v.w] === "mastery").length;
              const proficient = VOCAB_LIST.filter(v => vocabProgress[v.w] === "proficient").length;
              const familiar = VOCAB_LIST.filter(v => vocabProgress[v.w] === "familiar").length;
              const unseen = VOCAB_LIST.length - mastery - proficient - familiar;
              const total = VOCAB_LIST.length;
              return (
                <ScrollView contentContainerStyle={{ padding: 20 }}>
                  <View style={{ backgroundColor: "#151c36", borderRadius: 16, padding: 20, marginBottom: 20 }}>
                    <Text style={{ color: "#fff", fontWeight: "800", fontSize: 18, marginBottom: 4 }}>{mastery + proficient + familiar} / {total} studied</Text>
                    <View style={{ height: 12, backgroundColor: "#2a3a5c", borderRadius: 6, overflow: "hidden", flexDirection: "row", marginTop: 10 }}>
                      {mastery > 0 && <View style={{ width: `${(mastery / total) * 100}%`, height: 12, backgroundColor: "#f5c518" }} />}
                      {proficient > 0 && <View style={{ width: `${(proficient / total) * 100}%`, height: 12, backgroundColor: "#4caf50" }} />}
                      {familiar > 0 && <View style={{ width: `${(familiar / total) * 100}%`, height: 12, backgroundColor: "#60a5fa" }} />}
                    </View>
                  </View>
                  {[
                    { label: "Mastery", count: mastery, color: "#f5c518", bg: "#3a2a10" },
                    { label: "Proficient", count: proficient, color: "#4caf50", bg: "#1a3a2a" },
                    { label: "Familiar", count: familiar, color: "#60a5fa", bg: "#1a3a4a" },
                    { label: "Unseen", count: unseen, color: "#9aa4c7", bg: "#151c36" },
                  ].map(({ label, count, color, bg }) => (
                    <View key={label} style={{ backgroundColor: bg, borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: color + "44" }}>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ color, fontWeight: "800", fontSize: 16 }}>{label}</Text>
                        <Text style={{ color, fontWeight: "800", fontSize: 22 }}>{count}</Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              );
            })()}
          </SafeAreaView>
        </Modal>
      )}

      {/* --- LESSONS MODAL --- */}
      <Modal visible={lessonsModalVisible} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: isLight ? "#f8fafc" : "#0b1020" }}>
          {!selectedLesson ? (
            <>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: isLight ? "#e2e8f0" : "#151c36" }}>
                <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "800", fontSize: 18 }}>🎓 Lessons</Text>
                <TouchableOpacity onPress={() => setLessonsModalVisible(false)}><Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 16 }}>✕ Close</Text></TouchableOpacity>
              </View>
              <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
                {lessonsLoading ? (
                  <Text style={{ color: isLight ? "#475569" : "#9aa4c7", textAlign: "center", marginTop: 40 }}>Loading lessons...</Text>
                ) : lessonsList.length === 0 ? (
                  <View style={{ backgroundColor: isLight ? "#fff" : "#0f1829", borderRadius: 18, padding: 32, alignItems: "center", borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#1a2540" }}>
                    <Text style={{ fontSize: 40, marginBottom: 12 }}>📚</Text>
                    <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "800", fontSize: 18, marginBottom: 8 }}>No lessons yet</Text>
                    <Text style={{ color: isLight ? "#475569" : "#9aa4c7", textAlign: "center" }}>Lessons will appear here once your tutor adds them.</Text>
                  </View>
                ) : (
                  lessonsList.map(lesson => (
                    <TouchableOpacity
                      key={lesson.id}
                      style={{ backgroundColor: isLight ? "#fff" : "#0f1829", borderRadius: 16, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#1a2540" }}
                      onPress={() => setSelectedLesson(lesson)}
                    >
                      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                        <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "800", fontSize: 16, flex: 1 }}>{lesson.title}</Text>
                        <Text style={{ color: isLight ? "#cbd5e1" : "#2a3a5c", fontSize: 18 }}>›</Text>
                      </View>
                      {lesson.domain ? (
                        <View style={{ flexDirection: "row", gap: 8, marginBottom: 6 }}>
                          <View style={{ backgroundColor: isLight ? "#eff6ff" : "#0c1624", paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 }}>
                            <Text style={{ color: isLight ? "#1d4ed8" : "#60a5fa", fontSize: 12, fontWeight: "700" }}>{lesson.domain}</Text>
                          </View>
                          {lesson.difficulty && lesson.difficulty !== "All" && (
                            <View style={{ backgroundColor: lesson.difficulty === "Hard" ? "#fef2f2" : lesson.difficulty === "Medium" ? "#fffbeb" : "#f0fdf4", paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 }}>
                              <Text style={{ color: lesson.difficulty === "Hard" ? "#dc2626" : lesson.difficulty === "Medium" ? "#d97706" : "#16a34a", fontSize: 12, fontWeight: "700" }}>{lesson.difficulty}</Text>
                            </View>
                          )}
                        </View>
                      ) : null}
                      <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 13, lineHeight: 20 }} numberOfLines={2}>{lesson.content}</Text>
                      {lesson.practiceQuestions?.length > 0 && (
                        <Text style={{ color: isLight ? "#16a34a" : "#4ade80", fontSize: 12, fontWeight: "700", marginTop: 8 }}>✏️ {lesson.practiceQuestions.length} practice question{lesson.practiceQuestions.length > 1 ? "s" : ""}</Text>
                      )}
                    </TouchableOpacity>
                  ))
                )}
              </ScrollView>
            </>
          ) : (
            <LessonDetailView
              lesson={selectedLesson}
              isLight={isLight}
              onBack={() => setSelectedLesson(null)}
            />
          )}
        </SafeAreaView>
      </Modal>

      {/* Keep all the existing big modals below (adaptive, full test, weak spot, mistake journal, badges, formula sheet, weekly summary, feedback, diagnostic, mini games, drills, Casper bot) */}
      {/* --- ADAPTIVE QUIZ MODAL --- */}
      <Modal visible={adaptiveModalVisible} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: isLight ? "#f8fafc" : "#0b1020" }}>
          {adaptivePhase === "intro" && (
            <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 60 }}>
              <TouchableOpacity onPress={() => setAdaptiveModalVisible(false)} style={{ marginBottom: 20 }}>
                <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 16 }}>✕ Close</Text>
              </TouchableOpacity>
              <Text style={{ color: isLight ? "#0f172a" : "#fff", fontSize: 26, fontWeight: "900", marginBottom: 16 }}>🧠 Adaptive Quiz</Text>
              <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 15, lineHeight: 24, marginBottom: 24 }}>15 questions that get harder or easier based on your answers. Estimates your SAT section score.</Text>
              <TouchableOpacity style={{ backgroundColor: isLight ? "#eff6ff" : "#0c1624", borderRadius: 14, padding: 20, marginBottom: 10, borderWidth: 2, borderColor: adaptiveSection === "Math" ? "#1d4ed8" : (isLight ? "#bfdbfe" : "#1a2540"), flexDirection: "row", alignItems: "center", gap: 14 }} onPress={() => setAdaptiveSection("Math")}>
                <Text style={{ fontSize: 28 }}>📐</Text>
                <View style={{ flex: 1 }}><Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "800", fontSize: 16 }}>Math</Text></View>
                {adaptiveSection === "Math" && <Text style={{ color: "#1d4ed8", fontSize: 20 }}>✓</Text>}
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: isLight ? "#f0fdf4" : "#0c1a10", borderRadius: 14, padding: 20, marginBottom: 24, borderWidth: 2, borderColor: adaptiveSection === "Reading & Writing" ? "#16a34a" : (isLight ? "#bbf7d0" : "#1a2540"), flexDirection: "row", alignItems: "center", gap: 14 }} onPress={() => setAdaptiveSection("Reading & Writing")}>
                <Text style={{ fontSize: 28 }}>📝</Text>
                <View style={{ flex: 1 }}><Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "800", fontSize: 16 }}>Reading & Writing</Text></View>
                {adaptiveSection === "Reading & Writing" && <Text style={{ color: "#16a34a", fontSize: 20 }}>✓</Text>}
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: isLight ? "#7c3aed" : "#a78bfa", padding: 18, borderRadius: 14, alignItems: "center" }} onPress={() => startAdaptiveQuiz(adaptiveSection)}>
                <Text style={{ color: "#fff", fontWeight: "900", fontSize: 17 }}>Start Adaptive Quiz →</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
          {adaptivePhase === "quiz" && adaptiveQuestions.length > 0 && (() => {
            const q = adaptiveQuestions[adaptiveIndex];
            if (!q) return null;
            const selectedAnswer = adaptiveUserAnswers[adaptiveIndex] ?? null;
            const isAnswered = selectedAnswer !== null;
            const diffColor = adaptiveCurrentDiff === "Hard" ? "#dc2626" : adaptiveCurrentDiff === "Medium" ? "#d97706" : "#16a34a";
            return (
              <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: isLight ? "#fff" : "#0b1020", paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: isLight ? "#e2e8f0" : "#1a2540" }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <TouchableOpacity onPress={() => { if (adaptiveTimerRef.current) clearInterval(adaptiveTimerRef.current); setAdaptivePhase("intro"); }}><Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 14 }}>✕ Exit</Text></TouchableOpacity>
                    <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "800" }}>{adaptiveIndex + 1} / {ADAPTIVE_TOTAL}</Text>
                    <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700" }}>{formatTime(adaptiveElapsed)}</Text>
                  </View>
                  <View style={{ height: 6, backgroundColor: isLight ? "#e2e8f0" : "#1a2540", borderRadius: 3, overflow: "hidden", marginBottom: 8 }}>
                    <View style={{ height: 6, width: `${(adaptiveIndex / ADAPTIVE_TOTAL) * 100}%`, backgroundColor: isLight ? "#7c3aed" : "#a78bfa", borderRadius: 3 }} />
                  </View>
                  <View style={{ flexDirection: "row", gap: 8 }}>
                    <View style={{ backgroundColor: diffColor + "22", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 }}><Text style={{ color: diffColor, fontWeight: "800", fontSize: 12 }}>{adaptiveCurrentDiff}</Text></View>
                    {adaptiveStreak > 0 && <View style={{ backgroundColor: "#1a1400", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 }}><Text style={{ color: "#f5c518", fontWeight: "800", fontSize: 12 }}>🔥 {adaptiveStreak} streak</Text></View>}
                    <View style={{ marginLeft: "auto", backgroundColor: "#0d2a18", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 }}><Text style={{ color: "#16a34a", fontWeight: "800", fontSize: 12 }}>✓ {adaptiveScore}/{adaptiveIndex}</Text></View>
                  </View>
                </View>
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
                  <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 11, fontWeight: "600", marginBottom: 12 }}>{q.domain}</Text>
                  <Text style={{ color: isLight ? "#0f172a" : "#fff", fontSize: 17, lineHeight: 30, marginBottom: 24 }} selectable>{q.question}</Text>
                  <View style={{ height: 1, backgroundColor: isLight ? "#e2e8f0" : "#1a2540", marginBottom: 18 }} />
                  {q.choices.map((c, i) => {
                    const letter = ["A","B","C","D"][i];
                    const isSelected = selectedAnswer === i;
                    const isCorrect = i === q.answer;
                    let borderColor = isLight ? "#cbd5e1" : "#2a3a5c";
                    let bgColor = isLight ? "#fff" : "#0f1829";
                    if (isAnswered && isCorrect) { borderColor = "#16a34a"; bgColor = isLight ? "#f0fdf4" : "#0d2a18"; }
                    else if (isAnswered && isSelected && !isCorrect) { borderColor = "#dc2626"; bgColor = isLight ? "#fef2f2" : "#2a0d0d"; }
                    else if (isSelected) { borderColor = "#7c3aed"; bgColor = isLight ? "#faf5ff" : "#1e1040"; }
                    return (
                      <TouchableOpacity key={i} style={{ flexDirection: "row", alignItems: "flex-start", padding: 14, marginBottom: 10, borderRadius: 10, borderWidth: 1.5, borderColor, backgroundColor: bgColor, gap: 12 }} onPress={() => { if (!isAnswered) submitAdaptiveAnswer(i); }} disabled={isAnswered} activeOpacity={0.7}>
                        <View style={{ width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: isAnswered && isCorrect ? "#16a34a" : isAnswered && isSelected ? "#dc2626" : isSelected ? "#7c3aed" : isLight ? "#94a3b8" : "#475569", backgroundColor: isAnswered && isCorrect ? "#16a34a" : isAnswered && isSelected && !isCorrect ? "#dc2626" : isSelected ? "#7c3aed" : "transparent", justifyContent: "center", alignItems: "center", flexShrink: 0 }}>
                          <Text style={{ color: (isAnswered && isCorrect) || (isAnswered && isSelected) || isSelected ? "#fff" : isLight ? "#475569" : "#9aa4c7", fontWeight: "700", fontSize: 13 }}>{letter}</Text>
                        </View>
                        <Text style={{ color: isLight ? "#1e293b" : "#e2e8f0", fontSize: 15, lineHeight: 24, flex: 1, paddingTop: 4 }}>{c}</Text>
                      </TouchableOpacity>
                    );
                  })}
                  {isAnswered && (
                    <View style={{ backgroundColor: selectedAnswer === q.answer ? (isLight ? "#f0fdf4" : "#0d2a18") : (isLight ? "#fef2f2" : "#2a0d0d"), borderRadius: 14, padding: 16, marginTop: 8, borderWidth: 1, borderColor: selectedAnswer === q.answer ? "#16a34a44" : "#dc262644" }}>
                      <Text style={{ color: selectedAnswer === q.answer ? "#16a34a" : "#dc2626", fontWeight: "800", fontSize: 15, marginBottom: 6 }}>{selectedAnswer === q.answer ? "✅ Correct!" : "❌ Incorrect"}</Text>
                      <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 13, lineHeight: 20 }}>{q.explanation}</Text>
                    </View>
                  )}
                </ScrollView>
              </View>
            );
          })()}
          {adaptivePhase === "results" && (() => {
            const total = Math.min(adaptiveIndex, adaptiveQuestions.length);
            const pct = total > 0 ? Math.round((adaptiveScore / total) * 100) : 0;
            const est = getAdaptiveEstimatedScore();
            const estScore = adaptiveSection === "Math" ? est.math : est.rw;
            return (
              <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 60 }}>
                <Text style={{ color: isLight ? "#0f172a" : "#fff", fontSize: 24, fontWeight: "900", marginBottom: 20 }}>Adaptive Quiz Complete</Text>
                <View style={{ backgroundColor: isLight ? "#faf5ff" : "#0e0c1a", borderRadius: 20, padding: 28, alignItems: "center", marginBottom: 16, borderWidth: 1, borderColor: isLight ? "#e9d5ff" : "#2d1f4e" }}>
                  <Text style={{ color: isLight ? "#7c3aed" : "#a78bfa", fontSize: 13, fontWeight: "800", marginBottom: 8 }}>YOUR SCORE</Text>
                  <Text style={{ color: isLight ? "#0f172a" : "#fff", fontSize: 64, fontWeight: "900" }}>{adaptiveScore}/{total}</Text>
                  <Text style={{ color: isLight ? "#7c3aed" : "#a78bfa", fontSize: 28, fontWeight: "600" }}>{pct}%</Text>
                </View>
                <View style={{ backgroundColor: isLight ? "#fff" : "#0f1829", borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#1a2540", alignItems: "center" }}>
                  <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 13, fontWeight: "700", marginBottom: 6 }}>Score Indicator</Text>
                  <Text style={{ color: isLight ? "#7c3aed" : "#a78bfa", fontSize: 52, fontWeight: "900" }}>{estScore}</Text>
                </View>
                <TouchableOpacity style={{ backgroundColor: isLight ? "#7c3aed" : "#a78bfa", padding: 16, borderRadius: 12, alignItems: "center", marginBottom: 10 }} onPress={() => { setAdaptiveElapsed(0); startAdaptiveQuiz(adaptiveSection); }}>
                  <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>Try Again</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: isLight ? "#f1f5f9" : "#151c36", padding: 16, borderRadius: 12, alignItems: "center", borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#2a3a5c" }} onPress={() => { setAdaptiveModalVisible(false); setAdaptivePhase("intro"); }}>
                  <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700", fontSize: 16 }}>Back to Home</Text>
                </TouchableOpacity>
              </ScrollView>
            );
          })()}
        </SafeAreaView>
      </Modal>

      {/* Full length test modal - keep your existing one exactly as-is */}
      <Modal visible={fullTestModalVisible} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: isLight ? "#f8fafc" : "#0b1020" }}>
          {fullTestPhase === "intro" && (
            <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 60 }}>
              <TouchableOpacity onPress={() => setFullTestModalVisible(false)} style={{ marginBottom: 20 }}><Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 16 }}>✕ Close</Text></TouchableOpacity>
              <Text style={{ color: isLight ? "#0f172a" : "#fff", fontSize: 24, fontWeight: "900", marginBottom: 8 }}>Full-Length Practice Test</Text>
              <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 15, lineHeight: 24, marginBottom: 28 }}>Each module is timed exactly like the real SAT.</Text>
              <Text style={{ color: isLight ? "#1d4ed8" : "#60a5fa", fontWeight: "800", fontSize: 13, letterSpacing: 1.5, marginBottom: 12 }}>READING & WRITING</Text>
              {["rw1", "rw2"].map(key => {
                const config = FULL_TEST_CONFIG[key];
                const available = questionBank.filter(q => config.domains.includes(q.domain)).length;
                return (
                  <TouchableOpacity key={key} style={{ backgroundColor: isLight ? "#fff" : "#0f1829", borderRadius: 16, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#1a2540", flexDirection: "row", alignItems: "center", gap: 14 }} onPress={() => startFullTest(key)}>
                    <View style={{ width: 50, height: 50, borderRadius: 12, backgroundColor: isLight ? "#eff6ff" : "#0c1624", justifyContent: "center", alignItems: "center" }}><Text style={{ color: isLight ? "#1d4ed8" : "#60a5fa", fontWeight: "900", fontSize: 11, textAlign: "center" }}>R&W{"\n"}{key === "rw1" ? "M1" : "M2"}</Text></View>
                    <View style={{ flex: 1 }}><Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700", fontSize: 15 }}>{config.label}</Text><Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 13, marginTop: 3 }}>{config.count} questions · {config.time / 60} min · {available} available</Text></View>
                    <Text style={{ color: isLight ? "#cbd5e1" : "#2a3a5c", fontSize: 20 }}>›</Text>
                  </TouchableOpacity>
                );
              })}
              <Text style={{ color: isLight ? "#2563eb" : "#a78bfa", fontWeight: "800", fontSize: 13, letterSpacing: 1.5, marginBottom: 12, marginTop: 8 }}>MATH</Text>
              {["math1", "math2"].map(key => {
                const config = FULL_TEST_CONFIG[key];
                const available = questionBank.filter(q => config.domains.includes(q.domain)).length;
                return (
                  <TouchableOpacity key={key} style={{ backgroundColor: isLight ? "#fff" : "#0f1829", borderRadius: 16, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#1a2540", flexDirection: "row", alignItems: "center", gap: 14 }} onPress={() => startFullTest(key)}>
                    <View style={{ width: 50, height: 50, borderRadius: 12, backgroundColor: isLight ? "#faf5ff" : "#0e0c1a", justifyContent: "center", alignItems: "center" }}><Text style={{ color: isLight ? "#7c3aed" : "#a78bfa", fontWeight: "900", fontSize: 11, textAlign: "center" }}>MATH{"\n"}{key === "math1" ? "M1" : "M2"}</Text></View>
                    <View style={{ flex: 1 }}><Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700", fontSize: 15 }}>{config.label}</Text><Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 13, marginTop: 3 }}>{config.count} questions · {config.time / 60} min · {available} available</Text></View>
                    <Text style={{ color: isLight ? "#cbd5e1" : "#2a3a5c", fontSize: 20 }}>›</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
          {fullTestPhase === "testing" && fullTestQuestions.length > 0 && (() => {
            const config = FULL_TEST_CONFIG[fullTestSection];
            const q = fullTestQuestions[fullTestCurrentQ];
            const selectedAnswer = fullTestAnswers[fullTestCurrentQ] ?? null;
            const mins = Math.floor(fullTestTimeLeft / 60);
            const secs = fullTestTimeLeft % 60;
            const timeStr = `${mins}:${secs.toString().padStart(2, "0")}`;
            const isLowTime = fullTestTimeLeft < 300;
            return (
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: isLight ? "#e2e8f0" : "#1a2540", backgroundColor: isLight ? "#fff" : "#0b1020", gap: 8 }}>
                  <View style={{ flex: 1 }}><Text style={{ color: isLight ? "#0f172a" : "#fff", fontSize: 13, fontWeight: "700" }} numberOfLines={1}>{config.label}</Text></View>
                  <View style={{ backgroundColor: isLowTime ? "#dc2626" : (isLight ? "#f1f5f9" : "#1a2540"), paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 }}><Text style={{ color: isLowTime ? "#fff" : (isLight ? "#1e3a5f" : "#fff"), fontWeight: "800", fontSize: 16 }}>{timeStr}</Text></View>
                  <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 13, fontWeight: "600" }}>{Object.keys(fullTestAnswers).length}/{fullTestQuestions.length}</Text>
                </View>
                <View style={{ height: 3, backgroundColor: isLight ? "#e2e8f0" : "#1a2540" }}><View style={{ height: 3, backgroundColor: isLight ? "#1d4ed8" : "#f5c518", width: `${((fullTestCurrentQ + 1) / fullTestQuestions.length) * 100}%` }} /></View>
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
                  <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 11, fontWeight: "600", marginBottom: 12 }}>Q{fullTestCurrentQ + 1} · {q.domain} · {q.difficulty}</Text>
                  <Text style={{ color: isLight ? "#0f172a" : "#fff", fontSize: 17, lineHeight: 30, marginBottom: 24 }} selectable>{q.question}</Text>
                  <View style={{ height: 1, backgroundColor: isLight ? "#e2e8f0" : "#1a2540", marginBottom: 18 }} />
                  {q.choices.map((c, i) => {
                    const letter = ["A","B","C","D"][i];
                    const isSelected = selectedAnswer === i;
                    return (
                      <TouchableOpacity key={i} style={{ flexDirection: "row", alignItems: "flex-start", padding: 14, marginBottom: 10, borderRadius: 10, borderWidth: 1.5, borderColor: isSelected ? "#1d4ed8" : (isLight ? "#cbd5e1" : "#2a3a5c"), backgroundColor: isSelected ? (isLight ? "#eff6ff" : "#0c1624") : (isLight ? "#fff" : "#0f1829"), gap: 12 }} onPress={() => setFullTestAnswers(prev => ({ ...prev, [fullTestCurrentQ]: i }))} activeOpacity={0.7}>
                        <View style={{ width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: isSelected ? "#1d4ed8" : (isLight ? "#94a3b8" : "#475569"), backgroundColor: isSelected ? "#1d4ed8" : "transparent", justifyContent: "center", alignItems: "center", flexShrink: 0 }}><Text style={{ color: isSelected ? "#fff" : (isLight ? "#475569" : "#9aa4c7"), fontWeight: "700", fontSize: 13 }}>{letter}</Text></View>
                        <Text style={{ color: isLight ? "#1e293b" : "#e2e8f0", fontSize: 15, lineHeight: 24, flex: 1, paddingTop: 4 }}>{c}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
                <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12, backgroundColor: isLight ? "#fff" : "#0b1020", borderTopWidth: 1, borderTopColor: isLight ? "#e2e8f0" : "#1a2540", gap: 10 }}>
                  <TouchableOpacity style={{ flex: 1, paddingVertical: 13, borderRadius: 8, alignItems: "center", borderWidth: 1.5, borderColor: isLight ? "#cbd5e1" : "#2a3a5c", opacity: fullTestCurrentQ === 0 ? 0.35 : 1 }} onPress={() => setFullTestCurrentQ(p => Math.max(0, p - 1))} disabled={fullTestCurrentQ === 0}><Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontWeight: "700" }}>← Back</Text></TouchableOpacity>
                  {fullTestCurrentQ < fullTestQuestions.length - 1 ? (
                    <TouchableOpacity style={{ flex: 1, paddingVertical: 13, borderRadius: 8, alignItems: "center", backgroundColor: "#1e3a5f" }} onPress={() => setFullTestCurrentQ(p => p + 1)}><Text style={{ color: "#fff", fontWeight: "700" }}>Next →</Text></TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={{ flex: 1, paddingVertical: 13, borderRadius: 8, alignItems: "center", backgroundColor: "#16a34a" }} onPress={submitFullTest}><Text style={{ color: "#fff", fontWeight: "700" }}>Submit ✓</Text></TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })()}
          {fullTestPhase === "results" && fullTestQuestions.length > 0 && (() => {
            const config = FULL_TEST_CONFIG[fullTestSection];
            let correct = 0;
            fullTestQuestions.forEach((q, i) => { if (fullTestAnswers[i] === q.answer) correct++; });
            const pct = Math.round((correct / fullTestQuestions.length) * 100);
            const color = pct >= 80 ? "#16a34a" : pct >= 60 ? "#d97706" : "#dc2626";
            return (
              <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 60 }}>
                <Text style={{ color: isLight ? "#0f172a" : "#fff", fontSize: 22, fontWeight: "900", marginBottom: 20 }}>Module Complete — {config.label}</Text>
                <View style={{ backgroundColor: isLight ? "#f8fafc" : "#0f1829", borderRadius: 20, padding: 28, alignItems: "center", marginBottom: 20, borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#1a2540" }}>
                  <Text style={{ color, fontSize: 64, fontWeight: "900" }}>{correct}/{fullTestQuestions.length}</Text>
                  <Text style={{ color, fontSize: 28, fontWeight: "600", marginTop: 4 }}>{pct}%</Text>
                </View>
                {fullTestQuestions.map((q, i) => {
                  const userAns = fullTestAnswers[i] ?? -1;
                  const isCorrect = userAns === q.answer;
                  return (
                    <View key={i} style={{ backgroundColor: isLight ? "#fff" : "#0f1829", borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: isCorrect ? (isLight ? "#bbf7d0" : "#1a3a2a") : (isLight ? "#fecaca" : "#3a1a1a"), borderLeftWidth: 4, borderLeftColor: isCorrect ? "#16a34a" : "#dc2626" }}>
                      <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 11, marginBottom: 6 }}>Q{i + 1} · {q.domain}</Text>
                      <Text style={{ color: isLight ? "#0f172a" : "#fff", fontSize: 14, lineHeight: 22, marginBottom: 8 }} numberOfLines={3}>{q.question}</Text>
                      <Text style={{ color: isCorrect ? "#16a34a" : "#dc2626", fontSize: 13, fontWeight: "700", marginBottom: 4 }}>{isCorrect ? "✅ Correct" : `❌ You: ${userAns === -1 ? "Skipped" : q.choices[userAns]}`}</Text>
                      {!isCorrect && <Text style={{ color: "#4ade80", fontSize: 13, fontWeight: "600", marginBottom: 4 }}>✓ {q.choices[q.answer]}</Text>}
                      <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 12, lineHeight: 20, fontStyle: "italic" }}>💡 {q.explanation}</Text>
                    </View>
                  );
                })}
                <TouchableOpacity style={{ backgroundColor: "#1e3a5f", padding: 16, borderRadius: 12, alignItems: "center", marginBottom: 10 }} onPress={() => setFullTestPhase("intro")}><Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>Take Another Module</Text></TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: isLight ? "#f1f5f9" : "#151c36", padding: 16, borderRadius: 12, alignItems: "center" }} onPress={() => setFullTestModalVisible(false)}><Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700", fontSize: 16 }}>Back to Home</Text></TouchableOpacity>
              </ScrollView>
            );
          })()}
        </SafeAreaView>
      </Modal>

      {/* Weak spot alert */}
      {weakSpotAlert && (
        <View style={{ position: "absolute", top: 60, left: 20, right: 20, zIndex: 9998, backgroundColor: isLight ? "#fff7ed" : "#1a0e00", borderRadius: 16, padding: 16, borderWidth: 2, borderColor: "#f97316", flexDirection: "row", alignItems: "center", gap: 12, elevation: 18 }}>
          <Text style={{ fontSize: 32 }}>⚠️</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#f97316", fontWeight: "800", fontSize: 13 }}>Weak Spot Detected</Text>
            <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700", fontSize: 14, marginTop: 2 }}>{weakSpotAlert.domain}</Text>
            <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 12 }}>{weakSpotAlert.accuracy}% over {weakSpotAlert.attempted} questions</Text>
          </View>
          <View style={{ gap: 6 }}>
            <TouchableOpacity style={{ backgroundColor: "#f97316", paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10 }} onPress={() => { setWeakSpotAlert(null); setDrillDomain(weakSpotAlert.domain); setDrillDifficulty("Easy"); startDrill(weakSpotAlert.domain, "Easy"); setDrillModalVisible(true); }}><Text style={{ color: "#fff", fontWeight: "800", fontSize: 12 }}>Drill It</Text></TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: isLight ? "#e2e8f0" : "#1a2540", paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10 }} onPress={() => { setWeakSpotDismissed(prev => ({ ...prev, [weakSpotAlert.domain]: true })); setWeakSpotAlert(null); }}><Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontWeight: "700", fontSize: 12 }}>Dismiss</Text></TouchableOpacity>
          </View>
        </View>
      )}

      {/* New badge alert */}
      {newBadgeAlert && (
        <View style={{ position: "absolute", top: 60, left: 20, right: 20, zIndex: 9999, backgroundColor: "#1a1400", borderRadius: 16, padding: 16, borderWidth: 2, borderColor: "#f5c518", flexDirection: "row", alignItems: "center", gap: 14, elevation: 20 }}>
          <Text style={{ fontSize: 40 }}>{newBadgeAlert.icon}</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#f5c518", fontWeight: "800", fontSize: 14 }}>Badge Unlocked!</Text>
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>{newBadgeAlert.name}</Text>
            <Text style={{ color: "#9aa4c7", fontSize: 12, marginTop: 2 }}>{newBadgeAlert.desc}</Text>
          </View>
        </View>
      )}

      {/* Mistake Journal Modal */}
      <Modal visible={mistakeJournalVisible} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: isLight ? "#f8fafc" : "#0b1020" }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: isLight ? "#e2e8f0" : "#151c36" }}>
            <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "800", fontSize: 18 }}>📕 Mistake Journal</Text>
            <TouchableOpacity onPress={() => setMistakeJournalVisible(false)}><Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 16 }}>✕ Close</Text></TouchableOpacity>
          </View>
          {(() => {
            const mistakes = [];
            scoreHistory.forEach(entry => { if (!entry.questions) return; entry.questions.forEach((q) => { if (q.userAnswer !== q.correctAnswer) mistakes.push({ ...q, date: entry.createdAt?.toDate ? entry.createdAt.toDate() : null }); }); });
            if (mistakes.length === 0) return (
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 40 }}>
                <Text style={{ fontSize: 56, marginBottom: 16 }}>🎉</Text>
                <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "800", fontSize: 20, textAlign: "center" }}>No mistakes yet!</Text>
              </View>
            );
            return (
              <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
                <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
                  <View style={{ flex: 1, backgroundColor: isLight ? "#fff" : "#0f1829", borderRadius: 14, padding: 14, alignItems: "center", borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#1a2540" }}>
                    <Text style={{ color: "#dc2626", fontSize: 28, fontWeight: "800" }}>{mistakes.length}</Text>
                    <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 11, marginTop: 3 }}>Total Mistakes</Text>
                  </View>
                </View>
                {mistakes.map((m, i) => {
                  const diffColor = m.difficulty === "Hard" ? "#dc2626" : m.difficulty === "Medium" ? "#d97706" : "#16a34a";
                  return (
                    <View key={i} style={{ backgroundColor: isLight ? "#fff" : "#0f1829", borderRadius: 14, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: isLight ? "#fecaca" : "#3a1a1a", borderLeftWidth: 4, borderLeftColor: "#dc2626" }}>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                        <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 11, fontWeight: "600", flex: 1 }} numberOfLines={1}>{m.domain}</Text>
                        <View style={{ backgroundColor: diffColor + "22", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 }}><Text style={{ color: diffColor, fontWeight: "700", fontSize: 11 }}>{m.difficulty}</Text></View>
                      </View>
                      <Text style={{ color: isLight ? "#0f172a" : "#fff", fontSize: 14, lineHeight: 22, marginBottom: 12 }} numberOfLines={4}>{m.question}</Text>
                      <View style={{ backgroundColor: isLight ? "#fef2f2" : "#2a0d0d", borderRadius: 10, padding: 10, marginBottom: 8 }}>
                        <Text style={{ color: "#dc2626", fontSize: 12, fontWeight: "700", marginBottom: 3 }}>❌ Your answer</Text>
                        <Text style={{ color: isLight ? "#7f1d1d" : "#fca5a5", fontSize: 13 }}>{m.userAnswer === -1 ? "Skipped" : m.choices?.[m.userAnswer] || "—"}</Text>
                      </View>
                      <View style={{ backgroundColor: isLight ? "#f0fdf4" : "#0d2a18", borderRadius: 10, padding: 10, marginBottom: 8 }}>
                        <Text style={{ color: "#16a34a", fontSize: 12, fontWeight: "700", marginBottom: 3 }}>✅ Correct</Text>
                        <Text style={{ color: isLight ? "#14532d" : "#4ade80", fontSize: 13 }}>{m.choices?.[m.correctAnswer] || "—"}</Text>
                      </View>
                      <View style={{ backgroundColor: isLight ? "#f8fafc" : "#0a1525", borderRadius: 10, padding: 10 }}>
                        <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 12, fontWeight: "700", marginBottom: 3 }}>💡 Explanation</Text>
                        <Text style={{ color: isLight ? "#334155" : "#cbd5e1", fontSize: 13, lineHeight: 20 }}>{m.explanation}</Text>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            );
          })()}
        </SafeAreaView>
      </Modal>

      {/* Badges Modal */}
      <Modal visible={badgesModalVisible} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: isLight ? "#f8fafc" : "#0b1020" }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: isLight ? "#e2e8f0" : "#151c36" }}>
            <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "800", fontSize: 18 }}>🏅 Badges</Text>
            <TouchableOpacity onPress={() => setBadgesModalVisible(false)}><Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 16 }}>✕ Close</Text></TouchableOpacity>
          </View>
          <View style={{ padding: 16, backgroundColor: isLight ? "#fff" : "#0f1829", borderBottomWidth: 1, borderBottomColor: isLight ? "#e2e8f0" : "#151c36", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 14 }}><Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "800", fontSize: 22 }}>{badges.length}</Text> / {BADGE_DEFINITIONS.length} earned</Text>
            <View style={{ height: 10, width: 140, backgroundColor: isLight ? "#e2e8f0" : "#1a2540", borderRadius: 5, overflow: "hidden" }}>
              <View style={{ height: 10, width: `${(badges.length / BADGE_DEFINITIONS.length) * 100}%`, backgroundColor: "#f5c518", borderRadius: 5 }} />
            </View>
          </View>
          <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {BADGE_DEFINITIONS.map((badge) => {
                const earned = badges.includes(badge.id);
                return (
                  <View key={badge.id} style={{ width: "47%", backgroundColor: earned ? (isLight ? "#fffbeb" : "#1a1400") : (isLight ? "#f8fafc" : "#0f1829"), borderRadius: 14, padding: 16, alignItems: "center", borderWidth: 2, borderColor: earned ? "#f5c518" : (isLight ? "#e2e8f0" : "#1a2540"), opacity: earned ? 1 : 0.5 }}>
                    <Text style={{ fontSize: 36, marginBottom: 8, opacity: earned ? 1 : 0.4 }}>{badge.icon}</Text>
                    <Text style={{ color: earned ? (isLight ? "#92400e" : "#f5c518") : (isLight ? "#94a3b8" : "#475569"), fontWeight: "800", fontSize: 13, textAlign: "center", marginBottom: 4 }}>{badge.name}</Text>
                    <Text style={{ color: isLight ? "#64748b" : "#475569", fontSize: 11, textAlign: "center", lineHeight: 16 }}>{badge.desc}</Text>
                    {earned && <View style={{ marginTop: 8, backgroundColor: "#f5c518", paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10 }}><Text style={{ color: "#070d1f", fontSize: 10, fontWeight: "800" }}>EARNED</Text></View>}
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Formula Sheet */}
      <Modal visible={formulaSheetVisible} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: isLight ? "#f8fafc" : "#0b1020" }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: isLight ? "#e2e8f0" : "#151c36" }}>
            <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "800", fontSize: 18 }}>📐 SAT Formula Sheet</Text>
            <TouchableOpacity onPress={() => setFormulaSheetVisible(false)}><Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 16 }}>✕ Close</Text></TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
            {[
              { section: "Geometry", color: "#3b82f6", formulas: [{ name: "Area of Circle", formula: "A = πr²" }, { name: "Circumference", formula: "C = 2πr" }, { name: "Area of Triangle", formula: "A = ½bh" }, { name: "Pythagorean Theorem", formula: "a² + b² = c²" }, { name: "Distance Formula", formula: "d = √((x₂-x₁)² + (y₂-y₁)²)" }, { name: "Circle Equation", formula: "(x-h)² + (y-k)² = r²" }] },
              { section: "Algebra", color: "#f59e0b", formulas: [{ name: "Slope Formula", formula: "m = (y₂-y₁)/(x₂-x₁)" }, { name: "Quadratic Formula", formula: "x = (-b ± √(b²-4ac)) / 2a" }, { name: "Vertex of Parabola", formula: "x = -b/2a" }, { name: "Slope-Intercept", formula: "y = mx + b" }] },
              { section: "Trig", color: "#10b981", formulas: [{ name: "SOH-CAH-TOA", formula: "sin=O/H  cos=A/H  tan=O/A" }, { name: "Pythagorean Identity", formula: "sin²θ + cos²θ = 1" }, { name: "30-60-90", formula: "Sides: x, x√3, 2x" }, { name: "45-45-90", formula: "Sides: x, x, x√2" }] },
            ].map((group, gi) => (
              <View key={gi} style={{ marginBottom: 20 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <View style={{ width: 4, height: 20, borderRadius: 2, backgroundColor: group.color }} />
                  <Text style={{ color: group.color, fontWeight: "800", fontSize: 16 }}>{group.section}</Text>
                </View>
                {group.formulas.map((f, fi) => (
                  <View key={fi} style={{ backgroundColor: isLight ? "#ffffff" : "#0f1829", borderRadius: 12, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#1a2540", borderLeftWidth: 3, borderLeftColor: group.color }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 6 }}>
                      <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 12, fontWeight: "600", flex: 1 }}>{f.name}</Text>
                      <Text style={{ color: isLight ? "#0f172a" : "#fff", fontSize: 15, fontWeight: "800" }}>{f.formula}</Text>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Weekly Summary */}
      <Modal visible={weeklySummaryVisible} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center", padding: 20 }}>
          <View style={{ backgroundColor: isLight ? "#ffffff" : "#0f1829", borderRadius: 20, padding: 24, borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#1a2540", maxHeight: "80%" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <Text style={{ color: isLight ? "#0f172a" : "#fff", fontSize: 18, fontWeight: "800" }}>📅 This Week</Text>
              <TouchableOpacity onPress={() => setWeeklySummaryVisible(false)}><Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 22 }}>✕</Text></TouchableOpacity>
            </View>
            {(() => {
              const now = new Date();
              const startOfWeek = new Date(now); startOfWeek.setDate(now.getDate() - now.getDay()); startOfWeek.setHours(0, 0, 0, 0);
              const weekEntries = scoreHistory.filter(e => { const d = e.createdAt?.toDate ? e.createdAt.toDate() : null; return d && d >= startOfWeek; });
              const totalQ = weekEntries.reduce((s, e) => s + (e.total || 0), 0);
              const totalCorrect = weekEntries.reduce((s, e) => s + (e.score || 0), 0);
              const avgPct = weekEntries.length > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;
              return (
                <ScrollView>
                  <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
                    {[{ val: weekEntries.length, label: "Quizzes", color: isLight ? "#1d4ed8" : "#60a5fa" }, { val: totalQ, label: "Questions", color: isLight ? "#1d4ed8" : "#60a5fa" }, { val: weekEntries.length > 0 ? `${avgPct}%` : "—", label: "Avg Score", color: avgPct >= 80 ? "#16a34a" : avgPct >= 60 ? "#d97706" : "#dc2626" }].map(({ val, label, color }) => (
                      <View key={label} style={{ flex: 1, backgroundColor: isLight ? "#f8fafc" : "#151c36", borderRadius: 12, padding: 12, alignItems: "center", borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#1a2540" }}>
                        <Text style={{ color, fontSize: 20, fontWeight: "800" }}>{val}</Text>
                        <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 10, marginTop: 3, textAlign: "center", fontWeight: "600" }}>{label}</Text>
                      </View>
                    ))}
                  </View>
                  {weekEntries.length === 0 && <Text style={{ color: isLight ? "#475569" : "#9aa4c7", textAlign: "center", marginTop: 20 }}>No activity this week yet.</Text>}
                  <View style={{ backgroundColor: isLight ? "#fffbeb" : "#1a1400", borderRadius: 12, padding: 14, marginTop: 8, borderWidth: 1, borderColor: isLight ? "#fde68a" : "#2a2000", flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <Text style={{ fontSize: 24 }}>🔥</Text>
                    <View><Text style={{ color: isLight ? "#92400e" : "#f5c518", fontWeight: "700", fontSize: 14 }}>{streakData.currentStreak} day streak</Text><Text style={{ color: isLight ? "#a16207" : "#a37c00", fontSize: 12 }}>Best: {streakData.longestStreak || 0} days</Text></View>
                  </View>
                </ScrollView>
              );
            })()}
          </View>
        </View>
      </Modal>

      {/* Feedback Modal */}
      <Modal visible={feedbackModalVisible} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center", padding: 20 }}>
          <View style={{ backgroundColor: isLight ? "#ffffff" : "#0f1829", borderRadius: 20, padding: 24, borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#1a2540" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <Text style={{ color: isLight ? "#0f172a" : "#fff", fontSize: 18, fontWeight: "800" }}>📝 Give Feedback</Text>
              <TouchableOpacity onPress={() => setFeedbackModalVisible(false)}><Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 22 }}>✕</Text></TouchableOpacity>
            </View>
            {feedbackSent ? (
              <View style={{ alignItems: "center", paddingVertical: 20 }}>
                <Text style={{ fontSize: 48 }}>🙏</Text>
                <Text style={{ color: "#4caf50", fontSize: 20, fontWeight: "800", marginTop: 12 }}>Thank you!</Text>
                <TouchableOpacity style={{ backgroundColor: isLight ? "#e2e8f0" : "#1f2a52", padding: 14, borderRadius: 12, marginTop: 20, width: "100%", alignItems: "center" }} onPress={() => setFeedbackModalVisible(false)}><Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700" }}>Close</Text></TouchableOpacity>
              </View>
            ) : (
              <>
                <View style={{ flexDirection: "row", gap: 10, marginBottom: 20, justifyContent: "center" }}>
                  {[1,2,3,4,5].map(star => <TouchableOpacity key={star} onPress={() => setFeedbackRating(star)}><Text style={{ fontSize: 36, opacity: feedbackRating >= star ? 1 : 0.25 }}>⭐</Text></TouchableOpacity>)}
                </View>
                <TextInput style={{ backgroundColor: isLight ? "#f1f5f9" : "#151c36", color: isLight ? "#0f172a" : "#fff", padding: 14, borderRadius: 12, height: 100, textAlignVertical: "top", fontSize: 14, marginBottom: 20, borderWidth: 1, borderColor: isLight ? "#cbd5e1" : "#2a3a5c" }} placeholder="What's working? What could be better?" placeholderTextColor={isLight ? "#94a3b8" : "#475569"} value={feedbackText} onChangeText={setFeedbackText} multiline />
                <TouchableOpacity style={{ backgroundColor: isLight ? "#1d4ed8" : "#f5c518", padding: 16, borderRadius: 12, alignItems: "center", opacity: (!feedbackRating || !feedbackText.trim() || feedbackSending) ? 0.4 : 1 }} onPress={submitFeedback} disabled={!feedbackRating || !feedbackText.trim() || feedbackSending}>
                  <Text style={{ color: isLight ? "#fff" : "#070d1f", fontWeight: "800", fontSize: 16 }}>{feedbackSending ? "Sending..." : "Submit Feedback"}</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Diagnostic Modal */}
      <Modal visible={diagnosticModalVisible} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center", padding: 20 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
            <View style={{ backgroundColor: isLight ? "#ffffff" : "#0f1829", borderRadius: 20, padding: 24, borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#1a2540" }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <Text style={{ color: isLight ? "#0f172a" : "#fff", fontSize: 18, fontWeight: "800" }}>{diagStep === 1 ? "📋 Enter Your Scores" : diagStep === 2 ? "📊 Domain Breakdown" : "🗺 Your Study Plan"}</Text>
                <TouchableOpacity onPress={() => setDiagnosticModalVisible(false)}><Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 22 }}>✕</Text></TouchableOpacity>
              </View>
              {diagStep === 1 && (
                <>
                  <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 14, marginBottom: 20 }}>Enter your SAT section scores from Bluebook.</Text>
                  <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700", marginBottom: 6 }}>Math Score (200–800)</Text>
                  <TextInput style={{ backgroundColor: isLight ? "#f1f5f9" : "#151c36", color: "#f5c518", fontSize: 28, fontWeight: "700", textAlign: "center", padding: 16, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: isLight ? "#cbd5e1" : "#2a3a5c" }} value={diagMathScore} onChangeText={v => setDiagMathScore(v.replace(/[^0-9]/g, "").slice(0, 3))} keyboardType="numeric" placeholder="e.g. 620" placeholderTextColor="#94a3b8" />
                  <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700", marginBottom: 6 }}>Reading & Writing Score (200–800)</Text>
                  <TextInput style={{ backgroundColor: isLight ? "#f1f5f9" : "#151c36", color: "#f5c518", fontSize: 28, fontWeight: "700", textAlign: "center", padding: 16, borderRadius: 12, marginBottom: 24, borderWidth: 1, borderColor: isLight ? "#cbd5e1" : "#2a3a5c" }} value={diagRWScore} onChangeText={v => setDiagRWScore(v.replace(/[^0-9]/g, "").slice(0, 3))} keyboardType="numeric" placeholder="e.g. 580" placeholderTextColor="#94a3b8" />
                  {diagMathScore && diagRWScore && <View style={{ backgroundColor: isLight ? "#f1f5f9" : "#151c36", borderRadius: 12, padding: 14, marginBottom: 20, alignItems: "center" }}><Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 13 }}>Total</Text><Text style={{ color: "#f5c518", fontSize: 36, fontWeight: "800" }}>{Number(diagMathScore) + Number(diagRWScore)}</Text></View>}
                  <TouchableOpacity style={{ backgroundColor: isLight ? "#1d4ed8" : "#f5c518", padding: 16, borderRadius: 12, alignItems: "center", opacity: diagMathScore && diagRWScore ? 1 : 0.4 }} disabled={!diagMathScore || !diagRWScore} onPress={() => setDiagStep(2)}><Text style={{ color: "#fff", fontWeight: "800", fontSize: 16 }}>Next →</Text></TouchableOpacity>
                </>
              )}
              {diagStep === 2 && (
                <>
                  <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 13, marginBottom: 16 }}>Tap to fill in bars (1–7) from your Bluebook report.</Text>
                  {[
                    { key: "algebra", label: "Algebra" }, { key: "advancedMath", label: "Advanced Math" }, { key: "dataAnalysis", label: "Data Analysis" }, { key: "geometry", label: "Geometry" },
                    { key: "infoIdeas", label: "Info & Ideas" }, { key: "craftStructure", label: "Craft & Structure" }, { key: "expressionIdeas", label: "Expression of Ideas" }, { key: "englishConventions", label: "English Conventions" },
                  ].map(({ key, label }) => (
                    <View key={key} style={{ marginBottom: 12 }}>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                        <Text style={{ color: isLight ? "#0f172a" : "#fff", fontSize: 13 }}>{label}</Text>
                        <Text style={{ color: getBarLabel(diagBars[key]).color, fontWeight: "700", fontSize: 12 }}>{diagBars[key]}/7</Text>
                      </View>
                      <View style={{ flexDirection: "row", gap: 4 }}>
                        {[1,2,3,4,5,6,7].map(n => (
                          <TouchableOpacity key={n} style={{ flex: 1, height: 26, borderRadius: 4, backgroundColor: diagBars[key] >= n ? getBarLabel(n).color : isLight ? "#e2e8f0" : "#1f2a52" }} onPress={() => setDiagBars(prev => ({ ...prev, [key]: n }))} />
                        ))}
                      </View>
                    </View>
                  ))}
                  <View style={{ flexDirection: "row", gap: 10, marginTop: 8 }}>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: isLight ? "#e2e8f0" : "#1f2a52", padding: 14, borderRadius: 12, alignItems: "center" }} onPress={() => setDiagStep(1)}><Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700" }}>← Back</Text></TouchableOpacity>
                    <TouchableOpacity style={{ flex: 2, backgroundColor: "#f5c518", padding: 14, borderRadius: 12, alignItems: "center" }} onPress={() => { setStudyPlan(generateStudyPlan()); setDiagStep(3); }}><Text style={{ color: "#070d1f", fontWeight: "800" }}>Generate Plan →</Text></TouchableOpacity>
                  </View>
                </>
              )}
              {diagStep === 3 && studyPlan && (
                <>
                  <View style={{ backgroundColor: "#151c36", borderRadius: 12, padding: 16, marginBottom: 12, alignItems: "center" }}>
                    <Text style={{ color: "#9aa4c7", fontSize: 13 }}>Your Score</Text>
                    <Text style={{ color: "#f5c518", fontSize: 48, fontWeight: "800" }}>{studyPlan.total}</Text>
                    <Text style={{ color: "#9aa4c7", fontSize: 13, marginTop: 4 }}>{studyPlan.pointsNeeded <= 0 ? "🎉 At or above target!" : `${studyPlan.pointsNeeded} points to go`}</Text>
                  </View>
                  <View style={{ backgroundColor: "#0f1829", borderRadius: 10, padding: 14, marginBottom: 12, borderLeftWidth: 3, borderLeftColor: "#1d4ed8" }}>
                    <Text style={{ color: "#fff", fontSize: 14, lineHeight: 22 }}>{studyPlan.gapContext}</Text>
                  </View>
                  {studyPlan.weakest.length > 0 && (
                    <>
                      <Text style={{ color: "#ff4d4d", fontWeight: "800", fontSize: 14, marginBottom: 8 }}>🚨 Focus First</Text>
                      {studyPlan.weakest.map(d => (
                        <View key={d.key} style={{ backgroundColor: "#2a1a1a", borderRadius: 10, padding: 12, marginBottom: 8, borderLeftWidth: 3, borderLeftColor: "#ff4d4d" }}>
                          <View style={{ flexDirection: "row", justifyContent: "space-between" }}><Text style={{ color: "#fff", fontWeight: "700" }}>{d.name}</Text><Text style={{ color: d.color, fontWeight: "700" }}>{d.bars}/7</Text></View>
                        </View>
                      ))}
                    </>
                  )}
                  <TouchableOpacity style={{ backgroundColor: "#f5c518", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 10 }} onPress={() => setDiagnosticModalVisible(false)}><Text style={{ color: "#070d1f", fontWeight: "800", fontSize: 16 }}>Got It! 🚀</Text></TouchableOpacity>
                </>
              )}
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Mini Games Modal */}
      <Modal visible={gameModalVisible} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: isLight ? "#f8fafc" : "#0b1020" }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: isLight ? "#e2e8f0" : "#151c36" }}>
            <TouchableOpacity onPress={() => { if (gameMode) { setGameMode(null); if (speedTimerRef.current) clearInterval(speedTimerRef.current); } else { setGameModalVisible(false); } }}><Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 16 }}>{gameMode ? "← Back" : "✕ Close"}</Text></TouchableOpacity>
            <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700" }}>{gameMode ? gameMode.charAt(0).toUpperCase() + gameMode.slice(1) : "Mini Games"}</Text>
            <View style={{ width: 60 }} />
          </View>
          {!gameMode && (
            <ScrollView contentContainerStyle={{ padding: 20 }}>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
                {[
                  { id: "speed", icon: "⚡", label: "Speed Round", sub: "60 sec · pick meanings fast", color: "#f5c518", bg: "#1a1400", onPress: () => { startSpeedRound(); setGameMode("speed"); } },
                  { id: "match", icon: "🔗", label: "Word Match", sub: "Match words to definitions", color: "#4caf50", bg: "#0d2a18", onPress: () => { startMatchGame(); setGameMode("match"); } },
                  { id: "sentence", icon: "📝", label: "Fill-in", sub: "Guess the word from def", color: "#60a5fa", bg: "#0c1624", onPress: () => { startSentenceGame(); setGameMode("sentence"); } },
                  { id: "hangman", icon: "🎯", label: "Hangman", sub: "Guess letters · 6 lives", color: "#f87171", bg: "#2a0c0c", onPress: () => { startHangman(); setGameMode("hangman"); } },
                  { id: "scramble", icon: "🔀", label: "Scramble", sub: "Unscramble the letters", color: "#a78bfa", bg: "#0e0c1a", onPress: () => { startWordScramble(); setGameMode("scramble"); } },
                  { id: "typerace", icon: "⌨️", label: "Type Race", sub: "Type the word fast", color: "#fb923c", bg: "#1a0e00", onPress: () => { startTypeRace(); setGameMode("typerace"); } },
                  { id: "wordle", icon: "🟩", label: "Wordle", sub: "Guess the vocab word", color: "#34d399", bg: "#0a1a14", onPress: () => { startWordle(); setGameMode("wordle"); } },
                  { id: "bossbattle", icon: "👾", label: "Boss Battle", sub: "Defeat the boss", color: "#f43644", bg: "#1a0808", onPress: () => { startBossBattle(); setGameMode("bossbattle"); } },
                  { id: "rapidfire", icon: "🔥", label: "Rapid Fire", sub: "5 sec per question", color: "#facc15", bg: "#14100a", onPress: () => { startRapidFire(); setGameMode("rapidfire"); } },
                  { id: "triviaparty", icon: "💎", label: "Trivia Party", sub: "Millionaire-style", color: "#818cf8", bg: "#0c0c1a", onPress: () => { startTriviaParty(); setGameMode("triviaparty"); } },
                ].map(({ icon, label, sub, color, bg, onPress: op }) => (
                  <TouchableOpacity key={label} style={{ width: "47%", backgroundColor: bg, borderRadius: 16, padding: 18, borderWidth: 1, borderColor: color + "33", alignItems: "center" }} onPress={op}>
                    <Text style={{ fontSize: 28, marginBottom: 8 }}>{icon}</Text>
                    <Text style={{ color, fontWeight: "800", fontSize: 14, textAlign: "center" }}>{label}</Text>
                    <Text style={{ color: "#9aa4c7", fontSize: 11, marginTop: 3, textAlign: "center" }}>{sub}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          )}
          {gameMode === "speed" && (
            <View style={{ flex: 1, padding: 20 }}>
              {speedTimeLeft === 0 ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ color: "#f5c518", fontSize: 56, fontWeight: "800" }}>{speedScore}</Text>
                  <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700", marginTop: 8 }}>words correct!</Text>
                  <TouchableOpacity style={{ backgroundColor: "#f5c518", padding: 16, borderRadius: 12, marginTop: 30, paddingHorizontal: 40 }} onPress={() => startSpeedRound()}><Text style={{ color: "#070d1f", fontWeight: "800", fontSize: 16 }}>Play Again</Text></TouchableOpacity>
                </View>
              ) : (
                <>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
                    <Text style={{ color: "#4caf50", fontWeight: "800", fontSize: 18 }}>✓ {speedScore}</Text>
                    <Text style={{ color: speedTimeLeft <= 10 ? "#ff4d4d" : "#f5c518", fontWeight: "800", fontSize: 24 }}>⏱ {speedTimeLeft}s</Text>
                  </View>
                  <View style={{ backgroundColor: "#151c36", borderRadius: 16, padding: 24, alignItems: "center", marginBottom: 20 }}>
                    <Text style={{ color: "#9aa4c7", fontSize: 12, marginBottom: 8 }}>WHAT DOES THIS WORD MEAN?</Text>
                    <Text style={{ color: "#f5c518", fontSize: 32, fontWeight: "800" }}>{speedWord?.w}</Text>
                  </View>
                  {speedChoices.map((choice, i) => {
                    const isCorrect = speedAnswered && choice === speedWord?.d;
                    return (
                      <TouchableOpacity key={i} style={{ backgroundColor: isCorrect ? "#1a4d2e" : "#151c36", borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: isCorrect ? "#4caf50" : "#2a3a5c" }} disabled={speedAnswered} onPress={() => { const correct = choice === speedWord?.d; setSpeedAnswered(true); setSpeedCorrect(choice); if (correct) setSpeedScore(prev => prev + 1); setTimeout(() => nextSpeedWord(), 400); }}>
                        <Text style={{ color: "#fff", fontSize: 14 }}>{choice}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </>
              )}
            </View>
          )}

          {gameMode === "match" && (
            <ScrollView contentContainerStyle={{ padding: 20 }}>
              <Text style={{ color: "#fff", fontWeight: "800", fontSize: 18, marginBottom: 4 }}>Word Match</Text>
              <Text style={{ color: "#9aa4c7", fontSize: 13, marginBottom: 20 }}>Score: {matchScore} · Solved: {matchSolved.length}/6</Text>
              {matchSolved.length === 6 ? (
                <View style={{ alignItems: "center", padding: 20 }}>
                  <Text style={{ color: "#4caf50", fontSize: 48, fontWeight: "800" }}>🎉</Text>
                  <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700", marginTop: 10 }}>All matched!</Text>
                  <TouchableOpacity style={{ backgroundColor: "#4caf50", padding: 14, borderRadius: 12, marginTop: 20, paddingHorizontal: 32 }} onPress={() => startMatchGame()}>
                    <Text style={{ color: "#fff", fontWeight: "800" }}>Play Again</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: "#f5c518", fontWeight: "700", marginBottom: 10, textAlign: "center" }}>Words</Text>
                    {matchWords.map((word, i) => {
                      const solved = matchSolved.includes(word);
                      const isSelected = matchSelected === word && matchSide === "word";
                      return (
                        <TouchableOpacity key={i} style={{ backgroundColor: solved ? "#1a4d2e" : isSelected ? "#1d4ed8" : "#151c36", borderRadius: 10, padding: 12, marginBottom: 8, alignItems: "center", borderWidth: 1.5, borderColor: solved ? "#4caf50" : isSelected ? "#60a5fa" : "#2a3a5c", opacity: solved ? 0.5 : 1 }} disabled={solved}
                          onPress={() => {
                            if (matchSide === "def") {
                              const defObj = matchDefs.find(d => d.d === matchSelected);
                              if (defObj && defObj.w === word) {
                                setMatchSolved(prev => [...prev, word]);
                                setMatchScore(prev => prev + 1);
                              }
                              setMatchSelected(null); setMatchSide(null);
                            } else {
                              setMatchSelected(word); setMatchSide("word");
                            }
                          }}>
                          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 13, textAlign: "center" }}>{word}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: "#4caf50", fontWeight: "700", marginBottom: 10, textAlign: "center" }}>Definitions</Text>
                    {matchDefs.map((defObj, i) => {
                      const solved = matchSolved.includes(defObj.w);
                      const isSelected = matchSelected === defObj.d && matchSide === "def";
                      return (
                        <TouchableOpacity key={i} style={{ backgroundColor: solved ? "#1a4d2e" : isSelected ? "#1d4ed8" : "#151c36", borderRadius: 10, padding: 12, marginBottom: 8, borderWidth: 1.5, borderColor: solved ? "#4caf50" : isSelected ? "#60a5fa" : "#2a3a5c", opacity: solved ? 0.5 : 1 }} disabled={solved}
                          onPress={() => {
                            if (matchSide === "word") {
                              const wordMatch = matchWords.find(w => w === matchSelected);
                              if (wordMatch && defObj.w === wordMatch) {
                                setMatchSolved(prev => [...prev, wordMatch]);
                                setMatchScore(prev => prev + 1);
                              }
                              setMatchSelected(null); setMatchSide(null);
                            } else {
                              setMatchSelected(defObj.d); setMatchSide("def");
                            }
                          }}>
                          <Text style={{ color: "#9aa4c7", fontSize: 12, textAlign: "center" }}>{defObj.d}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              )}
            </ScrollView>
          )}

          {gameMode === "sentence" && sentenceWord && (
            <ScrollView contentContainerStyle={{ padding: 20 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
                <Text style={{ color: "#4caf50", fontWeight: "800", fontSize: 18 }}>✓ {sentenceScore}/{sentenceTotal}</Text>
              </View>
              <Text style={{ color: "#9aa4c7", fontSize: 12, marginBottom: 8 }}>WHICH WORD FITS THIS DEFINITION?</Text>
              <View style={{ backgroundColor: "#151c36", borderRadius: 16, padding: 20, marginBottom: 24 }}>
                <Text style={{ color: "#fff", fontSize: 16, lineHeight: 26 }}>{sentenceWord.d}</Text>
              </View>
              {sentenceChoices.map((choice, i) => {
                const isSelected = sentenceSelected === choice;
                const isCorrect = choice === sentenceWord.w;
                let bg = "#151c36", border = "#2a3a5c";
                if (sentenceSelected) { if (isCorrect) { bg = "#1a4d2e"; border = "#4caf50"; } else if (isSelected) { bg = "#4d1a1a"; border = "#ff4d4d"; } }
                return (
                  <TouchableOpacity key={i} style={{ backgroundColor: bg, borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1.5, borderColor: border }} disabled={!!sentenceSelected}
                    onPress={() => { setSentenceSelected(choice); setSentenceTotal(t => t + 1); if (choice === sentenceWord.w) setSentenceScore(s => s + 1); setTimeout(() => nextSentenceWord(), 600); }}>
                    <Text style={{ color: "#fff", fontSize: 15, fontWeight: "600" }}>{choice}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}

          {gameMode === "hangman" && hangmanWord && (
            <ScrollView contentContainerStyle={{ padding: 20, alignItems: "center" }}>
              <Text style={{ color: "#9aa4c7", fontSize: 13, marginBottom: 4 }}>{hangmanWord.p}</Text>
              <Text style={{ color: "#9aa4c7", fontSize: 12, marginBottom: 16 }}>Definition: {hangmanWord.d}</Text>
              <View style={{ flexDirection: "row", marginBottom: 28, flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
                {"❤️".repeat(hangmanLives).split("").map((_, i) => <Text key={i} style={{ fontSize: 22 }}>❤️</Text>)}
                {"🖤".repeat(6 - hangmanLives).split("").map((_, i) => <Text key={i} style={{ fontSize: 22 }}>🖤</Text>)}
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 10, marginBottom: 28 }}>
                {hangmanWord.w.toUpperCase().split("").map((letter, i) => {
                  const revealed = hangmanGuesses.includes(letter) || letter === " " || letter === "-";
                  return (
                    <View key={i} style={{ width: 32, height: 40, borderBottomWidth: 2, borderBottomColor: "#f5c518", justifyContent: "flex-end", alignItems: "center" }}>
                      <Text style={{ color: "#f5c518", fontSize: 20, fontWeight: "800" }}>{revealed ? letter : ""}</Text>
                    </View>
                  );
                })}
              </View>
              {hangmanWon ? (
                <View style={{ alignItems: "center" }}>
                  <Text style={{ color: "#4caf50", fontSize: 24, fontWeight: "800", marginBottom: 16 }}>🎉 You got it!</Text>
                  <TouchableOpacity style={{ backgroundColor: "#4caf50", padding: 14, borderRadius: 12, paddingHorizontal: 32 }} onPress={() => startHangman()}>
                    <Text style={{ color: "#fff", fontWeight: "800" }}>Next Word</Text>
                  </TouchableOpacity>
                </View>
              ) : hangmanLives <= 0 ? (
                <View style={{ alignItems: "center" }}>
                  <Text style={{ color: "#ff4d4d", fontSize: 18, fontWeight: "800", marginBottom: 8 }}>Game Over!</Text>
                  <Text style={{ color: "#9aa4c7", marginBottom: 16 }}>The word was: {hangmanWord.w}</Text>
                  <TouchableOpacity style={{ backgroundColor: "#f5c518", padding: 14, borderRadius: 12, paddingHorizontal: 32 }} onPress={() => startHangman()}>
                    <Text style={{ color: "#070d1f", fontWeight: "800" }}>Try Again</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
                  {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(letter => {
                    const guessed = hangmanGuesses.includes(letter);
                    const correct = hangmanWord.w.toUpperCase().includes(letter);
                    return (
                      <TouchableOpacity key={letter} disabled={guessed} style={{ width: 38, height: 38, borderRadius: 8, backgroundColor: guessed ? (correct ? "#1a4d2e" : "#2a0d0d") : "#151c36", justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: guessed ? (correct ? "#4caf50" : "#ff4d4d") : "#2a3a5c" }} onPress={() => guessLetter(letter)}>
                        <Text style={{ color: guessed ? (correct ? "#4caf50" : "#ff4d4d") : "#fff", fontWeight: "700" }}>{letter}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </ScrollView>
          )}

          {gameMode === "scramble" && scrambleWord && (
            <ScrollView contentContainerStyle={{ padding: 20, alignItems: "center" }}>
              <Text style={{ color: "#9aa4c7", fontSize: 13, marginBottom: 8 }}>Score: {scrambleScore}</Text>
              <Text style={{ color: "#9aa4c7", fontSize: 14, marginBottom: 20, textAlign: "center" }}>Definition: {scrambleWord.d}</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 6, marginBottom: 24, minHeight: 50 }}>
                {scrambleSelected.map((item, i) => (
                  <TouchableOpacity key={i} style={{ backgroundColor: "#1d4ed8", borderRadius: 8, padding: 12, minWidth: 38, alignItems: "center" }} onPress={() => {
                    setScrambleLetters(prev => [...prev, item.letter]);
                    setScrambleSelected(prev => prev.filter((_, idx) => idx !== i));
                  }}>
                    <Text style={{ color: "#fff", fontWeight: "800", fontSize: 18 }}>{item.letter}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={{ height: 2, backgroundColor: "#2a3a5c", width: "100%", marginBottom: 20 }} />
              <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 6, marginBottom: 24 }}>
                {scrambleLetters.map((letter, i) => (
                  <TouchableOpacity key={i} style={{ backgroundColor: "#151c36", borderRadius: 8, padding: 12, minWidth: 38, alignItems: "center", borderWidth: 1, borderColor: "#2a3a5c" }} onPress={() => {
                    setScrambleSelected(prev => [...prev, { letter, origIdx: i }]);
                    setScrambleLetters(prev => prev.filter((_, idx) => idx !== i));
                  }}>
                    <Text style={{ color: "#f5c518", fontWeight: "800", fontSize: 18 }}>{letter}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {scrambleResult && (
                <Text style={{ color: scrambleResult === "correct" ? "#4caf50" : "#ff4d4d", fontSize: 20, fontWeight: "800", marginBottom: 16 }}>
                  {scrambleResult === "correct" ? "🎉 Correct!" : `❌ It was: ${scrambleWord.w}`}
                </Text>
              )}
              <View style={{ flexDirection: "row", gap: 12 }}>
                <TouchableOpacity style={{ backgroundColor: "#1d4ed8", padding: 14, borderRadius: 12, flex: 1, alignItems: "center" }} onPress={() => {
                  const guess = scrambleSelected.map(s => s.letter).join("");
                  const correct = guess.toUpperCase() === scrambleWord.w.toUpperCase();
                  setScrambleResult(correct ? "correct" : "wrong");
                  if (correct) setScrambleScore(s => s + 1);
                  setTimeout(() => nextScramble(), 1200);
                }}>
                  <Text style={{ color: "#fff", fontWeight: "800" }}>Check</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: "#2a3a5c", padding: 14, borderRadius: 12, flex: 1, alignItems: "center" }} onPress={() => nextScramble()}>
                  <Text style={{ color: "#9aa4c7", fontWeight: "700" }}>Skip</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}

          {gameMode === "typerace" && typeRaceWord && (
            <View style={{ flex: 1, padding: 20 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
                <Text style={{ color: "#fb923c", fontWeight: "800", fontSize: 18 }}>✓ {typeRaceScore}</Text>
                <Text style={{ color: typeRaceTimeLeft <= 10 ? "#ff4d4d" : "#f5c518", fontWeight: "800", fontSize: 22 }}>⏱ {typeRaceTimeLeft}s</Text>
              </View>
              {typeRaceTimeLeft === 0 ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ color: "#fb923c", fontSize: 56, fontWeight: "800" }}>{typeRaceScore}</Text>
                  <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700", marginTop: 8 }}>words typed!</Text>
                  <TouchableOpacity style={{ backgroundColor: "#fb923c", padding: 14, borderRadius: 12, marginTop: 24, paddingHorizontal: 32 }} onPress={() => startTypeRace()}>
                    <Text style={{ color: "#fff", fontWeight: "800" }}>Play Again</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <View style={{ backgroundColor: "#151c36", borderRadius: 16, padding: 20, alignItems: "center", marginBottom: 12 }}>
                    <Text style={{ color: "#9aa4c7", fontSize: 12, marginBottom: 6 }}>Type this word:</Text>
                    <Text style={{ color: "#fb923c", fontSize: 32, fontWeight: "800" }}>{typeRaceWord.w}</Text>
                    <Text style={{ color: "#9aa4c7", fontSize: 12, marginTop: 6 }}>{typeRaceWord.d}</Text>
                  </View>
                  {typeRaceResult && <Text style={{ color: typeRaceResult === "correct" ? "#4caf50" : "#ff4d4d", textAlign: "center", fontWeight: "700", fontSize: 16, marginBottom: 8 }}>{typeRaceResult === "correct" ? "✅ Correct!" : "❌ Wrong!"}</Text>}
                  <TextInput
                    style={{ backgroundColor: "#151c36", color: "#fff", padding: 16, borderRadius: 12, fontSize: 20, textAlign: "center", borderWidth: 1.5, borderColor: "#2a3a5c" }}
                    value={typeRaceInput}
                    onChangeText={setTypeRaceInput}
                    placeholder="Type here..."
                    placeholderTextColor="#555"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={() => {
                      const correct = typeRaceInput.trim().toLowerCase() === typeRaceWord.w.toLowerCase();
                      setTypeRaceResult(correct ? "correct" : "wrong");
                      if (correct) setTypeRaceScore(s => s + 1);
                      setTimeout(() => nextTypeRaceWord(), 500);
                    }}
                  />
                </>
              )}
            </View>
          )}

          {gameMode === "wordle" && (
            <ScrollView contentContainerStyle={{ padding: 20, alignItems: "center" }}>
              <Text style={{ color: "#fff", fontWeight: "800", fontSize: 18, marginBottom: 4 }}>Vocab Wordle</Text>
              {wordleWord && <Text style={{ color: "#9aa4c7", fontSize: 12, marginBottom: 16 }}>Guess the {wordleWord.w.length}-letter word</Text>}
              {wordleMessage ? <Text style={{ color: wordleWon ? "#4caf50" : "#ff4d4d", fontWeight: "700", fontSize: 16, marginBottom: 12 }}>{wordleMessage}</Text> : null}
              {wordleGuesses.map((guess, gi) => (
                <View key={gi} style={{ flexDirection: "row", gap: 6, marginBottom: 6 }}>
                  {guess.map((cell, ci) => (
                    <View key={ci} style={{ width: 44, height: 44, borderRadius: 8, backgroundColor: cell.status === "correct" ? "#16a34a" : cell.status === "present" ? "#d97706" : "#475569", justifyContent: "center", alignItems: "center" }}>
                      <Text style={{ color: "#fff", fontWeight: "800", fontSize: 18 }}>{cell.letter}</Text>
                    </View>
                  ))}
                </View>
              ))}
              {!wordleGameOver && wordleWord && (
                <>
                  <View style={{ flexDirection: "row", gap: 6, marginBottom: 16, marginTop: 6 }}>
                    {Array(wordleWord.w.length).fill(0).map((_, i) => (
                      <View key={i} style={{ width: 44, height: 44, borderRadius: 8, backgroundColor: "#151c36", justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: wordleCurrentGuess.length > i ? "#f5c518" : "#2a3a5c" }}>
                        <Text style={{ color: "#f5c518", fontWeight: "800", fontSize: 18 }}>{wordleCurrentGuess[i] || ""}</Text>
                      </View>
                    ))}
                  </View>
                  <TextInput
                    style={{ backgroundColor: "#151c36", color: "#fff", padding: 14, borderRadius: 12, fontSize: 18, textAlign: "center", borderWidth: 1.5, borderColor: "#2a3a5c", width: "100%", letterSpacing: 4, marginBottom: 12 }}
                    value={wordleCurrentGuess}
                    onChangeText={t => setWordleCurrentGuess(t.toUpperCase().slice(0, wordleWord.w.length))}
                    placeholder="Type guess..."
                    placeholderTextColor="#555"
                    autoCapitalize="characters"
                    autoCorrect={false}
                    maxLength={wordleWord.w.length}
                  />
                  <TouchableOpacity style={{ backgroundColor: "#4caf50", padding: 14, borderRadius: 12, width: "100%", alignItems: "center" }} onPress={submitWordleGuess}>
                    <Text style={{ color: "#fff", fontWeight: "800", fontSize: 16 }}>Submit Guess</Text>
                  </TouchableOpacity>
                </>
              )}
              {wordleGameOver && (
                <View style={{ alignItems: "center", marginTop: 16 }}>
                  {wordleWord && <Text style={{ color: "#9aa4c7", marginBottom: 8 }}>Word: {wordleWord.w} — {wordleWord.d}</Text>}
                  <TouchableOpacity style={{ backgroundColor: "#4caf50", padding: 14, borderRadius: 12, paddingHorizontal: 32 }} onPress={() => startWordle()}>
                    <Text style={{ color: "#fff", fontWeight: "800" }}>New Word</Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          )}

          {gameMode === "bossbattle" && (
            <ScrollView contentContainerStyle={{ padding: 20 }}>
              {bossGameOver ? (
                <View style={{ alignItems: "center", padding: 20 }}>
                  <Text style={{ fontSize: 56 }}>{bossWon ? "🏆" : "💀"}</Text>
                  <Text style={{ color: bossWon ? "#4caf50" : "#ff4d4d", fontSize: 24, fontWeight: "800", marginTop: 12 }}>{bossWon ? "Victory!" : "Defeated!"}</Text>
                  <TouchableOpacity style={{ backgroundColor: "#f43644", padding: 14, borderRadius: 12, marginTop: 20, paddingHorizontal: 32 }} onPress={() => startBossBattle()}>
                    <Text style={{ color: "#fff", fontWeight: "800" }}>Play Again</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: "#ff4d4d", fontSize: 12, fontWeight: "700", marginBottom: 4 }}>👾 Boss HP</Text>
                      <View style={{ height: 12, backgroundColor: "#2a0d0d", borderRadius: 6, overflow: "hidden" }}>
                        <View style={{ height: 12, width: `${bossHP}%`, backgroundColor: "#ff4d4d", borderRadius: 6 }} />
                      </View>
                      <Text style={{ color: "#ff4d4d", fontSize: 11, marginTop: 2 }}>{bossHP}/100</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: "#4caf50", fontSize: 12, fontWeight: "700", marginBottom: 4 }}>🧙 Your HP</Text>
                      <View style={{ height: 12, backgroundColor: "#0d2a18", borderRadius: 6, overflow: "hidden" }}>
                        <View style={{ height: 12, width: `${playerHP}%`, backgroundColor: "#4caf50", borderRadius: 6 }} />
                      </View>
                      <Text style={{ color: "#4caf50", fontSize: 11, marginTop: 2 }}>{playerHP}/100</Text>
                    </View>
                  </View>
                  {bossStreak > 0 && <Text style={{ color: "#f5c518", fontWeight: "700", textAlign: "center", marginBottom: 10 }}>🔥 {bossStreak} streak! +bonus damage</Text>}
                  {bossQuestion && (
                    <>
                      <View style={{ backgroundColor: "#151c36", borderRadius: 16, padding: 20, alignItems: "center", marginBottom: 20 }}>
                        <Text style={{ color: "#9aa4c7", fontSize: 12, marginBottom: 8 }}>DEFINE THIS WORD</Text>
                        <Text style={{ color: "#f5c518", fontSize: 28, fontWeight: "800" }}>{bossQuestion.w}</Text>
                      </View>
                      {bossChoices.map((choice, i) => {
                        const isCorrect = bossAnswered && choice === bossQuestion.d;
                        const isSelected = bossAnswered && choice === (bossCorrect);
                        let bg = "#151c36", border = "#2a3a5c";
                        if (bossAnswered && isCorrect) { bg = "#1a4d2e"; border = "#4caf50"; }
                        else if (bossAnswered && choice === bossCorrect && !isCorrect) { bg = "#4d1a1a"; border = "#ff4d4d"; }
                        return (
                          <TouchableOpacity key={i} style={{ backgroundColor: bg, borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1.5, borderColor: border }} disabled={bossAnswered}
                            onPress={() => {
                              const correct = choice === bossQuestion.d;
                              setBossCorrect(choice);
                              setBossAnswered(true);
                              if (correct) {
                                const streak = bossStreak + 1;
                                const dmg = 20 + (streak >= 3 ? 10 : 0);
                                setBossStreak(streak);
                                setBossHP(prev => {
                                  const newHP = Math.max(0, prev - dmg);
                                  if (newHP <= 0) { setBossGameOver(true); setBossWon(true); }
                                  return newHP;
                                });
                              } else {
                                setBossStreak(0);
                                setPlayerHP(prev => {
                                  const newHP = Math.max(0, prev - 25);
                                  if (newHP <= 0) { setBossGameOver(true); setBossWon(false); }
                                  return newHP;
                                });
                              }
                              setTimeout(() => nextBossQuestion(), 800);
                            }}>
                            <Text style={{ color: "#fff", fontSize: 14, lineHeight: 20 }}>{choice}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </>
                  )}
                </>
              )}
            </ScrollView>
          )}

          {gameMode === "rapidfire" && (
            <View style={{ flex: 1, padding: 20 }}>
              {rapidFinished ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ color: "#facc15", fontSize: 56, fontWeight: "800" }}>{rapidScore}/10</Text>
                  <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700", marginTop: 8 }}>{rapidScore >= 8 ? "🔥 On Fire!" : rapidScore >= 5 ? "💪 Nice!" : "📚 Keep drilling!"}</Text>
                  <TouchableOpacity style={{ backgroundColor: "#facc15", padding: 14, borderRadius: 12, marginTop: 24, paddingHorizontal: 32 }} onPress={() => startRapidFire()}>
                    <Text style={{ color: "#070d1f", fontWeight: "800" }}>Play Again</Text>
                  </TouchableOpacity>
                </View>
              ) : rapidQuestions.length > 0 && (() => {
                const current = rapidQuestions[rapidIndex];
                return (
                  <>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
                      <Text style={{ color: "#facc15", fontWeight: "800", fontSize: 16 }}>{rapidIndex + 1}/10</Text>
                      <Text style={{ color: rapidTimeLeft <= 2 ? "#ff4d4d" : "#facc15", fontWeight: "800", fontSize: 24 }}>⏱ {rapidTimeLeft}s</Text>
                      <Text style={{ color: "#4caf50", fontWeight: "800", fontSize: 16 }}>✓ {rapidScore}</Text>
                    </View>
                    <View style={{ height: 6, backgroundColor: "#2a2a10", borderRadius: 3, overflow: "hidden", marginBottom: 20 }}>
                      <View style={{ height: 6, width: `${(rapidTimeLeft / 5) * 100}%`, backgroundColor: rapidTimeLeft <= 2 ? "#ff4d4d" : "#facc15", borderRadius: 3 }} />
                    </View>
                    <View style={{ backgroundColor: "#151c36", borderRadius: 16, padding: 20, alignItems: "center", marginBottom: 20 }}>
                      <Text style={{ color: "#9aa4c7", fontSize: 12, marginBottom: 8 }}>DEFINE:</Text>
                      <Text style={{ color: "#facc15", fontSize: 28, fontWeight: "800" }}>{current.word.w}</Text>
                    </View>
                    {current.choices.map((choice, i) => {
                      const isCorrect = rapidAnswered && choice === current.word.d;
                      const isSelected = rapidAnswered && rapidSelected !== -1 && current.choices[rapidSelected] === choice;
                      let bg = "#151c36", border = "#2a3a5c";
                      if (rapidAnswered && isCorrect) { bg = "#1a4d2e"; border = "#4caf50"; }
                      else if (rapidAnswered && isSelected && !isCorrect) { bg = "#4d1a1a"; border = "#ff4d4d"; }
                      return (
                        <TouchableOpacity key={i} style={{ backgroundColor: bg, borderRadius: 12, padding: 12, marginBottom: 8, borderWidth: 1.5, borderColor: border }} disabled={rapidAnswered}
                          onPress={() => {
                            if (rapidTimerRef.current) clearInterval(rapidTimerRef.current);
                            const correct = choice === current.word.d;
                            setRapidAnswered(true);
                            setRapidSelected(i);
                            const newScore = correct ? rapidScore + 1 : rapidScore;
                            if (correct) setRapidScore(newScore);
                            setTimeout(() => nextRapidQuestion(rapidIndex, newScore), 600);
                          }}>
                          <Text style={{ color: "#fff", fontSize: 14 }}>{choice}</Text>
                        </TouchableOpacity>
                      );
                    })}
                    {rapidAnswered && rapidSelected === -1 && <Text style={{ color: "#ff4d4d", textAlign: "center", fontWeight: "700" }}>⏱ Time's up!</Text>}
                  </>
                );
              })()}
            </View>
          )}

          {gameMode === "triviaparty" && triviaQuestion && (
            <ScrollView contentContainerStyle={{ padding: 20 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
                <Text style={{ color: "#818cf8", fontWeight: "800", fontSize: 16 }}>Q {triviaTotal + 1}</Text>
                <Text style={{ color: "#f5c518", fontWeight: "800", fontSize: 16 }}>💎 {TRIVIA_MILESTONES[triviaMilestone] || 0}</Text>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  {triviaLifelines.fifty && <TouchableOpacity style={{ backgroundColor: "#1a1a3a", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, borderWidth: 1, borderColor: "#818cf8" }} onPress={() => {
                    const wrong = triviaChoices.filter(c => c !== triviaQuestion.d);
                    const toElim = wrong.sort(() => Math.random() - 0.5).slice(0, 2);
                    setTriviaEliminated(toElim);
                    setTriviaLifelines(prev => ({ ...prev, fifty: false }));
                  }}><Text style={{ color: "#818cf8", fontWeight: "700", fontSize: 12 }}>50:50</Text></TouchableOpacity>}
                  {triviaLifelines.skip && <TouchableOpacity style={{ backgroundColor: "#1a1a3a", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, borderWidth: 1, borderColor: "#f5c518" }} onPress={() => { nextTriviaQuestion(triviaMilestone); setTriviaLifelines(prev => ({ ...prev, skip: false })); }}><Text style={{ color: "#f5c518", fontWeight: "700", fontSize: 12 }}>Skip</Text></TouchableOpacity>}
                </View>
              </View>
              <View style={{ backgroundColor: "#0c0c1a", borderRadius: 16, padding: 20, alignItems: "center", marginBottom: 24 }}>
                <Text style={{ color: "#9aa4c7", fontSize: 12, marginBottom: 8 }}>WHAT DOES THIS MEAN?</Text>
                <Text style={{ color: "#818cf8", fontSize: 28, fontWeight: "800" }}>{triviaQuestion.w}</Text>
              </View>
              {triviaChoices.map((choice, i) => {
                const isElim = triviaEliminated.includes(choice);
                const isSelected = triviaSelected === choice;
                const isCorrect = triviaSelected && choice === triviaQuestion.d;
                const isWrong = isSelected && !isCorrect;
                let bg = "#0c0c1a", border = "#2a2a4a";
                if (isElim) { bg = "#1a1a1a"; border = "#1a1a1a"; }
                else if (isCorrect) { bg = "#1a4d2e"; border = "#4caf50"; }
                else if (isWrong) { bg = "#4d1a1a"; border = "#ff4d4d"; }
                else if (isSelected) { bg = "#1a1a3a"; border = "#818cf8"; }
                return (
                  <TouchableOpacity key={i} style={{ backgroundColor: bg, borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1.5, borderColor: border, opacity: isElim ? 0.2 : 1 }} disabled={!!triviaSelected || isElim}
                    onPress={() => {
                      setTriviaSelected(choice);
                      setTriviaTotal(t => t + 1);
                      if (choice === triviaQuestion.d) {
                        const newMilestone = Math.min(triviaMilestone + 1, TRIVIA_MILESTONES.length - 1);
                        setTriviaMilestone(newMilestone);
                        setTriviaScore(TRIVIA_MILESTONES[newMilestone] || 0);
                        setTimeout(() => nextTriviaQuestion(newMilestone), 800);
                      } else {
                        setTimeout(() => { startTriviaParty(); }, 1500);
                      }
                    }}>
                    <Text style={{ color: isElim ? "#2a2a4a" : "#fff", fontSize: 14 }}>{choice}</Text>
                  </TouchableOpacity>
                );
              })}
              <View style={{ flexDirection: "row", gap: 6, marginTop: 16, flexWrap: "wrap" }}>
                {TRIVIA_MILESTONES.slice(1).map((val, i) => (
                  <View key={i} style={{ paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, backgroundColor: i < triviaMilestone ? "#1a4d2e" : i === triviaMilestone - 1 ? "#f5c518" : "#1a1a2a" }}>
                    <Text style={{ color: i < triviaMilestone ? "#4caf50" : i === triviaMilestone - 1 ? "#070d1f" : "#475569", fontSize: 10, fontWeight: "700" }}>${val >= 1000 ? `${val / 1000}K` : val}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          )}

        </SafeAreaView>
      </Modal>

      {/* Drills Modal */}
      <Modal visible={drillModalVisible} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: "#0b1020" }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: "#151c36" }}>
            <TouchableOpacity onPress={() => { if (drillTimerRef.current) clearInterval(drillTimerRef.current); if (drillDomain && !drillFinished) { setDrillDomain(null); setDrillDifficulty(null); } else { setDrillModalVisible(false); } }}><Text style={{ color: "#9aa4c7", fontSize: 16 }}>{drillDomain ? "← Back" : "✕ Close"}</Text></TouchableOpacity>
            <Text style={{ color: "#fff", fontWeight: "700" }}>⚡ Drills</Text>
            <View style={{ width: 60 }} />
          </View>
          {!drillDomain && (
            <ScrollView contentContainerStyle={{ padding: 20 }}>
              <Text style={{ color: "#9aa4c7", fontSize: 14, marginBottom: 20 }}>10 questions per drill, timed per question.</Text>
              {(() => {
                const allDomains = [...new Set(questionBank.map(q => q.domain).filter(Boolean))];
                const mathDomains = allDomains.filter(d => {
                  const n = (d || "").toLowerCase();
                  return n.includes("algebra") || n.includes("advanced math") || n.includes("problem solving") || n.includes("geometry") || n.includes("trig");
                });
                const rwDomains = allDomains.filter(d => {
                  const n = (d || "").toLowerCase();
                  return n.includes("information") || n.includes("craft") || n.includes("expression") || n.includes("convention") || n.includes("standard english");
                });
                return [...mathDomains, ...rwDomains];
              })().map(domain => (
                <View key={domain} style={{ backgroundColor: "#151c36", borderRadius: 12, padding: 14, marginBottom: 10 }}>
                  <Text style={{ color: "#fff", fontWeight: "700", marginBottom: 10 }}>{domain}</Text>
                  <View style={{ flexDirection: "row", gap: 8 }}>
                    {DIFFICULTIES.map(diff => {
                      const count = questionBank.filter(q => q.domain === domain && q.difficulty === diff).length;
                      return (
                        <TouchableOpacity key={diff} style={{ flex: 1, backgroundColor: diff === "Easy" ? "#1a3a2a" : diff === "Medium" ? "#3a2a10" : "#3a1a1a", padding: 10, borderRadius: 8, alignItems: "center", opacity: count === 0 ? 0.3 : 1 }} disabled={count === 0} onPress={() => startDrill(domain, diff)}>
                          <Text style={{ color: diff === "Easy" ? "#4caf50" : diff === "Medium" ? "#f5c518" : "#ff4d4d", fontWeight: "700", fontSize: 12 }}>{diff}</Text>
                          <Text style={{ color: "#475569", fontSize: 10, marginTop: 2 }}>{count}q</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
          {drillDomain && !drillFinished && drillQuestions.length > 0 && (() => {
            const q = drillQuestions[drillIndex];
            const isAnswered = drillAnswer !== null;
            return (
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, backgroundColor: "#0f1829" }}>
                  <Text style={{ color: "#9aa4c7", fontSize: 13 }}>{drillIndex + 1}/{drillQuestions.length}</Text>
                  <Text style={{ color: drillTimeLeft <= 10 ? "#ff4d4d" : "#f5c518", fontWeight: "800", fontSize: 20 }}>⏱ {drillTimeLeft}s</Text>
                  <Text style={{ color: "#4caf50", fontSize: 13 }}>✓ {drillScore}</Text>
                </View>
                <View style={{ height: 4, backgroundColor: "#151c36" }}><View style={{ height: 4, backgroundColor: drillTimeLeft <= 10 ? "#ff4d4d" : "#f5c518", width: `${(drillTimeLeft / (DRILL_TIMES[drillDifficulty] || 45)) * 100}%` }} /></View>
                <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
                  <View style={{ backgroundColor: "#151c36", borderRadius: 14, padding: 20, marginBottom: 20 }}>
                    <Text style={{ color: "#9aa4c7", fontSize: 11, marginBottom: 8 }}>{q.domain} · {q.difficulty}</Text>
                    <Text style={{ color: "#fff", fontSize: 16, lineHeight: 26 }}>{q.question}</Text>
                  </View>
                  {q.choices.map((c, i) => {
                    const letter = ["A","B","C","D"][i];
                    const isCorrect = i === q.answer;
                    const isSelected = drillAnswer === i;
                    let bg = "#151c36";
                    if (isAnswered && isCorrect) bg = "#1a4d2e";
                    else if (isAnswered && isSelected && !isCorrect) bg = "#4d1a1a";
                    else if (isAnswered && drillAnswer === -1 && isCorrect) bg = "#1a4d2e";
                    return (
                      <TouchableOpacity key={i} style={{ backgroundColor: bg, borderRadius: 12, padding: 14, marginBottom: 10, flexDirection: "row", gap: 12, alignItems: "center", borderWidth: 1, borderColor: isAnswered && isCorrect ? "#4caf50" : "#2a3a5c" }} disabled={isAnswered} onPress={() => { if (drillTimerRef.current) clearInterval(drillTimerRef.current); setDrillAnswer(i); if (i === q.answer) setDrillScore(prev => prev + 1); }}>
                        <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: "#0b1020", justifyContent: "center", alignItems: "center" }}><Text style={{ color: "#9aa4c7", fontWeight: "700" }}>{letter}</Text></View>
                        <Text style={{ color: "#fff", flex: 1, fontSize: 14 }}>{c}</Text>
                      </TouchableOpacity>
                    );
                  })}
                  {isAnswered && (
                    <>
                      <View style={{ backgroundColor: "#0f2a1a", borderRadius: 10, padding: 14, marginBottom: 16 }}>
                        <Text style={{ color: "#4caf50", fontWeight: "700", marginBottom: 4 }}>💡 Explanation</Text>
                        <Text style={{ color: "#9aa4c7", lineHeight: 20 }}>{q.explanation}</Text>
                      </View>
                      <TouchableOpacity style={{ backgroundColor: "#f5c518", padding: 16, borderRadius: 12, alignItems: "center" }} onPress={() => nextDrillQuestion()}>
                        <Text style={{ color: "#070d1f", fontWeight: "800", fontSize: 16 }}>{drillIndex + 1 >= drillQuestions.length ? "Finish" : "Next →"}</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </ScrollView>
              </View>
            );
          })()}
          {drillFinished && (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 30 }}>
              <Text style={{ color: "#f5c518", fontSize: 60, fontWeight: "800" }}>{drillScore}/{drillQuestions.length}</Text>
              <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700", marginTop: 8 }}>{drillScore === drillQuestions.length ? "Perfect! 🎉" : drillScore >= drillQuestions.length * 0.7 ? "Great job! 💪" : "Keep drilling! 📚"}</Text>
              <View style={{ flexDirection: "row", gap: 12, marginTop: 30 }}>
                <TouchableOpacity style={{ flex: 1, backgroundColor: "#1f2a52", padding: 14, borderRadius: 12, alignItems: "center" }} onPress={() => { setDrillDomain(null); setDrillDifficulty(null); setDrillFinished(false); }}><Text style={{ color: "#fff", fontWeight: "700" }}>New Drill</Text></TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, backgroundColor: "#f5c518", padding: 14, borderRadius: 12, alignItems: "center" }} onPress={() => startDrill(drillDomain, drillDifficulty)}><Text style={{ color: "#070d1f", fontWeight: "700" }}>Try Again</Text></TouchableOpacity>
              </View>
            </View>
          )}
        </SafeAreaView>
      </Modal>

      {/* Casper Bot */}
      <CasperBot onPress={() => setStudyBotVisible(true)} />
      <Modal visible={studyBotVisible} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: "#070d1f" }}>
          <View style={{ flexDirection: "row", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: "#151c36", gap: 12 }}>
            <TouchableOpacity onPress={() => setStudyBotVisible(false)}><Text style={{ color: "#9aa4c7", fontSize: 16 }}>✕</Text></TouchableOpacity>
            <Image source={require("./logo.png")} style={{ width: 38, height: 38, borderRadius: 10 }} resizeMode="contain" />
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#fff", fontWeight: "800", fontSize: 16 }}>Casper</Text>
              <Text style={{ color: "#38bdf8", fontSize: 11 }}>Your AscendSAT Study Bot</Text>
            </View>
            <TouchableOpacity onPress={() => setBotMessages([{ role: "assistant", content: "Hi! I'm Casper 👋 Ask me anything about the SAT!" }])}><Text style={{ color: "#475569", fontSize: 12 }}>Clear</Text></TouchableOpacity>
          </View>
          <ScrollView ref={botScrollRef} style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingBottom: 20 }} onContentSizeChange={() => botScrollRef.current?.scrollToEnd({ animated: true })}>
            {botMessages.map((msg, i) => {
              const isBot = msg.role === "assistant";
              return (
                <View key={i} style={{ marginBottom: 16, alignItems: isBot ? "flex-start" : "flex-end" }}>
                  {isBot && <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 }}><Image source={require("./logo.png")} style={{ width: 22, height: 22, borderRadius: 6 }} resizeMode="contain" /><Text style={{ color: "#38bdf8", fontSize: 11, fontWeight: "700" }}>Casper</Text></View>}
                  <View style={{ maxWidth: "85%", backgroundColor: isBot ? "#0f1829" : "#1d4ed8", borderRadius: 16, borderTopLeftRadius: isBot ? 4 : 16, borderTopRightRadius: isBot ? 16 : 4, padding: 14, borderWidth: isBot ? 1 : 0, borderColor: "#1a2540" }}>
                    <Text style={{ color: "#fff", fontSize: 14, lineHeight: 22 }}>{msg.content}</Text>
                  </View>
                </View>
              );
            })}
            {botLoading && <View style={{ alignItems: "flex-start", marginBottom: 16 }}><View style={{ backgroundColor: "#0f1829", borderRadius: 16, borderTopLeftRadius: 4, padding: 14, borderWidth: 1, borderColor: "#1a2540" }}><Text style={{ color: "#475569", fontSize: 14 }}>Thinking...</Text></View></View>}
          </ScrollView>
          <View style={{ padding: 12, borderTopWidth: 1, borderTopColor: "#151c36", flexDirection: "row", alignItems: "flex-end", gap: 10, backgroundColor: "#070d1f" }}>
            <TextInput style={{ flex: 1, backgroundColor: "#0f1829", color: "#fff", padding: 12, borderRadius: 14, fontSize: 14, maxHeight: 100, borderWidth: 1, borderColor: "#1a2540", lineHeight: 20 }} value={botInput} onChangeText={setBotInput} placeholder="Ask Casper anything..." placeholderTextColor="#475569" multiline onSubmitEditing={sendBotMessage} />
            <TouchableOpacity style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: botInput.trim() ? "#1d4ed8" : "#151c36", justifyContent: "center", alignItems: "center" }} onPress={sendBotMessage} disabled={!botInput.trim() || botLoading}>
              <Text style={{ color: "#fff", fontSize: 18 }}>↑</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

    </View>
  );
}

  /* ---------------- SETTINGS / PROFILE ---------------- */
  if (view === "settings") {
    const days = userProfile?.testDate ? daysUntil(userProfile.testDate) : null;
    const settBg = isLight ? "#f1f5f9" : "#0b1020";
    const cardBg = isLight ? "#ffffff" : "#151c36";
    const cardBorder = isLight ? "#e2e8f0" : "#1f2a52";
    const labelColor = isLight ? "#64748b" : "#9aa4c7";
    const textColor = isLight ? "#0f172a" : "#fff";
    const accentColor = isLight ? "#1d4ed8" : "#f5c518";
    const dividerColor = isLight ? "#e2e8f0" : "#2a3a5c";
    return (
      <View style={{ flex: 1, backgroundColor: settBg }}>
        <ScrollView style={{ flex: 1, backgroundColor: settBg, padding: 20 }} contentContainerStyle={{ paddingBottom: 60 }}>
          <TouchableOpacity style={{ alignSelf: "flex-start", padding: 8, backgroundColor: isLight ? "#e2e8f0" : "#2a2f55", borderRadius: 8, marginBottom: 10 }} onPress={() => setView("home")}>
            <Text style={{ color: isLight ? "#1e293b" : "#fff", fontWeight: "600" }}>← Back</Text>
          </TouchableOpacity>
          <Text style={{ color: textColor, fontSize: 22, fontWeight: "700", marginBottom: 16 }}>⚙️ Profile & Settings</Text>

          {/* Current info card */}
          <View style={{ backgroundColor: cardBg, borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: cardBorder }}>
            <Text style={{ color: labelColor, fontSize: 12, fontWeight: "700", letterSpacing: 1, marginBottom: 14 }}>CURRENT SETTINGS</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: accentColor, fontSize: 32, fontWeight: "800" }}>{userProfile?.targetScore || "—"}</Text>
                <Text style={{ color: labelColor, fontSize: 12, marginTop: 4 }}>Target Score</Text>
              </View>
              <View style={{ width: 1, backgroundColor: dividerColor }} />
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: days !== null && days <= 14 ? "#dc2626" : isLight ? "#2563eb" : "#60a5fa", fontSize: 32, fontWeight: "800" }}>
                  {days === null ? "—" : days <= 0 ? "Today" : days}
                </Text>
                <Text style={{ color: labelColor, fontSize: 12, marginTop: 4 }}>Days Until Test</Text>
              </View>
            </View>
            {userProfile?.testDate && (
              <Text style={{ color: labelColor, fontSize: 12, textAlign: "center", marginTop: 12 }}>
                📅 {new Date(userProfile.testDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
              </Text>
            )}
          </View>

          {/* Account info */}
          <View style={{ backgroundColor: cardBg, borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: cardBorder }}>
            <Text style={{ color: labelColor, fontSize: 12, fontWeight: "700", letterSpacing: 1, marginBottom: 12 }}>ACCOUNT</Text>
            <Text style={{ color: textColor, fontSize: 14 }}>📧 {email}</Text>
          </View>

          {/* Edit form */}
          <View style={{ backgroundColor: cardBg, borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: cardBorder }}>
            <Text style={{ color: labelColor, fontSize: 12, fontWeight: "700", letterSpacing: 1, marginBottom: 16 }}>EDIT SETTINGS</Text>

            <Text style={{ color: textColor, fontWeight: "600", marginBottom: 8 }}>Your Name</Text>
            <TextInput
              style={[styles.input, { marginBottom: 16 }]}
              value={userName}
              onChangeText={setUserName}
              placeholder="What should we call you?"
              placeholderTextColor={isLight ? "#94a3b8" : "#555"}
              autoCapitalize="words"
              maxLength={30}
            />

            <Text style={{ color: textColor, fontWeight: "600", marginBottom: 8 }}>Target Score</Text>
            <TextInput
              style={[styles.input, { fontSize: 20, fontWeight: "700", color: accentColor, textAlign: "center", marginBottom: 16 }]}
              value={editTargetScore}
              onChangeText={(val) => {
                const n = val.replace(/[^0-9]/g, "");
                if (n === "") setEditTargetScore("");
                else if (Number(n) > 1600) setEditTargetScore("1600");
                else setEditTargetScore(n);
              }}
              keyboardType="numeric"
              placeholder="e.g. 1400"
              placeholderTextColor={isLight ? "#94a3b8" : "#555"}
              maxLength={4}
            />

            <Text style={{ color: textColor, fontWeight: "600", marginBottom: 8 }}>Test Date</Text>
            {Platform.OS === "web" ? (
              <TextInput
                style={[styles.input, { marginBottom: 16 }]}
                value={editTestDateInput}
                onChangeText={setEditTestDateInput}
                onBlur={() => {
                  const parsed = new Date(editTestDateInput);
                  if (!isNaN(parsed)) setEditTestDate(parsed);
                }}
                placeholder="MM/DD/YYYY"
                placeholderTextColor="#555"
              />
            ) : (
              <>
                <TouchableOpacity
                  style={{ backgroundColor: "#0f1829", padding: 14, borderRadius: 10, marginBottom: 8, alignItems: "center", borderWidth: 1, borderColor: "#2a3a5c" }}
                  onPress={() => setEditShowDatePicker(true)}
                >
                  <Text style={{ color: "#60a5fa", fontWeight: "700", fontSize: 15 }}>
                    📅 {editTestDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </Text>
                </TouchableOpacity>
                {editShowDatePicker && (
                  <DateTimePicker
                    value={editTestDate}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    minimumDate={new Date()}
                    onChange={(event, selectedDate) => {
                      if (Platform.OS === "android") {
                        setEditShowDatePicker(false);
                        if (event?.type === "set" && selectedDate) {
                          setEditTestDate(selectedDate);
                          setEditTestDateInput(selectedDate.toLocaleDateString("en-US"));
                        }
                      } else {
                        if (selectedDate) {
                          setEditTestDate(selectedDate);
                          setEditTestDateInput(selectedDate.toLocaleDateString("en-US"));
                        }
                      }
                    }}
                  />
                )}
                {Platform.OS === "ios" && editShowDatePicker && (
                  <TouchableOpacity
                    style={{ backgroundColor: "#1f2a52", padding: 10, borderRadius: 8, alignItems: "center", marginBottom: 12 }}
                    onPress={() => setEditShowDatePicker(false)}
                  >
                    <Text style={{ color: "#fff", fontWeight: "600" }}>Confirm Date</Text>
                  </TouchableOpacity>
                )}
              </>
            )}

            {profileSaved && (
              <View style={{ backgroundColor: "#1a3a2a", borderRadius: 10, padding: 12, marginBottom: 12, alignItems: "center" }}>
                <Text style={{ color: "#4caf50", fontWeight: "700" }}>✅ Profile updated!</Text>
              </View>
            )}

            <TouchableOpacity
              style={{ backgroundColor: "#f5c518", padding: 16, borderRadius: 12, alignItems: "center", opacity: editTargetScore && Number(editTargetScore) >= 400 ? 1 : 0.4 }}
              disabled={!editTargetScore || Number(editTargetScore) < 400}
onPress={async () => {
                const safeDate = editTestDate instanceof Date && !isNaN(editTestDate) ? editTestDate : new Date();
                const updatedProfile = {
                  ...userProfile,
                  targetScore: Number(editTargetScore),
                  testDate: safeDate.toISOString(),
                  name: userName.trim(),
                };
                await saveUserProfile(userId, updatedProfile);
                setProfileSaved(true);
                setTimeout(() => setProfileSaved(false), 3000);
              }}
            >
              <Text style={{ color: "#070d1f", fontWeight: "800", fontSize: 16 }}>Save Changes</Text>
            </TouchableOpacity>
          </View>

          {/* Theme toggle */}
          <View style={{ backgroundColor: isLight ? "#fff" : "#151c36", borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#1f2a52" }}>
            <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 12, fontWeight: "700", letterSpacing: 1, marginBottom: 14 }}>APPEARANCE</Text>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <View>
                <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700", fontSize: 15 }}>{isLight ? "☀️ Light Mode" : "🌙 Dark Mode"}</Text>
                <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 12, marginTop: 3 }}>Tap to switch theme</Text>
              </View>
              <TouchableOpacity
                style={{ backgroundColor: isLight ? "#1d4ed8" : "#f5c518", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 22 }}
                onPress={() => setThemeMode(isLight ? "dark" : "light")}
              >
                <Text style={{ color: isLight ? "#fff" : "#070d1f", fontWeight: "700", fontSize: 13 }}>
                  Switch to {isLight ? "Dark" : "Light"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Danger zone */}
          <View style={{ backgroundColor: isLight ? "#fff5f5" : "#1a0a0a", borderRadius: 16, padding: 20, borderWidth: 1, borderColor: isLight ? "#fecaca" : "#3a1a1a" }}>
            <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 12, fontWeight: "700", letterSpacing: 1, marginBottom: 12 }}>ACCOUNT ACTIONS</Text>
            <TouchableOpacity
              style={{ backgroundColor: isLight ? "#fee2e2" : "#2a1a1a", padding: 14, borderRadius: 12, alignItems: "center", borderWidth: 1, borderColor: isLight ? "#fca5a5" : "#4a1a1a" }}
              onPress={() => {
                Alert.alert("Log Out", "Are you sure you want to log out?", [
                  { text: "Cancel", style: "cancel" },
                  { text: "Log Out", style: "destructive", onPress: handleLogout },
                ]);
              }}
            >
              <Text style={{ color: "#dc2626", fontWeight: "700", fontSize: 15 }}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <CasperBot onPress={() => setStudyBotVisible(true)} />
      </View>
    );
  }

  /* ---------------- CLASSES ---------------- */

  if (view === "classes") {
    return (
  <View style={{ flex: 1 }}>
    <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => setView("home")}><Text style={styles.backText}>← Back</Text></TouchableOpacity>
        <Text style={styles.title}>📅 Available Classes</Text>
        <Text style={styles.subtitle}>Group classes are always free.</Text>
        {classesLoading ? <Text style={styles.subtitle}>Loading...</Text> : classesList.length === 0 ? (
          <Text style={styles.subtitle}>No classes scheduled yet. Check back soon!</Text>
        ) : (
          classesList.filter((cls) => !(cls.type === "individual" && cls.isBooked)).map((cls) => (
            <View key={cls.id} style={styles.historyCard}>
              <View style={styles.historyTop}>
                <Text style={styles.historyScore}>{cls.title}</Text>
                <View style={[land.classBadge, cls.type === "group" ? land.classBadgeFree : land.classBadgePaid]}>
                  <Text style={land.classBadgeText}>{cls.type === "group" ? "FREE" : `$${cls.price}`}</Text>
                </View>
              </View>
              <Text style={styles.historyMeta}>📅 {cls.date ? new Date(cls.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) : "TBD"}</Text>
              <Text style={styles.historyMeta}>🕐 {cls.date ? new Date(cls.date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : ""} · {cls.durationHours || 1}h</Text>
              {cls.description ? <Text style={[styles.statText, { marginTop: 6 }]}>{cls.description}</Text> : null}
              <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={() => openBookingModal(cls)}>
                <Text style={styles.btnText}>Book This Class</Text>
              </TouchableOpacity>
              {isAdmin && (
                <TouchableOpacity style={[styles.button, { backgroundColor: "#7f1d1d", marginTop: 6 }]} onPress={() => removeClass(cls.id)}>
                  <Text style={styles.btnText}>Delete</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        )}
        <BookingModal />
        {isAdmin && (
          <TouchableOpacity style={[styles.button, { backgroundColor: "#4a1d96" }]} onPress={() => { loadAdminQuestions(); loadTestimonials(); loadGlobalStats(); setView("admin"); }}>
            <Text style={styles.btnText}>🔐 Admin Dashboard</Text>
          </TouchableOpacity>
        )}

        {/* VOCAB MODALS */}
        {vocabModalVisible && vocabMode === null && (
          <Modal visible={true} transparent animationType="fade">
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center", padding: 24 }}>
              <View style={{ backgroundColor: "#0f1829", borderRadius: 20, padding: 24, borderWidth: 1, borderColor: "#1a2540" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <Text style={{ color: "#fff", fontSize: 20, fontWeight: "800" }}>📖 Vocabulary</Text>
                  <TouchableOpacity onPress={() => setVocabModalVisible(false)}>
                    <Text style={{ color: "#9aa4c7", fontSize: 22 }}>✕</Text>
                  </TouchableOpacity>
                </View>
                <Text style={{ color: "#9aa4c7", fontSize: 14, marginBottom: 20 }}>{VOCAB_LIST.length} SAT words ready to study</Text>
                <TouchableOpacity style={{ backgroundColor: "#f5c518", padding: 16, borderRadius: 12, alignItems: "center", marginBottom: 12 }}
                  onPress={() => {
                    const shuffled = [...VOCAB_LIST].sort(() => Math.random() - 0.5);
                    setFlashcardDeck(shuffled);
                    setFlashcardIndex(0);
                    setFlashcardFlipped(false);
                    setVocabMode("flashcard");
                  }}>
                  <Text style={{ color: "#070d1f", fontWeight: "800", fontSize: 16 }}>🃏 Flashcards</Text>
                  <Text style={{ color: "#070d1f", fontSize: 12, marginTop: 2 }}>Tap to flip — swipe through all words</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: "#1f2a52", padding: 16, borderRadius: 12, alignItems: "center", marginBottom: 12 }}
                  onPress={() => { setVocabSearch(""); setVocabMode("list"); }}>
                  <Text style={{ color: "#fff", fontWeight: "800", fontSize: 16 }}>📋 Word List</Text>
                  <Text style={{ color: "#9aa4c7", fontSize: 12, marginTop: 2 }}>Browse and search all {VOCAB_LIST.length} words</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: "#1a3a2a", padding: 16, borderRadius: 12, alignItems: "center" }}
                  onPress={() => {
                    const shuffled = [...VOCAB_LIST].sort(() => Math.random() - 0.5);
                    const word = shuffled[0];
                    const wrong = shuffled.slice(1, 4).map(w => w.d);
                    const choices = [word.d, ...wrong].sort(() => Math.random() - 0.5);
                    setQuizWord(word);
                    setQuizChoices(choices);
                    setQuizSelected(null);
                    setQuizScore(0);
                    setQuizTotal(0);
                    setFlashcardDeck(shuffled);
                    setFlashcardIndex(0);
                    setVocabMode("quiz");
                  }}>
                  <Text style={{ color: "#4caf50", fontWeight: "800", fontSize: 16 }}>🧠 Vocab Quiz</Text>
                  <Text style={{ color: "#9aa4c7", fontSize: 12, marginTop: 2 }}>4-choice multiple choice</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    <CasperBot onPress={() => setStudyBotVisible(true)} />
  </View>
    );
  }
/* ---------------- PRACTICE SETUP ---------------- */

  if (view === "practice" && !quizStarted) {
    const domains = section === "Math" ? MATH : READING_WRITING;

    return (
  <View style={{ flex: 1 }}>
    <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => setView("home")}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Practice Setup</Text>

        <Text style={styles.subtitle}>Section</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.box, section === "Math" && styles.activeBox]}
            onPress={() => {
              setSection("Math");
              setSelectedDomains([]);
            }}
          >
            <Text style={styles.boxText}>Math</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.box, section === "Reading & Writing" && styles.activeBox]}
            onPress={() => {
              setSection("Reading & Writing");
              setSelectedDomains([]);
            }}
          >
            <Text style={styles.boxText}>Reading & Writing</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.countCard}>
          <Text style={styles.countTitle}>Question Bank</Text>
          <Text style={styles.countSub}>Auto-updates every 60 seconds</Text>
          <View style={styles.countRow}>
            <View style={styles.countItem}>
              <Text style={styles.countNumber}>{questionCounts.total}</Text>
              <Text style={styles.countLabel}>Total</Text>
            </View>
            <View style={styles.countItem}>
              <Text style={styles.countNumber}>{questionCounts.used}</Text>
              <Text style={styles.countLabel}>Used</Text>
            </View>
            <View style={styles.countItem}>
              <Text style={styles.countNumber}>{questionCounts.new}</Text>
              <Text style={styles.countLabel}>New</Text>
            </View>
            <View style={styles.countItem}>
              <Text style={[styles.countNumber, { color: "#dc2626" }]}>{questionCounts.wrong}</Text>
              <Text style={styles.countLabel}>Wrong</Text>
            </View>
          </View>
        </View>

        <Text style={styles.subtitle}>Question Type</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.box, questionSource === "all" && styles.activeBox]}
            onPress={() => setQuestionSource("all")}
          >
            <Text style={styles.boxText}>All</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.box, questionSource === "used" && styles.activeBox]}
            onPress={() => setQuestionSource("used")}
          >
            <Text style={styles.boxText}>Used</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.box, questionSource === "new" && styles.activeBox]}
            onPress={() => setQuestionSource("new")}
          >
            <Text style={styles.boxText}>New</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.box, questionSource === "wrong" && styles.activeBox, questionSource === "wrong" && { borderColor: "#dc2626" }]}
            onPress={() => setQuestionSource("wrong")}
          >
            <Text style={[styles.boxText, { color: questionSource === "wrong" ? "#dc2626" : undefined }]}>❌ Wrong</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Domains</Text>
        <View style={styles.grid}>
          {domains.map((d) => (
            <TouchableOpacity
              key={d}
              style={[styles.gridBox, selectedDomains.includes(d) && styles.activeGridBox]}
              onPress={() =>
                setSelectedDomains((prev) =>
                  prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
                )
              }
            >
              <Text style={styles.boxText}>{d}</Text>
              <Text style={styles.check}>{selectedDomains.includes(d) ? "✔" : ""}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.subtitle}>Difficulty</Text>
        <View style={styles.grid}>
          {DIFFICULTIES.map((d) => (
            <TouchableOpacity
              key={d}
              style={[styles.gridBox, selectedDiffs.includes(d) && styles.activeGridBox]}
              onPress={() =>
                setSelectedDiffs((prev) =>
                  prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
                )
              }
            >
              <Text style={styles.boxText}>{d}</Text>
              <Text style={styles.check}>{selectedDiffs.includes(d) ? "✔" : ""}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.subtitle}>Number of Questions</Text>
        <TextInput
          style={styles.input}
          value={questionCount}
          onChangeText={setQuestionCount}
          keyboardType="numeric"
          placeholder="e.g. 10"
          placeholderTextColor="#555"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.button, bankLoading && { opacity: 0.5 }]}
          onPress={startQuiz}
          disabled={bankLoading}
        >
          <Text style={styles.btnText}>
            {bankLoading ? "Loading Questions..." : "Start Practice"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    <CasperBot onPress={() => setStudyBotVisible(true)} />
  </View>
    );
  }

  /* ---------------- QUIZ ---------------- */

// =====================================================================
// DROP-IN REPLACEMENT — paste over the two quiz blocks in App.js:
//   1. "/* ---------------- QUIZ ---------------- */"  (the if block)
//   2. The "bb" StyleSheet at the bottom
//
// NEW FEATURES vs old:
//   • Highlight mode  — tap toolbar pencil icon → drag over question text
//   • Strikethrough   — long-press any answer choice to cross it out
//   • Mark for Review — flag icon in header; flagged Qs show 🔖 in navigator
//   • Annotate / ABC  — toggle strikethrough mode per-choice via "ABC̶" button
//   • Desmos-style    — Reference sheet button (placeholder)
//   • Answer Eliminator toolbar button
//   • Full Bluebook color palette (white bg, #1e3a5f navy, #1d4ed8 blue)
// =====================================================================

// ── Add these to your useState block at the top of App() ─────────────
//
//   const [markedForReview, setMarkedForReview] = useState({});
//   const [strikethrough, setStrikethrough] = useState({});   // { "qIdx-choiceIdx": true }
//   const [eliminatorOn, setEliminatorOn] = useState(false);
//   const [highlights, setHighlights] = useState({});          // { qIdx: [{start,end}] }
//
// ─────────────────────────────────────────────────────────────────────

/* ---------------- QUIZ ---------------- */

if (view === "practice" && quizStarted) {
  const q = quizQuestions[currentQ];
  const selectedAnswer = userAnswers[currentQ] ?? null;
  const answeredCount = Object.keys(userAnswers).length;
  const isFlagged = markedForReview[currentQ];

  if (quizFinished) {
    const pct = Math.round((score / quizQuestions.length) * 100);
    const band = pct >= 90 ? { label: "Excellent!", color: "#16a34a", bg: "#f0fdf4" }
               : pct >= 70 ? { label: "Great work!", color: "#1d4ed8", bg: "#eff6ff" }
               : pct >= 50 ? { label: "Keep going!", color: "#d97706", bg: "#fffbeb" }
               :             { label: "More practice!", color: "#dc2626", bg: "#fef2f2" };
    return (
      <SafeAreaView style={bb.scoreScreen}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={bb.scoreTitleRow}>
          <Text style={bb.scoreTitleText}>Section Complete</Text>
        </View>
        <View style={[bb.scoreBadge, { backgroundColor: band.bg, borderColor: band.color + "33" }]}>
          <Text style={[bb.scoreBig, { color: band.color }]}>{score}/{quizQuestions.length}</Text>
          <Text style={[bb.scorePercent, { color: band.color }]}>{pct}%</Text>
          <Text style={bb.scoreTime}>⏱ {formatTime(elapsed)}</Text>
          <View style={[bb.scorePill, { backgroundColor: band.color }]}>
            <Text style={bb.scorePillText}>{band.label}</Text>
          </View>
        </View>
        <View style={bb.scoreMetaRow}>
          <View style={bb.scoreMetaItem}>
            <Text style={bb.scoreMetaVal}>{answeredCount}</Text>
            <Text style={bb.scoreMetaLabel}>Answered</Text>
          </View>
          <View style={bb.scoreMetaDivider} />
          <View style={bb.scoreMetaItem}>
            <Text style={bb.scoreMetaVal}>{Object.keys(markedForReview).length}</Text>
            <Text style={bb.scoreMetaLabel}>Flagged</Text>
          </View>
          <View style={bb.scoreMetaDivider} />
          <View style={bb.scoreMetaItem}>
            <Text style={bb.scoreMetaVal}>{quizQuestions.length - answeredCount}</Text>
            <Text style={bb.scoreMetaLabel}>Skipped</Text>
          </View>
        </View>
        <TouchableOpacity style={bb.primaryBtn} onPress={() => { setQuizStarted(false); setView("results"); }}>
          <Text style={bb.primaryBtnText}>Review Answers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={bb.secondaryBtn} onPress={() => { setQuizStarted(false); setView("home"); }}>
          <Text style={bb.secondaryBtnText}>Back to Home</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // ── strikethrough helper ──────────────────────────────────────────
  const strikeKey = (qi, ci) => `${qi}-${ci}`;
  const isStruck = (ci) => !!strikethrough[strikeKey(currentQ, ci)];
  const toggleStrike = (ci) => {
    if (!eliminatorOn) return;
    const k = strikeKey(currentQ, ci);
    setStrikethrough(prev => ({ ...prev, [k]: !prev[k] }));
  };

  return (
    <SafeAreaView style={bb.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* ── TOP HEADER ── */}
      <View style={bb.header}>
        {/* Left: back + section label */}
        <TouchableOpacity style={bb.headerBackBtn} onPress={() => { setQuizStarted(false); setView("practice"); }}>
          <Text style={bb.headerBackText}>✕</Text>
        </TouchableOpacity>
        <View style={bb.headerMeta}>
          <Text style={bb.headerSection}>{section}</Text>
          <Text style={bb.headerModuleLabel}>Module 1 · {q.difficulty}</Text>
        </View>

        {/* Center: timer */}
        <View style={bb.headerTimerWrap}>
          <Text style={bb.timerText}>{formatTime(elapsed)}</Text>
        </View>

        {/* Right: question count + hide timer + directions */}
        <View style={bb.headerRight}>
          <Text style={bb.headerQCount}>{answeredCount}/{quizQuestions.length}</Text>
        </View>
      </View>

      {/* ── PROGRESS BAR ── */}
      <View style={bb.progressTrack}>
        <View style={[bb.progressFill, { width: `${((currentQ + 1) / quizQuestions.length) * 100}%` }]} />
      </View>

      {/* ── TOOLBAR ── */}
      <View style={bb.toolbar}>
        <View style={bb.toolbarLeft}>
          <Text style={bb.toolbarQNum}>Question {currentQ + 1} of {quizQuestions.length}</Text>
          {/* Mark for review */}
          <TouchableOpacity
            style={[bb.toolbarFlagBtn, isFlagged && bb.toolbarFlagBtnActive]}
            onPress={() => setMarkedForReview(prev => ({ ...prev, [currentQ]: !prev[currentQ] }))}
          >
            <Text style={[bb.toolbarFlagIcon, isFlagged && { color: "#1d4ed8" }]}>
              {isFlagged ? "🔖" : "🏳️"}
            </Text>
            <Text style={[bb.toolbarFlagText, isFlagged && { color: "#1d4ed8" }]}>
              {isFlagged ? "Marked" : "Mark for Review"}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Desmos — Math only */}
{section === "Math" && (
  <TouchableOpacity
    style={[bb.eliminatorBtn, { borderColor: "#16a34a", marginRight: 6 }]}
    onPress={() => setDesmosVisible(true)}
  >
    <Text style={{ fontSize: 14 }}>📐</Text>
    <Text style={[bb.eliminatorLabel, { color: "#16a34a" }]}>Desmos</Text>
  </TouchableOpacity>
)}

{/* Answer Eliminator */}
<TouchableOpacity
  style={[bb.eliminatorBtn, eliminatorOn && bb.eliminatorBtnOn]}
  onPress={() => setEliminatorOn(prev => !prev)}
>
          <Text style={[bb.eliminatorText, eliminatorOn && { color: "#1d4ed8", textDecorationLine: "line-through" }]}>
            ABC
          </Text>
          <Text style={[bb.eliminatorLabel, eliminatorOn && { color: "#1d4ed8" }]}>
            {eliminatorOn ? "Eliminator ON" : "Eliminator"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* ── CONTENT AREA ── */}
      <ScrollView style={bb.content} contentContainerStyle={bb.contentInner}>

        {/* Domain chip */}
        <View style={bb.domainChip}>
          <Text style={bb.domainChipText}>{q.domain}</Text>
          <View style={bb.domainDot} />
          <Text style={bb.domainChipText}>{q.questionType}</Text>
        </View>

        {/* Question text */}
        <View style={bb.questionBox}>
          <Text style={bb.questionText} selectable={true}>{q.question}</Text>
        </View>

        {/* Divider */}
        <View style={bb.contentDivider} />

        {/* Choices label */}
        <Text style={bb.choicesLabel}>Choose one answer</Text>

        {/* Choices */}
        {q.choices.map((c, i) => {
          const letter = ["A", "B", "C", "D"][i];
          const isSelected = selectedAnswer === i;
          const struck = isStruck(i);

          return (
            <TouchableOpacity
              key={i}
              style={[
                bb.choiceRow,
                isSelected && bb.choiceRowSelected,
                struck && bb.choiceRowStruck,
              ]}
              onPress={() => {
                if (eliminatorOn) { toggleStrike(i); return; }
                selectAnswer(i);
              }}
              onLongPress={() => toggleStrike(i)}
              activeOpacity={0.7}
            >
              {/* Bubble */}
              <View style={[
                bb.choiceBubble,
                isSelected && bb.choiceBubbleSelected,
                struck && bb.choiceBubbleStruck,
              ]}>
                <Text style={[
                  bb.choiceLetter,
                  isSelected && bb.choiceLetterSelected,
                  struck && bb.choiceLetterStruck,
                ]}>
                  {letter}
                </Text>
              </View>

              {/* Text */}
              <Text style={[
                bb.choiceText,
                isSelected && bb.choiceTextSelected,
                struck && bb.choiceTextStruck,
              ]}>
                {c}
              </Text>

              {/* Strike button when eliminator is on */}
              {eliminatorOn && (
                <TouchableOpacity
                  style={bb.strikeBtn}
                  onPress={() => toggleStrike(i)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={[bb.strikeBtnText, struck && { color: "#dc2626" }]}>
                    {struck ? "↺" : "╱"}
                  </Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          );
        })}

        {/* Eliminator hint */}
        {eliminatorOn && (
          <View style={bb.eliminatorHint}>
            <Text style={bb.eliminatorHintText}>
              💡 Tap any answer to cross it out. Long-press also works. Tap again to restore.
            </Text>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ── BOTTOM NAV ── */}
      <View style={bb.bottomNav}>
        <TouchableOpacity
          style={[bb.navBtn, bb.navBtnOutline, currentQ === 0 && { opacity: 0.35 }]}
          onPress={() => {
            if (questionStartTime !== null) {
              const spent = Math.round((Date.now() - questionStartTime) / 1000);
              setQuestionTimes(prev => ({ ...prev, [currentQ]: (prev[currentQ] || 0) + spent }));
            }
            setCurrentQ(p => Math.max(0, p - 1));
            setQuestionStartTime(Date.now());
          }}
          disabled={currentQ === 0}
        >
          <Text style={bb.navBtnOutlineText}>← Back</Text>
        </TouchableOpacity>

        {/* Navigator pill */}
        <TouchableOpacity style={bb.navPill} onPress={() => setShowNavigator(true)}>
          <Text style={bb.navPillText}>
            {currentQ + 1} / {quizQuestions.length}
          </Text>
          <Text style={bb.navPillCaret}>▾</Text>
        </TouchableOpacity>

        {currentQ < quizQuestions.length - 1 ? (
          <TouchableOpacity style={[bb.navBtn, bb.navBtnPrimary]} onPress={() => {
            if (questionStartTime !== null) {
              const spent = Math.round((Date.now() - questionStartTime) / 1000);
              setQuestionTimes(prev => ({ ...prev, [currentQ]: (prev[currentQ] || 0) + spent }));
            }
            setCurrentQ(p => p + 1);
            setQuestionStartTime(Date.now());
          }}>
            <Text style={bb.navBtnPrimaryText}>Next →</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[bb.navBtn, bb.navBtnFinish]} onPress={() => {
            if (questionStartTime !== null) {
              const spent = Math.round((Date.now() - questionStartTime) / 1000);
              setQuestionTimes(prev => ({ ...prev, [currentQ]: (prev[currentQ] || 0) + spent }));
            }
            finishQuiz();
          }}>
            <Text style={bb.navBtnPrimaryText}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ── QUESTION NAVIGATOR MODAL ── */}
      <Modal visible={showNavigator} transparent animationType="slide">
        <View style={bb.modalOverlay}>
          <View style={bb.modalBox}>
            {/* Handle */}
            <View style={bb.modalHandle} />
            <Text style={bb.modalTitle}>Question Navigator</Text>

            <ScrollView style={{ maxHeight: 300 }} contentContainerStyle={bb.navigatorGrid}>
              {quizQuestions.map((_, i) => {
                const answered = userAnswers[i] !== undefined;
                const isCurrent = i === currentQ;
                const flagged = markedForReview[i];
                return (
                  <TouchableOpacity
                    key={i}
                    style={[
                      bb.navCircle,
                      answered && bb.navCircleAnswered,
                      isCurrent && bb.navCircleCurrent,
                      flagged && bb.navCircleFlagged,
                    ]}
                    onPress={() => goToQuestion(i)}
                  >
                    <Text style={[
                      bb.navCircleText,
                      (answered || isCurrent) && { color: "#fff" },
                      flagged && !answered && { color: "#1d4ed8" },
                    ]}>
                      {i + 1}
                    </Text>
                    {flagged && (
                      <View style={bb.navFlagDot} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Legend */}
            <View style={bb.navigatorLegend}>
              {[
                { bg: "#1e3a5f", border: "#1e3a5f", label: "Current" },
                { bg: "#1d4ed8", border: "#1d4ed8", label: "Answered" },
                { bg: "#fff", border: "#94a3b8", label: "Unanswered" },
                { bg: "#eff6ff", border: "#1d4ed8", label: "Flagged" },
              ].map(({ bg, border, label }) => (
                <View key={label} style={bb.legendItem}>
                  <View style={[bb.legendDot, { backgroundColor: bg, borderColor: border, borderWidth: 1.5 }]} />
                  <Text style={bb.legendText}>{label}</Text>
                </View>
              ))}
            </View>

            {/* Summary */}
            <View style={bb.navigatorSummary}>
              <Text style={bb.navigatorSummaryText}>
                {answeredCount} of {quizQuestions.length} answered
                {Object.keys(markedForReview).filter(k => markedForReview[k]).length > 0
                  ? `  ·  ${Object.keys(markedForReview).filter(k => markedForReview[k]).length} flagged`
                  : ""}
              </Text>
            </View>

            <View style={bb.modalBtns}>
              <TouchableOpacity style={bb.modalClose} onPress={() => setShowNavigator(false)}>
                <Text style={bb.modalCloseText}>Close</Text>
              </TouchableOpacity>
              {currentQ < quizQuestions.length - 1 && (
                <TouchableOpacity
                  style={[bb.modalClose, { backgroundColor: "#16a34a", flex: 1 }]}
                  onPress={() => { setShowNavigator(false); finishQuiz(); }}
                >
                  <Text style={bb.modalCloseText}>Submit All</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
      {/* ── DESMOS FLOATING PANEL ── */}
{desmosVisible && (
  <Animated.View style={{
    position: "absolute",
    left: desmosPos.x,
    top: desmosPos.y,
    width: SCREEN_WIDTH * 0.94,
    height: 460,
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 12,
    zIndex: 9999,
  }}>
    {/* Drag handle */}
    <View
      {...desmosPanResponder.panHandlers}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 14,
        paddingVertical: 10,
        backgroundColor: "#1e3a5f",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>⠿  📐 Desmos Graphing Calculator</Text>
      <TouchableOpacity
        onPress={() => setDesmosVisible(false)}
        style={{ backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4 }}
      >
        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 13 }}>✕</Text>
      </TouchableOpacity>
    </View>

    {Platform.OS === "web" ? (
      <iframe
        src="https://www.desmos.com/calculator"
        style={{ flex: 1, border: "none", width: "100%", height: "100%" }}
        title="Desmos"
      />
    ) : (
      <WebView
        source={{ uri: "https://www.desmos.com/calculator" }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={["*"]}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
            <Text style={{ color: "#1e3a5f", fontSize: 14 }}>Loading Desmos...</Text>
          </View>
        )}
      />
    )}
  </Animated.View>
)}

    </SafeAreaView>
  );
}           {/* closes the quiz if-block */}
  /* ---------------- RESULTS ---------------- */

  if (view === "results") {
    return (
  <View style={{ flex: 1 }}>
    <ScrollView style={styles.container}>
        <Text style={styles.title}>Review Answers</Text>
        <Text style={styles.subtitle}>
          {score}/{quizQuestions.length} · {Math.round((score / quizQuestions.length) * 100)}% · ⏱{" "}
          {formatTime(elapsed)}
        </Text>

        {quizQuestions.map((q, i) => {
          const userAns = userAnswers[i] ?? -1;
          return (
            <View key={i} style={styles.reviewCard}>
              <Text style={styles.reviewNum}>
                Question {i + 1} — {q.domain} · {q.questionType}
              </Text>
              <Text style={styles.reviewQuestion}>{q.question}</Text>

              {q.choices.map((c, ci) => (
                <View
                  key={ci}
                  style={[
                    styles.reviewChoice,
                    ci === q.answer && styles.reviewCorrect,
                    ci === userAns && ci !== q.answer && styles.reviewWrong,
                  ]}
                >
                  <Text style={styles.reviewChoiceText}>
                    {["A", "B", "C", "D"][ci]}. {c}
                    {ci === q.answer ? "  ✅" : ""}
                    {ci === userAns && ci !== q.answer ? "  ❌" : ""}
                  </Text>
                </View>
              ))}

              <Text style={styles.explanationText}>💡 {q.explanation}</Text>
            </View>
          );
        })}

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setQuizStarted(false);
            setView("practice");
          }}
        >
          <Text style={styles.btnText}>Practice Again</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#2a2f55", marginBottom: 40 }]}
          onPress={() => setView("home")}
        >
          <Text style={styles.btnText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    <CasperBot onPress={() => setStudyBotVisible(true)} />
  </View>
    );
  }

  /* ---------------- SCORE HISTORY ---------------- */

  if (view === "history") {
    return (
  <View style={{ flex: 1 }}>
    <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => setView("home")}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Score History</Text>

        {historyLoading ? (
          <Text style={styles.subtitle}>Loading...</Text>
        ) : scoreHistory.length === 0 ? (
          <Text style={styles.subtitle}>No scores yet. Take a quiz!</Text>
        ) : (
          scoreHistory.map((entry) => {
            const date = entry.createdAt?.toDate
              ? entry.createdAt.toDate().toLocaleDateString()
              : "—";

            const sourceLabel =
              entry.questionSource === "used"
                ? "Used"
                : entry.questionSource === "new"
                ? "New"
                : "All";

            return (
              <View key={entry.id} style={styles.historyCard}>
                <View style={styles.historyTop}>
                  <Text style={styles.historyScore}>
                    {entry.score}/{entry.total}
                  </Text>
                  <Text
                    style={[
                      styles.historyPercent,
                      entry.percent >= 80
                        ? { color: "#4caf50" }
                        : entry.percent >= 60
                        ? { color: "#f5c518" }
                        : { color: "#ff4d4d" },
                    ]}
                  >
                    {entry.percent}%
                  </Text>
                </View>

                <Text style={styles.historyMeta}>
                  {entry.section} · {entry.domains?.join(", ")}
                </Text>
                <Text style={styles.historyMeta}>
                  {entry.difficulties?.join(", ")} · {sourceLabel}
                </Text>
                <Text style={styles.historyMeta}>
                  {date}
                  {entry.timeSeconds ? ` · ⏱ ${formatTime(entry.timeSeconds)}` : ""}
                </Text>
              </View>
            );
          })
        )}
      </ScrollView>
    <CasperBot onPress={() => setStudyBotVisible(true)} />
  </View>
    );
  }

  if (view === "growth") {
  const allDomains = [...MATH, ...READING_WRITING];

  // ── Score trend data (last 10 quizzes) ──
  const trendData = [...scoreHistory].reverse().slice(-10);
  const maxPct = 100;
  const chartWidth = SCREEN_WIDTH - 80;
  const chartHeight = 120;

  // ── Domain bar chart data ──
  const domainStats = allDomains.map(d => ({
    name: d,
    ...getGrowthStats(d),
  }));

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <TouchableOpacity style={styles.backButton} onPress={() => { setView("home"); setSelectedGrowthDomain(null); }}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Growth Analysis</Text>

        {historyLoading ? (
          <Text style={styles.subtitle}>Loading...</Text>
        ) : scoreHistory.length === 0 ? (
          <View style={styles.statCard}>
            <Text style={{ color: "#9aa4c7", textAlign: "center", marginTop: 8 }}>No quiz history yet. Complete a practice session to see your growth!</Text>
          </View>
        ) : !selectedGrowthDomain ? (
          <>
            {/* ── SCORE TREND CHART ── */}
            {trendData.length >= 2 && (
              <View style={{ backgroundColor: "#151c36", borderRadius: 16, padding: 16, marginBottom: 16 }}>
                <Text style={{ color: "#fff", fontWeight: "800", fontSize: 15, marginBottom: 4 }}>📈 Score Trend</Text>
                <Text style={{ color: "#9aa4c7", fontSize: 12, marginBottom: 16 }}>Last {trendData.length} quizzes</Text>

                {/* Y-axis labels + chart */}
                <View style={{ flexDirection: "row" }}>
                  {/* Y labels */}
                  <View style={{ width: 36, justifyContent: "space-between", height: chartHeight, alignItems: "flex-end", paddingRight: 6 }}>
                    {[100, 75, 50, 25, 0].map(v => (
                      <Text key={v} style={{ color: "#475569", fontSize: 10 }}>{v}%</Text>
                    ))}
                  </View>

                  {/* Chart area */}
                  <View style={{ flex: 1, height: chartHeight, position: "relative" }}>
                    {/* Grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((frac, i) => (
                      <View key={i} style={{ position: "absolute", top: frac * chartHeight, left: 0, right: 0, height: 1, backgroundColor: "#1f2a52" }} />
                    ))}

                    {/* Bars */}
                    <View style={{ flexDirection: "row", alignItems: "flex-end", height: chartHeight, gap: 4, paddingHorizontal: 4 }}>
                      {trendData.map((entry, i) => {
                        const pct = entry.percent || 0;
                        const barH = (pct / 100) * chartHeight;
                        const color = pct >= 80 ? "#4caf50" : pct >= 60 ? "#f5c518" : "#ff4d4d";
                        return (
                          <View key={i} style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", height: chartHeight }}>
                            <View style={{ width: "100%", height: barH, backgroundColor: color, borderRadius: 4, opacity: 0.9 }} />
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </View>

                {/* X labels */}
                <View style={{ flexDirection: "row", marginLeft: 42, marginTop: 6, gap: 4, paddingHorizontal: 4 }}>
                  {trendData.map((entry, i) => {
                    const date = entry.createdAt?.toDate ? entry.createdAt.toDate() : null;
                    const label = date ? `${date.getMonth() + 1}/${date.getDate()}` : `#${i + 1}`;
                    return (
                      <Text key={i} style={{ flex: 1, color: "#475569", fontSize: 9, textAlign: "center" }} numberOfLines={1}>{label}</Text>
                    );
                  })}
                </View>

                {/* Legend */}
                <View style={{ flexDirection: "row", gap: 16, marginTop: 12, justifyContent: "center" }}>
                  {[["#4caf50", "80%+"], ["#f5c518", "60–79%"], ["#ff4d4d", "<60%"]].map(([color, label]) => (
                    <View key={label} style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                      <View style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: color }} />
                      <Text style={{ color: "#9aa4c7", fontSize: 11 }}>{label}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* ── AVG SCORE STAT CARDS ── */}
            {trendData.length > 0 && (() => {
              const avg = Math.round(trendData.reduce((s, e) => s + (e.percent || 0), 0) / trendData.length);
              const best = Math.max(...trendData.map(e => e.percent || 0));
              const totalQ = trendData.reduce((s, e) => s + (e.total || 0), 0);
              return (
                <View style={{ flexDirection: "row", gap: 10, marginBottom: 16 }}>
                  {[
                    { label: "Avg Score", value: `${avg}%`, color: avg >= 80 ? "#4caf50" : avg >= 60 ? "#f5c518" : "#ff4d4d" },
                    { label: "Best Score", value: `${best}%`, color: "#f5c518" },
                    { label: "Qs Answered", value: totalQ, color: "#60a5fa" },
                  ].map(({ label, value, color }) => (
                    <View key={label} style={{ flex: 1, backgroundColor: "#151c36", borderRadius: 14, padding: 14, alignItems: "center", borderWidth: 1, borderColor: "#1f2a52" }}>
                      <Text style={{ color, fontSize: 22, fontWeight: "800" }}>{value}</Text>
                      <Text style={{ color: "#9aa4c7", fontSize: 11, marginTop: 4, textAlign: "center" }}>{label}</Text>
                    </View>
                  ))}
                </View>
              );
            })()}

            {/* ── DOMAIN ACCURACY BAR CHART ── */}
            <View style={{ backgroundColor: "#151c36", borderRadius: 16, padding: 16, marginBottom: 16 }}>
              <Text style={{ color: "#fff", fontWeight: "800", fontSize: 15, marginBottom: 4 }}>🎯 Accuracy by Domain</Text>
              <Text style={{ color: "#9aa4c7", fontSize: 12, marginBottom: 16 }}>Tap a domain for details</Text>
              {domainStats.map((d, i) => {
                const color = d.accuracy >= 80 ? "#4caf50" : d.accuracy >= 60 ? "#f5c518" : d.attempted === 0 ? "#2a3a5c" : "#ff4d4d";
                const isMath = MATH.includes(d.name);
                return (
                  <TouchableOpacity key={d.name} onPress={() => setSelectedGrowthDomain(d.name)} style={{ marginBottom: 12 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                      <Text style={{ color: isMath ? "#60a5fa" : "#4caf50", fontSize: 12, flex: 1 }} numberOfLines={1}>{d.name}</Text>
                      <Text style={{ color, fontWeight: "700", fontSize: 12 }}>
                        {d.attempted === 0 ? "—" : `${d.accuracy}% (${d.correct}/${d.attempted})`}
                      </Text>
                    </View>
                    <View style={{ height: 8, backgroundColor: "#0b1020", borderRadius: 4, overflow: "hidden" }}>
                      <View style={{
                        height: 8,
                        width: d.attempted === 0 ? "0%" : `${d.accuracy}%`,
                        backgroundColor: color,
                        borderRadius: 4,
                      }} />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* ── TIME PER QUIZ ── */}
            {trendData.some(e => e.timeSeconds) && (() => {
              const validData = trendData.filter(e => e.timeSeconds > 0);
              if (validData.length === 0) return null;
              const chartH = 130;
              const allSecs = validData.map(e => e.timeSeconds);
              const maxSecs = Math.max(...allSecs);
              const minSecs = Math.min(...allSecs);
              const avgSecs = Math.round(allSecs.reduce((a, b) => a + b, 0) / allSecs.length);
              const axisMax = Math.ceil(maxSecs / 30) * 30;
              const axisHalf = Math.round(axisMax / 2);
              const fmt = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
              return (
                <View style={{ backgroundColor: "#151c36", borderRadius: 16, padding: 16, marginBottom: 16 }}>
                  <Text style={{ color: "#fff", fontWeight: "800", fontSize: 15, marginBottom: 4 }}>⏱ Time per Quiz</Text>
                  <Text style={{ color: "#9aa4c7", fontSize: 12, marginBottom: 14 }}>How long each session took</Text>

                  <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                    {/* Y-axis labels — pinned to top, middle, bottom of chart */}
                    <View style={{ width: 40, height: chartH, justifyContent: "space-between", alignItems: "flex-end", paddingRight: 6 }}>
                      <Text style={{ color: "#9aa4c7", fontSize: 10 }}>{fmt(axisMax)}</Text>
                      <Text style={{ color: "#9aa4c7", fontSize: 10 }}>{fmt(axisHalf)}</Text>
                      <Text style={{ color: "#9aa4c7", fontSize: 10 }}>0:00</Text>
                    </View>

                    {/* Chart + X labels */}
                    <View style={{ flex: 1 }}>
                      {/* Chart body */}
                      <View style={{ height: chartH, position: "relative" }}>
                        {/* Grid lines at top, middle, bottom */}
                        <View style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, backgroundColor: "#2a3a5c" }} />
                        <View style={{ position: "absolute", top: chartH / 2, left: 0, right: 0, height: 1, backgroundColor: "#1f2a52" }} />
                        <View style={{ position: "absolute", top: chartH - 1, left: 0, right: 0, height: 1, backgroundColor: "#2a3a5c" }} />

                        {/* Bars */}
                        <View style={{ flexDirection: "row", alignItems: "flex-end", height: chartH, paddingHorizontal: 2, gap: 4 }}>
                          {trendData.map((entry, i) => {
                            const secs = entry.timeSeconds || 0;
                            const barH = axisMax > 0 ? Math.max(3, Math.round((secs / axisMax) * (chartH - 2))) : 3;
                            const isFast = secs > 0 && secs < avgSecs * 0.8;
                            const isSlow = secs > avgSecs * 1.2;
                            const barColor = secs === 0 ? "#2a3a5c" : isFast ? "#4caf50" : isSlow ? "#f5c518" : "#1d4ed8";
                            return (
                              <View key={i} style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", height: chartH }}>
                                <Text style={{ color: "#64748b", fontSize: 8, marginBottom: 2, textAlign: "center" }}>
                                  {secs > 0 ? fmt(secs) : "—"}
                                </Text>
                                <View style={{ width: "80%", height: barH, backgroundColor: barColor, borderRadius: 3 }} />
                              </View>
                            );
                          })}
                        </View>
                      </View>

                      {/* X-axis date labels */}
                      <View style={{ flexDirection: "row", paddingHorizontal: 2, gap: 4, marginTop: 5 }}>
                        {trendData.map((entry, i) => {
                          const date = entry.createdAt?.toDate ? entry.createdAt.toDate() : null;
                          const label = date ? `${date.getMonth() + 1}/${date.getDate()}` : `#${i + 1}`;
                          return (
                            <Text key={i} style={{ flex: 1, color: "#475569", fontSize: 8, textAlign: "center" }} numberOfLines={1}>
                              {label}
                            </Text>
                          );
                        })}
                      </View>
                    </View>
                  </View>

                  {/* Stats row */}
                  <View style={{ flexDirection: "row", gap: 8, marginTop: 16 }}>
                    {[
                      { label: "Average", value: fmt(avgSecs), color: "#1d4ed8" },
                      { label: "Fastest", value: fmt(minSecs), color: "#4caf50" },
                      { label: "Slowest", value: fmt(maxSecs), color: "#f5c518" },
                    ].map(({ label, value, color }) => (
                      <View key={label} style={{ flex: 1, backgroundColor: "#0b1020", borderRadius: 10, padding: 10, alignItems: "center", borderWidth: 1, borderColor: "#1f2a52" }}>
                        <Text style={{ color, fontWeight: "800", fontSize: 13 }}>{value}</Text>
                        <Text style={{ color: "#475569", fontSize: 10, marginTop: 3 }}>{label}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Legend */}
                  <View style={{ flexDirection: "row", gap: 12, marginTop: 12, justifyContent: "center" }}>
                    {[["#4caf50", "Fast"], ["#1d4ed8", "Average"], ["#f5c518", "Slow"]].map(([color, label]) => (
                      <View key={label} style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                        <View style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: color }} />
                        <Text style={{ color: "#9aa4c7", fontSize: 11 }}>{label}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              );
            })()}
          </>
        ) : (
          /* ── DOMAIN DETAIL VIEW ── */
          <>
            <TouchableOpacity style={styles.backButton} onPress={() => setSelectedGrowthDomain(null)}>
              <Text style={styles.backText}>← All Domains</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{selectedGrowthDomain}</Text>

            {(() => {
              const stats = getGrowthStats(selectedGrowthDomain);

              // Per-quiz accuracy for this domain
              const domainTrend = [...scoreHistory].reverse().map(entry => {
                if (!entry.questions) return null;
                const qs = entry.questions.filter(q => q.domain === selectedGrowthDomain);
                if (qs.length === 0) return null;
                const correct = qs.filter(q => q.userAnswer === q.correctAnswer).length;
                return { pct: Math.round((correct / qs.length) * 100), total: qs.length, date: entry.createdAt };
              }).filter(Boolean);

              return (
                <>
                  {/* Stats row */}
                  <View style={{ flexDirection: "row", gap: 10, marginBottom: 16 }}>
                    {[
                      { label: "Attempted", value: stats.attempted, color: "#60a5fa" },
                      { label: "Correct", value: stats.correct, color: "#4caf50" },
                      { label: "Accuracy", value: stats.attempted > 0 ? `${stats.accuracy}%` : "—", color: stats.accuracy >= 80 ? "#4caf50" : stats.accuracy >= 60 ? "#f5c518" : "#ff4d4d" },
                    ].map(({ label, value, color }) => (
                      <View key={label} style={{ flex: 1, backgroundColor: "#151c36", borderRadius: 14, padding: 14, alignItems: "center", borderWidth: 1, borderColor: "#1f2a52" }}>
                        <Text style={{ color, fontSize: 22, fontWeight: "800" }}>{value}</Text>
                        <Text style={{ color: "#9aa4c7", fontSize: 11, marginTop: 4 }}>{label}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Domain trend chart */}
                  {domainTrend.length >= 2 && (
                    <View style={{ backgroundColor: "#151c36", borderRadius: 16, padding: 16, marginBottom: 16 }}>
                      <Text style={{ color: "#fff", fontWeight: "800", fontSize: 15, marginBottom: 12 }}>Accuracy Over Time</Text>
                      <View style={{ flexDirection: "row", alignItems: "flex-end", height: 100, gap: 6, paddingHorizontal: 4 }}>
                        {domainTrend.map((point, i) => {
                          const barH = (point.pct / 100) * 100;
                          const color = point.pct >= 80 ? "#4caf50" : point.pct >= 60 ? "#f5c518" : "#ff4d4d";
                          return (
                            <View key={i} style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", height: 100 }}>
                              <Text style={{ color: "#9aa4c7", fontSize: 9, marginBottom: 2 }}>{point.pct}%</Text>
                              <View style={{ width: "100%", height: barH, backgroundColor: color, borderRadius: 4 }} />
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  )}

                  {/* Accuracy gauge */}
                  {stats.attempted > 0 && (
                    <View style={{ backgroundColor: "#151c36", borderRadius: 16, padding: 16, marginBottom: 16 }}>
                      <Text style={{ color: "#fff", fontWeight: "800", fontSize: 15, marginBottom: 12 }}>Overall Accuracy</Text>
                      <View style={{ height: 16, backgroundColor: "#0b1020", borderRadius: 8, overflow: "hidden" }}>
                        <View style={{
                          height: 16,
                          width: `${stats.accuracy}%`,
                          backgroundColor: stats.accuracy >= 80 ? "#4caf50" : stats.accuracy >= 60 ? "#f5c518" : "#ff4d4d",
                          borderRadius: 8,
                        }} />
                      </View>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
                        <Text style={{ color: "#475569", fontSize: 11 }}>0%</Text>
                        <Text style={{ color: stats.accuracy >= 80 ? "#4caf50" : stats.accuracy >= 60 ? "#f5c518" : "#ff4d4d", fontWeight: "700" }}>{stats.accuracy}%</Text>
                        <Text style={{ color: "#475569", fontSize: 11 }}>100%</Text>
                      </View>
                    </View>
                  )}
                </>
              );
            })()}
          </>
        )}
      </ScrollView>
      <CasperBot onPress={() => setStudyBotVisible(true)} />
    </View>
  );
}

  /* ---------------- TIME ANALYTICS VIEW ---------------- */
  if (view === "timeAnalytics") {
    // Collect all questions with timeSpent from history
    const allTimedQuestions = [];
    scoreHistory.forEach(entry => {
      if (!entry.questions) return;
      entry.questions.forEach(q => {
        if (q.timeSpent && q.timeSpent > 0) {
          allTimedQuestions.push(q);
        }
      });
    });

    // Group by domain + difficulty
    const groups = {};
    allTimedQuestions.forEach(q => {
      const key = `${q.domain}||${q.difficulty}`;
      if (!groups[key]) groups[key] = { domain: q.domain, difficulty: q.difficulty, times: [], correct: 0, total: 0 };
      groups[key].times.push(q.timeSpent);
      groups[key].total++;
      if (q.userAnswer === q.correctAnswer) groups[key].correct++;
    });

    const groupList = Object.values(groups).map(g => ({
      ...g,
      avg: Math.round(g.times.reduce((a, b) => a + b, 0) / g.times.length),
      min: Math.min(...g.times),
      max: Math.max(...g.times),
      accuracy: Math.round((g.correct / g.total) * 100),
    })).sort((a, b) => b.avg - a.avg);

    // Overall stats
    const allTimes = allTimedQuestions.map(q => q.timeSpent);
    const overallAvg = allTimes.length > 0 ? Math.round(allTimes.reduce((a, b) => a + b, 0) / allTimes.length) : 0;
    const slowest = groupList[0];
    const fastest = [...groupList].sort((a, b) => a.avg - b.avg)[0];

    const fmt = (s) => s >= 60 ? `${Math.floor(s / 60)}m ${s % 60}s` : `${s}s`;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={[styles.container, { backgroundColor: isLight ? "#f8fafc" : "#0b1020" }]} contentContainerStyle={{ paddingBottom: 40 }}>
          <TouchableOpacity style={styles.backButton} onPress={() => setView("home")}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>⏱ Time Analytics</Text>
          <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 14, marginBottom: 20, lineHeight: 22 }}>
            How long you spend per question by domain and difficulty. Based on {allTimedQuestions.length} timed questions.
          </Text>

          {allTimedQuestions.length === 0 ? (
            <View style={{ backgroundColor: isLight ? "#fff" : "#0f1829", borderRadius: 16, padding: 28, alignItems: "center", borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#1a2540" }}>
              <Text style={{ fontSize: 40, marginBottom: 12 }}>⏱</Text>
              <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700", fontSize: 16, marginBottom: 6 }}>No timing data yet</Text>
              <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 13, textAlign: "center" }}>Complete quizzes after this update to start collecting per-question timing data.</Text>
            </View>
          ) : (
            <>
              {/* Summary cards */}
              <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
                {[
                  { label: "Avg per question", value: fmt(overallAvg), color: isLight ? "#1d4ed8" : "#60a5fa" },
                  { label: "Slowest domain", value: slowest ? slowest.domain.split(" ")[0] : "—", color: "#dc2626" },
                  { label: "Fastest domain", value: fastest ? fastest.domain.split(" ")[0] : "—", color: "#16a34a" },
                ].map(({ label, value, color }) => (
                  <View key={label} style={{ flex: 1, backgroundColor: isLight ? "#fff" : "#0f1829", borderRadius: 14, padding: 12, alignItems: "center", borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#1a2540" }}>
                    <Text style={{ color, fontSize: 15, fontWeight: "800", textAlign: "center" }}>{value}</Text>
                    <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 10, marginTop: 4, textAlign: "center" }}>{label}</Text>
                  </View>
                ))}
              </View>

              {/* SAT target times */}
              <View style={{ backgroundColor: isLight ? "#eff6ff" : "#0c1624", borderRadius: 14, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: isLight ? "#bfdbfe" : "#1a3060" }}>
                <Text style={{ color: isLight ? "#1d4ed8" : "#60a5fa", fontWeight: "800", fontSize: 14, marginBottom: 8 }}>🎯 SAT Target Times</Text>
                <Text style={{ color: isLight ? "#1e40af" : "#93c5fd", fontSize: 13, lineHeight: 22 }}>
                  Reading & Writing: ~70 sec/question{"\n"}
                  Math: ~95 sec/question{"\n"}
                  If you're averaging over these, focus on pacing drills.
                </Text>
              </View>

              {/* Per domain/difficulty breakdown */}
              <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700", fontSize: 15, marginBottom: 14 }}>By Domain & Difficulty</Text>
              {groupList.map((g, i) => {
                const diffColor = g.difficulty === "Hard" ? "#dc2626" : g.difficulty === "Medium" ? "#d97706" : "#16a34a";
                const isMath = MATH.includes(g.domain);
                const satTarget = isMath ? 95 : 70;
                const isOverTarget = g.avg > satTarget;
                const barWidth = Math.min(100, (g.avg / (satTarget * 2)) * 100);
                return (
                  <View key={i} style={{ backgroundColor: isLight ? "#fff" : "#0f1829", borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#1a2540" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700", fontSize: 14 }} numberOfLines={1}>{g.domain}</Text>
                        <View style={{ flexDirection: "row", gap: 6, marginTop: 4 }}>
                          <View style={{ backgroundColor: diffColor + "22", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 }}>
                            <Text style={{ color: diffColor, fontWeight: "700", fontSize: 11 }}>{g.difficulty}</Text>
                          </View>
                          <View style={{ backgroundColor: isLight ? "#f1f5f9" : "#1a2540", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 }}>
                            <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 11 }}>{g.total} questions</Text>
                          </View>
                          <View style={{ backgroundColor: isLight ? "#f0fdf4" : "#0d2a18", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 }}>
                            <Text style={{ color: "#16a34a", fontSize: 11, fontWeight: "600" }}>{g.accuracy}% acc</Text>
                          </View>
                        </View>
                      </View>
                      <View style={{ alignItems: "flex-end" }}>
                        <Text style={{ color: isOverTarget ? "#dc2626" : "#16a34a", fontWeight: "900", fontSize: 22 }}>{fmt(g.avg)}</Text>
                        <Text style={{ color: isLight ? "#94a3b8" : "#475569", fontSize: 10, marginTop: 2 }}>avg / question</Text>
                      </View>
                    </View>

                    {/* Time bar vs SAT target */}
                    <View style={{ marginBottom: 6 }}>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                        <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 11 }}>vs SAT target ({satTarget}s)</Text>
                        <Text style={{ color: isOverTarget ? "#dc2626" : "#16a34a", fontSize: 11, fontWeight: "700" }}>
                          {isOverTarget ? `+${g.avg - satTarget}s over` : `${satTarget - g.avg}s under`}
                        </Text>
                      </View>
                      <View style={{ height: 8, backgroundColor: isLight ? "#e2e8f0" : "#1a2540", borderRadius: 4, overflow: "hidden" }}>
                        <View style={{ height: 8, width: `${barWidth}%`, backgroundColor: isOverTarget ? "#dc2626" : "#16a34a", borderRadius: 4 }} />
                      </View>
                      {/* Target marker */}
                      <View style={{ position: "relative", height: 0 }}>
                        <View style={{ position: "absolute", left: `${Math.min(100, (satTarget / (satTarget * 2)) * 100)}%`, top: -10, width: 2, height: 8, backgroundColor: "#1d4ed8" }} />
                      </View>
                    </View>

                    {/* Min / Max */}
                    <View style={{ flexDirection: "row", gap: 10, marginTop: 8 }}>
                      <Text style={{ color: isLight ? "#64748b" : "#475569", fontSize: 11 }}>⚡ Fastest: {fmt(g.min)}</Text>
                      <Text style={{ color: isLight ? "#64748b" : "#475569", fontSize: 11 }}>🐢 Slowest: {fmt(g.max)}</Text>
                    </View>
                  </View>
                );
              })}

              {/* Insight callout */}
              {slowest && fastest && slowest.domain !== fastest.domain && (
                <View style={{ backgroundColor: isLight ? "#fffbeb" : "#1a1400", borderRadius: 14, padding: 16, marginTop: 4, borderWidth: 1, borderColor: isLight ? "#fde68a" : "#2a2000" }}>
                  <Text style={{ color: isLight ? "#92400e" : "#f5c518", fontWeight: "800", fontSize: 14, marginBottom: 6 }}>💡 Pacing Insight</Text>
                  <Text style={{ color: isLight ? "#78350f" : "#fde68a", fontSize: 13, lineHeight: 22 }}>
                    You're spending {fmt(slowest.avg)} on average for {slowest.domain} ({slowest.difficulty}) but only {fmt(fastest.avg)} for {fastest.domain} ({fastest.difficulty}). Consider drilling {slowest.domain} under timed conditions to build speed.
                  </Text>
                </View>
              )}
            </>
          )}
        </ScrollView>
        <CasperBot onPress={() => setStudyBotVisible(true)} />
      </View>
    );
  }

  /* ---------------- HELP ---------------- */

  if (view === "help") {
    return (
  <View style={{ flex: 1 }}>
    <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => setView("home")}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>💬 Ask for Help</Text>
        <Text style={styles.subtitle}>
          Describe what you're stuck on and we'll email you back.
        </Text>

        {helpSent ? (
          <View style={styles.statCard}>
            <Text style={[styles.statTitle, { color: "#4caf50" }]}>✅ Message sent!</Text>
            <Text style={styles.statText}>We'll get back to you at {email} soon.</Text>
            <TouchableOpacity style={styles.button} onPress={() => setHelpSent(false)}>
              <Text style={styles.btnText}>Send Another</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TextInput
              style={[styles.input, { height: 120, textAlignVertical: "top" }]}
              placeholder="Describe your question..."
              placeholderTextColor="#555"
              value={helpMessage}
              onChangeText={setHelpMessage}
              multiline
            />

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#2a2f55" }]}
              onPress={pickImage}
            >
              <Text style={styles.btnText}>
                {helpImage ? "📎 Screenshot attached" : "📎 Attach Screenshot (optional)"}
              </Text>
            </TouchableOpacity>

            {helpImage && (
              <Image
                source={{ uri: helpImage.uri }}
                style={{ width: "100%", height: 200, borderRadius: 10, marginTop: 10 }}
                resizeMode="contain"
              />
            )}

            <TouchableOpacity
              style={[styles.button, (!helpMessage.trim() || helpSending) && { opacity: 0.5 }]}
              onPress={sendHelp}
              disabled={!helpMessage.trim() || helpSending}
            >
              <Text style={styles.btnText}>{helpSending ? "Sending..." : "Send Message"}</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    <CasperBot onPress={() => setStudyBotVisible(true)} />
  </View>
    );
  }

  /* ---------------- ADMIN ---------------- */

  if (view === "admin") {
    if (!isAdmin) {
      return (
  <View style={{ flex: 1 }}>
    <ScrollView style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => setView("home")}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Unauthorized</Text>
        </ScrollView>
    <CasperBot onPress={() => setStudyBotVisible(true)} />
  </View>
      );
    }

    if (selectedAdminQ) {
      return (
  <View style={{ flex: 1 }}>
    <ScrollView style={styles.container}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedAdminQ(null)}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Student Question</Text>

          <View style={styles.statCard}>
            <Text style={[styles.statTitle, { color: "#f5c518" }]}>
              {selectedAdminQ.userEmail}
            </Text>
            <Text style={[styles.statText, { marginTop: 10, lineHeight: 22 }]}>
              {selectedAdminQ.message}
            </Text>

            {selectedAdminQ.imageBase64 && (
              <Image
                source={{ uri: `data:image/jpeg;base64,${selectedAdminQ.imageBase64}` }}
                style={{ width: "100%", height: 250, borderRadius: 10, marginTop: 14 }}
                resizeMode="contain"
              />
            )}

            <Text style={[styles.statText, { marginTop: 10, color: "#555" }]}>
              {selectedAdminQ.createdAt?.toDate
                ? selectedAdminQ.createdAt.toDate().toLocaleString()
                : "—"}
            </Text>
          </View>
       </ScrollView>
    <CasperBot onPress={() => setStudyBotVisible(true)} />
  </View>
      );
    }

    return (
  <View style={{ flex: 1 }}>
    <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => setView("home")}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>🔐 Admin Dashboard</Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#2a2f55" }]}
          onPress={() => {
            loadClasses();
            setView("manageClasses");
          }}
        >
          <Text style={styles.btnText}>📅 Manage Classes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#5b21b6" }]}
          onPress={() => {
            loadTestimonials();
            setView("manageTestimonials");
          }}
        >
          <Text style={styles.btnText}>💬 Manage Testimonials</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#065f46" }]}
          onPress={() => {
            loadLessons();
            setView("manageLessons");
          }}
        >
          <Text style={styles.btnText}>🎓 Manage Lessons</Text>
        </TouchableOpacity>
        <TouchableOpacity
  style={[styles.button, { backgroundColor: "#0e4429" }]}
  onPress={() => { loadAdminFeedback(); setView("adminFeedback"); }}
>
  <Text style={styles.btnText}>📝 View Feedback</Text>
</TouchableOpacity>
<TouchableOpacity
  style={[styles.button, { backgroundColor: "#0f2a1a", marginBottom: 10 }]}
  onPress={loadGlobalStats}
>
  <Text style={styles.btnText}>🔄 Refresh Stats</Text>
</TouchableOpacity>

{/* Global Stats */}
<View style={{ flexDirection: "row", gap: 10, marginBottom: 16 }}>
  <View style={{ flex: 1, backgroundColor: "#151c36", borderRadius: 14, padding: 16, alignItems: "center" }}>
    <Text style={{ color: "#f5c518", fontSize: 30, fontWeight: "800" }}>{globalStats.totalUsers.toLocaleString()}</Text>
    <Text style={{ color: "#9aa4c7", fontSize: 12, marginTop: 4, textAlign: "center" }}>Total Users</Text>
  </View>
  <View style={{ flex: 1, backgroundColor: "#151c36", borderRadius: 14, padding: 16, alignItems: "center" }}>
    <Text style={{ color: "#4caf50", fontSize: 30, fontWeight: "800" }}>{globalStats.totalQuestionsAnswered.toLocaleString()}</Text>
    <Text style={{ color: "#9aa4c7", fontSize: 12, marginTop: 4, textAlign: "center" }}>Questions Answered</Text>
  </View>
</View>
        <Text style={[styles.subtitle, { marginTop: 20 }]}>Student Help Requests</Text>

        {adminLoading ? (
          <Text style={styles.subtitle}>Loading...</Text>
        ) : adminQuestions.length === 0 ? (
          <Text style={styles.subtitle}>No help requests yet.</Text>
        ) : (
          adminQuestions.map((q) => {
            const date = q.createdAt?.toDate ? q.createdAt.toDate().toLocaleDateString() : "—";
            return (
              <TouchableOpacity
                key={q.id}
                style={styles.historyCard}
                onPress={() => setSelectedAdminQ(q)}
              >
                <View style={styles.historyTop}>
                  <Text style={styles.statTitle}>{q.userEmail}</Text>
                  {q.hasImage && <Text style={{ color: "#f5c518" }}>📎</Text>}
                </View>
                <Text style={styles.statText} numberOfLines={2}>
                  {q.message}
                </Text>
                <Text style={[styles.historyMeta, { marginTop: 6 }]}>{date}</Text>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    <CasperBot onPress={() => setStudyBotVisible(true)} />
  </View>
    );
  }

  /* ---------------- MANAGE CLASSES ---------------- */

  if (view === "manageClasses") {
    return (
  <View style={{ flex: 1 }}>
    <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => setView("admin")}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Manage Classes</Text>

        <Text style={[styles.subtitle, { marginTop: 10 }]}>Add New Class</Text>
        <TextInput
          style={styles.input}
          value={newClassTitle}
          onChangeText={setNewClassTitle}
          placeholder="Title"
          placeholderTextColor="#555"
        />
        <TextInput
          style={styles.input}
          value={newClassDesc}
          onChangeText={setNewClassDesc}
          placeholder="Description (optional)"
          placeholderTextColor="#555"
        />
        <TextInput
          style={styles.input}
          value={newClassDateInput}
          onChangeText={setNewClassDateInput}
          placeholder="Date (YYYY-MM-DDTHH:MM)"
          placeholderTextColor="#555"
        />
        <TextInput
          style={styles.input}
          value={newClassDuration}
          onChangeText={setNewClassDuration}
          placeholder="Duration (hours)"
          keyboardType="numeric"
          placeholderTextColor="#555"
        />

        <Text style={[styles.subtitle, { marginTop: 6 }]}>Type</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.box, newClassType === "group" && styles.activeBox]}
            onPress={() => setNewClassType("group")}
          >
            <Text style={styles.boxText}>Group (Free)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.box, newClassType === "individual" && styles.activeBox]}
            onPress={() => setNewClassType("individual")}
          >
            <Text style={styles.boxText}>Individual (Paid)</Text>
          </TouchableOpacity>
        </View>

        {newClassType === "individual" && (
          <TextInput
            style={styles.input}
            value={newClassPrice}
            onChangeText={setNewClassPrice}
            placeholder="Price ($)"
            keyboardType="numeric"
            placeholderTextColor="#555"
          />
        )}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#f5c518" }]}
          onPress={addClass}
        >
          <Text style={[styles.btnText, { color: "#0b1020" }]}>+ Add Class</Text>
        </TouchableOpacity>

        <Text style={[styles.subtitle, { marginTop: 20 }]}>Existing Classes</Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#2a2f55" }]}
          onPress={loadClasses}
        >
          <Text style={styles.btnText}>Refresh</Text>
        </TouchableOpacity>

        {classesLoading ? (
          <Text style={styles.subtitle}>Loading...</Text>
        ) : classesList.length === 0 ? (
          <Text style={styles.subtitle}>No classes yet.</Text>
        ) : (
          classesList.map((cls) => (
            <View key={cls.id} style={styles.historyCard}>
              <View style={styles.historyTop}>
                <Text style={styles.historyScore}>{cls.title}</Text>
                <Text
                  style={{
                    color: cls.type === "group" ? "#4caf50" : "#f5c518",
                    fontWeight: "700",
                  }}
                >
                  {cls.type === "group" ? "FREE" : `$${cls.price}`}
                </Text>
              </View>

              <Text style={styles.historyMeta}>
                {cls.date ? new Date(cls.date).toLocaleString() : "—"} · {cls.durationHours || 1}h
              </Text>

              {cls.isBooked && (
                <Text style={{ color: "#ff4d4d", fontSize: 12, marginTop: 4 }}>● Booked</Text>
              )}

              {cls.description ? <Text style={styles.statText}>{cls.description}</Text> : null}

              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#7f1d1d", marginTop: 8 }]}
                onPress={() => removeClass(cls.id)}
              >
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
       </ScrollView>
    <CasperBot onPress={() => setStudyBotVisible(true)} />
  </View>
    );
  }

  /* ---------------- MANAGE TESTIMONIALS ---------------- */

  if (view === "manageTestimonials") {
    return (
  <View style={{ flex: 1 }}>
    <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => setView("admin")}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Manage Testimonials</Text>

        <Text style={[styles.subtitle, { marginTop: 10 }]}>Add New Testimonial</Text>

        <TextInput
          style={styles.input}
          value={newTestimonialName}
          onChangeText={setNewTestimonialName}
          placeholder="Student Name"
          placeholderTextColor="#555"
        />

        <TextInput
          style={styles.input}
          value={newTestimonialScore}
          onChangeText={setNewTestimonialScore}
          placeholder="Score / Result (optional)"
          placeholderTextColor="#555"
        />

        <TextInput
          style={[styles.input, { height: 120, textAlignVertical: "top" }]}
          value={newTestimonialText}
          onChangeText={setNewTestimonialText}
          placeholder="Testimonial text"
          placeholderTextColor="#555"
          multiline
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#f5c518" }]}
          onPress={addTestimonial}
        >
          <Text style={[styles.btnText, { color: "#0b1020" }]}>+ Add Testimonial</Text>
        </TouchableOpacity>

        <Text style={[styles.subtitle, { marginTop: 20 }]}>Existing Testimonials</Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#2a2f55" }]}
          onPress={loadTestimonials}
        >
          <Text style={styles.btnText}>Refresh</Text>
        </TouchableOpacity>

        {testimonialsLoading ? (
          <Text style={styles.subtitle}>Loading...</Text>
        ) : testimonials.length === 0 ? (
          <Text style={styles.subtitle}>No testimonials yet.</Text>
        ) : (
          testimonials.map((item) => (
            <View key={item.id} style={styles.historyCard}>
              <View style={styles.historyTop}>
                <Text style={styles.statTitle}>{item.name}</Text>
                {item.score ? (
                  <Text style={{ color: "#f5c518", fontWeight: "700" }}>{item.score}</Text>
                ) : null}
              </View>

              <Text style={styles.statText}>{item.text}</Text>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#7f1d1d", marginTop: 8 }]}
                onPress={() => removeTestimonial(item.id)}
              >
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    <CasperBot onPress={() => setStudyBotVisible(true)} />
  </View>
  );
  }

/* ---------------- MANAGE LESSONS ---------------- */

if (view === "manageLessons") {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={[styles.container, { backgroundColor: "#0b1020" }]} contentContainerStyle={{ paddingBottom: 60 }}>
        <TouchableOpacity style={styles.backButton} onPress={() => setView("admin")}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🎓 Manage Lessons</Text>

        <View style={{ backgroundColor: "#0f1829", borderRadius: 16, padding: 18, marginBottom: 16, borderWidth: 1, borderColor: "#1a2540" }}>
          <Text style={{ color: "#f5c518", fontWeight: "800", fontSize: 16, marginBottom: 14 }}>+ Add New Lesson</Text>

          <Text style={{ color: "#9aa4c7", fontSize: 13, marginBottom: 6 }}>Title *</Text>
          <TextInput style={styles.input} value={newLessonTitle} onChangeText={setNewLessonTitle} placeholder="e.g. Solving Quadratic Equations" placeholderTextColor="#555" />

          <Text style={{ color: "#9aa4c7", fontSize: 13, marginBottom: 6, marginTop: 6 }}>Domain (optional)</Text>
          <TextInput style={styles.input} value={newLessonDomain} onChangeText={setNewLessonDomain} placeholder="e.g. Advanced Math" placeholderTextColor="#555" />

          <Text style={{ color: "#9aa4c7", fontSize: 13, marginBottom: 6, marginTop: 6 }}>Difficulty</Text>
          <View style={{ flexDirection: "row", gap: 8, marginBottom: 14 }}>
            {["All", "Easy", "Medium", "Hard"].map(d => (
              <TouchableOpacity key={d} style={{ flex: 1, padding: 10, borderRadius: 8, alignItems: "center", backgroundColor: newLessonDifficulty === d ? "#f5c518" : "#151c36", borderWidth: 1, borderColor: newLessonDifficulty === d ? "#f5c518" : "#2a3a5c" }} onPress={() => setNewLessonDifficulty(d)}>
                <Text style={{ color: newLessonDifficulty === d ? "#070d1f" : "#9aa4c7", fontWeight: "700", fontSize: 12 }}>{d}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={{ color: "#9aa4c7", fontSize: 13, marginBottom: 6 }}>Video URL (optional)</Text>
          <TextInput style={styles.input} value={newLessonVideo} onChangeText={setNewLessonVideo} placeholder="https://youtube.com/..." placeholderTextColor="#555" autoCapitalize="none" />

          <Text style={{ color: "#9aa4c7", fontSize: 13, marginBottom: 6, marginTop: 6 }}>Lesson Content *</Text>
          <TextInput style={[styles.input, { height: 160, textAlignVertical: "top" }]} value={newLessonContent} onChangeText={setNewLessonContent} placeholder="Write your lesson notes here. Explain the concept, formulas, tips, examples..." placeholderTextColor="#555" multiline />

          <Text style={{ color: "#f5c518", fontWeight: "800", fontSize: 15, marginTop: 16, marginBottom: 12 }}>Practice Questions</Text>
          {lessonPracticeQuestions.map((pq, qi) => (
            <View key={qi} style={{ backgroundColor: "#151c36", borderRadius: 12, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: "#2a3a5c" }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <Text style={{ color: "#fff", fontWeight: "700" }}>Q{qi + 1}</Text>
                {lessonPracticeQuestions.length > 1 && (
                  <TouchableOpacity onPress={() => setLessonPracticeQuestions(prev => prev.filter((_, i) => i !== qi))}>
                    <Text style={{ color: "#dc2626", fontSize: 18 }}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
              <TextInput style={[styles.input, { marginBottom: 8 }]} value={pq.question} onChangeText={v => setLessonPracticeQuestions(prev => prev.map((q, i) => i === qi ? { ...q, question: v } : q))} placeholder="Question text" placeholderTextColor="#555" multiline />
              {pq.choices.map((c, ci) => (
                <View key={ci} style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <TouchableOpacity style={{ width: 30, height: 30, borderRadius: 15, borderWidth: 2, borderColor: pq.answer === ci ? "#4caf50" : "#2a3a5c", backgroundColor: pq.answer === ci ? "#4caf50" : "transparent", justifyContent: "center", alignItems: "center" }} onPress={() => setLessonPracticeQuestions(prev => prev.map((q, i) => i === qi ? { ...q, answer: ci } : q))}>
                    <Text style={{ color: pq.answer === ci ? "#fff" : "#9aa4c7", fontSize: 11, fontWeight: "700" }}>{["A","B","C","D"][ci]}</Text>
                  </TouchableOpacity>
                  <TextInput style={[styles.input, { flex: 1, marginBottom: 0 }]} value={c} onChangeText={v => setLessonPracticeQuestions(prev => prev.map((q, i) => i === qi ? { ...q, choices: q.choices.map((ch, j) => j === ci ? v : ch) } : q))} placeholder={`Choice ${["A","B","C","D"][ci]}`} placeholderTextColor="#555" />
                </View>
              ))}
              <Text style={{ color: "#9aa4c7", fontSize: 12, marginTop: 4, marginBottom: 4 }}>Tap a letter to mark correct answer</Text>
              <TextInput style={[styles.input, { marginBottom: 0 }]} value={pq.explanation} onChangeText={v => setLessonPracticeQuestions(prev => prev.map((q, i) => i === qi ? { ...q, explanation: v } : q))} placeholder="Explanation (optional)" placeholderTextColor="#555" />
            </View>
          ))}
          <TouchableOpacity style={{ backgroundColor: "#1f2a52", padding: 12, borderRadius: 10, alignItems: "center", marginBottom: 16 }} onPress={() => setLessonPracticeQuestions(prev => [...prev, { question: "", choices: ["", "", "", ""], answer: 0, explanation: "" }])}>
            <Text style={{ color: "#60a5fa", fontWeight: "700" }}>+ Add Another Question</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ backgroundColor: "#f5c518", padding: 16, borderRadius: 12, alignItems: "center", opacity: newLessonTitle.trim() && newLessonContent.trim() ? 1 : 0.4 }} disabled={!newLessonTitle.trim() || !newLessonContent.trim()} onPress={addLesson}>
            <Text style={{ color: "#070d1f", fontWeight: "800", fontSize: 16 }}>Save Lesson</Text>
          </TouchableOpacity>
        </View>

        <Text style={{ color: "#fff", fontWeight: "800", fontSize: 16, marginBottom: 12 }}>Existing Lessons ({lessonsList.length})</Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#2a2f55", marginBottom: 14 }]} onPress={loadLessons}>
          <Text style={styles.btnText}>Refresh</Text>
        </TouchableOpacity>
        {lessonsLoading ? (
          <Text style={{ color: "#9aa4c7", textAlign: "center" }}>Loading...</Text>
        ) : lessonsList.length === 0 ? (
          <Text style={{ color: "#9aa4c7", textAlign: "center" }}>No lessons yet.</Text>
        ) : (
          lessonsList.map(lesson => (
            <View key={lesson.id} style={{ backgroundColor: "#0f1829", borderRadius: 14, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: "#1a2540" }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15, marginBottom: 4 }}>{lesson.title}</Text>
                  {lesson.domain ? <Text style={{ color: "#60a5fa", fontSize: 12 }}>{lesson.domain}</Text> : null}
                  {lesson.practiceQuestions?.length > 0 && <Text style={{ color: "#4ade80", fontSize: 12, marginTop: 2 }}>{lesson.practiceQuestions.length} practice question{lesson.practiceQuestions.length > 1 ? "s" : ""}</Text>}
                </View>
                <TouchableOpacity style={{ backgroundColor: "#7f1d1d", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 }} onPress={() => {
  if (Platform.OS === "web") {
    if (window.confirm(`Delete "${lesson.title}"?`)) {
      deleteLesson(lesson.id);
    }
  } else {
    Alert.alert("Delete Lesson", `Delete "${lesson.title}"?`, [{ text: "Cancel", style: "cancel" }, { text: "Delete", style: "destructive", onPress: () => deleteLesson(lesson.id) }]);
  }
}}>
  <Text style={{ color: "#fff", fontSize: 12, fontWeight: "700" }}>Delete</Text>
</TouchableOpacity>
              </View>
              <Text style={{ color: "#9aa4c7", fontSize: 12, marginTop: 8, lineHeight: 18 }} numberOfLines={2}>{lesson.content}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

/* ---------------- ADMIN FEEDBACK ---------------- */

if (view === "adminFeedback") {
  const STARS = ["", "⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"];
  const avgRating = adminFeedbackList.length > 0
    ? (adminFeedbackList.reduce((sum, f) => sum + (f.rating || 0), 0) / adminFeedbackList.length).toFixed(1)
    : "—";

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => setView("admin")}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>📝 User Feedback</Text>

        {adminFeedbackLoading ? (
          <Text style={styles.subtitle}>Loading...</Text>
        ) : (
          <>
            {/* Summary */}
            <View style={{ backgroundColor: "#151c36", borderRadius: 14, padding: 16, marginBottom: 16, flexDirection: "row", justifyContent: "space-around" }}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "#f5c518", fontSize: 28, fontWeight: "800" }}>{avgRating}</Text>
                <Text style={{ color: "#9aa4c7", fontSize: 12, marginTop: 2 }}>Avg Rating</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "#4caf50", fontSize: 28, fontWeight: "800" }}>{adminFeedbackList.length}</Text>
                <Text style={{ color: "#9aa4c7", fontSize: 12, marginTop: 2 }}>Total</Text>
              </View>
              {[5, 4, 3].map(r => (
                <View key={r} style={{ alignItems: "center" }}>
                  <Text style={{ color: "#fff", fontSize: 22, fontWeight: "700" }}>
                    {adminFeedbackList.filter(f => f.rating === r).length}
                  </Text>
                  <Text style={{ color: "#9aa4c7", fontSize: 11 }}>{r}★</Text>
                </View>
              ))}
            </View>

            {adminFeedbackList.length === 0 ? (
              <Text style={styles.subtitle}>No feedback yet.</Text>
            ) : (
              adminFeedbackList.map(item => (
                <View key={item.id} style={[styles.historyCard, { marginBottom: 12 }]}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <Text style={{ color: "#f5c518", fontSize: 18 }}>{STARS[item.rating] || "—"}</Text>
                    <View style={{ backgroundColor: "#1a2540", paddingHorizontal: 10, paddingVertical: 3, borderRadius: 12 }}>
                      <Text style={{ color: "#9aa4c7", fontSize: 11, textTransform: "capitalize" }}>{item.category}</Text>
                    </View>
                  </View>
                  <Text style={{ color: "#fff", fontSize: 14, lineHeight: 22, marginBottom: 8 }}>{item.text}</Text>
                  <Text style={{ color: "#475569", fontSize: 12 }}>{item.userEmail}</Text>
                  <Text style={{ color: "#475569", fontSize: 11, marginTop: 2 }}>
                    {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString() : "—"}
                  </Text>
                </View>
              ))
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}
  return null;
} // closes App()

/* ================================================
   STYLES
================================================ */

const ob = StyleSheet.create({
  progressRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 32 },
  progressDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: "#2a2f55" },
  progressDotActive: { backgroundColor: "#f5c518" },
  progressLine: { width: 60, height: 2, backgroundColor: "#2a2f55", marginHorizontal: 6 },
  progressLineActive: { backgroundColor: "#f5c518" },
  stepLabel: { color: "#9aa4c7", fontSize: 13, textAlign: "center", marginBottom: 8 },
  heading: { color: "#fff", fontSize: 26, fontWeight: "700", textAlign: "center", marginBottom: 10 },
  sub: { color: "#9aa4c7", fontSize: 15, textAlign: "center", marginBottom: 32 },
  bigInput: {
    backgroundColor: "#151c36",
    color: "#f5c518",
    fontSize: 48,
    fontWeight: "700",
    textAlign: "center",
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    width: "100%",
  },
  dateButton: {
    backgroundColor: "#151c36",
    padding: 18,
    borderRadius: 14,
    marginBottom: 24,
    alignItems: "center",
    width: "100%",
  },
  dateButtonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  nextBtn: {
    backgroundColor: "#f5c518",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    width: "100%",
    marginBottom: 12,
  },
  nextBtnText: { color: "#0b1020", fontSize: 17, fontWeight: "700" },
});

const home = StyleSheet.create({
  banner: {
    flexDirection: "row",
    backgroundColor: "#0d1830",
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "#1e2d4a",
  },
  bannerItem: { alignItems: "center", flex: 1 },
  bannerValue: { color: "#f5c518", fontSize: 28, fontWeight: "900", letterSpacing: -0.5 },
  bannerLabel: { color: "#5a6a8a", fontSize: 11, marginTop: 4, fontWeight: "600", letterSpacing: 0.5, textTransform: "uppercase" },
  bannerDivider: { width: 1, height: 36, backgroundColor: "#1e2d4a" },
});

const bb = StyleSheet.create({
  // ── Screens ──────────────────────────────────────────────────────
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
 
  // ── Header ───────────────────────────────────────────────────────
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    gap: 8,
  },
  headerBackBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
  },
  headerBackText: {
    color: "#475569",
    fontSize: 16,
    fontWeight: "700",
  },
  headerMeta: {
    flex: 1,
  },
  headerSection: {
    color: "#0f172a",
    fontSize: 14,
    fontWeight: "700",
  },
  headerModuleLabel: {
    color: "#64748b",
    fontSize: 11,
    marginTop: 1,
  },
  headerTimerWrap: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  timerText: {
    color: "#1e3a5f",
    fontSize: 16,
    fontWeight: "800",
    fontVariant: ["tabular-nums"],
    letterSpacing: 1,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  headerQCount: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "600",
  },
 
  // ── Progress ─────────────────────────────────────────────────────
  progressTrack: {
    height: 3,
    backgroundColor: "#e2e8f0",
  },
  progressFill: {
    height: 3,
    backgroundColor: "#1d4ed8",
    borderRadius: 2,
  },
 
  // ── Toolbar ──────────────────────────────────────────────────────
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f8fafc",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  toolbarLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  toolbarQNum: {
    color: "#0f172a",
    fontSize: 14,
    fontWeight: "700",
  },
  toolbarFlagBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#fff",
  },
  toolbarFlagBtnActive: {
    borderColor: "#1d4ed8",
    backgroundColor: "#eff6ff",
  },
  toolbarFlagIcon: {
    fontSize: 13,
  },
  toolbarFlagText: {
    color: "#475569",
    fontSize: 12,
    fontWeight: "600",
  },
  eliminatorBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#fff",
  },
  eliminatorBtnOn: {
    borderColor: "#1d4ed8",
    backgroundColor: "#eff6ff",
  },
  eliminatorText: {
    color: "#475569",
    fontSize: 14,
    fontWeight: "800",
  },
  eliminatorLabel: {
    color: "#475569",
    fontSize: 11,
    fontWeight: "600",
  },
 
  // ── Content ───────────────────────────────────────────────────────
  content: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentInner: {
    padding: 20,
    paddingBottom: 40,
  },
  domainChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  domainChipText: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  domainDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#94a3b8",
  },
  questionBox: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 17,
    color: "#0f172a",
    lineHeight: 30,
    fontWeight: "400",
    letterSpacing: 0.1,
  },
  contentDivider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginBottom: 18,
  },
  choicesLabel: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 14,
  },
 
  // ── Choice rows ───────────────────────────────────────────────────
  choiceRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 14,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#cbd5e1",
    backgroundColor: "#fff",
    gap: 14,
    minHeight: 52,
  },
  choiceRowSelected: {
    borderColor: "#1d4ed8",
    backgroundColor: "#eff6ff",
  },
  choiceRowStruck: {
    borderColor: "#e2e8f0",
    backgroundColor: "#f8fafc",
    opacity: 0.55,
  },
 
  // Bubble
  choiceBubble: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: "#94a3b8",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 1,
    flexShrink: 0,
  },
  choiceBubbleSelected: {
    backgroundColor: "#1d4ed8",
    borderColor: "#1d4ed8",
  },
  choiceBubbleStruck: {
    borderColor: "#cbd5e1",
    backgroundColor: "#f1f5f9",
  },
  choiceLetter: {
    fontSize: 14,
    fontWeight: "700",
    color: "#475569",
  },
  choiceLetterSelected: {
    color: "#fff",
  },
  choiceLetterStruck: {
    color: "#94a3b8",
  },
 
  // Choice text
  choiceText: {
    flex: 1,
    fontSize: 15,
    color: "#1e293b",
    lineHeight: 24,
    paddingTop: 5,
  },
  choiceTextSelected: {
    color: "#1d4ed8",
    fontWeight: "600",
  },
  choiceTextStruck: {
    color: "#94a3b8",
    textDecorationLine: "line-through",
  },
 
  // Strike button (shown when eliminator is on)
  strikeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#cbd5e1",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 3,
    flexShrink: 0,
  },
  strikeBtnText: {
    color: "#94a3b8",
    fontSize: 14,
    fontWeight: "700",
  },
 
  eliminatorHint: {
    backgroundColor: "#eff6ff",
    borderRadius: 8,
    padding: 12,
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  eliminatorHintText: {
    color: "#1d4ed8",
    fontSize: 13,
    lineHeight: 20,
  },
 
  // ── Bottom nav ────────────────────────────────────────────────────
  bottomNav: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    gap: 10,
  },
  navBtn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  navBtnOutline: {
    borderWidth: 1.5,
    borderColor: "#cbd5e1",
    backgroundColor: "#fff",
  },
  navBtnOutlineText: {
    color: "#475569",
    fontWeight: "700",
    fontSize: 15,
  },
  navBtnPrimary: {
    backgroundColor: "#1e3a5f",
  },
  navBtnFinish: {
    backgroundColor: "#16a34a",
  },
  navBtnPrimaryText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  navPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  navPillText: {
    color: "#1e3a5f",
    fontWeight: "700",
    fontSize: 14,
  },
  navPillCaret: {
    color: "#64748b",
    fontSize: 11,
    marginTop: 1,
  },
 
  // ── Navigator modal ───────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15,23,42,0.4)",
    justifyContent: "flex-end",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 36,
  },
  modalHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#cbd5e1",
    alignSelf: "center",
    marginBottom: 18,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 20,
    textAlign: "center",
  },
  navigatorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
    paddingBottom: 8,
  },
  navCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: "#94a3b8",
    backgroundColor: "#f8fafc",
    justifyContent: "center",
    alignItems: "center",
  },
  navCircleAnswered: {
    backgroundColor: "#1d4ed8",
    borderColor: "#1d4ed8",
  },
  navCircleCurrent: {
    backgroundColor: "#1e3a5f",
    borderColor: "#1e3a5f",
  },
  navCircleFlagged: {
    backgroundColor: "#eff6ff",
    borderColor: "#1d4ed8",
    borderWidth: 2,
  },
  navCircleText: {
    fontWeight: "700",
    fontSize: 14,
    color: "#475569",
  },
  navFlagDot: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#1d4ed8",
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  navigatorLegend: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 18,
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  legendText: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
  },
  navigatorSummary: {
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    alignItems: "center",
  },
  navigatorSummaryText: {
    color: "#475569",
    fontSize: 13,
    fontWeight: "600",
  },
  modalBtns: {
    flexDirection: "row",
    gap: 10,
  },
  modalClose: {
    flex: 1,
    backgroundColor: "#1e3a5f",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  modalCloseText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
 
  // ── Score screen ──────────────────────────────────────────────────
  scoreScreen: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreTitleRow: {
    marginBottom: 28,
  },
  scoreTitleText: {
    color: "#0f172a",
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
  },
  scoreBadge: {
    width: "100%",
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    borderWidth: 1,
    marginBottom: 24,
  },
  scoreBig: {
    fontSize: 64,
    fontWeight: "800",
    letterSpacing: -2,
    lineHeight: 68,
  },
  scorePercent: {
    fontSize: 28,
    fontWeight: "600",
    marginTop: 4,
  },
  scoreTime: {
    fontSize: 16,
    color: "#64748b",
    marginTop: 6,
  },
  scorePill: {
    marginTop: 14,
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 20,
  },
  scorePillText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  scoreMetaRow: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#f8fafc",
    borderRadius: 14,
    padding: 16,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  scoreMetaItem: {
    flex: 1,
    alignItems: "center",
  },
  scoreMetaVal: {
    color: "#0f172a",
    fontSize: 26,
    fontWeight: "800",
  },
  scoreMetaLabel: {
    color: "#64748b",
    fontSize: 12,
    marginTop: 3,
  },
  scoreMetaDivider: {
    width: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 4,
  },
  primaryBtn: {
    backgroundColor: "#1e3a5f",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  secondaryBtn: {
    backgroundColor: "#f1f5f9",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  secondaryBtnText: {
    color: "#1e293b",
    fontWeight: "700",
    fontSize: 16,
  },
});

const land = StyleSheet.create({
  bg: { flex: 1, backgroundColor: "#070d1f" },
  bgLight: { backgroundColor: "#f8fafc" },
  nav: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 24, paddingTop: 52, paddingBottom: 20 },
  navLogo: { color: "#f5c518", fontSize: 22, fontWeight: "800", letterSpacing: -0.5 },
  navBtns: { flexDirection: "row", alignItems: "center", gap: 10 },
  navLogin: { color: "#9aa4c7", fontWeight: "600", fontSize: 15 },
  navLoginLight: { color: "#475569" },
  navSignUp: { backgroundColor: "#f5c518", paddingHorizontal: 18, paddingVertical: 9, borderRadius: 22 },
  navSignUpLight: { backgroundColor: "#4F7CFF" },
  navSignUpText: { color: "#070d1f", fontWeight: "800", fontSize: 14 },
  navSignUpTextLight: { color: "#fff" },
  navLight: { backgroundColor: "#F6F7FB", borderBottomWidth: 1, borderBottomColor: "#E5E7EB" },
  navLogoLight: { color: "#0F172A" },
  navThemeBtn: { backgroundColor: "#1f2a52", paddingHorizontal: 16, paddingVertical: 9, borderRadius: 22 },
  navThemeBtnLight: { backgroundColor: "#F0F1F5", borderWidth: 1, borderColor: "#E5E7EB" },
  navThemeText: { color: "#f5f7ff", fontWeight: "700", fontSize: 14 },
  navThemeTextLight: { color: "#475569" },

  hero: { paddingHorizontal: 24, paddingTop: 52, paddingBottom: 56, alignItems: "flex-start" },
  heroLight: { backgroundColor: "#F6F7FB" },
  heroBadge: { backgroundColor: "#0a1220", borderRadius: 24, paddingHorizontal: 16, paddingVertical: 9, marginBottom: 28, borderWidth: 1, borderColor: "#1d4ed830", flexDirection: "row", alignItems: "center", gap: 8, alignSelf: "flex-start" },
  heroBadgeLight: { backgroundColor: "#EEF2FF", borderColor: "#C7D2FE" },
  heroBadgeDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: "#4caf50" },
  heroBadgeDotLight: { backgroundColor: "#4F7CFF" },
  heroBadgeText: { color: "#6a7a9a", fontSize: 12, fontWeight: "700", letterSpacing: 0.3 },
  heroBadgeTextLight: { color: "#4F7CFF" },
  heroTitle: { color: "#fff", fontSize: 46, fontWeight: "900", lineHeight: 54, marginBottom: 22, letterSpacing: -1.5 },
  heroTitleLight: { color: "#0F172A" },
  heroSub: { color: "#6a7a9a", fontSize: 16, lineHeight: 28, marginBottom: 36 },
  heroSubLight: { color: "#475569" },
  heroBtn: { backgroundColor: "#f5c518", paddingHorizontal: 28, paddingVertical: 18, borderRadius: 12, marginBottom: 14, width: "100%", alignItems: "center", elevation: 0 },
  heroBtnLight: { backgroundColor: "#4F7CFF", shadowOpacity: 0 },
  heroBtnText: { color: "#070d1f", fontWeight: "900", fontSize: 17, letterSpacing: -0.3 },
  heroBtnTextLight: { color: "#fff" },
  heroSecondary: { color: "#9aa4c7", fontSize: 14, textAlign: "center", width: "100%" },
  heroSecondaryLight: { color: "#475569" },

  trialCard: { backgroundColor: "#0a1428", borderRadius: 18, padding: 22, marginBottom: 18, borderWidth: 1, borderColor: "#1a2540" },
  trialCardLight: { backgroundColor: "#ffffff", borderColor: "#cbd5e1" },
  trialCardLabel: { color: "#f5c518", fontSize: 15, fontWeight: "800", marginBottom: 10 },
  trialCardLabelLight: { color: "#0f172a" },
  trialPassage: { color: "#d1d5db", fontSize: 13, lineHeight: 20, marginBottom: 14 },
  trialPassageLight: { color: "#475569" },
  trialQuestion: { color: "#fff", fontSize: 16, fontWeight: "800", marginBottom: 14, lineHeight: 22 },
  trialQuestionLight: { color: "#0f172a" },
  trialOption: { backgroundColor: "#0f1829", borderRadius: 14, borderWidth: 1, borderColor: "#1a2540", paddingVertical: 14, paddingHorizontal: 16, marginBottom: 10 },
  trialOptionLight: { backgroundColor: "#f8fafc", borderColor: "#cbd5e1" },
  trialOptionSelected: { backgroundColor: "#dcfce7", borderColor: "#22c55e" },
  trialOptionText: { color: "#e2e8f0", fontSize: 14, lineHeight: 20 },
  trialOptionTextLight: { color: "#0f172a" },
  trialFeedback: { marginTop: 12, backgroundColor: "#081c1e", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: "#134e4a" },
  trialFeedbackLight: { backgroundColor: "#f8fafc", borderColor: "#cbd5e1" },
  trialFeedbackText: { fontSize: 14, fontWeight: "800", marginBottom: 8 },
  trialExplanation: { color: "#cbd5e1", fontSize: 13, lineHeight: 20 },
  trialExplanationLight: { color: "#475569" },

  socialDivider: { flexDirection: "row", alignItems: "center", width: "100%", marginVertical: 4 },
  socialDividerLine: { flex: 1, height: 1, backgroundColor: "#1a2540" },
  socialDividerLineLight: { backgroundColor: "#cbd5e1" },
  socialDividerText: { color: "#475569", fontSize: 12, paddingHorizontal: 12 },
  socialDividerTextLight: { color: "#64748b" },
  socialBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderWidth: 1.5, borderColor: "#1a2540", backgroundColor: "#0f1829", paddingVertical: 13, borderRadius: 12 },
  socialBtnLight: { borderColor: "#cbd5e1", backgroundColor: "#ffffff" },
  socialBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  socialBtnTextLight: { color: "#1f2937" },
  socialBtnIcon: { fontSize: 18 },

  scoreBanner: { marginHorizontal: 20, marginBottom: 16, backgroundColor: "#080e1e", borderRadius: 24, padding: 32, alignItems: "center", borderWidth: 1, borderColor: "#1a2540", overflow: "hidden" },
  scoreBannerLight: { backgroundColor: "#ffffff", borderColor: "#E5E7EB" },
  scoreBannerLabel: { color: "#4F7CFF", fontSize: 10, fontWeight: "900", letterSpacing: 2.5, marginBottom: 10, textTransform: "uppercase" },
  scoreBannerNum: { color: "#f5c518", fontSize: 72, fontWeight: "900", letterSpacing: -3, lineHeight: 76 },
  scoreBannerSub: { color: "#475569", fontSize: 13, marginTop: 8, textAlign: "center", lineHeight: 20 },

  statsRow: { flexDirection: "row", marginHorizontal: 20, marginBottom: 8, backgroundColor: "#080e1e", borderRadius: 20, padding: 20, justifyContent: "space-around", borderWidth: 1, borderColor: "#141e34", gap: 4 },
  statsRowLight: { backgroundColor: "#ffffff", borderColor: "#E5E7EB" },
  statBox: { alignItems: "center", flex: 1 },
  statVal: { color: "#f5c518", fontSize: 18, fontWeight: "900", letterSpacing: -0.5 },
  statLabel: { color: "#3a4a6a", fontSize: 10, marginTop: 4, textAlign: "center", fontWeight: "700", letterSpacing: 0.5, textTransform: "uppercase" },
  statLabelLight: { color: "#475569" },

  section: { paddingHorizontal: 24, paddingTop: 52, paddingBottom: 8 },
  sectionLight: { backgroundColor: "#F6F7FB" },
  sectionLabel: { color: "#1d4ed8", fontSize: 11, fontWeight: "800", letterSpacing: 2, marginBottom: 10 },
  sectionLabelLight: { color: "#4F7CFF" },
  sectionTitle: { color: "#fff", fontSize: 30, fontWeight: "900", lineHeight: 38, marginBottom: 28, letterSpacing: -0.5 },
  sectionTitleLight: { color: "#0F172A" },

  featureCard: { backgroundColor: "#0a1428", borderRadius: 18, padding: 18, borderWidth: 1, borderColor: "#1a2540" },
  featureCardLight: { backgroundColor: "#ffffff", borderColor: "#E5E7EB" },
  featureCardWideLight: { backgroundColor: "#ffffff", borderColor: "#E5E7EB" },
  featureTitle: { color: "#fff", fontWeight: "800", fontSize: 15, marginBottom: 4 },
  featureTitleLight: { color: "#0F172A" },
  featureDesc: { color: "#9aa4c7", fontSize: 13, lineHeight: 20 },
  featureDescLight: { color: "#475569" },
  featureCardWide: { backgroundColor: "#0a1428", borderRadius: 18, padding: 20, flexDirection: "row", gap: 16, alignItems: "flex-start", borderWidth: 1, borderColor: "#1a2540" },
  featureIconBox: { width: 48, height: 48, borderRadius: 14, justifyContent: "center", alignItems: "center" },
  featureIcon: { fontSize: 24 },

  bluebookCard: { backgroundColor: "#0a1428", borderRadius: 18, padding: 20, borderWidth: 1, borderColor: "#1a2540", gap: 14 },
  bluebookCardLight: { backgroundColor: "#ffffff", borderColor: "#E5E7EB" },
  bluebookRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  bluebookCheck: { color: "#4caf50", fontWeight: "800", fontSize: 16, marginTop: 1 },
  bluebookText: { color: "#fff", fontSize: 15, flex: 1, lineHeight: 22 },
  bluebookTextLight: { color: "#0F172A" },

  domainPill: { backgroundColor: "#0a1428", borderRadius: 10, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: "#1a2540" },
  domainPillLight: { backgroundColor: "#f1f5f9", borderColor: "#e2e8f0" },
  domainPillText: { color: "#9aa4c7", fontSize: 13 },
  domainPillTextLight: { color: "#334155" },

  classCard: { backgroundColor: "#0a1428", borderRadius: 18, padding: 20, marginBottom: 14, borderWidth: 1, borderColor: "#1a2540" },
  classCardLight: { backgroundColor: "#ffffff", borderColor: "#E5E7EB" },
  classCardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  classCardTitle: { color: "#fff", fontWeight: "800", fontSize: 16, flex: 1 },
  classCardTitleLight: { color: "#0F172A" },
  classCardDate: { color: "#9aa4c7", fontSize: 13, marginBottom: 6 },
  classCardDateLight: { color: "#475569" },
  classCardDesc: { color: "#9aa4c7", fontSize: 14, lineHeight: 20, marginBottom: 8 },
  classCardDescLight: { color: "#475569" },
  classCardDuration: { color: "#475569", fontSize: 13, marginBottom: 14 },
  classCardDurationLight: { color: "#475569" },
  classBookBtn: { backgroundColor: "#4F7CFF", padding: 13, borderRadius: 10, alignItems: "center" },
  classBookBtnText: { color: "#fff", fontWeight: "800", fontSize: 15 },
  classBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  classBadgeFree: { backgroundColor: "#14532d" },
  classBadgePaid: { backgroundColor: "#1e3a5f" },
  classBadgeText: { color: "#fff", fontWeight: "700", fontSize: 12 },

  emptyClasses: { backgroundColor: "#0a1428", borderRadius: 18, padding: 28, alignItems: "center", marginBottom: 14, borderWidth: 1, borderColor: "#1a2540" },
  emptyClassesText: { color: "#fff", fontWeight: "800", fontSize: 16, marginBottom: 8 },

  testimonialCard: { backgroundColor: "#0a1428", borderRadius: 18, padding: 20, marginBottom: 14, borderWidth: 1, borderColor: "#1a2540" },
  testimonialCardLight: { backgroundColor: "#ffffff", borderColor: "#E5E7EB" },
  testimonialQuote: { color: "#e2e8f0", fontSize: 15, lineHeight: 26, marginBottom: 16, fontStyle: "italic" },
  testimonialQuoteLight: { color: "#0F172A" },
  testimonialFooter: { flexDirection: "row", alignItems: "center", gap: 12 },
  testimonialAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#EEF2FF", justifyContent: "center", alignItems: "center", borderWidth: 1.5, borderColor: "#4F7CFF40" },
  testimonialName: { color: "#4F7CFF", fontWeight: "700", fontSize: 14 },
  testimonialScore: { color: "#475569", fontSize: 13, marginTop: 2 },

  faqCard: { backgroundColor: "#0a1428", borderRadius: 16, padding: 18, marginBottom: 10, borderWidth: 1, borderColor: "#1a2540" },
  faqCardLight: { backgroundColor: "#ffffff", borderColor: "#E5E7EB" },
  faqQ: { color: "#fff", fontWeight: "700", fontSize: 15, marginBottom: 8 },
  faqQLight: { color: "#0F172A" },
  faqA: { color: "#9aa4c7", fontSize: 14, lineHeight: 22 },
  faqALight: { color: "#475569" },

  ctaBanner: { margin: 20, backgroundColor: "#0a1428", borderRadius: 24, padding: 32, alignItems: "center", borderWidth: 1, borderColor: "#1d4ed830" },
  ctaBannerLight: { backgroundColor: "#ffffff", borderColor: "#E5E7EB" },
  ctaTitleLight: { color: "#0F172A" },
  ctaSubLight: { color: "#475569" },
  ctaTitle: { color: "#fff", fontSize: 26, fontWeight: "900", marginBottom: 10, textAlign: "center", lineHeight: 34, letterSpacing: -0.5 },
  ctaSub: { color: "#9aa4c7", fontSize: 15, marginBottom: 24, textAlign: "center" },
  ctaBtn: { backgroundColor: "#4F7CFF", paddingHorizontal: 28, paddingVertical: 16, borderRadius: 12, width: "100%", alignItems: "center", marginBottom: 4 },
  ctaBtnText: { color: "#fff", fontWeight: "800", fontSize: 17 },

  footer: { paddingHorizontal: 24, paddingTop: 36, paddingBottom: 40, alignItems: "center", borderTopWidth: 1, borderTopColor: "#1a2540", gap: 6 },
  footerLogo: { color: "#f5c518", fontSize: 20, fontWeight: "800" },
  footerTagline: { color: "#9aa4c7", fontSize: 13 },
  footerInsta: { color: "#f5c518", fontSize: 14, fontWeight: "600", marginTop: 6, marginBottom: 6 },
  footerCopy: { color: "#475569", fontSize: 12 },
  footerBrand: { color: "#0F172A", fontSize: 48, fontWeight: "900", letterSpacing: -2, marginTop: 24 },
});
}
