// @ts-nocheck
// Reusable, theme-aware chart primitives for AscendSAT analytics.
// Every component takes a `C` palette object (from makeTheme(isLight) in App.tsx)
// plus an `accent` color, so the same chart reads correctly in light/dark and
// swaps per active test (SAT / ACT / AP). Built on react-native-svg so it renders
// identically on web and native. No external chart library.
import React from "react";
import { View, Text } from "react-native";
import Svg, {
  Circle,
  Path,
  Rect,
  Line,
  G,
  Polygon,
  Polyline,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  Text as SvgText,
} from "react-native-svg";

// ── shared helpers ───────────────────────────────────────────────────────────

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

// Build an SVG path string from points. When `smooth`, use a light cardinal
// smoothing so the line curves without overshooting wildly.
const buildLinePath = (pts, smooth = true) => {
  if (!pts || pts.length === 0) return "";
  if (pts.length === 1) return `M${pts[0].x},${pts[0].y}`;
  if (!smooth) {
    return pts.reduce((d, p, i) => d + (i === 0 ? `M${p.x},${p.y}` : ` L${p.x},${p.y}`), "");
  }
  const t = 0.18; // tension
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) * t;
    const c1y = p1.y + (p2.y - p0.y) * t;
    const c2x = p2.x - (p3.x - p1.x) * t;
    const c2y = p2.y - (p3.y - p1.y) * t;
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
  }
  return d;
};

const polar = (cx, cy, r, angleDeg) => {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
};

// A color scale for accuracy-style values (0-100): red → gold → green.
export const accuracyColor = (pct, C) =>
  pct >= 80 ? C.success : pct >= 60 ? (C.gold || C.warning) : C.error;

// ── LineChart ────────────────────────────────────────────────────────────────
// data: array of numbers OR { value, label }. Draws a smooth line + gradient
// area fill + endpoint dots, with faint gridlines. Great for score trend.
export const LineChart = ({
  data = [],
  width = 300,
  height = 140,
  color,
  C,
  yMin,
  yMax,
  showArea = true,
  showDots = true,
  showGrid = true,
  strokeWidth = 2.5,
  padTop = 10,
  padBottom = 18,
  padX = 8,
  gradientId = "lc",
}) => {
  const vals = data.map((d) => (typeof d === "number" ? d : d.value)).filter((v) => v != null && !isNaN(v));
  if (vals.length === 0) return null;
  const stroke = color || C.accent;
  const lo = yMin != null ? yMin : Math.min(...vals);
  const hiRaw = yMax != null ? yMax : Math.max(...vals);
  const hi = hiRaw === lo ? lo + 1 : hiRaw;
  const innerW = width - padX * 2;
  const innerH = height - padTop - padBottom;
  const step = vals.length > 1 ? innerW / (vals.length - 1) : 0;
  const pts = vals.map((v, i) => ({
    x: padX + i * step,
    y: padTop + innerH * (1 - (v - lo) / (hi - lo)),
  }));
  const linePath = buildLinePath(pts, true);
  const areaPath = showArea && pts.length > 1
    ? `${linePath} L${pts[pts.length - 1].x},${padTop + innerH} L${pts[0].x},${padTop + innerH} Z`
    : "";
  const uid = `${gradientId}-${Math.round(width)}-${vals.length}`;

  return (
    <Svg width={width} height={height} style={{ overflow: "visible" }}>
      <Defs>
        <SvgLinearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={stroke} stopOpacity="0.28" />
          <Stop offset="1" stopColor={stroke} stopOpacity="0.02" />
        </SvgLinearGradient>
      </Defs>
      {showGrid && [0, 0.5, 1].map((f, i) => (
        <Line key={i} x1={padX} y1={padTop + innerH * f} x2={width - padX} y2={padTop + innerH * f}
          stroke={C.border} strokeWidth={1} />
      ))}
      {areaPath ? <Path d={areaPath} fill={`url(#${uid})`} /> : null}
      <Path d={linePath} stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {showDots && pts.map((p, i) => (
        <Circle key={i} cx={p.x} cy={p.y} r={i === pts.length - 1 ? 4 : 2.5}
          fill={i === pts.length - 1 ? stroke : C.card} stroke={stroke} strokeWidth={1.5} />
      ))}
    </Svg>
  );
};

// ── DonutGauge ───────────────────────────────────────────────────────────────
// A ring gauge with an optional center label. value/max → filled arc.
export const DonutGauge = ({
  value = 0,
  max = 100,
  size = 120,
  thickness = 10,
  color,
  C,
  trackColor,
  centerText,
  centerSub,
  centerColor,
}) => {
  const pct = clamp(max > 0 ? value / max : 0, 0, 1);
  const stroke = color || C.accent;
  const r = (size - thickness) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct);
  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size} style={{ position: "absolute" }}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={trackColor || C.border} strokeWidth={thickness} fill="none" />
        {pct > 0 && (
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={stroke}
            strokeWidth={thickness}
            fill="none"
            strokeDasharray={`${circ}`}
            strokeDashoffset={offset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        )}
      </Svg>
      {centerText != null && (
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: centerColor || C.text, fontSize: size * 0.24, fontWeight: "900" }}>{centerText}</Text>
          {centerSub != null && (
            <Text style={{ color: C.textMuted, fontSize: Math.max(9, size * 0.09), fontWeight: "600", marginTop: 2 }}>{centerSub}</Text>
          )}
        </View>
      )}
    </View>
  );
};

// ── BarChart ─────────────────────────────────────────────────────────────────
// data: [{ value, label, color?, caption? }]. Vertical bars with value caption
// and axis labels. `target` optionally draws a dashed reference line.
export const BarChart = ({
  data = [],
  width = 300,
  height = 150,
  C,
  color,
  yMax,
  target,
  rounded = 5,
  showValues = true,
  valueFormat = (v) => `${v}`,
}) => {
  if (!data.length) return null;
  const accent = color || C.accent;
  const vals = data.map((d) => d.value || 0);
  const hi = yMax != null ? yMax : Math.max(...vals, 1);
  const padTop = showValues ? 16 : 6;
  const innerH = height - padTop;
  const gap = 8;
  const barW = (width - gap * (data.length - 1)) / data.length;
  return (
    <Svg width={width} height={height} style={{ overflow: "visible" }}>
      {target != null && hi > 0 && (
        <Line x1={0} x2={width} y1={padTop + innerH * (1 - clamp(target / hi, 0, 1))} y2={padTop + innerH * (1 - clamp(target / hi, 0, 1))}
          stroke={C.textMuted} strokeWidth={1} strokeDasharray="4 4" />
      )}
      {data.map((d, i) => {
        const v = d.value || 0;
        const h = hi > 0 ? Math.max(2, (v / hi) * innerH) : 2;
        const x = i * (barW + gap);
        const y = padTop + (innerH - h);
        return (
          <G key={i}>
            <Rect x={x} y={y} width={barW} height={h} rx={rounded} fill={d.color || accent} opacity={0.92} />
            {showValues && (
              <SvgText x={x + barW / 2} y={y - 5} fontSize={10} fontWeight="700" fill={C.textSub} textAnchor="middle">
                {valueFormat(v)}
              </SvgText>
            )}
          </G>
        );
      })}
    </Svg>
  );
};

// ── RadarChart ───────────────────────────────────────────────────────────────
// data: [{ label, value(0-100) }]. Skill-mastery web. 3+ axes.
export const RadarChart = ({ data = [], size = 220, C, color, maxValue = 100, rings = 4 }) => {
  if (data.length < 3) return null;
  const accent = color || C.accent;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 46; // leave room for labels (+ a hair more so descenders/wide names never touch the edge)
  const n = data.length;
  const angleAt = (i) => (360 / n) * i;

  const gridRings = [];
  for (let ring = 1; ring <= rings; ring++) {
    const rr = (r * ring) / rings;
    const pts = data.map((_, i) => polar(cx, cy, rr, angleAt(i)));
    gridRings.push(pts.map((p) => `${p.x},${p.y}`).join(" "));
  }
  const valuePts = data.map((d, i) => polar(cx, cy, r * clamp((d.value || 0) / maxValue, 0, 1), angleAt(i)));
  const valueStr = valuePts.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <Svg width={size} height={size} style={{ overflow: "visible" }}>
      {gridRings.map((poly, i) => (
        <Polygon key={i} points={poly} fill="none" stroke={C.border} strokeWidth={1} />
      ))}
      {data.map((_, i) => {
        const p = polar(cx, cy, r, angleAt(i));
        return <Line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={C.border} strokeWidth={1} />;
      })}
      <Polygon points={valueStr} fill={accent} fillOpacity={0.22} stroke={accent} strokeWidth={2} strokeLinejoin="round" />
      {valuePts.map((p, i) => (
        <Circle key={i} cx={p.x} cy={p.y} r={3} fill={accent} />
      ))}
      {data.map((d, i) => {
        const p = polar(cx, cy, r + 16, angleAt(i));
        const anchor = Math.abs(p.x - cx) < 8 ? "middle" : p.x > cx ? "start" : "end";
        return (
          <SvgText key={i} x={p.x} y={p.y + 3} fontSize={9.5} fontWeight="600" fill={C.textSub} textAnchor={anchor}>
            {String(d.label).length > 11 ? String(d.label).slice(0, 10) + "…" : d.label}
          </SvgText>
        );
      })}
    </Svg>
  );
};

// ── ConsistencyHeatmap ───────────────────────────────────────────────────────
// values: array of { level: 0-4 } laid out column-major (oldest → newest) into
// `weeks` columns × 7 rows. Renders a GitHub-style activity grid in our palette.
export const ConsistencyHeatmap = ({
  weeks = 18,
  cells = [],
  C,
  color,
  cellSize = 12,
  gap = 3,
  rows = 7,
}) => {
  const accent = color || C.accent;
  const width = weeks * (cellSize + gap);
  const height = rows * (cellSize + gap);
  const levelColor = (lvl) => {
    if (!lvl) return C.border;
    const opac = [0, 0.3, 0.55, 0.8, 1][clamp(lvl, 0, 4)];
    return accent + Math.round(opac * 255).toString(16).padStart(2, "0");
  };
  return (
    <Svg width={width} height={height}>
      {Array.from({ length: weeks }).map((_, w) =>
        Array.from({ length: rows }).map((__, d) => {
          const idx = w * rows + d;
          const lvl = cells[idx]?.level || 0;
          return (
            <Rect
              key={`${w}-${d}`}
              x={w * (cellSize + gap)}
              y={d * (cellSize + gap)}
              width={cellSize}
              height={cellSize}
              rx={2.5}
              fill={levelColor(lvl)}
            />
          );
        })
      )}
    </Svg>
  );
};

// ── HBar ─────────────────────────────────────────────────────────────────────
// A compact horizontal progress bar with a label row. Pure RN Views (no SVG) so
// it composes cheaply inside lists. pct 0-100.
export const HBar = ({ label, sub, pct = 0, C, color, height = 8, right }) => {
  const fill = color || accuracyColor(pct, C);
  return (
    <View style={{ marginBottom: 12 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5, alignItems: "center" }}>
        <Text style={{ color: C.text, fontSize: 12.5, fontWeight: "600", flex: 1 }} numberOfLines={1}>{label}</Text>
        {right != null ? right : (
          <Text style={{ color: fill, fontWeight: "700", fontSize: 12 }}>{sub}</Text>
        )}
      </View>
      <View style={{ height, backgroundColor: C.card2 || C.border, borderRadius: height / 2, overflow: "hidden" }}>
        <View style={{ height, width: `${clamp(pct, 0, 100)}%`, backgroundColor: fill, borderRadius: height / 2 }} />
      </View>
    </View>
  );
};
