import { Request, Response, NextFunction } from "express";

export type RequestHandlerAsync = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

export type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;
