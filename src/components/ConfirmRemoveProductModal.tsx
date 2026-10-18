import { useEffect, useId, useRef } from "react";

type ConfirmRemoveProductModalProps = {
  productName: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmRemoveProductModal({
  productName,
  onCancel,
  onConfirm,
}: ConfirmRemoveProductModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dialogRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div className="purchase-log-backdrop" onClick={onCancel} role="presentation">
      <div
        ref={dialogRef}
        className="purchase-log-dialog confirm-remove-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id={titleId} className="purchase-log-title">
          Remove this from My Elsewhere?
        </h2>
        <p className="confirm-remove-copy">
          This will delete its logged purchase history and remove it from your
          impact totals.
        </p>
        <p className="confirm-remove-product">{productName}</p>
        <div className="confirm-remove-actions">
          <button type="button" className="confirm-remove-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="confirm-remove-confirm" onClick={onConfirm}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
