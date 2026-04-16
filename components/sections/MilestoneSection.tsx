"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
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
import { SectionNumber } from "@/components/layout/SectionNumber";
import { milestones, type MilestoneCategory } from "@/data/milestones";

/* ─── Category config ─────────────────────────────────────────────────────── */
const CATEGORY_CONFIG: Record<
  MilestoneCategory,
  { label: string; color: string; pill: string; pillText: string }
> = {
  "engineering-platforms": {
    label: "Engineering Platforms",
    color: "var(--teal)",
    pill: "bg-[rgba(0,180,216,0.12)] border-[rgba(0,180,216,0.22)]",
    pillText: "text-[var(--teal)]",
  },
  "engineering-products": {
    label: "Engineering Products",
    color: "var(--blue-lt)",
    pill: "bg-[rgba(0,150,199,0.12)] border-[rgba(139,92,246,0.22)]",
    pillText: "text-[var(--blue-lt)]",
  },
  "digital-products": {
    label: "Digital Products",
    color: "var(--green)",
    pill: "bg-[rgba(6,214,160,0.12)] border-[rgba(6,214,160,0.22)]",
    pillText: "text-[var(--green)]",
  },
  "digital-banking": {
    label: "Digital Banking",
    color: "var(--blue-lt)",
    pill: "bg-[rgba(0,180,216,0.10)] border-[rgba(0,180,216,0.20)]",
    pillText: "text-[var(--blue-lt)]",
  },
  "division-wide": {
    label: "Division-Wide",
    color: "var(--gold)",
    pill: "bg-[rgba(245,166,35,0.12)] border-[rgba(245,166,35,0.22)]",
    pillText: "text-[var(--gold)]",
  },
};

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

/* ─── Track layout constants ──────────────────────────────────────────────── */
const CARD_W = 300;
const CARD_GAP = 72;
const TRACK_PAD_R = 420; // breathing room after last card (clears the nav wheel)

/* ─── Quarter → first-milestone index map ────────────────────────────────── */
const QUARTER_FIRST = new Map<string, number>();
const QUARTERS: string[] = [];
milestones.forEach((m, i) => {
  if (!QUARTER_FIRST.has(m.quarter)) {
    QUARTER_FIRST.set(m.quarter, i);
    QUARTERS.push(m.quarter);
  }
});

/* ─── Spine position (% of track area height) ────────────────────────────── */
const SPINE_PCT = 42; // spine sits at 42% from top of track area

/* ─── Main component ──────────────────────────────────────────────────────── */
export function MilestoneSection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(() => {
    if (typeof window === "undefined") return 2200;
    const trackPadL = Math.round(window.innerWidth * 0.08);
    const raw =
      trackPadL +
      milestones.length * CARD_W +
      (milestones.length - 1) * CARD_GAP +
      TRACK_PAD_R;
    return Math.max(0, raw - window.innerWidth + 48);
  });
  const [trackPadL, setTrackPadL] = useState(() =>
    typeof window !== "undefined" ? Math.round(window.innerWidth * 0.08) : 120
  );
  const [activeIndex, setActiveIndex] = useState(0);

  /* Recalculate on resize */
  useEffect(() => {
    const calc = () => {
      const padL = Math.round(window.innerWidth * 0.08);
      setTrackPadL(padL);
      if (trackRef.current) {
        setScrollDistance(
          Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 48)
        );
      }
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);
  const spineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIndex(
      Math.min(
        milestones.length - 1,
        Math.max(0, Math.round(v * (milestones.length - 1)))
      )
    );
  });

  const active = milestones[activeIndex];
  const activeCfg = CATEGORY_CONFIG[active.category];
  const ActiveIcon = ICON_MAP[active.icon];

  return (
    <section
      id="section-6"
      className="relative border-b border-(--border) bg-[radial-gradient(circle_at_70%_12%,rgba(139,92,246,0.1),transparent_24%),radial-gradient(circle_at_14%_80%,rgba(0,180,216,0.1),transparent_20%),linear-gradient(180deg,var(--surface)_0%,var(--navy)_100%)]"
    >
      <GalaxyBackground />
      <SectionNumber number="06" />

      {/* ── Scroll driver: tall enough to translate the full track ─────── */}
      <div
        ref={outerRef}
        style={{ height: `calc(100vh + ${scrollDistance}px)` }}
      >
        {/* ── Sticky viewport ─────────────────────────────────────────── */}
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col">

          {/* ── Info panel ──────────────────────────────────────────────── */}
          <div
            className="flex-none pt-14 pb-5 px-10 xl:px-10 2xl:px-16"
            style={{ marginLeft: "8vw", maxWidth: "min(60vw, 720px)" }}
          >
            {/* Section label */}
            <div className="text-xs font-medium uppercase tracking-[0.3em] text-(--c-primary)/70">
              Milestones
            </div>

            {/* Quarter progress bars */}
            <div className="mt-3 flex items-center gap-2">
              {QUARTERS.map((q) => (
                <div
                  key={q}
                  className="h-[3px] flex-1 rounded-full transition-all duration-500"
                  style={{
                    background:
                      active.quarter === q
                        ? activeCfg.color
                        : "rgba(255,255,255,0.08)",
                    boxShadow:
                      active.quarter === q
                        ? `0 0 8px 2px ${activeCfg.color}70`
                        : "none",
                  }}
                />
              ))}
              <span className="ml-2 shrink-0 font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-(--dim)">
                {active.quarter}
              </span>
            </div>

            {/* Active milestone details — animates on change */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.26em] ${activeCfg.pill} ${activeCfg.pillText}`}
                >
                  {ActiveIcon && <ActiveIcon className="h-3 w-3" />}
                  {activeCfg.label}
                </div>
                <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-(--dim)">
                  {activeIndex + 1}&thinsp;/&thinsp;{milestones.length}
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-black leading-tight tracking-[-0.03em] text-white xl:text-[1.65rem] 2xl:text-3xl">
                {active.title}
              </h2>
              <p className="mt-2 text-sm leading-7 text-(--light)" style={{ maxWidth: 480 }}>
                {active.description}
              </p>
            </motion.div>
          </div>

          {/* ── Timeline track area ─────────────────────────────────────── */}
          <div className="relative flex-1 min-h-0">

            {/* Static spine rail */}
            <div
              className="pointer-events-none absolute inset-x-0 h-px bg-[rgba(255,255,255,0.07)]"
              style={{ top: `${SPINE_PCT}%` }}
            />

            {/* Animated spine fill */}
            <div
              className="pointer-events-none absolute inset-x-0 h-px overflow-hidden"
              style={{ top: `${SPINE_PCT}%` }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  scaleX: spineScaleX,
                  transformOrigin: "left center",
                  background:
                    "linear-gradient(90deg, var(--teal), var(--blue-lt), var(--purple))",
                  boxShadow: "0 0 8px 2px rgba(0,180,216,0.5)",
                }}
              />
            </div>

            {/* ── Scrolling track ─────────────────────────────────────── */}
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="absolute top-0 bottom-0 left-0 flex"
            >
              {/* Left padding — aligns first card with content margin */}
              <div style={{ width: trackPadL, flexShrink: 0 }} />

              {milestones.map((ms, i) => {
                const cfg = CATEGORY_CONFIG[ms.category];
                const Icon = ICON_MAP[ms.icon];
                const isActive = i === activeIndex;
                const isFirstInQuarter = QUARTER_FIRST.get(ms.quarter) === i;

                return (
                  <div
                    key={ms.id}
                    className="relative flex-shrink-0"
                    style={{
                      width: CARD_W,
                      marginRight:
                        i < milestones.length - 1 ? CARD_GAP : 0,
                    }}
                  >
                    {/* ── Quarter label above spine ──────────────────── */}
                    {isFirstInQuarter && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.06 }}
                        className="absolute"
                        style={{
                          bottom: `calc(${100 - SPINE_PCT}% + 18px)`,
                          left: 0,
                        }}
                      >
                        <div
                          className="inline-flex items-center gap-2 rounded-full border px-3 py-1"
                          style={{
                            borderColor: `${cfg.color}25`,
                            background: `${cfg.color}0e`,
                          }}
                        >
                          <div
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: cfg.color }}
                          />
                          <span
                            className="text-[10px] font-semibold uppercase tracking-[0.28em]"
                            style={{ color: cfg.color }}
                          >
                            {ms.quarter}
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {/* Quarter → spine connector */}
                    {isFirstInQuarter && (
                      <div
                        className="absolute w-px"
                        style={{
                          bottom: `${100 - SPINE_PCT}%`,
                          height: "18px",
                          left: "18px",
                          background: `${cfg.color}28`,
                        }}
                      />
                    )}

                    {/* ── Node on spine ──────────────────────────────── */}
                    <div
                      className="absolute left-1/2"
                      style={{
                        top: `${SPINE_PCT}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {/* Pulse ring — active only */}
                      {isActive && (
                        <motion.div
                          className="absolute rounded-full"
                          style={{
                            width: 32,
                            height: 32,
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            border: `1px solid ${cfg.color}`,
                          }}
                          animate={{
                            scale: [1, 1.9, 1],
                            opacity: [0.6, 0, 0.6],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                      {/* Core dot */}
                      <motion.div
                        animate={{
                          scale: isActive ? 1.25 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        className="h-3 w-3 rounded-full transition-colors duration-300"
                        style={{
                          background: isActive
                            ? cfg.color
                            : "rgba(255,255,255,0.18)",
                          boxShadow: isActive
                            ? `0 0 20px 6px ${cfg.color}60`
                            : "none",
                        }}
                      />
                    </div>

                    {/* ── Node → card connector ──────────────────────── */}
                    <div
                      className="absolute left-1/2 w-px transition-colors duration-300"
                      style={{
                        top: `${SPINE_PCT}%`,
                        height: 28,
                        marginLeft: -0.5,
                        background: isActive
                          ? cfg.color
                          : "rgba(255,255,255,0.08)",
                      }}
                    />

                    {/* ── Card ───────────────────────────────────────── */}
                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : 0.36,
                        y: isActive ? 0 : 6,
                      }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-0 right-0 overflow-hidden rounded-3xl border bg-[rgba(11,29,46,0.76)] p-5 backdrop-blur-xl"
                      style={{
                        top: `calc(${SPINE_PCT}% + 28px)`,
                        borderColor: isActive
                          ? `${cfg.color}38`
                          : "rgba(255,255,255,0.06)",
                      }}
                    >
                      {/* Top accent bar */}
                      <div
                        className="absolute inset-x-0 top-0 h-[2px] transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(90deg, ${cfg.color}, transparent)`,
                          opacity: isActive ? 1 : 0.28,
                        }}
                      />

                      <div
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.24em] ${cfg.pill} ${cfg.pillText}`}
                      >
                        {Icon && <Icon className="h-3 w-3" />}
                        {cfg.label}
                      </div>

                      <h3 className="mt-3 text-sm font-bold leading-snug tracking-[-0.01em] text-white">
                        {ms.title}
                      </h3>
                    </motion.div>
                  </div>
                );
              })}

              {/* Right padding */}
              <div style={{ width: TRACK_PAD_R, flexShrink: 0 }} />
            </motion.div>
          </div>

          {/* ── Scroll hint ─────────────────────────────────────────────── */}
          <div
            className="absolute bottom-5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.3em] text-(--dim)/60"
            style={{ left: "calc(8vw + 2.5rem)" }}
          >
            <motion.div
              className="flex items-center gap-0.5"
              animate={{ x: [0, 7, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="h-px w-4 self-center bg-(--dim)/50" />
              <div className="h-px w-3 self-center bg-(--dim)/35" />
              <div className="h-px w-2 self-center bg-(--dim)/20" />
            </motion.div>
            Scroll to explore
          </div>

        </div>
      </div>
    </section>
  );
}
