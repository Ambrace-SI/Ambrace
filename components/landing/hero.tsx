"use client";

import { ArrowRightIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { HeroScene } from "@/components/landing/hero-scene";
import { NightSky } from "@/components/landing/night-sky";
import { SiteHeader, type NavLink } from "@/components/site/site-header";
import { useVisitHeadline } from "@/lib/hooks/use-visit-headline";

const EASE = [0.2, 0.8, 0.2, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

/**
 * The first screen: the badge, this visit's headline, the promise, one way in
 * (Try now), and the scene underneath, where the idea is shown rather than
 * told.
 */
export function Hero({
  appUrl,
  links,
}: {
  appUrl: string;
  links: readonly NavLink[];
}) {
  const headline = useVisitHeadline();

  return (
    <section id="top" className="relative overflow-hidden bg-sky">
      <NightSky count={140} seed={7} className="inset-0" />
      <SiteHeader links={links} />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-12 text-center md:pt-16">
        <motion.p
          {...rise(0.05)}
          className="glass-badge rounded-full px-4 py-2 font-mono text-xs tracking-[0.16em] text-foreground/80 uppercase"
        >
          Learn differently
        </motion.p>

        {/* The line changes per visit; it fades across rather than jumping. */}
        <h1 className="mt-6 grid text-[clamp(2.5rem,6vw,5rem)] leading-[1.04] font-medium tracking-[-0.045em] text-balance">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={headline}
              className="[grid-area:1/1]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            >
              {headline}
            </motion.span>
          </AnimatePresence>
        </h1>

        <motion.p
          {...rise(0.3)}
          className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground"
        >
          Spend 10 minutes a day with Ambrace, and discover how you learn best.
        </motion.p>

        <motion.div {...rise(0.42)} className="mt-9">
          <motion.a
            href={appUrl}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex min-h-13 items-center gap-2.5 rounded-full bg-ember px-7 font-medium text-ember-foreground focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Try now
            <ArrowRightIcon
              aria-hidden="true"
              className="size-[18px] transition-transform group-hover:translate-x-0.5"
            />
          </motion.a>
        </motion.div>
      </div>

      <HeroScene />
    </section>
  );
}
