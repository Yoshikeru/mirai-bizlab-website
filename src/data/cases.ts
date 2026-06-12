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
  "restaurant-multi-outlet": "/assets/photos/case-hospitality.jpg",
  "beauty-salon-payroll": "/assets/photos/case-salon.jpg",
  "medical-clinic-accounting": "/assets/photos/case-healthcare.jpg",
  "ad-agency-project-pl": "/assets/photos/office-collab.jpg",
  "peak-cloud-accounting": "/assets/photos/case-it.jpg",
  "company-incorporation-fnb": "/assets/photos/office-bangkok.jpg",
  "company-liquidation": "/assets/photos/office-hero.jpg",
};
