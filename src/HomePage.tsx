import { FormEvent, useState } from "react";
import elsewhereLogo from "./assets/elsewhere-logo.png";

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

function Logo() {
  return (
    <a className="logo" href="/" aria-label="Elsewhere home">
      <img src={elsewhereLogo} alt="Elsewhere" />
    </a>
  );
}

export default function HomePage() {
  const [query, setQuery] = useState("");

  const search = (event?: FormEvent) => {
    event?.preventDefault();
    if (!query.trim()) return;
    window.location.href = `/explore?q=${encodeURIComponent(query.trim())}`;
  };

  return (
    <main className="home-page">
      <header>
        <Logo />
        <nav><a href="#swaps">See the swaps</a><a href="#trust">How it works</a></nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <h1>You’re buying it <span>anyway.</span></h1>
          <p className="subhead">Maybe a billion-dollar company doesn’t need this one. Buy it elsewhere.</p>
        </div>
        <form className="search-box" onSubmit={search}>
          <label htmlFor="search">What are you looking for?</label>
          <div>
            <input id="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search for something you already buy..." />
            <button type="submit">Search <Arrow /></button>
          </div>
        </form>
        <p className="search-note">No account. No checkout. We send you straight to the seller.</p>
      </section>

      <section className="swaps" id="swaps">
        <div className="section-heading">
          <div><p className="eyebrow">A few ideas</p><h2>Small swaps. Real impact.</h2></div>
          <p>Same kind of thing. A little more good.</p>
        </div>
        <div className="swap-rail">
          {swaps.map((swap) => (
            <article className="swap-card" key={swap.item}>
              <p className="swap-item">{swap.item}</p>
              <div className="swap-photos">
                <figure><img src={swap.beforeImage} alt={swap.before}/><figcaption>{swap.before}<strong>Price pending</strong></figcaption></figure>
                <span className="swap-arrow"><Arrow /></span>
                <figure><img src={swap.afterImage} alt={swap.after}/><figcaption>{swap.after}<strong>{swap.price}</strong></figcaption></figure>
              </div>
              <div className="swap-impact">
                <span className="difference">Difference pending</span>
                <div><span>{swap.cause}</span><strong>{swap.giving}</strong><a href={swap.source} target="_blank" rel="noreferrer">View source</a></div>
              </div>
              <p className="annual-impact">Swap for a year <span>→</span> See estimated impact</p>
            </article>
          ))}
        </div>
        <p className="rail-note">Scroll for more <Arrow /></p>
      </section>

      <section className="impact">
        <div><p className="eyebrow">Think about the receipt</p><h2>Your money is<br/>going somewhere.<br/>The question is<br/>where.</h2></div>
        <div className="impact-stats">
          <div><strong>$7.1 trillion</strong><span className="stat-description">Annual U.S. retail sales</span><a href="https://www.census.gov/retail/index.html" target="_blank" rel="noreferrer">U.S. Census Bureau, 2024</a></div>
          <div><strong>$6,224</strong><span className="stat-description">Average annual U.S. household grocery spending</span><a href="https://www.bls.gov/cex/" target="_blank" rel="noreferrer">U.S. Bureau of Labor Statistics, 2024</a></div>
          <div><strong>84%</strong><span className="stat-description">Say sharing values with a brand matters when buying</span><a href="https://www.edelman.com/trust/2024/trust-barometer/special-report-brands-and-politics" target="_blank" rel="noreferrer">2024 Edelman global survey</a></div>
          <div><strong>$600</strong><span className="stat-description">Redirected each year by swapping $50/month of purchases</span><span className="stat-source">Illustrative calculation</span><small>$50 × 12. Spending redirected to different sellers, not $600 donated.</small></div>
        </div>
        <p className="impact-copy">You don’t have to buy more to make a difference. Sometimes you just have to buy from someone different.</p>
      </section>

      <section className="trust" id="trust">
        <p className="eyebrow">Our promise</p>
        <h2>No ads. No sponsored rankings. <span>Ever.</span></h2>
        <p>We work for the shopper, not the brands.</p>
      </section>

      <footer><Logo /><p>Don’t buy more. Buy differently.</p><p>Independent and human-made.</p></footer>
    </main>
  );
}
