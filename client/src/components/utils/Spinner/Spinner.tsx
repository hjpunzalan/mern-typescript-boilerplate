import React, { Component } from "react";
import classes from "./Spinner.module.scss";

class Spinner extends Component {
	render() {
		return (
			<div className={classes.spinner}>
				<div className={classes.cube1}></div>
				<div className={classes.cube2}></div>
			</div>
		);
	}
}

export default Spinner;
