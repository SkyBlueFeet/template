/*
 * @Date: 2020-03-16 13:29:46
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-16 19:03:47
 * @repository: https://github.com/SkyBlueFeet
 */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./assets/styles/index.css";
import App from "./app";

// ReactDOM.render(React.createElement(Main, { app: this }), document.getElementById("app"));
export class Main {
  constructor() {
    this.render();
  }

  private render(): void {
    ReactDOM.render(
      <Router>
        <App />
      </Router>,
      document.getElementById("root")
    );
  }
}

new Main();
