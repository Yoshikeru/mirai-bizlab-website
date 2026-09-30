"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { usePathname } from "@/lib/i18n/navigation";

/**
 * Route-arrival curtain. Only plays on client-side navigations (never on the
 * first load, so LCP is untouched). The curtain is put in place before paint
 * with a layout effect, then wipes upward to reveal the new page.
 */
export function PageTransition() {
  const pathname = usePathname();
  const first = useRef(true);
  const [run, setRun] = useState(0);

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setRun((n) => n + 1);
  }, [pathname]);

  if (run === 0) return null;
  return <div key={run} aria-hidden className="mb-curtain" />;
}
