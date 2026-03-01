import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") {
  config({ path: "../.env.development" });
}

import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma";
import errorHandler from "./middleware/errorHandler";
import tryCatch from "./utils/trycatch";
import appRouter from "./routes/app.route";
import registerProcessHandlers from "./utils/processHandler";


import { allowedOrigins, serverPort } from "./config";

const app = express();
const PORT = process.env.EXPRESS_API_PORT || serverPort;

app.use(express.json({ limit: '1mb' }));
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.get(
  "/health",
  tryCatch(async (req, res) => {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ success: true, status: "ok" });
  }),
);

app.use("/app", appRouter);

app.use(errorHandler as express.ErrorRequestHandler);

app.use("*path", (req, res) => {
  res.sendStatus(404);
});

const server = app.listen(PORT, () =>
  console.log(`Server is listening to port: ${PORT}`),
);

registerProcessHandlers(server);
