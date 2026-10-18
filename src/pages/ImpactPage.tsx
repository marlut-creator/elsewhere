import EditorialChrome from "../components/EditorialChrome";
import { EDITORIAL_ASSETS } from "../data/editorialAssets";
import {
  BRAND_GROUPS,
  FINANCIAL_STORIES,
  LOBBYING_YEARS,
} from "../data/editorialResearch";
import {
  IMPACT_CAUSE_EXAMPLES,
  IMPACT_MEASURE_LAYERS,
} from "../data/impactPageExamples";
import { givingModelCardHint, givingModelLabel } from "../data/products";

const DIVIDENDS_B = 9.9;
const BUYBACKS_B = 6.5;
const TOTAL_RETURNED_B = DIVIDENDS_B + BUYBACKS_B;
const DIVIDEND_SHARE = (DIVIDENDS_B / TOTAL_RETURNED_B) * 100;
const BUYBACK_SHARE = (BUYBACKS_B / TOTAL_RETURNED_B) * 100;
const LOBBY_CAP_B = 5;

const shareholder = FINANCIAL_STORIES[0];
const ownership = FINANCIAL_STORIES[1];
const lobbying = FINANCIAL_STORIES[2];

function formatShare(value: number) {
  return `${value.toFixed(1)}%`;
}

function lobbyBillions(amount: string) {
  return Number(amount.replace(/[^0-9.]/g, ""));
}

export default function ImpactPage() {
  return (
    <EditorialChrome page="impact">
      <section className="impact-hero">
        <p className="story-eyebrow">Impact</p>
        <h1 className="impact-hero-title">
          Your money is powerful.
          <span>So are the companies collecting it.</span>
        </h1>
        <div className="impact-hero-split">
          <div className="impact-hero-copy">
            <p className="impact-hero-lead">
              Every purchase supports a business. Every business makes
              decisions about what happens next.
            </p>
            <p>Some decisions are visible. Others take a little digging.</p>
            <p className="impact-hero-close">
              We think you deserve to know more about where your money goes.
            </p>
          </div>
          <figure className="impact-hero-photo">
            <img
              src={EDITORIAL_ASSETS.everydayHousehold.src}
              alt={EDITORIAL_ASSETS.everydayHousehold.alt}
              width={1152}
              height={864}
            />
            <figcaption>{EDITORIAL_ASSETS.everydayHousehold.note}</figcaption>
          </figure>
        </div>
      </section>

      <section className="impact-share" aria-labelledby="impact-share-stat">
        <div className="impact-share-stat">
          <p className="story-eyebrow story-eyebrow-on-plum">Fiscal 2025</p>
          <p id="impact-share-stat" className="impact-giant">
            $16B+
          </p>
          <p className="impact-giant-label">Returned to shareholders.</p>
        </div>
        <div className="impact-share-body">
          <p>
            In fiscal 2025, Procter &amp; Gamble returned more than $16 billion
            to shareholders through dividends and share repurchases.
          </p>
          <p>
            That total is cash paid to shareholders — not the company&apos;s
            profit, and not a claim that every dollar at the register went
            there. It is one example of how a major consumer-products company
            uses cash.
          </p>
          <figure
            className="impact-share-visual"
            aria-label="P&G fiscal 2025 shareholder distributions split between dividends and share repurchases"
          >
            <div className="impact-share-photo">
              <img
                src={EDITORIAL_ASSETS.householdEssentials.src}
                alt={EDITORIAL_ASSETS.householdEssentials.alt}
                width={1152}
                height={864}
              />
            </div>
            <div className="impact-share-chart">
              <p className="impact-kicker">
                Share of these distributions · not of revenue
              </p>
              <div
                className="impact-share-stack"
                role="img"
                aria-label={`Dividends ${formatShare(DIVIDEND_SHARE)}, share repurchases ${formatShare(BUYBACK_SHARE)} of total shareholder distributions`}
              >
                <div
                  className="impact-share-block impact-share-div"
                  style={{ flexGrow: DIVIDENDS_B }}
                >
                  <strong>Dividends</strong>
                  <span>$9.9B · {formatShare(DIVIDEND_SHARE)}</span>
                </div>
                <div
                  className="impact-share-block impact-share-buy"
                  style={{ flexGrow: BUYBACKS_B }}
                >
                  <strong>Share repurchases</strong>
                  <span>$6.5B · {formatShare(BUYBACK_SHARE)}</span>
                </div>
              </div>
              <p className="impact-caption">
                About ${TOTAL_RETURNED_B.toFixed(1)} billion in company-reported
                cash returned in the year ended June 30, 2025. The blocks are
                100% of that total, not of company revenue or checkout spending.
              </p>
            </div>
          </figure>
          <p className="impact-source">
            {shareholder.reportingPeriod} ·{" "}
            <a href={shareholder.sourceUrl}>
              {shareholder.sourceName} — {shareholder.sourceTitle}
            </a>
          </p>
        </div>
      </section>

      <section className="impact-own">
        <h2 className="impact-section-title">
          Different labels.
          <span>Same owners.</span>
        </h2>
        <p className="impact-own-lead">
          A different logo is not always a different destination for the sale.
          These names appear on each parent&apos;s own brand directory — a
          sample, not a market-share study, and not a claim that a handful of
          firms own everything.
        </p>
        <ul className="impact-own-map">
          {BRAND_GROUPS.map((group, index) => (
            <li
              key={group.parent}
              className={`impact-own-row impact-own-row-${index}`}
            >
              <a className="impact-own-parent" href={group.sourceUrl}>
                {group.parent}
              </a>
              <p className="impact-own-brands">
                {group.brands.map((brand, brandIndex) => (
                  <span key={brand}>
                    {brand}
                    {brandIndex < group.brands.length - 1 ? " · " : ""}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>
        <p className="impact-source">
          {ownership.reportingPeriod} · {ownership.sourceName} —{" "}
          {ownership.sourceTitle}. Each brand is named on that parent&apos;s
          public directory.
        </p>
      </section>

      <section className="impact-lobby">
        <div className="impact-lobby-copy">
          <p className="story-eyebrow story-eyebrow-on-plum">Calendar 2024</p>
          <p className="impact-giant">$4.4B+</p>
          <p className="impact-giant-label">
            Reported U.S. federal lobbying expenditures in 2024.
          </p>
          <p>
            Corporations, trade associations, unions, and other organizations
            spent approximately $4.4 billion on federal lobbying in the United
            States.
          </p>
          <p>
            Lobbying is paid advocacy about laws and rules. It is not campaign
            contributions. The total covers every organization that filed — not
            corporations alone — and it does not show that any one bill passed
            because of it.
          </p>
          <p className="impact-source impact-source-on-plum">
            {lobbying.reportingPeriod} ·{" "}
            <a href={lobbying.sourceUrl}>
              {lobbying.sourceName} — {lobbying.sourceTitle}
            </a>
          </p>
        </div>
        <figure
          className="impact-lobby-visual"
          aria-label="Federal lobbying totals from 2022 to 2024, axis starting at zero"
        >
          <div className="impact-lobby-photo">
            <img
              src={EDITORIAL_ASSETS.capitolWestFront.src}
              alt={EDITORIAL_ASSETS.capitolWestFront.alt}
              width={1920}
              height={996}
            />
          </div>
          <div className="impact-lobby-chart">
            <p className="impact-kicker">
              OpenSecrets annual totals · scale $0 to $5B
            </p>
            <div className="impact-lobby-plot">
              <div className="impact-lobby-axis" aria-hidden="true">
                <span>$5B</span>
                <span>$2.5B</span>
                <span>$0</span>
              </div>
              <div className="impact-lobby-cols">
                {LOBBYING_YEARS.map((row) => {
                  const billions = lobbyBillions(row.amount);
                  const height = (billions / LOBBY_CAP_B) * 100;
                  return (
                    <div key={row.year} className="impact-lobby-col">
                      <strong>{row.amount}</strong>
                      <div className="impact-lobby-track">
                        <div style={{ height: `${height}%` }} />
                      </div>
                      <span>{row.year}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <p className="impact-caption">
              Axis runs from $0 to $5B. Photograph:{" "}
              {EDITORIAL_ASSETS.capitolWestFront.credit} (public domain).
            </p>
          </div>
        </figure>
      </section>

      <section className="impact-wait">
        <h2 className="impact-section-title">
          We&apos;re tired of being told to wait.
        </h2>
        <div className="impact-wait-grid">
          <p>
            A lot of us, especially people trying to build a life on a regular
            paycheck, were told we could vote with our wallets. Then groceries
            got more expensive. Rent got more expensive. The wallet turned out
            to have less room than the slogan assumed.
          </p>
          <p>
            Plenty of younger consumers are frustrated with corporate
            priorities — and interested in buying from businesses that treat
            people, animals, and the planet as more than a marketing line. That
            is not the same as claiming every young person is boycotting large
            companies, or that everyone can afford an ethical premium.
          </p>
          <p>
            Stated preferences are easy. Finding a real alternative, at a price
            that fits, is the hard part. Most people do not have an afternoon
            to research parent companies before they buy toothpaste.
          </p>
          <p className="impact-wait-emphasis">
            People want to make better choices. They just can&apos;t always
            afford to spend more.
          </p>
        </div>
      </section>

      <section className="impact-better">
        <div className="impact-better-intro">
          <h2 className="impact-section-title">
            Okay. So where else can it go?
          </h2>
          <p>
            Not to Elsewhere. We do not collect a cut, and we do not donate on
            your behalf. The idea is simpler: when you were going to buy
            something anyway, some businesses publish what they do with the
            money.
          </p>
          <p>
            These are catalog examples with documented giving models — not a
            ranking, not a promise that every alternative is cheaper, and not a
            claim that these businesses are nonprofits.
          </p>
        </div>
        {IMPACT_CAUSE_EXAMPLES.map((example, index) => {
          const hint =
            givingModelCardHint(example.product.givingModel) ??
            givingModelLabel(example.product.givingModel);
          return (
            <article
              key={example.product.id}
              className={`impact-cause${index % 2 === 1 ? " impact-cause-alt" : ""}`}
            >
              <figure className="impact-cause-photo">
                <img
                  src={example.imageUrl}
                  alt={example.imageAlt}
                  width={1200}
                  height={800}
                />
                <figcaption>{example.imageCredit}</figcaption>
              </figure>
              <div className="impact-cause-copy">
                <p className="story-eyebrow">{example.category}</p>
                <h3>{example.product.brand}</h3>
                <p className="impact-cause-product">
                  {example.product.productName}
                </p>
                <p>{example.categoryNote}</p>
                <p className="impact-cause-claim">
                  {example.product.givingClaim}
                </p>
                <p className="impact-cause-model">
                  {`Documented model: ${hint}${
                    example.product.givingValue == null
                      ? ""
                      : example.product.givingUnit === "percent"
                        ? ` · ${example.product.givingValue}%`
                        : ` · ${example.product.givingValue}${
                            example.product.givingUnit
                              ? ` ${example.product.givingUnit}`
                              : ""
                          }`
                  }. This is the seller's published commitment — not a donation Elsewhere made.`}
                </p>
                <div className="story-cta-row">
                  <a className="story-cta-secondary" href={example.exploreHref}>
                    See in Explore
                  </a>
                  <a
                    className="impact-cause-evidence"
                    href={example.product.verificationUrl}
                  >
                    Evidence source
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="impact-clear">
        <h2 className="impact-section-title">
          Let&apos;s be clear about what impact means.
        </h2>
        <p className="impact-clear-lead">
          These are not interchangeable. Elsewhere does not have a sitewide
          donation counter, because we do not process purchases and we do not
          have verified aggregate outcomes to report.
        </p>
        <ol className="impact-layers">
          {IMPACT_MEASURE_LAYERS.map((layer) => (
            <li key={layer.letter}>
              <span className="impact-layer-letter">{layer.letter}</span>
              <div>
                <h3>{layer.title}</h3>
                <p>{layer.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="impact-receipts">
        <h2 className="impact-section-title">
          Good intentions deserve good receipts.
        </h2>
        <p>
          Elsewhere aims to document giving commitments, evidence sources,
          selection criteria, updates, and the limits of any impact estimate.
          If a claim is too vague to describe honestly, we say so.
        </p>
        <p>
          When we learn a source is stale, the catalog should change. That work
          is ongoing. Future financial reporting for the project itself, if any,
          will be published separately.
        </p>
        <p className="impact-receipts-links">
          <a href="/how-products-are-selected">How products are selected</a>
          {" · "}
          <a href="/how-we-verify">How we verify claims</a>
          {" · "}
          <a href="/how-impact-estimates-work">How impact estimates work</a>
        </p>
      </section>

      <section className="impact-cta">
        <h2 className="impact-cta-title">
          They won&apos;t do it.
          <span>So we will.</span>
        </h2>
        <p className="impact-cta-line">
          You don&apos;t need to buy more. You just need more places to choose
          from.
        </p>
        <div className="story-cta-row">
          <a className="story-cta" href="/explore">
            Explore better places
          </a>
        </div>
      </section>
    </EditorialChrome>
  );
}
