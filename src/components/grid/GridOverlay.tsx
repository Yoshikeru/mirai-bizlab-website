"use client";

import { useEffect, useState } from "react";

/**
 * Dev-only Müller-Brockmann grid overlay.
 *
 * Not shown to normal visitors. Toggle with the `G` key, or auto-on with the
 * `?grid=1` URL parameter. It reads the SAME :root tokens as `.mb-wrap` /
 * `.mb-grid`, and its `.guides-wrap` mirrors the content box exactly, so the
 * overlay columns ARE the content columns at every width (§2.2).
 */
export function GridOverlay() {
  const [cols, setCols] = useState(12);

  useEffect(() => {
    const n = parseInt(
      getComputedStyle(document.documentElement)
        .getPropertyValue("--cols")
        .trim(),
      10,
    );
    if (Number.isFinite(n) && n > 0) setCols(n);

    // auto-on via ?grid=1
    const params = new URLSearchParams(window.location.search);
    if (params.get("grid") === "1") document.body.classList.add("grid-on");

    const onKey = (e: KeyboardEvent) => {
      if (
        (e.key === "g" || e.key === "G") &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey
      ) {
        const target = e.target as HTMLElement | null;
        const tag = target?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable)
          return;
        document.body.classList.toggle("grid-on");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="guides" aria-hidden="true">
      <div className="guides-wrap">
        <div className="cols">
          {Array.from({ length: cols }, (_, i) => (
            <div className="col" key={i}>
              <span>{i + 1}</span>
            </div>
          ))}
        </div>
        <div className="rows" />
        <div className="mline l" />
        <div className="mline r" />
      </div>
    </div>
  );
}
