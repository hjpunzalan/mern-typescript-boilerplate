import mongoose from "mongoose";
import crypto from "crypto";
import validator from "validator";
import bcrypt from "bcryptjs";
import { IUser } from "../interfaces/User";
// import generator from 'generator'
// use save to run validators again because find and update wont

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "User must have a first name"]
	},
	lastName: {
		type: String,
		required: [true, "User must have a last name"]
	},
	email: {
		type: String,
		required: [true, "User must have an email"],
		unique: true,
		lowercase: true, //not a validator but transforms string
		validator: [validator.isEmail, "Must be a valid email address"]
	},
	photo: String,
	password: {
		type: String,
		select: false, //Keeps password hidden from anywhere
		minlength: 6,
		required: [true, "User must have a password"]
		// default: generator.generate({
		// 	length: 6,
		// 	numbers: true
		// })
	},
	active: {
		type: Boolean,
		default: true
	},
	role: {
		type: String,
		enum: ["admin", "user"],
		default: "user"
	},
	lastEdited: Date,
	passwordChangedAt: {
		type: Date,
		select: false
	},
	passwordResetToken: String,
	passwordResetExpires: Date
});

// Middleware

userSchema.pre<IUser>(/^find/, function(next) {
	// 'this' points to the current query before executing the event /^find/
	if (this instanceof mongoose.Query)
		this.find({ active: { $ne: false } }).select("-__v");
	next();
});
// update changedPasswordAt when resetting password
// Skips if password is NOT modified or NEW.
userSchema.pre<IUser>("save", function(next) {
	if (!this.isModified("password") || this.isNew) return next();
	this.passwordChangedAt = Date.now() - 1000; // subtracting 1 second takes into account delay in saving into database so that its before the token is generated
	next();
});

userSchema.pre<IUser>("save", async function(next) {
	// Only run this function if password was actually modified
	// Changing password or password creation eg. new password
	if (!this.isModified("password")) return next();

	const saltRounds = 12;
	if (this.password)
		this.password = await bcrypt.hash(this.password, saltRounds);

	next();
});

userSchema.methods.checkPassword = async function(
	password: string,
	hashedPassword: string
): Promise<boolean> {
	return await bcrypt.compare(password, hashedPassword);
};

userSchema.methods.changedPasswordAfter = function(
	this: IUser,
	timestamp: Date | number
): boolean {
	//Assuming timestamp is given in seconds
	if (this.passwordChangedAt) {
		//getTime() is a Date function
		const changedTimeStamp = (this.passwordChangedAt as Date).getTime() / 1000;
		return changedTimeStamp > timestamp;
	}
	return false;
};

userSchema.methods.createPasswordResetToken = function(this: IUser): string {
	const resetToken = crypto.randomBytes(32).toString("hex");
	// crypto module that doesn't require much processor
	// Only use bcrypt for passwords

	this.passwordResetToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
	return resetToken; // returns unhashed token
};

export const Users = mongoose.model<IUser>("Users", userSchema);
