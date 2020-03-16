import React, { Component } from "react";
import VHeader from "../components/header";

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <VHeader text="App Page" />;
  }
}
