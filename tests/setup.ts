import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Remove everything a test rendered before the next one starts. Without this a
// hook left mounted keeps its timers and subscriptions running, and one test
// can change the result of another. Node-only tests have nothing to remove.
afterEach(() => {
  if (typeof document !== "undefined") cleanup();
});
