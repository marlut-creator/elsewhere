import type { ReactNode } from "react";

export function FormField({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string | null;
  children: ReactNode;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={`site-field${error ? " site-field-invalid" : ""}`}>
      <label htmlFor={id}>
        <span>{label}</span>
        {required ? (
          <span className="site-field-flag">Required</span>
        ) : (
          <span className="site-field-flag site-field-flag-opt">Optional</span>
        )}
      </label>
      {hint ? (
        <p id={hintId} className="site-field-hint">
          {hint}
        </p>
      ) : null}
      <div className="site-field-control" data-describedby={describedBy}>
        {children}
      </div>
      {error ? (
        <p id={errorId} className="site-field-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function describedByFor(id: string, hint?: string, error?: string | null) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
    .filter(Boolean)
    .join(" ") || undefined;
}

export function FormBanner({
  tone,
  children,
}: {
  tone: "note" | "error" | "success";
  children: ReactNode;
}) {
  return (
    <div
      className={`site-form-banner site-form-banner-${tone}`}
      role={tone === "error" ? "alert" : "status"}
    >
      {children}
    </div>
  );
}

export function HoneypotField({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="site-honeypot" aria-hidden="true">
      <label htmlFor={id}>Company fax</label>
      <input
        id={id}
        name="company_fax"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
