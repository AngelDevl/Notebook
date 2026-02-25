import { ApiError } from "../Errors/ApiError";
import { API_ERROR_CODES } from "../Errors/ErrorCodes";
import { prisma } from "../utils/prisma";
import tryCatch from "../utils/trycatch";

export const getNotes = tryCatch(async (req, res) => {
  const notes = await prisma.note.findMany();
  res.status(200).json(notes);
});

export const getNote = tryCatch(async (req, res) => {
  const noteId = req.params.id;
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
  const { title, content } = req.body;

  const newNote = await prisma.note.create({
    data: {
      title,
      content,
    },
  });

  res.status(201).json({ note: newNote });
});

export const updateNote = tryCatch(async (req, res) => {
  const noteId = req.params.id;
  const { title, content } = req.body;

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
  const noteId = req.params.id;
  await prisma.note.delete({
    where: { id: String(noteId) },
  });

  res.status(202).json({ deleted: true });
});
