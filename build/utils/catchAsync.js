"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = function (fn) {
    // pass all arguments then catch errors
    // returns Promise
    return function (req, res, next) {
        /// an event listener
        // Same as as try/catch block but only catches error and errors are automatically send through next
        fn(req, res, next).catch(next); // goes towards global error handler ..........err => next(err)
    };
};
