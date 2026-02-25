"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = require("../Errors/ApiError");
// Error handler with types for Request and Response
const errorHandler = (error, req, res, next) => {
    console.error(`Error occurred on ${req.method} ${req.originalUrl}:`, error);
    // Handle ApiError instances
    if (error instanceof ApiError_1.ApiError) {
        const statusCode = error.statusCode || 500;
        const response = {
            success: false,
            error: {
                code: error.errorCode,
                message: error.message
            }
        };
        // Only include additional data in development environment
        if (process.env.NODE_ENV !== 'production' && error.toPass) {
            response.error['details'] = error.toPass;
        }
        return res.status(statusCode).json(response);
    }
    // For all other types of errors
    console.log(error.message);
    const statusCode = error.statusCode || 500;
    const errorResponse = {
        success: false,
        error: {
            message: process.env.NODE_ENV === 'production'
                ? "An internal server error occurred."
                : error.message || "Unknown error"
        }
    };
    // Add stack trace in development
    if (process.env.NODE_ENV !== 'production') {
        errorResponse.error['stack'] = error.stack;
    }
    res.status(statusCode).json(errorResponse);
};
exports.default = errorHandler;
