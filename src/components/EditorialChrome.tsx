import type { ReactNode } from "react";
import SitePromiseSection from "./SitePromiseSection";
import { SiteFooter, SiteHeader, type SitePage } from "./SiteChrome";

export default function EditorialChrome({
  page,
  children,
}: {
  page: SitePage;
  children: ReactNode;
}) {
  return (
    <main className="editorial-page">
      <SiteHeader currentPage={page} />
      {children}
      <SitePromiseSection />
      <SiteFooter />
    </main>
  );
}
