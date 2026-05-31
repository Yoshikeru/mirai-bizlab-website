import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/lib/i18n/navigation";

import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";

const NAV_ITEMS = [
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "pricing", href: "/pricing" },
  { key: "cases", href: "/cases" },
  { key: "blog", href: "/blog" },
  { key: "careers", href: "/careers" },
  { key: "contact", href: "/contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const site = useTranslations("site");

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--color-border)]/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-(--container-wide) items-center justify-between gap-6 px-6 md:h-20">
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
            className="h-9 w-auto md:h-10"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 text-sm lg:flex"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="group relative text-[color:var(--color-muted)] transition-colors duration-300 hover:text-foreground"
            >
              <span className="relative">
                {t(item.key)}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 block h-px w-0 bg-[color:var(--color-accent)] transition-all duration-300 group-hover:w-full"
                />
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <LocaleSwitcher />
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
