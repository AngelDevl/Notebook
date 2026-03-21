import { NoteData } from "../../src/types/note.types.js";
import NoteBuilder from "../builders/note.builder.js";

export const mockNoteData: NoteData[] = [
  new NoteBuilder("Hello World", "This is my first Hello World").build(),
  new NoteBuilder("Test test", "This is my first test").build(),
  new NoteBuilder("Node of a tree", "The root of a tree").build(),
];

export const NON_EXISTENT_ID = "non_existent_uuid";
export const NON_EXISTENT_UUID = "e0233c7f-eec8-47d5-aaa1-a2fe11585be5";
