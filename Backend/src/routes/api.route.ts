import express from "express";
import notesRouter from "./notes.route";

const apiRouter = express.Router();

apiRouter.use("/notes", notesRouter);

export default apiRouter;
