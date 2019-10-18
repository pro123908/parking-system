import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "../Auth/Auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !Auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/vehicle/list" }} />
      )
    }
  />
);

export default PrivateRoute;
