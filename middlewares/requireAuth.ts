import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.session && req.session.loggedIn) {
    return next();
  }

  return next(
    new AppError("You are not logged in! Please log in to gain access.", 403)
  );
}
