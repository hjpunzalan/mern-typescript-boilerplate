import { NextFunction } from "express";
import { IUser } from "../interfaces/User";
import { AppError } from "./appError";

// Req.body can be anything and thus type is any
export const checkBody = (
	body: any,
	allowedFields: string[] | string,
	next: NextFunction
) => {
	// Initialize new object with edited date and then populated with allowed body from req.body
	const newObj: any = { lastEdited: Date.now() - 1000 };
	Object.keys(body).forEach(el => {
		if (allowedFields.includes(el)) newObj[el] = body[el];
		else return next(new AppError("Invalid request fields.", 400));
	});
	return newObj;
};
