"use client";

import { Building2, Calculator, Database, LineChart } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { Reveal } from "@/components/motion/Reveal";

type ServiceItem = { index: string; title: string; description: string };

const EASE = [0.22, 1, 0.36, 1] as const;

// 01 会社設立 / 02 会計・税務 / 03 会計システム / 04 戦略セッション
const ICONS = [Building2, Calculator, Database, LineChart];

export function Services() {
  const t = useTranslations("home.services");
  const items = t.raw("items") as ServiceItem[];
  const folio =
    items.length > 0
      ? `(${items[0].index} — ${items[items.length - 1].index})`
      : "";

  return (
    <section className="bg-surface-alt py-14 md:py-32">
      <div className="mb-wrap">
        {/* asymmetric header register */}
        <div className="mb-grid items-end">
          <div className="col-span-12 md:col-span-7">
            <Reveal y={16} duration={0.6}>
              <p className="mb-kicker">{t("eyebrow")}</p>
            </Reveal>
            <Reveal y={24} duration={0.7} delay={0.05}>
              <h2 className="mb-optical typo-h2 mt-6 whitespace-pre-line">
                {t("title")}
              </h2>
            </Reveal>
          </div>
          <div className="col-span-12 mt-6 md:col-span-3 md:col-start-10 md:mt-0">
            <Reveal y={16} duration={0.6} delay={0.1}>
              <div className="flex items-center gap-3 md:flex-col md:items-end md:gap-2">
                <span
                  aria-hidden
                  className="h-px w-10 bg-[color:var(--color-accent)] md:w-full"
                />
                <span className="mb-folio whitespace-nowrap text-[color:var(--color-muted)]">
                  {folio}
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* editorial index list */}
        <ul className="mt-12 md:mt-20">
          {items.map((item, index) => {
            const Icon = ICONS[index] ?? Calculator;
            return (
              <li
                key={item.index}
                className="group border-t border-[color:var(--color-border)] last:border-b"
              >
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px 0px" }}
                  transition={{
                    duration: 0.7,
                    ease: EASE,
                    delay: index * 0.08,
                  }}
                  className="mb-grid items-start py-8 transition-colors duration-500 group-hover:bg-[color:var(--color-accent-soft)]/40 md:py-11"
                >
                  {/* index numeral */}
                  <div className="col-span-12 md:col-span-2">
                    <span className="mb-numeral block text-5xl text-[color:var(--color-border)] transition-colors duration-500 group-hover:text-[color:var(--color-accent)] md:text-6xl lg:text-7xl">
                      {item.index}
                    </span>
                  </div>

                  {/* title + description */}
                  <div className="col-span-12 mt-4 md:col-span-6 md:col-start-4 md:mt-0">
                    <h3 className="typo-h3 transition-transform duration-500 group-hover:translate-x-1">
                      {item.title}
                    </h3>
                    <p className="typo-body mt-3 max-w-xl text-[color:var(--color-muted)]">
                      {item.description}
                    </p>
                    <div className="mt-6 flex items-center gap-3 text-xs font-semibold tracking-[0.28em] text-[color:var(--color-accent)] uppercase">
                      <span>{item.index}</span>
                      <span
                        aria-hidden
                        className="block h-px w-10 bg-[color:var(--color-accent)] transition-[width] duration-500 group-hover:w-24"
                      />
                    </div>
                  </div>

                  {/* icon */}
                  <div className="col-span-12 mt-6 md:col-span-2 md:col-start-11 md:mt-0 md:flex md:justify-end">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--color-accent)]/10 transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-105">
                      <Icon
                        className="h-7 w-7 text-[color:var(--color-accent)]"
                        aria-hidden
                      />
                    </div>
                  </div>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
