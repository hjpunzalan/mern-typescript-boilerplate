import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions";
import { Redirect } from "react-router";
import { StoreState } from "../../reducers";

interface Props extends StoreState {
	registerUser: (form: IRegisterState) => Promise<void>;
}

export interface IRegisterState {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

class Register extends Component<Props, IRegisterState> {
	state = {
		firstName: "",
		lastName: "",
		email: "",
		password: ""
	};

	handleChange = (e: { target: HTMLInputElement }) => {
		this.setState({ ...this.state, [e.target.name]: e.target.value });
	};

	handleCancel = () => {
		this.setState({ firstName: "", lastName: "", email: "", password: "" });
	};

	handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		this.props.registerUser(this.state).then(() => {
			// If register fails invalid
			// clear password
			this.setState({ password: "" });
		});
	};

	render() {
		const { firstName, lastName, email, password } = this.state;
		return this.props.auth.isAuthenticated ? (
			<Redirect to="/dashboard" />
		) : (
			<div>
				<h1>Register a User</h1>
				<hr />
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="firstName">
						<b>First Name</b>
					</label>
					<input
						type="text"
						placeholder="Enter first name"
						name="firstName"
						value={firstName}
						onChange={this.handleChange}
						required
					/>
					<label htmlFor="lastName">
						<b>Last Name</b>
					</label>
					<input
						type="text"
						placeholder="Enter last name"
						name="lastName"
						value={lastName}
						onChange={this.handleChange}
						required
					/>
					<label htmlFor="email">
						<b>Email</b>
					</label>
					<input
						type="email"
						placeholder="Enter Email"
						name="email"
						value={email}
						onChange={this.handleChange}
						required
					/>
					<label htmlFor="password">
						<b>Password</b>
					</label>
					<input
						type="password"
						placeholder="Enter Password"
						name="password"
						value={password}
						onChange={this.handleChange}
						minLength={6}
						required
					/>
					<div className="Form__btns">
						<button className="btn" onClick={this.handleCancel}>
							Clear
						</button>
						<input type="submit" className="btn btn__submit" value="Register" />
					</div>
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
	{ registerUser }
)(Register);
