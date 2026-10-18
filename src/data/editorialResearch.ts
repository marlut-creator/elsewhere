/**
 * Homepage “money goes further” stories.
 * Figures stay here so the section cannot drift from its sources.
 */

export type BrandGroup = {
  parent: string;
  brands: string[];
  sourceUrl: string;
};

export type FinancialStory = {
  id: string;
  step: string;
  statistic: string;
  headline: string;
  paragraphs: string[];
  reportingPeriod: string;
  sourceName: string;
  sourceTitle: string;
  sourceUrl: string;
  methodologyNote: string;
  lastVerifiedAt: string;
  visual: "shareholder" | "ownership" | "lobbying";
};

export const BRAND_GROUPS: BrandGroup[] = [
  {
    parent: "Procter & Gamble",
    brands: ["Tide", "Crest", "Gillette"],
    sourceUrl: "https://us.pg.com/brands/",
  },
  {
    parent: "Unilever",
    brands: ["Dove", "Hellmann's", "Knorr"],
    sourceUrl: "https://www.unilever.com/brands/all-brands/",
  },
  {
    parent: "Nestlé",
    brands: ["Nescafé", "KitKat", "Purina"],
    sourceUrl: "https://www.nestle.com/brands",
  },
  {
    parent: "PepsiCo",
    brands: ["Pepsi", "Lay's", "Gatorade"],
    sourceUrl: "https://www.pepsico.com/our-brands",
  },
];

/**
 * Impact-page ownership sample. Kept separate from BRAND_GROUPS so the
 * homepage visual does not change when this list expands.
 * Brands are named on the linked official directories as of 2026-10-17.
 * Ben & Jerry's is omitted: it is no longer a Unilever subsidiary after the
 * 2025 ice-cream demerger.
 */
export const IMPACT_BRAND_GROUPS: BrandGroup[] = [
  {
    parent: "Procter & Gamble",
    brands: [
      "Tide",
      "Gain",
      "Crest",
      "Oral-B",
      "Gillette",
      "Pampers",
      "Olay",
      "Head & Shoulders",
      "Pantene",
      "Dawn",
      "Cascade",
      "Bounty",
      "Charmin",
      "Always",
      "Old Spice",
      "Febreze",
    ],
    sourceUrl: "https://us.pg.com/brands/",
  },
  {
    parent: "Unilever",
    brands: [
      "Dove",
      "Hellmann's",
      "Knorr",
      "Vaseline",
      "Axe",
      "Degree",
      "Suave",
      "TRESemmé",
      "Seventh Generation",
      "SheaMoisture",
      "Pond's",
    ],
    sourceUrl: "https://www.unilever.com/brands/all-brands/",
  },
  {
    parent: "Nestlé",
    brands: [
      "Nescafé",
      "Nespresso",
      "KitKat",
      "Purina",
      "Gerber",
      "Stouffer's",
      "Coffee-mate",
      "Lean Cuisine",
      "DiGiorno",
      "Toll House",
      "Maggi",
      "Carnation",
    ],
    sourceUrl: "https://www.nestle.com/brands/brandssearchlist",
  },
  {
    parent: "PepsiCo",
    brands: [
      "Pepsi",
      "Mountain Dew",
      "Gatorade",
      "Lay's",
      "Doritos",
      "Cheetos",
      "Tostitos",
      "Fritos",
      "Ruffles",
      "Quaker",
      "Cap'n Crunch",
    ],
    sourceUrl: "https://www.pepsico.com/brands",
  },
];

export type ImpactEvidenceStat = {
  id: string;
  kicker: string;
  statistic: string;
  label: string;
  explanation: string;
  reportingPeriod: string;
  sourceName: string;
  sourceTitle: string;
  sourceUrl: string;
};

export const IMPACT_EVIDENCE: ImpactEvidenceStat[] = [
  {
    id: "laundry-concentration",
    kicker: "U.S. liquid laundry detergent",
    statistic: "55%+",
    label: "Tide and Gain dollar share, both P&G",
    explanation:
      "Circana OmniMarket figures reported by Happi put Tide and Gain, both Procter & Gamble brands, at more than 55% of U.S. liquid laundry detergent dollar sales in the 52 weeks ended November 3, 2024. That is dollar share, not unit share: more than half the category money, two labels, one parent.",
    reportingPeriod: "52 weeks ended November 3, 2024",
    sourceName: "Happi, citing Circana OmniMarket",
    sourceTitle: "Convenience & Sustainability",
    sourceUrl: "https://www.happi.com/convenience-sustainability/",
  },
];

export type CpgLobbyingRow = {
  parent: string;
  amount: number;
  sourceUrl: string;
};

/** 2024 OpenSecrets parent-client totals for a selected set of grocery and household companies. Not a ranking. */
export const CPG_LOBBYING_2024: CpgLobbyingRow[] = [
  {
    parent: "Coca-Cola",
    amount: 4_930_000,
    sourceUrl:
      "https://www.opensecrets.org/federal-lobbying/clients/summary?cycle=2024&id=D000000212",
  },
  {
    parent: "PepsiCo",
    amount: 3_920_000,
    sourceUrl: "https://www.opensecrets.org/orgs/pepsico-inc/summary?cycle=A&id=D000000200",
  },
  {
    parent: "Procter & Gamble",
    amount: 2_790_000,
    sourceUrl: "https://www.opensecrets.org/orgs/summary?id=D000000485",
  },
  {
    parent: "Mars",
    amount: 2_000_000,
    sourceUrl: "https://www.opensecrets.org/orgs/summary?cycle=A&id=D000042123",
  },
  {
    parent: "General Mills",
    amount: 1_270_000,
    sourceUrl:
      "https://www.opensecrets.org/federal-lobbying/industries/summary?cycle=2024&id=A09",
  },
  {
    parent: "Kellanova",
    amount: 1_070_000,
    sourceUrl:
      "https://www.opensecrets.org/federal-lobbying/industries/summary?cycle=2024&id=A09",
  },
  {
    parent: "Nestlé",
    amount: 1_014_763,
    sourceUrl:
      "https://www.opensecrets.org/federal-lobbying/industries/summary?cycle=2024&id=A09",
  },
  {
    parent: "Kraft Heinz",
    amount: 880_000,
    sourceUrl: "https://www.opensecrets.org/orgs/kraft-heinz-co/summary?id=D000067808",
  },
  {
    parent: "Mondelez",
    amount: 850_000,
    sourceUrl:
      "https://www.opensecrets.org/federal-lobbying/industries/summary?cycle=2024&id=A09",
  },
  {
    parent: "Unilever",
    amount: 765_000,
    sourceUrl:
      "https://www.opensecrets.org/federal-lobbying/clients/summary?cycle=2024&id=D000030608",
  },
];

export const CPG_LOBBYING_TOTAL_2024 = CPG_LOBBYING_2024.reduce(
  (sum, row) => sum + row.amount,
  0,
);

export const FINANCIAL_STORIES: FinancialStory[] = [
  {
    id: "shareholder-returns",
    step: "01 / 03",
    statistic: "$16B+",
    headline: "Back to shareholders.",
    paragraphs: [
      "In fiscal 2025, Procter & Gamble returned more than $16 billion to shareholders through dividends and share repurchases.",
      "It’s one example of how a major consumer-products company uses cash. That total is money paid to shareholders — not the company’s profit, and not a claim that every dollar at the register went there.",
    ],
    reportingPeriod: "Fiscal 2025",
    sourceName: "Procter & Gamble",
    sourceTitle: "2025 annual report",
    sourceUrl: "https://us.pg.com/annualreport2025/introduction-and-fy-results/",
    methodologyNote:
      "Company-reported cash returned in the year ended June 30, 2025: about $9.9 billion in dividends and $6.5 billion in share repurchases.",
    lastVerifiedAt: "2026-10-17",
    visual: "shareholder",
  },
  {
    id: "brand-ownership",
    step: "02 / 03",
    statistic: "",
    headline: "Different labels. Same owners.",
    paragraphs: [
      "A different label does not always mean a different company receives the sale.",
      "These are a few familiar names from each company’s own brand list — not a market-share study, and not a claim about how many brands exist.",
    ],
    reportingPeriod: "Official brand directories",
    sourceName: "Company brand pages",
    sourceTitle: "P&G, Unilever, Nestlé, and PepsiCo",
    sourceUrl: "https://us.pg.com/brands/",
    methodologyNote:
      "Each brand below is named on that parent’s public brand directory. This is a sample, not a complete portfolio and not a concentration percentage.",
    lastVerifiedAt: "2026-10-17",
    visual: "ownership",
  },
  {
    id: "lobbying",
    step: "03 / 03",
    statistic: "$19.5M",
    headline: "Paid advocacy from the aisle.",
    paragraphs: [
      "In 2024, ten grocery and household parent companies reported about $19.5 million in U.S. federal lobbying, according to OpenSecrets parent-client totals.",
      "Lobbying is paid advocacy about laws and rules. It is not campaign money, and the total is a selected set of companies, not every filer in Washington.",
    ],
    reportingPeriod: "Calendar year 2024",
    sourceName: "OpenSecrets",
    sourceTitle: "Parent-company lobbying profiles",
    sourceUrl: "https://www.opensecrets.org/federal-lobbying",
    methodologyNote:
      "Sum of 2024 OpenSecrets parent-client totals for Coca-Cola, PepsiCo, Procter & Gamble, Mars, General Mills, Kellanova, Nestlé, Kraft Heinz, Mondelez, and Unilever (including Unilever US). This is a selected set, not a ranking, and not the all-filer $4.45 billion figure.",
    lastVerifiedAt: "2026-10-17",
    visual: "lobbying",
  },
];

export const FINANCIAL_STORY_CLOSING = {
  copy: "You can't decide what a company does with money, but you can decide which company gets yours",
  aside:
    "You don't have to buy more to make a difference. Sometimes you just have to buy from someone different.",
  ctaLabel: "Explore better places",
  ctaHref: "/explore",
};
