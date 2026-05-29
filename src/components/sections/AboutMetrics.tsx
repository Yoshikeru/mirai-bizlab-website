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
              <MetricCard key={metric.label} metric={metric} index={index} />
            ))}
          </motion.ul>
        </div>

        {/* mobile: stacked grid */}
        <ul className="mx-auto mt-12 grid w-full max-w-(--container-content) grid-cols-2 gap-4 px-6 pb-20 md:hidden">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} index={index} compact />
          ))}
        </ul>
      </div>
    </section>
  );
}

function MetricCard({
  metric,
  index,
  compact = false,
}: {
  metric: Metric;
  index: number;
  compact?: boolean;
}) {
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
      className={`group relative flex flex-col justify-between rounded-3xl border border-[color:var(--color-border)] bg-white p-6 transition-shadow duration-300 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.18)] ${
        compact ? "aspect-square" : "h-[320px] w-[300px] sm:w-[360px] lg:h-[380px] lg:w-[400px]"
      }`}
    >
      <span className="text-xs font-mono tracking-widest text-[color:var(--color-muted)]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <div
          className={`flex items-baseline font-bold tabular-nums text-foreground ${
            compact ? "text-4xl" : "text-6xl lg:text-7xl"
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
      <span
        aria-hidden
        className="absolute right-6 bottom-6 block h-[2px] w-10 origin-left bg-[color:var(--color-accent)] transition-transform duration-300 group-hover:scale-x-[1.6]"
      />
    </motion.li>
  );
}
