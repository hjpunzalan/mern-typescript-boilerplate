import { Dispatch } from "redux";
import { setAlert, AlertType } from "../actions";
import { AxiosError } from "axios";

// So when only one argument is provided, it will be fn
const catchAsync = <DispatchAction>(
	fn: (dispatch: DispatchAction) => Promise<void>
) => {
	return (dispatch: DispatchAction) => {
		fn(dispatch).catch((err: AxiosError) => {
			console.error(err);
			if (err.response) {
				const errors = err.response.data;
				// The types handles when loading is still true
				if (errors) setAlert(errors.message, AlertType.error);
			}
		});
	};
};

export default catchAsync;
