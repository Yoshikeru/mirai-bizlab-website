"use client";

import { useLocale, useTranslations } from "next-intl";
import { Fragment } from "react";

import { Link, usePathname } from "@/lib/i18n/navigation";
import { routing, type Locale } from "@/lib/i18n/routing";

/**
 * Locale switcher rendered as anchor links so search engines can follow
 * each language. Each link carries the proper `hreflang` and
 * `rel="alternate"` attributes for SEO.
 */
export function LocaleSwitcher({
  tone = "default",
}: {
  tone?: "default" | "muted";
}) {
  const t = useTranslations("locale");
  const current = useLocale() as Locale;
  const pathname = usePathname();

  const baseColor =
    tone === "muted"
      ? "text-[color:var(--color-muted)]"
      : "text-[color:var(--color-muted)]";

  return (
    <div
      className="flex items-center gap-1 text-xs font-semibold tracking-[0.18em] uppercase"
      role="group"
      aria-label={t("label")}
    >
      {routing.locales.map((loc, index) => (
        <Fragment key={loc}>
          {index > 0 ? (
            <span aria-hidden className="text-[color:var(--color-border)]">
              /
            </span>
          ) : null}
          <Link
            href={pathname}
            locale={loc}
            hrefLang={loc}
            rel="alternate"
            aria-current={current === loc ? "true" : undefined}
            className={`px-2 py-1 transition-colors duration-300 ${
              current === loc
                ? "text-foreground"
                : `${baseColor} hover:text-foreground`
            }`}
          >
            {t(loc)}
          </Link>
        </Fragment>
      ))}
    </div>
  );
}
