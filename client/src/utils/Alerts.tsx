import React, { Component } from "react";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Location } from "history";
import { connect } from "react-redux";
import { StoreState } from "../reducers";
import { setAlert, resetAlert, AlertType } from "../actions";

interface Props extends RouteComponentProps<any>, StoreState {
	location: Location;
}
interface State {
	alertId: string;
	location: Location;
}

class Alerts extends Component<Props, State> {
	state = {
		alertId: "",
		location: this.props.location
	};

	componentDidUpdate(prevProps: Props) {
		// Remove alert everytime route changes
		if (this.props.location !== prevProps.location) {
			StatusAlertService.removeAlert(this.state.alertId);
		}

		if (this.props.alert !== prevProps.alert) {
			let alertId: string = "";
			const { msg, alertType } = this.props.alert;
			if (msg && alertType) {
				switch (alertType) {
					case AlertType.success:
						alertId = StatusAlertService.showSuccess(msg);
						break;
					case AlertType.error:
						alertId = StatusAlertService.showError(msg);
						break;
					case AlertType.info:
						alertId = StatusAlertService.showInfo(msg);
						break;
					case AlertType.warning:
						alertId = StatusAlertService.showWarning(msg);
						break;
					default:
						break;
				}
			}
			this.setState({ alertId });
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
	alert: state.alert
});

export default connect(
	mapStateToProps,
	{
		setAlert,
		resetAlert
	}
)(withRouter(Alerts));
