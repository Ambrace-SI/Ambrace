"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

/** The arcs and the point turn about the centre of the mark, not their own. */
const AROUND_CENTRE = {
  transformBox: "view-box",
  originX: "60px",
  originY: "60px",
} as const;
const EASE = [0.2, 0.8, 0.2, 1] as const;

/**
 * The Ambrace mark, arriving: the two arcs open like arms and the warm point
 * (the student) travels in to its place between them, then breathes.
 *
 * It plays on every load. Give it a new `play` number to play it again, as
 * the header does when the logo is clicked. People who ask for less motion
 * see it standing still (MotionConfig in the layout).
 */
export function AnimatedMark({
  play = 0,
  className,
}: {
  play?: number;
  className?: string;
}) {
  return (
    <svg
      key={play}
      viewBox="0 0 120 120"
      aria-hidden="true"
      focusable="false"
      className={cn("size-10 text-foreground", className)}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      >
        <motion.path
          d="M53.05 20.61 A40 40 0 0 0 53.05 99.39"
          style={AROUND_CENTRE}
          initial={{ rotate: 28, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE }}
        />
        <motion.path
          d="M66.95 20.61 A40 40 0 0 1 66.95 99.39"
          style={AROUND_CENTRE}
          initial={{ rotate: -28, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE }}
        />
      </g>
      <circle
        cx="60"
        cy="60"
        r="20"
        fill="none"
        stroke="var(--muted-foreground)"
        strokeWidth="2.5"
      />
      <motion.g
        style={AROUND_CENTRE}
        initial={{ rotate: -120, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.35, ease: EASE }}
      >
        <circle className="breathe" cx="72" cy="50" r="8" fill="var(--ember)" />
      </motion.g>
    </svg>
  );
}
