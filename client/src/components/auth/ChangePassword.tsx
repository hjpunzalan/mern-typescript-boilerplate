import React, { Component } from "react";

interface Props {}
interface State {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

class ChangePassword extends Component<Props, State> {
	state = {
		currentPassword: "",
		newPassword: "",
		confirmPassword: ""
	};

	render() {
		return (
			<div>
				<h1>Login page</h1>
				{this.state.loading ? (
					<Spinner />
				) : (
					<form onSubmit={this.handleSubmit}>
						<label htmlFor="currentpassword">
							<b>Current Password</b>
						</label>
						<input
							type="password"
							name="currentpassword"
							value={this.state.password}
							onChange={this.handleChange}
							minLength={6}
							required
						/>
						<button>Login</button>
					</form>
				)}
			</div>
		);
	}
}

export default ChangePassword;
