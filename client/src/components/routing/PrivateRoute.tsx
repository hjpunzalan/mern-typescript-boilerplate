import React from "react";
import { Redirect, Route, RouteProps } from "react-router";

interface Props extends RouteProps {
	isAuthenticated: boolean;
}

class PrivateRoute extends Route<Props> {
	public render() {
		return !this.props.isAuthenticated ? (
			<Redirect to="/login" />
		) : (
			<Route {...this.props} component={this.props.component} />
		);
	}
}

export default PrivateRoute;
