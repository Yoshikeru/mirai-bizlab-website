"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

type InfoRow = { label: string; value: string };

export function AboutInfo() {
  const t = useTranslations("about.info");
  const rows = t.raw("rows") as InfoRow[];

  return (
    <section className="bg-surface-alt py-14 md:py-32">
      <div className="mb-wrap">
        <div className="mb-grid">
          <header className="col-span-12 md:col-span-4">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px 0px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-kicker"
            >
              {t("eyebrow")}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px 0px" }}
              transition={{
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.08,
              }}
              className="mb-optical typo-h2 mt-6"
            >
              {t("title")}
            </motion.h2>
          </header>

          <dl className="col-span-12 md:col-span-8">
            {rows.map((row, index) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px 0px" }}
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
