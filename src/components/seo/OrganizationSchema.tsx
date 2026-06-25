/**
 * Site-wide JSON-LD (@graph): Organization + WebSite.
 * Rendered once per page via layout.tsx. Gives search engines and AI answer
 * engines a stable entity (@id) to reference from page-level Article schema.
 *
 * Ref: https://developers.google.com/search/docs/appearance/structured-data/organization
 */

import { routing } from "@/lib/i18n/routing";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.miraibizlab.co.th"
).replace(/\/$/, "");

export const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const organization = {
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: "MIRAI BizLab Co., Ltd.",
  alternateName: ["MIRAI BizLab", "ミライ ビズラボ", "มิราอิ บิซแล็บ"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/assets/logo/Logo_MIRAI_BizLab1.png`,
  },
  image: `${SITE_URL}/opengraph-image`,
  description:
    "Accounting, tax, company setup, and management support partner for SMEs in Thailand. Trilingual (JP / EN / TH) team based in Samutprakarn, Bangkok area.",
  email: "contact@miraibizlab.co.th",
  telephone: "+66-2-088-8539",
  founder: { "@type": "Person", name: "Takuro Yoshida" },
  foundingDate: "2010-04",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "954/1724 The Metropolis Building, 3rd Floor, Room No. M3, Moo. 9, Thepharak",
    addressLocality: "Muang Samutprakarn",
    addressRegion: "Samutprakarn",
    postalCode: "10270",
    addressCountry: "TH",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+66-2-088-8539",
      contactType: "customer service",
      email: "contact@miraibizlab.co.th",
      availableLanguage: ["Japanese", "English", "Thai"],
      areaServed: "TH",
    },
  ],
  knowsLanguage: ["ja", "en", "th"],
  areaServed: { "@type": "Country", name: "Thailand" },
  serviceType: [
    "Accounting",
    "Tax compliance",
    "Company incorporation",
    "Accounting system implementation",
    "Management support",
  ],
  sameAs: [SITE_URL, "https://lin.ee/yPi5Yoq"],
};

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "MIRAI BizLab",
  inLanguage: [...routing.locales],
  publisher: { "@id": ORG_ID },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [organization, website],
};

export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify provides safe escaping for </script> and similar.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
