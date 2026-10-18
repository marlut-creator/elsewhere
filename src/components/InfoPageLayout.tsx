import type { ReactNode } from "react";
import SitePromiseSection from "./SitePromiseSection";
import { SiteFooter, SiteHeader, type SitePage } from "./SiteChrome";

type InfoPageLayoutProps = {
  page: SitePage;
  title: string;
  children: ReactNode;
};

export default function InfoPageLayout({
  page,
  title,
  children,
}: InfoPageLayoutProps) {
  return (
    <main className="info-page">
      <SiteHeader currentPage={page} />
      <article className="info-page-content">
        <h1>{title}</h1>
        {children}
      </article>
      <SitePromiseSection />
      <SiteFooter />
    </main>
  );
}
