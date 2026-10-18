import { getCategoryPurchaseAssumption } from "./categoryAssumptions";
import type { Product } from "./productTypes";
import { representativeUnitPrice } from "./products";
import type { SpendFrequency } from "./spendingBudget";

export type SpendCadence = {
  monthsPerPurchase: number;
  assumptionNote: string;
  source: "product" | "category";
};

export type NormalizedProductSpend = {
  /** Listed pack price used (excludes unknown shipping). */
  packPrice: number;
  monthlyEquivalent: number;
  cadence: SpendCadence;
  shippingFlat: number | null;
  shippingKnown: boolean;
};

export function getSpendCadence(product: Product): SpendCadence | null {
  if (
    product.supplyMonthsPerPurchase != null &&
    product.supplyMonthsPerPurchase > 0 &&
    product.supplyAssumptionNote?.trim()
  ) {
    return {
      monthsPerPurchase: product.supplyMonthsPerPurchase,
      assumptionNote: product.supplyAssumptionNote.trim(),
      source: "product",
    };
  }

  const category = getCategoryPurchaseAssumption(product);
  if (!category || category.purchasesPerYear <= 0) return null;

  const monthsPerPurchase = 12 / category.purchasesPerYear;
  return {
    monthsPerPurchase,
    assumptionNote: category.assumptionNote,
    source: "category",
  };
}

export function getNormalizedProductSpend(
  product: Product,
): NormalizedProductSpend | null {
  const cadence = getSpendCadence(product);
  const packPrice = representativeUnitPrice(product);
  if (!cadence || packPrice == null || cadence.monthsPerPurchase <= 0) {
    return null;
  }

  const monthlyEquivalent = packPrice / cadence.monthsPerPurchase;
  const shippingFlat =
    product.shippingMode === "flat" && product.shippingFlat != null
      ? product.shippingFlat
      : null;

  return {
    packPrice,
    monthlyEquivalent,
    cadence,
    shippingFlat,
    shippingKnown: product.shippingMode != null,
  };
}

export function monthlyToPeriodAmount(
  monthly: number,
  frequency: SpendFrequency,
): number {
  switch (frequency) {
    case "week":
      return (monthly * 12) / 52;
    case "month":
      return monthly;
    case "year":
      return monthly * 12;
  }
}

export function formatUnitPrice(product: Product): string | null {
  const price = representativeUnitPrice(product);
  if (
    price == null ||
    product.packQuantity == null ||
    product.packQuantity <= 0 ||
    !product.packUnitLabel?.trim()
  ) {
    return null;
  }
  const unit = price / product.packQuantity;
  const rounded = unit >= 10 ? Math.round(unit * 100) / 100 : Math.round(unit * 100) / 100;
  const label = product.packUnitLabel.trim().toLowerCase();
  return `$${rounded.toLocaleString("en-US", { minimumFractionDigits: rounded % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })} / ${label}`;
}

export function formatShippingLine(product: Product): string | null {
  if (product.shippingMode === "flat" && product.shippingFlat != null) {
    return `$${product.shippingFlat.toLocaleString("en-US", { minimumFractionDigits: product.shippingFlat % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })} shipping`;
  }
  if (
    product.shippingMode === "free_threshold" &&
    product.shippingFreeThreshold != null
  ) {
    return `Free shipping over $${product.shippingFreeThreshold.toLocaleString("en-US")}`;
  }
  if (product.shippingMode === "seller_calculated") {
    return product.shippingNote?.trim() || "Shipping calculated by seller";
  }
  if (product.shippingNote?.trim()) {
    return product.shippingNote.trim();
  }
  return null;
}

export function comparisonExcludesShipping(product: Product): boolean {
  if (product.shippingMode === "flat" && product.shippingFlat != null) {
    return false;
  }
  return product.shippingMode !== "flat";
}
