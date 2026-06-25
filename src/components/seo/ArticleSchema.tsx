/**
 * Per-article JSON-LD (@graph): BlogPosting + BreadcrumbList.
 * Helps search engines and AI answer engines attribute, date, and cite the post.
 */

import { ORG_ID } from "@/components/seo/OrganizationSchema";
import type { BlogPost } from "@/lib/blog";
import type { Locale } from "@/lib/i18n/routing";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.miraibizlab.co.th"
).replace(/\/$/, "");

export function ArticleSchema({
  post,
  locale,
  homeLabel,
  blogLabel,
}: {
  post: BlogPost;
  locale: Locale;
  homeLabel: string;
  blogLabel: string;
}) {
  const pageUrl = `${SITE_URL}/${locale}/blog/${post.slug}`;
  const blogUrl = `${SITE_URL}/${locale}/blog`;
  const homeUrl = `${SITE_URL}/${locale}`;
  const image = post.coverImage
    ? `${SITE_URL}${post.coverImage}`
    : `${SITE_URL}/opengraph-image`;

  const article = {
    "@type": "BlogPosting",
    "@id": `${pageUrl}#article`,
    headline: post.title,
    description: post.excerpt,
    inLanguage: locale,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image,
    articleSection: post.category,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    url: pageUrl,
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeLabel, item: homeUrl },
      { "@type": "ListItem", position: 2, name: blogLabel, item: blogUrl },
      { "@type": "ListItem", position: 3, name: post.title, item: pageUrl },
    ],
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [article, breadcrumb],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
