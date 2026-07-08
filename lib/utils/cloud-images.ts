const sessionCache = new Map<string, string>();
const pendingFetches = new Map<string, Promise<string | null>>();

const CATEGORY_FOLDER_MAP: Record<string, string> = {
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

function buildSearchQuery(name: string, category: string): string {
  const clean = name
    .replace(/\([^)]*\)/g, "")
    .replace(/Pizza$/i, "")
    .replace(/Burger$/i, "")
    .replace(/Sandwich$/i, "")
    .replace(/\s*\(\d+\s*pcs\)/i, "")
    .trim();

  const folder = CATEGORY_FOLDER_MAP[category] ?? "";
  const key = `${folder}:${clean}`;
  sessionCache.set(`query:${name}${category}`, key);
  return key;
}

export function buildSearchKey(name: string, category: string): string {
  return buildSearchQuery(name, category);
}

export async function fetchCloudImage(
  name: string,
  category: string,
): Promise<string | null> {
  const query = buildSearchQuery(name, category);
  const cacheKey = `cloud:${query}`;

  if (sessionCache.has(cacheKey)) return sessionCache.get(cacheKey)!;

  if (pendingFetches.has(cacheKey)) return pendingFetches.get(cacheKey)!;

  const folder = CATEGORY_FOLDER_MAP[category] ?? "";

  const promise = (async () => {
    try {
      const res = await fetch(
        `/api/images/search?q=${encodeURIComponent(query)}&cat=${encodeURIComponent(folder)}`,
        { signal: AbortSignal.timeout(8000) },
      );
      if (!res.ok) return null;
      const data = await res.json();
      if (data.url) {
        sessionCache.set(cacheKey, data.url);
        return data.url;
      }
      return null;
    } catch {
      return null;
    }
  })();

  pendingFetches.set(cacheKey, promise);
  const result = await promise;
  pendingFetches.delete(cacheKey);
  return result;
}

export function getCloudCached(name: string, category: string): string | null {
  const query = buildSearchQuery(name, category);
  return sessionCache.get(`cloud:${query}`) ?? null;
}

export function clearCache(): void {
  sessionCache.clear();
  pendingFetches.clear();
}
