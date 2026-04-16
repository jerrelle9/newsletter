import { Reveal } from "@/components/layout/Reveal";
import { SectionNumber } from "@/components/layout/SectionNumber";
import { GalaxyBackground } from "@/components/layout/GalaxyBackground";
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

export function WhoWeAreSection() {
  return (
    <section
      id="section-2"
      className="relative border-b border-(--border) bg-[radial-gradient(circle_at_80%_14%,rgba(0,150,199,0.14),transparent_22%),linear-gradient(180deg,var(--navy2)_0%,var(--surface)_100%)]"
    >
      <GalaxyBackground />
      <SectionNumber number="02" />

      <div className="ml-[8vw] max-w-[66vw] xl:max-w-[60vw] 2xl:max-w-[66vw] px-6 py-24 md:px-10 lg:px-16 xl:px-10 2xl:px-16">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <Reveal className="max-w-3xl">
          <div className="text-xs font-medium uppercase tracking-[0.3em] text-(--c-primary)/70">
            Who we are
          </div>
          <h2 className="mt-4 text-4xl font-black leading-[0.9] tracking-[-0.04em] md:text-5xl">
            The central execution arm for digital innovation across the Group.
          </h2>
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

        {/* ── Mandate block ─────────────────────────────────────────────── */}
        <Reveal className="mt-10 flex flex-col gap-6 max-w-2xl">
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
      </div>
    </section>
  );
}
