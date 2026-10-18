import { EDITORIAL_ASSETS } from "./editorialAssets";

export type NotePreview = {
  id: string;
  title: string;
  dek: string;
  status: "coming-soon";
  layout: "feature" | "standard";
  tone: "photo" | "wash" | "plum";
  visual:
    | {
        kind: "photo";
        src: string;
        alt: string;
        note: string;
      }
    | {
        kind: "illustration";
        name: "toilet-paper" | "percent";
      };
};

export const NOTES_PREVIEWS: NotePreview[] = [
  {
    id: "who-owns-the-bathroom",
    title: "Who actually owns the brands in your bathroom?",
    dek: "A few familiar bottles. A shorter list of parent companies than you'd expect.",
    status: "coming-soon",
    layout: "feature",
    tone: "photo",
    visual: {
      kind: "photo",
      src: EDITORIAL_ASSETS.householdEssentials.src,
      alt: EDITORIAL_ASSETS.householdEssentials.alt,
      note: EDITORIAL_ASSETS.householdEssentials.note,
    },
  },
  {
    id: "why-toilet-paper",
    title: "Why I built a website about buying toilet paper",
    dek: "It started as an ordinary errand and got slightly out of hand.",
    status: "coming-soon",
    layout: "standard",
    tone: "wash",
    visual: { kind: "illustration", name: "toilet-paper" },
  },
  {
    id: "ten-percent-of-profits",
    title: "What does \u201c10% of profits donated\u201d actually mean?",
    dek: "Percentages sound precise. The fine print is usually doing more work.",
    status: "coming-soon",
    layout: "standard",
    tone: "plum",
    visual: { kind: "illustration", name: "percent" },
  },
  {
    id: "small-swaps-bigger-questions",
    title: "Small swaps, bigger questions",
    dek: "You don't have to overhaul your life. You might have to look a little closer at Tuesday.",
    status: "coming-soon",
    layout: "standard",
    tone: "photo",
    visual: {
      kind: "photo",
      src: EDITORIAL_ASSETS.everydayHousehold.src,
      alt: EDITORIAL_ASSETS.everydayHousehold.alt,
      note: EDITORIAL_ASSETS.everydayHousehold.note,
    },
  },
];
