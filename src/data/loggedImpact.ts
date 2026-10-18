import type { Product } from "./productTypes";
import { representativeUnitPrice } from "./products";
import type { PurchaseEvent, RecurrenceInterval } from "./purchaseHistoryTypes";
import { purchasesPerYearFromInterval, recurrenceIntervalLabel } from "./purchaseHistoryTypes";
import { canonicalImpactArea } from "./impactAreas";
import { getProductById } from "./savedSwaps";

export type PhysicalImpactLine = {
  kind: "physical";
  text: string;
};

export type DollarImpactLine = {
  kind: "dollar";
  amount: number;
  label: string;
};

export type LoggedLineImpact = PhysicalImpactLine | DollarImpactLine;

export function lineRedirectedSpend(
  product: Product,
  quantity: number,
): number | null {
  const unit = representativeUnitPrice(product);
  if (unit == null || quantity < 1) return null;
  return unit * quantity;
}

/** Historical contribution/impact for one logged line — never infers profit %. */
export function lineLoggedImpact(
  product: Product,
  quantity: number,
  redirected: number | null,
): LoggedLineImpact | null {
  const q = Math.max(1, quantity);

  if (product.givingModel === "percent_purchase" && product.givingValue != null) {
    if (redirected == null) return null;
    return {
      kind: "dollar",
      amount: redirected * (product.givingValue / 100),
      label: "contributed from purchase price",
    };
  }

  if (product.givingModel === "fixed_donation" && product.givingValue != null) {
    return {
      kind: "dollar",
      amount: product.givingValue * q,
      label: "contributed",
    };
  }

  if (product.givingModel === "item_donation" && product.givingValue != null) {
    const count = product.givingValue * q;
    const unit = (product.givingUnit ?? "items").toLowerCase();
    if (unit.includes("clothing")) {
      return {
        kind: "physical",
        text: `${count} essential clothing item${count === 1 ? "" : "s"} donated`,
      };
    }
    if (unit.includes("glasses")) {
      return {
        kind: "physical",
        text: `${count} pair${count === 1 ? "" : "s"} of glasses distributed`,
      };
    }
    return {
      kind: "physical",
      text: `${count} ${product.givingUnit ?? "items"}`,
    };
  }

  if (product.givingModel === "direct_impact" && product.givingValue != null) {
    const count = product.givingValue * q;
    const unit = (product.givingUnit ?? "").toLowerCase();
    if (unit.includes("meal")) {
      return { kind: "physical", text: `${count} school meals` };
    }
    if (unit.includes("tree")) {
      return { kind: "physical", text: `${count} trees planted` };
    }
    if (unit.includes("trash") || unit.includes("pound")) {
      return {
        kind: "physical",
        text: `${count} lb${count === 1 ? "" : "s"} of trash removed`,
      };
    }
    return {
      kind: "physical",
      text: `${count} ${product.givingUnit ?? "units"}`,
    };
  }

  return null;
}

export type ProductPurchaseRollup = {
  product: Product;
  events: PurchaseEvent[];
  eventCount: number;
  totalQuantity: number;
  totalRedirected: number | null;
  lastPurchaseDate: string | null;
  dollarContributed: number | null;
  physicalLines: string[];
  givingClaimOnly: boolean;
  recurrenceLabel: string | null;
  projectionRedirected: number | null;
  projectionContribution: string | null;
};

function aggregatePhysicalLines(lines: string[]): string[] {
  const counts = new Map<string, number>();
  for (const line of lines) {
    counts.set(line, (counts.get(line) ?? 0) + 1);
  }
  return [...counts.keys()];
}

export function rollupProductPurchases(
  productId: string,
  events: PurchaseEvent[],
): ProductPurchaseRollup | null {
  const product = getProductById(productId);
  if (!product) return null;
  const productEvents = events
    .filter((e) => e.productId === productId)
    .sort((a, b) => b.purchaseDate.localeCompare(a.purchaseDate));

  if (productEvents.length === 0) return null;

  let totalRedirected = 0;
  let hasRedirected = false;
  let dollarContributed = 0;
  let hasDollar = false;
  let totalQuantity = 0;

  for (const event of productEvents) {
    totalQuantity += event.quantity;
    const redirected = lineRedirectedSpend(product, event.quantity);
    if (redirected != null) {
      totalRedirected += redirected;
      hasRedirected = true;
    }
    const impact = lineLoggedImpact(product, event.quantity, redirected);
    if (impact?.kind === "dollar") {
      dollarContributed += impact.amount;
      hasDollar = true;
    }
  }

  const aggregatePhysical = lineLoggedImpact(
    product,
    totalQuantity,
    hasRedirected ? totalRedirected : null,
  );
  const physicalLines =
    aggregatePhysical?.kind === "physical" ? [aggregatePhysical.text] : [];

  const latestRecurring = productEvents.find((e) => e.recurring && e.recurrenceInterval);
  let projectionRedirected: number | null = null;
  let projectionContribution: string | null = null;

  if (latestRecurring?.recurrenceInterval) {
    const unit = representativeUnitPrice(product);
    const lastQty = productEvents[0]!.quantity;
    if (unit != null) {
      const annual = unit * lastQty * purchasesPerYearFromInterval(latestRecurring.recurrenceInterval);
      projectionRedirected = annual;
      const lineImpact = lineLoggedImpact(product, lastQty, unit);
      if (lineImpact?.kind === "dollar") {
        const perYear =
          lineImpact.amount *
          purchasesPerYearFromInterval(latestRecurring.recurrenceInterval);
        projectionContribution = `~$${Math.round(perYear).toLocaleString("en-US")}/year contributed at your current pace`;
      }
    }
  }

  const profitBased =
    product.givingModel === "percent_profit" ||
    product.givingModel === "percent_revenue" ||
    product.givingModel === "purchase_linked" ||
    product.givingModel === "purchase_linked_unspecified";

  return {
    product,
    events: productEvents,
    eventCount: productEvents.length,
    totalQuantity,
    totalRedirected: hasRedirected ? totalRedirected : null,
    lastPurchaseDate: productEvents[0]!.purchaseDate,
    dollarContributed: hasDollar ? dollarContributed : null,
    physicalLines,
    givingClaimOnly: profitBased && !hasDollar && physicalLines.length === 0,
    recurrenceLabel: latestRecurring?.recurrenceInterval
      ? recurrenceIntervalLabel(latestRecurring.recurrenceInterval)
      : null,
    projectionRedirected,
    projectionContribution,
  };
}

export type MyElsewhereSummary = {
  purchaseEventCount: number;
  /** Distinct canonical impact areas (one per product, not raw cause tags). */
  impactAreaCount: number;
  totalRedirected: number | null;
  totalDollarContributed: number | null;
  physicalTotals: string[];
};

export type ImpactAreaSlice = {
  area: string;
  purchaseEvents: number;
  redirected: number | null;
};

export type ActivityMonth = {
  monthKey: string;
  label: string;
  eventCount: number;
};

export type MyElsewhereDashboard = {
  summary: MyElsewhereSummary;
  businessesSupported: number;
  impactAreas: ImpactAreaSlice[];
  activityMonths: ActivityMonth[];
};

export function summarizePurchaseHistory(
  events: PurchaseEvent[],
): MyElsewhereSummary {
  const productIds = [...new Set(events.map((e) => e.productId))];
  const impactAreas = new Set<string>();
  let totalRedirected = 0;
  let hasRedirected = false;
  let totalDollar = 0;
  let hasDollar = false;
  const physicalAll: string[] = [];

  for (const id of productIds) {
    const rollup = rollupProductPurchases(id, events);
    if (!rollup) continue;
    impactAreas.add(canonicalImpactArea(rollup.product));
    if (rollup.totalRedirected != null) {
      totalRedirected += rollup.totalRedirected;
      hasRedirected = true;
    }
    if (rollup.dollarContributed != null) {
      totalDollar += rollup.dollarContributed;
      hasDollar = true;
    }
    physicalAll.push(...rollup.physicalLines);
  }

  return {
    purchaseEventCount: events.length,
    impactAreaCount: impactAreas.size,
    totalRedirected: hasRedirected ? totalRedirected : null,
    totalDollarContributed: hasDollar ? totalDollar : null,
    physicalTotals: aggregatePhysicalLines(physicalAll),
  };
}

export function buildMyElsewhereDashboard(
  events: PurchaseEvent[],
): MyElsewhereDashboard {
  const summary = summarizePurchaseHistory(events);
  const productIds = [...new Set(events.map((e) => e.productId))];
  const brands = new Set<string>();
  const areaMap = new Map<string, { events: number; redirected: number }>();

  for (const id of productIds) {
    const rollup = rollupProductPurchases(id, events);
    if (!rollup) continue;
    brands.add(rollup.product.brand);
    const area = canonicalImpactArea(rollup.product);
    const entry = areaMap.get(area) ?? { events: 0, redirected: 0 };
    entry.events += rollup.eventCount;
    if (rollup.totalRedirected != null) {
      entry.redirected += rollup.totalRedirected;
    }
    areaMap.set(area, entry);
  }

  const impactAreas = [...areaMap.entries()]
    .map(([area, data]) => ({
      area,
      purchaseEvents: data.events,
      redirected: data.redirected > 0 ? data.redirected : null,
    }))
    .sort((a, b) => (b.redirected ?? 0) - (a.redirected ?? 0));

  const monthCounts = new Map<string, number>();
  for (const event of events) {
    const key = event.purchaseDate.slice(0, 7);
    monthCounts.set(key, (monthCounts.get(key) ?? 0) + 1);
  }

  const activityMonths = [...monthCounts.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([monthKey, eventCount]) => {
      const [y, m] = monthKey.split("-").map(Number);
      const label =
        y && m
          ? new Date(y, m - 1, 1).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })
          : monthKey;
      return { monthKey, label, eventCount };
    });

  return {
    summary,
    businessesSupported: brands.size,
    impactAreas,
    activityMonths,
  };
}

export function formatDisplayDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function todayIsoDate(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function yesterdayIsoDate(): string {
  const now = new Date();
  now.setDate(now.getDate() - 1);
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
