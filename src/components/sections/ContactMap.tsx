"use client";

import { MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export function ContactMap() {
  const t = useTranslations("contact.map");
  const info = useTranslations("contact.info");

  return (
    <section className="bg-surface-alt py-20 md:py-24">
      <div className="mx-auto w-full max-w-(--container-wide) px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-surface"
        >
          <div className="relative aspect-[16/7] w-full">
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(0,0,0,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.4)_1px,transparent_1px)] [background-size:48px_48px]"
            />
            <div
              aria-hidden
              className="absolute inset-0 [background:radial-gradient(circle_at_60%_50%,rgba(215,0,15,0.08),transparent_60%)]"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--color-accent)] text-white shadow-[0_18px_40px_-12px_rgba(215,0,15,0.6)]">
                <MapPin className="h-5 w-5" />
              </span>
              <p className="text-xs font-medium tracking-[0.24em] text-[color:var(--color-muted)] uppercase">
                {t("placeholder")}
              </p>
              <p className="text-sm text-foreground">{info("address.value")}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
