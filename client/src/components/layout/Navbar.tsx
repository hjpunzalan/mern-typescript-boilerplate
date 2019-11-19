import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { getLogout } from "../../actions";

interface Props extends StoreState {
	getLogout: () => Promise<void>;
}

class Navbar extends Component<Props> {
	render() {
		const publicRoute = [
			{ path: "/login", name: "Login" },
			{ path: "/register", name: "Register" }
		];

		const privateRoute = [{ path: "/dashboard", name: "Dashboard" }];

		const { isAuthenticated } = this.props.auth;
		return (
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				{!isAuthenticated
					? publicRoute.map(route => (
							<li>
								<Link to={route.path}>{route.name}</Link>
							</li>
					  ))
					: privateRoute.map(route => (
							<li>
								<Link to={route.path}>{route.name}</Link>
							</li>
					  ))}
				{isAuthenticated && (
					<li>
						<Link to={"/login"} onClick={this.props.getLogout}>
							Logout
						</Link>
					</li>
				)}
			</ul>
		);
	}
}

const mapStateToProps = (state: StoreState) => ({
	auth: state.auth,
	users: state.users,
	alerts: state.alerts
});

export default connect(
	mapStateToProps,
	{ getLogout }
)(Navbar);
