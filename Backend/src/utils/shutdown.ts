import { Server } from "node:http";
import logger from "./logger.js";

  const shutdown = (server: Server) => {
    if (server) {
      server.close(() => {
        logger.info("Server closed");
        process.exit(1);
      });

      setTimeout(() => {
        logger.error("Forcing shutdown");
        process.exit(1);
      }, 10000);
    } else {
      process.exit(1);
    }
  };

  export default shutdown