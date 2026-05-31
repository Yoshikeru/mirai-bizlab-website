import { routing, type Locale } from "@/lib/i18n/routing";

/**
 * Build the `alternates` block for a Next.js Metadata object so that
 * Google receives a correct set of hreflang links plus an x-default.
 *
 * @param locale  Current locale of the page being rendered.
 * @param path    Path *without* the locale prefix, must start with "/".
 *                Use "/" for the home page.
 */
export function buildAlternates(locale: Locale, path: string) {
  const cleanPath = path === "/" ? "" : path.replace(/^\/+/, "/").replace(/\/+$/, "");
  const canonical = `/${locale}${cleanPath}`;

  // Per-locale URLs
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `/${l}${cleanPath}`]),
  );

  // x-default points to the site's default locale (ja)
  languages["x-default"] = `/${routing.defaultLocale}${cleanPath}`;

  return { canonical, languages };
}
