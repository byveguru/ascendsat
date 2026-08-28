import React, { useMemo } from "react";
import { Platform, StyleSheet, Text, View, type ViewStyle } from "react-native";
import { WebView } from "react-native-webview";
import { buildCalculatorHtml } from "../desmos/buildCalculatorHtml";

export type QuizDesmosEmbedProps = {
  height?: number;
  style?: ViewStyle;
};

/**
 * Same Desmos embed used inside the quiz floating panel — built via the
 * Desmos API (Desmos.GraphingCalculator), not an iframe of the full
 * desmos.com site. The API only ever renders the calculator widget itself
 * (grid, keypad, expression list, settings gear), so there's no Log In /
 * Sign Up / Save-to-account chrome — that only exists on the hosted web app,
 * which is what the old `src="https://www.desmos.com/calculator"` iframe
 * showed. `mode: "full"` keeps the keypad + expression list visible,
 * matching Bluebook's own embedded exam calculator.
 */
export default function QuizDesmosEmbed({ height = 380, style }: QuizDesmosEmbedProps) {
  const html = useMemo(() => buildCalculatorHtml({ mode: "full", theme: "light" }), []);

  return (
    <View style={[styles.shell, { height }, style]}>
      {Platform.OS === "web" ? (
        // react-native-webview has no web implementation for source={{ html }} —
        // it just renders an "unsupported platform" message — so use a plain
        // iframe with srcDoc on web instead.
        <iframe
          srcDoc={html}
          style={{ flex: 1, border: "none", width: "100%", height: "100%" }}
          title="Desmos"
        />
      ) : (
        <WebView
          source={{ html }}
          style={{ flex: 1 }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          originWhitelist={["*"]}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.loading}>
              <Text style={styles.loadingText}>Loading Desmos...</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  loading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    color: "#1e3a5f",
    fontSize: 14,
  },
});
