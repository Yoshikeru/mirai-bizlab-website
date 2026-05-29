import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactInfo } from "@/components/sections/ContactInfo";
import { ContactMap } from "@/components/sections/ContactMap";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contact" });
  return { title: t("title"), description: t("description") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactContent />;
}

function ContactContent() {
  const t = useTranslations("contact.hero");
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
          { label: pages("contact.title") },
        ]}
      />
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto w-full max-w-(--container-wide) px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <ContactForm />
            </div>
            <div className="md:col-span-5">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
      <ContactMap />
    </>
  );
}
