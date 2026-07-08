/**
 * contact-actions.ts
 * ------------------
 * Production-grade helpers for opening WhatsApp chats and initiating
 * phone calls. Single source of truth for "click → open" behavior.
 *
 * Core principle: **the current tab is sacred.**
 *  - Every WhatsApp / external link must open in a NEW tab.
 *  - If the popup is blocked we silently no-op — we never navigate
 *    the current tab away from the user's restaurant page. That is
 *    what produced the "two pages open" symptom.
 *  - The ONLY legitimate use of `window.location.href` in this module
 *    is `tel:` (mobile OS dialer requires it). WhatsApp never uses it.
 *  - Every WhatsApp URL is also the anchor's `href`, so SSR / no-JS
 *    users get native browser behavior automatically.
 *
 * Helper-vs-anchor decision:
 *  - If your UI is an `<a>` element, just give it:
 *      target="_blank" rel="noopener noreferrer"
 *    and DO NOT add an onClick. The browser handles the new tab
 *    reliably, with no popup-blocker risk and no event-race bugs.
 *  - Use `openInNewTab(url)` ONLY for non-anchor triggers
 *    (e.g. `<button type="submit">` inside a `<form>`).
 *
 * All helpers are SSR-safe (guard `typeof window`) and never throw.
 */

import {
  buildDeveloperWhatsAppURL,
  buildWhatsAppURL,
  CONTACT_URLS,
  DEV_CONTACT_URLS,
} from "@/lib/contact";

export type OpenResult = "opened" | "blocked" | "noop";

/**
 * Open a URL in a NEW browser tab. The current tab is NEVER touched.
 *
 *  - Uses `window.open(url, "_blank", "noopener,noreferrer")`, the
 *    universal form that works on iOS Safari, Android Chrome, and
 *    every desktop browser.
 *  - If a popup blocker discards the request we return `"blocked"`
 *    rather than navigating the current tab. The user can re-click
 *    the trigger; their restaurant tab stays put.
 *  - This helper exists for non-anchor triggers only. For `<a>`
 *    elements use `target="_blank" rel="noopener noreferrer"`.
 */
export function openInNewTab(url: string): OpenResult {
  if (typeof window === "undefined") return "noop";
  if (!url) return "noop";

  let win: Window | null = null;
  try {
    win = window.open(url, "_blank", "noopener,noreferrer");
  } catch {
    win = null;
  }

  // Popup-blocked (or browser returned null) → silently no-op.
  // NEVER touch the current tab here.
  if (!win) return "blocked";
  // On some older WebKit builds `win.closed` throws when accessed; we
  // intentionally do not read it — a non-null `win` from a synchronous
  // `window.open` is sufficient evidence the request was dispatched.
  return "opened";
}

/**
 * Back-compat alias. Older call-sites pass `(url, "_blank")`; we keep
 * the signature for source compatibility but the second argument is
 * ignored — the new contract is "always a new tab, never the current".
 */
export function openExternalURL(
  url: string,
  _target: string = "_blank",
): OpenResult {
  return openInNewTab(url);
}

/**
 * Open a WhatsApp chat to the configured business number, with an
 * optional pre-filled message. Opens in a NEW tab; the current tab
 * is left untouched.
 */
export function openWhatsApp(message?: string): OpenResult {
  return openInNewTab(buildWhatsAppURL(message));
}

/**
 * Open a WhatsApp chat to the DEVELOPER's personal number. Used
 * exclusively by the "Designed & Developed By" footer section. The
 * business line is NEVER opened by this function.
 */
export function openDeveloperWhatsApp(message?: string): OpenResult {
  return openInNewTab(buildDeveloperWhatsAppURL(message));
}

/**
 * Initiate a phone call to the configured number.
 *  - Mobile: assigns `tel:` to `window.location.href` so the OS dialer
 *    fires (mobile dialers do not respond to `window.open`).
 *  - Desktop: most browsers route `tel:` to the OS dialer handler
 *    (FaceTime, Skype, etc.) when installed, otherwise no-ops.
 *
 * This is the only function in the module that may touch
 * `window.location.href` and it is gated to `tel:` only.
 */
export function startCall(): OpenResult {
  if (typeof window === "undefined") return "noop";
  try {
    window.location.href = CONTACT_URLS.tel;
    return "opened";
  } catch {
    return "noop";
  }
}

/** Re-export the developer URL for convenience in JSX. */
export { DEV_CONTACT_URLS };
