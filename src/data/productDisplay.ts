import type { Product } from "./productTypes";

export function isBrandDiscoveryEntry(product: Product): boolean {
  return product.evidenceTier === "C";
}

export function getExploreCardTitle(product: Product): string {
  if (isBrandDiscoveryEntry(product)) {
    return `Explore ${product.brand}`;
  }
  return product.productName;
}

/** Avoid repeating the giving hint inside the claim line when redundant. */
export function formatGivingClaimForCard(
  product: Product,
  hint: string | null,
): string {
  const claim = product.givingClaim.trim();
  if (!hint) return claim;
  const lower = claim.toLowerCase();
  if (hint === "% of profits" && lower.includes("of profits")) return claim;
  if (hint === "% of sales" && (lower.includes("of sales") || lower.includes("revenue"))) {
    return claim;
  }
  if (hint === "Per purchase" && lower.startsWith("every ")) return claim;
  return claim;
}
