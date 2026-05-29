import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/layout/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { PricingFAQ } from "@/components/sections/PricingFAQ";
import { PricingPlans } from "@/components/sections/PricingPlans";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.pricing" });
  return { title: t("title"), description: t("description") };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PricingContent />;
}

function PricingContent() {
  const t = useTranslations("pricing.hero");
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
          { label: pages("pricing.title") },
        ]}
      />
      <PricingPlans />
      <PricingFAQ />
      <CtaSection />
    </>
  );
}
