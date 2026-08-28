// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

// Mirrors App.tsx's SIDEBAR_W — the sidebar is fixed-width and fixed-position,
// so the tooltip's horizontal anchor never needs to be re-measured.
const SIDEBAR_W = 220;

const STEPS = [
  { id: "ascend-tour-tests", title: "Switch between tests", body: "Prepping for more than one exam? Jump between SAT, ACT, and AP prep here — each one keeps its own progress." },
  { id: "ascend-tour-practice", title: "Practice", body: "Drill real questions by domain, difficulty, or just the ones you've missed." },
  { id: "ascend-tour-learn", title: "Learn", body: "Bite-sized lessons for every skill, from algebra to grammar rules." },
  { id: "ascend-tour-review", title: "Review", body: "Every mistake you make gets logged here with an explanation — and comes back later so it sticks." },
  { id: "ascend-tour-growth", title: "Progress", body: "Track your accuracy by domain and watch your predicted score climb." },
  { id: "ascend-tour-studyPlan", title: "Study Plan", body: "Your day-by-day roadmap to test day, built from your diagnostic and target score." },
];

export default function ProductTour({ visible = false, isLight = false, P, onClose = () => {} }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [rect, setRect] = useState(null);
  const closedRef = useRef(false);

  useEffect(() => {
    if (visible) { setStepIndex(0); setRect(null); closedRef.current = false; }
  }, [visible]);

  const step = STEPS[stepIndex];

  useEffect(() => {
    if (!visible || Platform.OS !== "web") return;

    const measure = () => {
      const current = STEPS[stepIndex];
      if (!current) return;
      const el = document.getElementById(current.id);
      if (!el) {
        // Target isn't rendered right now (e.g. AP mode hides Practice/Learn) —
        // skip forward instead of showing a highlight around nothing.
        if (closedRef.current) return;
        const next = stepIndex + 1;
        if (next >= STEPS.length) { closedRef.current = true; onClose("completed"); return; }
        setStepIndex(next);
        return;
      }
      const r = el.getBoundingClientRect();
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    };

    measure();
    window.addEventListener("resize", measure);
    const onKey = (e) => { if (e.key === "Escape") { closedRef.current = true; onClose("skipped"); } };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("keydown", onKey);
    };
  }, [visible, stepIndex, onClose]);

  if (Platform.OS !== "web" || !visible || !P || !step || !rect) return null;

  const pad = 8;
  const dim = isLight ? "rgba(15,23,42,0.55)" : "rgba(0,0,0,0.65)";
  const cardW = 300;
  const cardTopRaw = rect.top + rect.height / 2 - 90;
  const cardTop = Math.min(Math.max(cardTopRaw, 16), (typeof window !== "undefined" ? window.innerHeight : 900) - 210);
  const cardLeft = SIDEBAR_W + 24;

  const goNext = () => {
    if (stepIndex + 1 >= STEPS.length) { closedRef.current = true; onClose("completed"); return; }
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  };
  const goBack = () => setStepIndex((i) => Math.max(i - 1, 0));
  const skip = () => { closedRef.current = true; onClose("skipped"); };

  return (
    <>
      {/* Click-catcher — keeps the app non-interactive while the tour is up */}
      <div style={{ position: "fixed", inset: 0, zIndex: 19999, background: "transparent" }} onClick={skip} />

      {/* Spotlight cutout around the current target */}
      <div
        style={{
          position: "fixed",
          top: rect.top - pad,
          left: rect.left - pad,
          width: rect.width + pad * 2,
          height: rect.height + pad * 2,
          borderRadius: 10,
          border: `2px solid ${P.accent0}`,
          boxShadow: `0 0 0 9999px ${dim}`,
          transition: "top 0.25s ease, left 0.25s ease, width 0.25s ease, height 0.25s ease",
          zIndex: 20000,
          pointerEvents: "none",
        }}
      />

      {/* Tooltip card */}
      <div
        style={{
          position: "fixed",
          top: cardTop,
          left: cardLeft,
          width: cardW,
          zIndex: 20001,
          background: P.bg0,
          border: `1px solid ${P.border0}`,
          borderRadius: 14,
          padding: 18,
          boxShadow: "0 16px 40px rgba(0,0,0,0.28)",
          transition: "top 0.25s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ color: P.text2, fontSize: 11, fontWeight: 700, letterSpacing: 0.6, marginBottom: 8 }}>
          {stepIndex + 1} OF {STEPS.length}
        </div>
        <div style={{ color: P.text0, fontSize: 16, fontWeight: 800, marginBottom: 6 }}>{step.title}</div>
        <div style={{ color: P.text1, fontSize: 13, lineHeight: 1.5, marginBottom: 16 }}>{step.body}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button
            onClick={skip}
            style={{ background: "none", border: "none", color: P.text2, fontSize: 12, fontWeight: 600, cursor: "pointer", padding: 0 }}
          >
            Skip tour
          </button>
          <div style={{ display: "flex", gap: 8 }}>
            {stepIndex > 0 && (
              <button
                onClick={goBack}
                style={{ background: "none", border: `1px solid ${P.border0}`, color: P.text0, fontSize: 13, fontWeight: 700, cursor: "pointer", borderRadius: 8, padding: "8px 14px" }}
              >
                Back
              </button>
            )}
            <button
              onClick={goNext}
              style={{ background: P.accent0, border: "none", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", borderRadius: 8, padding: "8px 16px" }}
            >
              {stepIndex + 1 >= STEPS.length ? "Got it" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
