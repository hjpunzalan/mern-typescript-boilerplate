import { Request, Response, NextFunction, Router } from "express";
import { controller, use, catchAsync, post, get } from "../decorators";
import { Users } from "../models/Users";
import { bodyValidator } from "../middlewares/bodyValidator";
import { QueryHandling } from "./../utils/queryHandling";

export const authRoute = Router();

// commented out password in user model
@controller("/auth", authRoute)
class UserController {
	@post("/register")
	@use(bodyValidator("firstName", "lastName", "email"))
	@catchAsync
	async registerUser(req: Request, res: Response, next: NextFunction) {
		const { firstName, lastName, email, password } = req.body;
		const newUser = await Users.create({
			firstName,
			lastName,
			email,
			password
		});

		// remove password from json output;
		newUser.password = undefined;

		// need to send an email with default password of user
		// password must only be seen by the user and not the admin that registered user
		res.status(201).json(newUser);
	}

	@get("/")
	@catchAsync
	async getAllUsers(req: Request, res: Response, next: NextFunction) {
		//add queryHandling
		const query = Users.find();
		const features = new QueryHandling(query, req.query).sort().filter();
		const users = await features.query;
		res.status(200).json(users);
	}
}
