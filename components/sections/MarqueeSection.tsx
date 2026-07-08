"use client";
import { MARQUEE_ITEMS } from "@/lib/data/deals";

export default function MarqueeSection() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section
      id="marquee"
      className="relative overflow-hidden border-y border-[rgba(224,184,76,0.15)] bg-black/90 py-4"
    >
      <div className="flex marquee-track gap-10 whitespace-nowrap select-none">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 shrink-0">
            <span className="text-xl">{item.icon}</span>
            <span className="text-white font-semibold text-sm">{item.name}</span>
            <span className="text-[oklch(0.78_0.17_85)] font-bold text-sm">{item.price}</span>
            <span className="bg-[oklch(0.78_0.17_85/0.1)] border border-[oklch(0.78_0.17_85/0.2)] text-[oklch(0.78_0.17_85)] text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full">
              {item.tag}
            </span>
            <span className="text-[rgba(224,184,76,0.3)] mx-2">•</span>
          </span>
        ))}
      </div>
    </section>
  );
}
