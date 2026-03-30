import { prisma } from "../../../src/lib/prisma.js";
import {
  mockNoteData,
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

  it("GET /notes - should get all the notes", async () => {
    const res = await api.getNotes();

    expect(res.status).toBe(StatusCodes.OK);
    expect(res.body.length).toBe(mockNoteData.length);
  });
});
