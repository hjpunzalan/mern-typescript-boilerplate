"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// BodyValidator middleware
function bodyValidators(keys) {
    return function (req, res, next) {
        if (!req.body) {
            res.status(422).send("Invalid request");
            return;
        }
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (!req.body[key]) {
                res.status(422).send("Missing property " + key);
                return;
            }
        }
        next();
    };
}
exports.bodyValidators = bodyValidators;
