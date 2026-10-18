/**
 * Optional newsletter adapter for Notes from Elsewhere.
 *
 * Delivery is opt-in. Set VITE_NEWSLETTER_ENDPOINT to an https:// URL
 * that accepts a JSON POST with { email }. Nothing is stored locally,
 * and signup is not claimed as successful until that endpoint is
 * configured and returns a 2xx response.
 */

export type NewsletterResult =
  | { status: "sent" }
  | { status: "unconfigured" }
  | { status: "rejected"; message: string }
  | { status: "network"; message: string };

function readConfiguredEndpoint(): string | null {
  const raw = import.meta.env.VITE_NEWSLETTER_ENDPOINT;
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

export function isNewsletterConfigured(): boolean {
  return readConfiguredEndpoint() !== null;
}

export async function subscribeNewsletter(
  email: string,
): Promise<NewsletterResult> {
  const endpoint = readConfiguredEndpoint();
  if (!endpoint) return { status: "unconfigured" };

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
        form: "newsletter",
        email: email.trim(),
        submittedAt: new Date().toISOString(),
      }),
      signal: controller.signal,
    });
    window.clearTimeout(timer);

    if (!response.ok) {
      return {
        status: "rejected",
        message:
          "The mailing list didn't accept this signup. Please try again later.",
      };
    }
    return { status: "sent" };
  } catch {
    return {
      status: "network",
      message:
        "We couldn't reach the mailing list. Check your connection and try again.",
    };
  }
}
