import "./utils/load.js"

import registerProcessHandlers from "./utils/processHandler.js";

import { ServerConfig } from "./config.js";
import app from "./app.js";

const PORT = process.env.EXPRESS_API_PORT || ServerConfig.port;

const server = app.listen(PORT, () =>
  console.log(`Server is listening to port: ${PORT}`),
);

registerProcessHandlers(server);
