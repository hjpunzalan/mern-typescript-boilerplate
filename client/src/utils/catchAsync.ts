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
				const errors = err.response.data;

				dispatch(setAlert(errors.message, AlertType.error));
			}
		});
	};
};

export default catchAsync;
