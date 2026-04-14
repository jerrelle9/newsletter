"use client";

import { useEffect, useMemo, useState } from "react";
import { navItems } from "@/data/nav-items";

export function SectionWheelNav() {
  const radius = 116;
  const [activeHref, setActiveHref] = useState(navItems[0]?.href ?? "");

  const activeItem = useMemo(
    () => navItems.find((item) => item.href === activeHref) ?? navItems[0],
    [activeHref]
  );

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveHref(`#${visible.target.id}`);
        }
      },
      {
        rootMargin: "-34% 0px -34% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:flex">
      <div className="relative flex items-center">
        <div className="relative h-[348px] w-[348px]">
          <div className="absolute inset-0 rounded-full border border-[var(--border)] bg-[radial-gradient(circle_at_center,rgba(2,48,74,0.94),rgba(1,29,46,0.96))] shadow-[0_30px_100px_rgba(1,17,27,0.78)] backdrop-blur-2xl" />
          <div className="absolute inset-[18px] rounded-full border border-[rgba(0,180,216,0.2)]" />
          <div className="absolute inset-[38px] rounded-full border border-[rgba(0,150,199,0.16)]" />
          <div className="absolute inset-[56px] rounded-full border border-[var(--border)]" />

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
                className="absolute left-1/2 top-1/2"
                aria-current={isActive ? "page" : undefined}
                style={{
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                }}
              >
                <div className="group/item flex w-[118px] flex-col items-center text-center">
                  <div
                    className={`mb-2 h-3.5 w-3.5 rounded-full border transition-all duration-200 ${
                      isActive
                        ? "border-[var(--blue-lt)] bg-[var(--teal)] shadow-[0_0_26px_rgba(0,180,216,0.82)]"
                        : "border-[rgba(0,180,216,0.24)] bg-[rgba(0,180,216,0.18)] group-hover/item:scale-125 group-hover/item:border-[rgba(0,180,216,0.62)]"
                    }`}
                  />
                  <span
                    className={`text-[10px] font-semibold uppercase leading-4 tracking-[0.16em] transition-colors duration-200 group-hover/item:text-[var(--blue-lt)] ${
                      isActive ? "text-white" : "text-[var(--light)]"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              </a>
            );
          })}

          <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(0,180,216,0.16)] bg-[radial-gradient(circle_at_top,rgba(2,48,74,0.98),rgba(1,29,46,1))] text-center shadow-[inset_0_1px_18px_rgba(255,255,255,0.06)]">
            <div>
              <div className="text-[9px] uppercase tracking-[0.32em] text-[var(--dim)]">
                Active
              </div>
              <div className="mt-1 text-lg font-black tracking-[0.08em] text-white">
                {String(navItems.indexOf(activeItem) + 1).padStart(2, "0")}
              </div>
              <div className="mt-1 px-4 text-[8px] font-medium uppercase leading-3 tracking-[0.24em] text-[var(--blue-lt)]/80">
                {activeItem.label.replace("ISSUE 01 / ", "")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}