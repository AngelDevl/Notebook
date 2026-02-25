import { Request, Response, NextFunction } from "express";
import { AsyncController, Controller } from "../types/controller.types";

const tryCatch = (controller: Controller | AsyncController) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default tryCatch;
