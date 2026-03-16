import { defineConfig } from "prisma/config";

import loadEnv from "./utils/loadEnv";
import path from "node:path";

loadEnv(path.join(process.cwd(), ".."));

export default defineConfig({
  schema: "./prisma/schema",
  migrations: {
    path: "./prisma/migrations",
  },
});
