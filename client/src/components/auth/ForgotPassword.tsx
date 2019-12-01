import React, { Component } from "react";
import { connect } from "react-redux";
import { postForgotPassword } from "../../actions";
import Spinner from "../utils/Spinner/Spinner";

interface Props {
	postForgotPassword: (email: IForgotPassState, url: string) => Promise<void>;
}
export interface IForgotPassState {
	loading?: boolean;
	email: string;
}

class ForgotPassword extends Component<Props, IForgotPassState> {
	state = {
		loading: false,
		email: ""
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
			.postForgotPassword({ email: this.state.email }, document.location.href)
			.then(() => {
				// Refresh form
				this.setState({ email: "", loading: false });
			});
	};

	render() {
		return this.state.loading ? (
			<Spinner />
		) : (
			<div>
				<h1>Forgot your password?</h1>
				<p>
					Please enter the email address registered to your account and we will
					send you the link to reset your password.
				</p>
				<form onSubmit={this.handleSubmit}>
					<label>
						<b>Email</b>
						<input
							type="text"
							placeholder="Enter Email"
							name="email"
							value={this.state.email}
							onChange={this.handleChange}
							required
						/>
					</label>
					<input type="submit" value="Send to email" />
				</form>
			</div>
		);
	}
}

export default connect(
	null,
	{ postForgotPassword }
)(ForgotPassword);
