
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.98, filter: "blur(10px)" }}
      animate={
        inView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}
      }
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}