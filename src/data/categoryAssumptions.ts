import type { Product } from "./products";

export type CategoryPurchaseAssumption = {
  purchasesPerYear: number;
  assumptionNote: string;
};

/** Prototype purchase-frequency assumptions by category (editable later). */
const CATEGORY_ASSUMPTIONS: Record<string, CategoryPurchaseAssumption> = {
  coffee: {
    purchasesPerYear: 12,
    assumptionNote: "Estimate assumes 1 bag/month",
  },
  "toilet paper": {
    purchasesPerYear: 4,
    assumptionNote:
      "Estimate assumes one 24-roll box lasts about 3 months (~4 boxes/year)",
  },
  shampoo: {
    purchasesPerYear: 6,
    assumptionNote: "Estimate assumes 1 bottle every 2 months",
  },
  "dog treats": {
    purchasesPerYear: 12,
    assumptionNote: "Estimate assumes 1 bag/month",
  },
  socks: {
    purchasesPerYear: 4,
    assumptionNote: "Estimate assumes 4 items/year",
  },
  clothing: {
    purchasesPerYear: 4,
    assumptionNote: "Estimate assumes 4 items/year",
  },
  eyewear: {
    purchasesPerYear: 1,
    assumptionNote: "Estimate assumes 1 pair/year",
  },
  books: {
    purchasesPerYear: 6,
    assumptionNote: "Estimate assumes 6 books/year",
  },
  beauty: {
    purchasesPerYear: 4,
    assumptionNote: "Estimate assumes 4 items/year",
  },
  bags: {
    purchasesPerYear: 2,
    assumptionNote: "Estimate assumes 2 bags/year",
  },
  household: {
    purchasesPerYear: 6,
    assumptionNote: "Estimate assumes 6 items/year",
  },
};

export function getCategoryPurchaseAssumption(
  product: Product,
): CategoryPurchaseAssumption | null {
  const category = product.category.toLowerCase();
  return CATEGORY_ASSUMPTIONS[category] ?? null;
}
