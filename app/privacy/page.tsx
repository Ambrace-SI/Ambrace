import type { Metadata } from "next";

import { Part, PageShell } from "@/components/site/page-shell";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Ambrace collects, uses and protects information about students and visitors.",
};

/** Change this date whenever the policy below changes. */
const LAST_UPDATED = "22 November 2026";

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Privacy"
      title="Privacy policy"
      intro={
        <p>
          Last updated {LAST_UPDATED}. This policy explains what information
          Ambrace collects when you use the Ambrace app (app.ambrace.in) and
          this website (ambrace.in), why we collect it, and the choices you
          have.
        </p>
      }
    >
      <Part id="who" title="Who we are">
        <p>
          Ambrace is an education technology start-up based in India,
          pre-incubated at IIT Madras. In this policy, “Ambrace”, “we” and “us”
          mean the Ambrace team. You can reach us at{" "}
          <a href={`mailto:${CONTACT.founder}`}>{CONTACT.founder}</a>.
        </p>
      </Part>

      <Part id="collect" title="What we collect">
        <ul>
          <li>
            <strong>Account details.</strong> When you sign up with email, we
            receive your email address and name. When you sign in with Google,
            we receive your name, email address and profile picture from your
            Google account. We do not receive your Google password.
          </li>
          <li>
            <strong>Profile details you give us,</strong> such as your class and
            the subjects you study.
          </li>
          <li>
            <strong>Viva sessions.</strong> When you take a viva, your voice is
            streamed live to our speech and AI provider so the examiner can hear
            and answer you. We do not keep recordings of your voice. We keep a
            written transcript of the conversation, the subject, chapter and
            topics you chose, and the feedback and study plan we produce, so you
            can see your history and progress.
          </li>
          <li>
            <strong>Usage and device information,</strong> such as pages
            visited, the browser and device type, and technical events (for
            example, whether the microphone connected), used to keep the service
            working and to improve it.
          </li>
        </ul>
        <p>
          This website itself does not ask for any personal information and sets
          no advertising cookies.
        </p>
      </Part>

      <Part id="google" title="Information from Google">
        <p>
          If you choose “Sign in with Google”, we request only your basic
          profile (name and profile picture) and your email address. We use them
          solely to create and secure your Ambrace account, to show your name in
          the app, and to contact you about your account. We do not use Google
          user data for advertising, we do not sell it, and we do not share it
          with anyone except the service providers listed below who help us run
          Ambrace. Ambrace’s use of information received from Google APIs
          adheres to the{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </p>
      </Part>

      <Part id="use" title="How we use information">
        <ul>
          <li>
            To run the viva, assess answers, and produce feedback and study
            plans.
          </li>
          <li>
            To understand how you learn, so explanations and plans fit you.
          </li>
          <li>To keep your account secure and the service reliable.</li>
          <li>To improve Ambrace, including the quality of its teaching.</li>
          <li>To reply when you contact us.</li>
        </ul>
        <p>
          We do not sell personal information, and we do not show advertising.
        </p>
      </Part>

      <Part id="share" title="Who we share it with">
        <p>
          We share information only with service providers that help us run
          Ambrace, under contract, such as:
        </p>
        <ul>
          <li>
            Amazon Web Services, for hosting, storage and sign-in (in India,
            Mumbai region).
          </li>
          <li>
            Google, for live speech and AI processing during a viva, and for
            Google sign-in.
          </li>
          <li>
            A product analytics provider, to understand how the app is used and
            to find problems.
          </li>
          <li>Vercel, which hosts this website.</li>
        </ul>
        <p>
          We may also disclose information if the law requires it, or to protect
          the safety of our users.
        </p>
      </Part>

      <Part id="children" title="Students under 18">
        <p>
          Ambrace is made for school students, many of whom are under 18. A
          parent or guardian should agree to a child’s use of Ambrace. We
          collect only what the service needs, never use a child’s information
          for advertising or profiling for commercial purposes, and a parent or
          guardian may ask us at any time to see or delete their child’s
          information.
        </p>
      </Part>

      <Part id="keep" title="How long we keep it">
        <p>
          We keep your account and viva history while your account is open, so
          you can see your progress. If you ask us to delete your account, we
          delete your personal information within 30 days, except where the law
          requires us to keep it longer.
        </p>
      </Part>

      <Part id="security" title="Security">
        <p>
          Information is encrypted in transit and at rest, access is limited to
          the people who need it to run the service, and AI providers receive
          only short-lived, restricted access for each viva. No system is
          perfectly secure, but we work to protect your information and will
          tell you promptly if a breach affects you.
        </p>
      </Part>

      <Part id="rights" title="Your choices and rights">
        <p>
          You can ask to see, correct or delete your information, or to withdraw
          your consent, by writing to{" "}
          <a href={`mailto:${CONTACT.founder}`}>{CONTACT.founder}</a>. We will
          reply within 30 days. These rights include those under India’s Digital
          Personal Data Protection Act, 2023.
        </p>
      </Part>

      <Part id="changes" title="Changes to this policy">
        <p>
          If we change this policy, we will update the date at the top of this
          page, and tell you in the app if the change is significant.
        </p>
      </Part>

      <Part id="contact" title="Contact">
        <p>
          Questions about privacy:{" "}
          <a href={`mailto:${CONTACT.founder}`}>{CONTACT.founder}</a>. Business
          enquiries:{" "}
          <a href={`mailto:${CONTACT.business}`}>{CONTACT.business}</a>.
        </p>
      </Part>
    </PageShell>
  );
}
