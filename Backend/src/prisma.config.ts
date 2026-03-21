import { defineConfig } from "prisma/config";

import loadEnv from "./utils/loadEnv.js";
import path from "node:path";

loadEnv(path.join(process.cwd(), ".."));

export default defineConfig({
  schema: "./prisma/schema",
  migrations: {
    path: "./prisma/migrations",
  },
});
