"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";

type Position = {
  id: string;
  title: string;
  type: string;
  location: string;
  summary: string;
};

export function CareersPositions() {
  const t = useTranslations("careers.positions");
  const apply = useTranslations("careers.apply");
  const items = t.raw("items") as Position[];

  return (
    <section className="bg-surface-alt py-14 md:py-32">
      <div className="mb-wrap">
        <div className="flex flex-col gap-5">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="typo-h2"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1,
            }}
            className="typo-body-lg max-w-2xl text-[color:var(--color-muted)]"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <ul className="mt-12 divide-y divide-[color:var(--color-border)] border-t border-b border-[color:var(--color-border)]">
          {items.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.06,
              }}
              className="group grid grid-cols-1 gap-3 py-7 md:grid-cols-12 md:items-center md:gap-6"
            >
              <div className="md:col-span-5">
                <h3 className="typo-h3">{item.title}</h3>
                <p className="typo-body mt-2 text-[color:var(--color-muted)]">
                  {item.summary}
                </p>
              </div>
              <div className="text-xs tracking-[0.24em] text-[color:var(--color-muted)] uppercase md:col-span-3">
                {item.type}
              </div>
              <div className="text-xs tracking-[0.24em] text-[color:var(--color-muted)] uppercase md:col-span-2">
                {item.location}
              </div>
              <div className="md:col-span-2 md:text-right">
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-[color:var(--color-muted)] uppercase">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-muted)]/40" />
                  Reference
                </span>
              </div>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 rounded-3xl border border-[color:var(--color-accent)]/15 bg-[color:var(--color-accent-soft)]/35 p-8 text-center md:p-12"
        >
          <h3 className="typo-h2">{apply("title")}</h3>
          <p className="typo-body-lg mx-auto mt-6 max-w-2xl text-[color:var(--color-muted)]">
            {apply("description")}
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/contact" variant="primary">
              {apply("button")}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
