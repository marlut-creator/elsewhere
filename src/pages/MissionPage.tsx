import EditorialChrome from "../components/EditorialChrome";

function MissionHeroVisual() {
  return (
    <figure className="ms-hero-visual">
      <svg viewBox="0 0 420 360" role="img" aria-label="Everyday purchases moving toward causes instead of a faceless corporation">
        <rect x="8" y="18" width="404" height="324" rx="18" fill="#4a2a50" />
        <rect x="28" y="38" width="150" height="118" rx="12" fill="#eeedf8" />
        <path d="M58 78h52v46a14 14 0 0 1-14 14h-24a14 14 0 0 1-14-14V78Z" fill="none" stroke="#321b36" strokeWidth="3" />
        <path d="M110 86h16a10 10 0 0 1 0 20h-16" fill="none" stroke="#321b36" strokeWidth="3" />
        <path d="M68 58c2 8 2 12 0 18M88 54c3 9 3 14 0 20" fill="none" stroke="#6679cc" strokeWidth="2.4" strokeLinecap="round" />
        <text x="48" y="138" fill="#321b36" fontFamily="Dosis, sans-serif" fontSize="13" fontWeight="600">Coffee</text>
        <rect x="196" y="46" width="88" height="88" rx="12" fill="#f7f3e8" />
        <rect x="214" y="78" width="52" height="28" rx="7" fill="none" stroke="#321b36" strokeWidth="3" />
        <path d="M226 78c4-12 30-12 34 0" fill="none" stroke="#6679cc" strokeWidth="2.4" />
        <text x="216" y="124" fill="#321b36" fontFamily="Dosis, sans-serif" fontSize="13" fontWeight="600">Soap</text>
        <rect x="302" y="38" width="90" height="118" rx="12" fill="#eeedf8" />
        <ellipse cx="347" cy="78" rx="22" ry="12" fill="none" stroke="#321b36" strokeWidth="3" />
        <path d="M325 78v42c0 8 10 14 22 14s22-6 22-14V78" fill="none" stroke="#321b36" strokeWidth="3" />
        <text x="318" y="142" fill="#321b36" fontFamily="Dosis, sans-serif" fontSize="13" fontWeight="600">Paper</text>
        <path d="M102 168v28M240 148v48M347 168v28" stroke="#9faee8" strokeWidth="2.4" strokeDasharray="4 6" />
        <path d="M102 196h245" stroke="#9faee8" strokeWidth="2.4" />
        <path d="M347 196v22" stroke="#9faee8" strokeWidth="2.4" />
        <circle cx="210" cy="248" r="46" fill="#6679cc" />
        <path d="M192 250c8-16 36-16 36 0-8 18-18 28-18 28s-10-10-18-28Z" fill="#f7f3e8" />
        <text x="154" y="318" fill="#eeedf8" fontFamily="Dosis, sans-serif" fontSize="15" fontWeight="600">Somewhere better</text>
      </svg>
    </figure>
  );
}

function MissionLabelVisual() {
  return (
    <figure className="ms-label-visual">
      <svg viewBox="0 0 360 280" role="img" aria-label="Several product labels collapsing toward a smaller set of parent companies">
        <rect x="12" y="16" width="96" height="72" rx="8" fill="#fff" stroke="#321b36" />
        <text x="28" y="58" fill="#321b36" fontFamily="Dosis, sans-serif" fontSize="16" fontWeight="600">Brand A</text>
        <rect x="122" y="16" width="96" height="72" rx="8" fill="#eeedf8" stroke="#321b36" />
        <text x="138" y="58" fill="#321b36" fontFamily="Dosis, sans-serif" fontSize="16" fontWeight="600">Brand B</text>
        <rect x="232" y="16" width="96" height="72" rx="8" fill="#fff" stroke="#321b36" />
        <text x="248" y="58" fill="#321b36" fontFamily="Dosis, sans-serif" fontSize="16" fontWeight="600">Brand C</text>
        <path d="M60 88v36h220V88" fill="none" stroke="#6679cc" strokeWidth="2.2" />
        <rect x="86" y="124" width="188" height="56" rx="10" fill="#321b36" />
        <text x="118" y="158" fill="#f7f3e8" fontFamily="Dosis, sans-serif" fontSize="18" fontWeight="600">One parent</text>
        <text x="46" y="214" fill="#736675" fontFamily="Nunito Sans, sans-serif" fontSize="13">A sample of how labels can share an owner.</text>
        <text x="46" y="234" fill="#9b8e97" fontFamily="Nunito Sans, sans-serif" fontSize="12">Not a claim that a few firms own every aisle.</text>
      </svg>
    </figure>
  );
}

function MissionReceiptVisual() {
  return (
    <figure className="ms-receipt-visual">
      <svg viewBox="0 0 360 300" role="img" aria-label="A household receipt with the usual costs still on it">
        <rect x="58" y="18" width="244" height="264" rx="8" fill="#fff" stroke="#321b36" />
        <path d="M70 42h220M70 54h160" stroke="#d3ccd1" strokeWidth="3" strokeLinecap="round" />
        <text x="78" y="88" fill="#321b36" fontFamily="Dosis, sans-serif" fontSize="20" fontWeight="600">Usual stuff</text>
        <text x="78" y="122" fill="#736675" fontFamily="Nunito Sans, sans-serif" fontSize="14">Coffee</text>
        <text x="232" y="122" fill="#321b36" fontFamily="Nunito Sans, sans-serif" fontSize="14">still buying</text>
        <text x="78" y="148" fill="#736675" fontFamily="Nunito Sans, sans-serif" fontSize="14">Soap</text>
        <text x="232" y="148" fill="#321b36" fontFamily="Nunito Sans, sans-serif" fontSize="14">still buying</text>
        <text x="78" y="174" fill="#736675" fontFamily="Nunito Sans, sans-serif" fontSize="14">Paper</text>
        <text x="232" y="174" fill="#321b36" fontFamily="Nunito Sans, sans-serif" fontSize="14">still buying</text>
        <path d="M78 196h204" stroke="#eeedf8" strokeWidth="2" />
        <text x="78" y="226" fill="#6679cc" fontFamily="Dosis, sans-serif" fontSize="16" fontWeight="600">New item: none</text>
        <text x="78" y="250" fill="#9b8e97" fontFamily="Nunito Sans, sans-serif" fontSize="12">The cart does not have to grow.</text>
      </svg>
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
        <MissionLabelVisual />
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
        <MissionReceiptVisual />
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
