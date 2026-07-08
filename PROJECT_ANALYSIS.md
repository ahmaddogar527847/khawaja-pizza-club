# PROJECT_ANALYSIS — Khawaja Pizza Club WhatsApp

> Internal audit document — single source of raw findings captured during the
> full-codebase review. This file is intentionally verbose; it feeds the
> production-grade `README.md` and is the canonical record of what exists in
> the repository on the audit date.

---

## 0. Project Identity Snapshot

| Key              | Value                                                                                |
|------------------|--------------------------------------------------------------------------------------|
| Project name     | `my-project` (internal npm name) / brand: **Khawaja Pizza Club**                     |
| Version          | `0.1.0` (private, non-published)                                                     |
| Type             | Single-page restaurant web app with WhatsApp ordering                                |
| Business         | Premium Pizza, Burgers & Fast Food — Thana Chowk, Shujaabad, Pakistan                |
| Tagline          | "Utterly, Butterly, Delicious"                                                       |
| Phone (display)  | 0301-7723698                                                                         |
| WhatsApp         | wa.me/923017723698                                                                   |
| Hours            | Open Daily — 11:00 AM to 1:00 AM (next day)                                          |
| Delivery         | Free within Shujaabad City                                                           |
| Coordinates      | 29.8809, 71.2934 (Google Maps embed)                                                 |
| Currency         | PKR (Rs.) throughout                                                                 |
| Target audience  | Residents of Shujaabad & surrounding areas                                          |
| Package manager  | pnpm (lockfile present)                                                              |
| Framework        | Next.js 16.2.4 (App Router, RSC, no API usage from frontend)                        |
| UI library       | React 19                                                                             |
| Styling          | Tailwind CSS v4.2.0 + `tw-animate-css` + handcrafted CSS in `app/globals.css`        |
| State management | Zustand 5 (cart store) + React local state                                           |
| Forms / validation | react-hook-form 7 + Zod 3                                                          |
| Animations       | Framer Motion 12                                                                     |
| Icons            | lucide-react 0.564                                                                   |
| Analytics        | @vercel/analytics 1.6.1 (production-only)                                            |
| Theming          | next-themes 0.4.6 wrapper exists but is not wired to the layout                      |
| UI primitives    | Full shadcn/ui set in `components/ui/` (70+ files). Only `MenuSearch` is consumed.   |
| Build tool       | Next.js built-in                                                                     |
| Server           | Standalone Next.js server (Node 20 Alpine Docker image)                              |
| Database         | None in this repo; an external `NEXT_PUBLIC_API_URL` is configured but the app falls back to local data when it is unreachable. |
| Deployment       | Docker container, Vercel-ready, pnpm works for dev                                   |

---

## 1. Repository Tree (production view, ignoring scratch & .next)

```
Khawaja_Pizza_Club_WhatsApp/
├── app/
│   ├── api/
│   │   └── images/
│   │       └── search/
│   │           └── route.ts        # GET /api/images/search?q=&cat=
│   ├── globals.css                 # 927 lines: design system + animations
│   ├── layout.tsx                  # Root layout, fonts, JSON-LD, analytics
│   └── page.tsx                    # Home page (single page, composes all sections)
│
├── components/
│   ├── cart/
│   │   ├── CartSidebar.tsx         # Slide-in cart with checkout flow
│   │   ├── CheckoutForm.tsx        # RHF + Zod form, opens WhatsApp on submit
│   │   └── WhatsAppButton.tsx      # Fixed bottom-right floating CTA
│   │
│   ├── layout/
│   │   ├── CursorGlow.tsx          # 400px mouse-following gold glow (lg+ only)
│   │   ├── Footer.tsx              # 4-column footer + dev credit
│   │   ├── GlobalParticles.tsx     # 20 gold particles floating across viewport
│   │   ├── LoadingScreen.tsx       # First-session brand intro (sessionStorage gated)
│   │   ├── Navbar.tsx              # Glass nav with cart, mobile drawer, --navbar-h pub
│   │   └── ScrollProgress.tsx      # Top progress bar (Framer Motion springs)
│   │
│   ├── menu/
│   │   ├── CategoryNav.tsx         # Premium scrollable category tabs (keyboard, snap, etc.)
│   │   └── ProductCard.tsx         # Glass menu card with variants, qty, add-to-cart
│   │
│   ├── sections/
│   │   ├── AboutSection.tsx        # Story + animated stat counters (lazy)
│   │   ├── ContactSection.tsx      # Contact cards + Google Maps iframe (lazy)
│   │   ├── DealsSection.tsx        # Combo + family deals grid with savings badges
│   │   ├── HeroSection.tsx         # Cinematic split hero with floating cards
│   │   ├── MarqueeSection.tsx      # Auto-scrolling popular-items ticker
│   │   ├── MenuSection.tsx         # Tabs, search, sub-cat grouping, animated grid
│   │   └── ReviewsSection.tsx      # Auto-rotating testimonial carousel (lazy)
│   │
│   ├── theme-provider.tsx          # next-themes wrapper (currently unused at layout)
│   │
│   └── ui/                         # 70+ shadcn primitives (see Section 6)
│       ├── accordion.tsx, alert.tsx, alert-dialog.tsx, aspect-ratio.tsx, avatar.tsx,
│       │   badge.tsx, breadcrumb.tsx, button.tsx, button-group.tsx, calendar.tsx,
│       │   card.tsx, carousel.tsx, chart.tsx, checkbox.tsx, collapsible.tsx,
│       │   command.tsx, context-menu.tsx, dialog.tsx, drawer.tsx, dropdown-menu.tsx,
│       │   empty.tsx, field.tsx, form.tsx, hover-card.tsx, input.tsx, input-group.tsx,
│       │   input-otp.tsx, item.tsx, kbd.tsx, label.tsx, menubar.tsx,
│       │   navigation-menu.tsx, pagination.tsx, popover.tsx, progress.tsx,
│       │   radio-group.tsx, resizable.tsx, scroll-area.tsx, select.tsx,
│       │   separator.tsx, sheet.tsx, sidebar.tsx, skeleton.tsx, slider.tsx,
│       │   sonner.tsx, spinner.tsx, switch.tsx, table.tsx, tabs.tsx, textarea.tsx,
│       │   toast.tsx, toaster.tsx, toggle.tsx, toggle-group.tsx, tooltip.tsx,
│       │   MenuSearch.tsx (custom), use-mobile.tsx, use-toast.ts
│
├── hooks/
│   ├── use-counter.ts              # IntersectionObserver-triggered easeOut counter
│   ├── use-horizontal-scroll.ts    # rAF + ResizeObserver + MutationObserver scroll hook
│   ├── use-mobile.ts               # matchMedia breakpoint helper
│   ├── use-scroll-progress.ts      # window.scrollY subscriber
│   └── use-toast.ts                # shadcn toast reducer (reducer + listeners)
│
├── lib/
│   ├── api/
│   │   ├── client.ts               # fetch wrapper with Bearer admin_token auth
│   │   ├── index.ts                # barrel export
│   │   ├── orders.ts               # placeOrder, getOrders, getOrder, updateOrderStatus
│   │   ├── products.ts             # getProducts, getProduct, getCategories (Product, Category, ProductVariant)
│   │   └── websocket.ts            # wsService class with reconnect, handler registry
│   │
│   ├── data/
│   │   ├── deals.ts                # DEALS (10 items) + MARQUEE_ITEMS (8) + types
│   │   ├── menu.ts                 # 60+ MENU_ITEMS + MENU_CATEGORIES + PIZZA_SUB_CATEGORIES
│   │   └── restaurant.ts           # RESTAURANT + 6 REVIEWS
│   │
│   ├── store/
│   │   └── cart.ts                 # Zustand cart store: items, isOpen, actions
│   │
│   ├── utils/
│   │   ├── animations.ts           # fadeUp, fadeIn, scaleUp, staggerContainer, slideInRight, cardHover, spring
│   │   ├── cloud-images.ts         # sessionCache + pendingFetches for /api/images/search
│   │   ├── contact-actions.ts      # openInNewTab, openWhatsApp, openDeveloperWhatsApp, startCall
│   │   ├── images.ts               # getProductImage, getDealImage, scoring algorithm, fallbacks
│   │   ├── search.ts               # smartSearch + getSearchPlaceholder
│   │   └── whatsapp.ts             # generateWhatsAppURL(order) → wa.me deep link
│   │
│   ├── contact.ts                  # CONTACT + DEV_CONTACT + URLs + buildWhatsAppURL helpers
│   └── utils.ts                    # cn() = twMerge(clsx(...))
│
├── public/
│   ├── hero-food.png               # hero food image
│   ├── logo.png                    # brand logo
│   ├── images/
│   │   ├── about_us_section_image.jpg
│   │   ├── burger-1.jpg, pizza-1.jpg (legacy fallback candidates)
│   │   ├── Whatsapp Logo.jpg       # WhatsApp logo for buttons
│   │   ├── appetizers/  (6 jpg: baked_wings, crispy_wings, hot_shot, loaded_fries, nuggets, reg_fries)
│   │   ├── broast/      (3 jpg: chicken_chest, chicken_leg, roghni_nan)
│   │   ├── burgers/     (9 jpg: chicken_patty, crunch, khawaja_special_zinger, mighty_zinger, special_zinger, tower, zinger, zinger_cheese, zinger_chipotle)
│   │   ├── deals/       (10 jpg: deal_1..6 + family_deal_1..4)
│   │   ├── pasta/       (10 jpg: crunchy, flaming, kabab, kabab_candidate_*5, lasagna, plain)
│   │   ├── pizzas/      (24 jpg: all pizza variants)
│   │   ├── platters/    (2 jpg: behari_roll_platter, sandwich_platter)
│   │   ├── sandwiches/  (6 jpg: bbq, chicken_shawarma_grill, club, grill, mexican, peninie)
│   │   ├── shawarma/    (5 jpg: cheese, chicken, paratha, platter, zinger)
│   │   ├── toppings/    (5 jpg: cheese_chicken_dip_sauce, cheese_sauce, chicken_topping, dip_sauce, peri_peri_sauce)
│   │   └── wrap_rolls/  (4 jpg: arabic, behari, pratha, turkish)
│
├── styles/
│   └── globals.css                 # Default shadcn variables (legacy / un-used at root)
│
├── app/globals.css                 # Real design system (the file actually used)
│
├── .dockerignore                   # Excludes node_modules, .next, .env, public/images, scratch, tmp_*
├── .env.local                      # NEXT_PUBLIC_API_URL, NEXT_PUBLIC_WS_URL (dev)
├── .gitignore                      # v0 sandbox files, .env*.local, node_modules, .next, .DS_Store
├── components.json                 # shadcn/ui configuration (new-york, neutral, lucide, tsx, rsc)
├── Dockerfile                      # node:20-alpine multi-stage, npm install --legacy-peer-deps
├── next-env.d.ts                   # Next.js types reference
├── next.config.mjs                 # typescript.ignoreBuildErrors=true, images.unoptimized=true, /api Cache-Control
├── package.json                    # 50+ deps, 4 scripts (dev/build/start/lint)
├── pnpm-lock.yaml                  # pnpm lockfile (135KB)
├── pnpm-workspace.yaml             # only `allowBuilds: sharp: true`
├── postcss.config.mjs              # @tailwindcss/postcss
├── README.md                       # the existing 37KB doc
├── tmp_download_burger_images.py   # dev helper for sourcing burger images
├── tmp_test_write.txt              # dev smoke test ("WRITING_OK")
├── tsconfig.json                   # strict, paths "@/*": "./*", jsx: react-jsx
├── tsconfig.tsbuildinfo            # TypeScript incremental build cache
└── scratch/                        # one-off dev assets (image sourcing, audit contact sheets, .mjs gen scripts)
    ├── all_images.txt (empty)
    ├── download_*.py (5+ scripts)
    ├── generate_*.py / .mjs (3 scripts)
    ├── optimize_and_copy_pizzas.py
    ├── test_pollinations.py
    ├── deals_contact_sheet*.jpg, final_priority_*.jpg, source_assets_contact_sheet.jpg
    ├── deals_section_screenshot.png
    ├── full_menu_image_audit.jpg
    ├── priority_deals_contact_sheet.jpg
    ├── priority_mapping_audit.jpg
```

> Files under `scratch/` and `tmp_*` are operator-only development aids; they are
> excluded from the Docker image via `.dockerignore`. They contain image
> sourcing scripts (Pexels, Pollinations.ai), contact sheets used during the
> visual audit, and the original `Bonfire Pizza` AI generation pipeline. They
> are not part of the production runtime.

---

## 2. Frontend Architecture

### 2.1 Routing

The app uses the **Next.js App Router**. Only one route is wired up:

- `app/page.tsx` → `/` (the home page)
- `app/api/images/search/route.ts` → `GET /api/images/search?q=<query>&cat=<folder>` (a single serverless handler that proxies to Unsplash or falls back to Pollinations.ai)
- `app/layout.tsx` → root layout (fonts, metadata, JSON-LD, Analytics)
- `app/globals.css` → imported by layout, supplies the full design system

There are no dynamic routes, no client-side route transitions, no nested
layouts. The single page is a hand-composed sequence of sections, each of which
is a real React component.

### 2.2 Rendering Model

- `app/page.tsx` is a client component (`"use client"`) because it composes
  the loading screen, cart sidebar, and other stateful client components and
  dynamic-imports three below-fold sections with `ssr: false`.
- `app/layout.tsx` is a server component, embedding Google Fonts via
  `next/font`, schema.org JSON-LD inline, and conditionally loading
  `@vercel/analytics` in production.
- Each section component is its own client component, with Framer Motion
  orchestration via `whileInView`, `staggerContainer`, and `fadeUp` variants.

### 2.3 Component Composition Map (app/page.tsx → children)

```
<LoadingScreen />                    z:9999
<CursorGlow />                       z:9998, lg only
<Navbar />                           z:50 fixed
<CartSidebar />                      z:150/160 slide-in
<WhatsAppButton />                   z:140 fixed bottom-right
<main>
  <HeroSection />                    #home
  <MarqueeSection />                 #marquee
  <MenuSection />                    #menu  (has sticky child category bar)
  <DealsSection />                   #deals
  <AboutSection />                   #about  (dynamic, ssr:false)
  <ReviewsSection />                 #reviews (dynamic, ssr:false)
  <ContactSection />                 #contact (dynamic, ssr:false)
</main>
<Footer />
```

Lazy loaded: `AboutSection`, `ReviewsSection`, `ContactSection` are
`dynamic(import, { ssr: false })` — they ship as separate chunks and never
SSR-render. This trims the initial HTML payload and reduces TBT for
first-contentful paint.

### 2.4 State Management

There is exactly one global store — the cart — using **Zustand**:

```
useCartStore = {
  items: CartItem[]            // {id, name, price, qty, image, variant?}
  isOpen: boolean
  addItem({...})
  removeItem(id)
  updateQty(id, qty)
  clearCart()
  openCart() / closeCart() / toggleCart()
}
```

The store is consumed by:

- `Navbar` (reads `items` to render cart count badge)
- `ProductCard` (writes via `addItem`, calls `openCart`)
- `DealsSection` → `DealCard` (writes via `addItem`, opens cart)
- `CartSidebar` (reads `items`, `isOpen`, mutates `updateQty` / `removeItem` / `closeCart`)
- `CheckoutForm` (calls `clearCart`, `closeCart` after success)

All other state (active tab, search query, mobile menu, scrollY, sticky
flag, qty, selected variant) is local component state. The checkout form
isolates its own state via `react-hook-form`.

### 2.5 Design Tokens & Color System

`app/globals.css` defines the canonical color set in OKLCH (perceptually
uniform). Highlights:

| Token                | OKLCH / Hex   | Usage                                        |
|----------------------|---------------|----------------------------------------------|
| `--primary`          | `oklch(0.78 0.17 85)` | Gold — buttons, accents, active states       |
| `--gold-light`       | `oklch(0.88 0.14 85)` | Lighter gold for gradient tops              |
| `--gold-dark`        | `oklch(0.60 0.13 85)` | Darker gold for gradient bottoms            |
| `--background`       | `oklch(0.06 0 0)`     | Near-black page background                  |
| `--card`             | `oklch(0.10 0 0)`     | Card surface                                |
| `--black-glass`      | `oklch(0.12 0 0 / 0.7)` | Translucent glass overlays                |
| `--whatsapp`         | `#25D366`             | WhatsApp-specific green                    |
| `--glow-sm/md/lg`    | progressive gold glows | Box-shadow utilities                       |

`@theme inline` re-exports the variables so Tailwind v4 utilities
(`bg-primary`, `text-gold`, etc.) resolve correctly. Custom utility classes
defined include:

- `.glass-card` & `.glass-card-premium` — frosted glass with blur + gold border
- `.gold-btn` — primary gold button with gradient + glow + active scale
- `.gold-shimmer-text` — animated gold text gradient (3s linear loop)
- `.marquee-track` — 28s linear infinite marquee (paused on hover)
- `.gold-pulse`, `.border-shimmer` — ambient keyframe animations
- `.hero-ring`, `.hero-ring--small`, `.rotating-ring` — hero decorative rings
- `.floating-card`, `.rating-badge` — hero floating UI elements
- `.premium-scroll` — the visible Apple-Mail / Stripe-style gold scrollbar
- `.cat-scroll`, `.cat-strip`, `.cat-tab`, `.cat-indicator`, `.cat-arrow`, `.cat-snap` — premium category navigation
- `.wa-float`, `.wa-pulse` — WhatsApp float & pulse
- `.menu-category-bar` / `.is-sticky` — sticky category bar styling with `prefers-reduced-motion` respect
- `.premium-secondary` & `.premium-primary-btn` — premium button variants
- `.glass` — global frosted background

`prefers-reduced-motion: reduce` blocks are honored throughout the CSS to
suppress animations and scroll-behavior for users who opt out.

### 2.6 Typography

Loaded via `next/font/google` in `app/layout.tsx`:

- **Playfair Display** — `var(--font-playfair)` — display / serif headings
- **Inter** — `var(--font-inter)` — body / sans-serif UI

Font weights used: Playfair 400/600/700/800; Inter (default + all weights).
Both have `display: swap` and `preload: true`.

### 2.7 Responsive System

Mobile-first. Breakpoints consistently used:
- `< 640px` (`sm:` default): single column, hamburger, compact cards
- `640px+` (`sm:`): 2-column grids, more padding
- `1024px+` (`lg:`): desktop split layouts, 3-column grids, full nav
- `1280px+` (`xl:`): 4-column product grid

`HeroSection` ships a **fully separate mobile visual** (rings, floating
cards, rating badge) — not just a shrunk desktop version.

### 2.8 Accessibility Features

- `aria-label`, `aria-labelledby`, `aria-controls`, `aria-selected`, `aria-live` are used extensively (CategoryNav is a full ARIA tablist with live region).
- `prefers-reduced-motion: respect in CSS + rAF guards in JS hooks.
- High-contrast / forced-colors mode is supported for the scrollbar.
- `scrollbar-gutter: stable` on the category strip prevents layout shift.
- `focus-visible` rings on tabs, inputs, buttons.
- The cart is keyboard reachable; the mobile menu closes on link click.

---

## 3. Backend Architecture

### 3.1 Server-Side

This is a **frontend-only Next.js app** (no Next.js route handlers except
the image search proxy, and no DB). The server-side work is:

1. **`/app/api/images/search`** — the only API route. Implementation:
   - Accepts `?q=<text>&cat=<folder>`.
   - If `UNSPLASH_ACCESS_KEY` is set in env, calls the Unsplash API
     (`/search/photos`) with the food query, returning the first hit
     formatted as `https://images.unsplash.com/...&w=800&h=600&fit=crop`.
   - On Unsplash miss / no key, falls back to Pollinations.ai with a
     detailed restaurant-food prompt.
   - Returns `{ url, source: "unsplash"|"ai", alt }` and is `next.revalidate:
     86400` cached (24h).

2. **Next.js static / SSR** — page render, metadata injection, JSON-LD.

There is no Node API, no database, no auth. The cart lives in browser memory
(Zustand) only. There is no checkout persistence — the entire order is sent
to WhatsApp.

### 3.2 External API (Optional, Configured via `NEXT_PUBLIC_API_URL`)

`lib/api/*` is a complete typed client for an **optional external backend**:

- `getProducts({category_id, is_available, search})` → `Product[]`
- `getProduct(id)` → `Product`
- `getCategories()` → `Category[]`
- `placeOrder(order)` → `OrderResponse`
- `getOrders({status, limit, offset})` → `OrderResponse[]`
- `getOrder(id)` → `OrderResponse`
- `updateOrderStatus(id, status)` → `OrderResponse`
- `wsService.connect(path)` — typed WebSocket subscriber with auto-reconnect (3s) and a handler registry by message type

The `MenuSection` actually **tries** to fetch products on mount and falls
back to local data if the API is unreachable. Everything else still uses
local data.

The client adds `Authorization: Bearer <admin_token>` from
`localStorage.getItem("admin_token")` to every request when present (intended
for an admin-only API).

### 3.3 Persistence & Storage

- **No database** in this repo.
- **sessionStorage** stores `kpc_loaded` to gate the loading screen.
- **localStorage** is read for `admin_token` (admin auth, not used by the
  current customer flow).
- **Zustand state** is in-memory only; refreshing the page clears the cart.

---

## 4. Data Architecture

### 4.1 Static Data Files

| File | Type | Contents |
|------|------|----------|
| `lib/data/menu.ts` | `MENU_ITEMS: MenuItem[]` | 60+ items across 10 categories, with optional `variants` (size, price), `subCategory` (pizza only), `image`, `badge`, `isPopular` |
| `lib/data/menu.ts` | `MENU_CATEGORIES: MenuCategory[]` | 10 categories in display order |
| `lib/data/menu.ts` | `PIZZA_SUB_CATEGORIES` | 5 sub-categories with emoji + label (deep-pan, signature, stuff-crust, xtreme-special, special-pizza) |
| `lib/data/deals.ts` | `DEALS: DealItem[]` | 10 deals: 6 regular + 4 family |
| `lib/data/deals.ts` | `MARQUEE_ITEMS` | 8 ticker items with emoji / name / price / tag |
| `lib/data/restaurant.ts` | `RESTAURANT` | name, tagline, slogan, phone, address, hours |
| `lib/data/restaurant.ts` | `REVIEWS` | 6 reviews in mixed Urdu/English with avatar, rating, location, date |
| `lib/contact.ts` | `CONTACT` | phoneDisplay, phoneLocal, phoneE164, whatsappNumber, brandName |
| `lib/contact.ts` | `CONTACT_URLS` | pre-built `tel:` and `wa.me` URLs |
| `lib/contact.ts` | `DEV_CONTACT` / `DEV_CONTACT_URLS` | the developer (Ahmad Dogar) contact — strictly separate from business |
| `lib/contact.ts` | `buildWhatsAppURL(msg?)` / `buildDeveloperWhatsAppURL(msg?)` | helpers |

### 4.2 MenuItem shape (canonical)

```ts
interface MenuItem {
  id: string;                  // unique slug
  name: string;
  category: MenuCategory;      // one of 10 categories
  description: string;
  price: number | null;        // null when variants[] is used
  variants?: { label: string; price: number }[];  // size/price tiers
  image: string;               // /images/...
  badge?: string;              // Best Seller, Hot, Spicy, New, Signature, ...
  isPopular?: boolean;         // surfaces a star indicator
  subCategory?: string;        // pizza only: deep-pan | signature | stuff-crust | xtreme-special | special-pizza
}
```

### 4.3 Image Resolver

`lib/utils/images.ts` is a hand-rolled fuzzy matcher. Algorithm summary:

1. **Direct alias lookup** — `DIRECT_PRODUCT_ALIASES` and
   `DIRECT_DEAL_ALIASES` short-circuit obvious variants (e.g. "behari roll
   4 pcs" → `behari_roll.jpg`).
2. **Category-restricted scoring** — scores every image in the same folder
   using a weighted heuristic:
   - Exact filename match: +120
   - Compact (no spaces) match: +110
   - Suffix stripping ("pizza", "burger", "sandwich"): +95
   - Category folder match: +60 / mismatch: -80
   - Token match (singularized): +18
   - Filename contains product token: +8
   - Category keyword overlap: +4
   - Bidirectional substring: +35
   - Deal image used in non-Deals: -100
   - Fallback image used: -2
3. **Global fallback** — pick the highest-scoring image overall, or the
   category fallback (`pizzas/super_supreme.jpg`), or finally
   `/hero-food.png`.
4. **Cloud enrichment** — `resolveProductImageCloud` calls
   `/api/images/search` only when the resolved local image is a fallback,
   caching in-memory so subsequent renders are instant.

### 4.4 Smart Search

`lib/utils/search.ts` `smartSearch` does:
- name (full + first-word prefix)
- category
- description
- exact price number match (parsed from query via `/\d[\d,]*/g`)
- substring price match (e.g. typing "60" matches 600, "120" matches 1200)

`getSearchPlaceholder(category?)` returns category-specific placeholders.

---

## 5. Animation & Motion System

| Trigger              | Implementation                                                       | Where                                     |
|----------------------|----------------------------------------------------------------------|-------------------------------------------|
| Loading intro        | sequential Framer Motion + 1.2s progress bar                         | `LoadingScreen`                           |
| Hero entrance        | staggered text/CTA entrance, 360° rotating rings, floating cards    | `HeroSection`                             |
| Scroll progress      | Framer Motion `useScroll` + `useSpring`                              | `ScrollProgress`                          |
| Cursor glow          | spring-tracked 400px radial gradient (lg only)                        | `CursorGlow`                              |
| Particles            | 20 gold dots floating up/down (GlobalParticles) + 35 in hero         | `GlobalParticles`, `FloatingParticles`    |
| Marquee              | CSS `translateX(-50%)` 28s loop, pause on hover                      | `MarqueeSection`                          |
| Section reveals      | `whileInView` with `viewport: { once: true }`                        | All sections                              |
| Stagger children     | `staggerChildren: 0.07-0.10`                                         | Menu/Deals grids, About stats             |
| Hover effects        | `whileHover: { y, scale }` + box-shadow change                       | Cards, buttons                            |
| Cart sidebar         | `slideInRight` spring (damping 30, stiffness 300)                    | `CartSidebar`                             |
| Cart badge           | `AnimatePresence` scale on count change                              | `Navbar`                                  |
| Active tab indicator | rAF-measured translate + width (500ms cubic-bezier)                  | `CategoryNav`                             |
| WhatsApp float       | `waFloat` 3s + `waPulse` 2s                                          | `WhatsAppButton`, `.wa-pulse`             |
| Reviews              | 3.5s auto-rotate, paused on hover                                    | `ReviewsSection`                          |
| Stat counters        | IntersectionObserver easeOut (1 - (1-t)^4)                          | `useCounter` → `AboutSection`             |

Easing: `cubic-bezier(0.23, 1, 0.32, 1)` is the house curve; `type: "spring",
damping: 30, stiffness: 300` is the spring. Reduced-motion users get
`transition: none !important; animation: none !important;` in CSS.

---

## 6. shadcn/ui Primitives Inventory

`components/ui/` ships 70+ files. Most are unused by the current single-page
implementation — they exist as a ready-made foundation for future expansion
(admin dashboard, account pages, modals, toasts, etc.). The primitives
present:

`accordion`, `alert`, `alert-dialog`, `aspect-ratio`, `avatar`, `badge`,
`breadcrumb`, `button`, `button-group`, `calendar`, `card`, `carousel`,
`chart`, `checkbox`, `collapsible`, `command`, `context-menu`, `dialog`,
`drawer`, `dropdown-menu`, `empty`, `field`, `form`, `hover-card`, `input`,
`input-group`, `input-otp`, `item`, `kbd`, `label`, `menubar`,
`navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`,
`resizable`, `scroll-area`, `select`, `separator`, `sheet`, `sidebar`,
`skeleton`, `slider`, `sonner`, `spinner`, `switch`, `table`, `tabs`,
`textarea`, `toast`, `toaster`, `toggle`, `toggle-group`, `tooltip`, plus
the custom `MenuSearch` and `use-mobile` / `use-toast` shims.

shadcn config (`components.json`): `style: new-york`, `rsc: true`, `tsx: true`,
`baseColor: neutral`, `cssVariables: true`, `iconLibrary: lucide`.

The only UI primitive the live page actually imports is `MenuSearch`. The
`components/ui/button.tsx` is also exported via the CVA pattern and would be
the canonical place to add a button if/when a future page needs it.

---

## 7. Hooks & Utilities Catalog

| Module | Purpose |
|---|---|
| `hooks/use-counter.ts` | IntersectionObserver-gated eased count-up animation. |
| `hooks/use-horizontal-scroll.ts` | rAF + ResizeObserver + MutationObserver scroll position tracker. Exposes `canScrollLeft/Right`, `scrollBy`, `scrollToElementCentered` (never causes page jumps), `refresh`. Honors `prefers-reduced-motion`. |
| `hooks/use-mobile.ts` | matchMedia `< 768px` boolean. |
| `hooks/use-scroll-progress.ts` | Passive window scroll listener returning `scrollY`. |
| `hooks/use-toast.ts` | shadcn reducer-style toast store (1 toast, ~1M ms auto-remove delay). |
| `lib/utils/animations.ts` | Reusable Framer Motion variants (`fadeUp`, `fadeIn`, `scaleUp`, `staggerContainer(stagger, delay)`, `slideInRight`, `cardHover`, `spring`). |
| `lib/utils/animations.ts` variants are consumed by every section. |
| `lib/utils/search.ts` | `smartSearch` + `getSearchPlaceholder`. |
| `lib/utils/whatsapp.ts` | `generateWhatsAppURL(order)` builds the formatted Urdu-friendly order block sent to WhatsApp. |
| `lib/utils/contact-actions.ts` | `openInNewTab`, `openExternalURL`, `openWhatsApp`, `openDeveloperWhatsApp`, `startCall`. Single source of truth for "click → open" semantics. |
| `lib/utils/images.ts` | `getProductImage`, `getDealImage`, `getCategoryFallbackImage`, `resolveProductImage`, `resolveDealImage`, `isCategoryFallback`, `resolveProductImageCloud`. |
| `lib/utils/cloud-images.ts` | sessionCache + pendingFetches for cloud image lookups, 8s AbortSignal timeout. |
| `lib/utils.ts` | `cn(...inputs)` = `twMerge(clsx(...))` |
| `lib/contact.ts` | `CONTACT`, `CONTACT_URLS`, `DEV_CONTACT`, `DEV_CONTACT_URLS`, `buildWhatsAppURL`, `buildDeveloperWhatsAppURL`. |
| `lib/api/*` | Optional typed backend client (see §3.2). |

---

## 8. Feature Inventory (by surface)

### 8.1 Customer-Facing Features

1. **Animated brand loading screen** (once per session)
2. **Sticky glass navbar** with live `--navbar-h` publication
3. **Hero with split layout** (desktop) / fully-fledged mobile visual
4. **Animated stat row** (50K+ orders, 4.9 rating, 15 min delivery)
5. **Auto-scrolling marquee** of popular items with pause-on-hover
6. **Menu category navigation** (11 tabs) with snap, scroll, keyboard, sliding indicator, fade edges
7. **Menu search** that matches name, description, category, exact & substring prices
8. **All-Items view** that groups all items by category
9. **Pizza sub-category grouping** (5 sub-headings with gold shimmer)
10. **Product card** with category-tinted glow, badge, 5-star rating, variants, qty stepper, add-to-cart
11. **Fallback image handler** + on-demand cloud image enrichment via `/api/images/search`
12. **Deals grid** (regular + family) with savings badges, strikethrough prices, "Save Rs. X" callouts
13. **About section** with brand story, 3 value props, animated stat counters
14. **Auto-rotating reviews carousel** (3.5s, pause on hover, dots, prev/next)
15. **Contact cards** (Call, WhatsApp, Visit, Hours) + embedded Google Maps + directions link
16. **Slide-in cart** with qty controls, remove, totals, free-delivery indicator
17. **Checkout form** (RHF + Zod) → opens pre-filled WhatsApp order in new tab
18. **Fixed floating WhatsApp button** (bottom-right, gentle bounce, pulse)
19. **Top scroll progress bar**
20. **Mouse-following cursor glow** (desktop only)
21. **Background global particles** (20 gold dots)
22. **Footer with brand, quick links, categories, contact, developer credit**
23. **SEO: JSON-LD `Restaurant` schema, OpenGraph, keywords, robots, canonical**
24. **Production-only Vercel Analytics**

### 8.2 Admin / Developer-Facing Features

1. `lib/api/*` typed client (placeOrder, getOrders, updateOrderStatus, wsService)
2. `localStorage.admin_token` Bearer auth in client.ts (intended for an admin UI)
3. 70+ shadcn/ui primitives (admin dashboard foundation)
4. `theme-provider.tsx` (dark mode ready; not currently mounted)
5. `Dockerfile` for containerized deploy
6. `scratch/` scripts (Pexels/Pollinations.ai image sourcing pipeline)
7. `components.json` shadcn config (consistent future generation)

### 8.3 Business / Ordering Features

- **Single source of truth for contact** (`lib/contact.ts`)
- **WhatsApp-first ordering**: 4-field checkout → pre-filled `wa.me` URL
- **Free delivery** highlighted in green on every checkout surface
- **Cash on Delivery** stated in WhatsApp message
- **Timestamped orders** in WhatsApp message
- **Order number** displayed post-submit (when API responds)
- **Multiple sub-channels for conversion**:
  - Hero "Order Now" → scroll to menu
  - Sticky navbar "Order Now" → scroll to menu
  - Floating WhatsApp button → open WA chat
  - Footer "Chat on WhatsApp" → open WA chat
  - Contact "Chat Now" card → open WA chat
  - Mobile drawer "Order Now" → scroll to menu

### 8.4 Performance / Engineering Features

- `next/dynamic` with `ssr: false` for below-fold sections
- `useMemo` for filtered/searchable/grouped items
- `requestAnimationFrame`-based debounce in `useHorizontalScroll`
- `willChange: transform` on animated elements
- `next/font` (self-hosted, no FOIT)
- `loading="lazy"` on Google Maps iframe
- `Cache-Control: public, max-age=86400, immutable` on `/api/*` (in `next.config.mjs`)
- Vercel Analytics gated to production

### 8.5 Accessibility / Responsive / Animation

- `prefers-reduced-motion` blocks in CSS + JS guards in hooks
- High-contrast / forced-colors support for the scrollbar
- Full keyboard navigation for category tabs (Arrow, Home, End, PgUp/Dn, Enter, Space)
- `aria-live` region announces category changes
- Mobile-first responsive grid system
- Dedicated mobile visual (hero) — not a shrunken desktop

### 8.6 Future-Ready Features

- `theme-provider.tsx` ready for light/dark toggle
- shadcn/ui primitives for forms, dialogs, tables, charts, etc.
- `lib/api/orders.ts` ready for backend persistence
- `lib/api/websocket.ts` ready for real-time order updates
- `lib/utils/cloud-images.ts` for on-demand image enrichment

---

## 9. Business Logic Flow — End-to-End

### 9.1 Customer Order Lifecycle

```
[1] Land on /
    └─ LoadingScreen (1st session only) → fades out
    └─ CursorGlow, GlobalParticles, ScrollProgress mount

[2] Read hero copy / scroll → see marquee → Menu (sticky tabs) → Deals
    └─ Search bar filters items live
    └─ Category tabs filter via CategoryNav (animated indicator)
    └─ Pizza tab groups items by sub-category

[3] Add to Cart
    └─ ProductCard.handleAdd: cartId = item.id or `${id}-${variant}`
    └─ addItem(item) → store updates → CartSidebar animates badge
    └─ openCart() → slide-in spring

[4] Cart view
    └─ +/- qty, remove, subtotal, free delivery
    └─ "Proceed to Order" → showCheckout = true

[5] Checkout form
    └─ RHF + Zod validation (name ≥ 2, phone ≥ 10, address ≥ 8)
    └─ placeOrder(payload) → external API (best-effort)
    └─ generateWhatsAppURL(order) → wa.me deep link
    └─ openExternalURL(waUrl) → opens in NEW tab
    └─ clearCart + closeCart

[6] Customer sends the pre-filled message in WhatsApp
    └─ Restaurant receives the order on their phone
```

### 9.2 WhatsApp Message Format (sent from `lib/utils/whatsats.ts`)

```
━━━━━━━━━━━━━━━━━━━━━
🍕 *NEW ORDER — Khawaja Pizza Club*
━━━━━━━━━━━━━━━━━━━━━
👤 *Name:* <name>
📞 *Phone:* <phone>
📍 *Address:* <address>
📝 *Notes:* <notes>   (optional)
━━━━━━━━━━━━━━━━━━━━━
🛒 *ORDER ITEMS:*
• Real Tikka Pizza (Small) ×1 — Rs. 600
• Zinger Burger ×2 — Rs. 660
━━━━━━━━━━━━━━━━━━━━━
💰 *SUBTOTAL: Rs. 1260*
🚗 *Delivery: Free (Shujaabad City)*
💳 *TOTAL: Rs. 1260*
💵 *Payment: Cash on Delivery*
━━━━━━━━━━━━━━━━━━━━━
⏱ Ordered at: 14:32
📅 Date: 06/05/2026
━━━━━━━━━━━━━━━━━━━━━
```

The current time / date are formatted with the `en-PK` locale.

### 9.3 Data-Flow Diagram (textual)

```
┌──────────────────────────────────────────────────────────────────┐
│  Static data (lib/data/*) ──┐                                    │
│  Contact config (lib/contact.ts) ──┐                             │
│  Optional API (NEXT_PUBLIC_API_URL) ─┐                           │
│                                       │                          │
│              ┌────────────────────────┴─────────────┐            │
│              ▼                                      ▼            │
│   MenuSection.useEffect            Other section components      │
│   getProducts({is_available})      (use static data directly)    │
│              │                                                  │
│              ▼                                                  │
│   toMenuItem(Product) — maps API shape → MenuItem               │
│              │                                                  │
│              ▼                                                  │
│   MENU_ITEMS or apiItems (fallback) → setDisplayItems           │
│              │                                                  │
│              ▼                                                  │
│   smartSearch → filter → useMemo → ProductCard grid              │
└──────────────────────────────────────────────────────────────────┘

User clicks Add to Cart
        │
        ▼
ProductCard.handleAdd → useCartStore.addItem → useCartStore.openCart
        │
        ▼
CartSidebar renders items, qty controls, totals
        │
        ▼
"Proceed to Order" → CheckoutForm
        │
        ▼
RHF + Zod validate
        │
        ▼
placeOrder (best-effort API call)
        │
        ▼
generateWhatsAppURL(order) → openExternalURL(waUrl) → new tab
        │
        ▼
clearCart() + closeCart()  (after 3s or on API error)
```

---

## 10. Environment Variables

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| `NEXT_PUBLIC_API_URL` | No | `http://localhost:8000/api` | Optional external backend root. Consumed by `lib/api/client.ts`. The site works fully without it (falls back to local data). |
| `NEXT_PUBLIC_WS_URL`  | No | `ws://localhost:8000/ws` | WebSocket base for `wsService` (real-time order updates). Optional. |
| `UNSPLASH_ACCESS_KEY` | No | none | If set, `/api/images/search` will fetch from Unsplash. If missing or fails, falls back to Pollinations.ai. |
| `NODE_ENV` | standard | development | Toggles `@vercel/analytics` in `layout.tsx` and minification. |
| `HOSTNAME` | Docker only | 0.0.0.0 | Binds the Next.js server to all interfaces inside the container. |
| `PORT` | Docker only | 3000 | The port `next start` listens on. |

`.env.local` ships with `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_WS_URL`
pointing at a localhost backend (developer convenience). No production
secrets are committed; `.env*.local` is git-ignored.

---

## 11. Configuration Files Inventory

| File | Role |
|------|------|
| `package.json` | name, version, scripts (`dev`, `build`, `start`, `lint`), 50+ runtime deps, 9 dev deps |
| `tsconfig.json` | `strict: true`, `noEmit: true`, `target: ES6`, `jsx: react-jsx`, `paths: { "@/*": ["./*"] }` |
| `next.config.mjs` | `typescript.ignoreBuildErrors: true`, `images.unoptimized: true`, `/api/:path*` cache headers |
| `postcss.config.mjs` | `@tailwindcss/postcss` |
| `components.json` | shadcn config (new-york, neutral, RSC, TSX, lucide) |
| `Dockerfile` | `node:20-alpine`, `npm install --legacy-peer-deps`, `next build`, `next start -p 3000 -H 0.0.0.0` |
| `.dockerignore` | excludes node_modules, .next, .git, .env, public/images, scratch, tmp_*, pnpm-lock.yaml |
| `.gitignore` | v0 sandbox files, .env*.local, node_modules, .next, .DS_Store |
| `.env.local` | Dev-only env vars (committed example, but the pattern is .gitignored normally) |
| `next-env.d.ts` | auto-generated, references next + next/image-types/global + .next/dev/types/routes |
| `pnpm-workspace.yaml` | `allowBuilds: sharp: true` |
| `pnpm-lock.yaml` | Lockfile (135KB) |

---

## 12. Security & Privacy

- `tel:` URLs use the E.164 format so dialers can place international calls correctly.
- `wa.me` URLs use digits-only (no `+`) as required.
- All WhatsApp links include `target="_blank" rel="noopener noreferrer"`.
- `openExternalURL` / `openInNewTab` are SSR-safe and never assign
  `window.location.href` to a non-`tel:` URL.
- `tel:` only assignment to `window.location.href` (per `contact-actions.ts`).
- No secrets are committed; `.env*.local` is git-ignored.
- `UNSPLASH_ACCESS_KEY` would be a server-side secret used only inside the
  route handler — never exposed to the browser.
- `admin_token` is read from `localStorage` and attached as `Authorization:
  Bearer ...` for any future admin endpoints.

---

## 13. Known Limitations / Improvement Opportunities

1. **`images.unoptimized: true`** — Next.js automatic WebP/responsive srcsets
   are disabled. Re-enabling would reduce bandwidth. However, this is a
   deliberate choice to avoid double-processing of local JPG/PNG assets.
2. **`typescript.ignoreBuildErrors: true`** — TS errors won't block builds.
   Tightening this would catch more issues at CI.
3. **No backend in this repo** — orders are dispatched via WhatsApp. A real
   backend (Next.js API routes, FastAPI, Django, etc.) is anticipated, and
   the `lib/api/*` client is already in place.
4. **Cart is in-memory** — refresh clears the cart. Zustand `persist` to
   `localStorage` would be a one-line add.
5. **shadcn primitives unused** — 70+ files exist as a future foundation
   but only `MenuSearch` is wired up. Future pages can adopt them.
6. **Theme provider is mounted only as a stub** — `theme-provider.tsx`
   exists but is not imported by `app/layout.tsx`. Dark mode is hard-coded
   via the gold-on-black CSS variables.
7. **No tests** — no Jest/Vitest/Playwright configuration in the repo.
8. **No PWA** — no service worker, no manifest.
9. **External image generation** is opportunistic: the cloud image search
   only fires when the local resolver falls back. There is no background
   batch ingestion.

---

## 14. Project Statistics

| Metric | Count |
|--------|-------|
| Total menu items (local data) | 60+ (across 10 categories + 5 pizza sub-categories) |
| Total deals | 10 (6 regular + 4 family) |
| Total reviews | 6 |
| Marquee items | 8 |
| Image assets in `/public/images/` | ~70 (across 9 category folders + 3 root) |
| TypeScript components | ~25 production components + 70+ UI primitives |
| Pages | 1 (`/`) |
| API routes | 1 (`/api/images/search`) |
| Hooks | 5 (use-counter, use-horizontal-scroll, use-mobile, use-scroll-progress, use-toast) |
| Stores | 1 (Zustand cart) |
| External integrations | 2 optional (Unsplash, Pollinations.ai) + WhatsApp (wa.me) + Google Maps iframe |
| Major modules | 4 (`cart`, `layout`, `menu`, `sections`) |
| Runtime dependencies | 50+ |
| Dev dependencies | 9 |

---

## 15. Build / Run / Deploy Summary

```bash
# Local dev (pnpm recommended, but npm/yarn work too)
pnpm install
pnpm dev                 # http://localhost:3000

# Production
pnpm build
pnpm start

# Docker
docker build -t khawaja-pizza-club .
docker run -p 3000:3000 khawaja-pizza-club
```

`package.json` defines four scripts: `dev`, `build`, `start`, `lint` (the
last runs `eslint .` — note that no `.eslintrc` is committed, so this will
rely on Next.js' default if any).

---

This `PROJECT_ANALYSIS.md` is now the canonical audit record. The
production-grade `README.md` is generated from it and is targeted at new
developers, the restaurant owner, and future maintainers.
