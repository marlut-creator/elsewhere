import {
  ALL_CAUSE_TAGS,
  CAUSE_TAXONOMY,
  PROMINENT_CAUSE_TAGS,
  productMatchesCauseSelection,
} from "./causeTaxonomy";
import { catalog } from "./catalog";
import {
  givingModelMatchesFilterGroup,
  type GivingFilterGroup,
} from "./givingFilters";
import type { GivingModel, Product } from "./productTypes";

export type { GivingFilterGroup } from "./givingFilters";
export {
  catalogGivingFilterGroups,
  givingFilterGroupLabel,
  GIVING_FILTER_OPTIONS,
} from "./givingFilters";
export type {
  GivingModel,
  Product,
  ProductStatus,
  ResultType,
  VerificationStatus,
} from "./productTypes";

export const products = catalog;

function normalizeText(value: string): string {
  return value.trim().toLowerCase();
}

/** Deterministic query expansion for search (not AI). */
const SEARCH_SYNONYMS: Record<string, string[]> = {
  "hair care": ["shampoo", "hair", "haircare"],
  haircare: ["shampoo", "hair"],
  "body wash": ["soap", "shampoo"],
  "pet snacks": ["pet treats", "dog treats", "treats"],
  "pet food": ["pet treats", "treats"],
  toothpaste: ["personal care", "shampoo"],
  detergent: ["household", "laundry", "cleaning"],
  cleaning: ["household", "dishcloth"],
  tp: ["toilet paper"],
  beverage: ["coffee", "tea"],
  beverages: ["coffee", "tea"],
  "green tea": ["tea", "green"],
  "black tea": ["tea", "black"],
  "herbal tea": ["tea", "herbal"],
  "loose leaf": ["tea"],
  skincare: ["beauty", "shampoo", "soap"],
  "personal care": ["shampoo", "soap", "beauty", "toothpaste"],
  household: ["toilet paper", "cleaning", "detergent"],
};

function expandSearchQuery(query: string): string {
  const q = normalizeText(query);
  const extra = SEARCH_SYNONYMS[q] ?? [];
  if (extra.length === 0) return query;
  return `${query} ${extra.join(" ")}`.trim();
}

function tokenMatchesField(token: string, field: string): boolean {
  const t = normalizeText(token);
  const f = normalizeText(field);
  if (!t || !f) return false;
  if (f === t) return true;
  if (f.includes(t)) return true;
  return t.length >= 3 && f.includes(t);
}

function phraseMatchesTierOne(product: Product, phrase: string): boolean {
  const p = normalizeText(phrase);
  if (!p) return false;

  const category = normalizeText(product.category);
  const subcategory = product.subcategory ? normalizeText(product.subcategory) : "";
  const name = normalizeText(product.productName);

  if (category === p || category.includes(p)) return true;
  if (subcategory && (subcategory === p || subcategory.includes(p))) return true;
  if (name === p || name.includes(p)) return true;

  return product.keywords.some((keyword) => {
    const k = normalizeText(keyword);
    return k === p || k.includes(p) || p.includes(k);
  });
}

function tokenMatchesTierOne(product: Product, token: string): boolean {
  if (tokenMatchesField(token, product.category)) return true;
  if (product.subcategory && tokenMatchesField(token, product.subcategory)) {
    return true;
  }
  if (tokenMatchesField(token, product.productName)) return true;
  return product.keywords.some((keyword) => tokenMatchesField(token, keyword));
}

function tokenMatchesTierTwo(product: Product, token: string): boolean {
  return tokenMatchesField(token, product.brand);
}

function tokenMatchesCause(product: Product, token: string): boolean {
  if (tokenMatchesField(token, product.cause)) return true;
  return product.causeTags.some((tag) => tokenMatchesField(token, tag));
}

function qualifiesForSearch(product: Product, query: string): boolean {
  const q = normalizeText(expandSearchQuery(query));
  if (!q) return false;

  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length === 1) {
    const token = tokens[0]!;
    return (
      tokenMatchesTierOne(product, token) ||
      tokenMatchesTierTwo(product, token) ||
      tokenMatchesCause(product, token)
    );
  }

  if (phraseMatchesTierOne(product, q)) return true;

  const allTokensInTierOne = tokens.every((token) =>
    tokenMatchesTierOne(product, token),
  );
  if (allTokensInTierOne) return true;

  const tierOneOrTwoCount = tokens.filter(
    (token) =>
      tokenMatchesTierOne(product, token) ||
      tokenMatchesTierTwo(product, token),
  ).length;

  if (tierOneOrTwoCount === tokens.length && tierOneOrTwoCount > 0) {
    return tokens.some((token) => tokenMatchesTierOne(product, token));
  }

  return false;
}

export function getProductRelevanceScore(product: Product, query: string): number {
  const expanded = expandSearchQuery(query);
  const q = normalizeText(expanded);
  if (!q || !qualifiesForSearch(product, q)) return 0;

  const tokens = q.split(/\s+/).filter(Boolean);
  let score = 0;

  const category = normalizeText(product.category);
  const subcategory = product.subcategory ? normalizeText(product.subcategory) : "";
  const name = normalizeText(product.productName);
  const brand = normalizeText(product.brand);

  if (product.resultType === "everyday_swap") score += 15;
  if (product.id === "good-store-discovery") score -= 30;

  if (category === q) score += 200;
  if (subcategory === q) score += 190;
  if (phraseMatchesTierOne(product, q)) score += 180;

  for (const keyword of product.keywords) {
    const k = normalizeText(keyword);
    if (k === q) score += 170;
    else if (k.includes(q) || q.includes(k)) score += 140;
  }

  for (const tag of product.causeTags) {
    const t = normalizeText(tag);
    if (t === q) score += 165;
    else if (t.includes(q) || q.includes(t)) score += 120;
  }

  if (name === q) score += 160;
  else if (name.includes(q)) score += 130;

  for (const token of tokens) {
    if (category.includes(token)) score += 24;
    if (subcategory.includes(token)) score += 22;
    if (name.includes(token)) score += 20;
    for (const keyword of product.keywords) {
      if (normalizeText(keyword).includes(token)) score += 18;
    }
    for (const tag of product.causeTags) {
      if (normalizeText(tag).includes(token)) score += 14;
    }
    if (brand.includes(token)) score += 10;
    if (tokenMatchesCause(product, token)) score += 8;
  }

  return score;
}

/** @deprecated Use discoverProducts for Explore results. */
export function searchProducts(query: string): Product[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return products
    .map((product) => ({
      product,
      score: getProductRelevanceScore(product, normalized),
    }))
    .filter(({ score }) => score > 0)
    .sort(
      (a, b) =>
        b.score - a.score || a.product.brand.localeCompare(b.product.brand),
    )
    .map(({ product }) => product);
}

export type PriceBucket = "under-25" | "25-50" | "over-50";

export type SortOption = "best-match" | "price-low" | "price-high";

export function representativeUnitPrice(product: Product): number | null {
  const range = getProductPriceRange(product);
  if (!range) return null;
  if (
    product.priceIsFrom ||
    (product.priceMin != null &&
      product.priceMax != null &&
      product.priceMin !== product.priceMax)
  ) {
    return range.min;
  }
  return range.min;
}

export function getProductPriceRange(
  product: Product,
): { min: number; max: number } | null {
  if (product.priceMin != null || product.priceMax != null) {
    const min = product.priceMin ?? product.priceMax!;
    const max = product.priceMax ?? product.priceMin!;
    return { min, max };
  }
  if (product.priceDisplay) {
    const nums = product.priceDisplay.match(/\d+(?:\.\d+)?/g)?.map(Number);
    if (!nums?.length) return null;
    return { min: Math.min(...nums), max: Math.max(...nums) };
  }
  return null;
}

export function productPriceBucket(product: Product): PriceBucket | null {
  const range = getProductPriceRange(product);
  if (!range) return null;
  if (range.max < 25) return "under-25";
  if (range.min >= 25 && range.max <= 50) return "25-50";
  if (range.min > 50) return "over-50";
  if (range.min < 25 && range.max <= 50) return "under-25";
  return "25-50";
}

export const priceBucketLabels: Record<PriceBucket, string> = {
  "under-25": "Under $25",
  "25-50": "$25–$50",
  "over-50": "Over $50",
};

export const givingModelLabels: Record<GivingModel, string> = {
  percent_profit: "% of profits",
  percent_revenue: "% of sales",
  percent_purchase: "Per purchase",
  item_donation: "Per purchase",
  direct_impact: "Per purchase",
  purchase_linked: "Purchase-linked",
  purchase_linked_unspecified: "Purchase-linked",
  fixed_donation: "Per purchase",
  fixed_donation_or_item: "Per purchase",
  other: "Other",
};

export function givingModelCardHint(model: GivingModel): string | null {
  switch (model) {
    case "percent_profit":
      return "% of profits";
    case "percent_revenue":
      return "% of sales";
    case "percent_purchase":
    case "fixed_donation":
    case "item_donation":
    case "direct_impact":
      return "Per purchase";
    default:
      return null;
  }
}

export function givingModelLabel(model: GivingModel): string {
  return givingModelLabels[model];
}

export function uniqueGivingModels(from: Product[]): GivingModel[] {
  return [...new Set(from.map((p) => p.givingModel))].sort();
}

export function uniquePriceBuckets(from: Product[]): PriceBucket[] {
  const buckets = from
    .map(productPriceBucket)
    .filter((b): b is PriceBucket => b !== null);
  return [...new Set(buckets)].sort();
}

/** Display canonical cause tags on cards (filter taxonomy). */
export function formatCauseTagsForDisplay(product: Product): string {
  if (product.causeTags.length > 0) {
    return product.causeTags.join(" / ");
  }
  return product.cause;
}

export function catalogCauseSelections(): {
  prominent: readonly string[];
  grouped: Record<string, readonly string[]>;
  allTags: string[];
  parentGroups: string[];
} {
  return {
    prominent: PROMINENT_CAUSE_TAGS,
    grouped: CAUSE_TAXONOMY,
    allTags: ALL_CAUSE_TAGS,
    parentGroups: Object.keys(CAUSE_TAXONOMY),
  };
}

export function catalogGivingModels(): GivingModel[] {
  const order: GivingModel[] = [
    "percent_profit",
    "percent_revenue",
    "percent_purchase",
    "fixed_donation",
    "fixed_donation_or_item",
    "item_donation",
    "direct_impact",
    "purchase_linked",
    "purchase_linked_unspecified",
    "other",
  ];
  const present = new Set(uniqueGivingModels(products));
  return order.filter((model) => present.has(model));
}

const PRICE_BUCKET_ORDER: PriceBucket[] = ["under-25", "25-50", "over-50"];

export function catalogPriceBuckets(): PriceBucket[] {
  const present = new Set(uniquePriceBuckets(products));
  return PRICE_BUCKET_ORDER.filter((bucket) => present.has(bucket));
}

export function applyExploreFilters(
  items: Product[],
  filters: {
    cause: string | null;
    price: PriceBucket | null;
    givingFilterGroup: GivingFilterGroup | null;
  },
): Product[] {
  return items.filter((product) => {
    if (
      filters.cause &&
      !productMatchesCauseSelection(product.causeTags, filters.cause)
    ) {
      return false;
    }
    if (
      !givingModelMatchesFilterGroup(
        product.givingModel,
        filters.givingFilterGroup,
      )
    ) {
      return false;
    }
    if (filters.price && productPriceBucket(product) !== filters.price) {
      return false;
    }
    return true;
  });
}
