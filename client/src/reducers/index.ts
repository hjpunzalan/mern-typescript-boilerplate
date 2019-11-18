import { combineReducers } from "redux";
import { authReducer, AuthState } from "./auth";
import { alertReducer } from "./alerts";
import { userReducer } from "./users";
import { IUser, Alert } from "../actions";

export interface StoreState {
	auth: AuthState;
	users: IUser[];
	alert: Alert;
}

export const reducers = combineReducers<StoreState>({
	auth: authReducer,
	users: userReducer,
	alert: alertReducer
});
