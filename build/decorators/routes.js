"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MetadataKeys_1 = require("./enums/MetadataKeys");
require("reflect-metadata");
var Methods_1 = require("./enums/Methods");
// Avoid duplication by using a factory function
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            // Define a metadata path
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.Path, path, target, key);
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.Method, method, target, key);
        };
    };
}
exports.get = routeBinder(Methods_1.Methods.Get);
exports.post = routeBinder(Methods_1.Methods.Post);
exports.put = routeBinder(Methods_1.Methods.Put);
