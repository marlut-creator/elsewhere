import {
  formatCauseTagsForDisplay,
  givingModelCardHint,
} from "../data/products";
import {
  formatGivingClaimForCard,
  getExploreCardTitle,
  isBrandDiscoveryEntry,
} from "../data/productDisplay";
import type { Product } from "../data/productTypes";
import { resolveSellerLink } from "../data/sellerUrlSafety";

export default function SharedProductCard({ product }: { product: Product }) {
  const discovery = isBrandDiscoveryEntry(product);
  const title = getExploreCardTitle(product);
  const hint = givingModelCardHint(product.givingModel);
  const givingClaim = formatGivingClaimForCard(product, hint);
  const seller = resolveSellerLink(product);
  const unavailable = product.productStatus === "unavailable";

  return (
    <article
      className={
        discovery ? "explore-card explore-card-discovery" : "explore-card"
      }
    >
      <div className="card-image">
        {product.image ? (
          <img
            className="card-product-image"
            src={product.image}
            alt={`${product.brand} ${product.productName}`}
          />
        ) : (
          <div
            className={
              discovery
                ? "card-image-placeholder card-image-placeholder-discovery"
                : "card-image-placeholder"
            }
          >
            <div>
              {discovery ? (
                <p className="card-discovery-eyebrow">Brand discovery</p>
              ) : null}
              <span className="card-placeholder-brand">{product.brand}</span>
              <p className="card-placeholder-category">{product.category}</p>
            </div>
          </div>
        )}
      </div>

      <div className="card-body card-body-aligned">
        <div className="card-zone-identity">
          <p className="brand-name card-zone-brand">
            {discovery ? "Brand discovery" : product.brand}
          </p>
          <h2 className="card-product-title">{title}</h2>
        </div>

        <dl className="giving-details card-zone-meta">
          <div>
            <dt>Cause</dt>
            <dd>{formatCauseTagsForDisplay(product)}</dd>
          </div>
          <div>
            <dt>Giving</dt>
            <dd className="giving-detail-copy">
              {hint ? <span className="giving-model-hint">{hint}</span> : null}
              <span className="giving-claim-text">{givingClaim}</span>
            </dd>
          </div>
        </dl>

        <div className="card-foot card-zone-foot">
          {unavailable ? (
            <p className="seller-link-unavailable">Currently unavailable</p>
          ) : seller.ok ? (
            <a
              className="seller-link"
              href={seller.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit seller <span aria-hidden="true">→</span>
            </a>
          ) : (
            <p className="seller-link-unavailable">Seller link needs review</p>
          )}
          <a className="verify-link" href="/explore">
            Explore more swaps <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </article>
  );
}
