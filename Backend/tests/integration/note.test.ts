import { ApiError } from "../../src/errors/ApiError";
import { prisma } from "../../src/lib/prisma";
import * as noteService from "../../src/services/note.service";
import { mockNoteData } from "../data/note.data";
import { Note } from "@prisma/client";

let notes: Note[];
const NON_EXISTENT_ID = "non_existent_uuid";

afterAll(async () => {
  await prisma.note.deleteMany();
  await prisma.$disconnect();
});

describe("Note data service", () => {
  beforeEach(async () => {
    await prisma.note.deleteMany();
    notes = await prisma.note.createManyAndReturn({ data: mockNoteData });
  });

  it("createNote - Should create a note", async () => {
    const data = {
      title: "Test",
      content: "Content",
    };
    const createdNote = await noteService.createNote(data);
    expect(createdNote.title).toBe(data.title);
    expect(createdNote.content).toBe(data.content);
  });

  it("updateNote - Should throw an exception when id not exists", async () => {
    const data = {
      noteId: NON_EXISTENT_ID,
      title: "New Title",
      content: "New Content",
    };
    await expect(noteService.updateNote(data)).rejects.toThrow(ApiError);
  });

  it("updateNote - Should update the note with the given id", async () => {
    const noteId = notes[0].id;
    const data = {
      noteId: noteId,
      title: "New Title",
      content: "New Content",
    };

    const updatedNote = await noteService.updateNote(data);
    expect(updatedNote.id).toEqual(data.noteId);
    expect(updatedNote.title).toEqual(data.title);
    expect(updatedNote.content).toEqual(data.content);
  });

  it("getNotes - Should return all the notes in the database", async () => {
    const notes = await noteService.getNotes();
    const selectedNotes = await prisma.note.findMany();
    expect(notes).toEqual(selectedNotes);
  });

  it("getNote - Should throw an exception when id not exists", async () => {
    await expect(noteService.getNote(NON_EXISTENT_ID)).rejects.toThrow(
      ApiError,
    );
  });

  it("getNote - Should return a note with the given id", async () => {
    const noteId = notes[0].id;
    const selectedNote = await prisma.note.findUnique({
      where: { id: noteId },
    });
    const note = await noteService.getNote(noteId);
    expect(note).toEqual(selectedNote);
  });

  it("deleteNote - Should throw an exception when id not exists", async () => {
    await expect(noteService.deleteNote(NON_EXISTENT_ID)).rejects.toThrow(
      ApiError,
    );
  });

  it("deleteNote - Should delete a note and return it", async () => {
    const firstNote = notes[1];
    const note = await noteService.deleteNote(firstNote.id);
    expect(note).toEqual(firstNote);
  });
});

describe("Should handle create-update-delete flow", () => {
  let newNote: Note;

  it("createNote - Should create a note", async () => {
    const data = {
      title: "My Test",
      content: "My Content",
    };
    newNote = await noteService.createNote(data);
    console.log(newNote);
    expect(newNote.title).toBe(data.title);
    expect(newNote.content).toBe(data.content);
  });

  it("updateNote - Should update the note with the given id", async () => {
    const data = {
      noteId: newNote.id,
      title: "New Title",
      content: "New Content",
    };

    const updatedNote = await noteService.updateNote(data);
    expect(updatedNote.id).toEqual(data.noteId);
    expect(updatedNote.title).toEqual(data.title);
    expect(updatedNote.content).toEqual(data.content);
  });

  it("deleteNote - Should delete a note and return it", async () => {
    const deletedNote = await noteService.deleteNote(newNote.id);
    expect(deletedNote).toEqual(newNote);
  });

  it("deleteNote - Should check that the note is actually deleted", async () => {
    await expect(noteService.getNote(newNote.id)).rejects.toThrow(ApiError);
  });
});
