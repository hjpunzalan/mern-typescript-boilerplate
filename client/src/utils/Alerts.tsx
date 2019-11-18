import React, { Component } from "react";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Location } from "history";

interface Props extends RouteComponentProps<any> {
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
		if (this.props.location !== prevProps.location) {
			StatusAlertService.removeAlert(this.state.alertId);
		}
	}

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

export default withRouter(Alerts);
