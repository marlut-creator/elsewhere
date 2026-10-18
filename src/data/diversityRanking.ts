import { primaryCauseFamily } from "./causeTaxonomy";
import type { Product } from "./products";
import { getProductRelevanceScore } from "./products";

function relevanceBucket(score: number): number {
  return Math.floor(score / 80);
}

function primaryCauseKey(product: Product): string {
  return product.causeTags[0] ?? product.cause;
}

/** Greedy diversity rerank within relevance buckets (not random). */
export function diversifyProductOrder(
  products: Product[],
  query: string,
): Product[] {
  if (products.length <= 1) return products;

  const scored = products.map((product) => ({
    product,
    score: query.trim()
      ? getProductRelevanceScore(product, query)
      : browseScore(product),
  }));

  const buckets = new Map<number, typeof scored>();
  for (const entry of scored) {
    const bucket = relevanceBucket(entry.score);
    const list = buckets.get(bucket) ?? [];
    list.push(entry);
    buckets.set(bucket, list);
  }

  const bucketKeys = [...buckets.keys()].sort((a, b) => b - a);
  const result: Product[] = [];

  for (const key of bucketKeys) {
    const bucketItems = buckets.get(key)!;
    bucketItems.sort((a, b) => b.score - a.score || a.product.id.localeCompare(b.product.id));
    result.push(...diversifyBucket(bucketItems.map((e) => e.product), query));
  }

  return result;
}

function browseScore(product: Product): number {
  let score = 100;
  if (product.resultType === "everyday_swap") score += 40;
  if (product.resultType === "cause_product") score += 20;
  if (product.productStatus === "active") score += 10;
  return score;
}

function diversifyBucket(items: Product[], query: string): Product[] {
  if (items.length <= 1) return items;

  const remaining = [...items];
  const ordered: Product[] = [];
  const brandCounts = new Map<string, number>();
  const causeCounts = new Map<string, number>();

  while (remaining.length > 0) {
    let bestIndex = 0;
    let bestPenalty = Number.POSITIVE_INFINITY;
    let bestScore = -1;

    for (let i = 0; i < remaining.length; i++) {
      const product = remaining[i]!;
      const brandPenalty = brandCounts.get(product.brand) ?? 0;
      const causePenalty = causeCounts.get(primaryCauseKey(product)) ?? 0;
      const imageTieBreak =
        product.image && product.evidenceTier !== "C" ? -4 : 0;
      const penalty = brandPenalty * 10 + causePenalty * 8 + imageTieBreak;
      const score =
        (query.trim()
          ? getProductRelevanceScore(product, query)
          : 0) || browseScore(product);

      if (
        penalty < bestPenalty ||
        (penalty === bestPenalty && score > bestScore)
      ) {
        bestPenalty = penalty;
        bestScore = score;
        bestIndex = i;
      }
    }

    const [picked] = remaining.splice(bestIndex, 1);
    ordered.push(picked);
    brandCounts.set(picked.brand, (brandCounts.get(picked.brand) ?? 0) + 1);
    causeCounts.set(
      primaryCauseKey(picked),
      (causeCounts.get(primaryCauseKey(picked)) ?? 0) + 1,
    );
  }

  return ordered;
}

export function buildSurpriseMeSelection(
  candidates: Product[],
  query: string,
  limit = 24,
): Product[] {
  const active = candidates.filter(
    (p) =>
      p.productStatus !== "unavailable" &&
      p.resultType !== "direct_support",
  );
  const pool = query.trim()
    ? active.filter((p) => getProductRelevanceScore(p, query) > 0)
    : active;

  const diversified = diversifyProductOrder(pool, query);
  const familiesSeen = new Set<string>();
  const brandsSeen = new Set<string>();
  const picked: Product[] = [];
  const deferred: Product[] = [];

  const categoriesSeen = new Set<string>();

  for (const product of diversified) {
    const family = primaryCauseFamily(product.causeTags) ?? "Other";
    const brand = product.brand;
    const category = product.category;
    if (
      picked.length < limit &&
      !familiesSeen.has(family) &&
      !brandsSeen.has(brand) &&
      !categoriesSeen.has(category)
    ) {
      picked.push(product);
      familiesSeen.add(family);
      brandsSeen.add(brand);
      categoriesSeen.add(category);
    } else {
      deferred.push(product);
    }
  }

  for (const product of deferred) {
    if (picked.length >= limit) break;
    picked.push(product);
  }

  return picked.length > 0 ? picked : diversified.slice(0, limit);
}
