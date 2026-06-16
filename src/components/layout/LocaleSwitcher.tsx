"use client";

import { ChevronDown, Globe } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { Link, usePathname } from "@/lib/i18n/navigation";
import { routing, type Locale } from "@/lib/i18n/routing";

export function LocaleSwitcher({
  tone = "default",
}: {
  tone?: "default" | "muted";
}) {
  const t = useTranslations("locale");
  const current = useLocale() as Locale;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointer(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const mutedColor =
    tone === "muted"
      ? "text-[color:var(--color-muted)]"
      : "text-[color:var(--color-muted)]";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={t("label")}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase transition-colors duration-300 hover:text-foreground ${mutedColor}`}
      >
        <Globe className="h-3.5 w-3.5 flex-none" />
        <span>{t(current)}</span>
        <ChevronDown
          className={`h-3 w-3 flex-none transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={t("label")}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full z-50 mt-1.5 min-w-[5.5rem] overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-surface shadow-lg"
          >
            {routing.locales.map((loc) => {
              const isActive = current === loc;
              return (
                <li key={loc} role="option" aria-selected={isActive}>
                  <Link
                    href={pathname}
                    locale={loc}
                    hrefLang={loc}
                    rel="alternate"
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-[0.18em] uppercase transition-colors duration-200 ${
                      isActive
                        ? "bg-[color:var(--color-accent)]/8 text-[color:var(--color-accent)]"
                        : "text-[color:var(--color-muted)] hover:bg-[color:var(--color-border)]/40 hover:text-foreground"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`h-1.5 w-1.5 flex-none rounded-full ${isActive ? "bg-[color:var(--color-accent)]" : "bg-transparent"}`}
                    />
                    {t(loc)}
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
