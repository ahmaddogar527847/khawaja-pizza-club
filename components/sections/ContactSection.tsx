"use client";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock } from "lucide-react";
import { RESTAURANT } from "@/lib/data/restaurant";
import { CONTACT, CONTACT_URLS } from "@/lib/contact";
import { fadeUp, staggerContainer } from "@/lib/utils/animations";

const CONTACT_CARDS = [
  {
    icon: Phone,
    label: "Call Us",
    value: CONTACT.phoneDisplay,
    action: {
      label: "Call Now",
      href: CONTACT_URLS.tel,
    },
  },
  {
    iconSrc: "/images/Whatsapp%20Logo.jpg",
    label: "WhatsApp",
    value: CONTACT.phoneDisplay,
    action: {
      label: "Chat Now",
      href: CONTACT_URLS.whatsapp,
      target: "_blank",
    },
    green: true,
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: RESTAURANT.address,
    action: {
      label: "Get Directions",
      href: `https://maps.google.com/?q=${encodeURIComponent(RESTAURANT.address)}`,
      target: "_blank",
    },
  },
  {
    icon: Clock,
    label: "Hours",
    value: RESTAURANT.hours,
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-black relative">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_20%_50%,rgba(212,175,55,0.04)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.p variants={fadeUp} className="text-[oklch(0.78_0.17_85)] text-xs uppercase tracking-[0.3em] font-semibold mb-3">
            Get In Touch
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif font-bold text-white text-balance"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            Reach <span className="gold-shimmer-text">Us</span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact cards */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {CONTACT_CARDS.map((card) => {
              const IconComponent = card.icon;
              return (
                <motion.div
                  key={card.label}
                  variants={fadeUp}
                  className="glass-card p-6 rounded-2xl flex flex-col gap-3"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.green ? "bg-[#25D366]/15" : "bg-[rgba(224,184,76,0.12)]"}`}>
                    {card.iconSrc ? (
                      <img src={card.iconSrc} alt={`${card.label} logo`} className="w-5 h-5 object-contain" />
                    ) : (
                      IconComponent && <IconComponent size={18} className={card.green ? "text-[#25D366]" : "text-[oklch(0.78_0.17_85)]"} />
                    )}
                  </div>
                  <p className="text-white/40 text-xs uppercase tracking-wide">{card.label}</p>
                  <p className="text-white font-medium text-sm leading-snug">{card.value}</p>
                  {card.action && (
                    <a
                      href={card.action.href}
                      target={(card.action as { target?: string }).target}
                      rel="noopener noreferrer"
                      className={`text-xs font-semibold mt-auto ${card.green ? "text-[#25D366] hover:underline" : "text-[oklch(0.78_0.17_85)] hover:underline"}`}
                    >
                      {card.action.label} →
                    </a>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-4"
          >
            <div className="glass-card-premium p-3 rounded-2xl overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[oklch(0.78_0.17_85/0.3)] rounded-tl-2xl z-10" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[oklch(0.78_0.17_85/0.3)] rounded-tr-2xl z-10" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[oklch(0.78_0.17_85/0.3)] rounded-bl-2xl z-10" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[oklch(0.78_0.17_85/0.3)] rounded-br-2xl z-10" />
              <div
                className="absolute -inset-4 opacity-10 rounded-3xl pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, oklch(0.78 0.17 85 / 0.25) 0%, transparent 60%)",
                  filter: "blur(30px)",
                }}
              />
              <div className="relative rounded-xl overflow-hidden">
                <div className="relative">
                  <iframe
                    src={`https://maps.google.com/maps?q=29.8809,71.2934&z=16&output=embed`}
                    width="100%"
                    height="420"
                    className="rounded-xl"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Khawaja Pizza Club — Thana Chowk, Shujaabad"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 px-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[oklch(0.78_0.17_85/0.1)] flex items-center justify-center shrink-0">
                  <MapPin size={14} className="text-[oklch(0.78_0.17_85)]" />
                </div>
                <p className="text-[oklch(0.55_0_0)] text-xs leading-tight">
                  Thana Chowk, near Allah Chowk<br />
                  <span className="text-[oklch(0.40_0_0)]">Shujaabad, Punjab</span>
                </p>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent("Thana Chowk Shujaabad near Allah Chowk")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-btn px-4 py-2 rounded-xl text-[10px] font-bold whitespace-nowrap"
              >
                Get Directions
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
