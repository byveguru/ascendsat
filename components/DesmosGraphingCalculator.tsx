import React, { useMemo } from "react";
import { Platform, View, type ViewStyle } from "react-native";
import { WebView, type WebViewProps } from "react-native-webview";
import {
  buildCalculatorHtml,
  type DesmosExpression,
  type DesmosMathBounds,
} from "../desmos/buildCalculatorHtml";

export type DesmosGraphingCalculatorProps = {
  height?: number;
  mathBounds?: DesmosMathBounds;
  expressions?: DesmosExpression[];
  lockViewport?: boolean;
  theme?: "light" | "dark";
  style?: ViewStyle;
  webViewProps?: Partial<WebViewProps>;
};

const DEFAULT_HEIGHT = 320;

export default function DesmosGraphingCalculator({
  height = DEFAULT_HEIGHT,
  expressions,
  mathBounds,
  lockViewport = false,
  theme = "dark",
  style,
  webViewProps,
}: DesmosGraphingCalculatorProps) {
  const html = useMemo(
    () => buildCalculatorHtml({ expressions, mathBounds, lockViewport, theme }),
    [expressions, mathBounds, lockViewport, theme]
  );

  const shellBg = theme === "light" ? "#ffffff" : "#121214";
  const shellBorder = theme === "light" ? "#e2e8f0" : "#2a2a30";
  const shellStyle: ViewStyle = {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: shellBg,
    borderWidth: 1,
    borderColor: shellBorder,
    ...(Platform.OS === "web"
      ? ({ boxShadow: theme === "light" ? "0 4px 16px rgba(15,23,42,0.08)" : "0 4px 24px rgba(0,0,0,0.35)" } as object)
      : null),
  };

  const {
    style: webViewStyle,
    originWhitelist = ["*"],
    javaScriptEnabled = true,
    domStorageEnabled = true,
    scrollEnabled = false,
    bounces = false,
    allowsInlineMediaPlayback = true,
    mediaPlaybackRequiresUserAction = false,
    ...restWebViewProps
  } = webViewProps ?? {};

  return (
    <View style={[shellStyle, { height }, style]}>
      {Platform.OS === "web" ? (
        // react-native-webview has no web implementation for source={{ html }} — it
        // just renders an "unsupported platform" message. QuizDesmosEmbed hits the
        // same constraint and already solves it with a plain iframe on web; mirror
        // that here so this shared component works on every platform.
        <iframe srcDoc={html} style={{ flex: 1, border: "none", width: "100%", height: "100%" }} title="Desmos Graphing Calculator" />
      ) : (
        <WebView
          originWhitelist={originWhitelist}
          source={{ html }}
          javaScriptEnabled={javaScriptEnabled}
          domStorageEnabled={domStorageEnabled}
          scrollEnabled={scrollEnabled}
          bounces={bounces}
          allowsInlineMediaPlayback={allowsInlineMediaPlayback}
          mediaPlaybackRequiresUserAction={mediaPlaybackRequiresUserAction}
          style={[{ flex: 1, backgroundColor: shellBg }, webViewStyle]}
          {...restWebViewProps}
        />
      )}
    </View>
  );
}
