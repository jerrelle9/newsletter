"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/src/gsap-init";
import { Reveal } from "@/components/layout/Reveal";
import { SectionNumber } from "@/components/layout/SectionNumber";
import { OrgBubble } from "@/components/org/OrgBubble";
import { GalaxyBackground } from "@/components/layout/GalaxyBackground";
import { gdtdStructure } from "@/data/gdtd-structure";
import { orgOverview } from "@/data/org-overview";

/* ─── GM node ─────────────────────────────────────────────────────────────── */
function GmNode({ leader }: { leader: typeof gdtdStructure.leader }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, scale: 0.8, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ref.current, start: "top 88%", toggleActions: "play none none none" },
      },
    );
  }, { scope: ref });

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <OrgBubble label="GM" size="lg" image={leader.image} />
      <div className="mt-4 text-xl font-semibold text-white">{leader.name}</div>
      <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.26em] text-(--c-primary)/80">
        {leader.role}
      </div>
      <div className="mt-1 text-sm text-(--dim)">Group Digital Technology Division</div>
    </div>
  );
}

/* ─── Senior manager card ─────────────────────────────────────────────────── */
function SmCard({
  name,
  image,
  role,
  delay,
}: {
  name: string;
  image?: string;
  role?: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const initials = name.split(" ").map((p) => p[0]).join("").slice(0, 2);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.38, delay, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 90%", toggleActions: "play none none none" },
      },
    );
  }, { scope: ref });

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-3xl border border-(--border) bg-[rgba(11,29,46,0.72)] p-5 shadow-[0_12px_40px_rgba(1,17,27,0.35)] backdrop-blur-xl"
    >
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-linear-to-r from-[var(--teal)] to-[var(--blue)]" />
      <div className="flex flex-col items-center text-center gap-3">
        <OrgBubble
          label={initials}
          gradient="from-[var(--teal)] to-[var(--blue)]"
          image={image}
          size="md"
        />
        <div>
          <div className="mt-1 text-sm font-semibold text-white">{name}</div>
          <div className="text-[9px] font-medium uppercase tracking-[0.26em] text-(--c-primary)/70">
            {role}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Manager card ────────────────────────────────────────────────────────── */
function ManagerCard({
  name,
  role,
  designation,
  image,
  delay,
}: {
  name: string;
  role?: string;
  designation?: string;
  image?: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const initials = name.split(" ").map((p) => p[0]).join("").slice(0, 2);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, y: 14, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.34, delay, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 92%", toggleActions: "play none none none" },
      },
    );
  }, { scope: ref });

  return (
    <div
      ref={ref}
      className="relative flex items-center gap-4 rounded-2xl border border-(--border) bg-[rgba(11,29,46,0.5)] p-4"
    >
      <OrgBubble
        label={initials}
        gradient="from-[var(--blue)] to-[var(--purple)]"
        image={image}
        size="md"
      />
      <div className="min-w-0">
        <div className="mt-1 truncate text-sm font-semibold text-white">{name}</div>
        {designation ? (
          <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-(--dim)">
            {designation}, {role}
          </div>
        ) : (
          <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-(--dim)">{role ?? "Manager"}</div>
        )}
      </div>
    </div>
  );
}


/* ─── Scrollable description with overflow indicator ────────────────────── */
function ScrollableDescription({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const bounceRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setHasOverflow(el.scrollHeight > el.clientHeight + 4);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!fadeRef.current) return;
    gsap.to(fadeRef.current, { opacity: hasOverflow && !atBottom ? 1 : 0, duration: 0.25 });
  }, [hasOverflow, atBottom]);

  useGSAP(() => {
    if (!bounceRef.current) return;
    gsap.to(bounceRef.current, { y: 3, duration: 0.7, repeat: -1, yoyo: true, ease: "sine.inOut" });
  }, { scope: bounceRef });

  const handleScroll = () => {
    const el = ref.current;
    if (!el) return;
    setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 4);
  };

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden pt-2">
      <div
        ref={ref}
        onScroll={handleScroll}
        className="overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/25"
      >
        {children}
      </div>

      {/* Fade + scroll cue */}
      <div
        ref={fadeRef}
        style={{ opacity: 0 }}
        className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center justify-end gap-1 bg-gradient-to-t from-[var(--navy)] via-[var(--navy)]/80 to-transparent pb-1.5 pt-10"
      >
        <div ref={bounceRef} className="flex flex-col items-center gap-0.5">
          <div className="h-px w-4 bg-(--dim)/60" />
          <div className="h-px w-3 bg-(--dim)/40" />
          <div className="h-px w-2 bg-(--dim)/20" />
        </div>
        <span className="text-[9px] font-medium uppercase tracking-[0.24em] text-(--dim)">
          scroll
        </span>
      </div>
    </div>
  );
}

/* ─── Engineering section: accent config ────────────────────────────────── */
const ENG_TEAM_ACCENT: Record<string, { color: string; ring: string }> = {
  "Digital Banking & Support Systems": {
    color: "var(--purp-lt)",
    ring: "rgba(167,139,250,0.4)",
  },
  "Engineering Platforms": {
    color: "var(--orange)",
    ring: "rgba(255,107,53,0.4)",
  },
  "Engineering Products": {
    color: "var(--gold)",
    ring: "rgba(245,166,35,0.4)",
  },
};

/* ─── Engineering section: small avatar ─────────────────────────────────── */
function EngAvatar({
  initials,
  image,
  size = "md",
  accentColor,
  ringColor,
}: {
  initials: string;
  image?: string;
  size?: "md" | "lg" | "xl";
  accentColor?: string;
  ringColor?: string;
}) {
  const pulseRef = useRef<HTMLSpanElement>(null);
  const sizeMap = {
    md: "h-14 w-14 text-sm",
    lg: "h-20 w-20 text-lg",
    xl: "h-24 w-24 text-2xl",
  };

  useGSAP(() => {
    if (!pulseRef.current) return;
    gsap.fromTo(pulseRef.current,
      { opacity: 0.45, scale: 1 },
      { opacity: 0, scale: 1.22, duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut" },
    );
  }, { scope: pulseRef });

  return (
    <div
      className={`relative shrink-0 rounded-full ${sizeMap[size]}`}
      style={{ boxShadow: `0 0 0 1px ${ringColor ?? "rgba(255,255,255,0.08)"}` }}
    >
      {image ? (
        <img
          src={image}
          alt={initials}
          className="h-full w-full rounded-full object-cover object-top"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center rounded-full bg-[var(--navy)] font-light tracking-[0.08em]"
          style={{ color: accentColor ?? "var(--light)" }}
        >
          {initials}
        </div>
      )}
      {/* Pulsing ring overlay */}
      <span
        ref={pulseRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{ boxShadow: `0 0 0 1px ${accentColor ?? "var(--light)"}` }}
      />
    </div>
  );
}

/* ─── Animated vertical drop line ────────────────────────────────────────── */
function DropLine({ delay, height = "h-10" }: { delay: number; height?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, duration: 0.35, delay, ease: "power1.out", transformOrigin: "top",
        scrollTrigger: { trigger: ref.current, start: "top 92%", toggleActions: "play none none none" },
      },
    );
  }, { scope: ref });

  return (
    <div
      ref={ref}
      className={`${height} w-px bg-[linear-gradient(180deg,rgba(0,180,216,0.7),rgba(0,180,216,0.2))]`}
    />
  );
}

/* ─── Reusable GSAP scroll-in wrapper (replaces motion.div whileInView) ── */
function AnimIn({
  children,
  className,
  from,
  delay = 0,
  duration = 0.45,
  start = "top 90%",
  style,
}: {
  children?: React.ReactNode;
  className?: string;
  from: gsap.TweenVars;
  delay?: number;
  duration?: number;
  start?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const to: gsap.TweenVars = { duration, delay, ease: "power3.out" };
    for (const key of Object.keys(from)) {
      if (key === "opacity") to.opacity = 1;
      else if (key === "y") to.y = 0;
      else if (key === "x") to.x = 0;
      else if (key === "scale") to.scale = 1;
      else if (key === "scaleX") to.scaleX = 1;
      else if (key === "scaleY") to.scaleY = 1;
    }
    to.scrollTrigger = { trigger: ref.current, start, toggleActions: "play none none none" };
    gsap.fromTo(ref.current, { ...from }, to);
  }, { scope: ref });

  return <div ref={ref} className={className} style={style}>{children}</div>;
}

/* ─── Main section ────────────────────────────────────────────────────────── */
export function StructureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gdtdBoxRef = useRef<HTMLDivElement>(null);
  const gdtdRingRef = useRef<HTMLSpanElement>(null);

  /* ── GDTD pulse animation ─────────────────────────────────────────────── */
  useGSAP(() => {
    if (gdtdBoxRef.current) {
      gsap.fromTo(gdtdBoxRef.current,
        { boxShadow: "0 0 18px 2px rgba(0,180,216,0.3)", borderColor: "rgba(0,180,216,0.5)" },
        { boxShadow: "0 0 48px 10px rgba(0,180,216,0.75)", borderColor: "rgba(0,180,216,1)",
          duration: 1, repeat: -1, yoyo: true, ease: "sine.inOut" },
      );
    }
    if (gdtdRingRef.current) {
      gsap.fromTo(gdtdRingRef.current,
        { opacity: 0.5, scale: 1 },
        { opacity: 0, scale: 1.12, duration: 1, repeat: -1, yoyo: true, ease: "sine.inOut" },
      );
    }
  }, { scope: sectionRef });
  // Deduplicate SMs across teams, collecting all their managers
  const smList = useMemo(() => {
    const map = new Map<
      string,
      {
        name: string;
        role?: string;
        image?: string;
        managers: Array<{ name: string; role?: string; designation?: string; image?: string; message?: string }>;
      }
    >();

    gdtdStructure.teams.forEach((team) => {
      const smName = team.seniorManager.name;
      if (!map.has(smName)) {
        map.set(smName, { name: smName, role: team.seniorManager.role, image: team.seniorManager.image, managers: [] });
      }
      const sm = map.get(smName)!;
      team.managers.forEach((mgr) => {
        if (!sm.managers.find((m) => m.name === mgr.name)) {
          sm.managers.push({ name: mgr.name, role: mgr.role, designation: mgr.designation, image: mgr.image, message: mgr.message });
        }
      });
    });

    return Array.from(map.values());
  }, []);

  // Engineering SM is Dmytro — first entry (Engineering Platforms, DBBS, Engineering Products)
  const engineeringSm = smList[0];

  // All teams that report to Dmytro
  const engineeringTeams = useMemo(
    () => gdtdStructure.teams.filter((t) => t.seniorManager.name === "Dmytro Lavrinenko"),
    []
  );

  // Digital Platforms SM and team
  const digitalPlatformsSm = smList.find((sm) => sm.name === "David Kell");
  const digitalPlatformsTeam = useMemo(
    () => gdtdStructure.teams.find((t) => t.name === "Digital Platforms"),
    []
  );

  return (
    <section
      ref={sectionRef}
      id="section-4"
      className="relative min-h-[200vh] border-b border-(--border) bg-[radial-gradient(circle_at_50%_8%,rgba(0,180,216,0.12),transparent_16%),linear-gradient(180deg,var(--navy)_0%,var(--surface)_100%)]"
    >
      <GalaxyBackground />
      <SectionNumber number="04" />

      <div className="ml-[8vw] max-w-[66vw] xl:max-w-[60vw] 2xl:max-w-[66vw] px-6 py-24 md:px-10 lg:px-16 xl:px-10 2xl:px-16">

        {/* Section header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-medium uppercase tracking-[0.3em] text-(--c-primary)/70">
            Our structure
          </div>
          <h2 className="mt-4 text-4xl font-black leading-[0.9] tracking-[-0.04em] md:text-5xl">
            Structured to deliver across the wider IT organisation and within GDTD itself.
          </h2>
          <p className="mt-5 text-base leading-8 text-(--light)">
            This view shows first where GDTD sits in Republic&apos;s wider technology
            structure, then how leadership and reporting lines flow within the division itself.
          </p>
        </Reveal>

        {/* ── Layer 1: Org placement ─────────────────────────────────────── */}
        <Reveal className="mt-16">
          <div className="rounded-4xl border border-(--border) bg-[rgba(11,29,46,0.76)] p-8 shadow-[0_24px_100px_rgba(1,17,27,0.55)] backdrop-blur-2xl">
            <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-(--c-primary)/80">
              Organisational placement
            </div>

            <div className="mt-8 flex flex-col items-center">

              {/* ── CIDTO — prominent top node ──────────────────────────── */}
              <AnimIn
                from={{ opacity: 0, y: -14 }}
                delay={0.1}
                className="relative w-full overflow-hidden rounded-3xl border border-white/20 bg-[rgba(11,29,46,0.95)] px-10 py-6 text-center shadow-[0_20px_60px_rgba(1,17,27,0.5)]"
              >
                {/* Subtle inner glow */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
                <div className="relative">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                    {orgOverview.top.title}
                  </span>
                  <div className="mt-2 text-4xl font-black tracking-[-0.02em] text-white">
                    {orgOverview.top.code}
                  </div>
                </div>
              </AnimIn>

              {/* Drop from CIDTO to horizontal bar */}
              <AnimIn
                from={{ scaleY: 0, opacity: 0 }}
                delay={0.35}
                duration={0.35}
                style={{ transformOrigin: "top" }}
                className="h-10 w-px bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0.15))]"
              />

              {/* ── Division row ─────────────────────────────────────────── */}
              <div className="relative w-full">
                {/* Horizontal connector spanning all three columns */}
                <AnimIn
                  from={{ scaleX: 0, opacity: 0 }}
                  delay={0.42}
                  duration={0.5}
                  style={{ transformOrigin: "center" }}
                  className="absolute top-0 left-[16.67%] right-[16.67%] h-px bg-[rgba(255,255,255,0.18)]"
                />

              <div className="flex w-full items-start">

                {/* GTSD */}
                <div className="flex flex-1 flex-col items-center">
                  <AnimIn
                    from={{ scaleY: 0, opacity: 0 }}
                    delay={0.62}
                    duration={0.25}
                    style={{ transformOrigin: "top" }}
                    className="h-10 w-px bg-[rgba(255,255,255,0.18)]"
                  />
                  <AnimIn
                    from={{ opacity: 0, y: 10 }}
                    delay={0.72}
                    duration={0.38}
                    className="w-full rounded-2xl border border-(--border) bg-[rgba(11,29,46,0.6)] px-6 py-5 text-center"
                  >
                    <span className="text-[10px] uppercase tracking-[0.22em] text-(--dim)">Division</span>
                    <div className="mt-1.5 text-2xl font-bold text-white">{orgOverview.divisions[0].code}</div>
                    <div className="mt-1 text-[10px] leading-4 text-(--dim)">{orgOverview.divisions[0].title}</div>
                  </AnimIn>
                </div>

                {/* GDTD */}
                <div className="flex flex-1 flex-col items-center">
                  <AnimIn
                    from={{ scaleY: 0, opacity: 0 }}
                    delay={0.54}
                    duration={0.3}
                    style={{ transformOrigin: "top" }}
                    className="h-10 w-px bg-[linear-gradient(180deg,rgba(0,180,216,0.8),rgba(0,180,216,0.4))]"
                  />
                  <AnimIn
                    from={{ opacity: 0, y: 10 }}
                    delay={0.58}
                    duration={0.38}
                    className="w-full px-4"
                  >
                    <div
                      ref={gdtdBoxRef}
                      className="relative rounded-2xl border bg-[var(--navy)] px-6 py-5 text-center"
                    >
                      <span
                        ref={gdtdRingRef}
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-[var(--blue-lt)]"
                      />
                      <span className="relative text-[10px] uppercase tracking-[0.22em] text-(--c-primary)">
                        That&apos;s us
                      </span>
                      <div className="relative mt-1.5 text-2xl font-bold text-(--c-primary)">
                        {orgOverview.divisions[1].code}
                      </div>
                      <div className="relative mt-1 text-[10px] leading-4 text-(--c-primary)/60">
                        {orgOverview.divisions[1].title}
                      </div>
                    </div>
                  </AnimIn>
                </div>

                {/* DGMU */}
                <div className="flex flex-1 flex-col items-center">
                  <AnimIn
                    from={{ scaleY: 0, opacity: 0 }}
                    delay={0.62}
                    duration={0.25}
                    style={{ transformOrigin: "top" }}
                    className="h-10 w-px bg-[rgba(255,255,255,0.18)]"
                  />
                  <AnimIn
                    from={{ opacity: 0, y: 10 }}
                    delay={0.82}
                    duration={0.38}
                    className="w-full rounded-2xl border border-(--border) bg-[rgba(11,29,46,0.6)] px-6 py-5 text-center"
                  >
                    <span className="text-[10px] uppercase tracking-[0.22em] text-(--dim)">Division</span>
                    <div className="mt-1.5 text-2xl font-bold text-white">{orgOverview.divisions[2].code}</div>
                    <div className="mt-1 text-[10px] leading-4 text-(--dim)">{orgOverview.divisions[2].title}</div>
                  </AnimIn>
                </div>

              </div>
              </div>{/* end relative wrapper */}
            </div>
          </div>
        </Reveal>

        {/* ── Layer 2: Reporting tree ────────────────────────────────────── */}
        <Reveal className="mt-10">
          <div className="rounded-4xl border border-(--border) bg-[rgba(11,29,46,0.76)] p-8 shadow-[0_24px_100px_rgba(1,17,27,0.55)] backdrop-blur-2xl">
            <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-(--c-primary)/80">
              GDTD reporting structure
            </div>

            <div className="mt-8">

              {/* ── Level 0: GM ───────────────────────────────────────── */}
              <div className="flex flex-col items-center">
                <GmNode leader={gdtdStructure.leader} />

                {/* Drop to SM row */}
                <div className="mt-6 flex justify-center">
                  <DropLine delay={0.1} height="h-12" />
                </div>
              </div>

              {/* ── Level 1: Senior Managers ──────────────────────────── */}
              <div className="flex items-start">
                {smList.map((sm, i) => {
                  const isFirst = i === 0;
                  const isLast = i === smList.length - 1;

                  return (
                    <div key={sm.name} className="flex flex-1 flex-col items-center">
                      {/* Arch connector */}
                      <AnimIn
                        from={{ opacity: 0 }}
                        delay={0.18}
                        duration={0.3}
                        className={`h-8 w-full ${
                          isFirst && isLast
                            ? ""
                            : isFirst
                            ? "border-r border-t border-[rgba(0,180,216,0.28)]"
                            : isLast
                            ? "border-l border-t border-[rgba(0,180,216,0.28)]"
                            : "border-t border-[rgba(0,180,216,0.28)]"
                        }`}
                      />

                      {/* SM card */}
                      <div className="w-full px-3">
                        <SmCard name={sm.name} role={sm.role} image={sm.image} delay={0.26 + i * 0.08} />
                      </div>

                      {/* Drop to manager row */}
                      <div className="mt-0 flex flex-col items-center">
                        <DropLine delay={0.4 + i * 0.08} height="h-8" />
                      </div>

                      {/* ── Level 2: Managers ─────────────────────────── */}
                      <div className={`w-full px-2 grid gap-5 ${sm.managers.length > 3 ? "grid-cols-2" : "grid-cols-1"}`}>
                        {sm.managers.map((mgr, j) => (
                          <AnimIn
                            key={mgr.name}
                            from={{ opacity: 0, y: 12, scale: 0.95 }}
                            delay={0.5 + i * 0.08 + j * 0.06}
                            duration={0.34}
                            className="flex flex-col items-center gap-2.5 text-center"
                          >
                            <EngAvatar
                              initials={mgr.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                              image={mgr.image}
                              size="lg"
                              accentColor="var(--blue-lt)"
                              ringColor="rgba(0,150,199,0.35)"
                            />
                            <div className="w-full px-1">
                              <div className="text-sm font-semibold leading-tight text-white">{mgr.name}</div>
                              {mgr.designation && (
                                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-(--c-primary)/80">{mgr.designation}</div>
                              )}
                              {mgr.role && (
                                <div className="mt-0.5 text-[11px] font-medium leading-snug text-(--dim)">{mgr.role}</div>
                              )}
                            </div>
                          </AnimIn>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </Reveal>

        {/* ── Layer 3: Engineering & Platforms subsection ───────────────── */}
        {engineeringSm && (
          <div id="section-engineering">
          <Reveal className="mt-10">
            <div className="rounded-4xl border border-(--border) bg-[rgba(11,29,46,0.76)] p-8 shadow-[0_24px_100px_rgba(1,17,27,0.55)] backdrop-blur-2xl">
              <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-(--c-primary)/80">
                Engineering &amp; Platforms
              </div>

              {/* ── Pillar header ─────────────────────────────────────────── */}
              <AnimIn
                from={{ opacity: 0 }}
                delay={0.2}
                duration={0.4}
                className="mb-8 mt-6 flex items-baseline gap-4 border-b border-[rgba(255,255,255,0.07)] pb-4"
              >
                <span className="tabular-nums text-sm font-medium uppercase tracking-[0.24em] text-(--dim)">
                  01
                </span>
                <span className="text-sm font-medium uppercase tracking-[0.24em] text-(--light)">
                  Engineering
                </span>
                <span className="ml-auto text-xs font-medium uppercase tracking-[0.18em] text-(--dim)">
                  {engineeringTeams.length} teams
                </span>
              </AnimIn>

              {/* ── Senior Manager card ───────────────────────────────────── */}
              <AnimIn
                from={{ opacity: 0, y: 14 }}
                delay={0.25}
                duration={0.5}
                className="mx-auto mb-4 flex w-full max-w-[420px] flex-col items-center rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[var(--navy)] px-10 py-8 text-center shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
              >
                <EngAvatar
                  initials={engineeringSm.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                  image={engineeringSm.image}
                  size="lg"
                  accentColor={ENG_TEAM_ACCENT[engineeringTeams[0]?.name]?.color ?? "var(--purp-lt)"}
                  ringColor={ENG_TEAM_ACCENT[engineeringTeams[0]?.name]?.ring ?? "rgba(167,139,250,0.4)"}
                />
                <div className="mt-5 text-2xl font-semibold text-white">{engineeringSm.name}</div>
                <div
                  className="mt-1 text-[11px] font-semibold uppercase tracking-[0.24em]"
                  style={{ color: ENG_TEAM_ACCENT[engineeringTeams[0]?.name]?.color ?? "var(--purp-lt)" }}
                >
                  Senior Manager, Group Engineering
                </div>
              </AnimIn>

              {/* Vertical connector SM → unit cards */}
              <div className="mb-6 flex justify-center">
                <DropLine delay={0.35} height="h-8" />
              </div>

              {/* ── Unit cards grid ────────────────────────────────────────── */}
              <div className="grid gap-5 md:grid-cols-3">
                {engineeringTeams.map((team, i) => {
                  const accent = ENG_TEAM_ACCENT[team.name] ?? { color: "var(--blue-lt)", ring: "rgba(0,180,230,0.4)" };
                  const lead = team.managers[0];
                  const leadInitials = lead ? lead.name.split(" ").map((p) => p[0]).join("").slice(0, 2) : "??";

                  return (
                    <AnimIn
                      key={team.name}
                      from={{ opacity: 0, y: 24 }}
                      delay={0.15 + i * 0.1}
                      duration={0.6}
                      className="group flex h-[460px] flex-col rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[var(--navy)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(255,255,255,0.18)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                    >
                      {/* Header row: accent bar + short name */}
                      <div className="mb-6 flex items-center justify-between">
                        <div
                          className="h-1 w-10 rounded-full"
                          style={{ background: accent.color }}
                        />
                        <span
                          className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                          style={{ color: accent.color }}
                        >
                          {team.initials}
                        </span>
                      </div>

                      {/* Unit name — fixed height so lead rows stay aligned across cards */}
                      <h3 className="mb-6 flex h-[56px] items-start text-lg font-semibold leading-snug text-white">
                        {team.name}
                      </h3>

                      {/* Lead row */}
                      {lead && (
                        <div className="mb-6 flex items-center gap-4">
                          <EngAvatar
                            initials={leadInitials}
                            image={lead.image}
                            size="md"
                            accentColor={accent.color}
                            ringColor={accent.ring}
                          />
                          <div className="min-w-0">
                            <div className="truncate text-base font-semibold text-white">{lead.name}</div>
                            <div className="text-sm text-(--muted)">{lead.role}, {lead.designation}</div>
                          </div>
                        </div>
                      )}

                      {/* Description */}
                      {team.message && (
                        <ScrollableDescription>
                          <p className="text-sm leading-7 text-(--light)">{team.message}</p>
                        </ScrollableDescription>
                      )}
                    </AnimIn>
                  );
                })}
              </div>
            </div>
          </Reveal>
          </div>
        )}

        {/* ── Layer 4: Digital Platforms subsection ────────────────────── */}
        {digitalPlatformsSm && digitalPlatformsTeam && (
          <div id="section-digital-platforms">
          <Reveal className="mt-10">
            <div className="rounded-4xl border border-(--border) bg-[rgba(11,29,46,0.76)] p-8 shadow-[0_24px_100px_rgba(1,17,27,0.55)] backdrop-blur-2xl">
              <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-(--c-primary)/80">
                Digital Platforms
              </div>

              {/* ── Pillar header ─────────────────────────────────────────── */}
              <AnimIn
                from={{ opacity: 0 }}
                delay={0.2}
                duration={0.4}
                className="mb-8 mt-6 flex items-baseline gap-4 border-b border-[rgba(255,255,255,0.07)] pb-4"
              >
                <span className="tabular-nums text-sm font-medium uppercase tracking-[0.24em] text-(--dim)">
                  02
                </span>
                <span className="text-sm font-medium uppercase tracking-[0.24em] text-(--light)">
                  Digital Platforms
                </span>
                <span className="ml-auto text-xs font-medium uppercase tracking-[0.18em] text-(--dim)">
                  {digitalPlatformsTeam.managers.length} platform owners
                </span>
              </AnimIn>

              {/* ── Senior Manager card ───────────────────────────────────── */}
              <AnimIn
                from={{ opacity: 0, y: 14 }}
                delay={0.25}
                duration={0.5}
                className="mx-auto mb-4 flex w-full max-w-[420px] flex-col items-center rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[var(--navy)] px-10 py-8 text-center shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
              >
                <EngAvatar
                  initials={digitalPlatformsSm.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                  image={digitalPlatformsSm.image}
                  size="lg"
                  accentColor="var(--green)"
                  ringColor="rgba(6,214,160,0.4)"
                />
                <div className="mt-5 text-2xl font-semibold text-white">{digitalPlatformsSm.name}</div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--green)]">
                  Senior Manager, Digital Platforms
                </div>
                {digitalPlatformsTeam.seniorManager.message && (
                  <p className="mt-5 text-sm leading-7 text-(--light)">
                    {digitalPlatformsTeam.seniorManager.message}
                  </p>
                )}
              </AnimIn>

              {/* Vertical connector SM → platform owner cards */}
              <div className="mb-6 flex justify-center">
                <DropLine delay={0.35} height="h-8" />
              </div>

              {/* ── Platform owner cards grid ─────────────────────────────── */}
              <div className="grid gap-5 md:grid-cols-3">
                {digitalPlatformsTeam.managers.map((mgr, i) => {
                  const initials = mgr.name.split(" ").map((p) => p[0]).join("").slice(0, 2);
                  return (
                    <AnimIn
                      key={mgr.name}
                      from={{ opacity: 0, y: 24 }}
                      delay={0.15 + i * 0.08}
                      duration={0.6}
                      className="group flex h-[560px] flex-col rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[var(--navy)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(255,255,255,0.18)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                    >
                      {/* Header row: accent bar + platform badge */}
                      <div className="mb-6 flex items-center justify-between">
                        <div className="h-1 w-10 rounded-full bg-[var(--green)]" />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--green)]">
                          DP
                        </span>
                      </div>

                      {/* Platform / role name — fixed height keeps owner rows aligned */}
                      <h3 className="mb-6 flex h-[56px] items-start text-lg font-semibold leading-snug text-white">
                        {mgr.role ?? "Platform Owner"}
                      </h3>

                      {/* Owner row */}
                      <div className="mb-6 flex items-center gap-4">
                        <EngAvatar
                          initials={initials}
                          image={mgr.image}
                          size="md"
                          accentColor="var(--green)"
                          ringColor="rgba(6,214,160,0.4)"
                        />
                        <div className="min-w-0">
                          <div className="truncate text-base font-semibold text-white">{mgr.name}</div>
                          <div className="text-sm text-(--muted)">{mgr.designation ?? "Platform Owner"}</div>
                        </div>
                      </div>

                      {/* Description */}
                      {mgr.message && (
                        <ScrollableDescription>
                          <p className="text-sm leading-7 text-(--light)">{mgr.message}</p>
                        </ScrollableDescription>
                      )}
                    </AnimIn>
                  );
                })}
              </div>
            </div>
          </Reveal>
          </div>
        )}

      </div>
    </section>
  );
}
