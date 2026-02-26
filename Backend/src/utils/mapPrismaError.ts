import { ApiError } from "../errors/ApiError";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { API_ERROR_CODES } from "../errors/ErrorCodes";

export const mapPrismaError = (err: unknown): ApiError | null => {
  if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2025":
        return new ApiError(API_ERROR_CODES.NOT_FOUND, "Record not found", 404);

      default:
        return new ApiError(API_ERROR_CODES.DB_ERROR, "Database error", 400);
    }
  }

  if (err instanceof PrismaClientValidationError) {
    return new ApiError(
      API_ERROR_CODES.QUERY_ERROR,
      "Invalid database query",
      400,
    );
  }

  if (err instanceof PrismaClientInitializationError) {
    return new ApiError(
      API_ERROR_CODES.DB_CONNECTION_ERROR,
      "Database connection failed",
      503,
    );
  }

  return null;
};
