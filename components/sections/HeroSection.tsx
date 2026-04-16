
import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Reveal } from "@/components/layout/Reveal";
import { SectionNumber } from "@/components/layout/SectionNumber";
import { stats } from "@/data/stats";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.15]);

  const floating = useMemo(
    () => [
      "top-20 left-[12%]",
      "top-40 right-[16%]",
      "bottom-24 left-[18%]",
      "bottom-20 right-[10%]",
      "top-1/2 left-[8%]",
      "top-[58%] right-[22%]",
    ],
    []
  );

  const commandSignals = [
    {
      icon: Workflow,
      label: "Technology leadership",
      value: "Clear direction",
    },
    {
      icon: ShieldCheck,
      label: "Trusted services",
      value: "Safe and reliable",
    },
    {
      icon: Sparkles,
      label: "Customer focus",
      value: "Better everyday experiences",
    },
  ];

  const handleJump = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="section-1"
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden border-b border-(--border) bg-[radial-gradient(circle_at_14%_12%,rgba(0,180,216,0.16),transparent_20%),radial-gradient(circle_at_88%_22%,rgba(139,92,246,0.14),transparent_24%),linear-gradient(180deg,var(--navy)_0%,var(--navy2)_52%,#00111b_100%)] pt-16"
    >
      <SectionNumber number="01" />

      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[64px_64px] opacity-25" />
        <div className="absolute left-[12%] top-[22%] h-56 w-56 rounded-full border border-[rgba(0,180,216,0.14)]" />
        <div className="absolute right-[18%] top-[18%] h-72 w-72 rounded-full border border-(--border)" />
        {floating.map((pos, i) => (
          <motion.div
            key={pos}
            className={`absolute ${pos}`}
            animate={{ y: [0, -12, 0], opacity: [0.45, 0.8, 0.45] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="h-3 w-3 rounded-full bg-(--teal) shadow-[0_0_32px_rgba(0,180,216,0.7)]" />
          </motion.div>
        ))}
      </motion.div>

      <div className="relative ml-[8vw] grid w-full max-w-[66vw] gap-12 px-6 py-24 md:px-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:px-16">
        <Reveal className="max-w-3xl">
          {/* <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[rgba(0,180,216,0.16)] bg-[rgba(0,180,216,0.1)] px-4 py-2 text-[11px] uppercase tracking-[0.34em] text-(--blue-lt) backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-(--teal) shadow-[0_0_18px_rgba(0,180,216,0.85)]" />
            Issue 01 / GTD / Republic Bank
          </div> */}
          <h1 className="max-w-2xl text-3xl font-black leading-[0.88] tracking-[-0.04em] md:text-5xl xl:text-[3.6rem]">
            <span className="block text-(--light)">MEET</span>
            <span className="block mt-4 mb-4 text-center xl:text-[8.6rem] text-transparent [-webkit-text-stroke:1px_rgba(0,180,230,0.9)]">
              GDTD
            </span>
            RBL&apos;s
            <span className="block text-(--blue-lt)">technology engine.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-10 text-(--light) md:text-lg">
            {[
              { letter: "G", rest: "roup" },
              { letter: "D", rest: "igital" },
              { letter: "T", rest: "echnology" },
              { letter: "D", rest: "ivision" },
            ].map(({ letter, rest }) => (
              <span key={letter + rest} className="mr-2 inline-block whitespace-nowrap border-b border-[rgba(0,180,216,0.3)]">
                <span className="text-[1.5em] font-black leading-none text-(--c-primary)">{letter}</span>
                <span>{rest}</span>
              </span>
            ))}
            {" "}is Republic Bank&apos;s technology-focused division, helping shape the
            systems, services, and digital experiences that support customers and teams
            across the region.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button className="px-6 py-3" onClick={() => handleJump("#section-5")}>
              Explore GDTD
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="px-6 py-3"
              onClick={() => handleJump("#section-4")}
            >
              View structure
            </Button>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {commandSignals.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-3xl border border-(--border) bg-[rgba(255,255,255,0.03)] p-4 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3 text-(--c-primary)">
                    <div className="shrink-0 rounded-2xl border border-(--c-primary)/18 bg-(--c-primary)/10 p-2.5">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 text-[11px] font-medium uppercase tracking-[0.26em] text-(--dim)">
                      {item.label}
                    </div>
                  </div>
                  <div className="mt-4 text-base font-semibold text-white">
                    {item.value}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-(--c-primary)/70">
            <ChevronDown className="h-4 w-4" />
            Scroll to enter the command layer
          </div>
        </Reveal>

        <Reveal className="relative lg:justify-self-end">
          <motion.div
            className="absolute -right-10 top-10 h-48 w-48 rounded-full bg-[rgba(139,92,246,0.14)] blur-3xl"
            animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <Card className="relative overflow-hidden rounded-4xl border border-(--border) bg-[rgba(11,29,46,0.78)] shadow-[0_35px_140px_rgba(1,17,27,0.78)] backdrop-blur-2xl">
            <CardContent className="relative p-6 md:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,209,255,0.18),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))]" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-(--c-primary)/80">
                      Command center snapshot
                    </div>
                    <h2 className="mt-3 text-2xl font-bold tracking-[-0.02em] text-white">
                      Technology leadership across the Division.
                    </h2>
                  </div>
                  <div className="rounded-full border border-(--c-accent)/18 bg-(--c-accent)/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.26em] text-(--c-accent)">
                    live posture
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {stats.map((item, index) => (
                    <div
                      key={item.label}
                      className="rounded-3xl border border-(--border) bg-[rgba(15,36,56,0.72)] p-5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className={`text-3xl font-black ${item.color}`}>
                          {item.value}
                        </div>
                        <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-(--dim)">
                          0{index + 1}
                        </div>
                      </div>
                      <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.26em] text-(--muted)">
                        {item.label}
                      </div>
                      <div className="mt-4 h-1.5 rounded-full bg-white/6">
                        <div
                          className="h-full rounded-full bg-[linear-gradient(90deg,rgba(91,221,255,0.95),rgba(24,152,255,0.95))]"
                          style={{ width: `${68 + index * 7}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
                  <div className="rounded-3xl border border-(--border) bg-[rgba(255,255,255,0.03)] p-5">
                    <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-(--dim)">
                      Why it matters
                    </div>
                    <p className="mt-3 text-sm leading-7 text-(--light)">
                      The Group Digital Technology Division helps connect business goals,
                      customer needs, and trusted technology services so the bank can move
                      forward with confidence.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-(--c-secondary)/18 bg-(--c-secondary)/10 p-5">
                    <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-(--c-secondary)/90">
                      Operating signal
                    </div>
                    <div className="mt-3 text-2xl font-bold tracking-[-0.02em] text-white">
                      Always-ready,
                      <span className="block text-(--c-secondary)">future-focused support.</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}