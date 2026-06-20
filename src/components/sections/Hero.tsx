"use client";

import { useTranslations } from "next-intl";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

import { Button } from "@/components/ui/Button";
import { BangkokPrismVisual } from "@/components/visuals/BangkokPrismVisual";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const t = useTranslations("home.hero");
  const common = useTranslations("common");
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.55], [0, -80]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  // Title carries explicit line breaks per locale — reveal it line by line.
  const titleLines = t("title").split("\n");

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-svh overflow-hidden bg-background"
    >
      {/* Bangkok prism visual (background) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={reduce ? undefined : { scale: visualScale, y: visualY }}
      >
        <BangkokPrismVisual />
      </motion.div>

      {/* gradient overlay to keep text legible on the left while showing visual on the right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-background/95 via-background/70 to-background/0 md:from-background/92 md:via-background/55 md:to-transparent"
      />

      {/* vertical signature label — editorial detail, desktop only */}
      <motion.div
        aria-hidden
        initial={reduce ? undefined : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.9 }}
        className="pointer-events-none absolute top-1/2 left-5 z-10 hidden -translate-y-1/2 lg:block xl:left-8"
      >
        <span
          className="mb-folio whitespace-nowrap text-[color:var(--color-muted)]"
          style={{ writingMode: "vertical-rl" }}
        >
          MIRAI BIZLAB&nbsp;&nbsp;—&nbsp;&nbsp;BANGKOK, TH
        </span>
      </motion.div>

      <div className="mb-wrap relative z-10 flex min-h-svh w-full flex-col justify-start pt-10 pb-24 md:pt-16">
        <div className="mb-grid w-full">
          <motion.div
            className="col-span-12 md:col-span-8 lg:col-span-7"
            style={reduce ? undefined : { opacity: textOpacity, y: textY }}
          >
            {/* meta register: eyebrow + mono folio on a shared hairline */}
            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 12 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex items-center gap-4"
            >
              <p className="mb-kicker flex-none">{t("eyebrow")}</p>
              <span
                aria-hidden
                className="hidden h-px flex-1 bg-[color:var(--color-border)] sm:block"
              />
              <span
                aria-hidden
                className="mb-folio hidden flex-none text-[color:var(--color-muted)] sm:block"
              >
                EST. 2010
              </span>
            </motion.div>

            <h1
              className="mb-optical mt-6 font-extrabold"
              style={{
                fontFamily:
                  "var(--font-sans-display), var(--font-sans-jp), sans-serif",
                fontSize: "clamp(2.1rem, 5.4vw, 4.75rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.03em",
              }}
            >
              {titleLines.map((line, i) => (
                <span
                  key={i}
                  className="block overflow-hidden pt-[0.1em] pb-[0.14em] -my-[0.12em]"
                >
                  <motion.span
                    className="block"
                    initial={reduce ? undefined : { y: "120%" }}
                    animate={reduce ? undefined : { y: "0%" }}
                    transition={{
                      duration: 0.9,
                      ease: EASE,
                      delay: 0.18 + i * 0.12,
                    }}
                  >
                    {line || " "}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={reduce ? undefined : { opacity: 0, y: 16 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: EASE,
                delay: 0.18 + titleLines.length * 0.12 + 0.1,
              }}
              className="typo-body-lg mt-8 max-w-xl text-[color:var(--color-muted)]"
            >
              {t("subtitle")}
            </motion.p>
            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 16 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: EASE,
                delay: 0.18 + titleLines.length * 0.12 + 0.25,
              }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button href="/contact" variant="primary">
                {t("primaryCta")}
              </Button>
              <Button href="/services" variant="secondary">
                {t("secondaryCta")}
              </Button>
            </motion.div>

            {/* mono footnote — trilingual signature */}
            <motion.p
              initial={reduce ? undefined : { opacity: 0 }}
              animate={reduce ? undefined : { opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: EASE,
                delay: 0.18 + titleLines.length * 0.12 + 0.45,
              }}
              className="mb-folio mt-10 flex items-center gap-3 text-[color:var(--color-muted)]"
            >
              <span
                aria-hidden
                className="block h-px w-6 bg-[color:var(--color-accent)]"
              />
              JP&nbsp;·&nbsp;EN&nbsp;·&nbsp;TH&nbsp;·&nbsp;ZH&nbsp;·&nbsp;ES
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="text-[10px] font-semibold tracking-[0.4em] text-[color:var(--color-muted)] uppercase">
          {common("scroll")}
        </span>
        <div className="relative h-12 w-px overflow-hidden bg-foreground/10">
          <motion.span
            aria-hidden
            className="absolute inset-x-0 top-0 block w-px origin-top bg-foreground"
            initial={{ scaleY: 0 }}
            animate={
              reduce ? { scaleY: 0.5 } : { scaleY: [0, 1, 0], y: [0, 0, 48] }
            }
            transition={
              reduce
                ? undefined
                : {
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                  }
            }
            style={{ height: "100%" }}
          />
        </div>
      </div>
    </section>
  );
}
