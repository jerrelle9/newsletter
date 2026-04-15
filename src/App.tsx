import { SectionWheelNav } from "@/components/layout/SectionWheelNav";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhoWeAreSection } from "@/components/sections/WhoWeAreSection";
import { GmNoteSection } from "@/components/sections/GmNoteSection";
import { StructureSection } from "@/components/sections/StructureSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { MilestoneSection } from "@/components/sections/MilestoneSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function App() {
  return (
    <div className="antialiased">
      <SectionWheelNav />
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
  );
}
