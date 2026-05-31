import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/layout/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { AboutMessage } from "@/components/sections/AboutMessage";
import { AboutInfo } from "@/components/sections/AboutInfo";
import { AboutMVV } from "@/components/sections/AboutMVV";
import { RubikCube3D } from "@/components/visuals/RubikCube3D";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.about" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutPageContent />;
}

function AboutPageContent() {
  const t = useTranslations("about.hero");
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
          { label: pages("about.title") },
        ]}
        watermark={false}
        rightSlot={<RubikCube3D />}
      />
      <AboutMessage />
      <AboutInfo />
      <AboutMVV />
      <CtaSection />
    </>
  );
}
