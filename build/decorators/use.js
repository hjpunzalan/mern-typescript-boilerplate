"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var enums_1 = require("./enums");
// middlewares are requesthandlers
function use() {
    var middlewares = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        middlewares[_i] = arguments[_i];
    }
    return function (target, key, desc) {
        Reflect.defineMetadata(enums_1.MetadataKeys.Middleware, middlewares, target, key);
    };
}
exports.use = use;
