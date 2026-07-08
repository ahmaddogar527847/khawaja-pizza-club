"use client";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseHorizontalScrollOptions {
  /** Pixels per arrow click */
  scrollAmount?: number;
  /** Scroll behavior for the imperative scroll() method */
  behavior?: ScrollBehavior;
}

interface UseHorizontalScrollReturn<T extends HTMLElement> {
  scrollRef: React.RefObject<T | null>;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  scrollBy: (amount: number, behavior?: ScrollBehavior) => void;
  /**
   * Center the given element inside the scroll container.
   * Uses a manual scrollLeft calculation so it can NEVER affect the
   * document/window scroll (i.e. no page jumps).
   */
  scrollToElementCentered: (
    el: HTMLElement | null | undefined,
    options?: { behavior?: ScrollBehavior; offset?: number }
  ) => void;
  /** Manually trigger a re-evaluation (useful after content/layout changes) */
  refresh: () => void;
}

/**
 * useHorizontalScroll
 * --------------------
 * Tracks the horizontal scroll position of a container using requestAnimationFrame,
 * exposes canScrollLeft/canScrollRight booleans, and provides imperative helpers
 * (scrollBy / scrollToElementCentered) that respect reduced motion preferences.
 *
 * The hook avoids layout thrashing by reading/writing inside rAF and using
 * a small "settle" timer to debounce boundary updates.
 */
export function useHorizontalScroll<T extends HTMLElement = HTMLDivElement>(
  options: UseHorizontalScrollOptions = {}
): UseHorizontalScrollReturn<T> {
  const scrollAmount = options.scrollAmount ?? 280;
  const defaultBehavior: ScrollBehavior = options.behavior ?? "smooth";

  const scrollRef = useRef<T | null>(null);
  const rafId = useRef<number | null>(null);
  const settleTimer = useRef<number | null>(null);
  const observedChildren = useRef<Set<Element>>(new Set());

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateBounds = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const max = Math.max(0, scrollWidth - clientWidth);
    // Use small epsilon to avoid sub-pixel boundary flicker
    const EPS = 2;
    const left = scrollLeft > EPS;
    const right = scrollLeft < max - EPS;
    setCanScrollLeft(left);
    setCanScrollRight(right);
  }, []);

  const scheduleUpdate = useCallback(() => {
    if (rafId.current != null) return;
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      updateBounds();
    });
    // Re-check after smooth-scroll settles
    if (settleTimer.current != null) {
      window.clearTimeout(settleTimer.current);
    }
    settleTimer.current = window.setTimeout(() => {
      updateBounds();
    }, 380);
  }, [updateBounds]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => scheduleUpdate();
    const onResize = () => scheduleUpdate();

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    // Initial measurement (next frame, after layout settles)
    const init = requestAnimationFrame(() => updateBounds());

    // ResizeObserver for content changes (font load, dynamic items, etc.)
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => scheduleUpdate());
      ro.observe(el);

      // Observe any children that exist now
      Array.from(el.children).forEach((child) => {
        ro?.observe(child);
        observedChildren.current.add(child);
      });

      // Pick up children added/removed later (dynamic tab lists, etc.)
      const mo = new MutationObserver(() => {
        if (!ro) return;
        // Observe any newly-added children
        Array.from(el.children).forEach((child) => {
          if (!observedChildren.current.has(child)) {
            ro?.observe(child);
            observedChildren.current.add(child);
          }
        });
        // Drop removed children from tracking
        observedChildren.current.forEach((child) => {
          if (!el.contains(child)) {
            ro?.unobserve(child);
            observedChildren.current.delete(child);
          }
        });
        scheduleUpdate();
      });
      mo.observe(el, { childList: true });
      // Keep ref to mo on outer cleanup
      (el as unknown as { __mo?: MutationObserver }).__mo = mo;
    }

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (ro) ro.disconnect();
      const mo = (el as unknown as { __mo?: MutationObserver }).__mo;
      if (mo) mo.disconnect();
      delete (el as unknown as { __mo?: MutationObserver }).__mo;
      observedChildren.current.clear();
      if (init) cancelAnimationFrame(init);
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
      if (settleTimer.current != null) window.clearTimeout(settleTimer.current);
    };
  }, [scheduleUpdate, updateBounds]);

  const scrollBy = useCallback(
    (amount: number, beh: ScrollBehavior = defaultBehavior) => {
      const el = scrollRef.current;
      if (!el) return;
      const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      el.scrollBy({ left: amount, behavior: reduced ? "auto" : beh });
    },
    [defaultBehavior]
  );

  /**
   * Center an element inside the scroll container using manual
   * `scrollLeft` math. This NEVER touches the document scroll, so the
   * user's viewport position is always preserved.
   */
  const scrollToElementCentered = useCallback(
    (
      target: HTMLElement | null | undefined,
      opts: { behavior?: ScrollBehavior; offset?: number } = {}
    ) => {
      const el = scrollRef.current;
      if (!el || !target) return;
      const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      const finalBehavior: ScrollBehavior = reduced ? "auto" : (opts.behavior ?? defaultBehavior);
      const offset = opts.offset ?? 0;

      // If there's no overflow, there is nothing to scroll.
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;

      // Compute target's offsetLeft RELATIVE to the scroll container (not the viewport).
      // This is the only correct way to avoid leaking into page-level scrolling.
      const targetLeft = target.offsetLeft;
      const targetWidth = target.offsetWidth;
      const containerWidth = el.clientWidth;

      const desired = targetLeft - (containerWidth - targetWidth) / 2 + offset;
      const clamped = Math.max(0, Math.min(max, desired));

      // Only animate if the change is meaningful (avoids pointless 1px jumps)
      if (Math.abs(clamped - el.scrollLeft) < 1) return;

      el.scrollTo({ left: clamped, behavior: finalBehavior });
    },
    [defaultBehavior]
  );

  const refresh = useCallback(() => {
    scheduleUpdate();
  }, [scheduleUpdate]);

  return {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    scrollBy,
    scrollToElementCentered,
    refresh,
  };
}
