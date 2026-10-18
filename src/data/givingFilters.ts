import type { GivingModel, Product } from "./productTypes";

export type GivingFilterGroup =
  | "per_purchase"
  | "percent_sales"
  | "percent_profit"
  | "other_verified";

export const GIVING_FILTER_OPTIONS: {
  id: GivingFilterGroup | null;
  label: string;
}[] = [
  { id: null, label: "All giving models" },
  { id: "per_purchase", label: "Per purchase" },
  { id: "percent_sales", label: "% of sales" },
  { id: "percent_profit", label: "% of profits" },
  { id: "other_verified", label: "Other verified giving" },
];

const PER_PURCHASE: GivingModel[] = [
  "percent_purchase",
  "fixed_donation",
  "item_donation",
  "direct_impact",
  "fixed_donation_or_item",
];

const PERCENT_SALES: GivingModel[] = ["percent_revenue"];

const PERCENT_PROFIT: GivingModel[] = ["percent_profit"];

const OTHER_VERIFIED: GivingModel[] = [
  "purchase_linked",
  "purchase_linked_unspecified",
  "other",
];

export function givingModelMatchesFilterGroup(
  model: GivingModel,
  group: GivingFilterGroup | null,
): boolean {
  if (!group) return true;
  switch (group) {
    case "per_purchase":
      return PER_PURCHASE.includes(model);
    case "percent_sales":
      return PERCENT_SALES.includes(model);
    case "percent_profit":
      return PERCENT_PROFIT.includes(model);
    case "other_verified":
      return OTHER_VERIFIED.includes(model);
    default:
      return true;
  }
}

export function catalogGivingFilterGroups(
  from: Product[],
): (GivingFilterGroup | null)[] {
  const present = new Set<GivingFilterGroup>();
  for (const p of from) {
    for (const opt of GIVING_FILTER_OPTIONS) {
      if (opt.id && givingModelMatchesFilterGroup(p.givingModel, opt.id)) {
        present.add(opt.id);
      }
    }
  }
  return GIVING_FILTER_OPTIONS.filter(
    (opt) => opt.id === null || present.has(opt.id),
  ).map((opt) => opt.id);
}

export function givingFilterGroupLabel(group: GivingFilterGroup | null): string {
  return (
    GIVING_FILTER_OPTIONS.find((opt) => opt.id === group)?.label ??
    "Giving model"
  );
}
