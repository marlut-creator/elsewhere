import { getProductById } from "./savedSwaps";
import type { Product } from "./productTypes";

/** Compact, self-contained collection links. No backend. No private fields. */
export const SHARED_COLLECTION_VERSION = 1;
export const MAX_COLLECTION_ITEMS = 12;
export const MAX_COLLECTION_TITLE_LENGTH = 80;
export const MAX_COLLECTION_PAYLOAD_LENGTH = 2500;
export const DEFAULT_COLLECTION_TITLE = "My everyday swaps";

const PRODUCT_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type CollectionDraft = {
  title: string;
  ids: string[];
};

export type DecodedCollection =
  | {
      ok: true;
      title: string;
      products: Product[];
      omitted: number;
    }
  | { ok: false; reason: "malformed" | "empty" };

type EncodedPayload = {
  v: number;
  t?: string;
  i: string[];
};

export function sanitizeCollectionTitle(value: string): string {
  return value
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_COLLECTION_TITLE_LENGTH);
}

export function isShareableProductId(id: string): boolean {
  return PRODUCT_ID_PATTERN.test(id) && getProductById(id) != null;
}

export function normalizeCollectionIds(ids: string[]): string[] {
  const seen = new Set<string>();
  const next: string[] = [];
  for (const id of ids) {
    if (typeof id !== "string" || !isShareableProductId(id) || seen.has(id)) {
      continue;
    }
    seen.add(id);
    next.push(id);
    if (next.length >= MAX_COLLECTION_ITEMS) break;
  }
  return next;
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array | null {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) return null;
  try {
    const padded = value + "===".slice((value.length + 3) % 4);
    const binary = atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  } catch {
    return null;
  }
}

export function encodeSharedCollection(draft: CollectionDraft): string | null {
  const ids = normalizeCollectionIds(draft.ids);
  if (ids.length === 0) return null;
  const title = sanitizeCollectionTitle(draft.title);
  const payload: EncodedPayload = {
    v: SHARED_COLLECTION_VERSION,
    i: ids,
  };
  if (title) payload.t = title;
  const json = JSON.stringify(payload);
  return toBase64Url(new TextEncoder().encode(json));
}

export function decodeSharedCollection(encoded: string): DecodedCollection {
  if (!encoded || encoded.length > MAX_COLLECTION_PAYLOAD_LENGTH) {
    return { ok: false, reason: "malformed" };
  }

  const bytes = fromBase64Url(encoded);
  if (!bytes) return { ok: false, reason: "malformed" };

  let parsed: unknown;
  try {
    parsed = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return { ok: false, reason: "malformed" };
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { ok: false, reason: "malformed" };
  }

  const raw = parsed as Record<string, unknown>;
  if (raw.v !== SHARED_COLLECTION_VERSION) {
    return { ok: false, reason: "malformed" };
  }
  if (!Array.isArray(raw.i)) return { ok: false, reason: "malformed" };

  const requested = raw.i.filter((id): id is string => typeof id === "string");
  const products: Product[] = [];
  const seen = new Set<string>();
  let omitted = 0;

  for (const id of requested) {
    if (seen.has(id)) continue;
    seen.add(id);
    if (products.length >= MAX_COLLECTION_ITEMS) {
      omitted += 1;
      continue;
    }
    const product = getProductById(id);
    if (!product || !PRODUCT_ID_PATTERN.test(id)) {
      omitted += 1;
      continue;
    }
    products.push(product);
  }

  if (products.length === 0) return { ok: false, reason: "empty" };

  const title =
    typeof raw.t === "string" && raw.t.trim()
      ? sanitizeCollectionTitle(raw.t)
      : DEFAULT_COLLECTION_TITLE;

  return { ok: true, title: title || DEFAULT_COLLECTION_TITLE, products, omitted };
}

export function buildCollectionPath(encoded: string): string {
  const base = import.meta.env.BASE_URL || "/";
  const prefix = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${prefix}/c/${encoded}`;
}

export function buildCollectionUrl(encoded: string): string {
  const path = buildCollectionPath(encoded);
  if (typeof window === "undefined") return path;
  return new URL(path, window.location.href).href;
}
