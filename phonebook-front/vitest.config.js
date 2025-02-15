import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true, // Enables global test functions (describe, it, test)
        environment: "jsdom", // Simulates a browser environment for React 17
        setupFiles: "./setupTests.js", // Runs setup before tests
    },
});