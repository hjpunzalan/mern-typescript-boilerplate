import { NextFunction, RequestHandler, Request, Response } from "express";
import { AppError } from "./../utils/appError";

// BodyValidator middleware
export function bodyValidator(...keys: string[]): RequestHandler {
  return function(req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      next(new AppError("Invalid Request", 422));
    }

    for (let key of keys) {
      if (!req.body[key]) {
        return next(new AppError(`Missing ${key}!`, 422));
      }
    }
    next();
  };
}
