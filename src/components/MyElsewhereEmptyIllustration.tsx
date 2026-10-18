import MyElsewhereExampleDashboard from "./MyElsewhereExampleDashboard";

/** Illustrative empty-state preview — never persisted. */
export default function MyElsewhereEmptyIllustration() {
  return (
    <div className="my-elsewhere-empty-visual" aria-labelledby="empty-sample-heading">
      <p className="example-ribbon example-ribbon-large">Illustrative example</p>
      <h3 id="empty-sample-heading" className="my-empty-sample-title">
        Here&apos;s what My Elsewhere will look like once you do.
      </h3>
      <MyElsewhereExampleDashboard variant="panel" />
      <p className="my-empty-sample-note">
        Example only — your totals begin when you log a purchase.
      </p>
    </div>
  );
}
