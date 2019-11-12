import { Request, Response, NextFunction, Router } from "express";
import { controller, use, catchAsync, post, get } from "../decorators";
import { Users } from "../models/Users";
import { AppError } from "./../utils/appError";
import { bodyValidator } from "../middlewares/bodyValidator";
import { QueryHandling } from "./../utils/queryHandling";
import { requireAuth } from "../middlewares/requireAuth";

export const authRoute = Router();

// commented out password in user model
@controller("/auth", authRoute)
class UserController {
  @post("/login")
  @use(bodyValidator("email", "password"))
  @catchAsync
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    // Password by default is not selected
    const user = await Users.findOne({ email }).select("+password");

    // Verify user exist and password is correct
    if (
      !user ||
      (user.password && !(await user.checkPassword(password, user.password)))
    )
      return next(
        new AppError("Invalid email or password. Please try again.", 401)
      );

    if (!user.active) {
      // If user's account has been deactivated, reactivate it.
      user.active = true;
      await user.save();
    }

    // remove users password from response
    user.password = undefined;

    // Add to session
    if (req.session) {
      req.session.loggedIn = true;
      req.session.user = user;
    }

    res.status(200).json(user);
  }

  @get("/logout")
  async logout(req: Request, res: Response, next: NextFunction) {
    if (req.session)
      req.session.destroy((err: Error) => {
        if (err) return next(err);
        res.clearCookie("sid");
        res.status(200).send("User logged out");
      });
  }
}
