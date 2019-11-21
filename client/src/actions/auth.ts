import { ChangePassState } from "./../components/auth/ChangePassword";
import axios from "axios";
import { ActionTypes } from "./types";
import { IUser } from "../actions";
import catchAsync from "../utils/catchAsync";
import { setAlert, AlertType } from "./alerts";
import { IRegisterState } from "./../components/auth/Register";

export interface LoginAction {
	type: ActionTypes.loginUser;
	payload: IUser;
}
export interface LogoutAction {
	type: ActionTypes.logoutUser;
}

export interface RegUserAction {
	type: ActionTypes.registerUser;
	payload: IUser;
}

export interface ChangePassAction {
	type: ActionTypes.changePassword;
	payload: IUser;
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

export const registerUser = (form: IRegisterState) =>
	catchAsync(async dispatch => {
		const res = await axios.post<IUser>("/api/users/register", form);
		dispatch<RegUserAction>({
			type: ActionTypes.registerUser,
			payload: res.data
		});
		dispatch(
			setAlert(
				`Welcome ${res.data.firstName}! You have been successfully registered!`,
				AlertType.success
			)
		);
	});

export const changePassword = (form: ChangePassState) =>
	catchAsync(async dispatch => {
		const res = await axios.post("/api/auth/changepassword", form);
		dispatch<ChangePassAction>({
			type: ActionTypes.changePassword,
			payload: res.data
		});

		dispatch(setAlert("Password successfully changed!", AlertType.success));
	});
