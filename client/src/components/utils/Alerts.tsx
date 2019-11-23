import React, { Component } from "react";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Location } from "history";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { setAlert, resetAlert } from "../../actions";

// RouteComponent Allow the use of withRouter
interface Props extends RouteComponentProps, StoreState {
	location: Location;
}
interface State {
	alertIds: string[];
	location: Location;
}

class Alerts extends Component<Props, State> {
	state = {
		alertIds: [],
		location: this.props.location
	};

	componentDidUpdate(prevProps: Props) {
		// Remove alert everytime route changes
		if (this.props.location !== prevProps.location) {
			for (const id of this.state.alertIds) StatusAlertService.removeAlert(id);
		}

		// Add new alert whenever alert is added to the store's state
		if (this.props.alerts !== prevProps.alerts) {
			const currentIds = this.state.alertIds;
			this.props.alerts.forEach(alert => {
				let alertId: string = "";
				const { msg, alertType } = alert;
				// Add custom options such as background color for each alert type
				alertId = StatusAlertService.showAlert(msg, alertType);
				this.setState({ alertIds: [...currentIds, alertId] });
			});
		}
	}

	render() {
		return (
			<div>
				<StatusAlert />
			</div>
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
	{
		setAlert,
		resetAlert
	}
)(withRouter(Alerts));
