import {
  formatGivingClaimForCard,
  getExploreCardTitle,
} from "./productDisplay";
import {
  canonicalImpactArea,
  dashboardImpactAreaLabel,
} from "./impactAreas";
import { givingModelCardHint } from "./products";
import type { Product } from "./productTypes";
import type { ProductPurchaseRollup } from "./loggedImpact";

export type ResolvedImpactStory = {
  productId: string;
  causeHeading: string;
  businessName: string;
  givingDescription: string;
  sourceUrl: string;
  sourceLabel: string;
  imageUrl: string | null;
  imageAlt: string;
  imageCredit: string | null;
  showCauseIcon: boolean;
  causeGroup: string;
};

type EditorialImage = {
  imageUrl: string;
  imageAlt: string;
  imageCredit: string;
};

const EDITORIAL_IMAGES: Record<string, EditorialImage> = {
  Animals: {
    imageUrl:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=80",
    imageAlt:
      "Cat resting indoors — editorial stock photo, not a specific rescue beneficiary",
    imageCredit: "Alvan Nee / Unsplash (Unsplash License)",
  },
  "Basic Needs": {
    imageUrl:
      "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=1200&q=80",
    imageAlt:
      "Clear glass of drinking water — editorial image, not a specific beneficiary",
    imageCredit: "KOBU Agency / Unsplash (Unsplash License)",
  },
  Environment: {
    imageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Forest canopy — editorial reforestation context",
    imageCredit: "Luca Bravo / Unsplash (Unsplash License)",
  },
  Opportunity: {
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Books and learning materials — editorial education context",
    imageCredit: "Element5 Digital / Unsplash (Unsplash License)",
  },
  People: {
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "People together — editorial community context",
    imageCredit: "Slava Bowman / Unsplash (Unsplash License)",
  },
  Health: {
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Healthcare context — editorial stock",
    imageCredit: "National Cancer Institute / Unsplash (Unsplash License)",
  },
};

function isProductPackagingUrl(url: string): boolean {
  return (
    url.includes("/product-assets/") ||
    url.includes("cdn.shopify.com") ||
    url.includes("cdn.shop")
  );
}

export function resolveImpactStoryForProduct(
  product: Product,
): ResolvedImpactStory {
  const area = canonicalImpactArea(product);
  const causeHeading = dashboardImpactAreaLabel(area);
  const hint = givingModelCardHint(product.givingModel);
  const givingDescription = formatGivingClaimForCard(product, hint);
  const custom = product.impactStory;
  const editorial = EDITORIAL_IMAGES[area];

  let imageUrl: string | null = null;
  let imageAlt = editorial?.imageAlt ?? causeHeading;
  let imageCredit = editorial?.imageCredit ?? null;

  if (
    custom?.imageUrl &&
    !isProductPackagingUrl(custom.imageUrl)
  ) {
    imageUrl = custom.imageUrl;
    imageAlt = custom.imageAlt ?? imageAlt;
    imageCredit = custom.credit ?? imageCredit;
  } else if (editorial) {
    imageUrl = editorial.imageUrl;
  }

  return {
    productId: product.id,
    causeHeading,
    businessName: product.brand,
    givingDescription,
    sourceUrl: custom?.sourceUrl ?? product.verificationUrl,
    sourceLabel:
      custom?.sourceLabel ?? `How we verify ${product.brand}`,
    imageUrl,
    imageAlt,
    imageCredit,
    showCauseIcon: !imageUrl,
    causeGroup: area,
  };
}

/** One story per logged product (unique product id), derived from purchase history. */
export function impactStoriesFromRollups(
  rollups: ProductPurchaseRollup[],
): ResolvedImpactStory[] {
  const seen = new Set<string>();
  const stories: ResolvedImpactStory[] = [];
  for (const rollup of rollups) {
    if (seen.has(rollup.product.id)) continue;
    seen.add(rollup.product.id);
    stories.push(resolveImpactStoryForProduct(rollup.product));
  }
  return stories;
}
