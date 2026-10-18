import EditorialChrome from "../components/EditorialChrome";
import ImpactSwapCarousel from "../components/ImpactSwapCarousel";
import OwnershipNetwork from "../components/OwnershipNetwork";
import { EDITORIAL_ASSETS } from "../data/editorialAssets";
import {
  FINANCIAL_STORIES,
  IMPACT_EVIDENCE,
  LOBBYING_YEARS,
} from "../data/editorialResearch";

const DIVIDENDS_B = 9.9;
const BUYBACKS_B = 6.5;
const TOTAL_RETURNED_B = DIVIDENDS_B + BUYBACKS_B;
const DIVIDEND_SHARE = (DIVIDENDS_B / TOTAL_RETURNED_B) * 100;
const BUYBACK_SHARE = (BUYBACKS_B / TOTAL_RETURNED_B) * 100;
const LOBBY_CAP_B = 5;

const shareholder = FINANCIAL_STORIES[0];
const lobbying = FINANCIAL_STORIES[2];
const [laundryStat, bombasStat, booksStat] = IMPACT_EVIDENCE;

function formatShare(value: number) {
  return `${value.toFixed(1)}%`;
}

function lobbyBillions(amount: string) {
  return Number(amount.replace(/[^0-9.]/g, ""));
}

function ImpactHeroVisual() {
  return (
    <figure className="ip-hero-collage">
      <svg viewBox="0 0 520 420" role="img" aria-label="Everyday household products and a grocery receipt, suggesting that ordinary purchases feed much larger businesses">
        <rect width="520" height="420" rx="16" fill="#f1eee7" />
        <rect x="28" y="36" width="176" height="300" rx="8" fill="#fff" stroke="#321b36" />
        <text x="44" y="68" fill="#321b36" fontFamily="Dosis, sans-serif" fontSize="18" fontWeight="600">GROCERY</text>
        <text x="44" y="92" fill="#736675" fontFamily="Nunito Sans, sans-serif" fontSize="11">Register 04 · 18:42</text>
        <path d="M44 108h144" stroke="#d3ccd1" />
        <text x="44" y="132" fill="#321b36" fontFamily="Nunito Sans, sans-serif" fontSize="13">Detergent</text>
        <text x="148" y="132" fill="#321b36" fontFamily="Nunito Sans, sans-serif" fontSize="13">12.99</text>
        <text x="44" y="156" fill="#321b36" fontFamily="Nunito Sans, sans-serif" fontSize="13">Toothpaste</text>
        <text x="148" y="156" fill="#321b36" fontFamily="Nunito Sans, sans-serif" fontSize="13">6.49</text>
        <text x="44" y="180" fill="#321b36" fontFamily="Nunito Sans, sans-serif" fontSize="13">Coffee</text>
        <text x="148" y="180" fill="#321b36" fontFamily="Nunito Sans, sans-serif" fontSize="13">9.99</text>
        <text x="44" y="204" fill="#321b36" fontFamily="Nunito Sans, sans-serif" fontSize="13">Paper goods</text>
        <text x="148" y="204" fill="#321b36" fontFamily="Nunito Sans, sans-serif" fontSize="13">8.29</text>
        <text x="44" y="228" fill="#321b36" fontFamily="Nunito Sans, sans-serif" fontSize="13">Snacks</text>
        <text x="148" y="228" fill="#321b36" fontFamily="Nunito Sans, sans-serif" fontSize="13">4.79</text>
        <path d="M44 244h144" stroke="#d3ccd1" />
        <text x="44" y="272" fill="#321b36" fontFamily="Dosis, sans-serif" fontSize="16" fontWeight="600">TOTAL</text>
        <text x="136" y="272" fill="#321b36" fontFamily="Dosis, sans-serif" fontSize="16" fontWeight="600">42.55</text>
        <text x="44" y="304" fill="#6679cc" fontFamily="Nunito Sans, sans-serif" fontSize="11">Owner not printed.</text>
        <rect x="228" y="48" width="92" height="150" rx="10" fill="#fff" stroke="#321b36" />
        <rect x="240" y="64" width="68" height="42" rx="4" fill="#6679cc" />
        <text x="248" y="90" fill="#f7f3e8" fontFamily="Dosis, sans-serif" fontSize="13" fontWeight="600">soap</text>
        <rect x="336" y="28" width="148" height="168" rx="10" fill="#fff" stroke="#321b36" />
        <rect x="356" y="48" width="108" height="52" rx="4" fill="#321b36" />
        <text x="368" y="80" fill="#eeedf8" fontFamily="Dosis, sans-serif" fontSize="16" fontWeight="600">detergent</text>
        <rect x="248" y="168" width="108" height="132" rx="10" fill="#fff" stroke="#321b36" />
        <circle cx="302" cy="220" r="28" fill="#eeedf8" stroke="#321b36" />
        <text x="268" y="274" fill="#321b36" fontFamily="Dosis, sans-serif" fontSize="13" fontWeight="600">paste</text>
        <rect x="372" y="210" width="116" height="140" rx="10" fill="#fff" stroke="#321b36" />
        <text x="392" y="278" fill="#321b36" fontFamily="Dosis, sans-serif" fontSize="16" fontWeight="600">coffee</text>
        <text x="24" y="392" fill="#736675" fontFamily="Nunito Sans, sans-serif" fontSize="14">A small cart can still feed a very large company.</text>
      </svg>
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
            decisions. They are also cash flowing into businesses whose owners,
            political spending, and published giving records rarely appear on the
            package. This page collects a few of those facts so an ordinary
            checkout is a little easier to see.
          </p>
        </div>
        <ImpactHeroVisual />
      </section>

      <section className="ip-money" aria-labelledby="ip-money-stat">
        <div className="ip-money-stat">
          <p className="story-eyebrow story-eyebrow-on-plum">Fiscal 2025</p>
          <p id="ip-money-stat" className="ip-giant">
            $16B+
          </p>
          <p className="ip-giant-label">Returned to P&amp;G shareholders</p>
        </div>
        <div className="ip-money-body">
          <p>
            In the year ended June 30, 2025, Procter &amp; Gamble reported
            returning more than $16 billion to shareholders: about $9.9 billion
            as dividends and $6.5 billion as share repurchases. That is cash paid
            to owners of the company, not revenue, not profit, and not a claim
            that a bottle of shampoo is a dividend check. It is still a clear
            picture of how a major consumer-products company chooses to use cash
            once it has it.
          </p>
          <figure
            className="ip-money-chart"
            aria-label="P&G fiscal 2025 shareholder distributions split between dividends and share repurchases"
          >
            <p className="ip-kicker">Share of these distributions, not of revenue</p>
            <div
              className="ip-money-bar"
              role="img"
              aria-label={`Dividends ${formatShare(DIVIDEND_SHARE)}, share repurchases ${formatShare(BUYBACK_SHARE)} of total shareholder distributions`}
            >
              <div className="ip-money-seg ip-money-div" style={{ flexGrow: DIVIDENDS_B }}>
                <strong>Dividends</strong>
                <span>$9.9B · {formatShare(DIVIDEND_SHARE)}</span>
              </div>
              <div className="ip-money-seg ip-money-buy" style={{ flexGrow: BUYBACKS_B }}>
                <strong>Buybacks</strong>
                <span>$6.5B · {formatShare(BUYBACK_SHARE)}</span>
              </div>
            </div>
            <p className="ip-caption">
              About ${TOTAL_RETURNED_B.toFixed(1)} billion in company-reported
              cash returned. The segments add up to 100% of that total.
            </p>
          </figure>
          <p className="ip-source">
            {shareholder.reportingPeriod} ·{" "}
            <a href={shareholder.sourceUrl}>
              {shareholder.sourceName}, {shareholder.sourceTitle}
            </a>
          </p>
        </div>
      </section>

      <section className="ip-own">
        <div className="ip-own-copy">
          <h2>
            Different labels.
            <span>Same owners.</span>
          </h2>
          <p>
            A new label can feel like a new company. The directories below are a
            small official sample of familiar names that sit under four large
            parents. Choose a parent to see the brands in this example. It is not
            a market-share study, and it is not a claim that these four firms own
            every aisle.
          </p>
        </div>
        <OwnershipNetwork />
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
            <p className="story-eyebrow story-eyebrow-on-plum">Calendar 2024</p>
            <p className="ip-giant">$4.45B</p>
            <p className="ip-giant-label">Reported U.S. federal lobbying</p>
          </div>
        </figure>
        <div className="ip-lobby-body">
          <div className="ip-lobby-copy">
            <p>
              Organizations that file federal lobbying reports spent about $4.45
              billion in 2024 trying to influence laws and rules in Washington.
              The total includes corporations, trade associations, unions, and
              other filers. It is not campaign money, and it does not prove that
              any particular bill passed because of it. OpenSecrets&apos; series
              shows the figure climbing from $4.11 billion in 2022 to $4.45
              billion in 2024, a record in their accounting.
            </p>
            <p className="ip-source ip-source-on-plum">
              {lobbying.reportingPeriod} ·{" "}
              <a href={lobbying.sourceUrl}>
                {lobbying.sourceName}, {lobbying.sourceTitle}
              </a>
            </p>
          </div>
          <figure className="ip-lobby-chart" aria-label="Federal lobbying totals from 2022 to 2024">
            <p className="ip-kicker">OpenSecrets annual totals, $0 to $5B</p>
            <div className="ip-lobby-plot">
              <div className="ip-lobby-axis" aria-hidden="true">
                <span>$5B</span>
                <span>$2.5B</span>
                <span>$0</span>
              </div>
              <div className="ip-lobby-cols">
                {LOBBYING_YEARS.map((row) => {
                  const billions = lobbyBillions(row.amount);
                  const height = (billions / LOBBY_CAP_B) * 100;
                  return (
                    <div key={row.year} className="ip-lobby-col">
                      <strong>{row.amount}</strong>
                      <div className="ip-lobby-track">
                        <div style={{ height: `${height}%` }} />
                      </div>
                      <span>{row.year}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <p className="ip-caption">
              Photograph: {EDITORIAL_ASSETS.capitolWestFront.credit} (public domain).
            </p>
          </figure>
        </div>
      </section>

      <section className="ip-evidence">
        <div className="ip-evidence-intro">
          <h2>A few more numbers worth sitting with.</h2>
          <p>
            Ownership charts are easier to dismiss until you see how concentrated
            a familiar category can be, and how large a published giving record
            can grow when a business designs for it. These figures come from
            Circana data reported in the trade press and from the companies&apos;
            own impact pages. None of them were produced by Elsewhere.
          </p>
        </div>
        <div className="ip-evidence-grid">
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
            </div>
            <p>{laundryStat.explanation}</p>
            <p className="ip-source">
              {laundryStat.reportingPeriod} ·{" "}
              <a href={laundryStat.sourceUrl}>
                {laundryStat.sourceName}, {laundryStat.sourceTitle}
              </a>
            </p>
          </article>
          <article>
            <p className="ip-kicker">{bombasStat.kicker}</p>
            <p className="ip-evidence-stat">{bombasStat.statistic}</p>
            <p className="ip-evidence-label">{bombasStat.label}</p>
            <p>{bombasStat.explanation}</p>
            <p className="ip-source">
              {bombasStat.reportingPeriod} ·{" "}
              <a href={bombasStat.sourceUrl}>
                {bombasStat.sourceName}, {bombasStat.sourceTitle}
              </a>
            </p>
          </article>
          <article>
            <p className="ip-kicker">{booksStat.kicker}</p>
            <p className="ip-evidence-stat">{booksStat.statistic}</p>
            <p className="ip-evidence-label">{booksStat.label}</p>
            <p>{booksStat.explanation}</p>
            <p className="ip-source">
              {booksStat.reportingPeriod} ·{" "}
              <a href={booksStat.sourceUrl}>
                {booksStat.sourceName}, {booksStat.sourceTitle}
              </a>
            </p>
          </article>
        </div>
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
            businesses on the right publish a giving commitment; the left side
            is a category, not a brand we are ranking against. Prices are not
            assumed to match.
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
          The figures on this page are not an argument that shopping can replace
          politics. They are a reminder that an ordinary checkout still has a
          destination, and that destination is still something you can look at
          before you pay.
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
