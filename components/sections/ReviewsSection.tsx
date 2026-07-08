"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { REVIEWS } from "@/lib/data/restaurant";
import { fadeUp, staggerContainer } from "@/lib/utils/animations";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "text-[oklch(0.78_0.17_85)] fill-[oklch(0.78_0.17_85)]" : "text-[oklch(0.20_0_0)]"}
        />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((a) => (a + 1) % REVIEWS.length), []);
  const prev = useCallback(() => setActive((a) => (a - 1 + REVIEWS.length) % REVIEWS.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 3500);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <section id="reviews" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(212,175,55,0.04)_0%,transparent_70%)]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.p variants={fadeUp} className="text-[oklch(0.78_0.17_85)] text-xs uppercase tracking-[0.3em] font-semibold mb-3">
            What Customers Say
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif font-bold text-white text-balance"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            Loved by <span className="gold-shimmer-text">Shujaabad</span>
          </motion.h2>
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-8 sm:p-10 rounded-3xl border border-[rgba(224,184,76,0.2)] max-w-3xl mx-auto"
            >
              <span className="text-[rgba(224,184,76,0.2)] font-serif text-8xl leading-none block -mb-4">
                &ldquo;
              </span>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed font-serif italic mb-6">
                {REVIEWS[active].text}
              </p>
              <StarRating rating={REVIEWS[active].rating} />
              <div className="flex items-center gap-4 mt-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[oklch(0.88_0.14_85)] to-[oklch(0.60_0.13_85)] flex items-center justify-center text-black font-bold text-sm shrink-0">
                  {REVIEWS[active].avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{REVIEWS[active].name}</p>
                  <p className="text-white/40 text-xs">
                    {REVIEWS[active].location} · {REVIEWS[active].date}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-8 w-10 h-10 rounded-full glass-card border border-[rgba(224,184,76,0.2)] flex items-center justify-center hover:border-[rgba(224,184,76,0.5)] transition-colors"
            aria-label="Previous review"
          >
            <ChevronLeft size={16} className="text-[oklch(0.78_0.17_85)]" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-8 w-10 h-10 rounded-full glass-card border border-[rgba(224,184,76,0.2)] flex items-center justify-center hover:border-[rgba(224,184,76,0.5)] transition-colors"
            aria-label="Next review"
          >
            <ChevronRight size={16} className="text-[oklch(0.78_0.17_85)]" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${
                i === active
                  ? "w-6 h-2 bg-[oklch(0.78_0.17_85)]"
                  : "w-2 h-2 bg-[oklch(0.20_0_0)] hover:bg-[oklch(0.40_0_0)]"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
