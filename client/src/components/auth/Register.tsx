import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser, IUser } from "../../actions";
import { StoreState } from "../../reducers";
import { RouterProps } from "react-router";

interface Props extends StoreState, RouterProps {
	registerUser: (form: IRegisterState) => Promise<void>;
}

export interface IRegisterState extends IUser {
	pathname: string;
}

class Register extends Component<Props, IRegisterState> {
	state = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		pathname: this.props.history.location.pathname
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
			if (this.props.history.location.pathname === this.state.pathname)
				this.setState({ password: "" });
		});
	};

	render() {
		const { firstName, lastName, email, password } = this.state;
		return (
			<div>
				<h1>Register a User</h1>
				<form onSubmit={this.handleSubmit}>
					<label>
						<span>First Name</span>
						<input
							type="text"
							placeholder="Enter first name"
							name="firstName"
							value={firstName}
							onChange={this.handleChange}
							required
						/>
					</label>
					<label>
						<span>Last Name</span>
						<input
							type="text"
							placeholder="Enter last name"
							name="lastName"
							value={lastName}
							onChange={this.handleChange}
							required
						/>
					</label>
					<label>
						<span>Email</span>
						<input
							type="email"
							placeholder="Enter Email"
							name="email"
							value={email}
							onChange={this.handleChange}
							required
						/>
					</label>
					<label>
						<span>Password</span>
						<input
							type="password"
							placeholder="Enter Password"
							name="password"
							value={password}
							onChange={this.handleChange}
							minLength={6}
							required
						/>
					</label>
					<button className="btn" onClick={this.handleCancel}>
						Clear
					</button>
					<input type="submit" className="btn btn__submit" value="Register" />
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
