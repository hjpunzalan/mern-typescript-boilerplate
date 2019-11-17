import React, { Component } from "react";
// import { Route, Redirect, withRouter } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Routes from "./components/routing/Routes";

interface Props {}
interface State {}

class App extends Component<Props, State> {
	state = {};

	render() {
		return (
			<div>
				<Navbar />
				<Routes />
			</div>
		);
	}
}

export default App;
