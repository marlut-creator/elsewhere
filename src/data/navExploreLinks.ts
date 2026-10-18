import { exploreCauseHref, orderedShopCauseGroups } from "./shopCauses";
import { SHOP_CATEGORIES } from "./shopCategories";

/** Mega-menu Explore links → canonical /explore browse routes. */
export const NAV_EXPLORE_LINKS = [
  ...SHOP_CATEGORIES.map((c) => ({
    label: c.label,
    href: c.href,
    category: c.slug,
  })),
  { label: "Surprise me", href: "/explore?surprise=1" as const },
] as const;

export const NAV_CAUSE_LINKS = orderedShopCauseGroups().map((group) => ({
  label: group,
  href: exploreCauseHref(group),
}));
