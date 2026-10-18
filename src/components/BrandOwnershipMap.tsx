import { IMPACT_BRAND_GROUPS } from "../data/editorialResearch";

export default function BrandOwnershipMap() {
  return (
    <figure className="own-map">
      <div className="own-map-grid">
        {IMPACT_BRAND_GROUPS.map((group) => (
          <article key={group.parent}>
            <h3>{group.parent}</h3>
            <ul>
              {group.brands.map((brand) => (
                <li key={brand}>{brand}</li>
              ))}
            </ul>
            <p>
              <a href={group.sourceUrl}>Brand directory</a>
            </p>
          </article>
        ))}
      </div>
      <figcaption>
        Everyday names listed on each parent&apos;s public brand directory. A
        sample, not a claim that these companies own every aisle.
      </figcaption>
    </figure>
  );
}
