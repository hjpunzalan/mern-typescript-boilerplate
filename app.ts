import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";

export const app = express();

//////////////////////// Global Middlewares//////////////////////////
// Add htp headers that secure the server
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// Converts incoming json data to js object ---- Body parser that reads data from body into req.body
app.use(express.json({ limit: "10kb" })); // package will parse 10kb into meaningful data

// Cookie parser
app.use(cookieParser());

// Data sanitization against NoSQL query injection
//Look at the req and filter out all '$' and '.' that sends queries to db illegaly
app.use(mongoSanitize());

// Prevent parameter pollution
// prevents adding duplicated parameters in query
// The whitelist works for both req.query and req.body.
app.use(
	hpp({
		whitelist: [] // add http parameters used
	})
);
