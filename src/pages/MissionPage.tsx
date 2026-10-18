import { EDITORIAL_ASSETS } from "../data/editorialAssets";
import EditorialChrome from "../components/EditorialChrome";

const essentials = [
  { label: "Coffee", mark: "mug" },
  { label: "Toilet paper", mark: "roll" },
  { label: "Soap", mark: "bar" },
  { label: "Pet supplies", mark: "bowl" },
] as const;

function EssentialMark({ mark }: { mark: (typeof essentials)[number]["mark"] }) {
  if (mark === "mug") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path
          d="M12 18h18v14a7 7 0 0 1-7 7h-4a7 7 0 0 1-7-7V18Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M30 21h5a4 4 0 0 1 0 8h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M16 10c1 3 1 5 0 7M22 9c1 3 1 6 0 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (mark === "roll") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <ellipse
          cx="24"
          cy="14"
          rx="11"
          ry="6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M13 14v18c0 3.3 4.9 6 11 6s11-2.7 11-6V14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <ellipse cx="24" cy="14" rx="3" ry="1.6" fill="currentColor" />
      </svg>
    );
  }
  if (mark === "bar") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect
          x="10"
          y="18"
          width="28"
          height="14"
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M16 18c2-5 14-5 16 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <ellipse
        cx="24"
        cy="30"
        rx="14"
        ry="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 22c3-6 21-6 24 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="18" cy="20" r="1.4" fill="currentColor" />
      <circle cx="30" cy="20" r="1.4" fill="currentColor" />
    </svg>
  );
}

export default function MissionPage() {
  return (
    <EditorialChrome page="mission">
      <section className="mission-hero">
        <p className="story-eyebrow story-eyebrow-on-plum">Mission</p>
        <h1 className="mission-hero-title">
          They won&apos;t do it.
          <span>So we will.</span>
        </h1>
        <div className="mission-hero-copy">
          <p>
            We&apos;re tired of waiting for billion-dollar companies to put
            people and the planet first.
          </p>
          <p>
            We&apos;re tired of being told that meaningful change has to come
            from the top.
          </p>
          <p>
            And we&apos;re tired of feeling like every ordinary purchase sends
            our money somewhere we never intended.
          </p>
          <p className="mission-hero-close">
            So we&apos;re making it easier to choose somewhere else.
          </p>
        </div>
      </section>

      <section className="mission-frustration">
        <h2 className="story-display">
          How did buying toothpaste get so complicated?
        </h2>
        <div className="mission-frustration-grid">
          <p>
            Walk down a drugstore aisle and it can feel like a wall of
            different brands. Look a little closer, and many of those labels
            share a parent company. A different logo is not always a different
            destination for your money.
          </p>
          <p>
            Figuring that out usually means a scavenger hunt through corporate
            brand directories, sustainability pages, and press releases. Most
            people do not have an afternoon to research who owns their
            toothpaste.
          </p>
          <p>
            Meanwhile, money in politics is not a secret. Lobbying is paid
            advocacy about laws and rules. Ordinary shoppers can feel that
            influence without ever seeing a receipt for it — and without a
            clear way to opt into a different set of priorities.
          </p>
          <p>
            Groceries cost more. Rent costs more. A lot of us, especially
            younger people trying to build a life on a regular paycheck, were
            told we could vote with our wallets. Then the wallet turned out to
            have almost no map.
          </p>
        </div>
        <p className="mission-frustration-note">
          This is about incentives and visibility, not a claim that every large
          company never helps anyone, or that a handful of firms own
          everything.
        </p>
      </section>

      <section className="mission-afford">
        <h2 className="mission-afford-title">
          You shouldn&apos;t have to spend more
          <span>to do more good.</span>
        </h2>
        <div className="mission-afford-layout">
          <div className="mission-afford-copy">
            <p>Rent is expensive. Groceries are expensive. Everything is expensive.</p>
            <p>
              Most people aren&apos;t sitting on a pile of disposable income
              waiting for a good cause. They&apos;re trying to make it to their
              next paycheck.
            </p>
            <p>
              And somehow we&apos;re still being told to donate more, shop
              ethically, and do our part.
            </p>
            <p className="mission-afford-question">With what money?</p>
            <p>
              Elsewhere isn&apos;t here to convince you to buy something you
              don&apos;t need. We&apos;re here to help you find alternatives for
              things you were already going to buy.
            </p>
            <p>
              Some swaps cost less. Some cost about the same. Others cost more.
              We want to make those differences clear so you can decide what
              works for your budget.
            </p>
            <p className="mission-afford-ok">
              And if you can&apos;t afford to switch right now, that&apos;s okay
              too.
            </p>
          </div>
          <div className="mission-afford-visual">
            <figure className="mission-afford-photo">
              <img
                src={EDITORIAL_ASSETS.everydayHousehold.src}
                alt={EDITORIAL_ASSETS.everydayHousehold.alt}
                width="1200"
                height="900"
              />
            </figure>
            <ul className="mission-essential-list">
              {essentials.map((item) => (
                <li key={item.label}>
                  <EssentialMark mark={item.mark} />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mission-principles" aria-label="Three principles">
        <article className="mission-principle">
          <p className="mission-principle-index">01</p>
          <div>
            <h2>Buy what you already need</h2>
            <p className="mission-principle-lead">
              We&apos;re not here to sell you more stuff.
            </p>
            <p>
              The useful unit of change is the purchase you were going to make
              anyway — coffee, soap, paper goods, pet food. Not a new identity.
              Not a cart full of extras.
            </p>
          </div>
        </article>
        <article className="mission-principle mission-principle-alt">
          <p className="mission-principle-index">02</p>
          <div>
            <h2>Know who gets your money</h2>
            <p className="mission-principle-lead">
              Ownership, giving commitments, and business priorities
              shouldn&apos;t be a mystery.
            </p>
            <p>
              We look for documented commitments and publish how products are
              selected. If a claim is too vague to describe honestly, we say
              so.
            </p>
          </div>
        </article>
        <article className="mission-principle">
          <p className="mission-principle-index">03</p>
          <div>
            <h2>Make small changes together</h2>
            <p className="mission-principle-lead">
              One purchase won&apos;t fix everything. But millions of everyday
              choices can influence which businesses succeed.
            </p>
            <p>
              That is not a substitute for policy or accountability. It is one
              lever ordinary people already have, used on purpose.
            </p>
          </div>
        </article>
      </section>

      <section className="mission-independence">
        <h2 className="mission-independence-title">
          No ads.
          <span>No sponsors.</span>
          <span>No commissions.</span>
          <em>Ever.</em>
        </h2>
        <div className="story-narrow mission-independence-copy">
          <p>Businesses can&apos;t pay to appear higher in our results.</p>
          <p>We don&apos;t take a cut when you purchase something.</p>
          <p>Our recommendations aren&apos;t for sale.</p>
          <p>
            Businesses are evaluated using documented giving commitments and
            published selection criteria — not payments, ads, or affiliate
            cuts.
          </p>
          <p>
            <a href="/how-products-are-selected">How products are selected</a>
            {" · "}
            <a href="/how-we-verify">How we verify claims</a>
          </p>
        </div>
      </section>

      <section className="mission-collective">
        <h2 className="mission-collective-title">
          They might have billions.
          <span>But there are millions of us.</span>
        </h2>
        <div className="story-narrow">
          <p>Shopping differently won&apos;t solve every problem.</p>
          <p>
            We still need meaningful policy, accountability, and systemic
            change.
          </p>
          <p>
            But that doesn&apos;t mean the choices we make every day are
            meaningless.
          </p>
          <p className="mission-collective-close">
            Elsewhere is about making one of those choices a little easier.
          </p>
        </div>
      </section>

      <section className="mission-cta">
        <h2 className="story-display">
          We can&apos;t fix everything.
          <span>But we can stop pretending there&apos;s nothing we can do.</span>
        </h2>
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
