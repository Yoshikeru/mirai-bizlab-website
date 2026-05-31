"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

/**
 * Rubik-style cube that runs an actual scramble → solve sequence.
 *
 * Model: 54 facelets (6 faces × 9 cells) with full Singmaster-notation
 * permutations (U, R, F, D, L, B and their inverses). At each "tick"
 * we apply one move and re-render, so the stickers really do cycle
 * around the cube the way they would on a real solve. A 15-move
 * scramble is followed by the same moves reversed-and-inverted, which
 * brings the cube back to the solved pattern every ~30 seconds.
 *
 * Palette is intentionally soft to sit alongside the homepage's
 * Thailand map: pale coral for "red" stickers, near-white for the
 * "white" stickers, light grey for the body.
 */

// ---- layout ----
const SIZE = 240;
const HALF = SIZE / 2;
const GAP = 4;
const CELLS_PER_ROW = 3;

// ---- soft palette (matched to the map look on / ) ----
const RED = "#E59AA1"; // very soft coral
const LIGHT = "#F6F6F6"; // near white
const BORDER = "#B8B8B8"; // light grey body

// ---- facelet model ----
// 0=R(ed), 1=W(hite). Each face is 9 cells. Index ranges:
//   U: 0-8   R: 9-17   F: 18-26   D: 27-35   L: 36-44   B: 45-53
type Color = 0 | 1;
type State = Color[];

// Solved pattern — alternating checker on every face (R/W only, matches
// the simple two-color look we want)
const FACE_SOLVED_RED_FIRST: Color[] = [0, 1, 0, 1, 0, 1, 0, 1, 0];
const FACE_SOLVED_WHITE_FIRST: Color[] = [1, 0, 1, 0, 1, 0, 1, 0, 1];

function makeSolved(): State {
  return [
    ...FACE_SOLVED_RED_FIRST, // U
    ...FACE_SOLVED_WHITE_FIRST, // R
    ...FACE_SOLVED_RED_FIRST, // F
    ...FACE_SOLVED_RED_FIRST, // D
    ...FACE_SOLVED_WHITE_FIRST, // L
    ...FACE_SOLVED_WHITE_FIRST, // B
  ];
}

// Rotate a single 3×3 face in place CW: new[i] = old[srcIndex(i)]
const FACE_CW_SRC = [6, 3, 0, 7, 4, 1, 8, 5, 2];
const FACE_CCW_SRC = [2, 5, 8, 1, 4, 7, 0, 3, 6];

function rotateFace(s: State, base: number, cw: boolean): State {
  const src = cw ? FACE_CW_SRC : FACE_CCW_SRC;
  const next = [...s];
  for (let i = 0; i < 9; i++) next[base + i] = s[base + src[i]];
  return next;
}

// Apply a 4-cycle on the side ring of a move.
// cycle: list of 4 triplets of indexes [a,b,c] that move together.
// For a "CW" move, a → b → c → d → a (where d is the 4th triplet)
function cycleRing(
  s: State,
  ring: number[][],
  cw: boolean,
): State {
  const next = [...s];
  const len = ring.length; // 4
  for (let pos = 0; pos < len; pos++) {
    const fromPos = cw ? (pos + len - 1) % len : (pos + 1) % len;
    for (let k = 0; k < ring[pos].length; k++) {
      next[ring[pos][k]] = s[ring[fromPos][k]];
    }
  }
  return next;
}

// Side rings (in CW order when looking at that face from outside)
const RING_U = [
  [18, 19, 20], // F top
  [9, 10, 11], // R top
  [45, 46, 47], // B top
  [36, 37, 38], // L top
];
const RING_D = [
  [24, 25, 26], // F bottom
  [42, 43, 44], // L bottom
  [51, 52, 53], // B bottom
  [15, 16, 17], // R bottom
];
const RING_R = [
  [2, 5, 8], // U right col
  [47, 50, 53], // B left col (reversed orientation)
  [35, 32, 29], // D right col (reversed)
  [20, 23, 26], // F right col
];
const RING_L = [
  [0, 3, 6], // U left col
  [18, 21, 24], // F left col
  [27, 30, 33], // D left col
  [53, 50, 47], // B right col (reversed)
];
const RING_F = [
  [6, 7, 8], // U bottom row
  [9, 12, 15], // R left col
  [29, 28, 27], // D top row (reversed)
  [44, 41, 38], // L right col (reversed)
];
const RING_B = [
  [2, 1, 0], // U top row (reversed)
  [36, 39, 42], // L left col
  [33, 34, 35], // D bottom row
  [11, 14, 17], // R right col (reversed)
];

function applyU(s: State, cw: boolean): State {
  return cycleRing(rotateFace(s, 0, cw), RING_U, cw);
}
function applyD(s: State, cw: boolean): State {
  return cycleRing(rotateFace(s, 27, cw), RING_D, cw);
}
function applyR(s: State, cw: boolean): State {
  return cycleRing(rotateFace(s, 9, cw), RING_R, cw);
}
function applyL(s: State, cw: boolean): State {
  return cycleRing(rotateFace(s, 36, cw), RING_L, cw);
}
function applyF(s: State, cw: boolean): State {
  return cycleRing(rotateFace(s, 18, cw), RING_F, cw);
}
function applyB(s: State, cw: boolean): State {
  return cycleRing(rotateFace(s, 45, cw), RING_B, cw);
}

type Move = "U" | "U'" | "D" | "D'" | "R" | "R'" | "L" | "L'" | "F" | "F'" | "B" | "B'";

function applyMove(state: State, move: Move): State {
  switch (move) {
    case "U": return applyU(state, true);
    case "U'": return applyU(state, false);
    case "D": return applyD(state, true);
    case "D'": return applyD(state, false);
    case "R": return applyR(state, true);
    case "R'": return applyR(state, false);
    case "L": return applyL(state, true);
    case "L'": return applyL(state, false);
    case "F": return applyF(state, true);
    case "F'": return applyF(state, false);
    case "B": return applyB(state, true);
    case "B'": return applyB(state, false);
  }
}

function invertMove(m: Move): Move {
  return (m.endsWith("'") ? m[0] : `${m}'`) as Move;
}

// Deterministic seeded RNG (SSR/CSR match)
function seededRand(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function generateSequence(seed: number, scrambleLen: number): Move[] {
  const ALL: Move[] = ["U", "D", "R", "L", "F", "B"];
  const rand = seededRand(seed);
  const scramble: Move[] = [];
  let last = "";
  for (let i = 0; i < scrambleLen; i++) {
    let move: Move;
    do {
      move = ALL[Math.floor(rand() * ALL.length)];
    } while (move === last);
    // Random direction
    if (rand() < 0.5) move = `${move}'` as Move;
    scramble.push(move);
    last = move[0];
  }
  // Solve = reversed scramble with each move inverted
  const solve = [...scramble].reverse().map(invertMove);
  return [...scramble, ...solve];
}

// ---- face layout in 3D ----
type FaceKey = "U" | "D" | "F" | "B" | "R" | "L";
const FACE_TRANSFORMS: Record<FaceKey, { transform: string; shade: number; base: number }> = {
  F: { transform: `translateZ(${HALF}px)`, shade: 1, base: 18 },
  B: { transform: `rotateY(180deg) translateZ(${HALF}px)`, shade: 0.82, base: 45 },
  R: { transform: `rotateY(90deg) translateZ(${HALF}px)`, shade: 0.94, base: 9 },
  L: { transform: `rotateY(-90deg) translateZ(${HALF}px)`, shade: 0.88, base: 36 },
  U: { transform: `rotateX(90deg) translateZ(${HALF}px)`, shade: 1.06, base: 0 },
  D: { transform: `rotateX(-90deg) translateZ(${HALF}px)`, shade: 0.76, base: 27 },
};
const FACE_ORDER: FaceKey[] = ["F", "B", "R", "L", "U", "D"];

function Face({
  cells,
  transform,
  shade,
}: {
  cells: Color[];
  transform: string;
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
      {cells.map((c, i) => (
        <motion.div
          key={i}
          animate={{ background: c === 0 ? RED : LIGHT }}
          transition={{ duration: 0.35, ease: [0.65, 0.05, 0.36, 1] }}
          style={{
            borderRadius: 7,
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.08)",
          }}
        />
      ))}
    </div>
  );
}

// One move per MOVE_MS; 30 moves total ≈ 30s round trip
const MOVE_MS = 1000;
const SCRAMBLE_LEN = 15; // 15 scramble + 15 solve = 30 moves

export function RubikCube3D({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const moves = useMemo(() => generateSequence(2024, SCRAMBLE_LEN), []);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % (moves.length + 2));
      // +2 = brief pause at solved state at the end of each cycle
    }, MOVE_MS);
    return () => clearInterval(interval);
  }, [reduce, moves.length]);

  const state = useMemo(() => {
    let s = makeSolved();
    const movesToApply = Math.min(step, moves.length);
    for (let i = 0; i < movesToApply; i++) {
      s = applyMove(s, moves[i]);
    }
    return s;
  }, [moves, step]);

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
            : { rotateY: { duration: 55, repeat: Infinity, ease: "linear" } }
        }
      >
        {FACE_ORDER.map((key) => {
          const meta = FACE_TRANSFORMS[key];
          const cells = state.slice(meta.base, meta.base + 9) as Color[];
          return (
            <Face
              key={key}
              cells={cells}
              transform={meta.transform}
              shade={meta.shade}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
