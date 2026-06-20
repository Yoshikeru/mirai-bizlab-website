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

type RowKey =
  | "phone"
  | "email"
  | "line"
  | "address"
  | "bangkokOffice"
  | "hours";

const ROWS: { key: RowKey; icon: typeof Phone }[] = [
  { key: "phone", icon: Phone },
  { key: "email", icon: Mail },
  { key: "line", icon: MessageSquare },
  { key: "address", icon: MapPin },
  { key: "bangkokOffice", icon: MapPin },
  { key: "hours", icon: Clock },
];

export function ContactInfo() {
  const t = useTranslations("contact.info");

  function getHref(key: RowKey): string | undefined {
    const raw = t(`${key}.value`);
    if (key === "phone") {
      return `tel:${raw.replace(/[^\d+]/g, "")}`;
    }
    if (key === "email") {
      return `mailto:${raw}`;
    }
    if (key === "line") {
      // optional url field — fall back to value when not provided
      try {
        const maybe = t(`line.url`);
        if (maybe) return maybe;
      } catch {
        /* no url present */
      }
      return undefined;
    }
    return undefined;
  }

  return (
    <div className="md:sticky md:top-28">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px 0px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="typo-h3"
      >
        {t("title")}
      </motion.h2>

      <ul className="mt-8 space-y-5">
        {ROWS.map(({ key, icon: Icon }, index) => {
          const value = t(`${key}.value`);
          const href = getHref(key);

          return (
            <motion.li
              key={key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px 0px" }}
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
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http") ? "noopener noreferrer" : undefined
                    }
                    className="mt-1 inline-block text-base text-foreground transition-colors duration-200 hover:text-[color:var(--color-accent)]"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="mt-1 text-base text-foreground">{value}</p>
                )}
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
