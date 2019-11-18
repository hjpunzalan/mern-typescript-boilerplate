import { Dispatch } from "redux";
import { ActionTypes } from "./types";
enum AlertType {
	success = "success",
	error = "error",
	info = "info",
	warning = "warning"
}

export type Alert = {
	msg: string;
	alertType: AlertType;
};

export interface ResetAlertAction {
	type: ActionTypes.resetAlert;
	payload: [];
}

export interface AlertAction {
	type: ActionTypes.alert;
	payload: Alert;
}

export const setAlert = (msg: string, alertType: AlertType) => (
	dispatch: Dispatch<AlertAction>
) => {
	dispatch<AlertAction>({
		type: ActionTypes.alert,
		payload: { msg, alertType }
	});
};
