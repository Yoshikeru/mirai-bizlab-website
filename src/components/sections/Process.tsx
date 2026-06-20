"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

import { SectionHeader } from "@/components/ui/SectionHeader";

type Step = { title: string; description: string };

const EASE = [0.22, 1, 0.36, 1] as const;

export function Process() {
  const t = useTranslations("home.process");
  const steps = t.raw("steps") as Step[];
  const folio =
    steps.length > 0
      ? `(01 — ${String(steps.length).padStart(2, "0")})`
      : undefined;
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 75%"],
  });
  const trackHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative overflow-hidden bg-background py-14 md:py-32">
      <div className="mb-wrap">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} folio={folio} />

        <div ref={containerRef} className="relative mt-12 md:mt-24">
          {/* mobile rail (left) */}
          <div aria-hidden className="absolute top-0 bottom-0 left-2 w-px bg-foreground/10 md:hidden" />
          <motion.div aria-hidden style={{ height: trackHeight }} className="absolute top-0 left-2 w-px origin-top bg-[color:var(--color-accent)] md:hidden" />

          {/* desktop center spine */}
          <div aria-hidden className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-foreground/10 md:block" />
          <motion.div aria-hidden style={{ height: trackHeight }} className="absolute top-0 left-1/2 hidden w-px origin-top -translate-x-1/2 bg-[color:var(--color-accent)] md:block" />

          <ol className="flex flex-col gap-12 md:gap-8">
            {steps.map((step, index) => (
              <StepItem key={step.title} step={step} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function StepItem({ step, index }: { step: Step; index: number }) {
  const itemRef = useRef<HTMLLIElement | null>(null);
  const inView = useInView(itemRef, { margin: "-35% 0% -35% 0%" });
  const reduce = useReducedMotion();
  const left = index % 2 === 0; // even steps go on the left, odd on the right
  const num = String(index + 1).padStart(2, "0");

  return (
    <li
      ref={itemRef}
      className="relative md:grid md:grid-cols-2 md:items-center"
    >
      {/* node badge — on mobile rail / on desktop spine */}
      <motion.div
        aria-hidden
        className="absolute top-1 left-2 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-[color:var(--color-accent)]/30 bg-background font-mono text-xs font-bold tracking-wider text-[color:var(--color-accent)] md:top-1/2 md:left-1/2 md:h-14 md:w-14 md:-translate-y-1/2 md:text-sm"
        animate={reduce ? undefined : { y: [0, -4, 0] }}
        transition={reduce ? undefined : { duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
      >
        {num}
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: "0 0 0 0 rgba(215,0,15,0.4)" }}
          animate={inView && !reduce ? { boxShadow: ["0 0 0 0 rgba(215,0,15,0.4)", "0 0 0 12px rgba(215,0,15,0)"] } : undefined}
          transition={{ duration: 1.8, repeat: inView && !reduce ? Infinity : 0, ease: "easeOut" }}
        />
      </motion.div>

      {/* branch connector (desktop) */}
      <span
        aria-hidden
        className={`absolute top-1/2 hidden h-px bg-[color:var(--color-accent)]/35 md:block ${
          left ? "right-1/2 mr-7 w-10" : "left-1/2 ml-7 w-10"
        }`}
      />

      {/* content card */}
      <motion.div
        initial={reduce ? false : { opacity: 0, x: left ? -44 : 44, y: 12 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-80px 0px" }}
        transition={{ duration: 0.75, ease: EASE }}
        className={`group pl-12 md:pl-0 ${
          left
            ? "md:col-start-1 md:flex md:justify-end md:pr-20"
            : "md:col-start-2 md:flex md:justify-start md:pl-20"
        }`}
      >
        <div className="md:max-w-sm rounded-3xl border border-[color:var(--color-border)] bg-surface p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--color-accent)]/25 hover:shadow-card-hover md:p-8">
          <span className="font-mono text-xs tracking-[0.3em] text-[color:var(--color-accent)] uppercase">
            Step {num}
          </span>
          <h3 className="typo-h3 mt-3">{step.title}</h3>
          <p className="typo-body mt-3 text-[color:var(--color-muted)]">
            {step.description}
          </p>
        </div>
      </motion.div>
    </li>
  );
}
