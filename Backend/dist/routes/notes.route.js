"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notes_controller_1 = require("../controllers/notes.controller");
const notesRouter = express_1.default.Router();
notesRouter.get("/notes", notes_controller_1.getNotes);
notesRouter.get("/notes/:id", notes_controller_1.getNote);
notesRouter.post("/notes", notes_controller_1.createNote);
notesRouter.put("/notes/:id", notes_controller_1.updateNote);
notesRouter.delete("/notes/:id", notes_controller_1.deleteNote);
exports.default = notesRouter;
