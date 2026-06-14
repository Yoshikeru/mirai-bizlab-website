import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/lib/i18n/navigation";

import { LocaleSwitcher } from "./LocaleSwitcher";

const SERVICE_LINKS = [
  { key: "services", href: "/services" },
  { key: "cases", href: "/cases" },
] as const;

const COMPANY_LINKS = [
  { key: "about", href: "/about" },
  { key: "blog", href: "/blog" },
  { key: "careers", href: "/careers" },
  { key: "contact", href: "/contact" },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const site = useTranslations("site");
  const contactInfo = useTranslations("contact.info");
  const year = new Date().getFullYear();

  const email = contactInfo("email.value");
  const phone = contactInfo("phone.value");
  const line = contactInfo("line.value");
  const lineUrl = (() => {
    try {
      return contactInfo("line.url");
    } catch {
      return "";
    }
  })();

  return (
    <footer className="border-t border-[color:var(--color-border)] bg-background">
      <div className="mb-wrap py-12 md:py-20">
        <div className="mb-grid gap-y-12">
          <div className="col-span-12 md:col-span-4">
            <p className="text-base font-bold tracking-tight">{site("name")}</p>
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-muted)]">
              {t("tagline")}
            </p>
            <p className="mt-5 text-xs text-[color:var(--color-muted)]">
              {t("address")}
            </p>
            <ul className="mt-4 flex flex-col gap-1.5 text-xs">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="text-foreground transition-colors duration-300 hover:text-[color:var(--color-accent)]"
                >
                  {email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                  className="text-foreground transition-colors duration-300 hover:text-[color:var(--color-accent)]"
                >
                  {phone}
                </a>
              </li>
              <li className="text-[color:var(--color-muted)]">
                LINE:{" "}
                {lineUrl ? (
                  <a
                    href={lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground transition-colors duration-300 hover:text-[color:var(--color-accent)]"
                  >
                    {line}
                  </a>
                ) : (
                  <span className="text-foreground">{line}</span>
                )}
              </li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="text-xs font-semibold tracking-[0.28em] text-[color:var(--color-muted)] uppercase">
              {t("services")}
            </p>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {SERVICE_LINKS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-foreground transition-colors duration-300 hover:text-[color:var(--color-accent)]"
                  >
                    {nav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="text-xs font-semibold tracking-[0.28em] text-[color:var(--color-muted)] uppercase">
              {t("company")}
            </p>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {COMPANY_LINKS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-foreground transition-colors duration-300 hover:text-[color:var(--color-accent)]"
                  >
                    {nav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-2">
            <p className="text-xs font-semibold tracking-[0.28em] text-[color:var(--color-muted)] uppercase">
              {t("language")}
            </p>
            <div className="mt-5">
              <LocaleSwitcher tone="muted" />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start gap-6 border-t border-[color:var(--color-border)] pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-5">
            <p className="text-xs text-[color:var(--color-muted)]">
              {t("copyright", { year })}
            </p>
            <Link
              href="/privacy"
              className="text-xs text-[color:var(--color-muted)] transition-colors duration-300 hover:text-[color:var(--color-accent)]"
            >
              {t("privacy")}
            </Link>
          </div>
          <Image
            src="/assets/logo/Logo_MIRAI_BizLab1.png"
            alt={site("name")}
            width={240}
            height={120}
            className="h-9 w-auto md:h-10 dark:brightness-0 dark:invert"
          />
        </div>
      </div>
    </footer>
  );
}
