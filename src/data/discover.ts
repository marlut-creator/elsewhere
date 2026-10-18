import {
  isBrowseCategorySlug,
  productMatchesBrowseCategory,
  type BrowseCategorySlug,
} from "./browseCategories";
import { productMatchesCauseSelection } from "./causeTaxonomy";
import {
  buildSurpriseMeSelection,
  diversifyProductOrder,
} from "./diversityRanking";
import type { Product } from "./products";
import { getProductRelevanceScore, products } from "./products";

export type DiscoverOptions = {
  query: string;
  causeFilter: string | null;
  surpriseMe: boolean;
  categoryFilter: BrowseCategorySlug | null;
};

function activeProducts(): Product[] {
  return products.filter((p) => p.productStatus !== "unavailable");
}

function matchesCauseFilter(product: Product, causeFilter: string): boolean {
  if (product.causeSelectionType === "shopper_selected") return false;
  return productMatchesCauseSelection(product.causeTags, causeFilter);
}

function sortBrowsePool(pool: Product[]): Product[] {
  return [...pool].sort((a, b) => {
    const typeScore = (p: Product) =>
      p.resultType === "everyday_swap" ? 0 : p.resultType === "cause_product" ? 1 : 2;
    return typeScore(a) - typeScore(b) || a.brand.localeCompare(b.brand);
  });
}

export function discoverProducts(options: DiscoverOptions): Product[] {
  const query = options.query.trim();
  const { causeFilter, surpriseMe, categoryFilter } = options;

  if (surpriseMe) {
    const base = activeProducts();
    return buildSurpriseMeSelection(base, query);
  }

  let pool: Product[];

  if (query) {
    pool = activeProducts()
      .map((product) => ({
        product,
        score: getProductRelevanceScore(product, query),
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ product }) => product);
  } else if (causeFilter) {
    pool = activeProducts().filter((product) =>
      matchesCauseFilter(product, causeFilter),
    );
    pool = sortBrowsePool(pool);
  } else if (categoryFilter) {
    pool = activeProducts().filter((product) =>
      productMatchesBrowseCategory(product, categoryFilter),
    );
    pool = sortBrowsePool(pool);
  } else {
    return [];
  }

  if (causeFilter && (query || categoryFilter)) {
    pool = pool.filter((product) => matchesCauseFilter(product, causeFilter));
  }

  if (categoryFilter && query) {
    pool = pool.filter((product) =>
      productMatchesBrowseCategory(product, categoryFilter),
    );
  }

  return diversifyProductOrder(pool, query || categoryFilter || "");
}

/** Parse `category` query param from the URL. */
export function parseBrowseCategoryParam(
  raw: string | null,
): BrowseCategorySlug | null {
  if (!raw || !isBrowseCategorySlug(raw)) return null;
  return raw;
}
