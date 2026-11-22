import { ArrowUpRightIcon } from "lucide-react";

import { PartnerLogo } from "@/components/landing/partner-logo";
import { NightSky } from "@/components/landing/night-sky";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { BACKERS, CONTACT, FOUNDERS } from "@/lib/site";

/*
 * The landing page's sections, in reading order. Each is a plain server
 * component; motion comes from <Reveal> and <SectionHeading>.
 */

const card = "rounded-3xl border bg-card";

/** Who backs us, in one line under the hero. */
export function BackedByStrip() {
  return (
    <section aria-labelledby="backed-strip" className="border-y">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-5 px-6 py-7">
        <h2
          id="backed-strip"
          className="font-mono text-xs font-normal tracking-[0.14em] text-muted-foreground uppercase"
        >
          Backed by
        </h2>
        {BACKERS.map((backer) => (
          <div key={backer.name} className="flex items-center gap-3">
            <PartnerLogo backer={backer} className="h-9 text-[17px]" />
            <span className="text-sm text-muted-foreground">
              {backer.support}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

const STORY = [
  {
    tag: "In class",
    title: "One teacher. Sixty students.",
    body: "The teacher explains a topic once, with one example. Some students understand. Many don’t, but the class has to move on.",
  },
  {
    tag: "The student",
    title: "“I didn’t get it. Can you explain it another way?”",
    body: "Most children never ask. They feel shy, or there is no time. So they learn the answer by heart, without really understanding it.",
  },
  {
    tag: "Why we built Ambrace",
    title: "We were those students too.",
    body: "Now every child can have a patient teacher who explains things in the way that suits them, and has time just for them. That is Ambrace.",
    warm: true,
  },
];

export function Why() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-36 pb-28">
      <SectionHeading index="01" label="Why we exist" id="why">
        Every child learns differently. A classroom teaches everyone the same
        way.
      </SectionHeading>
      <ol className="mt-20 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
        {STORY.map((beat, i) => (
          <RevealItem
            key={beat.tag}
            delay={i * 0.1}
            className="mb-10 border-t pr-6"
          >
            <p
              className={`mt-6 font-mono text-xs tracking-[0.1em] uppercase ${beat.warm ? "text-ember-text" : "text-muted-foreground"}`}
            >
              {beat.tag}
            </p>
            <p className="mt-3.5 font-heading text-[22px] leading-snug font-medium tracking-[-0.02em]">
              {beat.title}
            </p>
            <p className="mt-3.5 text-[17px] text-muted-foreground">
              {beat.body}
            </p>
          </RevealItem>
        ))}
      </ol>
    </section>
  );
}

const STEPS = [
  {
    tag: "Talk",
    title: "Take a viva",
    body: "Pick a subject and a chapter, and just talk. Ambrace asks, listens and follows up, the way a good teacher would.",
  },
  {
    tag: "Understand",
    title: "Learn how you learn",
    body: "What you know and what you don’t, how you explain, where you hesitate, and which kinds of examples make things click.",
  },
  {
    tag: "Grow",
    title: "Get a plan that fits you",
    body: "A study plan built on your strengths and gaps, in the way you learn best. We check it with you before it starts.",
    soon: true,
  },
];

export function HowItWorks() {
  return (
    <section className="border-y bg-band">
      <div className="mx-auto max-w-7xl px-6 py-36">
        <SectionHeading index="02" label="How it works" id="how">
          Take a viva. Find out how you learn.
        </SectionHeading>
        <div className="mt-18 grid gap-5 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal
              key={step.title}
              delay={i * 0.1}
              className={`${card} flex min-h-72 flex-col gap-4 p-8`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[13px] text-muted-foreground">
                  0{i + 1}
                </span>
                {"soon" in step && step.soon ? (
                  <span className="rounded-full bg-ember px-2.5 py-1 font-mono text-[11px] tracking-[0.1em] text-ember-foreground uppercase">
                    Coming soon
                  </span>
                ) : (
                  <span className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase">
                    {step.tag}
                  </span>
                )}
              </div>
              <h3 className="mt-auto text-[26px] font-medium tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const NOTICED = [
  ["Good at", "Mirrors and how light bounces"],
  ["Needs a little more practice", "How lenses bend light"],
  ["Understands best with", "Stories and things from daily life"],
  ["Examples they enjoy", "Cricket, cooking and shopping"],
] as const;

export function LearningProfile() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-x-24 gap-y-14 px-6 py-36 lg:grid-cols-2">
      <div>
        <SectionHeading index="03" label="Gets to know you" id="profile">
          Ambrace gets to know you, like a good teacher does.
        </SectionHeading>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            It notices what you are good at, what needs a little more practice,
            and the kind of examples you like. The more you talk, the better it
            knows you.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.15} className={`${card} overflow-hidden`}>
        <div className="flex items-center justify-between border-b px-6 py-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            What Ambrace noticed
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="star size-[7px] rounded-full bg-ember" />
            Example
          </span>
        </div>
        <dl className="px-6 pt-2 pb-6">
          {NOTICED.map(([label, value]) => (
            <div key={label} className="border-b py-4">
              <dt className="text-sm text-muted-foreground">{label}</dt>
              <dd className="mt-1 text-lg">{value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

const ROADMAP = [
  {
    when: "Now",
    title: "Viva and report",
    body: "Talk through a chapter, and get an honest report on what you know and what to work on.",
    live: true,
  },
  {
    when: "Next",
    title: "Your plan and lessons",
    body: "A study plan made for you, then explanations and practice in the way you learn best, for every subject.",
  },
  {
    when: "Later",
    title: "A companion for every learner",
    body: "One that grows with you from class to class, in the languages you think in, alongside your teachers and family.",
  },
];

export function WhatsNext() {
  return (
    <section className="border-t bg-band">
      <div className="mx-auto max-w-7xl px-6 py-36">
        <SectionHeading index="04" label="What’s next" id="next">
          Starting simple. Going deep.
        </SectionHeading>
        <ol className="mt-18 grid gap-5 md:grid-cols-3">
          {ROADMAP.map((step, i) => (
            <RevealItem
              key={step.when}
              delay={i * 0.1}
              className={`${card} flex flex-col gap-3.5 p-8`}
            >
              <span
                className={`inline-flex items-center gap-2 font-mono text-xs tracking-[0.1em] uppercase ${step.live ? "text-ember-text" : "text-muted-foreground"}`}
              >
                <span
                  className={`size-[7px] rounded-full ${step.live ? "bg-ember" : "bg-border"}`}
                />
                {step.when}
              </span>
              <h3 className="mt-2 text-[26px] font-medium tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.body}</p>
            </RevealItem>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Vision() {
  return (
    <section className="relative overflow-hidden border-y bg-sky">
      <NightSky count={50} seed={31} className="inset-0" />
      <Reveal className="relative mx-auto max-w-4xl px-6 py-40 text-center">
        <p className="flex justify-center gap-4 font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
          <span className="text-ember-text">05</span>
          <span>Our vision</span>
        </p>
        <h2
          id="vision"
          className="mt-5 text-[clamp(2.125rem,4.8vw,4rem)] leading-[1.05] font-medium tracking-[-0.04em] text-balance"
        >
          Change how the world learns, one learner at a time.
        </h2>
        <p className="mx-auto mt-7 max-w-2xl text-lg text-muted-foreground">
          For a century, students have been asked to fit the way they are
          taught. We think it should be the other way round. When teaching
          starts from how each person thinks, understanding stops being luck,
          and learning starts to feel like freedom.
        </p>
      </Reveal>
    </section>
  );
}

export function Founders() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-36">
      <SectionHeading index="06" label="Founders" id="team">
        Built by the students who needed it.
      </SectionHeading>
      <div className="mt-18 grid gap-5 md:grid-cols-2">
        {FOUNDERS.map((founder, i) => (
          <Reveal
            key={founder.name}
            delay={i * 0.1}
            className={`${card} flex flex-wrap items-start gap-7 p-8`}
          >
            <div
              aria-hidden="true"
              className="flex size-28 flex-none items-center justify-center rounded-full border bg-background font-heading text-3xl text-muted-foreground"
            >
              {founder.initials}
            </div>
            <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-1.5">
              <p className="font-mono text-xs tracking-[0.1em] text-ember-text uppercase">
                {founder.role}
              </p>
              <h3 className="text-[28px] font-medium tracking-[-0.02em]">
                {founder.name}
              </h3>
              {founder.from && (
                <p className="text-[15px] text-muted-foreground">
                  {founder.from}
                </p>
              )}
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-11 items-center gap-2 self-start text-[15px] font-medium hover:underline"
              >
                LinkedIn
                <ArrowUpRightIcon aria-hidden="true" className="size-3.5" />
                <span className="sr-only">
                  profile of {founder.name} (opens in a new tab)
                </span>
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function BackedBy() {
  return (
    <section className="border-t">
      <div className="mx-auto max-w-7xl px-6 py-32">
        <SectionHeading index="07" label="Backed by" id="backers">
          In good company, early.
        </SectionHeading>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {BACKERS.map((backer, i) => (
            <Reveal
              key={backer.name}
              delay={i * 0.1}
              className={`${card} flex flex-col gap-4 p-7`}
            >
              <div className="flex h-18 items-center">
                <PartnerLogo backer={backer} className="max-h-16 text-2xl" />
              </div>
              <h3 className="text-xl font-medium">{backer.name}</h3>
              <p className="font-mono text-xs tracking-[0.1em] text-muted-foreground uppercase">
                {backer.support}
              </p>
              <p className="text-muted-foreground">{backer.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Closing() {
  return (
    <section className="relative overflow-hidden border-t bg-sky">
      <NightSky count={50} seed={53} className="inset-0" />
      <Reveal className="relative mx-auto flex max-w-4xl flex-col items-center px-6 py-40 text-center">
        <h2 className="text-[clamp(2.25rem,5.4vw,4.5rem)] leading-[1.04] font-medium tracking-[-0.045em] text-balance">
          Sixty students. Sixty ways in.{" "}
          <span className="text-muted-foreground">
            One teacher with time for each.
          </span>
        </h2>
        <p className="mt-8 text-lg text-muted-foreground">
          Schools, partners and press:{" "}
          <a
            href={`mailto:${CONTACT.business}`}
            className="text-foreground underline underline-offset-4"
          >
            {CONTACT.business}
          </a>
        </p>
      </Reveal>
    </section>
  );
}
