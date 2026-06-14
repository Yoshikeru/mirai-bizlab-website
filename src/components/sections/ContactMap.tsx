"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";

/** Google Business Profile share link (authoritative pin). */
const MAPS_LINK = "https://share.google/VEhuchffB5LrddyEq";
/** Embed query — resolves to the verified MIRAI BizLab business pin. No API key required. */
const MAPS_QUERY = "MIRAI BizLab Co., Ltd.";

export function ContactMap() {
  const t = useTranslations("contact.map");
  const info = useTranslations("contact.info");
  const locale = useLocale();

  const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    MAPS_QUERY,
  )}&z=16&hl=${locale}&output=embed`;

  return (
    <section className="bg-surface-alt py-12 md:py-24">
      <div className="mb-wrap">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-surface"
        >
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[16/7]">
            <iframe
              src={embedSrc}
              title={t("title")}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0 grayscale-[0.15]"
            />
          </div>

          <div className="flex flex-col gap-3 border-t border-[color:var(--color-border)] p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[color:var(--color-accent)] text-white shadow-[0_12px_28px_-10px_rgba(215,0,15,0.6)]">
                <MapPin className="h-4 w-4" />
              </span>
              <p className="text-sm leading-relaxed text-foreground">
                {info("address.value")}
              </p>
            </div>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-none items-center gap-1.5 self-start rounded-full border border-[color:var(--color-border)] px-4 py-2 text-xs font-semibold tracking-wide text-foreground transition-colors duration-300 hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] sm:self-center"
            >
              {t("openInMaps")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
