import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.js"],
    environment: "node",
    reporter: "dot",
    watch: {
      include: ["src/**", "tests/**"],
    },
    globals: true,
    coverage: {
      provider: "v8",
      include: ["src/**/*.js"],
    },
  },
});
