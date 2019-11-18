import React, { Component } from "react";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";

interface Props extends StoreState {}
interface State {}

class Dashboard extends Component<Props, State> {
	state = {};

	render() {
		return (
			<div>
				<h3>Hi ${this.props.auth.currentUser}!</h3>
			</div>
		);
	}
}

const mapStateToProps = (state: StoreState) => {
	auth: state.auth;
};

export default connect(mapStateToProps)(Dashboard);
