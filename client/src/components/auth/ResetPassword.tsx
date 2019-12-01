import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { patchResetPassword } from "../../actions";
import Spinner from "../utils/Spinner/Spinner";
import { StoreState } from "../../reducers";

interface RouteParams {
	resetToken: string;
}

interface Props extends RouteComponentProps<RouteParams>, StoreState {
	isAuthenticated: boolean;
	patchResetPassword: (form: IResetPassState, url: string) => Promise<void>;
}

export interface IResetPassState {
	loading?: boolean;
	newPassword: string;
	confirmPassword: string;
}

class ResetPassword extends Component<Props, IResetPassState> {
	state = {
		loading: false,
		newPassword: "",
		confirmPassword: ""
	};

	handleChange = (e: { target: HTMLInputElement }) => {
		this.setState({
			...this.state,
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Set loading to true which adds spinner
		this.setState({ loading: true });
		// Login user
		this.props
			.patchResetPassword(
				{
					newPassword: this.state.newPassword,
					confirmPassword: this.state.confirmPassword
				},
				this.props.match.params.resetToken
			)
			.then(() => {
				// Refresh form if error received
				this.setState({
					newPassword: "",
					confirmPassword: "",
					loading: false
				});
			});
	};

	render() {
		return this.state.loading ? (
			<Spinner />
		) : (
			<div>
				<h1>Reset your password</h1>
				<p>Please enter a new password below.</p>
				<hr />
				<form onSubmit={this.handleSubmit}>
					<label>
						<span>Password</span>
						<input
							type="password"
							placeholder="Enter a new Password"
							name="newPassword"
							value={this.state.newPassword}
							onChange={this.handleChange}
							minLength={6}
							autoComplete="on"
							required
						/>
					</label>
					<label>
						<span>Confirm Password</span>
						<input
							type="password"
							placeholder="Confirm password"
							name="confirmPassword"
							value={this.state.confirmPassword}
							onChange={this.handleChange}
							minLength={6}
							required
						/>
					</label>
					<input
						type="submit"
						className="btn btn__submit"
						value="Set new password"
					/>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state: StoreState) => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ patchResetPassword }
)(ResetPassword);
