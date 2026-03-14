import { prismaMock } from "../src/lib/jest.setup";
import * as noteService from "../src/services/note.service";
import { ApiError } from "../src/errors/ApiError";

describe("Note Service Integration (Mocked DB)", () => {
  beforeAll(() => {});

  describe("getNote", () => {
    it("Should return a note if exists", async () => {
      const mockNote = {
        id: "uuid-123",
        title: "Test Note",
        content: "Hello",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prismaMock.note.findUnique as any).mockResolvedValue(mockNote);

      const result = await noteService.getNote(mockNote.id);
      expect(result).toEqual(mockNote);
      expect(prismaMock.note.findUnique).toHaveBeenCalledWith({
        where: { id: mockNote.id },
      });
    });

    it("Should throw an ApiError if not exists", async () => {
      (prismaMock.note.findUnique as any).mockResolvedValue(null);
      await expect(noteService.getNote("non-existent-uuid")).rejects.toThrow(
        ApiError,
      );
    });
  });
});
