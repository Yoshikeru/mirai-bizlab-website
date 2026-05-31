"use client";

import { motion, useReducedMotion } from "motion/react";

const SIZE = 240; // overall cube size in px
const HALF = SIZE / 2;
const GAP = 4; // gap between sub-cubes
const CELL = (SIZE - GAP * 2) / 3; // sub-cube size

const RED = "#D7000F";
const WHITE = "#FFFFFF";
const BORDER = "#1A1A1A";

// 3x3 face pattern — true = red, false = white (alternating checker)
const FACE_RED_FIRST: boolean[] = [
  true, false, true,
  false, true, false,
  true, false, true,
];
const FACE_WHITE_FIRST: boolean[] = [
  false, true, false,
  true, false, true,
  false, true, false,
];

function Face({
  transform,
  pattern,
  shade = 1,
}: {
  transform: string;
  pattern: boolean[];
  shade?: number;
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
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        background: BORDER,
        borderRadius: 12,
        padding: GAP,
        display: "grid",
        gridTemplateColumns: `repeat(3, 1fr)`,
        gridTemplateRows: `repeat(3, 1fr)`,
        gap: GAP,
        boxSizing: "border-box",
        filter: `brightness(${shade})`,
      }}
    >
      {pattern.map((isRed, i) => (
        <div
          key={i}
          style={{
            background: isRed ? RED : WHITE,
            borderRadius: 8,
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -2px 0 rgba(0,0,0,0.12)",
          }}
        />
      ))}
    </div>
  );
}

export function RubikCube3D({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      className={className}
      style={{
        width: SIZE,
        height: SIZE,
        perspective: 1200,
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
        initial={{ rotateX: -25, rotateY: -38 }}
        animate={
          reduce
            ? { rotateX: -25, rotateY: -38 }
            : { rotateX: [-25, -22, -28, -25], rotateY: [-38, 322, 322, -38] }
        }
        transition={
          reduce
            ? undefined
            : {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.5, 0.5, 1],
              }
        }
      >
        {/* Front */}
        <Face
          transform={`translateZ(${HALF}px)`}
          pattern={FACE_RED_FIRST}
          shade={1}
        />
        {/* Back */}
        <Face
          transform={`rotateY(180deg) translateZ(${HALF}px)`}
          pattern={FACE_WHITE_FIRST}
          shade={0.72}
        />
        {/* Right */}
        <Face
          transform={`rotateY(90deg) translateZ(${HALF}px)`}
          pattern={FACE_WHITE_FIRST}
          shade={0.88}
        />
        {/* Left */}
        <Face
          transform={`rotateY(-90deg) translateZ(${HALF}px)`}
          pattern={FACE_WHITE_FIRST}
          shade={0.82}
        />
        {/* Top */}
        <Face
          transform={`rotateX(90deg) translateZ(${HALF}px)`}
          pattern={FACE_RED_FIRST}
          shade={1.05}
        />
        {/* Bottom */}
        <Face
          transform={`rotateX(-90deg) translateZ(${HALF}px)`}
          pattern={FACE_RED_FIRST}
          shade={0.7}
        />
      </motion.div>
    </div>
  );
}

void CELL;
