import { FormEvent, useState } from "react";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import HomePage from "./HomePage";

type Product = {
  brand: string;
  name: string;
  price: string;
  size: string;
  cause: string;
  giving: string;
  beneficiary: string;
  image: string;
  seller: string;
  source: string;
  verified: boolean;
};

const toiletPaperProducts: Product[] = [
  {
    brand: "Who Gives A Crap",
    name: "100% Recycled Toilet Paper",
    price: "$68.00",
    size: "48 rolls",
    cause: "Global sanitation",
    giving: "50% of profits donated to sanitation organizations",
    beneficiary: "Sanitation organizations worldwide",
    image: "https://cdn.shopify.com/s/files/1/1320/9925/files/US-Recycled-Wirecutter.jpg?v=1757046123",
    seller: "https://us.whogivesacrap.org/products/100-recycled-toilet-paper",
    source: "https://us.whogivesacrap.org/pages/our-impact",
    verified: true,
  },
  {
    brand: "Reel",
    name: "Bamboo Toilet Paper",
    price: "$43.99",
    size: "24 rolls",
    cause: "Giving details pending verification",
    giving: "Giving details pending verification",
    beneficiary: "Pending verification",
    image: "https://cdn.shopify.com/s/files/1/0035/9468/2435/products/reel-bamboo-toilet-paper-paper-reel-paper-735854.png?v=1665563176",
    seller: "https://reelpaper.com/products/bamboo-toilet-paper",
    source: "https://reelpaper.com/pages/our-story",
    verified: false,
  },
  {
    brand: "PlantPaper",
    name: "Bamboo Toilet Paper",
    price: "$44.00",
    size: "16 rolls",
    cause: "Giving details pending verification",
    giving: "Giving details pending verification",
    beneficiary: "Pending verification",
    image: "https://cdn.shopify.com/s/files/1/0247/1202/0052/products/PP-Icon-16.png?v=1679515704",
    seller: "https://plantpaper.us",
    source: "https://plantpaper.us/pages/about",
    verified: false,
  },
];

const coffeeProducts: Product[] = [
  {
    brand: "Shelter Dog Coffee",
    name: "No Jack Decaf Medium Roast",
    price: "$21.99",
    size: "Size shown by seller",
    cause: "Animal rescue",
    giving: "10% of qualifying online retail purchases donated",
    beneficiary: "Heidi’s Village",
    image: "https://cdn.shopify.com/s/files/1/0678/7376/7671/files/NoJackFlatBottomUpdated.png?v=1790286251",
    seller: "https://shelterdogcoffee.com/products/no-jack-decaf-roast-coffee",
    source: "https://shelterdogcoffee.com",
    verified: true,
  },
  {
    brand: "Shelter Dog Coffee",
    name: "Wiley’s Wish — Ziggaloo",
    price: "$19.99",
    size: "12 oz",
    cause: "Animal rescue",
    giving: "10% of qualifying online retail purchases donated",
    beneficiary: "Heidi’s Village",
    image: "https://cdn.shopify.com/s/files/1/0678/7376/7671/files/ZigFlatBottomUpdated.png?v=1790284140",
    seller: "https://shelterdogcoffee.com/products/wileys-wish-ziggaloo",
    source: "https://shelterdogcoffee.com",
    verified: true,
  },
  {
    brand: "Grounds & Hounds",
    name: "Cinnamon Roll Coffee",
    price: "$17.99",
    size: "Size shown by seller",
    cause: "Giving details pending verification",
    giving: "Giving details pending verification",
    beneficiary: "Pending verification",
    image: "https://cdn.shopify.com/s/files/1/0359/3609/products/GH_CoffeeProduct-wTastingNotes-CinnamonRoll.jpg?v=1635523440",
    seller: "https://groundsandhoundscoffee.com/products/cinnamon-roll-flavored-coffee",
    source: "https://groundsandhoundscoffee.com/pages/our-impact",
    verified: false,
  },
];

function Arrow() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"/></svg>;
}

function Chevron() {
  return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4"/></svg>;
}

function ExplorePage() {
  const initialQuery = new URLSearchParams(window.location.search).get("q") || "toilet paper";
  const [query, setQuery] = useState(initialQuery);
  const [submittedQuery, setSubmittedQuery] = useState(initialQuery);
  const [saved, setSaved] = useState<string[]>([]);

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    const nextQuery = query.trim() || "toilet paper";
    setQuery(nextQuery);
    setSubmittedQuery(nextQuery);
    window.history.replaceState({}, "", `/explore?q=${encodeURIComponent(nextQuery)}`);
  };
  const toggleSaved = (brand: string) => {
    setSaved((current) => current.includes(brand) ? current.filter((item) => item !== brand) : [...current, brand]);
  };

  const normalizedQuery = submittedQuery.toLowerCase();
  const products = normalizedQuery.includes("coffee")
    ? coffeeProducts
    : normalizedQuery.includes("toilet")
      ? toiletPaperProducts
      : [];

  return (
    <main>
      <SiteHeader />

      <section className="explore-top">
        <form className="explore-search" onSubmit={submitSearch}>
          <label htmlFor="explore-query">What are you looking for?</label>
          <div>
            <input id="explore-query" value={query} onChange={(event) => setQuery(event.target.value)} />
            <button type="submit">Search <Arrow /></button>
          </div>
        </form>

        <div className="results-intro">
          <p className="eyebrow">Swap what you already buy</p>
          <h1>Better places to buy <span>{submittedQuery}.</span></h1>
          <p>Everyday alternatives that put some of your money somewhere different.</p>
        </div>
      </section>

      <section className="explore-results" id="results">
        <div className="filter-row" aria-label="Result filters">
          <div className="filter-group">
            {["Cause", "Price", "Giving model"].map((filter) => (
              <button key={filter} type="button">{filter}<Chevron /></button>
            ))}
          </div>
          <button type="button">Sort: Best match<Chevron /></button>
        </div>

        <div className="explore-grid">
          {products.map((product) => {
            const isSaved = saved.includes(product.brand);
            return (
              <article className="explore-card" key={product.brand}>
                <div className="card-image">
                  <img src={product.image} alt={`${product.brand} ${product.name} packaging`}/>
                  <button
                    className={isSaved ? "save-button saved" : "save-button"}
                    onClick={() => toggleSaved(product.brand)}
                    type="button"
                    aria-pressed={isSaved}
                  >
                    <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 3.5h10v14L10 14l-5 3.5v-14Z" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeLinejoin="round" strokeWidth="1.4"/></svg>
                    {isSaved ? "Saved" : "Save swap"}
                  </button>
                </div>

                <div className="card-body">
                  <p className="brand-name">{product.brand}</p>
                  <div className="card-title">
                    <h2>{product.name}</h2>
                    <p><strong>{product.price}</strong><span>{product.size}</span></p>
                  </div>

                  <dl className="giving-details">
                    <div><dt>Cause</dt><dd>{product.cause}</dd></div>
                    <div><dt>Giving</dt><dd>{product.giving}</dd></div>
                    <div><dt>Beneficiary</dt><dd>{product.beneficiary}</dd></div>
                  </dl>

                  <p className="annual-impact">Swap for a year <span>→</span> See estimated impact</p>
                  <a className="verify-link" href={product.source} target="_blank" rel="noreferrer">
                    {product.verified ? "How we verified this" : "Verification pending"} <span>→</span>
                  </a>
                  <a className="seller-link" href={product.seller} target="_blank" rel="noreferrer">
                    Visit seller <Arrow />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

      </section>
      <SiteFooter />
    </main>
  );
}

export default function App() {
  return window.location.pathname === "/" ? <HomePage /> : <ExplorePage />;
}
