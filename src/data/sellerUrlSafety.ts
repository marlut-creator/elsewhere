import type { Product } from "./productTypes";

/** Domains that must never be used as seller destinations. */
const BLOCKED_HOSTS = new Set(["volcanica.com", "www.volcanica.com"]);

export function normalizeHostname(hostname: string): string {
  return hostname.trim().toLowerCase().replace(/^www\./, "");
}

function registrableHost(hostname: string): string {
  const h = normalizeHostname(hostname);
  const parts = h.split(".");
  if (parts.length <= 2) return h;
  return parts.slice(-2).join(".");
}

export function hostnameMatchesOfficial(
  urlHostname: string,
  officialDomain: string,
): boolean {
  const host = normalizeHostname(urlHostname);
  const official = normalizeHostname(officialDomain);
  if (!host || !official) return false;
  if (BLOCKED_HOSTS.has(host) || BLOCKED_HOSTS.has(`${host.split(".").slice(-2).join(".")}`)) {
    return false;
  }
  if (host === official) return true;
  if (host.endsWith(`.${official}`)) return true;
  return registrableHost(host) === registrableHost(official);
}

export function validatePurchaseUrl(product: Product): boolean {
  if (product.productStatus === "unavailable") return false;
  if (!product.officialDomain?.trim()) return false;

  let url: URL;
  try {
    url = new URL(product.purchaseUrl);
  } catch {
    return false;
  }

  if (url.protocol !== "https:") return false;

  const host = normalizeHostname(url.hostname);
  if (BLOCKED_HOSTS.has(host)) return false;

  return hostnameMatchesOfficial(url.hostname, product.officialDomain);
}

export type SellerLinkState =
  | { ok: true; href: string }
  | { ok: false; reason: "needs_review" };

export function resolveSellerLink(product: Product): SellerLinkState {
  if (!validatePurchaseUrl(product)) {
    return { ok: false, reason: "needs_review" };
  }
  return { ok: true, href: product.purchaseUrl };
}
