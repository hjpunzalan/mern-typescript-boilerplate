import { SetAlertAction, ResetAlertAction } from "./alerts";
import { RegUserAction } from "./users";
import { LoginAction } from "./auth";

export enum ActionTypes {
	// unique val
	// KEY[0] = 0,
	// KEY[1] = 1
	// Added initializer for redux devtools
	alert = "ALERT",
	resetAlert = "RESET_ALERT",
	registerUser = "REGISTER_USER",
	loginUser = "LOGIN_USER"
}

export type UserActions = RegUserAction;
export type AuthActions = LoginAction;
export type AlertActions = SetAlertAction | ResetAlertAction;
