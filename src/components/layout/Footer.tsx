import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/lib/i18n/navigation";

import { LocaleSwitcher } from "./LocaleSwitcher";

const SERVICE_LINKS = [
  { key: "services", href: "/services" },
  { key: "pricing", href: "/pricing" },
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

  return (
    <footer className="border-t border-[color:var(--color-border)] bg-background">
      <div className="mx-auto w-full max-w-(--container-wide) px-6 py-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 md:gap-10">
          <div className="col-span-2 md:col-span-1">
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
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="text-foreground transition-colors duration-300 hover:text-[color:var(--color-accent)]"
                >
                  {phone}
                </a>
              </li>
              <li className="text-[color:var(--color-muted)]">
                LINE: <span className="text-foreground">{line}</span>
              </li>
            </ul>
          </div>

          <div>
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

          <div>
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

          <div>
            <p className="text-xs font-semibold tracking-[0.28em] text-[color:var(--color-muted)] uppercase">
              {t("language")}
            </p>
            <div className="mt-5">
              <LocaleSwitcher tone="muted" />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start gap-6 border-t border-[color:var(--color-border)] pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-[color:var(--color-muted)]">
            {t("copyright", { year })}
          </p>
          <Image
            src="/assets/logo/Logo_MIRAI_BizLab1.png"
            alt={site("name")}
            width={240}
            height={120}
            className="h-9 w-auto md:h-10"
          />
        </div>
      </div>
    </footer>
  );
}
