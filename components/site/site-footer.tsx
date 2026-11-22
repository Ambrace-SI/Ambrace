import Link from "next/link";

import { CONTACT } from "@/lib/site";

/**
 * The foot of every page. The investors page is linked from here only: it is
 * for the people who come looking for it, not part of the student's story.
 */
export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-10 px-6 py-12">
        <div className="flex flex-col gap-2">
          <span className="font-heading text-xl font-semibold tracking-tight">
            ambrace
          </span>
          <span className="font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase">
            Ambrace Super Intelligence
          </span>
        </div>

        <div className="flex flex-wrap gap-x-16 gap-y-8 text-[15px]">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase">
              Contact
            </p>
            <a href={`mailto:${CONTACT.founder}`} className="hover:underline">
              {CONTACT.founder}
            </a>
            <a href={`mailto:${CONTACT.business}`} className="hover:underline">
              {CONTACT.business}
            </a>
          </div>
          <nav aria-label="Company" className="flex flex-col gap-2">
            <p className="font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase">
              Company
            </p>
            <Link href="/investors/" className="hover:underline">
              Investors
            </Link>
            <Link href="/privacy/" className="hover:underline">
              Privacy
            </Link>
          </nav>
        </div>
      </div>
      <p className="mx-auto max-w-7xl px-6 pb-10 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Ambrace. Making in India.
      </p>
    </footer>
  );
}
