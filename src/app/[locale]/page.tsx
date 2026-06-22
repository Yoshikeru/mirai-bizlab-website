import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AboutMetrics } from "@/components/sections/AboutMetrics";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { CasesCarousel } from "@/components/sections/CasesCarousel";
import { CtaSection } from "@/components/sections/CtaSection";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { WhyMirai } from "@/components/sections/WhyMirai";
import { getBlogPosts } from "@/lib/blog";
import type { Locale } from "@/lib/i18n/routing";
import { buildAlternates } from "@/lib/seo/alternates";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.hero" });
  return {
    description: t("subtitle"),
    alternates: buildAlternates(locale as Locale, "/"),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const latestPosts = getBlogPosts(locale as Locale).slice(0, 3);

  return (
    <>
      <Hero />
      <Marquee />
      <AboutMetrics />
      <Services />
      <WhyMirai />
      <CasesCarousel />
      <Process />
      <BlogTeaser posts={latestPosts} />
      <CtaSection />
    </>
  );
}
