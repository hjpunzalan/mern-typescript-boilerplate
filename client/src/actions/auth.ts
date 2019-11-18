import { ActionTypes } from "./types";
import { Dispatch } from "redux";
import axios from "axios";
import { IUser } from "../actions";
import catchAsync from "../utils/catchAsync";

export interface LoginAction {
	type: ActionTypes.loginUser;
	payload: IUser;
}

export const postLogin = (email: string, password: string) =>
	catchAsync<Dispatch<LoginAction>>(async dispatch => {
		const res = await axios.post<IUser>("/api/auth/login", { email, password });
		dispatch<LoginAction>({
			type: ActionTypes.loginUser,
			payload: res.data
		});
	});
