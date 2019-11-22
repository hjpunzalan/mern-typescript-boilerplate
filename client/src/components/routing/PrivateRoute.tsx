import React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import Axios from "axios";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ActionTypes } from "../../actions";

interface Props extends RouteProps {
	isAuthenticated: boolean;
	sessionExpired: () => { type: ActionTypes };
}

class PrivateRoute extends Route<Props> {
	componentDidUpdate() {
		// Log user out if session expires
		if (this.props.isAuthenticated)
			Axios.get<boolean>("/api/auth/isloggedin").then(res => {
				if (res.data === false) this.props.sessionExpired();
				else return;
			});
	}
	public render() {
		return !this.props.isAuthenticated ? (
			<Redirect to="/login" />
		) : (
			<Route {...this.props} />
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
	sessionExpired: () => dispatch({ type: ActionTypes.logoutUser })
});

export default connect(
	null,
	mapDispatchToProps
)(PrivateRoute);
