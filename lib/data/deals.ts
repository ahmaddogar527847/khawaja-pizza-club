export interface DealItem {
  id: string;
  name: string;
  type: "regular" | "family";
  tag: "HOT DEAL" | "MOST POPULAR" | "BEST VALUE" | "FAMILY DEAL" | "NEW";
  includes: string[];
  price: number;
  originalPrice?: number;
  image: string;
}

export const DEALS: DealItem[] = [
  // ═══ Regular Deals ═══════════════════════════════════════════════════════
  {
    id: "deal-1",
    name: "Deal 1",
    type: "regular",
    tag: "MOST POPULAR",
    includes: ["1 Zinger Burger", "1 Regular Fries", "345ml Next"],
    price: 500,
    originalPrice: 680,
    image: "/images/deals/deal_1.jpg",
  },
  {
    id: "deal-2",
    name: "Deal 2",
    type: "regular",
    tag: "HOT DEAL",
    includes: ["2 Zinger Burgers", "2 Regular Fries", "345ml Next"],
    price: 1000,
    originalPrice: 1360,
    image: "/images/deals/deal_2.jpg",
  },
  {
    id: "deal-3",
    name: "Deal 3",
    type: "regular",
    tag: "BEST VALUE",
    includes: ["3 Zinger Burgers", "1 Small Fries", "1 Ltr Next"],
    price: 1280,
    originalPrice: 1490,
    image: "/images/deals/deal_3.jpg",
  },
  {
    id: "deal-4",
    name: "Deal 4",
    type: "regular",
    tag: "HOT DEAL",
    includes: ["1 Small Pizza", "1 Zinger Burger", "1 Ltr Next"],
    price: 1030,
    originalPrice: 1280,
    image: "/images/deals/deal_4.jpg",
  },
  {
    id: "deal-5",
    name: "Deal 5",
    type: "regular",
    tag: "MOST POPULAR",
    includes: ["1 Medium Pizza", "1 Small Fries", "1.5 Ltr Next"],
    price: 1400,
    originalPrice: 1680,
    image: "/images/deals/deal_5.jpg",
  },
  {
    id: "deal-6",
    name: "Deal 6",
    type: "regular",
    tag: "BEST VALUE",
    includes: ["1 Large Pizza", "1 Zinger Burger", "1.5 Ltr Next"],
    price: 1820,
    originalPrice: 2100,
    image: "/images/deals/deal_6.jpg",
  },

  // ═══ Family Deals ════════════════════════════════════════════════════════
  {
    id: "family-deal-1",
    name: "Family Deal 1",
    type: "family",
    tag: "FAMILY DEAL",
    includes: ["6 Zinger Burgers", "1.5 Ltr Next"],
    price: 2000,
    originalPrice: 2480,
    image: "/images/deals/family_deal_1.jpg",
  },
  {
    id: "family-deal-2",
    name: "Family Deal 2",
    type: "family",
    tag: "FAMILY DEAL",
    includes: ["2 Small Pizzas", "1 Small Fries", "1 Ltr Next"],
    price: 1500,
    originalPrice: 1800,
    image: "/images/deals/family_deal_2.jpg",
  },
  {
    id: "family-deal-3",
    name: "Family Deal 3",
    type: "family",
    tag: "FAMILY DEAL",
    includes: ["2 Medium Pizzas", "1 Small Fries", "1.5 Ltr Next"],
    price: 2500,
    originalPrice: 3000,
    image: "/images/deals/family_deal_3.jpg",
  },
  {
    id: "family-deal-4",
    name: "Family Deal 4",
    type: "family",
    tag: "FAMILY DEAL",
    includes: ["1 XL Pizza", "1 Small Fries", "1 Zinger Burger", "1.5 Ltr Next"],
    price: 2800,
    originalPrice: 3400,
    image: "/images/deals/family_deal_4.jpg",
  },
];

export const MARQUEE_ITEMS = [
  { icon: "🍕", name: "Real Tikka Pizza", price: "Rs. 600+", tag: "Best Seller" },
  { icon: "🍔", name: "Mighty Zinger Burger", price: "Rs. 700", tag: "Fan Favourite" },
  { icon: "🍟", name: "Loaded Fries", price: "Rs. 550+", tag: "Must Try" },
  { icon: "🌯", name: "Behari Roll (4 pcs)", price: "Rs. 700", tag: "Desi Special" },
  { icon: "🍗", name: "Crispy Wings 10 pcs", price: "Rs. 650", tag: "Crispy & Hot" },
  { icon: "🥪", name: "Club Sandwich", price: "Rs. 550", tag: "Classic" },
  { icon: "🍝", name: "Crunchy Pasta", price: "Rs. 750", tag: "Chef's Pick" },
  { icon: "🎉", name: "Family Deal 3", price: "Rs. 2500", tag: "Best Value" },
];
