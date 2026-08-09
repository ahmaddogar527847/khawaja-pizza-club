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
const SITE_URL = "https://khawaja-pizza-club.vercel.app";
const SITE_DESCRIPTION =
  "Premium Pizza, Burgers, Fast Food, Delivery & Online Ordering from Khawaja Pizza Club.";
const SITE_SHORT_DESCRIPTION =
  "Order the best pizza and burgers at Khawaja Pizza Club, Thana Chowk, Shujaabad. Fresh ingredients, free delivery. Call or order on WhatsApp!";
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const TWITTER_IMAGE = `${SITE_URL}/twitter-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  
  // Basic metadata
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  
  // Keywords for restaurant/pizza shop
  keywords: [
    "Khawaja Pizza Club",
    "pizza delivery Shujaabad",
    "burgers Shujaabad",
    "fast food Shujaabad",
    "shawarma delivery Pakistan",
    "Thana Chowk restaurant",
    "online food ordering",
    "pizza Shujaabad",
    "best pizza Pakistan",
    "cheap pizza delivery",
    "Pakistani fast food",
    "zinger burger",
    "peri peri pizza",
    "hot wings delivery",
    "free delivery Shujaabad",
  ],
  
  // Creator and publisher info
  authors: [
    {
      name: SITE_NAME,
      url: SITE_URL,
    },
  ],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Food & Beverage",
  
  // Charset and language
  charset: "utf-8",
  
  // Robots configuration
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Alternate language versions
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-PK": `${SITE_URL}`,
      "ur-PK": `${SITE_URL}/ur`,
    },
  },
  
  // Format detection
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  
  // Icons and PWA
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  // PWA manifest
  manifest: "/manifest.webmanifest",

  // Open Graph (Facebook, LinkedIn, Pinterest, etc.)
  openGraph: {
    type: "website",
    locale: "en_PK",
    alternateLocale: ["ur_PK"],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_SHORT_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Premium Pizza & Burgers`,
        type: "image/png",
      },
      {
        url: OG_IMAGE,
        width: 800,
        height: 600,
        alt: `${SITE_NAME}`,
        type: "image/png",
      },
    ],
  },

  // Twitter / X Card
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_SHORT_DESCRIPTION,
    images: [TWITTER_IMAGE],
    creator: "@khawajapizzaclub",
    site: "@khawajapizzaclub",
  },

  // Additional meta tags for SEO
  referrer: "strict-origin-when-cross-origin",
  
  // Verification tags (to be added by user)
  verification: {
    google: "", // User to add Google Search Console verification code
    yandex: "",
    yahoo: "",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Comprehensive JSON-LD structured data for Google Rich Results
  // These schemas help Google understand the business, menu, and offerings
  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": SITE_URL,
    name: CONTACT.brandName,
    description: SITE_DESCRIPTION,
    image: [
      `${SITE_URL}/og-image.png`,
      `${SITE_URL}/logo.png`,
    ],
    url: SITE_URL,
    telephone: CONTACT.phoneE164,
    email: "", // Add if you have business email
    priceRange: "$$",
    servesCuisine: [
      "Pizza",
      "Burgers",
      "Fast Food",
      "Shawarma",
      "Pakistani",
      "Middle Eastern",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "6",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Ahmed K." },
        reviewRating: { "@type": "Rating", ratingValue: "5" },
        reviewBody:
          "Bhai bilkul best pizza hai! Cheese itni zyada thi ke bas maza aa gaya.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Sara M." },
        reviewRating: { "@type": "Rating", ratingValue: "5" },
        reviewBody: "Family deal bohot value for money hai. Sab items fresh the.",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Thana Chowk",
      addressLocality: "Shujaabad",
      addressRegion: "Punjab",
      postalCode: "",
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "", // Add coordinates if available
      longitude: "",
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
        contactType: "Customer Service",
        areaServed: "PK",
        availableLanguage: ["en", "ur"],
      },
      {
        "@type": "ContactPoint",
        url: "https://wa.me/923017723698",
        contactType: "WhatsApp Support",
        areaServed: "PK",
      },
    ],
    sameAs: [
      "https://www.facebook.com/khawajapizzaclub", // Update with your social URLs
      "https://www.instagram.com/khawajapizzaclub",
      "https://wa.me/923017723698",
    ],
    hasMenu: {
      "@type": "Menu",
      name: "Khawaja Pizza Club Menu",
      description:
        "Our full menu of pizzas, burgers, shawarma, and fast food items",
      hasMenuSection: [
        {
          "@type": "MenuSection",
          name: "Pizzas",
          description: "Our signature pizzas with fresh ingredients",
        },
        {
          "@type": "MenuSection",
          name: "Burgers",
          description: "Premium burgers made to order",
        },
        {
          "@type": "MenuSection",
          name: "Shawarma",
          description: "Authentic shawarma with generous filling",
        },
        {
          "@type": "MenuSection",
          name: "Fast Food",
          description: "Quick bites and appetizers",
        },
      ],
    },
    makesOffer: [
      {
        "@type": "Offer",
        name: "Free Delivery",
        description: "Free delivery on all orders in Shujaabad",
        eligibleRegion: {
          "@type": "Place",
          name: "Shujaabad",
        },
      },
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": SITE_URL,
    name: CONTACT.brandName,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: SITE_DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Thana Chowk",
      addressLocality: "Shujaabad",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    areaServed: {
      "@type": "City",
      name: "Shujaabad",
    },
    sameAs: [
      "https://www.facebook.com/khawajapizzaclub",
      "https://www.instagram.com/khawajapizzaclub",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: CONTACT.brandName,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Menu",
        item: `${SITE_URL}#menu`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "About",
        item: `${SITE_URL}#about`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Contact",
        item: `${SITE_URL}#contact`,
      },
    ],
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} bg-background`}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for potential external services */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body
        className="font-sans antialiased bg-black text-white overflow-x-hidden"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        <GlobalParticles />
        {children}
        
        {/* Multiple JSON-LD schemas for comprehensive SEO coverage */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
