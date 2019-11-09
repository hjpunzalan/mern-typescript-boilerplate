"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appError_1 = require("./../utils/appError");
// BodyValidator middleware
function bodyValidator() {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    return function (req, res, next) {
        if (!req.body) {
            next(new appError_1.AppError("Invalid Request", 422));
        }
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (!req.body[key]) {
                next(new appError_1.AppError("Missing " + key + "!", 422));
            }
        }
        next();
    };
}
exports.bodyValidator = bodyValidator;
