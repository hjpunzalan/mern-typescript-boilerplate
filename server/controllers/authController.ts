import { Request, Response, NextFunction, Router } from "express";
import crypto from "crypto";
import { controller, use, catchAsync, post, get, patch } from "../decorators";
import { Users } from "../models/Users";
import { AppError } from "./../utils/appError";
import { bodyValidator } from "../middlewares/bodyValidator";
import { requireAuth } from "../middlewares/requireAuth";
import { Email } from "../utils/Email";

export const authRoute = Router();

// commented out password in user model
@controller("/auth", authRoute)
class UserController {
	// work to do: reactivate when logging in
	@post("/login")
	@use(bodyValidator("email", "password"))
	@catchAsync
	async login(req: Request, res: Response, next: NextFunction) {
		interface ReqBody {
			email: string;
			password: string;
		}
		const { email, password }: ReqBody = req.body;

		// Password by default is not selected
		let user = await Users.findOne({ email }).select("+password");

		// If user's account has been deactivated by user, reactivate it.
		if (!user) {
			const activateUser = await Users.updateOne(
				{ email },
				{
					active: true
				}
			);
			// Only search user if user exist
			if (activateUser.n)
				user = await Users.findOne({
					email
				}).select("+password");
		}
		// Verify user exist and password is correct
		if (
			!user ||
			(user.password && !(await user.checkPassword(password, user.password)))
		)
			return next(
				new AppError("Invalid email or password. Please try again.", 401)
			);

		// remove users password from response
		user.password = undefined;

		// Add to session
		// any type need to fix
		if (req.session) {
			req.session.loggedIn = true;
			req.session.userId = user.id;
			req.session.date = Date.now();
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

	@post("/forgotpassword")
	@use(bodyValidator("email", "url"))
	@catchAsync
	async forgotPassword(req: Request, res: Response, next: NextFunction) {
		interface ReqBody {
			email: string;
			url: string;
		}

		const { email, url }: ReqBody = req.body;
		//  Get user based on POSTed email from user input
		const user = await Users.findOne({
			email
		});
		if (!user) {
			return next(
				new AppError("There is no user with this email address", 404)
			);
		}
		// Generate the random reset token
		const resetToken = user.createPasswordResetToken();
		//   Password reset token added to user document and should be saved
		await user.save({
			validateBeforeSave: false
		}); // modified the user document ... disabled validators before save

		// Not enough to catch error in global error handling and use catchAsync
		// Need to also delete/undefined the reset password token and expiration
		try {
			const resetURL = url + "/reset/" + resetToken;

			await new Email(user).sendPasswordReset(resetToken, resetURL);

			res.status(200).json({
				status: "success",
				message: "Token sent to email!"
			});
		} catch (error) {
			user.passwordResetToken = undefined;
			user.passwordResetExpires = undefined;
			await user.save({
				validateBeforeSave: false
			}); // dont need to revalidate
			console.error(error);
			return next(
				new AppError(
					"There was an error sending the email. Try again later",
					500
				)
			);
		}
	}

	@patch("/resetpassword/:token")
	@use(bodyValidator("password"))
	@catchAsync
	async resetPassword(req: Request, res: Response, next: NextFunction) {
		interface ReqBody {
			password: string;
		}

		const { password }: ReqBody = req.body;

		// 1) Get user based on the token
		// sha256 is the name of the algorithm
		// Hash the token from email
		const hashedToken = crypto
			.createHash("sha256")
			.update(req.params.token)
			.digest("hex");

		//// If expiry is greater than now(or undefined), then its not expired
		// Finds user
		const user = await Users.findOne({
			passwordResetToken: hashedToken,
			passwordResetExpires: {
				$gt: Date.now()
			} // mongoDB can convert different format into the same to compare eg. miliseconds
		});

		// 2) If token has not expired, and there is user, set the new password
		// Check if user is found
		if (!user) {
			return next(new AppError("Token is invalid or has expired", 400));
		}

		// modify data
		user.password = password;
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save(); // use save to run validators again because find and update wont

		// 3) Update changePasswordAt property of the user
		// DONE in pre middleware of User schema

		// 4) Log the user in using session
		if (req.session) {
			req.session.loggedIn = true;
			req.session.userId = user.id;
		}
		res.status(200).json(user);
	}

	@post("/changepassword")
	@use(requireAuth, bodyValidator("password", "newPassword", "confirmPassword"))
	async changePassword(req: Request, res: Response, next: NextFunction) {
		interface ReqBody {
			password: string;
			newPassword: string;
			confirmPassword: string;
		}
		const { password, newPassword, confirmPassword }: ReqBody = req.body;

		// Check if newPassword is same as confirmPassword
		if (newPassword != confirmPassword)
			return next(new AppError("Please confirm password correctly.", 400));

		// 1) Get user from collection
		// forces select to be true and find if user exist
		// req.user was from requireAuth middleware session to make sure user is logged in
		if (req.session) {
			const user = await Users.findById(req.session.userId).select("+password");

			// 2) Check if POSTed current password is correct
			if (
				user &&
				user.password &&
				!(await user.checkPassword(password, user.password))
			) {
				return next(
					new AppError("Please enter the correct current password.", 401)
				);
			} else if (user) {
				// 3) If so, update password
				user.password = newPassword;
				// validators in Schema happen after saving into Document
				// User.findByIdAndUpdate will not work as intended!
				await user.save();

				user.password = undefined;

				// 4) Password changed at and password needs to be modified
				//   Added middlewares that updates passwordChanged and password
				//   requireAuth  takes into account changedPasswordAfter ( changed password while logged in)
				// Set new date for the user changing the password to be still logged in but windows will be logged out
				req.session.date = Date.now();
				res.status(200).json(user);
			}
		} else
			next(new AppError(" No session found. User may not be logged in!", 403));
	}
}
