/**
 * Root-relative paths for public imagery.
 * Keep credits beside the files that require them.
 */
export const SITE_IMAGES = {
  founder: {
    src: "/images/founder.jpg",
    alt: "Marlu smiling beside a cardboard engineering project",
    width: 1024,
    height: 768,
  },
  amazonRainforest: {
    src: "/editorial-assets/amazon-rainforest-manaus.jpg",
    alt: "Aerial view of the Amazon rainforest and river near Manaus, Brazil",
    credit: "Neil Palmer / CIAT",
    license: "CC BY-SA 2.0",
    width: 1920,
    height: 1226,
  },
  householdEssentials: {
    src: "/editorial-assets/household-essentials-still-life.jpg",
    alt: "Unbranded household essentials, including detergent, toothpaste, soap, and a razor",
    width: 1152,
    height: 864,
  },
  everydayHousehold: {
    src: "/editorial-assets/everyday-household-still-life.jpg",
    alt: "Kitchen table with coffee, soap, toilet paper, and pet treats",
    width: 1152,
    height: 864,
  },
  groceryAisle: {
    src: "/editorial-assets/grocery-aisle-soft-focus.jpg",
    alt: "A soft-focus grocery aisle, with individual brands unreadable",
    width: 1152,
    height: 864,
  },
  capitolWestFront: {
    src: "/editorial-assets/us-capitol-west-front.jpg",
    alt: "West front of the United States Capitol in Washington, D.C.",
    credit: "Architect of the Capitol",
    width: 1920,
    height: 996,
  },
} as const;

export const ILLUSTRATIONS = {
  "toilet-paper": {
    src: "/images/illustrations/toilet-paper.png",
    alt: "A roll of toilet paper with a sheet unrolling",
  },
  coffee: {
    src: "/images/illustrations/coffee.png",
    alt: "A bag of coffee beans",
  },
  books: {
    src: "/images/illustrations/books.png",
    alt: "A stack of three books",
  },
  detergent: {
    src: "/images/illustrations/detergent.png",
    alt: "A bottle of laundry detergent",
  },
  toothpaste: {
    src: "/images/illustrations/toothpaste.png",
    alt: "A tube of toothpaste",
  },
  soap: {
    src: "/images/illustrations/soap.png",
    alt: "A pump bottle of soap",
  },
  "grocery-bag": {
    src: "/images/illustrations/grocery-bag.png",
    alt: "A grocery bag with food peeking out",
  },
  "pet-food": {
    src: "/images/illustrations/pet-food.png",
    alt: "A bag of pet food beside a bowl",
  },
  receipt: {
    src: "/images/illustrations/receipt.png",
    alt: "A grocery receipt totaling $42.55",
  },
  cart: {
    src: "/images/illustrations/cart.png",
    alt: "A shopping cart",
  },
  money: {
    src: "/images/illustrations/money.png",
    alt: "A stack of bills and coins",
  },
  globe: {
    src: "/images/illustrations/globe.png",
    alt: "A globe",
  },
} as const;

export type IllustrationName = keyof typeof ILLUSTRATIONS;
