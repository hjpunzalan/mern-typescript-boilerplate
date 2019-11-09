"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("./enums");
require("reflect-metadata");
// Avoid duplication by using a factory function
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            // Define a metadata path
            Reflect.defineMetadata(enums_1.MetadataKeys.Path, path, target, key);
            Reflect.defineMetadata(enums_1.MetadataKeys.Method, method, target, key);
        };
    };
}
exports.get = routeBinder(enums_1.Methods.Get);
exports.post = routeBinder(enums_1.Methods.Post);
exports.put = routeBinder(enums_1.Methods.Put);
exports.del = routeBinder(enums_1.Methods.Del);
