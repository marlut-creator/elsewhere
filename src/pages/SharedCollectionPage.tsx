import EditorialChrome from "../components/EditorialChrome";
import SharedProductCard from "../components/SharedProductCard";
import { decodeSharedCollection } from "../data/sharedCollection";

export default function SharedCollectionPage({ encoded }: { encoded: string }) {
  const decoded = decodeSharedCollection(encoded);

  if (!decoded.ok) {
    return (
      <EditorialChrome page="explore">
        <section className="share-public-hero">
          <p className="story-eyebrow">A shared collection</p>
          <h1 className="share-public-title">This collection couldn&apos;t be opened.</h1>
          <p className="share-public-lead">
            {decoded.reason === "empty"
              ? "The products in this link are no longer in the Elsewhere catalog."
              : "The link looks incomplete or was copied incorrectly."}
          </p>
          <a className="story-cta" href="/explore">
            Find your own better places
          </a>
        </section>
      </EditorialChrome>
    );
  }

  return (
    <EditorialChrome page="explore">
      <section className="share-public-hero">
        <p className="story-eyebrow">A shared collection</p>
        <h1 className="share-public-title">Good things worth sharing.</h1>
        <p className="share-public-kicker">{decoded.title}</p>
        <p className="share-public-lead">
          Everyday swaps someone wanted you to see. This page shows public
          product details only — never purchases, amounts, or dates.
        </p>
      </section>

      <section className="share-public-grid-wrap">
        {decoded.omitted > 0 ? (
          <p className="share-public-omitted" role="status">
            {decoded.omitted === 1
              ? "One item from this collection is no longer listed."
              : `${decoded.omitted} items from this collection are no longer listed.`}
          </p>
        ) : null}
        <div
          className={
            decoded.products.length === 1
              ? "explore-grid"
              : decoded.products.length === 2
                ? "explore-grid explore-grid--pair"
                : "explore-grid"
          }
        >
          {decoded.products.map((product) => (
            <SharedProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="share-public-cta">
        <h2>Find your own better places</h2>
        <p>
          Search something you already buy, save the swaps you like, and make a
          collection of your own.
        </p>
        <a className="story-cta" href="/explore">
          Explore Elsewhere
        </a>
      </section>
    </EditorialChrome>
  );
}
