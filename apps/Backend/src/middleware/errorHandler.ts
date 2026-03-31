import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError.js";
import { mapPrismaError } from "../utils/mapPrismaError.js";
import logger from "../utils/logger.js";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { ApiReasonPhrases } from "../errors/ErrorCodes.js";

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

  logger.error(error.stack);

  const prismaError = mapPrismaError(error);
  if (prismaError) {
    return res.status(prismaError.statusCode).json({
      success: false,
      error: {
        message:
          process.env.NODE_ENV === "production"
            ? ApiReasonPhrases.UNKNOWN_ERROR
            : prismaError.message,
      },
    });
  }

  if (error instanceof ApiError) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        error: {
          message: error.message,
        },
      });
  }

  return res
    .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
      success: false,
      error: {
        message:
          process.env.NODE_ENV === "production"
            ? ReasonPhrases.INTERNAL_SERVER_ERROR
            : error.message || ApiReasonPhrases.UNKNOWN_ERROR,
        ...(process.env.NODE_ENV !== "production" && { stack: error.stack }),
      },
    });
};

export default errorHandler;
