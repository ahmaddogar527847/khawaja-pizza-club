"use client";
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MENU_ITEMS, MENU_CATEGORIES, MenuCategory, PIZZA_SUB_CATEGORIES } from "@/lib/data/menu";
import type { MenuItem } from "@/lib/data/menu";
import ProductCard from "@/components/menu/ProductCard";
import CategoryNav, { type CategoryTab } from "@/components/menu/CategoryNav";
import { fadeUp, staggerContainer } from "@/lib/utils/animations";
import { smartSearch, getSearchPlaceholder } from "@/lib/utils/search";
import { resolveProductImage } from "@/lib/utils/images";
import MenuSearch from "@/components/ui/MenuSearch";
import { getProducts } from "@/lib/api";
import type { Product } from "@/lib/api";
import { cn } from "@/lib/utils";

type TabKey = "All Items" | MenuCategory;

const CATEGORY_ICONS: Record<string, string> = {
  "All Items":           "🗂",
  Pizza:                 "🍕",
  Burgers:               "🍔",
  Shawarma:              "🌯",
  Sandwiches:            "🥪",
  Pasta:                 "🍝",
  Appetizers:            "🍟",
  Platters:              "🍽️",
  "Wrap Rolls":          "🌮",
  Broast:                "🍗",
  "Topping & Dip Sauce": "🧀",
};

function toMenuItem(p: Product): MenuItem {
  const cat = (p.category_id === 1 ? "Pizza" : p.category_id === 2 ? "Burgers" : p.category_id === 3 ? "Shawarma" : p.category_id === 4 ? "Sandwiches" : p.category_id === 5 ? "Pasta" : p.category_id === 6 ? "Appetizers" : p.category_id === 7 ? "Platters" : p.category_id === 8 ? "Wrap Rolls" : p.category_id === 9 ? "Broast" : "Topping & Dip Sauce") as MenuItem["category"];
  return {
    id: p.slug,
    name: p.name,
    category: cat,
    description: p.description,
    price: p.price,
    variants: p.variants && p.variants.length > 0 ? p.variants : undefined,
    image: resolveProductImage(p.name, cat, p.image_url || ""),
    badge: p.badge,
    isPopular: p.is_featured,
    subCategory: p.sub_category || undefined,
  };
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5 },
  },
};

export default function MenuSection() {
  const [active, setActive] = useState<TabKey>("All Items");
  const [searchQuery, setSearchQuery] = useState("");
  const [apiItems, setApiItems] = useState<MenuItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSticky, setIsSticky] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const menuSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchQuery("");
  }, [active]);

  useEffect(() => {
    let mounted = true;
    getProducts({ is_available: true })
      .then((products) => {
        if (mounted) {
          setApiItems(products.map(toMenuItem));
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setApiItems(null);
          setLoading(false);
        }
      });
    return () => { mounted = false; };
  }, []);

  const displayItems = apiItems ?? MENU_ITEMS;

  const categoryItems = useMemo(
    () => active === "All Items" ? displayItems : displayItems.filter((i) => i.category === active),
    [active, displayItems],
  );

  const searchableItems = useMemo(
    () => categoryItems.map((item) => ({
      name: item.name,
      description: item.description,
      category: item.category,
      searchPrices: item.variants
        ? item.variants.map((v) => v.price)
        : item.price != null ? [item.price] : [],
      _item: item,
    })),
    [categoryItems],
  );

  const filtered = useMemo(
    () => smartSearch(searchableItems, searchQuery).map((s) => s._item),
    [searchableItems, searchQuery],
  );

  // Items grouped by category for "All Items" view
  const groupedByCategory = useMemo(() => {
    if (active !== "All Items") return null;
    const groups: Record<string, MenuItem[]> = {};
    const orderedCategories: MenuCategory[] = [...MENU_CATEGORIES];
    for (const cat of orderedCategories) {
      const items = filtered.filter((i) => i.category === cat);
      if (items.length > 0) {
        groups[cat] = items;
      }
    }
    return groups;
  }, [active, filtered]);

  const tabs = useMemo<TabKey[]>(() => ["All Items", ...MENU_CATEGORIES], []);

  const categoryNavTabs = useMemo<CategoryTab[]>(
    () => tabs.map((t) => ({ key: t, label: t, icon: CATEGORY_ICONS[t] })),
    [tabs]
  );

  // ── Sticky sentinel (Intersection Observer for sticky state) ──
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-1px 0px 0px 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  /**
   * handleTabClick
   * --------------
   * The ONLY entry-point that changes the active category. It runs exclusively
   * on an explicit user gesture (click / tap / keyboard activation on a tab).
   *
   * Guarantees:
   *  • Never auto-fires from scroll, viewport entry, or IntersectionObserver.
   *  • Never causes the page itself to scroll — only the tab strip inside
   *    <CategoryNav /> is scrolled (via `scrollToElementCentered`), which
   *    preserves the user's viewport position.
   *  • Never suppresses anything; with no scroll-spy observer, no race
   *    conditions exist.
   */
  const handleTabClick = useCallback((tab: TabKey) => {
    setActive(tab);
  }, []);

  return (
    <section id="menu" ref={menuSectionRef} className="pt-16 sm:pt-20 pb-16 sm:pb-20 bg-black relative">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(212,175,55,0.04)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <motion.p variants={fadeUp} className="text-[oklch(0.78_0.17_85)] text-xs uppercase tracking-[0.35em] font-medium mb-4">
            Explore Our
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif font-bold text-white mb-5"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            <span className="block text-5xl sm:text-6xl lg:text-7xl" style={{
              background: "linear-gradient(135deg, #F4D06F 0%, #E0B84C 25%, #D4AF37 50%, #E0B84C 75%, #F4D06F 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 40px rgba(212,175,55,0.3)",
              filter: "drop-shadow(0 2px 4px rgba(212,175,55,0.15))"
            }}>
              Premium Menu
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[oklch(0.60_0_0)] text-sm sm:text-base max-w-xl mx-auto leading-relaxed tracking-wide">
            Every dish crafted with the finest ingredients for an unmatched dining experience.
          </motion.p>
        </motion.div>

        {/* Sticky sentinel — invisible element just above category bar */}
        <div ref={sentinelRef} className="h-px w-full" aria-hidden="true" />

        {/* ── STICKY CATEGORY BAR ──
         * Layout strategy to avoid page jumps / content shifts:
   *  • Outer wrapper uses CONSTANT vertical padding (py-3 always) so the
     *    content below never reflows when sticky state toggles.
     *  • The glass background, blur, border and shadow live on an INNER
     *    layer that fades in/out — purely visual, no layout impact.
     *  • `top` uses the live `--navbar-h` CSS variable that <Navbar /> writes
     *    to <html>, with a sensible fallback. This guarantees the sticky bar
     *    always sits exactly below the global navbar, never overlapping it.
   */}
        <div
          className="sticky z-40 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 transition-[top] duration-300 ease-out"
          style={{ top: "var(--navbar-h, 64px)" }}
          role="navigation"
          aria-label="Menu category navigation"
        >
          <div
            className={cn(
              "relative -mx-4 px-4 sm:mx-0 sm:px-0",
              "transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
              isSticky
                ? "rounded-none border-b border-[rgba(212,175,55,0.12)]"
                : "border-b border-transparent"
            )}
            style={{
              background: isSticky
                ? "linear-gradient(135deg, rgba(10,10,10,0.88) 0%, rgba(8,8,8,0.82) 100%)"
                : "transparent",
              backdropFilter: isSticky ? "blur(20px) saturate(180%)" : "blur(0px)",
              WebkitBackdropFilter: isSticky ? "blur(20px) saturate(180%)" : "blur(0px)",
              boxShadow: isSticky
                ? "0 8px 32px rgba(0,0,0,0.5), 0 0 40px rgba(212,175,55,0.04), inset 0 1px 0 rgba(255,255,255,0.02)"
                : "0 8px 32px rgba(0,0,0,0)",
            }}
          >
            <CategoryNav
              tabs={categoryNavTabs}
              active={active}
              onSelect={(k) => handleTabClick(k as TabKey)}
            />

            {/* Subtle gold accent line at bottom when sticky */}
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute bottom-0 left-0 right-0 h-px",
                "transition-opacity duration-500",
                isSticky ? "opacity-100" : "opacity-0"
              )}
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.2) 30%, rgba(212,175,55,0.35) 50%, rgba(212,175,55,0.2) 70%, transparent 100%)",
              }}
            />
          </div>
        </div>

        {/* ── SEARCH BAR (below sticky) ── */}
        <MenuSearch
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={getSearchPlaceholder(active)}
        />

        {searchQuery && (
          <motion.p
            key={`${active}-${searchQuery}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-[oklch(0.45_0_0)] text-xs mb-6"
          >
            📦 {filtered.length} {filtered.length === 1 ? "item" : "items"} found
          </motion.p>
        )}

        {/* ── PRODUCT GRID ──
         * `popLayout` keeps the exiting grid in the layout flow (with
         * `position: absolute`) so the new grid can mount immediately.
         * This prevents the page from jumping up/down when categories have
         * different content heights.
   */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={active}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
          >
            {active === "Pizza" ? (
              /* ── Pizza with sub-categories ── */
              <div className="space-y-16">
                {PIZZA_SUB_CATEGORIES.map((subCat) => {
                  const items = filtered.filter((i) => i.subCategory === subCat.key);
                  if (items.length === 0) return null;
                  return (
                    <div key={subCat.key}>
                      <motion.div variants={itemVariants} className="mb-8">
                        <h3
                          className="font-serif text-2xl sm:text-3xl font-bold"
                          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                        >
                          <span style={{
                            background: "linear-gradient(135deg, #F4D06F 0%, #E0B84C 25%, #D4AF37 50%, #E0B84C 75%, #F4D06F 100%)",
                            backgroundSize: "200% auto",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}>
                            {subCat.emoji} {subCat.label}
                          </span>
                        </h3>
                        <div className="h-px bg-gradient-to-r from-[oklch(0.78_0.17_85/0.5)] via-[oklch(0.78_0.17_85/0.3)] to-transparent mt-3" />
                      </motion.div>
                      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
                        {items.map((item, idx) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.5, delay: idx * 0.07 }}
                          >
                            <ProductCard item={item} />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : active === "All Items" && groupedByCategory ? (
              /* ── All Items: all categories grouped together ── */
              <div className="space-y-16">
                {(Object.keys(groupedByCategory) as MenuCategory[]).map((cat) => (
                  <div
                    key={cat}
                    id={`category-panel-${cat.replace(/\s+/g, "-").toLowerCase()}`}
                    role="tabpanel"
                    aria-label={`${cat} category`}
                  >
                    <motion.div variants={itemVariants} className="mb-8">
                      <h3
                        className="font-serif text-2xl sm:text-3xl font-bold"
                        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                      >
                        <span style={{
                          background: "linear-gradient(135deg, #F4D06F 0%, #E0B84C 25%, #D4AF37 50%, #E0B84C 75%, #F4D06F 100%)",
                          backgroundSize: "200% auto",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}>
                          {CATEGORY_ICONS[cat]} {cat}
                        </span>
                      </h3>
                      <div className="h-px bg-gradient-to-r from-[oklch(0.78_0.17_85/0.5)] via-[oklch(0.78_0.17_85/0.3)] to-transparent mt-3" />
                    </motion.div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
                      {groupedByCategory[cat].map((item, idx) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 30, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.5, delay: idx * 0.07 }}
                        >
                          <ProductCard item={item} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* ── Single category grid ── */
              <div
                id={`category-panel-${active.replace(/\s+/g, "-").toLowerCase()}`}
                role="tabpanel"
                aria-label={`${active} category`}
                className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3"
              >
                {filtered.map((item) => (
                  <motion.div key={item.id} variants={itemVariants}>
                    <ProductCard item={item} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="text-center text-[oklch(0.40_0_0)] py-16">No items in this category yet.</p>
        )}
      </div>
    </section>
  );
}
