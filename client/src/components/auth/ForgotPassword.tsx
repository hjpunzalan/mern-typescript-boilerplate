import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../utils/Spinner/Spinner";

interface Props {}
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
		const { email, password } = this.state;
		// Set loading to true which adds spinner
		this.setState({ loading: true });

		// Login user
		this.props.postForgotPassword(email).then(() => {
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
				<hr />
				<form onSubmit={handleSubmit}>
					<label htmlFor="email">
						<b>Email</b>
					</label>
					<input
						type="text"
						placeholder="Enter Email"
						name="email"
						value={this.state.email}
						onChange={this.handleChange}
						required
					/>
					<input type="submit" value="Send to email" />
				</form>
			</div>
		);
	}
}

export default connect()(ForgotPassword);
