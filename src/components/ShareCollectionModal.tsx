import { useEffect, useId, useRef, useState } from "react";
import {
  formatCauseTagsForDisplay,
} from "../data/products";
import {
  getExploreCardTitle,
  isBrandDiscoveryEntry,
} from "../data/productDisplay";
import type { Product } from "../data/productTypes";
import {
  DEFAULT_COLLECTION_TITLE,
  MAX_COLLECTION_ITEMS,
  MAX_COLLECTION_TITLE_LENGTH,
  buildCollectionUrl,
  encodeSharedCollection,
} from "../data/sharedCollection";

type ShareCollectionModalProps = {
  products: Product[];
  onClose: () => void;
};

export default function ShareCollectionModal({
  products,
  onClose,
}: ShareCollectionModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [collectionTitle, setCollectionTitle] = useState(DEFAULT_COLLECTION_TITLE);
  const [selectedIds, setSelectedIds] = useState<string[]>(() =>
    products.slice(0, MAX_COLLECTION_ITEMS).map((product) => product.id),
  );
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);

  useEffect(() => {
    dialogRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    setCanNativeShare(typeof navigator.share === "function");
  }, []);

  const selectable = products.slice(0, MAX_COLLECTION_ITEMS);
  const extraSaved = Math.max(0, products.length - MAX_COLLECTION_ITEMS);

  const toggleId = (id: string) => {
    setShareUrl(null);
    setCopyState("idle");
    setGenerateError(null);
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const createLink = () => {
    setGenerateError(null);
    setCopyState("idle");
    const encoded = encodeSharedCollection({
      title: collectionTitle,
      ids: selectedIds,
    });
    if (!encoded) {
      setGenerateError("Choose at least one saved swap to share.");
      return;
    }
    setShareUrl(buildCollectionUrl(encoded));
  };

  const copyLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyState("copied");
    } catch {
      try {
        const field = document.createElement("textarea");
        field.value = shareUrl;
        field.setAttribute("readonly", "");
        field.style.position = "absolute";
        field.style.left = "-9999px";
        document.body.appendChild(field);
        field.select();
        document.execCommand("copy");
        document.body.removeChild(field);
        setCopyState("copied");
      } catch {
        setCopyState("failed");
      }
    }
  };

  const nativeShare = async () => {
    if (!shareUrl || typeof navigator.share !== "function") return;
    try {
      await navigator.share({
        title: collectionTitle.trim() || DEFAULT_COLLECTION_TITLE,
        text: "A few everyday swaps from Elsewhere.",
        url: shareUrl,
      });
    } catch {
      // User cancelled the sheet — not an error.
    }
  };

  return (
    <div className="purchase-log-backdrop" onClick={onClose} role="presentation">
      <div
        ref={dialogRef}
        className="share-collection-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="purchase-log-close" onClick={onClose}>
          Close
        </button>
        <p className="share-collection-eyebrow">Share my Elsewhere</p>
        <h2 id={titleId} className="purchase-log-title">
          A small collection of better places.
        </h2>

        {selectable.length === 0 ? (
          <div className="share-collection-empty">
            <p>
              Sharing uses saved swaps — bookmarks — not purchases. Save a few
              products on Explore first, then come back to make a link.
            </p>
            <a className="story-cta" href="/explore">
              Find swaps to save
            </a>
          </div>
        ) : (
          <>
            <p className="share-collection-lead">
              Choose what a friend will see. The link is not created until you
              say so.
            </p>

            <div className="share-privacy-note">
              <p>
                <strong>Visible on the link:</strong> product name, brand,
                photo, cause, documented giving commitment, and a seller link.
              </p>
              <p>
                <strong>Never included:</strong> purchases, amounts, dates,
                email, or anything from your private history.
              </p>
            </div>

            <label className="share-title-label" htmlFor="share-collection-title">
              Collection title
              <span>Optional</span>
            </label>
            <input
              id="share-collection-title"
              className="share-title-input"
              type="text"
              maxLength={MAX_COLLECTION_TITLE_LENGTH}
              value={collectionTitle}
              onChange={(event) => {
                setCollectionTitle(event.target.value);
                setShareUrl(null);
                setCopyState("idle");
              }}
            />

            <fieldset className="share-pick-fieldset">
              <legend>
                Saved swaps to include
                <span>
                  {selectedIds.length} of {selectable.length}
                </span>
              </legend>
              <ul className="share-pick-list">
                {selectable.map((product) => {
                  const checked = selectedIds.includes(product.id);
                  const discovery = isBrandDiscoveryEntry(product);
                  return (
                    <li key={product.id}>
                      <label className={checked ? "share-pick-row selected" : "share-pick-row"}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleId(product.id)}
                        />
                        {product.image ? (
                          <img src={product.image} alt="" />
                        ) : (
                          <span className="share-pick-fallback" aria-hidden="true">
                            {product.brand.slice(0, 1)}
                          </span>
                        )}
                        <span className="share-pick-copy">
                          <strong>{getExploreCardTitle(product)}</strong>
                          <em>
                            {discovery ? "Brand discovery · " : null}
                            {product.brand}
                          </em>
                          <span>{formatCauseTagsForDisplay(product)}</span>
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
              {extraSaved > 0 ? (
                <p className="share-pick-limit">
                  A collection can include up to {MAX_COLLECTION_ITEMS} saved
                  swaps. {extraSaved} more stay private.
                </p>
              ) : null}
            </fieldset>

            {generateError ? (
              <p className="share-generate-error" role="alert">
                {generateError}
              </p>
            ) : null}

            {shareUrl ? (
              <div className="share-link-panel">
                <p className="share-link-label">Shareable link</p>
                <p className="share-link-url">{shareUrl}</p>
                <div className="share-link-actions">
                  <button type="button" className="story-cta" onClick={copyLink}>
                    {copyState === "copied" ? "Copied" : "Copy link"}
                  </button>
                  {canNativeShare ? (
                    <button
                      type="button"
                      className="story-cta-secondary"
                      onClick={nativeShare}
                    >
                      Share…
                    </button>
                  ) : null}
                </div>
                {copyState === "failed" ? (
                  <p className="share-generate-error" role="alert">
                    Couldn&apos;t copy automatically. Select the link and copy
                    it yourself.
                  </p>
                ) : null}
                <p className="share-link-note">
                  Anyone with this link can open the collection — even on
                  another phone or browser. It does not use your saved list.
                </p>
              </div>
            ) : (
              <button
                type="button"
                className="story-cta share-create-btn"
                onClick={createLink}
                disabled={selectedIds.length === 0}
              >
                Create shareable link
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
