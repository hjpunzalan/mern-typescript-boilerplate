import { Document } from "mongoose";

export interface IUser extends Document {
	firstName: string;
	lastName: string;
	email: string;
	photo?: string;
	password: string | undefined;
	active: boolean;
	role: string;
	lastEdited: Date;
	passwordChangedAt: Date | number;
	passwordResetToken: String;
	passwordResetExpires: Date | number;
}
