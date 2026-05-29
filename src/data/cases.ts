/**
 * Case study slugs and metadata.
 * Localized content (title/summary/industry label etc.) lives in messages/<locale>.json
 * under `home.cases.items` / `cases.items`. This file is the structural index that
 * future CMS migrations should target.
 */
export const CASE_SLUGS = [
  "manufacturing-cost-rebuild",
  "wholesale-boi-setup",
  "saas-cross-border-billing",
  "hospitality-store-pl",
  "healthcare-subsidiary",
  "construction-poc-accounting",
] as const;

export type CaseSlug = (typeof CASE_SLUGS)[number];

export const CASE_IMAGES: Record<CaseSlug, string> = {
  "manufacturing-cost-rebuild": "/assets/photos/case-manufacturing.jpg",
  "wholesale-boi-setup": "/assets/photos/case-retail.jpg",
  "saas-cross-border-billing": "/assets/photos/case-it.jpg",
  "hospitality-store-pl": "/assets/photos/case-hospitality.jpg",
  "healthcare-subsidiary": "/assets/photos/case-healthcare.jpg",
  "construction-poc-accounting": "/assets/photos/case-construction.jpg",
};
