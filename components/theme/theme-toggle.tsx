"use client";

import { MoonIcon, SunIcon } from "lucide-react";

import { useTheme } from "@/lib/hooks/use-theme";

/**
 * Day or night. A visitor starts on their device's setting; one press picks
 * the other look and remembers it on this device.
 */
export function ThemeToggle() {
  const { resolved, choose } = useTheme();
  const toNight = resolved === "light";

  return (
    <button
      type="button"
      onClick={() => choose(toNight ? "dark" : "light")}
      aria-label={toNight ? "Switch to night" : "Switch to day"}
      className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {toNight ? (
        <MoonIcon className="size-[18px]" aria-hidden="true" />
      ) : (
        <SunIcon className="size-[18px]" aria-hidden="true" />
      )}
    </button>
  );
}
