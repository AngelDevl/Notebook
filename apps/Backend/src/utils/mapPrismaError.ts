import { ApiError } from "../errors/ApiError.js";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { StatusCodes } from "http-status-codes";
import { InternalDataBaseReasonPhrases } from "../errors/ErrorCodes.js";

export const mapPrismaError = (err: unknown): ApiError | null => {
  if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2025":
        return new ApiError(
          InternalDataBaseReasonPhrases.RECORD_NOT_FOUND,
          StatusCodes.NOT_FOUND,
        );

      default:
        return new ApiError(
          InternalDataBaseReasonPhrases.UNKNOWN_ERROR,
          StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
  }

  if (err instanceof PrismaClientValidationError) {
    return new ApiError(
      InternalDataBaseReasonPhrases.INVALID_QUERY,
      StatusCodes.BAD_REQUEST,
    );
  }

  if (err instanceof PrismaClientInitializationError) {
    return new ApiError(
      InternalDataBaseReasonPhrases.CONNECTION_FAILED,
      StatusCodes.SERVICE_UNAVAILABLE,
    );
  }

  return null;
};
