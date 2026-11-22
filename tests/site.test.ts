import { describe, expect, test } from "vitest";

import { scatterStars } from "@/components/landing/night-sky";
import { pickHeadline } from "@/lib/hooks/use-visit-headline";
import {
  BACKERS,
  CONTACT,
  DEFAULT_APP_URL,
  FOUNDERS,
  HEADLINES,
  appUrl,
} from "@/lib/site";

describe("where Try now goes", () => {
  test("the configured app, when one is set", () => {
    expect(appUrl("https://app.ambrace.in")).toBe("https://app.ambrace.in/");
  });

  test("the dev app when nothing is set", () => {
    expect(appUrl(undefined)).toBe(DEFAULT_APP_URL);
    expect(appUrl("   ")).toBe(DEFAULT_APP_URL);
    expect(DEFAULT_APP_URL).toBe("https://app-dev.ambrace.in");
  });

  test("never a broken or unsafe link", () => {
    expect(appUrl("not a url")).toBe(DEFAULT_APP_URL);
    expect(appUrl("javascript:alert(1)")).toBe(DEFAULT_APP_URL);
  });
});

describe("the headline", () => {
  test("any random number picks one of the headlines", () => {
    expect(pickHeadline(() => 0)).toBe(0);
    expect(pickHeadline(() => 0.999999)).toBe(HEADLINES.length - 1);
    expect(pickHeadline(() => 1)).toBe(HEADLINES.length - 1);
  });
});

describe("the night sky", () => {
  test("is the same on every build, so the page never jumps", () => {
    expect(scatterStars(20, 7)).toEqual(scatterStars(20, 7));
  });

  test("keeps every star inside its sky", () => {
    for (const star of scatterStars(200, 31)) {
      expect(star.left).toBeGreaterThanOrEqual(0);
      expect(star.left).toBeLessThan(100);
      expect(star.top).toBeLessThan(100);
    }
  });
});

describe("the facts on the page", () => {
  test("founders and their roles", () => {
    expect(FOUNDERS.map((f) => `${f.name}, ${f.role}`)).toEqual([
      "Rajdeep Dwivedi, Co-founder & CEO",
      "Kaushal Kumar, Co-founder & CTO",
    ]);
    for (const f of FOUNDERS)
      expect(f.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\/in\//);
  });

  test("backers", () => {
    expect(BACKERS.map((b) => b.name)).toEqual([
      "IIT Madras",
      "SIE, IIT Madras",
      "Aspire Leaders",
      "NVIDIA Inception",
    ]);
  });

  test("contact addresses", () => {
    expect(CONTACT).toEqual({
      founder: "kaushal@ambrace.in",
      business: "business@ambrace.in",
    });
  });
});
