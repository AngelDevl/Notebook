import { Request, Response, NextFunction } from "express";
import { RequestHandler, RequestHandlerAsync } from "../types/controller.types";

const tryCatch = (controller: RequestHandler | RequestHandlerAsync) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default tryCatch;
