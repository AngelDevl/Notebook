import { config } from "dotenv";
import { execSync } from "node:child_process";
import path from "node:path";

config({ path: path.resolve(__dirname, "../../../.env.test") });

const globalSetup = async () => {
  execSync("npm run migrate", {
    cwd: path.resolve(__dirname, "../.."),
    stdio: "inherit",
  });
};

export default globalSetup;
