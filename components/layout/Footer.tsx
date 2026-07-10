"use client";
import { Phone, MapPin, Clock } from "lucide-react";
import { RESTAURANT } from "@/lib/data/restaurant";
import { CONTACT, CONTACT_URLS, DEV_CONTACT, DEV_CONTACT_URLS } from "@/lib/contact";
import { startCall } from "@/lib/utils/contact-actions";

const QUICK_LINKS = ["Home", "Menu", "Deals", "About", "Reviews", "Contact"];
const CATEGORIES = ["Pizza", "Burgers", "Shawarma", "Pasta", "Appetizers", "Family Deals"];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black border-t border-[rgba(224,184,76,0.18)] relative overflow-hidden">
      {/* Gold shimmer divider */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#E0B84C] to-transparent opacity-30 border-shimmer" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/logo.png"
              alt="Khawaja Pizza Club"
              className="h-16 w-auto object-contain"
            />
          </div>
          <p className="text-[oklch(0.60_0_0)] text-sm leading-relaxed mb-5">
            {RESTAURANT.tagline} — serving Shujaabad with the finest pizzas, burgers
            and fast food since day one. Utterly, butterly delicious.
          </p>
          <a
            href={CONTACT_URLS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Chat with ${RESTAURANT.name} on WhatsApp`}
            className="inline-flex items-center gap-2 text-sm text-[#25D366] hover:underline"
          >
            <img src="/images/Whatsapp%20Logo.jpg" alt="WhatsApp" width={14} height={14} className="object-contain" />
            Chat on WhatsApp
          </a>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-[oklch(0.78_0.17_85)] font-semibold text-sm uppercase tracking-widest mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2">
            {QUICK_LINKS.map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  className="text-[oklch(0.60_0_0)] hover:text-[oklch(0.78_0.17_85)] text-sm transition-colors duration-200"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-[oklch(0.78_0.17_85)] font-semibold text-sm uppercase tracking-widest mb-4">
            Menu
          </h4>
          <ul className="space-y-2">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <a
                  href="#menu"
                  className="text-[oklch(0.60_0_0)] hover:text-[oklch(0.78_0.17_85)] text-sm transition-colors duration-200"
                >
                  {c}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="text-[oklch(0.78_0.17_85)] font-semibold text-sm uppercase tracking-widest mb-4">
            Contact
          </h4>
          <ul className="space-y-4">
            <li className="flex gap-3 text-sm text-[oklch(0.60_0_0)]">
              <Phone size={15} className="text-[oklch(0.78_0.17_85)] shrink-0 mt-0.5" />
              <a
                href={CONTACT_URLS.tel}
                onClick={(e) => {
                  e.preventDefault();
                  startCall();
                }}
                className="hover:text-[oklch(0.78_0.17_85)] transition-colors duration-200"
                aria-label={`Call ${RESTAURANT.name} at ${CONTACT.phoneDisplay}`}
              >
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3 text-sm text-[oklch(0.60_0_0)]">
              <MapPin size={15} className="text-[oklch(0.78_0.17_85)] shrink-0 mt-0.5" />
              <span>{RESTAURANT.address}</span>
            </li>
            <li className="flex gap-3 text-sm text-[oklch(0.60_0_0)]">
              <Clock size={15} className="text-[oklch(0.78_0.17_85)] shrink-0 mt-0.5" />
              <span>{RESTAURANT.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Developer signature */}
      <div className="border-t border-[rgba(224,184,76,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center ring-1 ring-white/20">
              <img src="/nexora-logo.svg" alt="Nexora Studio" className="w-5 h-5 object-contain" />
            </div>
            <div>
              <p className="text-[oklch(0.60_0_0)] text-[11px] uppercase tracking-[0.2em] font-medium">
                Designed &amp; Developed By
              </p>
              <p className="text-white text-sm font-semibold -mt-0.5">{DEV_CONTACT.name}</p>
            </div>
          </div>
          {/* Developer WhatsApp — STRICTLY SEPARATE from the business contact.
              Entire block is a single focusable, accessible target. */}
          <a
            href={DEV_CONTACT_URLS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Chat with developer ${DEV_CONTACT.name} on WhatsApp at ${DEV_CONTACT.phoneDisplay}`}
            className="group/dev flex items-center gap-2 text-sm text-[oklch(0.60_0_0)] hover:text-[#25D366] focus-visible:text-[#25D366] transition-colors duration-200 rounded-lg p-1 -m-1 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <span
              aria-hidden="true"
              className="w-7 h-7 rounded-lg bg-[#25D366]/10 flex items-center justify-center ring-1 ring-[#25D366]/25 group-hover/dev:bg-[#25D366]/15 group-hover/dev:ring-[#25D366]/40 transition-all duration-200"
            >
              <img
                src="/images/Whatsapp%20Logo.jpg"
                alt=""
                width={14}
                height={14}
                className="object-contain"
              />
            </span>
            <span className="font-medium tabular-nums">{DEV_CONTACT.phoneDisplay}</span>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(224,184,76,0.14)] py-5 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
        <p className="text-[oklch(0.40_0_0)] text-xs">
          &copy; {year} {RESTAURANT.name}. All Rights Reserved.
        </p>
        <p className="text-[oklch(0.20_0_0)] text-xs">Made with ❤️ in Pakistan</p>
      </div>
    </footer>
  );
}
