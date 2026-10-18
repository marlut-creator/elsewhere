import { getProductById } from "./savedSwaps";
import type { PurchaseEvent } from "./purchaseHistoryTypes";

export const PURCHASE_HISTORY_STORAGE_KEY = "elsewhere.purchaseHistory.v1";

function isValidEvent(raw: unknown): raw is PurchaseEvent {
  if (!raw || typeof raw !== "object") return false;
  const e = raw as Record<string, unknown>;
  return (
    typeof e.id === "string" &&
    typeof e.productId === "string" &&
    typeof e.quantity === "number" &&
    e.quantity >= 1 &&
    Number.isInteger(e.quantity) &&
    typeof e.purchaseDate === "string" &&
    typeof e.createdAt === "string" &&
    typeof e.recurring === "boolean" &&
    getProductById(e.productId) != null
  );
}

export function readPurchaseEvents(): PurchaseEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(PURCHASE_HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    const valid = parsed.filter(isValidEvent);
    if (valid.length !== parsed.length) {
      writePurchaseEvents(valid);
    }
    return valid.sort(
      (a, b) => b.purchaseDate.localeCompare(a.purchaseDate) || b.createdAt.localeCompare(a.createdAt),
    );
  } catch {
    return [];
  }
}

export function writePurchaseEvents(events: PurchaseEvent[]): void {
  window.localStorage.setItem(
    PURCHASE_HISTORY_STORAGE_KEY,
    JSON.stringify(events),
  );
}

export function createPurchaseEventId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `pe-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
