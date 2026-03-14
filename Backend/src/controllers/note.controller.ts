import { ApiError } from "../errors/ApiError";
import tryCatch from "../utils/trycatch";
import {
  createNoteSchema,
  updateNoteSchema,
  uuidSchema,
} from "../joi/joi.schema.note.js";
import { StatusCodes } from "http-status-codes";
import * as noteService from "../services/note.service.js";

export const getNotes = tryCatch(async (req, res) => {
  const notes = await noteService.getNotes();
  res.status(StatusCodes.OK).json(notes);
});

export const getNote = tryCatch(async (req, res) => {
  const noteId = req.params.id;
  const { value, error } = uuidSchema.validate({ uuid: noteId });
  if (error) {
    throw new ApiError(
      error.details.map((err) => err.message).join(", "),
      StatusCodes.BAD_REQUEST,
    );
  }

  const note = await noteService.getNote(noteId as string);

  res.status(StatusCodes.OK).json({ note: note });
});

export const createNote = tryCatch(async (req, res) => {
  const { value, error } = createNoteSchema.validate(req.body);
  if (error) {
    throw new ApiError(
      error.details.map((err) => err.message).join(", "),
      StatusCodes.BAD_REQUEST,
    );
  }

  const { title, content } = value;
  const newNote = await noteService.createNote({ title, content });

  res.status(StatusCodes.CREATED).json({ note: newNote });
});

export const updateNote = tryCatch(async (req, res) => {
  const data = {
    uuid: req.params.id,
    ...req.body,
  };

  const { value, error } = updateNoteSchema.validate(data);
  if (error) {
    throw new ApiError(
      error.details.map((err) => err.message).join(", "),
      StatusCodes.BAD_REQUEST,
    );
  }

  const { uuid: noteId, title, content } = value;

  const updatedNote = await noteService.updateNote({ noteId, title, content });

  res.status(StatusCodes.ACCEPTED).json({ note: updatedNote });
});

export const deleteNote = tryCatch(async (req, res) => {
  const noteId = req.params.id;
  const { value, error } = uuidSchema.validate({ uuid: noteId });
  if (error) {
    throw new ApiError(
      error.details.map((err) => err.message).join(", "),
      StatusCodes.BAD_REQUEST,
    );
  }

  await noteService.deleteNote(noteId as string);

  res.status(StatusCodes.ACCEPTED).json({ deleted: true });
});
