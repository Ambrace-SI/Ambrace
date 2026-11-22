import { Hero } from "@/components/landing/hero";
import {
  BackedBy,
  BackedByStrip,
  Closing,
  Founders,
  HowItWorks,
  LearningProfile,
  Vision,
  WhatsNext,
  Why,
} from "@/components/landing/sections";
import { SiteFooter } from "@/components/site/site-footer";
import { appUrl } from "@/lib/site";

const NAV = [
  { href: "#why", label: "Why" },
  { href: "#how", label: "How it works" },
  { href: "#next", label: "What’s next" },
  { href: "#team", label: "Team" },
] as const;

export default function HomePage() {
  return (
    <>
      {/* The backers sit along the bottom of the first screen. */}
      <Hero appUrl={appUrl()} links={NAV} footer={<BackedByStrip />} />
      <main>
        <Why />
        <HowItWorks />
        <LearningProfile />
        <WhatsNext />
        <Vision />
        <Founders />
        <BackedBy />
        <Closing />
      </main>
      <SiteFooter />
    </>
  );
}
