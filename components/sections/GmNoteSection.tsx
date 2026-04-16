"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/src/gsap-init";
import { Reveal } from "@/components/layout/Reveal";
import { SectionNumber } from "@/components/layout/SectionNumber";
import { GalaxyBackground } from "@/components/layout/GalaxyBackground";
import { gdtdStructure } from "@/data/gdtd-structure";

export function GmNoteSection() {
  const values = ["Clarity", "Execution", "Trust", "Regional scale"];
  const { leader } = gdtdStructure;
  const [imgFailed, setImgFailed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const noteCardRef = useRef<HTMLDivElement>(null);
  const sideCardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Main note card — scrub-linked slide from left
    if (noteCardRef.current) {
      gsap.fromTo(noteCardRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: noteCardRef.current,
            start: "top 90%",
            end: "top 40%",
            scrub: 0.3,
          },
        },
      );
    }

    // Side cards — scrub-linked stagger from right
    if (sideCardsRef.current) {
      const cards = sideCardsRef.current.children;
      gsap.fromTo(cards,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: sideCardsRef.current,
            start: "top 90%",
            end: "top 40%",
            scrub: 0.3,
          },
        },
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      id="section-3"
      ref={sectionRef}
      className="relative min-h-screen border-b border-(--border) bg-[radial-gradient(circle_at_20%_24%,rgba(0,180,216,0.12),transparent_20%),linear-gradient(180deg,var(--navy)_0%,var(--surface)_100%)]"
    >
      <GalaxyBackground />
      <SectionNumber number="03" />

      <div className="ml-[8vw] max-w-[66vw] px-6 py-24 md:px-10 lg:px-16">

        <div className="text-xs font-medium uppercase tracking-[0.3em] text-(--c-primary)/70" data-speed="1">
          A note from our GM
        </div>

        <div className="mt-8 grid min-h-[calc(100vh-12rem)] gap-10 lg:grid-cols-[1.38fr_0.92fr] lg:items-center">
        <div ref={noteCardRef} className="relative overflow-hidden rounded-4xl border border-(--border) bg-[rgba(11,29,46,0.76)] p-8 shadow-[0_24px_90px_rgba(1,17,27,0.52)] backdrop-blur-2xl md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,180,216,0.14),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]" />
          <div className="relative">
            <div className="mt-8">
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-3xl font-light leading-tight text-white md:text-3xl md:leading-[1.08]">
                <span><span className="text-4xl font-black text-(--c-primary) md:text-5xl">G</span>roup</span>
                <span><span className="text-4xl font-black text-(--c-primary) md:text-5xl">D</span>igital</span>
                <span><span className="text-4xl font-black text-(--c-primary) md:text-5xl">T</span>echnology</span>
                <span><span className="text-4xl font-black text-(--c-primary) md:text-5xl">D</span>ivision</span>
                <p className="mt-4 text-xl font-light leading-8 text-(--light)">
                  exists to help Republic move faster, stay dependable, and keep improving, by
                  bringing clear technology leadership and customer focus into one division.
                </p>
              </div>
              
            </div>

            <p className="mt-8 max-w-3xl text-base leading-8 text-(--light)">
              The department&apos;s advantage is not only what it builds, but how it
              builds: shared standards, modern platforms, visible ownership, and the
              discipline to deliver meaningful change inside a regulated environment.
            </p>

            <div className="mt-10 flex items-center gap-4">
              {leader.image && !imgFailed ? (
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-(--border) shadow-[0_18px_34px_rgba(0,150,199,0.4)] ring-1 ring-white/12">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="h-full w-full object-cover"
                    onError={() => setImgFailed(true)}
                  />
                </div>
              ) : (
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,var(--c-primary),var(--blue))] font-bold text-(--navy) shadow-[0_18px_34px_rgba(0,150,199,0.4)]">
                  M
                </div>
              )}
              <div>
                <div className="font-semibold text-white">{leader.name}</div>
                <div className="text-sm text-(--muted)">
                  {leader.role}, Group Digital Technology Division
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={sideCardsRef} className="grid gap-4">
          <div className="rounded-4xl border border-(--border) bg-[rgba(255,255,255,0.03)] p-6 backdrop-blur-xl">
            <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-(--dim)">
              Leadership signal
            </div>
            <h3 className="mt-4 text-2xl font-bold text-white">
              Build banking that feels current, resilient, and ready for scale.
            </h3>
            <p className="mt-4 text-sm leading-7 text-(--light)">
              GDTD is positioned to translate strategy into dependable delivery by combining
              modern platforms, strong governance, and customer-centred execution across the
              bank.
            </p>
          </div>

          <div className="rounded-4xl border border-(--c-secondary)/20 bg-(--c-secondary)/10 p-6">
            <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-(--c-secondary)">
              Operating values
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {values.map((value) => (
                <div
                  key={value}
                  className="rounded-full border border-(--border) bg-[rgba(11,29,46,0.5)] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white"
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
