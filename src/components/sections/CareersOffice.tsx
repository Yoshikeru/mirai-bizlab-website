"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function CareersOffice() {
  const t = useTranslations("careers.office");

  return (
    <section className="bg-background py-14 md:py-32">
      <div className="mb-wrap">
        <div className="mb-grid">
          <div className="col-span-12 md:col-span-5">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px 0px" }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="typo-h2"
            >
              {t("title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px 0px" }}
              transition={{
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.12,
              }}
              className="typo-body-lg mt-7 text-[color:var(--color-muted)]"
            >
              {t("description")}
            </motion.p>
          </div>
          <div className="col-span-12 md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px 0px" }}
              transition={{
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.18,
              }}
              className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[color:var(--color-border)]"
            >
              <Image
                src="/assets/photos/office-hero.jpg"
                alt={t("title")}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
