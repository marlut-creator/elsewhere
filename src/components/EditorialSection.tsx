import type { ReactNode } from "react";

export default function EditorialSection({
  id,
  eyebrow,
  title,
  lead,
  tone = "ivory",
  children,
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  lead?: ReactNode;
  tone?: "ivory" | "wash" | "plum";
  children?: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`notes-section notes-section-${tone}`}
    >
      {eyebrow || title || lead ? (
        <header className="notes-section-head">
          {eyebrow ? <p className="story-eyebrow">{eyebrow}</p> : null}
          {title ? <h2 className="notes-section-title">{title}</h2> : null}
          {lead ? <div className="notes-section-lead">{lead}</div> : null}
        </header>
      ) : null}
      {children}
    </section>
  );
}
