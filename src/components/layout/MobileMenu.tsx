"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Link } from "@/lib/i18n/navigation";

import { LocaleSwitcher } from "./LocaleSwitcher";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "pricing", href: "/pricing" },
  { key: "cases", href: "/cases" },
  { key: "blog", href: "/blog" },
  { key: "careers", href: "/careers" },
  { key: "contact", href: "/contact" },
] as const;

export function MobileMenu() {
  const t = useTranslations("nav");
  const contact = useTranslations("contact.info");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border)] text-foreground transition-colors duration-200 hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] lg:hidden"
      >
        <Menu className="h-5 w-5" aria-hidden />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu-overlay"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-background lg:hidden"
          >
            <div className="flex h-16 items-center justify-between border-b border-[color:var(--color-border)]/80 px-6">
              <span className="typo-eyebrow">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border)] text-foreground transition-colors duration-200 hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <nav
              aria-label="Mobile primary"
              className="flex-1 overflow-y-auto px-6 py-8"
            >
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map((item, index) => (
                  <motion.li
                    key={item.key}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.04 * index,
                    }}
                  >
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between border-b border-[color:var(--color-border)]/60 py-4"
                    >
                      <span className="text-2xl font-bold tracking-tight text-foreground transition-colors duration-200 group-hover:text-[color:var(--color-accent)]">
                        {t(item.key)}
                      </span>
                      <span
                        aria-hidden
                        className="text-[color:var(--color-muted)] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[color:var(--color-accent)]"
                      >
                        →
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-4 text-sm">
                <p className="typo-eyebrow">Contact</p>
                <a
                  href={`tel:${contact("phone.value").replace(/[^\d+]/g, "")}`}
                  className="text-foreground transition-colors duration-200 hover:text-[color:var(--color-accent)]"
                >
                  {contact("phone.value")}
                </a>
                <a
                  href={`mailto:${contact("email.value")}`}
                  className="text-foreground transition-colors duration-200 hover:text-[color:var(--color-accent)]"
                >
                  {contact("email.value")}
                </a>
              </div>
            </nav>

            <div className="border-t border-[color:var(--color-border)]/80 px-6 py-5">
              <div className="flex items-center justify-between">
                <p className="typo-eyebrow text-[color:var(--color-muted)]">
                  Language
                </p>
                <LocaleSwitcher />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
