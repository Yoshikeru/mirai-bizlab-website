"use client";

import { Building2, Calculator, Database, LineChart } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { SectionHeader } from "@/components/ui/SectionHeader";

type ServiceItem = { index: string; title: string; description: string };

// 01 会社設立 / 02 会計・税務 / 03 会計システム / 04 経営コンサル
const ICONS = [Building2, Calculator, Database, LineChart];

export function Services() {
  const t = useTranslations("home.services");
  const items = t.raw("items") as ServiceItem[];

  return (
    <section className="bg-background py-14 md:py-32">
      <div className="mb-wrap">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} />

        <div className="mb-grid mt-10 md:mt-20">
          {items.map((item, index) => {
            const Icon = ICONS[index] ?? Calculator;
            return (
              <motion.article
                key={item.index}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.15,
                }}
                className="group relative col-span-12 overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-surface p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-[color:var(--color-accent)]/20 hover:bg-[color:var(--color-accent-soft)]/55 hover:shadow-[0_36px_70px_-36px_rgba(215,0,15,0.32)] md:col-span-6 md:p-10 md:py-12 lg:col-span-3"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-4 -right-2 text-[8rem] leading-none font-extrabold tracking-tight text-[color:var(--color-accent)]/[0.07] select-none md:text-[10rem]"
                >
                  {item.index}
                </span>

                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--color-accent)]/10 transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-105">
                    <Icon
                      className="h-7 w-7 text-[color:var(--color-accent)]"
                      aria-hidden
                    />
                  </div>
                  <h3 className="typo-h3 mt-8">{item.title}</h3>
                  <p className="typo-body mt-4 text-[color:var(--color-muted)]">
                    {item.description}
                  </p>

                  <div className="mt-10 flex items-center gap-3 text-xs font-semibold tracking-[0.28em] text-[color:var(--color-accent)] uppercase">
                    <span>{item.index}</span>
                    <span
                      aria-hidden
                      className="block h-px w-10 bg-[color:var(--color-accent)] transition-[width] duration-500 group-hover:w-24"
                    />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
