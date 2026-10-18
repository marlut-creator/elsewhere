import { getCategoryPurchaseAssumption } from "./categoryAssumptions";
import type { GivingModel, Product } from "./products";
import { representativeUnitPrice } from "./products";

export type AnnualImpactDisplay = {
  headline: string;
  assumptionNote: string | null;
  givingClaimLine: string | null;
  redirectedLine: string | null;
  showRedirectDisclaimer: boolean;
};

function formatUsd(amount: number): string {
  const rounded = Math.round(amount);
  return `$${rounded.toLocaleString("en-US")}`;
}

function physicalImpactSummary(
  product: Product,
  purchasesPerYear: number,
): string | null {
  if (product.givingValue == null || !product.givingUnit) return null;

  const unit = product.givingUnit.toLowerCase();
  const count = product.givingValue * purchasesPerYear;

  if (product.givingModel === "item_donation") {
    if (unit.includes("glasses")) {
      return `~${count} pair${count === 1 ? "" : "s"} of glasses distributed`;
    }
    if (unit.includes("clothing")) {
      return `~${count} essential clothing item${count === 1 ? "" : "s"} donated`;
    }
    return `~${count} ${product.givingUnit}`;
  }

  if (product.givingModel === "direct_impact") {
    if (unit.includes("meal")) {
      return `~${count} school meals`;
    }
    if (unit.includes("tree")) {
      return `~${count} trees planted`;
    }
    if (unit.includes("trash") || unit.includes("pound")) {
      return `~${count} lb${count === 1 ? "" : "s"} of trash removed`;
    }
    return `~${count} ${product.givingUnit}`;
  }

  if (product.givingModel === "fixed_donation") {
    return `~${formatUsd(count)}/year donated`;
  }

  return null;
}

function givingContextLine(product: Product): string | null {
  const model = product.givingModel;
  if (
    model === "percent_profit" ||
    model === "percent_revenue" ||
    model === "purchase_linked" ||
    model === "purchase_linked_unspecified"
  ) {
    return product.givingClaim;
  }
  if (model === "percent_purchase") {
    return product.givingClaim;
  }
  return null;
}

const SHOW_PHYSICAL_WITH_REDIRECT: GivingModel[] = [
  "item_donation",
  "direct_impact",
];

export function getAnnualImpactDisplay(product: Product): AnnualImpactDisplay {
  const assumption = getCategoryPurchaseAssumption(product);
  const unitPrice = representativeUnitPrice(product);

  if (!assumption || unitPrice == null) {
    if (product.givingModel === "fixed_donation" && product.givingValue) {
      return {
        headline: "See estimated impact",
        assumptionNote: null,
        givingClaimLine: product.givingClaim,
        redirectedLine: null,
        showRedirectDisclaimer: false,
      };
    }
    return {
      headline: "See estimated impact",
      assumptionNote: null,
      givingClaimLine: product.givingClaim || null,
      redirectedLine: null,
      showRedirectDisclaimer: false,
    };
  }

  const redirected = unitPrice * assumption.purchasesPerYear;
  const redirectedLine = `~${formatUsd(redirected)}/year redirected`;

  if (product.givingModel === "percent_purchase" && product.givingValue) {
    const toCharity = redirected * (product.givingValue / 100);
    return {
      headline: `~${formatUsd(toCharity)}/year from purchases`,
      assumptionNote: assumption.assumptionNote,
      givingClaimLine: product.givingClaim,
      redirectedLine,
      showRedirectDisclaimer: false,
    };
  }

  if (product.givingModel === "fixed_donation") {
    const physical = physicalImpactSummary(
      product,
      assumption.purchasesPerYear,
    );
    return {
      headline: physical ?? redirectedLine,
      assumptionNote: assumption.assumptionNote,
      givingClaimLine: product.givingClaim,
      redirectedLine: physical ? redirectedLine : null,
      showRedirectDisclaimer: Boolean(physical),
    };
  }

  const givingClaimLine = givingContextLine(product);

  if (SHOW_PHYSICAL_WITH_REDIRECT.includes(product.givingModel)) {
    const physical = physicalImpactSummary(
      product,
      assumption.purchasesPerYear,
    );
    return {
      headline: physical ?? redirectedLine,
      assumptionNote: assumption.assumptionNote,
      givingClaimLine: physical ? null : givingClaimLine,
      redirectedLine: physical ? redirectedLine : null,
      showRedirectDisclaimer: true,
    };
  }

  return {
    headline: redirectedLine,
    assumptionNote: assumption.assumptionNote,
    givingClaimLine,
    redirectedLine: null,
    showRedirectDisclaimer: true,
  };
}
