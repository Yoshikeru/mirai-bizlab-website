"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Blog hero visual — an article being written: a document card whose text
 * lines type themselves in, a bobbing pencil, and a soft accent thumbnail.
 * Reads as "writing & sharing knowledge", fitting the blog page.
 */
const FG = "var(--color-foreground)";
const ACCENT = "var(--color-accent)";

// text lines inside the document (x, y, width)
const LINES = [
  { y: 196, w: 168 },
  { y: 220, w: 168 },
  { y: 244, w: 140 },
  { y: 268, w: 168 },
  { y: 292, w: 104 },
];
const LINE_X = 124;

export function BlogVisual() {
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
        {/* document card */}
        <motion.rect
          x={96}
          y={74}
          width={208}
          height={252}
          rx={18}
          fill={FG}
          fillOpacity={0.04}
          stroke={FG}
          strokeOpacity={0.14}
          strokeWidth={1.5}
          style={{ transformOrigin: "200px 200px" }}
          animate={reduce ? {} : { y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* accent thumbnail block */}
        <motion.rect
          x={124}
          y={102}
          width={152}
          height={50}
          rx={8}
          fill={ACCENT}
          animate={reduce ? {} : { fillOpacity: [0.16, 0.3, 0.16] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* heading line */}
        <rect x={LINE_X} y={170} width={116} height={11} rx={5.5} fill={ACCENT} fillOpacity={0.55} />

        {/* typing text lines */}
        {LINES.map((line, i) => (
          <motion.rect
            key={i}
            x={LINE_X}
            y={line.y}
            width={line.w}
            height={8}
            rx={4}
            fill={FG}
            fillOpacity={0.16}
            style={{ transformOrigin: `${LINE_X}px ${line.y + 4}px` }}
            initial={reduce ? false : { scaleX: 0 }}
            animate={reduce ? {} : { scaleX: [0, 1, 1, 0] }}
            transition={{
              duration: 5,
              times: [0, 0.18, 0.86, 1],
              delay: i * 0.22,
              repeat: Infinity,
              repeatDelay: 0.6,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* bobbing pencil (top-right) */}
        <motion.g
          style={{ transformOrigin: "292px 108px" }}
          animate={reduce ? {} : { y: [0, -8, 0], rotate: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <g transform="translate(292 108) rotate(45)">
            {/* body */}
            <rect x={-8} y={-44} width={16} height={62} rx={4} fill={ACCENT} />
            {/* band */}
            <rect x={-8} y={6} width={16} height={6} fill={FG} fillOpacity={0.25} />
            {/* tip */}
            <path d="M -8 18 L 8 18 L 0 36 Z" fill={FG} fillOpacity={0.8} />
            <path d="M -3 30 L 3 30 L 0 36 Z" fill={FG} />
            {/* eraser */}
            <rect x={-8} y={-50} width={16} height={8} rx={3} fill={FG} fillOpacity={0.3} />
          </g>
        </motion.g>
      </svg>
    </div>
  );
}
