/*
 * @Date: 2020-03-16 18:11:12
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-16 19:03:24
 * @repository: https://github.com/SkyBlueFeet
 */
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import router from "./router";
import RenderV from "./router/views";
import "./assets/styles/App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <RenderV routers={router} />
        </div>
      </Router>
    );
  }
}
export default App;
