/*
 * @Date: 2020-03-16 11:58:45
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-16 19:09:09
 * @repository: https://github.com/SkyBlueFeet
 */
import React, { Component, MouseEvent } from "react";
import logo from "../assets/images/logo.svg";

type HeaderProp = {
  text: string;
};

export default class header extends Component<HeaderProp> {
  constructor(prop: HeaderProp) {
    super(prop);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: MouseEvent) {
    e.preventDefault();
    alert("click");
  }

  UNSAFE_componentWillMount() {
    console.log("will mount");
  }

  componentDidMount() {
    console.log("mounted");
  }

  componentWillUnmount() {
    console.log("unmount");
  }

  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={this.handleClick}>{this.props.text}</p>
        {/* {this.props.children} */}
      </header>
    );
  }
}
