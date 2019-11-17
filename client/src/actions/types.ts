import { RegUserAction } from "./users";
import { LoginAction } from "./auth";

export enum ActionTypes {
	// unique val
	// KEY[0] = 0,
	// KEY[1] = 1
	registerUser,
	loginUser
}

export type UserActions = RegUserAction;
export type AuthActions = LoginAction;
