export type HowItWorksStep = {
  num: string;
  title: string;
  detail: string;
  imageUrl: string;
  imageAlt: string;
  imageCredit: string;
  imageLicense: string;
  tone: "periwinkle" | "plum" | "ivory";
};

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    num: "01",
    title: "Search what you already buy.",
    detail:
      "Start with coffee, shampoo, cleaning products, or another purchase that's already part of your routine. You don't need to buy anything extra.",
    imageUrl:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Overhead still life of ordinary household and personal care items",
    imageCredit: "Sarah Chai / Unsplash",
    imageLicense: "Unsplash License",
    tone: "periwinkle",
  },
  {
    num: "02",
    title: "Find a better place to buy it.",
    detail:
      "Compare price, cause, and verified giving commitments. See which businesses support issues you care about and understand what their claims actually mean.",
    imageUrl:
      "https://images.unsplash.com/photo-1556745757-8d76bdb6834a?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Small business owner at a counter preparing an order",
    imageCredit: "LinkedIn Sales Solutions / Unsplash",
    imageLicense: "Unsplash License",
    tone: "plum",
  },
  {
    num: "03",
    title: "Buy directly from the seller.",
    detail:
      "Elsewhere doesn't take a commission or handle checkout. When you find something you like, we send you straight to the business.",
    imageUrl:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Hands packing a cardboard shipping box",
    imageCredit: "Bernd 📷 Dittrich / Unsplash",
    imageLicense: "Unsplash License",
    tone: "ivory",
  },
];
