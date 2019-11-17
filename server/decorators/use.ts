import "reflect-metadata";
import { MetadataKeys } from "./enums";
import { RequestHandler } from "express";

// middlewares are requesthandlers
export function use(...middlewares: RequestHandler[]) {
	return function(target: any, key: string, desc: PropertyDescriptor) {
		Reflect.defineMetadata(MetadataKeys.Middleware, middlewares, target, key);
	};
}
