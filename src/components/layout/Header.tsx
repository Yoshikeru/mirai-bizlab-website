"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Link, usePathname } from "@/lib/i18n/navigation";

import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";

// Main navigation shown in the full-width second row (home lives on the logo).
const NAV_ITEMS = [
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "cases", href: "/cases" },
  { key: "blog", href: "/blog" },
  { key: "careers", href: "/careers" },
  { key: "contact", href: "/contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const site = useTranslations("site");
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--color-border)]/80 bg-background/80 backdrop-blur-md">
      {/* Row 1 — utility bar: logo + language / theme / menu */}
      <div className="mx-auto flex h-16 w-full max-w-(--container-wide) items-center justify-between gap-6 px-6 md:h-[4.75rem]">
        <Link
          href="/"
          aria-label={site("name")}
          className="flex items-center gap-3"
        >
          <Image
            src="/assets/logo/Logo_MIRAI_BizLab1.png"
            alt={site("name")}
            width={220}
            height={110}
            priority
            className="h-9 w-auto md:h-10 dark:brightness-0 dark:invert"
          />
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden sm:flex" />
          <LocaleSwitcher />
          <MobileMenu />
        </div>
      </div>

      {/* Row 2 — full-width primary nav with vertical dividers (desktop) */}
      <nav
        aria-label="Primary"
        className="hidden border-t border-[color:var(--color-border)]/80 lg:block"
      >
        <ul className="mx-auto grid max-w-(--container-wide) grid-cols-6 divide-x divide-[color:var(--color-border)]/80">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.key}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative flex items-center justify-center px-2 py-4 text-center text-[13px] font-semibold tracking-wide transition-colors duration-200 ${
                    active
                      ? "text-[color:var(--color-accent)]"
                      : "text-foreground hover:text-[color:var(--color-accent)]"
                  }`}
                >
                  {t(item.key)}
                  {/* top accent bar on hover / active */}
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 top-0 h-0.5 bg-[color:var(--color-accent)] transition-transform duration-300 ${
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
