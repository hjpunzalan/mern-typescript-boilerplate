import React, { Component } from "react";
import { Switch } from "react-router-dom";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import Login from "../auth/Login";
import Dashboard from "../pages/Dashboard";
import Register from "../auth/Register";
import PublicRoute from "./PublicRoute";
import ChangePassword from "../auth/ChangePassword";

interface Props extends StoreState {}

export enum NavRoutes {}

class Routes extends Component<Props> {
	render() {
		return (
			<Switch>
				<PublicRoute exact path="/" component={Home} />
				<PublicRoute exact path="/login" component={Login} />
				<PublicRoute exact path="/register" component={Register} />
				<PrivateRoute
					isAuthenticated={this.props.auth.isAuthenticated}
					exact
					path="/dashboard"
					component={Dashboard}
				/>

				<PrivateRoute
					isAuthenticated={this.props.auth.isAuthenticated}
					exact
					path="/changepassword"
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
