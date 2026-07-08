"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ShoppingCart, CheckCircle2, Flame, Star, Users, Gem, Sparkles } from "lucide-react";
import { DEALS, DealItem } from "@/lib/data/deals";
import { getCategoryFallbackImage, resolveDealImage } from "@/lib/utils/images";
import { useCartStore } from "@/lib/store/cart";
import { fadeUp, staggerContainer } from "@/lib/utils/animations";
import { smartSearch, getSearchPlaceholder } from "@/lib/utils/search";
import MenuSearch from "@/components/ui/MenuSearch";

const TAG_CONFIG: Record<DealItem["tag"], { label: string; icon: React.ElementType; style: string }> = {
  "HOT DEAL":      { label: "HOT DEAL",      icon: Flame,     style: "bg-red-500/20 text-red-400 border-red-500/30" },
  "MOST POPULAR":  { label: "MOST POPULAR",  icon: Star,      style: "bg-[oklch(0.78_0.17_85/0.18)] text-[oklch(0.78_0.17_85)] border-[oklch(0.78_0.17_85/0.28)]" },
  "FAMILY DEAL":   { label: "FAMILY DEAL",   icon: Users,     style: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  "BEST VALUE":    { label: "BEST VALUE",    icon: Gem,       style: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" },
  "NEW":           { label: "NEW",           icon: Sparkles,  style: "bg-blue-500/15 text-blue-400 border-blue-500/25" },
};

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

function DealCard({ deal }: { deal: DealItem }) {
  const { addItem, openCart } = useCartStore();
  const tag = TAG_CONFIG[deal.tag];
  const TagIcon = tag.icon;
  const savings = deal.originalPrice ? deal.originalPrice - deal.price : 0;

  const initialImg = resolveDealImage(deal.name, deal.image);
  const [imgSrc, setImgSrc] = useState(initialImg);

  const handleAdd = () => {
    addItem({
      id: deal.id,
      name: deal.name,
      price: deal.price,
      image: imgSrc,
    });
    openCart();
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -2, scale: 1.005 }}
      transition={{ duration: 0.35 }}
      className="glass-card rounded-2xl overflow-hidden flex flex-col group cursor-default relative"
      style={{
        willChange: "transform",
        boxShadow: `0 0 0 0 transparent, 0 4px 20px rgba(0,0,0,0.3)`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 30px rgba(212,175,55,0.25), 0 8px 30px rgba(0,0,0,0.4)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 0 transparent, 0 4px 20px rgba(0,0,0,0.3)`;
      }}
    >
      {/* Image */}
      <div className="relative w-full aspect-[14/9] lg:aspect-[7/5] overflow-hidden shrink-0 bg-white/5">
        <Image
          src={imgSrc}
          alt={deal.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImgSrc(getCategoryFallbackImage("Deals"))}
        />
        {/* Tag badge */}
        <span className={`absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide border z-10 ${tag.style}`}>
          <TagIcon size={8} />
          {tag.label}
        </span>
        {/* Savings badge */}
        {savings > 0 && (
          <span className="absolute top-2 right-2 bg-black/70 text-[oklch(0.78_0.17_85)] text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-[oklch(0.78_0.17_85/0.28)] z-10">
            Save Rs. {savings}
          </span>
        )}
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/80 to-transparent" />
        <span className="absolute bottom-1.5 left-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/50">
          {deal.type === "family" ? "FAMILY DEAL" : "COMBO"}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 lg:gap-3 p-3 lg:p-4 flex-1 relative">
        <div className="absolute top-0 left-2 right-2 h-px bg-gradient-to-r from-amber-700/60 via-yellow-600/40 to-transparent" />

        <h3 className="text-white font-bold text-sm leading-snug">
          {deal.name}
        </h3>

        <ul className="flex flex-col gap-1">
          {deal.includes.map((inc) => (
            <li key={inc} className="flex items-start gap-1.5 text-white/60 text-[11px]">
              <CheckCircle2 size={9} className="text-[oklch(0.78_0.17_85)]/70 shrink-0 mt-0.5" />
              {inc}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            {deal.originalPrice && (
              <span className="text-[9px] text-[oklch(0.40_0_0)] line-through">Rs. {deal.originalPrice}</span>
            )}
            <span className="text-[oklch(0.78_0.17_85)] font-bold text-sm leading-tight">Rs. {deal.price}</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            className="gold-btn px-2.5 py-1.5 rounded-xl text-[10px] font-bold flex items-center gap-1"
          >
            <ShoppingCart size={10} />
            Add Deal
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function DealsSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const searchableDeals = useMemo(
    () => DEALS.map((deal) => ({
      name: deal.name,
      description: deal.includes.join(", "),
      category: "deals",
      searchPrices: [deal.price],
      _deal: deal,
    })),
    [],
  );

  const filteredDeals = useMemo(
    () => smartSearch(searchableDeals, searchQuery).map((s) => s._deal),
    [searchableDeals, searchQuery],
  );

  const regularDeals = filteredDeals.filter((d) => d.type === "regular");
  const familyDeals = filteredDeals.filter((d) => d.type === "family");

  return (
    <section id="deals" className="py-16 sm:py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(212,175,55,0.05)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.p variants={fadeUp} className="text-[oklch(0.78_0.17_85)] text-xs uppercase tracking-[0.35em] font-medium mb-4">
            Special Offers
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
              Deals & Combos
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[oklch(0.60_0_0)] text-sm sm:text-base max-w-xl mx-auto leading-relaxed tracking-wide">
            Unbeatable combos crafted to satisfy every craving — bigger savings, bigger flavour.
          </motion.p>
        </motion.div>

        <MenuSearch
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={getSearchPlaceholder("deals")}
        />

        {searchQuery && (
          <motion.p
            key={searchQuery}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-[oklch(0.45_0_0)] text-xs mb-6"
          >
            📦 {filteredDeals.length} {filteredDeals.length === 1 ? "deal" : "deals"} found
          </motion.p>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={`regular-${searchQuery || "all"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* ═══ Regular Deals ═══ */}
            {regularDeals.length > 0 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="flex items-center gap-4 mb-8">
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
                      🔥 Regular Deals
                    </span>
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-[oklch(0.78_0.17_85/0.5)] via-[oklch(0.78_0.17_85/0.3)] to-transparent" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 sm:gap-3">
                  {regularDeals.map((deal) => (
                    <DealCard key={deal.id} deal={deal} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ═══ Family Deals ═══ */}
            {familyDeals.length > 0 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-8">
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
                        👨‍👩‍👧‍👦 Family Deals
                    </span>
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-[oklch(0.78_0.17_85/0.5)] via-[oklch(0.78_0.17_85/0.3)] to-transparent" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-3">
                  {familyDeals.map((deal) => (
                    <DealCard key={deal.id} deal={deal} />
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {filteredDeals.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <p className="text-[oklch(0.40_0_0)] text-base mb-2">No matching deals found</p>
            <p className="text-[oklch(0.35_0_0)] text-sm">Try another keyword or price.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
