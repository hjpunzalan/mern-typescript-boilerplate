import React, { Component } from "react";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";

interface Props extends StoreState {}
interface State {}

class Dashboard extends Component<Props, State> {
	state = {};

	render() {
		const { currentUser } = this.props.auth;
		return (
			<div>
				<h3>Hi {currentUser && currentUser.firstName}!</h3>
			</div>
		);
	}
}

const mapStateToProps = (state: StoreState) => ({
	auth: state.auth,
	users: state.users,
	alerts: state.alerts
});

export default connect(mapStateToProps)(Dashboard);
