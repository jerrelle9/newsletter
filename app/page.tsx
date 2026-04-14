import { SectionWheelNav } from "@/components/layout/SectionWheelNav";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhoWeAreSection } from "@/components/sections/WhoWeAreSection";
import { GmNoteSection } from "@/components/sections/GmNoteSection";
import { StructureSection } from "@/components/sections/StructureSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden text-white">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-[75vw] items-center justify-between px-4 py-4 md:px-8 lg:px-12">
          <div className="pointer-events-auto inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-[rgba(1,29,46,0.72)] px-4 py-2 shadow-[0_20px_80px_rgba(1,17,27,0.55)] backdrop-blur-xl">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--teal)] shadow-[0_0_18px_rgba(0,180,216,0.9)]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.36em] text-[var(--light)]">
              Republic Financial Holdings Limited | Group Digital Technology Division
            </span>
          </div>

          <div className="pointer-events-auto hidden items-center gap-2 rounded-full border border-[var(--border)] bg-[rgba(11,29,46,0.7)] p-1 backdrop-blur-xl md:flex">
            {[
              "Technology-first",
              "Platform-led",
              "Regional support",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[var(--border)] bg-white/3 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--light)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 -top-24 h-72 w-72 rounded-full bg-[rgba(0,180,216,0.12)] blur-3xl" />
        <div className="absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-[rgba(139,92,246,0.12)] blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-112 w-112 -translate-x-1/2 rounded-full border border-[rgba(0,180,216,0.18)]" />
      </div>

      <SectionWheelNav />
      <HeroSection />
      <WhoWeAreSection />
      <GmNoteSection />
      <StructureSection />
      <CapabilitiesSection />
      <ContactSection />
    </main>
  );
}