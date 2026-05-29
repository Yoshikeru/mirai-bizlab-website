import type { MetadataRoute } from "next";

import { getBlogSlugs } from "@/lib/blog";
import { routing } from "@/lib/i18n/routing";

const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://miraibizlab.co.th"
).replace(/\/$/, "");

const STATIC_PATHS = [
  "",
  "/about",
  "/services",
  "/pricing",
  "/cases",
  "/blog",
  "/careers",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: path === "/blog" ? "weekly" : "monthly",
        priority: path === "" ? 1.0 : 0.7,
      });
    }
    for (const slug of getBlogSlugs(locale)) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
