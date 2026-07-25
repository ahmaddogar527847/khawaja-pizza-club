export const FALLBACK_IMAGE = "/hero-food.png";

type ImageAsset = {
  path: string;
  folder: string;
  filename: string;
  tokens: string[];
};

const CATEGORY_FALLBACK: Record<string, string> = {
  Pizza: "/images/pizzas/super_supreme.jpg",
  Burgers: "/images/burgers/zinger.jpg",
  Shawarma: "/images/shawarma/chicken_shawarma.jpg",
  Sandwiches: "/images/sandwiches/grill.jpg",
  Pasta: "/images/pasta/plain.jpg",
  Appetizers: "/images/appetizers/reg_fries.jpg",
  Platters: "/images/platters/sandwich_platter.jpg",
  "Wrap Rolls": "/images/wrap_rolls/behari_roll.jpg",
  Broast: "/images/broast/chicken_leg.jpg",
  "Topping & Dip Sauce": "/images/toppings/dip_sauce.jpg",
  Deals: "/images/deals/deal_1.jpg",
};

const CATEGORY_FOLDER: Record<string, string> = {
  Pizza: "pizzas",
  Burgers: "burgers",
  Shawarma: "shawarma",
  Sandwiches: "sandwiches",
  Pasta: "pasta",
  Appetizers: "appetizers",
  Platters: "platters",
  "Wrap Rolls": "wrap_rolls",
  Broast: "broast",
  "Topping & Dip Sauce": "toppings",
};

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Pizza: ["pizza", "pizzas"],
  Burgers: ["burger", "burgers"],
  Shawarma: ["shawarma"],
  Sandwiches: ["sandwich", "sandwiches"],
  Pasta: ["pasta"],
  Appetizers: ["appetizer", "appetizers", "fries", "wings", "nuggets"],
  Platters: ["platter", "platters"],
  "Wrap Rolls": ["wrap", "roll", "rolls"],
  Broast: ["broast", "chicken"],
  "Topping & Dip Sauce": ["topping", "dip", "sauce", "cheese", "chicken", "peri"],
};

const IMAGE_PATHS = [
  "/hero-food.png",
  "/images/appetizers/baked_wings.jpg",
  "/images/appetizers/crispy_wings.jpg",
  "/images/appetizers/hot_shot.jpg",
  "/images/appetizers/loaded_fries.jpg",
  "/images/appetizers/nuggets.jpg",
  "/images/appetizers/reg_fries.jpg",
  "/images/broast/chicken_chest.jpg",
  "/images/broast/chicken_leg.jpg",
  "/images/broast/roghni_nan.jpg",
  "/images/burgers/chicken_patty.jpg",
  "/images/burgers/crunch.jpg",
  "/images/burgers/khawaja_special_zinger.jpg",
  "/images/burgers/mighty_zinger.jpg",
  "/images/burgers/special_zinger.jpg",
  "/images/burgers/tower.jpg",
  "/images/burgers/zinger.jpg",
  "/images/burgers/zinger_cheese.jpg",
  "/images/burgers/zinger_chipotle.jpg",
  "/images/deals/deal_1.jpg",
  "/images/deals/deal_2.jpg",
  "/images/deals/deal_3.jpg",
  "/images/deals/deal_4.jpg",
  "/images/deals/deal_5.jpg",
  "/images/deals/deal_6.jpg",
  "/images/deals/family_deal_1.jpg",
  "/images/deals/family_deal_2.jpg",
  "/images/deals/family_deal_3.jpg",
  "/images/deals/family_deal_4.jpg",
  "/images/pasta/crunchy.jpg",
  "/images/pasta/flaming.jpg",
  "/images/pasta/kabab.jpg",
  "/images/pasta/lasagna.jpg",
  "/images/pasta/plain.jpg",
  "/images/pizzas/bar_bq.jpg",
  "/images/pizzas/bbq_texas.jpg",
  "/images/pizzas/behari_kabab.jpg",
  "/images/pizzas/bonfire.jpg",
  "/images/pizzas/cheese_crust.jpg",
  "/images/pizzas/cheese_lover.jpg",
  "/images/pizzas/chipotle.jpg",
  "/images/pizzas/creamy_delight.jpg",
  "/images/pizzas/crown_crust.jpg",
  "/images/pizzas/crunchy_xtreme.jpg",
  "/images/pizzas/fajita_sicilian.jpg",
  "/images/pizzas/kabab_crust.jpg",
  "/images/pizzas/mild_xtreme.jpg",
  "/images/pizzas/peri_peri_deep_dish.jpg",
  "/images/pizzas/peri_peri_hot.jpg",
  "/images/pizzas/peri_peri_xtreme.jpg",
  "/images/pizzas/real_tikka.jpg",
  "/images/pizzas/shahi_kabab.jpg",
  "/images/pizzas/super_crunch.jpg",
  "/images/pizzas/super_labisto.jpg",
  "/images/pizzas/super_supreme.jpg",
  "/images/pizzas/tandoori.jpg",
  "/images/pizzas/tikka_royal.jpg",
  "/images/platters/behari_roll_platter.jpg",
  "/images/platters/sandwich_platter.jpg",
  "/images/sandwiches/bbq.jpg",
  "/images/sandwiches/club.jpg",
  "/images/sandwiches/grill.jpg",
  "/images/sandwiches/chicken_shawarma_grill.jpg",
  "/images/sandwiches/mexican.jpg",
  "/images/sandwiches/peninie.jpg",
  "/images/shawarma/cheese_shawarma.jpg",
  "/images/shawarma/chicken_shawarma.jpg",
  "/images/shawarma/paratha_shawarma.jpg",
  "/images/shawarma/shawarma_platter.jpg",
  "/images/shawarma/zinger_shawarma.jpg",
  "/images/wrap_rolls/arabic_roll.jpg",
  "/images/wrap_rolls/behari_roll.jpg",
  "/images/wrap_rolls/pratha_roll.jpg",
  "/images/wrap_rolls/turkish_roll.jpg",
  "/images/toppings/cheese_sauce.jpg",
  "/images/toppings/chicken_topping.jpg",
  "/images/toppings/dip_sauce.jpg",
  "/images/toppings/peri_peri_sauce.jpg",
  "/images/toppings/cheese_chicken_dip_sauce.jpg",
] as const;

const DIRECT_PRODUCT_ALIASES: Record<string, string> = {
  "bar b q pizza": "/images/pizzas/bar_bq.jpg",
  "bar bq pizza": "/images/pizzas/bar_bq.jpg",
  "bbq pizza": "/images/pizzas/bar_bq.jpg",
  "creamy delight pizza": "/images/pizzas/creamy_delight.jpg",
  "fajita sicilian pizza": "/images/pizzas/fajita_sicilian.jpg",
  "super supreme pizza": "/images/pizzas/super_supreme.jpg",
  "peri peri deep dish pizza": "/images/pizzas/peri_peri_deep_dish.jpg",
  "khawaja special": "/images/pizzas/super_supreme.jpg",
  "khawaja special pizza": "/images/pizzas/super_supreme.jpg",
  "cheese": "/images/toppings/cheese_sauce.jpg",
  "cheese topping": "/images/toppings/cheese_sauce.jpg",
  "extra cheese": "/images/toppings/cheese_sauce.jpg",
  "cheese sauce": "/images/toppings/cheese_sauce.jpg",
  "chicken": "/images/toppings/chicken_topping.jpg",
  "chicken topping": "/images/toppings/chicken_topping.jpg",
  "chicken mayo": "/images/toppings/chicken_topping.jpg",
  "dip sauce": "/images/toppings/dip_sauce.jpg",
  "peri peri sauce": "/images/toppings/peri_peri_sauce.jpg",
  "crispy wings 10 pcs": "/images/appetizers/crispy_wings.jpg",
  "crispy wings": "/images/appetizers/crispy_wings.jpg",
  "behari roll 4 pcs": "/images/wrap_rolls/behari_roll.jpg",
  "behari roll (4 pcs)": "/images/wrap_rolls/behari_roll.jpg",
  "behari roll": "/images/wrap_rolls/behari_roll.jpg",
  "chicken leg broast": "/images/broast/chicken_leg.jpg",
  "chicken leg (broast)": "/images/broast/chicken_leg.jpg",
  "chicken chest broast": "/images/broast/chicken_chest.jpg",
  "chicken shawarma grill": "/images/sandwiches/chicken_shawarma_grill.jpg",
  "chicken shawarma grill sandwich": "/images/sandwiches/chicken_shawarma_grill.jpg",
  "grill sandwich": "/images/sandwiches/grill.jpg",
  "plain pasta": "/images/pasta/plain.jpg",
  "bonfire pizza": "/images/pizzas/bonfire.jpg",
  "sandwich platter": "/images/platters/sandwich_platter.jpg",
  "cheese chicken dip": "/images/toppings/cheese_chicken_dip_sauce.jpg",
  "cheese chicken dip sauce": "/images/toppings/cheese_chicken_dip_sauce.jpg",
  "chicken cheese dip sauce": "/images/toppings/cheese_chicken_dip_sauce.jpg",
  "regular fries": "/images/appetizers/reg_fries.jpg",
};

const DIRECT_DEAL_ALIASES: Record<string, string> = {
  "deal 1": "/images/deals/deal_1.jpg",
  "deal 2": "/images/deals/deal_2.jpg",
  "deal 3": "/images/deals/deal_3.jpg",
  "deal 4": "/images/deals/deal_4.jpg",
  "deal 5": "/images/deals/deal_5.jpg",
  "deal 6": "/images/deals/deal_6.jpg",
  "family deal 1": "/images/deals/family_deal_1.jpg",
  "family deal 2": "/images/deals/family_deal_2.jpg",
  "family deal 3": "/images/deals/family_deal_3.jpg",
  "family deal 4": "/images/deals/family_deal_4.jpg",
};

const STOP_WORDS = new Set([
  "a",
  "and",
  "bq",
  "club",
  "fast",
  "food",
  "fresh",
  "item",
  "khawaja",
  "kpc",
  "of",
  "pcs",
  "piece",
  "pieces",
  "premium",
  "regular",
  "rs",
  "small",
  "the",
]);

function normalizeName(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\+/g, " ")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function singularize(token: string): string {
  if (token.endsWith("ies")) return `${token.slice(0, -3)}y`;
  if (token.endsWith("ses")) return token.slice(0, -2);
  if (token.endsWith("s") && token.length > 3) return token.slice(0, -1);
  return token;
}

function tokenize(value: string): string[] {
  return normalizeName(value)
    .split(" ")
    .map(singularize)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function compact(value: string): string {
  return normalizeName(value).replace(/\s/g, "");
}

function isUsableLocalImage(path: string): boolean {
  return (
    !!path &&
    (path.startsWith("/images/") || path === "/hero-food.png") &&
    !path.includes("pizza-1") &&
    !path.includes("burger-1") &&
    !path.startsWith("http")
  );
}

function folderForCategory(category?: string): string {
  return category ? CATEGORY_FOLDER[category] ?? "" : "";
}

function makeAsset(path: string): ImageAsset {
  const parts = path.split("/");
  const file = parts[parts.length - 1] ?? "";
  const filename = file.replace(/\.[^.]+$/, "");
  const folder = parts.length > 2 ? parts[parts.length - 2] : "";
  return {
    path,
    folder,
    filename,
    tokens: tokenize(`${folder} ${filename}`),
  };
}

const LOCAL_IMAGE_ASSETS: ImageAsset[] = IMAGE_PATHS.map(makeAsset);

const IMAGES_BY_FOLDER: Record<string, string[]> = {};
for (const asset of LOCAL_IMAGE_ASSETS) {
  if (asset.folder) {
    if (!IMAGES_BY_FOLDER[asset.folder]) IMAGES_BY_FOLDER[asset.folder] = [];
    IMAGES_BY_FOLDER[asset.folder].push(asset.path);
  }
}

const CATEGORY_MATCH_BONUS = 60;
const CATEGORY_MISMATCH_PENALTY = 80;
const EXACT_MATCH_SCORE = 120;
const COMPACT_MATCH_SCORE = 110;
const STRIPPED_SUFFIX_SCORE = 95;
const TOKEN_MATCH_SCORE = 18;
const FILENAME_CONTAIN_SCORE = 8;
const CATEGORY_KEYWORD_SCORE = 4;
const SUBSTRING_SCORE = 35;
const DEAL_PENALTY = 100;
const FALLBACK_PENALTY = 2;

function scoreAsset(asset: ImageAsset, productName: string, category?: string): number {
  const normalizedProduct = normalizeName(productName);
  const productTokens = tokenize(productName);
  const fileName = normalizeName(asset.filename);
  const productCompact = compact(productName);
  const fileCompact = compact(asset.filename);
  const categoryFolder = folderForCategory(category);
  const categoryTokens = category ? CATEGORY_KEYWORDS[category] ?? tokenize(category) : [];

  let score = 0;

  if (fileName === normalizedProduct) score += EXACT_MATCH_SCORE;
  if (fileCompact === productCompact) score += COMPACT_MATCH_SCORE;
  if (normalizedProduct.endsWith(" pizza") && fileCompact === compact(normalizedProduct.replace(/ pizza$/, ""))) score += STRIPPED_SUFFIX_SCORE;
  if (normalizedProduct.endsWith(" burger") && fileCompact === compact(normalizedProduct.replace(/ burger$/, ""))) score += STRIPPED_SUFFIX_SCORE;
  if (normalizedProduct.endsWith(" sandwich") && fileCompact === compact(normalizedProduct.replace(/ sandwich$/, ""))) score += STRIPPED_SUFFIX_SCORE;

  if (categoryFolder && asset.folder === categoryFolder) score += CATEGORY_MATCH_BONUS;
  if (categoryFolder && asset.folder !== categoryFolder) score -= CATEGORY_MISMATCH_PENALTY;

  for (const token of productTokens) {
    if (asset.tokens.includes(token)) score += TOKEN_MATCH_SCORE;
    if (fileName.includes(token)) score += FILENAME_CONTAIN_SCORE;
  }

  for (const token of categoryTokens.map(singularize)) {
    if (asset.tokens.includes(token) || asset.folder.includes(token)) score += CATEGORY_KEYWORD_SCORE;
  }

  if (fileName.includes(normalizedProduct) || normalizedProduct.includes(fileName)) score += SUBSTRING_SCORE;
  if (asset.folder === "deals" && category !== "Deals") score -= DEAL_PENALTY;
  if (asset.path === FALLBACK_IMAGE) score -= FALLBACK_PENALTY;

  return score;
}

function findBestImage(name: string, category?: string): string {
  const key = normalizeName(name);
  const direct = category === "Deals" ? DIRECT_DEAL_ALIASES[key] : DIRECT_PRODUCT_ALIASES[key];
  if (direct) return direct;

  const categoryFolder = folderForCategory(category);

  let bestCategoryPath: string | null = null;
  let bestCategoryScore = -Infinity;

  if (categoryFolder && IMAGES_BY_FOLDER[categoryFolder]) {
    for (const path of IMAGES_BY_FOLDER[categoryFolder]) {
      const asset = makeAsset(path);
      const score = scoreAsset(asset, name, category);
      if (score > bestCategoryScore) {
        bestCategoryScore = score;
        bestCategoryPath = path;
      }
    }
    if (bestCategoryPath && bestCategoryScore >= 40) return bestCategoryPath;
  }

  const ranked = LOCAL_IMAGE_ASSETS
    .map((asset) => ({ asset, score: scoreAsset(asset, name, category) }))
    .sort((a, b) => b.score - a.score);

  if (ranked[0] && ranked[0].score >= 55) return ranked[0].asset.path;

  if (category && CATEGORY_FALLBACK[category]) return CATEGORY_FALLBACK[category];

  return FALLBACK_IMAGE;
}

export function getProductImage(name: string, category?: string): string {
  return findBestImage(name, category);
}

export function getDealImage(name: string): string {
  return findBestImage(name, "Deals");
}

export function getCategoryFallbackImage(category?: string): string {
  return category ? CATEGORY_FALLBACK[category] ?? FALLBACK_IMAGE : FALLBACK_IMAGE;
}

export function resolveProductImage(
  name: string,
  category: string | undefined,
  currentImage?: string | null,
): string {
  const mapped = getProductImage(name, category);
  if (mapped !== FALLBACK_IMAGE && mapped !== CATEGORY_FALLBACK[category ?? ""]) return mapped;
  if (currentImage && isUsableLocalImage(currentImage)) return currentImage;
  return getCategoryFallbackImage(category);
}

export function resolveDealImage(name: string, currentImage?: string | null): string {
  const mapped = getDealImage(name);
  if (mapped !== FALLBACK_IMAGE && mapped !== CATEGORY_FALLBACK["Deals"]) return mapped;
  if (currentImage && isUsableLocalImage(currentImage)) return currentImage;
  return getCategoryFallbackImage("Deals");
}

export function isCategoryFallback(path: string, category?: string): boolean {
  if (path === FALLBACK_IMAGE) return true;
  if (category && CATEGORY_FALLBACK[category] === path) return true;
  return false;
}

export async function resolveProductImageCloud(
  name: string,
  category: string | undefined,
): Promise<string | null> {
  if (!category) return null;
  const local = getProductImage(name, category);
  if (local !== CATEGORY_FALLBACK[category] && local !== FALLBACK_IMAGE) return null;
  const { fetchCloudImage } = await import("./cloud-images");
  return fetchCloudImage(name, category);
}
