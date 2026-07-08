"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/lib/store/cart";

const navLinks = [
  { id: "nav-home",      label: "Home",      href: "#home" },
  { id: "nav-all-items", label: "All Items", href: "#menu" },
  { id: "nav-menu",      label: "Menu",      href: "#menu" },
  { id: "nav-deals",     label: "Deals",     href: "#deals" },
  { id: "nav-about",     label: "About",     href: "#about" },
  { id: "nav-reviews",   label: "Reviews",   href: "#reviews" },
  { id: "nav-contact",   label: "Contact",   href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const items = useCartStore((state) => state.items);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const cartCount = items.reduce((sum, item) => sum + item.qty, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Publish the navbar's live height as a CSS variable on <html>.
  // Other components (e.g. the sticky category bar) consume `var(--navbar-h)`
  // so they always sit exactly below the navbar without overlap.
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const root = document.documentElement;
    const write = () => {
      const h = el.getBoundingClientRect().height;
      root.style.setProperty("--navbar-h", `${Math.round(h)}px`);
    };

    write();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(write);
      ro.observe(el);
    }
    window.addEventListener("resize", write);

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", write);
    };
  }, [scrolled]);

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 glass ${
          scrolled
            ? "border-b border-[oklch(0.78_0.17_85/0.15)] py-3"
            : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <motion.a
            href="#home"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <Image 
                src="/logo.png" 
                alt="Khawaja Pizza Club Logo" 
                width={40} 
                height={40} 
                className="w-10 h-10 object-contain rounded-lg group-hover:scale-110 transition-transform"
              />
            </div>
            <div>
              <span className="font-sans text-xl font-bold tracking-wide text-[oklch(0.78_0.17_85)] gold-text-glow" style={{ fontFamily: "var(--font-playfair)" }}>
                Khawaja Pizza Club
              </span>
              <p className="text-[10px] text-[oklch(0.60_0_0)] tracking-[0.2em] uppercase -mt-0.5">
                Thana Chowk, Shujaabad
              </p>
            </div>
          </motion.a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.id}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
                className="relative text-sm text-[oklch(0.75_0_0)] hover:text-[oklch(0.78_0.17_85)] transition-colors duration-300 group tracking-wide"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[oklch(0.78_0.17_85)] group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={toggleCart}
              className="relative p-2.5 rounded-xl glass border border-[oklch(0.78_0.17_85/0.3)] hover:border-[oklch(0.78_0.17_85/0.6)] transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Shopping cart, ${cartCount} items`}
            >
              <ShoppingCart className="w-5 h-5 text-[oklch(0.78_0.17_85)]" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[oklch(0.78_0.17_85)] text-black text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.a
              href="#menu"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[oklch(0.78_0.17_85)] text-black font-semibold text-sm hover:bg-[oklch(0.88_0.14_85)] transition-all duration-300 gold-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Order Now
            </motion.a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-[oklch(0.78_0.17_85)]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-72 z-40 glass border-l border-[oklch(0.78_0.17_85/0.2)] flex flex-col pt-24 pb-8 px-8"
          >
            <nav className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => setMobileOpen(false)}
                  className="text-xl text-[oklch(0.85_0_0)] hover:text-[oklch(0.78_0.17_85)] transition-colors duration-300 border-b border-[oklch(0.20_0_0)] pb-4"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <motion.a
              href="#menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => setMobileOpen(false)}
              className="mt-8 px-6 py-3 rounded-xl bg-[oklch(0.78_0.17_85)] text-black font-bold text-center gold-glow"
            >
              Order Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}
