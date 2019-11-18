import React, { Component } from "react";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";

interface Props {}
interface State {
	alertId: string;
}

class Alerts extends Component<Props, State> {
	state = {
		alertId: ""
	};

	showSuccessAlert = () => {
		const alertId = StatusAlertService.showSuccess("Default success alert!");
		this.setState({ alertId });
	};

	removeAlert = () => {
		StatusAlertService.removeAlert(this.state.alertId);
	};

	render() {
		return (
			<div>
				<StatusAlert />

				<button onClick={this.showSuccessAlert}>Show success alert</button>
				<button onClick={this.removeAlert}>Remove alert</button>
			</div>
		);
	}
}

export default Alerts;
