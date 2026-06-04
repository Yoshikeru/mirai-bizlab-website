"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

type Metric = { value: number; suffix: string; label: string };

export function AboutMetrics() {
  const t = useTranslations("home.about");
  const metrics = t.raw("metrics") as Metric[];
  const total = metrics.length;

  const sectionRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const xDesktop = useTransform(scrollYProgress, [0, 1], ["8%", "-58%"]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background md:h-[240vh]"
      aria-labelledby="about-heading"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[color:var(--color-accent)]/80" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-[color:var(--color-accent)]/80" />

      <div className="md:sticky md:top-0 md:flex md:h-screen md:flex-col md:justify-center md:overflow-hidden">
        <div className="mx-auto w-full max-w-(--container-wide) px-6 pt-20 md:pt-0">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal y={16} duration={0.6}>
                <p id="about-heading" className="typo-eyebrow">
                  {t("eyebrow")}
                </p>
              </Reveal>
              <Reveal y={24} duration={0.7} delay={0.05}>
                <h2 className="typo-h2 mt-6 whitespace-pre-line">
                  {t("title")}
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <Reveal y={20} duration={0.7} delay={0.1}>
                <p className="typo-body-lg text-[color:var(--color-muted)]">
                  {t("description")}
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* desktop: horizontal scroll-linked track */}
        <div className="mt-14 hidden overflow-hidden md:mt-20 md:block">
          <motion.ul
            style={reduce ? undefined : { x: xDesktop }}
            className="flex w-max gap-8 px-6 will-change-transform lg:gap-10"
          >
            {metrics.map((metric, index) => (
              <MetricCard
                key={metric.label}
                metric={metric}
                index={index}
                total={total}
              />
            ))}
          </motion.ul>
        </div>

        {/* mobile: stacked grid */}
        <ul className="mx-auto mt-12 grid w-full max-w-(--container-content) grid-cols-2 gap-4 px-6 pb-20 md:hidden">
          {metrics.map((metric, index) => (
            <MetricCard
              key={metric.label}
              metric={metric}
              index={index}
              total={total}
              compact
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function MetricCard({
  metric,
  index,
  total,
  compact = false,
}: {
  metric: Metric;
  index: number;
  total: number;
  compact?: boolean;
}) {
  const idx = String(index + 1).padStart(2, "0");
  const totalStr = String(total).padStart(2, "0");

  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08,
      }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-surface p-6 transition-shadow duration-300 hover:shadow-card-hover ${
        compact
          ? "aspect-square"
          : "h-[320px] w-[300px] sm:w-[360px] lg:h-[380px] lg:w-[400px]"
      }`}
    >
      {/* Giant faint background numeral (fills the empty space) */}
      <span
        aria-hidden
        className={`pointer-events-none absolute select-none font-black tabular-nums leading-none text-[color:var(--color-accent)]/[0.05] ${
          compact
            ? "-right-1 -bottom-4 text-[8rem]"
            : "-right-2 -bottom-12 text-[15rem] lg:-bottom-16 lg:text-[19rem]"
        }`}
      >
        {idx}
      </span>

      {/* Top row: index pagination + diagonal mark */}
      <div className="relative flex items-start justify-between">
        <span className="typo-eyebrow font-mono">
          {idx}
          <span className="mx-1 text-[color:var(--color-muted)]">/</span>
          <span className="text-[color:var(--color-muted)]">{totalStr}</span>
        </span>
        <span
          aria-hidden
          className={`block bg-[color:var(--color-accent)] ${
            compact ? "h-px w-6" : "h-px w-10 lg:w-14"
          }`}
        />
      </div>

      {/* Middle: animated value */}
      <div className="relative">
        <div
          className={`flex items-baseline gap-1 font-bold tracking-tight tabular-nums text-foreground ${
            compact ? "text-4xl" : "text-7xl lg:text-[5.5rem]"
          }`}
        >
          <AnimatedNumber value={metric.value} suffix={metric.suffix} />
        </div>
        <p
          className={`mt-3 text-[color:var(--color-muted)] ${
            compact ? "text-xs" : "text-sm lg:text-base"
          }`}
        >
          {metric.label}
        </p>
      </div>

      {/* Bottom decoration: stepped tick marks */}
      <div className="relative flex items-end justify-between">
        <div className="flex items-end gap-[3px]">
          {Array.from({ length: compact ? 5 : 8 }).map((_, i) => (
            <span
              key={i}
              aria-hidden
              className="block w-px bg-foreground/15"
              style={{ height: `${6 + (i % 4) * 4}px` }}
            />
          ))}
        </div>
        <span className="typo-caption font-mono text-[10px] tracking-[0.32em] text-[color:var(--color-muted)] uppercase">
          IN&nbsp;TH
        </span>
      </div>
    </motion.li>
  );
}
