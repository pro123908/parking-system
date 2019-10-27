import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Styles from "../styles";
import { setAuth } from "../../actions";

const Header = props => {
  const classes = Styles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="overline" className={classes.title}>
            Parking System
          </Typography>
          <Button component={Link} to="/" className={classes.white}>
            Add Vehicle
          </Button>
          {props.isAuthenticated ? (
            <React.Fragment>
              <Button
                component={Link}
                to="/vehicle/list"
                className={classes.white}
              >
                Vehicle List
              </Button>
              <Button
                component={Link}
                to="/vehicle/parkingLots"
                className={classes.white}
              >
                Parking Lots
              </Button>

              <Button
                onClick={() => {
                  props.setAuth(false);
                  props.history.push("/admin");
                }}
                className={classes.white}
              >
                Logout
              </Button>
            </React.Fragment>
          ) : (
            <Button component={Link} to="/admin" className={classes.white}>
              Admin View
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.authenticated
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { setAuth }
  )(Header)
);
