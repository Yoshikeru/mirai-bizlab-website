"use client";

import { ArrowRight, PauseCircle } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { Link } from "@/lib/i18n/navigation";

export function CareersNotice() {
  const t = useTranslations("careers.notice");

  return (
    <section className="bg-background pt-4 pb-20 md:pt-8 md:pb-24">
      <div className="mx-auto w-full max-w-(--container-content) px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-[color:var(--color-accent)]/25 bg-[color:var(--color-accent-soft)]/55 p-8 md:p-12"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 right-0 h-full w-2/3 bg-gradient-to-l from-[color:var(--color-accent)]/12 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 -right-20 h-[260px] w-[260px] rounded-full bg-[color:var(--color-accent)]/15 blur-[100px]"
          />

          <div className="relative grid grid-cols-1 items-start gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-accent)]/30 bg-white/70 px-3.5 py-1.5 backdrop-blur-sm">
                <PauseCircle
                  className="h-3.5 w-3.5 text-[color:var(--color-accent)]"
                  aria-hidden
                />
                <span className="text-[10px] font-semibold tracking-[0.28em] text-[color:var(--color-accent)] uppercase">
                  {t("badge")}
                </span>
              </div>
              <h2 className="typo-h2 mt-6">{t("title")}</h2>
              <p className="typo-body-lg mt-6 text-foreground/85">
                {t("description")}
              </p>
            </div>

            <div className="md:col-span-5 md:flex md:justify-end">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full border border-foreground/15 bg-white px-6 py-3.5 text-sm font-semibold tracking-wide text-foreground transition-all duration-300 hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <span>{t("cta")}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
