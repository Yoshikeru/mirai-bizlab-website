import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/layout/PageHero";
import { CareersNotice } from "@/components/sections/CareersNotice";
import { CareersOffice } from "@/components/sections/CareersOffice";
import { CareersPositions } from "@/components/sections/CareersPositions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.careers" });
  return { title: t("title"), description: t("description") };
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CareersContent />;
}

function CareersContent() {
  const t = useTranslations("careers.hero");
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
          { label: pages("careers.title") },
        ]}
      />
      <CareersNotice />
      <CareersOffice />
      <CareersPositions />
    </>
  );
}
