"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/lib/store/cart";
import CheckoutForm from "./CheckoutForm";

export default function CartSidebar() {
  const { isOpen, closeCart, items, removeItem, updateQty } = useCartStore();
  const [showCheckout, setShowCheckout] = useState(false);

  // Compute totals fresh on every render — never rely on store-computed getters
  const subtotal = items.reduce((sum, i) => sum + Number(i.price) * i.qty, 0);
  const total = subtotal; // free delivery

  const handleClose = () => {
    setShowCheckout(false);
    closeCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[150]"
            onClick={handleClose}
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-[160] flex flex-col"
            style={{
              background: "rgba(5,5,5,0.98)",
              backdropFilter: "blur(20px)",
              borderLeft: "1px solid rgba(212,175,55,0.15)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(224,184,76,0.1)]">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-[oklch(0.78_0.17_85)]" />
                <h2 className="text-white font-serif font-bold text-lg">
                  {showCheckout ? "Your Details" : "Your Cart"}
                </h2>
                {!showCheckout && items.length > 0 && (
                  <span className="bg-[#E0B84C] text-black text-xs font-bold px-2 py-0.5 rounded-full">
                    {items.reduce((s, i) => s + i.qty, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Close cart"
              >
                <X size={16} className="text-white/60" />
              </button>
            </div>

            {showCheckout ? (
              <CheckoutForm
                items={items}
                subtotal={subtotal}
                onBack={() => setShowCheckout(false)}
              />
            ) : (
              <>
                {/* Cart items */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                  <AnimatePresence initial={false}>
                    {items.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center h-full gap-4 text-center py-20"
                      >
                        <ShoppingBag size={48} className="text-white/20" />
                        <p className="text-white/40 text-sm">Your cart is empty</p>
                        <button
                          onClick={closeCart}
                          className="gold-btn px-5 py-2.5 rounded-full text-xs font-bold"
                        >
                          Browse Menu
                        </button>
                      </motion.div>
                    ) : (
                      items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center gap-3 glass-card p-3 rounded-xl"
                        >
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-white/5">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="56px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-xs font-semibold truncate">
                              {item.name}
                            </p>
                            {item.variant && (
                              <p className="text-white/40 text-[10px]">{item.variant}</p>
                            )}
                            <p className="text-[oklch(0.78_0.17_85)] text-xs font-bold mt-0.5">
                              Rs. {(Number(item.price) * item.qty).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/15 transition-colors"
                              aria-label="Decrease"
                            >
                              <Minus size={11} className="text-white/70" />
                            </button>
                            <span className="text-white font-bold text-xs w-5 text-center">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/15 transition-colors"
                              aria-label="Increase"
                            >
                              <Plus size={11} className="text-[oklch(0.78_0.17_85)]" />
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-500/15 transition-colors ml-1"
                              aria-label="Remove item"
                            >
                              <Trash2 size={11} className="text-red-400/70" />
                            </button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                {items.length > 0 && (
                  <div className="px-5 py-4 border-t border-[rgba(224,184,76,0.1)] space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Subtotal</span>
                      <span className="text-white font-semibold">
                        Rs. {subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Delivery</span>
                      <span className="text-[#25D366] font-semibold">Free</span>
                    </div>
                    <div className="flex justify-between font-bold border-t border-[rgba(224,184,76,0.1)] pt-3">
                      <span className="text-white">Total</span>
                      <span className="text-[oklch(0.78_0.17_85)] text-lg">
                        Rs. {total.toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => setShowCheckout(true)}
                      className="gold-btn w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                    >
                      <img src="/images/Whatsapp%20Logo.jpg" alt="WhatsApp logo" className="w-3.5 h-3.5 object-contain" />
                      Proceed to Order
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
