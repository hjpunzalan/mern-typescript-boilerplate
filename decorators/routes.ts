import { MetadataKeys, Methods } from "./enums";
import "reflect-metadata";
import { RequestHandler } from "express";

// This helps prevents route decorator being misplaced on the wrong method eg. add or subtract function thats not a handler
interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

// Avoid duplication by using a factory function
function routeBinder(method: string) {
  return function(path: string) {
    return function(target: any, key: string, desc: RouteHandlerDescriptor) {
      // Define a metadata path
      Reflect.defineMetadata(MetadataKeys.Path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.Method, method, target, key);
    };
  };
}

export const get = routeBinder(Methods.Get);
export const post = routeBinder(Methods.Post);
export const put = routeBinder(Methods.Put);
export const del = routeBinder(Methods.Del);
export const patch = routeBinder(Methods.Patch);
