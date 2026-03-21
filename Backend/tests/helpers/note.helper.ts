import request from "supertest";
import http from "http";
import app from "../../src/app.js";
import { NoteData } from "../../src/types/note.types.js";

export const server = http.createServer(app);

const api = {
  getNotes: () => request(server).get(`/app/api/notes`),
  getNote: (id: string) => request(server).get(`/app/api/notes/${id}`),
  createNote: (body: NoteData) =>
    request(server).post(`/app/api/notes`).send(body),
  updateNote: (body: NoteData, id: string) =>
    request(server).put(`/app/api/notes/${id}`).send(body),
  deleteNote: (id: string) => request(server).delete(`/app/api/notes/${id}`),
};

export default api;
