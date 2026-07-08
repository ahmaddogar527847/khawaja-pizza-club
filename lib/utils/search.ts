export interface SearchableItem {
  name: string;
  description?: string;
  category?: string;
  searchPrices?: number[];
  priceLabel?: string;
}

function extractNumbers(text: string): number[] {
  const matches = text.match(/\d[\d,]*/g);
  if (!matches) return [];
  return matches.map((m) => parseFloat(m.replace(/,/g, ""))).filter((n) => !isNaN(n));
}

function priceMatches(price: number, queryNumbers: number[]): boolean {
  return queryNumbers.some((n) => n === price);
}

function substringPriceMatch(price: number, queryRaw: string): boolean {
  return String(price).startsWith(queryRaw);
}

export function smartSearch<T extends SearchableItem>(items: T[], query: string): T[] {
  if (!query.trim()) return items;
  const q = query.toLowerCase().trim();
  const numbers = extractNumbers(q);

  return items.filter((item) => {
    // name match (full + partial word)
    if (item.name.toLowerCase().includes(q)) return true;
    const nameWords = item.name.toLowerCase().split(/\s+/);
    if (nameWords.some((w) => w.startsWith(q))) return true;

    // category match
    if (item.category && item.category.toLowerCase().includes(q)) return true;

    // description match
    if (item.description && item.description.toLowerCase().includes(q)) return true;

    // exact price number match
    if (numbers.length > 0 && item.searchPrices) {
      if (item.searchPrices.some((p) => priceMatches(p, numbers))) return true;
    }

    // substring price match (e.g. "60" matches 600, "120" matches 1200)
    if (item.searchPrices && item.searchPrices.some((p) => substringPriceMatch(p, q))) return true;

    return false;
  });
}

export function getSearchPlaceholder(category?: string): string {
  if (!category || category === "all" || category === "All Items") return "Search menu items...";
  if (category === "deals") return "Search deals...";
  return `Search ${category}...`;
}
