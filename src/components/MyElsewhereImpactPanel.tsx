import {
  formatGivingClaimForCard,
  getExploreCardTitle,
} from "../data/productDisplay";
import type {
  MyElsewhereDashboard,
  ProductPurchaseRollup,
} from "../data/loggedImpact";
import {
  asCauseGroup,
  canonicalImpactArea,
  dashboardImpactAreaLabel,
} from "../data/impactAreas";
import { impactStoriesFromRollups } from "../data/impactStories";
import { givingModelCardHint } from "../data/products";
import { CauseGroupIcon } from "./CauseIcons";

function formatMoney(amount: number): string {
  return `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

type MyElsewhereImpactPanelProps = {
  dashboard: MyElsewhereDashboard;
  productRollups: ProductPurchaseRollup[];
};

export default function MyElsewhereImpactPanel({
  dashboard,
  productRollups,
}: MyElsewhereImpactPanelProps) {
  const { summary, businessesSupported, impactAreas, activityMonths } =
    dashboard;
  const showActivityChart = activityMonths.length >= 2;
  const impactStories = impactStoriesFromRollups(productRollups);

  return (
    <div className="my-elsewhere-col-impact">
      <h2 id="your-impact-heading" className="my-swaps-heading">
        Your impact
      </h2>
      <aside
        className="my-impact-panel my-impact-panel-editorial card-standard"
        aria-labelledby="your-impact-heading"
      >
        <div className="my-impact-metrics-row">
          <div className="my-impact-metric">
            <span className="my-impact-metric-value">
              {summary.totalRedirected != null
                ? formatMoney(summary.totalRedirected)
                : "—"}
            </span>
            <span className="my-impact-metric-label">redirected lifetime</span>
          </div>
          <div className="my-impact-metric">
            <span className="my-impact-metric-value">
              {summary.purchaseEventCount}
            </span>
            <span className="my-impact-metric-label">
              purchase{summary.purchaseEventCount === 1 ? "" : "s"} logged
            </span>
          </div>
          <div className="my-impact-metric">
            <span className="my-impact-metric-value">
              {businessesSupported}
            </span>
            <span className="my-impact-metric-label">
              {businessesSupported === 1 ? "business" : "businesses"} supported
            </span>
          </div>
          <div className="my-impact-metric">
            <span className="my-impact-metric-value">
              {summary.impactAreaCount}
            </span>
            <span className="my-impact-metric-label">
              impact {summary.impactAreaCount === 1 ? "area" : "areas"}
            </span>
          </div>
        </div>

        <p className="my-impact-panel-lede">
          From purchases you&apos;ve logged — not estimates or wishlist saves.
        </p>

        {summary.totalDollarContributed != null ? (
          <p className="my-impact-contributed">
            {formatMoney(summary.totalDollarContributed)} contributed where
            catalog giving math is explicit (from purchase price — not profit
            %).
          </p>
        ) : null}

        {summary.physicalTotals.length > 0 ? (
          <ul className="my-impact-physical">
            {summary.physicalTotals.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : null}

        {impactAreas.length > 0 ? (
          <div className="my-impact-areas">
            <h3 className="section-eyebrow my-impact-subheading">Impact areas</h3>
            <ul className="my-impact-area-cards">
              {impactAreas.map((slice) => {
                const label = dashboardImpactAreaLabel(slice.area);
                const causeGroup = asCauseGroup(slice.area);
                return (
                  <li key={slice.area} className="my-impact-area-card">
                    <p className="section-eyebrow">Impact area</p>
                    <div className="my-impact-area-card-head">
                      {causeGroup ? (
                        <CauseGroupIcon
                          group={causeGroup}
                          className="my-impact-area-card-icon"
                        />
                      ) : null}
                      <p className="my-impact-area-card-title">{label}</p>
                    </div>
                    <p className="my-impact-area-card-copy">
                      {slice.purchaseEvents} purchase
                      {slice.purchaseEvents === 1 ? "" : "s"} supporting this
                      area
                      {slice.redirected != null ? (
                        <>
                          <br />
                          {formatMoney(slice.redirected)} redirected to
                          businesses supporting this cause
                        </>
                      ) : null}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        {productRollups.length > 0 ? (
          <div className="my-impact-supported">
            <h3 className="section-eyebrow my-impact-subheading">
              Supported through your purchases
            </h3>
            <ul className="my-impact-supported-list">
              {productRollups.map((rollup) => {
                const { product } = rollup;
                const hint = givingModelCardHint(product.givingModel);
                const givingClaim = formatGivingClaimForCard(product, hint);
                return (
                  <li key={product.id} className="my-impact-supported-item">
                    <p className="my-impact-supported-brand">
                      {getExploreCardTitle(product)} · {product.brand}
                    </p>
                    <p className="my-impact-supported-claim">{givingClaim}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        {impactStories.length > 0 ? (
          <div className="my-impact-stories">
            <h3 className="section-eyebrow my-impact-subheading">
              Impact {impactStories.length === 1 ? "story" : "stories"}
            </h3>
            <ul className="my-impact-story-list">
              {impactStories.map((story) => {
                const causeGroup = asCauseGroup(story.causeGroup);
                return (
                  <li key={story.productId} className="my-impact-story-card">
                    <div
                      className={
                        story.imageUrl
                          ? "my-impact-story-media"
                          : "my-impact-story-icon-fallback"
                      }
                    >
                      {story.imageUrl ? (
                        <img
                          src={story.imageUrl}
                          alt={story.imageAlt}
                          onError={(event) => {
                            event.currentTarget
                              .closest(".my-impact-story-media")
                              ?.classList.add("is-broken");
                          }}
                        />
                      ) : null}
                      {causeGroup ? (
                        <CauseGroupIcon
                          group={causeGroup}
                          className="my-impact-story-card-icon"
                        />
                      ) : null}
                    </div>
                    <div className="my-impact-story-card-body">
                      <p className="section-eyebrow">{story.causeHeading}</p>
                      <p className="my-impact-story-business">
                        {story.businessName}
                      </p>
                      <p className="my-impact-story-giving">
                        {story.givingDescription}
                      </p>
                      <a
                        href={story.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="my-impact-story-source"
                      >
                        {story.sourceLabel}
                      </a>
                      {story.imageCredit ? (
                        <p className="my-impact-story-credit">
                          {story.imageCredit}
                        </p>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        {showActivityChart ? (
          <div className="my-impact-activity">
            <h3 className="section-eyebrow my-impact-subheading">
              Activity over time
            </h3>
            <div
              className="my-impact-activity-chart"
              role="img"
              aria-label="Purchases logged per month"
            >
              <ul>
                {activityMonths.map((month) => {
                  const maxMonthCount = Math.max(
                    1,
                    ...activityMonths.map((m) => m.eventCount),
                  );
                  return (
                    <li key={month.monthKey}>
                      <div
                        className="my-impact-activity-bar"
                        style={{
                          height: `${Math.max(12, (month.eventCount / maxMonthCount) * 100)}%`,
                        }}
                        title={`${month.label}: ${month.eventCount}`}
                      />
                      <span className="my-impact-activity-label">
                        {month.label.replace(/ \d{4}$/, "")}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : summary.purchaseEventCount > 0 ? (
          <div className="my-impact-activity">
            <h3 className="section-eyebrow my-impact-subheading">
              Activity over time
            </h3>
            <p className="my-impact-activity-sparse">
              Your purchase history is just getting started.
            </p>
          </div>
        ) : null}

        <p className="my-impact-panel-note">
          Redirected amounts are money spent with these sellers.
          Percent-of-profits commitments are not inferred from purchase price.
        </p>
      </aside>
    </div>
  );
}
