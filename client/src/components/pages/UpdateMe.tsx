import React, { Component } from "react";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { IUser, updateUser } from "../../actions";

interface Props extends StoreState {
	updateUser: (form: IUpdateMeState) => Promise<void>;
}
export interface IUpdateMeState extends IUser {}

class UpdateMe extends Component<Props, IUpdateMeState> {
	state = {
		firstName: this.props.auth.currentUser
			? this.props.auth.currentUser.firstName
			: "",
		lastName: this.props.auth.currentUser
			? this.props.auth.currentUser.lastName
			: "",
		email: this.props.auth.currentUser ? this.props.auth.currentUser.email : ""
	};

	handleChange = (e: { target: HTMLInputElement }) => {
		this.setState({ ...this.state, [e.target.name]: e.target.value });
	};

	handleCancel = () => {
		this.setState({ firstName: "", lastName: "", email: "" });
	};

	handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		this.props.updateUser(this.state);
	};

	render() {
		const { firstName, lastName, email } = this.state;
		return (
			<div>
				<h1>Update your details</h1>
				<hr />
				<form onSubmit={this.handleSubmit}>
					<label>
						<span>First Name</span>
					</label>
					<input
						type="text"
						placeholder="Enter first name"
						name="firstName"
						value={firstName}
						onChange={this.handleChange}
						required
					/>
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

					<button className="btn" onClick={this.handleCancel}>
						Clear
					</button>
					<input type="submit" className="btn btn__submit" value="Update" />
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
	{ updateUser }
)(UpdateMe);
