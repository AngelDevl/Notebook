"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(errorCode, message, statusCode, toPass = null) {
        super(message);
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.toPass = toPass;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
exports.ApiError = ApiError;
