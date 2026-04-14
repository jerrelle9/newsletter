export function SectionNumber({ number }: { number: string }) {
  return (
    <div className="pointer-events-none absolute left-4 top-3 text-7xl font-black tracking-tighter text-white/[0.04] md:left-8 md:top-6 md:text-9xl">
      {number}
    </div>
  );
}