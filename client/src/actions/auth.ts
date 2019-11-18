import { Dispatch } from "redux";
import axios from "axios";
import { ActionTypes, DispatchThunk } from "./types";
import { IUser } from "../actions";
import catchAsync from "../utils/catchAsync";
import { setAlert, AlertType } from "./alerts";

export interface LoginAction {
	type: ActionTypes.loginUser;
	payload: IUser;
}

export const postLogin = (email: string, password: string) =>
	catchAsync<Dispatch<LoginAction>>(async dispatch => {
		const res = await axios.post<IUser>("/api/auth/login", { email, password });

		dispatch({
			type: ActionTypes.loginUser,
			payload: res.data
		});

		(dispatch as DispatchThunk)(
			setAlert(
				`${res.data.firstName} successfully logged in`,
				AlertType.success
			)
		);
	});
