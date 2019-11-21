import { ActionTypes } from "./../actions/types";
import { setAlert, AlertType } from "../actions";
import { AxiosError } from "axios";
import { ThunkDispatch } from "redux-thunk";
import { StoreState } from "../reducers";
import { AnyAction } from "redux";

// Normal Dispatch Action from redux require returning an action and not function
// It requires a type property which is not needed with Thunk

const catchAsync = (
	fn: (dispatch: ThunkDispatch<StoreState, void, AnyAction>) => Promise<void>
) => {
	return async (dispatch: ThunkDispatch<StoreState, void, AnyAction>) => {
		await fn(dispatch).catch((err: AxiosError) => {
			console.error(err);
			if (err.response) {
				// Log user out if deactivated --- 401 Unauthorized
				// Log out user if no session exist --- 403  Forbidden
				if (err.response.status === 401 || err.response.status === 403)
					dispatch({ type: ActionTypes.logoutUser });
				const errors = err.response.data;

				dispatch(setAlert(errors.message, AlertType.error));
			}
		});
	};
};

export default catchAsync;
