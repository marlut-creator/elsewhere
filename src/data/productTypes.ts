export type GivingModel =
  | "percent_profit"
  | "percent_revenue"
  | "percent_purchase"
  | "item_donation"
  | "direct_impact"
  | "purchase_linked"
  | "purchase_linked_unspecified"
  | "fixed_donation"
  | "fixed_donation_or_item"
  | "other";

export type EvidenceTier = "A" | "B" | "C";

export type CauseSelectionType = "fixed" | "shopper_selected";

export type VerificationStatus = "verified" | "needs_review" | "stale";

export type ProductStatus = "active" | "unavailable" | "unknown";

export type ResultType = "everyday_swap" | "cause_product" | "direct_support";

/** Optional verified impact storytelling metadata for My Elsewhere / impact UI. */
export type ImpactStory = {
  title?: string;
  beneficiary?: string;
  imageUrl?: string;
  imageAlt?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  credit?: string;
  caption?: string;
};

export type Product = {
  id: string;
  productName: string;
  brand: string;
  category: string;
  subcategory?: string;
  keywords: string[];
  priceDisplay?: string;
  priceMin?: number;
  priceMax?: number;
  priceIsFrom?: boolean;
  size?: string;
  /** Explicit pack count for unit-price display (not parsed from titles). */
  packQuantity?: number;
  packUnitLabel?: string;
  /**
   * Estimated months one listed purchase lasts — spend comparison only.
   * Overrides category cadence when set; requires supplyAssumptionNote.
   */
  supplyMonthsPerPurchase?: number;
  supplyAssumptionNote?: string;
  /** Verified shipping metadata — never inferred at checkout. */
  shippingFlat?: number;
  shippingFreeThreshold?: number;
  shippingNote?: string;
  shippingMode?: "flat" | "free_threshold" | "seller_calculated";
  /** Primary display label for cards (category ≠ cause). */
  cause: string;
  causeGroup?: string;
  causeTags: string[];
  resultType: ResultType;
  givingModel: GivingModel;
  givingValue?: number;
  givingUnit?: string;
  givingClaim: string;
  beneficiary?: string;
  verificationUrl: string;
  purchaseUrl: string;
  /** Registrable domain for seller-link validation (e.g. volcanicacoffee.com). */
  officialDomain?: string;
  evidenceTier?: EvidenceTier;
  causeSelectionType?: CauseSelectionType;
  image?: string;
  lastVerified: string;
  priceCheckedAt?: string;
  claimCheckedAt?: string;
  verificationStatus: VerificationStatus;
  productStatus: ProductStatus;
  impactStory?: ImpactStory;
};
