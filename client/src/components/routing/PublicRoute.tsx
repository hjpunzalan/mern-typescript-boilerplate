import React, { Component } from "react";
import { Route, RouteProps } from "react-router-dom";
import { connect } from "react-redux";
import { ActionTypes } from "../../actions";
import { Dispatch } from "redux";
import Axios from "axios";

interface Props extends RouteProps {
	sessionExpired: () => { type: ActionTypes };
}

class PublicRoute extends Component<Props> {
	componentDidMount() {
		// Log user out if session expires
		Axios.get<boolean>("/api/auth/isloggedin").then(res => {
			console.log(res.data);
			if (res.data === false) this.props.sessionExpired();
			else return;
		});
	}

	render() {
		return <Route {...this.props} />;
	}
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
	sessionExpired: () => dispatch({ type: ActionTypes.logoutUser })
});

export default connect(
	null,
	mapDispatchToProps
)(PublicRoute);
