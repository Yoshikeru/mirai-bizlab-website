"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { DURATION, EASE_OUT_EXPO, VIEWPORT_ONCE } from "./constants";

type RevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
};

export function Reveal({
  children,
  className,
  y = 28,
  delay = 0,
  duration = DURATION.slow,
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}
