import { getLocale, getTranslations } from "next-intl/server";

import { NotFoundSection } from "@/components/sections/NotFoundSection";

export default async function NotFoundPage() {
  // next-intl reads locale from the middleware request header
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <NotFoundSection
      title={t("title")}
      description={t("description")}
      fun={t("fun")}
      button={t("button")}
    />
  );
}
