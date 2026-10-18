import { diversifyProductOrder } from "./diversityRanking";
import type { GivingFilterGroup } from "./givingFilters";
import type { Product, SortOption } from "./products";
import {
  applyExploreFilters,
  getProductPriceRange,
  getProductRelevanceScore,
  type PriceBucket,
} from "./products";
import {
  comparisonExcludesShipping,
  getNormalizedProductSpend,
  monthlyToPeriodAmount,
} from "./spendNormalization";
import type { SpendComparisonContext, SpendFrequency } from "./spendingBudget";

export type BudgetFit = "fits" | "close" | "higher" | "unknown";

export type CompactAffordabilityDisplay = {
  variant: "fits" | "over" | "same" | "neutral";
  primary: string;
  secondary: string | null;
  assumptionNote: string | null;
};

const BUDGET_TIER: Record<BudgetFit, number> = {
  fits: 0,
  close: 1,
  higher: 2,
  unknown: 3,
};

function periodSuffix(frequency: SpendFrequency): string {
  return frequency === "week" ? "wk" : frequency === "month" ? "mo" : "yr";
}

function formatPeriodMoney(amount: number, frequency: SpendFrequency): string {
  const abs = Math.abs(amount);
  const rounded =
    abs >= 10 ? Math.round(abs) : Math.round(abs * 10) / 10;
  return `$${rounded}/${periodSuffix(frequency)}`;
}

export function getUserPeriodBudget(context: SpendComparisonContext): number {
  return monthlyToPeriodAmount(context.annualBudget / 12, context.frequency);
}

export function getProductPeriodSpend(
  product: Product,
  frequency: SpendFrequency,
): number | null {
  const normalized = getNormalizedProductSpend(product);
  if (!normalized) return null;
  return monthlyToPeriodAmount(normalized.monthlyEquivalent, frequency);
}

export function classifyBudgetFit(
  product: Product,
  context: SpendComparisonContext,
): BudgetFit {
  const productPeriod = getProductPeriodSpend(product, context.frequency);
  const userPeriod = getUserPeriodBudget(context);
  if (productPeriod == null || userPeriod <= 0) return "unknown";
  if (productPeriod <= userPeriod) return "fits";
  if (productPeriod <= userPeriod * 1.1) return "close";
  return "higher";
}

export function getAffordabilityDisplay(
  product: Product,
  context: SpendComparisonContext | null,
): CompactAffordabilityDisplay | null {
  if (!context || context.annualBudget <= 0) return null;

  const normalized = getNormalizedProductSpend(product);
  if (!normalized) return null;

  const userPeriod = getUserPeriodBudget(context);
  const productPeriod = monthlyToPeriodAmount(
    normalized.monthlyEquivalent,
    context.frequency,
  );
  const delta = productPeriod - userPeriod;
  const beforeShipping = comparisonExcludesShipping(product);
  const shippingSuffix = beforeShipping ? " before shipping" : "";

  let variant: CompactAffordabilityDisplay["variant"] = "neutral";
  let secondary: string | null = null;

  if (Math.abs(delta) < 0.5) {
    variant = "same";
    secondary = "About the same as your usual spend";
  } else if (delta < 0) {
    variant = "fits";
    secondary = `~${formatPeriodMoney(Math.abs(delta), context.frequency)} less than your usual spend`;
  } else {
    variant = "over";
    secondary = `~${formatPeriodMoney(delta, context.frequency)} more than your usual spend`;
  }

  return {
    variant,
    primary: `~${formatPeriodMoney(productPeriod, context.frequency)} estimated${shippingSuffix}`,
    secondary,
    assumptionNote: normalized.cadence.assumptionNote,
  };
}

/** @deprecated Use getNormalizedProductSpend for spend comparison. Kept for annual-impact estimates. */
export function getEstimatedAnnualProductCost(
  product: Product,
): number | null {
  const normalized = getNormalizedProductSpend(product);
  if (!normalized) return null;
  return normalized.monthlyEquivalent * 12;
}

function relevanceBucket(score: number): number {
  return Math.floor(score / 80);
}

export function filterAndSortExploreResults(
  items: Product[],
  filters: {
    cause: string | null;
    price: PriceBucket | null;
    givingFilterGroup: GivingFilterGroup | null;
  },
  sort: SortOption,
  query: string,
  annualBudget: number | null,
  spendContext: SpendComparisonContext | null,
): Product[] {
  const filtered = applyExploreFilters(items, filters);
  return orderExploreResults(
    filtered,
    query,
    sort,
    annualBudget,
    spendContext,
  );
}

export function orderExploreResults(
  items: Product[],
  query: string,
  sort: SortOption,
  annualBudget: number | null,
  spendContext: SpendComparisonContext | null,
): Product[] {
  if (sort === "price-low" || sort === "price-high") {
    return [...items].sort((a, b) => {
      const aPeriod = spendContext
        ? getProductPeriodSpend(a, spendContext.frequency)
        : null;
      const bPeriod = spendContext
        ? getProductPeriodSpend(b, spendContext.frequency)
        : null;
      const aRange = getProductPriceRange(a);
      const bRange = getProductPriceRange(b);
      const aVal = aPeriod ?? aRange?.min ?? null;
      const bVal = bPeriod ?? bRange?.min ?? null;
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      return sort === "price-low" ? aVal - bVal : bVal - aVal;
    });
  }

  let ordered = items;

  if (annualBudget != null && annualBudget > 0 && spendContext) {
    ordered = [...items].sort((a, b) => {
      const scoreA = getProductRelevanceScore(a, query);
      const scoreB = getProductRelevanceScore(b, query);
      const bucketDiff = relevanceBucket(scoreB) - relevanceBucket(scoreA);
      if (bucketDiff !== 0) return bucketDiff;

      const tierA = BUDGET_TIER[classifyBudgetFit(a, spendContext)];
      const tierB = BUDGET_TIER[classifyBudgetFit(b, spendContext)];
      if (tierA !== tierB) return tierA - tierB;

      if (scoreB !== scoreA) return scoreB - scoreA;
      return a.brand.localeCompare(b.brand);
    });
  }

  return diversifyProductOrder(ordered, query);
}
