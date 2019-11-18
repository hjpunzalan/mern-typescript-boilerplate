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

		if (this.props.alerts !== prevProps.alerts) {
			let alertId: string = "";
			const currentIds = this.state.alertIds;
			this.props.alerts.forEach(alert => {
				const { msg, alertType } = alert;
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
			});

			this.setState({ alertIds: [...currentIds, alertId] });
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
