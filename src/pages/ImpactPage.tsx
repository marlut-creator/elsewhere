import EditorialChrome from "../components/EditorialChrome";
import EditorialIllustration from "../components/EditorialIllustration";
import ImpactSwapCarousel from "../components/ImpactSwapCarousel";
import OwnershipNetwork from "../components/OwnershipNetwork";
import { EDITORIAL_ASSETS } from "../data/editorialAssets";
import {
  CPG_LOBBYING_2024,
  CPG_LOBBYING_TOTAL_2024,
  FINANCIAL_STORIES,
  IMPACT_EVIDENCE,
} from "../data/editorialResearch";
import { SITE_IMAGES } from "../data/siteImages";

const DIVIDENDS_B = 9.9;
const BUYBACKS_B = 6.5;
const TOTAL_RETURNED_B = DIVIDENDS_B + BUYBACKS_B;
const DIVIDEND_SHARE = (DIVIDENDS_B / TOTAL_RETURNED_B) * 100;
const BUYBACK_SHARE = (BUYBACKS_B / TOTAL_RETURNED_B) * 100;
const LOBBY_CAP = CPG_LOBBYING_2024[0].amount;

const shareholder = FINANCIAL_STORIES[0];
const lobbying = FINANCIAL_STORIES[2];
const laundryStat = IMPACT_EVIDENCE[0];

const RECEIPT_LINES = [
  { item: "Detergent", price: 12.99 },
  { item: "Toothpaste", price: 6.49 },
  { item: "Coffee", price: 9.99 },
  { item: "Paper goods", price: 8.29 },
  { item: "Snacks", price: 4.79 },
];
const RECEIPT_TOTAL = RECEIPT_LINES.reduce((sum, row) => sum + row.price, 0);

function formatShare(value: number) {
  return `${value.toFixed(1)}%`;
}

function formatMoney(value: number) {
  return `$${value.toFixed(2)}`;
}

function formatLobby(amount: number) {
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(2).replace(/0+$/, "").replace(/\.$/, "")}M`;
  }
  return `$${(amount / 1_000).toFixed(0)}K`;
}

function ImpactHeroVisual() {
  return (
    <figure className="ip-hero-still">
      <div className="ip-receipt" aria-label={`Grocery receipt totaling ${formatMoney(RECEIPT_TOTAL)}`}>
        <p className="ip-receipt-title">GROCERY</p>
        <p className="ip-receipt-meta">Everyday cart</p>
        <ul>
          {RECEIPT_LINES.map((row) => (
            <li key={row.item}>
              <span>{row.item}</span>
              <span>{formatMoney(row.price)}</span>
            </li>
          ))}
        </ul>
        <p className="ip-receipt-total">
          <span>Total</span>
          <span>{formatMoney(RECEIPT_TOTAL)}</span>
        </p>
      </div>
      <div className="ip-hero-cluster" aria-hidden="true">
        <EditorialIllustration name="toilet-paper" className="ip-hero-icon" decorative />
        <EditorialIllustration name="coffee" className="ip-hero-icon" decorative />
        <EditorialIllustration name="detergent" className="ip-hero-icon" decorative />
        <EditorialIllustration name="toothpaste" className="ip-hero-icon" decorative />
        <EditorialIllustration name="grocery-bag" className="ip-hero-icon" decorative />
        <EditorialIllustration name="soap" className="ip-hero-icon" decorative />
      </div>
      <figcaption>
        A small cart can still feed a very large company.
      </figcaption>
    </figure>
  );
}

export default function ImpactPage() {
  return (
    <EditorialChrome page="impact">
      <section className="ip-hero">
        <div className="ip-hero-copy">
          <p className="story-eyebrow">Impact</p>
          <h1>
            Your money is powerful.
            <span>So are the companies collecting it.</span>
          </h1>
          <p>
            Detergent, toothpaste, and a bag of coffee look like small, separate
            decisions. A few parent companies own many of those familiar names,
            control large shares of some categories, and spend real money
            advocating in Washington. The rest of this page follows that trail,
            then points to businesses that publish a giving commitment.
          </p>
        </div>
        <ImpactHeroVisual />
      </section>

      <section className="ip-own">
        <div className="ip-own-copy">
          <p className="story-eyebrow">01 / Ownership</p>
          <h2>
            Different labels.
            <span>Same owners.</span>
          </h2>
          <p>
            A new label can feel like a new company. Choose a parent below to
            see a sample of everyday brands named on that company&apos;s own
            directory. It is a map of ownership, not a claim that these four
            firms own every aisle.
          </p>
        </div>
        <OwnershipNetwork />
      </section>

      <section className="ip-evidence">
        <div className="ip-evidence-intro">
          <p className="story-eyebrow">02 / Category share</p>
          <h2>Two P&amp;G brands take more than half the laundry money.</h2>
          <p>
            Ownership charts get more concrete in a single category. In U.S.
            liquid laundry detergent, Tide and Gain sit under the same parent
            and, together, collected more than half of dollar sales in a recent
            Circana year.
          </p>
        </div>
        <article className="ip-evidence-feature">
          <p className="ip-kicker">{laundryStat.kicker}</p>
          <p className="ip-giant ip-giant-on-ivory">{laundryStat.statistic}</p>
          <p className="ip-evidence-label">{laundryStat.label}</p>
          <div
            className="ip-share-bar"
            role="img"
            aria-label="More than 55 percent of U.S. liquid laundry detergent dollar sales"
          >
            <span style={{ width: "55%" }} />
            <em>Tide + Gain</em>
            <i>Everyone else</i>
          </div>
          <p>{laundryStat.explanation}</p>
          <p className="ip-source">
            {laundryStat.reportingPeriod} ·{" "}
            <a href={laundryStat.sourceUrl}>
              {laundryStat.sourceName}, {laundryStat.sourceTitle}
            </a>
          </p>
        </article>
      </section>

      <section className="ip-lobby">
        <figure className="ip-lobby-hero">
          <img
            src={EDITORIAL_ASSETS.capitolWestFront.src}
            alt={EDITORIAL_ASSETS.capitolWestFront.alt}
            width={1920}
            height={996}
          />
          <div className="ip-lobby-stat">
            <p className="story-eyebrow story-eyebrow-on-plum">03 / Influence</p>
            <p className="ip-giant">
              ${(CPG_LOBBYING_TOTAL_2024 / 1_000_000).toFixed(1)}M
            </p>
            <p className="ip-giant-label">
              2024 federal lobbying by ten grocery and household parents
            </p>
          </div>
        </figure>
        <div className="ip-lobby-body">
          <div className="ip-lobby-copy">
            <p>
              The same kind of companies that stock the detergent aisle also
              hire people to talk to Congress. In 2024, this selected set of ten
              grocery and household parent companies reported about $
              {(CPG_LOBBYING_TOTAL_2024 / 1_000_000).toFixed(1)} million in U.S.
              federal lobbying. That is paid advocacy about laws and rules, not
              campaign contributions, and it is not every organization that
              filed in Washington.
            </p>
            <p className="ip-source ip-source-on-plum">
              {lobbying.reportingPeriod} ·{" "}
              <a href={lobbying.sourceUrl}>
                {lobbying.sourceName}, {lobbying.sourceTitle}
              </a>
            </p>
          </div>
          <figure
            className="ip-lobby-chart"
            aria-label="2024 federal lobbying by selected grocery and household parent companies"
          >
            <p className="ip-kicker">OpenSecrets parent-client totals</p>
            <ul className="ip-lobby-bars">
              {CPG_LOBBYING_2024.map((row) => (
                <li key={row.parent}>
                  <a href={row.sourceUrl}>{row.parent}</a>
                  <strong>{formatLobby(row.amount)}</strong>
                  <span>
                    <i style={{ width: `${(row.amount / LOBBY_CAP) * 100}%` }} />
                  </span>
                </li>
              ))}
            </ul>
            <p className="ip-caption">
              A selected set, not a ranking. Unilever includes its Unilever US
              total. Photograph: {EDITORIAL_ASSETS.capitolWestFront.credit}{" "}
              (public domain).
            </p>
          </figure>
        </div>
      </section>

      <section className="ip-compare">
        <div className="ip-compare-intro">
          <p className="story-eyebrow">04 / Published commitments</p>
          <h2>The same aisle, two different kinds of promise.</h2>
          <p>
            P&amp;G is the parent behind Tide and Gain. In fiscal 2025 it
            reported $16.1 billion in net earnings and returned more than $16
            billion to shareholders. Its citizenship reporting describes
            community programs, including 25 billion liters of drinking water
            delivered over the life of Children&apos;s Safe Drinking Water, but
            it does not publish a single FY2025 charitable-dollar total that can
            be ratioed against earnings. Good Store&apos;s EcoGeek detergent
            publishes a different kind of claim: 100% of that line&apos;s
            profits go to Coral Reef Alliance. Those are not equivalent
            accounting categories, and the Good Store figure is the seller&apos;s
            pledge, not an audited donation from your receipt.
          </p>
        </div>
        <div className="ip-compare-grid">
          <article className="ip-compare-card ip-compare-card-muted">
            <div className="ip-compare-visual">
              <img
                src={SITE_IMAGES.householdEssentials.src}
                alt={SITE_IMAGES.householdEssentials.alt}
              />
            </div>
            <p className="ip-kicker">P&amp;G / Tide &amp; Gain</p>
            <p className="ip-evidence-stat">$16.1B</p>
            <p className="ip-evidence-label">FY2025 net earnings</p>
            <p>
              Plus about $9.9 billion in dividends and $6.5 billion in share
              repurchases the same year. Community impact is reported as
              programs and product donations, not as a company-wide giving
              percentage.
            </p>
            <p className="ip-source">
              {shareholder.reportingPeriod} ·{" "}
              <a href={shareholder.sourceUrl}>
                {shareholder.sourceName}, {shareholder.sourceTitle}
              </a>
              {" · "}
              <a href="https://www.pginvestor.com/news/news-details/2025/PG-Announces-Fourth-Quarter-and-Fiscal-Year-2025-Results/default.aspx">
                FY2025 results
              </a>
            </p>
          </article>
          <article className="ip-compare-card ip-compare-card-alt">
            <div className="ip-compare-visual">
              <EditorialIllustration name="detergent" />
            </div>
            <p className="ip-kicker">Good Store EcoGeek detergent</p>
            <p className="ip-evidence-stat">100%</p>
            <p className="ip-evidence-label">of EcoGeek profits, pledged</p>
            <p>
              The company says profits from this laundry powder go to Coral Reef
              Alliance Maui Watershed Restoration. That is a published
              commitment for one product line, not a dollar amount we can count
              from a checkout.
            </p>
            <p className="ip-source">
              Seller claim ·{" "}
              <a href="https://good.store/pages/our-founders-hank-john-green">
                Good Store founders page
              </a>
            </p>
          </article>
        </div>
        <p className="ip-caption ip-compare-note">
          Dividends and buybacks are {formatShare(DIVIDEND_SHARE)} and{" "}
          {formatShare(BUYBACK_SHARE)} of P&amp;G&apos;s reported shareholder
          distributions, not of revenue.
        </p>
      </section>

      <section className="ip-swaps">
        <div className="ip-swaps-intro">
          <h2>
            Same purchase.
            <span>Different destination.</span>
          </h2>
          <p>
            You do not have to stop buying the things you need. Sometimes you
            just need a clearer map of where else the same errand can go. The
            left side is a category. The right side is a business that publishes
            a giving commitment. Prices are not assumed to match.
          </p>
        </div>
        <ImpactSwapCarousel />
      </section>

      <section className="ip-work">
        <h2>We believe in showing our work.</h2>
        <p>
          When we recommend a business, we quote the giving commitment they
          publish and link to the page we used. A percent of profits is not a
          dollar we can count from your receipt, and Elsewhere does not process
          purchases or donate on anyone&apos;s behalf.
        </p>
        <p className="ip-work-links">
          <a href="/how-products-are-selected">How products are selected</a>
          {" · "}
          <a href="/how-we-verify">How we verify claims</a>
          {" · "}
          <a href="/how-impact-estimates-work">How impact estimates work</a>
        </p>
      </section>

      <section className="ip-end">
        <h2>Where your money goes is still your choice.</h2>
        <p>
          Large companies are not automatically the wrong place to shop. They
          are simply large. If you would rather buy from a business that
          publishes a specific giving commitment, the map is here.
        </p>
        <div className="story-cta-row">
          <a className="story-cta" href="/explore">
            Find a better place to buy
          </a>
        </div>
      </section>
    </EditorialChrome>
  );
}
