import { useRef, useEffect } from "react";
import { gsap, ScrollSmoother, ScrollTrigger, useGSAP } from "./gsap-init";
import { SectionWheelNav } from "@/components/layout/SectionWheelNav";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhoWeAreSection } from "@/components/sections/WhoWeAreSection";
import { GmNoteSection } from "@/components/sections/GmNoteSection";
import { StructureSection } from "@/components/sections/StructureSection";
import { MilestoneSection } from "@/components/sections/MilestoneSection";
import { FutureFeaturesSection } from "@/components/sections/FutureFeaturesSection";
import { ContactSection } from "@/components/sections/ContactSection";

// Prevent the browser from jumping to its own saved scroll position
history.scrollRestoration = "manual";

const SCROLL_KEY = "smootherScrollPos";

export default function App() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Continuously save scroll position so beforeunload always has a fresh value
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const pos = window.scrollY;
        if (pos > 0) sessionStorage.setItem(SCROLL_KEY, String(pos));
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(() => {
    ScrollSmoother.get()?.kill();

    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current!,
      content: wrapperRef.current!.firstElementChild as HTMLElement,
      smooth: 1.2,
      effects: true,
      smoothTouch: false,
    });

    // Grab and clear before refresh (refresh internally scrolls to 0 for measurement)
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved) sessionStorage.removeItem(SCROLL_KEY);

    ScrollTrigger.refresh();

    // gsap.delayedCall runs on the next GSAP tick — after refresh and its
    // internal scroll-to-0 measurement cycle have fully completed
    if (saved) {
      gsap.delayedCall(0, () => {
        smoother.scrollTop(Number(saved));
      });
    }
  }, { scope: wrapperRef });

  return (
    <div className="antialiased">
      <SectionWheelNav />

      <div id="smooth-wrapper" ref={wrapperRef}>
        <div id="smooth-content">
          <main>
            <HeroSection />
            <WhoWeAreSection />
            <GmNoteSection />
            <StructureSection />
            <MilestoneSection />
            <FutureFeaturesSection />
            <ContactSection />
          </main>
        </div>
      </div>
    </div>
  );
}
