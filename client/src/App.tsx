import React, { Component } from "react";
// import { Route, Redirect, withRouter } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Routes from "./components/routing/Routes";
import Alerts from "./utils/Alerts";

interface Props {}
interface State {}

class App extends Component<Props, State> {
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
