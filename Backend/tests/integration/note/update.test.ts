import { prisma } from "../../../src/lib/prisma.js";
import NoteBuilder from "../../builders/note.builder.js";
import {
  mockNoteData,
  NON_EXISTENT_ID,
  NON_EXISTENT_UUID,
} from "../../data/note.data.js";
import { Note } from "@prisma/client";
import api from "../../helpers/note.helper.js";
import { StatusCodes } from "http-status-codes";
import { NoteData } from "../../../src/types/note.types.js";

let notes: Note[];

afterAll(async () => {
  await prisma.note.deleteMany();
});

describe("Note - Route testing", () => {
  beforeEach(async () => {
    await prisma.note.deleteMany();
    notes = await prisma.note.createManyAndReturn({ data: mockNoteData });
  });

  it("PUT /note - should update the content and the title", async () => {
    const noteId = notes[1].id;
    const newNote: NoteData = new NoteBuilder(
      "My New Title",
      "My New Content",
    ).build();

    const res = await api.updateNote(newNote, noteId);

    expect(res.status).toBe(StatusCodes.ACCEPTED);
    expect(res.body.note.id).toEqual(noteId);
    expect(res.body.note.title).toEqual(newNote.title);
    expect(res.body.note.content).toEqual(newNote.content);
  });

  it("PUT /note - should return title length error", async () => {
    const noteId = notes[1].id;
    const newNote: NoteData = new NoteBuilder("", "My New Content").build();

    const res = await api.updateNote(newNote, noteId);

    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body.error.message).toContain("title");
  });

  it("PUT /note - should return not found", async () => {
    const newNote: NoteData = new NoteBuilder(
      "My New Title",
      "My New Content",
    ).build();

    const res = await api.updateNote(newNote, NON_EXISTENT_UUID);

    expect(res.status).toBe(StatusCodes.NOT_FOUND);
  });

  it("PUT /note - should get a UUID format error", async () => {
    const newNote: NoteData = new NoteBuilder(
      "My New Title",
      "My New Content",
    ).build();

    const res = await api.updateNote(newNote, NON_EXISTENT_ID);

    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body.error.message).toContain("uuid");
  });
});