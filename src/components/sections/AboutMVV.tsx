"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

type MVVItem = {
  key: string;
  label: string;
  title: string;
  description: string;
};

export function AboutMVV() {
  const t = useTranslations("about.mvv");
  const items = t.raw("items") as MVVItem[];

  return (
    <section className="relative isolate overflow-hidden bg-background py-14 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--color-accent)]/8 blur-[120px]"
      />

      <div className="relative mb-wrap">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-kicker inline-block"
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
        </div>

        <ul className="mt-16 mb-grid md:mt-20">
          {items.map((item, index) => (
            <motion.li
              key={item.key}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.12,
              }}
              className="col-span-12 md:col-span-4 group relative rounded-3xl border border-[color:var(--color-border)] bg-surface/80 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[color:var(--color-accent)]/20 hover:bg-surface md:p-10"
            >
              <p className="mb-kicker">{item.label}</p>
              <h3 className="typo-h3 mt-6">{item.title}</h3>
              <p className="typo-body mt-5 text-[color:var(--color-muted)]">
                {item.description}
              </p>
              <span
                aria-hidden
                className="absolute right-8 bottom-8 block h-[2px] w-10 origin-left bg-[color:var(--color-accent)] transition-transform duration-500 group-hover:scale-x-[1.8]"
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
