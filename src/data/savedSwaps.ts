import { products } from "./products";
import type { Product } from "./productTypes";

export const SAVED_SWAPS_STORAGE_KEY = "elsewhere.savedSwaps.v1";

const validProductIds = new Set(products.map((p) => p.id));

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function readSavedSwapIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SAVED_SWAPS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    const ids = parsed.filter((id): id is string => typeof id === "string");
    const valid = [...new Set(ids.filter((id) => validProductIds.has(id)))];
    if (valid.length !== ids.length) {
      writeSavedSwapIds(valid);
    }
    return valid;
  } catch {
    return [];
  }
}

export function writeSavedSwapIds(ids: string[]): void {
  const unique = [...new Set(ids.filter((id) => validProductIds.has(id)))];
  window.localStorage.setItem(
    SAVED_SWAPS_STORAGE_KEY,
    JSON.stringify(unique),
  );
}

export function resolveSavedProducts(ids: string[]): Product[] {
  const seen = new Set<string>();
  const result: Product[] = [];
  for (const id of ids) {
    if (seen.has(id)) continue;
    const product = getProductById(id);
    if (product) {
      seen.add(id);
      result.push(product);
    }
  }
  return result;
}
