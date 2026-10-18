import { FormEvent, Fragment, useEffect, useState } from "react";
import ExploreResultsView from "./components/ExploreResultsView";
import MyElsewhereView from "./components/MyElsewhereView";
import HomePage from "./HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import MissionPage from "./pages/MissionPage";
import ImpactPage from "./pages/ImpactPage";
import HowImpactEstimatesPage from "./pages/HowImpactEstimatesPage";
import HowProductsSelectedPage from "./pages/HowProductsSelectedPage";
import HowWeVerifyPage from "./pages/HowWeVerifyPage";
import SuggestBrandPage from "./pages/SuggestBrandPage";
import SharedCollectionPage from "./pages/SharedCollectionPage";
import NotesPage from "./pages/NotesPage";
import NotFoundPage from "./pages/NotFoundPage";
import type { BrowseCategorySlug } from "./data/browseCategories";
import { discoverProducts, parseBrowseCategoryParam } from "./data/discover";

function ExplorePage() {
  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get("q") ?? "";
  const initialCause = params.get("cause");
  const initialSurprise = params.get("surprise") === "1";
  const initialCategory = parseBrowseCategoryParam(params.get("category"));

  const [query, setQuery] = useState(initialQuery);
  const [submittedQuery, setSubmittedQuery] = useState(initialQuery);
  const [causeFilter, setCauseFilter] = useState<string | null>(initialCause);
  const [categoryFilter, setCategoryFilter] =
    useState<BrowseCategorySlug | null>(initialCategory);
  const [surpriseMe, setSurpriseMe] = useState(initialSurprise);

  const syncExploreUrl = (next: {
    q?: string;
    cause?: string | null;
    category?: BrowseCategorySlug | null;
    surprise?: boolean;
  }) => {
    const urlParams = new URLSearchParams();
    if (next.surprise) {
      urlParams.set("surprise", "1");
    } else {
      if (next.q) urlParams.set("q", next.q);
      if (next.cause) urlParams.set("cause", next.cause);
      if (next.category) urlParams.set("category", next.category);
    }
    const qs = urlParams.toString();
    window.history.replaceState({}, "", qs ? `/explore?${qs}` : "/explore");
  };

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    const nextQuery = query.trim();
    setSubmittedQuery(nextQuery);
    setSurpriseMe(false);
    setCategoryFilter(null);

    syncExploreUrl({
      q: nextQuery || undefined,
      cause: causeFilter,
      category: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const matchingProducts = discoverProducts({
    query: submittedQuery,
    causeFilter,
    surpriseMe,
    categoryFilter,
  });

  return (
    <ExploreResultsView
      query={query}
      submittedQuery={submittedQuery}
      matchingProducts={matchingProducts}
      onQueryChange={setQuery}
      onSubmit={submitSearch}
      causeFilter={causeFilter}
      onCauseFilterChange={setCauseFilter}
      categoryFilter={categoryFilter}
      onCategoryFilterChange={setCategoryFilter}
      surpriseMe={surpriseMe}
      onSurpriseMe={() => {
        setSurpriseMe(true);
        setCauseFilter(null);
        setCategoryFilter(null);
        setSubmittedQuery("");
        setQuery("");
        syncExploreUrl({ surprise: true });
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      onClearSurprise={() => setSurpriseMe(false)}
      onSyncExploreUrl={syncExploreUrl}
    />
  );
}

function documentTitle(path: string) {
  if (path === "/") return "Elsewhere";
  if (path === "/explore") return "Explore — Elsewhere";
  if (path === "/my-elsewhere") return "My Elsewhere — Elsewhere";
  if (path === "/about") return "About — Elsewhere";
  if (path === "/mission") return "Mission — Elsewhere";
  if (path === "/impact") return "Impact — Elsewhere";
  if (path === "/how-we-verify") return "How we verify claims — Elsewhere";
  if (path === "/how-impact-estimates-work") {
    return "How impact estimates work — Elsewhere";
  }
  if (path === "/how-products-are-selected") {
    return "How products are selected — Elsewhere";
  }
  if (path === "/suggest-a-brand") return "Suggest a brand — Elsewhere";
  if (path === "/contact") return "Contact — Elsewhere";
  if (path === "/notes") return "Notes from Elsewhere — Elsewhere";
  if (path.startsWith("/c/")) return "A shared collection — Elsewhere";
  return "Page not found — Elsewhere";
}

function routePage() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return <HomePage />;
  if (path === "/explore") return <ExplorePage />;
  if (path === "/my-elsewhere") return <MyElsewhereView />;
  if (path === "/about") return <AboutPage />;
  if (path === "/mission") return <MissionPage />;
  if (path === "/impact") return <ImpactPage />;
  if (path === "/how-we-verify") return <HowWeVerifyPage />;
  if (path === "/how-impact-estimates-work") return <HowImpactEstimatesPage />;
  if (path === "/how-products-are-selected") return <HowProductsSelectedPage />;
  if (path === "/suggest-a-brand") return <SuggestBrandPage />;
  if (path === "/contact") return <ContactPage />;
  if (path === "/notes") return <NotesPage />;
  if (path.startsWith("/c/")) {
    let encoded = path.slice(3);
    try {
      encoded = decodeURIComponent(encoded);
    } catch {
      encoded = "";
    }
    return <SharedCollectionPage encoded={encoded} />;
  }
  return <NotFoundPage />;
}

export default function App() {
  const [locationKey, setLocationKey] = useState(
    () => window.location.pathname + window.location.search,
  );

  useEffect(() => {
    const onPop = () => {
      setLocationKey(window.location.pathname + window.location.search);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    document.title = documentTitle(path);
  }, [locationKey]);

  return <Fragment key={locationKey}>{routePage()}</Fragment>;
}
