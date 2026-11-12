// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import {
  Platform,
  View,
  Text,
  ActivityIndicator,
  Animated,
  Easing,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

import { ascentTheme, fonts } from "../theme";

const STAR = "\u2605";
const SPEECH = "\uD83D\uDCAC";
const AVATAR_COLORS = ["#3b82f6", "#a78bfa", "#f5c518", "#4ade80", "#fb923c", "#f87171"];

export const mapFirestoreTestimonials = (items = []) =>
  items.map((item, index) => ({
    id: String(item.id ?? index),
    name: item.name || "Student",
    role: item.score ? `SAT Score: ${item.score}` : "AscendSAT Student",
    content: item.text || "",
    rating: 5,
    avatarColor: AVATAR_COLORS[index % AVATAR_COLORS.length],
  }));

const StarRow = ({ count = 5, size = 16, style }) => (
  <View style={[{ flexDirection: "row", gap: 3, marginBottom: 14 }, style]}>
    {Array.from({ length: count }).map((_, i) => (
      <Text key={i} style={{ color: "#eab308", fontSize: size, lineHeight: size + 2 }}>
        {STAR}
      </Text>
    ))}
  </View>
);

const DotNav = ({ count, activeIndex, onSelect, accent, isLight }) => (
  <View style={{ flexDirection: "row", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
    {Array.from({ length: count }).map((_, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => onSelect(index)}
        accessibilityLabel={`View testimonial ${index + 1}`}
        activeOpacity={0.8}
      >
        <View
          style={{
            height: 10,
            width: activeIndex === index ? 36 : 10,
            borderRadius: 5,
            backgroundColor: activeIndex === index ? accent : isLight ? "#cbd5e1" : "#334155",
          }}
        />
      </TouchableOpacity>
    ))}
  </View>
);

const TestimonialCard = ({ item, isLight, accent, border, cardBg, textPrimary, textSecondary }) => (
  <View
    style={{
      backgroundColor: cardBg,
      borderRadius: 12,
      padding: 24,
      borderWidth: 1,
      borderColor: border,
      minHeight: 260,
      ...(Platform.OS === "web"
        ? { boxShadow: "none" }
        : {}),
    }}
  >
    <StarRow />
    <Text
      style={{
        color: accent,
        fontSize: 32,
        lineHeight: 28,
        marginBottom: 6,
        fontFamily: Platform.OS === "ios" ? "Georgia" : undefined,
      }}
    >
      "
    </Text>
    <Text style={{ color: textPrimary, fontSize: 16, lineHeight: 26, fontWeight: "500", flex: 1 }}>
      "{item.content}"
    </Text>
    <View style={{ height: 1, backgroundColor: border, marginVertical: 16 }} />
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: `${item.avatarColor}22`,
          borderWidth: 1.5,
          borderColor: `${item.avatarColor}55`,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: item.avatarColor, fontWeight: "800", fontSize: 16 }}>{item.name?.[0]}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: textPrimary, fontWeight: "700", fontSize: 15 }}>{item.name}</Text>
        <Text style={{ color: textSecondary, fontSize: 13, marginTop: 2 }}>{item.role}</Text>
      </View>
    </View>
  </View>
);

export default function AnimatedTestimonials({
  testimonials = [],
  isLight = false,
  loading = false,
  title = "Results speak for themselves.",
  subtitle = "Real students. Real score gains. See what AscendSAT users are saying.",
  badgeText = "Student success stories",
  autoRotateInterval = 0,
}) {
  const items = mapFirestoreTestimonials(testimonials);
  const { width } = useWindowDimensions();
  const isWide = width >= 768;
  const hasHeader = Boolean(title || subtitle || badgeText);

  const [activeIndex, setActiveIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const t = ascentTheme(isLight);
  const textPrimary=t.text, textSecondary=t.muted, cardBg=t.surface, border=t.border, accent=t.terracotta, sectionBg=t.background;

  useEffect(() => {
    setActiveIndex(0);
  }, [items.length]);

  useEffect(() => {
    if (autoRotateInterval <= 0 || items.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, autoRotateInterval);
    return () => clearInterval(interval);
  }, [autoRotateInterval, items.length]);

  useEffect(() => { fadeAnim.setValue(1); slideAnim.setValue(0); }, [activeIndex,items.length]);

  if (loading) {
    return (
      <View style={{ paddingVertical: 48, alignItems: "center" }}>
        <ActivityIndicator color={accent} />
        <Text style={{ color: textSecondary, marginTop: 12 }}>Loading reviews...</Text>
      </View>
    );
  }

  if (!items.length) {
    return (
      <View
        style={{
          padding: 32,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: border,
          backgroundColor: cardBg,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 36, marginBottom: 10 }}>{SPEECH}</Text>
        <Text style={{ color: textPrimary, fontWeight: "800", fontSize: 17 }}>Testimonials coming soon!</Text>
      </View>
    );
  }

  const active = items[activeIndex];

  return (
    <View
      style={{
        backgroundColor: sectionBg,
        borderRadius: 12,
        padding: isWide ? 32 : 20,
        borderWidth: 1,
        borderColor: border,
      }}
    >
      <View style={{ flexDirection: isWide && hasHeader ? "row" : "column", gap: isWide && hasHeader ? 40 : 20, alignItems: isWide && hasHeader ? "center" : "stretch" }}>
        {hasHeader ? (
          <View style={{ flex: isWide ? 1 : undefined, maxWidth: isWide ? 420 : undefined }}>
            {badgeText ? (
              <View
                style={{
                  alignSelf: "flex-start",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 8,
                  backgroundColor: sectionBg,
                  marginBottom: 14,
                }}
              >
                <Text style={{ color: accent, fontSize: 12 }}>{STAR}</Text>
                <Text style={{ color: accent, fontSize: 12, fontWeight: "700" }}>{badgeText}</Text>
              </View>
            ) : null}
            {title ? (
              <Text style={{ color: textPrimary, fontFamily: fonts.studyDisplay, fontSize: isWide ? 30 : 26, fontWeight: "700", letterSpacing: -0.5, marginBottom: 8, lineHeight: isWide ? 40 : 34 }}>
                {title}
              </Text>
            ) : null}
            {subtitle ? (
              <Text style={{ color: textSecondary, fontSize: 15, lineHeight: 22, marginBottom: isWide ? 0 : 4 }}>{subtitle}</Text>
            ) : null}
            {isWide ? <View style={{ marginTop: 24 }}><DotNav count={items.length} activeIndex={activeIndex} onSelect={setActiveIndex} accent={accent} isLight={isLight} /></View> : null}
          </View>
        ) : null}

        <View style={{ flex: isWide ? 1.2 : undefined, width: "100%" }}>
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateX: slideAnim }] }}>
            <TestimonialCard
              item={active}
              isLight={isLight}
              accent={accent}
              border={border}
              cardBg={cardBg}
              textPrimary={textPrimary}
              textSecondary={textSecondary}
            />
          </Animated.View>
          {!isWide || !hasHeader ? (
            <View style={{ marginTop: 18, alignItems: hasHeader ? "flex-start" : "center" }}>
              <DotNav count={items.length} activeIndex={activeIndex} onSelect={setActiveIndex} accent={accent} isLight={isLight} />
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}
