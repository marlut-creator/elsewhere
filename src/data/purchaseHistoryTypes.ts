export type RecurrenceInterval =
  | "weekly"
  | "every_2_weeks"
  | "monthly"
  | "every_2_months"
  | "every_3_months";

export type PurchaseEvent = {
  id: string;
  productId: string;
  quantity: number;
  /** ISO date YYYY-MM-DD */
  purchaseDate: string;
  createdAt: string;
  recurring: boolean;
  recurrenceInterval?: RecurrenceInterval;
};

export const RECURRENCE_OPTIONS: {
  value: RecurrenceInterval;
  label: string;
}[] = [
  { value: "weekly", label: "Weekly" },
  { value: "every_2_weeks", label: "Every 2 weeks" },
  { value: "monthly", label: "Once a month" },
  { value: "every_2_months", label: "Every 2 months" },
  { value: "every_3_months", label: "Every 3 months" },
];

export function purchasesPerYearFromInterval(
  interval: RecurrenceInterval,
): number {
  switch (interval) {
    case "weekly":
      return 52;
    case "every_2_weeks":
      return 26;
    case "monthly":
      return 12;
    case "every_2_months":
      return 6;
    case "every_3_months":
      return 4;
    default:
      return 12;
  }
}

export function recurrenceIntervalLabel(
  interval: RecurrenceInterval,
): string {
  return (
    RECURRENCE_OPTIONS.find((o) => o.value === interval)?.label ?? interval
  );
}
