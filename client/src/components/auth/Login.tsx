import React, { Component } from "react";
import { connect } from "react-redux";
import { postLogin } from "../../actions";

interface Props {
	postLogin: (email: string, password: string) => Promise<void>;
}
interface State {
	email: string | null;
	password: string | null;
}

class Login extends Component<Props, State> {
	state = {
		email: "",
		password: ""
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
		postLogin(email, password);
		this.setState({ email: "", password: "" });
	};

	render() {
		return (
			<div>
				<h1>Login page</h1>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="email">
						<b>Email</b>
					</label>
					<input
						type="email"
						name="email"
						value={this.state.email}
						onChange={this.handleChange}
						required
					/>
					<label htmlFor="password">
						<b>Password</b>
					</label>
					<input
						type="password"
						name="password"
						value={this.state.password}
						onChange={this.handleChange}
						minLength={6}
						required
					/>
					<button>Login</button>
				</form>
			</div>
		);
	}
}

export default connect(
	null,
	{ postLogin }
)(Login);
