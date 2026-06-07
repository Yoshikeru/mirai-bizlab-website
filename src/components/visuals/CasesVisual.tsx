"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Cases hero visual — a bar chart that grows in, an upward trend line with
 * marching dashes, and a pulsing peak with an arrow. Reads as "results &
 * growth", fitting the case-study page.
 */
const FG = "var(--color-foreground)";
const ACCENT = "var(--color-accent)";

const BASE = 320;
const W = 34;
const BARS = [
  { x: 74, h: 60 },
  { x: 132, h: 96 },
  { x: 190, h: 134 },
  { x: 248, h: 174 },
  { x: 306, h: 210 },
];

export function CasesVisual() {
  const reduce = useReducedMotion();

  const points = BARS.map((b) => `${b.x + W / 2},${BASE - b.h}`).join(" ");
  const peak = BARS[BARS.length - 1];
  const peakX = peak.x + W / 2;
  const peakY = BASE - peak.h;

  // upward arrow above the peak
  const arrow = `M ${peakX} ${peakY - 50} L ${peakX + 13} ${peakY - 35} L ${peakX + 4} ${peakY - 35} L ${peakX + 4} ${peakY - 20} L ${peakX - 4} ${peakY - 20} L ${peakX - 4} ${peakY - 35} L ${peakX - 13} ${peakY - 35} Z`;

  return (
    <div className="relative aspect-square w-full max-w-[420px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[16%] -z-10 rounded-full bg-[color:var(--color-accent)]/10 blur-[60px]"
      />
      <svg
        viewBox="0 0 400 400"
        className="h-full w-full overflow-visible"
        aria-hidden
      >
        {/* baseline */}
        <line
          x1={52}
          y1={BASE}
          x2={350}
          y2={BASE}
          stroke={FG}
          strokeOpacity={0.16}
          strokeWidth={2}
          strokeLinecap="round"
        />

        {/* bars */}
        {BARS.map((b, i) => {
          const isPeak = i === BARS.length - 1;
          return (
            <motion.rect
              key={i}
              x={b.x}
              y={BASE - b.h}
              width={W}
              height={b.h}
              rx={6}
              fill={isPeak ? ACCENT : FG}
              fillOpacity={isPeak ? 0.85 : 0.12}
              style={{ transformOrigin: `${b.x + W / 2}px ${BASE}px` }}
              initial={reduce ? false : { scaleY: 0 }}
              animate={reduce ? {} : { scaleY: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.15 + i * 0.12,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            />
          );
        })}

        {/* trend line (marching dashes) */}
        <motion.polyline
          points={points}
          fill="none"
          stroke={ACCENT}
          strokeOpacity={0.75}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2 11"
          animate={reduce ? {} : { strokeDashoffset: [0, -26] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" as const }}
        />

        {/* trend vertices */}
        {BARS.slice(0, -1).map((b, i) => (
          <circle
            key={i}
            cx={b.x + W / 2}
            cy={BASE - b.h}
            r={3.5}
            fill={ACCENT}
            fillOpacity={0.7}
          />
        ))}

        {/* expanding ripple at the peak */}
        {!reduce ? (
          <motion.circle
            cx={peakX}
            cy={peakY}
            fill="none"
            stroke={ACCENT}
            strokeWidth={2}
            initial={{ r: 7, opacity: 0.7 }}
            animate={{ r: [7, 28], opacity: [0.7, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        ) : null}

        {/* peak dot */}
        <motion.circle
          cx={peakX}
          cy={peakY}
          r={7}
          fill={ACCENT}
          style={{ transformOrigin: `${peakX}px ${peakY}px` }}
          animate={reduce ? {} : { scale: [1, 1.25, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* upward arrow */}
        <motion.path
          d={arrow}
          fill={ACCENT}
          fillOpacity={0.9}
          style={{ transformOrigin: `${peakX}px ${peakY}px` }}
          animate={reduce ? {} : { y: [0, -6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
