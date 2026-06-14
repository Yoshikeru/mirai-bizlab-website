"use client";

import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useState } from "react";

type FaqItem = { q: string; a: string };

export function PricingFAQ() {
  const t = useTranslations("pricing.faq");
  const items = t.raw("items") as FaqItem[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-surface-alt py-14 md:py-32">
      <div className="mb-wrap">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="typo-h2"
        >
          {t("title")}
        </motion.h2>

        <ul className="mt-12 divide-y divide-[color:var(--color-border)] border-t border-b border-[color:var(--color-border)]">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-200 hover:text-[color:var(--color-accent)]"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-medium md:text-lg">
                    {item.q}
                  </span>
                  <span
                    aria-hidden
                    className={`flex h-9 w-9 flex-none items-center justify-center rounded-full border border-[color:var(--color-border)] transition-transform duration-300 ${
                      isOpen ? "rotate-45 border-[color:var(--color-accent)]" : ""
                    }`}
                  >
                    <Plus className="h-4 w-4 text-[color:var(--color-accent)]" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <p className="pr-12 pb-6 text-sm leading-relaxed text-[color:var(--color-muted)] md:text-base">
                        {item.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
