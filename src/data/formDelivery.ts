/**
 * Submission adapter for Suggest a brand and Contact.
 *
 * Delivery is opt-in. Set VITE_FORM_ENDPOINT to an https:// URL that
 * accepts a JSON POST. Nothing is sent, stored, or claimed as delivered
 * until that endpoint is configured and returns a successful response.
 */

export type FormKind = "suggest-brand" | "contact";

export type FormSubmission = {
  form: FormKind;
  submittedAt: string;
  fields: Record<string, string | string[]>;
  honeypot: string;
};

export type DeliveryResult =
  | { status: "sent" }
  | { status: "unconfigured" }
  | { status: "rejected"; message: string }
  | { status: "network"; message: string };

function readConfiguredEndpoint(): string | null {
  const raw = import.meta.env.VITE_FORM_ENDPOINT;
  if (typeof raw !== "string") return null;
  const value = raw.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function isFormDeliveryConfigured(): boolean {
  return readConfiguredEndpoint() !== null;
}

export async function deliverFormSubmission(
  payload: FormSubmission,
): Promise<DeliveryResult> {
  if (payload.honeypot.trim()) {
    return {
      status: "rejected",
      message: "Couldn't send this submission. Please try again.",
    };
  }

  const endpoint = readConfiguredEndpoint();
  if (!endpoint) {
    return { status: "unconfigured" };
  }

  try {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 15000);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        form: payload.form,
        submittedAt: payload.submittedAt,
        fields: payload.fields,
      }),
      signal: controller.signal,
    });
    window.clearTimeout(timer);

    if (!response.ok) {
      return {
        status: "rejected",
        message:
          "The delivery service didn't accept this submission. Please try again later.",
      };
    }
    return { status: "sent" };
  } catch {
    return {
      status: "network",
      message:
        "We couldn't reach the delivery service. Check your connection and try again.",
    };
  }
}
