"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

import { SectionHeader } from "@/components/ui/SectionHeader";

type Step = { title: string; description: string };

export function Process() {
  const t = useTranslations("home.process");
  const steps = t.raw("steps") as Step[];
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"],
  });

  const trackHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative bg-background py-24 md:py-32">
      <div className="mx-auto w-full max-w-(--container-content) px-6">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} />

        <div ref={containerRef} className="relative mt-16 pl-10 md:mt-20 md:pl-16">
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-2 w-px bg-foreground/10 md:left-4"
          />
          <motion.div
            aria-hidden
            style={{ height: trackHeight }}
            className="absolute top-0 left-2 w-px origin-top bg-[color:var(--color-accent)] md:left-4"
          />

          <ol className="flex flex-col gap-16 md:gap-24">
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
  const inView = useInView(itemRef, { margin: "-30% 0% -30% 0%" });

  return (
    <li ref={itemRef} className="relative">
      <motion.span
        aria-hidden
        className="absolute top-2 -left-[34px] block h-3 w-3 rounded-full bg-[color:var(--color-accent)] md:-left-[42px]"
        animate={
          inView
            ? {
                scale: [1, 1.7, 1],
                boxShadow: [
                  "0 0 0 0 rgba(215,0,15,0.55)",
                  "0 0 0 14px rgba(215,0,15,0)",
                  "0 0 0 0 rgba(215,0,15,0)",
                ],
              }
            : { scale: 1, boxShadow: "0 0 0 0 rgba(215,0,15,0)" }
        }
        transition={{
          duration: 1.8,
          repeat: inView ? Infinity : 0,
          ease: "easeOut",
        }}
      />

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="font-mono text-xs tracking-[0.3em] text-[color:var(--color-accent)] uppercase">
          Step {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="typo-h3 mt-3">{step.title}</h3>
        <p className="typo-body-lg mt-4 max-w-xl text-[color:var(--color-muted)]">
          {step.description}
        </p>
      </motion.div>
    </li>
  );
}
