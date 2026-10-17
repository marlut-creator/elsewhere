import { EDITORIAL_ASSETS } from "../data/editorialAssets";
import { BRAND_GROUPS, LOBBYING_YEARS } from "../data/editorialResearch";

const DIVIDENDS_B = 9.9;
const BUYBACKS_B = 6.5;
const TOTAL_RETURNED_B = DIVIDENDS_B + BUYBACKS_B;
const DIVIDEND_SHARE = (DIVIDENDS_B / TOTAL_RETURNED_B) * 100;
const BUYBACK_SHARE = (BUYBACKS_B / TOTAL_RETURNED_B) * 100;
const LOBBY_CAP_B = 5;

function formatShare(value: number) {
  return `${value.toFixed(1)}%`;
}

export function ShareholderVisual() {
  return (
    <figure
      className="fin-visual fin-visual-share"
      aria-label="P&G fiscal 2025 shareholder distributions split between dividends and share repurchases"
    >
      <div className="fin-photo-stage fin-photo-stage-stat">
        <img
          src={EDITORIAL_ASSETS.householdEssentials.src}
          alt={EDITORIAL_ASSETS.householdEssentials.alt}
        />
        <div className="fin-photo-stat">
          <p className="fin-visual-hero">$16.4B</p>
          <p className="fin-visual-hero-label">
            Cash returned to P&amp;G shareholders in fiscal 2025
          </p>
        </div>
      </div>
      <div className="fin-panel-card">
        <figcaption className="fin-visual-kicker">
          Share of shareholder distributions · not of revenue
        </figcaption>
        <div
          className="fin-segment"
          role="img"
          aria-label={`Dividends ${formatShare(DIVIDEND_SHARE)}, share repurchases ${formatShare(BUYBACK_SHARE)} of total shareholder distributions`}
        >
          <div className="fin-segment-track">
            <div
              className="fin-segment-div"
              style={{ width: `${DIVIDEND_SHARE}%` }}
            />
            <div
              className="fin-segment-buy"
              style={{ width: `${BUYBACK_SHARE}%` }}
            />
          </div>
          <ul className="fin-segment-legend">
            <li>
              <span className="fin-swatch fin-swatch-div" />
              <strong>Dividends · $9.9B</strong>
              <em>{formatShare(DIVIDEND_SHARE)}</em>
            </li>
            <li>
              <span className="fin-swatch fin-swatch-buy" />
              <strong>Share repurchases · $6.5B</strong>
              <em>{formatShare(BUYBACK_SHARE)}</em>
            </li>
          </ul>
        </div>
        <p className="fin-visual-caption">
          The bar is 100% of these distributions, not of company revenue or
          checkout spending. P&amp;G brand-list examples: Tide, Crest, Gillette.
        </p>
      </div>
    </figure>
  );
}

export function OwnershipVisual() {
  return (
    <figure
      className="fin-visual fin-visual-owners"
      aria-label="Familiar brands grouped under their parent companies"
    >
      <div className="fin-photo-stage" aria-hidden="true">
        <img
          src={EDITORIAL_ASSETS.grocerySoftFocus.src}
          alt=""
        />
      </div>
      <div className="fin-owner-sheet">
        <figcaption className="fin-visual-kicker">
          A sample from official brand lists · not market share
        </figcaption>
        <div className="fin-owner-map">
          {BRAND_GROUPS.map((group) => (
            <div key={group.parent} className="fin-owner-cluster">
              <p className="fin-owner-name">{group.parent}</p>
              <span className="fin-owner-stem" aria-hidden="true" />
              <ul>
                {group.brands.map((brand) => (
                  <li key={brand}>{brand}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="fin-visual-caption">
          Four parent companies and a few names from each of their public brand
          directories. Not a complete portfolio and not a concentration
          percentage.
        </p>
      </div>
    </figure>
  );
}

export function LobbyingVisual() {
  return (
    <figure
      className="fin-visual fin-visual-lobby"
      aria-label="Federal lobbying totals from 2022 to 2024, axis starting at zero"
    >
      <div className="fin-photo-stage fin-photo-stage-stat">
        <img
          src={EDITORIAL_ASSETS.capitolWestFront.src}
          alt={EDITORIAL_ASSETS.capitolWestFront.alt}
        />
        <div className="fin-photo-stat">
          <p className="fin-visual-hero">$4.4B</p>
          <p className="fin-visual-hero-label">
            Federal lobbying in 2024 · all filers
          </p>
        </div>
      </div>
      <div className="fin-panel-card">
        <p className="fin-visual-kicker">
          OpenSecrets annual totals · scale $0 to $5B
        </p>
        <div className="fin-lobby-chart">
          <div className="fin-lobby-axis" aria-hidden="true">
            <span>$5B</span>
            <span>$2.5B</span>
            <span>$0</span>
          </div>
          <div className="fin-columns">
            {LOBBYING_YEARS.map((row) => {
              const billions = Number(row.amount.replace(/[^0-9.]/g, ""));
              const height = (billions / LOBBY_CAP_B) * 100;
              return (
                <div key={row.year} className="fin-column">
                  <strong>{row.amount}</strong>
                  <div className="fin-column-track">
                    <div style={{ height: `${height}%` }} />
                  </div>
                  <span>{row.year}</span>
                </div>
              );
            })}
          </div>
        </div>
        <p className="fin-visual-caption">
          Axis runs from $0 to $5B. Totals cover every organization that filed,
          not companies alone. Photograph: {EDITORIAL_ASSETS.capitolWestFront.credit}{" "}
          (public domain).
        </p>
      </div>
    </figure>
  );
}

export function FinancialVisual({
  kind,
}: {
  kind: "shareholder" | "ownership" | "lobbying";
}) {
  if (kind === "shareholder") return <ShareholderVisual />;
  if (kind === "ownership") return <OwnershipVisual />;
  return <LobbyingVisual />;
}
