import { SetAlertAction, ResetAlertAction } from "./alerts";
import {
	LoginAction,
	LogoutAction,
	RegUserAction,
	ChangePassAction
} from "./auth";

export enum ActionTypes {
	// unique val
	// KEY[0] = 0,
	// KEY[1] = 1
	// Added initializer for redux devtools
	alert = "ALERT",
	resetAlert = "RESET_ALERT",
	registerUser = "REGISTER_USER",
	loginUser = "LOGIN_USER",
	logoutUser = "LOGOUT_USER",
	changePassword = "CHANGE_PASSWORD"
}

// export type UserActions = ;
export type AuthActions =
	| LoginAction
	| LogoutAction
	| RegUserAction
	| ChangePassAction;
export type AlertActions = SetAlertAction | ResetAlertAction;
