"use client";

import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";

const VIEW = 320; // canvas size
const CUBIE = 56; // per-cubie size
const GAP = 4; // gap between cubies

const RED = "#D7000F";
const WHITE = "#FFFFFF";
const BORDER = "#1A1A1A";

type Face = "front" | "back" | "right" | "left" | "top" | "bottom";

type Scramble = {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
};

type Cubie = {
  id: string;
  px: number;
  py: number;
  pz: number;
  faces: Record<Face, string>;
  s1: Scramble;
  s2: Scramble;
  s3: Scramble;
};

// Linear-congruential PRNG with fixed seed → deterministic output across
// SSR / CSR (avoids hydration mismatch).
function seededRand(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function faceColor(x: number, y: number, z: number, face: Face): string {
  // Outer face colors — alternating red/white per checker position
  switch (face) {
    case "front":
      return z === 1 ? ((x + y + 9) % 2 === 0 ? RED : WHITE) : BORDER;
    case "back":
      return z === -1 ? ((x + y + 9) % 2 === 0 ? WHITE : RED) : BORDER;
    case "right":
      return x === 1 ? ((y + z + 9) % 2 === 0 ? RED : WHITE) : BORDER;
    case "left":
      return x === -1 ? ((y + z + 9) % 2 === 0 ? WHITE : RED) : BORDER;
    case "top":
      return y === -1 ? ((x + z + 9) % 2 === 0 ? RED : WHITE) : BORDER;
    case "bottom":
      return y === 1 ? ((x + z + 9) % 2 === 0 ? WHITE : RED) : BORDER;
  }
}

function makeScramble(rand: () => number): Scramble {
  // Round to 2 decimals so SSR/CSR strings match in framer-motion output
  const r = (max: number) => Math.round((rand() - 0.5) * max * 100) / 100;
  return {
    x: r(180),
    y: r(180),
    z: r(180),
    rx: r(720),
    ry: r(720),
    rz: r(720),
  };
}

function buildCubies(): Cubie[] {
  const rand = seededRand(1337);
  const cubies: Cubie[] = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        // Skip core (invisible inside) for perf and visual cleanness
        if (x === 0 && y === 0 && z === 0) continue;
        cubies.push({
          id: `${x}-${y}-${z}`,
          px: x * (CUBIE + GAP),
          py: y * (CUBIE + GAP),
          pz: z * (CUBIE + GAP),
          faces: {
            front: faceColor(x, y, z, "front"),
            back: faceColor(x, y, z, "back"),
            right: faceColor(x, y, z, "right"),
            left: faceColor(x, y, z, "left"),
            top: faceColor(x, y, z, "top"),
            bottom: faceColor(x, y, z, "bottom"),
          },
          s1: makeScramble(rand),
          s2: makeScramble(rand),
          s3: makeScramble(rand),
        });
      }
    }
  }
  return cubies;
}

function CubieFace({ color, transform }: { color: string; transform: string }) {
  const isInner = color === BORDER;
  return (
    <div
      style={{
        position: "absolute",
        width: CUBIE,
        height: CUBIE,
        background: color,
        border: `1px solid ${BORDER}`,
        borderRadius: 6,
        transform,
        backfaceVisibility: "hidden",
        boxShadow: isInner
          ? "none"
          : "inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -2px 0 rgba(0,0,0,0.18)",
      }}
    />
  );
}

function CubieElement({ cubie, reduce }: { cubie: Cubie; reduce: boolean }) {
  const { px, py, pz, s1, s2, s3, faces } = cubie;

  // Animation keyframes:
  //   0%   solved
  //   18%  scramble #1 (cubies fly apart)
  //   38%  scramble #2 (different chaos)
  //   62%  scramble #3 (one more pass)
  //   88%  back to solved (snap into place — the "aha" moment)
  //  100%  hold solved for a beat
  const times = [0, 0.18, 0.38, 0.62, 0.88, 1];

  return (
    <motion.div
      style={{
        position: "absolute",
        width: CUBIE,
        height: CUBIE,
        top: "50%",
        left: "50%",
        marginLeft: -CUBIE / 2,
        marginTop: -CUBIE / 2,
        transformStyle: "preserve-3d",
      }}
      initial={{ x: px, y: py, z: pz, rotateX: 0, rotateY: 0, rotateZ: 0 }}
      animate={
        reduce
          ? { x: px, y: py, z: pz }
          : {
              x: [px, px + s1.x, px + s2.x, px + s3.x, px, px],
              y: [py, py + s1.y, py + s2.y, py + s3.y, py, py],
              z: [pz, pz + s1.z, pz + s2.z, pz + s3.z, pz, pz],
              rotateX: [0, s1.rx, s2.rx, s3.rx, 0, 0],
              rotateY: [0, s1.ry, s2.ry, s3.ry, 0, 0],
              rotateZ: [0, s1.rz, s2.rz, s3.rz, 0, 0],
            }
      }
      transition={
        reduce
          ? undefined
          : {
              duration: 30,
              repeat: Infinity,
              ease: [0.65, 0.05, 0.36, 1], // smooth scramble, snappy solve
              times,
            }
      }
    >
      <CubieFace color={faces.front} transform={`translateZ(${CUBIE / 2}px)`} />
      <CubieFace
        color={faces.back}
        transform={`rotateY(180deg) translateZ(${CUBIE / 2}px)`}
      />
      <CubieFace
        color={faces.right}
        transform={`rotateY(90deg) translateZ(${CUBIE / 2}px)`}
      />
      <CubieFace
        color={faces.left}
        transform={`rotateY(-90deg) translateZ(${CUBIE / 2}px)`}
      />
      <CubieFace
        color={faces.top}
        transform={`rotateX(90deg) translateZ(${CUBIE / 2}px)`}
      />
      <CubieFace
        color={faces.bottom}
        transform={`rotateX(-90deg) translateZ(${CUBIE / 2}px)`}
      />
    </motion.div>
  );
}

export function RubikCube3D({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const cubies = useMemo(() => buildCubies(), []);

  return (
    <div
      className={className}
      style={{
        width: VIEW,
        height: VIEW,
        perspective: 1200,
        perspectiveOrigin: "50% 50%",
      }}
      aria-hidden
    >
      <motion.div
        style={{
          position: "relative",
          width: VIEW,
          height: VIEW,
          transformStyle: "preserve-3d",
        }}
        initial={{ rotateX: -25, rotateY: -28 }}
        animate={
          reduce
            ? undefined
            : { rotateX: -25, rotateY: [-28, 332] }
        }
        transition={
          reduce
            ? undefined
            : {
                rotateY: { duration: 60, repeat: Infinity, ease: "linear" },
              }
        }
      >
        {cubies.map((cubie) => (
          <CubieElement
            key={cubie.id}
            cubie={cubie}
            reduce={reduce ?? false}
          />
        ))}
      </motion.div>
    </div>
  );
}
