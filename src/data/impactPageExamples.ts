import { products } from "./products";
import type { Product } from "./productTypes";

export type ImpactCauseExample = {
  category: string;
  categoryNote: string;
  product: Product;
  exploreHref: string;
  imageUrl: string;
  imageAlt: string;
  imageCredit: string;
};

function catalogProduct(id: string): Product {
  const product = products.find((entry) => entry.id === id);
  if (!product) {
    throw new Error(`Impact page is missing catalog product ${id}`);
  }
  return product;
}

function exploreBrandHref(brand: string) {
  return `/explore?q=${encodeURIComponent(brand)}`;
}

/**
 * Curated, catalog-backed examples for the Impact page.
 * Claims and verification URLs stay with the product records.
 */
export const IMPACT_CAUSE_EXAMPLES: ImpactCauseExample[] = [
  {
    category: "Animal rescue & wildlife",
    categoryNote:
      "Everyday products whose sellers document support for animals.",
    product: catalogProduct("cat-rescue-house-blend"),
    exploreHref: exploreBrandHref("Cat Rescue Coffee Company"),
    imageUrl:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=80",
    imageAlt:
      "Cat resting indoors — editorial stock photo, not a specific rescue beneficiary",
    imageCredit: "Alvan Nee / Unsplash (Unsplash License)",
  },
  {
    category: "Clean water & sanitation",
    categoryNote:
      "Household goods tied to documented water and sanitation giving.",
    product: catalogProduct("who-gives-a-crap-100-recycled-toilet-paper"),
    exploreHref: exploreBrandHref("Who Gives A Crap"),
    imageUrl:
      "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=1200&q=80",
    imageAlt:
      "Clear glass of drinking water — editorial image, not a specific beneficiary",
    imageCredit: "KOBU Agency / Unsplash (Unsplash License)",
  },
  {
    category: "Healthcare",
    categoryNote:
      "Purchases whose sellers publish health-related giving commitments.",
    product: catalogProduct("tea-spot-english-breakfast-organic"),
    exploreHref: exploreBrandHref("The Tea Spot"),
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Stethoscope on a table — editorial healthcare context",
    imageCredit: "National Cancer Institute / Unsplash (Unsplash License)",
  },
  {
    category: "Education",
    categoryNote: "Sellers that document literacy or school-related giving.",
    product: catalogProduct("better-world-books"),
    exploreHref: exploreBrandHref("Better World Books"),
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Books and learning materials — editorial education context",
    imageCredit: "Element5 Digital / Unsplash (Unsplash License)",
  },
  {
    category: "Environmental restoration",
    categoryNote:
      "Products whose sellers document trees planted or similar outcomes.",
    product: catalogProduct("tentree-ten-t-shirt"),
    exploreHref: exploreBrandHref("tentree"),
    imageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Forest canopy — editorial reforestation context",
    imageCredit: "Luca Bravo / Unsplash (Unsplash License)",
  },
  {
    category: "Community support",
    categoryNote:
      "Purchase-linked item donations and similar community programs.",
    product: catalogProduct("bombas-all-sport-half-calf-socks"),
    exploreHref: exploreBrandHref("Bombas"),
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "People together — editorial community context",
    imageCredit: "Slava Bowman / Unsplash (Unsplash License)",
  },
];

export const IMPACT_MEASURE_LAYERS = [
  {
    letter: "A",
    title: "Money spent at a mission-driven business",
    body: "A purchase you actually make. That is spending redirected to a seller — not a donation by itself.",
  },
  {
    letter: "B",
    title: "A business's documented giving commitment",
    body: "What the seller publicly says it does with profits, revenue, items, or a stated per-purchase outcome. We quote the claim and link the source.",
  },
  {
    letter: "C",
    title: "Money actually donated",
    body: "Cash that left the business for a recipient. Percent-of-profits claims cannot be turned into a donation from your receipt unless the seller publishes the attributable profit.",
  },
  {
    letter: "D",
    title: "Outcomes documented by recipient organizations",
    body: "Meals served, pairs distributed, trees planted — only when the seller or recipient publishes that outcome, and only in the terms they use.",
  },
  {
    letter: "E",
    title: "Purchases you log in My Elsewhere",
    body: "A private, voluntary record of what you bought. It is not a sitewide impact total, and visiting a product page does not count as a purchase.",
  },
] as const;
