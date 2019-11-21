import React, { Component } from "react";
import { connect } from "react-redux";
import { changePassword } from "../../actions";
import Spinner from "../utils/Spinner/Spinner";
import { StoreState } from "../../reducers";

interface Props extends StoreState {
	changePassword: (form: ChangePassState) => Promise<void>;
}
export interface ChangePassState {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
	loading?: boolean;
}

class ChangePassword extends Component<Props, ChangePassState> {
	state = {
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
		loading: false
	};

	handleChange = (e: { target: HTMLInputElement }) => {
		this.setState({ ...this.state, [e.target.name]: e.target.value });
	};

	handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		this.setState({ loading: true });

		const { currentPassword, newPassword, confirmPassword } = this.state;
		this.props
			.changePassword({
				currentPassword,
				newPassword,
				confirmPassword
			})
			.then(() => {
				// If error
				this.setState({
					currentPassword: "",
					newPassword: "",
					confirmPassword: "",
					loading: false
				});
			});
	};

	render() {
		return (
			<div>
				<h1>Change Your Password</h1>
				{this.state.loading ? (
					<Spinner />
				) : (
					<form onSubmit={this.handleSubmit}>
						<label htmlFor="currentPassword">
							<b>Current Password</b>
						</label>
						<input
							type="password"
							name="currentPassword"
							value={this.state.currentPassword}
							onChange={this.handleChange}
							minLength={6}
							required
						/>
						<label htmlFor="newPassword">
							<b>New Password</b>
						</label>
						<input
							type="password"
							name="newPassword"
							value={this.state.newPassword}
							onChange={this.handleChange}
							minLength={6}
							required
						/>
						<label htmlFor="confirmPassword">
							<b>Confirm New Password</b>
						</label>
						<input
							type="password"
							name="confirmPassword"
							value={this.state.confirmPassword}
							onChange={this.handleChange}
							minLength={6}
							required
						/>
						<button>Change Password</button>
					</form>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state: StoreState) => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ changePassword }
)(ChangePassword);
