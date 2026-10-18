export type SpendFrequency = "week" | "month" | "year";

export function parseSpendAmount(raw: string): number | null {
  const cleaned = raw.replace(/[^0-9.]/g, "");
  if (!cleaned) return null;
  const amount = Number.parseFloat(cleaned);
  if (!Number.isFinite(amount) || amount < 0) return null;
  if (amount === 0) return null;
  return amount;
}

export function toAnnualBudget(
  amount: number,
  frequency: SpendFrequency,
): number {
  switch (frequency) {
    case "week":
      return amount * 52;
    case "month":
      return amount * 12;
    case "year":
      return amount;
  }
}

export function normalizeSpendingInput(
  amountRaw: string,
  frequency: SpendFrequency,
): number | null {
  const amount = parseSpendAmount(amountRaw);
  if (amount == null) return null;
  return toAnnualBudget(amount, frequency);
}

function formatAmount(value: number): string {
  const rounded = Math.round(value * 100) / 100;
  return Number.isInteger(rounded)
    ? String(rounded)
    : rounded.toFixed(2).replace(/\.?0+$/, "");
}

export function formatSpendPeriodLabel(
  amountRaw: string,
  frequency: SpendFrequency,
): string | null {
  const amount = parseSpendAmount(amountRaw);
  if (amount == null) return null;
  const suffix =
    frequency === "week" ? "wk" : frequency === "month" ? "mo" : "yr";
  return `$${formatAmount(amount)}/${suffix}`;
}

export type SpendComparisonContext = {
  annualBudget: number;
  frequency: SpendFrequency;
  periodLabel: string;
};

export function buildSpendComparisonContext(
  amountRaw: string,
  frequency: SpendFrequency,
): SpendComparisonContext | null {
  const annualBudget = normalizeSpendingInput(amountRaw, frequency);
  const periodLabel = formatSpendPeriodLabel(amountRaw, frequency);
  if (annualBudget == null || periodLabel == null) return null;
  return { annualBudget, frequency, periodLabel };
}
