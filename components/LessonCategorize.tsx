import React, { useEffect, useRef, useState } from "react";
import { Animated, PanResponder, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MathText } from "../MathText";
import { makeLessonSortStyles } from "../appStyles";

export function DraggableCard({ item, children, enabled, onDrop, styles: s, dragHint = "Group buttons are also available below." }: any) {
  const offset = useRef(new Animated.ValueXY()).current;
  const [dragging, setDragging] = useState(false);
  const current = useRef({ enabled, onDrop });
  current.current = { enabled, onDrop };
  const pan = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => current.current.enabled,
    onMoveShouldSetPanResponder: (_, gesture) => current.current.enabled && Math.abs(gesture.dx) + Math.abs(gesture.dy) > 4,
    onPanResponderGrant: () => { setDragging(true); offset.setValue({ x: 0, y: 0 }); },
    onPanResponderMove: (_, gesture) => offset.setValue({ x: gesture.dx, y: gesture.dy }),
    onPanResponderRelease: (_, gesture) => {
      const point = { x: gesture.moveX, y: gesture.moveY };
      setDragging(false); offset.setValue({ x: 0, y: 0 });
      current.current.onDrop(point);
    },
    onPanResponderTerminate: () => { setDragging(false); offset.setValue({ x: 0, y: 0 }); },
    onPanResponderTerminationRequest: () => false,
  })).current;
  return <Animated.View style={[s.card, dragging && s.dragging, { transform: offset.getTranslateTransform() }]}>
    <View style={s.cardHeading}><View style={s.cardCopy}><MathText text={item.text} style={s.body} selectable={false} /></View><View {...pan.panHandlers} accessibilityLabel={`Drag card: ${item.text}. ${dragHint}`} style={s.handle}><Text style={s.handleText}>⠿</Text></View></View>
    {children}
  </Animated.View>;
}

/** Pointer/touch sorting with equivalent ordinary buttons for keyboard use. */
export default function LessonCategorize({ block, isLight = true, scopeKey, renderCoach, hideTitle = false }: any) {
  const s = makeLessonSortStyles(isLight);
  const items = block.items || [], buckets = block.buckets || [];
  const [assigned, setAssigned] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [notice, setNotice] = useState("");
  const [readyKey, setReadyKey] = useState<string | null>(null);
  const zones = useRef<Record<string, View | null>>({});
  const key = scopeKey ? `ascend:lesson-sort:v1:${encodeURIComponent(scopeKey)}:${block.id}` : "session";
  const ready = readyKey === key;
  useEffect(() => {
    let cancelled = false;
    setAssigned({}); setChecked(false); setNotice(""); setReadyKey(null);
    const restore = async () => {
      try {
        const raw = key === "session" ? null : await AsyncStorage.getItem(key);
        const saved = raw ? JSON.parse(raw) : null;
        if (!cancelled && saved?.version === 1 && saved.assigned && typeof saved.assigned === "object") {
          const valid: Record<string, string> = {};
          for (const item of items) if (buckets.some((bucket: any) => bucket.id === saved.assigned[item.id])) valid[item.id] = saved.assigned[item.id];
          setAssigned(valid); setChecked(saved.checked === true && items.every((item: any) => valid[item.id]));
        }
      } catch { if (!cancelled) setNotice("Device saving is unavailable. You can still sort these cards in this session."); }
      finally { if (!cancelled) setReadyKey(key); }
    };
    void restore(); return () => { cancelled = true; };
  }, [key]);
  useEffect(() => {
    if (!ready || key === "session") return;
    const timer = setTimeout(() => {
      AsyncStorage.setItem(key, JSON.stringify({ version: 1, assigned, checked })).catch(() => setNotice("Device saving is unavailable. You can still sort these cards in this session."));
    }, 250);
    return () => clearTimeout(timer);
  }, [ready, key, assigned, checked]);
  const place = (itemId: string, bucketId: string) => {
    setAssigned(previous => ({ ...previous, [itemId]: bucketId })); setChecked(false);
    setNotice(`Placed in ${buckets.find((bucket: any) => bucket.id === bucketId)?.label}.`);
  };
  const drop = async (itemId: string, point: { x: number; y: number }) => {
    const boxes = await Promise.all(buckets.map((bucket: any) => new Promise<any>(resolve => {
      const zone = zones.current[bucket.id];
      if (!zone) return resolve(null);
      zone.measureInWindow((x, y, width, height) => resolve({ id: bucket.id, x, y, width, height }));
    })));
    const target = boxes.find(box => box && point.x >= box.x && point.x <= box.x + box.width && point.y >= box.y && point.y <= box.y + box.height);
    if (target) place(itemId, target.id);
    else setNotice("Drop the card inside a group, or use its group buttons.");
  };
  const total = items.filter((item: any) => assigned[item.id]).length;
  const correct = items.filter((item: any) => assigned[item.id] === item.bucket).length;
  const allCorrect = correct === items.length;
  return <View style={s.section}>
    {!hideTitle && <Text accessibilityRole="header" style={s.title}>{block.title}</Text>}
    <MathText text={block.prompt} style={s.body} selectable={false} />
    <Text style={s.note}>Drag by the dotted handle into a group, or use the group buttons. Tap a placed card to return it.</Text>
    <View style={s.zones}>{buckets.map((bucket: any) => <View key={bucket.id} ref={node => { zones.current[bucket.id] = node; }} collapsable={false} style={s.zone}>
      <Text style={s.bucketTitle}>{bucket.label}</Text>
      {items.filter((item: any) => assigned[item.id] === bucket.id).map((item: any) => <TouchableOpacity key={item.id} accessibilityRole="button" accessibilityLabel={`Return ${item.text} from ${bucket.label} to unsorted cards`} disabled={!ready} onPress={() => { setAssigned(previous => { const next = { ...previous }; delete next[item.id]; return next; }); setChecked(false); setNotice("Card returned to the unsorted group."); }} style={[s.placed, checked && (item.bucket === bucket.id ? s.correct : s.incorrect)]}>
        <MathText text={item.text} style={s.body} selectable={false} />
        {checked && <Text style={item.bucket === bucket.id ? s.correctLabel : s.incorrectLabel}>{item.bucket === bucket.id ? "Correct group" : `Move to ${buckets.find((b: any) => b.id === item.bucket)?.label}`}</Text>}
      </TouchableOpacity>)}
      {!items.some((item: any) => assigned[item.id] === bucket.id) && <Text style={s.empty}>Drop cards here</Text>}
    </View>)}</View>
    <Text style={s.progress}>{total} of {items.length} cards placed</Text>
    {items.filter((item: any) => !assigned[item.id]).map((item: any) => <DraggableCard key={item.id} item={item} styles={s} enabled={ready} onDrop={(point: any) => void drop(item.id, point)}>
      <View style={s.groupButtons}>{buckets.map((bucket: any) => <TouchableOpacity key={bucket.id} accessibilityRole="button" accessibilityLabel={`Put ${item.text} in ${bucket.label}`} disabled={!ready} onPress={() => place(item.id, bucket.id)} style={s.groupButton}><Text style={s.groupButtonText}>{bucket.label}</Text></TouchableOpacity>)}</View>
    </DraggableCard>)}
    <View style={s.actions}><TouchableOpacity accessibilityRole="button" disabled={!ready || total !== items.length} onPress={() => setChecked(true)} style={[s.primary, (!ready || total !== items.length) && s.disabled]}><Text style={s.primaryText}>Check my groups</Text></TouchableOpacity><TouchableOpacity accessibilityRole="button" disabled={!ready || total === 0} onPress={() => { setAssigned({}); setChecked(false); setNotice("Cards reset. Try the groups again."); }} style={s.secondary}><Text style={s.secondaryText}>Start again</Text></TouchableOpacity></View>
    {checked && <View style={[s.feedback, !allCorrect && s.incorrect]}><Text accessibilityLiveRegion="polite" style={allCorrect ? s.correctLabel : s.incorrectLabel}>{allCorrect ? "All cards are in the right groups." : `${correct} of ${items.length} are in the right groups. Adjust the red cards and try again.`}</Text><MathText text={block.explanation} style={s.body} selectable={false} /></View>}
    {renderCoach?.(checked ? allCorrect ? "proud" : "encouraging" : "curious", checked ? allCorrect ? "You found the pattern. Try explaining what the groups have in common." : "Use the explanation to move the red cards. You can try again." : "Look for the rule behind each group. Then try sorting the cards.")}
    {!!notice && <Text accessibilityLiveRegion="polite" style={s.note}>{notice}</Text>}
  </View>;
}
