import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import Login from "../auth/Login";
import Dashboard from "../pages/Dashboard";
import Register from "../auth/Register";
import ChangePassword from "../auth/ChangePassword";

interface Props extends StoreState {}

export enum NavRoutes {}

class Routes extends Component<Props> {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<PrivateRoute
					isAuthenticated={this.props.auth.isAuthenticated}
					exact
					path="/dashboard"
					component={Dashboard}
				/>
				<PrivateRoute
					isAuthenticated={this.props.auth.isAuthenticated}
					exact
					path="/changePassword"
					component={ChangePassword}
				/>
			</Switch>
		);
	}
}

const mapStateToProps = (state: StoreState) => ({
	auth: state.auth,
	users: state.users,
	alerts: state.alerts
});

export default connect(mapStateToProps)(Routes);
