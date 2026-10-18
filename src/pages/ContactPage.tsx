import { FormEvent, useEffect, useState } from "react";
import EditorialChrome from "../components/EditorialChrome";
import {
  FormBanner,
  FormField,
  HoneypotField,
  describedByFor,
} from "../components/SiteForm";
import {
  deliverFormSubmission,
  isFormDeliveryConfigured,
} from "../data/formDelivery";
import {
  focusFirstInvalid,
  validateEmail,
  validateOptionalHttpUrl,
  validateRequiredChoice,
  validateRequiredText,
} from "../data/formValidation";

const INQUIRY_OPTIONS = [
  "General question",
  "Incorrect product information",
  "Technical issue",
  "Press inquiry",
  "Partnership or collaboration question",
  "Other",
] as const;

type ContactErrors = Partial<
  Record<"email" | "inquiry" | "message" | "url", string>
>;

export default function ContactPage() {
  const deliveryReady = isFormDeliveryConfigured();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [pending, setPending] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const validate = (): ContactErrors => {
    const next: ContactErrors = {};
    const emailError = validateEmail(email, true);
    if (emailError) next.email = emailError;
    const inquiryError = validateRequiredChoice(inquiry);
    if (inquiryError) next.inquiry = inquiryError;
    const messageError = validateRequiredText(message, 10);
    if (messageError) next.message = messageError;
    const urlError = validateOptionalHttpUrl(url);
    if (urlError) next.url = urlError;
    return next;
  };

  useEffect(() => {
    if (attempted) setErrors(validate());
  }, [attempted, email, inquiry, message, url]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (pending) return;
    setFormError(null);
    setAttempted(true);
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      focusFirstInvalid(
        [
          nextErrors.email ? "contact-email" : "",
          nextErrors.inquiry ? "contact-inquiry" : "",
          nextErrors.message ? "contact-message" : "",
          nextErrors.url ? "contact-url" : "",
        ].filter(Boolean),
      );
      return;
    }

    setPending(true);
    const result = await deliverFormSubmission({
      form: "contact",
      submittedAt: new Date().toISOString(),
      honeypot,
      fields: {
        name: name.trim(),
        email: email.trim(),
        inquiryType: inquiry,
        message: message.trim(),
        url: url.trim(),
      },
    });
    setPending(false);

    if (result.status === "sent") {
      setSent(true);
      return;
    }
    if (result.status === "unconfigured") {
      setFormError(
        "This form isn't connected to a delivery inbox yet, so your message was not sent. Nothing was stored in this browser.",
      );
      return;
    }
    setFormError(result.message);
  };

  return (
    <EditorialChrome page="contact">
      <section className="form-hero form-hero-contact">
        <div>
          <p className="story-eyebrow">Contact</p>
          <h1 className="form-hero-title">
            Have a question?
            <span>An idea?</span>
            <span>A complaint about the state of the world?</span>
          </h1>
          <p className="form-hero-close">
            We can probably help with the first two.
          </p>
        </div>
      </section>

      <section className="form-panel">
        {sent ? (
          <FormBanner tone="success">
            <p>
              Thanks — we received your message. If you left an email, we can
              write back.
            </p>
          </FormBanner>
        ) : (
          <form
            className="site-form"
            onSubmit={onSubmit}
            noValidate
            aria-busy={pending}
          >
            {!deliveryReady ? (
              <FormBanner tone="note">
                <p>
                  This form isn&apos;t connected to a delivery inbox yet, so
                  messages cannot be sent. Nothing you type is stored in this
                  browser.
                </p>
              </FormBanner>
            ) : null}
            {formError ? (
              <FormBanner tone="error">
                <p>{formError}</p>
              </FormBanner>
            ) : null}

            <FormField id="contact-name" label="Name">
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </FormField>

            <FormField
              id="contact-email"
              label="Email"
              required
              error={errors.email}
            >
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-required="true"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={describedByFor(
                  "contact-email",
                  undefined,
                  errors.email,
                )}
              />
            </FormField>

            <FormField
              id="contact-inquiry"
              label="Inquiry type"
              required
              error={errors.inquiry}
            >
              <select
                id="contact-inquiry"
                name="inquiry"
                required
                aria-required="true"
                value={inquiry}
                onChange={(event) => setInquiry(event.target.value)}
                aria-invalid={Boolean(errors.inquiry)}
                aria-describedby={describedByFor(
                  "contact-inquiry",
                  undefined,
                  errors.inquiry,
                )}
              >
                <option value="">Choose one</option>
                {INQUIRY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </FormField>

            {inquiry === "Partnership or collaboration question" ? (
              <p className="site-form-note">
                We can talk about collaborations that respect our independence.
                Elsewhere does not accept ads, sponsorships, paid rankings,
                affiliate commissions, or paid placement.
              </p>
            ) : null}

            <FormField
              id="contact-message"
              label="Message"
              required
              error={errors.message}
            >
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                required
                aria-required="true"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={describedByFor(
                  "contact-message",
                  undefined,
                  errors.message,
                )}
              />
            </FormField>

            <FormField
              id="contact-url"
              label="Relevant URL"
              hint="A product page, bug location, or article — if you have one."
              error={errors.url}
            >
              <input
                id="contact-url"
                name="url"
                type="url"
                inputMode="url"
                placeholder="https://"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                aria-invalid={Boolean(errors.url)}
                aria-describedby={describedByFor(
                  "contact-url",
                  "contact-url-hint",
                  errors.url,
                )}
              />
            </FormField>

            <HoneypotField
              id="contact-fax"
              value={honeypot}
              onChange={setHoneypot}
            />

            <button
              className="story-cta site-form-submit"
              type="submit"
              disabled={pending}
              aria-disabled={pending}
            >
              {pending ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </section>
    </EditorialChrome>
  );
}
