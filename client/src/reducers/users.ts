import { IUser } from "../actions";
import { Action } from "redux";

const initialState: IUser[] = [];

export const userReducer = (state = initialState, action: Action) => {
	// Switch statements acts as type guard which determines unique action union
	// action usually cannot be destructured due to type unions
	switch (action.type) {
		default:
			return state;
	}
};
