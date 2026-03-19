import { prisma } from "../lib/prisma";
import { NoteData, NoteUpdateData } from "../types/note.types";

export const getNotes = async () => {
  return await prisma.note.findMany();
};

export const getNote = async (noteId: string) => {
  return await prisma.note.findUnique({
    where: { id: String(noteId) },
  });
};

export const createNote = async (noteData: NoteData) => {
  return await prisma.note.create({
    data: noteData,
  });
};

export const updateNote = async (noteData: NoteUpdateData) => {
  return await prisma.note.update({
    where: { id: String(noteData.id) },
    data: {
      ...(noteData.title && { title: noteData.title }),
      ...(noteData.content && { content: noteData.content }),
    },
  });
};

export const deleteNote = async (noteId: string) => {
  return await prisma.note.delete({
    where: { id: String(noteId) },
  });
};
