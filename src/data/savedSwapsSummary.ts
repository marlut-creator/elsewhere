import { getEstimatedAnnualProductCost } from "./affordability";
import type { Product } from "./productTypes";

export type SavedSwapsSummary = {
  swapCount: number;
  causeCount: number;
  redirectedAnnual: number | null;
};

export function computeSavedSwapsSummary(
  savedProducts: Product[],
): SavedSwapsSummary {
  const causeTags = new Set<string>();
  let redirectedAnnual = 0;
  let hasRedirected = false;

  for (const product of savedProducts) {
    for (const tag of product.causeTags) {
      causeTags.add(tag);
    }
    const annualCost = getEstimatedAnnualProductCost(product);
    if (annualCost != null) {
      redirectedAnnual += annualCost;
      hasRedirected = true;
    }
  }

  return {
    swapCount: savedProducts.length,
    causeCount: causeTags.size,
    redirectedAnnual: hasRedirected ? redirectedAnnual : null,
  };
}
