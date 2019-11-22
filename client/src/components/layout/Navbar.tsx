import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { getLogout } from "../../actions";
import { privRoutesArr, pubRoutesArr } from "../routing/Routes";

interface Props extends StoreState {
	getLogout: () => Promise<void>;
}

class Navbar extends Component<Props> {
	render() {
		const publicRoute = pubRoutesArr.filter(route => route.nav !== false);
		const privateRoute = privRoutesArr.filter(route => route.nav !== false);

		const { isAuthenticated } = this.props.auth;
		return (
			<ul>
				{!isAuthenticated
					? publicRoute.map(route => (
							<li key={route.name}>
								<Link to={route.path}>{route.name}</Link>
							</li>
					  ))
					: privateRoute.map(route => (
							<li key={route.name}>
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
