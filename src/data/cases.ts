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
  "trading-setup-import-export",
  "trading-inventory-credit",
  "office-regional-hq",
  "office-rep-to-subsidiary",
  "firm-back-office-bpo",
  "beauty-clinic-multistore",
] as const;

export type CaseSlug = (typeof CASE_SLUGS)[number];

export const CASE_IMAGES: Record<CaseSlug, string> = {
  "trading-setup-import-export": "/assets/photos/case-retail.jpg",
  "trading-inventory-credit": "/assets/photos/case-manufacturing.jpg",
  "office-regional-hq": "/assets/photos/office-hero.jpg",
  "office-rep-to-subsidiary": "/assets/photos/office-bangkok.jpg",
  "firm-back-office-bpo": "/assets/photos/office-collab.jpg",
  "beauty-clinic-multistore": "/assets/photos/case-healthcare.jpg",
};
