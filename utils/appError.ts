class AppError extends Error {
	message: string;
	statusCode: Number | string;
	private status: string;
	private isOperational: boolean;

	constructor(message, statusCode) {
		super(message);

		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
		this.isOperational = true; // To identify operational errors from programming errors, Only operational errors are handled by this class

		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = AppError;
