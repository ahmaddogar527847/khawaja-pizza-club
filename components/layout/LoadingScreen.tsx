"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("kpc_loaded");
    if (!seen) {
      setVisible(true);
      sessionStorage.setItem("kpc_loaded", "1");
      const t = setTimeout(() => setVisible(false), 2400);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 200 }}
            className="relative mb-4"
          >
            <div className="w-24 h-24 rounded-full border-2 border-[rgba(224,184,76,0.35)] flex items-center justify-center overflow-hidden relative">
              {/* Shimmer sweep */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F4D06F]/30 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
              <img
                src="/logo.png"
                alt="Khawaja Pizza Club"
                className="w-16 h-16 object-contain"
              />
            </div>
          </motion.div>

          {/* Restaurant name */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="gold-shimmer-text font-serif text-3xl font-bold tracking-wide text-center"
          >
            Khawaja Pizza Club
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.4 }}
            className="text-white/50 text-xs uppercase tracking-[0.3em] mt-2"
          >
            Pizza · Burger · Fast Food
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#E0B84C] via-[#F4D06F] to-[#C9A84C]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.2, duration: 0.9, ease: "easeInOut" }}
            style={{ boxShadow: "0 0 10px rgba(212,175,55,0.7)" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
