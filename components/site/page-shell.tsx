import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

/**
 * A plain reading page (investors, privacy): the header, a title block, a
 * comfortable measure for long text, and the footer.
 */
export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <div className="border-b bg-sky">
        <SiteHeader />
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-20">
          <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-5 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] font-medium tracking-[-0.04em] text-balance">
            {title}
          </h1>
          {intro && (
            <div className="mt-6 text-lg text-muted-foreground">{intro}</div>
          )}
        </div>
      </div>
      <main className="mx-auto max-w-3xl px-6 py-20">{children}</main>
      <SiteFooter />
    </>
  );
}

/** A titled part of a reading page. */
export function Part({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-title` : undefined}
      className="mb-14"
    >
      <h2
        id={id ? `${id}-title` : undefined}
        className="text-2xl font-medium tracking-[-0.02em]"
      >
        {title}
      </h2>
      <div className="mt-4 flex flex-col gap-4 text-[17px] text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_li]:pl-1 [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
