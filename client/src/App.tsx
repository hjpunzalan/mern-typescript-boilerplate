import React, { Component } from "react";
// import { Route, Redirect, withRouter } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Routes from "./components/routing/Routes";
import Alerts from "./components/utils/Alerts";

class App extends Component {
	state = {};

	render() {
		return (
			<div>
				<Navbar />
				<Alerts />
				<Routes />
			</div>
		);
	}
}

export default App;
