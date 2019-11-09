import { Request, Response, NextFunction } from "express";
import { IAppError, AppError } from "./AppError";
import { Error as MongooseError, CastError } from "mongoose";
import { MongoError } from "mongoDB";
import { JsonWebTokenError } from "jsonwebtoken";

// MonogoDB and mongoose use export Error types as Classes

// Invalid ids
const handleCastErrorDB = (err: CastError) => {
	const message = `Invalid ${err.path}: ${err.value}.`; //Invalid _id : wwwwwwww
	return new AppError(message, 400);
};

// Duplicate fields
const handleDuplicateFieldsDB = (err: MongoError) => {
	// regular expressions is always between two slashes '/'
	const value = (err.errmsg as string).match(/(["'])(\\?.)*?\1/); //reg expression between quotation marks
	const message = `Duplicate field value: ${
		//value returns an array
		(value as RegExpMatchArray)[0]
	}. Please use another value!`;
	return new AppError(message, 400);
};

// Validation DB errors
const handleValidationErrorDB = (err: MongooseError.ValidationError) => {
	// Object.values converts object property values into an array with the object as argument
	// err.errors return an object of errors with properties where theres validation errors
	const errors = Object.values(err.errors)
		.map(el => el.message)
		.join(". ");
	console.log(errors);

	// Join array into a single string
	const message = `Invalid input data. ${errors}`;
	return new AppError(message, 400);
};

// JWT errors
const handleJWTError = (err: JsonWebTokenError) => {
	return new AppError("Invalid token. Please log in again!", 401);
};

const sendErrorDev = (err: IAppError, res: Response) => {
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		error: err,
		stack: err.stack // stack trace
	});
};

// Custom type guards
function isIAppError(err: any): err is IAppError {
	return "IAppError" in err;
}
function isCastError(err: any): err is CastError {
	return "CastError" in err;
}
function isValidationError(err: any): err is MongooseError.ValidationError {
	return "Error.ValidationError" in err;
}

function isMongoError(err: any): err is MongoError {
	return "MongoError" in err;
}

function isJSONError(err: any): err is JsonWebTokenError {
	return "JsonWebTokenError" in err;
}

const sendErrorProd = (err: Error, res: Response) => {
	// Operational, trusted error: send message to client
	// Production mode: Only send meaningful,concise and easy to understand errors
	if (err instanceof AppError) {
		if (err.isOperational)
			res.status(err.statusCode).json({
				status: err.status,
				message: err.message
			});
		// Programming or other unknown errors
	} else {
		// 1) Log error
		console.error("ERROR", err);
		// 2) Send generic message
		res.status(500).json({
			status: "error",
			message: "Something went very wrong"
		});
	}
};

// Error handler passed from controllers
export const globalErrorHandler = (
	err:
		| IAppError
		| CastError
		| MongooseError.ValidationError
		| MongoError
		| JsonWebTokenError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (isIAppError(err)) {
		err.status = err.status || "error";
		err.statusCode = err.statusCode || 500;
	}

	let newError = { ...err };
	if (process.env.NODE_ENV === "development") {
		sendErrorDev(err as IAppError, res);
	} else if (process.env.NODE_ENV === "production") {
		console.log(err instanceof MongoError);
		// Cast Error
		if (isCastError(newError)) newError = handleCastErrorDB(newError);
		//  Mongo Duplicate Error
		else if (isMongoError(newError) && isMongoError(err)) {
			if (err.code === 11000) newError = handleDuplicateFieldsDB(newError);
		}
		// Validation Error from mongoose
		else if (isValidationError(newError))
			newError = handleValidationErrorDB(newError);
		// JWT Error
		else if (isJSONError(newError)) newError = handleJWTError(newError);
		//
		else {
			// in production mode, destructuring doesnt work with error
			sendErrorProd(err, res);
			return next();
		}
		// Send error to client
		sendErrorProd(newError, res);
	}
};
