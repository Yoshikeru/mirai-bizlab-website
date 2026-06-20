"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Animated, brand-aligned service emblems for the home Services list.
 * Line-art + accent red, colors via CSS vars so they adapt to dark mode.
 * Subtle continuous motion; falls back to static when reduced-motion is set.
 */

const INK = "var(--color-foreground)";
const ACCENT = "var(--color-accent)";

type Props = { index: number; className?: string };

export function ServiceIcon({ index, className }: Props) {
  const reduce = useReducedMotion();
  const svg = {
    viewBox: "0 0 96 96",
    fill: "none" as const,
    className,
    role: "img" as const,
    "aria-hidden": true,
  };
  const float = (delay: number, amp: number) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -amp, 0] },
          transition: {
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay,
          },
        };

  // 01 — 会社設立支援: stacking blocks rising, with a pulsing summit node
  if (index === 0) {
    return (
      <svg {...svg}>
        <line x1="18" y1="84" x2="78" y2="84" stroke={INK} strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round" />
        <motion.rect x="26" y="60" width="44" height="20" rx="4" stroke={INK} strokeWidth="3" {...float(0, 1.5)} />
        <motion.rect x="32" y="40" width="32" height="18" rx="4" stroke={INK} strokeWidth="3" {...float(0.25, 2.5)} />
        <motion.g {...float(0.5, 3.5)}>
          <rect x="40" y="22" width="16" height="16" rx="4" stroke={ACCENT} strokeWidth="3" />
          <motion.circle
            cx="48" cy="13" r="3.2" fill={ACCENT}
            animate={reduce ? undefined : { scale: [1, 1.5, 1], opacity: [1, 0.55, 1] }}
            transition={reduce ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        </motion.g>
      </svg>
    );
  }

  // 02 — 会計・税務: breathing bar chart (one bar accent)
  if (index === 1) {
    const bars = [
      { x: 22, h: 30, c: INK, o: 0.85, d: 0 },
      { x: 38, h: 46, c: INK, o: 0.85, d: 0.3 },
      { x: 54, h: 22, c: ACCENT, o: 1, d: 0.6 },
      { x: 70, h: 38, c: INK, o: 0.85, d: 0.15 },
    ];
    return (
      <svg {...svg}>
        <line x1="16" y1="80" x2="82" y2="80" stroke={INK} strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round" />
        {bars.map((b) => (
          <motion.rect
            key={b.x}
            x={b.x} y={80 - b.h} width="9" height={b.h} rx="2.5"
            fill={b.c} fillOpacity={b.o}
            style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
            animate={reduce ? undefined : { scaleY: [1, 0.55, 1] }}
            transition={reduce ? undefined : { duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: b.d }}
          />
        ))}
      </svg>
    );
  }

  // 03 — 会計システム導入支援: cloud with data dots streaming down to a tray
  if (index === 2) {
    const dots = [
      { x: 34, c: INK, o: 0.4, d: 0 },
      { x: 48, c: ACCENT, o: 1, d: 0.5 },
      { x: 62, c: INK, o: 0.4, d: 1 },
    ];
    return (
      <svg {...svg}>
        <path
          d="M30 40 a13 13 0 0 1 5 -25 a19 19 0 0 1 36 -3 a15 15 0 0 1 9 28 Z"
          stroke={INK} strokeWidth="3" strokeLinejoin="round" transform="translate(2 0)"
        />
        {dots.map((dt) => (
          <motion.circle
            key={dt.x} cx={dt.x} cy="50" r="3.4" fill={dt.c} fillOpacity={dt.o}
            animate={reduce ? undefined : { cy: [48, 74], opacity: [0, dt.o, dt.o, 0] }}
            transition={reduce ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeIn", delay: dt.d, times: [0, 0.2, 0.8, 1] }}
          />
        ))}
        {/* tray / database */}
        <rect x="28" y="76" width="40" height="8" rx="4" stroke={ACCENT} strokeWidth="3" />
      </svg>
    );
  }

  // 04 — タイ進出 戦略セッション: a node radiating consultation pulses + ascending spark
  return (
    <svg {...svg}>
      {[0, 1].map((i) => (
        <motion.circle
          key={i} cx="44" cy="54" r="14" stroke={ACCENT} strokeWidth="2.5"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          animate={reduce ? undefined : { scale: [1, 2.3], opacity: [0.5, 0] }}
          transition={reduce ? undefined : { duration: 2.6, repeat: Infinity, ease: "easeOut", delay: i * 1.3 }}
        />
      ))}
      <circle cx="44" cy="54" r="9" fill={ACCENT} />
      {/* ascending insight spark */}
      <motion.path
        d="M64 40 L70 24 L78 34" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        animate={reduce ? undefined : { y: [0, -3, 0], opacity: [0.55, 1, 0.55] }}
        transition={reduce ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}
