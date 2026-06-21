"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Animated, brand-aligned service emblems for the home Services list.
 * Refined motion-graphics: each emblem has one choreographed looping idea.
 * Colors via CSS vars so they adapt to dark mode; static fallback when
 * reduced-motion is set. Motifs are centered in a 96×96 box for balance.
 */

const INK = "var(--color-foreground)";
const ACCENT = "var(--color-accent)";
const SOFT = [0.4, 0, 0.2, 1] as const;

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

  // 01 — 会社設立支援: a stable structure with a red "build beam" sweeping up
  if (index === 0) {
    const settle = (delay: number, amp: number) =>
      reduce
        ? {}
        : {
            animate: { y: [0, -amp, 0] },
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const, delay },
          };
    return (
      <svg {...svg}>
        <line x1="20" y1="80" x2="76" y2="80" stroke={INK} strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round" />
        <motion.rect x="26" y="58" width="44" height="20" rx="4" stroke={INK} strokeWidth="3" {...settle(0, 1)} />
        <motion.rect x="32" y="38" width="32" height="18" rx="4" stroke={INK} strokeWidth="3" {...settle(0.2, 1.6)} />
        <motion.g {...settle(0.4, 2.2)}>
          <rect x="40" y="20" width="16" height="16" rx="4" stroke={ACCENT} strokeWidth="3" />
          <motion.circle
            cx="48" cy="11" r="3.2" fill={ACCENT}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            animate={reduce ? undefined : { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={reduce ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>
        {/* build beam sweeping up the structure */}
        {!reduce && (
          <motion.line
            x1="24" y1="0" x2="72" y2="0" stroke={ACCENT} strokeWidth="3" strokeLinecap="round"
            animate={{ y: [80, 14], opacity: [0, 0.9, 0.9, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: SOFT, times: [0, 0.2, 0.8, 1], repeatDelay: 0.6 }}
          />
        )}
      </svg>
    );
  }

  // 02 — 会計・税務: equalizer with a traveling wave (one accent bar)
  if (index === 1) {
    const bars = [
      { x: 20, h: 28, accent: false },
      { x: 32, h: 42, accent: false },
      { x: 44, h: 30, accent: true },
      { x: 56, h: 48, accent: false },
      { x: 68, h: 36, accent: false },
    ];
    return (
      <svg {...svg}>
        <line x1="16" y1="78" x2="80" y2="78" stroke={INK} strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round" />
        {bars.map((b, i) => (
          <motion.rect
            key={b.x}
            x={b.x} y={78 - b.h} width="8" height={b.h} rx="2.5"
            fill={b.accent ? ACCENT : INK} fillOpacity={b.accent ? 1 : 0.85}
            style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
            animate={reduce ? undefined : { scaleY: [1, 0.38, 1] }}
            transition={reduce ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }}
          />
        ))}
      </svg>
    );
  }

  // 03 — 会計システム導入支援: data streams from a cloud into a receiving tray
  if (index === 2) {
    const dots = [
      { x: 36, accent: false, d: 0 },
      { x: 48, accent: true, d: 0.7 },
      { x: 60, accent: false, d: 1.4 },
    ];
    return (
      <svg {...svg}>
        <motion.path
          d="M30 40 a13 13 0 0 1 5 -25 a19 19 0 0 1 36 -3 a15 15 0 0 1 9 28 Z"
          stroke={INK} strokeWidth="3" strokeLinejoin="round" transform="translate(2 0)"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
          transition={reduce ? undefined : { duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        />
        {dots.map((dt) => (
          <motion.circle
            key={dt.x} cx={dt.x} cy="32" r="3.4"
            fill={dt.accent ? ACCENT : INK} fillOpacity={dt.accent ? 1 : 0.4}
            animate={reduce ? undefined : { cy: [32, 72], opacity: [0, 1, 1, 0] }}
            transition={reduce ? undefined : { duration: 2.1, repeat: Infinity, ease: "easeIn", delay: dt.d, times: [0, 0.2, 0.85, 1] }}
          />
        ))}
        <motion.rect
          x="28" y="76" width="40" height="8" rx="4" stroke={ACCENT} strokeWidth="3"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          animate={reduce ? undefined : { scaleX: [1, 1.08, 1] }}
          transition={reduce ? undefined : { duration: 2.1, repeat: Infinity, ease: "easeOut" }}
        />
      </svg>
    );
  }

  // 04 — タイ進出 戦略セッション: a node emitting steady consultation ripples
  return (
    <svg {...svg}>
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i} cx="48" cy="50" r="13" stroke={ACCENT} strokeWidth="2.5"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          animate={reduce ? undefined : { scale: [1, 2.6], opacity: [0.5, 0] }}
          transition={reduce ? undefined : { duration: 3, repeat: Infinity, ease: "easeOut", delay: i }}
        />
      ))}
      <motion.circle
        cx="48" cy="50" r="9" fill={ACCENT}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        animate={reduce ? undefined : { scale: [1, 1.12, 1] }}
        transition={reduce ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}
