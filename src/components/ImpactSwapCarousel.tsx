import { useState } from "react";
import { givingModelCardHint, givingModelLabel, products } from "../data/products";
import type { Product } from "../data/productTypes";

type SwapSlide = {
  category: string;
  everydayLabel: string;
  everydayNote: string;
  productId: string;
};

const SLIDES: SwapSlide[] = [
  {
    category: "Toilet paper",
    everydayLabel: "The usual bath tissue",
    everydayNote: "A familiar aisle, not a ranked competitor.",
    productId: "who-gives-a-crap-100-recycled-toilet-paper",
  },
  {
    category: "Coffee",
    everydayLabel: "A regular bag of beans",
    everydayNote: "The morning errand, without a brand we are scoring against.",
    productId: "cat-rescue-house-blend",
  },
  {
    category: "Books",
    everydayLabel: "The usual bookstore trip",
    everydayNote: "Something to read. The publisher of the book is not the point here.",
    productId: "better-world-books",
  },
  {
    category: "Socks",
    everydayLabel: "A basic pair of socks",
    everydayNote: "An ordinary clothing staple, shown as a category rather than a rival.",
    productId: "bombas-all-sport-half-calf-socks",
  },
];

function catalogProduct(id: string): Product {
  const product = products.find((entry) => entry.id === id);
  if (!product) {
    throw new Error(`Impact carousel is missing catalog product ${id}`);
  }
  return product;
}

function CategoryScene({ category }: { category: string }) {
  if (category === "Coffee") {
    return (
      <svg viewBox="0 0 420 260" role="img" aria-label="A bag of coffee beans on a kitchen counter">
        <rect width="420" height="260" fill="#f1eee7" />
        <rect x="0" y="188" width="420" height="72" fill="#e4ddd3" />
        <path d="M148 54h124l18 132H130Z" fill="#fff" stroke="#321b36" strokeWidth="2" />
        <rect x="168" y="78" width="84" height="54" rx="6" fill="#321b36" />
        <text x="176" y="110" fill="#eeedf8" fontFamily="Dosis, sans-serif" fontSize="18" fontWeight="600">beans</text>
        <ellipse cx="210" cy="168" rx="42" ry="10" fill="#d3ccd1" />
      </svg>
    );
  }
  if (category === "Books") {
    return (
      <svg viewBox="0 0 420 260" role="img" aria-label="A small stack of books">
        <rect width="420" height="260" fill="#eeedf8" />
        <rect x="86" y="78" width="250" height="44" rx="4" fill="#fff" stroke="#321b36" />
        <rect x="98" y="126" width="250" height="44" rx="4" fill="#6679cc" />
        <rect x="74" y="174" width="250" height="44" rx="4" fill="#321b36" />
        <text x="108" y="106" fill="#321b36" fontFamily="Dosis, sans-serif" fontSize="18" fontWeight="600">a novel</text>
        <text x="120" y="154" fill="#f7f3e8" fontFamily="Dosis, sans-serif" fontSize="18" fontWeight="600">a textbook</text>
        <text x="96" y="202" fill="#eeedf8" fontFamily="Dosis, sans-serif" fontSize="18" fontWeight="600">something used</text>
      </svg>
    );
  }
  if (category === "Socks") {
    return (
      <svg viewBox="0 0 420 260" role="img" aria-label="A pair of folded socks">
        <rect width="420" height="260" fill="#f1eee7" />
        <path d="M150 58h48v88l38 52a28 28 0 0 1-46 28L132 168V58h18Z" fill="#fff" stroke="#321b36" strokeWidth="2" />
        <path d="M222 70h48v88l38 52a28 28 0 0 1-46 28L204 180V70h18Z" fill="#eeedf8" stroke="#321b36" strokeWidth="2" />
        <text x="150" y="236" fill="#736675" fontFamily="Nunito Sans, sans-serif" fontSize="14">Not a luxury item. Just socks.</text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 420 260" role="img" aria-label="A roll of toilet paper on a bathroom shelf">
      <rect width="420" height="260" fill="#eeedf8" />
      <rect x="24" y="42" width="372" height="18" rx="3" fill="#d3ccd1" />
      <ellipse cx="210" cy="108" rx="78" ry="28" fill="#fff" stroke="#321b36" strokeWidth="2" />
      <path d="M132 108v86c0 16 35 30 78 30s78-14 78-30v-86" fill="#fff" stroke="#321b36" strokeWidth="2" />
      <ellipse cx="210" cy="108" rx="18" ry="8" fill="#eeedf8" stroke="#321b36" />
      <text x="132" y="236" fill="#736675" fontFamily="Nunito Sans, sans-serif" fontSize="14">The least glamorous errand on the list.</text>
    </svg>
  );
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
            Previous
          </button>
          <button type="button" onClick={next} aria-label="Next swap">
            Next
          </button>
        </div>
      </div>

      <div className="ip-carousel-stage">
        <article className="ip-swap-card">
          <div className="ip-swap-visual">
            <CategoryScene category={slide.category} />
          </div>
          <div className="ip-swap-body">
            <p className="ip-swap-kicker">What you already buy</p>
            <h3>{slide.everydayLabel}</h3>
            <p>{slide.everydayNote}</p>
          </div>
        </article>

        <p className="ip-swap-arrow" aria-hidden="true">
          <svg viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="30" fill="#eeedf8" stroke="#321b36" />
            <path d="M18 32h24M34 22l12 10-12 10" fill="none" stroke="#6679cc" strokeWidth="3" />
          </svg>
        </p>

        <article className="ip-swap-card ip-swap-card-alt">
          <div className="ip-swap-visual">
            {product.image ? (
              <img src={product.image} alt={`${product.brand} ${product.productName}`} />
            ) : (
              <CategoryScene category={slide.category} />
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
