/* eslint-disable @next/next/no-img-element -- a static export has no image server */
import type { Backer } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * A backer's logo in the site's single quiet tone, or its name set in type
 * when we have no logo file for it.
 */
export function PartnerLogo({
  backer,
  className,
}: {
  backer: Backer;
  className?: string;
}) {
  if (!backer.logo) {
    return (
      <span
        className={cn(
          "inline-flex items-center font-heading font-semibold tracking-tight",
          className,
        )}
      >
        {backer.name}
      </span>
    );
  }
  return (
    <img
      src={backer.logo.src}
      width={backer.logo.width}
      height={backer.logo.height}
      alt={`${backer.name} logo`}
      className={cn("partner-logo w-auto", className)}
    />
  );
}
