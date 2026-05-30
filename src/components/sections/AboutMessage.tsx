"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { FounderAvatar } from "@/components/illustrations/FounderAvatar";

export function AboutMessage() {
  const t = useTranslations("about.message");
  const paragraphs = t.raw("body") as string[];

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto w-full max-w-(--container-content) px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <aside className="md:col-span-4">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs font-semibold tracking-[0.32em] text-[color:var(--color-accent)] uppercase"
            >
              {t("eyebrow")}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
              className="mt-5 text-3xl leading-[1.2] font-bold tracking-tight text-[color:var(--color-accent)] md:text-4xl"
            >
              {t("title")}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2,
              }}
              className="mt-10 flex flex-col gap-6"
            >
              <FounderAvatar className="h-44 w-44 flex-none drop-shadow-[0_18px_36px_rgba(215,0,15,0.18)] md:h-52 md:w-52" />
              <div>
                <p className="typo-h3">{t("name")}</p>
                <p className="typo-caption mt-2">{t("role")}</p>
              </div>
            </motion.div>
          </aside>

          <div className="md:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.15,
              }}
              className="space-y-7 text-foreground"
            >
              {paragraphs.map((para, index) => (
                <p key={index} className="typo-body-lg indent-[1.5em]">
                  {para}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
