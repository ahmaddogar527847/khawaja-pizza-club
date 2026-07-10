/**
 * Centralized Contact Configuration
 * ----------------------------------
 * The SINGLE source of truth for every phone number, WhatsApp link, and
 * call-to-action URL across the entire website.
 *
 * To update the contact details for the whole site, edit ONLY this file.
 *
 * Phone formats used:
 *   - `phoneDisplay`     "0301-7723698"   → shown to users in copy
 *   - `phoneLocal`       "03017723698"    → local dialing (no separators)
 *   - `phoneE164`        "+923017723698"  → international E.164 (for `tel:` URIs)
 *   - `whatsappNumber`   "923017723698"   → international without `+` (for `wa.me`)
 */
export const CONTACT = {
  // The new official restaurant number
  phoneDisplay: "0301-7723698",
  phoneLocal: "03017723698",
  phoneE164: "+923017723698",
  whatsappNumber: "923017723698",

  // Friendly display strings for UI
  phoneLabel: "0301-7723698",
  whatsappLabel: "0301-7723698",

  // Brand
  brandName: "Khawaja Pizza Club",
} as const;

/* ────────────────────────────────────────────────────────────────
 *  Pre-built, production-safe URLs
 *  - `tel:` URIs use the E.164 format so the device's dialer/calling
 *    app is given a fully-qualified international number.
 *  - `wa.me` URLs use the digits-only international format (no `+`).
 *    wa.me is the official universal WhatsApp deep-link and works on
 *    iOS, Android, and desktop (redirects to web.whatsapp.com).
 * ──────────────────────────────────────────────────────────────── */
export const CONTACT_URLS = {
  tel: `tel:${CONTACT.phoneE164}`,
  whatsapp: `https://wa.me/${CONTACT.whatsappNumber}`,
} as const;

/**
 * Build a `wa.me` URL with an optional pre-filled message.
 * Always URL-encodes the message so unicode / spaces / newlines work.
 */
export function buildWhatsAppURL(message?: string): string {
  if (!message) return CONTACT_URLS.whatsapp;
  return `${CONTACT_URLS.whatsapp}?text=${encodeURIComponent(message)}`;
}

/* ────────────────────────────────────────────────────────────────
 *  Developer Contact
 *  -----------------
 *  STRICTLY SEPARATE from the business contact above. These values
 *  belong to the developer of this website (Ahmad Dogar) and are
 *  surfaced ONLY in the "Designed & Developed By" footer section.
 *
 *  NEVER mix these numbers with the business ones — the customer
 *  ordering flow, the navbar, the floating WhatsApp button, and the
 *  contact form must keep using `CONTACT` / `CONTACT_URLS`.
 * ──────────────────────────────────────────────────────────────── */
export const DEV_CONTACT = {
  name: "Nexora Studio",
  // The developer's personal WhatsApp number (NOT the business line).
  phoneDisplay: "0309-6432755",
  phoneE164: "+923096432755",
  // Digits-only, no `+`, for `wa.me` deep-links.
  whatsappNumber: "923096432755",
  whatsappLabel: "0309-6432755",
} as const;

export const DEV_CONTACT_URLS = {
  whatsapp: `https://wa.me/${DEV_CONTACT.whatsappNumber}`,
} as const;

/**
 * Build a `wa.me` URL for the DEVELOPER with an optional pre-filled
 * message. Mirrors `buildWhatsAppURL` but targets the dev line.
 */
export function buildDeveloperWhatsAppURL(message?: string): string {
  if (!message) return DEV_CONTACT_URLS.whatsapp;
  return `${DEV_CONTACT_URLS.whatsapp}?text=${encodeURIComponent(message)}`;
}
