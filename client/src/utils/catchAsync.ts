import { Dispatch } from "redux";
import { DispatchThunk, setAlert, AlertType } from "../actions";
import { AxiosError } from "axios";

const catchAsync = <DispatchAction>(
	fn: (dispatch: DispatchAction) => Promise<void>
) => {
	return async (dispatch: DispatchThunk | DispatchAction) => {
		await fn(dispatch as DispatchAction).catch((err: AxiosError) => {
			console.error(err);
			if (err.response) {
				const errors = err.response.data;
				// The types handles when loading is still true
				(dispatch as DispatchThunk)(setAlert(errors.message, AlertType.error));
			}
		});
	};
};

export default catchAsync;
