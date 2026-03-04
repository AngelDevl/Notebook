export class ApiError extends Error {
  statusCode: number;
  toPass: any;

  constructor(
    message: string,
    statusCode: number,
    toPass: any = null,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.toPass = toPass;

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
