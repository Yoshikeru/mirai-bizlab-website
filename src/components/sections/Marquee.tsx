"use client";

import { useTranslations } from "next-intl";

/**
 * Infinite horizontal service-keyword band.
 * Two identical halves + translateX(-50%) keyframes = seamless loop.
 */
export function Marquee() {
  const t = useTranslations("home");
  const words = t.raw("marquee") as string[];

  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-[color:var(--color-border)] bg-surface py-4 md:py-6"
    >
      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {words.map((word) => (
              <span
                key={word}
                className="flex shrink-0 items-center gap-8 pr-8 md:gap-14 md:pr-14"
              >
                <span
                  className="text-xs font-bold tracking-[0.22em] whitespace-nowrap text-foreground/55 uppercase md:text-sm"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {word}
                </span>
                <span className="block h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
