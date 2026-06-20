/**
 * Case study slugs and metadata.
 * Localized content (title/summary/industry label etc.) lives in messages/<locale>.json
 * under `home.cases.items` / `cases.items`. This file is the structural index that
 * future CMS migrations should target.
 *
 * NOTE: the order here MUST stay aligned with `home.cases.items` in every locale —
 * both the home carousel and the /cases grid map `items[index]` to `CASE_SLUGS[index]`.
 */
export const CASE_SLUGS = [
  "restaurant-multi-outlet",
  "beauty-salon-payroll",
  "medical-clinic-accounting",
  "ad-agency-project-pl",
  "peak-cloud-accounting",
  "company-incorporation-fnb",
  "company-liquidation",
] as const;

export type CaseSlug = (typeof CASE_SLUGS)[number];

export const CASE_IMAGES: Record<CaseSlug, string> = {
  "restaurant-multi-outlet": "/assets/cases/restaurant-multi-outlet.svg",
  "beauty-salon-payroll": "/assets/cases/beauty-salon-payroll.svg",
  "medical-clinic-accounting": "/assets/cases/medical-clinic-accounting.svg",
  "ad-agency-project-pl": "/assets/cases/ad-agency-project-pl.svg",
  "peak-cloud-accounting": "/assets/cases/peak-cloud-accounting.svg",
  "company-incorporation-fnb": "/assets/cases/company-incorporation-fnb.svg",
  "company-liquidation": "/assets/cases/company-liquidation.svg",
};
