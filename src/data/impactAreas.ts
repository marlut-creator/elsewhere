import { isCauseGroup, primaryCauseFamily, type CauseGroup } from "./causeTaxonomy";
import type { Product } from "./productTypes";

/**
 * One canonical impact area per logged product — avoids double-counting
 * overlapping tags (e.g. Cats + Animal Rescue → Animals).
 */
export function canonicalImpactArea(product: Product): string {
  if (product.causeGroup?.trim()) {
    return product.causeGroup.trim();
  }
  const family = primaryCauseFamily(product.causeTags);
  if (family) return family;
  const firstTag = product.causeTags[0];
  if (firstTag?.trim()) return firstTag.trim();
  if (product.cause?.trim()) return product.cause.trim();
  return "Other";
}

/**
 * Concise dashboard label — taxonomy tags unchanged for search/filters.
 * Aggregated areas use the parent group only (no “Cats & Animal Rescue”).
 */
export function dashboardImpactAreaLabel(
  area: string,
  product?: Product,
): string {
  const tags = product ? new Set(product.causeTags) : new Set<string>();

  if (area === "Animals") return "Animal Rescue";

  if (area === "Basic Needs") {
    if (tags.has("Clean Water") || tags.has("Hygiene Access")) {
      return "Clean Water & Sanitation";
    }
    return "Basic Needs";
  }

  if (area === "Environment") {
    if (
      tags.has("Forests & Reforestation") ||
      tags.has("Rainforests")
    ) {
      return "Reforestation";
    }
    if (tags.has("Oceans")) return "Ocean Conservation";
    return "Environment";
  }

  if (area === "Opportunity") return "Education";

  if (area === "People") {
    if (tags.has("Hunger")) return "Hunger & Food Access";
    return "People & Communities";
  }

  if (area === "Health") return "Health";

  return area;
}

/** @deprecated Use dashboardImpactAreaLabel */
export function impactAreaEditorialLabel(
  area: string,
  _productsInArea: Product[],
): string {
  return dashboardImpactAreaLabel(area);
}

export function asCauseGroup(area: string): CauseGroup | null {
  return isCauseGroup(area) ? area : null;
}
