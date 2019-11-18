import { ActionTypes, AlertActions, Alert } from "../actions";

const initialState: Alert = {
	msg: null,
	alertType: null
};

export const alertReducer = (state = initialState, action: AlertActions) => {
	switch (action.type) {
		case ActionTypes.alert:
			return action.payload;

		case ActionTypes.resetAlert:
			return initialState;
		default:
			return state;
	}
};
