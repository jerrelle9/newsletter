import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/src/gsap-init";
import { Reveal } from "@/components/layout/Reveal";
import { SplitHeading } from "@/components/layout/SplitHeading";
import { SectionNumber } from "@/components/layout/SectionNumber";
import { GalaxyBackground } from "@/components/layout/GalaxyBackground";
import { Card, CardContent } from "@/components/ui/Card";
import { stats } from "@/data/stats";

const pillars = [
  {
    index: "01",
    label: "Design, Engineer & Deliver",
    body: "Responsible for the design, engineering, and delivery of innovative digital solutions that modernise the Group's operations, enhance customer experiences, and enable scalable growth.",
    accent: "var(--teal)",
    barClass: "from-[var(--teal)] to-[var(--blue)]",
    textClass: "text-[var(--teal)]",
    borderClass: "border-[var(--teal)]/18",
  },
  {
    index: "02",
    label: "Robust Technology Foundations",
    body: "A full engineering capability alongside a dedicated platform team ensures that all innovation initiatives are built on robust, secure, and reusable technology foundations.",
    accent: "var(--blue)",
    barClass: "from-[var(--blue)] to-[var(--purple)]",
    textClass: "text-[var(--blue-lt)]",
    borderClass: "border-[var(--blue)]/18",
  },
  {
    index: "03",
    label: "Partner, Execute & Scale",
    body: "Deep technical expertise combined with a strong execution mindset. GDTD partners closely with business units to deliver enterprise-grade platforms, digital products, and automation that drive long-term value.",
    accent: "var(--green)",
    barClass: "from-[var(--green)] to-[var(--teal)]",
    textClass: "text-[var(--green)]",
    borderClass: "border-[var(--green)]/18",
  },
];

const statNotes = [
  "Skilled staff supporting the bank's digital and technology agenda.",
  "Platforms and channels operated with reliability, speed, and visible ownership.",
  "Regional operating breadth that demands strong architecture and disciplined execution.",
  "Core capability pillars aligning engineering, architecture, service support, and change.",
];

export function WhoWeAreSection() {
  const statsRef = useRef<HTMLDivElement>(null);

  /* ── Stat counter animation ───────────────────────────────────── */
  useGSAP(() => {
    if (!statsRef.current) return;
    const counters = statsRef.current.querySelectorAll<HTMLElement>(".stat-value");
    counters.forEach((el) => {
      const raw = el.dataset.value ?? "0";
      const num = parseInt(raw, 10);
      const suffix = raw.replace(/[0-9]/g, "");
      const obj = { val: 0 };
      gsap.to(obj, {
        val: num,
        duration: 1.8,
        ease: "power2.out",
        snap: { val: 1 },
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          toggleActions: "play none restart none",
        },
        onUpdate() {
          el.textContent = `${obj.val}${suffix}`;
        },
      });
    });
  }, { scope: statsRef });

  return (
    <section
      id="section-2"
      className="relative border-b border-(--border) bg-[radial-gradient(circle_at_80%_14%,rgba(0,150,199,0.14),transparent_22%),linear-gradient(180deg,var(--navy2)_0%,var(--surface)_100%)]"
    >
      <GalaxyBackground />
      <SectionNumber number="02" />

      <div className="ml-[8vw] max-w-[66vw] px-6 py-24 md:px-10 lg:px-16">

        <div className="text-xs font-medium uppercase tracking-[0.3em] text-(--c-primary)/70">
          Who we are
        </div>
        {/* ── Section header ─────────────────────────────────────────────── */}
        <Reveal className="mt-8 max-w-3xl">
          <SplitHeading
            as="h2"
            className="mt-4 text-4xl font-black leading-[0.9] tracking-[-0.04em] md:text-5xl"
            splitType="words"
            stagger={0.04}
            duration={0.7}
          >
            The central execution arm for digital innovation across the Group.
          </SplitHeading>
          <p className="mt-6 text-base leading-8 text-(--light)">
            The Group Digital Technology Division was established as one of the pillars of the
            RFHL Group&apos;s Digital Transformation journey, formed to translate strategic ambition
            into tangible, technology-enabled outcomes.
          </p>
        </Reveal>

        {/* ── Three pillars ──────────────────────────────────────────────── */}
        <Reveal className="mt-14 grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.index}
              className={`relative overflow-hidden rounded-4xl border ${pillar.borderClass} bg-[rgba(11,29,46,0.62)] p-6 backdrop-blur-xl`}
            >
              {/* Top gradient bar */}
              <div className={`absolute inset-x-0 top-0 h-[2px] bg-linear-to-r ${pillar.barClass}`} />

              <div className={`text-[10px] font-semibold uppercase tracking-[0.3em] ${pillar.textClass}`}>
                {pillar.index}
              </div>
              <div className="mt-3 text-base font-bold leading-snug tracking-[-0.01em] text-white">
                {pillar.label}
              </div>
              <p className="mt-3 text-sm leading-7 text-(--light)">
                {pillar.body}
              </p>
            </div>
          ))}
        </Reveal>

        {/* ── Two-column lower block ─────────────────────────────────────── */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">

          {/* Left — mandate statement */}
          <Reveal className="flex flex-col gap-6">
            <div className="rounded-4xl border border-(--border) bg-[rgba(11,29,46,0.72)] p-8 backdrop-blur-xl">
              <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-(--c-primary)/70">
                Our mandate
              </div>
              <blockquote className="mt-4 border-l-2 border-(--c-primary)/30 pl-5 text-base leading-8 text-(--light)">
                By combining deep technical expertise with a strong execution mindset, GDTD
                partners closely with business units to deliver enterprise-grade platforms, digital
                products, and automation initiatives that drive efficiency, agility, and long-term
                value for the RFHL Group.
              </blockquote>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {["Platform engineering", "Digital channels", "Enterprise architecture", "Change support", "Automation"].map((tag) => (
                <div
                  key={tag}
                  className="rounded-full border border-(--border) bg-[rgba(255,255,255,0.03)] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.26em] text-(--light)"
                >
                  {tag}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right — stats */}
          <Reveal>
            <div ref={statsRef} className="grid gap-4 sm:grid-cols-2">
              {stats.map((item, index) => (
                <Card
                  key={item.label}
                  className="rounded-4xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-[0_18px_60px_rgba(1,10,24,0.35)] backdrop-blur-xl"
                >
                  <CardContent className="p-8">
                    <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-(--dim)">
                      Signal 0{index + 1}
                    </div>
                    <div className={`stat-value text-5xl font-black ${item.color}`} data-value={item.value}>
                      0
                    </div>
                    <div className="mt-3 text-[11px] font-medium uppercase tracking-[0.26em] text-(--muted)">
                      {item.label}
                    </div>
                    <div className="mt-4 text-sm leading-7 text-(--light)">
                      {statNotes[index]}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
