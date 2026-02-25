import express from "express";
import { config } from "dotenv";
import { prisma } from "./utils/prisma";
import errorHandler from "./utils/errorHandler";
import apiRouter from "./routes/api.route";

config({ path: "../.env" });

const app = express();
const PORT = process.env.EXPRESS_API_PORT || 4000;

app.use(express.json());

app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.send("ok");
  } catch (error) {
    res.send("not ok");
  }
});

app.use("/app/api", apiRouter);

app.use(errorHandler as express.ErrorRequestHandler);

app.use("*path", (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => console.log(`Server is listening to port: ${PORT}`));
