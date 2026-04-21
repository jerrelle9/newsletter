import { useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { gsap, ScrollTrigger, useGSAP } from "@/src/gsap-init";
import type { LucideIcon } from "lucide-react";

import {
  Server,
  Smartphone,
  Globe,
  DatabaseZap,
  Users,
  Building2,
  TrendingUp,
  Network,
  ClipboardList,
  Cpu,
  ShieldCheck,
  FileCheck,
  GitBranch,
} from "lucide-react";
import { GalaxyBackground } from "@/components/layout/GalaxyBackground";
import { Reveal } from "@/components/layout/Reveal";
import { SplitHeading } from "@/components/layout/SplitHeading";
import { SectionNumber } from "@/components/layout/SectionNumber";
import { milestones, type Milestone, type MilestoneCategory } from "@/data/milestones";

/* ─── Category config ─────────────────────────────────────────────────────── */
const CATEGORY_CONFIG: Record<
  MilestoneCategory,
  {
    label: string;
    barClass: string;
    nodeColor: string;
    borderClass: string;
  }
> = {
  "engineering-platforms": {
    label: "Engineering Platforms",
    barClass: "from-[var(--teal)] to-[var(--blue)]",
    nodeColor: "rgba(0,180,216,0.9)",
    borderClass: "border-[rgba(0,180,216,0.14)]",
  },
  "engineering-products": {
    label: "Engineering Products",
    barClass: "from-[var(--blue)] to-[var(--purple)]",
    nodeColor: "rgba(139,92,246,0.9)",
    borderClass: "border-[rgba(139,92,246,0.14)]",
  },
  "digital-products": {
    label: "Digital Products",
    barClass: "from-[var(--green)] to-[var(--teal)]",
    nodeColor: "rgba(6,214,160,0.9)",
    borderClass: "border-[rgba(6,214,160,0.14)]",
  },
  "digital-banking": {
    label: "Digital Banking",
    barClass: "from-[var(--teal)] to-[var(--blue-lt)]",
    nodeColor: "rgba(0,180,230,0.9)",
    borderClass: "border-[rgba(0,180,230,0.14)]",
  },
  "division-wide": {
    label: "Division Wide",
    barClass: "from-[var(--gold)] to-[var(--orange)]",
    nodeColor: "rgba(245,166,35,0.9)",
    borderClass: "border-[rgba(245,166,35,0.14)]",
  },
};

/* ─── Icon lookup ─────────────────────────────────────────────────────────── */
const ICON_MAP: Record<string, LucideIcon> = {
  Server,
  Smartphone,
  Globe,
  DatabaseZap,
  Users,
  Building2,
  TrendingUp,
  Network,
  ClipboardList,
  Cpu,
  ShieldCheck,
  FileCheck,
  GitBranch,
};

/* ─── Quarter columns ─────────────────────────────────────────────────────── */
const QUARTERS = ["Q3 2025", "Q4 2025", "Q1 2026", "Q2 2026"] as const;

/* ─── Sorted swimlane order ───────────────────────────────────────────────── */
const SWIMLANE_ORDER: MilestoneCategory[] = [
  "division-wide",
  "engineering-platforms",
  "engineering-products",
  "digital-products",
  "digital-banking",
];

/* ─── Gantt bar (one milestone) ───────────────────────────────────────────── */
function GanttBar({
  milestone,
  config,
  delay,
  onHover,
  onLeave,
}: {
  milestone: Milestone;
  config: (typeof CATEGORY_CONFIG)[MilestoneCategory];
  delay: number;
  onHover: (ms: Milestone, rect: DOMRect) => void;
  onLeave: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = ICON_MAP[milestone.icon];

  useGSAP(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.6,
        delay,
        ease: "power3.out",
        transformOrigin: "left center",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      },
    );
  }, { scope: ref });

  const handleMouseEnter = useCallback(() => {
    if (ref.current) onHover(milestone, ref.current.getBoundingClientRect());
  }, [milestone, onHover]);

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onLeave}
      className="group/bar relative flex h-full cursor-pointer items-center gap-2.5 rounded-lg px-3 transition-all duration-200 hover:brightness-125"
      style={{
        background: `linear-gradient(90deg, ${config.nodeColor}, ${config.nodeColor.replace("0.9)", "0.55)")})`,
        boxShadow: `0 2px 16px 0 ${config.nodeColor.replace("0.9)", "0.25)")}`,
      }}
    >
      {Icon && <Icon className="h-3.5 w-3.5 shrink-0 text-white/80" />}
      <span className="truncate text-[11px] font-semibold text-white/90">
        {milestone.title}
      </span>
    </div>
  );
}

/* ─── Hover detail card ───────────────────────────────────────────────────── */
function GanttTooltip({
  milestone,
  position,
}: {
  milestone: Milestone;
  position: { x: number; y: number };
}) {
  const cfg = CATEGORY_CONFIG[milestone.category];
  const Icon = ICON_MAP[milestone.icon];

  return (
    <div
      className="pointer-events-none fixed z-[9999] w-[340px] animate-[fadeInUp_0.18s_ease-out]"
      style={{ left: position.x, top: position.y }}
    >
      <div
        className={`relative overflow-hidden rounded-2xl border ${cfg.borderClass} bg-[rgba(11,29,46,0.95)] p-5 shadow-[0_24px_80px_rgba(1,17,27,0.6)] backdrop-blur-2xl`}
      >
        {/* Top accent */}
        <div className={`absolute inset-x-0 top-0 h-[2px] bg-linear-to-r ${cfg.barClass}`} />

        {/* Header */}
        {Icon && (
          <div className="flex justify-end">
            <div
              className={`rounded-xl border ${cfg.borderClass} bg-[rgba(255,255,255,0.04)] p-2`}
              style={{ color: cfg.nodeColor }}
            >
              <Icon className="h-3.5 w-3.5" />
            </div>
          </div>
        )}

        {/* Quarter */}
        <div className="mt-3 font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-(--dim)">
          {milestone.quarter}
        </div>

        {/* Title */}
        <h3 className="mt-1.5 text-base font-bold leading-snug tracking-[-0.01em] text-white">
          {milestone.title}
        </h3>

        {/* Description */}
        <p className="mt-2.5 text-[13px] leading-6 text-(--light)">
          {milestone.description}
        </p>
      </div>
    </div>
  );
}

/* ─── Main section ────────────────────────────────────────────────────────── */
export function MilestoneSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<{
    milestone: Milestone;
    position: { x: number; y: number };
  } | null>(null);

  const handleBarHover = useCallback((ms: Milestone, rect: DOMRect) => {
    const x = Math.min(rect.left, window.innerWidth - 360);
    const y = rect.top - 220;
    setHovered({ milestone: ms, position: { x, y: y < 8 ? rect.bottom + 12 : y } });
  }, []);

  const handleBarLeave = useCallback(() => setHovered(null), []);

  /* ── Progress line that scrubs across quarters ───────────────────────── */
  useGSAP(() => {
    if (!chartRef.current) return;
    const progressLine = chartRef.current.querySelector<HTMLDivElement>("[data-progress-line]");
    if (!progressLine) return;
    gsap.fromTo(
      progressLine,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: chartRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 0.4,
        },
      },
    );
  }, { scope: chartRef });

  /* ── Group milestones by swimlane ────────────────────────────────────── */
  const swimlanes = SWIMLANE_ORDER
    .map((cat) => ({
      category: cat,
      config: CATEGORY_CONFIG[cat],
      items: milestones.filter((m) => m.category === cat),
    }))
    .filter((s) => s.items.length > 0);

  return (
    <section
      id="section-5"
      className="relative min-h-screen border-b border-(--border) bg-[radial-gradient(circle_at_70%_12%,rgba(139,92,246,0.1),transparent_24%),radial-gradient(circle_at_14%_80%,rgba(0,180,216,0.1),transparent_20%),linear-gradient(180deg,var(--surface)_0%,var(--navy)_100%)]"
    >
      <GalaxyBackground />
      <SectionNumber number="05" />

      <div
        ref={sectionRef}
        className="ml-[8vw] max-w-[66vw] xl:max-w-[60vw] 2xl:max-w-[66vw] px-6 py-24 md:px-10 lg:px-16 xl:px-10 2xl:px-16"
      >
        {/* ── Section header ──────────────────────────────────────────────── */}
        <Reveal className="max-w-3xl">
          <div className="text-xs font-medium uppercase tracking-[0.3em] text-(--c-primary)/70">
            Milestones
          </div>
          <SplitHeading
            as="h2"
            className="mt-4 text-4xl font-black leading-[0.9] tracking-[-0.04em] md:text-5xl"
            splitType="words"
            stagger={0.04}
          >
            A record of what the Division has shipped, scaled, and set in motion.
          </SplitHeading>
          <p className="mt-6 text-base leading-8 text-(--light)">
            From platform stabilisation to live product launches, these are the delivery
            signals that mark GDTD&apos;s progress across quarters.
          </p>
        </Reveal>

        {/* ── Gantt Chart ─────────────────────────────────────────────────── */}
        <Reveal className="mt-16">
          <div
            ref={chartRef}
            className="relative overflow-hidden rounded-4xl border border-(--border) bg-[rgba(11,29,46,0.72)] p-6 shadow-[0_24px_100px_rgba(1,17,27,0.55)] backdrop-blur-2xl md:p-8"
          >
            {/* Hover hint */}
            <div className="mb-4 flex items-center gap-2 text-[12px] tracking-[0.16em] text-(--muted)/60">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              Hover over items for details
            </div>

            {/* ── Header row: label spacer + quarter columns ────────────── */}
            <div className="mb-1 flex">
              <div className="w-36 shrink-0" />
              <div className="grid flex-1 grid-cols-4">
                {QUARTERS.map((q) => (
                  <div
                    key={q}
                    className="border-l border-[rgba(255,255,255,0.06)] px-3 py-2 text-center font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-(--dim)"
                  >
                    {q}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Scrubbing progress line ────────────────────────────────── */}
            <div className="pointer-events-none absolute inset-x-0 top-0 bottom-0">
              <div className="relative h-full">
                <div
                  data-progress-line
                  className="absolute top-[52px] bottom-0 left-0 w-full origin-left border-r-2 border-[var(--teal)]"
                  style={{
                    background: "linear-gradient(90deg, rgba(0,180,216,0.06), rgba(0,180,216,0.02))",
                    boxShadow: "inset -2px 0 12px rgba(0,180,216,0.3)",
                  }}
                />
              </div>
            </div>

            {/* ── Vertical quarter dividers (offset by label column) ─────── */}
            <div className="pointer-events-none absolute top-[52px] bottom-0 right-0" style={{ left: "9rem" }}>
              <div className="grid h-full grid-cols-4">
                {QUARTERS.map((q) => (
                  <div key={q} className="border-l border-[rgba(255,255,255,0.04)]" />
                ))}
              </div>
            </div>

            {/* ── Swimlanes ─────────────────────────────────────────────── */}
            <div className="relative flex flex-col">
              {swimlanes.map((lane, laneIdx) => (
                <div
                  key={lane.category}
                  className={`flex items-stretch${laneIdx > 0 ? " border-t border-[rgba(255,255,255,0.06)]" : ""}`}
                >
                  {/* Category label */}
                  <div
                    className="w-36 shrink-0 flex items-center py-3 pr-3 text-[10px] font-semibold uppercase tracking-[0.22em] leading-snug"
                    style={{ color: lane.config.nodeColor }}
                  >
                    {lane.config.label}
                  </div>

                  {/* Lane bars: each item positioned in its quarter column */}
                  <div className="relative flex-1 grid grid-cols-4 gap-y-2 py-3">
                    {lane.items.map((ms, barIdx) => {
                      const colIdx = QUARTERS.indexOf(ms.quarter as typeof QUARTERS[number]);
                      if (colIdx < 0) return null;
                      return (
                        <div
                          key={ms.id}
                          className="px-1.5 py-1"
                          style={{ gridColumn: colIdx + 1, minHeight: 36 }}
                        >
                          <GanttBar
                            milestone={ms}
                            config={lane.config}
                            delay={0.08 * laneIdx + 0.06 * barIdx}
                            onHover={handleBarHover}
                            onLeave={handleBarLeave}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── Floating hover card (portalled to body to escape ScrollSmoother transforms) */}
      {hovered && createPortal(
        <GanttTooltip milestone={hovered.milestone} position={hovered.position} />,
        document.body,
      )}
    </section>
  );
}
