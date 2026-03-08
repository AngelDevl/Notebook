import loadEnv from "../src/utils/loadEnv.js";
import path from "node:path";

loadEnv(path.join(process.cwd(), ".."));

import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma.js";
import errorHandler from "./middleware/errorHandler.js";
import tryCatch from "./utils/trycatch.js";
import appRouter from "./routes/app.route.js";
import registerProcessHandlers from "./utils/processHandler.js";

import { ServerConfig } from "./config.js";
import { StatusCodes } from "http-status-codes";

const app = express();
const PORT = process.env.EXPRESS_API_PORT || ServerConfig.port;

app.use(express.json({ limit: "1mb" }));
app.use(
  cors({
    origin: ServerConfig.allowedOrigins,
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
  res.sendStatus(StatusCodes.NOT_FOUND);
});

const server = app.listen(PORT, () =>
  console.log(`Server is listening to port: ${PORT}`),
);

registerProcessHandlers(server);
