import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type Star = {
  left: number;
  top: number;
  size: number;
  alpha: number;
  delay: number;
  twinkles: boolean;
};

/**
 * The same scatter on every build and every visit (a seeded sequence, not
 * Math.random), so the sky never jumps and the server and browser agree.
 */
export function scatterStars(count: number, seed: number): Star[] {
  let x = seed;
  const next = () => {
    x = (x * 9301 + 49297) % 233280;
    return x / 233280;
  };
  return Array.from({ length: count }, () => {
    const left = next() * 100;
    const top = next() * 100;
    const r = next();
    const delay = next() * 5;
    return {
      left,
      top,
      size: r > 0.92 ? 2.5 : r > 0.6 ? 1.75 : 1.25,
      alpha: 0.3 + r * 0.55,
      delay,
      twinkles: r > 0.7,
    };
  });
}

/**
 * Stars, drawn only at night (the day sky stays clear). Decorative: hidden
 * from screen readers, and the twinkle stops for people who ask for less
 * motion.
 */
export function NightSky({
  count,
  seed,
  className,
}: {
  count: number;
  seed: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute hidden dark:block",
        className,
      )}
    >
      {scatterStars(count, seed).map((star, i) => (
        <span
          key={i}
          className={cn(
            "absolute rounded-full bg-[#ecebf2]",
            star.twinkles && "star",
          )}
          style={
            {
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size,
              height: star.size,
              opacity: star.alpha,
              "--star-alpha": star.alpha,
              animationDelay: `${star.delay.toFixed(2)}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
