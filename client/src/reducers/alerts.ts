import { ActionTypes, AlertActions, Alert } from "../actions";

export interface AlertState {
	alert: Alert[];
}

const initialState: AlertState = {
	alert: []
};

export default (state = initialState, action: AlertActions) => {
	switch (action.type) {
		case ActionTypes.alert:
			return {
				alert: [...state.alert, action.payload]
			};
		case ActionTypes.resetAlert:
			return {
				alert: []
			};
		default:
			return state;
	}
};
