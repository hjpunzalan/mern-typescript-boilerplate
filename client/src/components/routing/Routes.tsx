import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import Login from "../auth/Login";
import Dashboard from "../pages/Dashboard";

interface Props extends StoreState {}

export enum NavRoutes {}

class Routes extends Component<Props> {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<PrivateRoute
					isAuthenticated={this.props.auth.isAuthenticated}
					exact
					path="/dashboard"
					component={Dashboard}
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
