import "./utils/load.js";

import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "./prisma/schema",
  migrations: {
    path: "./prisma/migrations",
  },
});
