"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle, Star } from "lucide-react";
import { useCounter } from "@/hooks/use-counter";
import { fadeUp, staggerContainer } from "@/lib/utils/animations";

const BRAND_VALUES = [
  "Farm-Fresh Ingredients — sourced daily from local markets",
  "Crafted with Love — recipes perfected over generations",
  "Delivered with Pride — free, fast & always fresh",
];

function StatCounter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { count, ref } = useCounter(target);
  return (
    <div ref={ref} className="text-center">
      <p className="stat-gold font-bold text-2xl sm:text-3xl font-serif leading-none">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-[oklch(0.40_0_0)] text-xs mt-1 uppercase tracking-widest font-medium">{label}</p>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden bg-black">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] opacity-20"
          style={{
            background: "radial-gradient(circle, oklch(0.78 0.17 85 / 0.12) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] opacity-10"
          style={{
            background: "radial-gradient(circle, oklch(0.78 0.17 85 / 0.06) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-[300px] h-[300px] opacity-5"
          style={{
            background: "radial-gradient(circle, oklch(0.78 0.17 85 / 0.04) 0%, transparent 60%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">

        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-7"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <span className="w-8 h-px bg-gradient-to-r from-[oklch(0.78_0.17_85)] to-[oklch(0.78_0.17_85/0.3)]" />
            <span className="text-[oklch(0.78_0.17_85)] text-xs font-semibold uppercase tracking-[0.25em]">
              Our Story
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-serif font-bold text-balance leading-[1.1]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}
          >
            <span className="text-white">The Khawaja Pizza Club</span>
            <br />
            <span className="gold-shimmer-text">Experience</span>
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="w-16 h-[2px] rounded-full"
            style={{
              background: "linear-gradient(90deg, oklch(0.78 0.17 85) 0%, oklch(0.78 0.17 85 / 0.3) 70%, transparent 100%)",
            }}
          />

          <motion.div variants={fadeUp} className="flex flex-col gap-5 max-w-lg">
            <p className="text-[oklch(0.62_0_0)] leading-[1.85] text-base sm:text-lg">
              At Khawaja Pizza Club, every meal is a statement of quality. We source
              the freshest ingredients, prepare each recipe with precision, and serve
              with a passion that transforms dining into a memorable experience. From
              our hand-stretched pizzas to our signature burgers, every dish reflects
              a relentless commitment to taste, texture, and presentation.
            </p>
            <p className="text-[oklch(0.58_0_0)] leading-[1.85] text-base sm:text-lg">
              We believe the best food brings people together. That is why every order
              we prepare is handled with the same care and attention we would give our
              own family. Fresh ingredients, bold flavours, and timely delivery are not
              just promises — they are the foundation of everything we do.
            </p>
          </motion.div>

          <motion.ul
            variants={staggerContainer(0.08, 0.15)}
            className="flex flex-col gap-4 mt-1"
          >
            {BRAND_VALUES.map((v) => (
              <motion.li
                key={v}
                variants={fadeUp}
                className="flex items-start gap-3 text-[oklch(0.70_0_0)] text-sm sm:text-base"
              >
                <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[oklch(0.78_0.17_85/0.12)] flex items-center justify-center ring-1 ring-[oklch(0.78_0.17_85/0.15)]">
                  <CheckCircle size={12} className="text-[oklch(0.78_0.17_85)]" />
                </span>
                {v}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            variants={fadeUp}
            className="glass-card p-6 sm:p-8 mt-2"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <StatCounter target={5000} suffix="+" label="Orders" />
              <StatCounter target={4800} suffix="+" label="Customers" />
              <StatCounter target={500} suffix="+" label="5★ Reviews" />
              <StatCounter target={30} suffix=" Min" label="Avg Delivery" />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="relative"
        >
          <div
            className="absolute -inset-12 opacity-25 rounded-3xl"
            style={{
              background: "radial-gradient(ellipse at center, oklch(0.78 0.17 85 / 0.18) 0%, transparent 60%)",
              filter: "blur(60px)",
            }}
          />

          <div className="glass-card-premium p-3 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[oklch(0.78_0.17_85/0.35)] rounded-tl-2xl z-20 transition-all duration-500 group-hover:border-[oklch(0.78_0.17_85/0.55)]" />
            <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[oklch(0.78_0.17_85/0.35)] rounded-tr-2xl z-20 transition-all duration-500 group-hover:border-[oklch(0.78_0.17_85/0.55)]" />
            <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[oklch(0.78_0.17_85/0.35)] rounded-bl-2xl z-20 transition-all duration-500 group-hover:border-[oklch(0.78_0.17_85/0.55)]" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[oklch(0.78_0.17_85/0.35)] rounded-br-2xl z-20 transition-all duration-500 group-hover:border-[oklch(0.78_0.17_85/0.55)]" />

            <div className="relative rounded-xl overflow-hidden aspect-[4/5]">
              <Image
                src="/images/about_us_section_image.jpg"
                alt="Khawaja Pizza Club premium restaurant atmosphere"
                width={800}
                height={1100}
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/5" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/10" />
              <div
                className="absolute inset-0 opacity-20 mix-blend-overlay"
                style={{
                  background: "radial-gradient(ellipse at 30% 40%, oklch(0.78 0.17 85 / 0.3) 0%, transparent 60%)",
                }}
              />
            </div>

            <div
              className="absolute inset-0 rounded-2xl border-shimmer pointer-events-none z-10"
              style={{ border: "1px solid oklch(0.78 0.17 85 / 0.15)" }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute -bottom-5 -left-4 sm:-left-7 glass-card-premium px-5 py-3 rounded-2xl text-center z-30"
          >
            <p className="text-[oklch(0.78_0.17_85)] font-bold text-2xl font-serif leading-none">#1</p>
            <p className="text-white/50 text-[10px] uppercase tracking-[0.15em] font-medium mt-0.5">Shujaabad</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 glass-card-premium px-4 py-2.5 rounded-xl text-center z-30"
          >
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-[oklch(0.78_0.17_85)] text-[oklch(0.78_0.17_85)]" />
              <span className="text-[oklch(0.78_0.17_85)] font-bold text-sm">Premium</span>
            </div>
            <p className="text-white/40 text-[9px] uppercase tracking-[0.2em] font-medium mt-0.5">Quality</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
