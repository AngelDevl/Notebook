import { StatusCodes } from "http-status-codes";
import * as dataAccess from "../data-access/note.access";
import { ApiError } from "../errors/ApiError";
import { ApiReasonPhrases } from "../errors/ErrorCodes";
import { NoteData, NoteUpdateData } from "../types/note.types";

export const getNotes = async () => {
  return await dataAccess.getNotes();
};

export const getNote = async (noteId: string) => {
  const note = await dataAccess.getNote(noteId);
  if (!note) {
    throw new ApiError(ApiReasonPhrases.NOTE_NOT_FOUND, StatusCodes.NOT_FOUND);
  }

  return note;
};

export const createNote = async (noteData: NoteData) => {
  return await dataAccess.createNote(noteData);
};

export const updateNote = async (noteData: NoteUpdateData) => {
  const existing = await dataAccess.getNote(noteData.id);
  if (!existing) {
    throw new ApiError(ApiReasonPhrases.NOTE_NOT_FOUND, StatusCodes.NOT_FOUND);
  }

  return await dataAccess.updateNote(noteData);
};

export const deleteNote = async (noteId: string) => {
  const existing = await dataAccess.getNote(noteId);
  if (!existing) {
    throw new ApiError(ApiReasonPhrases.NOTE_NOT_FOUND, StatusCodes.NOT_FOUND);
  }

  return await dataAccess.deleteNote(noteId);
};
