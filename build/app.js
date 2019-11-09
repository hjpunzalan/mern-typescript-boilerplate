"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
var hpp_1 = __importDefault(require("hpp"));
var globalErrorHandler_1 = require("./utils/globalErrorHandler");
var userController_1 = require("./controllers/userController");
exports.app = express_1.default();
//////////////////////// Global Middlewares//////////////////////////
// Add htp headers that secure the server
exports.app.use(helmet_1.default());
// Development logging
if (process.env.NODE_ENV === "development") {
    exports.app.use(morgan_1.default("dev"));
}
// Converts incoming json data to js object ---- Body parser that reads data from body into req.body
exports.app.use(express_1.default.json({ limit: "10kb" })); // package will parse 10kb into meaningful data
// Cookie parser
exports.app.use(cookie_parser_1.default());
// Data sanitization against NoSQL query injection
//Look at the req and filter out all '$' and '.' that sends queries to db illegaly
exports.app.use(express_mongo_sanitize_1.default());
// Prevent parameter pollution
// prevents adding duplicated parameters in query
// The whitelist works for both req.query and req.body.
exports.app.use(hpp_1.default({
    whitelist: [] // add http parameters used
}));
// Route Handlers
exports.app.use("/api", userController_1.userRoute);
exports.app.use(globalErrorHandler_1.globalErrorHandler);
