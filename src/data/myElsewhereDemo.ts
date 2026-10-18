import type { PurchaseEvent } from "./purchaseHistoryTypes";
import { rollupProductPurchases, type ProductPurchaseRollup } from "./loggedImpact";

/** Fictional demo events — never persisted or merged into user totals. */
const DEMO_EVENTS: PurchaseEvent[] = [
  {
    id: "demo-1",
    productId: "cat-rescue-house-blend",
    quantity: 1,
    purchaseDate: "2026-10-15",
    createdAt: "2026-10-15T12:00:00.000Z",
    recurring: true,
    recurrenceInterval: "monthly",
  },
  {
    id: "demo-2",
    productId: "cat-rescue-house-blend",
    quantity: 1,
    purchaseDate: "2026-09-18",
    createdAt: "2026-09-18T12:00:00.000Z",
    recurring: false,
  },
  {
    id: "demo-3",
    productId: "cat-rescue-house-blend",
    quantity: 1,
    purchaseDate: "2026-08-02",
    createdAt: "2026-08-02T12:00:00.000Z",
    recurring: false,
  },
  {
    id: "demo-4",
    productId: "bombas-all-sport-half-calf-socks",
    quantity: 2,
    purchaseDate: "2026-10-01",
    createdAt: "2026-10-01T12:00:00.000Z",
    recurring: false,
  },
  {
    id: "demo-5",
    productId: "arbor-day-blend",
    quantity: 1,
    purchaseDate: "2026-07-20",
    createdAt: "2026-07-20T12:00:00.000Z",
    recurring: false,
  },
];

export function getMyElsewhereDemoRollups(): ProductPurchaseRollup[] {
  const ids = [...new Set(DEMO_EVENTS.map((e) => e.productId))];
  return ids
    .map((id) => rollupProductPurchases(id, DEMO_EVENTS))
    .filter((r): r is ProductPurchaseRollup => r != null);
}
