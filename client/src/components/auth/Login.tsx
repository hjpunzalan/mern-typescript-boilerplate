import React, { Component } from "react";
import { connect } from "react-redux";
import { postLogin } from "../../actions";
import { StoreState } from "../../reducers";
import Spinner from "../utils/Spinner/Spinner";
import { Link } from "react-router-dom";

interface Props extends StoreState {
	postLogin: (email: string, password: string) => Promise<void>;
}
interface State {
	email: string;
	password: string;
	loading: boolean;
}

class Login extends Component<Props, State> {
	state = {
		email: "",
		password: "",
		loading: false
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
		this.props.postLogin(email, password).then(() => {
			// Refresh form if authentication fails
			if (!this.props.auth.isAuthenticated)
				this.setState({ email: "", password: "", loading: false });
		});
	};

	render() {
		return (
			<div>
				<h1>Login page</h1>
				{this.state.loading ? (
					<Spinner />
				) : (
					<>
						<form onSubmit={this.handleSubmit}>
							<label>
								<span>Email</span>
								<input
									type="email"
									name="email"
									value={this.state.email}
									onChange={this.handleChange}
									required
								/>
							</label>
							<label>
								<span>Password</span>
								<input
									type="password"
									name="password"
									value={this.state.password}
									onChange={this.handleChange}
									minLength={6}
									required
								/>
							</label>
							<button>Login</button>
						</form>
						<Link to="/forgotpassword">Forgot your password?</Link>
					</>
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
	{ postLogin }
)(Login);
