"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Zap } from "lucide-react";
import Image from "next/image";
import { RESTAURANT } from "@/lib/data/restaurant";

function generateParticles() {
  return Array.from({ length: 35 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 8,
    opacity: Math.random() * 0.4 + 0.1,
  }))
}

function FloatingParticles() {
  const [particles, setParticles] = useState<ReturnType<typeof generateParticles>>([])

  useEffect(() => {
    setParticles(generateParticles())
  }, [])

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: "oklch(0.78 0.17 85)",
            opacity: p.opacity,
            boxShadow: "0 0 10px oklch(0.78 0.17 85 / 0.8)",
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden premium-hero-bg"
      aria-label="Hero section"
    >
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <div className="absolute inset-0 bg-[oklch(0.03_0_0)]" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-20"
          style={{
            background: "radial-gradient(ellipse at center top, oklch(0.78 0.17 85 / 0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[500px] opacity-15"
          style={{
            background: "radial-gradient(circle at bottom right, oklch(0.78 0.17 85 / 0.12) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute top-1/4 left-0 w-[400px] h-[400px] opacity-10"
          style={{
            background: "radial-gradient(circle, oklch(0.78 0.17 85 / 0.08) 0%, transparent 60%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(oklch(0.78 0.17 85 / 0.5) 1px, transparent 1px),
                              linear-gradient(90deg, oklch(0.78 0.17 85 / 0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, oklch(0.03 0 0 / 0.8) 100%)",
          }}
        />
      </motion.div>

      <FloatingParticles />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center pt-20 lg:pt-24 pb-12 lg:pb-16"
        style={{ opacity }}
      >
        <div className="flex flex-col gap-5 lg:gap-6 text-center lg:text-left">
          

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col"
              style={{ 
                fontFamily: "var(--font-playfair)",
                lineHeight: '1.1',
              }}
            >
              <div className="flex flex-wrap items-baseline justify-center lg:justify-start gap-x-2 sm:gap-x-3 lg:gap-x-4">
                <span className="text-[clamp(2rem,8vw,5.5rem)] font-extrabold luxury-white-text tracking-tight">
                  Khawaja
                </span>
                <span className="text-[clamp(2rem,8vw,5.5rem)] font-extrabold premium-gold-text tracking-tight">
                  Pizza
                </span>
              </div>
              <div className="mt-0.5 lg:mt-1">
                <span className="text-[clamp(2rem,8vw,5.5rem)] font-extrabold premium-gold-text tracking-tight">
                  Club
                </span>
              </div>
              <div className="mt-3 sm:mt-4 lg:mt-6 flex flex-wrap items-baseline justify-center lg:justify-start gap-x-2 sm:gap-x-3">
                <span className="text-[clamp(1.2rem,4.5vw,2.75rem)] font-medium luxury-white-text tracking-wide">
                  Utterly,
                </span>
                <span className="text-[clamp(1.2rem,4.5vw,2.75rem)] font-medium luxury-white-text tracking-wide">
                  Butterly
                </span>
              </div>
              <div className="mt-0.5 lg:mt-1">
                <span className="text-[clamp(1.2rem,4.5vw,2.75rem)] font-medium premium-gold-text tracking-wide">
                  Delicious
                </span>
              </div>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-base sm:text-lg text-[oklch(0.60_0_0)] leading-relaxed max-w-xl mx-auto lg:mx-0 premium-subheading"
          >
            Premium Pizza, Burgers &amp; Fast Food. Real flavours, fresh ingredients — home delivery across Shujaabad. Call {RESTAURANT.phone}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8 premium-stats"
          >
            {[
              { value: "50K+", label: "Orders" },
              { value: "4.9", label: "Rating", icon: <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[oklch(0.78_0.17_85)] text-[oklch(0.78_0.17_85)]" /> },
              { value: "15min", label: "Delivery" },
            ].map((stat, idx) => (
              <div key={stat.label} className="relative flex flex-col premium-stat-item text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1 sm:gap-1.5">
                  {stat.icon}
                  <span className="text-lg sm:text-xl lg:text-2xl font-bold text-[oklch(0.78_0.17_85)]" style={{ fontFamily: "var(--font-playfair)" }}>
                    {stat.value}
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs text-[oklch(0.50_0_0)] uppercase tracking-widest">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
          >
            <motion.a
              href="#menu"
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px oklch(0.78 0.17 85 / 0.6)" }}
              whileTap={{ scale: 0.97 }}
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-[oklch(0.78_0.17_85)] text-black font-bold text-sm sm:text-base text-center transition-all duration-300 premium-primary-btn"
            >
              Order Now
            </motion.a>
            <motion.a
              href="#menu"
              whileHover={{ scale: 1.05, borderColor: "oklch(0.78 0.17 85 / 0.8)", background: "oklch(0.78 0.17 85 / 0.08)" }}
              whileTap={{ scale: 0.97 }}
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl glass border border-[oklch(0.78_0.17_85/0.3)] text-[oklch(0.78_0.17_85)] font-semibold text-sm sm:text-base text-center transition-all duration-300 premium-secondary-btn"
            >
              View Menu
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="relative w-full aspect-square max-w-[540px] mx-auto">
            <div
              className="absolute inset-0 rounded-full opacity-40 premium-pizza-glow"
              style={{
                background: "radial-gradient(circle, oklch(0.78 0.17 85 / 0.5) 0%, transparent 60%)",
                filter: "blur(50px)",
              }}
            />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 rounded-full premium-dotted-ring"
              style={{
                border: "2px dashed oklch(0.78 0.17 85 / 0.4)",
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute inset-6 rounded-full"
              style={{
                border: "1px solid oklch(0.78 0.17 85 / 0.2)",
              }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute inset-10 rounded-full"
              style={{
                border: "1px dotted oklch(0.78 0.17 85 / 0.15)",
              }}
            />

            <motion.div
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10 w-full h-full p-10"
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden premium-hero-image">
                <Image
                  src="/hero-food.png"
                  alt="Premium pizza and burger feast"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-[oklch(0.04_0_0/0.15)]" />
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, -10, 0],
                x: [0, 5, 0],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="absolute -left-8 top-[15%] glass rounded-2xl p-4 flex items-center gap-3 z-20 premium-floating-card"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-[oklch(0.78_0.17_85/0.3)]">
                <Image src="/images/pizzas/super_supreme.jpg" alt="Khawaja Special Pizza" width={48} height={48} className="object-cover w-full h-full" />
              </div>
              <div>
                <p className="text-sm font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">Khawaja Special</p>
                <p className="text-sm text-[oklch(0.78_0.17_85)] font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">Rs. 1,030</p>
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, -10, 0],
                x: [0, -5, 0],
              }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              className="absolute -right-8 bottom-[25%] glass rounded-2xl p-4 flex items-center gap-3 z-20 premium-floating-card"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-[oklch(0.78_0.17_85/0.3)]">
                <Image src="/images/burgers/zinger.jpg" alt="Zinger Burger" width={48} height={48} className="object-cover w-full h-full" />
              </div>
              <div>
                <p className="text-sm font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">Zinger Burger</p>
                <p className="text-sm text-[oklch(0.78_0.17_85)] font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">Rs. 330</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute -right-4 top-1/2 glass border border-[oklch(0.78_0.17_85/0.3)] rounded-xl px-4 py-2 z-20"
            >
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-[oklch(0.78_0.17_85)] text-[oklch(0.78_0.17_85)]" />
                <span className="text-sm font-bold text-[oklch(0.78_0.17_85)]">4.9</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Mobile Pizza Visual - Complete Premium Showcase with Full Rings */}
        <div className="lg:hidden w-full px-2 sm:px-4 pb-10 overflow-visible">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="relative mx-auto w-full max-w-[460px] sm:max-w-[480px] overflow-visible"
            style={{ padding: '14px' }}
          >
            {/* Cinematic outer glow - spreads beyond container */}
            <div className="absolute inset-0 -inset-[30px] sm:-inset-[40px] pointer-events-none">
              <div
                className="w-full h-full rounded-full opacity-60"
                style={{
                  background: "radial-gradient(circle, oklch(0.78 0.17 85 / 0.5) 30%, oklch(0.78 0.17 85 / 0.2) 60%, transparent 100%)",
                  filter: "blur(40px)",
                }}
              />
            </div>

            {/* Outer animated ring - FULL CIRCLE */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 sm:inset-2 rounded-full"
              style={{
                border: "2px dashed oklch(0.78 0.17 85 / 0.2)",
              }}
            />

            {/* Middle animated ring - FULL CIRCLE */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[6%] sm:inset-[5%] rounded-full"
              style={{
                border: "1.5px solid oklch(0.78 0.17 85 / 0.12)",
              }}
            />

            {/* Inner dotted ring - FULL CIRCLE */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[12%] sm:inset-[10%] rounded-full"
              style={{
                border: "1px dotted oklch(0.78 0.17 85 / 0.08)",
              }}
            />

            {/* Main pizza image - PROMINENT in center */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-full aspect-square"
            >
              <div className="absolute inset-[14%] sm:inset-[12%]">
                <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-[oklch(0.78_0.17_85/0.15)]">
                  <Image
                    src="/hero-food.png"
                    alt="Premium pizza and burger feast"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                </div>
              </div>
            </motion.div>

            {/* Floating card 1 - Zinger Burger - Top Right */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                x: [0, 5, 0],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="absolute -right-2 sm:-right-5 top-[8%] glass rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3 z-20"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-[oklch(0.78_0.17_85/0.3)]">
                <Image src="/images/burgers/zinger.jpg" alt="Zinger Burger" width={48} height={48} className="object-cover w-full h-full" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">Zinger Burger</p>
                <p className="text-[10px] sm:text-xs text-[oklch(0.78_0.17_85)] font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">Rs. 330</p>
              </div>
            </motion.div>

            {/* Floating card 2 - Khawaja Special - Bottom Left */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                x: [0, -5, 0],
              }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -left-2 sm:-left-5 bottom-[18%] glass rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3 z-20"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-[oklch(0.78_0.17_85/0.3)]">
                <Image src="/images/pizzas/super_supreme.jpg" alt="Khawaja Special Pizza" width={48} height={48} className="object-cover w-full h-full" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">Khawaja Special</p>
                <p className="text-[10px] sm:text-xs text-[oklch(0.78_0.17_85)] font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">Rs. 1,030</p>
              </div>
            </motion.div>

            {/* Rating badge - Right Side */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 glass border border-[oklch(0.78_0.17_85/0.3)] rounded-xl sm:rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 z-20"
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Star className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-[oklch(0.78_0.17_85)] text-[oklch(0.78_0.17_85)]" />
                <span className="text-sm sm:text-base font-bold text-[oklch(0.78_0.17_85)]">4.9</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
