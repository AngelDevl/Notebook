import express from "express";
import notesRouter from "./notes.route";
import apiLimiter from "../middleware/apiLimiter";

const apiRouter = express.Router();

apiRouter.use(apiLimiter);
apiRouter.use("/notes", notesRouter);

export default apiRouter;
