# Khawaja Pizza Club — WhatsApp Ordering System

> **Premium Pizza, Burgers & Fast Food — Thana Chowk, Shujaabad, Pakistan**
>
> A production-grade single-page restaurant web application that turns visitors
> into WhatsApp orders. Black + gold luxury UI, motion-rich interactions,
> zero-friction checkout — and a complete typed API + admin foundation for
> future expansion.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Business Goal & Strategy](#2-business-goal--strategy)
3. [Key Highlights](#3-key-highlights)
4. [Technology Stack](#4-technology-stack)
5. [Complete Folder Structure](#5-complete-folder-structure)
6. [System Architecture](#6-system-architecture)
7. [Data Flow Diagrams](#7-data-flow-diagrams)
8. [Application Workflows](#8-application-workflows)
9. [User Journey](#9-user-journey)
10. [Customer Ordering Flow](#10-customer-ordering-flow)
11. [WhatsApp Ordering Flow](#11-whatsapp-ordering-flow)
12. [Cart Flow](#12-cart-flow)
13. [Checkout Flow](#13-checkout-flow)
14. [Menu Management Flow](#14-menu-management-flow)
15. [Component Architecture](#15-component-architecture)
16. [State Management](#16-state-management)
17. [Routing System](#17-routing-system)
18. [API Documentation](#18-api-documentation)
19. [Database Structure](#19-database-structure)
20. [Environment Variables](#20-environment-variables)
21. [Configuration Files](#21-configuration-files)
22. [UI/UX System](#22-uiux-system)
23. [Performance Optimizations](#23-performance-optimizations)
24. [SEO Strategy](#24-seo-strategy)
25. [Security Considerations](#25-security-considerations)
26. [Deployment Guide](#26-deployment-guide)
27. [Installation Guide](#27-installation-guide)
28. [Development Guide](#28-development-guide)
29. [Maintenance Guide](#29-maintenance-guide)
30. [Troubleshooting Guide](#30-troubleshooting-guide)
31. [Known Limitations](#31-known-limitations)
32. [Future Improvements](#32-future-improvements)
33. [Code Ownership Notes](#33-code-ownership-notes)
34. [Developer Notes](#34-developer-notes)
35. [Project Statistics](#35-project-statistics)
36. [Appendix: Quick Reference](#36-appendix-quick-reference)

---

## 1. Executive Summary

**Khawaja Pizza Club** is a single-page, motion-rich, conversion-optimized
website for a real brick-and-mortar fast-food restaurant located at Thana
Chowk, Shujaabad, Punjab, Pakistan. Its only job is to convert hungry
visitors into WhatsApp orders as quickly and beautifully as possible.

The project is built on **Next.js 16 (App Router) + React 19 + TypeScript +
Tailwind CSS v4 + Framer Motion 12** with **Zustand 5** for the cart store
and **React Hook Form + Zod** for the checkout flow. The entire visual
language is a deliberate **black + gold luxury cinematic theme** that
positions the brand as the premium choice in its market — not the cheapest,
but the best.

Beyond the customer-facing single page, the codebase includes a complete
**typed client for an external backend** (`lib/api/*` with `placeOrder`,
`getOrders`, `getProducts`, `wsService` for realtime updates), **70+
shadcn/ui primitives** ready for an admin dashboard, a **single
serverless API route** that proxies to Unsplash or falls back to
Pollinations.ai for on-demand food photography, and **Docker** packaging
for one-command deployment.

**Key conversion surface:** every product, every deal, and every CTA in the
UI terminates in one of two actions — open a pre-filled WhatsApp order in
a new tab, or scroll the user to the next step in the funnel. There is
no signup, no login, no payment gateway to drop off. The customer just
hits "Place Order", the app builds the message, opens WhatsApp, and the
order lands in the restaurant's inbox.

---

## 2. Business Goal & Strategy

### 2.1 Business Model

| Dimension            | Value                                                              |
|----------------------|--------------------------------------------------------------------|
| **Type**             | Single-location quick-service restaurant                           |
| **Cuisine**          | Pizza, burgers, shawarma, sandwiches, pasta, broast, platters, wraps, appetizers, dipping sauces |
| **Service**          | Dine-in + free home delivery within Shujaabad City                 |
| **Hours**            | 11:00 AM – 1:00 AM (next day), 7 days a week                       |
| **Payment**          | Cash on Delivery (COD) only                                        |
| **Order channel**    | WhatsApp (the restaurant's primary intake)                         |
| **Phone / WhatsApp** | 0301-7723698 / wa.me/923017723698                                  |
| **Avg ticket**       | Rs. 600 – Rs. 2,500 (regular) / up to Rs. 2,800 (family deals)     |
| **Delivery radius**  | Shujaabad City (free)                                              |

### 2.2 Business Goal

**Primary:** convert every site visitor into a paid order by minimizing the
distance between "hungry" and "WhatsApp sent."

**Secondary goals:**

1. **Brand positioning** — establish Khawaja Pizza Club as the **premium**
   fast-food brand in Shujaabad, not the budget option. The black + gold
   luxury UI, 4.9-star social proof, cinematic food photography, and
   "Utterly, Butterly, Delicious" tagline reinforce this positioning
   consistently.
2. **Operational efficiency** — orders arrive in WhatsApp already
   itemized, with subtotal, delivery zone, payment method, and timestamp.
   No manual copy-paste from phone calls.
3. **Defensible moat** — local restaurants compete on price; this site
   competes on **brand experience**, which larger chains and smaller
   competitors cannot easily replicate.

### 2.3 Customer Journey (Top of Funnel → Order)

```
Awareness          ──►  Hero (50K+ orders, 4.9 stars, 15-min delivery)
                       ↓
Interest           ──►  Marquee (popular items with prices)
                       ↓
Desire             ──►  Menu (categories, search, food photography)
                       ↓
Evaluation         ──►  Deals (savings, family bundles)
                       ↓
Trust              ──►  About (brand story) + Reviews (social proof)
                       ↓
Action             ──►  Cart → Checkout → WhatsApp (one tab away)
                       ↓
Confirmation       ──►  Order #, in-realtime updates
```

### 2.4 Sales Funnel (Conversion Surface)

| Stage              | Asset                    | CTA                                  |
|--------------------|--------------------------|--------------------------------------|
| Awareness          | Hero                     | "Order Now" / "View Menu" → #menu    |
| Re-engagement      | Sticky Navbar            | Cart button + "Order Now"            |
| Social proof       | Reviews + Stats          | implicit (trust)                     |
| Scarcity / urgency | Deals (HOT DEAL tags)    | "Add Deal" → Cart                    |
| Friction removal   | Free delivery highlighted| "Proceed to Order"                   |
| Commitment         | Checkout form (4 fields) | "Place Order" → WhatsApp             |
| Retention          | Floating WhatsApp button | always-visible, bounces              |

### 2.5 WhatsApp Conversion Strategy

- **No payment friction** — Cash on Delivery. The only thing the user
  has to do is send the message.
- **Pre-filled message** — the customer never types a single line. They
  just hit "Send" in WhatsApp.
- **Multiple entry points** to the same chat:
  - Hero CTAs (scroll to menu)
  - Navbar cart + "Order Now" buttons
  - Floating WhatsApp button (always visible)
  - Footer "Chat on WhatsApp" link
  - Contact section "Chat Now" card
- **Direct phone**: 0301-7723698 surfaced in 5+ places for users who prefer
  voice.
- **Geo-fenced** delivery message: "Free (Shujaabad City)" reassures
  the customer before they commit.

### 2.6 Menu Organization Strategy

The menu is deliberately **browsable, searchable, and visually scannable**:

- **11 entry points** ("All Items" + 10 categories) keep the user one
  click from any dish.
- **Pizza is broken into 5 sub-categories** (Deep Pan, Signature, Stuff
  Crust, Xtreme, Special) — pizzas are the highest-margin item and
  deserve the most navigation real estate.
- **Variants are exposed in the card** (Small / Medium / Large / XL) so
  the user commits to a specific size and price without leaving the grid.
- **Search is universal** — it matches name, description, category, exact
  price, and price substring. Typing "600" finds everything priced at 600.
- **Badges are color-coded** (Best Seller = gold, Hot = red, New = blue,
  Spicy = orange) so the visual hierarchy is instant.

### 2.7 Pricing Strategy

- **Transparent** — every price is shown in the card; no "starting from"
  obfuscation.
- **Strikethrough on deals** — original price + discounted price +
  absolute savings ("Save Rs. 200") drive the deal-feel.
- **Free delivery** is highlighted in WhatsApp green at every checkout
  surface — a key psychological lever in the local market where delivery
  fees are common.
- **Family bundles** (4 burgers + 1.5L drink, etc.) push average order
  value upward by giving families a clear, well-priced option.

### 2.8 Restaurant Workflow (Back of House)

1. Order arrives in WhatsApp with itemized list, customer details, total,
   COD marker, timestamp.
2. Kitchen prints/reads the order.
3. Delivery is dispatched (Shujaabad City = free, ~30 min avg).
4. Cash collected on delivery.

There is no internal order-management UI in this repo — the restaurant
runs the back office directly from WhatsApp. The `lib/api/*` client is
there for a future dashboard that could automate status updates via
the `wsService` WebSocket.

---

## 3. Key Highlights

- 🍕 **60+ menu items** across 10 categories, with variants, badges, and
  sub-categorization
- 💰 **10 deals** (6 regular + 4 family) with savings indicators
- 🎬 **Cinematic motion design** with Framer Motion 12 — scroll reveals,
  staggered grids, rotating rings, floating cards, animated counters
- 🎨 **Cohesive black + gold OKLCH color system** with no off-brand pixels
- 🧭 **Premium horizontal category navigation** with sliding active
  indicator, keyboard support (Arrow/Home/End/PgUp/PgDn), snap scrolling,
  fade edges, Apple-Mail-style gold scrollbar
- 🔍 **Smart search** across name, description, category, exact price,
  and price substring
- 🛒 **Zustand cart store** with add / remove / qty / clear, slide-in
  sidebar, free-delivery highlight
- 💬 **4-field checkout** (RHF + Zod) → pre-filled WhatsApp order in
  a new tab
- 🌐 **SEO-ready** with JSON-LD `Restaurant` schema, OpenGraph, robots,
  canonical, theme color, viewport
- 📊 **Production-only Vercel Analytics**
- 🖼️ **On-demand cloud images** via a Next.js route handler that
  proxies to Unsplash (or falls back to Pollinations.ai) when local
  assets are not enough
- 🧩 **70+ shadcn/ui primitives** already on disk for an admin
  dashboard
- 🔌 **Typed external API client** (`placeOrder`, `getOrders`,
  `getProducts`, `wsService` with auto-reconnect) — ready for a backend
- 🐳 **One-command Docker deployment**
- ♿ **Accessibility-first**: ARIA tablist, live regions, `prefers-reduced-motion`
  honored, forced-colors scrollbar, focus rings
- 📱 **Dedicated mobile hero** (not a shrunken desktop)
- 🛠️ **Single source of truth** for contact info (`lib/contact.ts`)

---

## 4. Technology Stack

### 4.1 Frontend

| Layer            | Technology                | Version  | Purpose                              |
|------------------|---------------------------|----------|--------------------------------------|
| Framework        | Next.js                   | 16.2.4   | App Router, SSR/SSG, file routing    |
| UI library       | React                     | 19       | Components & rendering               |
| Language         | TypeScript                | 5.7.3    | Type safety (strict mode)            |
| Styling          | Tailwind CSS              | 4.2.0    | Utility-first + OKLCH color          |
| PostCSS plugin   | @tailwindcss/postcss      | 4.2.0    | Tailwind v4 build pipeline           |
| Animations       | Framer Motion             | 12.38.0  | Scroll reveals, hover, layout, springs |
| Animation utilities | tw-animate-css        | 1.3.3    | Extra keyframe utilities             |
| State management | Zustand                   | 5.0.13   | Cart store                           |
| Forms            | react-hook-form           | 7.54.1   | Checkout form                        |
| Validation       | Zod                       | 3.24.1   | Schema validation                    |
| Resolver         | @hookform/resolvers       | 3.9.1    | Zod ↔ RHF bridge                     |
| Icons            | lucide-react              | 0.564.0  | Star, ShoppingCart, MapPin, …        |
| Theme            | next-themes               | 0.4.6    | Future light/dark toggle (mounted)   |
| UI primitives    | Radix UI (via shadcn)     | various  | Accessible headless components       |
| Class utility    | clsx + tailwind-merge     | latest   | `cn()` helper                        |
| Variant utility  | class-variance-authority  | 0.7.1    | `buttonVariants` etc.                |
| Date utilities   | date-fns                  | 4.1.0    | (Pulled in by sonner / shadcn)       |
| Toast            | sonner                    | 1.7.1    | Toast stack (not currently rendered) |

### 4.2 Backend / Server

| Layer            | Technology                | Purpose                              |
|------------------|---------------------------|--------------------------------------|
| Runtime          | Next.js server            | Renders layout, page, API route      |
| API route        | `app/api/images/search`   | Unsplash/Pollinations proxy          |
| Container        | Node 20 Alpine (Docker)   | Production deployment                |
| Image search     | Unsplash API              | Optional, key-gated                  |
| Image generation | Pollinations.ai           | Fallback for image search            |
| Maps             | Google Maps (embed iframe)| Contact section location             |
| Messaging        | wa.me deep link           | Order handoff                        |

### 4.3 Data / Persistence

- **None in this repo.** All customer-facing data is static TypeScript
  arrays in `lib/data/*`. The `lib/api/*` client targets an external
  backend (configurable via `NEXT_PUBLIC_API_URL`) that is **not
  included** in this repository.

### 4.4 Dev Tools

| Tool            | Purpose                                 |
|-----------------|-----------------------------------------|
| pnpm            | Package manager (lockfile committed)    |
| ESLint (via Next) | `pnpm lint` (Next default config)     |
| TypeScript      | Strict type checking                    |
| PostCSS         | CSS pipeline                            |
| shadcn CLI      | Component generation (via components.json) |

### 4.5 Third-Party Services

- **Vercel Analytics** — `https://vercel.com/analytics` (production only)
- **Unsplash** — `https://unsplash.com/developers` (optional)
- **Pollinations.ai** — `https://pollinations.ai` (open image gen)
- **Google Maps Embed** — `https://maps.google.com`

---

## 5. Complete Folder Structure

> Files marked `(dev)` are operator-only development aids and are excluded
> from the Docker image.

```
Khawaja_Pizza_Club_WhatsApp/
│
├── app/                              # Next.js App Router
│   ├── api/
│   │   └── images/
│   │       └── search/
│   │           └── route.ts          # GET /api/images/search?q=&cat=
│   ├── globals.css                   # Design system + 900 lines of CSS
│   ├── layout.tsx                    # Root layout, fonts, JSON-LD, analytics
│   └── page.tsx                      # Home page (composes all sections)
│
├── components/
│   ├── cart/
│   │   ├── CartSidebar.tsx           # Slide-in cart + checkout flow
│   │   ├── CheckoutForm.tsx          # RHF + Zod form, opens WhatsApp
│   │   └── WhatsAppButton.tsx        # Fixed bottom-right floating CTA
│   │
│   ├── layout/
│   │   ├── CursorGlow.tsx            # Mouse-following gold glow (lg+)
│   │   ├── Footer.tsx                # 4-col footer + dev credit
│   │   ├── GlobalParticles.tsx       # 20 floating gold particles
│   │   ├── LoadingScreen.tsx         # First-session brand intro
│   │   ├── Navbar.tsx                # Glass nav, cart, mobile drawer
│   │   └── ScrollProgress.tsx        # Top progress bar
│   │
│   ├── menu/
│   │   ├── CategoryNav.tsx           # Premium scrollable category tabs
│   │   └── ProductCard.tsx           # Menu card with variants + qty
│   │
│   ├── sections/
│   │   ├── AboutSection.tsx          # Story + animated stat counters
│   │   ├── ContactSection.tsx        # Contact cards + Maps iframe
│   │   ├── DealsSection.tsx          # Regular + family deals
│   │   ├── HeroSection.tsx           # Cinematic split hero
│   │   ├── MarqueeSection.tsx        # Auto-scrolling popular items
│   │   ├── MenuSection.tsx           # Tabs, search, sub-cat grouping
│   │   └── ReviewsSection.tsx        # Auto-rotating testimonial carousel
│   │
│   ├── theme-provider.tsx            # next-themes wrapper (mounted stub)
│   │
│   └── ui/                           # 70+ shadcn/ui primitives
│       ├── accordion.tsx
│       ├── alert.tsx · alert-dialog.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx · button-group.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── command.tsx
│       ├── context-menu.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── empty.tsx
│       ├── field.tsx
│       ├── form.tsx
│       ├── hover-card.tsx
│       ├── input.tsx · input-group.tsx · input-otp.tsx
│       ├── item.tsx
│       ├── kbd.tsx
│       ├── label.tsx
│       ├── menubar.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── resizable.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx
│       ├── spinner.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toast.tsx · toaster.tsx
│       ├── toggle.tsx · toggle-group.tsx
│       ├── tooltip.tsx
│       ├── MenuSearch.tsx            # custom, actually used
│       ├── use-mobile.tsx
│       └── use-toast.ts
│
├── hooks/
│   ├── use-counter.ts                # IntersectionObserver counter
│   ├── use-horizontal-scroll.ts      # rAF + Resize + Mutation observer
│   ├── use-mobile.ts                 # < 768px detection
│   ├── use-scroll-progress.ts        # window.scrollY subscriber
│   └── use-toast.ts                  # shadcn toast reducer
│
├── lib/
│   ├── api/                          # Typed external backend client
│   │   ├── client.ts                 # fetch wrapper + Bearer auth
│   │   ├── index.ts                  # barrel
│   │   ├── orders.ts                 # placeOrder, getOrders, ...
│   │   ├── products.ts               # getProducts, getCategories, ...
│   │   └── websocket.ts              # wsService with reconnect
│   │
│   ├── data/                         # Static data (single source of truth)
│   │   ├── deals.ts                  # DEALS + MARQUEE_ITEMS + types
│   │   ├── menu.ts                   # 60+ MENU_ITEMS + categories + sub-cats
│   │   └── restaurant.ts             # RESTAURANT + REVIEWS
│   │
│   ├── store/
│   │   └── cart.ts                   # Zustand cart store
│   │
│   ├── utils/
│   │   ├── animations.ts             # Framer Motion variants
│   │   ├── cloud-images.ts           # /api/images/search caching
│   │   ├── contact-actions.ts        # openInNewTab, openWhatsApp, startCall
│   │   ├── images.ts                 # getProductImage, getDealImage, scoring
│   │   ├── search.ts                 # smartSearch
│   │   └── whatsapp.ts               # generateWhatsAppURL(order)
│   │
│   ├── contact.ts                    # CONTACT + DEV_CONTACT + URLs
│   └── utils.ts                      # cn() helper
│
├── public/
│   ├── hero-food.png                 # Hero food image
│   ├── logo.png                      # Brand logo
│   └── images/
│       ├── about_us_section_image.jpg
│       ├── burger-1.jpg, pizza-1.jpg (legacy fallbacks)
│       ├── Whatsapp Logo.jpg
│       ├── appetizers/  (6 images)
│       ├── broast/      (3 images)
│       ├── burgers/     (9 images)
│       ├── deals/       (10 images: 6 deal + 4 family)
│       ├── pasta/       (10 images)
│       ├── pizzas/      (24 images)
│       ├── platters/    (2 images)
│       ├── sandwiches/  (6 images)
│       ├── shawarma/    (5 images)
│       ├── toppings/    (5 images)
│       └── wrap_rolls/  (4 images)
│
├── styles/
│   └── globals.css                   # Legacy shadcn variables (unused at root)
│
├── scratch/                          # (dev) image sourcing + visual audit
│   ├── download_*.py (5+ scripts)
│   ├── generate_*.py / .mjs (3 scripts)
│   ├── optimize_and_copy_pizzas.py
│   ├── test_pollinations.py
│   └── *.jpg / *.png contact sheets
│
├── .dockerignore
├── .env.local                        # Dev-only env vars
├── .gitignore
├── components.json                   # shadcn/ui config
├── Dockerfile                        # node:20-alpine, port 3000
├── next-env.d.ts
├── next.config.mjs                   # ignoreBuildErrors, unoptimized, headers
├── package.json                      # name, scripts, deps
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.mjs
├── PROJECT_ANALYSIS.md               # Audit dump (not deployed)
├── README.md                         # This file
├── tmp_download_burger_images.py     # (dev) image sourcing helper
├── tmp_test_write.txt                # (dev) smoke test
├── tsconfig.json                     # strict, paths "@/*"
└── tsconfig.tsbuildinfo              # TS incremental build cache
```

---

## 6. System Architecture

### 6.1 High-Level Diagram

```
                                ┌────────────────────────────┐
                                │      Browser (React 19)    │
                                │                            │
                                │  Next.js App Router shell  │
                                │  ├─ Layout (SSR)           │
                                │  └─ Page (client)          │
                                │      ├─ LoadingScreen      │
                                │      ├─ CursorGlow         │
                                │      ├─ Navbar             │
                                │      ├─ HeroSection        │
                                │      ├─ MarqueeSection     │
                                │      ├─ MenuSection  ◄─────┼──┐
                                │      ├─ DealsSection       │  │
                                │      ├─ AboutSection (lazy)│  │
                                │      ├─ ReviewsSection(lazy)│  │
                                │      ├─ ContactSection(lazy)│  │
                                │      ├─ CartSidebar        │  │
                                │      ├─ WhatsAppButton     │  │
                                │      └─ Footer             │  │
                                │                            │  │
                                │  Zustand Cart Store         │  │
                                │  RHF + Zod Checkout         │  │
                                └──────────┬─────────────────┘  │
                                           │                    │
                          new tab           │                    │
                          ┌────────────────▼──────────┐         │
                          │  WhatsApp (wa.me)         │         │
                          │  Restaurant's phone        │         │
                          └────────────────────────────┘         │
                                                                  │
           ┌────────────────────┐         ┌─────────────────────┐ │
           │  /api/images/      │ ──Unsplash──► Unsplash API    │ │
           │  search (route.ts) │ ──Fallback─► Pollinations.ai   │ │
           └────────────────────┘         └─────────────────────┘ │
                                                                  │
           ┌────────────────────┐         (consumed by            │
           │ Optional backend   │  ◄──────  MenuSection)         │
           │ (NOT in this repo) │                                 │
           │ NEXT_PUBLIC_API_URL│                                 │
           └────────────────────┘                                 │
```

### 6.2 Frontend Architecture

- **One page**, composed as a linear scroll.
- **Static data layer** (`lib/data/*`) drives the menu, deals, marquee,
  and reviews.
- **Optional API client** (`lib/api/*`) is mounted by `MenuSection` to
  try to fetch products; on failure, the static data is used.
- **Cart store** is in-memory (Zustand) and is the only global state.
- **All animations** are declarative via Framer Motion variants in
  `lib/utils/animations.ts`.

### 6.3 Backend Architecture

- **No persistent backend in this repo.**
- **One serverless API route** (`/api/images/search`) that:
  - accepts `?q=<text>&cat=<folder>`
  - tries Unsplash (if `UNSPLASH_ACCESS_KEY` is set)
  - falls back to Pollinations.ai
  - returns `{ url, source, alt }`
  - is cached for 24h via `next: { revalidate: 86400 }`
- The `lib/api/*` client targets an external API (configurable via
  `NEXT_PUBLIC_API_URL`) and includes:
  - Bearer auth (admin)
  - WebSocket service with auto-reconnect (3s)
  - Endpoints for products, categories, orders

### 6.4 Data Flow Summary

1. **Static data** (`MENU_ITEMS`, `DEALS`, `REVIEWS`, `RESTAURANT`,
   `MARQUEE_ITEMS`) is bundled at build time.
2. **MenuSection** tries `getProducts()` from the optional API. On
   success, API items are used. On failure, static items are used.
3. **Images** are resolved by a fuzzy matcher (`lib/utils/images.ts`)
   that maps a product name to a local image, or falls back to a
   category default, or finally `/hero-food.png`.
4. **Cart** is mutated in memory; the user always sees fresh totals.
5. **Checkout** validates the form with Zod, optionally POSTs to the
   external API, then opens a `wa.me` URL in a new tab.

### 6.5 Folder Structure Rationale

- `app/` follows Next.js App Router conventions.
- `components/` is split by **purpose** (`cart`, `layout`, `menu`,
  `sections`) and isolates `ui/` primitives — easy to evolve.
- `lib/` is split by **kind of code** (`api`, `data`, `store`, `utils`).
- `hooks/` is small and centralized.
- `public/images/` is organized **by menu category** for direct mapping
  to `MenuItem.category`.

---

## 7. Data Flow Diagrams

### 7.1 Menu Item Resolution

```
MenuItem (static)            MenuItem (from API)
   │                              │
   │                              │  toMenuItem(p: Product)
   │                              │  - map category_id → MenuCategory
   │                              │  - resolve image via fuzzy match
   │                              │  - copy badge / isPopular
   │                              ▼
   └────────────────► displayItems ◄───────── (apiItems ?? MENU_ITEMS)
                          │
                          ▼
                  smartSearch(query)
                          │
                          ▼
                  filteredItems
                          │
                          ▼
                  ProductCard grid
```

### 7.2 Image Resolution

```
ProductCard renders item
   │
   ▼
resolveProductImage(name, category, currentImage)
   │
   ├─► DIRECT_PRODUCT_ALIASES lookup ─► hit? return
   │
   ├─► score all images in same category folder
   │   └─ bestCategoryScore ≥ 40 ? return
   │
   ├─► score ALL images globally
   │   └─ best score ≥ 55 ? return
   │
   └─► category fallback or /hero-food.png
   │
   ▼
   If returned image is a category fallback, kick off
   resolveProductImageCloud(name, category) in background
   │
   ▼
   /api/images/search?q=&cat= (cached in sessionCache)
```

### 7.3 Checkout → WhatsApp

```
CheckoutForm (RHF + Zod)
   │
   ▼  onSubmit
placeOrder(payload)  [optional, best-effort]
   │
   ├─► success: setOrderNumber(result.order_number) → render "Order Placed"
   │           setTimeout(3000ms) → clearCart + closeCart
   │
   └─► failure: skip confirmation, just continue
   │
   ▼
generateWhatsAppURL({name, phone, address, notes, items, subtotal})
   │
   ▼
wa.me/923017723698?text=<encoded message>
   │
   ▼
openExternalURL(waUrl)  → window.open in NEW tab
```

---

## 8. Application Workflows

### 8.1 Page Load Workflow

```
Browser requests /
  │
  ▼
Next.js SSR
  │
  ├─► layout.tsx: Playfair Display + Inter fonts (display:swap, preload)
  │   ├─► <GlobalParticles /> mounted (client-only)
  │   ├─► <body> rendered
  │   └─► <script type="application/ld+json"> for Restaurant schema
  │
  └─► page.tsx: client component hydrates
        ├─► <LoadingScreen /> shows if !sessionStorage.kpc_loaded
        ├─► <CursorGlow /> mounts (lg only)
        ├─► <Navbar /> mounts, writes --navbar-h to <html>
        ├─► <HeroSection /> animates in
        ├─► <MarqueeSection /> starts scrolling
        ├─► <MenuSection /> tries getProducts() → fall back to static
        ├─► <DealsSection /> renders
        ├─► <AboutSection /> lazy-loads (ssr:false)
        ├─► <ReviewsSection /> lazy-loads (ssr:false)
        ├─► <ContactSection /> lazy-loads (ssr:false)
        ├─► <CartSidebar /> mounts (closed by default)
        ├─► <WhatsAppButton /> mounts (fixed bottom-right)
        └─► <Footer /> renders
```

### 8.2 Order Workflow

```
User clicks "Add to Cart" or "Add Deal"
  │
  ▼
ProductCard.handleAdd / DealCard.handleAdd
  │
  ▼
useCartStore.addItem({id, name, price, image, variant?})
  │
  ▼
useCartStore.openCart()
  │
  ▼
CartSidebar slide-in spring animation
  │
  ▼
User reviews items, adjusts qty, removes
  │
  ▼
Click "Proceed to Order"
  │
  ▼
CheckoutForm mounts
  │
  ▼
User fills name, phone, address, notes
  │
  ▼
Click "Place Order"
  │
  ▼
Zod validates
  │
  ├─► invalid: inline errors
  │
  └─► valid:
        ├─► placeOrder(payload) (best-effort)
        ├─► generateWhatsAppURL(order)
        ├─► openExternalURL(waUrl)  // new tab
        └─► clearCart + closeCart
```

---

## 9. User Journey

### 9.1 First-Time Visitor

1. **Lands on `/`.** Sees the **LoadingScreen** (logo pulse → shimmer → name
   → tagline → gold progress bar). After ~2.4s, it exits upward.
2. **Sees the hero.** "Khawaja Pizza Club" in big Playfair gold. Tagline
   "Utterly, Butterly, Delicious." Stats: 50K+ orders, 4.9 rating,
   15 min delivery. Two CTAs: "Order Now" and "View Menu."
3. **Notices the floating WhatsApp button** bouncing in the corner.
4. **Sees the marquee** of popular items with prices scrolling past.
5. **Scrolls to the menu.** The category bar **sticks** to the top under
   the navbar. 11 tabs (All Items + 10 categories). Search bar.
6. **Browses the grid.** Hover a card → glass card glows in category
   color. Variants are clickable in the card itself. Adds a Zinger Burger.
7. **Cart opens** in a slide-in. Reviews, adjusts qty, clicks "Proceed
   to Order."
8. **Fills the checkout form** (4 fields). Hits "Place Order."
9. **WhatsApp opens in a new tab** with a pre-filled order. Hits "Send."
10. **Order placed.** The restaurant has the order on their phone.

### 9.2 Returning Customer

- Sees the **LoadingScreen** once per session (sessionStorage gated).
- Cart is empty (no persistence in this version).

### 9.3 Mobile User

- The hero is **a fully separate mobile layout** with its own rings,
  floating cards, and rating badge.
- The navbar collapses to a hamburger → slide-in drawer.
- The category bar scrolls horizontally.
- The cart becomes a full-width overlay.

---

## 10. Customer Ordering Flow

```
┌──────────────┐
│  Browse Menu │  (All Items or category tab)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Pick Item   │  (variants, qty, badge, image)
└──────┬───────┘
       │ click "Add to Cart"
       ▼
┌──────────────┐
│ Cart Sidebar │  (slide-in, spring)
└──────┬───────┘
       │ review
       ▼
┌──────────────┐
│   Checkout   │  (RHF + Zod: name, phone, address, notes)
└──────┬───────┘
       │ submit
       ▼
┌──────────────┐
│  placeOrder  │  (best-effort API call)
└──────┬───────┘
       │ generateWhatsAppURL
       ▼
┌──────────────┐
│  wa.me open  │  (new tab, pre-filled)
└──────┬───────┘
       │ user taps Send
       ▼
┌──────────────┐
│  Restaurant  │  (order in WhatsApp inbox)
└──────────────┘
```

---

## 11. WhatsApp Ordering Flow

### 11.1 Message Format

```
━━━━━━━━━━━━━━━━━━━━━
🍕 *NEW ORDER — Khawaja Pizza Club*
━━━━━━━━━━━━━━━━━━━━━
👤 *Name:* <name>
📞 *Phone:* <phone>
📍 *Address:* <address>
📝 *Notes:* <notes>          (optional line)
━━━━━━━━━━━━━━━━━━━━━
🛒 *ORDER ITEMS:*
• Real Tikka Pizza (Small) ×1 — Rs. 600
• Zinger Burger ×2 — Rs. 660
• Loaded Fries (Large) ×1 — Rs. 700
━━━━━━━━━━━━━━━━━━━━━
💰 *SUBTOTAL: Rs. 1960*
🚗 *Delivery: Free (Shujaabad City)*
💳 *TOTAL: Rs. 1960*
💵 *Payment: Cash on Delivery*
━━━━━━━━━━━━━━━━━━━━━
⏱ Ordered at: 14:32
📅 Date: 06/05/2026
━━━━━━━━━━━━━━━━━━━━━
```

### 11.2 URL Construction

```ts
// lib/utils/whatsapp.ts
const url = buildWhatsAppURL(message);
// → "https://wa.me/923017723698?text=" + encodeURIComponent(message)
```

The URL is opened with `window.open(url, "_blank", "noopener,noreferrer")`
via `openExternalURL` from `lib/utils/contact-actions.ts`.

### 11.3 Open-URL Guarantees

- **Always a new tab** — the restaurant's site is never replaced.
- **Never `window.location.href` for WhatsApp** — only `tel:` may use it
  (mobile dialers require it).
- **Popup-blocked → silent no-op** — the user can re-click; their
  restaurant tab stays put.
- **SSR-safe** — `typeof window` guards.

---

## 12. Cart Flow

### 12.1 Store API (Zustand)

```ts
useCartStore = {
  items: CartItem[];          // {id, name, price, qty, image, variant?}
  isOpen: boolean;

  addItem(item: Omit<CartItem,"qty">)   // merges by id
  removeItem(id)                        // filters out
  updateQty(id, qty)                    // ≤ 0 removes
  clearCart()
  openCart() / closeCart() / toggleCart()
}
```

### 12.2 Item Identity

```ts
// ProductCard.handleAdd
const cartId = variant
  ? `${item.id}-${variant.label}`   // e.g. "pizza-real-tikka-Small"
  : item.id;                         // e.g. "burger-zinger"
```

This means a user can have the same pizza in two sizes as **two cart
lines** (correct behavior).

### 12.3 Totals

Computed fresh on every render — never stored:

```ts
const subtotal = items.reduce((s, i) => s + Number(i.price) * i.qty, 0);
const total    = subtotal; // free delivery
```

### 12.4 Visual States

- **Empty** → ShoppingBag icon, "Your cart is empty" message, "Browse
  Menu" gold button
- **With items** → list (with +/-, remove, image, name, variant tag,
  line total), subtotal, free delivery, total, "Proceed to Order"
- **Checkout** → header switches to "Your Details"

---

## 13. Checkout Flow

### 13.1 Form Schema (Zod)

```ts
const schema = z.object({
  name:    z.string().min(2, "Name is required (min 2 chars)"),
  phone:   z.string().min(10, "Enter a valid phone number"),
  address: z.string().min(8, "Please provide a full delivery address"),
  notes:   z.string().optional(),
});
```

### 13.2 Submit Pipeline

```ts
async function onSubmit(data) {
  try {
    const result = await placeOrder({
      customer_name: data.name,
      customer_phone: data.phone,
      customer_address: data.address,
      notes: data.notes || "",
      items: items.map((i) => ({
        product_name: i.name,
        quantity: i.qty,
        unit_price: i.price,
        selected_variant: i.variant || "",
      })),
    });
    setOrderNumber(result.order_number);
    const waUrl = generateWhatsAppURL({...data, items, subtotal});
    openExternalURL(waUrl);              // new tab
    setTimeout(() => { clearCart(); closeCart(); }, 3000);
  } catch {
    const waUrl = generateWhatsAppURL({...data, items, subtotal});
    openExternalURL(waUrl);              // new tab (fallback)
    clearCart(); closeCart();
  }
}
```

### 13.3 Success State

- Green checkmark icon
- "Order Placed!" headline
- Order number in gold
- "WhatsApp is opening..." with a spinner

### 13.4 Failure State

- The customer can still place the order via WhatsApp.
- The form is silently consumed; the user gets the same outcome.

---

## 14. Menu Management Flow

### 14.1 Static Data (`lib/data/menu.ts`)

Adding a new menu item is as simple as pushing to `MENU_ITEMS`:

```ts
{
  id: "pizza-new-flavor",
  name: "New Flavor Pizza",
  category: "Pizza",
  description: "…",
  price: null,
  variants: [
    { label: "Small",  price: 600 },
    { label: "Medium", price: 1100 },
    { label: "Large",  price: 1400 },
    { label: "XL",     price: 2050 },
  ],
  image: "/images/pizzas/new_flavor.jpg",
  badge: "New",
  isPopular: false,
  subCategory: "deep-pan",   // only for pizza
}
```

Steps:

1. Drop the image in `public/images/pizzas/new_flavor.jpg` (or use the
   fallback resolver).
2. Add the item to `MENU_ITEMS`.
3. Done — the category tab, search, badge system, and image resolver
   pick it up automatically.

### 14.2 Sub-Category Grouping (Pizza)

Pizza items are grouped by `subCategory`. The grouping config is:

```ts
PIZZA_SUB_CATEGORIES = [
  { key: "deep-pan",       label: "Deep Pan Pizza",   emoji: "🍕" },
  { key: "signature",      label: "Signature Pizza's", emoji: "🔥" },
  { key: "stuff-crust",    label: "Stuff Crust",      emoji: "🧀" },
  { key: "xtreme-special", label: "Xtreme Special",   emoji: "⚡" },
  { key: "special-pizza",  label: "Special Pizza",    emoji: "✨" },
];
```

To add a sub-category:

1. Add a key/label/emoji to the array.
2. Set `subCategory` on the relevant `MENU_ITEMS` entries.
3. The MenuSection will render the new heading automatically.

### 14.3 Deals (`lib/data/deals.ts`)

```ts
{
  id: "deal-7",
  name: "Deal 7",
  type: "regular",      // or "family"
  tag: "BEST VALUE",    // HOT DEAL | MOST POPULAR | BEST VALUE | FAMILY DEAL | NEW
  includes: ["2 Zinger Burgers", "1 Regular Fries", "1 Ltr Next"],
  price: 1100,
  originalPrice: 1400,
  image: "/images/deals/deal_7.jpg",
}
```

### 14.4 Image Resolver Tuning

The fuzzy matcher in `lib/utils/images.ts` is data-driven. To force a
specific image for a product, add an entry to `DIRECT_PRODUCT_ALIASES`:

```ts
"my new dish": "/images/pizzas/super_supreme.jpg",
```

The matcher will short-circuit and use that image.

### 14.5 Adding a New Category

1. Add the literal to the `MenuCategory` union in `lib/data/menu.ts`.
2. Add the label to `MENU_CATEGORIES`.
3. Add a folder under `public/images/<folder>/`.
4. Add an entry to `CATEGORY_FOLDER`, `CATEGORY_FALLBACK`, and
   `CATEGORY_KEYWORDS` in `lib/utils/images.ts`.
5. Add an emoji in `CATEGORY_ICONS` in `MenuSection.tsx`.
6. Tag items with the new `category`.

---

## 15. Component Architecture

### 15.1 Top-Level Composition

`app/page.tsx` is a client component that:

1. Renders global overlays (LoadingScreen, CursorGlow, CartSidebar,
   WhatsAppButton).
2. Renders the Navbar.
3. Composes the page sections in order: Hero → Marquee → Menu → Deals →
   About → Reviews → Contact.
4. Renders the Footer.

`AboutSection`, `ReviewsSection`, and `ContactSection` are dynamically
imported with `ssr: false` to reduce initial bundle.

### 15.2 Section Responsibilities

| Section         | Responsibility                                          |
|-----------------|---------------------------------------------------------|
| `HeroSection`   | Brand presentation, primary CTAs, stats, animated rings |
| `MarqueeSection`| Scrolling ticker of popular items                       |
| `MenuSection`   | Category navigation, search, product grid               |
| `DealsSection`  | Regular + family deals with savings indicators          |
| `AboutSection`  | Brand story, values, animated stat counters             |
| `ReviewsSection`| Auto-rotating customer testimonials                     |
| `ContactSection`| Contact cards + Google Maps                             |

### 15.3 Reusable Systems

- **ProductCard** is the single menu item card; used by both
  `MenuSection` and the deals grid could adopt it.
- **DealCard** is local to `DealsSection` (deals have different fields).
- **MenuSearch** is shared between `MenuSection` and `DealsSection`.
- **CategoryNav** is the premium scrollable tab strip.
- **Animation variants** (`fadeUp`, `staggerContainer`, `slideInRight`,
  `cardHover`, `spring`) are extracted to `lib/utils/animations.ts`.
- **`smartSearch`** is shared between `MenuSection` and `DealsSection`.

### 15.4 Component Dependency Graph

```
page.tsx
  ├─ LoadingScreen
  ├─ CursorGlow
  ├─ Navbar ─────► useCartStore (items, toggleCart)
  ├─ CartSidebar ─► CheckoutForm
  │   └─ CheckoutForm ─► useCartStore, placeOrder, generateWhatsAppURL
  ├─ WhatsAppButton
  ├─ HeroSection
  ├─ MarqueeSection
  ├─ MenuSection
  │   ├─ CategoryNav ─► useHorizontalScroll
  │   ├─ MenuSearch
  │   └─ ProductCard ─► useCartStore, getProductImage, fetchCloudImage
  ├─ DealsSection
  │   ├─ MenuSearch
  │   └─ DealCard (inline) ─► useCartStore
  ├─ AboutSection ─► useCounter
  ├─ ReviewsSection
  ├─ ContactSection
  └─ Footer
```

---

## 16. State Management

### 16.1 Global State (Zustand)

```ts
// lib/store/cart.ts
interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item) => void;
  removeItem: (id) => void;
  updateQty: (id, qty) => void;
  clearCart: () => void;
  openCart / closeCart / toggleCart: () => void;
}
```

Selectors are used to avoid unnecessary re-renders:

```ts
const items = useCartStore((s) => s.items);     // re-renders on items change
const toggleCart = useCartStore((s) => s.toggleCart);  // stable reference
```

### 16.2 Local Component State

| Component          | State                                                  |
|--------------------|--------------------------------------------------------|
| `Navbar`           | `scrolled`, `mobileOpen`                               |
| `MenuSection`      | `active` (tab), `searchQuery`, `apiItems`, `loading`, `isSticky` |
| `CategoryNav`      | `indicator` (geometry)                                 |
| `ProductCard`      | `qty`, `selectedVariantIdx`, `imgSrc`                  |
| `DealsSection`     | `searchQuery`                                          |
| `ReviewsSection`   | `active` (review index), `paused`                      |
| `CartSidebar`      | `showCheckout`                                         |
| `CheckoutForm`     | `orderNumber`, `submitError` (RHF manages form state)  |
| `useCounter`       | `count`, `inView`                                      |
| `useHorizontalScroll` | `canScrollLeft`, `canScrollRight`                   |
| `useScrollY`       | `scrollY`                                              |

### 16.3 Persistence

- **sessionStorage** — `kpc_loaded` flag for LoadingScreen
- **localStorage** — `admin_token` for the future admin API
- **No cart persistence** — refreshing clears the cart

---

## 17. Routing System

### 17.1 App Router Structure

```
app/
  layout.tsx       # Root layout
  page.tsx         # /  (home)
  globals.css      # global styles
  api/
    images/
      search/
        route.ts   # GET /api/images/search
```

### 17.2 In-Page Routing

There is no client-side router. Navigation is via **anchor links** to
section IDs:

| Anchor      | Section            |
|-------------|--------------------|
| `#home`     | HeroSection        |
| `#menu`     | MenuSection        |
| `#deals`    | DealsSection       |
| `#about`    | AboutSection       |
| `#reviews`  | ReviewsSection     |
| `#contact`  | ContactSection     |
| `#marquee`  | MarqueeSection (no CTA to it) |

The `html { scroll-behavior: smooth }` declaration makes navigation
animated.

---

## 18. API Documentation

### 18.1 `GET /api/images/search`

**Source:** `app/api/images/search/route.ts`

**Query parameters:**

| Param | Type   | Required | Description                                  |
|-------|--------|----------|----------------------------------------------|
| `q`   | string | yes      | Food/item description                        |
| `cat` | string | no       | Folder hint (e.g. `pizzas`, `burgers`)       |

**Behavior:**

1. If `UNSPLASH_ACCESS_KEY` is set, queries Unsplash:
   ```
   GET https://api.unsplash.com/search/photos
       ?query=<q + CATEGORY_SUFFIX[cat]>
       &per_page=1
       &orientation=landscape
       &content_filter=high
   ```
   Returns the first hit, resized to 800×600.
2. On any failure (no key, no results, network error), falls back to
   ```
   https://image.pollinations.ai/prompt/<AI_PROMPT(q)>
       ?width=800&height=600&nofeed=true
   ```
   The AI prompt is a hand-tuned restaurant-food prompt with dark luxury
   styling.

**Response:**

```json
{
  "url": "https://images.unsplash.com/...&w=800&h=600&fit=crop",
  "source": "unsplash" | "ai",
  "alt": "alt text"
}
```

**Caching:** `next: { revalidate: 86400 }` (24h)

**CORS / headers:** from `next.config.mjs`:
```
Cache-Control: public, max-age=86400, immutable
```

### 18.2 External Backend Client (`lib/api/*`)

The app is **prepared** to talk to a backend at `NEXT_PUBLIC_API_URL`
(default `http://localhost:8000/api`). All requests include
`Authorization: Bearer <localStorage.admin_token>` when present.

| Function                          | Endpoint                  |
|-----------------------------------|---------------------------|
| `getProducts({category_id, is_available, search})` | `GET /products`         |
| `getProduct(id)`                  | `GET /products/:id`       |
| `getCategories()`                 | `GET /categories`         |
| `placeOrder(input)`               | `POST /orders`            |
| `getOrders({status, limit, offset})` | `GET /orders`           |
| `getOrder(id)`                    | `GET /orders/:id`         |
| `updateOrderStatus(id, status)`   | `PUT /orders/:id/status`  |
| `createWebSocket(path)`           | `WS <NEXT_PUBLIC_WS_URL><path>` |

#### 18.2.1 Types

```ts
interface Product {
  id: number;
  name: string;
  slug: string;
  category_id: number;
  sub_category: string;
  description: string;
  image_url: string;
  price: number | null;
  compare_price: number | null;
  badge: string;
  variants: { label: string; price: number }[];
  is_available: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface OrderInput {
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  notes?: string;
  items: {
    product_id?: number;
    product_name: string;
    quantity: number;
    unit_price: number;
    selected_variant: string;
  }[];
  payment_method?: string;
}

interface OrderResponse {
  id: number;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  customer_id: number | null;
  notes: string;
  subtotal: number;
  delivery_fee: number;
  total: number;
  payment_method: string;
  status: string;
  items: OrderItemResponse[];
  created_at: string;
  updated_at: string;
}
```

#### 18.2.2 WebSocket Service

`lib/api/websocket.ts` exports `wsService` with:

- `connect(path = "/ws/admin")` — opens a connection to
  `<WS_BASE><path>` and auto-reconnects every 3s on close
- `on(type, handler)` — subscribe to messages by `type`
- `disconnect()`

Handlers are called with `message.data` (parsed JSON). A `"*"` type
receives every message.

---

## 19. Database Structure

**There is no database in this repository.** All menu, deal, and review
data is bundled at build time in `lib/data/*.ts`.

The `lib/api/orders.ts` types describe the shape of an order in the
**external** backend (not included):

```
categories
  ├── id (PK)
  ├── name, slug, icon, description
  ├── sort_order, is_active
products
  ├── id (PK)
  ├── name, slug
  ├── category_id (FK → categories)
  ├── sub_category
  ├── description
  ├── image_url
  ├── price, compare_price
  ├── badge
  ├── variants (JSON)
  ├── is_available, is_featured, sort_order
  ├── created_at, updated_at
orders
  ├── id (PK)
  ├── order_number
  ├── customer_name, customer_phone, customer_address
  ├── customer_id (FK → customers)
  ├── notes
  ├── subtotal, delivery_fee, total
  ├── payment_method, status
  ├── created_at, updated_at
order_items
  ├── id (PK)
  ├── order_id (FK → orders)
  ├── product_id (FK → products)
  ├── product_name, quantity, unit_price
  ├── total_price, selected_variant
customers
  ├── id (PK)
  ├── name, phone, address
  ├── (any loyalty fields)
```

This is the **assumed** schema — it is the one that would be served by
the external API the client targets.

---

## 20. Environment Variables

| Variable                  | Required | Default                          | Purpose                                                              |
|---------------------------|----------|----------------------------------|----------------------------------------------------------------------|
| `NEXT_PUBLIC_API_URL`     | No       | `http://localhost:8000/api`     | External API root. Used by `lib/api/client.ts`.                      |
| `NEXT_PUBLIC_WS_URL`      | No       | `ws://localhost:8000/ws`        | WebSocket base. Used by `lib/api/websocket.ts`.                      |
| `UNSPLASH_ACCESS_KEY`     | No       | (none)                          | Enables Unsplash as primary source in `/api/images/search`.          |
| `NODE_ENV`                | Standard | `development`                   | Toggles minification + Vercel Analytics.                            |
| `HOSTNAME` (Docker only)  | No       | `0.0.0.0`                       | Binds the Next.js server to all interfaces in the container.        |
| `PORT` (Docker only)      | No       | `3000`                          | Port the server listens on inside the container.                     |

### 20.1 Where They're Read

| File                                  | Reads                                      |
|---------------------------------------|--------------------------------------------|
| `app/api/images/search/route.ts`      | `UNSPLASH_ACCESS_KEY`                      |
| `lib/api/client.ts`                   | `NEXT_PUBLIC_API_URL`                      |
| `lib/api/websocket.ts`                | `NEXT_PUBLIC_WS_URL`                       |
| `app/layout.tsx`                      | `process.env.NODE_ENV` (analytics gate)    |
| `Dockerfile`                          | `HOSTNAME`, `PORT`                         |

### 20.2 Local Setup

```bash
# .env.local (already committed in this repo as a dev convenience)
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
```

> The committed `.env.local` is for local development only. Production
> should set its own environment through Vercel / Docker / k8s — never
> commit production secrets.

---

## 21. Configuration Files

### 21.1 `package.json`

```jsonc
{
  "name": "my-project",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev":   "next dev",
    "build": "next build",
    "start": "next start",
    "lint":  "eslint ."
  }
}
```

50+ runtime dependencies, 9 dev dependencies. Notable:

- `next 16.2.4`, `react ^19`, `react-dom ^19`
- `tailwindcss 4.2.0`, `@tailwindcss/postcss 4.2.0`
- `framer-motion ^12.38.0`, `zustand ^5.0.13`
- `react-hook-form ^7.54.1`, `zod ^3.24.1`, `@hookform/resolvers ^3.9.1`
- `lucide-react ^0.564.0`
- `next-themes ^0.4.6`
- `@vercel/analytics 1.6.1`
- All Radix UI primitives used by shadcn (`@radix-ui/react-*`)

### 21.2 `tsconfig.json`

```jsonc
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "target": "ES6",
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  }
}
```

- `strict: true` — full type safety
- `paths: { "@/*": ["./*"] }` — every import uses `@/components/...`,
  `@/lib/...`, `@/hooks/...`

### 21.3 `next.config.mjs`

```js
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  images:     { unoptimized: true },
  async headers() {
    return [{
      source: "/api/:path*",
      headers: [
        { key: "Cache-Control", value: "public, max-age=86400, immutable" }
      ],
    }];
  },
};
```

- `ignoreBuildErrors: true` — TypeScript errors do not block the build
  (would be tightened for stricter CI)
- `images.unoptimized: true` — Next.js will not transform images (they
  ship as-is, which is fine because all images are local)
- API responses are cached for 24h at the edge

### 21.4 `postcss.config.mjs`

```js
export default {
  plugins: { '@tailwindcss/postcss': {} },
};
```

### 21.5 `components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils":      "@/lib/utils",
    "ui":         "@/components/ui",
    "lib":        "@/lib",
    "hooks":      "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

### 21.6 `Dockerfile`

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 3000
ENV HOSTNAME="0.0.0.0" PORT=3000
CMD ["node_modules/.bin/next", "start", "-p", "3000", "-H", "0.0.0.0"]
```

### 21.7 `.dockerignore`

Excludes `node_modules`, `.next`, `.git`, `.env*`, `*.tsbuildinfo`,
`public/images`, `scratch`, `tmp_*`, and `pnpm-lock.yaml` (the Dockerfile
uses `npm install`, not pnpm).

### 21.8 `.gitignore`

Excludes v0 sandbox files, `.env*.local`, `node_modules`, `.next`,
`.DS_Store`.

### 21.9 `pnpm-workspace.yaml`

```yaml
allowBuilds:
  sharp: true
```

### 21.10 `next-env.d.ts`

Auto-generated, references `next` and `next/image-types/global`.

---

## 22. UI/UX System

### 22.1 Design Philosophy

**"Luxury-dark minimalism meets street-food energy."**

The site borrows visual cues from premium restaurant brands — dark
backgrounds, gold accents, cinematic lighting — while maintaining the
approachable, warm feel of a local eatery. Every pixel must earn its
place; the entire palette is restricted to black, gold, white, and a
single WhatsApp-green accent.

### 22.2 Visual Personality

- **Bold, confident, premium** — Playfair Display + heavy weights
- **Warm yet edgy** — gold on black evokes both luxury and appetite
- **Hand-crafted** — glass cards, organic floating particles, custom
  marquee, custom scrollbar

### 22.3 Color System (OKLCH)

| Token               | Value                    | Usage                          |
|---------------------|--------------------------|--------------------------------|
| Primary / gold      | `oklch(0.78 0.17 85)`    | Buttons, accents, active states |
| Gold light          | `oklch(0.88 0.14 85)`    | Gradient top                   |
| Gold dark           | `oklch(0.60 0.13 85)`    | Gradient bottom                |
| Background          | `oklch(0.06 0 0)`        | Page                           |
| Card                | `oklch(0.10 0 0)`        | Card surface                   |
| Black glass         | `oklch(0.12 0 0 / 0.7)`  | Translucent overlays           |
| Muted foreground    | `oklch(0.60 0 0)`        | Body copy                      |
| WhatsApp            | `#25D366`                | WhatsApp-specific              |

### 22.4 Layout System

- `max-w-7xl` (1280px) container, centered
- Section padding: `py-16 sm:py-20 lg:py-24`
- Card padding: `p-3 lg:p-4`
- Grid gaps: `gap-2 sm:gap-3 lg:gap-4`

### 22.5 Responsive System

| Breakpoint | Tailwind | Behavior                                |
|------------|----------|-----------------------------------------|
| `< 640px`  | default  | Single column, hamburger, compact cards |
| `640px+`   | `sm:`    | 2-column grids, more padding            |
| `1024px+`  | `lg:`    | Desktop split, 3-col grids, full nav    |
| `1280px+`  | `xl:`    | 4-column product grid                   |

### 22.6 Animation System

| Pattern           | Used in                                         |
|-------------------|-------------------------------------------------|
| Scroll reveal     | All sections via `whileInView`                  |
| Stagger children  | Menu/Deals grids, About stats                   |
| Hover glow        | ProductCard, DealCard, navbar links             |
| Floating/Ping     | Hero floating cards, badges, rings              |
| Rotating rings    | HeroSection (3 rings, 18s/25s/35s)              |
| Spring slide      | CartSidebar, mobile menu, category indicator    |
| Marquee           | MarqueeSection (28s linear)                     |
| Animated counter  | AboutSection stats (IntersectionObserver)       |
| Cursor glow       | CursorGlow (400px radial, spring)               |
| Floating particles| GlobalParticles (20) + HeroSection (35)         |
| Loading sequence  | LoadingScreen (logo → shimmer → name → bar)     |
| Pulse / breathe   | WhatsApp button, glow borders                   |

### 22.7 Interaction Polish

- `cursor-pointer` on every actionable element
- `:hover` color transitions on every nav link and footer link
- `active:scale-95` on buttons for tactile feedback
- `focus-visible` rings on tabs, inputs, buttons
- `prefers-reduced-motion: reduce` is respected everywhere

### 22.8 Accessibility

- ARIA tablist (`role="tablist"`, `aria-selected`, `aria-controls`)
- ARIA live region announces category changes
- `aria-label` on every icon-only button (cart, close, menu toggle,
  review arrows, etc.)
- `prefers-reduced-motion` blocks in CSS + JS
- `prefers-reduced-motion: reduce` in `useHorizontalScroll` switches
  scroll to `"auto"`
- `forced-colors: active` adjusts the scrollbar to system colors
- High contrast text ratios throughout
- Keyboard navigation is full (Tab, Shift+Tab, Enter, Space, Arrows,
  Home, End, PageUp, PageDown)

---

## 23. Performance Optimizations

| Area                | Optimization                                                                 |
|---------------------|------------------------------------------------------------------------------|
| Code splitting      | `next/dynamic` with `ssr: false` for About/Reviews/Contact                  |
| Memoization         | `useMemo` for filtered/searchable/grouped items in Menu + Deals            |
| Event throttling    | `useHorizontalScroll` uses rAF + a settle debounce                          |
| Image loading       | `next/image` with `fill` + `sizes` for responsive srcsets                   |
| Image priority      | Hero image marked `priority`                                                |
| Image fallback      | `onError` swaps to category fallback, no broken layouts                    |
| Image cloud enrichment | Lazy background call only when local is a fallback                       |
| Font loading        | `next/font` with `display: swap`, `preload: true` (no external requests)   |
| Iframe lazy load    | Google Maps iframe uses `loading="lazy"`                                    |
| Script gating       | Vercel Analytics only in production                                         |
| CSS containment     | `overscroll-behavior: contain` on the category strip                        |
| GPU-accelerated anims | `transform`, `opacity` only; `willChange: transform` hinted              |
| `scrollbar-gutter`  | Stable gutter on the category strip prevents layout shift                   |
| `passive: true`     | All scroll listeners are passive                                            |
| Static data         | Bundled at build — no runtime JSON loading                                   |
| API caching         | `/api/*` cached 24h at the edge                                             |

---

## 24. SEO Strategy

### 24.1 Metadata (in `app/layout.tsx`)

```ts
{
  title: "Khawaja Pizza Club — Pizza, Burgers & Fast Food | Shujaabad",
  description: "Order the best pizza and burgers …",
  keywords: ["pizza", "burgers", "fast food", "Shujaabad", "Thana Chowk", "delivery", "shawarma", "Khawaja Pizza Club", "Pakistan"],
  icons: { icon: "/logo.png", shortcut: "/logo.png", apple: "/logo.png" },
  openGraph: {
    title: "Khawaja Pizza Club — Pizza, Burgers & Fast Food",
    description: "Premium Pizza, Burgers & Fast Food — Delivered Fresh in Shujaabad. Utterly, Butterly, Delicious.",
    locale: "en_PK",
    type: "website"
  },
  robots: { index: true, follow: true },
  generator: "v0.app",
  alternates: { canonical: "/" }
}
```

### 24.2 Viewport

```ts
{ themeColor: "#000000", userScalable: true }
```

### 24.3 JSON-LD (Schema.org `Restaurant`)

Injected in `<body>` via `dangerouslySetInnerHTML`:

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Khawaja Pizza Club",
  "image": "/logo.png",
  "url": "/",
  "telephone": "+923017723698",
  "priceRange": "Rs. Rs.",
  "servesCuisine": ["Pizza", "Burgers", "Fast Food", "Shawarma"],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Thana Chowk",
    "addressLocality": "Shujaabad",
    "addressRegion": "Punjab",
    "addressCountry": "PK"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "11:00",
      "closes": "01:00"
    }
  ],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+923017723698",
      "contactType": "customer service",
      "areaServed": "PK",
      "availableLanguage": ["en", "ur"]
    }
  ]
}
```

### 24.4 OpenGraph

A minimal OG block is set; for richer social cards, drop a 1200×630
`og-image.png` into `public/` and reference it.

### 24.5 Sitemap / Robots

No `robots.txt` or `sitemap.xml` is currently committed. Recommended
additions:

```xml
<!-- app/sitemap.ts -->
export default function sitemap() {
  return [{ url: "https://khawajapizzaclub.com/", lastModified: new Date() }];
}
```

```ts
// app/robots.ts
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://khawajapizzaclub.com/sitemap.xml",
  };
}
```

---

## 25. Security Considerations

### 25.1 Secrets

- `UNSPLASH_ACCESS_KEY` is a server-side secret — only read inside the
  route handler. Never exposed to the browser.
- `admin_token` (when used) is read from `localStorage` and attached
  as a Bearer token. This is acceptable for an admin UI but should be
  replaced with HttpOnly cookies if/when a real backend is added.

### 25.2 Open-Window Policy

- All external links (`wa.me`, `maps.google.com`) use
  `target="_blank" rel="noopener noreferrer"`.
- `openExternalURL` / `openInNewTab` enforce the same semantics for
  non-anchor triggers.
- `tel:` is the **only** URL ever assigned to `window.location.href`
  (mobile dialers require it).

### 25.3 Input Validation

- The checkout form is fully validated by Zod **before** any side
  effect (no API call, no WhatsApp open).
- The phone field is a plain string with a min length of 10; the
  Pakistani phone format (`03XX-XXXXXXX`) is not enforced — the
  restaurant can recognize the leading `0` and dial correctly.

### 25.4 XSS / Injection

- All text in the React tree is auto-escaped by React.
- `dangerouslySetInnerHTML` is used **once** for the JSON-LD
  `<script>` block. The string is `JSON.stringify(jsonLd)`, which
  cannot inject HTML.
- The `sessionStorage` key is a hard-coded string; nothing
  user-controlled flows into it.

### 25.5 Dependency Hygiene

- All Radix UI primitives, lucide-react, and Framer Motion are widely
  audited.
- `pnpm-lock.yaml` is committed for reproducible builds.
- `npm install --legacy-peer-deps` is used in the Dockerfile to
  tolerate peer-dep mismatches (e.g. React 19 with libraries still
  expecting React 18).

### 25.6 Privacy

- No third-party tracking cookies.
- Vercel Analytics is **cookieless** by default.
- No data leaves the browser except: the `placeOrder` API call (if a
  backend is configured) and the `wa.me` handoff (which the user
  initiates).

---

## 26. Deployment Guide

### 26.1 Vercel (Recommended)

1. Push the repo to GitHub.
2. Import the project in Vercel.
3. Vercel auto-detects Next.js — no config needed.
4. Optionally set:
   - `UNSPLASH_ACCESS_KEY` (Environment Variables)
   - `NEXT_PUBLIC_API_URL` (if you have a backend)
   - `NEXT_PUBLIC_WS_URL`
5. Deploy.

### 26.2 Docker

```bash
docker build -t khawaja-pizza-club .
docker run -p 3000:3000 \
  -e HOSTNAME=0.0.0.0 \
  -e PORT=3000 \
  -e UNSPLASH_ACCESS_KEY=... \
  khawaja-pizza-club
```

The image:

- Uses `node:20-alpine` (small, secure)
- Exposes port 3000
- Runs `next start -p 3000 -H 0.0.0.0` so it binds on all interfaces
- Excludes the local `public/images/` from build context (it still
  copies them via `COPY . .` — adjust `.dockerignore` if you want
  to slim further)

### 26.3 Manual (Node)

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm start
```

### 26.4 Reverse Proxy (nginx example)

```nginx
server {
  listen 80;
  server_name khawajapizzaclub.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

### 26.5 CDN Recommendations

- **Static images** — serve from `/public/images/` via a CDN edge
  (Vercel does this automatically; Cloudflare/Fastly work too).
- **Fonts** — already self-hosted via `next/font`.
- **API caching** — `Cache-Control: public, max-age=86400, immutable`
  is already set on `/api/*`.

---

## 27. Installation Guide

### 27.1 Prerequisites

- **Node.js 20+** (Dockerfile uses `node:20-alpine`)
- **pnpm 9+** (recommended) — `npm install -g pnpm`
- **Git**

### 27.2 Steps

```bash
# 1. Clone
git clone <repository-url> khawaja-pizza-club
cd khawaja-pizza-club

# 2. Install
pnpm install            # or: npm install

# 3. (Optional) configure environment
cp .env.local .env      # or edit .env.local directly

# 4. Run dev server
pnpm dev                # http://localhost:3000

# 5. Production build
pnpm build
pnpm start
```

### 27.3 First-Time Verification

Open `http://localhost:3000` and check:

- Loading screen plays once
- Hero animates in
- Scrolling reveals each section
- Adding a product to cart slides in the cart sidebar
- Proceeding to checkout, filling the form, and submitting opens
  WhatsApp in a new tab with the pre-filled message
- The floating WhatsApp button bounces in the corner
- The Google Maps iframe loads
- The reviews carousel auto-rotates

### 27.4 Mobile Verification

Open Chrome DevTools → toggle device toolbar → iPhone 14 Pro / Pixel 7.
Verify:

- Hamburger menu opens the drawer
- Hero shows the dedicated mobile visual
- Cart is full-width
- Category tabs scroll horizontally

---

## 28. Development Guide

### 28.1 Code Conventions

- **TypeScript strict** — no `any` in production code (the API client
  uses `any` in the WebSocket handler; the rest is typed).
- **Path aliases** — use `@/components/...`, `@/lib/...`, `@/hooks/...`
- **No `useEffect` for derived state** — use `useMemo`.
- **No global state for UI** — only the cart is in Zustand.
- **Animations** — import variants from `@/lib/utils/animations`.
- **Search** — use `smartSearch` from `@/lib/utils/search`.
- **Images** — never hard-code URLs; use the resolver in
  `@/lib/utils/images`.
- **Contact info** — never hard-code the phone; import from
  `@/lib/contact`.

### 28.2 Adding a New Section

1. Create `components/sections/NewSection.tsx`.
2. Use the `fadeUp` / `staggerContainer` variants.
3. Add an `<h2>` with `clamp(1.8rem, 4vw, 2.8rem)` and the gold
   shimmer treatment.
4. Add it to `app/page.tsx`:
   ```tsx
   <NewSection />
   ```
5. If it's below the fold, dynamic-import:
   ```tsx
   const NewSection = dynamic(() => import("@/components/sections/NewSection"), { ssr: false });
   ```

### 28.3 Adding a New Hook

Create `hooks/use-newthing.ts`. Use the `"use client"` directive at the
top. Export the hook as a named export.

### 28.4 Adding a New shadcn Primitive

```bash
npx shadcn@latest add <component>
```

The defaults are already configured in `components.json`.

### 28.5 Debugging Tips

- **`--navbar-h`** is set on `<html>` by the Navbar. The sticky
  category bar consumes it.
- **Image resolution** — log the result of `resolveProductImage(name,
  category)` to debug the fuzzy matcher.
- **Cart state** — open React DevTools, inspect the Zustand store
  via the `useCartStore` symbol.
- **Animations** — install the Framer Motion DevTools panel.

### 28.6 Linting

```bash
pnpm lint
```

(No custom ESLint config is committed; Next's defaults apply.)

---

## 29. Maintenance Guide

### 29.1 Routine Tasks

| Task                          | How                                                         |
|-------------------------------|-------------------------------------------------------------|
| Update menu                   | Edit `lib/data/menu.ts`                                     |
| Update deals                  | Edit `lib/data/deals.ts`                                    |
| Update reviews                | Edit `lib/data/restaurant.ts` (`REVIEWS`)                   |
| Update business phone         | Edit `lib/contact.ts` (`CONTACT`)                           |
| Update business hours         | Edit `lib/data/restaurant.ts` (`RESTAURANT.hours`)          |
| Add a category                | Update `MenuCategory` union, `MENU_CATEGORIES`, image folders, `CATEGORY_FOLDER`/`CATEGORY_FALLBACK`/`CATEGORY_KEYWORDS` |
| Update opening hours          | Edit `app/layout.tsx` JSON-LD `openingHoursSpecification` AND `RESTAURANT.hours` (both) |
| Add a stat counter to About   | Add a `<StatCounter target={...} suffix="..." label="..." />` in `AboutSection.tsx` |

### 29.2 Upgrading Dependencies

```bash
pnpm update --interactive
```

Be cautious with:

- **Tailwind v4** is bleeding-edge — major version upgrades can
  require CSS changes.
- **Next.js** major versions (15 → 16) occasionally change App Router
  behavior.
- **Framer Motion** is now `motion` on v12+ — current code uses
  `framer-motion` (legacy name).

### 29.3 Refreshing Local Images

The `scratch/` directory contains the original image sourcing
pipeline. To refresh a category:

```bash
# Edit scratch/download_burgers.py with new Pexels URLs
python scratch/download_burgers.py
# Move the images to public/images/burgers/
```

For Bonfire Pizza (AI-generated), see `scratch/test_pollinations.py`
and `scratch/generate_and_upload_pizzas.py`.

### 29.4 Quarterly Review Checklist

- [ ] Update `RESTAURANT.hours` for seasonal hours
- [ ] Refresh `REVIEWS` (rotate out old ones, add new testimonials)
- [ ] Add/remove menu items based on popularity
- [ ] Update deal prices for the season
- [ ] Verify Unsplash API key is still valid
- [ ] Check Vercel Analytics for funnel drop-offs
- [ ] Test the full ordering flow on mobile

---

## 30. Troubleshooting Guide

### 30.1 "WhatsApp doesn't open"

- The popup is blocked. The code already no-ops on popup-block; advise
  the user to allow popups for the site.
- On iOS Safari, `window.open` after a user gesture works; the click
  handler is the gesture. If you call `openExternalURL` from a
  `setTimeout`, the gesture context is lost.

### 30.2 "Images are missing"

- The local image is missing and the cloud fallback hasn't been
  triggered. Open Network tab and look for `/api/images/search`.
- The `UNSPLASH_ACCESS_KEY` may be missing — Pollinations.ai will be
  used but may rate-limit.

### 30.3 "Cart is empty after refresh"

- Expected. The cart is in-memory only. Add `zustand/middleware`'s
  `persist` to `lib/store/cart.ts` to fix.

### 30.4 "Sticky category bar overlaps the navbar"

- The `--navbar-h` CSS variable is published by `Navbar` on mount.
  If you mount the category bar outside the navbar tree, you'll need
  to set the variable yourself.

### 30.5 "Loading screen shows every refresh"

- `sessionStorage` is per-tab and is cleared on tab close. The
  `kpc_loaded` flag persists for the tab lifetime — this is the
  intended behavior.

### 30.6 "Google Maps iframe is blank"

- The Maps embed can be blocked by ad blockers. The fallback is the
  "Get Directions" button which opens maps.google.com in a new tab.

### 30.7 "Vercel Analytics isn't showing data"

- Analytics only loads in production. Check `NODE_ENV=production` is
  set during build.

### 30.8 "TypeScript build fails"

- The repo has `typescript.ignoreBuildErrors: true` in
  `next.config.mjs` — the build will succeed even with TS errors.
  Run `pnpm tsc --noEmit` locally to find them.

---

## 31. Known Limitations

1. **No backend** in this repo. Orders are dispatched to WhatsApp only.
2. **No cart persistence** — refresh clears the cart.
3. **No tests** — no Jest/Vitest/Playwright config exists.
4. **`images.unoptimized: true`** — no automatic WebP/AVIF conversion.
5. **`typescript.ignoreBuildErrors: true`** — TS errors are non-fatal.
6. **Theme provider is mounted as a stub** — light mode is not
   implemented; the site is dark by design.
7. **Single language** — UI copy is English; reviews are mixed
   Urdu/English. No i18n infrastructure is wired up.
8. **No PWA** — no service worker, no manifest.
9. **No admin UI** — the typed client (`lib/api/*`) is ready, but no
   admin pages exist.
10. **No analytics on conversion** — Vercel Analytics tracks page
    views; "WhatsApp open" events are not yet instrumented.

---

## 32. Future Improvements

### 32.1 Short-Term

- [ ] **Cart persistence** with `zustand/middleware`'s `persist`
- [ ] **`sitemap.ts` and `robots.ts`** for SEO completeness
- [ ] **OG image** (`/public/og.png`) at 1200×630
- [ ] **PWA manifest** + service worker
- [ ] **Conversion tracking** — fire an event when WhatsApp opens
  from checkout

### 32.2 Medium-Term

- [ ] **Admin dashboard** (using the existing 70+ shadcn primitives):
  - Order management (live via `wsService`)
  - Menu editor
  - Deal editor
  - Review moderation
- [ ] **Real backend** (FastAPI / Django / Next.js route handlers)
  with Postgres
- [ ] **i18n** (English + Urdu) using `next-intl`
- [ ] **Real order tracking** with status updates pushed via the
  existing `wsService`
- [ ] **Loyalty program** with points and rewards

### 32.3 Long-Term

- [ ] **Online payments** (Stripe, JazzCash, Easypaisa)
- [ ] **Multi-location** with branch selector
- [ ] **Reservation system** for dine-in
- [ ] **Push notifications** for order status
- [ ] **Native apps** (React Native reusing the design system)

---

## 33. Code Ownership Notes

- **Original design & development:** Ahmad Dogar
- **Brand:** Khawaja Pizza Club (Thana Chowk, Shujaabad, Pakistan)
- **Image sourcing:** see `scratch/` scripts (Pexels + Pollinations.ai)
- **Contact data is split strictly:**
  - **Business contact** (`CONTACT`, `CONTACT_URLS`) — the restaurant's
    number, used everywhere except the developer signature.
  - **Developer contact** (`DEV_CONTACT`, `DEV_CONTACT_URLS`) — the
    developer (Ahmad Dogar), used **only** in the "Designed &
    Developed By" footer section.

---

## 34. Developer Notes

- The repository was bootstrapped with **v0.app** (see
  `metadata.generator`). It is now production code.
- The codebase was scaffolded against the **shadcn/ui "new-york"
  style** with the **neutral** base color and **lucide** icons.
- The design system is intentionally opinionated. **Do not introduce
  additional colors** without a design review.
- The site is dark by design; resist the urge to add a light-mode
  toggle unless the business asks for one.
- All contact information lives in **one** file (`lib/contact.ts`).
  Edit there.
- All static data lives in `lib/data/*`. Edit there.
- All animation variants live in `lib/utils/animations.ts`. Add new
  ones there.
- The fuzzy image matcher (`lib/utils/images.ts`) is data-driven; tune
  scores and aliases rather than hard-coding URLs in menu data.

---

## 35. Project Statistics

| Metric                                 | Count                              |
|----------------------------------------|------------------------------------|
| Menu items (static)                    | 60+                                |
| Categories                             | 10 + "All Items" tab = 11          |
| Pizza sub-categories                   | 5                                  |
| Deals                                  | 10 (6 regular + 4 family)          |
| Marquee items                          | 8                                  |
| Reviews                                | 6                                  |
| Image assets in `/public/images/`      | ~70                                |
| Pages                                  | 1 (`/`)                            |
| API routes                             | 1 (`/api/images/search`)           |
| Production components                  | ~25                                |
| shadcn/ui primitives on disk           | 70+                                |
| Hooks                                  | 5                                  |
| Stores                                 | 1 (Zustand cart)                   |
| External integrations (optional)       | 2 (Unsplash, Pollinations.ai)      |
| External integrations (always)         | 3 (WhatsApp, Google Maps, Vercel Analytics) |
| Runtime dependencies                   | 50+                                |
| Dev dependencies                       | 9                                  |
| Total lines of CSS (app/globals.css)   | 927                                |
| Approx lines of code (TS/TSX, ex. UI)  | ~3,500                             |

---

## 36. Appendix: Quick Reference

### 36.1 Commands

| Command          | Description                                |
|------------------|--------------------------------------------|
| `pnpm install`   | Install dependencies                       |
| `pnpm dev`       | Start dev server (http://localhost:3000)   |
| `pnpm build`     | Production build                           |
| `pnpm start`     | Run the production build                   |
| `pnpm lint`      | Run ESLint (Next.js default config)        |
| `docker build`   | Build the container                        |
| `docker run`     | Run the container                          |

### 36.2 Tech Stack at a Glance

| Layer       | Technology                                  |
|-------------|---------------------------------------------|
| Framework   | Next.js 16 (App Router)                     |
| UI          | React 19                                    |
| Language    | TypeScript 5.7 (strict)                     |
| Styling     | Tailwind CSS v4                             |
| Animations  | Framer Motion 12                            |
| State       | Zustand 5                                   |
| Forms       | React Hook Form + Zod                       |
| Icons       | lucide-react                                |
| UI kit      | Radix UI + shadcn/ui                        |
| Analytics   | Vercel Analytics                            |
| Server      | Standalone Next.js (Node 20 Alpine)         |
| Container   | Docker                                      |
| Package mgr | pnpm                                        |

### 36.3 Data File Exports

| File                       | Exports                                                         |
|----------------------------|-----------------------------------------------------------------|
| `lib/data/menu.ts`         | `MENU_ITEMS`, `MENU_CATEGORIES`, `PIZZA_SUB_CATEGORIES`, `MenuItem`, `MenuCategory` |
| `lib/data/deals.ts`        | `DEALS`, `MARQUEE_ITEMS`, `DealItem`                            |
| `lib/data/restaurant.ts`   | `RESTAURANT`, `REVIEWS`                                         |
| `lib/contact.ts`           | `CONTACT`, `CONTACT_URLS`, `DEV_CONTACT`, `DEV_CONTACT_URLS`, `buildWhatsAppURL`, `buildDeveloperWhatsAppURL` |
| `lib/store/cart.ts`        | `useCartStore`, `CartItem`                                      |
| `lib/api/index.ts`         | `api`, `createWebSocket`, `ApiError`, `getProducts`, `getProduct`, `getCategories`, `placeOrder`, `getOrders`, `getOrder`, `updateOrderStatus`, `wsService` |
| `lib/utils/search.ts`      | `smartSearch`, `getSearchPlaceholder`                           |
| `lib/utils/whatsapp.ts`    | `generateWhatsAppURL`, `CONTACT_URLS`                           |
| `lib/utils/images.ts`      | `getProductImage`, `getDealImage`, `getCategoryFallbackImage`, `resolveProductImage`, `resolveDealImage`, `resolveProductImageCloud`, `isCategoryFallback` |
| `lib/utils/animations.ts`  | `fadeUp`, `fadeIn`, `scaleUp`, `staggerContainer`, `slideInRight`, `cardHover`, `spring` |
| `lib/utils/contact-actions.ts` | `openInNewTab`, `openExternalURL`, `openWhatsApp`, `openDeveloperWhatsApp`, `startCall` |

### 36.4 Design Tokens Cheat-Sheet

```css
--background:    oklch(0.06 0 0)
--card:          oklch(0.10 0 0)
--foreground:    oklch(0.97 0 0)
--primary:       oklch(0.78 0.17 85)        /* gold */
--accent:        oklch(0.78 0.17 85)
--muted-foreground: oklch(0.60 0 0)
--whatsapp:      #25D366

--gold-light:    oklch(0.88 0.14 85)
--gold-dark:     oklch(0.60 0.13 85)
--black-deep:    oklch(0.04 0 0)
--black-card:    oklch(0.10 0 0)
--black-glass:   oklch(0.12 0 0 / 0.7)
--glass-border:  oklch(0.78 0.17 85 / 0.2)

--glow-sm: 0 0 10px oklch(0.78 0.17 85 / 0.30)
--glow-md: 0 0 20px oklch(0.78 0.17 85 / 0.40)
--glow-lg: 0 0 40px oklch(0.78 0.17 85 / 0.50)
```

### 36.5 URL Shortcuts

| URL                                   | Purpose                          |
|---------------------------------------|----------------------------------|
| `/`                                   | Home (single page)               |
| `/api/images/search?q=&cat=`          | Image proxy                      |
| `https://wa.me/923017723698`          | Restaurant's WhatsApp            |
| `tel:+923017723698`                   | Restaurant's phone (E.164)       |
| `https://maps.google.com/?q=…`        | Directions to Thana Chowk        |

### 36.6 Keyboard Shortcuts (Category Tabs)

| Key            | Action                            |
|----------------|-----------------------------------|
| `Tab` / `Shift+Tab` | Move focus in/out of tablist |
| `←` / `→`      | Previous / next tab               |
| `Home`         | First tab                         |
| `End`          | Last tab                          |
| `PageUp`       | Jump back 3 tabs                  |
| `PageDown`     | Jump forward 3 tabs               |
| `Enter` / `Space` | Activate focused tab           |

---

*This README is the single source of truth for the Khawaja Pizza Club
WhatsApp Ordering System. For the raw audit dump, see
`PROJECT_ANALYSIS.md`. For questions, contact the developer
(Ahmad Dogar) via the link in the footer of the live site.*
