"use client";
import { motion } from "framer-motion";
import { CONTACT_URLS } from "@/lib/contact";

export default function WhatsAppButton() {
  return (
    <motion.a
      href={CONTACT_URLS.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-[140] w-14 h-14 flex items-center justify-center overflow-hidden"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
    >
      <img
        src="/images/Whatsapp%20Logo.jpg"
        alt="WhatsApp logo"
        width={36}
        height={36}
        className="relative object-contain rounded-2xl bg-white"
      />
    </motion.a>
  );
}
