import { FormEvent, useState } from "react";
import {
  isNewsletterConfigured,
  subscribeNewsletter,
} from "../data/newsletterDelivery";
import { validateEmail } from "../data/formValidation";

export default function NewsletterSignup() {
  const ready = isNewsletterConfigured();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (pending || !ready) return;
    setFormError(null);
    const nextError = validateEmail(email, true);
    setError(nextError);
    if (nextError) return;

    setPending(true);
    const result = await subscribeNewsletter(email);
    setPending(false);

    if (result.status === "sent") {
      setSent(true);
      return;
    }
    if (result.status === "unconfigured") {
      setFormError(
        "This mailing list isn't connected yet, so your email was not sent. Nothing was stored in this browser.",
      );
      return;
    }
    setFormError(result.message);
  };

  if (sent) {
    return (
      <p className="notes-newsletter-success" role="status">
        You&apos;re on the list. Occasional notes — no ads, no selling your
        email.
      </p>
    );
  }

  return (
    <form className="notes-newsletter-form" onSubmit={onSubmit} noValidate>
      {!ready ? (
        <p className="notes-newsletter-note">
          Signup isn&apos;t connected to a mailing list yet, so we can&apos;t
          collect emails. Nothing you type is stored in this browser.
        </p>
      ) : null}
      {formError ? (
        <p className="notes-newsletter-error" role="alert">
          {formError}
        </p>
      ) : null}

      <div className="notes-newsletter-row">
        <label className="sr-only" htmlFor="notes-newsletter-email">
          Email
        </label>
        <input
          id="notes-newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          disabled={!ready || pending}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? "notes-newsletter-email-error" : "notes-newsletter-promise"
          }
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError(validateEmail(event.target.value, true));
          }}
        />
        <button
          className="story-cta"
          type="submit"
          disabled={!ready || pending}
        >
          {pending ? "Sending…" : "Keep me posted"}
        </button>
      </div>
      {error ? (
        <p id="notes-newsletter-email-error" className="notes-newsletter-error" role="alert">
          {error}
        </p>
      ) : null}
      <p id="notes-newsletter-promise" className="notes-newsletter-fine">
        No ads. No selling your address. We&apos;ll write when there&apos;s
        something worth sending.
      </p>
    </form>
  );
}
