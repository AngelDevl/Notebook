import { server } from "../helpers/note.helper.js";

afterAll(() => {
  server.close();
});
