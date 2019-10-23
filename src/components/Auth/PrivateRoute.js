import React from "react";
import { Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/admin" }} />
      )
    }
  />
);

const mapStateToProps = state => {
  return {
    isAuthenticated: state.vehicles.isAuthenticated
  };
};

export default connect(mapStateToProps)(PrivateRoute);
