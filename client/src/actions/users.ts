// import { ActionTypes } from "./types";
// import axios from "axios";
// import catchAsync from "../utils/catchAsync";

// Compatible with updateMe state also
export interface IUser {
	active?: boolean;
	id?: string;
	role?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;
	passwordChangedAt?: Date;
}
