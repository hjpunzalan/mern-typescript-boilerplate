"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var enums_1 = require("./enums");
// middlewares are requesthandlers
function use(middleware) {
    return function (target, key, desc) {
        // Get the middleware or initiate an array of middlewares
        var middlewares = Reflect.getMetadata(enums_1.MetadataKeys.Middleware, target, key) || [];
        Reflect.defineMetadata(enums_1.MetadataKeys.Middleware, middlewares.concat([middleware]), target, key);
    };
}
exports.use = use;
