import { config } from "dotenv";
import { execSync } from "node:child_process";
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: path.resolve(__dirname, "../../../.env.test") });

const globalSetup = async () => {
  execSync("npm run migrate", {
    cwd: path.resolve(__dirname, "../.."),
    stdio: "inherit",
  });
};

export default globalSetup;
