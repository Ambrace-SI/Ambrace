import { defineConfig } from "vitest/config";

// Vite reads the "@/..." alias from tsconfig.json and compiles JSX itself, so
// no plugins are needed. Component tests opt in to a browser with the comment
// `// @vitest-environment jsdom`; everything else runs in Node.
export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    environment: "node",
    include: ["tests/**/*.test.{ts,tsx}"],
    setupFiles: ["tests/setup.ts"],
    restoreMocks: true,
  },
});
