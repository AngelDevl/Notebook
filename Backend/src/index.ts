import express from "express";
import { config } from "dotenv";
import { prisma } from "./utils/prisma";
import errorHandler from "./middleware/errorHandler";
import tryCatch from "./utils/trycatch";
import appRouter from "./routes/app.route";

config({ path: "../.env" });

const app = express();
const PORT = process.env.EXPRESS_API_PORT || 4000;

app.use(express.json());

app.get("/health", tryCatch( async (req, res) => {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ success: true, status: "ok"})
}));

app.use("/app", appRouter);

app.use(errorHandler as express.ErrorRequestHandler);

app.use("*path", (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => console.log(`Server is listening to port: ${PORT}`));
