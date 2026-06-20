import type { Easing, Variants } from "motion/react";

export const EASE_OUT_EXPO: Easing = [0.22, 1, 0.36, 1];

export const DURATION = {
  hover: 0.3,
  base: 0.6,
  slow: 0.8,
} as const;

export const VIEWPORT_ONCE = { once: true, margin: "-100px 0px" } as const;

export const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO },
  },
};

export const STAGGER_CONTAINER: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.05 },
  },
};
