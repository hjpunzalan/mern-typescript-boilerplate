"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function catchAsync(target, key, desc) {
    console.log("catchAsync works");
    var method = target[key];
    desc.value = function (req, res, next) {
        /// an event listener
        // Same as as try/catch block but only catches error and errors are automatically send through next
        method(req, res, next).catch(next); // goes towards global error handler ..........err => next(err)
    };
}
exports.catchAsync = catchAsync;
