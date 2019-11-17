import React, { Component } from "react";
import { Link } from "react-router-dom";

interface Props {}
interface State {}

class Navbar extends Component<Props, State> {
	state = {};

	render() {
		return (
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/login">Login</Link>
				</li>
			</ul>
		);
	}
}

export default Navbar;
