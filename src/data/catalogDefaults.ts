import type { EvidenceTier, Product } from "./productTypes";

const OFFICIAL_DOMAIN_BY_ID: Record<string, string> = {
  "shelter-dog-coffee": "shelterdogcoffee.com",
  "grounds-hounds-founders-blend": "groundsandhoundscoffee.com",
  "volcanica-coffee": "volcanicacoffee.com",
  "who-gives-a-crap-100-recycled-toilet-paper": "whogivesacrap.org",
  "who-gives-a-crap-100-bamboo-toilet-paper": "whogivesacrap.org",
  "soapbox-tea-tree-shampoo": "soapboxsoaps.com",
  "project-hive-hive-bites": "projecthivepetcompany.com",
  "project-hive-chew-sticks": "projecthivepetcompany.com",
  "project-hive-hive-chews": "projecthivepetcompany.com",
  "bombas-all-sport-half-calf-socks": "bombas.com",
  "conscious-step-pollinator-hummingbirds": "consciousstep.com",
  "united-by-blue-merino-quarter-sock": "unitedbyblue.com",
  "free-the-ocean-dishcloth": "shop.freetheocean.com",
  "tentree-ten-t-shirt": "tentree.com",
  "warby-parker-ainsley": "warbyparker.com",
  "better-world-books": "betterworldbooks.com",
  "feed-10-bag": "feedprojects.com",
  "acs-brand-tee": "shop.cancer.org",
  "thrive-tubing-mascara-duo": "thrivecausemetics.com",
  "arbor-day-blend": "shop.arborday.org",
  "cat-rescue-house-blend": "catrescuecoffeecompany.com",
  "conscious-step-socks-dogs": "consciousstep.com",
  "conscious-step-socks-cats": "consciousstep.com",
  "conscious-step-socks-oceans": "consciousstep.com",
  "conscious-step-socks-forests": "consciousstep.com",
  "conscious-step-socks-clean-water": "consciousstep.com",
  "hand-in-hand-soap": "handinhandsoap.com",
  "nalgene-water-fund-bottle": "nalgene.com",
  "nobl-soap": "nobllife.com",
  "happiness-project-mental-health-tee": "happinessproject.com",
  "good-store-discovery": "good.store",
  "good-store-ecogeek-laundry": "good.store",
  "good-store-sun-basin-soap": "good.store",
  "tea-spot-bolder-breakfast": "theteaspot.com",
  "tea-spot-english-breakfast-organic": "theteaspot.com",
  "tea-spot-climbers-high-chai": "theteaspot.com",
};

const EVIDENCE_TIER_BY_ID: Record<string, EvidenceTier> = {
  "volcanica-coffee": "C",
  "better-world-books": "C",
  "hand-in-hand-soap": "C",
  "good-store-discovery": "C",
  "nalgene-water-fund-bottle": "B",
  "cat-rescue-house-blend": "B",
  "grounds-hounds-founders-blend": "B",
  "who-gives-a-crap-100-recycled-toilet-paper": "A",
  "who-gives-a-crap-100-bamboo-toilet-paper": "A",
  "arbor-day-blend": "A",
  "conscious-step-pollinator-hummingbirds": "A",
  "conscious-step-socks-dogs": "A",
  "conscious-step-socks-cats": "A",
  "conscious-step-socks-oceans": "A",
  "conscious-step-socks-forests": "A",
  "conscious-step-socks-clean-water": "A",
  "happiness-project-mental-health-tee": "A",
  "good-store-ecogeek-laundry": "B",
  "good-store-sun-basin-soap": "B",
};

const DEFAULT_TIER: EvidenceTier = "A";

export function withCatalogDefaults(product: Product): Product {
  return {
    ...product,
    officialDomain:
      product.officialDomain ?? OFFICIAL_DOMAIN_BY_ID[product.id] ?? "",
    evidenceTier:
      product.evidenceTier ?? EVIDENCE_TIER_BY_ID[product.id] ?? DEFAULT_TIER,
  };
}
