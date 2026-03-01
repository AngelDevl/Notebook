import express from "express";
import rateLimit from "express-rate-limit";
import notesRouter from "./notes.route";
import { rateLimitConfig } from "../config";

const apiRouter = express.Router();

const limiter = rateLimit({
    windowMs: rateLimitConfig.windowMs,
    max: rateLimitConfig.maxRequests,
    message: "Too many requests, please try again later."
})

apiRouter.use(limiter);
apiRouter.use("/notes", notesRouter);

export default apiRouter;
