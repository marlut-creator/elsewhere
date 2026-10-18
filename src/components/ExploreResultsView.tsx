import {
  CSSProperties,
  FormEvent,
  Fragment,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { PriceBucket, Product, SortOption } from "../data/products";
import {
  filterAndSortExploreResults,
  getAffordabilityDisplay,
} from "../data/affordability";
import {
  formatShippingLine,
  formatUnitPrice,
} from "../data/spendNormalization";
import SitePromiseSection from "./SitePromiseSection";
import { getAnnualImpactDisplay } from "../data/annualImpact";
import type { BrowseCategorySlug } from "../data/browseCategories";
import { buildExploreHero, emptyStateQueryCauseMessage } from "../data/exploreHeadlines";
import { resolveSellerLink } from "../data/sellerUrlSafety";
import {
  catalogGivingFilterGroups,
  catalogPriceBuckets,
  formatCauseTagsForDisplay,
  givingFilterGroupLabel,
  givingModelCardHint,
  GIVING_FILTER_OPTIONS,
  priceBucketLabels,
  type GivingFilterGroup,
} from "../data/products";
import {
  formatGivingClaimForCard,
  getExploreCardTitle,
  isBrandDiscoveryEntry,
} from "../data/productDisplay";
import CausePickerPopover from "./CausePickerPopover";
import {
  buildSpendComparisonContext,
  normalizeSpendingInput,
  type SpendComparisonContext,
  type SpendFrequency,
} from "../data/spendingBudget";
import { useSavedSwaps } from "../hooks/useSavedSwaps";
import { usePurchaseHistory } from "../hooks/usePurchaseHistory";
import PurchaseLogModal from "./PurchaseLogModal";
import ExploreShopByCategory from "./ExploreShopByCategory";
import SearchIcon from "./SearchIcon";
import ShelfIcon from "./ShelfIcon";
import ToastNotice from "./ToastNotice";
import { SiteFooter, SiteHeader } from "./SiteChrome";

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 12h15m-6-6 6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function SpendFieldHelp() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div className="spend-help-wrap" ref={wrapRef}>
      <button
        type="button"
        className="spend-help-trigger"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        What is this?
      </button>
      {open ? (
        <div className="spend-help-popover" role="tooltip">
          We use this to compare swaps with what you normally spend. It helps
          rank results, but won&apos;t hide good alternatives just because they
          cost more.
        </div>
      ) : null}
    </div>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="m4 6 4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

type ExploreResultsViewProps = {
  query: string;
  submittedQuery: string;
  matchingProducts: Product[];
  onQueryChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
  causeFilter: string | null;
  onCauseFilterChange: (value: string | null) => void;
  categoryFilter: BrowseCategorySlug | null;
  onCategoryFilterChange: (value: BrowseCategorySlug | null) => void;
  surpriseMe: boolean;
  onSurpriseMe: () => void;
  onClearSurprise: () => void;
  onSyncExploreUrl: (next: {
    q?: string;
    cause?: string | null;
    category?: BrowseCategorySlug | null;
    surprise?: boolean;
  }) => void;
  onGoHome?: () => void;
};

function FilterMenu({
  label,
  isOpen,
  onToggle,
  onClose,
  active,
  children,
  menuClassName,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  active: boolean;
  children: ReactNode;
  menuClassName?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [openUpward, setOpenUpward] = useState(false);
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({});

  useLayoutEffect(() => {
    if (!isOpen || !wrapRef.current || !menuRef.current) return;
    const update = () => {
      const trigger = wrapRef.current!.getBoundingClientRect();
      const margin = 12;
      const viewportH = window.innerHeight;
      const spaceBelow = viewportH - trigger.bottom - margin;
      const spaceAbove = trigger.top - margin;
      const preferUp = spaceBelow < 220 && spaceAbove > spaceBelow;
      setOpenUpward(preferUp);
      setMenuStyle({
        maxHeight: Math.min(360, Math.max(140, preferUp ? spaceAbove : spaceBelow)),
      });
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [isOpen, children]);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (
        wrapRef.current &&
        !wrapRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div className="filter-wrap" ref={wrapRef}>
      <button
        type="button"
        className={active ? "active" : undefined}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={onToggle}
      >
        {label}
        <Chevron />
      </button>
      {isOpen ? (
        <div
          ref={menuRef}
          className={`filter-menu${openUpward ? " filter-menu-up" : ""}${menuClassName ? ` ${menuClassName}` : ""}`}
          style={menuStyle}
          role="listbox"
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

function ExploreProductCard({
  product,
  isSaved,
  onToggleSaved,
  spendContext,
  inMyElsewhere,
  onLogPurchase,
}: {
  product: Product;
  onToggleSaved: () => void;
  spendContext: SpendComparisonContext | null;
  isSaved: boolean;
  inMyElsewhere: boolean;
  onLogPurchase: () => void;
}) {
  const verified = product.verificationStatus === "verified";
  const annualImpact = getAnnualImpactDisplay(product);
  const affordability = getAffordabilityDisplay(product, spendContext);
  const sellerLink = resolveSellerLink(product);
  const givingHint = givingModelCardHint(product.givingModel);
  const discovery = isBrandDiscoveryEntry(product);
  const cardTitle = getExploreCardTitle(product);
  const givingClaim = formatGivingClaimForCard(product, givingHint);
  const unitPriceLine = formatUnitPrice(product);
  const shippingLine = formatShippingLine(product);

  return (
    <article
      className={discovery ? "explore-card explore-card-discovery" : "explore-card"}
    >
      <div className="card-image">
        {product.image ? (
          <img
            className="card-product-image"
            src={product.image}
            alt={`${product.brand} ${product.productName}`}
          />
        ) : (
          <div
            className={
              discovery
                ? "card-image-placeholder card-image-placeholder-discovery"
                : "card-image-placeholder"
            }
          >
            <div>
              {discovery ? (
                <p className="card-discovery-eyebrow">Brand discovery</p>
              ) : null}
              <span className="card-placeholder-brand">{product.brand}</span>
              <p className="card-placeholder-category">{product.category}</p>
            </div>
          </div>
        )}
        <button
          className={isSaved ? "save-button saved" : "save-button"}
          onClick={onToggleSaved}
          type="button"
          aria-pressed={isSaved}
          aria-label={
            isSaved
              ? `Remove ${product.brand} from saved swaps`
              : `Save ${product.brand} swap`
          }
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M5 3.5h10v14L10 14l-5 3.5v-14Z"
              fill={isSaved ? "currentColor" : "none"}
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.4"
            />
          </svg>
          {isSaved ? "Saved" : "Save swap"}
        </button>
      </div>

      <div className="card-body card-body-aligned">
        <div className="card-zone-identity">
        <p className="brand-name card-zone-brand">
          {discovery ? "Brand discovery" : product.brand}
        </p>

        <div className="card-zone-title-price">
          <h2 className="card-product-title">{cardTitle}</h2>
          {product.priceDisplay ? (
            <p className="card-price">
              <strong>{product.priceDisplay}</strong>
              {product.size ? <span>{product.size}</span> : null}
              {unitPriceLine ? (
                <span className="card-unit-price">{unitPriceLine}</span>
              ) : null}
              {shippingLine ? (
                <span className="card-shipping-note">{shippingLine}</span>
              ) : null}
            </p>
          ) : product.size ? (
            <p className="card-price">
              <span>{product.size}</span>
            </p>
          ) : (
            <p className="card-price card-price-empty" aria-hidden="true">
              &nbsp;
            </p>
          )}
        </div>

        <div className="card-zone-afford">
          {affordability ? (
            <div className="afford-wrap">
              <p
                className={`afford-badge afford-badge-${affordability.variant}`}
              >
                {affordability.primary}
                {affordability.secondary ? (
                  <span className="afford-badge-sub">
                    {affordability.secondary}
                  </span>
                ) : null}
              </p>
              {affordability.assumptionNote ? (
                <p className="afford-assumption">{affordability.assumptionNote}</p>
              ) : null}
            </div>
          ) : null}
        </div>
        </div>

        <dl className="giving-details card-zone-meta">
          <div>
            <dt>Cause</dt>
            <dd>{formatCauseTagsForDisplay(product)}</dd>
          </div>
          <div>
            <dt>Giving</dt>
            <dd className="giving-detail-copy">
              {givingHint ? (
                <span className="giving-model-hint">{givingHint}</span>
              ) : null}
              <span className="giving-claim-text">{givingClaim}</span>
            </dd>
          </div>
          {product.beneficiary ? (
            <div>
              <dt>Beneficiary</dt>
              <dd>{product.beneficiary}</dd>
            </div>
          ) : null}
        </dl>

        <div className="card-foot card-zone-foot">
          <div className="annual-impact">
            <p className="annual-impact-line">
              Swap for a year <span aria-hidden="true">→</span>{" "}
              <span className="annual-impact-outcome">
                {annualImpact.headline}
              </span>
            </p>
            {annualImpact.assumptionNote ? (
              <p className="annual-impact-assumption">
                {annualImpact.assumptionNote}
              </p>
            ) : null}
            {annualImpact.givingClaimLine ? (
              <p className="annual-impact-claim">{annualImpact.givingClaimLine}</p>
            ) : null}
            {annualImpact.redirectedLine ? (
              <p className="annual-impact-sub">{annualImpact.redirectedLine}</p>
            ) : null}
            {annualImpact.showRedirectDisclaimer ? (
              <p className="annual-impact-disclaimer">
                Consumer spending redirected to this seller, not donated.
              </p>
            ) : null}
          </div>

          <a
            className="verify-link"
            href={product.verificationUrl}
            target="_blank"
            rel="noreferrer"
          >
            {verified ? "How we verified this" : "Verification pending"}{" "}
            <span aria-hidden="true">→</span>
          </a>

          <div className="card-foot-actions">
            {sellerLink.ok ? (
              <a
                className="seller-link"
                href={sellerLink.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit seller <Arrow />
              </a>
            ) : (
              <p className="seller-link-unavailable">Seller link needs review</p>
            )}
            <button
              type="button"
              className={
                inMyElsewhere
                  ? "my-elsewhere-log-btn my-elsewhere-log-btn-in"
                  : "my-elsewhere-log-btn"
              }
              onClick={onLogPurchase}
            >
              <ShelfIcon />
              {inMyElsewhere ? "Log purchase" : "Add to My Elsewhere"}
            </button>
            {inMyElsewhere ? (
              <span className="my-elsewhere-in-label">In My Elsewhere</span>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

const sortLabels: Record<SortOption, string> = {
  "best-match": "Best match",
  "price-low": "Price: low to high",
  "price-high": "Price: high to low",
};

export default function ExploreResultsView({
  query,
  submittedQuery,
  matchingProducts,
  onQueryChange,
  onSubmit,
  causeFilter,
  onCauseFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  surpriseMe,
  onSurpriseMe,
  onClearSurprise,
  onSyncExploreUrl,
  onGoHome,
}: ExploreResultsViewProps) {
  const { isSaved, toggleSaved } = useSavedSwaps();
  const {
    addPurchase,
    hasPurchases,
    lastRecurrenceForProduct,
  } = usePurchaseHistory();
  const [logProduct, setLogProduct] = useState<Product | null>(null);
  const [logSubmitting, setLogSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 6000);
    return () => window.clearTimeout(t);
  }, [toast]);
  const [openMenu, setOpenMenu] = useState<
    "cause" | "price" | "giving" | "sort" | null
  >(null);
  const [priceFilter, setPriceFilter] = useState<PriceBucket | null>(null);
  const [givingFilterGroup, setGivingFilterGroup] =
    useState<GivingFilterGroup | null>(null);
  const [sort, setSort] = useState<SortOption>("best-match");
  const [spendAmount, setSpendAmount] = useState("");
  const [spendFrequency, setSpendFrequency] =
    useState<SpendFrequency>("month");
  const [submittedAnnualBudget, setSubmittedAnnualBudget] = useState<
    number | null
  >(null);

  const handleSubmit = (event: FormEvent) => {
    onSubmit(event);
  };

  useEffect(() => {
    setSubmittedAnnualBudget(
      normalizeSpendingInput(spendAmount, spendFrequency),
    );
  }, [spendAmount, spendFrequency]);

  useEffect(() => {
    if (window.location.hash !== "#explore-search") return;
    const el = document.getElementById("explore-query");
    el?.focus({ preventScroll: false });
  }, []);

  useEffect(() => {
    setPriceFilter(null);
    setGivingFilterGroup(null);
    setSort("best-match");
    setOpenMenu(null);
  }, [submittedQuery, causeFilter, categoryFilter, surpriseMe]);

  const spendContext = useMemo(
    () => buildSpendComparisonContext(spendAmount, spendFrequency),
    [spendAmount, spendFrequency],
  );

  const hero = useMemo(
    () =>
      buildExploreHero({
        submittedQuery,
        causeFilter,
        surpriseMe,
        categoryFilter,
      }),
    [submittedQuery, causeFilter, surpriseMe, categoryFilter],
  );

  const priceOptions = useMemo(() => catalogPriceBuckets(), []);
  const givingOptions = useMemo(
    () => catalogGivingFilterGroups(matchingProducts),
    [matchingProducts],
  );

  const filteredProducts = useMemo(
    () =>
      filterAndSortExploreResults(
        matchingProducts,
        {
          cause: null,
          price: priceFilter,
          givingFilterGroup,
        },
        sort,
        submittedQuery,
        submittedAnnualBudget,
        spendContext,
      ),
    [
      matchingProducts,
      priceFilter,
      givingFilterGroup,
      sort,
      submittedQuery,
      submittedAnnualBudget,
      spendContext,
    ],
  );

  const hasActiveFilters =
    priceFilter !== null || givingFilterGroup !== null;

  const clearFilters = () => {
    setPriceFilter(null);
    setGivingFilterGroup(null);
    setOpenMenu(null);
  };

  const handleLogSubmit = (input: Parameters<typeof addPurchase>[0]) => {
    if (logSubmitting) return;
    setLogSubmitting(true);
    addPurchase(input);
    setLogSubmitting(false);
    setLogProduct(null);
    setToast("Added to My Elsewhere");
  };

  const logDefaults = logProduct
    ? lastRecurrenceForProduct(logProduct.id) ?? undefined
    : undefined;

  const selectCause = (cause: string | null) => {
    onClearSurprise();
    onCauseFilterChange(cause);
    setOpenMenu(null);
    onSyncExploreUrl({
      q: submittedQuery.trim() || undefined,
      cause,
      category: categoryFilter,
    });
  };

  const showDiscoveryChrome =
    submittedQuery.trim() !== "" ||
    causeFilter !== null ||
    categoryFilter !== null ||
    surpriseMe;

  const causeLabel = causeFilter
    ? `Cause: ${causeFilter}`
    : "Cause";
  const priceLabel = priceFilter
    ? `Price: ${priceBucketLabels[priceFilter]}`
    : "Price";
  const givingLabel = givingFilterGroup
    ? `Giving: ${givingFilterGroupLabel(givingFilterGroup)}`
    : "Giving model";
  const sortLabel = `Sort: ${sortLabels[sort]}`;

  return (
    <main>
      <SiteHeader onGoHome={onGoHome} currentPage="explore" />

      <section className="explore-top">
        <form
          id="explore-search"
          className="explore-search"
          onSubmit={handleSubmit}
        >
          <label className="micro-label" htmlFor="explore-query">
            What are you looking for?
          </label>
          <div className="explore-search-row">
            <span className="explore-query-icon" aria-hidden="true">
              <SearchIcon />
            </span>
            <input
              id="explore-query"
              className="explore-query-input"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search for something you already buy..."
            />
            <button type="submit" className="explore-search-submit">
              Search <Arrow />
            </button>
          </div>

          <div className="explore-search-divider" aria-hidden="true" />

          <div className="spend-optional">
            <div className="spend-optional-copy">
              <div className="spend-label-inline">
                <label className="micro-label spend-label-inline-text" htmlFor="explore-spend">
                  What do you spend now?{" "}
                  <span className="label-optional">(optional)</span>
                </label>
                <SpendFieldHelp />
              </div>
              <p className="helper-text">
                Helps us surface swaps around what you already pay.
              </p>
            </div>
            <div className="spend-controls">
              <span className="spend-currency" aria-hidden="true">
                $
              </span>
              <input
                id="explore-spend"
                className="spend-amount"
                inputMode="decimal"
                placeholder="Enter amount"
                value={spendAmount}
                onChange={(event) => setSpendAmount(event.target.value)}
                aria-label="Current spending amount in dollars"
              />
              <select
                className="spend-frequency"
                value={spendFrequency}
                onChange={(event) =>
                  setSpendFrequency(event.target.value as SpendFrequency)
                }
                aria-label="Spending frequency"
              >
                <option value="week">per week</option>
                <option value="month">per month</option>
                <option value="year">per year</option>
              </select>
            </div>
          </div>
        </form>

        <div className="explore-intro">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>
            {hero.titleLine1}{" "}
            {hero.titleAccent ? <span>{hero.titleAccent}</span> : null}
            {hero.titlePunctuation}
          </h1>
          {hero.supportingLine ? (
            <p className="explore-intro-lead">{hero.supportingLine}</p>
          ) : null}
        </div>
      </section>

      {!showDiscoveryChrome ? (
        <ExploreShopByCategory onSurpriseMe={onSurpriseMe} />
      ) : null}

      <section className="explore-results" id="results" aria-live="polite">
        {showDiscoveryChrome ? (
          <>
          <div className="explore-filters" aria-label="Result filters">
          <div className="filter-row">
            <div className="filter-group">
              <button
                type="button"
                className={`explore-surprise-filter${surpriseMe ? " surprise-me-active" : ""}`}
                onClick={onSurpriseMe}
              >
                <span aria-hidden="true">✦</span> Surprise me
              </button>

              <CausePickerPopover
                label={causeLabel}
                isOpen={openMenu === "cause"}
                active={causeFilter !== null}
                causeFilter={causeFilter}
                onToggle={() =>
                  setOpenMenu((current) =>
                    current === "cause" ? null : "cause",
                  )
                }
                onClose={() => setOpenMenu(null)}
                onSelectCause={selectCause}
              />

              <FilterMenu
                label={priceLabel}
                isOpen={openMenu === "price"}
                active={priceFilter !== null}
                onToggle={() =>
                  setOpenMenu((current) =>
                    current === "price" ? null : "price",
                  )
                }
                onClose={() => setOpenMenu(null)}
              >
                <button
                  type="button"
                  className={priceFilter === null ? "selected" : undefined}
                  onClick={() => {
                    setPriceFilter(null);
                    setOpenMenu(null);
                  }}
                >
                  Any price
                </button>
                {priceOptions.map((bucket) => (
                  <button
                    key={bucket}
                    type="button"
                    className={priceFilter === bucket ? "selected" : undefined}
                    onClick={() => {
                      setPriceFilter(bucket);
                      setOpenMenu(null);
                    }}
                  >
                    {priceBucketLabels[bucket]}
                  </button>
                ))}
              </FilterMenu>

              <FilterMenu
                label={givingLabel}
                isOpen={openMenu === "giving"}
                active={givingFilterGroup !== null}
                onToggle={() =>
                  setOpenMenu((current) =>
                    current === "giving" ? null : "giving",
                  )
                }
                onClose={() => setOpenMenu(null)}
                menuClassName="filter-menu-giving"
              >
                {GIVING_FILTER_OPTIONS.filter((opt) =>
                  givingOptions.includes(opt.id),
                ).map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    className={
                      givingFilterGroup === opt.id ? "selected" : undefined
                    }
                    onClick={() => {
                      setGivingFilterGroup(opt.id);
                      setOpenMenu(null);
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </FilterMenu>
            </div>

            <FilterMenu
              label={sortLabel}
              isOpen={openMenu === "sort"}
              active={sort !== "best-match"}
              onToggle={() =>
                setOpenMenu((current) => (current === "sort" ? null : "sort"))
              }
              onClose={() => setOpenMenu(null)}
            >
              {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  className={sort === option ? "selected" : undefined}
                  onClick={() => {
                    setSort(option);
                    setOpenMenu(null);
                  }}
                >
                  {sortLabels[option]}
                </button>
              ))}
            </FilterMenu>
          </div>
          </div>
          </>
        ) : null}

        {matchingProducts.length === 0
          ? (() => {
              const emptyMessage =
                causeFilter && submittedQuery.trim()
                  ? emptyStateQueryCauseMessage(
                      submittedQuery.trim(),
                      causeFilter,
                    )
                  : causeFilter
                    ? `We don't have verified swaps for ${causeFilter} in the catalog yet. Try another cause or search for something you buy.`
                    : submittedQuery.trim()
                      ? `We don't have a verified swap for "${submittedQuery.trim()}" yet. Try another everyday purchase, like coffee or toilet paper.`
                      : categoryFilter
                        ? "No verified swaps in this category yet. Try another category or search for something you buy."
                        : null;
              return emptyMessage ? (
                <p className="explore-empty">{emptyMessage}</p>
              ) : null;
            })()
          : filteredProducts.length === 0 ? (
          <div>
            <p className="explore-empty">
              No results match these filters. Try clearing filters or searching
              for something else.
            </p>
            {hasActiveFilters ? (
              <button type="button" className="filter-clear" onClick={clearFilters}>
                Clear filters
              </button>
            ) : null}
          </div>
        ) : filteredProducts.length === 1 ? (
          <div className="explore-single-layout">
            <ExploreProductCard
              product={filteredProducts[0]!}
              isSaved={isSaved(filteredProducts[0]!.id)}
              onToggleSaved={() => toggleSaved(filteredProducts[0]!.id)}
              spendContext={spendContext}
              inMyElsewhere={hasPurchases(filteredProducts[0]!.id)}
              onLogPurchase={() => setLogProduct(filteredProducts[0]!)}
            />
            <div className="explore-single-aside" aria-hidden="true" />
          </div>
        ) : (
          <div
            className={
              filteredProducts.length === 2
                ? "explore-grid explore-grid--pair"
                : "explore-grid"
            }
          >
            {filteredProducts.map((product, index) => (
              <Fragment key={product.id}>
                {index === 3 && filteredProducts.length >= 6 ? (
                  <aside className="explore-editorial-strip explore-grid-span">
                    <p>Same purchase. Different destination.</p>
                  </aside>
                ) : null}
                <ExploreProductCard
                  product={product}
                  isSaved={isSaved(product.id)}
                  onToggleSaved={() => toggleSaved(product.id)}
                  spendContext={spendContext}
                  inMyElsewhere={hasPurchases(product.id)}
                  onLogPurchase={() => setLogProduct(product)}
                />
              </Fragment>
            ))}
          </div>
        )}
      </section>

      {logProduct ? (
        <PurchaseLogModal
          product={logProduct}
          defaults={logDefaults ?? undefined}
          submitting={logSubmitting}
          onClose={() => setLogProduct(null)}
          onSubmit={handleLogSubmit}
        />
      ) : null}

      {toast ? (
        <ToastNotice
          message={toast}
          actionLabel="View My Elsewhere"
          actionHref="/my-elsewhere"
          onDismiss={() => setToast(null)}
        />
      ) : null}

      <SitePromiseSection />
      <SiteFooter onGoHome={onGoHome} />
    </main>
  );
}
