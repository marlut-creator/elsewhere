import type { NotePreview } from "../data/notesArticles";

function ToiletPaperMark() {
  return (
    <svg viewBox="0 0 220 180" aria-hidden="true">
      <rect
        x="108"
        y="28"
        width="92"
        height="118"
        rx="10"
        fill="#eeedf8"
        stroke="#321b36"
        strokeWidth="1.8"
      />
      <path
        d="M122 48h64M122 68h48M122 88h56"
        fill="none"
        stroke="#6679cc"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <ellipse
        cx="62"
        cy="52"
        rx="34"
        ry="18"
        fill="#f7f3e8"
        stroke="#321b36"
        strokeWidth="1.8"
      />
      <path
        d="M28 52v78c0 12 15 22 34 22s34-10 34-22V52"
        fill="#eeedf8"
        stroke="#321b36"
        strokeWidth="1.8"
      />
      <ellipse cx="62" cy="52" rx="10" ry="5" fill="#9faee8" />
    </svg>
  );
}

function PercentMark() {
  return (
    <svg viewBox="0 0 220 180" aria-hidden="true">
      <circle
        cx="110"
        cy="92"
        r="62"
        fill="#eeedf8"
        stroke="#f7f3e8"
        strokeWidth="1.8"
      />
      <path d="M110 92 110 30 A62 62 0 0 1 154 48 Z" fill="#9faee8" />
      <circle cx="110" cy="92" r="18" fill="#321b36" />
      <text
        x="110"
        y="98"
        textAnchor="middle"
        fill="#f7f3e8"
        fontFamily="Dosis, sans-serif"
        fontSize="16"
        fontWeight="600"
      >
        10%
      </text>
    </svg>
  );
}

export default function ArticleCard({ article }: { article: NotePreview }) {
  const feature = article.layout === "feature";

  return (
    <article
      className={`notes-card notes-card-${article.tone}${feature ? " notes-card-feature" : ""}`}
    >
      <div className="notes-card-media" aria-hidden={article.visual.kind === "illustration"}>
        {article.visual.kind === "photo" ? (
          <figure>
            <img
              src={article.visual.src}
              alt={article.visual.alt}
              width={1152}
              height={864}
            />
            <figcaption>{article.visual.note}</figcaption>
          </figure>
        ) : article.visual.name === "toilet-paper" ? (
          <ToiletPaperMark />
        ) : (
          <PercentMark />
        )}
      </div>
      <div className="notes-card-copy">
        <p className="notes-card-status">Coming soon</p>
        <h3 className="notes-card-title">{article.title}</h3>
        <p className="notes-card-dek">{article.dek}</p>
      </div>
    </article>
  );
}
