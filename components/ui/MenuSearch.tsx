"use client";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface MenuSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function MenuSearch({ value, onChange, placeholder }: MenuSearchProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-md mx-auto mb-8"
    >
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[oklch(0.50_0_0)] pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? "Search menu items..."}
          className="w-full bg-white/5 border border-[oklch(0.78_0.17_85)/0.15] rounded-full py-3 pl-11 pr-4 text-sm text-white placeholder-[oklch(0.50_0_0)] outline-none focus:border-[oklch(0.78_0.17_85)/0.4] focus:bg-white/[0.07] focus:shadow-[0_0_20px_oklch(0.78_0.17_85/0.08)] transition-all duration-300"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center text-[oklch(0.40_0_0)] hover:text-white transition-colors"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </motion.div>
  );
}
