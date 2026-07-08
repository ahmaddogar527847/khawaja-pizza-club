"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Plus, Minus, ShoppingCart, Star } from "lucide-react";
import { MenuItem } from "@/lib/data/menu";
import { getCategoryFallbackImage, resolveProductImage, resolveProductImageCloud, isCategoryFallback } from "@/lib/utils/images";
import { useCartStore } from "@/lib/store/cart";

const BADGE_STYLES: Record<string, string> = {
  "Best Seller": "bg-black/70 text-[#FFD700] border-[#FFD700]/40",
  "Hot":         "bg-red-900/80 text-red-200 border-red-400/40",
  "Spicy":       "bg-orange-900/80 text-orange-200 border-orange-400/40",
  "New":         "bg-blue-900/80 text-blue-200 border-blue-400/40",
  "Signature":   "bg-purple-900/70 text-purple-200 border-purple-400/40",
  "Family":      "bg-amber-900/80 text-amber-200 border-amber-400/40",
  "Special":     "bg-black/70 text-[#FFD700] border-[#FFD700]/40",
  "Popular":     "bg-black/60 text-[#FFD700] border-[#FFD700]/30",
  "Premium":     "bg-black/60 text-[#FFD700] border-[#FFD700]/30",
  "Value":       "bg-emerald-900/80 text-emerald-200 border-emerald-400/40",
  "Classic":     "bg-black/60 text-white border-white/30",
  "Desi":        "bg-amber-900/80 text-amber-200 border-amber-400/40",
  "Authentic":   "bg-orange-900/80 text-orange-200 border-orange-400/40",
  "Crispy":      "bg-yellow-900/80 text-yellow-200 border-yellow-400/40",
  "Kids Fav":    "bg-pink-900/80 text-pink-200 border-pink-400/40",
  "Add-on":      "bg-black/50 text-white/80 border-white/25",
  "Traditional": "bg-black/60 text-[#FFD700] border-[#FFD700]/30",
};

function getBadgeStyle(badge: string) {
  return BADGE_STYLES[badge] ?? "bg-black/60 text-white border-white/30";
}

const CATEGORY_ACCENTS: Record<string, { glow: string; border: string; label: string }> = {
  Pizza:       { glow: "rgba(212,175,55,0.25)",   border: "from-amber-700/60 via-yellow-600/40 to-transparent", label: "Pizza" },
  Burgers:     { glow: "rgba(244,164,96,0.25)",   border: "from-orange-700/60 via-amber-600/40 to-transparent", label: "Burger" },
  Shawarma:    { glow: "rgba(218,165,32,0.25)",   border: "from-yellow-700/60 via-amber-700/40 to-transparent", label: "Shawarma" },
  "Wrap Rolls":{ glow: "rgba(192,192,192,0.20)",  border: "from-zinc-500/60 via-stone-400/40 to-transparent",   label: "Roll" },
  Sandwiches:  { glow: "rgba(238,232,170,0.20)",  border: "from-stone-600/60 via-amber-500/40 to-transparent",  label: "Sandwich" },
  Pasta:       { glow: "rgba(255,239,213,0.20)",  border: "from-rose-600/60 via-amber-500/40 to-transparent",   label: "Pasta" },
  Appetizers:  { glow: "rgba(255,140,0,0.20)",    border: "from-orange-600/60 via-amber-500/40 to-transparent",  label: "Snack" },
  Platters:    { glow: "rgba(184,134,11,0.25)",   border: "from-amber-700/60 via-yellow-600/40 to-transparent",  label: "Platter" },
  Broast:      { glow: "rgba(218,165,32,0.25)",   border: "from-amber-700/60 via-yellow-600/40 to-transparent",  label: "Broast" },
  "Topping & Dip Sauce": { glow: "rgba(238,232,170,0.15)", border: "from-stone-600/60 via-stone-500/40 to-transparent", label: "Sauce" },
};

export default function ProductCard({ item }: { item: MenuItem }) {
  const [qty, setQty] = useState(1);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const initialImg = resolveProductImage(item.name, item.category, item.image);
  const [imgSrc, setImgSrc] = useState(initialImg);
  const { addItem, openCart } = useCartStore();

  useEffect(() => {
    const local = resolveProductImage(item.name, item.category, item.image);
    setImgSrc(local);

    if (isCategoryFallback(local, item.category)) {
      resolveProductImageCloud(item.name, item.category).then((cloud) => {
        if (cloud) setImgSrc(cloud);
      });
    }
  }, [item.name, item.category, item.image]);

  const accent = CATEGORY_ACCENTS[item.category] ?? CATEGORY_ACCENTS.Pizza;

  const variant = item.variants?.[selectedVariantIdx];
  const displayPrice = variant ? variant.price : item.price ?? 0;
  const priceStr = displayPrice === 0 ? "Ask for Price" : `Rs. ${displayPrice.toLocaleString()}`;

  const handleAdd = () => {
    const cartId = variant ? `${item.id}-${variant.label}` : item.id;
    for (let i = 0; i < qty; i++) {
      addItem({
        id: cartId,
        name: variant ? `${item.name} (${variant.label})` : item.name,
        price: Number(displayPrice), // always a number
        image: imgSrc,
        variant: variant?.label,
      });
    }
    openCart();
    setQty(1);
  };

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.005 }}
      transition={{ duration: 0.35 }}
      className="glass-card rounded-2xl overflow-hidden flex flex-col group cursor-default relative"
      style={{
        willChange: "transform",
        boxShadow: `0 0 0 0 transparent, 0 4px 20px rgba(0,0,0,0.3)`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 30px ${accent.glow}, 0 8px 30px rgba(0,0,0,0.4)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 0 transparent, 0 4px 20px rgba(0,0,0,0.3)`;
      }}
    >
      {/* Image */}
      <div className="relative w-full aspect-[14/9] lg:aspect-[7/5] overflow-hidden shrink-0 bg-white/5">
        <Image
          src={imgSrc}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImgSrc(getCategoryFallbackImage(item.category))}
        />
        {/* Badge */}
        {item.badge && (
          <span
            className={`absolute top-2 left-2 px-1.5 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wide border z-10 ${getBadgeStyle(item.badge)}`}
          >
            {item.badge}
          </span>
        )}
        {/* Category label */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/80 to-transparent" />
        <span className="absolute bottom-1.5 left-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/50">
          {accent.label}
        </span>
        {/* Stars */}
        <div className="absolute top-2 right-2 flex gap-0.5 z-10">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={8} className="text-[oklch(0.78_0.17_85)] fill-[oklch(0.78_0.17_85)]" />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 lg:gap-3 p-3 lg:p-4 flex-1 relative">
        {/* Category accent top bar */}
        <div className={`absolute top-0 left-2 right-2 h-px bg-gradient-to-r ${accent.border}`} />

        <div>
          <h3 className="text-white font-semibold text-xs leading-snug line-clamp-2 text-balance">
            {item.name}
          </h3>
          <p className="text-[oklch(0.60_0_0)] text-[11px] leading-snug line-clamp-1">
            {item.description}
          </p>
        </div>

        {/* Variants */}
        {item.variants && item.variants.length > 1 && (
          <div className="flex flex-wrap gap-0.5">
            {item.variants.map((v, i) => (
              <button
                key={v.label}
                onClick={() => setSelectedVariantIdx(i)}
                className={`px-1.5 py-0.5 rounded-full text-[8px] font-semibold border transition-all ${
                  i === selectedVariantIdx
                    ? "bg-[oklch(0.78_0.17_85)] text-black border-[oklch(0.78_0.17_85)]"
                    : "bg-transparent text-[oklch(0.60_0_0)] border-[oklch(0.20_0_0)] hover:border-[oklch(0.78_0.17_85/0.4)]"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        {/* Price + qty */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-[9px] text-[oklch(0.50_0_0)] uppercase tracking-wider font-medium">Price</span>
            <span className="text-[oklch(0.78_0.17_85)] font-bold text-sm leading-tight">{priceStr}</span>
          </div>
          {displayPrice > 0 && (
            <div className="flex items-center gap-0.5 bg-white/5 rounded-full px-0.5 py-0.5 border border-white/10">
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={8} className="text-white/70" />
              </motion.button>
              <span className="text-white font-bold text-[10px] w-3 text-center">{qty}</span>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => setQty((q) => q + 1)}
                className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={8} className="text-[oklch(0.78_0.17_85)]" />
              </motion.button>
            </div>
          )}
        </div>

        {/* Add to cart */}
        {displayPrice > 0 && (
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleAdd}
            className="gold-btn w-full py-1.5 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1"
          >
            <ShoppingCart size={10} />
            Add to Cart
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
