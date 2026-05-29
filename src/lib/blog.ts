import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { routing, type Locale } from "@/lib/i18n/routing";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogFrontmatter = {
  title: string;
  slug: string;
  category: "accounting" | "legal" | "expansion" | "trends";
  publishedAt: string;
  excerpt: string;
  readTime: number;
  coverImage?: string;
};

export type BlogPost = BlogFrontmatter & {
  content: string;
};

export function getBlogSlugs(locale: Locale): string[] {
  const dir = path.join(BLOG_DIR, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getBlogPost(locale: Locale, slug: string): BlogPost | null {
  const file = path.join(BLOG_DIR, locale, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogFrontmatter;
  return { ...frontmatter, slug, content };
}

export function getBlogPosts(locale: Locale): BlogPost[] {
  return getBlogSlugs(locale)
    .map((slug) => getBlogPost(locale, slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getAllBlogParams(): Array<{ locale: Locale; slug: string }> {
  return routing.locales.flatMap((locale) =>
    getBlogSlugs(locale).map((slug) => ({ locale, slug })),
  );
}
