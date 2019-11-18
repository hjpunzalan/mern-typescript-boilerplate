import { ActionTypes } from "./types";
import { Dispatch } from "redux";
import axios from "axios";
import { IUser } from "../actions";

export interface LoginAction {
	type: ActionTypes.loginUser;
	payload: IUser;
}

export const postLogin = (email: string, password: string) => async (
	dispatch: Dispatch
) => {
	console.log("it works");
	const res = await axios.post<IUser>("/api/auth/login", { email, password });
	console.log(res);
	dispatch<LoginAction>({
		type: ActionTypes.loginUser,
		payload: res.data
	});
};
