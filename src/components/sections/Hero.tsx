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

      <div className="mb-wrap relative z-10 flex min-h-svh w-full flex-col justify-start pt-20 pb-24 md:justify-center md:py-24">
        <div className="mb-grid w-full">
          <motion.div
            className="col-span-12 md:col-span-8 lg:col-span-7"
            style={reduce ? undefined : { opacity: textOpacity, y: textY }}
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-kicker"
            >
              {t("eyebrow")}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
              className="mb-optical mt-6 whitespace-pre-line font-extrabold"
              style={{
                fontFamily:
                  "var(--font-sans-display), var(--font-sans-jp), sans-serif",
                fontSize: "clamp(2rem, 5.2vw, 4.5rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
              }}
            >
              {t("title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.25,
              }}
              className="typo-body-lg mt-8 max-w-xl text-[color:var(--color-muted)]"
            >
              {t("subtitle")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.4,
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
