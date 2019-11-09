import { Request, Response, NextFunction, Router } from "express";
import { controller, use, catchAsync, post, get } from "../decorators";
import { Users } from "../models/Users";
import { bodyValidator } from "../middlewares/bodyValidator";

export const userRoute = Router();

// commented out password in user model
@controller("/user", userRoute)
class UserController {
	@post("/register")
	@use(bodyValidator("firstName", "lastName", "email"))
	// @catchAsync
	public async registerUser(req: Request, res: Response, next: NextFunction) {
		const { firstName, lastName, email } = req.body;
		const newUser = await Users.create({ firstName, lastName, email });

		// remove password from json output;
		newUser.password = undefined;

		// need to send an email with default password of user
		// password must only be seen by the user and not the admin that registered user
		res.status(201).json(newUser);
	}
}
