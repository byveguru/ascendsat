import React, { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Animated, AppState, Easing, Image, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeOlliePerchStyles } from "../appStyles";

const portrait = require("../assets/ollie-penguin-seated.png");
const preferenceKey = "ascend:ollie-leg-swing-paused:v1";

/** A seated portrait rendered in layers; the source image stays unchanged. */
export default function OllieQuestionPerch({ isLight = true, animated = true }: { isLight?: boolean; animated?: boolean }) {
  const width = animated ? 88 : 64, height = width * 1402 / 1122, seat = height * 0.78, half = width / 2;
  const s = makeOlliePerchStyles(isLight, height, seat);
  const swing = useRef(new Animated.Value(0)).current;
  const [reduced, setReduced] = useState(true);
  const [paused, setPaused] = useState(true);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(AppState.currentState === "active");
  useEffect(() => {
    let alive = true, changed = false;
    const motion = AccessibilityInfo.addEventListener("reduceMotionChanged", value => { changed = true; setReduced(value); });
    const visibility = AppState.addEventListener("change", value => setActive(value === "active"));
    AccessibilityInfo.isReduceMotionEnabled().then(value => { if (alive && !changed) setReduced(value); }).catch(() => {});
    AsyncStorage.getItem(preferenceKey).then(value => { if (alive) setPaused(value === "true"); }).catch(() => {}).finally(() => { if (alive) setReady(true); });
    return () => { alive = false; motion.remove(); visibility.remove(); };
  }, []);
  const moving = animated && ready && !reduced && !paused && active;
  useEffect(() => {
    swing.stopAnimation(); swing.setValue(0);
    if (!moving) return;
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(swing, { toValue: 1, duration: 1700, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      Animated.timing(swing, { toValue: -1, duration: 1700, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
    ]));
    loop.start();
    return () => { loop.stop(); swing.stopAnimation(); swing.setValue(0); };
  }, [moving, swing]);
  const art = <View accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" pointerEvents="none" style={{ width, height }}>
    {[0, 1].map(side => <Animated.View key={side} style={{ position: "absolute", top: seat - 1, left: side * half, width: half, height: height - seat + 2, overflow: "hidden", transformOrigin: [half * (side ? 0.3 : 0.72), 0, 0], transform: [{ rotate: swing.interpolate({ inputRange: [-1, 1], outputRange: side ? ["8deg", "-8deg"] : ["-8deg", "8deg"] }) }] }}>
      <Image source={portrait} resizeMode="stretch" accessible={false} style={{ position: "absolute", width, height, top: -seat + 1, left: -side * half }} />
    </Animated.View>)}
    <View style={{ position: "absolute", width, height: seat, overflow: "hidden" }}><Image source={portrait} resizeMode="stretch" accessible={false} style={{ width, height }} /></View>
  </View>;
  return <View style={s.rail}>
    <View pointerEvents="none" style={s.edge} />
    {animated && ready && !reduced ? <TouchableOpacity accessibilityRole="button" accessibilityLabel={paused ? "Resume Ollie's leg swing" : "Pause Ollie's leg swing"} accessibilityHint="A decorative animation. Your question and answer stay unchanged." accessibilityState={{ selected: paused }} aria-pressed={paused} onPress={() => { const next = !paused; setPaused(next); void AsyncStorage.setItem(preferenceKey, String(next)).catch(() => {}); }} activeOpacity={1} style={s.penguin}>
      {art}<View pointerEvents="none" style={s.motionBadge}><Text style={s.motionText}>{paused ? "▶" : "Ⅱ"}</Text></View>
    </TouchableOpacity> : <View pointerEvents="none" accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={s.penguin}>{art}</View>}
  </View>;
}
