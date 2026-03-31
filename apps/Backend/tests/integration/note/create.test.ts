import { prisma } from "../../../src/lib/prisma.js";
import NoteBuilder from "../../builders/note.builder.js";
import { mockNoteData } from "../../data/note.data.js";
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

  it("POST /note - should create a new note", async () => {
    const newNote = new NoteBuilder("My New Title", "My New Content").build();
    const res = await api.createNote(newNote);

    expect(res.status).toBe(StatusCodes.CREATED);
    expect(res.body.note.title).toEqual(newNote.title);
    expect(res.body.note.content).toEqual(newNote.content);
  });

  it("POST /note - should return title length error", async () => {
    const newNote: NoteData = new NoteBuilder("", "My New Content").build();
    const res = await api.createNote(newNote);

    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body.error.message).toContain("title");
  });

  it("POST /note - should return id not allowed", async () => {
    const newNote = new NoteBuilder("My New Title", "My New Content")
      .setId("new-id")
      .build();
    const res = await api.createNote(newNote);

    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body.error.message).toContain("id");
  });
});
