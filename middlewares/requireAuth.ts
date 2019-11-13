import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import { Users } from "../models/Users";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (req.session && req.session.loggedIn && req.session.userId) {
    // need to select password changed at otherwise method changedPasswordAfter wont see it
    const user = await Users.findById(req.session.userId).select(
      "+passwordChangedAt"
    );
    if (user && !user.changedPasswordAfter(req.session.date)) return next();
  }
  // This to logout / destroy session of any users logged in when password was changed
  if (req.session) {
    req.session.destroy((err: Error) => {
      if (err) return next(err);
      res.clearCookie("sid");
    });
  }
  return next(
    new AppError("You are not logged in! Please log in to gain access.", 403)
  );
}
