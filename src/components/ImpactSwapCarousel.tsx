import { useState } from "react";
import EditorialIllustration from "./EditorialIllustration";
import { givingModelCardHint, givingModelLabel, products } from "../data/products";
import type { IllustrationName } from "../data/siteImages";
import type { Product } from "../data/productTypes";

type SwapSlide = {
  category: string;
  illustration: IllustrationName;
  everydayLabel: string;
  everydayNote: string;
  productId: string;
};

const SLIDES: SwapSlide[] = [
  {
    category: "Laundry",
    illustration: "detergent",
    everydayLabel: "A bottle of detergent",
    everydayNote: "The aisle staple, shown as a category rather than a rival brand.",
    productId: "good-store-ecogeek-laundry",
  },
  {
    category: "Toilet paper",
    illustration: "toilet-paper",
    everydayLabel: "The usual bath tissue",
    everydayNote: "An ordinary restock, not a ranked competitor.",
    productId: "who-gives-a-crap-100-recycled-toilet-paper",
  },
  {
    category: "Coffee",
    illustration: "coffee",
    everydayLabel: "A regular bag of beans",
    everydayNote: "The morning errand, without a brand we are scoring against.",
    productId: "cat-rescue-house-blend",
  },
];

function catalogProduct(id: string): Product {
  const product = products.find((entry) => entry.id === id);
  if (!product) {
    throw new Error(`Impact carousel is missing catalog product ${id}`);
  }
  return product;
}

export default function ImpactSwapCarousel() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];
  const product = catalogProduct(slide.productId);
  const hint = givingModelCardHint(product.givingModel) ?? givingModelLabel(product.givingModel);

  const previous = () => setIndex((value) => (value === 0 ? SLIDES.length - 1 : value - 1));
  const next = () => setIndex((value) => (value === SLIDES.length - 1 ? 0 : value + 1));

  return (
    <div
      className="ip-carousel"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") previous();
        if (event.key === "ArrowRight") next();
      }}
    >
      <div className="ip-carousel-toolbar">
        <p className="ip-carousel-category">{slide.category}</p>
        <div className="ip-carousel-controls">
          <button type="button" onClick={previous} aria-label="Previous swap">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14.5 6 8 12l6.5 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" onClick={next} aria-label="Next swap">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9.5 6 16 12l-6.5 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="ip-carousel-stage">
        <article className="ip-swap-card">
          <div className="ip-swap-visual">
            <EditorialIllustration name={slide.illustration} />
          </div>
          <div className="ip-swap-body">
            <p className="ip-swap-kicker">What you already buy</p>
            <h3>{slide.everydayLabel}</h3>
            <p>{slide.everydayNote}</p>
          </div>
        </article>

        <p className="ip-swap-arrow" aria-hidden="true">
          →
        </p>

        <article className="ip-swap-card ip-swap-card-alt">
          <div className="ip-swap-visual">
            {product.image ? (
              <img src={product.image} alt={`${product.brand} ${product.productName}`} />
            ) : (
              <EditorialIllustration name={slide.illustration} />
            )}
          </div>
          <div className="ip-swap-body">
            <p className="ip-swap-kicker">A documented alternative</p>
            <h3>{product.brand}</h3>
            <p>{product.productName}</p>
            <p className="ip-swap-claim">{product.givingClaim}</p>
            <p className="ip-swap-model">{hint}. Quoted from the seller, not calculated from a receipt.</p>
            <p className="ip-swap-links">
              <a href={`/explore?q=${encodeURIComponent(product.brand)}`}>See in Explore</a>
              {" · "}
              <a href={product.verificationUrl}>Evidence source</a>
            </p>
          </div>
        </article>
      </div>

      <div className="ip-carousel-dots" role="tablist" aria-label="Product swaps">
        {SLIDES.map((item, itemIndex) => (
          <button
            key={item.productId}
            type="button"
            role="tab"
            aria-selected={itemIndex === index}
            aria-label={item.category}
            className={itemIndex === index ? "is-active" : undefined}
            onClick={() => setIndex(itemIndex)}
          />
        ))}
      </div>
    </div>
  );
}
