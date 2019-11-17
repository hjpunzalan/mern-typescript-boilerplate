import { ActionTypes, IUser, UserActions } from "../actions";

const initialState: IUser[] = [];

export const userReducer = (state = initialState, action: UserActions) => {
	// Switch statements acts as type guard which determines unique action union
	// action usually cannot be destructured due to type unions
	switch (action.type) {
		case ActionTypes.registerUser:
			return [...state, action.payload];
		default:
			return state;
	}
};
