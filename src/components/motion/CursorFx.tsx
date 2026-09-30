"use client";

import { useEffect, useRef } from "react";

/**
 * Desktop-only pointer layer (fine pointer, motion allowed):
 *  - a lagging ring that grows over links/buttons and shows a label over
 *    `[data-cursor="label text"]` elements
 *  - magnetic pull on `[data-magnetic]` elements (event delegation, so server
 *    components only need to add the attribute)
 * The native cursor is left visible on purpose.
 */
export function CursorFx() {
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || calm.matches) return;
    const el = ring.current;
    const lab = label.current;
    if (!el || !lab) return;

    let tx = -100;
    let ty = -100;
    let x = tx;
    let y = ty;
    let raf = 0;
    let magnet: HTMLElement | null = null;

    const tick = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };

    const setMagnet = (next: HTMLElement | null) => {
      if (magnet && magnet !== next) {
        const prev = magnet;
        prev.style.transform = "";
        prev.style.transition = "transform .5s cubic-bezier(.22,1,.36,1)";
        window.setTimeout(() => {
          if (prev !== magnet) prev.style.transition = "";
        }, 520);
      }
      magnet = next;
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.dataset.on = "1";
      const target = e.target as Element | null;

      const labelEl = target?.closest<HTMLElement>("[data-cursor]");
      const text = labelEl?.dataset.cursor ?? "";
      if (lab.textContent !== text) lab.textContent = text;
      const interactive = !!target?.closest("a,button,[role=button],summary,label");
      el.dataset.mode = text ? "label" : interactive ? "link" : "idle";

      const m = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
      setMagnet(m);
      if (m) {
        const r = m.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        m.style.transition = "transform .18s ease-out";
        m.style.transform = `translate(${dx * 0.22}px, ${dy * 0.32}px)`;
      }
    };
    const onLeave = () => {
      delete el.dataset.on;
      setMagnet(null);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      setMagnet(null);
    };
  }, []);

  return (
    <div ref={ring} aria-hidden className="mb-cursor">
      <span ref={label} className="mb-cursor-label" />
    </div>
  );
}
