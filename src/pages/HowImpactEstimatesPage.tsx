import InfoPageLayout from "../components/InfoPageLayout";

export default function HowImpactEstimatesPage() {
  return (
    <InfoPageLayout page="impact" title="How impact estimates work">
      <h2>Explore: &ldquo;Swap for a year&rdquo;</h2>
      <p>
        Annual impact on Explore uses category-level purchase-frequency
        assumptions (for example, bags per month) combined with listed product
        prices. These are illustrative — not your personal history.
      </p>
      <p>
        We do not convert &ldquo;percent of profits&rdquo; into a donation
        dollar amount from your retail price unless the seller explicitly ties
        giving to purchase price.
      </p>
      <h2>Optional spend comparison</h2>
      <p>
        When you enter what you usually spend, we normalize multi-pack products
        to a monthly (or weekly/yearly) equivalent using the same visible
        cadence notes on each card. This ranks and labels results — it does not
        hide higher-priced alternatives.
      </p>
      <p>
        Shipping is shown when we have verified metadata. Comparisons exclude
        unknown shipping and say so on the badge.
      </p>
      <h2>My Elsewhere</h2>
      <p>
        Logged impact uses only purchases you confirm. Totals come from logged
        quantity and catalog prices, with contribution math only where giving
        models support it.
      </p>
    </InfoPageLayout>
  );
}
