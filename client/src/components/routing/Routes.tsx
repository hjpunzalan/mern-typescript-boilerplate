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

export const pubRoutesArr = [
	{ name: "Home", path: "/", component: Home, nav: true },
	{ name: "Login", path: "/login", component: Login },
	{ name: "Register", path: "/register", component: Register }
];

export const privRoutesArr = [
	{ name: "Dashboard", path: "/dashboard", component: Dashboard },
	{
		name: "Change Password",
		path: "/changepassword",
		component: ChangePassword,
		nav: false
	}
];

class Routes extends Component<Props> {
	render() {
		return (
			<Switch>
				{pubRoutesArr.map(route => (
					<PublicRoute
						key={route.name}
						isAuthenticated={this.props.auth.isAuthenticated}
						exact
						path={route.path}
						component={route.component}
					/>
				))}

				{privRoutesArr.map(route => (
					<PrivateRoute
						key={route.name}
						isAuthenticated={this.props.auth.isAuthenticated}
						exact
						path={route.path}
						component={route.component}
					/>
				))}
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
