import { useRef } from "react";
import { ScrollSmoother, ScrollTrigger, useGSAP } from "./gsap-init";
import { SectionWheelNav } from "@/components/layout/SectionWheelNav";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhoWeAreSection } from "@/components/sections/WhoWeAreSection";
import { GmNoteSection } from "@/components/sections/GmNoteSection";
import { StructureSection } from "@/components/sections/StructureSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { MilestoneSection } from "@/components/sections/MilestoneSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function App() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Kill only the ScrollSmoother instance, not all ScrollTriggers
    ScrollSmoother.get()?.kill();

    ScrollSmoother.create({
      wrapper: wrapperRef.current!,
      content: wrapperRef.current!.firstElementChild as HTMLElement,
      smooth: 1.2,
      effects: true,
      smoothTouch: false,
    });

    // Once ScrollSmoother is ready, recalculate all trigger positions
    ScrollTrigger.refresh();
  }, { scope: wrapperRef });

  return (
    <div className="antialiased">
      {/* Fixed-position nav lives outside the smooth wrapper */}
      <SectionWheelNav />

      <div id="smooth-wrapper" ref={wrapperRef}>
        <div id="smooth-content">
          <main>
            <HeroSection />
            <WhoWeAreSection />
            <GmNoteSection />
            <StructureSection />
            <CapabilitiesSection />
            <MilestoneSection />
            <ContactSection />
          </main>
        </div>
      </div>
    </div>
  );
}
