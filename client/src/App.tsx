import React, { Component } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import Navbar from "./components/Navbar";

interface Props {}
interface State {}

class App extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div>
        <h1>Welcome to the app</h1>
        <Navbar />
      </div>
    );
  }
}

export default App;
