"use client";

import Link from "next/link";
import { useState } from "react";

import { AnimatedMark } from "@/components/brand/animated-mark";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export type NavLink = { href: string; label: string };

/**
 * The bar across the top of every page: the logo (which replays its arrival
 * when pressed), the page's own links, and day or night. No account buttons:
 * "Try now" in the hero is the one way into the app.
 */
export function SiteHeader({ links = [] }: { links?: readonly NavLink[] }) {
  const [play, setPlay] = useState(0);

  return (
    <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-5">
      <Link
        href="/"
        aria-label="Ambrace, home"
        onClick={() => setPlay((n) => n + 1)}
        className="inline-flex items-center gap-2.5 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        <AnimatedMark play={play} />
        <span className="font-heading text-[21px] font-semibold tracking-tight">
          ambrace
        </span>
      </Link>

      {links.length > 0 && (
        <nav
          aria-label="Main"
          className="hidden items-center gap-8 text-[15px] text-muted-foreground md:flex"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}

      <ThemeToggle />
    </header>
  );
}
