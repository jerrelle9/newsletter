import { useRef } from "react";
import { gsap, useGSAP } from "@/src/gsap-init";
import {
  Brain,
  Globe,
  BarChart3,
  RefreshCw,
  Store,
  Rocket,
  CreditCard,
  Landmark,
  Plug,
  GitMerge,
  Zap,
  TrendingDown,
  Star,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import { GalaxyBackground } from "@/components/layout/GalaxyBackground";
import { Reveal } from "@/components/layout/Reveal";
import { SplitHeading } from "@/components/layout/SplitHeading";
import { SectionNumber } from "@/components/layout/SectionNumber";

/* ─── Data ─────────────────────────────────────────────────────────────────── */
const mvpFeatures = [
  "Core origination workflow with configurable application forms",
  "KYC / AML & open-banking checks",
  "Custom scorecards + GiniMachine AI decisioning",
  "E-signature, disbursements & repayments automation",
  "Borrower portal & basic back-office operations",
  "Phoenix CBS integration for GL & core banking",
];

const pilotMarkets = ["Guyana", "Trinidad", "BVI"];

const nearFuture = [
  {
    icon: RefreshCw,
    title: "Collections & Recovery",
    body: "Full automation of delinquency management, configurable collection strategies, performance dashboards, and audit-ready correspondence.",
    color: "var(--teal)",
    border: "rgba(0,180,216,0.16)",
    glow: "rgba(0,180,216,0.08)",
  },
  {
    icon: Brain,
    title: "GiniMachine AI Scoring",
    body: "Full integration for application scoring, internal risk scoring, collections scoring, and predictive analytics via no-code, reusable models.",
    color: "var(--purple)",
    border: "rgba(139,92,246,0.16)",
    glow: "rgba(139,92,246,0.08)",
  },
  {
    icon: Store,
    title: "Agent Portal",
    body: "White-label partner and merchant portal for lead creation, pre-offers, and commission tracking.",
    color: "var(--green)",
    border: "rgba(6,214,160,0.16)",
    glow: "rgba(6,214,160,0.08)",
  },
  {
    icon: BarChart3,
    title: "Advanced Reporting",
    body: "Full management dashboards, automated reports, and real-time online analytics across the lending portfolio.",
    color: "var(--gold)",
    border: "rgba(245,166,35,0.16)",
    glow: "rgba(245,166,35,0.08)",
  },
  {
    icon: Globe,
    title: "Multi-Country Rollout",
    body: "Group-wide expansion leveraging the single global instance architecture across all Republic jurisdictions.",
    color: "var(--blue-lt)",
    border: "rgba(0,180,230,0.16)",
    glow: "rgba(0,180,230,0.08)",
  },
];

const strategic = [
  { icon: Landmark, text: "Embedded finance, FinTech and merchant partnerships" },
  { icon: Plug, text: "Additional third-party integrations — payments, credit bureaus, open-banking providers" },
  { icon: GitMerge, text: "Full customisation of decisioning workflows, calculation rules, and collection processes" },
  { icon: Brain, text: "Enterprise-level risk scoring powered by GiniMachine" },
  { icon: CreditCard, text: "Scalable support for new loan products across all Republic jurisdictions" },
];

const outcomes = [
  { icon: TrendingDown, label: "Reduced operational costs & manual effort", color: "var(--green)" },
  { icon: Zap, label: "Faster time-to-market for new lending products", color: "var(--gold)" },
  { icon: Star, label: "Improved customer experience via digital self-service", color: "var(--blue-lt)" },
  { icon: ShieldCheck, label: "Stronger risk management & data-driven decisions", color: "var(--purple)" },
  { icon: Globe, label: "Alignment with RFHL digital transformation & CoE vision", color: "var(--teal)" },
];

/* ─── Component ─────────────────────────────────────────────────────────────── */
export function FutureFeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tween = (selector: string, from: gsap.TweenVars, trigger: string) =>
      gsap.fromTo(
        gsap.utils.toArray(selector),
        { opacity: 0, ...from },
        {
          opacity: 1,
          ...Object.fromEntries(Object.keys(from).map((k) => [k, k === "x" || k === "y" ? 0 : from[k]])),
          duration: 0.45,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger,
            start: "top 86%",
            toggleActions: "play none none none",
          },
        },
      );

    tween("[data-ff='mvp-feat']",   { x: 14 }, "[data-ff-group='mvp']");
    tween("[data-ff='near-card']",  { y: 22 }, "[data-ff-group='near']");
    tween("[data-ff='strategic']",  { x: 16 }, "[data-ff-group='strategic']");
    tween("[data-ff='outcome']",    { y: 14 }, "[data-ff-group='outcomes']");
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="section-6"
      className="relative border-b border-(--border) bg-[radial-gradient(circle_at_15%_20%,rgba(139,92,246,0.12),transparent_28%),radial-gradient(circle_at_85%_75%,rgba(6,214,160,0.08),transparent_24%),linear-gradient(180deg,var(--navy)_0%,var(--surface)_50%,var(--navy)_100%)]"
    >
      <GalaxyBackground />
      <SectionNumber number="06" />

      <div className="ml-[8vw] max-w-[66vw] xl:max-w-[60vw] 2xl:max-w-[66vw] px-6 py-24 md:px-10 lg:px-16 xl:px-10 2xl:px-16">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <Reveal className="max-w-3xl">
          <div className="text-xs font-medium uppercase tracking-[0.3em] text-(--c-secondary)/70">
            LMS Roadmap
          </div>
          <SplitHeading
            as="h2"
            className="mt-4 text-4xl font-black leading-[0.9] tracking-[-0.04em] md:text-5xl"
            splitType="words"
            stagger={0.04}
          >
            What the Loan Management Platform is building next.
          </SplitHeading>
          <p className="mt-6 text-base leading-8 text-(--light)">
            From MVP launch through to enterprise-scale expansion — the features, integrations,
            and capabilities lined up to transform lending across the Group.
          </p>
        </Reveal>

        {/* ── Phase 1 MVP ─────────────────────────────────────────────────── */}
        <Reveal className="mt-16">
          <div
            data-ff-group="mvp"
            className="relative overflow-hidden rounded-4xl border border-[rgba(139,92,246,0.2)] bg-[rgba(11,29,46,0.8)] p-8 shadow-[0_32px_100px_rgba(139,92,246,0.12)] backdrop-blur-2xl md:p-10"
          >
            <div className="absolute inset-x-0 top-0 h-[2px] bg-linear-to-r from-[var(--purple)] via-[var(--blue-lt)] to-[var(--teal)]" />
            <div className="pointer-events-none absolute -right-24 -top-24 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.1),transparent_70%)]" />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-start">
              {/* Left */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(139,92,246,0.3)] bg-[rgba(139,92,246,0.1)] px-3 py-1">
                  <Rocket className="h-3 w-3 text-[var(--purp-lt)]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--purp-lt)]">
                    Phase 1
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-black leading-tight tracking-[-0.02em] text-white">
                  Consumer Lending MVP
                </h3>
                <p className="mt-3 text-sm leading-7 text-(--light)">
                  The foundation of a fully digital lending platform — deployed first, then scaled.
                </p>

                <div className="mt-6">
                  <div className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.28em] text-(--dim)">
                    Pilot markets
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pilotMarkets.map((m) => (
                      <div
                        key={m}
                        className="flex items-center gap-1.5 rounded-full border border-[rgba(0,180,216,0.2)] bg-[rgba(0,180,216,0.08)] px-3 py-1.5"
                      >
                        <MapPin className="h-2.5 w-2.5 text-[var(--teal)]" />
                        <span className="text-[11px] font-medium text-(--light)">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — feature list */}
              <div className="grid gap-3 sm:grid-cols-2">
                {mvpFeatures.map((feat) => (
                  <div
                    key={feat}
                    data-ff="mvp-feat"
                    className="flex items-start gap-3 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-3.5"
                  >
                    <div className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--purple)]" />
                    <span className="text-[13px] leading-6 text-(--light)">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Near-Future Enhancements ─────────────────────────────────────── */}
        <Reveal className="mt-12">
          <div className="mb-5 flex items-center gap-4">
            <div className="text-[11px] font-medium uppercase tracking-[0.28em] text-(--dim)">
              Near-future enhancements
            </div>
            <div className="h-px flex-1 bg-[rgba(255,255,255,0.06)]" />
          </div>
          <div data-ff-group="near" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {nearFuture.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  data-ff="near-card"
                  className="group relative flex flex-col overflow-hidden rounded-3xl border p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
                  style={{
                    borderColor: item.border,
                    background: `radial-gradient(circle at 80% 10%, ${item.glow}, transparent 60%), rgba(11,29,46,0.7)`,
                  }}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-[2px]"
                    style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
                  />
                  <div
                    className="mb-4 inline-flex w-fit rounded-xl border p-2.5"
                    style={{ borderColor: item.border, color: item.color, background: item.glow }}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="mb-2 text-sm font-bold leading-snug text-white">{item.title}</div>
                  <p className="text-[12px] leading-[1.7] text-(--light)">{item.body}</p>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* ── Longer-Term Strategic ────────────────────────────────────────── */}
        <Reveal className="mt-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div className="text-center">
              <div className="mb-2 text-[10px] font-medium uppercase tracking-[0.28em] text-(--dim)">
                Strategic horizon
              </div>
              <h3 className="text-xl font-black leading-tight tracking-[-0.02em] text-white">
                Longer-term capabilities
              </h3>
              <p className="mt-3 text-sm leading-7 text-(--light)">
                The platform is architected for scale from day one - these enhancements extend its
                reach to new markets, products, and partner ecosystems.
              </p>
            </div>

            <div data-ff-group="strategic" className="flex flex-col gap-2.5">
              {strategic.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.text}
                    data-ff="strategic"
                    className="flex items-center gap-3.5 rounded-2xl border border-(--border) bg-[rgba(255,255,255,0.02)] px-4 py-3"
                  >
                    <div className="rounded-lg border border-(--border) bg-[rgba(255,255,255,0.04)] p-2 text-(--dim)">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-[13px] leading-6 text-(--light)">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* ── Business Value Outcomes ──────────────────────────────────────── */}
        <Reveal className="mt-12">
          <div className="relative overflow-hidden rounded-4xl border border-(--border) bg-[rgba(11,29,46,0.6)] p-7 backdrop-blur-xl">
            <div className="absolute inset-x-0 top-0 h-[1px] bg-linear-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />
            <div className="mb-5 text-[10px] font-medium uppercase tracking-[0.3em] text-(--dim)">
              Expected business value
            </div>
            <div data-ff-group="outcomes" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {outcomes.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    data-ff="outcome"
                    className="flex flex-col gap-2.5"
                  >
                    <div
                      className="inline-flex w-fit rounded-xl border p-2"
                      style={{
                        borderColor: `color-mix(in srgb, ${item.color} 25%, transparent)`,
                        background: `color-mix(in srgb, ${item.color} 10%, transparent)`,
                        color: item.color,
                      }}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-[12px] leading-[1.7] text-(--light)">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
