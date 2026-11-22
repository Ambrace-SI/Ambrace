import type { Metadata } from "next";

import { Part, PageShell } from "@/components/site/page-shell";
import { BACKERS, CONTACT, FOUNDERS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Investors",
  description:
    "Why Ambrace is building a learner harness, and then a model of its own.",
  // Linked from the footer only, for the people who come looking for it.
  robots: { index: false, follow: true },
};

export default function InvestorsPage() {
  return (
    <PageShell
      eyebrow="For investors"
      title="A learner harness today. A model of our own tomorrow."
      intro={
        <p>
          The most useful AI products are not models on their own. They are
          harnesses: systems that give a capable model the right context, memory
          and tools for one kind of work. Ambrace is building that harness for
          learning, and with it, the data to train a model that understands how
          each student learns.
        </p>
      }
    >
      <Part id="harness" title="The harness idea">
        <p>
          Coding tools such as Cursor and Claude Code changed what models could
          do for engineers without training a single model of their own. They
          wrap frontier models in the context of a codebase, a memory of what
          was tried, and tools to read, run and check work. The model is the
          engine; the harness is what makes it useful.
        </p>
        <p>
          Learning has no such harness. General chat assistants answer
          questions, but they do not know the student: what they already
          understand, where they stall, which examples land, how they like to be
          taught. Every conversation starts from zero.
        </p>
      </Part>

      <Part id="learner-harness" title="What a learner harness holds">
        <ul>
          <li>
            <strong>Context:</strong> a living learner profile — strengths,
            gaps, how the student explains, the kinds of examples that make
            things click — built from what they say, and confirmed with them.
          </li>
          <li>
            <strong>Memory:</strong> every viva and every plan, so the next
            session starts where the last one ended.
          </li>
          <li>
            <strong>Tools:</strong> spoken vivas, study plans, explanations and
            practice, each shaped by the profile.
          </li>
          <li>
            <strong>Evaluation:</strong> honest, curriculum-grounded assessment,
            so progress is measured, not assumed.
          </li>
        </ul>
      </Part>

      <Part id="today" title="Where we are">
        <p>
          The first tool is live: a spoken viva on the student’s own syllabus.
          Ambrace asks, listens and follows up, then reports what the student
          knows and where they need help. Personal study plans, confirmed with
          the student, come next. Today it runs on the best available frontier
          models.
        </p>
      </Part>

      <Part id="model" title="Where we are going">
        <p>
          Each conversation teaches us something no textbook records: how a
          particular student reasons, hesitates and finally understands. With
          consent and care, that becomes the training ground for a proprietary
          model built for teaching rather than answering — one that carries each
          student’s context and adapts its pedagogy to them. That is the
          deep-tech core of Ambrace, and the part that compounds.
        </p>
      </Part>

      <Part id="team" title="Team and backing">
        <ul>
          {FOUNDERS.map((f) => (
            <li key={f.name}>
              <strong>{f.name}</strong>, {f.role}
              {f.from ? ` (${f.from})` : ""}
            </li>
          ))}
        </ul>
        <ul>
          {BACKERS.map((b) => (
            <li key={b.name}>
              <strong>{b.name}</strong>
              {b.support ? `: ${b.support}` : ""}
            </li>
          ))}
        </ul>
      </Part>

      <Part id="contact" title="Talk to us">
        <p>
          We are glad to share more, including the product and where it is
          heading. Write to{" "}
          <a href={`mailto:${CONTACT.business}`}>{CONTACT.business}</a> or to{" "}
          <a href={`mailto:${CONTACT.founder}`}>{CONTACT.founder}</a>.
        </p>
      </Part>
    </PageShell>
  );
}
