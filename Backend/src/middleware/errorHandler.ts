import { Request, Response, NextFunction } from "express";
import { ApiError } from "../Errors/ApiError";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { mapPrismaError } from "../utils/mapPrismaError";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(`Error occurred on ${req.method} ${req.originalUrl}:`, error);

  const prismaError = mapPrismaError(error);
  if (prismaError) {
    return res.status(prismaError.statusCode).json({
      success: false,
      error: {
        code: prismaError.errorCode,
        message:
          process.env.NODE_ENV == "production"
            ? "Unknown error"
            : prismaError.message,
      },
    });
  }

  if (error instanceof ApiError) {
    const statusCode = error.statusCode || 500;
    const response: any = {
      success: false,
      error: {
        code: error.errorCode,
        message: error.message,
      },
    };

    if (process.env.NODE_ENV !== "production" && error.toPass) {
      response.error["details"] = error.toPass;
    }

    return res.status(statusCode).json(response);
  } else if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
    }
  }

  console.log(error.message);
  const statusCode = error.statusCode || 500;
  const errorResponse: any = {
    success: false,
    error: {
      message:
        process.env.NODE_ENV === "production"
          ? "An internal server error occurred."
          : error.message || "Unknown error",
    },
  };

  if (process.env.NODE_ENV !== "production") {
    errorResponse.error["stack"] = error.stack;
  }

  res.status(statusCode).json(errorResponse);
};

export default errorHandler;
