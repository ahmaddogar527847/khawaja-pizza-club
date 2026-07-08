"use client";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll";

export interface CategoryTab {
  key: string;
  label: string;
  icon?: string;
}

interface CategoryNavProps {
  tabs: CategoryTab[];
  active: string;
  onSelect: (key: string) => void;
  ariaLabel?: string;
  /** Extra className for the outer wrapper */
  className?: string;
  /** Optional: ref to the scroll container (for parent to measure) */
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
  /** Pixels per arrow click */
  scrollAmount?: number;
}

/**
 * CategoryNav
 * -----------
 * Premium horizontal category navigation with:
 *  - Left/right arrow controls (visible only when scrollable)
 *  - Native browser scrolling (vertical wheel scrolls the page, trackpad /
 *    Shift+Wheel scrolls the strip — no hijacking)
 *  - Visible, premium horizontal scrollbar (Apple / Stripe / Shopify feel)
 *  - Touch swipe + momentum (iOS / Android)
 *  - Smooth momentum (CSS `scroll-behavior: smooth` + reduced-motion guard)
 *  - Manual scrollLeft-based auto-center → never causes a page jump
 *  - Animated sliding "active" indicator
 *  - Fade edges to hint at overflow
 *  - Full keyboard navigation (Arrow Left/Right, Home, End, PageUp/PageDown)
 *  - ARIA tablist semantics + live region for screen readers
 */
export default function CategoryNav({
  tabs,
  active,
  onSelect,
  ariaLabel = "Menu categories",
  className,
  scrollContainerRef,
  scrollAmount = 280,
}: CategoryNavProps) {
  const internalScrollRef = useRef<HTMLDivElement | null>(null);
  // Bridge our hook's ref with the optional external ref
  const setScrollRef = useCallback(
    (node: HTMLDivElement | null) => {
      internalScrollRef.current = node;
      if (scrollContainerRef) {
        (scrollContainerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [scrollContainerRef]
  );

  const {
    canScrollLeft,
    canScrollRight,
    scrollBy,
    scrollToElementCentered,
    refresh,
  } = useHorizontalScroll<HTMLDivElement>({ scrollAmount });

  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const tabKeys = useMemo(() => tabs.map((t) => t.key), [tabs]);

  // Sliding indicator geometry (updated via rAF to avoid layout thrashing)
  const [indicator, setIndicator] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const indicatorFrame = useRef<number | null>(null);

  const measureIndicator = useCallback(() => {
    const container = internalScrollRef.current;
    const btn = active ? tabRefs.current.get(active) : null;
    if (!container || !btn) {
      setIndicator((prev) => (prev.opacity === 0 ? prev : { ...prev, opacity: 0 }));
      return;
    }
    // The button's offsetLeft is relative to its offsetParent; the inner
    // track div is the offsetParent for our tab buttons.
    const left = btn.offsetLeft;
    const width = btn.offsetWidth;
    setIndicator((prev) => {
      if (Math.abs(prev.left - left) < 0.5 && Math.abs(prev.width - width) < 0.5 && prev.opacity === 1) {
        return prev;
      }
      return { left, width, opacity: 1 };
    });
  }, [active]);

  // Auto-center the active tab + measure indicator whenever it changes.
  useEffect(() => {
    if (!active) return;
    const btn = tabRefs.current.get(active);
    if (!btn) return;
    // Defer to next frame so the new active class can apply first.
    const id = requestAnimationFrame(() => {
      scrollToElementCentered(btn, { behavior: "smooth" });
      measureIndicator();
    });
    return () => cancelAnimationFrame(id);
  }, [active, scrollToElementCentered, measureIndicator]);

  // Recompute the indicator position on scroll / resize / font-load.
  useEffect(() => {
    const el = internalScrollRef.current;
    if (!el) return;

    const schedule = () => {
      if (indicatorFrame.current != null) return;
      indicatorFrame.current = requestAnimationFrame(() => {
        indicatorFrame.current = null;
        measureIndicator();
      });
    };

    el.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Re-measure once the web fonts have settled (label width can change).
    const fonts = (document as Document & { fonts?: { ready?: Promise<unknown> } }).fonts;
    fonts?.ready?.then(schedule).catch(() => {});

    // Initial measure on next frame (in case tabs mount later)
    const init = requestAnimationFrame(schedule);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(schedule);
      ro.observe(el);
    }

    return () => {
      el.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (ro) ro.disconnect();
      if (init) cancelAnimationFrame(init);
      if (indicatorFrame.current != null) cancelAnimationFrame(indicatorFrame.current);
    };
  }, [measureIndicator, tabs.length]);

  // NOTE: We intentionally do NOT hijack the mouse-wheel. The category strip
  // is `overflow-x: auto` and not vertically scrollable, so the browser will
  // naturally:
  //   • scroll the page vertically on wheel / touch swipe (no preventDefault)
  //   • scroll the strip horizontally on trackpad horizontal gestures
  //   • scroll the strip horizontally on Shift + Wheel
  //   • allow touch swipe to scroll the strip on mobile
  // This preserves native page scrolling, which is what the user expects.

  const focusTab = useCallback((key: string) => {
    const btn = tabRefs.current.get(key);
    if (btn) {
      // preventScroll keeps the document scroll position stable — auto-center
      // is handled separately by scrollToElementCentered, which only scrolls
      // the category strip itself.
      try {
        btn.focus({ preventScroll: true });
      } catch {
        btn.focus();
      }
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, currentKey: string) => {
      const idx = tabKeys.indexOf(currentKey);
      if (idx === -1) return;

      let nextKey: string | null = null;
      let prevent = true;

      switch (e.key) {
        case "ArrowRight":
          nextKey = tabKeys[(idx + 1) % tabKeys.length];
          break;
        case "ArrowLeft":
          nextKey = tabKeys[(idx - 1 + tabKeys.length) % tabKeys.length];
          break;
        case "Home":
          nextKey = tabKeys[0];
          break;
        case "End":
          nextKey = tabKeys[tabKeys.length - 1];
          break;
        case "PageDown":
          nextKey = tabKeys[Math.min(tabKeys.length - 1, idx + 3)];
          break;
        case "PageUp":
          nextKey = tabKeys[Math.max(0, idx - 3)];
          break;
        case "Enter":
        case " ":
          onSelect(currentKey);
          return;
        default:
          prevent = false;
      }

      if (nextKey && prevent) {
        e.preventDefault();
        // Move focus AND select — this is the "roving tabindex" pattern for tablists
        onSelect(nextKey);
        focusTab(nextKey);
      }
    },
    [tabKeys, onSelect, focusTab]
  );

  return (
    <div
      className={cn("relative group/catnav", className)}
      // Prevent the click → focus from causing a layout-affecting scroll
      onMouseDown={(e) => e.preventDefault()}
    >
      {/* Left arrow */}
      <NavArrow
        side="left"
        visible={canScrollLeft}
        onClick={() => scrollBy(-scrollAmount)}
        ariaLabel="Scroll categories left"
      />

      {/* Scroll container — uses a visible premium scrollbar (see `.premium-scroll`). */}
      <div
        ref={setScrollRef}
        className={cn(
          "premium-scroll overflow-x-auto",
          "snap-x snap-mandatory",
          "scroll-smooth",
          "[overscroll-behavior-x:contain]",
          "[touch-action:pan-x pan-y]"
        )}
        role="tablist"
        aria-label={ariaLabel}
        aria-orientation="horizontal"
      >
        <div className="relative flex gap-2 min-w-max px-1 py-1">
          {/* Sliding active indicator (positioned via state, animated with CSS) */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute top-1 bottom-1 rounded-full pointer-events-none",
              "bg-[oklch(0.78_0.17_85)]",
              "shadow-[0_0_20px_oklch(0.78_0.17_85/0.35)]",
              "transition-[transform,width,opacity] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
              "will-change-transform"
            )}
            style={{
              transform: `translate3d(${indicator.left}px, 0, 0)`,
              width: indicator.width,
              opacity: indicator.opacity,
            }}
          />

          {tabs.map((tab) => {
            const isActive = tab.key === active;
            return (
              <button
                key={tab.key}
                ref={(el) => {
                  if (el) tabRefs.current.set(tab.key, el);
                  else tabRefs.current.delete(tab.key);
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`category-panel-${tab.key.replace(/\s+/g, "-").toLowerCase()}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onSelect(tab.key)}
                onKeyDown={(e) => handleKeyDown(e, tab.key)}
                className={cn(
                  "snap-start",
                  "relative z-[1]",
                  "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap",
                  "transition-colors duration-300 border outline-none",
                  "focus-visible:ring-2 focus-visible:ring-[oklch(0.78_0.17_85)] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                  "active:scale-[0.97]",
                  isActive
                    ? "text-black border-transparent"
                    : "bg-transparent text-[oklch(0.60_0_0)] border-[oklch(0.20_0_0)] hover:border-[oklch(0.78_0.17_85/0.3)] hover:text-[oklch(0.97_0_0)]"
                )}
              >
                {tab.icon && (
                  <span className="text-base leading-none" aria-hidden="true">
                    {tab.icon}
                  </span>
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right arrow */}
      <NavArrow
        side="right"
        visible={canScrollRight}
        onClick={() => scrollBy(scrollAmount)}
        ariaLabel="Scroll categories right"
      />

      {/* Fade edges — purely decorative, hint at overflow */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-0 bottom-0 left-0 w-8",
          "bg-gradient-to-r from-black/85 via-black/40 to-transparent",
          "transition-opacity duration-300",
          canScrollLeft ? "opacity-100" : "opacity-0"
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-0 bottom-0 right-0 w-8",
          "bg-gradient-to-l from-black/85 via-black/40 to-transparent",
          "transition-opacity duration-300",
          canScrollRight ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Live region for screen readers: announces active category changes */}
      <span className="sr-only" role="status" aria-live="polite">
        {active ? `${active} selected` : ""}
      </span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────── */

interface NavArrowProps {
  side: "left" | "right";
  visible: boolean;
  onClick: () => void;
  ariaLabel: string;
}

function NavArrow({ side, visible, onClick, ariaLabel }: NavArrowProps) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 z-10",
        side === "left" ? "left-0 -ml-1" : "right-0 -mr-1",
        "w-9 h-9 sm:w-10 sm:h-10 rounded-full",
        "flex items-center justify-center",
        "bg-black/70 hover:bg-black/90",
        "border border-[oklch(0.78_0.17_85)/0.25] hover:border-[oklch(0.78_0.17_85)/0.6]",
        "text-[oklch(0.78_0.17_85)]",
        "shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_oklch(0.78_0.17_85/0.25)]",
        "backdrop-blur-md",
        "transition-all duration-300 ease-out",
        "hover:scale-110 active:scale-95",
        // Visibility: allow fade/scale rather than display:none to keep aria/state stable
        visible
          ? "opacity-100 pointer-events-auto scale-100"
          : "opacity-0 pointer-events-none scale-75"
      )}
    >
      <Icon size={18} strokeWidth={2.5} />
    </button>
  );
}
