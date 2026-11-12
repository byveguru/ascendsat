import LessonActivity from "./LessonActivity";
import lessonCheckpoints from "../desmos/lessonCheckpoints.json";
import { ascentTheme, fonts } from "../theme";
import { makeStudyStyles } from "../appStyles";
import React, { useState } from "react";
import { Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import QuizDesmosEmbed from "./QuizDesmosEmbed";
import {
  DESMOS_LESSONS,
  type DesmosLesson,
  type DesmosPracticeQuestion,
} from "../desmos/desmosLessons";

const checkpointsByLesson: Record<string, any[]> = lessonCheckpoints;
type Phase = "guide" | "try" | "practice";

type DesmosLessonsScreenProps = {
  isLight: boolean;
  onClose: () => void;
};

function PracticeBlock({
  questions,
  isLight,
  onDone,
}: {
  questions: DesmosPracticeQuestion[];
  isLight: boolean;
  onDone: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);
  const calcHeight = Platform.OS === "web" ? 320 : 300;

  const t = ascentTheme(isLight);
  const study = makeStudyStyles(isLight);
  const cardBg = t.surface;
  const textColor = t.ink;
  const subColor = t.muted;
  const border = t.border;
  const accent = isLight ? t.forest : t.terracotta;

  const kindLabel = (kind: DesmosPracticeQuestion["kind"]) =>
    kind === "desmos" ? { text: "Use Desmos", bg: t.soft, color: accent } : { text: "Theory", bg: isLight ? t.background : "#121a2e", color: subColor };

  if (finished) {
    const correct = questions.reduce((sum, q, i) => sum + (answers[i] === q.answer ? 1 : 0), 0);
    return (
      <ScrollView contentContainerStyle={[study.content, { gap: 0 }]}>
        <Text style={{ color: textColor, fontSize: 28, fontFamily: fonts.studyDisplay, fontWeight: "700", marginBottom: 20 }}>Practice Results</Text>
        <View style={{ backgroundColor: cardBg, borderRadius: 12, padding: 24, alignItems: "center", marginBottom: 20, borderWidth: 1, borderColor: border }}>
          <Text style={{ color: correct === questions.length ? t.forest : correct >= Math.ceil(questions.length / 2) ? t.terracotta : t.terracotta, fontSize: 52, fontWeight: "700" }}>{correct}/{questions.length}</Text>
          <Text style={{ color: subColor, fontSize: 13, marginTop: 4 }}>{Math.round((correct / questions.length) * 100)}% correct</Text>
        </View>
        {questions.map((q, i) => {
          const ok = answers[i] === q.answer;
          return (
            <View key={i} style={{ backgroundColor: cardBg, borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderLeftWidth: 4, borderColor: border, borderLeftColor: ok ? t.forest : t.terracotta }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <Text style={{ color: subColor, fontSize: 11, fontWeight: "700" }}>QUESTION {i + 1}</Text>
                <View style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, backgroundColor: kindLabel(q.kind).bg }}>
                  <Text style={{ color: kindLabel(q.kind).color, fontSize: 10, fontWeight: "700" }}>{kindLabel(q.kind).text}</Text>
                </View>
              </View>
              <Text style={{ color: textColor, fontSize: 14, lineHeight: 22, marginBottom: 8 }}>{q.question}</Text>
              <Text style={{ color: ok ? t.forest : t.incorrectText, fontWeight: "700", fontSize: 13 }}>{ok ? "✅ Correct" : `❌ You chose: ${q.choices[answers[i]] ?? "Skipped"}`}</Text>
              {!ok && <Text style={{ color: t.forest, fontSize: 13, marginTop: 4 }}>✓ Correct: {q.choices[q.answer]}</Text>}
              <Text style={{ color: subColor, fontSize: 12, marginTop: 6, fontStyle: "italic", lineHeight: 18 }}>💡 {q.explanation}</Text>
            </View>
          );
        })}
        <TouchableOpacity style={{ backgroundColor: t.terracotta, padding: 16, borderRadius: 12, alignItems: "center" }} onPress={onDone}>
          <Text style={{ color: t.ink, fontWeight: "700", fontSize: 16 }}>Back to Lessons</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  const q = questions[index];
  const selected = answers[index] ?? null;
  const answered = selected !== null;
  const badge = kindLabel(q.kind);

  return (
    <ScrollView contentContainerStyle={[study.content, { gap: 0 }]}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <Text style={{ color: subColor, fontSize: 12, fontWeight: "700", letterSpacing: 1 }}>PRACTICE {index + 1}/{questions.length}</Text>
        <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, backgroundColor: badge.bg, borderWidth: 1, borderColor: q.kind === "desmos" ? (isLight ? t.border : t.soft) : border }}>
          <Text style={{ color: badge.color, fontSize: 10, fontWeight: "700" }}>{badge.text}</Text>
        </View>
      </View>
      <Text style={{ color: textColor, fontSize: 17, lineHeight: 28, marginBottom: 16 }}>{q.question}</Text>
      {q.kind === "desmos" ? (
        <View style={{ marginBottom: 16 }}>
          {q.desmosTask ? (
            <Text style={{ color: subColor, fontSize: 13, lineHeight: 20, marginBottom: 10 }}>{q.desmosTask}</Text>
          ) : null}
          <QuizDesmosEmbed height={calcHeight} />
          {q.desmosHints?.length ? (
            <View style={{ backgroundColor: cardBg, borderRadius: 10, padding: 12, marginTop: 10, borderWidth: 1, borderColor: border }}>
              {q.desmosHints.map((hint, i) => (
                <Text key={i} style={{ color: textColor, fontSize: 12, lineHeight: 20, marginBottom: i < (q.desmosHints?.length ?? 0) - 1 ? 4 : 0 }}>• {hint}</Text>
              ))}
            </View>
          ) : null}
        </View>
      ) : null}
      {q.choices.map((c, i) => {
        const isSelected = selected === i;
        const isCorrect = i === q.answer;
        let borderColor = border;
        let rowBg = cardBg;
        if (answered && isCorrect) {
          borderColor = t.forest;
          rowBg = t.soft;
        } else if (answered && isSelected && !isCorrect) {
          borderColor = t.incorrectBorder;
          rowBg = t.incorrectSurface;
        }
        return (
          <TouchableOpacity key={i} disabled={answered} onPress={() => setAnswers((prev) => ({ ...prev, [index]: i }))} style={{ padding: 14, marginBottom: 10, borderRadius: 10, borderWidth: 1.5, borderColor, backgroundColor: rowBg }}>
            <Text style={{ color: textColor, fontSize: 15, lineHeight: 22 }}>{c}</Text>
          </TouchableOpacity>
        );
      })}
      {answered ? (
        <>
          <View style={{ backgroundColor: t.soft, borderRadius: 12, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: isLight ? "#bbf7d0" : t.soft }}>
            <Text style={{ color: t.forest, fontWeight: "700", marginBottom: 4 }}>💡 Explanation</Text>
            <Text style={{ color: isLight ? "#166534" : t.forest, fontSize: 13, lineHeight: 20 }}>{q.explanation}</Text>
          </View>
          {index < questions.length - 1 ? (
            <TouchableOpacity style={{ backgroundColor: "#1e3a5f", padding: 16, borderRadius: 12, alignItems: "center" }} onPress={() => setIndex(index + 1)}>
              <Text style={{ color: t.onAccent, fontWeight: "700" }}>Next Question →</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={{ backgroundColor: t.forest, padding: 16, borderRadius: 12, alignItems: "center" }} onPress={() => setFinished(true)}>
              <Text style={{ color: t.onAccent, fontWeight: "700" }}>See Results ✓</Text>
            </TouchableOpacity>
          )}
        </>
      ) : null}
    </ScrollView>
  );
}

function LessonDetail({ lesson, isLight, onBack }: { lesson: DesmosLesson; isLight: boolean; onBack: () => void }) {
  const [phase, setPhase] = useState<Phase>("guide");

  const bg = ascentTheme(isLight).background;
  const t = ascentTheme(isLight);
  const study = makeStudyStyles(isLight);
  const cardBg = t.surface;
  const textColor = t.ink;
  const subColor = t.muted;
  const border = t.border;
  const accent = isLight ? t.forest : t.terracotta;
  const calcHeight = Platform.OS === "web" ? 380 : 352;

  const phases: { id: Phase; label: string }[] = [
    { id: "guide", label: "Learn" },
    { id: "try", label: "Try It" },
    { id: "practice", label: "Practice" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16, borderBottomWidth: 1, borderBottomColor: border }}>
        <TouchableOpacity onPress={onBack}><Text style={{ color: subColor, fontSize: 16 }}>← Lessons</Text></TouchableOpacity>
        <Text style={{ color: textColor, fontWeight: "700", fontSize: 14, flex: 1, textAlign: "center" }} numberOfLines={1}>{lesson.title}</Text>
        <View style={{ width: 72 }} />
      </View>

      <View style={{ flexDirection: "row", paddingHorizontal: 12, paddingVertical: 10, gap: 6, borderBottomWidth: 1, borderBottomColor: border }}>
        {phases.map(({ id, label }) => {
          const active = phase === id;
          return (
            <TouchableOpacity key={id} onPress={() => setPhase(id)} style={{ flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: "center", backgroundColor: active ? (t.soft) : "transparent", borderWidth: 1, borderColor: active ? accent : border }}>
              <Text style={{ color: active ? accent : subColor, fontWeight: "700", fontSize: 11 }}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {phase === "guide" ? (
        <ScrollView contentContainerStyle={[study.content, { gap: 0 }]}>
          <Text style={{ color: textColor, fontSize: 24, fontWeight: "700", marginBottom: 4 }}>{lesson.title}</Text>
          <Text style={{ color: subColor, fontSize: 13, lineHeight: 20, marginBottom: 18 }}>{lesson.subtitle}</Text>

          <View style={{ backgroundColor: t.soft, borderRadius: 12, padding: 18, borderWidth: 1, borderColor: isLight ? t.border : t.soft, marginBottom: 16 }}>
            <Text style={{ color: accent, fontWeight: "700", fontSize: 12, letterSpacing: 0, marginBottom: 10 }}>WHEN TO USE THIS</Text>
            {lesson.whenToUse.map((item, i) => (
              <Text key={i} style={{ color: textColor, fontSize: 14, lineHeight: 22, marginBottom: 8 }}>• {item}</Text>
            ))}
          </View>

          <View style={{ backgroundColor: isLight ? "#fff7ed" : "#1a1200", borderRadius: 12, padding: 18, borderWidth: 1, borderColor: isLight ? "#fed7aa" : "#3a2a00", marginBottom: 16 }}>
            <Text style={{ color: isLight ? "#c2410c" : "#f59e0b", fontWeight: "700", fontSize: 12, letterSpacing: 0, marginBottom: 10 }}>WHEN NOT TO LEAN ON DESMOS</Text>
            {lesson.avoidWhen.map((item, i) => (
              <Text key={i} style={{ color: textColor, fontSize: 14, lineHeight: 22, marginBottom: 8 }}>• {item}</Text>
            ))}
          </View>

          <View style={{ backgroundColor: cardBg, borderRadius: 12, padding: 18, borderWidth: 1, borderColor: border, marginBottom: 16 }}>
            <Text style={{ color: accent, fontWeight: "700", fontSize: 12, letterSpacing: 0, marginBottom: 10 }}>FAST WORKFLOW</Text>
            {lesson.workflow.map((item, i) => (
              <Text key={i} style={{ color: textColor, fontSize: 14, lineHeight: 22, marginBottom: 8 }}>{i + 1}. {item}</Text>
            ))}
          </View>

          {lesson.guideSteps.map((step, i) => (
            <View key={step.title} style={{ backgroundColor: cardBg, borderRadius: 12, padding: 18, borderWidth: 1, borderColor: border, marginBottom: 14 }}>
              <Text style={{ color: accent, fontWeight: "700", fontSize: 12, letterSpacing: 0, marginBottom: 8 }}>TEACHING POINT {i + 1}</Text>
              <Text style={{ color: textColor, fontSize: 18, fontWeight: "700", marginBottom: 8 }}>{step.title}</Text>
              <Text style={{ color: textColor, fontSize: 14, lineHeight: 24 }}>{step.body}</Text>
            </View>
          ))}

          <TouchableOpacity style={{ backgroundColor: t.terracotta, padding: 16, borderRadius: 12, alignItems: "center", marginTop: 6 }} onPress={() => setPhase("try")}>
            <Text style={{ color: t.ink, fontWeight: "700", fontSize: 16 }}>Open Try It →</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : null}

      {phase === "try" ? (
        <ScrollView contentContainerStyle={[study.content, { gap: 0 }]}>
          <Text style={{ color: textColor, fontSize: 18, fontWeight: "700", marginBottom: 8 }}>{lesson.tryIt.prompt}</Text>
          <Text style={{ color: subColor, fontSize: 14, lineHeight: 22, marginBottom: 16 }}>{lesson.tryIt.task}</Text>
          {lesson.tryIt.starterExpressions?.length ? (
            <View style={{ backgroundColor: cardBg, borderRadius: 12, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: border }}>
              <Text style={{ color: accent, fontWeight: "700", fontSize: 11, letterSpacing: 0, marginBottom: 8 }}>TRY TYPING IN DESMOS</Text>
              {lesson.tryIt.starterExpressions.map((expr, i) => (
                <Text key={expr.id || i} style={{ color: textColor, fontSize: 13, fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace", marginBottom: 6 }}>
                  {expr.latex.replace(/\\operatorname\{([^}]+)\}/g, "$1").replace(/\\%/g, "%").replace(/\\cdot/g, "·").replace(/_\{(\d+)\}/g, "$1").replace(/\^(\d+)/g, "^$1")}
                </Text>
              ))}
            </View>
          ) : null}
          {(checkpointsByLesson[lesson.id] || []).filter(block => block.type === "prediction").map(block => <LessonActivity key={block.id} block={block} isLight={isLight} />)}
          <QuizDesmosEmbed height={calcHeight} />
          {(checkpointsByLesson[lesson.id] || []).filter(block => block.type === "reflection").map(block => <LessonActivity key={block.id} block={block} isLight={isLight} />)}
          <View style={{ backgroundColor: cardBg, borderRadius: 14, padding: 16, marginTop: 16, borderWidth: 1, borderColor: border }}>
            <Text style={{ color: accent, fontWeight: "700", fontSize: 12, letterSpacing: 0, marginBottom: 10 }}>HINTS</Text>
            {lesson.tryIt.hints.map((hint, i) => (
              <Text key={i} style={{ color: textColor, fontSize: 13, lineHeight: 22, marginBottom: 8 }}>• {hint}</Text>
            ))}
          </View>
          <TouchableOpacity style={{ backgroundColor: t.forest, padding: 16, borderRadius: 12, alignItems: "center", marginTop: 20 }} onPress={() => setPhase("practice")}>
            <Text style={{ color: t.onAccent, fontWeight: "700", fontSize: 16 }}>Go to Practice →</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : null}

      {phase === "practice" ? <PracticeBlock questions={lesson.practiceQuestions} isLight={isLight} onDone={onBack} /> : null}
    </View>
  );
}

export default function DesmosLessonsScreen({ isLight, onClose }: DesmosLessonsScreenProps) {
  const [selected, setSelected] = useState<DesmosLesson | null>(null);

  const bg = ascentTheme(isLight).background;
  const t = ascentTheme(isLight);
  const study = makeStudyStyles(isLight);
  const cardBg = t.surface;
  const textColor = t.ink;
  const subColor = t.muted;
  const border = t.border;

  if (selected) {
    return <LessonDetail lesson={selected} isLight={isLight} onBack={() => setSelected(null)} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: border }}>
        <View>
          <Text style={{ color: textColor, fontWeight: "700", fontSize: 18 }}>📐 Desmos Lessons</Text>
          <Text style={{ color: subColor, fontSize: 12, marginTop: 2 }}>Same Desmos calculator as quizzes · Learn → Try → Practice</Text>
        </View>
        <TouchableOpacity onPress={onClose}><Text style={{ color: subColor, fontSize: 16 }}>✕ Close</Text></TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={[study.content, { gap: 0 }]}>
        <View style={{ backgroundColor: isLight ? "#0f2744" : "#121214", borderRadius: 14, padding: 16, marginBottom: 18, borderWidth: 1, borderColor: isLight ? "#1e4a7a" : "#2a2a30" }}>
          <Text style={{ color: t.terracotta, fontWeight: "700", fontSize: 13, marginBottom: 6 }}>BUILT FOR THE DIGITAL SAT</Text>
          <Text style={{ color: isLight ? t.text : t.muted, fontSize: 13, lineHeight: 20 }}>
            Each lesson uses the full desmos.com/calculator embed from quizzes. Type the expressions yourself in Try It, then move on to practice.
          </Text>
        </View>
        {DESMOS_LESSONS.map((lesson, i) => (
          <TouchableOpacity key={lesson.id} onPress={() => setSelected(lesson)} style={{ backgroundColor: cardBg, borderRadius: 12, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: border }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <View style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: t.soft, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 18 }}>{lesson.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: subColor, fontSize: 11, fontWeight: "700" }}>LESSON {i + 1}</Text>
                <Text style={{ color: textColor, fontWeight: "700", fontSize: 16 }}>{lesson.title}</Text>
                <Text style={{ color: subColor, fontSize: 12, marginTop: 2 }}>{lesson.subtitle}</Text>
              </View>
              <Text style={{ color: subColor, fontSize: 18 }}>›</Text>
            </View>
            <Text style={{ color: t.forest, fontSize: 12, fontWeight: "700" }}>{lesson.guideSteps.length} teaching points · {lesson.practiceQuestions.length} practice ({lesson.practiceQuestions.filter((q) => q.kind === "theory").length} theory · {lesson.practiceQuestions.filter((q) => q.kind === "desmos").length} Desmos)</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
