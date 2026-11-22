/**
 * Everything the site says that is a fact about Ambrace: where the app is,
 * how to reach us, who we are and who backs us. Pages read from here, so a
 * change (a new email, a new backer) is made once.
 */

/** Used when NEXT_PUBLIC_APP_URL is not set: the dev app. */
export const DEFAULT_APP_URL = "https://app-dev.ambrace.in";

/**
 * Where "Try now" goes. Next.js writes NEXT_PUBLIC_ values into the build, so
 * each environment sets its own (production: https://app.ambrace.in). A blank
 * or malformed value falls back to the dev app rather than a broken link.
 */
export function appUrl(value = process.env.NEXT_PUBLIC_APP_URL): string {
  const candidate = value?.trim();
  if (!candidate) return DEFAULT_APP_URL;
  try {
    const url = new URL(candidate);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.toString()
      : DEFAULT_APP_URL;
  } catch {
    return DEFAULT_APP_URL;
  }
}

export const CONTACT = {
  founder: "kaushal@ambrace.in",
  business: "business@ambrace.in",
} as const;

/** One is picked on each visit, so returning visitors meet a new line. */
export const HEADLINES = [
  "More understanding. Less after-school rush.",
  "Let learning feel like freedom.",
  "Learning that fits life, not the other way around.",
  "Help them understand, not just remember.",
  "Taught the way you think.",
] as const;

export type Founder = {
  name: string;
  initials: string;
  role: string;
  from?: string;
  linkedin: string;
};

export const FOUNDERS: readonly Founder[] = [
  {
    name: "Rajdeep Dwivedi",
    initials: "RD",
    role: "Co-founder & CEO",
    from: "IIT Patna",
    linkedin: "https://www.linkedin.com/in/rajdeep-dwivedi-2a7b9b2a3/",
  },
  {
    name: "Kaushal Kumar",
    initials: "KK",
    role: "Co-founder & CTO",
    linkedin: "https://www.linkedin.com/in/kaushalkrsna/",
  },
];

export type Backer = {
  name: string;
  /** A short line on how they back us; left out when the logo says enough. */
  support?: string;
  detail: string;
  /** A logo file under /public/partners, or none: the name is set as type. */
  logo?: {
    src: string;
    width: number;
    height: number;
    /** A self-contained seal that reads on both day and night as it is. */
    standsAlone?: boolean;
  };
  /** The logo has no readable name in it, so the name is written beside it. */
  nameBesideLogo?: boolean;
};

export const BACKERS: readonly Backer[] = [
  {
    name: "IIT Madras",
    support: "Pre-incubated",
    detail:
      "Ambrace is pre-incubated at the Indian Institute of Technology Madras.",
    // The colour seal; the name is set beside it as text.
    logo: {
      src: "/partners/iit-madras.svg",
      width: 300,
      height: 300,
      standsAlone: true,
    },
    nameBesideLogo: true,
  },
  {
    name: "SIE, IIT Madras",
    detail:
      "A seed grant from the School of Innovation & Entrepreneurship, IIT Madras.",
    logo: { src: "/partners/sie-iit-madras.png", width: 640, height: 201 },
  },
  {
    name: "Aspire Leaders",
    support: "Community Action Award",
    detail:
      "Funding through the Aspire Community Action Award, for projects that make a difference on the ground.",
  },
  {
    name: "NVIDIA Inception",
    support: "Inception Program",
    detail:
      "A member of NVIDIA Inception, NVIDIA’s programme for start-ups building with AI.",
    logo: { src: "/partners/nvidia.svg", width: 656, height: 120 },
  },
];
