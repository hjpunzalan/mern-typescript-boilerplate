// interface can be used as other error class types such as MongoError, MongooseError, Validation Error
export interface IAppError extends Error {
	status: string;
	statusCode: number;
	isOperational?: boolean;
}

export class AppError extends Error implements IAppError {
	isOperational = true; // To identify operational errors from programming errors, Only operational errors are handled by this class
	status: string;
	statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
		this.statusCode = statusCode;
		Error.captureStackTrace(this, this.constructor);
	}
}
