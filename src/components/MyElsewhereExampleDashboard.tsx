type Props = {
  /** home = homepage teaser; panel = empty state; mini = Impact mega-menu preview */
  variant?: "home" | "panel" | "mini";
};

/** Illustrative only — never user data. */
export default function MyElsewhereExampleDashboard({
  variant = "home",
}: Props) {
  const isHome = variant === "home";
  const isMini = variant === "mini";
  const isPanel = variant === "panel";

  if (isMini) {
    return (
      <div
        className="my-elsewhere-example-dashboard my-elsewhere-example-dashboard--mini"
        aria-labelledby="example-dashboard-label-mini"
      >
        <p id="example-dashboard-label-mini" className="example-ribbon example-ribbon-large">
          Illustrative example
        </p>
        <p className="example-dashboard-preview-hint">
          Example only — your dashboard is built from purchases you log.
        </p>
        <p className="example-dashboard-stat example-dashboard-stat--compact">
          <span className="example-dashboard-stat-value">$74.97</span>
          <span className="example-dashboard-stat-label">redirected</span>
        </p>
        <ul className="example-dashboard-meta example-dashboard-meta--inline">
          <li>
            <strong>3</strong> purchases
          </li>
          <li>
            <strong>1</strong> business
          </li>
          <li>
            <strong>1</strong> impact area
          </li>
        </ul>
        <p className="section-eyebrow">Impact area</p>
        <p className="example-dashboard-area-title example-dashboard-area-title--mini">
          Animal Rescue
        </p>
        <p className="example-dashboard-giving example-dashboard-giving--mini">
          20% of profits support cat rescues, foster organizations and no-kill
          shelters/rescue organizations.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`my-elsewhere-example-dashboard card-standard${isHome ? " my-elsewhere-example-dashboard--home" : " my-elsewhere-example-dashboard--panel"}`}
      aria-hidden={isHome ? true : undefined}
      {...(isPanel ? { "aria-labelledby": "example-dashboard-label" } : {})}
    >
      <div className="example-dashboard-intro">
        <p
          id="example-dashboard-label"
          className="example-ribbon example-ribbon-large"
        >
          Illustrative example
        </p>
        <p className="example-dashboard-preview-hint">
          An example of what your impact dashboard could look like.
        </p>
      </div>

      <div className="example-dashboard-stats-row">
        <div className="example-dashboard-stat-cell">
          <span className="example-dashboard-stat-value">$74.97</span>
          <span className="example-dashboard-stat-label">redirected</span>
        </div>
        <div className="example-dashboard-stat-cell">
          <span className="example-dashboard-stat-value">3</span>
          <span className="example-dashboard-stat-label">purchases logged</span>
        </div>
        <div className="example-dashboard-stat-cell">
          <span className="example-dashboard-stat-value">1</span>
          <span className="example-dashboard-stat-label">business supported</span>
        </div>
        <div className="example-dashboard-stat-cell">
          <span className="example-dashboard-stat-value">1</span>
          <span className="example-dashboard-stat-label">impact area</span>
        </div>
      </div>

      <div className="example-dashboard-detail-row">
        <div className="example-dashboard-col">
          <p className="section-eyebrow">Impact area</p>
          <p className="example-dashboard-area-title">Animal Rescue</p>
          <p className="example-dashboard-area-copy">
            3 purchases supported businesses giving to this cause
          </p>
        </div>

        <div className="example-dashboard-col">
          <p className="section-eyebrow">Supported through these purchases</p>
          <p className="example-dashboard-brand">Cat Rescue Coffee Company</p>
          <p className="example-dashboard-giving">
            20% of profits support cat rescues, foster organizations and
            no-kill shelters/rescue organizations.
          </p>
        </div>

        <div className="example-dashboard-col">
          <p className="section-eyebrow">Illustrative purchase history</p>
          <ul className="example-dashboard-history">
            <li>Oct · 1 purchase</li>
            <li>Nov · 1 purchase</li>
            <li>Dec · 1 purchase</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
