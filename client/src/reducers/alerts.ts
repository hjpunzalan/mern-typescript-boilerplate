import { ActionTypes, AlertActions, Alert } from "../actions";

export type AlertState = Alert[];

const initialState: AlertState = [];

export const alertReducer = (state = initialState, action: AlertActions) => {
	switch (action.type) {
		case ActionTypes.alert:
			return [...state, action.payload];

		case ActionTypes.resetAlert:
			return initialState;
		default:
			return state;
	}
};
