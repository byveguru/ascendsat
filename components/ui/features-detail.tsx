// @ts-nocheck
import React, { useEffect, useRef } from "react";
import { Animated, Easing, Platform, Text, View, useWindowDimensions } from "react-native";
import AdminUserAnalytics from "./admin-user-analytics";

export default function FeaturesDetail({ isLight = false, analytics = null, loading = false }) {
  const { width: windowWidth } = useWindowDimensions();

  const headingOpacity = useRef(new Animated.Value(0)).current;
  const headingY = useRef(new Animated.Value(24)).current;
  const bodyOpacity = useRef(new Animated.Value(0)).current;
  const bodyY = useRef(new Animated.Value(18)).current;

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);

  const textPrimary = isLight ? "#1E2923" : "#eaeff8";
  const textSecondary = isLight ? "#4A5A52" : "#9aa4c7";

  useEffect(() => {
    const entrance = Animated.parallel([
      Animated.timing(headingOpacity, { toValue: 1, duration: 700, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(headingY, { toValue: 0, duration: 700, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(bodyOpacity, { toValue: 1, duration: 700, delay: 120, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(bodyY, { toValue: 0, duration: 700, delay: 120, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]);
    entrance.start();
    return () => entrance.stop();
  }, [bodyOpacity, bodyY, headingOpacity, headingY]);

  useEffect(() => {
    if (Platform.OS !== "web") return undefined;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline();
      if (headingRef.current) {
        tl.fromTo(headingRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
      }
      if (bodyRef.current) {
        tl.fromTo(bodyRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.45");
      }

      cleanup = () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <View ref={sectionRef} style={{ paddingVertical: 12, marginBottom: 8 }}>
      <Animated.View style={{ opacity: headingOpacity, transform: [{ translateY: headingY }] }}>
        <Text
          ref={headingRef}
          style={{
            color: textPrimary,
            fontSize: windowWidth < 640 ? 28 : 36,
            fontWeight: "800",
            letterSpacing: -0.6,
            lineHeight: windowWidth < 640 ? 34 : 42,
            marginBottom: 10,
            ...(Platform.OS === "web" ? { fontFamily: "'Fraunces', Georgia, serif" } : {}),
          }}
        >
          User analytics at a glance
        </Text>
      </Animated.View>

      <Animated.View ref={bodyRef} style={{ opacity: bodyOpacity, transform: [{ translateY: bodyY }] }}>
        <Text style={{ color: textSecondary, fontSize: 16, lineHeight: 24, marginBottom: 16, maxWidth: 640 }}>
          Track signups, quiz activity, and engagement across your student base.
        </Text>
        <AdminUserAnalytics isLight={isLight} analytics={analytics} loading={loading} showTitle={false} />
      </Animated.View>
    </View>
  );
}
