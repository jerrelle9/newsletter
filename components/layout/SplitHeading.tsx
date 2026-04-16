import { useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/src/gsap-init";

/**
 * SplitHeading — scroll-triggered text reveal using GSAP SplitText.
 *
 * Each word (or line) slides up from behind a clip-mask, creating a
 * premium staggered entrance. Uses `autoSplit` + `onSplit` so the
 * animation re-runs correctly when fonts load or the element width
 * changes (responsive).
 */
export function SplitHeading({
  children,
  className = "",
  as: Tag = "h2",
  splitType = "words",
  stagger = 0.04,
  duration = 0.7,
  y = "100%",
  start = "top 85%",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "div" | "span" | "p";
  splitType?: "words" | "lines" | "chars" | "words,chars" | "lines,words";
  stagger?: number;
  duration?: number;
  y?: string | number;
  start?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const maskUnit = splitType.split(",")[0].trim() as
      | "words"
      | "lines"
      | "chars";

    SplitText.create(ref.current, {
      type: splitType,
      mask: maskUnit,
      autoSplit: true,
      onSplit(self) {
        const targets = splitType.includes("chars")
          ? self.chars
          : splitType.includes("words")
          ? self.words
          : self.lines;

        return gsap.from(targets, {
          y,
          duration,
          stagger,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: "play none none none",
          },
        });
      },
    });
  }, { scope: ref });

  return (
    <Tag ref={ref as React.RefObject<never>} className={className}>
      {children}
    </Tag>
  );
}
