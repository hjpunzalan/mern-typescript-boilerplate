import { RequestHandler, Request, Response, NextFunction } from "express";
import "reflect-metadata";

interface RouteHandlerDescriptor extends PropertyDescriptor {
	value?: RequestHandler;
}

export function catchAsync(
	target: any,
	key: string,
	desc: RouteHandlerDescriptor
) {
	const method = target[key];

	desc.value = (req: Request, res: Response, next: NextFunction) => {
		/// an event listener
		// Same as as try/catch block but only catches error and errors are automatically send through next
		method(req, res, next).catch(next); // goes towards global error handler ..........err => next(err)
	};
}
