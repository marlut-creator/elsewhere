import { FormEvent, useEffect, useRef, useState } from "react";
import { formatCauseTagsForDisplay, givingModelCardHint } from "../data/products";
import {
  formatGivingClaimForCard,
  getExploreCardTitle,
  isBrandDiscoveryEntry,
} from "../data/productDisplay";
import { getProductById } from "../data/savedSwaps";
import type { ProductPurchaseRollup } from "../data/loggedImpact";
import { formatDisplayDate } from "../data/loggedImpact";
import type { PurchaseEvent } from "../data/purchaseHistoryTypes";
import { resolveSellerLink } from "../data/sellerUrlSafety";
import { usePurchaseHistory } from "../hooks/usePurchaseHistory";
import { useSavedSwaps } from "../hooks/useSavedSwaps";
import ConfirmRemoveProductModal from "./ConfirmRemoveProductModal";
import MyElsewhereImpactPanel from "./MyElsewhereImpactPanel";
import PurchaseLogModal from "./PurchaseLogModal";
import MyElsewhereEmptyIllustration from "./MyElsewhereEmptyIllustration";
import ShareCollectionModal from "./ShareCollectionModal";
import SitePromiseSection from "./SitePromiseSection";
import { SiteFooter, SiteHeader } from "./SiteChrome";
import ToastNotice from "./ToastNotice";

function formatMoney(amount: number): string {
  return `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

function PurchaseHistoryPanel({
  events,
  onUpdate,
  onDelete,
}: {
  events: PurchaseEvent[];
  onUpdate: (
    id: string,
    patch: Partial<Pick<PurchaseEvent, "quantity" | "purchaseDate">>,
  ) => void;
  onDelete: (id: string) => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftQty, setDraftQty] = useState(1);
  const [draftDate, setDraftDate] = useState("");

  const startEdit = (event: PurchaseEvent) => {
    setEditingId(event.id);
    setDraftQty(event.quantity);
    setDraftDate(event.purchaseDate);
  };

  const saveEdit = (id: string) => {
    onUpdate(id, {
      quantity: Math.max(1, Math.floor(draftQty)),
      purchaseDate: draftDate,
    });
    setEditingId(null);
  };

  return (
    <ul className="purchase-history-list">
      {events.map((event) => (
        <li key={event.id}>
          {editingId === event.id ? (
            <div className="purchase-history-edit">
              <input
                type="date"
                value={draftDate}
                onChange={(e) => setDraftDate(e.target.value)}
                aria-label="Purchase date"
              />
              <input
                type="number"
                min={1}
                step={1}
                value={draftQty}
                onChange={(e) =>
                  setDraftQty(Math.max(1, parseInt(e.target.value, 10) || 1))
                }
                aria-label="Quantity"
              />
              <button type="button" onClick={() => saveEdit(event.id)}>
                Save
              </button>
              <button type="button" onClick={() => setEditingId(null)}>
                Cancel
              </button>
            </div>
          ) : (
            <div className="purchase-history-row">
              <span>
                {formatDisplayDate(event.purchaseDate)} · {event.quantity}{" "}
                purchased
              </span>
              <span className="purchase-history-quiet-actions">
                <button type="button" onClick={() => startEdit(event)}>
                  Edit
                </button>
                <button type="button" onClick={() => onDelete(event.id)}>
                  Delete
                </button>
              </span>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

function ProductOverflowMenu({
  historyOpen,
  onToggleHistory,
  onRemove,
}: {
  historyOpen: boolean;
  onToggleHistory: () => void;
  onRemove: () => void;
}) {
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
    <div className="product-overflow-wrap" ref={wrapRef}>
      <button
        type="button"
        className="product-overflow-trigger"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="More actions"
        onClick={() => setOpen((current) => !current)}
      >
        •••
      </button>
      {open ? (
        <div className="product-overflow-menu" role="menu">
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              onToggleHistory();
              setOpen(false);
            }}
          >
            Purchase history{historyOpen ? " (hide)" : ""}
          </button>
          <button
            type="button"
            role="menuitem"
            className="product-overflow-danger"
            onClick={() => {
              setOpen(false);
              onRemove();
            }}
          >
            Remove from My Elsewhere
          </button>
        </div>
      ) : null}
    </div>
  );
}

function LoggedProductRow({
  rollup,
  onLogAnother,
  onUpdateEvent,
  onDeleteEvent,
  onRemoveProduct,
}: {
  rollup: ProductPurchaseRollup;
  onLogAnother: () => void;
  onUpdateEvent: (
    id: string,
    patch: Partial<Pick<PurchaseEvent, "quantity" | "purchaseDate">>,
  ) => void;
  onDeleteEvent: (id: string) => void;
  onRemoveProduct: () => void;
}) {
  const [historyOpen, setHistoryOpen] = useState(false);
  const { product } = rollup;
  const discovery = isBrandDiscoveryEntry(product);
  const title = getExploreCardTitle(product);
  const seller = resolveSellerLink(product);
  const hint = givingModelCardHint(product.givingModel);
  const givingClaim = formatGivingClaimForCard(product, hint);

  return (
    <article className="logged-product-row">
      <div className="logged-product-media">
        {product.image ? (
          <img src={product.image} alt="" className="logged-product-image" />
        ) : (
          <div
            className={
              discovery
                ? "logged-product-placeholder logged-product-placeholder-discovery"
                : "logged-product-placeholder"
            }
          >
            {discovery ? (
              <span className="logged-product-discovery-label">
                Brand discovery
              </span>
            ) : null}
            <span>{product.brand}</span>
          </div>
        )}
      </div>

      <div className="logged-product-body">
        <div className="logged-product-header">
          <h2 className="logged-product-title">{title}</h2>
          <ProductOverflowMenu
            historyOpen={historyOpen}
            onToggleHistory={() => setHistoryOpen((open) => !open)}
            onRemove={onRemoveProduct}
          />
        </div>
        <p className="logged-product-brand">
          {discovery ? "Brand discovery · " : null}
          {product.brand.toUpperCase()}
        </p>
        <p className="logged-product-stats">
          <span>
            {rollup.eventCount} purchase{rollup.eventCount === 1 ? "" : "s"}
          </span>
          {rollup.totalRedirected != null ? (
            <>
              <span aria-hidden="true"> · </span>
              <span>{formatMoney(rollup.totalRedirected)} redirected</span>
            </>
          ) : null}
          {rollup.lastPurchaseDate ? (
            <>
              <span aria-hidden="true"> · </span>
              <span>
                Last bought {formatDisplayDate(rollup.lastPurchaseDate)}
              </span>
            </>
          ) : null}
        </p>

        {rollup.recurrenceLabel ? (
          <p className="logged-product-recurrence">
            Usually {rollup.recurrenceLabel.toLowerCase()}
          </p>
        ) : null}

        {rollup.projectionRedirected != null ? (
          <p className="logged-product-projection">
            At your current pace · ~{formatMoney(rollup.projectionRedirected)}
            /year redirected
          </p>
        ) : null}
        {rollup.projectionContribution ? (
          <p className="logged-product-projection">
            {rollup.projectionContribution}
          </p>
        ) : null}

        <div className="logged-product-impact">
          {rollup.dollarContributed != null ? (
            <p className="logged-product-impact-line">
              {formatMoney(rollup.dollarContributed)} contributed from logged
              purchases
            </p>
          ) : null}
          {rollup.physicalLines.map((line) => (
            <p key={line} className="logged-product-impact-line">
              {line} from logged purchases
            </p>
          ))}
          <div className="logged-product-giving-block">
            <p className="logged-product-giving-label">Verified giving</p>
            <p className="logged-product-claim">{givingClaim}</p>
          </div>
        </div>

        <div className="logged-product-actions">
          <button type="button" className="bought-again-btn" onClick={onLogAnother}>
            + Log another purchase
          </button>
          {seller.ok ? (
            <a
              className="logged-product-seller"
              href={seller.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit seller <span aria-hidden="true">→</span>
            </a>
          ) : (
            <span className="logged-product-seller-muted">
              Seller link needs review
            </span>
          )}
        </div>

        {historyOpen ? (
          <div className="purchase-history-panel">
            <PurchaseHistoryPanel
              events={rollup.events}
              onUpdate={onUpdateEvent}
              onDelete={onDeleteEvent}
            />
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function MyElsewhereView() {
  const {
    productRollups,
    dashboard,
    addPurchase,
    updatePurchase,
    deletePurchase,
    removeProductHistory,
    lastRecurrenceForProduct,
  } = usePurchaseHistory();
  const { savedProducts } = useSavedSwaps();

  const [logProductId, setLogProductId] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [removeProductId, setRemoveProductId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [continueQuery, setContinueQuery] = useState("");

  const logProduct =
    logProductId != null ? getProductById(logProductId) ?? null : null;
  const removeProduct =
    removeProductId != null ? getProductById(removeProductId) ?? null : null;

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 6000);
    return () => window.clearTimeout(t);
  }, [toast]);

  const hasLogged = productRollups.length > 0;

  const submitContinue = (event: FormEvent) => {
    event.preventDefault();
    const q = continueQuery.trim();
    window.location.href = q ? `/explore?q=${encodeURIComponent(q)}` : "/explore";
  };

  const handleLogSubmit = (input: Parameters<typeof addPurchase>[0]) => {
    if (submitting) return;
    setSubmitting(true);
    addPurchase(input);
    setSubmitting(false);
    setLogProductId(null);
    setToast("Added to My Elsewhere");
  };

  const openLogForProduct = (productId: string) => {
    setLogProductId(productId);
  };

  const logDefaults = logProductId
    ? (() => {
        const rec = lastRecurrenceForProduct(logProductId);
        return rec
          ? {
              recurring: rec.recurring,
              recurrenceInterval: rec.recurrenceInterval,
            }
          : undefined;
      })()
    : undefined;

  return (
    <main className="my-elsewhere-page">
      <SiteHeader currentPage="my-elsewhere" />

      <section className="my-elsewhere-intro-center">
        <h1 className="my-elsewhere-page-title">My Elsewhere</h1>
        <p className="my-elsewhere-headline">
          See where your everyday spending is adding up.
        </p>
        <p className="my-elsewhere-subcopy">
          Every purchase you log builds a picture of where your money went—and
          what it helped support.
        </p>
        <div className="my-elsewhere-share-row">
          <button
            type="button"
            className="story-cta-secondary"
            onClick={() => setShareOpen(true)}
          >
            Share my Elsewhere
          </button>
          <p>
            Share saved swaps with a friend. Purchases stay private.
          </p>
        </div>
      </section>

      {savedProducts.length > 0 ? (
        <section className="my-saved-swaps" aria-labelledby="saved-swaps-heading">
          <div className="my-saved-swaps-head">
            <div>
              <h2 id="saved-swaps-heading" className="my-swaps-heading">
                Saved swaps
              </h2>
              <p className="my-saved-swaps-note">
                Bookmarks, not purchases. Sharing uses only this list — never
                your logged history.
              </p>
            </div>
            <button
              type="button"
              className="story-cta"
              onClick={() => setShareOpen(true)}
            >
              Share my Elsewhere
            </button>
          </div>
          <ul className="saved-swap-list">
            {savedProducts.map((product) => {
              const discovery = isBrandDiscoveryEntry(product);
              const title = getExploreCardTitle(product);
              const hint = givingModelCardHint(product.givingModel);
              const givingClaim = formatGivingClaimForCard(product, hint);
              return (
                <li key={product.id}>
                  <article className="saved-swap-row">
                    <div className="saved-swap-media">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt=""
                          className="saved-swap-image"
                        />
                      ) : (
                        <div
                          className={
                            discovery
                              ? "saved-swap-placeholder saved-swap-placeholder-discovery"
                              : "saved-swap-placeholder"
                          }
                        >
                          {discovery ? (
                            <span className="saved-swap-discovery-label">
                              Brand discovery
                            </span>
                          ) : null}
                          <span>{product.brand}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="saved-swap-brand">{product.brand}</p>
                      <h3 className="saved-swap-title">{title}</h3>
                      <p className="saved-swap-meta">
                        {formatCauseTagsForDisplay(product)}
                      </p>
                      <p className="saved-swap-impact">{givingClaim}</p>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <section className="my-elsewhere-swaps my-elsewhere-canvas">
        {hasLogged ? (
          <div className="my-elsewhere-columns">
            <div className="my-elsewhere-col-purchases">
              <h2 className="my-swaps-heading">Your purchases</h2>
              <ul className="logged-product-list">
                {productRollups.map((rollup) => (
                  <li key={rollup.product.id}>
                    <LoggedProductRow
                      rollup={rollup}
                      onLogAnother={() => openLogForProduct(rollup.product.id)}
                      onUpdateEvent={updatePurchase}
                      onDeleteEvent={deletePurchase}
                      onRemoveProduct={() =>
                        setRemoveProductId(rollup.product.id)
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>
            <MyElsewhereImpactPanel
              dashboard={dashboard}
              productRollups={productRollups}
            />
          </div>
        ) : (
          <div className="my-elsewhere-empty-layout">
            <div className="my-elsewhere-empty-copy">
              <p className="my-elsewhere-empty-lead">
                You haven&apos;t logged a purchase yet.
              </p>
              <p className="my-elsewhere-empty-body">
                Log purchases you actually make — after buying from a seller —
                to see redirected spending, businesses supported, and impact
                areas over time.
              </p>
              <a className="my-elsewhere-cta" href="/explore">
                Find your first swap <span aria-hidden="true">→</span>
              </a>
            </div>
            <MyElsewhereEmptyIllustration />
          </div>
        )}
      </section>

      {hasLogged ? (
        <section className="my-elsewhere-continue">
          <h2 className="my-continue-heading">
            What else do you buy all the time?
          </h2>
          <p className="my-continue-sub">
            Search for another everyday purchase…
          </p>
          <form className="my-continue-search" onSubmit={submitContinue}>
            <input
              type="search"
              value={continueQuery}
              onChange={(event) => setContinueQuery(event.target.value)}
              placeholder="Coffee, socks, shampoo…"
              aria-label="Search for another everyday purchase"
            />
            <button type="submit">Search Explore</button>
          </form>
        </section>
      ) : null}

      {removeProduct ? (
        <ConfirmRemoveProductModal
          productName={removeProduct.productName}
          onCancel={() => setRemoveProductId(null)}
          onConfirm={() => {
            removeProductHistory(removeProduct.id);
            setRemoveProductId(null);
            setToast("Removed from My Elsewhere");
          }}
        />
      ) : null}

      {shareOpen ? (
        <ShareCollectionModal
          products={savedProducts}
          onClose={() => setShareOpen(false)}
        />
      ) : null}

      {logProduct ? (
        <PurchaseLogModal
          product={logProduct}
          defaults={logDefaults}
          submitting={submitting}
          onClose={() => setLogProductId(null)}
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
      <SiteFooter />
    </main>
  );
}
