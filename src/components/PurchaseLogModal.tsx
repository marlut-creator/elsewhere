import { FormEvent, useEffect, useId, useRef, useState } from "react";
import type { Product } from "../data/productTypes";
import { representativeUnitPrice } from "../data/products";
import type { RecurrenceInterval } from "../data/purchaseHistoryTypes";
import { RECURRENCE_OPTIONS } from "../data/purchaseHistoryTypes";
import {
  todayIsoDate,
  yesterdayIsoDate,
} from "../data/loggedImpact";
import type { NewPurchaseInput } from "../hooks/usePurchaseHistory";

type DateChoice = "today" | "yesterday" | "custom";

export type PurchaseLogDefaults = Partial<
  Pick<NewPurchaseInput, "quantity" | "purchaseDate" | "recurring" | "recurrenceInterval">
>;

type PurchaseLogModalProps = {
  product: Product;
  defaults?: PurchaseLogDefaults;
  onClose: () => void;
  onSubmit: (input: NewPurchaseInput) => void;
  submitting?: boolean;
};

export default function PurchaseLogModal({
  product,
  defaults,
  onClose,
  onSubmit,
  submitting = false,
}: PurchaseLogModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [quantity, setQuantity] = useState(defaults?.quantity ?? 1);
  const [dateChoice, setDateChoice] = useState<DateChoice>("today");
  const [customDate, setCustomDate] = useState(todayIsoDate());
  const [recurring, setRecurring] = useState(defaults?.recurring ?? false);
  const [recurrenceInterval, setRecurrenceInterval] = useState<RecurrenceInterval>(
    defaults?.recurrenceInterval ?? "monthly",
  );

  useEffect(() => {
    dialogRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const unitPrice = representativeUnitPrice(product);

  const resolveDate = (): string => {
    if (dateChoice === "today") return todayIsoDate();
    if (dateChoice === "yesterday") return yesterdayIsoDate();
    return customDate;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    onSubmit({
      productId: product.id,
      quantity: Math.max(1, Math.floor(quantity)),
      purchaseDate: resolveDate(),
      recurring,
      recurrenceInterval: recurring ? recurrenceInterval : undefined,
    });
  };

  return (
    <div className="purchase-log-backdrop" onClick={onClose} role="presentation">
      <div
        ref={dialogRef}
        className="purchase-log-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="purchase-log-close" onClick={onClose}>
          Close
        </button>
        <h2 id={titleId} className="purchase-log-title">
          Add this to My Elsewhere
        </h2>
        <p className="purchase-log-product">
          <strong>{product.productName}</strong>
          <span>{product.brand}</span>
          {unitPrice != null ? (
            <span>${unitPrice.toFixed(2)} each</span>
          ) : product.priceDisplay ? (
            <span>{product.priceDisplay}</span>
          ) : null}
        </p>
        <p className="purchase-log-honesty">
          Log it when you&apos;ve actually bought it so your impact stays
          meaningful.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="purchase-log-label">
            How many did you buy?
            <div className="quantity-stepper">
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span aria-live="polite">{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
          </label>

          <fieldset className="purchase-log-fieldset">
            <legend>When?</legend>
            <div className="date-pills">
              <button
                type="button"
                className={dateChoice === "today" ? "active" : undefined}
                onClick={() => setDateChoice("today")}
              >
                Today
              </button>
              <button
                type="button"
                className={dateChoice === "yesterday" ? "active" : undefined}
                onClick={() => setDateChoice("yesterday")}
              >
                Yesterday
              </button>
              <button
                type="button"
                className={dateChoice === "custom" ? "active" : undefined}
                onClick={() => setDateChoice("custom")}
              >
                Choose date
              </button>
            </div>
            {dateChoice === "custom" ? (
              <input
                type="date"
                className="purchase-log-date"
                value={customDate}
                max={todayIsoDate()}
                onChange={(event) => setCustomDate(event.target.value)}
                aria-label="Purchase date"
              />
            ) : null}
          </fieldset>

          <label className="purchase-log-checkbox">
            <input
              type="checkbox"
              checked={recurring}
              onChange={(event) => setRecurring(event.target.checked)}
            />
            I buy this regularly
          </label>

          {recurring ? (
            <label className="purchase-log-label">
              About how often?
              <select
                value={recurrenceInterval}
                onChange={(event) =>
                  setRecurrenceInterval(event.target.value as RecurrenceInterval)
                }
              >
                {RECURRENCE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <button
            type="submit"
            className="purchase-log-submit"
            disabled={submitting}
          >
            Add purchase
          </button>
        </form>
      </div>
    </div>
  );
}
