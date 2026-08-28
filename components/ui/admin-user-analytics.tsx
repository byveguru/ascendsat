// @ts-nocheck
import React, { useMemo } from "react";
import { Platform, Text, View, useWindowDimensions } from "react-native";
import Svg, { Circle, Line, Path, Rect } from "react-native-svg";

const DAY_COUNT = 14;

export const formatDayKey = (date) => {
  const d = date instanceof Date ? date : new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export const getLastNDays = (n = DAY_COUNT) => {
  const days = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    days.push({
      key: formatDayKey(d),
      label: d.getDate() === new Date().getDate() && i === 0 ? "Today" : `${d.getMonth() + 1}/${d.getDate()}`,
    });
  }
  return days;
};

const StatPill = ({ label, value, color, sub, isLight }) => (
  <View
    style={{
      flex: 1,
      minWidth: 120,
      backgroundColor: isLight ? "#fff" : "#151c36",
      borderRadius: 14,
      padding: 14,
      alignItems: "center",
      borderWidth: 1,
      borderColor: isLight ? "#e7e0d2" : "#1a2540",
    }}
  >
    <Text style={{ color, fontSize: 24, fontWeight: "800" }}>{value}</Text>
    <Text style={{ color: isLight ? "#4A5A52" : "#9aa4c7", fontSize: 11, marginTop: 4, textAlign: "center" }}>{label}</Text>
    {sub ? <Text style={{ color: isLight ? "#7B8A81" : "#64748b", fontSize: 10, marginTop: 2 }}>{sub}</Text> : null}
  </View>
);

const BarChart = ({ title, subtitle, days, values, color, isLight, chartHeight = 120 }) => {
  const { width } = useWindowDimensions();
  const chartWidth = Math.min(width - 88, 520);
  const maxVal = Math.max(...values, 1);

  return (
    <View
      style={{
        backgroundColor: isLight ? "#fff" : "#151c36",
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: isLight ? "#e7e0d2" : "#1a2540",
      }}
    >
      <Text style={{ color: isLight ? "#1E2923" : "#eaeff8", fontWeight: "800", fontSize: 15, marginBottom: 2 }}>{title}</Text>
      {subtitle ? (
        <Text style={{ color: isLight ? "#7B8A81" : "#64748b", fontSize: 12, marginBottom: 14 }}>{subtitle}</Text>
      ) : (
        <View style={{ height: 8 }} />
      )}

      <View style={{ flexDirection: "row" }}>
        <View style={{ width: 28, height: chartHeight, justifyContent: "space-between", alignItems: "flex-end", paddingRight: 4 }}>
          {[maxVal, Math.round(maxVal / 2), 0].map((v) => (
            <Text key={v} style={{ color: isLight ? "#7B8A81" : "#64748b", fontSize: 9 }}>{v}</Text>
          ))}
        </View>
        <View style={{ flex: 1, height: chartHeight }}>
          <Svg width={chartWidth} height={chartHeight}>
            <Line x1={0} y1={chartHeight - 1} x2={chartWidth} y2={chartHeight - 1} stroke={isLight ? "#e7e0d2" : "#1f2a52"} strokeWidth={1} />
            <Line x1={0} y1={chartHeight / 2} x2={chartWidth} y2={chartHeight / 2} stroke={isLight ? "#f0e9dc" : "#1a2540"} strokeWidth={1} />
            {values.map((val, i) => {
              const barW = chartWidth / values.length - 6;
              const barH = Math.max(2, (val / maxVal) * (chartHeight - 12));
              const x = i * (chartWidth / values.length) + 3;
              const y = chartHeight - barH - 2;
              return (
                <Rect
                  key={days[i]?.key || i}
                  x={x}
                  y={y}
                  width={barW}
                  height={barH}
                  rx={3}
                  fill={color}
                  opacity={i === values.length - 1 ? 1 : 0.78}
                />
              );
            })}
          </Svg>
        </View>
      </View>

      <View style={{ flexDirection: "row", marginLeft: 28, marginTop: 6 }}>
        {days.map((d, i) => (
          <Text
            key={d.key}
            style={{
              flex: 1,
              color: isLight ? "#7B8A81" : "#64748b",
              fontSize: 8,
              textAlign: "center",
              fontWeight: i === days.length - 1 ? "700" : "400",
            }}
            numberOfLines={1}
          >
            {i % 2 === 0 || i === days.length - 1 ? d.label : ""}
          </Text>
        ))}
      </View>
    </View>
  );
};

const LineChart = ({ title, subtitle, days, values, color, isLight, chartHeight = 110 }) => {
  const { width } = useWindowDimensions();
  const chartWidth = Math.min(width - 88, 520);
  const maxVal = Math.max(...values, 1);

  const { linePath, areaPath, points } = useMemo(() => {
    if (values.length < 2) return { linePath: "", areaPath: "", points: [] };
    const step = chartWidth / (values.length - 1);
    const pts = values.map((val, i) => {
      const x = i * step;
      const y = chartHeight - 8 - (val / maxVal) * (chartHeight - 20);
      return { x, y, val };
    });
    const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
    const area = `${line} L${pts[pts.length - 1].x},${chartHeight - 2} L${pts[0].x},${chartHeight - 2} Z`;
    return { linePath: line, areaPath: area, points: pts };
  }, [values, chartWidth, chartHeight, maxVal]);

  return (
    <View
      style={{
        backgroundColor: isLight ? "#fff" : "#151c36",
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: isLight ? "#e7e0d2" : "#1a2540",
      }}
    >
      <Text style={{ color: isLight ? "#1E2923" : "#eaeff8", fontWeight: "800", fontSize: 15, marginBottom: 2 }}>{title}</Text>
      <Text style={{ color: isLight ? "#7B8A81" : "#64748b", fontSize: 12, marginBottom: 14 }}>{subtitle}</Text>

      <View style={{ flexDirection: "row" }}>
        <View style={{ width: 28, height: chartHeight, justifyContent: "space-between", alignItems: "flex-end", paddingRight: 4 }}>
          {[maxVal, Math.round(maxVal / 2), 0].map((v) => (
            <Text key={v} style={{ color: isLight ? "#7B8A81" : "#64748b", fontSize: 9 }}>{v}</Text>
          ))}
        </View>
        <Svg width={chartWidth} height={chartHeight}>
          <Line x1={0} y1={chartHeight - 1} x2={chartWidth} y2={chartHeight - 1} stroke={isLight ? "#e7e0d2" : "#1f2a52"} strokeWidth={1} />
          {areaPath ? <Path d={areaPath} fill={color} opacity={0.15} /> : null}
          {linePath ? <Path d={linePath} stroke={color} strokeWidth={2.5} fill="none" /> : null}
          {points.map((p, i) => (
            <Circle key={days[i]?.key || i} cx={p.x} cy={p.y} r={3.5} fill={color} />
          ))}
        </Svg>
      </View>

      <View style={{ flexDirection: "row", marginLeft: 28, marginTop: 6 }}>
        {days.map((d, i) => (
          <Text
            key={d.key}
            style={{ flex: 1, color: isLight ? "#7B8A81" : "#64748b", fontSize: 8, textAlign: "center" }}
            numberOfLines={1}
          >
            {i % 2 === 0 || i === days.length - 1 ? d.label : ""}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default function AdminUserAnalytics({ isLight = false, analytics, loading = false, showTitle = true }) {
  const days = useMemo(() => getLastNDays(DAY_COUNT), []);

  if (loading) {
    return (
      <View style={{ paddingVertical: 24, alignItems: "center" }}>
        <Text style={{ color: isLight ? "#4A5A52" : "#9aa4c7" }}>Loading user analytics�</Text>
      </View>
    );
  }

  if (!analytics) return null;

  const {
    totalUsers = 0,
    totalQuestionsAnswered = 0,
    dailySignups = {},
    dailyQuestions = {},
    dailyQuizSessions = {},
    activeUsers7d = 0,
  } = analytics;

  const signupValues = days.map((d) => dailySignups[d.key] || 0);
  const questionValues = days.map((d) => dailyQuestions[d.key] || 0);
  const sessionValues = days.map((d) => dailyQuizSessions[d.key] || 0);
  const avgPerUser = totalUsers > 0 ? Math.round(totalQuestionsAnswered / totalUsers) : 0;
  const signups14d = signupValues.reduce((s, v) => s + v, 0);
  const questions14d = questionValues.reduce((s, v) => s + v, 0);

  const accent = isLight ? "#B85D42" : "#f5c518";
  const success = isLight ? "#16a34a" : "#4caf50";
  const info = isLight ? "#2563eb" : "#60a5fa";
  const violet = isLight ? "#7c3aed" : "#a78bfa";

  const hasSignupData = signupValues.some((v) => v > 0);
  const hasQuestionData = questionValues.some((v) => v > 0);
  const hasSessionData = sessionValues.some((v) => v > 0);

  return (
    <View style={{ marginBottom: 8 }}>
      {showTitle ? (
        <Text
          style={{
            color: isLight ? "#1E2923" : "#eaeff8",
            fontSize: 18,
            fontWeight: "800",
            marginBottom: 12,
            ...(Platform.OS === "web" ? { fontFamily: "'Fraunces', Georgia, serif" } : {}),
          }}
        >
          User Analytics
        </Text>
      ) : null}

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
        <StatPill label="Total Users" value={totalUsers.toLocaleString()} color={accent} isLight={isLight} />
        <StatPill label="Questions Answered" value={totalQuestionsAnswered.toLocaleString()} color={success} isLight={isLight} />
        <StatPill label="Avg Qs / User" value={avgPerUser.toLocaleString()} color={info} isLight={isLight} sub="lifetime" />
        <StatPill label="Active (7d)" value={activeUsers7d.toLocaleString()} color={violet} isLight={isLight} sub="unique learners" />
      </View>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
        <StatPill label="New Signups (14d)" value={signups14d.toLocaleString()} color={accent} isLight={isLight} />
        <StatPill label="Questions (14d)" value={questions14d.toLocaleString()} color={success} isLight={isLight} />
      </View>

      {hasSignupData ? (
        <BarChart
          title="New User Signups"
          subtitle={`Last ${DAY_COUNT} days`}
          days={days}
          values={signupValues}
          color={accent}
          isLight={isLight}
        />
      ) : (
        <View style={{ backgroundColor: isLight ? "#fff" : "#151c36", borderRadius: 14, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: isLight ? "#e7e0d2" : "#1a2540" }}>
          <Text style={{ color: isLight ? "#4A5A52" : "#9aa4c7", fontSize: 13, textAlign: "center" }}>
            Signup trends will appear as new users join.
          </Text>
        </View>
      )}

      {hasQuestionData ? (
        <BarChart
          title="Questions Answered"
          subtitle={`Daily volume � last ${DAY_COUNT} days`}
          days={days}
          values={questionValues}
          color={success}
          isLight={isLight}
        />
      ) : null}

      {hasSessionData ? (
        <LineChart
          title="Quiz Sessions"
          subtitle={`Completed quizzes per day � last ${DAY_COUNT} days`}
          days={days}
          values={sessionValues}
          color={info}
          isLight={isLight}
        />
      ) : !hasQuestionData ? (
        <View style={{ backgroundColor: isLight ? "#fff" : "#151c36", borderRadius: 14, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: isLight ? "#e7e0d2" : "#1a2540" }}>
          <Text style={{ color: isLight ? "#4A5A52" : "#9aa4c7", fontSize: 13, textAlign: "center" }}>
            Activity charts populate as students complete quizzes.
          </Text>
        </View>
      ) : null}
    </View>
  );
}
