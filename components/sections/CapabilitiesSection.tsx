"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/layout/Reveal";
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

  return (
    <section
      id="section-5"
      className="relative min-h-screen border-b border-(--border) bg-[radial-gradient(circle_at_16%_18%,rgba(0,180,216,0.1),transparent_18%),linear-gradient(180deg,var(--surface)_0%,var(--surface2)_100%)]"
    >
      <SectionNumber number="05" />

      <div className="ml-[8vw] grid min-h-screen max-w-[66vw] gap-12 px-6 py-24 md:px-10 lg:px-16">
        <Reveal>
          <div className="text-xs font-medium uppercase tracking-[0.3em] text-(--c-primary)/70">
            What we own
          </div>
          <h2 className="mt-4 max-w-5xl text-4xl font-black leading-[0.9] tracking-[-0.04em] md:text-5xl">
            The capability areas that show how the Group Digital Technology Division supports the bank.
          </h2>
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

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal key={item.title} className="h-full">
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  <Card className="h-full overflow-hidden rounded-4xl border border-(--border) bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] shadow-[0_18px_60px_rgba(1,17,27,0.3)] transition-colors hover:border-(--c-primary)/30 hover:bg-(--surface2)">
                    <CardContent className="relative flex h-full flex-col p-7">
                      <div className="absolute inset-x-7 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(91,221,255,0.9),transparent)]" />

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
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="rounded-4xl border border-(--c-secondary)/18 bg-(--c-secondary)/10 p-6 md:p-8">
            <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-(--c-secondary)">
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
    </section>
  );
}
