"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Rubik-style cube that *stays as a cube* (no flying cubies). Each face holds
 * a 3x3 grid of cells whose colors shuffle through several scrambled patterns
 * — like watching someone twist the cube — and then snap back to the solved
 * pattern every 30 seconds.
 *
 * Palette mirrors the Thailand-map visual on the homepage: soft greys for
 * "white" stickers, the brand red as the accent, and dark grey for the body.
 */

const SIZE = 240;
const HALF = SIZE / 2;
const GAP = 4;
const CELLS_PER_ROW = 3;

// Palette (matched to the Thailand-map look on /)
const RED = "#D7000F";
const LIGHT = "#EDEDED";
const BORDER = "#2A2A2A";

// Six faces of the cube
type FaceKey = "front" | "back" | "right" | "left" | "top" | "bottom";

const FACES: { key: FaceKey; transform: string; shade: number }[] = [
  { key: "front", transform: `translateZ(${HALF}px)`, shade: 1 },
  { key: "back", transform: `rotateY(180deg) translateZ(${HALF}px)`, shade: 0.78 },
  { key: "right", transform: `rotateY(90deg) translateZ(${HALF}px)`, shade: 0.92 },
  { key: "left", transform: `rotateY(-90deg) translateZ(${HALF}px)`, shade: 0.86 },
  { key: "top", transform: `rotateX(90deg) translateZ(${HALF}px)`, shade: 1.06 },
  { key: "bottom", transform: `rotateX(-90deg) translateZ(${HALF}px)`, shade: 0.72 },
];

// Solved pattern — alternating red / light per face
const SOLVED_RED_FIRST: boolean[] = [
  true, false, true,
  false, true, false,
  true, false, true,
];
const SOLVED_LIGHT_FIRST: boolean[] = [
  false, true, false,
  true, false, true,
  false, true, false,
];

const SOLVED: Record<FaceKey, boolean[]> = {
  front: SOLVED_RED_FIRST,
  back: SOLVED_LIGHT_FIRST,
  right: SOLVED_LIGHT_FIRST,
  left: SOLVED_LIGHT_FIRST,
  top: SOLVED_RED_FIRST,
  bottom: SOLVED_RED_FIRST,
};

// Linear-congruential PRNG (seeded → identical SSR/CSR output, no hydration mismatch)
function seededRand(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/**
 * Produce a "twisted" pattern: swap rows / columns / blocks within each face
 * to mimic the visual effect of layer rotations without actually simulating
 * the cube. Output is deterministic for a given seed.
 */
function makeScrambledPattern(seed: number): Record<FaceKey, boolean[]> {
  const rand = seededRand(seed);
  const out = {} as Record<FaceKey, boolean[]>;
  for (const { key } of FACES) {
    const base = [...SOLVED[key]];
    // Apply 3–5 random swaps of pairs of cells
    const swaps = 3 + Math.floor(rand() * 3);
    for (let i = 0; i < swaps; i++) {
      const a = Math.floor(rand() * 9);
      const b = Math.floor(rand() * 9);
      [base[a], base[b]] = [base[b], base[a]];
    }
    // Occasionally rotate the face 90° (rotate the array)
    if (rand() > 0.5) {
      const rotated = new Array(9).fill(false);
      for (let r = 0; r < CELLS_PER_ROW; r++) {
        for (let c = 0; c < CELLS_PER_ROW; c++) {
          rotated[c * CELLS_PER_ROW + (CELLS_PER_ROW - 1 - r)] =
            base[r * CELLS_PER_ROW + c];
        }
      }
      out[key] = rotated;
    } else {
      out[key] = base;
    }
  }
  return out;
}

// Pre-generated scrambled patterns (deterministic across SSR/CSR)
const SCRAMBLES: Record<FaceKey, boolean[]>[] = [
  makeScrambledPattern(11),
  makeScrambledPattern(23),
  makeScrambledPattern(47),
  makeScrambledPattern(89),
  makeScrambledPattern(157),
];

// Sequence over 30s: scramble several times, then snap to solved.
// Each entry: ms within the cycle where this pattern becomes active.
const TIMELINE: { at: number; pattern: Record<FaceKey, boolean[]> }[] = [
  { at: 0, pattern: SOLVED },
  { at: 1800, pattern: SCRAMBLES[0] },
  { at: 5400, pattern: SCRAMBLES[1] },
  { at: 9000, pattern: SCRAMBLES[2] },
  { at: 13500, pattern: SCRAMBLES[3] },
  { at: 18000, pattern: SCRAMBLES[4] },
  { at: 22500, pattern: SCRAMBLES[2] },
  { at: 25500, pattern: SCRAMBLES[0] },
  { at: 28000, pattern: SOLVED }, // snap back to solved
];
const CYCLE_MS = 30000;

function Face({
  transform,
  pattern,
  shade,
}: {
  transform: string;
  pattern: boolean[];
  shade: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: SIZE,
        height: SIZE,
        marginLeft: -HALF,
        marginTop: -HALF,
        transform,
        backfaceVisibility: "hidden",
        background: BORDER,
        borderRadius: 14,
        padding: GAP,
        display: "grid",
        gridTemplateColumns: `repeat(${CELLS_PER_ROW}, 1fr)`,
        gridTemplateRows: `repeat(${CELLS_PER_ROW}, 1fr)`,
        gap: GAP,
        boxSizing: "border-box",
        filter: `brightness(${shade})`,
      }}
    >
      {pattern.map((isRed, i) => (
        <motion.div
          key={i}
          animate={{ background: isRed ? RED : LIGHT }}
          transition={{ duration: 0.55, ease: [0.65, 0.05, 0.36, 1] }}
          style={{
            borderRadius: 7,
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.12)",
          }}
        />
      ))}
    </div>
  );
}

export function RubikCube3D({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const interval = setInterval(() => setTick((t) => t + 1), 100);
    return () => clearInterval(interval);
  }, [reduce]);

  // Pick the current pattern based on elapsed ms within the 30s cycle.
  const elapsedMs = (tick * 100) % CYCLE_MS;
  let currentPattern = TIMELINE[0].pattern;
  for (const entry of TIMELINE) {
    if (elapsedMs >= entry.at) currentPattern = entry.pattern;
  }
  if (reduce) currentPattern = SOLVED;

  return (
    <div
      className={className}
      style={{
        width: SIZE,
        height: SIZE,
        perspective: 1400,
        perspectiveOrigin: "50% 50%",
      }}
      aria-hidden
    >
      <motion.div
        style={{
          position: "relative",
          width: SIZE,
          height: SIZE,
          transformStyle: "preserve-3d",
        }}
        initial={{ rotateX: -25, rotateY: -32 }}
        animate={
          reduce
            ? { rotateX: -25, rotateY: -32 }
            : { rotateX: -25, rotateY: [-32, 328] }
        }
        transition={
          reduce
            ? undefined
            : {
                rotateY: { duration: 45, repeat: Infinity, ease: "linear" },
              }
        }
      >
        {FACES.map(({ key, transform, shade }) => (
          <Face
            key={key}
            transform={transform}
            shade={shade}
            pattern={currentPattern[key]}
          />
        ))}
      </motion.div>
    </div>
  );
}
