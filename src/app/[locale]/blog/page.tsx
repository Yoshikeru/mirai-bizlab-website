import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/layout/PageHero";
import { BlogList } from "@/components/sections/BlogList";
import { CtaSection } from "@/components/sections/CtaSection";
import { BlogVisual } from "@/components/visuals/BlogVisual";
import { getBlogPosts } from "@/lib/blog";
import { type Locale } from "@/lib/i18n/routing";
import { buildAlternates } from "@/lib/seo/alternates";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.blog" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale as Locale, "/blog"),
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = getBlogPosts(locale as Locale);

  return <BlogPageContent posts={posts} />;
}

function BlogPageContent({
  posts,
}: {
  posts: ReturnType<typeof getBlogPosts>;
}) {
  const t = useTranslations("blog.hero");
  const common = useTranslations("common");
  const pages = useTranslations("pages");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        breadcrumb={[
          { label: common("home"), href: "/" },
          { label: pages("blog.title") },
        ]}
        rightSlot={<BlogVisual />}
      />
      <BlogList posts={posts} />
      <CtaSection />
    </>
  );
}
