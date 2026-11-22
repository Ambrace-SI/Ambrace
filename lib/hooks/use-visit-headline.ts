"use client";

import { useSyncExternalStore } from "react";

import { HEADLINES } from "@/lib/site";

// Chosen once per page load, the first time a browser asks. The static HTML
// carries the first headline (the server has no visit to pick for), and the
// browser swaps in this visit's line as soon as the page is live.
let chosen: number | undefined;

export function pickHeadline(random: () => number = Math.random): number {
  return Math.min(
    Math.floor(random() * HEADLINES.length),
    HEADLINES.length - 1,
  );
}

const subscribe = () => () => {};
const onClient = () => (chosen ??= pickHeadline());
const onServer = () => 0;

/** This visit's headline. */
export function useVisitHeadline(): string {
  return HEADLINES[useSyncExternalStore(subscribe, onClient, onServer)];
}
