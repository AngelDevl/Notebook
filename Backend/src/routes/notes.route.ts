import express from "express";
import {
  deleteNote,
  getNote,
  getNotes,
  createNote,
  updateNote,
} from "../controllers/notes.controller";

const notesRouter = express.Router();

notesRouter.get("/", getNotes);
notesRouter.get("/:id", getNote);

notesRouter.post("/", createNote);

notesRouter.put("/:id", updateNote);

notesRouter.delete("/:id", deleteNote);

export default notesRouter;
