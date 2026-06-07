"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Services hero visual — interlocking gears turning together with pulsing
 * accent hubs. Reads as "systems & operations working in sync", fitting the
 * four services (incorporation, accounting/tax, accounting systems, advisory).
 * Colours come from theme tokens so it works in light and dark.
 */
const FG = "var(--color-foreground)";
const ACCENT = "var(--color-accent)";

function GearShape({
  cx,
  cy,
  r,
  teeth,
  color,
  fillOpacity,
  toothW = 11,
  toothH = 16,
}: {
  cx: number;
  cy: number;
  r: number;
  teeth: number;
  color: string;
  fillOpacity: number;
  toothW?: number;
  toothH?: number;
}) {
  const step = 360 / teeth;
  const lineOpacity = fillOpacity + 0.18;
  return (
    <g>
      {Array.from({ length: teeth }).map((_, i) => (
        <rect
          key={i}
          x={cx - toothW / 2}
          y={cy - r - toothH / 2}
          width={toothW}
          height={toothH}
          rx={2.5}
          fill={color}
          fillOpacity={fillOpacity + 0.05}
          transform={`rotate(${i * step} ${cx} ${cy})`}
        />
      ))}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={color}
        fillOpacity={fillOpacity}
        stroke={color}
        strokeOpacity={lineOpacity}
        strokeWidth={2}
      />
      <circle
        cx={cx}
        cy={cy}
        r={r * 0.4}
        fill="none"
        stroke={color}
        strokeOpacity={lineOpacity}
        strokeWidth={2}
      />
    </g>
  );
}

export function ServicesVisual() {
  const reduce = useReducedMotion();

  const spin = (duration: number, dir: 1 | -1, cx: number, cy: number) =>
    reduce
      ? { style: { transformOrigin: `${cx}px ${cy}px` } }
      : {
          animate: { rotate: 360 * dir },
          transition: {
            duration,
            repeat: Infinity,
            ease: "linear" as const,
          },
          style: { transformOrigin: `${cx}px ${cy}px` },
        };

  const hubs: [number, number][] = [
    [155, 205],
    [272, 132],
    [278, 272],
  ];

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
        <motion.g {...spin(26, 1, 155, 205)}>
          <GearShape cx={155} cy={205} r={84} teeth={12} color={FG} fillOpacity={0.07} />
        </motion.g>
        <motion.g {...spin(18, -1, 272, 132)}>
          <GearShape cx={272} cy={132} r={54} teeth={10} color={ACCENT} fillOpacity={0.16} />
        </motion.g>
        <motion.g {...spin(13, 1, 278, 272)}>
          <GearShape cx={278} cy={272} r={42} teeth={8} color={FG} fillOpacity={0.07} />
        </motion.g>

        {hubs.map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={6}
            fill={ACCENT}
            style={{ transformOrigin: `${x}px ${y}px` }}
            animate={reduce ? {} : { scale: [1, 1.4, 1], opacity: [0.9, 0.5, 0.9] }}
            transition={{
              duration: 2.4 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
