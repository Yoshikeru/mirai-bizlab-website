"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Careers hero visual — a small team network: a central figure connected to
 * teammates by pulsing links, with figures gently floating and a welcoming
 * ripple from the center. Reads as "people & growing team".
 */
const FG = "var(--color-foreground)";
const ACCENT = "var(--color-accent)";

function Person({
  x,
  y,
  s,
  color,
  opacity,
}: {
  x: number;
  y: number;
  s: number;
  color: string;
  opacity: number;
}) {
  return (
    <g>
      {/* shoulders */}
      <path
        d={`M ${x - 20 * s} ${y + 14 * s} a ${20 * s} ${17 * s} 0 0 1 ${40 * s} 0 Z`}
        fill={color}
        fillOpacity={opacity}
      />
      {/* head */}
      <circle cx={x} cy={y - 8 * s} r={12 * s} fill={color} fillOpacity={opacity} />
    </g>
  );
}

const CENTER: [number, number] = [200, 212];
const MEMBERS: [number, number][] = [
  [110, 132],
  [296, 138],
  [118, 300],
  [288, 296],
];

export function CareersVisual() {
  const reduce = useReducedMotion();

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
        {/* connection links */}
        {MEMBERS.map(([mx, my], i) => (
          <motion.line
            key={`link-${i}`}
            x1={CENTER[0]}
            y1={CENTER[1]}
            x2={mx}
            y2={my}
            stroke={FG}
            strokeOpacity={0.22}
            strokeWidth={1.5}
            strokeDasharray="3 8"
            animate={reduce ? {} : { strokeDashoffset: [0, -22] }}
            transition={{
              duration: 1.6 + i * 0.2,
              repeat: Infinity,
              ease: "linear" as const,
            }}
          />
        ))}

        {/* welcoming ripple from the center */}
        {!reduce ? (
          <motion.circle
            cx={CENTER[0]}
            cy={CENTER[1]}
            fill="none"
            stroke={ACCENT}
            strokeWidth={1.5}
            initial={{ r: 24, opacity: 0.5 }}
            animate={{ r: [24, 120], opacity: [0.5, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut" }}
          />
        ) : null}

        {/* surrounding members (floating) */}
        {MEMBERS.map(([mx, my], i) => (
          <motion.g
            key={`member-${i}`}
            style={{ transformOrigin: `${mx}px ${my}px` }}
            animate={reduce ? {} : { y: [0, i % 2 === 0 ? -9 : 9, 0] }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Person x={mx} y={my} s={0.82} color={FG} opacity={0.45} />
          </motion.g>
        ))}

        {/* central figure (pulsing) */}
        <motion.g
          style={{ transformOrigin: `${CENTER[0]}px ${CENTER[1]}px` }}
          animate={reduce ? {} : { scale: [1, 1.05, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Person x={CENTER[0]} y={CENTER[1]} s={1.3} color={ACCENT} opacity={0.9} />
        </motion.g>
      </svg>
    </div>
  );
}
