"use client";

import { motion, useReducedMotion } from "motion/react";

const BANGKOK = { x: 905, y: 540 };
const NUM_BEAMS = 28;

// Prism palette around accent red, fanning into orange / amber / pink / cool light
const PRISM_HUES = [355, 0, 8, 18, 32, 48, 60, 180, 200, 260, 300, 330];

function getHue(index: number) {
  return PRISM_HUES[index % PRISM_HUES.length];
}

export function BangkokPrismVisual() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <svg
        viewBox="0 0 1600 1000"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="thailand-fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EAEAEA" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#EAEAEA" stopOpacity="0.25" />
          </linearGradient>
          <radialGradient id="bangkok-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D7000F" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#D7000F" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#D7000F" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bg-vignette" cx="55%" cy="55%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0.05" />
          </radialGradient>
          {Array.from({ length: NUM_BEAMS }).map((_, i) => {
            const hue = getHue(i);
            return (
              <linearGradient
                key={`beam-grad-${i}`}
                id={`beam-${i}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stopColor={`hsla(${hue}, 92%, 56%, 0.7)`}
                />
                <stop
                  offset="40%"
                  stopColor={`hsla(${hue}, 92%, 60%, 0.35)`}
                />
                <stop
                  offset="100%"
                  stopColor={`hsla(${hue}, 92%, 70%, 0)`}
                />
              </linearGradient>
            );
          })}
        </defs>

        {/* subtle background vignette */}
        <rect width="100%" height="100%" fill="url(#bg-vignette)" />

        {/* faint latitude / longitude grid for "map" feel */}
        <g opacity="0.35">
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 125}
              x2="1600"
              y2={i * 125}
              stroke="#DCDCDC"
              strokeWidth="0.5"
            />
          ))}
          {Array.from({ length: 13 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 133}
              y1="0"
              x2={i * 133}
              y2="1000"
              stroke="#DCDCDC"
              strokeWidth="0.5"
            />
          ))}
        </g>

        {/* Stylised Thailand silhouette (simplified outline, body + peninsula) */}
        <motion.path
          d="M 760 230
             C 800 200, 880 200, 925 240
             C 970 280, 1000 340, 990 400
             C 980 460, 940 500, 910 525
             L 905 540
             C 905 580, 905 620, 910 660
             C 915 700, 920 745, 915 790
             C 910 830, 900 870, 895 905
             C 890 925, 875 928, 870 905
             C 868 870, 870 825, 872 780
             C 875 730, 880 685, 880 640
             C 880 605, 880 570, 875 545
             L 875 540
             C 855 530, 825 520, 800 505
             C 760 485, 720 460, 695 425
             C 670 390, 660 345, 670 305
             C 678 275, 705 248, 740 235
             C 750 232, 755 230, 760 230 Z"
          fill="url(#thailand-fill)"
          stroke="#C8C8C8"
          strokeWidth="1.3"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformOrigin: `${BANGKOK.x}px ${BANGKOK.y}px` }}
        />

        {/* radial focus ring around Bangkok (zoom-in feel) */}
        <motion.circle
          cx={BANGKOK.x}
          cy={BANGKOK.y}
          r={210}
          fill="none"
          stroke="#D7000F"
          strokeWidth="1"
          strokeDasharray="4 6"
          opacity="0.4"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={
            reduce
              ? { opacity: 0.4, scale: 1 }
              : { opacity: 0.4, scale: 1, rotate: 360 }
          }
          transition={
            reduce
              ? { duration: 1, ease: [0.22, 1, 0.36, 1] }
              : {
                  scale: { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 },
                  opacity: { duration: 0.9, delay: 0.4 },
                  rotate: { duration: 60, repeat: Infinity, ease: "linear" },
                }
          }
          style={{ transformOrigin: `${BANGKOK.x}px ${BANGKOK.y}px` }}
        />

        {/* inner soft glow */}
        <motion.circle
          cx={BANGKOK.x}
          cy={BANGKOK.y}
          r={260}
          fill="url(#bangkok-glow)"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.6,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.3,
          }}
          style={{ transformOrigin: `${BANGKOK.x}px ${BANGKOK.y}px` }}
        />

        {/* radiating prism beams */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.6,
          }}
          style={{ transformOrigin: `${BANGKOK.x}px ${BANGKOK.y}px` }}
        >
          {Array.from({ length: NUM_BEAMS }).map((_, i) => {
            const angle = (i / NUM_BEAMS) * Math.PI * 2;
            const variantLength = 850 + ((i * 47) % 220);
            // round to 2 decimals to keep SSR / CSR string identical (avoid IEEE-754 ULP drift)
            const x2 = (BANGKOK.x + Math.cos(angle) * variantLength).toFixed(2);
            const y2 = (BANGKOK.y + Math.sin(angle) * variantLength).toFixed(2);
            const strokeWidth = i % 4 === 0 ? 1.8 : i % 2 === 0 ? 1.1 : 0.6;
            const beatDelay = (i % 6) * 0.18;

            return (
              <motion.path
                key={`beam-${i}`}
                d={`M ${BANGKOK.x} ${BANGKOK.y} L ${x2} ${y2}`}
                stroke={`url(#beam-${i})`}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  reduce
                    ? { pathLength: 1, opacity: 0.45 }
                    : {
                        pathLength: 1,
                        opacity: [0, 0.6, 0.35, 0.55, 0.32],
                      }
                }
                transition={
                  reduce
                    ? {
                        duration: 1.4,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.6 + i * 0.04,
                      }
                    : {
                        pathLength: {
                          duration: 1.6 + (i % 5) * 0.15,
                          delay: 0.6 + i * 0.04,
                          ease: [0.22, 1, 0.36, 1],
                        },
                        opacity: {
                          duration: 7 + (i % 5) * 0.6,
                          delay: 0.6 + beatDelay,
                          ease: "easeInOut",
                          repeat: Infinity,
                        },
                      }
                }
              />
            );
          })}
        </motion.g>

        {/* Bangkok dot — outer ripples */}
        {!reduce ? (
          <>
            <motion.circle
              cx={BANGKOK.x}
              cy={BANGKOK.y}
              fill="none"
              stroke="#D7000F"
              strokeWidth="1.5"
              initial={{ r: 8, opacity: 0.55 }}
              animate={{ r: [8, 140], opacity: [0.55, 0] }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <motion.circle
              cx={BANGKOK.x}
              cy={BANGKOK.y}
              fill="none"
              stroke="#D7000F"
              strokeWidth="1.2"
              initial={{ r: 8, opacity: 0.5 }}
              animate={{ r: [8, 100], opacity: [0.5, 0] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.8,
              }}
            />
          </>
        ) : null}

        {/* Bangkok dot — solid core */}
        <motion.circle
          cx={BANGKOK.x}
          cy={BANGKOK.y}
          r={9}
          fill="#D7000F"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            reduce
              ? { scale: 1, opacity: 1 }
              : { scale: [1, 1.18, 1], opacity: 1 }
          }
          transition={
            reduce
              ? { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }
              : {
                  scale: {
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  opacity: { duration: 0.6, delay: 0.4 },
                }
          }
          style={{ transformOrigin: `${BANGKOK.x}px ${BANGKOK.y}px` }}
        />

        {/* Bangkok label tag */}
        <motion.g
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
            delay: 1.4,
          }}
        >
          <line
            x1={BANGKOK.x + 12}
            y1={BANGKOK.y - 12}
            x2={BANGKOK.x + 56}
            y2={BANGKOK.y - 56}
            stroke="#D7000F"
            strokeWidth="1"
          />
          <circle
            cx={BANGKOK.x + 56}
            cy={BANGKOK.y - 56}
            r={3}
            fill="#D7000F"
          />
          <text
            x={BANGKOK.x + 66}
            y={BANGKOK.y - 52}
            fill="#1A1A1A"
            fontSize="14"
            fontWeight={700}
            letterSpacing="0.18em"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            BANGKOK
          </text>
          <text
            x={BANGKOK.x + 66}
            y={BANGKOK.y - 34}
            fill="#6B6B6B"
            fontSize="10"
            letterSpacing="0.22em"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            13.7563° N · 100.5018° E
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
