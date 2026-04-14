"use client";

import { useEffect, useMemo, useState } from "react";
import { navItems } from "@/data/nav-items";

export function SectionWheelNav() {
  const radius = 105;
  const [activeHref, setActiveHref] = useState(navItems[0]?.href ?? "");

  const activeItem = useMemo(
    () => navItems.find((item) => item.href === activeHref) ?? navItems[0],
    [activeHref]
  );

  // Scroll-based detection: observe a 1% band at the viewport midpoint.
  // threshold:0 fires on any intersection, so even sections taller than the
  // viewport (where ratio never reaches 0.2) are detected correctly.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit?.target.id) setActiveHref(`#${hit.target.id}`);
      },
      {
        // Shrink top by 49% and bottom by 50% → 1% band just above centre
        rootMargin: "-49% 0px -50% 0px",
        threshold: 0,
      }
    );

    navItems.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Click handler: update state immediately when a nav item is clicked
  const handleClick = (href: string) => {
    setActiveHref(href);
  };

  return (
    <div className="fixed right-[calc(13vw-160px)] top-1/2 z-40 hidden -translate-y-1/2 lg:flex">
      <div className="relative flex items-center">
        <div className="relative h-[320px] w-[320px]">
          <div className="absolute inset-0 rounded-full border border-[var(--border)] bg-[radial-gradient(circle_at_center,rgba(2,48,74,0.94),rgba(1,29,46,0.96))] shadow-[0_30px_100px_rgba(1,17,27,0.78)] backdrop-blur-2xl" />
          <div className="absolute inset-[16px] rounded-full border border-[rgba(0,180,216,0.2)]" />
          <div className="absolute inset-[34px] rounded-full border border-[rgba(0,150,199,0.16)]" />
          <div className="absolute inset-[52px] rounded-full border border-[var(--border)]" />

          {navItems.map((item, index) => {
            const angle = -90 + (360 / navItems.length) * index;
            const radians = (angle * Math.PI) / 180;
            const x = Math.cos(radians) * radius;
            const y = Math.sin(radians) * radius;
            const isActive = item.href === activeHref;

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => handleClick(item.href)}
                className="absolute left-1/2 top-1/2"
                aria-current={isActive ? "page" : undefined}
                style={{
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                }}
              >
                <div className="group/item flex w-[110px] flex-col items-center text-center">
                  <div
                    className={`mb-1.5 h-3 w-3 rounded-full border transition-all duration-200 ${
                      isActive
                        ? "border-[var(--blue-lt)] bg-[var(--teal)] shadow-[0_0_26px_rgba(0,180,216,0.82)]"
                        : "border-[rgba(0,180,216,0.24)] bg-[rgba(0,180,216,0.18)] group-hover/item:scale-125 group-hover/item:border-[rgba(0,180,216,0.62)]"
                    }`}
                  />
                  <span
                    className={`text-[10px] font-semibold uppercase leading-[1.35] tracking-[0.12em] transition-colors duration-200 group-hover/item:text-[var(--blue-lt)] ${
                      isActive ? "text-white" : "text-[var(--light)]"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              </a>
            );
          })}

          <div className="absolute left-1/2 top-1/2 flex h-[110px] w-[110px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(0,180,216,0.16)] bg-[radial-gradient(circle_at_top,rgba(2,48,74,0.98),rgba(1,29,46,1))] text-center shadow-[inset_0_1px_18px_rgba(255,255,255,0.06)]">
            <div className="px-2">
              <div className="text-[9px] uppercase tracking-[0.28em] text-[var(--dim)]">
                Active
              </div>
              <div className="mt-1 text-xl font-black tracking-[0.06em] text-white">
                {String(navItems.indexOf(activeItem) + 1).padStart(2, "0")}
              </div>
              <div className="mt-1 text-[9px] font-medium uppercase leading-[1.25] tracking-[0.1em] text-[var(--blue-lt)]/80">
                {activeItem.short}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
