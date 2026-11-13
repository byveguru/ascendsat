import React, { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DraggableCard } from "./LessonCategorize";
import { makeLessonSortStyles } from "../appStyles";

export default function SortableLessonSteps({ items, order, onChange, disabled = false, isLight = true }: any) {
  const s = makeLessonSortStyles(isLight);
  const rows = useRef<Record<number, View | null>>({});
  const move = (from: number, to: number) => {
    if (from === to || to < 0 || to >= order.length || disabled) return;
    const next = [...order]; const [item] = next.splice(from, 1); next.splice(to, 0, item); onChange(next);
  };
  const drop = async (from: number, point: { x: number; y: number }) => {
    const bounds = await Promise.all(order.map((item: number, index: number) => new Promise<any>(resolve => {
      const row = rows.current[item]; if (!row) return resolve(null);
      row.measureInWindow((x, y, width, height) => resolve({ index, x, y, width, height }));
    })));
    const visible = bounds.filter(Boolean);
    if (!visible.length) return;
    const nearest = visible.reduce((best, row) => Math.abs(point.y - row.y - row.height / 2) < Math.abs(point.y - best.y - best.height / 2) ? row : best);
    move(from, nearest.index);
  };
  return <View><Text style={s.note}>Drag the dotted handles to reorder, or use Move up and Move down.</Text>{order.map((item: number, index: number) => <View key={item} ref={node => { rows.current[item] = node; }} collapsable={false}>
    <DraggableCard item={{ text: items[item] }} dragHint="Move up and Move down buttons are also available below." styles={s} enabled={!disabled} onDrop={(point: any) => void drop(index, point)}>
      <View style={s.groupButtons}><Text style={s.progress}>Step {index + 1}</Text><TouchableOpacity accessibilityRole="button" accessibilityLabel={`Move step ${index + 1} up`} disabled={disabled || index === 0} onPress={() => move(index, index - 1)} style={s.groupButton}><Text style={s.groupButtonText}>Move up</Text></TouchableOpacity><TouchableOpacity accessibilityRole="button" accessibilityLabel={`Move step ${index + 1} down`} disabled={disabled || index === order.length - 1} onPress={() => move(index, index + 1)} style={s.groupButton}><Text style={s.groupButtonText}>Move down</Text></TouchableOpacity></View>
    </DraggableCard>
  </View>)}</View>;
}
