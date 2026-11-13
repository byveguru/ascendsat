import React, { useDeferredValue, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { ascentTheme } from "../theme";
import { MathText } from "../MathText";
import { MATH_TEMPLATES, insertMathTemplate } from "../lib/mathAnswer";

/** A writing field, not a calculator: raw notation is saved with the response. */
export default function MathAnswerInput({ value = "", onChangeText, isLight = true, mathEnabled = true, editable = true, accessibilityLabel = "Written response", style, placeholder = "Write your reasoning. Use the math tools for equations.", ...props }: any) {
  const t = ascentTheme(isLight);
  const input = useRef<any>(null);
  const selection = useRef({ start: value.length, end: value.length });
  const [cursor, setCursor] = useState<any>(undefined);
  const [previewOpen, setPreviewOpen] = useState(false);
  const preview = useDeferredValue(value);
  const insert = (template: any) => {
    if (!editable) return;
    const next = insertMathTemplate(value, selection.current, template);
    onChangeText(next.value);
    selection.current = next.selection;
    setCursor(next.selection);
    input.current?.focus();
  };
  return <View style={{ marginBottom: 12 }}>
    {mathEnabled && <View style={{ borderWidth: 1, borderColor: t.border, borderBottomWidth: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: t.soft, overflow: "hidden" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ gap: 2, padding: 4 }}>
        {MATH_TEMPLATES.map(item => <TouchableOpacity key={item.name} accessibilityRole="button" accessibilityLabel={`Insert ${item.name}`} disabled={!editable} onPress={() => insert(item)} style={{ minWidth: 42, minHeight: 40, paddingHorizontal: 10, justifyContent: "center", alignItems: "center", opacity: editable ? 1 : 0.45 }}><Text style={{ fontSize: 17, color: t.text }}>{item.label}</Text></TouchableOpacity>)}
      </ScrollView>
    </View>}
    <TextInput {...props} ref={input} value={value} onChangeText={onChangeText} editable={editable} accessibilityLabel={accessibilityLabel} multiline
      autoCorrect={mathEnabled ? false : undefined} autoCapitalize={mathEnabled ? "none" : "sentences"}
      selection={cursor} onSelectionChange={event => { selection.current = event.nativeEvent.selection; setCursor(undefined); }}
      placeholder={placeholder} placeholderTextColor={t.muted}
      style={[{ minHeight: 110, padding: 13, textAlignVertical: "top", backgroundColor: t.surface, color: t.text, fontSize: 15, lineHeight: 24, borderWidth: 1, borderColor: t.border, borderRadius: 10 }, style, mathEnabled ? { borderTopLeftRadius: 0, borderTopRightRadius: 0 } : null]} />
    {mathEnabled && <View style={{ marginTop: 5 }}>
      <TouchableOpacity accessibilityRole="button" accessibilityState={{ expanded: previewOpen }} onPress={() => setPreviewOpen(v => !v)} style={{ minHeight: 40, justifyContent: "center", alignSelf: "flex-start" }}><Text style={{ color: t.forest, fontSize: 12, fontWeight: "700" }}>{previewOpen ? "Hide formatted preview" : "Show formatted preview"}</Text></TouchableOpacity>
      {previewOpen && <View style={{ padding: 13, borderWidth: 1, borderColor: t.border, borderRadius: 9, backgroundColor: t.surface }}><Text style={{ color: t.muted, fontSize: 11, marginBottom: 8 }}>FORMATTED PREVIEW · Your notation is saved as typed</Text>{preview ? <MathText text={preview} selectable style={{ color: t.text, fontSize: 15, lineHeight: 25 }} /> : <Text style={{ color: t.muted, fontSize: 13 }}>Your response will appear here.</Text>}</View>}
    </View>}
  </View>;
}

export function MathWorkingSpace({ isLight = true }: { isLight?: boolean }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const t = ascentTheme(isLight);
  return <View style={{ marginBottom: 14 }}>
    <TouchableOpacity accessibilityRole="button" accessibilityState={{ expanded: open }} onPress={() => setOpen(v => !v)} style={{ minHeight: 44, justifyContent: "center" }}><Text style={{ color: t.forest, fontSize: 13, fontWeight: "700" }}>{open ? "Hide working space" : "Open math working space"}</Text></TouchableOpacity>
    {open && <><Text style={{ color: t.muted, fontSize: 12, lineHeight: 19, marginBottom: 8 }}>Optional, ungraded scratch work for this session.</Text><MathAnswerInput value={draft} onChangeText={setDraft} isLight={isLight} accessibilityLabel="Math scratch work" /></>}
  </View>;
}
