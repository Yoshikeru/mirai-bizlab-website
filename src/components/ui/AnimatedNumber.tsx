"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { EASE_OUT_EXPO } from "@/components/motion/constants";

export function AnimatedNumber({
  value,
  suffix = "",
  duration = 1.4,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Inset only the top/bottom of the viewport, never the sides. A single
  // "-80px" shrinks all four edges, so on a narrow mobile screen a small
  // left-column element (e.g. the 2-col metrics grid) can fall entirely
  // inside the 80px left dead-zone and never register as in view — which
  // left "在タイ顧客数" stuck at 0 on mobile.
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState<number>(reduce ? value : 0);

  useEffect(() => {
    // Reduced motion: show the final value immediately, no count-up.
    if (reduce) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

    const controls = animate(0, value, {
      duration,
      ease: EASE_OUT_EXPO,
      onUpdate: (v) => setDisplay(Math.round(v)),
      onComplete: () => setDisplay(value),
    });

    // If the tween is torn down before it finishes — an effect re-run from
    // `useReducedMotion` settling, a layout shift, Strict Mode's double-invoke,
    // etc. — snap to the final value. Combined with `once: true`, this prevents
    // the number from getting permanently stuck partway (e.g. showing 0).
    return () => {
      controls.stop();
      setDisplay(value);
    };
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
