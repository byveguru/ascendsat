import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Svg, { G, Path, Rect, Text as SvgText } from "react-native-svg";
import { ascentTheme, fonts } from "../theme";
import { makeLessonVisualStyles, makeLessonSortStyles } from "../appStyles";
import { useLessonSandbox } from "../lib/useLessonSandbox";
import { binomialTail, simulateRepetitions } from "../lib/probabilityLab";

type Draft = { counts: number[]; samples: { outcomes: number[]; successes: number }[] };
export default function LessonSimulationLab({ block, isLight = true, scopeKey, renderCoach, hideTitle = false }: any) {
  const n = block.trialsPerRepetition, p = block.successProbability, threshold = block.atLeast;
  const s = makeLessonVisualStyles(isLight), sort = makeLessonSortStyles(isLight), t = ascentTheme(isLight);
  const [modelShown, setModelShown] = useState(false);
  const initial: Draft = { counts: Array(n + 1).fill(0), samples: [] };
  const { state, setState, ready, notice } = useLessonSandbox<Draft>(scopeKey, `${block.id}:${n}:${p}:${threshold}`, initial, (value: any): value is Draft => !!value && Array.isArray(value.counts) && value.counts.length === n + 1 && value.counts.every((count: any) => Number.isInteger(count) && count >= 0) && value.counts.reduce((sum: number, count: number) => sum + count, 0) <= 5000 && Array.isArray(value.samples) && value.samples.length <= 3 && value.samples.every((sample: any) => Array.isArray(sample.outcomes) && sample.outcomes.length === n && sample.outcomes.every((bit: any) => bit === 0 || bit === 1) && sample.successes === sample.outcomes.reduce((a: number, b: number) => a + b, 0)));
  const total = state.counts.reduce((sum, count) => sum + count, 0);
  const eventCount = state.counts.slice(threshold).reduce((sum, count) => sum + count, 0);
  const max = Math.max(1, ...state.counts), barWidth = 320 / (n + 1);
  const run = (requested: number) => {
    const amount = Math.min(requested, 5000 - total);
    const result = simulateRepetitions(n, p, amount);
    setState(previous => ({ counts: previous.counts.map((count, k) => count + result.counts[k]), samples: [...previous.samples, ...result.samples].slice(-3) }));
  };
  return <View style={s.section}>
    {!hideTitle && <Text accessibilityRole="header" style={s.title}>{block.title}</Text>}<Text style={s.body}>{block.prompt}</Text>
    <Text style={s.note}>One repetition has {n} independent attempts, each with success probability {p}. Count the repetitions with at least {threshold} successes. Simulated results vary; they are not experimental evidence about a real population.</Text>
    <View style={s.controls}>{total < 5000 && [1, 100, 1000].map(count => <TouchableOpacity key={count} accessibilityRole="button" disabled={!ready || total >= 5000} onPress={() => run(count)} style={[s.control, (!ready || total >= 5000) && sort.disabled]}><Text style={s.controlText}>Run {Math.min(count, 5000 - total)} more</Text></TouchableOpacity>)}<TouchableOpacity accessibilityRole="button" disabled={!ready} onPress={() => setState(initial)} style={s.control}><Text style={s.controlText}>Reset simulation</Text></TouchableOpacity></View>
    <Text accessibilityLiveRegion="polite" style={[s.body, { marginTop: 16 }]}>{total ? `${eventCount} of ${total} repetitions met the condition. Estimated probability: ${(eventCount / total).toFixed(4)}.` : "Run a repetition to begin collecting simulated outcomes."}</Text>
    <Svg accessibilityRole="image" accessibilityLabel={`Simulated success counts. ${state.counts.map((count, k) => `${k} successes: ${count} repetitions`).join("; ")}. Highlighted bars have at least ${threshold} successes.`} width="100%" height={245} viewBox="0 0 400 245">
      <Path d="M 40 20 L 40 200 L 360 200" fill="none" stroke={t.text} strokeWidth={1.5} />
      {state.counts.map((count, k) => <G key={k}><Rect x={40 + k * barWidth + 1} y={200 - count / max * 170} width={Math.max(1, barWidth - 2)} height={count / max * 170} fill={k >= threshold ? t.forest : t.muted} /><SvgText fontFamily={fonts.text} x={40 + (k + 0.5) * barWidth} y={216} textAnchor="middle" fontSize={10} fill={t.text}>{k}</SvgText></G>)}
      <SvgText fontFamily={fonts.text} x={34} y={204} textAnchor="end" fontSize={10} fill={t.text}>0</SvgText><SvgText fontFamily={fonts.text} x={34} y={34} textAnchor="end" fontSize={10} fill={t.text}>{max}</SvgText><SvgText fontFamily={fonts.text} x={200} y={238} textAnchor="middle" fontSize={12} fill={t.text}>Successes in one repetition</SvgText>
    </Svg>
    <Text style={s.note}>Bar height is the number of repetitions; the vertical scale grows with the observed counts. Limit: 5,000 repetitions per reset.</Text>
    {!!state.samples.length && <View><Text style={s.figureTitle}>Most recent repetitions</Text>{state.samples.map((sample, i) => <Text key={i} style={s.body}>{sample.outcomes.join(" ")} → {sample.successes} successes{sample.successes >= threshold ? " · meets condition" : " · below threshold"}</Text>)}<Text style={s.note}>1 means success; 0 means failure.</Text></View>}
    <TouchableOpacity accessibilityRole="button" aria-expanded={modelShown} accessibilityState={{ expanded: modelShown }} onPress={() => setModelShown(shown => !shown)} style={s.explainButton}><Text style={s.explainText}>{modelShown ? "Hide model comparison" : "Compare with the model probability"}</Text></TouchableOpacity>
    {modelShown && <View style={s.explanation}><Text style={s.body}>The binomial model gives P(X ≥ {threshold}) = {binomialTail(n, p, threshold).toFixed(6)}. A simulation estimate usually differs. More repetitions reduce typical sampling variation but do not guarantee each new estimate is closer.</Text></View>}
    {renderCoach?.(total ? "thinking" : "curious", total ? "Run another batch. Does the estimate move closer this time? It won’t always." : "Predict which success counts will be common before you run the model.")}
    {!!notice && <Text style={s.note}>{notice}</Text>}
  </View>;
}
