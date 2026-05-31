import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/layout/PageHero";
import { CasesGrid } from "@/components/sections/CasesGrid";
import { CtaSection } from "@/components/sections/CtaSection";
import type { Locale } from "@/lib/i18n/routing";
import { buildAlternates } from "@/lib/seo/alternates";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.cases" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale as Locale, "/cases"),
  };
}

export default async function CasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CasesContent />;
}

function CasesContent() {
  const t = useTranslations("cases.hero");
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
          { label: pages("cases.title") },
        ]}
      />
      <CasesGrid />
      <CtaSection />
    </>
  );
}
