"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function generateParticles() {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 12 + 8,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.3 + 0.05,
  }))
}

export default function GlobalParticles() {
  const [particles, setParticles] = useState<ReturnType<typeof generateParticles>>([])

  useEffect(() => {
    setParticles(generateParticles())
  }, [])

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
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
            boxShadow: `0 0 ${p.size * 1.5}px oklch(0.78 0.17 85 / 0.6)`,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.random() * 20 - 10, 0],
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