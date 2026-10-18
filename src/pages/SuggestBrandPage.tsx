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
  validateHttpUrl,
  validateRequiredChoice,
  validateRequiredGroup,
  validateRequiredText,
} from "../data/formValidation";

const SELL_OPTIONS = [
  "Coffee & tea",
  "Personal care",
  "Household",
  "Clothing",
  "Pets",
  "Food & snacks",
  "Other",
] as const;

const CAUSE_OPTIONS = [
  "Animal rescue",
  "Wildlife conservation",
  "Environment",
  "Clean water",
  "Healthcare",
  "Education",
  "Community support",
  "Other",
] as const;

type SuggestErrors = Partial<
  Record<
    | "brand"
    | "website"
    | "sells"
    | "sellsOther"
    | "causes"
    | "giving"
    | "evidence"
    | "email",
    string
  >
>;

function SuggestionMark() {
  return (
    <figure className="form-hero-mark" aria-hidden="true">
      <svg viewBox="0 0 220 180">
        <rect
          x="28"
          y="36"
          width="128"
          height="118"
          rx="10"
          fill="#eeedf8"
          stroke="#321b36"
          strokeWidth="1.8"
        />
        <path
          d="M48 62h88M48 82h72M48 102h80M48 122h48"
          fill="none"
          stroke="#6679cc"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="168" cy="48" r="28" fill="#9faee8" stroke="#321b36" strokeWidth="1.8" />
        <path
          d="M168 36v24M156 48h24"
          fill="none"
          stroke="#321b36"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
      <figcaption>A note, plus one more idea.</figcaption>
    </figure>
  );
}

export default function SuggestBrandPage() {
  const deliveryReady = isFormDeliveryConfigured();
  const [brand, setBrand] = useState("");
  const [website, setWebsite] = useState("");
  const [sells, setSells] = useState("");
  const [sellsOther, setSellsOther] = useState("");
  const [causes, setCauses] = useState<string[]>([]);
  const [giving, setGiving] = useState("");
  const [evidence, setEvidence] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<SuggestErrors>({});
  const [pending, setPending] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const toggleCause = (cause: string) => {
    setCauses((current) =>
      current.includes(cause)
        ? current.filter((item) => item !== cause)
        : [...current, cause],
    );
  };

  const validate = (): SuggestErrors => {
    const next: SuggestErrors = {};
    const brandError = validateRequiredText(brand);
    if (brandError) next.brand = brandError;
    const websiteError = validateHttpUrl(website);
    if (websiteError) next.website = websiteError;
    const sellsError = validateRequiredChoice(sells);
    if (sellsError) next.sells = sellsError;
    if (sells === "Other") {
      const otherError = validateRequiredText(sellsOther);
      if (otherError) next.sellsOther = "Tell us what they sell.";
    }
    const causesError = validateRequiredGroup(causes);
    if (causesError) next.causes = causesError;
    const givingError = validateRequiredText(giving, 20);
    if (givingError) next.giving = givingError;
    const evidenceError = validateHttpUrl(evidence);
    if (evidenceError) next.evidence = evidenceError;
    const emailError = validateEmail(email, false);
    if (emailError) next.email = emailError;
    return next;
  };

  useEffect(() => {
    if (attempted) setErrors(validate());
  }, [
    attempted,
    brand,
    website,
    sells,
    sellsOther,
    causes,
    giving,
    evidence,
    email,
  ]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (pending) return;
    setFormError(null);
    setAttempted(true);
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      focusFirstInvalid([
        nextErrors.brand ? "suggest-brand" : "",
        nextErrors.website ? "suggest-website" : "",
        nextErrors.sells ? "suggest-sells" : "",
        nextErrors.sellsOther ? "suggest-sells-other" : "",
        nextErrors.causes ? "cause-animal-rescue" : "",
        nextErrors.giving ? "suggest-giving" : "",
        nextErrors.evidence ? "suggest-evidence" : "",
        nextErrors.email ? "suggest-email" : "",
      ].filter(Boolean));
      return;
    }

    setPending(true);
    const result = await deliverFormSubmission({
      form: "suggest-brand",
      submittedAt: new Date().toISOString(),
      honeypot,
      fields: {
        brandName: brand.trim(),
        website: website.trim(),
        sells: sells === "Other" ? sellsOther.trim() : sells,
        causes,
        givingModel: giving.trim(),
        evidenceUrl: evidence.trim(),
        name: name.trim(),
        email: email.trim(),
        notes: notes.trim(),
      },
    });
    setPending(false);

    if (result.status === "sent") {
      setSent(true);
      return;
    }
    if (result.status === "unconfigured") {
      setFormError(
        "This form isn't connected to a delivery inbox yet, so your suggestion was not sent. Nothing was stored in this browser.",
      );
      return;
    }
    setFormError(result.message);
  };

  return (
    <EditorialChrome page="suggest">
      <section className="form-hero">
        <div>
          <p className="story-eyebrow">Suggest a brand</p>
          <h1 className="form-hero-title">
            Know a business that belongs here?
          </h1>
          <p className="form-hero-lead">
            Found a company doing something good with the things it sells? Tell
            us about it.
          </p>
          <p>
            We&apos;re always looking for businesses that make everyday
            purchases a little more meaningful.
          </p>
        </div>
        <SuggestionMark />
      </section>

      <section className="form-panel">
        {sent ? (
          <FormBanner tone="success">
            <p>
              Thanks — we received your suggestion. Submitting a business
              doesn&apos;t guarantee inclusion; we still review public
              evidence before anything is added.
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
                  suggestions cannot be sent. Nothing you type is stored in
                  this browser.
                </p>
              </FormBanner>
            ) : null}
            {formError ? (
              <FormBanner tone="error">
                <p>{formError}</p>
              </FormBanner>
            ) : null}

            <FormField
              id="suggest-brand"
              label="Business or brand name"
              required
              error={errors.brand}
            >
              <input
                id="suggest-brand"
                name="brand"
                type="text"
                autoComplete="organization"
                required
                aria-required="true"
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
                aria-invalid={Boolean(errors.brand)}
                aria-describedby={describedByFor("suggest-brand", undefined, errors.brand)}
              />
            </FormField>

            <FormField
              id="suggest-website"
              label="Website"
              required
              error={errors.website}
            >
              <input
                id="suggest-website"
                name="website"
                type="url"
                inputMode="url"
                placeholder="https://"
                required
                aria-required="true"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                aria-invalid={Boolean(errors.website)}
                aria-describedby={describedByFor(
                  "suggest-website",
                  undefined,
                  errors.website,
                )}
              />
            </FormField>

            <FormField
              id="suggest-sells"
              label="What do they sell?"
              required
              error={errors.sells}
            >
              <select
                id="suggest-sells"
                name="sells"
                required
                aria-required="true"
                value={sells}
                onChange={(event) => setSells(event.target.value)}
                aria-invalid={Boolean(errors.sells)}
                aria-describedby={describedByFor("suggest-sells", undefined, errors.sells)}
              >
                <option value="">Choose a category</option>
                {SELL_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </FormField>

            {sells === "Other" ? (
              <FormField
                id="suggest-sells-other"
                label="Describe what they sell"
                required
                error={errors.sellsOther}
              >
                <input
                  id="suggest-sells-other"
                  name="sellsOther"
                  type="text"
                  required
                  aria-required="true"
                  value={sellsOther}
                  onChange={(event) => setSellsOther(event.target.value)}
                  aria-invalid={Boolean(errors.sellsOther)}
                  aria-describedby={describedByFor(
                    "suggest-sells-other",
                    undefined,
                    errors.sellsOther,
                  )}
                />
              </FormField>
            ) : null}

            <fieldset
              className={`site-field${errors.causes ? " site-field-invalid" : ""}`}
              aria-invalid={Boolean(errors.causes)}
              aria-describedby={
                errors.causes ? "suggest-causes-error" : "suggest-causes-hint"
              }
            >
              <legend>
                <span>What cause do they support?</span>
                <span className="site-field-flag">Required</span>
              </legend>
              <p id="suggest-causes-hint" className="site-field-hint">
                Choose every cause that applies.
              </p>
              <ul className="site-check-grid">
                {CAUSE_OPTIONS.map((cause) => {
                  const id = `cause-${cause.replace(/\s+/g, "-").toLowerCase()}`;
                  return (
                    <li key={cause}>
                      <label htmlFor={id} className="site-check">
                        <input
                          id={id}
                          name="causes"
                          type="checkbox"
                          value={cause}
                          checked={causes.includes(cause)}
                          onChange={() => toggleCause(cause)}
                        />
                        <span>{cause}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
              {errors.causes ? (
                <p id="suggest-causes-error" className="site-field-error" role="alert">
                  {errors.causes}
                </p>
              ) : null}
            </fieldset>

            <FormField
              id="suggest-giving"
              label="How does their giving work?"
              required
              hint="Do they donate a percentage of sales, fund a specific organization, operate as a nonprofit, or use another model?"
              error={errors.giving}
            >
              <textarea
                id="suggest-giving"
                name="giving"
                rows={5}
                required
                aria-required="true"
                value={giving}
                onChange={(event) => setGiving(event.target.value)}
                aria-invalid={Boolean(errors.giving)}
                aria-describedby={describedByFor(
                  "suggest-giving",
                  "suggest-giving-hint",
                  errors.giving,
                )}
              />
            </FormField>

            <FormField
              id="suggest-evidence"
              label="Evidence of giving"
              required
              hint="Link to a page explaining or documenting their giving commitment."
              error={errors.evidence}
            >
              <input
                id="suggest-evidence"
                name="evidence"
                type="url"
                inputMode="url"
                placeholder="https://"
                required
                aria-required="true"
                value={evidence}
                onChange={(event) => setEvidence(event.target.value)}
                aria-invalid={Boolean(errors.evidence)}
                aria-describedby={describedByFor(
                  "suggest-evidence",
                  "suggest-evidence-hint",
                  errors.evidence,
                )}
              />
            </FormField>

            <FormField id="suggest-name" label="Your name" error={null}>
              <input
                id="suggest-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </FormField>

            <FormField
              id="suggest-email"
              label="Your email"
              error={errors.email}
            >
              <input
                id="suggest-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={describedByFor(
                  "suggest-email",
                  undefined,
                  errors.email,
                )}
              />
            </FormField>

            <FormField
              id="suggest-notes"
              label="Anything else we should know?"
            >
              <textarea
                id="suggest-notes"
                name="notes"
                rows={4}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
            </FormField>

            <HoneypotField
              id="suggest-fax"
              value={honeypot}
              onChange={setHoneypot}
            />

            <div className="site-form-principles">
              <p>
                Submitting a business doesn&apos;t guarantee inclusion.
              </p>
              <p>
                We review publicly available information and aim to verify
                giving commitments before adding businesses to Elsewhere.
                Suggestions are free. Businesses can&apos;t pay for review or
                placement.
              </p>
            </div>

            <button
              className="story-cta site-form-submit"
              type="submit"
              disabled={pending}
              aria-disabled={pending}
            >
              {pending ? "Sending…" : "Submit suggestion"}
            </button>
          </form>
        )}
      </section>
    </EditorialChrome>
  );
}
