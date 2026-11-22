"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

import { ThemeSync } from "@/components/theme/theme-sync";

/**
 * What every page shares: motion that steps aside for people who ask their
 * device for less of it, and a theme that follows their device (or their
 * choice) while the page is open.
 */
export function SiteProviders({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeSync />
      {children}
    </MotionConfig>
  );
}
