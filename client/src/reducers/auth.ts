import { AuthActions, IUser, ActionTypes } from "../actions";
export interface AuthState {
	currentUser: IUser | null;
	isAuthenticated: boolean;
}

const initialState: AuthState = {
	currentUser: null,
	isAuthenticated: false
};

export const authReducer = (state = initialState, action: AuthActions) => {
	switch (action.type) {
		case ActionTypes.loginUser:
			return {
				currentUser: action.payload,
				isAuthenticated: true
			};
		default:
			return state;
	}
};
