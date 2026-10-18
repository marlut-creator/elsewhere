import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import elsewhereLogo from "../assets/elsewhere-logo.png";
import type { BrowseCategorySlug } from "../data/browseCategories";
import { NAV_CAUSE_LINKS, NAV_EXPLORE_LINKS } from "../data/navExploreLinks";
import { MEGA_MENU_CATEGORIES, SHOP_CATEGORIES } from "../data/shopCategories";
import { CategoryIcon } from "./CategoryIcons";
import { CauseGroupIcon } from "./CauseIcons";
import type { CauseGroup } from "../data/causeTaxonomy";
import { exploreCauseHref, orderedShopCauseGroups } from "../data/shopCauses";
import MyElsewhereExampleDashboard from "./MyElsewhereExampleDashboard";
import ShelfIcon from "./ShelfIcon";

export type SitePage =
  | "home"
  | "explore"
  | "my-elsewhere"
  | "about"
  | "mission"
  | "impact"
  | "notes"
  | "contact"
  | "suggest";

type ChromeProps = {
  onGoHome?: () => void;
  currentPage?: SitePage;
};

function LogoLink({ onGoHome, footer = false }: ChromeProps & { footer?: boolean }) {
  if (footer) {
    return (
      <a className="logo-footer-mark" href="/" aria-label="Elsewhere home">
        <span className="logo-footer-text">elsewhere</span>
      </a>
    );
  }
  return (
    <a
      className="logo"
      href="/"
      aria-label="Elsewhere home"
      onClick={(event) => {
        if (onGoHome) {
          event.preventDefault();
          onGoHome();
        }
      }}
    >
      <img src={elsewhereLogo} alt="" />
    </a>
  );
}

export function SiteAnnouncementStrip() {
  return (
    <a className="site-announcement" href="/explore">
      Same purchase. Better place.{" "}
      <span className="site-announcement-action">Explore the swaps →</span>
    </a>
  );
}

function MegaPanel({
  id,
  label,
  open,
  current = false,
  onOpen,
  onClose,
  children,
  layout = "default",
}: {
  id: string;
  label: string;
  open: boolean;
  current?: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: ReactNode;
  layout?: "explore" | "impact" | "about" | "default";
}) {
  const panelId = useId();
  const closeTimerRef = useRef<number | null>(null);

  const cancelClose = () => {
    if (closeTimerRef.current != null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = window.setTimeout(onClose, 160);
  };

  const handleOpen = () => {
    cancelClose();
    onOpen();
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(
    () => () => {
      cancelClose();
    },
    [],
  );

  return (
    <div
      className={`mega-nav-item${open ? " mega-nav-item-open" : ""}`}
      onMouseEnter={handleOpen}
      onMouseLeave={scheduleClose}
      onFocus={handleOpen}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          scheduleClose();
        }
      }}
    >
      <button
        type="button"
        className={`mega-nav-trigger${current ? " mega-nav-trigger-current" : ""}`}
        aria-expanded={open}
        aria-controls={panelId}
        aria-current={current ? "true" : undefined}
        id={id}
        onClick={() => (open ? onClose() : handleOpen())}
      >
        {label}
      </button>
      {open ? (
        <div
          id={panelId}
          className={`mega-nav-panel${layout !== "default" ? ` mega-nav-panel--${layout}` : ""}`}
          role="region"
          aria-labelledby={id}
          onMouseEnter={handleOpen}
          onMouseLeave={scheduleClose}
        >
          <div className="mega-nav-panel-surface mega-nav-panel-surface--dropdown">
            {children}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ExploreMegaMenu({ current = false }: { current?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <MegaPanel
      id="nav-explore"
      label="Explore"
      layout="explore"
      current={current}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      <div className="mega-panel-grid mega-panel-explore">
        <div className="mega-panel-links mega-panel-links-explore">
          <p className="mega-panel-heading">Shop by category</p>
          <ul className="mega-category-list">
            {SHOP_CATEGORIES.filter((c) => c.slug === "everyday").map((cat) => (
              <li key={cat.href}>
                <a href={cat.href} className="mega-category-link">
                  <CategoryIcon slug={cat.slug} className="mega-category-icon" />
                  {cat.label}
                </a>
              </li>
            ))}
            {MEGA_MENU_CATEGORIES.map((cat) => (
              <li key={cat.href}>
                <a href={cat.href} className="mega-category-link">
                  <CategoryIcon
                    slug={cat.slug as BrowseCategorySlug}
                    className="mega-category-icon"
                  />
                  {cat.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mega-surprise-link">
            <a href="/explore?surprise=1">
              <span aria-hidden="true">✦</span> Surprise me
            </a>
          </p>
        </div>
        <div className="mega-panel-links mega-panel-links-causes">
          <p className="mega-panel-heading">Shop by cause</p>
          <ul className="mega-category-list">
            {orderedShopCauseGroups().map((group) => (
              <li key={group}>
                <a
                  href={exploreCauseHref(group)}
                  className="mega-category-link"
                >
                  <CauseGroupIcon
                    group={group as CauseGroup}
                    className="mega-category-icon"
                  />
                  {group}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mega-panel-visuals mega-panel-visuals-explore">
          <div className="mega-editorial-panel">
            <p className="mega-panel-heading">Everyday purchases</p>
            <p className="mega-editorial-title">Things you buy on repeat</p>
            <p className="mega-editorial-caption">
              Coffee, soap, pet treats — ordinary recurring buys. Compare
              sellers by price, cause, and verified giving, then buy directly
              from the business.
            </p>
          </div>
        </div>
      </div>
    </MegaPanel>
  );
}

function ImpactMegaMenu({ current = false }: { current?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <MegaPanel
      id="nav-impact"
      label="Impact"
      layout="impact"
      current={current}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      <div className="mega-panel-grid mega-panel-impact">
        <div className="mega-panel-links">
          <p className="mega-panel-heading">The bigger picture</p>
          <ul>
            <li>
              <a href="/impact">Why impact matters</a>
            </li>
          </ul>
          <p className="mega-panel-heading">Your impact</p>
          <ul>
            <li>
              <a href="/my-elsewhere">My Elsewhere</a>
            </li>
            <li>
              <a href="/how-impact-estimates-work">How impact estimates work</a>
            </li>
            <li>
              <a href="/how-we-verify">How we verify claims</a>
            </li>
            <li>
              <a href="/how-products-are-selected">How products are selected</a>
            </li>
          </ul>
        </div>
        <div className="mega-panel-visuals mega-panel-visuals-compact">
          <div className="mega-impact-preview">
            <MyElsewhereExampleDashboard variant="mini" />
          </div>
        </div>
      </div>
    </MegaPanel>
  );
}

function AboutMegaMenu({ current = false }: { current?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <MegaPanel
      id="nav-about"
      label="About"
      layout="about"
      current={current}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      <div className="mega-panel-grid mega-panel-about mega-panel-about-grid">
        <div className="mega-panel-links">
          <p className="mega-panel-heading">Elsewhere</p>
          <ul>
            <li>
              <a href="/about">About Elsewhere</a>
            </li>
            <li>
              <a href="/mission">Our mission</a>
            </li>
            <li>
              <a href="/#how-it-works">How it works</a>
            </li>
            <li>
              <a href="/suggest-a-brand">Suggest a brand</a>
            </li>
            <li>
              <a href="/notes">Notes from Elsewhere</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className="mega-panel-visuals mega-panel-visuals-about">
          <div className="mega-about-copy-panel">
            <p className="mega-panel-heading">Why Elsewhere exists</p>
            <p className="mega-about-quote">&ldquo;You&apos;re buying it anyway.&rdquo;</p>
            <p className="mega-about-body">
              Elsewhere helps ordinary purchases support businesses doing
              something useful with the money.
            </p>
          </div>
        </div>
      </div>
    </MegaPanel>
  );
}

export function SiteHeader({ onGoHome, currentPage }: ChromeProps = {}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <div className="site-header-wrap" ref={wrapRef}>
      <SiteAnnouncementStrip />
      <header className="site-header site-header-editorial">
        <div className="site-header-left">
          <LogoLink onGoHome={onGoHome} />
        </div>

        <nav className="site-header-center mega-nav-desktop" aria-label="Sections">
          <ExploreMegaMenu current={currentPage === "explore"} />
          <a
            className={`mega-nav-trigger mega-nav-link${currentPage === "mission" ? " mega-nav-trigger-current" : ""}`}
            href="/mission"
            {...(currentPage === "mission" ? { "aria-current": "page" as const } : {})}
          >
            Mission
          </a>
          <ImpactMegaMenu current={currentPage === "impact"} />
          <AboutMegaMenu
            current={
              currentPage === "about" ||
              currentPage === "notes" ||
              currentPage === "contact" ||
              currentPage === "suggest"
            }
          />
        </nav>

        <div className="site-header-right">
          <a
            className="header-utility-link header-my-link"
            href="/my-elsewhere"
            {...(currentPage === "my-elsewhere"
              ? { "aria-current": "page" }
              : {})}
          >
            <ShelfIcon />
            My Elsewhere
          </a>
          <button
            type="button"
            className="site-mobile-menu-btn"
            aria-expanded={mobileOpen}
            aria-controls="site-mobile-nav"
            onClick={() => setMobileOpen((open) => !open)}
          >
            Menu
          </button>
        </div>
      </header>

      {mobileOpen ? (
        <nav id="site-mobile-nav" className="site-mobile-nav" aria-label="Mobile">
          <a href="/explore" {...pageCurrent(currentPage, "explore")}>
            Explore
          </a>
          {NAV_EXPLORE_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="site-mobile-nav-sub">
              {link.label}
            </a>
          ))}
          <span className="site-mobile-nav-label">Shop by cause</span>
          {NAV_CAUSE_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="site-mobile-nav-sub">
              {link.label}
            </a>
          ))}
          <a href="/mission" {...pageCurrent(currentPage, "mission")}>
            Mission
          </a>
          <a href="/impact" {...pageCurrent(currentPage, "impact")}>
            Impact
          </a>
          <a href="/about" {...pageCurrent(currentPage, "about")}>
            About
          </a>
          <a href="/my-elsewhere" {...pageCurrent(currentPage, "my-elsewhere")}>
            My Elsewhere
          </a>
          <span className="site-mobile-nav-label">More</span>
          <a href="/notes" {...pageCurrent(currentPage, "notes")}>
            Notes from Elsewhere
          </a>
          <a href="/suggest-a-brand" {...pageCurrent(currentPage, "suggest")}>
            Suggest a brand
          </a>
          <a href="/contact" {...pageCurrent(currentPage, "contact")}>
            Contact
          </a>
          <span className="site-mobile-nav-label">Transparency</span>
          <a href="/how-we-verify">How we verify claims</a>
          <a href="/how-impact-estimates-work">How impact estimates work</a>
          <a href="/how-products-are-selected">How products are selected</a>
          <a href="/#how-it-works">How it works</a>
        </nav>
      ) : null}
    </div>
  );
}

function pageCurrent(currentPage: SitePage | undefined, page: SitePage) {
  return currentPage === page ? { "aria-current": "page" as const } : {};
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <a href={href}>{children}</a>
    </li>
  );
}

export function SiteFooter({ onGoHome }: ChromeProps = {}) {
  return (
    <footer className="site-footer-rich site-footer-compact">
      <div className="site-footer-grid">
        <div className="site-footer-brand">
          <LogoLink onGoHome={onGoHome} footer />
          <p className="site-footer-tagline">
            Don&apos;t buy more. Buy differently.
          </p>
          <p className="site-footer-independence">
            No ads. No sponsors. No commissions. Ever.
          </p>
        </div>

        <div className="site-footer-col">
          <p className="site-footer-col-title">Discover</p>
          <ul>
            <FooterLink href="/explore">Explore</FooterLink>
            <FooterLink href="/my-elsewhere">My Elsewhere</FooterLink>
            <FooterLink href="/suggest-a-brand">Suggest a Brand</FooterLink>
          </ul>
        </div>

        <div className="site-footer-col">
          <p className="site-footer-col-title">About</p>
          <ul>
            <FooterLink href="/mission">Our Mission</FooterLink>
            <FooterLink href="/impact">Our Impact</FooterLink>
            <FooterLink href="/about">Meet the Founder</FooterLink>
            <FooterLink href="/notes">Notes from Elsewhere</FooterLink>
          </ul>
        </div>

        <div className="site-footer-col">
          <p className="site-footer-col-title">Transparency</p>
          <ul>
            <FooterLink href="/how-we-verify">How We Verify Claims</FooterLink>
            <FooterLink href="/how-impact-estimates-work">
              How Impact Estimates Work
            </FooterLink>
            <FooterLink href="/how-products-are-selected">
              How Products Are Selected
            </FooterLink>
          </ul>
        </div>

        <div className="site-footer-col">
          <p className="site-footer-col-title">Contact</p>
          <ul>
            <FooterLink href="/contact">Contact</FooterLink>
          </ul>
          <p className="site-footer-newsletter-static">
            Occasional good finds.
            <a href="/notes#newsletter">Newsletter coming soon.</a>
          </p>
        </div>
      </div>

      <div className="site-footer-legal">
        <span>© 2026 Elsewhere</span>
        <span>No ads. No sponsors. No commissions. Ever.</span>
        <span className="site-footer-legal-muted">Privacy — coming soon</span>
        <span className="site-footer-legal-muted">Terms — coming soon</span>
      </div>
    </footer>
  );
}
