import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import GlobalParticles from "@/components/layout/GlobalParticles";
import { CONTACT } from "@/lib/contact";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const SITE_NAME = "Khawaja Pizza Club";
const SITE_DESCRIPTION =
  "Premium Pizza, Burgers, Fast Food, Delivery & Online Ordering from Khawaja Pizza Club.";
const SITE_SHORT_DESCRIPTION =
  "Order the best pizza and burgers at Khawaja Pizza Club, Thana Chowk, Shujaabad. Fresh ingredients, free delivery. Call or order on WhatsApp!";

export const metadata: Metadata = {
  // Browser tab / history / bookmarks / OS dialogs
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  applicationName: SITE_NAME,
  description: SITE_DESCRIPTION,
  keywords: [
    "Khawaja Pizza Club",
    "pizza",
    "burgers",
    "fast food",
    "shawarma",
    "Shujaabad",
    "Thana Chowk",
    "delivery",
    "online ordering",
    "Pakistan",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Food & Beverage",

  // Favicon / app icons (existing /logo.png is preserved)
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png", sizes: "any" },
    ],
    shortcut: { url: "/logo.png", type: "image/png" },
    apple: { url: "/logo.png", type: "image/png", sizes: "any" },
  },

  // PWA manifest (auto-generated from app/manifest.ts)
  manifest: "/manifest.webmanifest",

  // Social sharing — Open Graph
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_SHORT_DESCRIPTION,
  },

  // Social sharing — Twitter / X
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_SHORT_DESCRIPTION,
  },

  robots: { index: true, follow: true },
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  userScalable: true,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // LocalBusiness / Restaurant JSON-LD for SEO.
  // Numbers are derived from the single source of truth in @/lib/contact.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: CONTACT.brandName,
    image: "/logo.png",
    url: "/",
    telephone: CONTACT.phoneE164,
    priceRange: "Rs. Rs.",
    servesCuisine: ["Pizza", "Burgers", "Fast Food", "Shawarma"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Thana Chowk",
      addressLocality: "Shujaabad",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "11:00",
        closes: "01:00",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: CONTACT.phoneE164,
        contactType: "customer service",
        areaServed: "PK",
        availableLanguage: ["en", "ur"],
      },
    ],
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} bg-background`}>
      <body
        className="font-sans antialiased bg-black text-white overflow-x-hidden"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        <GlobalParticles />
        {children}
        {/* Structured data for search engines */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
