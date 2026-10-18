import type { BrowseCategorySlug } from "./browseCategories";

export type ShopCategoryDef = {
  slug: BrowseCategorySlug;
  label: string;
  shortLabel: string;
  examples: string;
  href: string;
  /** Shown in mega-menu / tiles */
  menuOrder: number;
};

/** Canonical shop-by-category definitions (URL + copy). */
export const SHOP_CATEGORIES: ShopCategoryDef[] = [
  {
    slug: "everyday",
    label: "Everyday goods",
    shortLabel: "Everyday",
    examples: "Coffee · soap · socks · household essentials",
    href: "/explore?category=everyday",
    menuOrder: 0,
  },
  {
    slug: "coffee-tea",
    label: "Coffee & Tea",
    shortLabel: "Coffee & tea",
    examples: "Coffee · black tea · green tea · herbal tea",
    href: "/explore?category=coffee-tea",
    menuOrder: 1,
  },
  {
    slug: "personal-care",
    label: "Personal Care",
    shortLabel: "Personal care",
    examples: "Soap · shampoo · toothpaste · skincare",
    href: "/explore?category=personal-care",
    menuOrder: 2,
  },
  {
    slug: "household",
    label: "Household",
    shortLabel: "Household",
    examples: "Toilet paper · cleaning · detergent",
    href: "/explore?category=household",
    menuOrder: 3,
  },
  {
    slug: "clothing",
    label: "Clothing",
    shortLabel: "Clothing",
    examples: "Socks · basics · everyday apparel",
    href: "/explore?category=clothing",
    menuOrder: 4,
  },
  {
    slug: "pets",
    label: "Pets",
    shortLabel: "Pets",
    examples: "Treats · grooming · everyday pet goods",
    href: "/explore?category=pets",
    menuOrder: 5,
  },
  {
    slug: "food-snacks",
    label: "Food & Snacks",
    shortLabel: "Food & snacks",
    examples: "Pantry · snacks · meal-support goods",
    href: "/explore?category=food-snacks",
    menuOrder: 6,
  },
];

export const MEGA_MENU_CATEGORIES = SHOP_CATEGORIES.filter(
  (c) => c.slug !== "everyday",
).sort((a, b) => a.menuOrder - b.menuOrder);

export const TILE_CATEGORIES = SHOP_CATEGORIES.filter(
  (c) => c.slug !== "everyday",
).sort((a, b) => a.menuOrder - b.menuOrder);

export function shopCategoryBySlug(
  slug: BrowseCategorySlug,
): ShopCategoryDef | undefined {
  return SHOP_CATEGORIES.find((c) => c.slug === slug);
}
