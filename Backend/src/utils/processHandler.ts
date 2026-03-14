import { Server } from "node:http";
import logger from "./logger";
import shutdown from "./shutdown";

const registerProcessHandlers = (server: Server) => {
  process.on("unhandledRejection", (reason: unknown) => {
    logger.fatal({ err: reason }, "Unhandled Rejection");
    shutdown(server);
  });

  process.on("uncaughtException", (error: Error) => {
    logger.fatal({ err: error }, "Uncaught Exception");
    shutdown(server);
  });
};

export default registerProcessHandlers;
