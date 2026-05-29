import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AboutMetrics } from "@/components/sections/AboutMetrics";
import { CasesCarousel } from "@/components/sections/CasesCarousel";
import { CtaSection } from "@/components/sections/CtaSection";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { WhyMirai } from "@/components/sections/WhyMirai";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.hero" });
  return {
    description: t("subtitle"),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <AboutMetrics />
      <Services />
      <WhyMirai />
      <CasesCarousel />
      <Process />
      <CtaSection />
    </>
  );
}
