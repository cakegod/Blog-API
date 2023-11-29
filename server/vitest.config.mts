import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		setupFiles: "./src/setup/tests.setup.ts",
		globals: true,
	},
});
