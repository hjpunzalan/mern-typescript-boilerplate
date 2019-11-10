"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var AppError_1 = require("./AppError");
// MonogoDB and mongoose use export Error types as Classes
// Invalid ids
var handleCastErrorDB = function (err) {
    var message = "Invalid " + err.path + ": " + err.value + "."; //Invalid _id : wwwwwwww
    return new AppError_1.AppError(message, 400);
};
// Duplicate fields
var handleDuplicateFieldsDB = function (err) {
    // regular expressions is always between two slashes '/'
    var value = err.errmsg.match(/(["'])(\\?.)*?\1/); //reg expression between quotation marks
    var message = "Duplicate field value: " + 
    //value returns an array
    value[0] + ". Please use another value!";
    return new AppError_1.AppError(message, 400);
};
// Validation DB errors
var handleValidationErrorDB = function (err) {
    // Object.values converts object property values into an array with the object as argument
    // err.errors return an object of errors with properties where theres validation errors
    var errors = Object.values(err.errors)
        .map(function (el) { return el.message; })
        .join(". ");
    console.log(errors);
    // Join array into a single string
    var message = "Invalid input data. " + errors;
    return new AppError_1.AppError(message, 400);
};
// JWT errors
var handleJWTError = function (err) {
    return new AppError_1.AppError("Invalid token. Please log in again!", 401);
};
var sendErrorDev = function (err, res) {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack // stack trace
    });
};
// Custom type guards
function isIAppError(err) {
    return "IAppError" in err;
}
function isCastError(err) {
    return "CastError" in err;
}
function isValidationError(err) {
    return "Error.ValidationError" in err;
}
function isMongoError(err) {
    return "MongoError" in err;
}
function isJSONError(err) {
    return "JsonWebTokenError" in err;
}
var sendErrorProd = function (err, res) {
    // Operational, trusted error: send message to client
    // Production mode: Only send meaningful,concise and easy to understand errors
    if (err instanceof AppError_1.AppError) {
        if (err.isOperational)
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        // Programming or other unknown errors
    }
    else {
        // 1) Log error
        console.error("ERROR", err);
        // 2) Send generic message
        res.status(500).json({
            status: "error",
            message: "Something went very wrong"
        });
    }
};
// Error handler passed from controllers
exports.globalErrorHandler = function (err, req, res, next) {
    console.log(isIAppError(err), isCastError(err), isJSONError(err), isMongoError(err), isValidationError(err), err instanceof Error);
    if (isIAppError(err)) {
        err.status = err.status || "error";
        err.statusCode = err.statusCode || 500;
    }
    var newError = __assign({}, err);
    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, res);
    }
    else if (process.env.NODE_ENV === "production") {
        // Cast Error
        if (isCastError(newError))
            newError = handleCastErrorDB(newError);
        //  Mongo Duplicate Error
        else if (isMongoError(newError) && isMongoError(err)) {
            if (err.code === 11000)
                newError = handleDuplicateFieldsDB(newError);
        }
        // Validation Error from mongoose
        else if (isValidationError(newError))
            newError = handleValidationErrorDB(newError);
        // JWT Error
        else if (isJSONError(newError))
            newError = handleJWTError(newError);
        //
        else {
            // in production mode, destructuring doesnt work with error
            sendErrorProd(err, res);
            return next();
        }
        // Send error to client
        sendErrorProd(newError, res);
    }
};
