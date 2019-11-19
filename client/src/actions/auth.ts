import axios from "axios";
import { ActionTypes } from "./types";
import { IUser } from "../actions";
import catchAsync from "../utils/catchAsync";
import { setAlert, AlertType } from "./alerts";

export interface LoginAction {
	type: ActionTypes.loginUser;
	payload: IUser;
}
export interface LogoutAction {
	type: ActionTypes.logoutUser;
}

export const postLogin = (email: string, password: string) =>
	catchAsync(async dispatch => {
		const res = await axios.post<IUser>("/api/auth/login", {
			email,
			password
		});

		dispatch<LoginAction>({
			type: ActionTypes.loginUser,
			payload: res.data
		});

		dispatch(
			setAlert(
				`${res.data.firstName} successfully logged in`,
				AlertType.success
			)
		);
	});

export const getLogout = () =>
	catchAsync(async dispatch => {
		await axios.get("/api/auth/logout");
		dispatch<LogoutAction>({ type: ActionTypes.logoutUser });
	});
