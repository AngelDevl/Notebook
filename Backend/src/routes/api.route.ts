import express from "express";
import notesRouter from "./notes.route.js";
import apiLimiter from "../middleware/apiLimiter.js";

const apiRouter = express.Router();

apiRouter.use(apiLimiter);
apiRouter.use("/notes", notesRouter);

export default apiRouter;
