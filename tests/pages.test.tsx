// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, test, vi } from "vitest";

import HomePage from "@/app/page";
import InvestorsPage from "@/app/investors/page";
import PrivacyPage from "@/app/privacy/page";

beforeAll(() => {
  // jsdom has neither of these; Motion and the theme store ask for them.
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
    })),
  );
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});

describe("the landing page", () => {
  test("has one way into the app, and no account buttons", () => {
    render(<HomePage />);

    const tryNow = screen.getByRole("link", { name: /try now/i });
    expect(tryNow).toHaveProperty("href", "https://app-dev.ambrace.in/");
    expect(
      screen.queryByRole("link", { name: /sign in|log in|sign up/i }),
    ).toBeNull();
  });

  test("tells the story, the founders and the backers", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: /every child learns differently/i }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: "Rajdeep Dwivedi" }),
    ).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Kaushal Kumar" })).toBeTruthy();
    expect(screen.getAllByAltText("IIT Madras logo").length).toBeGreaterThan(0);
    expect(
      screen.getAllByAltText("SIE, IIT Madras logo").length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByAltText("Sarvam logo").length).toBeGreaterThan(0);
  });

  test("leaves the harness and the model to the investors page", () => {
    const { container } = render(<HomePage />);
    expect(container.textContent).not.toMatch(/harness|proprietary model/i);
  });

  test("links investors and privacy from the footer, with both contact addresses", () => {
    render(<HomePage />);
    const footer = screen.getByRole("contentinfo");

    // The trailing slash is added by the build (trailingSlash), not here.
    expect(footer.querySelector('a[href^="/investors"]')).toBeTruthy();
    expect(footer.querySelector('a[href^="/privacy"]')).toBeTruthy();
    expect(
      footer.querySelector('a[href="mailto:kaushal@ambrace.in"]'),
    ).toBeTruthy();
    expect(
      footer.querySelector('a[href="mailto:business@ambrace.in"]'),
    ).toBeTruthy();
    expect(footer.textContent).toContain("Making in India.");
  });

  test("pressing the logo plays its arrival again", async () => {
    const { container } = render(<HomePage />);
    const logo = screen.getByRole("link", { name: "Ambrace, home" });
    const before = logo.querySelector("svg");

    await userEvent.click(logo);

    // A new drawing means the animation starts over.
    expect(logo.querySelector("svg")).not.toBe(before);
    expect(container).toBeTruthy();
  });
});

describe("the other pages", () => {
  test("investors explains the harness and the model", () => {
    const { container } = render(<InvestorsPage />);
    expect(container.textContent).toMatch(/harness/i);
    expect(container.textContent).toMatch(/proprietary model/i);
  });

  test("privacy covers Google sign-in for app verification", () => {
    const { container } = render(<PrivacyPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Privacy policy" }),
    ).toBeTruthy();
    expect(container.textContent).toMatch(/Limited Use/);
    expect(container.textContent).toMatch(/delete/i);
  });
});
