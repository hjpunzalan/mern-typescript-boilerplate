import { combineReducers } from "redux";
import { authReducer, AuthState } from "./auth";
import { userReducer } from "./users";
import { IUser } from "../actions";

export interface StoreState {
	auth: AuthState;
	users: IUser[];
}

export const reducers = combineReducers<StoreState>({
	auth: authReducer,
	users: userReducer
});
