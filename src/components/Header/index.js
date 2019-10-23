import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { setAuth } from "../../actions";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Header = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="overline" className={classes.title}>
            Parking System
          </Typography>
          <Button component={Link} to="/" style={{ color: "#fff" }}>
            Add Vehicle
          </Button>
          {props.isAuthenticated ? (
            <React.Fragment>
              <Button
                component={Link}
                to="/vehicle/list"
                style={{ color: "#fff" }}
              >
                Vehicle List
              </Button>
              <Button
                component={Link}
                to="/vehicle/parkingLots"
                style={{ color: "#fff" }}
              >
                Parking Lots
              </Button>

              <Button
                onClick={() => {
                  props.setAuth(false);
                  props.history.push("/admin");
                }}
                style={{ color: "#fff" }}
              >
                Logout
              </Button>
            </React.Fragment>
          ) : (
            <Button component={Link} to="/admin" style={{ color: "#fff" }}>
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
    isAuthenticated: state.vehicles.isAuthenticated
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { setAuth }
  )(Header)
);
