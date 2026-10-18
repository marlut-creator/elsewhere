import type { BrowseCategorySlug } from "../data/browseCategories";
import { TILE_CATEGORIES } from "../data/shopCategories";
import { CategoryIcon } from "./CategoryIcons";

type Props = {
  onSurpriseMe: () => void;
};

export default function ExploreShopByCategory({ onSurpriseMe }: Props) {
  return (
    <section className="explore-shop-categories" aria-labelledby="shop-categories-heading">
      <div className="explore-shop-categories-head">
        <h2 id="shop-categories-heading" className="explore-shop-categories-title">
          Shop by category
        </h2>
        <button type="button" className="explore-surprise-cta" onClick={onSurpriseMe}>
          <span aria-hidden="true">✦</span> Surprise me
        </button>
      </div>
      <ul className="explore-category-tile-grid">
        {TILE_CATEGORIES.map((cat) => (
          <li key={cat.slug}>
            <a href={cat.href} className="explore-category-tile">
              <CategoryIcon
                slug={cat.slug as BrowseCategorySlug}
                className="explore-category-tile-icon"
              />
              <span className="explore-category-tile-name">{cat.label}</span>
              <span className="explore-category-tile-examples">{cat.examples}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
