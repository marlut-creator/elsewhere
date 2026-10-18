import type { Product } from "./productTypes";

/** URL slug → catalog browse group (not keyword search). */
export const BROWSE_CATEGORY_SLUGS = [
  "everyday",
  "coffee-tea",
  "personal-care",
  "household",
  "clothing",
  "pets",
  "food-snacks",
] as const;

export type BrowseCategorySlug = (typeof BROWSE_CATEGORY_SLUGS)[number];

const SLUG_LABELS: Record<BrowseCategorySlug, string> = {
  everyday: "everyday goods",
  "coffee-tea": "coffee & tea",
  "personal-care": "personal care",
  household: "household",
  clothing: "clothing",
  pets: "pets",
  "food-snacks": "food & snacks",
};

export function isBrowseCategorySlug(value: string): value is BrowseCategorySlug {
  return (BROWSE_CATEGORY_SLUGS as readonly string[]).includes(value);
}

export function browseCategoryLabel(slug: BrowseCategorySlug): string {
  return SLUG_LABELS[slug];
}

export function browseCategoryHeadlineAccent(slug: BrowseCategorySlug): string {
  return `${SLUG_LABELS[slug]}.`;
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

/** Which browse groups a product belongs to (catalog taxonomy). */
export function productBrowseSlugs(product: Product): BrowseCategorySlug[] {
  const slugs = new Set<BrowseCategorySlug>();
  const category = normalize(product.category);
  const subcategory = product.subcategory ? normalize(product.subcategory) : "";
  const keywords = product.keywords.map(normalize);

  const hasTea =
    category === "tea" ||
    category.includes("tea") ||
    keywords.some(
      (k) =>
        k.includes("tea") ||
        k.includes("matcha") ||
        k.includes("oolong") ||
        k.includes("herbal tea"),
    );

  const hasCoffee =
    category === "coffee" ||
    category.includes("coffee") ||
    keywords.some((k) => k.includes("coffee"));

  if (hasCoffee || hasTea) slugs.add("coffee-tea");

  if (
    category === "shampoo" ||
    category === "soap" ||
    category === "beauty" ||
    category === "toothpaste" ||
    subcategory.includes("personal care") ||
    subcategory.includes("hair care") ||
    subcategory.includes("makeup") ||
    keywords.some((k) =>
      ["shampoo", "soap", "toothpaste", "skincare", "body wash", "deodorant"].some(
        (t) => k.includes(t),
      ),
    )
  ) {
    slugs.add("personal-care");
  }

  if (
    category === "household" ||
    category === "toilet paper" ||
    subcategory.includes("laundry") ||
    subcategory.includes("kitchen cleaning") ||
    keywords.some((k) =>
      ["detergent", "cleaning", "dishcloth", "laundry"].some((t) => k.includes(t)),
    )
  ) {
    slugs.add("household");
  }

  if (
    category === "clothing" ||
    category === "socks" ||
    subcategory.includes("apparel") ||
    keywords.some((k) => ["socks", "apparel", "clothing"].includes(k))
  ) {
    slugs.add("clothing");
  }

  if (
    category.includes("dog") ||
    category.includes("cat") ||
    category.includes("pet") ||
    subcategory.includes("pet") ||
    keywords.some((k) =>
      ["pet treats", "pet snacks", "dog treats", "cat treats"].some((t) =>
        k.includes(t),
      ),
    )
  ) {
    slugs.add("pets");
  }

  if (
    category === "food" ||
    category === "snacks" ||
    category.includes("meal") ||
    keywords.some((k) =>
      ["snacks", "pantry", "meal", "food"].some((t) => k.includes(t)),
    )
  ) {
    slugs.add("food-snacks");
  }

  if (product.id === "feed-10-bag") slugs.add("food-snacks");

  return [...slugs];
}

export function productMatchesBrowseCategory(
  product: Product,
  slug: BrowseCategorySlug,
): boolean {
  if (slug === "everyday") return true;
  return productBrowseSlugs(product).includes(slug);
}
