"use client";

import { motion, useReducedMotion } from "motion/react";

import { THAILAND_PATH } from "./thailand-outline";

const BANGKOK = { x: 905, y: 595 };
const NUM_BEAMS = 36;

// mapsicon native coordinate (post-transform) of Bangkok area, eyeballed and
// confirmed visually. Used to map the 1024-unit map into our 1600x1000 viewBox
// so that BANGKOK on the map aligns with our BANGKOK constant.
const MAP_BANGKOK = { x: 480, y: 580 };
const MAP_SCALE = 0.72;
const MAP_OFFSET_X = BANGKOK.x - MAP_BANGKOK.x * MAP_SCALE;
const MAP_OFFSET_Y = BANGKOK.y - MAP_BANGKOK.y * MAP_SCALE;

// Prism palette: warm red base, fanned across orange / amber / pink / cool light
const PRISM_HUES = [355, 0, 6, 14, 22, 32, 44, 58, 188, 210, 248, 286, 320, 340];

function getHue(index: number) {
  return PRISM_HUES[index % PRISM_HUES.length];
}

// Major cities (rough geo-projection, viewBox-space)
const CITIES: Array<{ name: string; x: number; y: number; size?: number }> = [
  { name: "CHIANG MAI", x: 815, y: 295, size: 3 },
  { name: "CHIANG RAI", x: 880, y: 235, size: 3 },
  { name: "PHITSANULOK", x: 880, y: 390, size: 2.5 },
  { name: "UDON THANI", x: 1075, y: 350, size: 3 },
  { name: "KHON KAEN", x: 1075, y: 410, size: 2.5 },
  { name: "UBON", x: 1240, y: 475, size: 2.5 },
  { name: "PATTAYA", x: 945, y: 645, size: 2.5 },
  { name: "HUA HIN", x: 855, y: 685, size: 2.2 },
  { name: "SURAT THANI", x: 825, y: 785, size: 2.2 },
  { name: "PHUKET", x: 745, y: 850, size: 2.5 },
  { name: "HAT YAI", x: 905, y: 895, size: 2.5 },
];

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
          {/* Thailand land fill (subtle gradient) */}
          <linearGradient id="thailand-fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F0F0F0" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#E5E5E5" stopOpacity="0.55" />
          </linearGradient>

          {/* Bangkok highlight glow */}
          <radialGradient id="bangkok-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D7000F" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#D7000F" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#D7000F" stopOpacity="0" />
          </radialGradient>

          {/* Bangkok zoom area subtle disc */}
          <radialGradient id="bkk-zoom" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          {/* page vignette */}
          <radialGradient id="bg-vignette" cx="55%" cy="55%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0.05" />
          </radialGradient>

          {/* Per-beam gradients */}
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
                  stopColor={`hsla(${hue}, 92%, 56%, 0.78)`}
                />
                <stop
                  offset="35%"
                  stopColor={`hsla(${hue}, 92%, 62%, 0.45)`}
                />
                <stop
                  offset="100%"
                  stopColor={`hsla(${hue}, 92%, 72%, 0)`}
                />
              </linearGradient>
            );
          })}
        </defs>

        <rect width="100%" height="100%" fill="url(#bg-vignette)" />

        {/* Faint lat/long grid (map feel) */}
        <g opacity="0.32">
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

        {/* Faint elephant silhouette underlay (Thai cultural cue, very subtle) */}
        <motion.g
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.6,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.4,
          }}
          style={{
            transformOrigin: `${BANGKOK.x}px ${BANGKOK.y}px`,
            opacity: 0.07,
          }}
        >
          {/* Elephant body (large, behind the country) */}
          <path
            d="
              M 760 240
              C 740 260 720 290 720 330
              C 718 372 730 410 758 442
              C 730 460 716 488 716 520
              C 716 552 736 580 768 590
              C 808 600 858 608 905 612
              C 940 614 985 612 1020 610
              C 1058 608 1095 600 1118 588
              C 1138 580 1148 564 1148 548
              C 1148 528 1138 510 1115 498
              C 1138 488 1158 472 1170 450
              C 1185 422 1184 392 1170 366
              C 1156 340 1132 322 1102 312
              C 1080 304 1055 300 1030 300
              C 1014 280 994 264 970 254
              C 940 244 905 240 870 240
              C 830 240 790 240 760 240 Z
            "
            fill="#3A3A3A"
          />
          {/* Elephant trunk swinging down (long curve south = peninsula) */}
          <path
            d="
              M 905 605
              C 902 660 898 720 892 780
              C 888 830 882 870 880 905
              C 878 920 884 932 894 938
              C 906 942 916 935 920 920
              C 924 890 928 850 932 800
              C 936 750 938 700 935 660
              C 932 630 922 612 905 605 Z
            "
            fill="#3A3A3A"
          />
          {/* Elephant left ear (round flap on the west) */}
          <path
            d="
              M 760 290
              C 720 280 686 296 670 332
              C 656 366 668 402 700 422
              C 728 436 760 432 778 410
              C 798 386 794 348 778 320
              C 770 305 766 296 760 290 Z
            "
            fill="#3A3A3A"
          />
          {/* Elephant right ear (round flap on the east, Isaan area) */}
          <path
            d="
              M 1050 280
              C 1100 270 1145 286 1170 320
              C 1192 350 1192 388 1170 414
              C 1148 438 1108 442 1075 430
              C 1042 416 1024 388 1020 358
              C 1018 326 1030 298 1050 280 Z
            "
            fill="#3A3A3A"
          />
          {/* Tiny eye at Bangkok */}
          <circle cx={BANGKOK.x - 8} cy={BANGKOK.y - 24} r={4} fill="#1A1A1A" />
        </motion.g>

        {/* Thailand silhouette — real geographic outline (mapsicon, MIT) */}
        <motion.g
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformOrigin: `${BANGKOK.x}px ${BANGKOK.y}px` }}
        >
          <g
            transform={`translate(${MAP_OFFSET_X} ${MAP_OFFSET_Y}) scale(${MAP_SCALE})`}
          >
            <g transform="translate(0 1024) scale(0.1 -0.1)">
              <path
                d={THAILAND_PATH}
                fill="url(#thailand-fill)"
                stroke="#2A2A2A"
                strokeWidth={14}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </g>
          </g>
        </motion.g>

        {/* Major cities — visible dots */}
        <g>
          {CITIES.map((city) => (
            <circle
              key={city.name}
              cx={city.x}
              cy={city.y}
              r={(city.size ?? 2.5) + 0.5}
              fill="#3A3A3A"
              opacity="0.85"
            />
          ))}
        </g>

        {/* Bangkok zoom disc — soft highlight */}
        <motion.circle
          cx={BANGKOK.x}
          cy={BANGKOK.y}
          r={260}
          fill="url(#bkk-zoom)"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2,
          }}
          style={{ transformOrigin: `${BANGKOK.x}px ${BANGKOK.y}px` }}
        />

        {/* Dashed focus ring (rotating slowly) */}
        <motion.circle
          cx={BANGKOK.x}
          cy={BANGKOK.y}
          r={195}
          fill="none"
          stroke="#D7000F"
          strokeWidth="1"
          strokeDasharray="4 7"
          opacity="0.45"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={
            reduce
              ? { opacity: 0.45, scale: 1 }
              : { opacity: 0.45, scale: 1, rotate: 360 }
          }
          transition={
            reduce
              ? { duration: 1, ease: [0.22, 1, 0.36, 1] }
              : {
                  scale: { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 },
                  opacity: { duration: 0.9, delay: 0.4 },
                  rotate: { duration: 70, repeat: Infinity, ease: "linear" },
                }
          }
          style={{ transformOrigin: `${BANGKOK.x}px ${BANGKOK.y}px` }}
        />

        {/* Inner soft red glow */}
        <motion.circle
          cx={BANGKOK.x}
          cy={BANGKOK.y}
          r={300}
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

        {/* Radiating prism beams — varied length / width / hue */}
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
            // Strongly varied lengths and widths for "big/small" prism effect
            const sizeBucket = i % 4;
            const lengthBase =
              sizeBucket === 0
                ? 1180
                : sizeBucket === 1
                  ? 720
                  : sizeBucket === 2
                    ? 950
                    : 540;
            const variantLength = lengthBase + ((i * 53) % 180);
            const x2 = (BANGKOK.x + Math.cos(angle) * variantLength).toFixed(2);
            const y2 = (BANGKOK.y + Math.sin(angle) * variantLength).toFixed(2);
            const strokeWidth =
              sizeBucket === 0
                ? 2.4
                : sizeBucket === 1
                  ? 0.5
                  : sizeBucket === 2
                    ? 1.3
                    : 0.8;
            const beatDelay = (i % 7) * 0.16;

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
                        opacity: [0, 0.7, 0.35, 0.6, 0.32],
                      }
                }
                transition={
                  reduce
                    ? {
                        duration: 1.4,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.6 + i * 0.03,
                      }
                    : {
                        pathLength: {
                          duration: 1.5 + (i % 5) * 0.14,
                          delay: 0.6 + i * 0.03,
                          ease: [0.22, 1, 0.36, 1],
                        },
                        opacity: {
                          duration: 7 + (i % 6) * 0.55,
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
              strokeWidth="1.8"
              initial={{ r: 10, opacity: 0.55 }}
              animate={{ r: [10, 170], opacity: [0.55, 0] }}
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
              strokeWidth="1.4"
              initial={{ r: 10, opacity: 0.5 }}
              animate={{ r: [10, 120], opacity: [0.5, 0] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.6,
              }}
            />
            <motion.circle
              cx={BANGKOK.x}
              cy={BANGKOK.y}
              fill="none"
              stroke="#D7000F"
              strokeWidth="1"
              initial={{ r: 10, opacity: 0.45 }}
              animate={{ r: [10, 80], opacity: [0.45, 0] }}
              transition={{
                duration: 2.0,
                repeat: Infinity,
                ease: "easeOut",
                delay: 1.2,
              }}
            />
          </>
        ) : null}

        {/* Bangkok red hot disc (zone) */}
        <motion.circle
          cx={BANGKOK.x}
          cy={BANGKOK.y}
          r={18}
          fill="#D7000F"
          fillOpacity="0.18"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.5,
          }}
          style={{ transformOrigin: `${BANGKOK.x}px ${BANGKOK.y}px` }}
        />

        {/* Bangkok solid core (pulsing) */}
        <motion.circle
          cx={BANGKOK.x}
          cy={BANGKOK.y}
          r={11}
          fill="#D7000F"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            reduce
              ? { scale: 1, opacity: 1 }
              : { scale: [1, 1.22, 1], opacity: 1 }
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

        {/* Bangkok center bright dot */}
        <motion.circle
          cx={BANGKOK.x}
          cy={BANGKOK.y}
          r={4.5}
          fill="#FFFFFF"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.7,
          }}
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
            x1={BANGKOK.x + 14}
            y1={BANGKOK.y - 14}
            x2={BANGKOK.x + 64}
            y2={BANGKOK.y - 64}
            stroke="#D7000F"
            strokeWidth="1"
          />
          <circle
            cx={BANGKOK.x + 64}
            cy={BANGKOK.y - 64}
            r={3.2}
            fill="#D7000F"
          />
          <text
            x={BANGKOK.x + 75}
            y={BANGKOK.y - 60}
            fill="#1A1A1A"
            fontSize="14"
            fontWeight={700}
            letterSpacing="0.2em"
            style={{ fontFamily: "var(--font-inter-tight), Inter, sans-serif" }}
          >
            BANGKOK
          </text>
          <text
            x={BANGKOK.x + 75}
            y={BANGKOK.y - 42}
            fill="#6B6B6B"
            fontSize="10"
            letterSpacing="0.22em"
            style={{ fontFamily: "var(--font-inter-tight), Inter, sans-serif" }}
          >
            13.7563° N · 100.5018° E
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
