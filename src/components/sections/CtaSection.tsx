"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";

export function CtaSection() {
  const t = useTranslations("home.cta");
  const reduce = useReducedMotion();

  return (
    <section
      className="relative isolate overflow-hidden bg-contrast py-16 md:py-36"
      aria-labelledby="cta-heading"
    >
      {/* Bangkok night photo — slow breathing zoom under a dark wash */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        animate={reduce ? undefined : { scale: [1, 1.07, 1] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/assets/photos/office-bangkok.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-contrast/70 via-contrast/40 to-contrast/85" />
      </motion.div>

      {/* Drifting circle outlines */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-36 -z-10 h-[520px] w-[520px] rounded-full border border-[color:var(--color-accent)]/30"
        animate={reduce ? undefined : { x: [0, 24, 0], y: [0, -18, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-44 -right-28 -z-10 h-[600px] w-[600px] rounded-full border border-white/10"
        animate={reduce ? undefined : { x: [0, -20, 0], y: [0, 16, 0], scale: [1.04, 1, 1.04] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 left-4 -z-10 h-[360px] w-[360px] rounded-full border border-white/[0.07]"
        animate={reduce ? undefined : { x: [0, 16, 0], y: [0, -10, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -left-40 -z-10 h-[620px] w-[620px] -translate-y-1/2 rounded-full bg-[color:var(--color-accent)]/15 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -bottom-40 -z-10 h-[420px] w-[420px] rounded-full bg-[color:var(--color-accent)]/10 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:60px_60px]"
      />

      <div className="relative mb-wrap text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-kicker inline-block"
        >
          {t("eyebrow")}
        </motion.p>
        <motion.h2
          id="cta-heading"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.1,
          }}
          className="typo-display mt-7 whitespace-pre-line text-white"
        >
          {t("title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2,
          }}
          className="typo-body-lg mx-auto mt-8 max-w-2xl text-white/70"
        >
          {t("description")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.3,
          }}
          className="mt-12 flex justify-center"
        >
          <Button href="/contact" variant="primary">
            {t("button")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
