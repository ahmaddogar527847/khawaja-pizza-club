"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[200] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #D4A017, #F4D06F, #E0B84C)",
        boxShadow: "0 0 10px rgba(212,160,23,0.55)",
      }}
    />
  );
}
