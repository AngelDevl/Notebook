"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notes_controller_1 = require("../controllers/notes.controller");
const notesRouter = express_1.default.Router();
notesRouter.get("/", notes_controller_1.getNotes);
notesRouter.get("/:id", notes_controller_1.getNote);
notesRouter.post("/", notes_controller_1.createNote);
notesRouter.put("/:id", notes_controller_1.updateNote);
notesRouter.delete("/:id", notes_controller_1.deleteNote);
exports.default = notesRouter;
