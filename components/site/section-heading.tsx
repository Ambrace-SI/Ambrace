import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";

/**
 * A section's index, label and heading: "01 · Why we exist", then the line
 * that carries the section. The mono index gives the page its quiet,
 * instrument-like rhythm.
 */
export function SectionHeading({
  index,
  label,
  id,
  children,
  className,
}: {
  index?: string;
  label: string;
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <p className="flex gap-4 font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
        {index && <span className="text-ember-text">{index}</span>}
        <span>{label}</span>
      </p>
      <h2
        id={id}
        className="mt-5 max-w-4xl scroll-mt-28 text-[clamp(2.125rem,4.4vw,3.75rem)] leading-[1.06] font-medium tracking-[-0.04em] text-balance"
      >
        {children}
      </h2>
    </Reveal>
  );
}
