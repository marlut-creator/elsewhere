import ArticleCard from "../components/ArticleCard";
import EditorialChrome from "../components/EditorialChrome";
import EditorialSection from "../components/EditorialSection";
import NewsletterSignup from "../components/NewsletterSignup";
import { NOTES_PREVIEWS } from "../data/notesArticles";

function NotesHeroMark() {
  return (
    <figure className="notes-hero-mark" aria-hidden="true">
      <svg viewBox="0 0 240 200">
        <rect
          x="38"
          y="28"
          width="150"
          height="148"
          rx="8"
          fill="#eeedf8"
          stroke="#321b36"
          strokeWidth="1.8"
        />
        <rect
          x="52"
          y="18"
          width="150"
          height="148"
          rx="8"
          fill="#f7f3e8"
          stroke="#321b36"
          strokeWidth="1.8"
        />
        <path
          d="M72 52h110M72 74h88M72 96h102M72 118h64"
          fill="none"
          stroke="#6679cc"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="188" cy="36" r="22" fill="#9faee8" stroke="#321b36" strokeWidth="1.8" />
      </svg>
      <figcaption>A stack of notes, still being written.</figcaption>
    </figure>
  );
}

export default function NotesPage() {
  const featured = NOTES_PREVIEWS.filter((item) => item.layout === "feature");
  const rest = NOTES_PREVIEWS.filter((item) => item.layout !== "feature");

  return (
    <EditorialChrome page="notes">
      <section className="notes-hero">
        <div>
          <p className="story-eyebrow">An editorial notebook</p>
          <h1 className="notes-hero-title">Notes from Elsewhere.</h1>
          <p className="notes-hero-lead">
            Good businesses, questionable corporate behavior, and a few reasons
            to feel hopeful about where the world is going.
          </p>
          <p className="notes-hero-support">
            This is where we&apos;ll write when there&apos;s something worth
            saying — not a feed, not a press room.
          </p>
        </div>
        <NotesHeroMark />
      </section>

      <EditorialSection
        eyebrow="The notebook"
        title="Coming soon"
        lead={
          <p>
            Four notes we&apos;re working on. None of them are published yet,
            so there&apos;s nothing to open — just a sense of what this page is
            for.
          </p>
        }
      >
        <div className="notes-grid">
          {featured.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
          {rest.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </EditorialSection>

      <EditorialSection
        id="newsletter"
        tone="plum"
        eyebrow="The letter"
        title="Good things, occasionally."
        lead={
          <>
            <p>
              Interesting businesses, questionable corporate behavior, and a
              few reasons to feel hopeful about where the world is going.
            </p>
            <p>
              When it exists, the letter is meant for new mission-driven
              businesses, interesting giving models, corporate accountability
              stories, Elsewhere updates, and the occasional personal note
              from the founder. No set cadence. No ads.
            </p>
          </>
        }
      >
        <NewsletterSignup />
      </EditorialSection>
    </EditorialChrome>
  );
}
