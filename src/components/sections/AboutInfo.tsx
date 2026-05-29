"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

type InfoRow = { label: string; value: string };

export function AboutInfo() {
  const t = useTranslations("about.info");
  const rows = t.raw("rows") as InfoRow[];

  return (
    <section className="bg-[#F8F8F8] py-24 md:py-32">
      <div className="mx-auto w-full max-w-(--container-content) px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <header className="md:col-span-4">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="typo-eyebrow"
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
                delay: 0.08,
              }}
              className="typo-h2 mt-6"
            >
              {t("title")}
            </motion.h2>
          </header>

          <dl className="md:col-span-8">
            {rows.map((row, index) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.05,
                }}
                className="grid grid-cols-3 gap-4 border-b border-[color:var(--color-border)] py-5 md:grid-cols-4"
              >
                <dt className="col-span-1 text-xs font-semibold tracking-[0.18em] text-[color:var(--color-muted)] uppercase">
                  {row.label}
                </dt>
                <dd className="col-span-2 text-sm leading-relaxed text-foreground md:col-span-3 md:text-base">
                  {row.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
