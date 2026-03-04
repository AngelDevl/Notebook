import { ApiError } from "../errors/ApiError";
import { ApiReasonPhrases } from "../errors/ErrorCodes";
import { prisma } from "../lib/prisma";
import tryCatch from "../utils/trycatch";
import { createNoteSchema, updateNoteSchema } from "../joi/joi.schema.note";
import { StatusCodes } from "http-status-codes";

export const getNotes = tryCatch(async (req, res) => {
  const notes = await prisma.note.findMany();
  res.status(StatusCodes.OK).json(notes);
});

export const getNote = tryCatch(async (req, res) => {
  const noteId = req.params.id;
  const note = await prisma.note.findUnique({
    where: { id: String(noteId) },
  });

  if (!note) {
    throw new ApiError(ApiReasonPhrases.NOTE_NOT_FOUND, StatusCodes.NOT_FOUND);
  }

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
  const newNote = await prisma.note.create({
    data: {
      title,
      content,
    },
  });

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

  const existing = await prisma.note.findUnique({
    where: { id: String(noteId) },
  });

  if (!existing) {
    throw new ApiError(ApiReasonPhrases.NOTE_NOT_FOUND, StatusCodes.NOT_FOUND);
  }
  const updatedNote = await prisma.note.update({
    where: { id: String(noteId) },
    data: {
      ...(title && { title }),
      ...(content && { content }),
    },
  });

  res.status(StatusCodes.ACCEPTED).json({ note: updatedNote });
});

export const deleteNote = tryCatch(async (req, res) => {
  const noteId = req.params.id;
  await prisma.note.delete({
    where: { id: String(noteId) },
  });

  res.status(StatusCodes.ACCEPTED).json({ deleted: true });
});
