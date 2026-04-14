import { Reveal } from "@/components/layout/Reveal";
import { SectionNumber } from "@/components/layout/SectionNumber";
import { Card, CardContent } from "@/components/ui/Card";
import { stats } from "@/data/stats";

export function WhoWeAreSection() {
  const statNotes = [
    "Skilled staff supporting the bank's digital and technology agenda.",
    "Platforms and channels operated with reliability, speed, and visible ownership.",
    "Regional operating breadth that demands strong architecture and disciplined execution.",
    "Core capability pillars aligning engineering, architecture, service support, and change.",
  ];

  const operatingModes = [
    "Platform engineering",
    "Digital channels",
    "Enterprise architecture",
    "Change support",
  ];

  return (
    <section
      id="section-2"
      className="relative min-h-screen border-b border-(--border) bg-[radial-gradient(circle_at_80%_14%,rgba(0,150,199,0.14),transparent_22%),linear-gradient(180deg,var(--navy2)_0%,var(--surface)_100%)]"
    >
      <SectionNumber number="02" />

      <div className="ml-[8vw] grid min-h-screen max-w-[66vw] gap-16 px-6 py-24 md:px-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-16">
        <Reveal className="max-w-2xl">
          <div className="text-xs font-medium uppercase tracking-[0.3em] text-(--c-primary)/70">
            Who we are
          </div>
          <h2 className="mt-4 text-4xl font-black leading-[0.9] tracking-[-0.04em] md:text-5xl">
            The technology group that turns banking ambition into operating capability.
          </h2>

          <div className="mt-6 space-y-5 leading-8 text-(--light)">
            <p className="text-base leading-8">
              From payments and onboarding to architecture, platforms, and service
              oversight, the Group Digital Technology Division helps turn strategy into
              dependable services and better customer experiences.
            </p>
            <p className="text-base leading-8">
              It is not just a support function. It is the department that sets the
              pace for how modern Republic Bank can design, build, launch, and scale.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {operatingModes.map((mode) => (
              <div
                key={mode}
                className="rounded-full border border-(--border) bg-[rgba(255,255,255,0.03)] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.26em] text-(--light)"
              >
                {mode}
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-4xl border border-(--border) bg-[rgba(11,29,46,0.72)] p-6 backdrop-blur-xl">
            <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-(--dim)">
              Strategic role
            </div>
            <p className="mt-3 text-base leading-8 text-(--light)">
              Group Digital Technology Division gives the bank a coordinated way to
              support digital growth through shared platforms, technology leadership,
              clear governance, and practical support for change.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {stats.map((item, index) => (
              <Card
                key={item.label}
                className="rounded-4xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-[0_18px_60px_rgba(1,10,24,0.35)] backdrop-blur-xl"
              >
                <CardContent className="p-8">
                  <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-(--dim)">
                    Signal 0{index + 1}
                  </div>
                  <div className={`text-5xl font-black ${item.color}`}>
                    {item.value}
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
    </section>
  );
}
