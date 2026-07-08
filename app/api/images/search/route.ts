import { NextRequest, NextResponse } from "next/server";

const AI_PROMPT = (query: string) =>
  `Professional restaurant food photography of ${query}, cinematic lighting, dark luxury black and gold theme, premium presentation, realistic professional photography, high detail, appetizing close-up shot, restaurant quality menu photography, mouth-watering food photography, top-down or angled shot, rich colors, shallow depth of field`;

const CATEGORY_SUFFIX: Record<string, string> = {
  pizza: "pizza italian food",
  burgers: "burger fast food chicken",
  shawarma: "shawarma wrap middle eastern",
  sandwiches: "sandwich grilled food",
  pasta: "pasta italian dish",
  appetizers: "appetizer snack finger food",
  platters: "food platter platter",
  wrap_rolls: "wrap roll food",
  broast: "fried chicken broast",
  toppings: "sauce dip condiment dressing",
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  const category = searchParams.get("cat") ?? "";

  if (!query) {
    return NextResponse.json({ error: "Missing query parameter" }, { status: 400 });
  }

  const foodQuery = category && CATEGORY_SUFFIX[category]
    ? `${query} ${CATEGORY_SUFFIX[category]}`
    : `${query} food restaurant`;

  const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;

  if (unsplashKey) {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(foodQuery)}&per_page=1&orientation=landscape&content_filter=high`,
        { headers: { Authorization: `Client-ID ${unsplashKey}` }, next: { revalidate: 86400 } },
      );
      if (res.ok) {
        const data = await res.json();
        const photo = data.results?.[0];
        if (photo?.urls?.regular) {
          return NextResponse.json({
            url: `${photo.urls.regular}&w=800&h=600&fit=crop`,
            source: "unsplash",
            alt: photo.alt_description ?? query,
          });
        }
      }
    } catch {}
  }

  const aiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(AI_PROMPT(query))}&width=800&height=600&nofeed=true`;

  return NextResponse.json({
    url: aiUrl,
    source: "ai",
    alt: query,
  });
}
