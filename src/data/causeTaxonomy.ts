/** Organizational parent groups → specific cause tags users can select directly. */
export const CAUSE_TAXONOMY: Record<string, readonly string[]> = {
  Animals: ["Dogs", "Cats", "Animal Rescue", "Wildlife"],
  Environment: [
    "Oceans",
    "Forests & Reforestation",
    "Rainforests",
    "Pollinators",
  ],
  Health: ["Cancer", "Mental Health"],
  People: ["Homelessness", "Hunger", "Refugees & Displaced People"],
  "Basic Needs": ["Clean Water", "Hygiene Access", "Vision Access"],
  Opportunity: ["Literacy & Education"],
} as const;

export type CauseTag = (typeof CAUSE_TAXONOMY)[keyof typeof CAUSE_TAXONOMY][number];
export type CauseGroup = keyof typeof CAUSE_TAXONOMY;

export const ALL_CAUSE_TAGS: string[] = Object.values(CAUSE_TAXONOMY).flat();

export const PROMINENT_CAUSE_TAGS: readonly string[] = [
  "Dogs",
  "Cats",
  "Oceans",
  "Cancer",
  "Clean Water",
  "Pollinators",
  "Homelessness",
  "Hunger",
  "Forests & Reforestation",
  "Literacy & Education",
];

const TAG_TO_GROUP = new Map<string, CauseGroup>();
for (const [group, tags] of Object.entries(CAUSE_TAXONOMY)) {
  for (const tag of tags) {
    TAG_TO_GROUP.set(tag, group as CauseGroup);
  }
}

export function isCauseGroup(value: string): value is CauseGroup {
  return value in CAUSE_TAXONOMY;
}

export function tagsForCauseSelection(selection: string): string[] {
  if (isCauseGroup(selection)) {
    return [...CAUSE_TAXONOMY[selection]];
  }
  return [selection];
}

export function productMatchesCauseSelection(
  causeTags: string[],
  selection: string | null,
): boolean {
  if (!selection) return true;
  const matchTags = tagsForCauseSelection(selection);
  return causeTags.some((tag) => matchTags.includes(tag));
}

export function primaryCauseFamily(causeTags: string[]): CauseGroup | null {
  const first = causeTags[0];
  if (!first) return null;
  return TAG_TO_GROUP.get(first) ?? null;
}
