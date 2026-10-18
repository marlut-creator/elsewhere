import {
  CAUSE_TAXONOMY,
  type CauseGroup,
  productMatchesCauseSelection,
} from "./causeTaxonomy";
import { products } from "./products";

/** Cause groups that have at least one active catalog product — same filter semantics as Explore. */
export function shopCauseGroupsInCatalog(): CauseGroup[] {
  return (Object.keys(CAUSE_TAXONOMY) as CauseGroup[]).filter((group) =>
    products.some(
      (product) =>
        product.productStatus !== "unavailable" &&
        productMatchesCauseSelection(product.causeTags, group),
    ),
  );
}

export function exploreCauseHref(group: CauseGroup): string {
  return `/explore?cause=${encodeURIComponent(group)}`;
}

export const SHOP_CAUSE_ORDER: CauseGroup[] = [
  "Animals",
  "Environment",
  "Basic Needs",
  "People",
  "Health",
  "Opportunity",
];

export function orderedShopCauseGroups(): CauseGroup[] {
  const available = new Set(shopCauseGroupsInCatalog());
  return SHOP_CAUSE_ORDER.filter((g) => available.has(g));
}
