import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import { LedgerField } from "@/components/visuals/LedgerField";

type Metric = { value: number; suffix: string; label: string };

const d = (s: number): CSSProperties => ({ ["--d" as string]: `${s}s` });

/**
 * Server component on purpose: the headline, subtitle and CTAs are in the very
 * first HTML and animate with CSS only, so LCP no longer waits for hydration.
 * Only <LedgerField/> (the canvas) is client-side.
 */
export function Hero() {
  const t = useTranslations("home.hero");
  const about = useTranslations("home.about");
  const lines = t("title").split("\n");
  const metrics = about.raw("metrics") as Metric[];

  return (
    <section
      data-hero
      className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-background md:min-h-[calc(100svh-4.75rem)]"
    >
      <LedgerField />

      {/* vertical signature — desktop only */}
      <span
        aria-hidden
        className="mb-folio hero-fade pointer-events-none absolute top-1/2 left-5 hidden -translate-y-1/2 whitespace-nowrap text-[color:var(--color-muted)] [writing-mode:vertical-rl] xl:block"
        style={d(0.9)}
      >
        MIRAI BIZLAB&nbsp;&nbsp;—&nbsp;&nbsp;BANGKOK, TH
      </span>

      <div className="mb-wrap relative z-10 flex flex-1 flex-col justify-between gap-10 pt-10 pb-8 md:pt-16 md:pb-10">
        <div data-fx className="max-w-[62rem]">
          {/* meta register */}
          <div data-safe data-safe-box className="hero-fade flex w-fit items-center gap-4" style={d(0)}>
            <p className="mb-kicker flex-none">{t("eyebrow")}</p>
            <span
              aria-hidden
              className="hidden h-px w-24 bg-[color:var(--color-border)] sm:block"
            />
            <span
              aria-hidden
              className="mb-folio hidden text-[color:var(--color-muted)] sm:block"
            >
              EST. 2010
            </span>
          </div>

          <h1 data-safe className="hero-h1 mb-optical mt-6 font-extrabold text-foreground md:mt-8">
            {lines.map((line, i) => (
              <span key={i} className="hero-mask">
                <span style={d(0.04 + i * 0.09)}>{line || " "}</span>
              </span>
            ))}
          </h1>

          <p
            data-safe
            className="hero-fade typo-body-lg mt-7 max-w-xl text-[color:var(--color-muted)] md:mt-9"
            style={d(0.12)}
          >
            {t("subtitle")}
          </p>

          <div
            data-safe
            data-safe-box
            className="hero-fade mt-8 flex w-fit flex-wrap gap-3 md:mt-10"
            style={d(0.22)}
          >
            <Button href="/contact" variant="primary">
              {t("primaryCta")}
            </Button>
            <Button href="/services" variant="secondary">
              {t("secondaryCta")}
            </Button>
          </div>
        </div>

        {/* proof strip — real figures only (same source as the metrics section) */}
        <dl
          data-fx
          className="hero-fade grid grid-cols-2 gap-x-6 gap-y-6 border-t border-[color:var(--color-border)] pt-6 md:grid-cols-4"
          style={d(0.34)}
        >
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col-reverse gap-1.5">
              <dt className="mb-folio text-[color:var(--color-muted)]">
                {m.label}
              </dt>
              <dd className="mb-numeral text-3xl text-foreground tabular-nums md:text-5xl">
                {m.value}
                <span className="text-[color:var(--color-accent)]">
                  {m.suffix}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
