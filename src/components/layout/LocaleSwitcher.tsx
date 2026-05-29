"use client";

import { useLocale, useTranslations } from "next-intl";
import { Fragment, useTransition } from "react";

import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { routing, type Locale } from "@/lib/i18n/routing";

export function LocaleSwitcher({
  tone = "default",
}: {
  tone?: "default" | "muted";
}) {
  const t = useTranslations("locale");
  const current = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function setLocale(next: Locale) {
    if (next === current) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

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
          <button
            type="button"
            onClick={() => setLocale(loc)}
            disabled={isPending}
            aria-current={current === loc}
            className={`px-2 py-1 transition-colors duration-300 disabled:opacity-60 ${
              current === loc
                ? "text-foreground"
                : `${baseColor} hover:text-foreground`
            }`}
          >
            {t(loc)}
          </button>
        </Fragment>
      ))}
    </div>
  );
}
