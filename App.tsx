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
import { inject } from '@vercel/analytics';
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from "react-native-webview";
import { VOCAB_LIST } from "./vocab";
import { getFunctions, httpsCallable } from "firebase/functions";
import { auth, db } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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


inject();

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
  const [themeMode, setThemeMode] = useState("dark");
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
const [questionCounts, setQuestionCounts] = useState({
    total: 0,
    used: 0,
    new: 0,
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
    const cred = await signInWithPopup(auth, provider);
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
    else { await loadScoreHistory(); setScreen("app"); setView("home"); }
  } catch (e) {
    setError(e.message);
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
    const bootstrap = async () => {
      try {
        const raw = await AsyncStorage.getItem(SESSION_KEY);
        if (!raw) return;

        const saved = JSON.parse(raw);
        if (!saved?.uid || !saved?.expiresAt) {
          await clearSession();
          return;
        }

        if (Date.now() > saved.expiresAt) {
          await clearSession();
          try {
            await signOut(auth);
          } catch (e) {}
          return;
        }

        setUserId(saved.uid);
        setEmail(saved.email || "");
        setIsAdmin(!!saved.isAdmin);

        const profile = await loadUserProfile(saved.uid);
        await loadUsedQuestions(saved.uid);
        await loadStreak();
        await loadBadges();
        if (!profile) {
          setScreen("onboarding");
        } else {
          await loadScoreHistory();
          setScreen("app");
          setView("home");
        }
      } catch (e) {
        console.log("Session bootstrap error:", e.message);
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
    bootstrap();
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
  const usedCount = sectionBank.filter(q =>
    q.questionType === "Used" || sectionUsedIds.has(makeId(q))
  ).length;
  setQuestionCounts({
    total: sectionBank.length,
    used: usedCount,
    new: sectionBank.length - usedCount,
  });
}, [questionBank, usedQuestionIds, section]);

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
    }
  } catch (e) {
    console.log("Load used questions error:", e.message);
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

const loadBadges = async () => {
  if (!userId) return;
  try {
    const ref = doc(db, "badges", userId);
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
    setCurrentQ(index);
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
"Authorization": `Bearer ${process.env.EXPO_PUBLIC_GROQ_API_KEY}`
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
      paceLabel = "No test date set — practice consistently at your own pace.";
      daysPerWeekRec = 5;
    } else if (daysLeft <= 14) {
      paceLabel = "🚨 Your test is in 2 weeks or less — go into final review mode. Focus only on your weakest domains and do 1–2 full practice sections.";
      daysPerWeekRec = 7;
    } else if (daysLeft <= 30) {
      paceLabel = "⚡ You have about a month — prioritize weak domains daily and take at least one timed practice test this week.";
      daysPerWeekRec = 6;
    } else if (daysLeft <= 60) {
      paceLabel = "📅 You have 1–2 months — build strong domain habits now. Work up to full practice tests by week 3.";
      daysPerWeekRec = 5;
    } else {
      paceLabel = "🗓 You have plenty of time — build mastery domain by domain. Don't rush; quality practice beats quantity.";
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

  /* ---------------- DRILL HELPERS ---------------- */

  const DRILL_TIMES = { Easy: 60, Medium: 45, Hard: 30 };

  const startDrill = (domain, difficulty) => {
    const filtered = questionBank.filter(q => q.domain === domain && q.difficulty === difficulty);
    if (filtered.length === 0) return;
    const shuffled = [...filtered].sort(() => Math.random() - 0.5).slice(0, 10);
    setDrillQuestions(shuffled);
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
     LANDING
  ================================================ */

  if (screen === "landing") {
  return (
    <ScrollView style={[land.bg, isLight && land.bgLight]} contentContainerStyle={{ paddingBottom: 80 }}>
      <StatusBar barStyle={isLight ? "dark-content" : "light-content"} backgroundColor={isLight ? "#f4f5f7" : "#070d1f"} />

      {/* NAV */}
      <View style={[land.nav, isLight && land.navLight]}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Image source={require("./logo.png")} style={{ width: 32, height: 32, borderRadius: 8 }} resizeMode="contain" />
          <Text style={[land.navLogo, isLight && land.navLogoLight]}>AscendSAT</Text>
        </View>
        <View style={land.navBtns}>
          <TouchableOpacity style={[land.navThemeBtn, isLight && land.navThemeBtnLight]} onPress={() => setThemeMode(isLight ? "dark" : "light") }>
            <Text style={[land.navThemeText, isLight && land.navThemeTextLight]}>{isLight ? "Dark" : "Light"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setError(""); setScreen("login"); }}>
            <Text style={[land.navLogin, isLight && land.navLoginLight]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[land.navSignUp, isLight && land.navSignUpLight]} onPress={() => { setError(""); setScreen("register"); }}>
            <Text style={[land.navSignUpText, isLight && land.navSignUpTextLight]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* HERO */}
      <View style={[land.hero, isLight && land.heroLight]}>
        <View style={[land.heroBadge, isLight && land.heroBadgeLight]}>
          <View style={[land.heroBadgeDot, isLight && land.heroBadgeDotLight]} />
          <Text style={[land.heroBadgeText, isLight && land.heroBadgeTextLight]}>100% Free · No Credit Card · No Catch</Text>
        </View>
        <Text style={[land.heroTitle, isLight && land.heroTitleLight]}>
          Stop grinding{"\n"}flashcards.{"\n"}<Text style={{ color: "#f5c518" }}>Start scoring.</Text>
        </Text>
        <Text style={[land.heroSub, isLight && land.heroSubLight]}>
                    Real SAT questions, expert-built tools, and free live classes — all in one app. Built by a tutor who's helped students hit their target scores.
        </Text>
        <TouchableOpacity style={[land.heroBtn, isLight && land.heroBtnLight]} onPress={() => { setError(""); setScreen("register"); }}>
          <Text style={[land.heroBtnText, isLight && land.heroBtnTextLight]}>Start for Free →</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[land.heroBtn, isLight && land.heroBtnLight, { backgroundColor: "#10b981" }]}
          onPress={() => {
            setError("");
            setTrialIndex(0);
            setTrialAnswers({});
            setScreen("trial3");
          }}
        >
          <Text style={[land.heroBtnText, { color: "#070d1f" }]}>Try 3 free practice questions</Text>
        </TouchableOpacity>
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

{/* Floating Reviews CTA */}
<TouchableOpacity
  onPress={() => setScreen("testimonials")}
  style={{
    marginTop: 28,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#0a1428",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#f5c51840",
    paddingVertical: 14,
    paddingHorizontal: 20,
  }}
>
  <Text style={{ fontSize: 18 }}>⭐</Text>
  <View>
    <Text style={{ color: "#f5c518", fontWeight: "800", fontSize: 14 }}>Read Student Reviews</Text>
    <Text style={{ color: "#9aa4c7", fontSize: 12 }}> Built for thousands of users· 100+ point increase pts</Text>
  </View>
  <Text style={{ color: "#f5c518", fontSize: 16, marginLeft: "auto" }}>›</Text>
</TouchableOpacity>
      </View>

      {/* SCORE BANNER */}
<View style={[land.scoreBanner, isLight && land.scoreBannerLight]}>
  <Text style={land.scoreBannerLabel}>AVERAGE SCORE IMPROVEMENT</Text>
  <Text style={land.scoreBannerNum}>+150 pts</Text>
  <Text style={land.scoreBannerSub}>among students who practice 5+ days/week</Text>
</View>

      {/* STATS */}
      <View style={[land.statsRow, isLight && land.statsRowLight]}>
        {[["Free","Forever"],["8","SAT Domains"],["3","Difficulty Levels"],["Free","Group Classes"]].map(([val, label], i) => (
          <View key={i} style={land.statBox}>
            <Text style={land.statVal}>{val}</Text>
            <Text style={land.statLabel}>{label}</Text>
          </View>
        ))}
      </View>

      {/* FEATURES */}
      <View style={[land.section, isLight && land.sectionLight]}>
        <Text style={[land.sectionLabel, isLight && land.sectionLabelLight]}>FEATURES</Text>
        <Text style={[land.sectionTitle, isLight && land.sectionTitleLight]}>Everything you need to hit your target score.</Text>

        {/* Wide card */}
        <View style={[land.featureCardWide, isLight && land.featureCardWideLight, { marginBottom: 12 }]}>
          <View style={[land.featureIconBox, { backgroundColor: "#1a2a1a" }]}>
            <Text style={land.featureIcon}>📘</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[land.featureTitle, isLight && land.featureTitleLight]}>Real SAT Question Bank</Text>
            <Text style={[land.featureDesc, isLight && land.featureDescLight]}>Hundreds of real SAT questions sorted by domain, difficulty, and type. New questions added regularly. Filter by "Used" or "New" to simulate real test conditions.</Text>
          </View>
        </View>

        {/* 2-col grid */}
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 12 }}>
          <View style={[land.featureCardWide, isLight && land.featureCardWideLight, { flex: 1, flexDirection: "column" }]}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <View style={[land.featureIconBox, { backgroundColor: "#2a1a3a", width: 40, height: 40, borderRadius: 10 }]}>
                <Text style={{ fontSize: 20 }}>⚡</Text>
              </View>
              <Text style={[land.featureTitle, isLight && land.featureTitleLight, { marginBottom: 0 }]}>Timed Drills</Text>
            </View>
            <Text style={[land.featureDesc, isLight && land.featureDescLight]}>Per-question countdown timers across all 8 domains. Build speed under pressure.</Text>
          </View>
          <View style={[land.featureCardWide, isLight && land.featureCardWideLight, { flex: 1, flexDirection: "column" }]}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <View style={[land.featureIconBox, { backgroundColor: "#1a2a3a", width: 40, height: 40, borderRadius: 10 }]}>
                <Text style={{ fontSize: 20 }}>📊</Text>
              </View>
              <Text style={[land.featureTitle, isLight && land.featureTitleLight, { marginBottom: 0 }]}>Growth Tracking</Text>
            </View>
            <Text style={[land.featureDesc, isLight && land.featureDescLight]}>See accuracy by domain across every quiz. Know exactly where to focus.</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: 12, marginBottom: 12 }}>
          <View style={[land.featureCardWide, isLight && land.featureCardWideLight, { flex: 1, flexDirection: "column" }]}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <View style={[land.featureIconBox, { backgroundColor: "#2a2a10", width: 40, height: 40, borderRadius: 10 }]}>
                <Text style={{ fontSize: 20 }}>🎯</Text>
              </View>
              <Text style={[land.featureTitle, isLight && land.featureTitleLight, { marginBottom: 0 }]}>Diagnostic + Study Plan</Text>
            </View>
            <Text style={[land.featureDesc, isLight && land.featureDescLight]}>Enter your Bluebook scores. Get a personalized weekly study roadmap.</Text>
          </View>
          <View style={[land.featureCardWide, isLight && land.featureCardWideLight, { flex: 1, flexDirection: "column" }]}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <View style={[land.featureIconBox, { backgroundColor: "#1a3a2a", width: 40, height: 40, borderRadius: 10 }]}>
                <Text style={{ fontSize: 20 }}>📖</Text>
              </View>
              <Text style={[land.featureTitle, isLight && land.featureTitleLight, { marginBottom: 0 }]}>SAT Vocab System</Text>
            </View>
            <Text style={[land.featureDesc, isLight && land.featureDescLight]}>Flashcards, word list, vocab quiz & mini games. Track mastery per word.</Text>
          </View>
        </View>

<View style={[land.featureCardWide, isLight && land.featureCardWideLight, { marginBottom: 12 }]}> 
          <View style={[land.featureIconBox, { backgroundColor: "#1a2a3a" }]}> 
            <Text style={land.featureIcon}>🤖</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[land.featureTitle, isLight && land.featureTitleLight]}>Casper AI Study Bot</Text>
            <Text style={[land.featureDesc, isLight && land.featureDescLight]}>Your personal SAT tutor available 24/7. Ask questions about any SAT topic — Math, Reading & Writing, vocab, or strategy — and get instant expert answers.</Text>
          </View>
        </View>

        <View style={[land.featureCardWide, isLight && land.featureCardWideLight, { marginBottom: 0 }]}>
          <View style={[land.featureIconBox, { backgroundColor: "#1a1a2a" }]}>
            <Text style={land.featureIcon}>🎮</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[land.featureTitle, isLight && land.featureTitleLight]}>Mini Games</Text>
            <Text style={[land.featureDesc, isLight && land.featureDescLight]}>Speed Round, Word Match, and Sentence Context games make vocabulary practice actually fun. Learn words without it feeling like studying.</Text>
          </View>
        </View>
      </View>

      {/* BLUEBOOK SECTION */}
      <View style={[land.section, isLight && land.sectionLight, { paddingTop: 40 }]}>
        <Text style={[land.sectionLabel, isLight && land.sectionLabelLight]}>BUILT FOR THE DIGITAL SAT</Text>
        <Text style={[land.sectionTitle, isLight && land.sectionTitleLight]}>Designed to match Bluebook. Down to the details.</Text>
        <View style={[land.bluebookCard, isLight && land.bluebookCardLight]}>
          <View style={land.bluebookRow}>
            <Text style={land.bluebookCheck}>✓</Text>
            <Text style={[land.bluebookText, isLight && { color: "#0f172a" }]}>Bluebook-style quiz interface with question navigator</Text>
          </View>
          <View style={land.bluebookRow}>
            <Text style={land.bluebookCheck}>✓</Text>
            <Text style={[land.bluebookText, isLight && { color: "#0f172a" }]}>Mark questions & jump between them freely</Text>
          </View>
          <View style={land.bluebookRow}>
            <Text style={land.bluebookCheck}>✓</Text>
            <Text style={[land.bluebookText, isLight && { color: "#0f172a" }]}>All 8 official SAT domains covered</Text>
          </View>
          <View style={land.bluebookRow}>
            <Text style={land.bluebookCheck}>✓</Text>
            <Text style={[land.bluebookText, isLight && { color: "#0f172a" }]}>Easy / Medium / Hard difficulty filtering</Text>
          </View>
          <View style={land.bluebookRow}>
            <Text style={land.bluebookCheck}>✓</Text>
            <Text style={[land.bluebookText, isLight && { color: "#0f172a" }]}>Instant explanations on every single question</Text>
          </View>
          <View style={land.bluebookRow}>
            <Text style={land.bluebookCheck}>✓</Text>
            <Text style={[land.bluebookText, isLight && { color: "#0f172a" }]}>Timer tracks your pace across the whole quiz</Text>
          </View>
        </View>
      </View>

      {/* HOW IT WORKS */}
      <View style={[land.section, isLight && land.sectionLight]}>
        <Text style={[land.sectionLabel, isLight && land.sectionLabelLight]}>HOW IT WORKS</Text>
        <Text style={[land.sectionTitle, isLight && land.sectionTitleLight]}>From signup to score improvement in three steps.</Text>

        {[
          { n: "1", title: "Create your free account", desc: "Set your target score and test date. We'll build your countdown and personalize your experience. Takes 60 seconds.", color: "#f5c518", bg: "#2a2a10" },
          { n: "2", title: "Practice every day", desc: "Choose your domains, difficulty, and question count. Get instant feedback and explanations on every answer.", color: "#60a5fa", bg: "#0f1a2a" },
          { n: "3", title: "Track your growth", desc: "Watch your accuracy rise domain by domain. Use your Growth dashboard to know exactly what to work on next.", color: "#4caf50", bg: "#0f2a1a" },
          { n: "4", title: "Book a free group class", desc: "Join a live session with your expert tutor. Ask questions in real time. Free, no catch, no upsell.", color: "#a78bfa", bg: "#1a0f2a" },
        ].map((step, i, arr) => (
          <View key={i} style={{ flexDirection: "row", marginBottom: i < arr.length - 1 ? 0 : 0 }}>
            <View style={{ alignItems: "center", marginRight: 16, width: 40 }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: step.bg, borderWidth: 2, borderColor: step.color, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: step.color, fontWeight: "900", fontSize: 16 }}>{step.n}</Text>
              </View>
              {i < arr.length - 1 && <View style={{ width: 2, height: 40, backgroundColor: "#1a2540" }} />}
            </View>
            <View style={{ flex: 1, paddingBottom: 32 }}>
              <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "800", fontSize: 16, marginBottom: 6 }}>{step.title}</Text>
              <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 14, lineHeight: 22 }}>{step.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* DOMAINS SECTION */}
      <View style={[land.section, isLight && land.sectionLight]}>
        <Text style={[land.sectionLabel, isLight && land.sectionLabelLight]}>FULL COVERAGE</Text>
        <Text style={[land.sectionTitle, isLight && land.sectionTitleLight]}>All 8 SAT domains. Every difficulty level.</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#60a5fa", fontWeight: "800", fontSize: 13, marginBottom: 10, letterSpacing: 0.5 }}>📐 MATH</Text>
            {["Algebra","Advanced Math","Problem Solving and Data Analysis","Geometry & Trigonometry"].map((d, i) => (
              <View key={i} style={[land.domainPill, isLight && land.domainPillLight]}>
                <Text style={[land.domainPillText, isLight && land.domainPillTextLight]}>{d}</Text>
              </View>
            ))}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#4caf50", fontWeight: "800", fontSize: 13, marginBottom: 10, letterSpacing: 0.5 }}>📝 READING & WRITING</Text>
            {["Information & Ideas","Craft & Structure","Expression of Ideas","Standard English Conv."].map((d, i) => (
              <View key={i} style={[land.domainPill, isLight && land.domainPillLight]}>
                <Text style={[land.domainPillText, isLight && land.domainPillTextLight]}>{d}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* UPCOMING CLASSES */}
      <View style={[land.section, isLight && land.sectionLight]}>
        <Text style={[land.sectionLabel, isLight && land.sectionLabelLight]}>UPCOMING CLASSES</Text>
        <Text style={[land.sectionTitle, isLight && land.sectionTitleLight]}>Free group sessions.{"\n"}Open to everyone.</Text>
        {publicClassesLoading ? (
          <Text style={land.featureDesc}>Loading classes...</Text>
        ) : publicClasses.length === 0 ? (
          <View style={land.emptyClasses}>
            <Text style={{ fontSize: 32, marginBottom: 10 }}>📅</Text>
            <Text style={land.emptyClassesText}>New classes coming soon!</Text>
            <Text style={land.featureDesc}>Sign up to get notified when sessions are scheduled.</Text>
          </View>
        ) : (
          publicClasses
            .filter((cls) => !(cls.type === "individual" && cls.isBooked))
            .slice(0, 3)
            .map((cls) => (
              <View key={cls.id} style={[land.classCard, isLight && land.classCardLight]}>
                <View style={land.classCardTop}>
                  <Text style={land.classCardTitle}>{cls.title}</Text>
                  <View style={[land.classBadge, cls.type === "group" ? land.classBadgeFree : land.classBadgePaid]}>
                    <Text style={land.classBadgeText}>{cls.type === "group" ? "FREE" : `$${cls.price}`}</Text>
                  </View>
                </View>
                <Text style={land.classCardDate}>
                  📅 {cls.date ? new Date(cls.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) : "TBD"}
                  {"  "}🕐 {cls.date ? new Date(cls.date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : ""}
                </Text>
                {cls.description ? <Text style={land.classCardDesc}>{cls.description}</Text> : null}
                <Text style={land.classCardDuration}>Duration: {cls.durationHours || 1} hour{cls.durationHours > 1 ? "s" : ""}</Text>
                <TouchableOpacity style={land.classBookBtn} onPress={() => { setError(""); setScreen("register"); }}>
                  <Text style={land.classBookBtnText}>Sign Up to Book →</Text>
                </TouchableOpacity>
              </View>
            ))
        )}
      </View>

/* TESTIMONIALS FULL PAGE SECTION */
<View style={[land.section, isLight && land.sectionLight, { paddingTop: 60 }]}> 
  <Text style={[land.sectionLabel, isLight && land.sectionLabelLight]}>STUDENT SUCCESS STORIES</Text>
  <Text style={[land.sectionTitle, isLight && land.sectionTitleLight]}>Results speak{"\n"}for themselves.</Text>
  <View style={{ backgroundColor: "#0a1428", borderRadius: 20, padding: 24, marginBottom: 20, borderWidth: 1, borderColor: "#1d4ed830", alignItems: "center" }}>
    <Text style={{ color: "#f5c518", fontSize: 48, fontWeight: "900" }}>150+</Text>
    <Text style={{ color: "#fff", fontWeight: "800", fontSize: 18, marginTop: 4 }}>Points Average Improvement</Text>
    <Text style={{ color: "#9aa4c7", fontSize: 14, marginTop: 6, textAlign: "center" }}>Among students who practice 5+ days per week with AscendSAT</Text>
  </View>
  <View style={{ flexDirection: "row", gap: 12, marginBottom: 20 }}>
    {[["98%", "would recommend"], ["4.9★", "avg rating"], ["100+", "students helped"]].map(([val, label], i) => (
      <View key={i} style={{ flex: 1, backgroundColor: "#0a1428", borderRadius: 14, padding: 16, alignItems: "center", borderWidth: 1, borderColor: "#1a2540" }}>
        <Text style={{ color: "#f5c518", fontSize: 22, fontWeight: "800" }}>{val}</Text>
        <Text style={{ color: "#9aa4c7", fontSize: 11, textAlign: "center", marginTop: 4 }}>{label}</Text>
      </View>
    ))}
  </View>
  {testimonialsLoading ? (
    <Text style={land.featureDesc}>Loading...</Text>
  ) : testimonials.length === 0 ? (
    <View style={land.emptyClasses}>
      <Text style={{ fontSize: 32, marginBottom: 10 }}>💬</Text>
      <Text style={land.emptyClassesText}>Testimonials coming soon!</Text>
    </View>
  ) : (
    <>
      {testimonials.map((item) => (
        <View key={item.id} style={[land.testimonialCard, isLight && land.testimonialCardLight, { marginBottom: 16 }]}>
          <Text style={{ color: "#f5c518", fontSize: 32, marginBottom: 8 }}>"</Text>
          <Text style={[land.testimonialQuote, isLight && land.testimonialQuoteLight]}>{item.text}</Text>
          <View style={land.testimonialFooter}>
            <View style={land.testimonialAvatar}>
              <Text style={{ color: "#f5c518", fontWeight: "800", fontSize: 14 }}>{item.name?.[0]}</Text>
            </View>
            <View>
              <Text style={land.testimonialName}>{item.name}</Text>
              {item.score ? <Text style={land.testimonialScore}>Score: {item.score}</Text> : null}
            </View>
          </View>
        </View>
      ))}
      <TouchableOpacity style={land.heroBtn} onPress={() => { setError(""); setScreen("register"); }}>
        <Text style={land.heroBtnText}>Join Them — Start Free →</Text>
      </TouchableOpacity>
    </>
  )}
</View>

      {/* FAQ */}
      <View style={[land.section, isLight && land.sectionLight]}>
        <Text style={[land.sectionLabel, isLight && land.sectionLabelLight]}>FAQ</Text>
        <Text style={[land.sectionTitle, isLight && land.sectionTitleLight]}>Common questions.</Text>
        {[
          { q: "Is AscendSAT really free?", a: "Yes — 100% free, forever. The app, the question bank, the AI bot, and all group classes are free. No credit card, no trial period, no hidden fees." },
          { q: "What SAT sections does it cover?", a: "All of them. AscendSAT covers all 4 Math domains and all 4 Reading & Writing domains from the digital SAT, at Easy, Medium, and Hard difficulty." },
          { q: "How are the group classes structured?", a: "Group classes are live sessions led by an expert SAT tutor. They're free to join, open to all students, and cover specific SAT topics. Book your spot through the app." },
          { q: "How is this different from Khan Academy or Prep Scholar?", a: "AscendSAT combines a question bank, AI tutor, live classes, drills, vocab games, and growth tracking all in one place — and it's built and run by an actual SAT tutor, not a corporation." },
          { q: "Can I use this alongside another prep program?", a: "Absolutely. AscendSAT is designed to complement any other prep you're doing. Use it for daily practice, vocabulary, or to fill in gaps your other program misses." },
        ].map((item, i) => (
          <View key={i} style={[land.faqCard, isLight && land.faqCardLight]}>
            <Text style={[land.faqQ, isLight && land.faqQLight]}>{item.q}</Text>
            <Text style={[land.faqA, isLight && land.faqALight]}>{item.a}</Text>
          </View>
        ))}
      </View>

      {/* FINAL CTA */}
      <View style={[land.ctaBanner, isLight && land.ctaBannerLight]}>
        <Text style={{ fontSize: 40, marginBottom: 12 }}>🚀</Text>
        <Text style={[land.ctaTitle, isLight && land.ctaTitleLight]}>Your target score is closer than you think.</Text>
        <Text style={[land.ctaSub, isLight && land.ctaSubLight]}>Join AscendSAT free today. No card required.</Text>
        <TouchableOpacity style={land.ctaBtn} onPress={() => { setError(""); setScreen("register"); }}>
          <Text style={land.ctaBtnText}>Create Free Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[land.socialBtn, { width: "100%", marginTop: 12 }]} onPress={handleGoogleSignIn}>
          <Text style={land.socialBtnIcon}>G</Text>
          <Text style={[land.socialBtnText, { color: "#4285F4" }]}>Google</Text>
        </TouchableOpacity>
      </View>

      {/* FOOTER */}
      <View style={land.footer}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <Image source={require("./logo.png")} style={{ width: 28, height: 28, borderRadius: 7 }} resizeMode="contain" />
          <Text style={land.footerLogo}>AscendSAT</Text>
        </View>
        <Text style={land.footerTagline}>Premium Prep. Zero Cost.</Text>
        <TouchableOpacity onPress={() => Linking.openURL("https://instagram.com/ascend_sat")}>
          <Text style={land.footerInsta}>📸 @ascend_sat</Text>
        </TouchableOpacity>
        <Text style={land.footerCopy}>© 2025 AscendSAT. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
}
if (screen === "trial3") {
  return (
    <SafeAreaView style={[styles.container, isLight && styles.containerLight, { backgroundColor: isLight ? "#f4f5f7" : "#070d1f" }]}> 
      <StatusBar barStyle={isLight ? "dark-content" : "light-content"} backgroundColor={isLight ? "#f4f5f7" : "#070d1f"} />
      <View style={[land.nav, isLight && land.navLight, { paddingBottom: 16 }]}> 
        <TouchableOpacity onPress={() => setScreen("landing")} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Image source={require("./logo.png")} style={{ width: 32, height: 32, borderRadius: 8 }} resizeMode="contain" />
          <Text style={[land.navLogo, isLight && land.navLogoLight]}>AscendSAT</Text>
        </TouchableOpacity>
        <View style={land.navBtns}>
          <TouchableOpacity style={[land.navThemeBtn, isLight && land.navThemeBtnLight]} onPress={() => setThemeMode(isLight ? "dark" : "light") }>
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
          <TouchableOpacity onPress={() => { setError(""); setScreen("login"); }}>
            <Text style={land.navLogin}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={land.navSignUp} onPress={() => { setError(""); setScreen("register"); }}>
            <Text style={land.navSignUpText}>Sign Up</Text>
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
        <Text style={{ color: isLight ? "#1d4ed8" : "#f5c518", fontSize: 36, textAlign: "center", marginBottom: 24, fontWeight: "800" }}>AscendSAT</Text>
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
        <Text style={{ color: isLight ? "#1d4ed8" : "#f5c518", fontSize: 36, textAlign: "center", marginBottom: 24, fontWeight: "800" }}>AscendSAT</Text>
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
    const cardBg = isLight ? "#ffffff" : "#0d1830";
    const cardBorder = isLight ? "#e2e8f0" : "#1e2d4a";
    const titleColor = isLight ? "#0f172a" : "#fff";
    const subColor = isLight ? "#475569" : "#9aa4c7";
    const mutedColor = isLight ? "#64748b" : "#475569";
    const accentColor = isLight ? "#1d4ed8" : "#f5c518";
    const tileCardBg = isLight ? "#ffffff" : "#0d1020";
    const tileCardBorder = isLight ? "#e2e8f0" : "#141828";
    return (
  <View style={{ flex: 1, backgroundColor: homeBg }}>
    <ScrollView style={{ flex: 1, backgroundColor: homeBg, padding: 20 }}>
        <StatusBar barStyle={isLight ? "dark-content" : "light-content"} />
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Image source={require("./logo.png")} style={{ width: 32, height: 32, borderRadius: 8 }} resizeMode="contain" />
            <Text style={{ color: titleColor, fontSize: 20, fontWeight: "700" }}>AscendSAT</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            {isAdmin && (
              <TouchableOpacity style={{ padding: 6, backgroundColor: "#4a1d96", borderRadius: 8 }} onPress={() => { loadAdminQuestions(); loadTestimonials(); loadGlobalStats(); setView("admin"); }}>
                <Text style={{ color: "#fff", fontSize: 12 }}>Admin</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={{ padding: 6, backgroundColor: isLight ? "#e2e8f0" : "#1a2540", borderRadius: 8 }} onPress={() => {
              setEditTargetScore(String(userProfile?.targetScore || ""));
              const d = userProfile?.testDate ? new Date(userProfile.testDate) : new Date();
              setEditTestDate(d);
              setEditTestDateInput(d.toLocaleDateString("en-US"));
              setProfileSaved(false);
              setView("settings");
            }}>
              <Text style={{ color: isLight ? "#334155" : "#9aa4c7", fontSize: 12 }}>⚙️ Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 6, backgroundColor: isLight ? "#e2e8f0" : "#2a2f55", borderRadius: 8 }} onPress={handleLogout}>
              <Text style={{ color: isLight ? "#334155" : "#fff", fontSize: 12 }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        {(() => {
          const hour = new Date().getHours();
          const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : hour < 21 ? "Good evening" : "Good night";
          const displayName = userProfile?.name || userName || null;
          return (
            <View style={{ marginBottom: 20 }}>
              <Text style={{
                color: isLight ? T.t4 : T.t1,
                fontSize: 24, fontWeight: "900", letterSpacing: -0.6, lineHeight: 30,
              }}>
                {greeting}{displayName ? `,\n${displayName}` : "."}
              </Text>
              <Text style={{ color: isLight ? T.t3 : T.t2, fontSize: 13, marginTop: 6, letterSpacing: 0.1 }}>
                {days !== null && days <= 7
                  ? `${days} day${days === 1 ? "" : "s"} until your test. Focus up.`
                  : "Your target score is within reach."}
              </Text>
            </View>
          );
        })()}

        {userProfile && (
          <View style={{
            backgroundColor: isLight ? "#fff" : T.bg2,
            borderRadius: T.r_xl, padding: 20, marginBottom: 16,
            borderWidth: 1, borderColor: isLight ? "#e2e8f0" : T.bg4,
          }}>
            <View style={{ flexDirection: "row", marginBottom: 16 }}>
              {[
                {
                  val: userProfile.targetScore || "—",
                  label: "Target",
                  color: isLight ? T.blue : T.gold,
                },
                {
                  val: days === null ? "—" : days <= 0 ? "Today" : days,
                  label: "Days Left",
                  color: days !== null && days <= 7 ? T.red : isLight ? T.blue : T.gold,
                },
                {
                  val: scoreHistory.length,
                  label: "Quizzes",
                  color: isLight ? T.blue : T.gold,
                },
              ].map(({ val, label, color }, i) => (
                <View key={label} style={{ flex: 1, alignItems: "center" }}>
                  {i > 0 && (
                    <View style={{
                      position: "absolute", left: 0, top: "20%", bottom: "20%",
                      width: 1, backgroundColor: isLight ? "#e2e8f0" : T.bg4,
                    }} />
                  )}
                  <Text style={{ color, fontSize: 28, fontWeight: "900", letterSpacing: -1 }}>{val}</Text>
                  <Text style={{
                    color: isLight ? T.t3 : T.t3,
                    fontSize: 10, marginTop: 4, fontWeight: "700",
                    textTransform: "uppercase", letterSpacing: 1.2,
                  }}>{label}</Text>
                </View>
              ))}
            </View>

            {/* Streak bar */}
            <View style={{
              backgroundColor: isLight ? "#fffbeb" : "#1a1400",
              borderRadius: 12, padding: 14,
              borderWidth: 1, borderColor: isLight ? "#fde68a" : "#2a2000",
              flexDirection: "row", alignItems: "center", justifyContent: "space-between",
            }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Text style={{ fontSize: 28 }}>{streakData.currentStreak >= 7 ? "🔥" : streakData.currentStreak >= 3 ? "⚡" : "✨"}</Text>
                <View>
                  <Text style={{ color: isLight ? "#92400e" : "#f5c518", fontWeight: "900", fontSize: 22, letterSpacing: -0.5 }}>
                    {streakData.currentStreak} day{streakData.currentStreak !== 1 ? "s" : ""}
                  </Text>
                  <Text style={{ color: isLight ? "#a16207" : "#a37c00", fontSize: 11, fontWeight: "600" }}>Current Streak</Text>
                </View>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ color: isLight ? "#a16207" : "#f5c518", fontWeight: "800", fontSize: 16 }}>{streakData.longestStreak || 0}</Text>
                <Text style={{ color: isLight ? "#a16207" : "#a37c00", fontSize: 11, fontWeight: "600" }}>Best</Text>
              </View>
            </View>
          </View>
        )}

        <Text style={{
  color: subColor, fontSize: 10, fontWeight: "800", marginBottom: 16,
  letterSpacing: 2, textTransform: "uppercase",
}}>
  Quick Access
</Text>

{/* PRIMARY CTA — Practice */}
<TouchableOpacity
  style={{
    borderRadius: T.r_lg, padding: 22, marginBottom: 12,
    backgroundColor: isLight ? T.blue : T.gold,
    shadowColor: isLight ? T.blue : T.gold,
    shadowOpacity: 0.3, shadowRadius: 18, shadowOffset: { width: 0, height: 6 }, elevation: 8,
  }}
  onPress={() => setView("practice")}
  activeOpacity={0.88}
>
  <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
    <View style={{
      width: 52, height: 52, borderRadius: T.r_md,
      backgroundColor: "rgba(255,255,255,0.15)",
      justifyContent: "center", alignItems: "center",
    }}>
      <Text style={{ color: isLight ? "#fff" : "#070d1f", fontSize: 13, fontWeight: "900", letterSpacing: 0.5 }}>SAT</Text>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={{ color: isLight ? "#fff" : "#070d1f", fontWeight: "900", fontSize: 18, letterSpacing: -0.3 }}>Start Practice</Text>
      <Text style={{ color: isLight ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.5)", fontSize: 12, marginTop: 3 }}>
        {selectedDomains.length > 0 ? `${selectedDomains.length} domain${selectedDomains.length > 1 ? "s" : ""} selected` : "All domains · choose difficulty"}
      </Text>
    </View>
    <Text style={{ color: isLight ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.35)", fontSize: 22, fontWeight: "300" }}>›</Text>
  </View>
</TouchableOpacity>

{/* FULL TEST CTA */}
<TouchableOpacity
  style={{
    borderRadius: T.r_lg, padding: 18, marginBottom: 10,
    backgroundColor: isLight ? "#0f172a" : "#0d1525",
    borderWidth: 1, borderColor: isLight ? "#1e293b" : "#1e3a5f",
    flexDirection: "row", alignItems: "center", gap: 14,
  }}
  onPress={() => { setFullTestPhase("intro"); setFullTestModalVisible(true); }}
  activeOpacity={0.88}
>
  <View style={{ width: 46, height: 46, borderRadius: 12, backgroundColor: "#1e3a5f", justifyContent: "center", alignItems: "center" }}>
    <Text style={{ color: "#60a5fa", fontSize: 11, fontWeight: "900", letterSpacing: 0.3 }}>TEST</Text>
  </View>
  <View style={{ flex: 1 }}>
    <Text style={{ color: "#fff", fontWeight: "900", fontSize: 16, letterSpacing: -0.3 }}>Full-Length Practice Test</Text>
    <Text style={{ color: "#475569", fontSize: 12, marginTop: 3 }}>Timed modules · Bluebook format · Instant scores</Text>
  </View>
  <Text style={{ color: "#475569", fontSize: 20 }}>›</Text>
</TouchableOpacity>

{/* ROW 1: Classes + Growth */}
<View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
  {[
    {
      label: "Book a Class", sub: "Free live sessions", abbr: "CAL",
      accent: isLight ? T.blue : "#60a5fa",
      bg: isLight ? "#eff6ff" : "#0c1624",
      border: isLight ? "#bfdbfe" : "#172033",
      onPress: () => { loadClasses(); setView("classes"); },
    },
    {
      label: "Growth", sub: "Accuracy by domain", abbr: "GRW",
      accent: isLight ? T.green : "#4ade80",
      bg: isLight ? "#f0fdf4" : "#0c1a10",
      border: isLight ? "#bbf7d0" : "#172413",
      onPress: () => { setView("growth"); loadScoreHistory(); },
    },
  ].map(({ label, sub, abbr, accent, bg, border, onPress: op }) => (
    <TouchableOpacity key={label}
      style={{ flex: 1, backgroundColor: bg, borderRadius: T.r_lg, padding: 16, borderWidth: 1, borderColor: border }}
      onPress={op} activeOpacity={0.82}
    >
      <View style={{
        width: 36, height: 36, borderRadius: T.r_sm,
        backgroundColor: accent + "22",
        justifyContent: "center", alignItems: "center", marginBottom: 14,
      }}>
        <Text style={{ color: accent, fontSize: 10, fontWeight: "900", letterSpacing: 0.5 }}>{abbr}</Text>
      </View>
      <Text style={{ color: isLight ? T.t4 : T.t1, fontWeight: "800", fontSize: 14, marginBottom: 3 }}>{label}</Text>
      <Text style={{ color: isLight ? T.t3 : T.t2, fontSize: 11 }}>{sub}</Text>
    </TouchableOpacity>
  ))}
</View>

{/* ROW 2: Drills + Vocab */}
<View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
  {[
    {
      label: "Drills", sub: "Timed per question", abbr: "DRL",
      accent: isLight ? "#7c3aed" : "#a78bfa",
      bg: isLight ? "#faf5ff" : "#0e0c1a",
      border: isLight ? "#e9d5ff" : "#1c1630",
      onPress: () => { setDrillDomain(null); setDrillDifficulty(null); setDrillFinished(false); setDrillModalVisible(true); },
    },
    {
      label: "Vocab", sub: "Flashcards & quiz", abbr: "VOC",
      accent: isLight ? T.blue : "#38bdf8",
      bg: isLight ? "#eff6ff" : "#0a1520",
      border: isLight ? "#bfdbfe" : "#152030",
      onPress: () => setVocabModalVisible(true),
    },
  ].map(({ label, sub, abbr, accent, bg, border, onPress: op }) => (
    <TouchableOpacity key={label}
      style={{ flex: 1, backgroundColor: bg, borderRadius: T.r_lg, padding: 16, borderWidth: 1, borderColor: border }}
      onPress={op} activeOpacity={0.82}
    >
      <View style={{
        width: 36, height: 36, borderRadius: T.r_sm,
        backgroundColor: accent + "22",
        justifyContent: "center", alignItems: "center", marginBottom: 14,
      }}>
        <Text style={{ color: accent, fontSize: 10, fontWeight: "900", letterSpacing: 0.5 }}>{abbr}</Text>
      </View>
      <Text style={{ color: isLight ? T.t4 : T.t1, fontWeight: "800", fontSize: 14, marginBottom: 3 }}>{label}</Text>
      <Text style={{ color: isLight ? T.t3 : T.t2, fontSize: 11 }}>{sub}</Text>
    </TouchableOpacity>
  ))}
</View>

{/* ROW 3: Mini Games + History */}
<View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
  {[
    {
      label: "Mini Games", sub: "Speed & word match", abbr: "GAM",
      accent: isLight ? T.red : "#f87171",
      bg: isLight ? "#fff1f2" : "#160c0c",
      border: isLight ? "#fecdd3" : "#2a1212",
      onPress: () => { setGameMode(null); setGameModalVisible(true); },
    },
    {
      label: "History", sub: "Past quiz scores", abbr: "HST",
      accent: isLight ? "#d97706" : T.gold,
      bg: isLight ? "#fffbeb" : "#14100a",
      border: isLight ? "#fde68a" : "#261e0e",
      onPress: () => { loadScoreHistory(); setView("history"); },
    },
  ].map(({ label, sub, abbr, accent, bg, border, onPress: op }) => (
    <TouchableOpacity key={label}
      style={{ flex: 1, backgroundColor: bg, borderRadius: T.r_lg, padding: 16, borderWidth: 1, borderColor: border }}
      onPress={op} activeOpacity={0.82}
    >
      <View style={{
        width: 36, height: 36, borderRadius: T.r_sm,
        backgroundColor: accent + "22",
        justifyContent: "center", alignItems: "center", marginBottom: 14,
      }}>
        <Text style={{ color: accent, fontSize: 10, fontWeight: "900", letterSpacing: 0.5 }}>{abbr}</Text>
      </View>
      <Text style={{ color: isLight ? T.t4 : T.t1, fontWeight: "800", fontSize: 14, marginBottom: 3 }}>{label}</Text>
      <Text style={{ color: isLight ? T.t3 : T.t2, fontSize: 11 }}>{sub}</Text>
    </TouchableOpacity>
  ))}
</View>

{/* UTILITY ROW: Feedback + Diagnostic + Help */}
<View style={{
  backgroundColor: isLight ? "#fff" : "#0d1525",
  borderRadius: T.r_lg, borderWidth: 1,
  borderColor: isLight ? "#e2e8f0" : "#1a2540",
  marginBottom: 10, overflow: "hidden",
}}>
  {[
    { label: "Weekly Summary", sub: "Your progress this week at a glance", tag: "WEEK", onPress: () => setWeeklySummaryVisible(true) },
    { label: "Formula Sheet", sub: "Every SAT math formula in one place", tag: "FORM", onPress: () => setFormulaSheetVisible(true) },
    { label: "Badges", sub: `${badges.length} of ${BADGE_DEFINITIONS.length} earned`, tag: "BDGE", onPress: () => setBadgesModalVisible(true) },
    { label: "Diagnostic & Study Plan", sub: "Personalized roadmap from your scores", tag: "DIAG", onPress: () => { setDiagStep(1); setDiagnosticModalVisible(true); } },
    { label: "Give Feedback", sub: "Rate the app · share suggestions", tag: "FEED", onPress: () => { setFeedbackSent(false); setFeedbackRating(0); setFeedbackText(""); setFeedbackCategory("general"); setFeedbackModalVisible(true); } },
    { label: "Ask for Help", sub: "Message your tutor directly", tag: "HELP", onPress: () => { setHelpSent(false); setView("help"); } },
  ].map(({ label, sub, tag, onPress: op }, i, arr) => (
    <TouchableOpacity key={label}
      style={{
        flexDirection: "row", alignItems: "center", paddingVertical: 14, paddingHorizontal: 16, gap: 14,
        borderBottomWidth: i < arr.length - 1 ? 1 : 0,
        borderBottomColor: isLight ? "#f1f5f9" : "#131e30",
      }}
      onPress={op} activeOpacity={0.8}
    >
      <View style={{
        width: 32, height: 20, borderRadius: 4,
        backgroundColor: isLight ? "#f1f5f9" : "#1a2540",
        justifyContent: "center", alignItems: "center",
      }}>
        <Text style={{ color: isLight ? T.t3 : T.t2, fontSize: 8, fontWeight: "900", letterSpacing: 0.5 }}>{tag}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: isLight ? T.t4 : T.t1, fontWeight: "700", fontSize: 14 }}>{label}</Text>
        <Text style={{ color: isLight ? T.t3 : T.t2, fontSize: 11, marginTop: 2 }}>{sub}</Text>
      </View>
      <Text style={{ color: isLight ? "#cbd5e1" : "#243050", fontSize: 16 }}>›</Text>
    </TouchableOpacity>
  ))}
</View>

{isAdmin && (
  <TouchableOpacity
    style={{
      backgroundColor: "#2e1065", padding: 14, borderRadius: T.r_md, marginTop: 4,
      borderWidth: 1, borderColor: "#4c1d95",
    }}
    onPress={() => { loadAdminQuestions(); loadTestimonials(); loadGlobalStats(); setView("admin"); }}
  >
    <Text style={{ color: "#c4b5fd", textAlign: "center", fontWeight: "700", fontSize: 14, letterSpacing: 0.5 }}>
      Admin Dashboard
    </Text>
  </TouchableOpacity>
)}

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
                <TouchableOpacity style={{ backgroundColor: "#1a2540", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 12 }}
                  onPress={() => setVocabMode("progress")}>
                  <Text style={{ color: "#9aa4c7", fontWeight: "800", fontSize: 16 }}>📈 My Progress</Text>
                  <Text style={{ color: "#475569", fontSize: 12, marginTop: 2 }}>See mastery levels across all words</Text>
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
                  <TouchableOpacity onPress={() => setVocabMode(null)}>
                    <Text style={{ color: "#9aa4c7", fontSize: 16 }}>← Back</Text>
                  </TouchableOpacity>
                  <Text style={{ color: "#fff", fontWeight: "700" }}>{flashcardIndex + 1} / {flashcardDeck.length}</Text>
                  <TouchableOpacity onPress={() => { setVocabModalVisible(false); setVocabMode(null); }}>
                    <Text style={{ color: "#9aa4c7", fontSize: 16 }}>✕</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
                  <TouchableOpacity
                    style={{ backgroundColor: flashcardFlipped ? "#1a3a2a" : "#151c36", borderRadius: 20, padding: 32, alignItems: "center", minHeight: 220, justifyContent: "center", borderWidth: 2, borderColor: flashcardFlipped ? "#4caf50" : "#2a3a5c" }}
                    onPress={() => setFlashcardFlipped(!flashcardFlipped)}
                    activeOpacity={0.85}>
                    {!flashcardFlipped ? (
                      <>
                        <Text style={{ color: "#9aa4c7", fontSize: 12, marginBottom: 12, letterSpacing: 1 }}>{card.p}</Text>
                        <Text style={{ color: "#f5c518", fontSize: 32, fontWeight: "800", textAlign: "center" }}>{card.w}</Text>
                        <Text style={{ color: "#475569", fontSize: 13, marginTop: 20 }}>Tap to reveal definition</Text>
                      </>
                    ) : (
                      <>
                        <Text style={{ color: "#f5c518", fontSize: 20, fontWeight: "700", marginBottom: 12 }}>{card.w}</Text>
                        <Text style={{ color: "#fff", fontSize: 17, textAlign: "center", lineHeight: 26 }}>{card.d}</Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", padding: 20, gap: 12 }}>
                  <TouchableOpacity
                    style={{ flex: 1, backgroundColor: "#151c36", padding: 14, borderRadius: 12, alignItems: "center" }}
                    onPress={() => { setFlashcardIndex(Math.max(0, flashcardIndex - 1)); setFlashcardFlipped(false); }}
                    disabled={flashcardIndex === 0}>
                    <Text style={{ color: flashcardIndex === 0 ? "#475569" : "#fff", fontWeight: "700" }}>← Prev</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ flex: 1, backgroundColor: "#f5c518", padding: 14, borderRadius: 12, alignItems: "center" }}
                    onPress={() => { setFlashcardIndex(flashcardIndex + 1); setFlashcardFlipped(false); }}
                    disabled={flashcardIndex === flashcardDeck.length - 1}>
                    <Text style={{ color: "#070d1f", fontWeight: "700" }}>Next →</Text>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            </Modal>
          );
        })()}

        {vocabModalVisible && vocabMode === "list" && (
          <Modal visible={true} animationType="slide">
            <SafeAreaView style={{ flex: 1, backgroundColor: "#0b1020" }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: "#151c36" }}>
                <TouchableOpacity onPress={() => setVocabMode(null)}>
                  <Text style={{ color: "#9aa4c7", fontSize: 16 }}>← Back</Text>
                </TouchableOpacity>
                <Text style={{ color: "#fff", fontWeight: "700" }}>Word List</Text>
                <TouchableOpacity onPress={() => { setVocabModalVisible(false); setVocabMode(null); }}>
                  <Text style={{ color: "#9aa4c7", fontSize: 16 }}>✕</Text>
                </TouchableOpacity>
              </View>
              <View style={{ padding: 12 }}>
                <TextInput
                  style={{ backgroundColor: "#151c36", color: "#fff", padding: 12, borderRadius: 10, fontSize: 15 }}
                  placeholder="Search words..."
                  placeholderTextColor="#555"
                  value={vocabSearch}
                  onChangeText={setVocabSearch}
                />
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
                  <TouchableOpacity onPress={() => setVocabMode(null)}>
                    <Text style={{ color: "#9aa4c7", fontSize: 16 }}>← Back</Text>
                  </TouchableOpacity>
                  <Text style={{ color: "#fff", fontWeight: "700" }}>Score: {quizScore}/{quizTotal}</Text>
                  <TouchableOpacity onPress={() => { setVocabModalVisible(false); setVocabMode(null); }}>
                    <Text style={{ color: "#9aa4c7", fontSize: 16 }}>✕</Text>
                  </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={{ padding: 24 }}>
                  <Text style={{ color: "#9aa4c7", fontSize: 12, marginBottom: 8, letterSpacing: 1 }}>WHAT DOES THIS WORD MEAN?</Text>
                  <Text style={{ color: "#f5c518", fontSize: 36, fontWeight: "800", marginBottom: 8 }}>{quizWord.w}</Text>
                  <Text style={{ color: "#475569", fontSize: 14, marginBottom: 32 }}>{quizWord.p}</Text>
                  {quizChoices.map((choice, i) => {
                    const isCorrect = choice === quizWord.d;
                    const isSelected = choice === quizSelected;
                    let bg = "#151c36";
                    if (isAnswered && isCorrect) bg = "#1a4d2e";
                    else if (isAnswered && isSelected && !isCorrect) bg = "#4d1a1a";
                    return (
                      <TouchableOpacity key={i}
                        style={{ backgroundColor: bg, borderRadius: 12, padding: 16, marginBottom: 10, borderWidth: 1.5, borderColor: isAnswered && isCorrect ? "#4caf50" : isAnswered && isSelected ? "#ff4d4d" : "#2a3a5c" }}
                        onPress={() => {
                          if (isAnswered) return;
                          setQuizSelected(choice);
                          setQuizTotal(quizTotal + 1);
                          const correct = choice === quizWord.d;
                          if (correct) setQuizScore(quizScore + 1);
                          setVocabProgress(prev => {
                            const current = prev[quizWord.w];
                            let next;
                            if (correct) {
                              if (!current || current === "unseen") next = "familiar";
                              else if (current === "familiar") next = "proficient";
                              else if (current === "proficient") next = "mastery";
                              else next = "mastery";
                            } else {
                              if (current === "mastery") next = "proficient";
                              else if (current === "proficient") next = "familiar";
                              else next = "unseen";
                            }
                            return { ...prev, [quizWord.w]: next };
                          });
                        }}
                        disabled={isAnswered}>
                        <Text style={{ color: "#fff", fontSize: 15, lineHeight: 22 }}>{choice}</Text>
                      </TouchableOpacity>
                    );
                  })}
                  {isAnswered && (
                    <TouchableOpacity
                      style={{ backgroundColor: "#f5c518", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 8 }}
                      onPress={() => {
                        const shuffled = [...VOCAB_LIST].sort(() => Math.random() - 0.5);
                        const next = shuffled[0];
                        const wrong = shuffled.slice(1, 4).map(w => w.d);
                        const choices = [next.d, ...wrong].sort(() => Math.random() - 0.5);
                        setQuizWord(next);
                        setQuizChoices(choices);
                        setQuizSelected(null);
                      }}>
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
                <TouchableOpacity onPress={() => setVocabMode(null)}>
                  <Text style={{ color: "#9aa4c7", fontSize: 16 }}>← Back</Text>
                </TouchableOpacity>
                <Text style={{ color: "#fff", fontWeight: "700" }}>My Progress</Text>
                <TouchableOpacity onPress={() => { setVocabModalVisible(false); setVocabMode(null); }}>
                  <Text style={{ color: "#9aa4c7", fontSize: 16 }}>✕</Text>
                </TouchableOpacity>
              </View>

              {(() => {
                const mastery = VOCAB_LIST.filter(v => vocabProgress[v.w] === "mastery").length;
                const proficient = VOCAB_LIST.filter(v => vocabProgress[v.w] === "proficient").length;
                const familiar = VOCAB_LIST.filter(v => vocabProgress[v.w] === "familiar").length;
                const unseen = VOCAB_LIST.length - mastery - proficient - familiar;
                const total = VOCAB_LIST.length;

                const tiers = [
                  { label: "Mastery", count: mastery, color: "#f5c518", bg: "#3a2a10" },
                  { label: "Proficient", count: proficient, color: "#4caf50", bg: "#1a3a2a" },
                  { label: "Familiar", count: familiar, color: "#60a5fa", bg: "#1a3a4a" },
                  { label: "Unseen", count: unseen, color: "#9aa4c7", bg: "#151c36" },
                ];

                return (
                  <ScrollView contentContainerStyle={{ padding: 20 }}>
                    <View style={{ backgroundColor: "#151c36", borderRadius: 16, padding: 20, marginBottom: 20 }}>
                      <Text style={{ color: "#fff", fontWeight: "800", fontSize: 18, marginBottom: 4 }}>
                        {mastery + proficient + familiar} / {total} words studied
                      </Text>
                      <Text style={{ color: "#9aa4c7", fontSize: 13, marginBottom: 16 }}>
                        {Math.round(((mastery + proficient + familiar) / total) * 100)}% of vocabulary covered
                      </Text>
                      <View style={{ height: 12, backgroundColor: "#2a3a5c", borderRadius: 6, overflow: "hidden", flexDirection: "row" }}>
                        {mastery > 0 && <View style={{ width: `${(mastery / total) * 100}%`, height: 12, backgroundColor: "#f5c518" }} />}
                        {proficient > 0 && <View style={{ width: `${(proficient / total) * 100}%`, height: 12, backgroundColor: "#4caf50" }} />}
                        {familiar > 0 && <View style={{ width: `${(familiar / total) * 100}%`, height: 12, backgroundColor: "#60a5fa" }} />}
                      </View>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                        {[["#f5c518","Mastery"],["#4caf50","Proficient"],["#60a5fa","Familiar"],["#2a3a5c","Unseen"]].map(([color, label]) => (
                          <View key={label} style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color }} />
                            <Text style={{ color: "#9aa4c7", fontSize: 11 }}>{label}</Text>
                          </View>
                        ))}
                      </View>
                    </View>

                    {tiers.map(({ label, count, color, bg }) => (
                      <View key={label} style={{ backgroundColor: bg, borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: color + "44" }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                          <Text style={{ color, fontWeight: "800", fontSize: 16 }}>{label}</Text>
                          <Text style={{ color, fontWeight: "800", fontSize: 22 }}>{count}</Text>
                        </View>
                        <View style={{ height: 6, backgroundColor: "#0b1020", borderRadius: 3, overflow: "hidden" }}>
                          <View style={{ width: `${(count / total) * 100}%`, height: 6, backgroundColor: color, borderRadius: 3 }} />
                        </View>
                        <Text style={{ color: "#9aa4c7", fontSize: 12, marginTop: 6 }}>
                          {Math.round((count / total) * 100)}% of all words
                        </Text>
                        {count > 0 && label !== "Unseen" && (
                          <View style={{ marginTop: 12, flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
                            {VOCAB_LIST.filter(v => vocabProgress[v.w] === label.toLowerCase()).slice(0, 20).map((v, i) => (
                              <View key={i} style={{ backgroundColor: "#0b1020", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}>
                                <Text style={{ color, fontSize: 12, fontWeight: "600" }}>{v.w}</Text>
                              </View>
                            ))}
                            {count > 20 && (
                              <View style={{ backgroundColor: "#0b1020", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}>
                                <Text style={{ color: "#475569", fontSize: 12 }}>+{count - 20} more</Text>
                              </View>
                            )}
                          </View>
                        )}
                      </View>
                    ))}
                  </ScrollView>
                );
              })()}
            </SafeAreaView>
          </Modal>
        )}
{/* ============ FULL LENGTH TEST MODAL ============ */}
<Modal visible={fullTestModalVisible} animationType="slide">
  <SafeAreaView style={{ flex: 1, backgroundColor: isLight ? "#f8fafc" : "#0b1020" }}>

    {/* INTRO PHASE */}
    {fullTestPhase === "intro" && (
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 60 }}>
        <TouchableOpacity onPress={() => setFullTestModalVisible(false)} style={{ marginBottom: 20 }}>
          <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 16 }}>✕ Close</Text>
        </TouchableOpacity>
        <Text style={{ color: isLight ? "#0f172a" : "#fff", fontSize: 26, fontWeight: "900", marginBottom: 8, letterSpacing: -0.5 }}>Full-Length Practice Test</Text>
        <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 15, lineHeight: 24, marginBottom: 28 }}>
          Each module is timed exactly like the real SAT. The timer auto-submits when time runs out. Pick a module to begin.
        </Text>

        <Text style={{ color: isLight ? "#1d4ed8" : "#60a5fa", fontWeight: "800", fontSize: 13, letterSpacing: 1.5, marginBottom: 12 }}>READING & WRITING</Text>
        {["rw1", "rw2"].map(key => {
          const config = FULL_TEST_CONFIG[key];
          const available = questionBank.filter(q => config.domains.includes(q.domain)).length;
          return (
            <TouchableOpacity key={key}
              style={{ backgroundColor: isLight ? "#fff" : "#0f1829", borderRadius: 16, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#1a2540", flexDirection: "row", alignItems: "center", gap: 14 }}
              onPress={() => startFullTest(key)}
            >
              <View style={{ width: 50, height: 50, borderRadius: 12, backgroundColor: isLight ? "#eff6ff" : "#0c1624", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: isLight ? "#1d4ed8" : "#60a5fa", fontWeight: "900", fontSize: 11, textAlign: "center" }}>R&W{"\n"}{key === "rw1" ? "M1" : "M2"}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700", fontSize: 15 }}>{config.label}</Text>
                <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 13, marginTop: 3 }}>{config.count} questions · {config.time / 60} minutes</Text>
                <Text style={{ color: isLight ? "#94a3b8" : "#475569", fontSize: 11, marginTop: 2 }}>{available} questions available</Text>
              </View>
              <Text style={{ color: isLight ? "#cbd5e1" : "#2a3a5c", fontSize: 20 }}>›</Text>
            </TouchableOpacity>
          );
        })}

        <Text style={{ color: isLight ? "#2563eb" : "#a78bfa", fontWeight: "800", fontSize: 13, letterSpacing: 1.5, marginBottom: 12, marginTop: 8 }}>MATH</Text>
        {["math1", "math2"].map(key => {
          const config = FULL_TEST_CONFIG[key];
          const available = questionBank.filter(q => config.domains.includes(q.domain)).length;
          return (
            <TouchableOpacity key={key}
              style={{ backgroundColor: isLight ? "#fff" : "#0f1829", borderRadius: 16, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#1a2540", flexDirection: "row", alignItems: "center", gap: 14 }}
              onPress={() => startFullTest(key)}
            >
              <View style={{ width: 50, height: 50, borderRadius: 12, backgroundColor: isLight ? "#faf5ff" : "#0e0c1a", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: isLight ? "#7c3aed" : "#a78bfa", fontWeight: "900", fontSize: 11, textAlign: "center" }}>MATH{"\n"}{key === "math1" ? "M1" : "M2"}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700", fontSize: 15 }}>{config.label}</Text>
                <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 13, marginTop: 3 }}>{config.count} questions · {config.time / 60} minutes</Text>
                <Text style={{ color: isLight ? "#94a3b8" : "#475569", fontSize: 11, marginTop: 2 }}>{available} questions available</Text>
              </View>
              <Text style={{ color: isLight ? "#cbd5e1" : "#2a3a5c", fontSize: 20 }}>›</Text>
            </TouchableOpacity>
          );
        })}

        <View style={{ backgroundColor: isLight ? "#f8fafc" : "#0f1829", borderRadius: 14, padding: 16, marginTop: 8, borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#1a2540" }}>
          <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 13, lineHeight: 22 }}>
            💡 <Text style={{ fontWeight: "700" }}>Tips:</Text> Find a quiet spot. Have scratch paper ready. The real SAT has a built-in Desmos calculator for math — tap the 📐 button during the test. When time runs out, the module auto-submits.
          </Text>
        </View>
      </ScrollView>
    )}

    {/* TESTING PHASE */}
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
          {/* Header */}
          <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: isLight ? "#e2e8f0" : "#1a2540", backgroundColor: isLight ? "#fff" : "#0b1020", gap: 8 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: isLight ? "#0f172a" : "#fff", fontSize: 13, fontWeight: "700" }} numberOfLines={1}>{config.label}</Text>
            </View>
            <View style={{ backgroundColor: isLowTime ? "#dc2626" : (isLight ? "#f1f5f9" : "#1a2540"), paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 }}>
              <Text style={{ color: isLowTime ? "#fff" : (isLight ? "#1e3a5f" : "#fff"), fontWeight: "800", fontSize: 16, fontVariant: ["tabular-nums"] }}>{timeStr}</Text>
            </View>
            <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 13, fontWeight: "600" }}>
              {Object.keys(fullTestAnswers).length}/{fullTestQuestions.length}
            </Text>
          </View>

          {/* Progress */}
          <View style={{ height: 3, backgroundColor: isLight ? "#e2e8f0" : "#1a2540" }}>
            <View style={{ height: 3, backgroundColor: isLight ? "#1d4ed8" : "#f5c518", width: `${((fullTestCurrentQ + 1) / fullTestQuestions.length) * 100}%` }} />
          </View>

          {/* Toolbar */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingVertical: 8, backgroundColor: isLight ? "#f8fafc" : "#0d1525", borderBottomWidth: 1, borderBottomColor: isLight ? "#e2e8f0" : "#1a2540" }}>
            <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700", fontSize: 13 }}>Q {fullTestCurrentQ + 1} of {fullTestQuestions.length}</Text>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6, borderWidth: 1, borderColor: fullTestMarked[fullTestCurrentQ] ? "#1d4ed8" : (isLight ? "#cbd5e1" : "#2a3a5c"), backgroundColor: fullTestMarked[fullTestCurrentQ] ? (isLight ? "#eff6ff" : "#0c1624") : "transparent" }}
              onPress={() => setFullTestMarked(prev => ({ ...prev, [fullTestCurrentQ]: !prev[fullTestCurrentQ] }))}
            >
              <Text style={{ fontSize: 12 }}>{fullTestMarked[fullTestCurrentQ] ? "🔖" : "🏳️"}</Text>
              <Text style={{ color: fullTestMarked[fullTestCurrentQ] ? "#1d4ed8" : (isLight ? "#475569" : "#9aa4c7"), fontSize: 12, fontWeight: "600" }}>
                {fullTestMarked[fullTestCurrentQ] ? "Marked" : "Mark"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
            <View style={{ backgroundColor: isLight ? "#f8fafc" : "#0f1829", borderRadius: 10, padding: 8, marginBottom: 12, alignSelf: "flex-start" }}>
              <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 11, fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.5 }}>{q.domain} · {q.difficulty}</Text>
            </View>
            <Text style={{ color: isLight ? "#0f172a" : "#fff", fontSize: 17, lineHeight: 30, marginBottom: 24, fontWeight: "400" }} selectable>{q.question}</Text>
            <View style={{ height: 1, backgroundColor: isLight ? "#e2e8f0" : "#1a2540", marginBottom: 18 }} />
            <Text style={{ color: isLight ? "#64748b" : "#64748b", fontSize: 12, fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 14 }}>Choose one answer</Text>
            {q.choices.map((c, i) => {
              const letter = ["A","B","C","D"][i];
              const isSelected = selectedAnswer === i;
              return (
                <TouchableOpacity key={i}
                  style={{ flexDirection: "row", alignItems: "flex-start", padding: 14, marginBottom: 10, borderRadius: 10, borderWidth: 1.5, borderColor: isSelected ? "#1d4ed8" : (isLight ? "#cbd5e1" : "#2a3a5c"), backgroundColor: isSelected ? (isLight ? "#eff6ff" : "#0c1624") : (isLight ? "#fff" : "#0f1829"), gap: 12 }}
                  onPress={() => setFullTestAnswers(prev => ({ ...prev, [fullTestCurrentQ]: i }))}
                  activeOpacity={0.7}
                >
                  <View style={{ width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: isSelected ? "#1d4ed8" : (isLight ? "#94a3b8" : "#475569"), backgroundColor: isSelected ? "#1d4ed8" : "transparent", justifyContent: "center", alignItems: "center", flexShrink: 0 }}>
                    <Text style={{ color: isSelected ? "#fff" : (isLight ? "#475569" : "#9aa4c7"), fontWeight: "700", fontSize: 13 }}>{letter}</Text>
                  </View>
                  <Text style={{ color: isSelected ? (isLight ? "#1d4ed8" : "#fff") : (isLight ? "#1e293b" : "#e2e8f0"), fontSize: 15, lineHeight: 24, flex: 1, paddingTop: 4, fontWeight: isSelected ? "600" : "400" }}>{c}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Bottom nav */}
          <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12, backgroundColor: isLight ? "#fff" : "#0b1020", borderTopWidth: 1, borderTopColor: isLight ? "#e2e8f0" : "#1a2540", gap: 10 }}>
            <TouchableOpacity
              style={{ flex: 1, paddingVertical: 13, borderRadius: 8, alignItems: "center", borderWidth: 1.5, borderColor: isLight ? "#cbd5e1" : "#2a3a5c", opacity: fullTestCurrentQ === 0 ? 0.35 : 1 }}
              onPress={() => setFullTestCurrentQ(p => Math.max(0, p - 1))}
              disabled={fullTestCurrentQ === 0}
            >
              <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontWeight: "700" }}>← Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ paddingHorizontal: 16, paddingVertical: 10, borderRadius: 22, backgroundColor: isLight ? "#f1f5f9" : "#1a2540", flexDirection: "row", alignItems: "center", gap: 4 }}
              onPress={() => setFullTestNavigator(true)}
            >
              <Text style={{ color: isLight ? "#1e3a5f" : "#fff", fontWeight: "700", fontSize: 13 }}>{fullTestCurrentQ + 1}/{fullTestQuestions.length}</Text>
              <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 11 }}>▾</Text>
            </TouchableOpacity>

            {fullTestCurrentQ < fullTestQuestions.length - 1 ? (
              <TouchableOpacity
                style={{ flex: 1, paddingVertical: 13, borderRadius: 8, alignItems: "center", backgroundColor: "#1e3a5f" }}
                onPress={() => setFullTestCurrentQ(p => p + 1)}
              >
                <Text style={{ color: "#fff", fontWeight: "700" }}>Next →</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{ flex: 1, paddingVertical: 13, borderRadius: 8, alignItems: "center", backgroundColor: "#16a34a" }}
                onPress={submitFullTest}
              >
                <Text style={{ color: "#fff", fontWeight: "700" }}>Submit ✓</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Navigator modal */}
          <Modal visible={fullTestNavigator} transparent animationType="slide">
            <View style={{ flex: 1, backgroundColor: "rgba(15,23,42,0.4)", justifyContent: "flex-end" }}>
              <View style={{ backgroundColor: isLight ? "#fff" : "#0f1829", borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 36 }}>
                <View style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: isLight ? "#cbd5e1" : "#2a3a5c", alignSelf: "center", marginBottom: 18 }} />
                <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700", fontSize: 16, marginBottom: 16, textAlign: "center" }}>Question Navigator</Text>
                <ScrollView style={{ maxHeight: 260 }} contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "center", paddingBottom: 8 }}>
                  {fullTestQuestions.map((_, i) => {
                    const answered = fullTestAnswers[i] !== undefined;
                    const isCurrent = i === fullTestCurrentQ;
                    const flagged = fullTestMarked[i];
                    return (
                      <TouchableOpacity key={i}
                        style={{ width: 42, height: 42, borderRadius: 21, borderWidth: 1.5, borderColor: isCurrent ? "#1e3a5f" : answered ? "#1d4ed8" : flagged ? "#1d4ed8" : (isLight ? "#94a3b8" : "#475569"), backgroundColor: isCurrent ? "#1e3a5f" : answered ? "#1d4ed8" : flagged ? (isLight ? "#eff6ff" : "#0c1624") : (isLight ? "#f8fafc" : "#0f1829"), justifyContent: "center", alignItems: "center" }}
                        onPress={() => { setFullTestCurrentQ(i); setFullTestNavigator(false); }}
                      >
                        <Text style={{ color: (isCurrent || answered) ? "#fff" : flagged ? "#1d4ed8" : (isLight ? "#475569" : "#9aa4c7"), fontWeight: "700", fontSize: 13 }}>{i + 1}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
                <TouchableOpacity style={{ backgroundColor: "#1e3a5f", padding: 14, borderRadius: 10, alignItems: "center", marginTop: 16 }} onPress={() => setFullTestNavigator(false)}>
                  <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      );
    })()}

    {/* RESULTS PHASE */}
    {fullTestPhase === "results" && fullTestQuestions.length > 0 && (() => {
      const config = FULL_TEST_CONFIG[fullTestSection];
      let correct = 0;
      fullTestQuestions.forEach((q, i) => { if (fullTestAnswers[i] === q.answer) correct++; });
      const pct = Math.round((correct / fullTestQuestions.length) * 100);
      const color = pct >= 80 ? "#16a34a" : pct >= 60 ? "#d97706" : "#dc2626";

      return (
        <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 60 }}>
          <Text style={{ color: isLight ? "#0f172a" : "#fff", fontSize: 24, fontWeight: "900", marginBottom: 4 }}>Module Complete</Text>
          <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 14, marginBottom: 24 }}>{config.label}</Text>

          <View style={{ backgroundColor: isLight ? "#f8fafc" : "#0f1829", borderRadius: 20, padding: 28, alignItems: "center", marginBottom: 20, borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#1a2540" }}>
            <Text style={{ color, fontSize: 64, fontWeight: "900", letterSpacing: -2 }}>{correct}/{fullTestQuestions.length}</Text>
            <Text style={{ color, fontSize: 28, fontWeight: "600", marginTop: 4 }}>{pct}%</Text>
            <View style={{ backgroundColor: color, paddingHorizontal: 18, paddingVertical: 6, borderRadius: 20, marginTop: 14 }}>
              <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>
                {pct >= 80 ? "Excellent!" : pct >= 60 ? "Good work!" : "Keep practicing!"}
              </Text>
            </View>
          </View>

          {/* Domain breakdown */}
          {(() => {
            const domainMap = {};
            fullTestQuestions.forEach((q, i) => {
              if (!domainMap[q.domain]) domainMap[q.domain] = { correct: 0, total: 0 };
              domainMap[q.domain].total++;
              if (fullTestAnswers[i] === q.answer) domainMap[q.domain].correct++;
            });
            return (
              <View style={{ backgroundColor: isLight ? "#fff" : "#0f1829", borderRadius: 16, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#1a2540" }}>
                <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700", fontSize: 15, marginBottom: 14 }}>By Domain</Text>
                {Object.entries(domainMap).map(([name, s]) => {
                  const acc = Math.round((s.correct / s.total) * 100);
                  const c = acc >= 80 ? "#16a34a" : acc >= 60 ? "#d97706" : "#dc2626";
                  return (
                    <View key={name} style={{ marginBottom: 12 }}>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                        <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 12 }} numberOfLines={1}>{name}</Text>
                        <Text style={{ color: c, fontWeight: "700", fontSize: 12 }}>{acc}% ({s.correct}/{s.total})</Text>
                      </View>
                      <View style={{ height: 6, backgroundColor: isLight ? "#e2e8f0" : "#1a2540", borderRadius: 3, overflow: "hidden" }}>
                        <View style={{ height: 6, width: `${acc}%`, backgroundColor: c, borderRadius: 3 }} />
                      </View>
                    </View>
                  );
                })}
              </View>
            );
          })()}

          {/* Answer review */}
          <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700", fontSize: 15, marginBottom: 12 }}>Answer Review</Text>
          {fullTestQuestions.map((q, i) => {
            const userAns = fullTestAnswers[i] ?? -1;
            const isCorrect = userAns === q.answer;
            return (
              <View key={i} style={{ backgroundColor: isLight ? "#fff" : "#0f1829", borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: isCorrect ? (isLight ? "#bbf7d0" : "#1a3a2a") : (isLight ? "#fecaca" : "#3a1a1a"), borderLeftWidth: 4, borderLeftColor: isCorrect ? "#16a34a" : "#dc2626" }}>
                <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 11, fontWeight: "600", marginBottom: 6 }}>Q{i + 1} · {q.domain}</Text>
                <Text style={{ color: isLight ? "#0f172a" : "#fff", fontSize: 14, lineHeight: 22, marginBottom: 10 }} numberOfLines={3}>{q.question}</Text>
                <Text style={{ color: isCorrect ? "#16a34a" : "#dc2626", fontSize: 13, fontWeight: "700", marginBottom: 4 }}>
                  {isCorrect ? "✅ Correct" : `❌ Your answer: ${userAns === -1 ? "Skipped" : `${["A","B","C","D"][userAns]}. ${q.choices[userAns]}`}`}
                </Text>
                {!isCorrect && <Text style={{ color: isLight ? "#16a34a" : "#4ade80", fontSize: 13, fontWeight: "600", marginBottom: 6 }}>Correct: {["A","B","C","D"][q.answer]}. {q.choices[q.answer]}</Text>}
                <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 12, lineHeight: 20, fontStyle: "italic" }}>💡 {q.explanation}</Text>
              </View>
            );
          })}

          <TouchableOpacity style={{ backgroundColor: "#1e3a5f", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 8, marginBottom: 10 }}
            onPress={() => setFullTestPhase("intro")}>
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>Take Another Module</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: isLight ? "#f1f5f9" : "#151c36", padding: 16, borderRadius: 12, alignItems: "center", borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#2a3a5c" }}
            onPress={() => setFullTestModalVisible(false)}>
            <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700", fontSize: 16 }}>Back to Home</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    })()}

  </SafeAreaView>
</Modal>

        {/* ============ NEW BADGE ALERT ============ */}
{newBadgeAlert && (
  <View style={{
    position: "absolute", top: 60, left: 20, right: 20, zIndex: 9999,
    backgroundColor: "#1a1400", borderRadius: 16, padding: 16,
    borderWidth: 2, borderColor: "#f5c518",
    flexDirection: "row", alignItems: "center", gap: 14,
    shadowColor: "#f5c518", shadowOpacity: 0.4, shadowRadius: 20, shadowOffset: { width: 0, height: 4 },
    elevation: 20,
  }}>
    <Text style={{ fontSize: 40 }}>{newBadgeAlert.icon}</Text>
    <View style={{ flex: 1 }}>
      <Text style={{ color: "#f5c518", fontWeight: "800", fontSize: 14 }}>Badge Unlocked!</Text>
      <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>{newBadgeAlert.name}</Text>
      <Text style={{ color: "#9aa4c7", fontSize: 12, marginTop: 2 }}>{newBadgeAlert.desc}</Text>
    </View>
  </View>
)}

        {/* ============ BADGES MODAL ============ */}
<Modal visible={badgesModalVisible} animationType="slide">
  <SafeAreaView style={{ flex: 1, backgroundColor: isLight ? "#f8fafc" : "#0b1020" }}>
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: isLight ? "#e2e8f0" : "#151c36" }}>
      <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "800", fontSize: 18 }}>🏅 Badges</Text>
      <TouchableOpacity onPress={() => setBadgesModalVisible(false)}>
        <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 16 }}>✕ Close</Text>
      </TouchableOpacity>
    </View>

    <View style={{ padding: 16, backgroundColor: isLight ? "#fff" : "#0f1829", borderBottomWidth: 1, borderBottomColor: isLight ? "#e2e8f0" : "#151c36", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 14 }}>
        <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "800", fontSize: 22 }}>{badges.length}</Text>
        {" "}/ {BADGE_DEFINITIONS.length} earned
      </Text>
      <View style={{ height: 10, width: 140, backgroundColor: isLight ? "#e2e8f0" : "#1a2540", borderRadius: 5, overflow: "hidden" }}>
        <View style={{ height: 10, width: `${(badges.length / BADGE_DEFINITIONS.length) * 100}%`, backgroundColor: "#f5c518", borderRadius: 5 }} />
      </View>
    </View>

    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
        {BADGE_DEFINITIONS.map((badge) => {
          const earned = badges.includes(badge.id);
          return (
            <View key={badge.id} style={{
              width: "47%",
              backgroundColor: earned ? (isLight ? "#fffbeb" : "#1a1400") : (isLight ? "#f8fafc" : "#0f1829"),
              borderRadius: 14, padding: 16, alignItems: "center",
              borderWidth: 2, borderColor: earned ? "#f5c518" : (isLight ? "#e2e8f0" : "#1a2540"),
              opacity: earned ? 1 : 0.5,
            }}>
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

        {/* ============ FORMULA SHEET MODAL ============ */}
<Modal visible={formulaSheetVisible} animationType="slide">
  <SafeAreaView style={{ flex: 1, backgroundColor: isLight ? "#f8fafc" : "#0b1020" }}>
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: isLight ? "#e2e8f0" : "#151c36" }}>
      <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "800", fontSize: 18 }}>📐 SAT Formula Sheet</Text>
      <TouchableOpacity onPress={() => setFormulaSheetVisible(false)}>
        <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 16 }}>✕ Close</Text>
      </TouchableOpacity>
    </View>
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>

      {[
        {
          section: "Geometry",
          color: "#3b82f6",
          formulas: [
            { name: "Area of Circle", formula: "A = πr²", note: "r = radius" },
            { name: "Circumference", formula: "C = 2πr = πd", note: "d = diameter" },
            { name: "Area of Triangle", formula: "A = ½bh", note: "b = base, h = height" },
            { name: "Area of Rectangle", formula: "A = lw", note: "" },
            { name: "Area of Trapezoid", formula: "A = ½(b₁ + b₂)h", note: "" },
            { name: "Pythagorean Theorem", formula: "a² + b² = c²", note: "c = hypotenuse" },
            { name: "Distance Formula", formula: "d = √((x₂-x₁)² + (y₂-y₁)²)", note: "" },
            { name: "Midpoint Formula", formula: "M = ((x₁+x₂)/2, (y₁+y₂)/2)", note: "" },
            { name: "Circle Equation", formula: "(x-h)² + (y-k)² = r²", note: "Center (h,k), radius r" },
          ]
        },
        {
          section: "Volume",
          color: "#8b5cf6",
          formulas: [
            { name: "Volume of Sphere", formula: "V = (4/3)πr³", note: "" },
            { name: "Volume of Cone", formula: "V = (1/3)πr²h", note: "" },
            { name: "Volume of Cylinder", formula: "V = πr²h", note: "" },
            { name: "Volume of Rectangular Prism", formula: "V = lwh", note: "" },
            { name: "Volume of Pyramid", formula: "V = (1/3)Bh", note: "B = base area" },
          ]
        },
        {
          section: "Algebra",
          color: "#f59e0b",
          formulas: [
            { name: "Slope Formula", formula: "m = (y₂-y₁)/(x₂-x₁)", note: "" },
            { name: "Slope-Intercept Form", formula: "y = mx + b", note: "m = slope, b = y-intercept" },
            { name: "Standard Form", formula: "Ax + By = C", note: "" },
            { name: "Point-Slope Form", formula: "y - y₁ = m(x - x₁)", note: "" },
            { name: "Quadratic Formula", formula: "x = (-b ± √(b²-4ac)) / 2a", note: "For ax² + bx + c = 0" },
            { name: "Discriminant", formula: "b² - 4ac", note: ">0: two roots, =0: one root, <0: no real roots" },
            { name: "Vertex of Parabola", formula: "x = -b/2a", note: "Then plug in for y" },
            { name: "Vertex Form", formula: "y = a(x-h)² + k", note: "Vertex = (h, k)" },
            { name: "FOIL", formula: "(a+b)(c+d) = ac+ad+bc+bd", note: "" },
            { name: "Difference of Squares", formula: "a²-b² = (a+b)(a-b)", note: "" },
            { name: "Perfect Square", formula: "(a+b)² = a²+2ab+b²", note: "" },
          ]
        },
        {
          section: "Trigonometry",
          color: "#10b981",
          formulas: [
            { name: "SOH-CAH-TOA", formula: "sin=O/H  cos=A/H  tan=O/A", note: "O=opposite, A=adjacent, H=hypotenuse" },
            { name: "Pythagorean Identity", formula: "sin²θ + cos²θ = 1", note: "" },
            { name: "Complementary Angles", formula: "sin(x) = cos(90° - x)", note: "" },
            { name: "30-60-90 Triangle", formula: "Sides: x, x√3, 2x", note: "Opposite 30°, 60°, 90°" },
            { name: "45-45-90 Triangle", formula: "Sides: x, x, x√2", note: "" },
            { name: "Arc Length", formula: "L = (θ/360) × 2πr", note: "θ in degrees" },
            { name: "Sector Area", formula: "A = (θ/360) × πr²", note: "" },
          ]
        },
        {
          section: "Statistics & Probability",
          color: "#ef4444",
          formulas: [
            { name: "Mean", formula: "x̄ = Σx / n", note: "Sum of values ÷ count" },
            { name: "Probability", formula: "P = favorable / total", note: "" },
            { name: "Percentage Change", formula: "% change = (new-old)/old × 100", note: "" },
            { name: "Simple Interest", formula: "I = Prt", note: "P=principal, r=rate, t=time" },
            { name: "Compound Interest", formula: "A = P(1 + r/n)^(nt)", note: "" },
            { name: "Exponential Growth", formula: "y = a(1+r)^t", note: "" },
            { name: "Exponential Decay", formula: "y = a(1-r)^t", note: "" },
          ]
        },
        {
          section: "Special Right Triangles",
          color: "#f97316",
          formulas: [
            { name: "3-4-5 Triangle", formula: "3² + 4² = 5²", note: "Multiples also work: 6-8-10" },
            { name: "5-12-13 Triangle", formula: "5² + 12² = 13²", note: "" },
            { name: "8-15-17 Triangle", formula: "8² + 15² = 17²", note: "" },
            { name: "7-24-25 Triangle", formula: "7² + 24² = 25²", note: "" },
          ]
        },
      ].map((group, gi) => (
        <View key={gi} style={{ marginBottom: 24 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <View style={{ width: 4, height: 20, borderRadius: 2, backgroundColor: group.color }} />
            <Text style={{ color: group.color, fontWeight: "800", fontSize: 16, letterSpacing: 0.3 }}>{group.section}</Text>
          </View>
          {group.formulas.map((f, fi) => (
            <View key={fi} style={{
              backgroundColor: isLight ? "#ffffff" : "#0f1829",
              borderRadius: 12, padding: 14, marginBottom: 8,
              borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#1a2540",
              borderLeftWidth: 3, borderLeftColor: group.color,
            }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 6 }}>
                <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 12, fontWeight: "600", flex: 1 }}>{f.name}</Text>
                <Text style={{ color: isLight ? "#0f172a" : "#fff", fontSize: 15, fontWeight: "800", textAlign: "right" }}>{f.formula}</Text>
              </View>
              {f.note ? <Text style={{ color: isLight ? "#64748b" : "#475569", fontSize: 11, marginTop: 5, fontStyle: "italic" }}>{f.note}</Text> : null}
            </View>
          ))}
        </View>
      ))}

    </ScrollView>
  </SafeAreaView>
</Modal>

        {/* ============ WEEKLY SUMMARY MODAL ============ */}
<Modal visible={weeklySummaryVisible} animationType="slide" transparent>
  <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center", padding: 20 }}>
    <View style={{ backgroundColor: isLight ? "#ffffff" : "#0f1829", borderRadius: 20, padding: 24, borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#1a2540", maxHeight: "85%" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <Text style={{ color: isLight ? "#0f172a" : "#fff", fontSize: 18, fontWeight: "800" }}>📅 This Week</Text>
        <TouchableOpacity onPress={() => setWeeklySummaryVisible(false)}>
          <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 22 }}>✕</Text>
        </TouchableOpacity>
      </View>

      {(() => {
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        const weekEntries = scoreHistory.filter(entry => {
          const d = entry.createdAt?.toDate ? entry.createdAt.toDate() : null;
          return d && d >= startOfWeek;
        });

        const totalQ = weekEntries.reduce((s, e) => s + (e.total || 0), 0);
        const totalCorrect = weekEntries.reduce((s, e) => s + (e.score || 0), 0);
        const avgPct = weekEntries.length > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;
        const activeDays = new Set(weekEntries.map(e => {
          const d = e.createdAt?.toDate ? e.createdAt.toDate() : null;
          return d ? d.toISOString().split("T")[0] : null;
        }).filter(Boolean)).size;

        const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dayActivity = dayLabels.map((label, i) => {
          const day = new Date(startOfWeek);
          day.setDate(startOfWeek.getDate() + i);
          const dayStr = day.toISOString().split("T")[0];
          const dayEntries = weekEntries.filter(e => {
            const d = e.createdAt?.toDate ? e.createdAt.toDate() : null;
            return d && d.toISOString().split("T")[0] === dayStr;
          });
          const questions = dayEntries.reduce((s, e) => s + (e.total || 0), 0);
          return { label, questions, isToday: i === now.getDay() };
        });

        const maxQ = Math.max(...dayActivity.map(d => d.questions), 1);

        const domainAccuracy = {};
        weekEntries.forEach(entry => {
          if (!entry.questions) return;
          entry.questions.forEach(q => {
            if (!domainAccuracy[q.domain]) domainAccuracy[q.domain] = { correct: 0, total: 0 };
            domainAccuracy[q.domain].total++;
            if (q.userAnswer === q.correctAnswer) domainAccuracy[q.domain].correct++;
          });
        });
        const topDomains = Object.entries(domainAccuracy)
          .map(([name, s]) => ({ name, acc: Math.round((s.correct / s.total) * 100), total: s.total }))
          .sort((a, b) => b.total - a.total)
          .slice(0, 4);

        return (
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Stats row */}
            <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
              {[
                { val: weekEntries.length, label: "Quizzes", color: isLight ? "#1d4ed8" : "#60a5fa" },
                { val: totalQ, label: "Questions", color: isLight ? "#1d4ed8" : "#60a5fa" },
                { val: weekEntries.length > 0 ? `${avgPct}%` : "—", label: "Avg Score", color: avgPct >= 80 ? "#16a34a" : avgPct >= 60 ? "#d97706" : "#dc2626" },
                { val: activeDays, label: "Active Days", color: isLight ? "#1d4ed8" : "#f5c518" },
              ].map(({ val, label, color }) => (
                <View key={label} style={{ flex: 1, backgroundColor: isLight ? "#f8fafc" : "#151c36", borderRadius: 12, padding: 12, alignItems: "center", borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#1a2540" }}>
                  <Text style={{ color, fontSize: 20, fontWeight: "800" }}>{val}</Text>
                  <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 10, marginTop: 3, textAlign: "center", fontWeight: "600" }}>{label}</Text>
                </View>
              ))}
            </View>

            {/* Day activity chart */}
            <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700", fontSize: 14, marginBottom: 12 }}>Daily Activity</Text>
            <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 6, marginBottom: 20, height: 80 }}>
              {dayActivity.map((day, i) => {
                const barH = Math.max(4, (day.questions / maxQ) * 64);
                return (
                  <View key={i} style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", height: 80 }}>
                    <View style={{
                      width: "100%", height: barH, borderRadius: 5,
                      backgroundColor: day.isToday ? (isLight ? "#1d4ed8" : "#f5c518") : day.questions > 0 ? (isLight ? "#93c5fd" : "#1e3a6e") : (isLight ? "#e2e8f0" : "#1a2540"),
                    }} />
                    <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 10, marginTop: 5, fontWeight: day.isToday ? "800" : "500" }}>{day.label}</Text>
                    {day.questions > 0 && <Text style={{ color: isLight ? "#475569" : "#475569", fontSize: 9 }}>{day.questions}q</Text>}
                  </View>
                );
              })}
            </View>

            {/* Domain breakdown */}
            {topDomains.length > 0 && (
              <>
                <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700", fontSize: 14, marginBottom: 12 }}>Domains Practiced</Text>
                {topDomains.map((d, i) => (
                  <View key={i} style={{ marginBottom: 10 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                      <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 12 }} numberOfLines={1}>{d.name}</Text>
                      <Text style={{ color: d.acc >= 80 ? "#16a34a" : d.acc >= 60 ? "#d97706" : "#dc2626", fontWeight: "700", fontSize: 12 }}>{d.acc}% ({d.total}q)</Text>
                    </View>
                    <View style={{ height: 6, backgroundColor: isLight ? "#e2e8f0" : "#1a2540", borderRadius: 3, overflow: "hidden" }}>
                      <View style={{ height: 6, width: `${d.acc}%`, backgroundColor: d.acc >= 80 ? "#16a34a" : d.acc >= 60 ? "#d97706" : "#dc2626", borderRadius: 3 }} />
                    </View>
                  </View>
                ))}
              </>
            )}

            {weekEntries.length === 0 && (
              <View style={{ alignItems: "center", paddingVertical: 20 }}>
                <Text style={{ fontSize: 40, marginBottom: 10 }}>📚</Text>
                <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700", fontSize: 16, marginBottom: 6 }}>No activity yet this week</Text>
                <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 13, textAlign: "center" }}>Complete a practice session to see your weekly stats here.</Text>
              </View>
            )}

            {/* Streak reminder */}
            <View style={{ backgroundColor: isLight ? "#fffbeb" : "#1a1400", borderRadius: 12, padding: 14, marginTop: 8, borderWidth: 1, borderColor: isLight ? "#fde68a" : "#2a2000", flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Text style={{ fontSize: 24 }}>🔥</Text>
              <View>
                <Text style={{ color: isLight ? "#92400e" : "#f5c518", fontWeight: "700", fontSize: 14 }}>{streakData.currentStreak} day streak</Text>
                <Text style={{ color: isLight ? "#a16207" : "#a37c00", fontSize: 12 }}>Best: {streakData.longestStreak || 0} days</Text>
              </View>
            </View>
          </ScrollView>
        );
      })()}
    </View>
  </View>
</Modal>

        {/* ============ FEEDBACK MODAL ============ */}
<Modal visible={feedbackModalVisible} animationType="slide" transparent>
  <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center", padding: 20 }}>
    <View style={{ backgroundColor: isLight ? "#ffffff" : "#0f1829", borderRadius: 20, padding: 24, borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#1a2540" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <Text style={{ color: isLight ? "#0f172a" : "#fff", fontSize: 18, fontWeight: "800" }}>📝 Give Feedback</Text>
        <TouchableOpacity onPress={() => setFeedbackModalVisible(false)}>
          <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 22 }}>✕</Text>
        </TouchableOpacity>
      </View>

      {feedbackSent ? (
        <View style={{ alignItems: "center", paddingVertical: 20 }}>
          <Text style={{ fontSize: 48 }}>🙏</Text>
          <Text style={{ color: "#4caf50", fontSize: 20, fontWeight: "800", marginTop: 12 }}>Thank you!</Text>
          <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 14, textAlign: "center", marginTop: 8 }}>Your feedback helps make AscendSAT better for everyone.</Text>
          <TouchableOpacity style={{ backgroundColor: isLight ? "#e2e8f0" : "#1f2a52", padding: 14, borderRadius: 12, marginTop: 20, width: "100%", alignItems: "center" }} onPress={() => setFeedbackModalVisible(false)}>
            <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700" }}>Close</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 13, marginBottom: 10 }}>What's this about?</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            {["general", "questions", "features", "bug", "classes", "other"].map(cat => (
              <TouchableOpacity key={cat}
                style={{ paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1.5, borderColor: feedbackCategory === cat ? (isLight ? "#1d4ed8" : "#f5c518") : isLight ? "#cbd5e1" : "#2a3a5c", backgroundColor: feedbackCategory === cat ? (isLight ? "#eff6ff" : "#2a2a10") : isLight ? "#f1f5f9" : "#151c36" }}
                onPress={() => setFeedbackCategory(cat)}>
                <Text style={{ color: feedbackCategory === cat ? (isLight ? "#1d4ed8" : "#f5c518") : isLight ? "#475569" : "#9aa4c7", fontSize: 13, fontWeight: "600", textTransform: "capitalize" }}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 13, marginBottom: 10 }}>Overall rating</Text>
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 20, justifyContent: "center" }}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity key={star} onPress={() => setFeedbackRating(star)}>
                <Text style={{ fontSize: 36, opacity: feedbackRating >= star ? 1 : 0.25 }}>⭐</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 13, marginBottom: 8 }}>Tell us more (required)</Text>
          <TextInput
            style={{ backgroundColor: isLight ? "#f1f5f9" : "#151c36", color: isLight ? "#0f172a" : "#fff", padding: 14, borderRadius: 12, height: 100, textAlignVertical: "top", fontSize: 14, marginBottom: 20, borderWidth: 1, borderColor: isLight ? "#cbd5e1" : "#2a3a5c" }}
            placeholder="What's working well? What could be better?"
            placeholderTextColor={isLight ? "#94a3b8" : "#475569"}
            value={feedbackText}
            onChangeText={setFeedbackText}
            multiline
          />

          <TouchableOpacity
            style={{ backgroundColor: isLight ? "#1d4ed8" : "#f5c518", padding: 16, borderRadius: 12, alignItems: "center", opacity: (!feedbackRating || !feedbackText.trim() || feedbackSending) ? 0.4 : 1 }}
            onPress={submitFeedback}
            disabled={!feedbackRating || !feedbackText.trim() || feedbackSending}
          >
            <Text style={{ color: isLight ? "#fff" : "#070d1f", fontWeight: "800", fontSize: 16 }}>
              {feedbackSending ? "Sending..." : "Submit Feedback"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  </View>
</Modal>

        {/* ============ DIAGNOSTIC MODAL ============ */}
        <Modal visible={diagnosticModalVisible} animationType="slide" transparent>
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center", padding: 20 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
              <View style={{ backgroundColor: isLight ? "#ffffff" : "#0f1829", borderRadius: 20, padding: 24, borderWidth: 1, borderColor: isLight ? "#e2e8f0" : "#1a2540" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <Text style={{ color: isLight ? "#0f172a" : "#fff", fontSize: 18, fontWeight: "800" }}>
                    {diagStep === 1 ? "📋 Enter Your Scores" : diagStep === 2 ? "📊 Domain Breakdown" : "🗺 Your Study Plan"}
                  </Text>
                  <TouchableOpacity onPress={() => setDiagnosticModalVisible(false)}>
                    <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 22 }}>✕</Text>
                  </TouchableOpacity>
                </View>

                {diagStep === 1 && (
                  <>
                    <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 14, marginBottom: 20 }}>Enter your SAT section scores from Bluebook or your official score report.</Text>
                    <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700", marginBottom: 6 }}>Math Score (200–800)</Text>
                    <TextInput
                      style={{ backgroundColor: isLight ? "#f1f5f9" : "#151c36", color: "#f5c518", fontSize: 28, fontWeight: "700", textAlign: "center", padding: 16, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: isLight ? "#cbd5e1" : "#2a3a5c" }}
                      value={diagMathScore}
                      onChangeText={v => setDiagMathScore(v.replace(/[^0-9]/g, "").slice(0, 3))}
                      keyboardType="numeric"
                      placeholder="e.g. 620"
                      placeholderTextColor="#94a3b8"
                    />
                    <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700", marginBottom: 6 }}>Reading & Writing Score (200–800)</Text>
                    <TextInput
                      style={{ backgroundColor: isLight ? "#f1f5f9" : "#151c36", color: "#f5c518", fontSize: 28, fontWeight: "700", textAlign: "center", padding: 16, borderRadius: 12, marginBottom: 24, borderWidth: 1, borderColor: isLight ? "#cbd5e1" : "#2a3a5c" }}
                      value={diagRWScore}
                      onChangeText={v => setDiagRWScore(v.replace(/[^0-9]/g, "").slice(0, 3))}
                      keyboardType="numeric"
                      placeholder="e.g. 580"
                      placeholderTextColor="#94a3b8"
                    />
                    {diagMathScore && diagRWScore && (
                      <View style={{ backgroundColor: isLight ? "#f1f5f9" : "#151c36", borderRadius: 12, padding: 14, marginBottom: 20, alignItems: "center", borderWidth: 1, borderColor: isLight ? "#cbd5e1" : "#2a3a5c" }}>
                        <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 13 }}>Estimated Total Score</Text>
                        <Text style={{ color: "#f5c518", fontSize: 36, fontWeight: "800" }}>{Number(diagMathScore) + Number(diagRWScore)}</Text>
                      </View>
                    )}
                    <TouchableOpacity
                      style={{ backgroundColor: isLight ? "#1d4ed8" : "#f5c518", padding: 16, borderRadius: 12, alignItems: "center", opacity: diagMathScore && diagRWScore ? 1 : 0.4 }}
                      disabled={!diagMathScore || !diagRWScore}
                      onPress={() => setDiagStep(2)}>
                      <Text style={{ color: "#fff", fontWeight: "800", fontSize: 16 }}>Next: Domain Breakdown →</Text>
                    </TouchableOpacity>
                  </>
                )}

                {diagStep === 2 && (
                  <>
                    <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 13, marginBottom: 16 }}>From your Bluebook score report, tap to fill in how many bars (1–7) you got for each domain.</Text>
                    <Text style={{ color: "#60a5fa", fontWeight: "700", marginBottom: 10 }}>📐 Math Domains</Text>
                    {[
                      { key: "algebra", label: "Algebra" },
                      { key: "advancedMath", label: "Advanced Math" },
                      { key: "dataAnalysis", label: "Problem Solving and Data Analysis" },
                      { key: "geometry", label: "Geometry & Trigonometry" },
                    ].map(({ key, label }) => (
                      <View key={key} style={{ marginBottom: 14 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                          <Text style={{ color: isLight ? "#0f172a" : "#fff", fontSize: 14 }}>{label}</Text>
                          <Text style={{ color: getBarLabel(diagBars[key]).color, fontWeight: "700", fontSize: 12 }}>
                            {diagBars[key]}/7 — {diagBars[key] > 0 ? getBarLabel(diagBars[key]).label : "Not set"}
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: 4 }}>
                          {[1,2,3,4,5,6,7].map(n => (
                            <TouchableOpacity key={n}
                              style={{ flex: 1, height: 28, borderRadius: 4, backgroundColor: diagBars[key] >= n ? getBarLabel(n).color : isLight ? "#e2e8f0" : "#1f2a52", borderWidth: 1, borderColor: isLight ? "#cbd5e1" : "#2a3a5c" }}
                              onPress={() => setDiagBars(prev => ({ ...prev, [key]: n }))} />
                          ))}
                        </View>
                      </View>
                    ))}
                    <Text style={{ color: "#4caf50", fontWeight: "700", marginBottom: 10, marginTop: 6 }}>📝 Reading & Writing Domains</Text>
                    {[
                      { key: "infoIdeas", label: "Information & Ideas" },
                      { key: "craftStructure", label: "Craft & Structure" },
                      { key: "expressionIdeas", label: "Expression of Ideas" },
                      { key: "englishConventions", label: "Standard English Conv." },
                    ].map(({ key, label }) => (
                      <View key={key} style={{ marginBottom: 14 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                          <Text style={{ color: isLight ? "#0f172a" : "#fff", fontSize: 14 }}>{label}</Text>
                          <Text style={{ color: getBarLabel(diagBars[key]).color, fontWeight: "700", fontSize: 12 }}>
                            {diagBars[key]}/7 — {diagBars[key] > 0 ? getBarLabel(diagBars[key]).label : "Not set"}
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: 4 }}>
                          {[1,2,3,4,5,6,7].map(n => (
                            <TouchableOpacity key={n}
                              style={{ flex: 1, height: 28, borderRadius: 4, backgroundColor: diagBars[key] >= n ? getBarLabel(n).color : isLight ? "#e2e8f0" : "#1f2a52", borderWidth: 1, borderColor: isLight ? "#cbd5e1" : "#2a3a5c" }}
                              onPress={() => setDiagBars(prev => ({ ...prev, [key]: n }))} />
                          ))}
                        </View>
                      </View>
                    ))}
                    <View style={{ flexDirection: "row", gap: 10, marginTop: 8 }}>
                      <TouchableOpacity style={{ flex: 1, backgroundColor: isLight ? "#e2e8f0" : "#1f2a52", padding: 14, borderRadius: 12, alignItems: "center" }} onPress={() => setDiagStep(1)}>
                        <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700" }}>← Back</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{ flex: 2, backgroundColor: "#f5c518", padding: 14, borderRadius: 12, alignItems: "center" }}
                        onPress={() => { setStudyPlan(generateStudyPlan()); setDiagStep(3); }}>
                        <Text style={{ color: "#070d1f", fontWeight: "800" }}>Generate Study Plan →</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}

                {diagStep === 3 && studyPlan && (
                  <>
                    {/* ── Score vs Target ── */}
                    <View style={{ backgroundColor: "#151c36", borderRadius: 12, padding: 16, marginBottom: 12, alignItems: "center" }}>
                      <Text style={{ color: "#9aa4c7", fontSize: 13 }}>Your Score</Text>
                      <Text style={{ color: "#f5c518", fontSize: 48, fontWeight: "800" }}>{studyPlan.total}</Text>
                      <View style={{ flexDirection: "row", gap: 20, marginTop: 6 }}>
                        <View style={{ alignItems: "center" }}>
                          <Text style={{ color: "#60a5fa", fontWeight: "700", fontSize: 20 }}>{studyPlan.mathScore}</Text>
                          <Text style={{ color: "#9aa4c7", fontSize: 12 }}>Math</Text>
                        </View>
                        <View style={{ alignItems: "center" }}>
                          <Text style={{ color: "#4caf50", fontWeight: "700", fontSize: 20 }}>{studyPlan.rwScore}</Text>
                          <Text style={{ color: "#9aa4c7", fontSize: 12 }}>R&W</Text>
                        </View>
                      </View>
                      {/* Progress bar toward target */}
                      <View style={{ width: "100%", marginTop: 14 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                          <Text style={{ color: "#9aa4c7", fontSize: 12 }}>Current: {studyPlan.total}</Text>
                          <Text style={{ color: "#f5c518", fontSize: 12, fontWeight: "700" }}>Target: {studyPlan.targetScore}</Text>
                        </View>
                        <View style={{ height: 10, backgroundColor: "#0b1020", borderRadius: 5, overflow: "hidden" }}>
                          <View style={{
                            height: 10,
                            width: `${Math.min(100, Math.round((studyPlan.total / studyPlan.targetScore) * 100))}%`,
                            backgroundColor: studyPlan.pointsNeeded <= 0 ? "#4caf50" : studyPlan.pointsNeeded <= 100 ? "#f5c518" : "#1d4ed8",
                            borderRadius: 5,
                          }} />
                        </View>
                        <Text style={{ color: "#9aa4c7", fontSize: 12, marginTop: 6, textAlign: "center" }}>
                          {studyPlan.pointsNeeded <= 0 ? "🎉 You've hit your target!" : `${studyPlan.pointsNeeded} points to go`}
                        </Text>
                      </View>
                    </View>

                    {/* ── Gap context ── */}
                    <View style={{ backgroundColor: "#0f1829", borderRadius: 10, padding: 14, marginBottom: 12, borderLeftWidth: 3, borderLeftColor: "#1d4ed8" }}>
                      <Text style={{ color: "#fff", fontSize: 14, lineHeight: 22 }}>{studyPlan.gapContext}</Text>
                    </View>

                    {/* ── Time context ── */}
                    <View style={{ backgroundColor: "#0f1829", borderRadius: 10, padding: 14, marginBottom: 16, borderLeftWidth: 3, borderLeftColor: studyPlan.daysLeft !== null && studyPlan.daysLeft <= 14 ? "#ff4d4d" : "#f5c518" }}>
                      <Text style={{ color: "#9aa4c7", fontSize: 11, fontWeight: "700", letterSpacing: 1, marginBottom: 6 }}>
                        {studyPlan.daysLeft !== null ? `⏳ ${studyPlan.daysLeft} DAYS UNTIL TEST` : "⏳ NO TEST DATE SET"}
                      </Text>
                      <Text style={{ color: "#fff", fontSize: 14, lineHeight: 22 }}>{studyPlan.paceLabel}</Text>
                      {studyPlan.daysLeft === null && (
                        <TouchableOpacity
                          style={{ marginTop: 10, backgroundColor: "#1f2a52", padding: 10, borderRadius: 8, alignItems: "center" }}
                          onPress={() => { setDiagnosticModalVisible(false); setView("settings"); }}
                        >
                          <Text style={{ color: "#60a5fa", fontWeight: "700", fontSize: 13 }}>Set your test date →</Text>
                        </TouchableOpacity>
                      )}
                    </View>

                    {/* ── Weak domains ── */}
                    {studyPlan.weakest.length > 0 && (
                      <>
                        <Text style={{ color: "#ff4d4d", fontWeight: "800", fontSize: 15, marginBottom: 8 }}>🚨 Focus First</Text>
                        {studyPlan.weakest.map(d => (
                          <View key={d.key} style={{ backgroundColor: "#2a1a1a", borderRadius: 10, padding: 14, marginBottom: 8, borderLeftWidth: 3, borderLeftColor: "#ff4d4d" }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                              <Text style={{ color: "#fff", fontWeight: "700" }}>{d.name}</Text>
                              <Text style={{ color: d.color, fontWeight: "700" }}>{d.bars}/7 — {d.label}</Text>
                            </View>
                            {d.hist && (
                              <Text style={{ color: "#60a5fa", fontSize: 12, marginBottom: 4 }}>
                                📊 Your practice accuracy: {d.hist.accuracy}% ({d.hist.attempted} questions)
                                {d.hist.accuracy < 60 ? " — needs serious work" : d.hist.accuracy < 75 ? " — building up" : " — improving!"}
                              </Text>
                            )}
                            <Text style={{ color: "#9aa4c7", fontSize: 13, lineHeight: 20 }}>
                              {d.bars <= 2
                                ? "Start with Easy drills daily until you hit 80%+ accuracy, then move to Medium. Use Casper to explain every wrong answer."
                                : "You have the basics — now build speed and consistency. Do Medium drills, then challenge yourself with Hard questions."}
                            </Text>
                          </View>
                        ))}
                      </>
                    )}

                    {/* ── Developing domains ── */}
                    {studyPlan.developing.length > 0 && (
                      <>
                        <Text style={{ color: "#f5c518", fontWeight: "800", fontSize: 15, marginBottom: 8, marginTop: 8 }}>📈 Build On These</Text>
                        {studyPlan.developing.map(d => (
                          <View key={d.key} style={{ backgroundColor: "#2a2a10", borderRadius: 10, padding: 14, marginBottom: 8, borderLeftWidth: 3, borderLeftColor: "#f5c518" }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                              <Text style={{ color: "#fff", fontWeight: "700" }}>{d.name}</Text>
                              <Text style={{ color: d.color, fontWeight: "700" }}>{d.bars}/7 — {d.label}</Text>
                            </View>
                            {d.hist && (
                              <Text style={{ color: "#60a5fa", fontSize: 12, marginBottom: 4 }}>
                                📊 Practice accuracy: {d.hist.accuracy}% ({d.hist.attempted} questions)
                              </Text>
                            )}
                            <Text style={{ color: "#9aa4c7", fontSize: 13, lineHeight: 20 }}>
                              Solid foundation here. Push into Hard difficulty to unlock higher scores. Aim for 85%+ accuracy before your test.
                            </Text>
                          </View>
                        ))}
                      </>
                    )}

                    {/* ── Strong domains ── */}
                    {studyPlan.strong.length > 0 && (
                      <>
                        <Text style={{ color: "#4caf50", fontWeight: "800", fontSize: 15, marginBottom: 8, marginTop: 8 }}>✅ Strengths</Text>
                        {studyPlan.strong.map(d => (
                          <View key={d.key} style={{ backgroundColor: "#1a3a2a", borderRadius: 10, padding: 14, marginBottom: 8, borderLeftWidth: 3, borderLeftColor: "#4caf50" }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                              <Text style={{ color: "#fff", fontWeight: "700" }}>{d.name}</Text>
                              <Text style={{ color: d.color, fontWeight: "700" }}>{d.bars}/7 — {d.label}</Text>
                            </View>
                            {d.hist && (
                              <Text style={{ color: "#4caf50", fontSize: 12, marginBottom: 4 }}>
                                📊 Practice accuracy: {d.hist.accuracy}% ({d.hist.attempted} questions) — great work!
                              </Text>
                            )}
                            <Text style={{ color: "#9aa4c7", fontSize: 13, lineHeight: 20 }}>
                              Maintain with 1–2 Hard questions per week. Shift your main prep energy to weaker domains for the highest point gains.
                            </Text>
                          </View>
                        ))}
                      </>
                    )}

                    {/* ── Weekly Schedule ── */}
                    <View style={{ backgroundColor: "#0f1829", borderRadius: 12, padding: 16, marginTop: 10, marginBottom: 16, borderWidth: 1, borderColor: "#1a2540" }}>
                      <Text style={{ color: "#f5c518", fontWeight: "800", fontSize: 15, marginBottom: 12 }}>
                        📅 Your {studyPlan.daysPerWeekRec}-Day Weekly Plan
                      </Text>
                      {studyPlan.weeklyFocus.map((item, i) => (
                        <View key={i} style={{ flexDirection: "row", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                          <View style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: item.color + "22", justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: item.color + "44", flexShrink: 0 }}>
                            <Text style={{ color: item.color, fontWeight: "800", fontSize: 13 }}>{item.days}d</Text>
                          </View>
                          <View style={{ flex: 1 }}>
                            <Text style={{ color: item.color, fontWeight: "700", fontSize: 13 }}>{item.label}</Text>
                            <Text style={{ color: "#9aa4c7", fontSize: 12, marginTop: 3, lineHeight: 18 }}>{item.detail}</Text>
                          </View>
                        </View>
                      ))}
                      <View style={{ borderTopWidth: 1, borderTopColor: "#1a2540", paddingTop: 12, marginTop: 4 }}>
                        <Text style={{ color: "#475569", fontSize: 12, lineHeight: 18 }}>
                          💡 Book a free group class for live help on your hardest topics. Ask Casper any time you're stuck.
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={{ backgroundColor: "#f5c518", padding: 16, borderRadius: 12, alignItems: "center" }}
                      onPress={() => setDiagnosticModalVisible(false)}
                    >
                      <Text style={{ color: "#070d1f", fontWeight: "800", fontSize: 16 }}>Got It! Let's Go 🚀</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </ScrollView>
          </View>
        </Modal>

        {/* ============ MINI GAMES MODAL ============ */}
        <Modal visible={gameModalVisible} animationType="slide">
          <SafeAreaView style={{ flex: 1, backgroundColor: isLight ? "#f8fafc" : "#0b1020" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: isLight ? "#e2e8f0" : "#151c36" }}>
              <TouchableOpacity onPress={() => { if (gameMode) { setGameMode(null); if (speedTimerRef.current) clearInterval(speedTimerRef.current); } else { setGameModalVisible(false); } }}>
                <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 16 }}>{gameMode ? "← Back" : "✕ Close"}</Text>
              </TouchableOpacity>
              <Text style={{ color: isLight ? "#0f172a" : "#fff", fontWeight: "700" }}>
                {gameMode === "speed" ? "Speed Round" : gameMode === "match" ? "Word Match" : gameMode === "sentence" ? "Fill-in" : "Mini Games"}
              </Text>
              <View style={{ width: 60 }} />
            </View>

            {!gameMode && (
              <ScrollView style={{ backgroundColor: isLight ? "#f8fafc" : "#0b1020" }} contentContainerStyle={{ padding: 20 }}>
                <Text style={{ color: isLight ? "#475569" : "#9aa4c7", fontSize: 14, marginBottom: 20 }}>Choose a game to practice vocabulary</Text>
                <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
                  <TouchableOpacity style={{ flex: 1, backgroundColor: isLight ? "#ffffff" : "#0f172a", borderRadius: 12, padding: 16, borderWidth: 1, borderColor: isLight ? "#fef9c3" : "#f5c51822", alignItems: "center" }}
                    onPress={() => { startSpeedRound(); setGameMode("speed"); }}>
                    <Text style={{ fontSize: 26, marginBottom: 6 }}>⚡</Text>
                    <Text style={{ color: isLight ? "#854d0e" : "#f5c518", fontWeight: "700", fontSize: 14 }}>Speed Round</Text>
                    <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 11, marginTop: 3, textAlign: "center" }}>60 sec · pick meanings fast</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1, backgroundColor: isLight ? "#ffffff" : "#0f172a", borderRadius: 12, padding: 16, borderWidth: 1, borderColor: isLight ? "#dcfce7" : "#4caf5022", alignItems: "center" }}
                    onPress={() => { startMatchGame(); setGameMode("match"); }}>
                    <Text style={{ fontSize: 26, marginBottom: 6 }}>🔗</Text>
                    <Text style={{ color: isLight ? "#166534" : "#4caf50", fontWeight: "700", fontSize: 14 }}>Word Match</Text>
                    <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 11, marginTop: 3, textAlign: "center" }}>Match words to definitions</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
                  <TouchableOpacity style={{ flex: 1, backgroundColor: isLight ? "#ffffff" : "#0f172a", borderRadius: 12, padding: 16, borderWidth: 1, borderColor: isLight ? "#dbeafe" : "#60a5fa22", alignItems: "center" }}
                    onPress={() => { startSentenceGame(); setGameMode("sentence"); }}>
                    <Text style={{ fontSize: 26, marginBottom: 6 }}>📝</Text>
                    <Text style={{ color: isLight ? "#1e40af" : "#60a5fa", fontWeight: "700", fontSize: 14 }}>Fill-in</Text>
                    <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 11, marginTop: 3, textAlign: "center" }}>Guess the word from def</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1, backgroundColor: isLight ? "#ffffff" : "#0f172a", borderRadius: 12, padding: 16, borderWidth: 1, borderColor: isLight ? "#fee2e2" : "#f8717122", alignItems: "center" }}
                    onPress={() => { startHangman(); setGameMode("hangman"); }}>
                    <Text style={{ fontSize: 26, marginBottom: 6 }}>🎯</Text>
                    <Text style={{ color: isLight ? "#991b1b" : "#f87171", fontWeight: "700", fontSize: 14 }}>Hangman</Text>
                    <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 11, marginTop: 3, textAlign: "center" }}>Guess letters · 6 lives</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
                  <TouchableOpacity style={{ flex: 1, backgroundColor: isLight ? "#ffffff" : "#0f172a", borderRadius: 12, padding: 16, borderWidth: 1, borderColor: isLight ? "#ede9fe" : "#a78bfa22", alignItems: "center" }}
                    onPress={() => { startWordScramble(); setGameMode("scramble"); }}>
                    <Text style={{ fontSize: 26, marginBottom: 6 }}>🔀</Text>
                    <Text style={{ color: isLight ? "#5b21b6" : "#a78bfa", fontWeight: "700", fontSize: 14 }}>Scramble</Text>
                    <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 11, marginTop: 3, textAlign: "center" }}>Unscramble the letters</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1, backgroundColor: isLight ? "#ffffff" : "#0f172a", borderRadius: 12, padding: 16, borderWidth: 1, borderColor: isLight ? "#ffedd5" : "#fb923c22", alignItems: "center" }}
                    onPress={() => { startTypeRace(); setGameMode("typerace"); }}>
                    <Text style={{ fontSize: 26, marginBottom: 6 }}>⌨️</Text>
                    <Text style={{ color: isLight ? "#9a3412" : "#fb923c", fontWeight: "700", fontSize: 14 }}>Type Race</Text>
                    <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 11, marginTop: 3, textAlign: "center" }}>Type the word fast</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
                  <TouchableOpacity style={{ flex: 1, backgroundColor: isLight ? "#ffffff" : "#0f172a", borderRadius: 12, padding: 16, borderWidth: 1, borderColor: isLight ? "#d1fae5" : "#34d39922", alignItems: "center" }}
                    onPress={() => { startWordle(); setGameMode("wordle"); }}>
                    <Text style={{ fontSize: 26, marginBottom: 6 }}>🟩</Text>
                    <Text style={{ color: isLight ? "#065f46" : "#34d399", fontWeight: "700", fontSize: 14 }}>Wordle</Text>
                    <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 11, marginTop: 3, textAlign: "center" }}>Guess the vocab word</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1, backgroundColor: isLight ? "#ffffff" : "#0f172a", borderRadius: 12, padding: 16, borderWidth: 1, borderColor: isLight ? "#fee2e2" : "#f4364422", alignItems: "center" }}
                    onPress={() => { startBossBattle(); setGameMode("bossbattle"); }}>
                    <Text style={{ fontSize: 26, marginBottom: 6 }}>👾</Text>
                    <Text style={{ color: isLight ? "#991b1b" : "#f43644", fontWeight: "700", fontSize: 14 }}>Boss Battle</Text>
                    <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 11, marginTop: 3, textAlign: "center" }}>Defeat the boss</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <TouchableOpacity style={{ flex: 1, backgroundColor: isLight ? "#ffffff" : "#0f172a", borderRadius: 12, padding: 16, borderWidth: 1, borderColor: isLight ? "#fef9c3" : "#facc1522", alignItems: "center" }}
                    onPress={() => { startRapidFire(); setGameMode("rapidfire"); }}>
                    <Text style={{ fontSize: 26, marginBottom: 6 }}>🔥</Text>
                    <Text style={{ color: isLight ? "#854d0e" : "#facc15", fontWeight: "700", fontSize: 14 }}>Rapid Fire</Text>
                    <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 11, marginTop: 3, textAlign: "center" }}>5 sec per question</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1, backgroundColor: isLight ? "#ffffff" : "#0f172a", borderRadius: 12, padding: 16, borderWidth: 1, borderColor: isLight ? "#e0e7ff" : "#818cf822", alignItems: "center" }}
                    onPress={() => { startTriviaParty(); setGameMode("triviaparty"); }}>
                    <Text style={{ fontSize: 26, marginBottom: 6 }}>💎</Text>
                    <Text style={{ color: isLight ? "#3730a3" : "#818cf8", fontWeight: "700", fontSize: 14 }}>Trivia Party</Text>
                    <Text style={{ color: isLight ? "#64748b" : "#9aa4c7", fontSize: 11, marginTop: 3, textAlign: "center" }}>Millionaire-style</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}

            {gameMode === "speed" && (
              <View style={{ flex: 1, padding: 20 }}>
                {speedTimeLeft === 0 ? (
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "#f5c518", fontSize: 56, fontWeight: "800" }}>{speedScore}</Text>
                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700", marginTop: 8 }}>words correct!</Text>
                    <Text style={{ color: "#9aa4c7", marginTop: 4 }}>
                      {speedScore >= 20 ? "🔥 Incredible!" : speedScore >= 10 ? "💪 Great job!" : "📚 Keep practicing!"}
                    </Text>
                    <TouchableOpacity style={{ backgroundColor: "#f5c518", padding: 16, borderRadius: 12, marginTop: 30, paddingHorizontal: 40 }}
                      onPress={() => startSpeedRound()}>
                      <Text style={{ color: "#070d1f", fontWeight: "800", fontSize: 16 }}>Play Again</Text>
                    </TouchableOpacity>
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
                      <Text style={{ color: "#475569", fontSize: 13, marginTop: 4 }}>{speedWord?.p}</Text>
                    </View>
                    <View style={{ backgroundColor: "#1a2a3a", borderRadius: 10, padding: 10, marginBottom: 12, borderWidth: 1, borderColor: "#2a3a5c" }}>
  <Text style={{ color: "#9aa4c7", fontSize: 12, textAlign: "center" }}>
    💡 Tip: Start with words you know for sure — process of elimination helps with the rest!
  </Text>
</View>
                    {speedChoices.map((choice, i) => {
                      const isCorrect = speedAnswered && choice === speedWord?.d;
                      const isWrong = speedAnswered && choice === speedCorrect && choice !== speedWord?.d;
                      return (
                        <TouchableOpacity key={i}
                          style={{ backgroundColor: isCorrect ? "#1a4d2e" : isWrong ? "#4d1a1a" : "#151c36", borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: isCorrect ? "#4caf50" : "#2a3a5c" }}
                          disabled={speedAnswered}
                          onPress={() => {
                            const correct = choice === speedWord?.d;
                            setSpeedAnswered(true);
                            setSpeedCorrect(choice);
                            if (correct) setSpeedScore(prev => prev + 1);
                            setTimeout(() => nextSpeedWord(), 400);
                          }}>
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
                {matchSolved.length === matchWords.length && matchWords.length > 0 ? (
                  <View style={{ alignItems: "center", paddingTop: 40 }}>
                    <Text style={{ color: "#4caf50", fontSize: 56, fontWeight: "800" }}>🎉</Text>
                    <Text style={{ color: "#fff", fontSize: 22, fontWeight: "700", marginTop: 8 }}>All matched!</Text>
                    <TouchableOpacity style={{ backgroundColor: "#f5c518", padding: 16, borderRadius: 12, marginTop: 30, paddingHorizontal: 40 }}
                      onPress={() => startMatchGame()}>
                      <Text style={{ color: "#070d1f", fontWeight: "800", fontSize: 16 }}>Play Again</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    <Text style={{ color: "#9aa4c7", fontSize: 13, marginBottom: 16, textAlign: "center" }}>Tap a word, then tap its matching definition.</Text>
                    <View style={{ backgroundColor: "#1a2a3a", borderRadius: 10, padding: 10, marginBottom: 12, borderWidth: 1, borderColor: "#2a3a5c" }}>
  <Text style={{ color: "#9aa4c7", fontSize: 12, textAlign: "center" }}>
    💡 Tip: Start with words you know for sure — process of elimination helps with the rest!
  </Text>
</View>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ color: "#f5c518", fontWeight: "700", marginBottom: 8, textAlign: "center" }}>Words</Text>
                        {matchWords.map((word, i) => {
                          const solved = matchSolved.includes(word);
                          const selected = matchSelected === word && matchSide === "word";
                          return (
                            <TouchableOpacity key={i}
                              style={{ backgroundColor: solved ? "#1a3a2a" : selected ? "#1f3a6a" : "#151c36", borderRadius: 10, padding: 12, marginBottom: 8, borderWidth: selected ? 2 : 1, borderColor: solved ? "#4caf50" : selected ? "#f5c518" : "#2a3a5c", opacity: solved ? 0.6 : 1 }}
                              disabled={solved}
                              onPress={() => {
                                if (matchSide === "def" && matchSelected) {
                                  const defObj = matchDefs.find(d => d.d === matchSelected);
                                  if (defObj && defObj.w === word) { setMatchSolved(prev => [...prev, word]); setMatchScore(prev => prev + 1); }
                                  setMatchSelected(null); setMatchSide(null);
                                } else { setMatchSelected(word); setMatchSide("word"); }
                              }}>
                              <Text style={{ color: solved ? "#4caf50" : "#fff", fontSize: 13, fontWeight: "600", textAlign: "center" }}>{word}</Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ color: "#60a5fa", fontWeight: "700", marginBottom: 8, textAlign: "center" }}>Definitions</Text>
                        {matchDefs.map((defObj, i) => {
                          const solved = matchSolved.includes(defObj.w);
                          const selected = matchSelected === defObj.d && matchSide === "def";
                          return (
                            <TouchableOpacity key={i}
                              style={{ backgroundColor: solved ? "#1a3a2a" : selected ? "#1f3a6a" : "#151c36", borderRadius: 10, padding: 12, marginBottom: 8, borderWidth: selected ? 2 : 1, borderColor: solved ? "#4caf50" : selected ? "#f5c518" : "#2a3a5c", opacity: solved ? 0.6 : 1 }}
                              disabled={solved}
                              onPress={() => {
                                if (matchSide === "word" && matchSelected) {
                                  if (defObj.w === matchSelected) { setMatchSolved(prev => [...prev, matchSelected]); setMatchScore(prev => prev + 1); }
                                  setMatchSelected(null); setMatchSide(null);
                                } else { setMatchSelected(defObj.d); setMatchSide("def"); }
                              }}>
                              <Text style={{ color: solved ? "#4caf50" : "#9aa4c7", fontSize: 12, textAlign: "center" }}>{defObj.d}</Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  </>
                )}
              </ScrollView>
            )}

            {gameMode === "sentence" && sentenceWord && (
              <ScrollView contentContainerStyle={{ padding: 24 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
                  <Text style={{ color: "#4caf50", fontWeight: "800", fontSize: 16 }}>Score: {sentenceScore}/{sentenceTotal}</Text>
                </View>
                <Text style={{ color: "#9aa4c7", fontSize: 12, marginBottom: 12, letterSpacing: 1 }}>WHICH WORD FITS THIS DEFINITION?</Text>
                <View style={{ backgroundColor: "#151c36", borderRadius: 14, padding: 20, marginBottom: 24 }}>
                  <Text style={{ color: "#fff", fontSize: 16, lineHeight: 26 }}>{sentenceWord.d}</Text>
                  <Text style={{ color: "#475569", fontSize: 13, marginTop: 8 }}>{sentenceWord.p}</Text>
                </View>
                <View style={{ backgroundColor: "#1a2a3a", borderRadius: 10, padding: 10, marginBottom: 12, borderWidth: 1, borderColor: "#2a3a5c" }}>
  <Text style={{ color: "#9aa4c7", fontSize: 12, textAlign: "center" }}>
    💡 Tip: Look at the part of speech hint below the definition — it narrows down your choices!
  </Text>
</View>
                {sentenceChoices.map((choice, i) => {
                  const isCorrect = choice === sentenceWord.w;
                  const isSelected = choice === sentenceSelected;
                  let bg = "#151c36";
                  if (sentenceSelected && isCorrect) bg = "#1a4d2e";
                  else if (isSelected && !isCorrect) bg = "#4d1a1a";
                  return (
                    <TouchableOpacity key={i}
                      style={{ backgroundColor: bg, borderRadius: 12, padding: 16, marginBottom: 10, borderWidth: 1.5, borderColor: sentenceSelected && isCorrect ? "#4caf50" : isSelected ? "#ff4d4d" : "#2a3a5c" }}
                      onPress={() => {
                        if (sentenceSelected) return;
                        setSentenceSelected(choice);
                        setSentenceTotal(prev => prev + 1);
                        if (choice === sentenceWord.w) setSentenceScore(prev => prev + 1);
                      }}
                      disabled={!!sentenceSelected}>
                      <Text style={{ color: "#fff", fontSize: 15, fontWeight: "600" }}>{choice}</Text>
                    </TouchableOpacity>
                  );
                })}
                {sentenceSelected && (
                  <TouchableOpacity style={{ backgroundColor: "#f5c518", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 8 }}
                    onPress={() => nextSentenceWord()}>
                    <Text style={{ color: "#070d1f", fontWeight: "800", fontSize: 16 }}>Next Word →</Text>
                  </TouchableOpacity>
                )}
              </ScrollView>
            )}

            {/* ── HANGMAN ── */}
            {gameMode === "hangman" && hangmanWord && (
              <ScrollView contentContainerStyle={{ padding: 20 }}>
                <View style={{ flexDirection: "row", justifyContent: "center", gap: 6, marginBottom: 20 }}>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Text key={i} style={{ fontSize: 22 }}>{i < hangmanLives ? "❤️" : "🖤"}</Text>
                  ))}
                </View>
                <View style={{ backgroundColor: "#151c36", borderRadius: 14, padding: 16, marginBottom: 20 }}>
                  <Text style={{ color: "#9aa4c7", fontSize: 11, marginBottom: 6, letterSpacing: 1 }}>DEFINITION</Text>
                  <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24 }}>{hangmanWord.d}</Text>
                  <Text style={{ color: "#475569", fontSize: 13, marginTop: 6 }}>{hangmanWord.p}</Text>
                </View>
                <View style={{ backgroundColor: "#1a2a3a", borderRadius: 10, padding: 10, marginBottom: 12, borderWidth: 1, borderColor: "#2a3a5c" }}>
  <Text style={{ color: "#9aa4c7", fontSize: 12, textAlign: "center" }}>
    💡 Tip: Start with common letters — E, T, A, O, I, N, S appear most often in English words!
  </Text>
</View>
                <View style={{ flexDirection: "row", justifyContent: "center", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                  {hangmanWord.w.toUpperCase().split("").map((letter, i) => (
                    <View key={i} style={{ alignItems: "center", width: 28 }}>
                      <Text style={{ color: "#f5c518", fontSize: 22, fontWeight: "800", minHeight: 30 }}>
                        {letter === " " ? " " : letter === "-" ? "-" : hangmanGuesses.includes(letter) ? letter : "_"}
                      </Text>
                      <View style={{ height: 2, width: 24, backgroundColor: "#2a3a5c", marginTop: 4 }} />
                    </View>
                  ))}
                </View>
                {(hangmanWon || hangmanLives <= 0) && (
                  <View style={{ backgroundColor: hangmanWon ? "#1a3a2a" : "#2a1a1a", borderRadius: 14, padding: 16, marginBottom: 16, alignItems: "center" }}>
                    <Text style={{ fontSize: 36 }}>{hangmanWon ? "🎉" : "💀"}</Text>
                    <Text style={{ color: hangmanWon ? "#4caf50" : "#ff4d4d", fontSize: 18, fontWeight: "800", marginTop: 8 }}>
                      {hangmanWon ? "You got it!" : `The word was: ${hangmanWord.w}`}
                    </Text>
                    <TouchableOpacity style={{ backgroundColor: "#f5c518", padding: 14, borderRadius: 12, marginTop: 14, paddingHorizontal: 32 }}
                      onPress={() => startHangman()}>
                      <Text style={{ color: "#070d1f", fontWeight: "800", fontSize: 15 }}>Next Word</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {!hangmanWon && hangmanLives > 0 && (
                  <View>
                    {[
                      ["Q","W","E","R","T","Y","U","I","O","P"],
                      ["A","S","D","F","G","H","J","K","L"],
                      ["Z","X","C","V","B","N","M"],
                    ].map((row, ri) => (
                      <View key={ri} style={{ flexDirection: "row", justifyContent: "center", gap: 5, marginBottom: 6 }}>
                        {row.map(letter => {
                          const used = hangmanGuesses.includes(letter);
                          const isCorrect = used && hangmanWord.w.toUpperCase().includes(letter);
                          const isWrong = used && !hangmanWord.w.toUpperCase().includes(letter);
                          return (
                            <TouchableOpacity key={letter}
                              style={{ width: 32, height: 36, borderRadius: 6, backgroundColor: isCorrect ? "#1a4d2e" : isWrong ? "#4d1a1a" : "#1f2a52", justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: isCorrect ? "#4caf50" : isWrong ? "#ff4d4d" : "#2a3a5c", opacity: used ? 0.5 : 1 }}
                              disabled={used}
                              onPress={() => guessLetter(letter)}>
                              <Text style={{ color: isCorrect ? "#4caf50" : isWrong ? "#ff4d4d" : "#fff", fontWeight: "700", fontSize: 13 }}>{letter}</Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    ))}
                  </View>
                )}
              </ScrollView>
            )}

            {/* ── SCRAMBLE ── */}
            {gameMode === "scramble" && scrambleWord && (
              <ScrollView contentContainerStyle={{ padding: 20 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
                  <Text style={{ color: "#a78bfa", fontWeight: "800", fontSize: 18 }}>Score: {scrambleScore}</Text>
                  <TouchableOpacity onPress={nextScramble}>
                    <Text style={{ color: "#9aa4c7", fontSize: 14 }}>Skip →</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: "#151c36", borderRadius: 14, padding: 16, marginBottom: 24 }}>
                  <Text style={{ color: "#9aa4c7", fontSize: 11, marginBottom: 6, letterSpacing: 1 }}>UNSCRAMBLE THIS WORD</Text>
                  <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24 }}>{scrambleWord.d}</Text>
                </View>
                <View style={{ backgroundColor: "#1a2a3a", borderRadius: 10, padding: 10, marginBottom: 16, borderWidth: 1, borderColor: "#2a3a5c" }}>
  <Text style={{ color: "#9aa4c7", fontSize: 12, textAlign: "center" }}>
    💡 Tip: Look for common prefixes (un-, re-, pre-) and suffixes (-tion, -ing, -ly) first!
  </Text>
</View>
                <View style={{ backgroundColor: "#0f1829", borderRadius: 12, minHeight: 56, padding: 12, marginBottom: 16, flexDirection: "row", flexWrap: "wrap", gap: 6, alignItems: "center", borderWidth: 1.5, borderColor: scrambleResult === "correct" ? "#4caf50" : scrambleResult === "wrong" ? "#ff4d4d" : "#2a3a5c" }}>
                  {scrambleSelected.map((item, i) => (
                    <TouchableOpacity key={i}
                      style={{ backgroundColor: "#1f2a52", borderRadius: 8, width: 34, height: 38, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#3a4a7c" }}
                      onPress={() => {
                        if (scrambleResult) return;
                        const newSelected = scrambleSelected.filter((_, idx) => idx !== i);
                        const removed = scrambleSelected[i];
                        setScrambleSelected(newSelected);
                        setScrambleLetters(prev => [...prev, removed]);
                      }}>
                      <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>{item.letter}</Text>
                    </TouchableOpacity>
                  ))}
                  {scrambleSelected.length === 0 && (
                    <Text style={{ color: "#475569", fontSize: 13 }}>Tap letters below to build the word...</Text>
                  )}
                </View>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 20 }}>
                  {scrambleLetters.map((letter, i) => (
                    <TouchableOpacity key={i}
                      style={{ backgroundColor: "#1f2a52", borderRadius: 8, width: 40, height: 44, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#3a4a7c" }}
                      onPress={() => {
                        if (scrambleResult) return;
                        setScrambleSelected(prev => [...prev, { letter, idx: i }]);
                        setScrambleLetters(prev => prev.filter((_, idx) => idx !== i));
                      }}>
                      <Text style={{ color: "#a78bfa", fontWeight: "800", fontSize: 16 }}>{letter}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {scrambleResult && (
                  <View style={{ backgroundColor: scrambleResult === "correct" ? "#1a3a2a" : "#2a1a1a", borderRadius: 12, padding: 14, marginBottom: 14, alignItems: "center" }}>
                    <Text style={{ color: scrambleResult === "correct" ? "#4caf50" : "#ff4d4d", fontWeight: "800", fontSize: 16 }}>
                      {scrambleResult === "correct" ? "✅ Correct!" : `❌ It was: ${scrambleWord.w.toUpperCase()}`}
                    </Text>
                  </View>
                )}
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <TouchableOpacity
                    style={{ flex: 1, backgroundColor: "#1f2a52", padding: 14, borderRadius: 12, alignItems: "center" }}
                    onPress={() => {
                      const original = scrambleWord.w.toUpperCase().split("").sort(() => Math.random() - 0.5);
                      setScrambleLetters([...original, ...scrambleSelected.map(s => s.letter)].sort(() => Math.random() - 0.5));
                      setScrambleSelected([]);
                    }}>
                    <Text style={{ color: "#9aa4c7", fontWeight: "700" }}>🔀 Reshuffle</Text>
                  </TouchableOpacity>
                  {scrambleResult ? (
                    <TouchableOpacity style={{ flex: 2, backgroundColor: "#f5c518", padding: 14, borderRadius: 12, alignItems: "center" }}
                      onPress={() => nextScramble()}>
                      <Text style={{ color: "#070d1f", fontWeight: "800" }}>Next Word →</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{ flex: 2, backgroundColor: "#a78bfa", padding: 14, borderRadius: 12, alignItems: "center", opacity: scrambleSelected.length === 0 ? 0.4 : 1 }}
                      disabled={scrambleSelected.length === 0}
                      onPress={() => {
                        const guess = scrambleSelected.map(s => s.letter).join("");
                        const correct = guess === scrambleWord.w.toUpperCase();
                        setScrambleResult(correct ? "correct" : "wrong");
                        if (correct) setScrambleScore(prev => prev + 1);
                      }}>
                      <Text style={{ color: "#fff", fontWeight: "800" }}>Check Answer</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </ScrollView>
            )}

            {/* ── TYPE RACE ── */}
            {gameMode === "typerace" && typeRaceWord && (
              <View style={{ flex: 1, padding: 20 }}>
                {typeRaceTimeLeft === 0 ? (
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "#fb923c", fontSize: 56, fontWeight: "800" }}>{typeRaceScore}</Text>
                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700", marginTop: 8 }}>words typed!</Text>
                    <Text style={{ color: "#9aa4c7", marginTop: 4 }}>
                      {typeRaceScore >= 15 ? "🔥 Lightning fast!" : typeRaceScore >= 8 ? "💪 Great job!" : "📚 Keep practicing!"}
                    </Text>
                    <TouchableOpacity style={{ backgroundColor: "#fb923c", padding: 16, borderRadius: 12, marginTop: 30, paddingHorizontal: 40 }}
                      onPress={() => startTypeRace()}>
                      <Text style={{ color: "#fff", fontWeight: "800", fontSize: 16 }}>Play Again</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                      <Text style={{ color: "#4caf50", fontWeight: "800", fontSize: 18 }}>✓ {typeRaceScore}</Text>
                      <Text style={{ color: typeRaceTimeLeft <= 10 ? "#ff4d4d" : "#fb923c", fontWeight: "800", fontSize: 24 }}>⏱ {typeRaceTimeLeft}s</Text>
                    </View>
                    <View style={{ backgroundColor: "#151c36", borderRadius: 14, padding: 20, marginBottom: 16, alignItems: "center" }}>
                      <Text style={{ color: "#9aa4c7", fontSize: 11, marginBottom: 8, letterSpacing: 1 }}>TYPE THIS WORD</Text>
                      <Text style={{ color: "#fb923c", fontSize: 38, fontWeight: "800" }}>{typeRaceWord.w}</Text>
                      <Text style={{ color: "#475569", fontSize: 14, marginTop: 6, textAlign: "center" }}>{typeRaceWord.d}</Text>
                    </View>
                    <View style={{ backgroundColor: "#1a2a3a", borderRadius: 10, padding: 10, marginBottom: 12, borderWidth: 1, borderColor: "#2a3a5c" }}>
  <Text style={{ color: "#9aa4c7", fontSize: 12, textAlign: "center" }}>
    💡 Tip: Read the definition to confirm the spelling — one wrong letter won't count!
  </Text>
</View>
                    {typeRaceResult && (
                      <View style={{ backgroundColor: typeRaceResult === "correct" ? "#1a3a2a" : "#2a1a1a", borderRadius: 10, padding: 10, marginBottom: 10, alignItems: "center" }}>
                        <Text style={{ color: typeRaceResult === "correct" ? "#4caf50" : "#ff4d4d", fontWeight: "700" }}>
                          {typeRaceResult === "correct" ? "✅ Correct!" : "❌ Try again or skip"}
                        </Text>
                      </View>
                    )}
                    <TextInput
                      style={{ backgroundColor: "#151c36", color: "#fff", fontSize: 22, fontWeight: "700", textAlign: "center", padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 2, borderColor: typeRaceResult === "correct" ? "#4caf50" : typeRaceResult === "wrong" ? "#ff4d4d" : "#2a3a5c" }}
                      value={typeRaceInput}
                      onChangeText={val => {
                        setTypeRaceInput(val);
                        setTypeRaceResult(null);
                        if (val.trim().toLowerCase() === typeRaceWord.w.toLowerCase()) {
                          setTypeRaceScore(prev => prev + 1);
                          setTypeRaceResult("correct");
                          setTimeout(() => nextTypeRaceWord(), 400);
                        }
                      }}
                      placeholder="Start typing..."
                      placeholderTextColor="#475569"
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoFocus
                    />
                    <TouchableOpacity style={{ backgroundColor: "#1f2a52", padding: 13, borderRadius: 12, alignItems: "center" }}
                      onPress={() => nextTypeRaceWord()}>
                      <Text style={{ color: "#9aa4c7", fontWeight: "700" }}>Skip →</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            )}

            {/* ── WORDLE ── */}
            {gameMode === "wordle" && wordleWord && (
              <ScrollView contentContainerStyle={{ padding: 20 }}>
                <View style={{ alignItems: "center", marginBottom: 16 }}>
                  <Text style={{ color: "#9aa4c7", fontSize: 13, marginBottom: 4, textAlign: "center" }}>
                    Guess the {wordleWord.w.length}-letter word · {6 - wordleGuesses.length} guesses left
                  </Text>
                  <Text style={{ color: "#34d399", fontSize: 12, textAlign: "center" }}>{wordleWord.d}</Text>
                </View>

                {/* Guess grid */}
                {Array.from({ length: 6 }).map((_, rowIndex) => {
                  const guess = wordleGuesses[rowIndex];
                  const isCurrentRow = rowIndex === wordleGuesses.length && !wordleGameOver;
                  const target = wordleWord.w.toUpperCase();
                  return (
                    <View key={rowIndex} style={{ flexDirection: "row", justifyContent: "center", gap: 6, marginBottom: 6 }}>
                      {Array.from({ length: target.length }).map((_, colIndex) => {
                        const letter = guess ? guess[colIndex]?.letter : isCurrentRow ? wordleCurrentGuess[colIndex] : "";
                        const status = guess ? guess[colIndex]?.status : null;
                        const bg = status === "correct" ? "#22c55e" : status === "present" ? "#f59e0b" : status === "absent" ? "#374151" : isCurrentRow && letter ? "#1f2a52" : "#151c36";
                        const borderColor = status ? "transparent" : isCurrentRow && letter ? "#f5c518" : "#2a3a5c";
                        return (
                          <View key={colIndex} style={{ width: 44, height: 44, borderRadius: 8, backgroundColor: bg, borderWidth: 2, borderColor, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "#fff", fontWeight: "800", fontSize: 18 }}>{letter || ""}</Text>
                          </View>
                        );
                      })}
                    </View>
                  );
                })}

                {wordleMessage ? (
                  <View style={{ backgroundColor: wordleWon ? "#1a3a2a" : "#2a1a1a", borderRadius: 10, padding: 12, marginTop: 12, alignItems: "center" }}>
                    <Text style={{ color: wordleWon ? "#4caf50" : "#ff4d4d", fontWeight: "800", fontSize: 15 }}>{wordleMessage}</Text>
                    {wordleGameOver && (
                      <Text style={{ color: "#9aa4c7", fontSize: 13, marginTop: 4 }}>Definition: {wordleWord.d}</Text>
                    )}
                  </View>
                ) : null}

                {/* Keyboard */}
                {!wordleGameOver && (
                  <View style={{ marginTop: 16 }}>
                    {[["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["Z","X","C","V","B","N","M"]].map((row, ri) => (
                      <View key={ri} style={{ flexDirection: "row", justifyContent: "center", gap: 5, marginBottom: 6 }}>
                        {row.map(letter => {
                          const allGuessedLetters = wordleGuesses.flat();
                          const status = allGuessedLetters.find(g => g.letter === letter)?.status;
                          const bg = status === "correct" ? "#22c55e" : status === "present" ? "#f59e0b" : status === "absent" ? "#374151" : "#1f2a52";
                          return (
                            <TouchableOpacity key={letter}
                              style={{ width: 30, height: 40, borderRadius: 6, backgroundColor: bg, justifyContent: "center", alignItems: "center" }}
                              onPress={() => {
                                if (wordleCurrentGuess.length < wordleWord.w.length) {
                                  setWordleCurrentGuess(prev => prev + letter);
                                }
                              }}>
                              <Text style={{ color: "#fff", fontWeight: "700", fontSize: 13 }}>{letter}</Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    ))}
                    <View style={{ flexDirection: "row", gap: 10, marginTop: 8 }}>
                      <TouchableOpacity
                        style={{ flex: 1, backgroundColor: "#374151", padding: 14, borderRadius: 10, alignItems: "center" }}
                        onPress={() => setWordleCurrentGuess(prev => prev.slice(0, -1))}>
                        <Text style={{ color: "#fff", fontWeight: "700" }}>⌫ Delete</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ flex: 2, backgroundColor: "#34d399", padding: 14, borderRadius: 10, alignItems: "center", opacity: wordleCurrentGuess.length === wordleWord.w.length ? 1 : 0.4 }}
                        disabled={wordleCurrentGuess.length !== wordleWord.w.length}
                        onPress={submitWordleGuess}>
                        <Text style={{ color: "#fff", fontWeight: "800" }}>Enter ↵</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {wordleGameOver && (
                  <TouchableOpacity style={{ backgroundColor: "#34d399", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 16 }}
                    onPress={() => startWordle()}>
                    <Text style={{ color: "#fff", fontWeight: "800", fontSize: 16 }}>New Word →</Text>
                  </TouchableOpacity>
                )}
              </ScrollView>
            )}

            {/* ── BOSS BATTLE ── */}
            {gameMode === "bossbattle" && bossQuestion && (
              <ScrollView contentContainerStyle={{ padding: 20 }}>
                {bossGameOver ? (
                  <View style={{ alignItems: "center", paddingTop: 40 }}>
                    <Text style={{ fontSize: 64 }}>{bossWon ? "🏆" : "💀"}</Text>
                    <Text style={{ color: bossWon ? "#4caf50" : "#ff4d4d", fontSize: 24, fontWeight: "800", marginTop: 12 }}>
                      {bossWon ? "Boss Defeated!" : "You were defeated!"}
                    </Text>
                    <Text style={{ color: "#9aa4c7", fontSize: 14, marginTop: 6 }}>Streak: {bossStreak} correct in a row</Text>
                    <TouchableOpacity style={{ backgroundColor: "#f43644", padding: 16, borderRadius: 12, marginTop: 30, paddingHorizontal: 40 }}
                      onPress={() => startBossBattle()}>
                      <Text style={{ color: "#fff", fontWeight: "800", fontSize: 16 }}>Play Again</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    {/* Boss */}
                    <View style={{ alignItems: "center", marginBottom: 16 }}>
                      <Text style={{ fontSize: 64 }}>👾</Text>
                      <Text style={{ color: "#f43644", fontWeight: "800", fontSize: 16, marginBottom: 6 }}>BOSS</Text>
                      <View style={{ width: "100%", height: 14, backgroundColor: "#2a1a1a", borderRadius: 7, overflow: "hidden", marginBottom: 4 }}>
                        <View style={{ width: `${bossHP}%`, height: 14, backgroundColor: "#f43644", borderRadius: 7 }} />
                      </View>
                      <Text style={{ color: "#f43644", fontSize: 12, fontWeight: "700" }}>{bossHP}/100 HP</Text>
                    </View>

                    {/* VS */}
                    <View style={{ alignItems: "center", marginBottom: 16 }}>
                      <Text style={{ color: "#f5c518", fontWeight: "900", fontSize: 18 }}>⚔️ VS ⚔️</Text>
                      {bossStreak >= 2 && (
                        <Text style={{ color: "#f5c518", fontSize: 12, fontWeight: "700", marginTop: 4 }}>🔥 {bossStreak} streak! +{bossStreak * 5} bonus dmg</Text>
                      )}
                    </View>

                    {/* Player */}
                    <View style={{ alignItems: "center", marginBottom: 20 }}>
                      <Text style={{ fontSize: 40 }}>🧑‍🎓</Text>
                      <Text style={{ color: "#4caf50", fontWeight: "800", fontSize: 16, marginBottom: 6 }}>YOU</Text>
                      <View style={{ width: "100%", height: 14, backgroundColor: "#1a3a2a", borderRadius: 7, overflow: "hidden", marginBottom: 4 }}>
                        <View style={{ width: `${playerHP}%`, height: 14, backgroundColor: "#4caf50", borderRadius: 7 }} />
                      </View>
                      <Text style={{ color: "#4caf50", fontSize: 12, fontWeight: "700" }}>{playerHP}/100 HP</Text>
                    </View>

                    <View style={{ backgroundColor: "#151c36", borderRadius: 14, padding: 16, marginBottom: 20 }}>
                      <Text style={{ color: "#9aa4c7", fontSize: 11, marginBottom: 6, letterSpacing: 1 }}>WHAT DOES THIS WORD MEAN?</Text>
                      <Text style={{ color: "#f5c518", fontSize: 28, fontWeight: "800" }}>{bossQuestion.w}</Text>
                      <Text style={{ color: "#475569", fontSize: 13, marginTop: 4 }}>{bossQuestion.p}</Text>
                    </View>

                    {bossAnswered && (
                      <View style={{ backgroundColor: bossCorrect ? "#1a3a2a" : "#2a1a1a", borderRadius: 10, padding: 12, marginBottom: 12, alignItems: "center" }}>
                        <Text style={{ color: bossCorrect ? "#4caf50" : "#ff4d4d", fontWeight: "800", fontSize: 15 }}>
                          {bossCorrect ? `✅ +${20 + bossStreak * 5} dmg to boss!` : "❌ Boss attacks! -25 HP"}
                        </Text>
                      </View>
                    )}

                    {bossChoices.map((choice, i) => {
                      const isCorrect = choice === bossQuestion.d;
                      const isSelected = bossAnswered && choice === bossChoices.find((_, idx) => idx === i);
                      let bg = "#151c36";
                      if (bossAnswered && isCorrect) bg = "#1a4d2e";
                      else if (bossAnswered && !bossCorrect && choice === bossChoices[i]) bg = "#4d1a1a";
                      return (
                        <TouchableOpacity key={i}
                          style={{ backgroundColor: bg, borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: bossAnswered && isCorrect ? "#4caf50" : "#2a3a5c" }}
                          disabled={bossAnswered}
                          onPress={() => {
                            const correct = choice === bossQuestion.d;
                            setBossAnswered(true);
                            setBossCorrect(correct);
                            if (correct) {
                              const newStreak = bossStreak + 1;
                              setBossStreak(newStreak);
                              const dmg = 20 + newStreak * 5;
                              const newBossHP = Math.max(0, bossHP - dmg);
                              setBossHP(newBossHP);
                              if (newBossHP <= 0) { setBossGameOver(true); setBossWon(true); }
                            } else {
                              setBossStreak(0);
                              const newPlayerHP = Math.max(0, playerHP - 25);
                              setPlayerHP(newPlayerHP);
                              if (newPlayerHP <= 0) { setBossGameOver(true); setBossWon(false); }
                            }
                            setTimeout(() => {
                              if (!bossGameOver) nextBossQuestion();
                            }, 1000);
                          }}>
                          <Text style={{ color: "#fff", fontSize: 14 }}>{choice}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </>
                )}
              </ScrollView>
            )}

            {/* ── RAPID FIRE ── */}
            {gameMode === "rapidfire" && rapidQuestions.length > 0 && (
              <View style={{ flex: 1, padding: 20 }}>
                {rapidFinished ? (
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "#facc15", fontSize: 64, fontWeight: "800" }}>{rapidScore}/10</Text>
                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700", marginTop: 8 }}>
                      {rapidScore >= 8 ? "🔥 On Fire!" : rapidScore >= 5 ? "💪 Solid!" : "📚 Keep going!"}
                    </Text>
                    <TouchableOpacity style={{ backgroundColor: "#facc15", padding: 16, borderRadius: 12, marginTop: 30, paddingHorizontal: 40 }}
                      onPress={() => startRapidFire()}>
                      <Text style={{ color: "#070d1f", fontWeight: "800", fontSize: 16 }}>Play Again</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    {/* Timer ring */}
                    <View style={{ alignItems: "center", marginBottom: 16 }}>
                      <View style={{ width: 80, height: 80, borderRadius: 40, borderWidth: 6, borderColor: rapidTimeLeft <= 2 ? "#ff4d4d" : rapidTimeLeft <= 4 ? "#f5c518" : "#4caf50", justifyContent: "center", alignItems: "center", backgroundColor: "#151c36" }}>
                        <Text style={{ color: rapidTimeLeft <= 2 ? "#ff4d4d" : "#fff", fontSize: 32, fontWeight: "900" }}>{rapidTimeLeft}</Text>
                      </View>
                      <Text style={{ color: "#9aa4c7", fontSize: 12, marginTop: 8 }}>Question {rapidIndex + 1}/10 · Score: {rapidScore}</Text>
                    </View>

                    <View style={{ backgroundColor: "#151c36", borderRadius: 14, padding: 16, marginBottom: 20 }}>
                      <Text style={{ color: "#9aa4c7", fontSize: 11, marginBottom: 6, letterSpacing: 1 }}>WHAT DOES THIS WORD MEAN?</Text>
                      <Text style={{ color: "#facc15", fontSize: 28, fontWeight: "800" }}>{rapidQuestions[rapidIndex].word.w}</Text>
                    </View>

                    {rapidQuestions[rapidIndex].choices.map((choice, i) => {
                      const isCorrect = choice === rapidQuestions[rapidIndex].word.d;
                      const isSelected = rapidSelected === i || (rapidAnswered && rapidSelected === -1 && isCorrect);
                      let bg = "#151c36";
                      if (rapidAnswered && isCorrect) bg = "#1a4d2e";
                      else if (rapidAnswered && rapidSelected === i && !isCorrect) bg = "#4d1a1a";
                      return (
                        <TouchableOpacity key={i}
                          style={{ backgroundColor: bg, borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: rapidAnswered && isCorrect ? "#4caf50" : "#2a3a5c" }}
                          disabled={rapidAnswered}
                          onPress={() => {
                            if (rapidTimerRef.current) clearInterval(rapidTimerRef.current);
                            const correct = choice === rapidQuestions[rapidIndex].word.d;
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
                  </>
                )}
              </View>
            )}

            {/* ── TRIVIA PARTY ── */}
            {gameMode === "triviaparty" && triviaQuestion && (
              <ScrollView contentContainerStyle={{ padding: 20 }}>
                {/* Milestone ladder */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }} contentContainerStyle={{ gap: 6, paddingHorizontal: 4 }}>
                  {TRIVIA_MILESTONES.slice(1).map((m, i) => (
                    <View key={i} style={{ backgroundColor: triviaMilestone > i ? "#1a3a2a" : triviaMilestone === i ? "#2a2a10" : "#151c36", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, borderWidth: 1, borderColor: triviaMilestone === i ? "#f5c518" : triviaMilestone > i ? "#4caf50" : "#2a3a5c" }}>
                      <Text style={{ color: triviaMilestone > i ? "#4caf50" : triviaMilestone === i ? "#f5c518" : "#475569", fontSize: 11, fontWeight: "700" }}>${m.toLocaleString()}</Text>
                    </View>
                  ))}
                </ScrollView>

                {/* Current prize */}
                <View style={{ backgroundColor: "#151c36", borderRadius: 12, padding: 14, marginBottom: 16, alignItems: "center" }}>
                  <Text style={{ color: "#9aa4c7", fontSize: 12 }}>Current Prize</Text>
                  <Text style={{ color: "#f5c518", fontSize: 32, fontWeight: "900" }}>${TRIVIA_MILESTONES[triviaMilestone].toLocaleString()}</Text>
                  <Text style={{ color: "#9aa4c7", fontSize: 12, marginTop: 2 }}>Question {triviaTotal + 1}</Text>
                </View>

                <View style={{ backgroundColor: "#0f1829", borderRadius: 14, padding: 16, marginBottom: 20 }}>
                  <Text style={{ color: "#9aa4c7", fontSize: 11, marginBottom: 6, letterSpacing: 1 }}>WHAT DOES THIS WORD MEAN?</Text>
                  <Text style={{ color: "#f5c518", fontSize: 28, fontWeight: "800", marginBottom: 4 }}>{triviaQuestion.w}</Text>
                  <Text style={{ color: "#475569", fontSize: 13 }}>{triviaQuestion.p}</Text>
                </View>

                {/* Lifelines */}
                <View style={{ flexDirection: "row", gap: 10, marginBottom: 16 }}>
                  <TouchableOpacity
                    style={{ flex: 1, backgroundColor: triviaLifelines.fifty ? "#1a2540" : "#0f1020", padding: 12, borderRadius: 10, alignItems: "center", borderWidth: 1, borderColor: triviaLifelines.fifty ? "#f5c518" : "#1a2030", opacity: triviaLifelines.fifty && !triviaSelected ? 1 : 0.4 }}
                    disabled={!triviaLifelines.fifty || !!triviaSelected}
                    onPress={() => {
                      const wrong = triviaChoices.filter(c => c !== triviaQuestion.d);
                      const toEliminate = wrong.sort(() => Math.random() - 0.5).slice(0, 2);
                      setTriviaEliminated(toEliminate);
                      setTriviaLifelines(prev => ({ ...prev, fifty: false }));
                    }}>
                    <Text style={{ fontSize: 18 }}>50/50</Text>
                    <Text style={{ color: triviaLifelines.fifty ? "#f5c518" : "#475569", fontSize: 11, fontWeight: "700", marginTop: 2 }}>50/50</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ flex: 1, backgroundColor: triviaLifelines.skip ? "#1a2540" : "#0f1020", padding: 12, borderRadius: 10, alignItems: "center", borderWidth: 1, borderColor: triviaLifelines.skip ? "#60a5fa" : "#1a2030", opacity: triviaLifelines.skip && !triviaSelected ? 1 : 0.4 }}
                    disabled={!triviaLifelines.skip || !!triviaSelected}
                    onPress={() => {
                      setTriviaLifelines(prev => ({ ...prev, skip: false }));
                      nextTriviaQuestion(triviaMilestone);
                    }}>
                    <Text style={{ fontSize: 18 }}>⏭️</Text>
                    <Text style={{ color: triviaLifelines.skip ? "#60a5fa" : "#475569", fontSize: 11, fontWeight: "700", marginTop: 2 }}>Skip</Text>
                  </TouchableOpacity>
                </View>

                {triviaChoices.map((choice, i) => {
                  const label = ["A", "B", "C", "D"][i];
                  const isEliminated = triviaEliminated.includes(choice);
                  const isCorrect = choice === triviaQuestion.d;
                  const isSelected = triviaSelected === choice;
                  let bg = "#151c36";
                  if (triviaSelected && isCorrect) bg = "#1a4d2e";
                  else if (isSelected && !isCorrect) bg = "#4d1a1a";
                  return (
                    <TouchableOpacity key={i}
                      style={{ backgroundColor: bg, borderRadius: 12, padding: 14, marginBottom: 10, flexDirection: "row", gap: 12, alignItems: "center", borderWidth: 1, borderColor: triviaSelected && isCorrect ? "#4caf50" : "#2a3a5c", opacity: isEliminated ? 0.2 : 1 }}
                      disabled={!!triviaSelected || isEliminated}
                      onPress={() => {
                        setTriviaSelected(choice);
                        setTriviaTotal(prev => prev + 1);
                        if (choice === triviaQuestion.d) {
                          const newMilestone = Math.min(triviaMilestone + 1, TRIVIA_MILESTONES.length - 1);
                          setTriviaMilestone(newMilestone);
                          setTriviaScore(TRIVIA_MILESTONES[newMilestone]);
                        } else {
                          setTriviaMilestone(0);
                          setTriviaScore(0);
                        }
                      }}>
                      <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: "#0f1829", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "#9aa4c7", fontWeight: "700" }}>{label}</Text>
                      </View>
                      <Text style={{ color: "#fff", flex: 1, fontSize: 14 }}>{choice}</Text>
                    </TouchableOpacity>
                  );
                })}

                {triviaSelected && (
                  <View style={{ marginTop: 8 }}>
                    <View style={{ backgroundColor: triviaSelected === triviaQuestion.d ? "#1a3a2a" : "#2a1a1a", borderRadius: 10, padding: 14, marginBottom: 12, alignItems: "center" }}>
                      <Text style={{ color: triviaSelected === triviaQuestion.d ? "#4caf50" : "#ff4d4d", fontWeight: "800", fontSize: 16 }}>
                        {triviaSelected === triviaQuestion.d ? `✅ Correct! You won $${TRIVIA_MILESTONES[triviaMilestone].toLocaleString()}!` : `❌ Wrong! You lost everything.`}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{ backgroundColor: "#f5c518", padding: 16, borderRadius: 12, alignItems: "center" }}
                      onPress={() => {
                        if (triviaSelected === triviaQuestion.d) {
                          nextTriviaQuestion(triviaMilestone);
                        } else {
                          startTriviaParty();
                        }
                      }}>
                      <Text style={{ color: "#070d1f", fontWeight: "800", fontSize: 16 }}>
                        {triviaSelected === triviaQuestion.d ? "Next Question →" : "Play Again"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </ScrollView>
            )}

          </SafeAreaView>
        </Modal>v

        {/* ============ DRILLS MODAL ============ */}
        <Modal visible={drillModalVisible} animationType="slide">
          <SafeAreaView style={{ flex: 1, backgroundColor: "#0b1020" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: "#151c36" }}>
              <TouchableOpacity onPress={() => {
                if (drillTimerRef.current) clearInterval(drillTimerRef.current);
                if (drillDomain && !drillFinished) { setDrillDomain(null); setDrillDifficulty(null); }
                else { setDrillModalVisible(false); }
              }}>
                <Text style={{ color: "#9aa4c7", fontSize: 16 }}>{drillDomain ? "← Back" : "✕ Close"}</Text>
              </TouchableOpacity>
              <Text style={{ color: "#fff", fontWeight: "700" }}>
                {drillDomain ? `⚡ ${drillDomain}` : "⚡ Drills"}
              </Text>
              <View style={{ width: 60 }} />
            </View>

            {/* Domain selector */}
            {!drillDomain && (
              <ScrollView contentContainerStyle={{ padding: 20 }}>
                <Text style={{ color: "#9aa4c7", fontSize: 14, marginBottom: 20 }}>Pick a domain and difficulty. Each drill is 10 questions with a per-question timer.</Text>
                <Text style={{ color: "#60a5fa", fontWeight: "700", marginBottom: 10 }}>📐 Math</Text>
                {MATH.map(domain => (
                  <View key={domain} style={{ backgroundColor: "#151c36", borderRadius: 12, padding: 14, marginBottom: 10 }}>
                    <Text style={{ color: "#fff", fontWeight: "700", marginBottom: 10 }}>{domain}</Text>
                    <View style={{ flexDirection: "row", gap: 8 }}>
                      {DIFFICULTIES.map(diff => {
                        const count = questionBank.filter(q => q.domain === domain && q.difficulty === diff).length;
                        return (
                          <TouchableOpacity key={diff}
                            style={{ flex: 1, backgroundColor: diff === "Easy" ? "#1a3a2a" : diff === "Medium" ? "#3a2a10" : "#3a1a1a", padding: 10, borderRadius: 8, alignItems: "center", opacity: count === 0 ? 0.3 : 1 }}
                            disabled={count === 0}
                            onPress={() => startDrill(domain, diff)}>
                            <Text style={{ color: diff === "Easy" ? "#4caf50" : diff === "Medium" ? "#f5c518" : "#ff4d4d", fontWeight: "700", fontSize: 13 }}>{diff}</Text>
                            <Text style={{ color: "#475569", fontSize: 11, marginTop: 2 }}>{count}q</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                ))}
                <Text style={{ color: "#4caf50", fontWeight: "700", marginBottom: 10, marginTop: 10 }}>📝 Reading & Writing</Text>
                {READING_WRITING.map(domain => (
                  <View key={domain} style={{ backgroundColor: "#151c36", borderRadius: 12, padding: 14, marginBottom: 10 }}>
                    <Text style={{ color: "#fff", fontWeight: "700", marginBottom: 10 }}>{domain}</Text>
                    <View style={{ flexDirection: "row", gap: 8 }}>
                      {DIFFICULTIES.map(diff => {
                        const count = questionBank.filter(q => q.domain === domain && q.difficulty === diff).length;
                        return (
                          <TouchableOpacity key={diff}
                            style={{ flex: 1, backgroundColor: diff === "Easy" ? "#1a3a2a" : diff === "Medium" ? "#3a2a10" : "#3a1a1a", padding: 10, borderRadius: 8, alignItems: "center", opacity: count === 0 ? 0.3 : 1 }}
                            disabled={count === 0}
                            onPress={() => startDrill(domain, diff)}>
                            <Text style={{ color: diff === "Easy" ? "#4caf50" : diff === "Medium" ? "#f5c518" : "#ff4d4d", fontWeight: "700", fontSize: 13 }}>{diff}</Text>
                            <Text style={{ color: "#475569", fontSize: 11, marginTop: 2 }}>{count}q</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                ))}
              </ScrollView>
            )}

            {/* Active drill */}
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
                  <View style={{ height: 4, backgroundColor: "#151c36" }}>
                    <View style={{ height: 4, backgroundColor: drillTimeLeft <= 10 ? "#ff4d4d" : "#f5c518", width: `${(drillTimeLeft / (DRILL_TIMES[drillDifficulty] || 45)) * 100}%` }} />
                  </View>
                  <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
                    <View style={{ backgroundColor: "#151c36", borderRadius: 14, padding: 20, marginBottom: 20 }}>
                      <Text style={{ color: "#9aa4c7", fontSize: 11, marginBottom: 8 }}>{q.domain} · {q.difficulty}</Text>
                      <Text style={{ color: "#fff", fontSize: 16, lineHeight: 26 }}>{q.question}</Text>
                    </View>
                    {q.choices.map((c, i) => {
                      const letter = ["A","B","C","D"][i];
                      const isCorrect = i === q.answer;
                      const isSelected = drillAnswer === i;
                      const isWrong = drillAnswer === -1 && isCorrect;
                      let bg = "#151c36";
                      if (isAnswered && isCorrect) bg = "#1a4d2e";
                      else if (isAnswered && isSelected && !isCorrect) bg = "#4d1a1a";
                      else if (isAnswered && drillAnswer === -1 && isCorrect) bg = "#1a4d2e";
                      return (
                        <TouchableOpacity key={i}
                          style={{ backgroundColor: bg, borderRadius: 12, padding: 14, marginBottom: 10, flexDirection: "row", gap: 12, alignItems: "center", borderWidth: 1, borderColor: isAnswered && isCorrect ? "#4caf50" : "#2a3a5c" }}
                          disabled={isAnswered}
                          onPress={() => {
                            if (drillTimerRef.current) clearInterval(drillTimerRef.current);
                            setDrillAnswer(i);
                            if (i === q.answer) setDrillScore(prev => prev + 1);
                          }}>
                          <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: "#0b1020", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "#9aa4c7", fontWeight: "700" }}>{letter}</Text>
                          </View>
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
                        <TouchableOpacity style={{ backgroundColor: "#f5c518", padding: 16, borderRadius: 12, alignItems: "center" }}
                          onPress={() => nextDrillQuestion()}>
                          <Text style={{ color: "#070d1f", fontWeight: "800", fontSize: 16 }}>
                            {drillIndex + 1 >= drillQuestions.length ? "Finish Drill" : "Next Question →"}
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </ScrollView>
                </View>
              );
            })()}

            {/* Drill finished */}
            {drillFinished && (
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 30 }}>
                <Text style={{ color: "#f5c518", fontSize: 60, fontWeight: "800" }}>{drillScore}/{drillQuestions.length}</Text>
                <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700", marginTop: 8 }}>
                  {drillScore === drillQuestions.length ? "Perfect! 🎉" : drillScore >= drillQuestions.length * 0.7 ? "Great job! 💪" : "Keep drilling! 📚"}
                </Text>
                <Text style={{ color: "#9aa4c7", marginTop: 4 }}>{drillDomain} · {drillDifficulty}</Text>
                <View style={{ flexDirection: "row", gap: 12, marginTop: 30 }}>
                  <TouchableOpacity style={{ flex: 1, backgroundColor: "#1f2a52", padding: 14, borderRadius: 12, alignItems: "center" }}
                    onPress={() => { setDrillDomain(null); setDrillDifficulty(null); setDrillFinished(false); }}>
                    <Text style={{ color: "#fff", fontWeight: "700" }}>New Drill</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1, backgroundColor: "#f5c518", padding: 14, borderRadius: 12, alignItems: "center" }}
                    onPress={() => startDrill(drillDomain, drillDifficulty)}>
                    <Text style={{ color: "#070d1f", fontWeight: "700" }}>Try Again</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </SafeAreaView>
        </Modal>
      </ScrollView>
    <CasperBot onPress={() => setStudyBotVisible(true)} />
    <Modal visible={studyBotVisible} animationType="slide">
  <SafeAreaView style={{ flex: 1, backgroundColor: "#070d1f" }}>
    <View style={{ flexDirection: "row", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: "#151c36", gap: 12 }}>
      <TouchableOpacity onPress={() => setStudyBotVisible(false)}>
        <Text style={{ color: "#9aa4c7", fontSize: 16 }}>✕</Text>
      </TouchableOpacity>
      <Image source={require("./logo.png")} style={{ width: 38, height: 38, borderRadius: 10 }} resizeMode="contain" />
      <View style={{ flex: 1 }}>
        <Text style={{ color: "#fff", fontWeight: "800", fontSize: 16 }}>Casper</Text>
        <Text style={{ color: "#38bdf8", fontSize: 11 }}>Your AscendSAT Study Bot · Always here</Text>
      </View>
      <TouchableOpacity onPress={() => setBotMessages([{ role: "assistant", content: "Hi! I'm Casper, your AscendSAT study bot 👋 Ask me anything about SAT Math, Reading & Writing, vocabulary, or strategy!" }])}>
        <Text style={{ color: "#475569", fontSize: 12 }}>Clear</Text>
      </TouchableOpacity>
    </View>

    {botMessages.length <= 1 && (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ maxHeight: 52 }} contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10, gap: 8 }}>
        {[
          "How do I solve systems of equations?",
          "Best strategy for time management?",
          "Explain Craft & Structure questions",
          "Help me with comma rules",
          "Hardest SAT math topics?",
        ].map((chip, i) => (
          <TouchableOpacity key={i}
            style={{ backgroundColor: "#0f1829", borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6, borderWidth: 1, borderColor: "#1a2540" }}
            onPress={() => setBotInput(chip)}>
            <Text style={{ color: "#9aa4c7", fontSize: 12 }}>{chip}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    )}

    <ScrollView
      ref={botScrollRef}
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
      onContentSizeChange={() => botScrollRef.current?.scrollToEnd({ animated: true })}
    >
      {botMessages.map((msg, i) => {
        const isBot = msg.role === "assistant";
        return (
          <View key={i} style={{ marginBottom: 16, alignItems: isBot ? "flex-start" : "flex-end" }}>
            {isBot && (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <Image source={require("./logo.png")} style={{ width: 22, height: 22, borderRadius: 6 }} resizeMode="contain" />
                <Text style={{ color: "#38bdf8", fontSize: 11, fontWeight: "700" }}>Casper</Text>
              </View>
            )}
            <View style={{
              maxWidth: "85%",
              backgroundColor: isBot ? "#0f1829" : "#1d4ed8",
              borderRadius: 16,
              borderTopLeftRadius: isBot ? 4 : 16,
              borderTopRightRadius: isBot ? 16 : 4,
              padding: 14,
              borderWidth: isBot ? 1 : 0,
              borderColor: "#1a2540",
            }}>
              <Text style={{ color: "#fff", fontSize: 14, lineHeight: 22 }}>{msg.content}</Text>
            </View>
          </View>
        );
      })}

      {botLoading && (
        <View style={{ alignItems: "flex-start", marginBottom: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <Image source={require("./logo.png")} style={{ width: 22, height: 22, borderRadius: 6 }} resizeMode="contain" />
            <Text style={{ color: "#38bdf8", fontSize: 11, fontWeight: "700" }}>Casper</Text>
          </View>
          <View style={{ backgroundColor: "#0f1829", borderRadius: 16, borderTopLeftRadius: 4, padding: 14, borderWidth: 1, borderColor: "#1a2540" }}>
            <Text style={{ color: "#475569", fontSize: 14 }}>Thinking...</Text>
          </View>
        </View>
      )}
    </ScrollView>

    <View style={{ padding: 12, borderTopWidth: 1, borderTopColor: "#151c36", flexDirection: "row", alignItems: "flex-end", gap: 10, backgroundColor: "#070d1f" }}>
      <TextInput
        style={{ flex: 1, backgroundColor: "#0f1829", color: "#fff", padding: 12, borderRadius: 14, fontSize: 14, maxHeight: 100, borderWidth: 1, borderColor: "#1a2540", lineHeight: 20 }}
        value={botInput}
        onChangeText={setBotInput}
        placeholder="Ask Casper anything..."
        placeholderTextColor="#475569"
        multiline
        onSubmitEditing={sendBotMessage}
      />
      <TouchableOpacity
        style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: botInput.trim() ? "#1d4ed8" : "#151c36", justifyContent: "center", alignItems: "center" }}
        onPress={sendBotMessage}
        disabled={!botInput.trim() || botLoading}
      >
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
          onPress={() => setCurrentQ(p => Math.max(0, p - 1))}
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
          <TouchableOpacity style={[bb.navBtn, bb.navBtnPrimary]} onPress={() => setCurrentQ(p => p + 1)}>
            <Text style={bb.navBtnPrimaryText}>Next →</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[bb.navBtn, bb.navBtnFinish]} onPress={finishQuiz}>
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

const makeStyles = (light) => {
  const bg   = light ? "#f8fafc" : T.bg1;
  const card = light ? "#ffffff" : T.bg2;
  const bdr  = light ? "#e2e8f0" : T.bg4;
  const tx1  = light ? T.t4      : T.t1;
  const tx2  = light ? T.t3      : T.t2;
  const acc  = light ? T.blue    : T.gold;
  return StyleSheet.create({
  container: { flex: 1, backgroundColor: bg, padding: 20 },
  containerLight: { backgroundColor: "#f8fafc" },
  center: { flex: 1, justifyContent: "center", backgroundColor: bg, padding: 24 },
  logo: { color: acc, fontSize: 34, textAlign: "center", marginBottom: 8, fontWeight: "900", letterSpacing: -0.8 },
  title: { color: tx1, fontSize: 22, fontWeight: "800", marginBottom: 10, letterSpacing: -0.3 },
  subtitle: { color: tx2, marginTop: 4, marginBottom: 10, fontSize: 14, lineHeight: 22 },
  input: {
    backgroundColor: light ? "#fff" : T.bg2,
    padding: 14, borderRadius: T.r_md,
    color: tx1, marginBottom: 10,
    borderWidth: 1, borderColor: bdr,
    fontSize: 15,
  },
  button: {
    backgroundColor: light ? T.blue : T.bg3,
    padding: 15, borderRadius: T.r_md, marginTop: 10,
    borderWidth: light ? 0 : 1, borderColor: T.bg4,
  },
  btnText: { color: "#fff", textAlign: "center", fontWeight: "700", fontSize: 15 },
  link: { color: light ? T.blue : tx2, textAlign: "center", marginTop: 14, fontSize: 14 },
  error: { color: T.red, textAlign: "center", marginBottom: 10, fontSize: 14 },
  topBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  logout: { padding: 8, backgroundColor: light ? "#f1f5f9" : T.bg3, borderRadius: T.r_sm },
  backButton: {
    alignSelf: "flex-start", paddingVertical: 8, paddingHorizontal: 14,
    backgroundColor: light ? "#f1f5f9" : T.bg3,
    borderRadius: T.r_sm, marginBottom: 14,
    borderWidth: 1, borderColor: bdr,
  },
  backText: { color: tx1, fontWeight: "700", fontSize: 14 },
  row: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  box: {
    flex: 1, padding: 14, marginVertical: 5,
    backgroundColor: card, borderRadius: T.r_md,
    alignItems: "center",
    borderWidth: 1, borderColor: bdr,
  },
  activeBox: { borderWidth: 2, borderColor: acc },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  gridBox: {
    width: "48%", padding: 14, marginVertical: 6,
    backgroundColor: card, borderRadius: T.r_md,
    borderWidth: 1, borderColor: bdr,
  },
  activeGridBox: { borderWidth: 2, borderColor: acc },
  boxText: { color: tx1, textAlign: "center", fontWeight: "600", fontSize: 14 },
  check: { color: acc, textAlign: "center", marginTop: 5, fontWeight: "700" },
  countCard: {
    backgroundColor: card, padding: 18, borderRadius: T.r_lg,
    marginBottom: 16, marginTop: 6,
    borderWidth: 1, borderColor: bdr,
  },
  countTitle: { color: tx1, fontWeight: "800", fontSize: 16, marginBottom: 4 },
  countSub: { color: tx2, fontSize: 12, marginBottom: 14 },
  countRow: { flexDirection: "row", justifyContent: "space-between" },
  countItem: { flex: 1, alignItems: "center" },
  countNumber: { color: acc, fontWeight: "900", fontSize: 26, letterSpacing: -0.5 },
  countLabel: { color: tx2, fontSize: 11, marginTop: 3, textTransform: "uppercase", letterSpacing: 0.8, fontWeight: "700" },
  statCard: { backgroundColor: card, padding: 16, borderRadius: T.r_md, marginTop: 10, borderWidth: 1, borderColor: bdr },
  statTitle: { color: tx1, fontWeight: "700", marginBottom: 5, fontSize: 15 },
  statText: { color: tx2, marginTop: 2, fontSize: 14, lineHeight: 22 },
  statAcc: { color: acc, fontWeight: "700" },
  explanationText: { color: tx2, marginTop: 10, lineHeight: 22, fontSize: 14 },
  reviewCard: {
    backgroundColor: card, borderRadius: T.r_lg, padding: 18,
    marginBottom: 16, borderWidth: 1, borderColor: bdr,
  },
  reviewNum: { color: acc, fontWeight: "700", fontSize: 12, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 },
  reviewQuestion: { color: tx1, fontWeight: "600", marginBottom: 12, lineHeight: 24, fontSize: 15 },
  reviewChoice: { padding: 12, borderRadius: T.r_sm, marginBottom: 6, backgroundColor: light ? "#f8fafc" : T.bg3 },
  reviewCorrect: { backgroundColor: light ? "#f0fdf4" : "#0d2a18", borderWidth: 1, borderColor: light ? "#bbf7d0" : "#165a30" },
  reviewWrong: { backgroundColor: light ? "#fff5f5" : "#2a0d0d", borderWidth: 1, borderColor: light ? "#fecaca" : "#5a1515" },
  reviewChoiceText: { color: tx1, fontSize: 14, lineHeight: 22 },
  historyCard: {
    backgroundColor: card, borderRadius: T.r_lg, padding: 16,
    marginBottom: 12, borderWidth: 1, borderColor: bdr,
  },
  historyTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  historyScore: { color: tx1, fontSize: 20, fontWeight: "800", letterSpacing: -0.3 },
  historyPercent: { fontSize: 18, fontWeight: "800" },
  historyMeta: { color: tx2, fontSize: 13, marginTop: 3, lineHeight: 20 },
  comingSoon: { backgroundColor: card, padding: 16, borderRadius: T.r_md, marginTop: 10 },
  comingSoonText: { color: acc, textAlign: "center", fontWeight: "700" },
});
};
const styles = makeStyles(false);

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
  navLoginLight: { color: "#333", },
  navSignUp: { backgroundColor: "#f5c518", paddingHorizontal: 18, paddingVertical: 9, borderRadius: 22 },
  navSignUpLight: { backgroundColor: "#2563eb" },
  navSignUpText: { color: "#070d1f", fontWeight: "800", fontSize: 14 },
  navSignUpTextLight: { color: "#fff" },
  navLight: { backgroundColor: "#f4f5f7" },
  navLogoLight: { color: "#111827" },
  navThemeBtn: { backgroundColor: "#1f2a52", paddingHorizontal: 16, paddingVertical: 9, borderRadius: 22 },
  navThemeBtnLight: { backgroundColor: "#e2e8f0" },
  navThemeText: { color: "#f5f7ff", fontWeight: "700", fontSize: 14 },
  navThemeTextLight: { color: "#334155" },

  hero: { paddingHorizontal: 24, paddingTop: 52, paddingBottom: 56, alignItems: "flex-start" },
  heroLight: { backgroundColor: "#f4f5f7" },
  heroBadge: { backgroundColor: "#0a1220", borderRadius: 24, paddingHorizontal: 16, paddingVertical: 9, marginBottom: 28, borderWidth: 1, borderColor: "#1d4ed830", flexDirection: "row", alignItems: "center", gap: 8, alignSelf: "flex-start" },
  heroBadgeLight: { backgroundColor: "#e2e8f0", borderColor: "#cbd5e1" },
  heroBadgeDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: "#4caf50" },
  heroBadgeDotLight: { backgroundColor: "#2563eb" },
  heroBadgeText: { color: "#6a7a9a", fontSize: 12, fontWeight: "700", letterSpacing: 0.3 },
  heroBadgeTextLight: { color: "#475569" },
  heroTitle: { color: "#fff", fontSize: 46, fontWeight: "900", lineHeight: 54, marginBottom: 22, letterSpacing: -1.5 },
  heroTitleLight: { color: "#111827" },
  heroSub: { color: "#6a7a9a", fontSize: 16, lineHeight: 28, marginBottom: 36 },
  heroSubLight: { color: "#475569" },
  heroBtn: { backgroundColor: "#f5c518", paddingHorizontal: 28, paddingVertical: 18, borderRadius: 16, marginBottom: 14, width: "100%", alignItems: "center", shadowColor: "#f5c518", shadowOpacity: 0.35, shadowRadius: 24, shadowOffset: { width: 0, height: 8 }, elevation: 8 },
  heroBtnLight: { backgroundColor: "#2563eb", shadowColor: "#2563eb", shadowOpacity: 0.2, shadowRadius: 12 },
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
  scoreBannerLight: { backgroundColor: "#ffffff", borderColor: "#e2e8f0" },
  scoreBannerLabel: { color: "#1d4ed8", fontSize: 10, fontWeight: "900", letterSpacing: 2.5, marginBottom: 10, textTransform: "uppercase" },
  scoreBannerNum: { color: "#f5c518", fontSize: 72, fontWeight: "900", letterSpacing: -3, lineHeight: 76 },
  scoreBannerSub: { color: "#4a5a7a", fontSize: 13, marginTop: 8, textAlign: "center", lineHeight: 20 },

  statsRow: { flexDirection: "row", marginHorizontal: 20, marginBottom: 8, backgroundColor: "#080e1e", borderRadius: 20, padding: 20, justifyContent: "space-around", borderWidth: 1, borderColor: "#141e34", gap: 4 },
  statsRowLight: { backgroundColor: "#ffffff", borderColor: "#e2e8f0" },
  statBox: { alignItems: "center", flex: 1 },
  statVal: { color: "#f5c518", fontSize: 18, fontWeight: "900", letterSpacing: -0.5 },
  statLabel: { color: "#3a4a6a", fontSize: 10, marginTop: 4, textAlign: "center", fontWeight: "700", letterSpacing: 0.5, textTransform: "uppercase" },
  statLabelLight: { color: "#64748b" },

  section: { paddingHorizontal: 24, paddingTop: 52, paddingBottom: 8 },
  sectionLight: { backgroundColor: "#f8fafc" },
  sectionLabel: { color: "#1d4ed8", fontSize: 11, fontWeight: "800", letterSpacing: 2, marginBottom: 10 },
  sectionLabelLight: { color: "#2563eb" },
  sectionTitle: { color: "#fff", fontSize: 30, fontWeight: "900", lineHeight: 38, marginBottom: 28, letterSpacing: -0.5 },
  sectionTitleLight: { color: "#0f172a" },

  featureCard: { backgroundColor: "#0a1428", borderRadius: 18, padding: 18, borderWidth: 1, borderColor: "#1a2540" },
  featureCardLight: { backgroundColor: "#ffffff", borderColor: "#cbd5e1" },
  featureCardWideLight: { backgroundColor: "#ffffff", borderColor: "#cbd5e1" },
  featureTitle: { color: "#fff", fontWeight: "800", fontSize: 15, marginBottom: 4 },
  featureTitleLight: { color: "#0f172a" },
  featureDesc: { color: "#9aa4c7", fontSize: 13, lineHeight: 20 },
  featureDescLight: { color: "#475569" },
  featureCardWide: { backgroundColor: "#0a1428", borderRadius: 18, padding: 20, flexDirection: "row", gap: 16, alignItems: "flex-start", borderWidth: 1, borderColor: "#1a2540" },
  featureIconBox: { width: 48, height: 48, borderRadius: 14, justifyContent: "center", alignItems: "center" },
  featureIcon: { fontSize: 24 },

  bluebookCard: { backgroundColor: "#0a1428", borderRadius: 18, padding: 20, borderWidth: 1, borderColor: "#1a2540", gap: 14 },
  bluebookCardLight: { backgroundColor: "#ffffff", borderColor: "#cbd5e1" },
  bluebookRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  bluebookCheck: { color: "#4caf50", fontWeight: "800", fontSize: 16, marginTop: 1 },
  bluebookText: { color: "#fff", fontSize: 15, flex: 1, lineHeight: 22 },
  bluebookTextLight: { color: "#0f172a" },

  domainPill: { backgroundColor: "#0a1428", borderRadius: 10, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: "#1a2540" },
  domainPillLight: { backgroundColor: "#f1f5f9", borderColor: "#e2e8f0" },
  domainPillText: { color: "#9aa4c7", fontSize: 13 },
  domainPillTextLight: { color: "#334155" },

  classCard: { backgroundColor: "#0a1428", borderRadius: 18, padding: 20, marginBottom: 14, borderWidth: 1, borderColor: "#1a2540" },
  classCardLight: { backgroundColor: "#ffffff", borderColor: "#cbd5e1" },
  classCardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  classCardTitle: { color: "#fff", fontWeight: "800", fontSize: 16, flex: 1 },
  classCardTitleLight: { color: "#0f172a" },
  classCardDate: { color: "#9aa4c7", fontSize: 13, marginBottom: 6 },
  classCardDateLight: { color: "#475569" },
  classCardDesc: { color: "#9aa4c7", fontSize: 14, lineHeight: 20, marginBottom: 8 },
  classCardDescLight: { color: "#475569" },
  classCardDuration: { color: "#475569", fontSize: 13, marginBottom: 14 },
  classCardDurationLight: { color: "#64748b" },
  classBookBtn: { backgroundColor: "#f5c518", padding: 13, borderRadius: 10, alignItems: "center" },
  classBookBtnText: { color: "#070d1f", fontWeight: "800", fontSize: 15 },
  classBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  classBadgeFree: { backgroundColor: "#14532d" },
  classBadgePaid: { backgroundColor: "#1e3a5f" },
  classBadgeText: { color: "#fff", fontWeight: "700", fontSize: 12 },

  emptyClasses: { backgroundColor: "#0a1428", borderRadius: 18, padding: 28, alignItems: "center", marginBottom: 14, borderWidth: 1, borderColor: "#1a2540" },
  emptyClassesText: { color: "#fff", fontWeight: "800", fontSize: 16, marginBottom: 8 },

  testimonialCard: { backgroundColor: "#0a1428", borderRadius: 18, padding: 20, marginBottom: 14, borderWidth: 1, borderColor: "#1a2540" },
  testimonialCardLight: { backgroundColor: "#ffffff", borderColor: "#cbd5e1" },
  testimonialQuote: { color: "#e2e8f0", fontSize: 15, lineHeight: 26, marginBottom: 16, fontStyle: "italic" },
  testimonialQuoteLight: { color: "#334155" },
  testimonialFooter: { flexDirection: "row", alignItems: "center", gap: 12 },
  testimonialAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#1a2540", justifyContent: "center", alignItems: "center", borderWidth: 1.5, borderColor: "#f5c51840" },
  testimonialName: { color: "#f5c518", fontWeight: "700", fontSize: 14 },
  testimonialScore: { color: "#9aa4c7", fontSize: 13, marginTop: 2 },

  faqCard: { backgroundColor: "#0a1428", borderRadius: 16, padding: 18, marginBottom: 10, borderWidth: 1, borderColor: "#1a2540" },
  faqCardLight: { backgroundColor: "#ffffff", borderColor: "#cbd5e1" },
  faqQ: { color: "#fff", fontWeight: "700", fontSize: 15, marginBottom: 8 },
  faqQLight: { color: "#0f172a" },
  faqA: { color: "#9aa4c7", fontSize: 14, lineHeight: 22 },
  faqALight: { color: "#475569" },

  ctaBanner: { margin: 20, backgroundColor: "#0a1428", borderRadius: 24, padding: 32, alignItems: "center", borderWidth: 1, borderColor: "#1d4ed830" },
  ctaBannerLight: { backgroundColor: "#ffffff", borderColor: "#cbd5e1" },
  ctaTitleLight: { color: "#0f172a" },
  ctaSubLight: { color: "#475569" },
  ctaTitle: { color: "#fff", fontSize: 26, fontWeight: "900", marginBottom: 10, textAlign: "center", lineHeight: 34, letterSpacing: -0.5 },
  ctaSub: { color: "#9aa4c7", fontSize: 15, marginBottom: 24, textAlign: "center" },
  ctaBtn: { backgroundColor: "#f5c518", paddingHorizontal: 28, paddingVertical: 16, borderRadius: 14, width: "100%", alignItems: "center", marginBottom: 4 },
  ctaBtnText: { color: "#070d1f", fontWeight: "800", fontSize: 17 },

  footer: { paddingHorizontal: 24, paddingTop: 36, paddingBottom: 24, alignItems: "center", borderTopWidth: 1, borderTopColor: "#1a2540", gap: 6 },
  footerLogo: { color: "#f5c518", fontSize: 20, fontWeight: "800" },
  footerTagline: { color: "#9aa4c7", fontSize: 13 },
  footerInsta: { color: "#f5c518", fontSize: 14, fontWeight: "600", marginTop: 6, marginBottom: 6 },
  footerCopy: { color: "#475569", fontSize: 12 },
});
