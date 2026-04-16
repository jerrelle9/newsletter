
import { useRef, lazy, Suspense } from "react";
import { gsap, SplitText, ScrollSmoother, ScrollTrigger, useGSAP } from "@/src/gsap-init";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionNumber } from "@/components/layout/SectionNumber";
import { GalaxyBackground } from "@/components/layout/GalaxyBackground";

const GlobeScene = lazy(() =>
  import("@/components/hero/GlobeScene").then((m) => ({ default: m.GlobeScene }))
);

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const meetRef = useRef<HTMLSpanElement>(null);
  const gdtdRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const handleJump = (selector: string) => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(selector, true, "top top");
    } else {
      document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* ── GSAP: orchestrated hero entrance timeline ────────────────── */
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        toggleActions: "play none restart none",
      },
    });

    // "MEET" — chars stagger in
    if (meetRef.current) {
      const meetSplit = SplitText.create(meetRef.current, { type: "chars" });
      tl.from(meetSplit.chars, {
        y: 30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: "power3.out",
      }, 0);
    }

    // "GDTD" — large outlined chars scale in
    if (gdtdRef.current) {
      const gdtdSplit = SplitText.create(gdtdRef.current, { type: "chars" });
      tl.from(gdtdSplit.chars, {
        scale: 0,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "back.out(1.7)",
      }, 0.2);
    }

    // Tagline — chars slide up with mask reveal
    if (taglineRef.current) {
      const tagSplit = SplitText.create(taglineRef.current, {
        type: "chars",
        mask: "chars",
      });
      tl.from(tagSplit.chars, {
        yPercent: 110,
        stagger: 0.03,
        duration: 0.5,
        ease: "power3.out",
      }, 0.5);
    }

    // Subtitle paragraph — words mask-reveal
    if (subtitleRef.current) {
      const subSplit = SplitText.create(subtitleRef.current, {
        type: "words",
        mask: "words",
      });
      tl.from(subSplit.words, {
        yPercent: 100,
        duration: 0.5,
        stagger: 0.02,
        ease: "power3.out",
      }, 0.75);
    }

    // CTA buttons - slide up
    if (ctaRef.current) {
      tl.from(ctaRef.current.children, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out",
      }, 0.95);
    }

    // Scroll hint — fade in
    if (scrollHintRef.current) {
      tl.from(scrollHintRef.current, {
        y: 15,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      }, 1.1);
    }
  }, { scope: heroRef });

  /* ── GSAP: scroll hint bounce ─────────────────────────────────── */
  useGSAP(() => {
    if (scrollHintRef.current) {
      gsap.to(scrollHintRef.current, {
        y: 6,
        duration: 1.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.6,
      });
    }
  }, { scope: heroRef });


  return (
    <section
      id="section-1"
      ref={heroRef}
      className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden border-b border-(--border) bg-[radial-gradient(circle_at_14%_12%,rgba(0,180,216,0.16),transparent_20%),radial-gradient(circle_at_88%_22%,rgba(139,92,246,0.14),transparent_24%),linear-gradient(180deg,var(--navy)_0%,var(--navy2)_52%,#00111b_100%)]"
    >
      <SectionNumber number="01" />

      {/* Subtle perspective grid (kontenta-style background) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(180,180,220,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(180,180,220,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Galaxy background — floating dots, rings, grid */}
      <GalaxyBackground />

      {/* Three.js Globe — deferred to keep hero text animations smooth */}
      <div className="absolute inset-0 z-0" data-speed="0.85">
        <Suspense fallback={null}>
          <GlobeScene className="h-full w-full" />
        </Suspense>
      </div>

      {/* Centered text content — overlays the globe */}
      <div className="relative z-10 mt-[12vh] flex flex-col items-center px-6 text-center">
        <div className="flex flex-col items-center">
          <h1 className="font-black leading-[0.88] tracking-[-0.04em]">
            <span ref={meetRef} className="block text-[clamp(2rem,6vw,4.5rem)] text-(--light)">
              MEET
            </span>
            <span ref={gdtdRef} className="block my-2 text-[clamp(5rem,15vw,12rem)] text-transparent [-webkit-text-stroke:2px_rgba(0,180,230,0.85)]">
              GDTD
            </span>
            <span ref={taglineRef} className="block pb-4 leading-normal text-[clamp(1.1rem,2.8vw,2rem)] font-bold tracking-[0.06em]">
              <span className="relative inline-block text-(--white) drop-shadow-[0_0_18px_rgba(0,180,216,0.5)]">
                RBL&apos;s
              </span>
              {" "}
              <span className="text-(--blue-lt)">technology engine.</span>
            </span>
          </h1>

          <p ref={subtitleRef} className="mt-6 max-w-xl rounded-lg px-4 py-3 text-sm leading-7 text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)] md:text-base" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)' }}>
            Group Digital Technology Division is Republic Bank&apos;s technology-focused
            division, helping shape the systems, services, and digital experiences
            that support customers and teams across the region.
          </p>

          <div ref={ctaRef} className="mt-8 flex flex-wrap justify-center gap-3">
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
        </div>
      </div>

      {/* Scroll hint — pinned to bottom */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center">
        <div
          ref={scrollHintRef}
          className="flex items-center gap-3 rounded-full border border-white/20 bg-black/40 px-5 py-2 text-xs font-medium uppercase tracking-[0.3em] text-white/90 backdrop-blur-sm"
          style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
        >
          <ChevronDown className="h-4 w-4" />
          Scroll to enter the command layer / Drag globe to explore
        </div>
      </div>
    </section>
  );
}