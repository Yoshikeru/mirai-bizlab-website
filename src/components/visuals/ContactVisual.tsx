"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Contact hero visual — a paper plane flying along a dashed trail, "send"
 * ripples from the origin, and chat bubbles popping near the destination.
 * Reads as "reach out & we'll get back to you", fitting the contact page.
 */
const FG = "var(--color-foreground)";
const ACCENT = "var(--color-accent)";

const ORIGIN: [number, number] = [108, 300];
const DEST: [number, number] = [300, 108];

export function ContactVisual() {
  const reduce = useReducedMotion();

  const dx = DEST[0] - ORIGIN[0];
  const dy = DEST[1] - ORIGIN[1];

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
        {/* dashed flight trail */}
        <motion.line
          x1={ORIGIN[0]}
          y1={ORIGIN[1]}
          x2={DEST[0]}
          y2={DEST[1]}
          stroke={ACCENT}
          strokeOpacity={0.45}
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray="2 12"
          animate={reduce ? {} : { strokeDashoffset: [0, -28] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" as const }}
        />

        {/* send ripples from the origin */}
        {!reduce
          ? [0, 1].map((i) => (
              <motion.circle
                key={i}
                cx={ORIGIN[0]}
                cy={ORIGIN[1]}
                fill="none"
                stroke={ACCENT}
                strokeWidth={1.5}
                initial={{ r: 6, opacity: 0.5 }}
                animate={{ r: [6, 46], opacity: [0.5, 0] }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: i * 1.3,
                }}
              />
            ))
          : null}
        <circle cx={ORIGIN[0]} cy={ORIGIN[1]} r={6} fill={ACCENT} fillOpacity={0.8} />

        {/* paper plane flying along the trail */}
        <motion.g
          animate={
            reduce
              ? { x: dx, y: dy }
              : { x: [0, dx], y: [0, dy], opacity: [0, 1, 1, 0] }
          }
          transition={
            reduce
              ? undefined
              : {
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.15, 0.85, 1],
                }
          }
        >
          {/* drawn around ORIGIN, rotated to face the destination (up-right) */}
          <g transform={`translate(${ORIGIN[0]} ${ORIGIN[1]}) rotate(-45)`}>
            <path d="M -16 -11 L 18 0 L -16 11 L -7 0 Z" fill={ACCENT} />
            <path d="M -16 -11 L -7 0 L -16 11 Z" fill={ACCENT} fillOpacity={0.55} />
          </g>
        </motion.g>

        {/* chat bubbles near the destination */}
        {[
          { x: 250, y: 92, w: 60, delay: 0 },
          { x: 286, y: 140, w: 44, delay: 1.4 },
        ].map((b, i) => (
          <motion.g
            key={i}
            style={{ transformOrigin: `${b.x + b.w / 2}px ${b.y + 16}px` }}
            animate={reduce ? {} : { scale: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: b.delay,
              times: [0, 0.2, 0.8, 1],
            }}
          >
            <rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={30}
              rx={12}
              fill={i === 0 ? ACCENT : FG}
              fillOpacity={i === 0 ? 0.85 : 0.14}
            />
            <path
              d={`M ${b.x + 14} ${b.y + 30} l 10 0 l -5 9 Z`}
              fill={i === 0 ? ACCENT : FG}
              fillOpacity={i === 0 ? 0.85 : 0.14}
            />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
