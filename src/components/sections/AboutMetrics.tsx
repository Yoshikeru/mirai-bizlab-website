"use client";

import { useTranslations } from "next-intl";

import { Reveal } from "@/components/motion/Reveal";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

type Metric = { value: number; suffix: string; label: string };

/**
 * Full-bleed dark statement band: the four proof figures set as oversized
 * numerals on the 12-col grid. No scroll-jacking — the figures are always
 * fully visible, the count-up is the only motion.
 */
export function AboutMetrics() {
  const t = useTranslations("home.about");
  const metrics = t.raw("metrics") as Metric[];

  return (
    <section
      className="mb-dark-panel py-16 md:py-28"
      aria-labelledby="about-heading"
    >
      <div className="mb-wrap">
        <div className="mb-grid items-end">
          <div className="col-span-12 md:col-span-6">
            <Reveal y={16} duration={0.6}>
              <p id="about-heading" className="mb-kicker">
                {t("eyebrow")}
              </p>
            </Reveal>
            <Reveal y={24} duration={0.7} delay={0.05}>
              <h2 className="mb-optical typo-h2 mt-6 whitespace-pre-line text-white">
                {t("title")}
              </h2>
            </Reveal>
          </div>
          <div className="col-span-12 mt-6 md:col-span-4 md:col-start-9 md:mt-0">
            <Reveal y={20} duration={0.7} delay={0.1}>
              <p className="typo-body text-white/60">{t("description")}</p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-14 grid grid-cols-2 border-t border-white/15 md:mt-24 md:grid-cols-4">
          {metrics.map((metric, i) => (
            <li
              key={metric.label}
              className={`group relative flex flex-col justify-between gap-10 border-white/15 py-8 pr-4 md:min-h-[21rem] md:gap-16 md:border-l md:py-10 md:pl-6 md:pr-2 ${
                i % 2 === 1 ? "border-l pl-5 md:pl-6" : "pl-0 md:pl-6"
              } ${i < 2 ? "border-b md:border-b-0" : ""} ${i === 0 ? "md:border-l-0 md:pl-0" : ""}`}
            >
              <span className="mb-folio text-white/40">
                {String(i + 1).padStart(2, "0")}
                <span className="mx-1.5 text-white/20">/</span>
                {String(metrics.length).padStart(2, "0")}
              </span>
              <div>
                <div className="mb-numeral flex items-baseline text-[clamp(3.75rem,7.4vw,8.5rem)] text-white tabular-nums">
                  <AnimatedNumber value={metric.value} />
                  <span className="text-[color:var(--color-accent)]">
                    {metric.suffix}
                  </span>
                </div>
                <p className="mt-4 flex items-center gap-3 text-sm text-white/65 md:text-base">
                  <span
                    aria-hidden
                    className="block h-px w-6 bg-[color:var(--color-accent)] transition-[width] duration-500 group-hover:w-14"
                  />
                  {metric.label}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
