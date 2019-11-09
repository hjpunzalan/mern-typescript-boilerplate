import { Request, Response, NextFunction } from "express";
export const catchAsync = (fn: Function) => {
	// pass all arguments then catch errors
	// returns Promise
	return (req: Request, res: Response, next: NextFunction) => {
		/// an event listener
		// Same as as try/catch block but only catches error and errors are automatically send through next
		fn(req, res, next).catch(next); // goes towards global error handler ..........err => next(err)
	};
};
