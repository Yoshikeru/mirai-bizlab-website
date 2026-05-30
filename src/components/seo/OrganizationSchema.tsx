/**
 * JSON-LD Organization schema for SEO / Knowledge Graph.
 * Rendered once per page via layout.tsx.
 *
 * Reference: https://developers.google.com/search/docs/appearance/structured-data/organization
 */

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://miraibizlab.co.th"
).replace(/\/$/, "");

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "MIRAI BizLab Co., Ltd.",
  alternateName: ["MIRAI BizLab", "ミライ ビズラボ", "มิราอิ บิซแล็บ"],
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logo/Logo_MIRAI_BizLab1.png`,
  image: `${SITE_URL}/opengraph-image`,
  description:
    "Accounting, tax, company setup, and management consulting partner for Japanese SMEs in Thailand. Trilingual (JP / EN / TH) team based in Samutprakarn, Bangkok area.",
  founder: {
    "@type": "Person",
    name: "Takuro Yoshida",
  },
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
  areaServed: {
    "@type": "Country",
    name: "Thailand",
  },
  serviceType: [
    "Accounting",
    "Tax compliance",
    "Company incorporation",
    "Accounting system implementation",
    "Management consulting",
  ],
  sameAs: [SITE_URL],
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
