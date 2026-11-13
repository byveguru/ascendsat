import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import Svg, { ClipPath, Defs, G, Path, Rect, Text as SvgText } from "react-native-svg";
import { ascentTheme, fonts } from "../theme";
import { makeLessonVisualStyles } from "../appStyles";

/** Small, original function experiments; no answer or score is inferred. */
export default function LessonFunctionLab({ block, isLight = true, renderCoach, hideTitle = false, scopeKey }: any) {
  const s = makeLessonVisualStyles(isLight), t = ascentTheme(isLight);
  const initialA = block.initialA ?? 1, initialB = block.initialB ?? 0;
  const [a, setA] = useState(initialA), [b, setB] = useState(initialB);
  const [showReference, setShowReference] = useState(true);
  const [explain, setExplain] = useState(false);
  const [readyKey, setReadyKey] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const key = scopeKey ? `ascend:lesson-lab:v1:${encodeURIComponent(scopeKey)}:${block.id}` : "session";
  const ready = readyKey === key;
  useEffect(() => {
    let cancelled = false;
    setReadyKey(null); setA(initialA); setB(initialB); setExplain(false); setShowReference(true); setNotice("");
    const restore = async () => {
      try {
        const raw = key === "session" ? null : await AsyncStorage.getItem(key);
        const saved = raw ? JSON.parse(raw) : null;
        if (!cancelled && saved?.version === 1) {
          if (Number.isFinite(saved.a) && saved.a >= -2 && saved.a <= 2 && Number.isInteger(saved.a * 2)) setA(saved.a);
          if (Number.isInteger(saved.b) && saved.b >= -4 && saved.b <= 4) setB(saved.b);
          setShowReference(saved.reference !== false);
        }
      } catch { if (!cancelled) setNotice("Device saving is unavailable; you can still use this graph in this session."); }
      finally { if (!cancelled) setReadyKey(key); }
    };
    void restore(); return () => { cancelled = true; };
  }, [key, initialA, initialB]);
  useEffect(() => {
    if (!ready || key === "session") return;
    const timer = setTimeout(() => {
      AsyncStorage.setItem(key, JSON.stringify({version:1,a,b,reference:showReference})).catch(() => setNotice("Device saving is unavailable; you can still use this graph in this session."));
    }, 250);
    return () => clearTimeout(timer);
  }, [key, ready, a, b, showReference]);
  const base = (x: number) => block.model === "quadratic" ? x * x : block.model === "exponential" ? 2 ** x : x;
  const X = (x: number) => 38 + (x + 4) * 40;
  const Y = (y: number) => 205 - (y + 8) * 11.25;
  const path = (scale: number, shift: number) => Array.from({ length: 161 }, (_, i) => {
    const x = -4 + i / 20;
    return `${i ? "L" : "M"} ${X(x)} ${Y(scale * base(x) + shift)}`;
  }).join(" ");
  const clipId = `clip-${String(block.id).replace(/[^a-z0-9-]/gi, "")}`;
  const factor = block.model === "quadratic" ? "x²" : block.model === "exponential" ? "2ˣ" : "x";
  const formula = `y = ${a} × ${factor}${b < 0 ? ` − ${-b}` : b > 0 ? ` + ${b}` : ""}`;
  const control = (label: string, value: number, update: (next: number) => void, min: number, max: number, step: number) => <View>
    <Text style={s.figureTitle}>{label}: {value}</Text>
    {Platform.OS === "web" && <input aria-label={label} type="range" disabled={!ready} min={min} max={max} step={step} value={value} onChange={event => { update(Number(event.target.value)); setExplain(false); }} style={{ width: "100%", minHeight: 32, accentColor: t.forest }} />}
    <View style={s.controls}><TouchableOpacity accessibilityRole="button" accessibilityLabel={`Decrease ${label}`} disabled={!ready || value <= min} onPress={() => { update(Math.max(min, value - step)); setExplain(false); }} style={s.control}><Text style={s.controlText}>−</Text></TouchableOpacity><TouchableOpacity accessibilityRole="button" accessibilityLabel={`Increase ${label}`} disabled={!ready || value >= max} onPress={() => { update(Math.min(max, value + step)); setExplain(false); }} style={s.control}><Text style={s.controlText}>+</Text></TouchableOpacity></View>
  </View>;
  return <View style={s.section}>
    {!hideTitle && <Text accessibilityRole="header" style={s.title}>{block.title}</Text>}
    <Text style={s.body}>{block.prompt}</Text>
    <Text style={[s.figureTitle, { marginTop: 16 }]}>{formula}</Text>
    <Svg accessibilityRole="image" accessibilityLabel={`${formula}. The graph window shows x from negative 4 to 4 and y from negative 8 to 8. Exact values at x negative 1, zero, and 1 are listed below.`} width="100%" height={250} viewBox="0 0 400 250">
      <Defs><ClipPath id={clipId}><Rect x={38} y={25} width={320} height={180} /></ClipPath></Defs>
      {[-4, -2, 0, 2, 4].map(x => <G key={x}><Path d={`M ${X(x)} 25 L ${X(x)} 205`} stroke={t.border} /><SvgText fontFamily={fonts.text} x={X(x)} y={225} textAnchor="middle" fontSize={11} fill={t.text}>{x}</SvgText></G>)}
      {[-8, -4, 0, 4, 8].map(y => <G key={y}><Path d={`M 38 ${Y(y)} L 358 ${Y(y)}`} stroke={t.border} /><SvgText fontFamily={fonts.text} x={30} y={Y(y) + 4} textAnchor="end" fontSize={11} fill={t.text}>{y}</SvgText></G>)}
      <Path d={`M 38 ${Y(0)} L 358 ${Y(0)} M ${X(0)} 25 L ${X(0)} 205`} stroke={t.text} strokeWidth={1.5} />
      <G clipPath={`url(#${clipId})`}>{showReference && <Path d={path(1, 0)} stroke={t.terracotta} strokeDasharray="5 5" strokeWidth={2} fill="none" />}<Path d={path(a, b)} stroke={t.forest} strokeWidth={3} fill="none" /></G>
      <SvgText fontFamily={fonts.text} x={375} y={Y(0) + 4} fontSize={12} fill={t.text}>x</SvgText><SvgText fontFamily={fonts.text} x={X(0) + 8} y={17} fontSize={12} fill={t.text}>y</SvgText>
    </Svg>
    <Text style={s.note}>Solid: your function{showReference ? ` · Dashed: y = ${factor}` : ""}. Parts outside the graph window are clipped.</Text>
    <Text accessibilityLiveRegion="polite" style={s.body}>{[-1, 0, 1].map(x => `x = ${x}: y = ${a * base(x) + b}`).join("  ·  ")}</Text>
    {control(block.model === "line" ? "Slope a" : "Vertical scale a", a, setA, -2, 2, 0.5)}
    {control("Vertical shift b", b, setB, -4, 4, 1)}
    <View style={s.controls}><TouchableOpacity accessibilityRole="button" aria-pressed={showReference} accessibilityState={{ selected: showReference }} onPress={() => setShowReference(value => !value)} style={s.control}><Text style={s.controlText}>{showReference ? "Hide reference" : "Show reference"}</Text></TouchableOpacity><TouchableOpacity accessibilityRole="button" onPress={() => { setA(initialA); setB(initialB); setExplain(false); }} style={s.control}><Text style={s.controlText}>Reset graph</Text></TouchableOpacity></View>
    <TouchableOpacity accessibilityRole="button" aria-expanded={explain} accessibilityState={{ expanded: explain }} onPress={() => setExplain(value => !value)} style={s.explainButton}><Text style={s.explainText}>{explain ? "Hide explanation" : "What should I notice?"}</Text></TouchableOpacity>
    {explain && <View style={s.explanation}><Text style={s.body}>{block.model === "line" ? `The slope is ${a}: increasing x by 1 changes y by ${a}. The y-intercept is ${b}. Setting a to zero gives a horizontal line.` : block.model === "quadratic" ? `The vertex is (0, ${b}). A negative a opens the graph downward; positive a opens it upward. At a = 0 the quadratic term disappears, leaving a constant function.` : `Subtract the vertical shift first: y − (${b}) = ${a} × 2ˣ. When a is nonzero, increasing x by 1 doubles this shifted quantity. The raw y-values do not generally double when b is nonzero. At a = 0 the function is constant.`}</Text></View>}
    {renderCoach?.(explain ? "thinking" : "curious", "Change one setting at a time. Predict what will move, then check the graph.")}
    {!!notice && <Text style={s.note}>{notice}</Text>}
  </View>;
}
