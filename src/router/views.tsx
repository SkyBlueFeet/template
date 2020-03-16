/*
 * @Date: 2020-03-16 18:44:48
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-16 18:59:50
 * @repository: https://github.com/SkyBlueFeet
 */
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import router from ".";

interface ViewRouters {
  routers: typeof router;
}

export default class RenderRouters extends Component<ViewRouters> {
  constructor(props: ViewRouters) {
    super(props);
  }

  render() {
    return this.props.routers.map(
      ({ path, componentName, exact = true, routes = [] }, key) => {
        return (
          <Route
            exact={exact}
            key={key}
            path={path}
            render={props =>
              React.createElement(componentName, {
                ...props,
                routes
              })
            }
          />
        );
      }
    );
  }
}
