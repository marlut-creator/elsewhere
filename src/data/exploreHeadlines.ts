import {
  browseCategoryHeadlineAccent,
  type BrowseCategorySlug,
} from "./browseCategories";

const CAUSE_SUPPORT_PHRASE: Record<string, string> = {
  Cancer: "cancer causes",
  Homelessness: "people experiencing homelessness",
  "Refugees & Displaced People": "refugees & displaced people",
  "Literacy & Education": "literacy & education",
  "Vision Access": "vision access",
  "Clean Water": "clean water",
  Dogs: "dogs",
  Cats: "cats",
  Oceans: "ocean conservation",
  Pollinators: "pollinators",
  "Forests & Reforestation": "forests & reforestation",
  "Animal Rescue": "animal rescue",
  Hunger: "hunger relief",
  "Mental Health": "mental health",
  "Hygiene Access": "hygiene access",
  Wildlife: "wildlife",
  Rainforests: "rainforest protection",
};

export function causeSupportPhrase(causeFilter: string): string {
  return CAUSE_SUPPORT_PHRASE[causeFilter] ?? causeFilter.toLowerCase();
}

export function emptyStateQueryCauseMessage(
  query: string,
  causeFilter: string,
): string {
  const q = query.trim();
  const support = causeSupportPhrase(causeFilter);
  return `We don't have a verified swap for "${q}" supporting ${support} yet. Try another search or cause.`;
}

export type ExploreHeroContent = {
  eyebrow: string;
  titleLine1: string;
  titleAccent: string | null;
  titlePunctuation: string;
  supportingLine: string | null;
  supportingEyebrow: string | null;
};

export function buildExploreHero(options: {
  submittedQuery: string;
  causeFilter: string | null;
  surpriseMe: boolean;
  categoryFilter: BrowseCategorySlug | null;
}): ExploreHeroContent {
  const q = options.submittedQuery.trim();
  const cause = options.causeFilter;
  const category = options.categoryFilter;

  if (options.surpriseMe) {
    return {
      eyebrow: "Swap what you already buy",
      titleLine1: "Surprise me with a mix of",
      titleAccent: "good swaps.",
      titlePunctuation: "",
      supportingLine: "No cause in mind? There's plenty of good to go around.",
      supportingEyebrow: null,
    };
  }

  if (cause && !q && !category) {
    const support = causeSupportPhrase(cause);
    return {
      eyebrow: "Swap what you already buy",
      titleLine1: "Everyday purchases that",
      titleAccent: `support ${support}.`,
      titlePunctuation: "",
      supportingLine:
        "You're buying it anyway. See where that money could go instead.",
      supportingEyebrow: null,
    };
  }

  if (category && !q) {
    return {
      eyebrow: "Swap what you already buy",
      titleLine1: "Better places to buy",
      titleAccent: browseCategoryHeadlineAccent(category),
      titlePunctuation: "",
      supportingLine:
        "You're buying it anyway. See where that money could go instead.",
      supportingEyebrow: null,
    };
  }

  if (q && cause) {
    const support = causeSupportPhrase(cause);
    return {
      eyebrow: "Swap what you already buy",
      titleLine1: "Better places to buy",
      titleAccent: `${q}.`,
      titlePunctuation: "",
      supportingLine: `Supporting ${support}. See where that money could go instead.`,
      supportingEyebrow: null,
    };
  }

  if (q) {
    return {
      eyebrow: "Swap what you already buy",
      titleLine1: "Better places to buy",
      titleAccent: `${q}.`,
      titlePunctuation: "",
      supportingLine: querySupportingLine(q),
      supportingEyebrow: null,
    };
  }

  return {
    eyebrow: "Swap what you already buy",
    titleLine1: "Better places to buy",
    titleAccent: "everyday goods.",
    titlePunctuation: "",
    supportingLine:
      "You're buying it anyway. See where that money could go instead.",
    supportingEyebrow: null,
  };
}

function querySupportingLine(query: string): string {
  if (/coffee/i.test(query)) {
    return "Your coffee habit already costs something. See where that money could go instead.";
  }
  if (/shampoo|soap|toothpaste/i.test(query)) {
    return "You're already buying it. See where that money could go instead.";
  }
  return "See where that money could go instead.";
}
