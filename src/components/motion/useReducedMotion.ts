"use client";

import { useSyncExternalStore } from "react";

/**
 * Hydration-safe replacement for motion/react's `useReducedMotion`.
 *
 * motion's hook reads `matchMedia` synchronously on the first client render, so
 * users with "reduce motion" enabled got server HTML (false) ≠ first client
 * render (true) → React error #418 and a full client re-render of the tree.
 * `useSyncExternalStore` uses `getServerSnapshot` during hydration and only then
 * switches to the real value, so the markup always matches.
 */
const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;
const getServerSnapshot = () => false;

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
