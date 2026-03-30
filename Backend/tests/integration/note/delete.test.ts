import { prisma } from "../../../src/lib/prisma.js";
import {
  mockNoteData,
  NON_EXISTENT_ID,
  NON_EXISTENT_UUID,
} from "../../data/note.data.js";
import { Note } from "@prisma/client";
import api from "../../helpers/note.helper.js";
import { StatusCodes } from "http-status-codes";

let notes: Note[];

afterAll(async () => {
  await prisma.note.deleteMany();
});

describe("Note - Route testing", () => {
  beforeEach(async () => {
    await prisma.note.deleteMany();
    notes = await prisma.note.createManyAndReturn({ data: mockNoteData });
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