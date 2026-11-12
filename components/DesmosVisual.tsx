import React, { useMemo } from "react";
import { Text, View, type ViewStyle } from "react-native";
import DesmosGraphingCalculator from "./DesmosGraphingCalculator";
import type { DesmosExpression, DesmosMathBounds } from "../desmos/buildCalculatorHtml";

export type DesmosVisualProps = {
  equations: string[];
  mathBounds?: DesmosMathBounds;
  title?: string;
  height?: number;
  colors?: string[];
  lockViewport?: boolean;
  style?: ViewStyle;
  isLight?: boolean;
};

const DEFAULT_COLORS = ["#2d70b3", "#c74440", "#388c46", "#6042a6", "#fa7e19"];

/**
 * Lesson-content-friendly wrapper around DesmosGraphingCalculator: takes plain
 * LaTeX equation strings (matching how lesson content already writes math)
 * instead of the calculator's raw expression-object shape.
 */
export default function DesmosVisual({
  equations,
  mathBounds,
  title,
  height = 280,
  colors = DEFAULT_COLORS,
  lockViewport,
  style,
  isLight = true,
}: DesmosVisualProps) {
  const expressions: DesmosExpression[] = useMemo(
    () => equations.map((latex, i) => ({ id: `eq_${i}`, latex, color: colors[i % colors.length] })),
    [equations, colors]
  );

  return (
    <View style={[{ marginBottom: 14 }, style]}>
      {title ? (
        <Text style={{ color: isLight ? "#1d4ed8" : "#60a5fa", fontWeight: "700", fontSize: 13, marginBottom: 8 }}>
          {title}
        </Text>
      ) : null}
      <DesmosGraphingCalculator height={height} mathBounds={mathBounds} expressions={expressions} lockViewport={lockViewport} theme={isLight ? "light" : "dark"} />
    </View>
  );
}
