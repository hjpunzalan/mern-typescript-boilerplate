import "reflect-metadata";
import { MetadataKeys } from "./enums";
import { RequestHandler } from "express";

// middlewares are requesthandlers
export function use(middleware: RequestHandler) {
	return function(target: any, key: string, desc: PropertyDescriptor) {
		// Get the middleware or initiate an array of middlewares
		const middlewares =
			Reflect.getMetadata(MetadataKeys.Middleware, target, key) || [];

		Reflect.defineMetadata(
			MetadataKeys.Middleware,
			[...middlewares, middleware],
			target,
			key
		);
	};
}
