import pino from "pino";

const logger = pino({
  level: process.env.NODE_ENV === "development" ? "debug" : "silent",
  transport:
    process.env.NODE_ENV !== "production"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        }
      : undefined,
});

export default logger;
