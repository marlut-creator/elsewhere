import BrandOwnershipMap from "../components/BrandOwnershipMap";
import EditorialChrome from "../components/EditorialChrome";
import EditorialIllustration from "../components/EditorialIllustration";
import { SITE_IMAGES } from "../data/siteImages";

function MissionHeroVisual() {
  const photo = SITE_IMAGES.amazonRainforest;
  return (
    <figure className="ms-hero-visual">
      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
      />
      <figcaption>
        {photo.credit}. {photo.license}. Amazon rainforest near Manaus, Brazil.
      </figcaption>
    </figure>
  );
}

function MissionSwapVisual() {
  return (
    <figure className="ms-swap-visual">
      <ol>
        <li>
          <EditorialIllustration name="coffee" />
          <div>
            <p className="ms-swap-kicker">Everyday product</p>
            <p>A regular bag of coffee</p>
          </div>
        </li>
        <li>
          <img
            src="/product-assets/cat-rescue-house-blend.jpg"
            alt="Cat Rescue Coffee Company House Blend bag"
          />
          <div>
            <p className="ms-swap-kicker">A better alternative</p>
            <p>Cat Rescue Coffee, House Blend</p>
          </div>
        </li>
        <li>
          <EditorialIllustration name="pet-food" />
          <div>
            <p className="ms-swap-kicker">A cause receiving support</p>
            <p>Animal welfare, as the seller documents it</p>
          </div>
        </li>
      </ol>
      <figcaption>
        One ordinary restock can move toward a business that publishes where
        the money goes. The destination is the seller&apos;s published claim,
        not a counted outcome from this cart.
      </figcaption>
    </figure>
  );
}

export default function MissionPage() {
  return (
    <EditorialChrome page="mission">
      <section className="ms-hero">
        <div className="ms-hero-copy">
          <p className="story-eyebrow story-eyebrow-on-plum">Mission</p>
          <h1 className="ms-hero-title">
            They won&apos;t do it.
            <span>So we will.</span>
          </h1>
          <p>
            A handful of enormous companies still collect a surprising amount of
            the money we spend on coffee, soap, and toothpaste. Waiting for those
            companies to put people and the planet first has not been a winning
            strategy, and most of us never get a clear look at where an ordinary
            checkout actually goes.
          </p>
          <p>
            Elsewhere is a simpler response. If you were already going to buy the
            thing, it should be easier to find a business that publishes what it
            does with the money.
          </p>
        </div>
        <MissionHeroVisual />
      </section>

      <section className="ms-section ms-toothpaste">
        <div className="ms-prose">
          <h2>How did buying toothpaste get so complicated?</h2>
          <p>
            A drugstore aisle can look like a festival of choice: different
            colors, different promises, different mascots. Look at the parent
            companies behind a few of those labels, though, and the wall of
            options starts to collapse into a much shorter list. A new logo is
            not always a new destination for the sale.
          </p>
          <p>
            Finding that out usually means wandering through brand directories
            and sustainability pages, which is a terrible way to spend a
            Tuesday. Elsewhere exists to do some of that homework in advance:
            who sells a comparable product, what they say they do with the
            money, and where you can read the claim yourself. That is not an
            argument that a handful of firms own every shelf in America. It is
            an argument that ownership is worth seeing before you assume a
            label means independence.
          </p>
        </div>
        <BrandOwnershipMap />
      </section>

      <section className="ms-section ms-afford">
        <div className="ms-prose">
          <h2 className="ms-afford-title">
            You shouldn&apos;t have to spend more
            <span>to do more good.</span>
          </h2>
          <p>
            When groceries, rent, and just about everything else keep getting
            more expensive, asking people to spend additional money to make a
            difference feels increasingly out of touch. Most of us aren&apos;t
            looking for another cause to donate to. We&apos;re just trying to
            figure out whether the things we&apos;re already buying could
            support something better.
          </p>
          <p>
            Elsewhere is not here to grow your cart. Some of the alternatives
            cost less, some land in the same neighborhood, and some cost more.
            We try to show those differences plainly so you can decide what
            fits. If a swap is not in the budget this month, that is a complete
            answer.
          </p>
        </div>
        <MissionSwapVisual />
      </section>

      <section className="ms-independence">
        <div className="ms-independence-head">
          <h2>
            No ads.
            <span>No sponsors.</span>
            <span>No commissions.</span>
            <em>Ever.</em>
          </h2>
        </div>
        <ul className="ms-independence-cards">
          <li>
            <p className="ms-card-kicker">No paid placements</p>
            <p>Brands cannot buy a better ranking.</p>
          </li>
          <li>
            <p className="ms-card-kicker">No affiliate commissions</p>
            <p>Elsewhere does not earn a percentage of purchases.</p>
          </li>
          <li>
            <p className="ms-card-kicker">No sponsorships</p>
            <p>Recommendations are not sold to advertisers or corporate partners.</p>
          </li>
        </ul>
        <p className="ms-independence-note">
          Recommendations that can be bought are hard to trust, especially when
          the whole point of the site is helping you decide who gets your money.
          If Elsewhere ever covers hosting with tips or a few stickers, that
          still will not put ads or commissions in the mix.
        </p>
        <p className="ms-independence-links">
          <a href="/how-products-are-selected">How products are selected</a>
          {" · "}
          <a href="/how-we-verify">How we verify claims</a>
        </p>
      </section>

      <section className="ms-section ms-close">
        <h2>
          They might have billions.
          <span>But there are millions of us making millions of decisions.</span>
        </h2>
        <p>
          One person switching coffee brands will not rewrite campaign finance
          or replace regulation, and those larger fights still matter. Everyday
          purchases are a smaller lever, and they are one most of us already
          pull without thinking about it. Elsewhere is trying to make that
          particular decision a little less opaque, so ordinary checkouts have
          a clearer chance of landing somewhere we actually meant.
        </p>
        <div className="story-cta-row">
          <a className="story-cta" href="/explore">
            Explore better places
          </a>
          <a className="story-cta-secondary" href="/about">
            Meet the founder
          </a>
        </div>
      </section>
    </EditorialChrome>
  );
}
