import EditorialChrome from "../components/EditorialChrome";

export default function NotFoundPage() {
  return (
    <EditorialChrome page="home">
      <section className="info-page-content not-found-page">
        <p className="story-eyebrow">Page not found</p>
        <h1>This page isn&apos;t here.</h1>
        <p>
          The address may be mistyped, or the page may have moved. Elsewhere
          didn&apos;t lose your saved products — they stay on this device.
        </p>
        <div className="not-found-actions">
          <a className="story-cta" href="/">
            Home
          </a>
          <a className="story-cta-secondary" href="/explore">
            Explore swaps
          </a>
        </div>
      </section>
    </EditorialChrome>
  );
}
