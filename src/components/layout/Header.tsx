"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Link, usePathname } from "@/lib/i18n/navigation";

import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";

// Main navigation shown in the full-width second row (home lives on the logo).
const NAV_ITEMS = [
  { key: "services", href: "/services" },
  { key: "cases", href: "/cases" },
  { key: "blog", href: "/blog" },
  { key: "careers", href: "/careers" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const site = useTranslations("site");
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--color-border)]/70 bg-background/80 backdrop-blur-md">
      {/* Single row — logo / primary nav / controls. Whitespace does the separating. */}
      <div className="mb-wrap flex h-16 items-center gap-6 md:h-[4.75rem]">
        <Link
          href="/"
          aria-label={site("name")}
          className="flex flex-none items-center gap-3"
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

        <nav aria-label="Primary" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-7 xl:gap-9">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative py-2 text-[13px] font-medium tracking-wide whitespace-nowrap transition-colors duration-300 ${
                      active
                        ? "text-[color:var(--color-accent)]"
                        : "text-foreground/75 hover:text-foreground"
                    }`}
                  >
                    {t(item.key)}
                    {/* hairline underline slides in from the left */}
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 bottom-0 h-px origin-left bg-[color:var(--color-accent)] transition-transform duration-300 ease-out ${
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

        <div className="ml-auto flex flex-none items-center gap-3 lg:ml-0 lg:pl-4">
          <ThemeToggle className="hidden sm:flex" />
          <LocaleSwitcher />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
