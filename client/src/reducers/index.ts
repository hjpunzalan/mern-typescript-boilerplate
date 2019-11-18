import { combineReducers } from "redux";
import { authReducer, AuthState } from "./auth";
import { alertReducer, AlertState } from "./alerts";
import { userReducer } from "./users";
import { IUser } from "../actions";

export interface StoreState {
	auth: AuthState;
	users: IUser[];
	alerts: AlertState;
}

export const reducers = combineReducers<StoreState>({
	auth: authReducer,
	users: userReducer,
	alerts: alertReducer
});
