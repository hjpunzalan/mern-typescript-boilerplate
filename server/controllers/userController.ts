import { AppError } from "./../utils/appError";
import { Request, Response, NextFunction, Router } from "express";
import {
	controller,
	use,
	catchAsync,
	post,
	get,
	patch,
	del
} from "../decorators";
import { Users } from "../models/Users";
import { bodyValidator } from "../middlewares/bodyValidator";
import { QueryHandling } from "./../utils/queryHandling";
import { requireAuth } from "../middlewares/requireAuth";
import { checkBody } from "./../middlewares/checkBody";

export const userRoute = Router();

// commented out password in user model
@controller("/users", userRoute)
class UserController {
	@post("/register")
	@use(bodyValidator("firstName", "lastName", "email", "password"))
	@catchAsync
	async registerUser(req: Request, res: Response, next: NextFunction) {
		interface ReqBody {
			firstName: string;
			lastName: string;
			email: string;
			password: string;
		}
		const { firstName, lastName, email, password }: ReqBody = req.body;
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
	@use(requireAuth)
	@catchAsync
	async getAllUsers(req: Request, res: Response, next: NextFunction) {
		//add queryHandling
		const query = Users.find();
		const features = new QueryHandling(query, req.query).sort().filter();
		const users = await features.query;
		res.status(200).json(users);
	}

	@patch("/updateMe")
	@use(requireAuth)
	@catchAsync
	async updateMe(req: Request, res: Response, next: NextFunction) {
		// Update user document
		//   Since body is of any type, checkBody ignore other object keys not specified
		const filterBody = checkBody(req.body, next, [
			"firstName",
			"lastName",
			"email",
			"photo"
		]);
		if (req.session) {
			const user = await Users.findByIdAndUpdate(
				req.session.userId,
				filterBody,
				{
					new: true,
					runValidators: true
				}
			);
			res.status(200).json(user);
		} else return next(new AppError("No session token found", 402));
	}

	@del("/deleteme")
	@use(requireAuth)
	@catchAsync
	async deleteMe(req: Request, res: Response, next: NextFunction) {
		if (req.session) {
			const user = await Users.findByIdAndUpdate(req.session.userId, {
				active: false
			});
			return res.status(204).json(user);
		}
		next(new AppError("User not logged in", 403));
	}
}
