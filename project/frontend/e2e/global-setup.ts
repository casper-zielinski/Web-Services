import { execSync } from "child_process";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(import.meta.dirname, "../.env") });

const BACKEND_DIR = path.resolve(import.meta.dirname, "../../backend");
const TEST_DB_URL = process.env.TEST_DB_URL!;

export default async function globalSetup() {
  console.log("\n[global-setup] Pushing schema to test database...");
  execSync("npx drizzle-kit push --yes 2>&1 || npx drizzle-kit push", {
    cwd: BACKEND_DIR,
    env: { ...process.env, DATABASE_URL: TEST_DB_URL },
    stdio: "inherit",
  });
  console.log("[global-setup] Test database ready.\n");
}
