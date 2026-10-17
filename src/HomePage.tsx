import { FormEvent, useEffect, useState } from "react";
import HomeMyElsewhereExample from "./components/HomeMyElsewhereExample";
import SitePromiseSection from "./components/SitePromiseSection";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import { HOW_IT_WORKS_STEPS } from "./data/howItWorksSteps";
import HomeEditorialScrollSection from "./components/HomeEditorialScrollSection";

const swaps = [
  { item: "Coffee", before: "Mainstream coffee", after: "Shelter Dog Coffee", price: "$17.99 / bag", cause: "Animal rescue", giving: "10% of qualifying online retail purchases donated to Heidi’s Village", source: "https://shelterdogcoffee.com", beforeImage: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=contain&w=650&q=85", afterImage: "https://cdn.shopify.com/s/files/1/0678/7376/7671/files/NoJackFlatBottomUpdated.png?v=1790286251" },
  { item: "Toilet paper", before: "Charmin Ultra Strong", after: "Who Gives A Crap", price: "Unit comparison pending", cause: "Global sanitation", giving: "50% of profits donated to sanitation organizations", source: "https://us.whogivesacrap.org/pages/our-impact", beforeImage: "https://images.openproductsfacts.org/images/products/003/700/075/3216/front_en.3.400.jpg", afterImage: "https://us.whogivesacrap.org/cdn/shop/files/who-gives-a-crap-logo-tp-share-image.png?v=1750223287&width=480" },
  { item: "Shampoo", before: "Pantene Active Nutri Plus", after: "Ethique Heali Kiwi", price: "Price comparison pending", cause: "Giving claim verification pending", giving: "Giving details pending verification", source: "https://ethique.com/pages/impact", beforeImage: "https://images.openfoodfacts.org/images/products/870/021/642/1102/front_it.3.400.jpg", afterImage: "https://ethique.com/cdn/shop/files/HeroShot-Heali-Kiwi.jpg?v=1695618620" },
  { item: "Pet treats", before: "Bone Active treats", after: "Project Hive Chew Sticks", price: "Price comparison pending", cause: "Giving claim verification pending", giving: "Giving details pending verification", source: "https://projecthivepetcompany.com/pages/our-mission", beforeImage: "https://images.openfoodfacts.org/images/products/931/023/296/0500/front_en.3.400.jpg", afterImage: "https://cdn.shopify.com/s/files/1/0274/2973/2438/files/XL_Pumpkin_Chew_Sticks_18.3_oz_4ab375bf-86ae-4c89-96aa-6c7c610f5d1a.png?v=1752059781" },
  { item: "Soap", before: "Dove Pampering bar", after: "Ethique body bar", price: "Price comparison pending", cause: "Giving claim verification pending", giving: "Giving details pending verification", source: "https://ethique.com/pages/impact", beforeImage: "https://images.openbeautyfacts.org/images/products/871/160/080/4357/front_en.5.400.jpg", afterImage: "https://ethique.com/cdn/shop/files/HeroShot-Heali-Kiwi.jpg?v=1695618620" },
];

function Arrow() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"/></svg>;
}

type SearchFormProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: (event?: FormEvent) => void;
  inputId: string;
};

function SearchForm({ query, onQueryChange, onSubmit, inputId }: SearchFormProps) {
  return (
    <form className="search-box" onSubmit={onSubmit}>
      <label htmlFor={inputId}>What are you looking for?</label>
      <div>
        <input
          id={inputId}
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search for something you already buy..."
        />
        <button type="submit">
          Search <Arrow />
        </button>
      </div>
    </form>
  );
}

export default function HomePage() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (window.location.hash !== "#how-it-works") return;
    const target = document.getElementById("how-it-works");
    if (!target) return;
    window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const search = (event?: FormEvent) => {
    event?.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    window.location.assign(`/explore?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <main className="home-page">
      <SiteHeader currentPage="home" />

      <section className="hero">
        <div className="hero-copy">
          <h1>
            You&apos;re buying it <span>anyway.</span>
          </h1>
          <p className="subhead">
            Maybe a billion-dollar company doesn&apos;t need this one. Buy it
            elsewhere.
          </p>
        </div>
        <SearchForm
          inputId="search"
          query={query}
          onQueryChange={setQuery}
          onSubmit={search}
        />
        <p className="search-note">
          No account needed to find a swap. No checkout — we send you straight
          to the seller.
        </p>
      </section>

      <section className="swaps" id="swaps">
        <div className="section-heading section-heading-swaps">
          <div>
            <p className="eyebrow">A few ideas</p>
            <h2>Small swaps. Real impact.</h2>
            <p className="swaps-section-subtitle">
              Even one regular monthly purchase can make a difference when you
              choose a business that gives back.
            </p>
          </div>
        </div>
        <div className="swap-rail">
          {swaps.map((swap) => (
            <article className="swap-card" key={swap.item}>
              <p className="swap-item">{swap.item}</p>
              <div className="swap-photos">
                <figure>
                  <img src={swap.beforeImage} alt={swap.before} />
                  <figcaption>
                    {swap.before}
                    <strong>Price pending</strong>
                  </figcaption>
                </figure>
                <span className="swap-arrow">
                  <Arrow />
                </span>
                <figure>
                  <img src={swap.afterImage} alt={swap.after} />
                  <figcaption>
                    {swap.after}
                    <strong>{swap.price}</strong>
                  </figcaption>
                </figure>
              </div>
              <div className="swap-impact">
                <span className="difference">Difference pending</span>
                <div>
                  <span>{swap.cause}</span>
                  <strong>{swap.giving}</strong>
                  <a href={swap.source} target="_blank" rel="noreferrer">
                    View source
                  </a>
                </div>
              </div>
              <p className="annual-impact">
                Swap for a year <span>→</span> See estimated impact
              </p>
            </article>
          ))}
        </div>
        <p className="rail-note">
          Scroll for more <Arrow />
        </p>
      </section>

      <section
        className="home-everyday-editorial home-section-wide"
        aria-labelledby="everyday-heading"
      >
        <div className="home-everyday-editorial-visual">
          <figure className="everyday-editorial-photo">
            <img
              src="/editorial-assets/everyday-household-still-life.jpg"
              alt="Kitchen table with everyday essentials: coffee, soap, toilet paper, and a dish of pet treats"
            />
          </figure>
        </div>
        <div className="home-everyday-editorial-copy">
          <p className="eyebrow">The things you already buy.</p>
          <h2 id="everyday-heading">Just from better places.</h2>
          <p>
            Coffee. Soap. Pet treats. The ordinary stuff doesn&apos;t change.
            Where you buy it can.
          </p>
        </div>
      </section>

      <HomeEditorialScrollSection />

      <section className="home-how-it-works home-section-wide" id="how-it-works">
        <h2 className="home-how-title">How Elsewhere works</h2>
        <div className="home-story-cards">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <article
              key={step.num}
              className={`home-story-card home-story-card--${step.tone}`}
            >
              <div className="home-story-card-visual home-story-card-photo">
                <img src={step.imageUrl} alt={step.imageAlt} loading="lazy" />
              </div>
              <span className="home-story-card-num">{step.num}</span>
              <h3 className="home-story-card-title">{step.title}</h3>
              <p className="home-story-card-detail">{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-my-elsewhere-teaser home-section-wide">
        <div className="home-my-elsewhere-copy">
          <p className="eyebrow">After you buy</p>
          <h2>See where your everyday spending adds up.</h2>
          <p>
            Log purchases you actually make to see money redirected, businesses
            supported, and impact areas over time — not saved swaps.
          </p>
          <a className="home-my-elsewhere-cta" href="/my-elsewhere">
            See My Elsewhere <span aria-hidden="true">→</span>
          </a>
        </div>
        <HomeMyElsewhereExample />
      </section>

      <SitePromiseSection />
      <SiteFooter />
    </main>
  );
}
