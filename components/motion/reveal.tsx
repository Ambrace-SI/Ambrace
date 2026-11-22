"use client";

import { motion, type HTMLMotionProps } from "motion/react";

const ENTER = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -12% 0px" },
} as const;
const timing = (delay: number) => ({
  duration: 0.7,
  delay,
  ease: [0.2, 0.8, 0.2, 1] as const,
});

/** The same entrance for a list item, so lists stay valid HTML. */
export function RevealItem({
  delay = 0,
  ...props
}: HTMLMotionProps<"li"> & { delay?: number }) {
  return <motion.li {...ENTER} transition={timing(delay)} {...props} />;
}

/**
 * Content that rises gently into place the first time it scrolls into view.
 * One motion for the whole site, so every section arrives the same way.
 * Reduced motion is honoured by MotionConfig in the layout.
 */
export function Reveal({
  delay = 0,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number }) {
  return <motion.div {...ENTER} transition={timing(delay)} {...props} />;
}
