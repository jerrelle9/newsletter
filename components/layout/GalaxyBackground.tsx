
import { useMemo } from "react";
import { motion } from "framer-motion";

const POSITIONS = [
  "top-20 left-[12%]",
  "top-40 right-[16%]",
  "bottom-24 left-[18%]",
  "bottom-20 right-[10%]",
  "top-1/2 left-[8%]",
  "top-[58%] right-[22%]",
];

export function GalaxyBackground() {
  const positions = useMemo(() => POSITIONS, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[64px_64px] opacity-25" />

      {/* Decorative rings */}
      <div className="absolute left-[12%] top-[22%] h-56 w-56 rounded-full border border-[rgba(0,180,216,0.14)]" />
      <div className="absolute right-[18%] top-[18%] h-72 w-72 rounded-full border border-(--border)" />

      {/* Floating glowing dots */}
      {positions.map((pos, i) => (
        <motion.div
          key={pos}
          className={`absolute ${pos}`}
          animate={{ y: [0, -12, 0], opacity: [0.45, 0.8, 0.45] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="h-3 w-3 rounded-full bg-(--teal) shadow-[0_0_32px_rgba(0,180,216,0.7)]" />
        </motion.div>
      ))}
    </div>
  );
}
