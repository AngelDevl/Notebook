import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError";
import { mapPrismaError } from "../utils/mapPrismaError";
import logger from "../utils/logger";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error({
    method: req.method,
    url: req.originalUrl,
    message: error.message,
  });

  logger.error(error.stack)

  const prismaError = mapPrismaError(error);
  if (prismaError) {
    return res.status(prismaError.statusCode).json({
      success: false,
      error: {
        code: prismaError.errorCode,
        message:
          process.env.NODE_ENV === "production"
            ? "Unknown error"
            : prismaError.message,
      },
    });
  }

  if (error instanceof ApiError) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: {
        code: error.errorCode,
        message: error.message,
      },
    });
  }

  return res.status(error.statusCode || 500).json({
    success: false,
    error: {
      message:
        process.env.NODE_ENV === "production"
          ? "An internal server error occurred."
          : error.message || "Unknown error",
      ...(process.env.NODE_ENV !== "production" && { stack: error.stack }),
    },
  });
};

export default errorHandler;
