import { defineConfig } from "prisma/config";

import { config } from "dotenv";

config({ path: "../.env" });

export default defineConfig({
  schema: "./prisma/schema",
  migrations: {
    path: "./prisma/migrations",
  },
});
