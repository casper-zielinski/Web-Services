import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const TEST_DB_URL = process.env.TEST_DB_URL!;
const BACKEND_URL = process.env.BACKEND_URL!;
const FRONTEND_URL = process.env.FRONTEND_URL!;

export default defineConfig({
  testDir: "./e2e",
  globalSetup: "./e2e/global-setup.ts",
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    baseURL: FRONTEND_URL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: [
    {
      command: "npx tsx src/server.ts",
      url: `${BACKEND_URL}/api/v1/health`,
      reuseExistingServer: false,
      cwd: "../backend",
      env: { DATABASE_URL: TEST_DB_URL, NODE_ENV: "test", PORT: "3000" },
      timeout: 30_000,
    },
    {
      command: "npm run dev",
      url: FRONTEND_URL,
      reuseExistingServer: false,
      timeout: 30_000,
    },
  ],
});
