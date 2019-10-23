import React from "react";
import { Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";

const NonAuthRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/vehicle/list" }} />
      )
    }
  />
);

const mapStateToProps = state => {
  return {
    isAuthenticated: state.vehicles.isAuthenticated
  };
};

export default connect(mapStateToProps)(NonAuthRoute);
