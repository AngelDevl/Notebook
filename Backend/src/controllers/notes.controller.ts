import Joi from "joi";
import { ApiError } from "../Errors/ApiError";
import { API_ERROR_CODES } from "../Errors/ErrorCodes";
import { prisma } from "../utils/prisma";
import tryCatch from "../utils/trycatch";
import {
  createNoteSchema,
  updateNoteSchema,
  uuidSchema,
} from "../joi/joi.schema.note";

export const getNotes = tryCatch(async (req, res) => {
  const notes = await prisma.note.findMany();
  res.status(200).json(notes);
});

export const getNote = tryCatch(async (req, res) => {
  const { value, error } = uuidSchema.validate({ uuid: req.params.id });
  if (error) {
    throw new ApiError(
      API_ERROR_CODES.BAD_PARAMS,
      error.details.map((err) => err.message).join(", "),
      400,
    );
  }

  const { uuid: noteId } = value;
  const note = await prisma.note.findUnique({
    where: { id: String(noteId) },
  });

  if (!note) {
    throw new ApiError(
      API_ERROR_CODES.NOTE_NOT_EXISTS,
      `Note with id: ${noteId}, not found`,
      404,
    );
  }

  res.json({ note: note });
});

export const createNote = tryCatch(async (req, res) => {
  const { value, error } = createNoteSchema.validate(req.body);
  if (error) {
    throw new ApiError(
      API_ERROR_CODES.BAD_REQUEST_BODY,
      error.details.map((err) => err.message).join(", "),
      400,
    );
  }

  const { title, content } = value;
  const newNote = await prisma.note.create({
    data: {
      title,
      content,
    },
  });

  res.status(201).json({ note: newNote });
});

export const updateNote = tryCatch(async (req, res) => {
  const data = {
    uuid: req.params.id,
    ...req.body,
  };

  const { value, error } = updateNoteSchema.validate(data);
  if (error) {
    throw new ApiError(
      API_ERROR_CODES.BAD_PARAMS,
      error.details.map((err) => err.message).join(", "),
      400,
    );
  }

  const { uuid: noteId, title, content } = value;

  const existing = await prisma.note.findUnique({
    where: { id: String(noteId) },
  });

  if (!existing) {
    throw new ApiError(
      API_ERROR_CODES.BAD_REQUEST,
      `Note with id: ${noteId}, not found`,
      400,
    );
  }
  const updatedNote = await prisma.note.update({
    where: { id: String(noteId) },
    data: {
      ...(title && { title }),
      ...(content && { content }),
    },
  });

  res.json({ note: updatedNote });
});

export const deleteNote = tryCatch(async (req, res) => {
  const { value, error } = uuidSchema.validate({ uuid: req.params.id });
  if (error) {
    throw new ApiError(
      API_ERROR_CODES.BAD_PARAMS,
      error.details.map((err) => err.message).join(", "),
      400,
    );
  }

  const { uuid: noteId } = value;

  await prisma.note.delete({
    where: { id: String(noteId) },
  });

  res.status(202).json({ deleted: true });
});
