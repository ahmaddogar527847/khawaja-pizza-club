"use client";

import dynamic from "next/dynamic";
import LoadingScreen from "@/components/layout/LoadingScreen";
import CursorGlow from "@/components/layout/CursorGlow";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import MarqueeSection from "@/components/sections/MarqueeSection";
import MenuSection from "@/components/sections/MenuSection";
import DealsSection from "@/components/sections/DealsSection";
import CartSidebar from "@/components/cart/CartSidebar";
import WhatsAppButton from "@/components/cart/WhatsAppButton";
import Footer from "@/components/layout/Footer";

// Lazy-load below-fold heavy sections
const AboutSection   = dynamic(() => import("@/components/sections/AboutSection"),   { ssr: false });
const ReviewsSection = dynamic(() => import("@/components/sections/ReviewsSection"), { ssr: false });
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"), { ssr: false });

export default function Home() {
  return (
    <>
      {/* Global overlays */}
      <LoadingScreen />
      <CursorGlow />

      {/* Navigation */}
      <Navbar />

      {/* Cart sidebar (slide-in from right) */}
      <CartSidebar />

      {/* Floating WhatsApp CTA */}
      <WhatsAppButton />

      <main>
        <HeroSection />
        <MarqueeSection />
        <MenuSection />
        <DealsSection />
        <AboutSection />
        <ReviewsSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
