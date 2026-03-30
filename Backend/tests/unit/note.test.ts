import { prisma } from "../../src/lib/prisma.js";
import NoteBuilder from "../builders/note.builder.js";
import { Note } from "@prisma/client";
import api from "../helpers/note.helper.js";
import { StatusCodes } from "http-status-codes";
import { NoteData } from "../../src/types/note.types.js";


afterAll(async () => {
  await prisma.note.deleteMany();
});

describe("Note flow - Route testing", () => {
  beforeAll(async () => {
    await prisma.note.deleteMany();
  });

  let note: Note;

  it("Create a note", async () => {
    const newNote = new NoteBuilder("My New Title", "My New Content").build();
    const res = await api.createNote(newNote);

    expect(res.status).toBe(StatusCodes.CREATED);
    expect(res.body.note.title).toEqual(newNote.title);
    expect(res.body.note.content).toEqual(newNote.content);

    note = res.body.note;
  });

  it("Get all the notes", async () => {
    const res = await api.getNotes();

    expect(res.status).toBe(StatusCodes.OK);
    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: note.id })]),
    );
  });

  it("Get a note", async () => {
    const res = await api.getNote(note.id);

    expect(res.status).toBe(StatusCodes.OK);
    expect(res.body.note.id).toEqual(note.id);
  });

  it("Update a note", async () => {
    const newNote: NoteData = new NoteBuilder(
      "My New Title",
      "My New Content",
    ).build();

    const res = await api.updateNote(newNote, note.id);

    expect(res.status).toBe(StatusCodes.ACCEPTED);
    expect(res.body.note.id).toEqual(note.id);
    expect(res.body.note.title).toEqual(newNote.title);
    expect(res.body.note.content).toEqual(newNote.content);
  });

  it("Delete a note", async () => {
    const res = await api.deleteNote(note.id);

    expect(res.status).toBe(StatusCodes.ACCEPTED);
    expect(res.body.deleted).toBe(true);
  });
});
