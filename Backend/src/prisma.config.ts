import { defineConfig } from "prisma/config";

import { config } from "dotenv";

const envFile =
  process.env.NODE_ENV === "production" ? "../.env" : "../.env.example";

config({ path: envFile });

export default defineConfig({
  schema: "./prisma/schema",
  migrations: {
    path: "./prisma/migrations",
  },
});
