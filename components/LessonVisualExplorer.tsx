import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MathText } from "../MathText";
import { makeLessonVisualStyles } from "../appStyles";

/** A worked visual comparison, independent of assessment and mastery. */
export default function LessonVisualExplorer({ block, isLight = true, scopeKey, renderStimulus, renderCoach, hideTitle = false }: any) {
  const s = makeLessonVisualStyles(isLight);
  const frames = Array.isArray(block.frames) ? block.frames : [];
  const [index, setIndex] = useState(0);
  const [explained, setExplained] = useState<number[]>([]);
  const [readyKey, setReadyKey] = useState<string | null>(null);
  const [saveNotice, setSaveNotice] = useState("");
  const key = scopeKey ? `ascend:lesson-visual:v1:${encodeURIComponent(scopeKey)}:${block.id}` : "session";
  const ready = readyKey === key;
  useEffect(() => {
    let cancelled = false;
    setReadyKey(null); setIndex(0); setExplained([]); setSaveNotice("");
    const restore = async () => {
      try {
        const raw = key === "session" ? null : await AsyncStorage.getItem(key);
        const saved = raw ? JSON.parse(raw) : null;
        if (!cancelled && saved?.version === 1) {
          if (Number.isInteger(saved.index) && saved.index >= 0 && saved.index < frames.length) setIndex(saved.index);
          if (Array.isArray(saved.explained)) setExplained(saved.explained.filter((n: any) => Number.isInteger(n) && n >= 0 && n < frames.length));
        }
      } catch { if (!cancelled) setSaveNotice("This exploration is available for this session; device saving is unavailable."); }
      finally { if (!cancelled) setReadyKey(key); }
    };
    void restore();
    return () => { cancelled = true; };
  }, [key, frames.length]);
  useEffect(() => {
    if (!ready || key === "session") return;
    const timer = setTimeout(() => {
      AsyncStorage.setItem(key, JSON.stringify({ version: 1, index, explained })).catch(() => setSaveNotice("This exploration is available for this session; device saving is unavailable."));
    }, 250);
    return () => clearTimeout(timer);
  }, [key, ready, index, explained]);
  if (!frames.length) return null;
  const frame = frames[index] || frames[0];
  const shown = explained.includes(index);
  const text = (value: string, style = s.body) => <MathText text={value || ""} style={style} selectable={false} />;
  return <View style={s.section}>
    {!hideTitle && <Text accessibilityRole="header" style={s.title}>{block.title}</Text>}
    {text(block.prompt)}
    <View accessibilityLabel={`${block.title} views`} style={s.controls}>
      {frames.map((item: any, i: number) => <TouchableOpacity key={i} accessibilityRole="button" accessibilityLabel={`View ${item.label}`} aria-pressed={index === i} accessibilityState={{ selected: index === i, disabled: !ready }} disabled={!ready} onPress={() => setIndex(i)} style={[s.control, index === i && s.selected]}>
        <Text style={[s.controlText, index === i && s.selectedText]}>{item.label}</Text>
      </TouchableOpacity>)}
    </View>
    <Text style={s.viewCount}>View {index + 1} of {frames.length}</Text>
    <View key={index}>
      {frame.stimulus?.type === "flow" ? <View style={s.flow}>
        <Text accessibilityRole="header" style={s.figureTitle}>{frame.stimulus.title}</Text>
        {(frame.stimulus.steps || []).map((step: any, i: number) => <View key={i}>
          {i > 0 && <Text accessibilityElementsHidden importantForAccessibility="no" style={s.connector}>↓</Text>}
          <View style={s.flowStep}><Text style={s.stepNumber}>{i + 1}</Text><View style={s.stepCopy}><Text style={s.stepTitle}>{step.title}</Text>{text(step.text)}</View></View>
        </View>)}
        {!!frame.stimulus.note && text(frame.stimulus.note, s.note)}
      </View> : renderStimulus?.(frame.stimulus, isLight)}
    </View>
    <TouchableOpacity accessibilityRole="button" accessibilityLabel={`${shown ? "Hide" : "Explain"} ${frame.label}`} aria-expanded={shown} accessibilityState={{ expanded: shown, disabled: !ready }} disabled={!ready} onPress={() => setExplained(items => shown ? items.filter(n => n !== index) : [...items, index])} style={s.explainButton}>
      <Text style={s.explainText}>{shown ? "Hide explanation" : "Explain this view"}</Text>
    </TouchableOpacity>
    {shown && <View accessibilityLiveRegion="polite" style={s.explanation}>{text(frame.caption)}{block.takeaway && <View style={s.takeaway}>{text(block.takeaway)}</View>}</View>}
    {shown && renderCoach?.("thinking", "Compare the views once more. What changed, and what stayed the same?")}
    {!!saveNotice && <Text style={s.note}>{saveNotice}</Text>}
  </View>;
}
