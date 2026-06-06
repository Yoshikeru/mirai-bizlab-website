import type { MetadataRoute } from "next";

import { getBlogSlugs } from "@/lib/blog";
import { routing } from "@/lib/i18n/routing";

const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.miraibizlab.co.th"
).replace(/\/$/, "");

const STATIC_PATHS = [
  "",
  "/about",
  "/services",
  "/cases",
  "/blog",
  "/careers",
  "/contact",
] as const;

/**
 * Build a `languages` object usable for the sitemap's `alternates.languages`,
 * which Next.js serializes as `<xhtml:link rel="alternate" hreflang="…">`.
 */
function makeAlternatesLanguages(path: string): Record<string, string> {
  const langs: Record<string, string> = {};
  for (const locale of routing.locales) {
    langs[locale] = `${BASE_URL}/${locale}${path}`;
  }
  langs["x-default"] = `${BASE_URL}/${routing.defaultLocale}${path}`;
  return langs;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Static routes per locale, with alternates pointing to every translation
  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: path === "/blog" ? "weekly" : "monthly",
        priority: path === "" ? 1.0 : 0.7,
        alternates: { languages: makeAlternatesLanguages(path) },
      });
    }

    // Blog posts (one entry per locale per slug)
    for (const slug of getBlogSlugs(locale)) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages: makeAlternatesLanguages(`/blog/${slug}`) },
      });
    }
  }

  return entries;
}
