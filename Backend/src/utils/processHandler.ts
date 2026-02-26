import logger from "./logger";

const registerProcessHandlers = (server: any) => {
  const shutdown = () => {
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

  process.on("unhandledRejection", (reason: unknown) => {
    logger.fatal({ err: reason }, "Unhandled Rejection");
    shutdown();
  });

  process.on("uncaughtException", (error: Error) => {
    logger.fatal({ err: error }, "Uncaught Exception");
    shutdown();
  });
};

export default registerProcessHandlers;
