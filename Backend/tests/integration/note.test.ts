import { prisma } from "../../src/lib/prisma";
import NoteBuilder from "../builders/note.builder";
import {
  mockNoteData,
  NON_EXISTENT_ID,
  NON_EXISTENT_UUID,
} from "../data/note.data";
import { Note } from "@prisma/client";
import api, { server } from "../helpers/note.helper";
import { StatusCodes } from "http-status-codes";
import { NoteData } from "../../src/types/note.types";

let notes: Note[];

afterAll(async () => {
  await prisma.note.deleteMany();
  await prisma.$disconnect();
  server.close();
});

describe("Note - Route testing", () => {
  beforeEach(async () => {
    await prisma.note.deleteMany();
    notes = await prisma.note.createManyAndReturn({ data: mockNoteData });
  });

  it("GET /notes - should get all the notes", async () => {
    const res = await api.getNotes();

    expect(res.status).toBe(StatusCodes.OK);
    expect(res.body.length).toBe(mockNoteData.length);
  });

  it("GET /note - should get a note with the given id", async () => {
    const note = notes[0];
    const res = await api.getNote(note.id);

    expect(res.status).toBe(StatusCodes.OK);
    expect(res.body.note.id).toEqual(note.id);
  });

  it("GET /note - should return not found", async () => {
    const res = await api.getNote(NON_EXISTENT_UUID);

    expect(res.status).toBe(StatusCodes.NOT_FOUND);
  });

  it("GET /note - should get a UUID format error", async () => {
    const res = await api.getNote(NON_EXISTENT_ID);

    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body.error.message).toContain("uuid");
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

  it("DELETE /note - should delete a note and return deleted", async () => {
    const noteId = notes[0].id;
    const res = await api.deleteNote(noteId);

    expect(res.status).toBe(StatusCodes.ACCEPTED);
    expect(res.body.deleted).toBe(true);
  });

  it("DELETE /note - delete and getNote to prove deleted", async () => {
    const noteId = notes[0].id;
    const res = await api.deleteNote(noteId);

    expect(res.status).toBe(StatusCodes.ACCEPTED);
    expect(res.body.deleted).toBe(true);

    const getRes = await api.getNote(noteId);
    expect(getRes.status).toBe(StatusCodes.NOT_FOUND);
  });

  it("DELETE /note - should get a UUID format error", async () => {
    const res = await api.deleteNote(NON_EXISTENT_ID);

    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body.error.message).toContain("uuid");
  });

  it("DELETE /note - should return not found", async () => {
    const res = await api.deleteNote(NON_EXISTENT_UUID);

    expect(res.status).toBe(StatusCodes.NOT_FOUND);
  });
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
