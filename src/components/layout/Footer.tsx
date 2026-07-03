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

/* Fixed light-on-dark tones: the footer sits on the always-dark contrast panel,
   so it does not follow the light/dark theme tokens. */
const LINK = "text-white/85 transition-colors duration-300 hover:text-[#FF6B72]";
const MUTED = "text-white/50";

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
    <footer className="mb-dark-panel border-t border-white/10">
      <div className="mb-wrap py-12 md:py-20">
        <div className="mb-grid gap-y-12">
          <div className="col-span-12 md:col-span-4">
            <p className="text-base font-bold tracking-tight text-white">
              {site("name")}
            </p>
            <p className={`mt-4 text-sm leading-relaxed ${MUTED}`}>
              {t("tagline")}
            </p>
            <p className={`mt-5 text-xs ${MUTED}`}>{t("address")}</p>
            <ul className="mt-4 flex flex-col gap-1.5 text-xs">
              <li>
                <a href={`mailto:${email}`} className={LINK}>
                  {email}
                </a>
              </li>
              <li>
                <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className={LINK}>
                  {phone}
                </a>
              </li>
              <li className={MUTED}>
                LINE:{" "}
                {lineUrl ? (
                  <a
                    href={lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={LINK}
                  >
                    {line}
                  </a>
                ) : (
                  <span className="text-white/85">{line}</span>
                )}
              </li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="text-xs font-semibold tracking-[0.28em] text-white/40 uppercase">
              {t("services")}
            </p>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {SERVICE_LINKS.map((item) => (
                <li key={item.key}>
                  <Link href={item.href} className={LINK}>
                    {nav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="text-xs font-semibold tracking-[0.28em] text-white/40 uppercase">
              {t("company")}
            </p>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {COMPANY_LINKS.map((item) => (
                <li key={item.key}>
                  <Link href={item.href} className={LINK}>
                    {nav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-2">
            <p className="text-xs font-semibold tracking-[0.28em] text-white/40 uppercase">
              {t("language")}
            </p>
            <div className="mt-5">
              <LocaleSwitcher tone="muted" />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start gap-6 border-t border-white/12 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-5">
            <p className={`text-xs ${MUTED}`}>{t("copyright", { year })}</p>
            <Link
              href="/privacy"
              className={`text-xs ${MUTED} transition-colors duration-300 hover:text-[#FF6B72]`}
            >
              {t("privacy")}
            </Link>
          </div>
          <Image
            src="/assets/logo/Logo_MIRAI_BizLab1.png"
            alt={site("name")}
            width={240}
            height={120}
            className="h-9 w-auto brightness-0 invert opacity-85 md:h-10"
          />
        </div>
      </div>
    </footer>
  );
}
