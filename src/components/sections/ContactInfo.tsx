"use client";

import {
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const ROWS = [
  { key: "phone", icon: Phone },
  { key: "email", icon: Mail },
  { key: "line", icon: MessageSquare },
  { key: "address", icon: MapPin },
  { key: "hours", icon: Clock },
] as const;

export function ContactInfo() {
  const t = useTranslations("contact.info");

  return (
    <div className="md:sticky md:top-28">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="typo-h3"
      >
        {t("title")}
      </motion.h2>

      <ul className="mt-8 space-y-5">
        {ROWS.map(({ key, icon: Icon }, index) => (
          <motion.li
            key={key}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: index * 0.06,
            }}
            className="flex items-start gap-4"
          >
            <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[color:var(--color-accent)]/12">
              <Icon className="h-4 w-4 text-[color:var(--color-accent)]" />
            </span>
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-[color:var(--color-muted)] uppercase">
                {t(`${key}.label`)}
              </p>
              <p className="mt-1 text-base text-foreground">
                {t(`${key}.value`)}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
