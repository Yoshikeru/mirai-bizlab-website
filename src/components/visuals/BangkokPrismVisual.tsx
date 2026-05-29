"use client";

import { motion, useReducedMotion } from "motion/react";

const BANGKOK = { x: 905, y: 595 };
const NUM_BEAMS = 36;

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

        {/* Detailed Thailand silhouette
            (north triangle, Isaan plateau east, central plain, southern peninsula) */}
        <motion.path
          d="
            M 870 195
            C 905 188 935 198 945 215
            C 970 230 990 248 1010 278
            C 1040 305 1070 322 1095 348
            C 1120 360 1155 366 1185 378
            C 1205 380 1220 396 1228 415
            C 1238 430 1248 448 1258 462
            C 1268 478 1272 498 1268 518
            C 1262 542 1248 562 1226 575
            C 1198 588 1170 590 1140 588
            C 1106 580 1070 580 1030 585
            C 1000 593 982 605 1000 625
            C 1014 638 1010 650 990 656
            C 968 658 948 652 938 638
            C 928 624 922 614 920 600
            C 920 585 932 580 940 568
            C 938 552 928 542 916 540
            C 905 540 905 540 905 540
            L 905 595
            C 920 615 942 632 955 650
            C 968 668 968 685 952 698
            C 935 705 916 700 900 690
            C 882 678 870 670 858 660
            C 844 660 844 678 850 692
            C 855 712 855 730 850 750
            C 842 772 832 790 820 808
            C 808 826 798 838 778 850
            C 760 860 748 855 740 848
            C 730 848 728 858 730 868
            C 736 880 750 890 768 902
            C 786 908 802 920 815 935
            C 830 950 870 952 902 948
            C 912 944 920 940 924 928
            C 924 916 918 906 905 900
            C 888 895 870 894 858 884
            C 840 870 825 858 810 840
            C 798 822 795 808 805 800
            C 815 794 825 790 832 778
            C 836 770 844 762 854 762
            C 860 758 866 744 862 730
            C 858 712 858 696 856 680
            C 858 668 870 660 882 658
            C 894 660 902 652 905 640
            C 905 625 905 612 905 595
            C 905 580 905 565 905 540
            L 905 540
            C 893 535 880 530 866 522
            C 850 512 838 502 825 488
            C 808 478 794 472 778 462
            C 762 452 750 438 740 422
            C 728 408 716 392 706 376
            C 700 358 696 342 696 322
            C 700 305 712 290 728 280
            C 745 268 762 258 778 248
            C 795 235 815 222 830 210
            C 845 200 858 196 870 195 Z
          "
          fill="url(#thailand-fill)"
          stroke="#3A3A3A"
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeLinecap="round"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformOrigin: `${BANGKOK.x}px ${BANGKOK.y}px` }}
        />

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
