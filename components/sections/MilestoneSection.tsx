import { useRef } from "react";
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
    pillClass: string;
    pillTextClass: string;
    nodeColor: string;
    borderClass: string;
  }
> = {
  "engineering-platforms": {
    label: "Engineering Platforms",
    barClass: "from-[var(--teal)] to-[var(--blue)]",
    pillClass: "bg-[rgba(0,180,216,0.12)] border-[rgba(0,180,216,0.22)]",
    pillTextClass: "text-[var(--teal)]",
    nodeColor: "rgba(0,180,216,0.9)",
    borderClass: "border-[rgba(0,180,216,0.14)]",
  },
  "engineering-products": {
    label: "Engineering Products",
    barClass: "from-[var(--blue)] to-[var(--purple)]",
    pillClass: "bg-[rgba(0,150,199,0.12)] border-[rgba(139,92,246,0.22)]",
    pillTextClass: "text-[var(--blue-lt)]",
    nodeColor: "rgba(139,92,246,0.9)",
    borderClass: "border-[rgba(139,92,246,0.14)]",
  },
  "digital-products": {
    label: "Digital Products",
    barClass: "from-[var(--green)] to-[var(--teal)]",
    pillClass: "bg-[rgba(6,214,160,0.12)] border-[rgba(6,214,160,0.22)]",
    pillTextClass: "text-[var(--green)]",
    nodeColor: "rgba(6,214,160,0.9)",
    borderClass: "border-[rgba(6,214,160,0.14)]",
  },
  "digital-banking": {
    label: "Digital Banking",
    barClass: "from-[var(--teal)] to-[var(--blue-lt)]",
    pillClass: "bg-[rgba(0,180,216,0.10)] border-[rgba(0,180,216,0.20)]",
    pillTextClass: "text-[var(--blue-lt)]",
    nodeColor: "rgba(0,180,230,0.9)",
    borderClass: "border-[rgba(0,180,230,0.14)]",
  },
  "division-wide": {
    label: "Division-Wide",
    barClass: "from-[var(--gold)] to-[var(--orange)]",
    pillClass: "bg-[rgba(245,166,35,0.12)] border-[rgba(245,166,35,0.22)]",
    pillTextClass: "text-[var(--gold)]",
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
};

/* ─── Shared animated spine ───────────────────────────────────────────────── */
function TimelineSpine({
  containerRef,
  className,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  className: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!fillRef.current || !containerRef.current) return;
    gsap.set(fillRef.current, { scaleY: 0 });
    gsap.to(fillRef.current, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 0.3,
      },
    });
  }, { scope: wrapRef });

  return (
    <div ref={wrapRef} className={`pointer-events-none absolute ${className}`}>
      <div className="relative h-full w-px">
        <div className="absolute inset-0 bg-[rgba(255,255,255,0.06)]" />
        <div
          ref={fillRef}
          className="absolute inset-0 origin-top bg-[linear-gradient(180deg,var(--teal),var(--blue-lt),var(--purple))]"
          style={{ boxShadow: "0 0 12px 2px rgba(0,180,216,0.45)" }}
        />
      </div>
    </div>
  );
}

/* ─── Timeline node dot ───────────────────────────────────────────────────── */
function TimelineNode({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    // Core dot entrance
    gsap.fromTo(
      coreRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
    // Pulse ring
    gsap.fromTo(
      pulseRef.current,
      { scale: 1, opacity: 0.6 },
      {
        scale: 1.6,
        opacity: 0,
        duration: 2.4,
        ease: "sine.inOut",
        repeat: -1,
        delay: 0.6,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play pause resume pause",
        },
      }
    );
  }, { scope: ref });

  return (
    <div
      ref={ref}
      className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center"
    >
      <div
        ref={pulseRef}
        className="absolute h-10 w-10 rounded-full"
        style={{ border: `1px solid ${color}` }}
      />
      <div
        ref={coreRef}
        className="h-3 w-3 rounded-full"
        style={{ background: color, boxShadow: `0 0 18px 4px ${color}` }}
      />
    </div>
  );
}

/* ─── Horizontal bridge (card ↔ spine) ────────────────────────────────────── */
function HorizontalBridge({
  color,
  direction,
}: {
  color: string;
  direction: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.set(ref.current, { scaleX: 0, opacity: 0 });
    gsap.to(ref.current, {
      scaleX: 1,
      opacity: 1,
      duration: 0.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, { scope: ref });

  return (
    <div
      ref={ref}
      className="h-px w-10 shrink-0"
      style={{
        background:
          direction === "left"
            ? `linear-gradient(90deg, transparent, ${color})`
            : `linear-gradient(90deg, ${color}, transparent)`,
        transformOrigin: direction === "left" ? "right" : "left",
      }}
    />
  );
}

/* ─── Milestone card ──────────────────────────────────────────────────────── */
function MilestoneCard({ milestone }: { milestone: Milestone }) {
  const cfg = CATEGORY_CONFIG[milestone.category];
  const Icon = ICON_MAP[milestone.icon];

  return (
    <Reveal>
      <div
        className={`relative overflow-hidden rounded-4xl border ${cfg.borderClass} bg-[rgba(11,29,46,0.62)] p-6 backdrop-blur-xl shadow-[0_18px_60px_rgba(1,17,27,0.3)] transition-colors duration-200 hover:border-[rgba(255,255,255,0.12)] hover:bg-[rgba(11,29,46,0.78)]`}
      >
        {/* Top gradient accent bar */}
        <div className={`absolute inset-x-0 top-0 h-[2px] bg-linear-to-r ${cfg.barClass}`} />

        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div
            className={`inline-flex items-center rounded-full border px-3 py-1 ${cfg.pillClass} ${cfg.pillTextClass} text-[10px] font-semibold uppercase tracking-[0.28em]`}
          >
            {cfg.label}
          </div>
          {Icon && (
            <div
              className={`rounded-2xl border ${cfg.borderClass} bg-[rgba(255,255,255,0.04)] p-2.5 ${cfg.pillTextClass}`}
            >
              <Icon className="h-4 w-4" />
            </div>
          )}
        </div>

        {/* Quarter */}
        <div className="mt-4 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-(--dim)">
          {milestone.quarter}
        </div>

        {/* Title */}
        <h3 className="mt-2 text-lg font-bold leading-snug tracking-[-0.01em] text-white">
          {milestone.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm leading-7 text-(--light)">{milestone.description}</p>
      </div>
    </Reveal>
  );
}

/* ─── Main section ────────────────────────────────────────────────────────── */
export function MilestoneSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="section-5"
      className="relative min-h-screen border-b border-(--border) bg-[radial-gradient(circle_at_70%_12%,rgba(139,92,246,0.1),transparent_24%),radial-gradient(circle_at_14%_80%,rgba(0,180,216,0.1),transparent_20%),linear-gradient(180deg,var(--surface)_0%,var(--navy)_100%)]"
    >
      <GalaxyBackground />
      <SectionNumber number="05" />

      <div
        ref={sectionRef}
        className="ml-[8vw] max-w-[66vw] px-6 py-24 md:px-10 lg:px-16"
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

          {/* Category legend */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            {(
              Object.entries(CATEGORY_CONFIG) as [
                MilestoneCategory,
                (typeof CATEGORY_CONFIG)[MilestoneCategory],
              ][]
            ).map(([key, cfg]) => (
              <div
                key={key}
                className={`rounded-full border px-3 py-1.5 ${cfg.pillClass} ${cfg.pillTextClass} text-[10px] font-semibold uppercase tracking-[0.26em]`}
              >
                {cfg.label}
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── Timeline ────────────────────────────────────────────────────── */}
        <div className="relative mt-16">

          {/* ── Mobile: left-rail ───────────────────────────────────────── */}
          <div className="relative flex flex-col lg:hidden">
            {/* Animated left spine */}
            <TimelineSpine
              containerRef={sectionRef}
              className="inset-y-0 left-[11px]"
            />

            {milestones.map((ms) => {
              const cfg = CATEGORY_CONFIG[ms.category];
              return (
                <div key={ms.id} className="relative flex gap-5 pb-8 last:pb-0">
                  {/* Node on the left rail */}
                  <div className="flex w-6 shrink-0 flex-col items-center pt-5">
                    <TimelineNode color={cfg.nodeColor} />
                  </div>
                  {/* Card */}
                  <div className="min-w-0 flex-1">
                    <MilestoneCard milestone={ms} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Desktop: alternating two-column with central spine ──────── */}
          <div className="hidden lg:block">
            {/* Central vertical spine */}
            <TimelineSpine
              containerRef={sectionRef}
              className="inset-y-0 left-1/2 -translate-x-1/2"
            />

            <div className="flex flex-col">
              {milestones.map((ms, i) => {
                const cfg = CATEGORY_CONFIG[ms.category];
                const isLeft = i % 2 === 0;

                return (
                  <div
                    key={ms.id}
                    className="grid grid-cols-[1fr_64px_1fr] items-center py-5"
                  >
                    {/* Left slot */}
                    <div className="flex items-center">
                      {isLeft ? (
                        <>
                          <div className="min-w-0 flex-1">
                            <MilestoneCard milestone={ms} />
                          </div>
                          {/* Bridge from card to spine */}
                          <HorizontalBridge color={cfg.nodeColor} direction="left" />
                        </>
                      ) : null}
                    </div>

                    {/* Central node */}
                    <div className="flex justify-center">
                      <TimelineNode color={cfg.nodeColor} />
                    </div>

                    {/* Right slot */}
                    <div className="flex items-center">
                      {!isLeft ? (
                        <>
                          {/* Bridge from spine to card */}
                          <HorizontalBridge color={cfg.nodeColor} direction="right" />
                          <div className="min-w-0 flex-1">
                            <MilestoneCard milestone={ms} />
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
