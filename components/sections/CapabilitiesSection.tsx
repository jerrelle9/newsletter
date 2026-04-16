
import { useRef } from "react";
import { gsap, Flip, ScrollTrigger, useGSAP } from "@/src/gsap-init";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { GalaxyBackground } from "@/components/layout/GalaxyBackground";
import { Reveal } from "@/components/layout/Reveal";
import { SplitHeading } from "@/components/layout/SplitHeading";
import { SectionNumber } from "@/components/layout/SectionNumber";
import { Card, CardContent } from "@/components/ui/Card";
import { products } from "@/data/products";
import { keyUpdates } from "@/data/key-tech-updates";

export function CapabilitiesSection() {
  const technologyUpdatesUrl =
    "https://rfhl.atlassian.net/wiki/spaces/Engineering/pages/179732490/Digital+Platforms+Services+Technologies+Updates";

  const outcomes = [
    "High-trust transaction experiences",
    "Low-friction onboarding journeys",
    "Connected systems at enterprise scale",
    "Shared foundations for smoother support",
    "Channel experiences customers feel immediately",
    "Execution visibility across the portfolio",
  ];

  const stackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!stackRef.current || !sectionRef.current) return;
    const cards = gsap.utils.toArray<HTMLElement>(".flip-card", stackRef.current);
    if (cards.length < 2) return;

    // Apply fanned stack positions
    function applyStack(list: HTMLElement[]) {
      list.forEach((card, i) => {
        gsap.set(card, {
          zIndex: list.length - i,
          x: i * 30,
          y: i * 6,
          rotation: i * 3,
          scale: 1,
          opacity: 1,
        });
      });
    }
    applyStack(cards);

    let currentIndex = 0;

    // Pin the entire section while cycling through cards.
    // pinType: "transform" is required inside ScrollSmoother.
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top -5%",
      end: () => `+=${cards.length * window.innerHeight * 0.5}`,
      pin: true,
      pinType: "transform",
      pinSpacing: true,
      scrub: 0.5,
      onUpdate: (self) => {
        // Map progress so every card gets a turn as front
        const targetIndex = Math.min(
          Math.floor(self.progress * cards.length),
          cards.length - 1,
        );

        // Cycle forward
        while (currentIndex < targetIndex) {
          const state = Flip.getState(cards);
          stackRef.current!.appendChild(cards[currentIndex]);
          const reordered = gsap.utils.toArray<HTMLElement>(".flip-card", stackRef.current!);
          applyStack(reordered);
          Flip.from(state, {
            duration: 0.4,
            ease: "power2.inOut",
            absolute: true,
          });
          currentIndex++;
        }

        // Cycle backward
        while (currentIndex > targetIndex) {
          currentIndex--;
          const state = Flip.getState(cards);
          stackRef.current!.prepend(cards[currentIndex]);
          const reordered = gsap.utils.toArray<HTMLElement>(".flip-card", stackRef.current!);
          applyStack(reordered);
          Flip.from(state, {
            duration: 0.4,
            ease: "power2.inOut",
            absolute: true,
          });
        }
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="section-5"
      className="relative min-h-screen border-b border-(--border) bg-[radial-gradient(circle_at_16%_18%,rgba(0,180,216,0.1),transparent_18%),linear-gradient(180deg,var(--surface)_0%,var(--surface2)_100%)]"
    >
      <GalaxyBackground />
      <SectionNumber number="05" />

      <div className="ml-[8vw] grid min-h-screen max-w-[66vw] px-6 py-24 md:px-10 lg:px-16">
        <div className="text-xs font-medium uppercase tracking-[0.3em] text-(--c-primary)/70">
          What we own
        </div>
        <div className="grid max-w-[66vw] gap-8">
          <Reveal className="mt-4 ">
            <SplitHeading
              as="h2"
              className="mt-4 max-w-5xl text-4xl font-black leading-[0.9] tracking-[-0.04em] md:text-5xl"
              splitType="words"
              stagger={0.04}
            >
              The capability areas that show how the Group Digital Technology Division supports the bank.
            </SplitHeading>
            <p className="mt-5 text-base leading-8 text-(--light)">
              These are the main areas where the Division supports customer experience,
              reliable services, connected systems, governance, and change across the bank.
              GDTD is managing numerous projects, with GDO, SINC, CIF, and others already
              moved into production, and more releases still on the way.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {["Payments", "Channels", "Architecture", "Platforms", "Support"].map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-(--border) bg-[rgba(255,255,255,0.03)] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.26em] text-(--light)"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-4 rounded-4xl border border-(--c-primary)/18 bg-(--c-primary)/8 p-5 md:flex-row md:items-center md:justify-between md:p-6">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-(--c-primary)/80">
                  Technology updates
                </div>
                <p className="mt-2 text-sm leading-7 text-(--light)">
                  For the broader stream of delivery and platform movement across the Division,
                  view the running technology updates page.
                </p>
              </div>

              <a
                href={technologyUpdatesUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-[rgba(11,29,46,0.56)] px-5 py-3 text-sm font-medium text-(--c-primary) transition hover:border-(--c-primary)/30 hover:text-white"
              >
                Open technology updates
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          {/* ── Flip card stack — pinned while cards cycle ─── */}
          <div className="flex min-h-[50vh] items-start justify-center">
            <div ref={stackRef} className="relative mx-auto h-[400px] max-w-lg w-full">
              {products.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flip-card absolute inset-0"
                      data-flip-id={`card-${index}`}
                    >
                      <Card className="h-full overflow-hidden rounded-4xl border border-white/[0.08] bg-grey/[0.04] shadow-[0_18px_60px_rgba(1,17,27,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl">
                        <CardContent className="relative flex h-full flex-col p-7">
                          <div className="absolute inset-x-7 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(91, 189, 255, 0.9),transparent)]" />

                          <div className="mb-6 flex items-center justify-between">
                            <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-(--dim)">
                              0{index + 1}
                            </div>
                            <div className="rounded-2xl border border-(--c-primary)/20 bg-(--c-primary)/10 p-3 text-(--c-primary)">
                              <Icon className="h-5 w-5" />
                            </div>
                          </div>

                          <h3 className="text-xl font-bold text-white">{item.title}</h3>
                          <p className="mt-3 flex-1 text-sm leading-7 text-(--light)">
                            {item.body}
                          </p>

                          <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.26em] text-(--c-primary)/80">
                            <ShieldCheck className="h-4 w-4" />
                            {outcomes[index]}
                          </div>

                          <div className="mt-6 inline-flex items-center text-sm font-medium text-(--c-primary)">
                            View details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
            </div>
          </div>

          <Reveal>
            <div className="rounded-4xl border border-(--c-secondary)/18 bg-(--c-secondary)/10 p-6 md:p-8">
              <div className="text-[12px] font-bold uppercase tracking-[0.26em] text-(--c-secondary)">
                Key updates from 03 Apr 2026
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {keyUpdates.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-white/10 bg-[rgba(11,29,46,0.34)] p-5"
                  >
                    <div className="text-sm font-semibold text-white">
                      {item.title}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-(--light)">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
