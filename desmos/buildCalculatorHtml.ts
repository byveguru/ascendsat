/** Desmos API v1.12 — official CDN embed HTML for react-native-webview */

export const DESMOS_API_VERSION = "1.12";
export const DESMOS_CDN_URL = `https://www.desmos.com/api/v${DESMOS_API_VERSION}/calculator.js?apiKey=9ebb461de8924db1ababac0aebda51f6`;

export type DesmosExpression = {
  id?: string;
  latex: string;
  color?: string;
  hidden?: boolean;
};

export type DesmosMathBounds = { left: number; right: number; bottom: number; top: number };

export type BuildCalculatorHtmlOptions = {
  mathBounds?: DesmosMathBounds;
  expressions?: DesmosExpression[];
  lockViewport?: boolean;
  theme?: "light" | "dark";
  // "graphOnly" (default) — a bare graph preview, no keypad/expression list,
  // with a small "powered by desmos" footer (used in lesson content).
  // "full" — the interactive exam-style calculator (keypad, expression list,
  // settings gear, zoom controls), matching Bluebook's own embedded Desmos:
  // no footer, since the keypad already fills that space.
  mode?: "graphOnly" | "full";
};

const THEME_COLORS = {
  light: {
    background: "#ffffff",
    footerBackground: "#f8fafc",
    footerBorder: "#e2e8f0",
    footerText: "#64748b",
    textColor: "#0f172a",
    gridColor: "#e2e8f0",
    axisColor: "#94a3b8",
  },
  dark: {
    background: "#121214",
    footerBackground: "#1a1a1e",
    footerBorder: "#2a2a30",
    footerText: "#8a8a95",
    textColor: "#e8e8ec",
    gridColor: "#2a2a30",
    axisColor: "#5a5a66",
  },
};

export function buildCalculatorHtml(options: BuildCalculatorHtmlOptions = {}): string {
  const expressionsJson = JSON.stringify(options.expressions ?? []);
  const lockViewport = options.lockViewport ?? false;
  const c = THEME_COLORS[options.theme ?? "dark"];
  const interactive = options.mode === "full";

  const footerHtml = interactive ? "" : `<div id="desmos-footer">⌨️ powered by desmos</div>`;
  const calculatorHeight = interactive ? "100%" : "calc(100% + 25px)";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 100%;
      height: 100%;
      background: ${c.background};
      overflow: hidden;
      -webkit-text-size-adjust: 100%;
    }
    #desmos-shell {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      background: ${c.background};
    }
    #desmos-clip {
      flex: 1;
      overflow: hidden;
      position: relative;
      background: ${c.background};
      min-height: 0;
    }
    #desmos-calculator {
      width: 100%;
      height: ${calculatorHeight};
      position: relative;
    }
    #desmos-footer {
      flex-shrink: 0;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${c.footerBackground};
      border-top: 1px solid ${c.footerBorder};
      color: ${c.footerText};
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 12px;
      letter-spacing: 0.2px;
      user-select: none;
    }
    .dcg-container { background: ${c.background} !important; }
  </style>
</head>
<body>
  <div id="desmos-shell">
    <div id="desmos-clip">
      <div id="desmos-calculator"></div>
    </div>
    ${footerHtml}
  </div>
  <script src="${DESMOS_CDN_URL}"></script>
  <script>
    (function () {
      var elt = document.getElementById("desmos-calculator");
      var initialExpressions = ${expressionsJson};
      var calculator = Desmos.GraphingCalculator(elt, {
        expressions: ${interactive ? "true" : "false"},
        keypad: ${interactive ? "true" : "false"},
        settingsMenu: ${interactive ? "true" : "false"},
        zoomButtons: true,
        expressionsTopbar: ${interactive ? "true" : "false"},
        border: false,
        lockViewport: ${lockViewport ? "true" : "false"},
        notes: false,
        folders: false,
        images: false,
        links: false,
        pasteGraphLink: false,
        graphpaper: true,
        invertedColors: false,
        showGrid: true,
        showXAxis: true,
        showYAxis: true,
        xAxisNumbers: true,
        yAxisNumbers: true,
      });
      calculator.updateSettings({
        backgroundColor: "${c.background}",
        textColor: "${c.textColor}",
        gridColor: "${c.gridColor}",
        xAxisColor: "${c.axisColor}",
        yAxisColor: "${c.axisColor}",
      });
      initialExpressions.forEach(function (expr, i) {
        calculator.setExpression({
          id: expr.id || ("expr_" + i),
          latex: expr.latex,
          color: expr.color,
          hidden: expr.hidden || false,
        });
      });
      const initialBounds = ${JSON.stringify(options.mathBounds ?? null)};
      if (initialBounds) calculator.setMathBounds(initialBounds);
      window.desmosCalculator = calculator;
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: "ready" }));
      }
    })();
  </script>
</body>
</html>`;
}
