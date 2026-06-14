"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Runtime OPTICAL ALIGNMENT (§2.6) — display ink, not its box.
 *
 * Large display glyphs carry a left side-bearing, so a headline whose layout
 * box sits on the column line still LOOKS indented against body text. We
 * measure each display glyph's actual ink offset with the ACTUALLY-LOADED font
 * and nudge the element so its visible ink lands on the line. Re-runs after the
 * webfont loads, on resize, and on route change.
 *
 * Opt elements in with the `.mb-optical` class.
 */
const SELECTOR = ".mb-optical";

export function OpticalAlign() {
  const pathname = usePathname();

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const align = () => {
      const els = document.querySelectorAll<HTMLElement>(SELECTOR);
      els.forEach((el) => {
        el.style.marginLeft = "0px";
        const cs = getComputedStyle(el);
        let ch = (el.textContent || "").trim().charAt(0);
        if (!ch) return;
        if (cs.textTransform === "uppercase") ch = ch.toUpperCase();
        ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        ctx.textAlign = "left";
        const abl = ctx.measureText(ch).actualBoundingBoxLeft;
        // only nudge when the offset is meaningful (skip CJK where it's ~0)
        if (Number.isFinite(abl) && Math.abs(abl) > 0.1) {
          el.style.marginLeft = `${abl.toFixed(2)}px`;
        }
      });
      return els.length;
    };

    // Poll briefly so late-hydrating client sections (Hero, etc.) are caught,
    // then settle. Plus webfont-load and resize re-runs.
    let elapsed = 0;
    const poll = window.setInterval(() => {
      align();
      elapsed += 160;
      if (elapsed >= 2400) window.clearInterval(poll);
    }, 160);
    align();
    if (document.fonts?.ready) {
      document.fonts.ready.then(align).catch(() => {});
    }

    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(align, 120);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.clearInterval(poll);
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, [pathname]);

  return null;
}
