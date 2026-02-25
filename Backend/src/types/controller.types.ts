import { Request, Response, NextFunction } from "express";

export type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

export type Controller = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;
