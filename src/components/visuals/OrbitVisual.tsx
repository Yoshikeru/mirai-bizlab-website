"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Animated "orbit" illustration — concentric rings with dots circling a pulsing
 * core, plus a drifting accent arc. Reads as partners/companions moving around a
 * shared center, fitting the About page ("a partner & companion who stays by
 * your side"). Colours come from theme tokens so it works in light and dark.
 */
const ORIGIN = { transformOrigin: "200px 200px" } as const;

export function OrbitVisual() {
  const reduce = useReducedMotion();

  const spin = (duration: number, dir: 1 | -1 = 1) =>
    reduce
      ? {}
      : {
          animate: { rotate: 360 * dir },
          transition: { duration, repeat: Infinity, ease: "linear" as const },
        };

  return (
    <div className="relative aspect-square w-full max-w-[420px]">
      {/* soft accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[18%] -z-10 rounded-full bg-[color:var(--color-accent)]/10 blur-[60px]"
      />

      <svg
        viewBox="0 0 400 400"
        className="h-full w-full overflow-visible"
        aria-hidden
      >
        {/* static concentric rings */}
        {[70, 120, 170].map((r) => (
          <circle
            key={r}
            cx={200}
            cy={200}
            r={r}
            fill="none"
            stroke="var(--color-foreground)"
            strokeOpacity={0.12}
            strokeWidth={1.5}
          />
        ))}

        {/* drifting accent arc (big outline) */}
        <motion.g style={ORIGIN} {...spin(38, 1)}>
          <circle
            cx={200}
            cy={200}
            r={186}
            fill="none"
            stroke="var(--color-accent)"
            strokeOpacity={0.55}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeDasharray="230 940"
          />
        </motion.g>

        {/* dashed mid ring, counter-rotating */}
        <motion.g style={ORIGIN} {...spin(28, -1)}>
          <circle
            cx={200}
            cy={200}
            r={120}
            fill="none"
            stroke="var(--color-foreground)"
            strokeOpacity={0.2}
            strokeWidth={1.5}
            strokeDasharray="5 13"
          />
        </motion.g>

        {/* orbiting dots, one per ring */}
        <motion.g style={ORIGIN} {...spin(20, 1)}>
          <circle cx={200} cy={30} r={7} fill="var(--color-accent)" />
        </motion.g>
        <motion.g style={ORIGIN} {...spin(14, -1)}>
          <circle
            cx={200}
            cy={80}
            r={5}
            fill="var(--color-accent)"
            fillOpacity={0.7}
          />
        </motion.g>
        <motion.g style={ORIGIN} {...spin(9, 1)}>
          <circle
            cx={200}
            cy={130}
            r={4}
            fill="var(--color-foreground)"
            fillOpacity={0.45}
          />
        </motion.g>

        {/* expanding ripple from the core */}
        {!reduce ? (
          <motion.circle
            cx={200}
            cy={200}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={1.5}
            initial={{ r: 12, opacity: 0.6 }}
            animate={{ r: [12, 70], opacity: [0.6, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
          />
        ) : null}

        {/* pulsing core */}
        <motion.circle
          cx={200}
          cy={200}
          r={11}
          fill="var(--color-accent)"
          style={ORIGIN}
          animate={reduce ? {} : { scale: [1, 1.18, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
