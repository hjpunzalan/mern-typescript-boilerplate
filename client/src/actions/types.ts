import { SetAlertAction, ResetAlertAction } from "./alerts";
import { LoginAction, LogoutAction, RegUserAction } from "./auth";

export enum ActionTypes {
	// unique val
	// KEY[0] = 0,
	// KEY[1] = 1
	// Added initializer for redux devtools
	alert = "ALERT",
	resetAlert = "RESET_ALERT",
	registerUser = "REGISTER_USER",
	loginUser = "LOGIN_USER",
	logoutUser = "LOGOUT_USER"
}

// export type UserActions = ;
export type AuthActions = LoginAction | LogoutAction | RegUserAction;
export type AlertActions = SetAlertAction | ResetAlertAction;
