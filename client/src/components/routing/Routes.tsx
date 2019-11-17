import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../auth/Login";

interface Props {}
interface State {}

class Routes extends Component<Props, State> {
	state = {};

	render() {
		return (
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
			</Switch>
		);
	}
}

export default Routes;
