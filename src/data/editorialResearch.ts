/**
 * Homepage “money goes further” stories.
 * Figures stay here so the section cannot drift from its sources.
 */

export type BrandGroup = {
  parent: string;
  brands: string[];
  sourceUrl: string;
};

export type YearAmount = {
  year: string;
  amount: string;
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
      "Crest",
      "Gillette",
      "Pampers",
      "Olay",
      "Head & Shoulders",
      "Dawn",
      "Bounty",
    ],
    sourceUrl: "https://us.pg.com/brands/",
  },
  {
    parent: "Unilever",
    brands: ["Dove", "Hellmann's", "Knorr", "Vaseline", "Axe"],
    sourceUrl: "https://www.unilever.com/brands/all-brands/",
  },
  {
    parent: "Nestlé",
    brands: ["Nescafé", "KitKat", "Purina", "Gerber", "Nespresso", "Stouffer's"],
    sourceUrl: "https://www.nestle.com/brands/brandssearchlist",
  },
  {
    parent: "PepsiCo",
    brands: ["Pepsi", "Lay's", "Gatorade", "Doritos", "Quaker", "Cheetos", "Tostitos"],
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
    label: "Tide and Gain dollar share",
    explanation:
      "Circana OmniMarket figures reported by Happi put Tide and Gain, both P&G brands, at more than 55% of U.S. liquid laundry detergent dollar sales in the 52 weeks ended November 3, 2024. Two labels, one parent, more than half the category money.",
    reportingPeriod: "52 weeks ended November 3, 2024",
    sourceName: "Happi, citing Circana OmniMarket",
    sourceTitle: "Convenience & Sustainability",
    sourceUrl: "https://www.happi.com/convenience-sustainability/",
  },
  {
    id: "bombas-donations",
    kicker: "Company-reported giving",
    statistic: "200M+",
    label: "Items Bombas says it has donated",
    explanation:
      "Bombas publishes a running total of clothing items donated through its purchase-one-give-one model. The company headlines more than 200 million items; its public counter listed 204,002,196 as of February 28, 2026. That is Bombas's record, not an Elsewhere result.",
    reportingPeriod: "As of February 28, 2026",
    sourceName: "Bombas",
    sourceTitle: "Bee Better impact counter",
    sourceUrl: "https://beebetter.bombas.com/impact",
  },
  {
    id: "bwb-books",
    kicker: "Company-reported giving",
    statistic: "38M+",
    label: "Books Better World Books says it has donated",
    explanation:
      "Better World Books reports donating more than 38 million books and generating more than $35 million for literacy programs. The figures describe that company's published outcomes, not purchases made through this site.",
    reportingPeriod: "Company mission page, reviewed 2026-10-17",
    sourceName: "Better World Books",
    sourceTitle: "Our Mission",
    sourceUrl: "https://www.betterworldbooks.com/go/mission",
  },
];

/** OpenSecrets published table, rounded in their 2024 news analysis to $4.4B. */
export const LOBBYING_YEARS: YearAmount[] = [
  { year: "2022", amount: "$4.11B" },
  { year: "2023", amount: "$4.27B" },
  { year: "2024", amount: "$4.45B" },
];

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
    statistic: "$4.4B",
    headline: "The price of influence.",
    paragraphs: [
      "In 2024, corporations, trade associations, unions, and other organizations spent approximately $4.4 billion on federal lobbying in the United States.",
      "Lobbying is paid advocacy about laws and rules. It is not campaign contributions, and the total does not show that any one bill passed because of it.",
    ],
    reportingPeriod: "Calendar year 2024",
    sourceName: "OpenSecrets",
    sourceTitle: "Federal lobbying set a new record in 2024",
    sourceUrl:
      "https://www.opensecrets.org/news/2025/02/federal-lobbying-set-new-record-in-2024/",
    methodologyNote:
      "OpenSecrets’ February 2025 analysis describes a record $4.4 billion for 2024, summed from quarterly LD-2 lobbying disclosures. Their detailed table lists $4.45 billion for 2024, $4.27 billion for 2023, and $4.11 billion for 2022. The figure covers all filing organizations, not corporations alone.",
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
