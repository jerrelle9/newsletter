"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/src/gsap-init";
import { GalaxyBackground } from "@/components/layout/GalaxyBackground";
import { Reveal } from "@/components/layout/Reveal";
import { SplitHeading } from "@/components/layout/SplitHeading";
import { SectionNumber } from "@/components/layout/SectionNumber";
import {
  featureGroups,
  STATUS_CONFIG,
  type FeatureGroup,
  type FeatureCard,
} from "@/data/future-roadmap";

/* ─── Status badge ────────────────────────────────────────────────────────── */
function StatusBadge({ status }: { status: FeatureCard["status"] }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
      style={{ color: cfg.color, background: cfg.bg }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: cfg.color }}
      />
      {cfg.label}
    </span>
  );
}

/* ─── Feature card ────────────────────────────────────────────────────────── */
function Card({
  card,
  accentColor,
  accentBorder,
  dataAttr,
}: {
  card: FeatureCard;
  accentColor: string;
  accentBorder: string;
  dataAttr: string;
}) {
  const Icon = card.icon;
  return (
    <div
      data-rm={dataAttr}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border bg-[rgba(11,29,46,0.6)] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[rgba(11,29,46,0.85)] hover:shadow-[0_16px_48px_rgba(1,17,27,0.4)]"
      style={{ borderColor: accentBorder }}
    >
      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 rounded-t-2xl transition-transform duration-300 group-hover:scale-x-100"
        style={{ background: accentColor }}
      />

      {/* Icon */}
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border"
        style={{
          color: accentColor,
          borderColor: accentBorder,
          background: `color-mix(in srgb, ${accentColor} 8%, transparent)`,
        }}
      >
        <Icon className="h-4 w-4" />
      </div>

      {/* Text */}
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="text-sm font-bold leading-snug text-white">{card.title}</div>
        <p className="text-[12px] leading-[1.75] text-(--light)">{card.description}</p>
      </div>

      {/* Status */}
      <div className="mt-auto pt-1">
        <StatusBadge status={card.status} />
      </div>
    </div>
  );
}

/* ─── Feature group block ─────────────────────────────────────────────────── */
function GroupBlock({ group, index }: { group: FeatureGroup; index: number }) {
  const groupId = `rm-group-${group.id}`;

  return (
    <Reveal>
      <div
        className="overflow-hidden rounded-3xl border"
        style={{ borderColor: group.accentBorder, background: group.accentBg }}
      >
        {/* Group header */}
        <div
          className="flex items-start justify-between gap-6 border-b px-7 py-6"
          style={{ borderColor: group.accentBorder }}
        >
          <div>
            <div
              className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.28em]"
              style={{ color: group.accentColor }}
            >
              {String(index + 1).padStart(2, "0")} — Feature group
            </div>
            <h3 className="text-xl font-black leading-tight tracking-[-0.02em] text-white">
              {group.name}
            </h3>
            <p className="mt-1.5 text-[13px] leading-6 text-(--light)">{group.tagline}</p>
          </div>
          <div
            className="mt-1 shrink-0 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: group.accentColor, background: `color-mix(in srgb, ${group.accentColor} 12%, transparent)` }}
          >
            {group.cards.length} features
          </div>
        </div>

        {/* Cards grid */}
        <div
          data-rm-group={groupId}
          className="grid gap-4 p-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          {group.cards.map((card) => (
            <Card
              key={card.title}
              card={card}
              accentColor={group.accentColor}
              accentBorder={group.accentBorder}
              dataAttr={groupId}
            />
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ─── Legend ──────────────────────────────────────────────────────────────── */
function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      {(Object.entries(STATUS_CONFIG) as [FeatureCard["status"], typeof STATUS_CONFIG[FeatureCard["status"]]][]).map(
        ([, cfg]) => (
          <div key={cfg.label} className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: cfg.color }}
            />
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-(--dim)">
              {cfg.label}
            </span>
          </div>
        ),
      )}
    </div>
  );
}

/* ─── Main section ────────────────────────────────────────────────────────── */
export function RoadmapSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    featureGroups.forEach((group) => {
      const groupId = `rm-group-${group.id}`;
      const cards = gsap.utils.toArray<HTMLElement>(`[data-rm="${groupId}"]`);
      if (!cards.length) return;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.42,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `[data-rm-group="${groupId}"]`,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="section-7"
      className="relative border-b border-(--border) bg-[radial-gradient(circle_at_20%_10%,rgba(139,92,246,0.1),transparent_26%),radial-gradient(circle_at_80%_85%,rgba(255,107,53,0.07),transparent_22%),linear-gradient(180deg,var(--surface)_0%,var(--navy)_50%,var(--surface)_100%)]"
    >
      <GalaxyBackground />
      <SectionNumber number="07" />

      <div className="ml-[8vw] max-w-[66vw] xl:max-w-[60vw] 2xl:max-w-[66vw] px-6 py-24 md:px-10 lg:px-16 xl:px-10 2xl:px-16">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <Reveal className="max-w-3xl">
          <div className="text-xs font-medium uppercase tracking-[0.3em] text-(--c-primary)/70">
            Future Features
          </div>
          <SplitHeading
            as="h2"
            className="mt-4 text-4xl font-black leading-[0.9] tracking-[-0.04em] md:text-5xl"
            splitType="words"
            stagger={0.04}
          >
            What we&apos;re building next, across every product area.
          </SplitHeading>
          <p className="mt-6 text-base leading-8 text-(--light)">
            A forward-looking view of the capabilities, platforms, and experiences GDTD is
            designing, prototyping, and delivering — organised by product area.
          </p>
          <div className="mt-6">
            <Legend />
          </div>
        </Reveal>

        {/* ── Feature groups ──────────────────────────────────────────────── */}
        <div className="mt-12 flex flex-col gap-6">
          {featureGroups.map((group, i) => (
            <GroupBlock key={group.id} group={group} index={i} />
          ))}
        </div>

        {/* ── Footer note ─────────────────────────────────────────────────── */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-(--border) bg-[rgba(11,29,46,0.5)] px-6 py-5 text-center">
            <p className="text-[13px] leading-6 text-(--light)">
              This roadmap reflects planned and in-flight capabilities as of{" "}
              <span className="font-semibold text-white">Q2 2026</span>. Priorities may
              shift as the division responds to business needs, regulatory requirements,
              and Group strategy.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
