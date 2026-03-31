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
});
